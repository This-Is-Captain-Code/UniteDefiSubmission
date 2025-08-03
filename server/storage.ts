import { type User, type InsertUser, type Metrics, type InsertMetrics } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getMetrics(): Promise<Metrics | undefined>;
  updateMetrics(metrics: InsertMetrics): Promise<Metrics>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private metrics: Metrics | undefined;

  constructor() {
    this.users = new Map();
    // Initialize with default metrics
    this.metrics = {
      id: randomUUID(),
      totalVolume: "$7.26B",
      dailyVolume: "$7.26B",
      activeUsers: "425K",
      gasSaved: "$42M",
      tokenVolume: "$16.7M",
      supportedChains: 15,
      dexProtocols: 200,
      updatedAt: new Date(),
    };
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
}

export const storage = new MemStorage();
