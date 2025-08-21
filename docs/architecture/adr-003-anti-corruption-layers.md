# ADR-003: Anti-Corruption Layers and Architecture Testing

## Status

Accepted (Implemented in Phase 3)

## Context

The system was vulnerable to external API changes and lacked protection for the domain model:

1. **Domain pollution**: External API data structures were directly used in domain logic
2. **Tight coupling**: Domain entities depended on external service formats
3. **Breaking changes**: External API changes could break domain logic
4. **Testing difficulties**: Hard to test domain logic without external dependencies
5. **Architecture drift**: No automated way to prevent architectural violations
6. **Boundary violations**: Cross-feature imports still possible despite domain events

Example problems:
- Airtable webhook structures directly used in domain entities
- Google Sheets API responses mixed with domain logic
- No protection against future API changes
- Violation of hexagonal architecture principles

## Decision

Implement comprehensive anti-corruption layers to protect the domain from external API changes and add automated architecture testing to prevent degradation.

### Anti-Corruption Layer Framework

Create a standardized framework for transforming external data:

1. **IAntiCorruptionLayer**: Interface defining transformation contracts
2. **BaseAntiCorruptionLayer**: Common functionality with error handling
3. **Service-specific layers**: Implementations for each external service
4. **Domain entities**: Clean domain representations of external data

### Architecture Testing Framework

Implement automated tests to enforce architectural boundaries:

1. **Cross-feature import prevention**: No direct imports between features
2. **Layer isolation**: Domain layer cannot import infrastructure
3. **Aggregate boundaries**: Validate proper aggregate design
4. **Anti-corruption usage**: Ensure external APIs use protection layers

## Consequences

### Positive
- **Domain integrity**: Domain logic protected from external API changes
- **Improved testability**: Mock external services easily with clean interfaces
- **Better maintainability**: Changes to external APIs isolated to anti-corruption layers
- **Architecture enforcement**: Automated tests prevent architectural degradation
- **Clear boundaries**: Explicit separation between external and domain data
- **Future-proofing**: System can adapt to external API changes without domain changes
- **Compliance**: Adherence to hexagonal architecture and DDD principles

### Negative
- **Additional abstraction**: More layers between external services and domain
- **Initial setup complexity**: Requires understanding of transformation patterns
- **Mapping overhead**: Need to maintain transformations for each external service

### Neutral
- **Learning curve**: Team needs to understand anti-corruption layer patterns
- **Test maintenance**: Architecture tests need updates when structure changes

## Implementation

### Steps
1. ✅ Created anti-corruption layer framework with interfaces and base classes
2. ✅ Implemented Airtable anti-corruption layer for webhooks and records
3. ✅ Implemented Google Sheets anti-corruption layer for spreadsheet operations
4. ✅ Created domain entities for external data protection
5. ✅ Built comprehensive architecture testing framework
6. ✅ Updated factories to register anti-corruption layers
7. ✅ Created extensive test coverage

### Files Affected

#### Anti-Corruption Layer Framework
- `src/shared/domain/anti-corruption/anti-corruption-layer.interface.ts`
- `src/shared/domain/anti-corruption/base-anti-corruption-layer.ts`
- `src/shared/domain/anti-corruption/airtable-anti-corruption-layer.ts`
- `src/shared/domain/anti-corruption/google-sheets-anti-corruption-layer.ts`

#### Domain Entity Protection
- `src/shared/domain/entity/external-webhook.entity.ts`
- `src/shared/domain/entity/external-record.entity.ts`
- `src/shared/domain/entity/external-spreadsheet.entity.ts`

#### Architecture Testing
- `test/architecture/architecture-rules.test.ts`

#### Factory Integration
- `src/shared/infrastructure/di/factory.ts`

#### Test Coverage
- `test/shared/domain/anti-corruption/airtable-anti-corruption-layer.test.ts`
- `test/shared/domain/anti-corruption/google-sheets-anti-corruption-layer.test.ts`

### Testing
- ✅ Comprehensive test suite for all anti-corruption layers
- ✅ Architecture boundary enforcement tests
- ✅ All tests passing (105 tests across 14 files)
- ✅ Zero TypeScript compilation errors
- ✅ Zero ESLint violations

## Implementation Details

### Anti-Corruption Layer Pattern

```typescript
// External service data (Airtable webhook)
interface AirtableWebhook {
  id: string
  isHookEnabled: boolean
  notificationUrl: string
  // ... external-specific fields
}

// Domain representation
class ExternalWebhook {
  constructor(
    public readonly id: Id,
    public readonly notificationUrl: Url | null,
    public readonly isEnabled: boolean,
    // ... domain-focused fields
  ) {}
}

// Anti-corruption layer
class AirtableAntiCorruptionLayer {
  toDomain(external: AirtableWebhook): ExternalWebhook {
    // Transform external format to domain format
  }
  
  toExternal(domain: ExternalWebhook): AirtableWebhook {
    // Transform domain format to external format  
  }
}
```

### Architecture Testing

The architecture testing framework automatically verifies:

- **Domain Layer Isolation**: No imports from infrastructure or application layers
- **Cross-Feature Boundaries**: No direct imports between feature domains
- **Aggregate Compliance**: Proper aggregate boundary adherence
- **Anti-Corruption Usage**: External integrations use protection layers

### Service Integration

Anti-corruption layers are registered in the dependency injection container and available throughout the application for transforming external data safely.

## Notes

This ADR represents Phase 3 of the architecture improvement roadmap, building on domain events (Phase 1) and service decomposition (Phase 2).

### Design Patterns Used
- **Anti-Corruption Layer**: Protects domain from external changes
- **Adapter Pattern**: Transforms between external and domain formats
- **Factory Pattern**: Creates anti-corruption layers through DI
- **Template Method**: Base class provides common transformation logic

### External Services Protected
1. **Airtable**: Webhooks, records, and API responses
2. **Google Sheets**: Spreadsheet operations and data formats

### Architecture Enforcement
The automated architecture tests run on every build, ensuring:
- No architectural violations are introduced
- Boundaries remain clean and well-defined
- New features follow established patterns
- External dependencies are properly abstracted

Future enhancements could include:
- Additional anti-corruption layers for new external services
- Event-driven transformation pipelines
- Versioning strategies for external API changes
- Performance optimization for large data transformations

---

*Implemented: Phase 3 (December 2024)*
*Status: Complete and operational*