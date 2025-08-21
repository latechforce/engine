# Aggregate Boundaries Definition

This document defines the aggregate boundaries for the LaTeChforce Engine to improve encapsulation and maintain consistency within the domain.

## Aggregates

### 1. Content Aggregate
- **Root**: Table
- **Entities**: Record, Field
- **Boundary**: All operations on records and fields must go through the Table aggregate root
- **Responsibility**: Managing table structure, record lifecycle, and field validation

### 2. Automation Aggregate  
- **Root**: Automation
- **Entities**: Action, Trigger
- **Boundary**: All automation execution must be controlled through the Automation aggregate root
- **Responsibility**: Managing automation workflows, trigger conditions, and action execution

### 3. Storage Aggregate
- **Root**: Bucket
- **Entities**: Object
- **Boundary**: All file storage operations must go through the Bucket aggregate root
- **Responsibility**: Managing file storage, object lifecycle, and access control

### 4. Integration Aggregate
- **Root**: Connection
- **Entities**: Token
- **Boundary**: All external integrations must use the Connection aggregate root
- **Responsibility**: Managing external service connections, authentication, and API access

### 5. Application Aggregate
- **Root**: App
- **Entities**: Form, User
- **Boundary**: Application configuration and user management through the App aggregate root
- **Responsibility**: Managing application configuration, forms, and user access

## Rules

1. **Aggregate Consistency**: Changes within an aggregate must be consistent
2. **Cross-Aggregate Communication**: Use domain events for communication between aggregates
3. **Transaction Boundaries**: Transactions should not span multiple aggregates
4. **Reference by ID**: Aggregates should reference other aggregates by ID only, not by direct object reference

## Benefits

- **Improved Encapsulation**: Clear boundaries prevent unwanted coupling
- **Better Testability**: Each aggregate can be tested in isolation
- **Scalability**: Aggregates can be distributed across different services
- **Consistency**: Clear rules for maintaining data integrity