# Overview

This is a comprehensive 1inch Protocol hackathon project showcasing all 4 tracks for extending Fusion+ cross-chain swaps. Built with a full-stack TypeScript architecture, the application demonstrates cross-chain swap capabilities between Ethereum and multiple non-EVM blockchains (Aptos, Bitcoin family, Cosmos, Near) using hashlock/timelock security mechanisms. The project features bidirectional atomic swaps, modern DeFi interface design, analytics dashboards, and comprehensive developer tools covering all hackathon tracks.

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
- **Multi-Track Cross-Chain Swaps**: Interactive demo supporting all 4 hackathon tracks (Aptos, Bitcoin family, Cosmos, Near)
- **Comprehensive Hackathon Coverage**: Detailed implementation showcase for all track qualification requirements
- **Dynamic Trading Interface**: Cross-chain swap interface with track selector showcasing Fusion+ technology across all chains
- **Hackathon Track Overview**: Dedicated section explaining requirements, stretch goals, and security features for each track
- **Developer Portal**: Multi-track API documentation and code examples for all supported blockchains
- **Security Visualization**: Hashlock/timelock mechanism demonstrations across all supported chains
- **Responsive Design**: Mobile-first design with glassmorphism effects and modern animations

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