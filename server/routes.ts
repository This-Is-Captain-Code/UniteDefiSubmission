import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMetricsSchema, insertCrossChainSwapSchema, insertSwapMetricsSchema } from "@shared/schema";
import { z } from "zod";
import crypto from "crypto";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get current metrics
  app.get("/api/metrics", async (req, res) => {
    try {
      const metrics = await storage.getMetrics();
      if (!metrics) {
        return res.status(404).json({ message: "Metrics not found" });
      }
      res.json(metrics);
    } catch (error) {
      console.error("Error fetching metrics:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Update metrics (for admin purposes)
  app.post("/api/metrics", async (req, res) => {
    try {
      const validatedData = insertMetricsSchema.parse(req.body);
      const updatedMetrics = await storage.updateMetrics(validatedData);
      res.json(updatedMetrics);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid input data", 
          errors: error.errors 
        });
      }
      console.error("Error updating metrics:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Cross-chain swap routes
  
  // Create a new cross-chain swap
  app.post("/api/swaps", async (req, res) => {
    try {
      const validatedData = insertCrossChainSwapSchema.parse(req.body);
      const swap = await storage.createSwap(validatedData);
      res.status(201).json(swap);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid input data", 
          errors: error.errors 
        });
      }
      console.error("Error creating swap:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all swaps
  app.get("/api/swaps", async (req, res) => {
    try {
      const { status, address } = req.query;
      let swaps;
      
      if (status) {
        swaps = await storage.getSwapsByStatus(status as string);
      } else if (address) {
        swaps = await storage.getSwapsByAddress(address as string);
      } else {
        swaps = await storage.getAllSwaps();
      }
      
      res.json(swaps);
    } catch (error) {
      console.error("Error fetching swaps:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get a specific swap
  app.get("/api/swaps/:id", async (req, res) => {
    try {
      const swap = await storage.getSwap(req.params.id);
      if (!swap) {
        return res.status(404).json({ message: "Swap not found" });
      }
      res.json(swap);
    } catch (error) {
      console.error("Error fetching swap:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Update a swap (complete, refund, etc.)
  app.put("/api/swaps/:id", async (req, res) => {
    try {
      const updates = req.body;
      const updatedSwap = await storage.updateSwap(req.params.id, updates);
      if (!updatedSwap) {
        return res.status(404).json({ message: "Swap not found" });
      }
      res.json(updatedSwap);
    } catch (error) {
      console.error("Error updating swap:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Initiate Ethereum-to-Sui swap
  app.post("/api/swaps/ethereum-to-sui", async (req, res) => {
    try {
      const { fromAmount, toAmount, fromAddress, toAddress } = req.body;
      
      // Generate hashlock
      const secret = crypto.randomBytes(32).toString('hex');
      const hashlock = crypto.createHash('sha256').update(secret).digest('hex');
      
      // Set timelock to 24 hours from now
      const timelock = new Date(Date.now() + 24 * 60 * 60 * 1000);
      
      const swapData = {
        fromChain: "ethereum",
        toChain: "sui",
        fromToken: "USDC",
        toToken: "SUI",
        fromAmount: fromAmount.toString(),
        toAmount: toAmount.toString(),
        fromAddress,
        toAddress,
        hashlock,
        timelock,
        status: "pending"
      };
      
      const swap = await storage.createSwap(swapData);
      
      // Return swap details including secret (in production, this would be handled differently)
      res.status(201).json({
        ...swap,
        secret, // Only for demo purposes
        instructions: {
          step1: "Deploy hashlock contract on Ethereum with the provided hashlock",
          step2: "Fund the Ethereum contract with USDC",
          step3: "Deploy corresponding hashlock contract on Sui",
          step4: "Complete the swap by revealing the secret"
        }
      });
    } catch (error) {
      console.error("Error initiating Ethereum-to-Sui swap:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Initiate Sui-to-Ethereum swap
  app.post("/api/swaps/sui-to-ethereum", async (req, res) => {
    try {
      const { fromAmount, toAmount, fromAddress, toAddress } = req.body;
      
      const secret = crypto.randomBytes(32).toString('hex');
      const hashlock = crypto.createHash('sha256').update(secret).digest('hex');
      const timelock = new Date(Date.now() + 24 * 60 * 60 * 1000);
      
      const swapData = {
        fromChain: "sui",
        toChain: "ethereum",
        fromToken: "SUI",
        toToken: "USDC",
        fromAmount: fromAmount.toString(),
        toAmount: toAmount.toString(),
        fromAddress,
        toAddress,
        hashlock,
        timelock,
        status: "pending"
      };
      
      const swap = await storage.createSwap(swapData);
      
      res.status(201).json({
        ...swap,
        secret,
        instructions: {
          step1: "Deploy hashlock contract on Sui with the provided hashlock",
          step2: "Fund the Sui contract with SUI tokens",
          step3: "Deploy corresponding hashlock contract on Ethereum",
          step4: "Complete the swap by revealing the secret"
        }
      });
    } catch (error) {
      console.error("Error initiating Sui-to-Ethereum swap:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get swap metrics
  app.get("/api/swap-metrics", async (req, res) => {
    try {
      const metrics = await storage.getSwapMetrics();
      if (!metrics) {
        return res.status(404).json({ message: "Swap metrics not found" });
      }
      res.json(metrics);
    } catch (error) {
      console.error("Error fetching swap metrics:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Update swap metrics
  app.post("/api/swap-metrics", async (req, res) => {
    try {
      const validatedData = insertSwapMetricsSchema.parse(req.body);
      const updatedMetrics = await storage.updateSwapMetrics(validatedData);
      res.json(updatedMetrics);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid input data", 
          errors: error.errors 
        });
      }
      console.error("Error updating swap metrics:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
