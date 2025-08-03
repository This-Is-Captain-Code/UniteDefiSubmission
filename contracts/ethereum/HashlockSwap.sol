// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HashlockSwap is ReentrancyGuard, Ownable {
    // Swap states
    enum SwapStatus { Pending, Locked, Completed, Refunded, Expired }
    
    struct CrossChainSwap {
        address initiator;
        address recipient;
        address token;
        uint256 amount;
        bytes32 hashlock;
        uint256 timelock;
        SwapStatus status;
        string suiTxHash;
    }
    
    // Storage
    mapping(bytes32 => CrossChainSwap) public swaps;
    mapping(address => uint256) public userSwapCount;
    
    // Statistics
    uint256 public totalSwaps;
    uint256 public successfulSwaps;
    uint256 public failedSwaps;
    uint256 public totalVolume;
    
    // Events
    event SwapInitiated(
        bytes32 indexed swapId,
        address indexed initiator,
        address indexed recipient,
        address token,
        uint256 amount,
        bytes32 hashlock,
        uint256 timelock,
        string suiTxHash
    );
    
    event SwapCompleted(
        bytes32 indexed swapId,
        bytes32 secret,
        address completedBy
    );
    
    event SwapRefunded(
        bytes32 indexed swapId,
        address refundedTo,
        uint256 amount
    );
    
    // Modifiers
    modifier validSwap(bytes32 _swapId) {
        require(swaps[_swapId].initiator != address(0), "Swap does not exist");
        _;
    }
    
    modifier onlyInitiator(bytes32 _swapId) {
        require(msg.sender == swaps[_swapId].initiator, "Only initiator can call this");
        _;
    }
    
    constructor() {}
    
    /**
     * @dev Initiate a cross-chain swap with hashlock and timelock
     * @param _recipient Address to receive tokens on completion
     * @param _token Token contract address
     * @param _amount Amount of tokens to lock
     * @param _hashlock SHA256 hash of the secret
     * @param _timelockDuration Duration in seconds for timelock
     * @param _suiTxHash Transaction hash on Sui network for reference
     */
    function initiateSwap(
        address _recipient,
        address _token,
        uint256 _amount,
        bytes32 _hashlock,
        uint256 _timelockDuration,
        string memory _suiTxHash
    ) external nonReentrant returns (bytes32 swapId) {
        require(_recipient != address(0), "Invalid recipient");
        require(_token != address(0), "Invalid token");
        require(_amount > 0, "Amount must be greater than 0");
        require(_hashlock != bytes32(0), "Invalid hashlock");
        require(_timelockDuration > 0, "Invalid timelock duration");
        
        // Generate unique swap ID
        swapId = keccak256(abi.encodePacked(
            msg.sender,
            _recipient,
            _token,
            _amount,
            _hashlock,
            block.timestamp,
            totalSwaps
        ));
        
        require(swaps[swapId].initiator == address(0), "Swap ID collision");
        
        // Transfer tokens to contract
        IERC20(_token).transferFrom(msg.sender, address(this), _amount);
        
        // Create swap
        swaps[swapId] = CrossChainSwap({
            initiator: msg.sender,
            recipient: _recipient,
            token: _token,
            amount: _amount,
            hashlock: _hashlock,
            timelock: block.timestamp + _timelockDuration,
            status: SwapStatus.Locked,
            suiTxHash: _suiTxHash
        });
        
        // Update statistics
        totalSwaps++;
        userSwapCount[msg.sender]++;
        totalVolume += _amount;
        
        emit SwapInitiated(
            swapId,
            msg.sender,
            _recipient,
            _token,
            _amount,
            _hashlock,
            block.timestamp + _timelockDuration,
            _suiTxHash
        );
        
        return swapId;
    }
    
    /**
     * @dev Complete swap by revealing the secret
     * @param _swapId Unique identifier for the swap
     * @param _secret Secret that matches the hashlock
     */
    function completeSwap(bytes32 _swapId, string memory _secret) 
        external 
        nonReentrant 
        validSwap(_swapId) 
    {
        CrossChainSwap storage swap = swaps[_swapId];
        
        require(swap.status == SwapStatus.Locked, "Swap not in locked state");
        require(block.timestamp < swap.timelock, "Timelock has expired");
        
        // Verify secret matches hashlock
        bytes32 secretHash = sha256(abi.encodePacked(_secret));
        require(secretHash == swap.hashlock, "Invalid secret");
        
        // Transfer tokens to recipient
        IERC20(swap.token).transfer(swap.recipient, swap.amount);
        
        // Update swap status
        swap.status = SwapStatus.Completed;
        successfulSwaps++;
        
        emit SwapCompleted(_swapId, secretHash, msg.sender);
    }
    
    /**
     * @dev Refund swap after timelock expires
     * @param _swapId Unique identifier for the swap
     */
    function refundSwap(bytes32 _swapId) 
        external 
        nonReentrant 
        validSwap(_swapId) 
        onlyInitiator(_swapId) 
    {
        CrossChainSwap storage swap = swaps[_swapId];
        
        require(swap.status == SwapStatus.Locked, "Swap not in locked state");
        require(block.timestamp >= swap.timelock, "Timelock has not expired");
        
        // Refund tokens to initiator
        IERC20(swap.token).transfer(swap.initiator, swap.amount);
        
        // Update swap status
        swap.status = SwapStatus.Refunded;
        failedSwaps++;
        
        emit SwapRefunded(_swapId, swap.initiator, swap.amount);
    }
    
    /**
     * @dev Get swap details
     * @param _swapId Unique identifier for the swap
     */
    function getSwapDetails(bytes32 _swapId) 
        external 
        view 
        validSwap(_swapId) 
        returns (
            address initiator,
            address recipient,
            address token,
            uint256 amount,
            bytes32 hashlock,
            uint256 timelock,
            SwapStatus status,
            string memory suiTxHash
        ) 
    {
        CrossChainSwap storage swap = swaps[_swapId];
        return (
            swap.initiator,
            swap.recipient,
            swap.token,
            swap.amount,
            swap.hashlock,
            swap.timelock,
            swap.status,
            swap.suiTxHash
        );
    }
    
    /**
     * @dev Get contract statistics
     */
    function getStats() external view returns (
        uint256 _totalSwaps,
        uint256 _successfulSwaps,
        uint256 _failedSwaps,
        uint256 _totalVolume
    ) {
        return (totalSwaps, successfulSwaps, failedSwaps, totalVolume);
    }
    
    /**
     * @dev Check if swap can be refunded
     * @param _swapId Unique identifier for the swap
     */
    function canRefund(bytes32 _swapId) external view validSwap(_swapId) returns (bool) {
        CrossChainSwap storage swap = swaps[_swapId];
        return (
            swap.status == SwapStatus.Locked && 
            block.timestamp >= swap.timelock
        );
    }
    
    /**
     * @dev Check if swap can be completed
     * @param _swapId Unique identifier for the swap
     */
    function canComplete(bytes32 _swapId) external view validSwap(_swapId) returns (bool) {
        CrossChainSwap storage swap = swaps[_swapId];
        return (
            swap.status == SwapStatus.Locked && 
            block.timestamp < swap.timelock
        );
    }
}