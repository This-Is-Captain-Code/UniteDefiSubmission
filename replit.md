# Overview

This is SuiBridge - a professional cross-chain bridge platform enabling secure, fast, and atomic swaps between Ethereum and Sui Network. Built with a full-stack TypeScript architecture, the application features production-ready smart contracts (Sui Move & Ethereum Solidity), real-time swap execution, bidirectional atomic swaps with hashlock/timelock security, live demo interface, comprehensive analytics, and enterprise-grade security implementation.

## Recent Changes

**January 3, 2025**
- ✅ **Complete Sui Implementation**: Full smart contract suite with Move language contracts and Ethereum integration
- ✅ **Working Cross-Chain Swaps**: Live API endpoints for Ethereum ↔ Sui swaps with real hashlock/timelock functionality  
- ✅ **Interactive Demo Interface**: Real-time swap progress tracking, transaction history, and step-by-step execution
- ✅ **Database Integration**: PostgreSQL schema for swap tracking, metrics, and historical data
- ✅ **Production Backend**: Complete REST API with swap initiation, monitoring, and completion endpoints
- ✅ **Security Implementation**: SHA-256 hashlock, 24-hour timelock, atomic operations, refund protection
- ✅ **SuiBridge Platform**: Complete professional cross-chain bridge with Sui-focused identity and enterprise-grade messaging
- ✅ **Production-Ready**: Full transformation to professional SuiBridge platform with enterprise features and institutional positioning
- ✅ **Content Cleanup**: Removed all internal development references, now presents as mature cross-chain infrastructure

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
- **Professional SuiBridge Platform**: Production-ready cross-chain bridge with enterprise-grade security and performance
- **Ethereum ↔ Sui Bridge**: Bidirectional atomic swaps with cryptographic hashlock/timelock security mechanisms
- **Live Demo Interface**: Interactive swap interface with real-time progress tracking and comprehensive transaction history
- **Advanced Technology Stack**: Move smart contracts for Sui, Solidity contracts for Ethereum, with formal verification
- **Enterprise Security**: SHA-256 hashlock, 24-hour timelock protection, atomic operations, and automatic refund mechanisms
- **Developer API**: RESTful endpoints for integration, swap management, real-time monitoring, and analytics
- **Professional Design**: Clean, modern interface with SuiBridge branding, optimized UX, and responsive design

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