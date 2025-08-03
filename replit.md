# Overview

This is a comprehensive 1inch Protocol hackathon project implementing Track 5 (Sui) - a complete Fusion+ cross-chain swap solution between Ethereum and Sui Network. Built with a full-stack TypeScript architecture, the application features working smart contracts (Sui Move & Ethereum Solidity), real-time swap execution, bidirectional atomic swaps with hashlock/timelock security, live demo interface, comprehensive analytics, and production-ready implementation showcasing the winning strategy for the hackathon.

## Recent Changes

**January 3, 2025**
- ✅ **Complete Sui Implementation**: Full smart contract suite with Move language contracts and Ethereum integration
- ✅ **Working Cross-Chain Swaps**: Live API endpoints for Ethereum ↔ Sui swaps with real hashlock/timelock functionality  
- ✅ **Interactive Demo Interface**: Real-time swap progress tracking, transaction history, and step-by-step execution
- ✅ **Database Integration**: PostgreSQL schema for swap tracking, metrics, and historical data
- ✅ **Production Backend**: Complete REST API with swap initiation, monitoring, and completion endpoints
- ✅ **Security Implementation**: SHA-256 hashlock, 24-hour timelock, atomic operations, refund protection
- ✅ **SuiBridge Rebranding**: Complete transformation from generic 1inch showcase to Track 5-specific platform with Sui-focused identity and messaging across all components

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Shadcn/ui component library built on Radix UI primitives with Tailwind CSS for styling
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **Design System**: Custom design tokens inspired by 1inch branding with support for light/dark themes

## Backend Architecture
- **Runtime**: Node.js with TypeScript using ESM modules
- **Framework**: Express.js for REST API endpoints
- **Development Server**: Custom Vite integration for SSR-like development experience
- **Database Layer**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Storage**: Dual storage implementation with in-memory storage for development and PostgreSQL for production
- **API Design**: RESTful endpoints with proper error handling and request/response logging

## Data Storage
- **Database**: PostgreSQL configured via Drizzle ORM with schema-first approach
- **Schema Management**: Drizzle migrations in the `migrations/` directory
- **Type Safety**: Zod schemas for runtime validation integrated with Drizzle for compile-time safety
- **Connection**: Neon Database serverless PostgreSQL for production deployment

## Key Features Implementation
- **SuiBridge Platform**: Dedicated Track 5 (Sui) cross-chain swap implementation with production-ready contracts
- **Ethereum ↔ Sui Swaps**: Bidirectional atomic swaps with hashlock/timelock security mechanisms
- **Live Demo Interface**: Interactive swap interface with real-time progress tracking and transaction history
- **Smart Contract Suite**: Complete Move language contracts for Sui and Solidity contracts for Ethereum
- **Security Implementation**: SHA-256 hashlock, 24-hour timelock, atomic operations, and refund protection
- **Production API**: RESTful endpoints for swap initiation, monitoring, completion, and historical data
- **Responsive Design**: Mobile-first design with Sui-focused branding, cyan/blue gradients, and modern animations

## Build and Deployment
- **Development**: Vite dev server with HMR and TypeScript checking
- **Build Process**: Vite for client bundle, esbuild for server-side code bundling
- **Asset Management**: Static asset serving with proper caching headers
- **Environment Configuration**: Environment-based configuration for database connections and API endpoints

## External Dependencies

- **UI Framework**: Radix UI primitives for accessible component foundations
- **Database**: Neon Database serverless PostgreSQL
- **ORM**: Drizzle ORM with Drizzle Kit for migrations and schema management
- **Validation**: Zod for runtime type validation and schema definition
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for date manipulation and formatting
- **Styling**: Tailwind CSS with PostCSS for processing
- **Development**: Replit-specific plugins for development environment integration