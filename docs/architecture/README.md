# Architecture Documentation

This directory contains architectural decision records (ADRs) and other architecture documentation for the LaTeChforce Engine.

## Architecture Decision Records (ADRs)

ADRs document important architectural decisions and their context, consequences, and implementation details.

### Active ADRs

- [ADR-001: Domain Events for Feature Decoupling](./adr-001-domain-events.md)
- [ADR-002: Repository Decomposition](./adr-002-repository-decomposition.md)
- [ADR-003: Anti-Corruption Layers](./adr-003-anti-corruption-layers.md)

### Creating New ADRs

1. Copy the [ADR template](./adr-template.md)
2. Replace `XXX` with the next sequential number
3. Fill in the title and content
4. Add the new ADR to the list above
5. Ensure the ADR is reviewed and approved before implementation

## Other Architecture Documentation

- [Aggregate Boundaries](./aggregate-boundaries.md) - Defines the boundaries between different aggregates in the domain

## Architecture Principles

### Domain-Driven Design (DDD)
- Clear aggregate boundaries with well-defined responsibilities
- Domain events for loose coupling between features
- Anti-corruption layers to protect domain integrity

### Hexagonal Architecture
- Clean separation between domain, application, and infrastructure layers
- Dependency inversion principle enforced
- Testable and maintainable codebase

### Feature-Based Organization
- Each feature is self-contained with its own domain, application, and infrastructure layers
- Minimal cross-feature dependencies
- Clear interfaces and contracts between features

## Architecture Testing

The architecture is enforced through automated tests in `test/architecture/architecture-rules.test.ts` that verify:

- No cross-feature imports in the domain layer
- No infrastructure imports in the domain layer
- No application imports in the domain layer
- Proper aggregate boundary compliance
- Usage of anti-corruption layers for external integrations

## Contributing

When making architectural changes:

1. Create an ADR documenting the decision
2. Ensure all architecture tests pass
3. Update relevant documentation
4. Consider the impact on existing features and dependencies