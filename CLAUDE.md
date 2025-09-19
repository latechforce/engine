# LTF Engine Project

## Overview

LTF Engine is a web application generation engine that combines "the best of both Code and No Code worlds" by enabling rapid web application creation with minimal coding. Built on Bun runtime, it generates complete web applications from a single configuration file.

## Key Features

- Built on Bun runtime (TypeScript)
- Generates complete web applications from configuration
- Provides server, database, and API capabilities
- Enables custom information system creation without deep coding knowledge
- Maintains code and database control
- Supports collaboration and versioning tools

## Getting Started

```typescript
import App from '@latechforce/engine'

await new App().start({
  name: 'My App',
  appVersion: '1.0.0',
})
```

## Development Environment

- Default port: `http://localhost:3000`
- Runtime: Bun
- Configurable via app schema

## Common Commands

- `bun test` - Run tests
- `bun e2e` - Run end-to-end tests
- `bun run example [example/file/path]` - Start example app with development server
- `bun typecheck` - TypeScript compilation check
- `bun lint` - Lint code
- `bun clean` - Remove useless files and code

## Project Structure

- `/src` - Main source code
- `/e2e` - End-to-end tests
- `/example` - Example applications
- `/website` - Documentation website
- `/config` - Configuration files for tools
- `/script` - Build and utility scripts
- `/schema` - JSON schemas

## Tech Stack

### Core Technologies
- **Runtime**: Bun (JavaScript/TypeScript runtime)
- **Language**: TypeScript
- **Web Framework**: Hono (for API and server)
- **Frontend**: React 19 with TanStack Router
- **Database**: PostgreSQL/SQLite with Drizzle ORM
- **Authentication**: Better Auth
- **API Documentation**: Scalar API Reference

### Development Tools
- **Testing**: Bun Test + Playwright (E2E)
- **Linting**: ESLint with TypeScript ESLint
- **Formatting**: Prettier
- **Code Quality**: Knip (unused code detection)
- **Database Migrations**: Drizzle Kit
- **CI/CD**: Semantic Release

### UI/UX
- **Styling**: Tailwind CSS v4
- **Components**: Radix UI primitives
- **Icons**: Lucide React
- **Forms**: React Hook Form + TanStack Form
- **Data Fetching**: TanStack Query
- **Notifications**: Sonner

### External Integrations
- **Email**: Resend
- **Monitoring**: Sentry
- **APIs**: Google APIs, Notion API
- **HTTP Client**: Ky
- **Validation**: Zod

## Core Philosophy

The project seeks to democratize web application development by providing a flexible, powerful framework that bridges the gap between no-code solutions and traditional software development.
