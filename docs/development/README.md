# Development Guide

This directory contains comprehensive development documentation for the LaTeChforce Engine.

## Quick Start

1. **Installation**: Follow the [installation guide](./installation.md)
2. **Feature Development**: Use our [feature development guide](./feature-development.md)
3. **Testing**: Learn about our [testing strategies](./testing.md)
4. **Contributing**: Read the [contribution guidelines](./contributing.md)

## Development Tools

### Code Generation
Generate new features quickly using our CLI:

```bash
# Generate a complete feature
bun run generate:feature myfeature --full

# Generate specific components
bun run generate:feature myfeature --entity --repository --use-case
```

### Architecture Testing
Ensure architectural integrity:

```bash
# Run architecture tests
bun test test/architecture/

# Run all tests
bun test
```

### Code Quality
Maintain code quality:

```bash
# Lint and format
bun run lint
bun run format

# Type checking
bunx tsc --noEmit
```

## Architecture Overview

The LaTeChforce Engine follows Domain-Driven Design (DDD) principles with a feature-based architecture:

```
src/features/<feature-name>/
├── domain/           # Pure business logic
├── application/      # Use cases and DTOs
├── infrastructure/   # Data access and external services
└── interface/        # HTTP controllers and routes
```

### Key Principles

1. **Domain-Driven Design**: Clear domain boundaries and ubiquitous language
2. **Hexagonal Architecture**: Clean separation of concerns
3. **Event-Driven**: Loose coupling through domain events
4. **Anti-Corruption Layers**: Protection from external API changes

## Features Overview

### Core Features
- **Table**: Data management and CRUD operations
- **Automation**: Workflow automation with triggers and actions
- **Form**: Data collection and validation
- **Connection**: External service integrations
- **Bucket**: File storage and management
- **Run**: Execution tracking and logging

### Shared Components
- **Domain Events**: Cross-feature communication
- **Anti-Corruption Layers**: External API protection
- **Value Objects**: Shared domain concepts
- **Services**: Common functionality (HTTP, code execution, etc.)

## Development Workflow

1. **Feature Planning**: Define domain boundaries and responsibilities
2. **Architecture Design**: Create ADRs for significant decisions
3. **Implementation**: Use code generation and follow established patterns
4. **Testing**: Write comprehensive tests at all layers
5. **Documentation**: Update relevant documentation
6. **Review**: Ensure architectural compliance

## Best Practices

### Domain Layer
- Keep domain logic pure and testable
- Use value objects for type safety
- Emit domain events for cross-feature communication
- Never import from infrastructure or application layers

### Application Layer
- Orchestrate domain operations
- Transform between DTOs and domain objects
- Handle cross-cutting concerns (logging, validation)
- Keep use cases focused and single-purpose

### Infrastructure Layer
- Implement repository interfaces
- Handle external service communication
- Manage data persistence and retrieval
- Use anti-corruption layers for external APIs

### Interface Layer
- Handle HTTP concerns (routing, serialization)
- Validate input and format output
- Keep controllers thin and focused
- Return appropriate HTTP status codes

## Troubleshooting

### Common Issues

1. **Architecture Test Failures**: Check for cross-feature imports or layer violations
2. **TypeScript Errors**: Ensure proper type imports and exports
3. **Test Failures**: Verify mock setup and test isolation
4. **Build Issues**: Check dependency management and configuration

### Getting Help

1. Check the [FAQ](./faq.md)
2. Review the [troubleshooting guide](./troubleshooting.md)
3. Look at existing features for examples
4. Ask questions in team discussions

## Resources

- [Architecture Documentation](../architecture/)
- [API Documentation](../api/)
- [Examples](../../example/)
- [Contributing Guidelines](./contributing.md)