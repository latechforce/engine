#!/usr/bin/env bun

import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'

interface FeatureOptions {
  name: string
  hasEntity?: boolean
  hasRepository?: boolean
  hasUseCase?: boolean
  hasController?: boolean
  hasFactory?: boolean
  hasEvents?: boolean
}

class FeatureGenerator {
  private featureName: string
  private featurePath: string
  private options: FeatureOptions

  constructor(options: FeatureOptions) {
    this.options = options
    this.featureName = options.name.toLowerCase()
    this.featurePath = join('src/features', this.featureName)

    // Validate feature name
    if (!/^[a-z][a-z0-9]*$/.test(this.featureName)) {
      throw new Error('Feature name must be lowercase alphanumeric starting with a letter')
    }
  }

  generate(): void {
    console.log(`🚀 Generating feature: ${this.featureName}`)

    // Check if feature already exists
    if (existsSync(this.featurePath)) {
      throw new Error(`Feature '${this.featureName}' already exists`)
    }

    // Create directory structure
    this.createDirectoryStructure()

    // Generate files based on options
    if (this.options.hasEntity) this.generateDomainEntity()
    if (this.options.hasRepository) this.generateRepositoryInterface()
    if (this.options.hasUseCase) this.generateUseCase()
    if (this.options.hasController) this.generateController()
    if (this.options.hasFactory) this.generateFactory()
    if (this.options.hasEvents) this.generateDomainEvents()

    // Always generate basic structure
    this.generateDomainIndex()
    this.generateApplicationIndex()
    this.generateInfrastructureIndex()
    this.generateRoutes()

    console.log(`✅ Feature '${this.featureName}' generated successfully!`)
    console.log(`📁 Location: ${this.featurePath}`)
    console.log('')
    console.log('Next steps:')
    console.log('1. Update the main factory to include your new feature')
    console.log('2. Add your routes to the main application router')
    console.log('3. Write tests for your new feature')
    console.log('4. Update aggregate boundaries documentation if needed')
  }

  private createDirectoryStructure(): void {
    const dirs = [
      this.featurePath,
      join(this.featurePath, 'domain'),
      join(this.featurePath, 'domain/entity'),
      join(this.featurePath, 'domain/repository-interface'),
      join(this.featurePath, 'domain/value-object'),
      join(this.featurePath, 'domain/event'),
      join(this.featurePath, 'application'),
      join(this.featurePath, 'application/dto'),
      join(this.featurePath, 'application/use-case'),
      join(this.featurePath, 'application/di'),
      join(this.featurePath, 'infrastructure'),
      join(this.featurePath, 'infrastructure/repository'),
      join(this.featurePath, 'infrastructure/service'),
      join(this.featurePath, 'infrastructure/di'),
      join(this.featurePath, 'interface'),
      join(this.featurePath, 'interface/controller'),
      join(this.featurePath, 'interface/dto'),
    ]

    dirs.forEach((dir) => {
      mkdirSync(dir, { recursive: true })
    })
  }

  private generateDomainEntity(): void {
    const className = this.capitalize(this.featureName)
    const content = `import { Id } from '../../../shared/domain/value-object/id.value-object'
import { Name } from '../../../shared/domain/value-object/name.value-object'

/**
 * ${className} domain entity
 * Represents a ${this.featureName} in the domain
 */
export class ${className} {
  constructor(
    public readonly id: Id,
    public readonly name: Name,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  /**
   * Update the ${this.featureName} name
   */
  updateName(name: Name): ${className} {
    return new ${className}(
      this.id,
      name,
      this.createdAt,
      new Date()
    )
  }

  /**
   * Check if the ${this.featureName} is recently created (within last hour)
   */
  isRecentlyCreated(): boolean {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
    return this.createdAt > oneHourAgo
  }

  /**
   * Convert to JSON representation
   */
  toJSON(): {
    id: number
    name: string
    createdAt: string
    updatedAt: string
  } {
    return {
      id: this.id.getValue(),
      name: this.name.getValue(),
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
    }
  }
}
`

    writeFileSync(join(this.featurePath, 'domain/entity', `${this.featureName}.entity.ts`), content)
  }

  private generateRepositoryInterface(): void {
    const className = this.capitalize(this.featureName)
    const content = `import type { ${className} } from '../entity/${this.featureName}.entity'
import type { Id } from '../../../shared/domain/value-object/id.value-object'

/**
 * Repository interface for ${className} aggregate
 * Defines the contract for ${this.featureName} data access
 */
export interface I${className}Repository {
  /**
   * Find a ${this.featureName} by ID
   */
  findById(id: Id): Promise<${className} | null>

  /**
   * Find all ${this.featureName}s
   */
  findAll(): Promise<${className}[]>

  /**
   * Save a ${this.featureName}
   */
  save(${this.featureName}: ${className}): Promise<${className}>

  /**
   * Delete a ${this.featureName} by ID
   */
  deleteById(id: Id): Promise<void>

  /**
   * Check if a ${this.featureName} exists by ID
   */
  existsById(id: Id): Promise<boolean>
}
`

    writeFileSync(
      join(
        this.featurePath,
        'domain/repository-interface',
        `${this.featureName}-repository.interface.ts`
      ),
      content
    )
  }

  private generateUseCase(): void {
    const className = this.capitalize(this.featureName)
    const content = `import type { I${className}Repository } from '../repository-interface/${this.featureName}-repository.interface'
import type { ${className} } from '../entity/${this.featureName}.entity'
import type { Id } from '../../../shared/domain/value-object/id.value-object'
import type { Name } from '../../../shared/domain/value-object/name.value-object'

export interface Create${className}Input {
  name: string
}

export interface Update${className}Input {
  id: number
  name: string
}

/**
 * Use case for managing ${this.featureName}s
 * Orchestrates business logic for ${this.featureName} operations
 */
export class ${className}UseCase {
  constructor(
    private readonly ${this.featureName}Repository: I${className}Repository
  ) {}

  /**
   * Create a new ${this.featureName}
   */
  async create(input: Create${className}Input): Promise<${className}> {
    const ${this.featureName} = new ${className}(
      new Id(0), // Will be assigned by repository
      new Name(input.name),
      new Date(),
      new Date()
    )

    return await this.${this.featureName}Repository.save(${this.featureName})
  }

  /**
   * Get a ${this.featureName} by ID
   */
  async getById(id: number): Promise<${className} | null> {
    return await this.${this.featureName}Repository.findById(new Id(id))
  }

  /**
   * Get all ${this.featureName}s
   */
  async getAll(): Promise<${className}[]> {
    return await this.${this.featureName}Repository.findAll()
  }

  /**
   * Update a ${this.featureName}
   */
  async update(input: Update${className}Input): Promise<${className}> {
    const existing = await this.${this.featureName}Repository.findById(new Id(input.id))
    if (!existing) {
      throw new Error(\`${className} with ID \${input.id} not found\`)
    }

    const updated = existing.updateName(new Name(input.name))
    return await this.${this.featureName}Repository.save(updated)
  }

  /**
   * Delete a ${this.featureName}
   */
  async delete(id: number): Promise<void> {
    const ${this.featureName}Id = new Id(id)
    const exists = await this.${this.featureName}Repository.existsById(${this.featureName}Id)
    
    if (!exists) {
      throw new Error(\`${className} with ID \${id} not found\`)
    }

    await this.${this.featureName}Repository.deleteById(${this.featureName}Id)
  }
}
`

    writeFileSync(
      join(this.featurePath, 'application/use-case', `${this.featureName}.use-case.ts`),
      content
    )
  }

  private generateController(): void {
    const className = this.capitalize(this.featureName)
    const content = `import { Hono } from 'hono'
import type { ${className}UseCase } from '../../application/use-case/${this.featureName}.use-case'

/**
 * HTTP controller for ${this.featureName} operations
 * Handles HTTP requests and responses for ${this.featureName} endpoints
 */
export class ${className}Controller {
  constructor(private readonly ${this.featureName}UseCase: ${className}UseCase) {}

  setupRoutes(): Hono {
    const app = new Hono()

    // GET /${this.featureName}s - List all ${this.featureName}s
    app.get('/', async (c) => {
      try {
        const ${this.featureName}s = await this.${this.featureName}UseCase.getAll()
        return c.json({
          data: ${this.featureName}s.map(${this.featureName} => ${this.featureName}.toJSON())
        })
      } catch (error) {
        return c.json(
          { 
            error: 'Failed to fetch ${this.featureName}s',
            details: error instanceof Error ? error.message : 'Unknown error'
          },
          500
        )
      }
    })

    // GET /${this.featureName}s/:id - Get ${this.featureName} by ID
    app.get('/:id', async (c) => {
      try {
        const id = parseInt(c.req.param('id'))
        if (isNaN(id)) {
          return c.json({ error: 'Invalid ID parameter' }, 400)
        }

        const ${this.featureName} = await this.${this.featureName}UseCase.getById(id)
        if (!${this.featureName}) {
          return c.json({ error: '${className} not found' }, 404)
        }

        return c.json({ data: ${this.featureName}.toJSON() })
      } catch (error) {
        return c.json(
          { 
            error: 'Failed to fetch ${this.featureName}',
            details: error instanceof Error ? error.message : 'Unknown error'
          },
          500
        )
      }
    })

    // POST /${this.featureName}s - Create new ${this.featureName}
    app.post('/', async (c) => {
      try {
        const body = await c.req.json()
        
        if (!body.name || typeof body.name !== 'string') {
          return c.json({ error: 'Name is required and must be a string' }, 400)
        }

        const ${this.featureName} = await this.${this.featureName}UseCase.create({
          name: body.name
        })

        return c.json({ data: ${this.featureName}.toJSON() }, 201)
      } catch (error) {
        return c.json(
          { 
            error: 'Failed to create ${this.featureName}',
            details: error instanceof Error ? error.message : 'Unknown error'
          },
          500
        )
      }
    })

    // PUT /${this.featureName}s/:id - Update ${this.featureName}
    app.put('/:id', async (c) => {
      try {
        const id = parseInt(c.req.param('id'))
        if (isNaN(id)) {
          return c.json({ error: 'Invalid ID parameter' }, 400)
        }

        const body = await c.req.json()
        
        if (!body.name || typeof body.name !== 'string') {
          return c.json({ error: 'Name is required and must be a string' }, 400)
        }

        const ${this.featureName} = await this.${this.featureName}UseCase.update({
          id,
          name: body.name
        })

        return c.json({ data: ${this.featureName}.toJSON() })
      } catch (error) {
        return c.json(
          { 
            error: 'Failed to update ${this.featureName}',
            details: error instanceof Error ? error.message : 'Unknown error'
          },
          500
        )
      }
    })

    // DELETE /${this.featureName}s/:id - Delete ${this.featureName}
    app.delete('/:id', async (c) => {
      try {
        const id = parseInt(c.req.param('id'))
        if (isNaN(id)) {
          return c.json({ error: 'Invalid ID parameter' }, 400)
        }

        await this.${this.featureName}UseCase.delete(id)
        return c.json({ message: '${className} deleted successfully' })
      } catch (error) {
        return c.json(
          { 
            error: 'Failed to delete ${this.featureName}',
            details: error instanceof Error ? error.message : 'Unknown error'
          },
          500
        )
      }
    })

    return app
  }
}
`

    writeFileSync(
      join(this.featurePath, 'interface/controller', `${this.featureName}.controller.ts`),
      content
    )
  }

  private generateFactory(): void {
    const className = this.capitalize(this.featureName)
    const content = `import type { SimpleContainer } from '../../shared/infrastructure/di/simple-container'
import { ${className}UseCase } from '../application/use-case/${this.featureName}.use-case'
import { ${className}Repository } from './repository/${this.featureName}.repository'
import { ${className}Controller } from '../interface/controller/${this.featureName}.controller'

/**
 * Factory for creating ${this.featureName} feature services
 * Manages dependency injection for the ${this.featureName} aggregate
 */
export function create${className}Services(container: SimpleContainer) {
  // Get shared dependencies
  const database = container.get('database')
  const logger = container.get('logger')

  // Create repository
  const ${this.featureName}Repository = new ${className}Repository(database, logger)

  // Create use case
  const ${this.featureName}UseCase = new ${className}UseCase(${this.featureName}Repository)

  // Create controller
  const ${this.featureName}Controller = new ${className}Controller(${this.featureName}UseCase)

  // Register in container
  container.set('${this.featureName}Repository', ${this.featureName}Repository)
  container.set('${this.featureName}UseCase', ${this.featureName}UseCase)
  container.set('${this.featureName}Controller', ${this.featureName}Controller)

  return {
    repository: ${this.featureName}Repository,
    useCase: ${this.featureName}UseCase,
    controller: ${this.featureName}Controller,
    routes: ${this.featureName}Controller.setupRoutes()
  }
}
`

    writeFileSync(join(this.featurePath, 'infrastructure', 'factory.ts'), content)
  }

  private generateDomainEvents(): void {
    const className = this.capitalize(this.featureName)

    // Created event
    const createdEventContent = `import type { DomainEvent } from '../../../../shared/domain/event/domain-event.interface'

/**
 * Domain event emitted when a ${this.featureName} is created
 */
export class ${className}CreatedEvent implements DomainEvent {
  public readonly aggregateType = '${this.featureName}'
  public readonly eventType = '${this.featureName}-created'
  public readonly occurredOn: Date

  constructor(
    public readonly aggregateId: string,
    public readonly payload: {
      ${this.featureName}Id: number
      name: string
    }
  ) {
    this.occurredOn = new Date()
  }
}
`

    // Updated event
    const updatedEventContent = `import type { DomainEvent } from '../../../../shared/domain/event/domain-event.interface'

/**
 * Domain event emitted when a ${this.featureName} is updated
 */
export class ${className}UpdatedEvent implements DomainEvent {
  public readonly aggregateType = '${this.featureName}'
  public readonly eventType = '${this.featureName}-updated'
  public readonly occurredOn: Date

  constructor(
    public readonly aggregateId: string,
    public readonly payload: {
      ${this.featureName}Id: number
      previousName: string
      newName: string
    }
  ) {
    this.occurredOn = new Date()
  }
}
`

    // Deleted event
    const deletedEventContent = `import type { DomainEvent } from '../../../../shared/domain/event/domain-event.interface'

/**
 * Domain event emitted when a ${this.featureName} is deleted
 */
export class ${className}DeletedEvent implements DomainEvent {
  public readonly aggregateType = '${this.featureName}'
  public readonly eventType = '${this.featureName}-deleted'
  public readonly occurredOn: Date

  constructor(
    public readonly aggregateId: string,
    public readonly payload: {
      ${this.featureName}Id: number
      name: string
    }
  ) {
    this.occurredOn = new Date()
  }
}
`

    writeFileSync(
      join(this.featurePath, 'domain/event', `${this.featureName}-created.event.ts`),
      createdEventContent
    )

    writeFileSync(
      join(this.featurePath, 'domain/event', `${this.featureName}-updated.event.ts`),
      updatedEventContent
    )

    writeFileSync(
      join(this.featurePath, 'domain/event', `${this.featureName}-deleted.event.ts`),
      deletedEventContent
    )
  }

  private generateDomainIndex(): void {
    const content = `// Domain exports for ${this.featureName} feature
export * from './entity/${this.featureName}.entity'
export * from './repository-interface/${this.featureName}-repository.interface'
${
  this.options.hasEvents
    ? `export * from './event/${this.featureName}-created.event'
export * from './event/${this.featureName}-updated.event'
export * from './event/${this.featureName}-deleted.event'`
    : ''
}
`

    writeFileSync(join(this.featurePath, 'domain', 'index.ts'), content)
  }

  private generateApplicationIndex(): void {
    const content = `// Application exports for ${this.featureName} feature
${this.options.hasUseCase ? `export * from './use-case/${this.featureName}.use-case'` : ''}
`

    writeFileSync(join(this.featurePath, 'application', 'index.ts'), content)
  }

  private generateInfrastructureIndex(): void {
    const content = `// Infrastructure exports for ${this.featureName} feature
${this.options.hasFactory ? `export * from './factory'` : ''}
`

    writeFileSync(join(this.featurePath, 'infrastructure', 'index.ts'), content)
  }

  private generateRoutes(): void {
    const content = `import { Hono } from 'hono'

/**
 * Routes configuration for ${this.featureName} feature
 */
export const ${this.featureName}Routes = new Hono()

// TODO: Configure your ${this.featureName} routes here
// Example:
// ${this.featureName}Routes.route('/${this.featureName}s', ${this.featureName}Controller.setupRoutes())
`

    writeFileSync(join(this.featurePath, 'interface', 'routes.ts'), content)
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
}

// CLI interface
function showHelp(): void {
  console.log(`
🏗️  Feature Generator - LaTeChforce Engine

Usage: bun run generate:feature <feature-name> [options]

Arguments:
  feature-name    Name of the feature to generate (lowercase, alphanumeric)

Options:
  --entity        Generate domain entity
  --repository    Generate repository interface
  --use-case      Generate use case
  --controller    Generate HTTP controller
  --factory       Generate dependency injection factory
  --events        Generate domain events
  --full          Generate all components (entity, repository, use-case, controller, factory, events)
  --help          Show this help message

Examples:
  bun run generate:feature product --full
  bun run generate:feature notification --entity --repository --use-case
  bun run generate:feature webhook --controller --factory

Generated Structure:
  src/features/<feature-name>/
  ├── domain/
  │   ├── entity/
  │   ├── repository-interface/
  │   ├── value-object/
  │   └── event/
  ├── application/
  │   ├── dto/
  │   ├── use-case/
  │   └── di/
  ├── infrastructure/
  │   ├── repository/
  │   ├── service/
  │   └── di/
  └── interface/
      ├── controller/
      └── dto/
`)
}

function main(): void {
  const args = process.argv.slice(2)

  if (args.length === 0 || args.includes('--help')) {
    showHelp()
    process.exit(0)
  }

  const featureName = args[0]
  if (!featureName) {
    console.error('❌ Feature name is required')
    showHelp()
    process.exit(1)
  }

  const options: FeatureOptions = {
    name: featureName,
    hasEntity: args.includes('--entity') || args.includes('--full'),
    hasRepository: args.includes('--repository') || args.includes('--full'),
    hasUseCase: args.includes('--use-case') || args.includes('--full'),
    hasController: args.includes('--controller') || args.includes('--full'),
    hasFactory: args.includes('--factory') || args.includes('--full'),
    hasEvents: args.includes('--events') || args.includes('--full'),
  }

  try {
    const generator = new FeatureGenerator(options)
    generator.generate()
  } catch (error) {
    console.error('❌ Generation failed:', error instanceof Error ? error.message : 'Unknown error')
    process.exit(1)
  }
}

if (import.meta.main) {
  main()
}
