# ADR-002: Repository Decomposition and Shared Kernel

## Status

Accepted (Implemented in Phase 2)

## Context

The original `ActionRepository` had become a monolithic component with multiple responsibilities:

1. **Code execution**: Running TypeScript and JavaScript code
2. **HTTP operations**: Making REST API calls  
3. **External integrations**: Communicating with third-party services
4. **Single Responsibility Principle violation**: One class doing too many things
5. **Difficult testing**: Hard to test individual concerns in isolation
6. **Code duplication**: Value objects repeated across features

Additionally, the system lacked a shared kernel, leading to:
- Duplicated value object implementations across features
- Inconsistent validation and behavior
- Harder maintenance when common types needed updates

## Decision

Decompose the monolithic `ActionRepository` into focused, single-responsibility services and establish a shared kernel for common value objects.

### Repository Decomposition

Replace the single `ActionRepository` with specialized services:

1. **CodeExecutionService**: Handles TypeScript/JavaScript execution
2. **HttpService**: Manages all HTTP operations (GET, POST, PUT, DELETE, PATCH)
3. **IntegrationService**: Handles external API integrations

### Shared Kernel Implementation

Create common value objects shared across all features:

1. **Id**: Numeric identifier with validation
2. **Name**: String value object with length constraints
3. **Email**: Email address with format validation
4. **Url**: URL value object with protocol validation

## Consequences

### Positive
- **Single Responsibility Principle**: Each service has one clear purpose
- **Improved testability**: Services can be tested in isolation
- **Better maintainability**: Changes to HTTP logic don't affect code execution
- **Enhanced reusability**: Services can be composed differently for different use cases
- **Shared kernel benefits**: Consistent behavior and reduced duplication
- **Type safety**: Strongly typed value objects prevent primitive obsession
- **Validation centralization**: Domain rules enforced in one place

### Negative
- **Additional abstraction**: More interfaces and services to understand
- **Initial complexity**: Slightly more complex dependency injection setup
- **Migration effort**: Existing code needs to be updated to use new services

### Neutral
- **Backward compatibility**: Old `ActionRepository` maintained for transition period
- **Gradual adoption**: Teams can migrate to new services incrementally

## Implementation

### Steps
1. ✅ Created shared kernel value objects with validation
2. ✅ Implemented `ICodeExecutionService` and `CodeExecutionService`
3. ✅ Implemented `IHttpService` and `HttpService` with all REST methods
4. ✅ Created `IIntegrationService` and `IntegrationService`
5. ✅ Built `RefactoredActionRepository` demonstrating improved architecture
6. ✅ Updated dependency injection to register new services
7. ✅ Created comprehensive test suite

### Files Affected

#### Shared Kernel
- `src/shared/domain/value-object/id.value-object.ts`
- `src/shared/domain/value-object/name.value-object.ts`
- `src/shared/domain/value-object/email.value-object.ts`
- `src/shared/domain/value-object/url.value-object.ts`
- `src/shared/domain/value-object/index.ts`

#### Service Interfaces
- `src/shared/domain/service/code-execution.service.interface.ts`
- `src/shared/domain/service/http.service.interface.ts`
- `src/shared/domain/service/integration.service.interface.ts`

#### Service Implementations
- `src/shared/infrastructure/service/code-execution.service.ts`
- `src/shared/infrastructure/service/http.service.ts`
- `src/shared/infrastructure/service/integration.service.ts`

#### Repository Refactoring
- `src/features/action/infrastructure/repository/refactored-action.repository.ts`

#### Dependency Injection
- `src/shared/infrastructure/di/factory.ts`

### Testing
- ✅ Comprehensive test suite for shared kernel value objects
- ✅ Service interface tests
- ✅ All tests passing (74 tests)
- ✅ No TypeScript compilation errors
- ✅ Code properly formatted and linted

## Notes

This ADR represents Phase 2 of the architecture improvement roadmap, building on the domain events foundation from Phase 1.

### Design Patterns Used
- **Single Responsibility Principle**: Each service has one clear purpose
- **Dependency Inversion**: Services depend on abstractions, not concretions
- **Value Object Pattern**: Encapsulating domain concepts with validation
- **Shared Kernel**: Common value objects across bounded contexts

### Migration Strategy
The refactoring maintains backward compatibility by keeping the original `ActionRepository` while introducing the new services. This allows for gradual migration:

1. New features should use the decomposed services
2. Existing features can be migrated incrementally
3. Old repository can be removed once migration is complete

### Performance Considerations
- Services are lightweight and focused
- Dependency injection overhead is minimal
- HTTP service uses modern fetch API
- Code execution service maintains VM isolation

Future enhancements could include:
- Service composition patterns for complex operations
- Circuit breaker patterns for external service calls
- Caching strategies for frequently accessed data
- Metrics and monitoring for service performance

---

*Implemented: Phase 2 (December 2024)*
*Status: Complete and operational*