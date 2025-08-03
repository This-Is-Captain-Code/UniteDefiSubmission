import { type User, type InsertUser, type Metrics, type InsertMetrics, type CrossChainSwap, type InsertCrossChainSwap, type SwapMetrics, type InsertSwapMetrics } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getMetrics(): Promise<Metrics | undefined>;
  updateMetrics(metrics: InsertMetrics): Promise<Metrics>;
  
  // Cross-chain swap operations
  createSwap(swap: InsertCrossChainSwap): Promise<CrossChainSwap>;
  getSwap(id: string): Promise<CrossChainSwap | undefined>;
  updateSwap(id: string, updates: Partial<CrossChainSwap>): Promise<CrossChainSwap | undefined>;
  getAllSwaps(): Promise<CrossChainSwap[]>;
  getSwapsByStatus(status: string): Promise<CrossChainSwap[]>;
  getSwapsByAddress(address: string): Promise<CrossChainSwap[]>;

  // Swap metrics operations
  getSwapMetrics(): Promise<SwapMetrics | undefined>;
  updateSwapMetrics(metrics: InsertSwapMetrics): Promise<SwapMetrics>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private metrics: Metrics | undefined;
  private swaps: Map<string, CrossChainSwap>;
  private swapMetrics: SwapMetrics | undefined;

  constructor() {
    this.users = new Map();
    this.swaps = new Map();
    
    // Initialize with default metrics
    this.metrics = {
      id: randomUUID(),
      totalVolume: "$7.26B",
      dailyVolume: "$7.26B",
      activeUsers: "425K",
      gasSaved: "$42M",
      tokenVolume: "$16.7M",
      supportedChains: 7,
      dexProtocols: 200,
      updatedAt: new Date(),
    };

    // Initialize with default swap metrics
    this.swapMetrics = {
      id: randomUUID(),
      totalSwaps: 25,
      totalVolume: "$2.1M",
      successfulSwaps: 23,
      failedSwaps: 2,
      averageSwapTime: 180,
      date: new Date(),
    };

    // Add sample swap data
    this.initializeSampleSwaps();
  }

  private initializeSampleSwaps() {
    const sampleSwaps = [
      {
        fromChain: 'ethereum',
        toChain: 'sui',
        fromToken: 'USDC',
        toToken: 'SUI',
        fromAmount: '1000',
        toAmount: '850',
        fromAddress: '0x742d35Cc6634C0532925a3b8D5c9A8B4A4B72aB8',
        toAddress: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
        hashlock: 'a1b2c3d4e5f6789abcdef',
        timelock: new Date(Date.now() + 24 * 60 * 60 * 1000),
        status: 'completed',
        ethereumTxHash: '0xabc123def456',
        suiTxHash: '0x789xyz456def'
      },
      {
        fromChain: 'sui',
        toChain: 'ethereum',
        fromToken: 'SUI',
        toToken: 'USDC',
        fromAmount: '500',
        toAmount: '425',
        fromAddress: '0x9876543210abcdef',
        toAddress: '0xfedcba0987654321',
        hashlock: 'x9y8z7w6v5u4t3s2r1',
        timelock: new Date(Date.now() + 20 * 60 * 60 * 1000),
        status: 'pending'
      },
      {
        fromChain: 'ethereum',
        toChain: 'sui',
        fromToken: 'USDC',
        toToken: 'SUI',
        fromAmount: '2500',
        toAmount: '2100',
        fromAddress: '0x123abc456def789',
        toAddress: '0x987654321abcdef0',
        hashlock: 'm1n2o3p4q5r6s7t8u9',
        timelock: new Date(Date.now() + 18 * 60 * 60 * 1000),
        status: 'locked',
        ethereumTxHash: '0x456def789abc123'
      }
    ];

    sampleSwaps.forEach(swap => {
      const id = randomUUID();
      const fullSwap: CrossChainSwap = {
        id,
        ...swap,
        createdAt: new Date(Date.now() - Math.random() * 86400000), // Random time in last 24h
        updatedAt: new Date(),
      };
      this.swaps.set(id, fullSwap);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getMetrics(): Promise<Metrics | undefined> {
    return this.metrics;
  }

  async updateMetrics(newMetrics: InsertMetrics): Promise<Metrics> {
    const updatedMetrics: Metrics = {
      id: this.metrics?.id || randomUUID(),
      ...newMetrics,
      updatedAt: new Date(),
    };
    this.metrics = updatedMetrics;
    return updatedMetrics;
  }

  async createSwap(insertSwap: InsertCrossChainSwap): Promise<CrossChainSwap> {
    const id = randomUUID();
    const swap: CrossChainSwap = {
      id,
      ...insertSwap,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.swaps.set(id, swap);
    return swap;
  }

  async getSwap(id: string): Promise<CrossChainSwap | undefined> {
    return this.swaps.get(id);
  }

  async updateSwap(id: string, updates: Partial<CrossChainSwap>): Promise<CrossChainSwap | undefined> {
    const swap = this.swaps.get(id);
    if (!swap) return undefined;
    
    const updatedSwap: CrossChainSwap = {
      ...swap,
      ...updates,
      updatedAt: new Date(),
    };
    this.swaps.set(id, updatedSwap);
    return updatedSwap;
  }

  async getAllSwaps(): Promise<CrossChainSwap[]> {
    return Array.from(this.swaps.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getSwapsByStatus(status: string): Promise<CrossChainSwap[]> {
    return Array.from(this.swaps.values())
      .filter(swap => swap.status === status)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getSwapsByAddress(address: string): Promise<CrossChainSwap[]> {
    return Array.from(this.swaps.values())
      .filter(swap => swap.fromAddress === address || swap.toAddress === address)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getSwapMetrics(): Promise<SwapMetrics | undefined> {
    return this.swapMetrics;
  }

  async updateSwapMetrics(newSwapMetrics: InsertSwapMetrics): Promise<SwapMetrics> {
    const updatedSwapMetrics: SwapMetrics = {
      id: this.swapMetrics?.id || randomUUID(),
      ...newSwapMetrics,
      date: new Date(),
    };
    this.swapMetrics = updatedSwapMetrics;
    return updatedSwapMetrics;
  }
}

export const storage = new MemStorage();
