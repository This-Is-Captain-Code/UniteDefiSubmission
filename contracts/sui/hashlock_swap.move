module hashlock_swap::cross_chain_swap {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::coin::{Self, Coin};
    use sui::balance::{Self, Balance};
    use sui::clock::{Self, Clock};
    use sui::event;
    use std::vector;
    use std::hash;

    // Error codes
    const E_INVALID_HASHLOCK: u64 = 1;
    const E_TIMELOCK_EXPIRED: u64 = 2;
    const E_TIMELOCK_NOT_EXPIRED: u64 = 3;
    const E_SWAP_ALREADY_COMPLETED: u64 = 4;
    const E_INSUFFICIENT_BALANCE: u64 = 5;
    const E_INVALID_SECRET: u64 = 6;

    // Swap states
    const SWAP_PENDING: u8 = 0;
    const SWAP_LOCKED: u8 = 1;
    const SWAP_COMPLETED: u8 = 2;
    const SWAP_REFUNDED: u8 = 3;

    /// Cross-chain swap object
    struct CrossChainSwap<phantom T> has key, store {
        id: UID,
        initiator: address,
        recipient: address,
        amount: Balance<T>,
        hashlock: vector<u8>,
        timelock: u64,
        status: u8,
        ethereum_tx_hash: vector<u8>,
    }

    /// Swap registry for tracking all swaps
    struct SwapRegistry has key {
        id: UID,
        total_swaps: u64,
        successful_swaps: u64,
        failed_swaps: u64,
    }

    // Events
    struct SwapInitiated has copy, drop {
        swap_id: address,
        initiator: address,
        recipient: address,
        amount: u64,
        hashlock: vector<u8>,
        timelock: u64,
        ethereum_tx_hash: vector<u8>,
    }

    struct SwapCompleted has copy, drop {
        swap_id: address,
        secret: vector<u8>,
        completed_by: address,
    }

    struct SwapRefunded has copy, drop {
        swap_id: address,
        refunded_to: address,
        amount: u64,
    }

    /// Initialize the swap registry (called once)
    fun init(ctx: &mut TxContext) {
        transfer::share_object(SwapRegistry {
            id: object::new(ctx),
            total_swaps: 0,
            successful_swaps: 0,
            failed_swaps: 0,
        });
    }

    /// Initiate a cross-chain swap with hashlock and timelock
    public entry fun initiate_swap<T>(
        registry: &mut SwapRegistry,
        funds: Coin<T>,
        recipient: address,
        hashlock: vector<u8>,
        timelock_duration: u64,
        ethereum_tx_hash: vector<u8>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let amount = coin::value(&funds);
        let balance = coin::into_balance(funds);
        let timelock = clock::timestamp_ms(clock) + timelock_duration;
        let swap_id = object::new(ctx);
        let swap_address = object::uid_to_address(&swap_id);

        let swap = CrossChainSwap<T> {
            id: swap_id,
            initiator: tx_context::sender(ctx),
            recipient,
            amount: balance,
            hashlock,
            timelock,
            status: SWAP_LOCKED,
            ethereum_tx_hash,
        };

        // Update registry
        registry.total_swaps = registry.total_swaps + 1;

        // Emit event
        event::emit(SwapInitiated {
            swap_id: swap_address,
            initiator: tx_context::sender(ctx),
            recipient,
            amount,
            hashlock,
            timelock,
            ethereum_tx_hash,
        });

        transfer::share_object(swap);
    }

    /// Complete swap by revealing the secret
    public entry fun complete_swap<T>(
        registry: &mut SwapRegistry,
        swap: &mut CrossChainSwap<T>,
        secret: vector<u8>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        assert!(swap.status == SWAP_LOCKED, E_SWAP_ALREADY_COMPLETED);
        assert!(clock::timestamp_ms(clock) < swap.timelock, E_TIMELOCK_EXPIRED);
        
        // Verify secret matches hashlock
        let secret_hash = hash::sha3_256(secret);
        assert!(secret_hash == swap.hashlock, E_INVALID_SECRET);

        // Transfer funds to recipient
        let amount = balance::value(&swap.amount);
        let coin_to_transfer = coin::from_balance(
            balance::withdraw_all(&mut swap.amount), 
            ctx
        );
        transfer::public_transfer(coin_to_transfer, swap.recipient);

        // Update swap status
        swap.status = SWAP_COMPLETED;
        
        // Update registry
        registry.successful_swaps = registry.successful_swaps + 1;

        // Emit event
        event::emit(SwapCompleted {
            swap_id: object::uid_to_address(&swap.id),
            secret,
            completed_by: tx_context::sender(ctx),
        });
    }

    /// Refund swap after timelock expires
    public entry fun refund_swap<T>(
        registry: &mut SwapRegistry,
        swap: &mut CrossChainSwap<T>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        assert!(swap.status == SWAP_LOCKED, E_SWAP_ALREADY_COMPLETED);
        assert!(clock::timestamp_ms(clock) >= swap.timelock, E_TIMELOCK_NOT_EXPIRED);
        assert!(tx_context::sender(ctx) == swap.initiator, E_INVALID_HASHLOCK);

        // Refund to initiator
        let amount = balance::value(&swap.amount);
        let coin_to_refund = coin::from_balance(
            balance::withdraw_all(&mut swap.amount), 
            ctx
        );
        transfer::public_transfer(coin_to_refund, swap.initiator);

        // Update swap status
        swap.status = SWAP_REFUNDED;
        
        // Update registry
        registry.failed_swaps = registry.failed_swaps + 1;

        // Emit event
        event::emit(SwapRefunded {
            swap_id: object::uid_to_address(&swap.id),
            refunded_to: swap.initiator,
            amount,
        });
    }

    /// Get swap details
    public fun get_swap_info<T>(swap: &CrossChainSwap<T>): (address, address, u64, vector<u8>, u64, u8) {
        (
            swap.initiator,
            swap.recipient,
            balance::value(&swap.amount),
            swap.hashlock,
            swap.timelock,
            swap.status
        )
    }

    /// Get registry stats
    public fun get_registry_stats(registry: &SwapRegistry): (u64, u64, u64) {
        (registry.total_swaps, registry.successful_swaps, registry.failed_swaps)
    }
}