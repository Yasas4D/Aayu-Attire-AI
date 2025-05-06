# Architecture Documentation

## Overview

Aayu Attire is a modern e-commerce platform built with a full-stack JavaScript/TypeScript architecture. The application follows a client-server model with a clear separation between frontend and backend components. The system is designed to provide a seamless shopping experience for fashion products, with features such as product browsing, searching, filtering, cart management, and user account handling.

The application uses React for the frontend, Express for the backend API, and PostgreSQL with Drizzle ORM for data persistence. The codebase is structured to support scalability, maintainability, and performance optimization.

## System Architecture

The architecture follows a traditional client-server model with modern enhancements:

```
Client (React) <---> Server (Express) <---> Database (PostgreSQL)
```

### Key Architectural Decisions

1. **Monorepo Structure**: 
   - The application uses a monorepo approach, organizing client, server, and shared code in a single repository.
   - This facilitates code sharing, consistent versioning, and simplified deployment.

2. **TypeScript Throughout**:
   - Both client and server use TypeScript for type safety and improved developer experience.
   - Shared types ensure consistency between frontend and backend.

3. **API-First Design**:
   - RESTful API endpoints are defined in the server for all data interactions.
   - The client consumes these APIs using React Query for efficient data fetching and caching.

4. **Component-Based UI Architecture**:
   - The UI is built with a component-based approach using React.
   - UI components are organized using the ShadCN UI library structure.

5. **Database Access Layer**:
   - Drizzle ORM is used for database interactions, providing type-safe database operations.
   - Schema definitions are shared between frontend and backend.

## Key Components

### Frontend Components

1. **React Application** (`client/src/`):
   - Built with React and TypeScript
   - Uses React Query for data fetching and state management
   - Implemented with component-based architecture using shadcn/ui components

2. **Page Components** (`client/src/pages/`):
   - Home page: Landing page with featured products and categories
   - Shop page: Product browsing with filters and search
   - Product page: Detailed product information and purchase options
   - Cart page: Shopping cart management
   - About/Contact pages: Static information pages

3. **Context Providers** (`client/src/context/`):
   - CartContext: Manages shopping cart state
   - SearchContext: Manages search functionality

4. **UI Components** (`client/src/components/ui/`):
   - Reusable UI components based on shadcn/ui
   - Custom components such as ProductCard for specific business needs

### Backend Components

1. **Express Server** (`server/index.ts`):
   - HTTP server with middleware configuration
   - API route handlers
   - Static file serving for frontend assets

2. **API Routes** (`server/routes.ts`):
   - RESTful endpoints for products, categories, user operations
   - Structured with proper error handling

3. **Storage Layer** (`server/storage.ts`):
   - Interface for data persistence operations
   - Implementation of CRUD operations for all entities

4. **Vite Development Server** (`server/vite.ts`):
   - Development server configuration for hot module replacement
   - Build pipeline for frontend assets

### Shared Components

1. **Database Schema** (`shared/schema.ts`):
   - Drizzle ORM schema definitions
   - Zod validation schemas for input validation
   - Shared type definitions used by both client and server

## Data Flow

### Client-Side Data Flow

1. **User Interaction** → **React Component** → **React Query/Context** → **API Request** → **Server**

   - User interactions trigger state changes in React components
   - Data fetching is managed by React Query or context providers
   - API requests are made to the backend server
   - Responses update the UI via React's rendering cycle

### Server-Side Data Flow

1. **API Request** → **Express Route Handler** → **Storage Layer** → **Database** → **Response**

   - Incoming requests are routed to the appropriate handler
   - The handler processes the request and interacts with the storage layer
   - The storage layer performs database operations
   - Results are transformed and returned to the client

### Authentication Flow

The repository shows evidence of user authentication with the following flow:

1. User registers/logs in via API endpoints
2. Server validates credentials using the storage layer
3. Session management is likely handled via cookies (based on the connect-pg-simple dependency)

## Database Design

The database schema includes the following main entities:

1. **Users**:
   - User account information including username and password
   - Used for authentication and authorization

2. **Products**:
   - Core product information (name, description, price)
   - Product categorization and attributes (sizes, colors)
   - Product status flags (featured, new, on sale)
   - Inventory tracking

3. **Product Reviews**:
   - Customer reviews and ratings
   - Associated with specific products

Additionally, based on component references, the system likely also handles:

- Contact messages
- Newsletter subscriptions
- Order management (implied by cart functionality)

## External Dependencies

### Frontend Dependencies

1. **UI and Component Libraries**:
   - Radix UI (various components)
   - ShadCN UI (component styling system)
   - TailwindCSS (utility-first CSS framework)

2. **State Management and Data Fetching**:
   - TanStack Query (React Query) for API data fetching
   - Context API for global state management

3. **Routing and Navigation**:
   - Wouter (lightweight router alternative to React Router)

4. **Form Handling**:
   - React Hook Form with Zod validation

### Backend Dependencies

1. **Server and Middleware**:
   - Express.js for API server
   - Connect PG Simple for session management
   
2. **Database**:
   - Drizzle ORM for database operations
   - Neon PostgreSQL serverless client

3. **Development Tools**:
   - Vite for frontend bundling
   - esbuild for server bundling
   - TypeScript for type checking

## Deployment Strategy

The application supports deployment in multiple environments:

1. **Development**:
   - Uses Vite for hot module replacement
   - Uses local development server with runtime error overlay
   - Configured for Replit development environment

2. **Production**:
   - Build process: `npm run build`
     - Compiles client-side code with Vite
     - Bundles server-side code with esbuild
   - Runtime: `npm run start`
     - Serves frontend as static files
     - Runs server in production mode

3. **Deployment Target**:
   - Configured for autoscaling deployment (likely on Replit)
   - Port mapping from internal 5000 to external 80

## Security Considerations

1. **Authentication**:
   - Password storage in database (likely hashed, though implementation details not visible)
   - Session-based authentication with cookies

2. **API Security**:
   - Input validation using Zod schemas
   - Route-level validation of user inputs

3. **Frontend Security**:
   - CSRF protection (implied by session handling)
   - XSS protection through React's inherent output escaping

## Future Considerations

1. **Scalability**:
   - The current architecture would benefit from further API modularization as the application grows
   - Consider implementing more sophisticated caching strategies for product data

2. **Testing**:
   - No visible testing infrastructure in the repository
   - Adding unit, integration, and end-to-end tests would improve reliability

3. **Monitoring and Logging**:
   - Basic logging is implemented for API requests
   - Consider adding more structured logging and monitoring solutions