import { sql } from "drizzle-orm";
import { pgTable, text, varchar, numeric, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const metrics = pgTable("metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  totalVolume: text("total_volume").notNull(),
  dailyVolume: text("daily_volume").notNull(),
  activeUsers: text("active_users").notNull(),
  gasSaved: text("gas_saved").notNull(),
  tokenVolume: text("token_volume").notNull(),
  supportedChains: integer("supported_chains").notNull(),
  dexProtocols: integer("dex_protocols").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const crossChainSwaps = pgTable("cross_chain_swaps", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fromChain: text("from_chain").notNull(),
  toChain: text("to_chain").notNull(),
  fromToken: text("from_token").notNull(),
  toToken: text("to_token").notNull(),
  fromAmount: text("from_amount").notNull(),
  toAmount: text("to_amount").notNull(),
  fromAddress: text("from_address").notNull(),
  toAddress: text("to_address").notNull(),
  hashlock: text("hashlock").notNull(),
  secret: text("secret"),
  timelock: timestamp("timelock").notNull(),
  status: text("status").notNull().default("pending"),
  ethereumTxHash: text("ethereum_tx_hash"),
  suiTxHash: text("sui_tx_hash"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const swapMetrics = pgTable("swap_metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  totalSwaps: integer("total_swaps").notNull().default(0),
  totalVolume: text("total_volume").notNull().default("0"),
  successfulSwaps: integer("successful_swaps").notNull().default(0),
  failedSwaps: integer("failed_swaps").notNull().default(0),
  averageSwapTime: integer("average_swap_time").notNull().default(0),
  date: timestamp("date").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertMetricsSchema = createInsertSchema(metrics).omit({
  id: true,
  updatedAt: true,
});

export const insertCrossChainSwapSchema = createInsertSchema(crossChainSwaps).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSwapMetricsSchema = createInsertSchema(swapMetrics).omit({
  id: true,
  date: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertMetrics = z.infer<typeof insertMetricsSchema>;
export type Metrics = typeof metrics.$inferSelect;
export type CrossChainSwap = typeof crossChainSwaps.$inferSelect;
export type InsertCrossChainSwap = z.infer<typeof insertCrossChainSwapSchema>;
export type SwapMetrics = typeof swapMetrics.$inferSelect;
export type InsertSwapMetrics = z.infer<typeof insertSwapMetricsSchema>;
