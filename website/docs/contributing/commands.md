---
sidebar_position: 3
---

# Commands

All commands are available in the `package.json` file. They are executed with `bun run <command>`.

| Command                  | Description                                                |
| ------------------------ | ---------------------------------------------------------- |
| `lint`                   | Run ESLint to check and fix code style issues              |
| `format`                 | Format code using Prettier                                 |
| `example <filter>`       | Run an example script matching the filter in watch mode    |
| `website`                | Start the website development server                       |
| `build:static`           | Build static website files                                 |
| `build:blog`             | Build blog content                                         |
| `build:guides`           | Build documentation guides                                 |
| `build`                  | Run all build commands (static, blog, and guides)          |
| `test`                   | Run unit tests with bail option                            |
| `test:watch`             | Run unit tests in watch mode                               |
| `test:snapshot`          | Update unit test snapshots                                 |
| `test:coverage`          | Run unit tests with coverage report                        |
| `e2e`                    | Run end-to-end tests using Playwright                      |
| `e2e:ui`                 | Run end-to-end tests with Playwright UI                    |
| `e2e:snapshot`           | Update Playwright snapshots                                |
| `e2e:report`             | Show Playwright test report                                |
| `db:generate:postgres`   | Generate PostgreSQL database schema using Drizzle          |
| `db:generate:sqlite`     | Generate SQLite database schema using Drizzle              |
| `db:generate`            | Generate both PostgreSQL and SQLite database schemas       |
| `auth:generate:postgres` | Generate PostgreSQL authentication schema                  |
| `auth:generate:sqlite`   | Generate SQLite authentication schema                      |
| `auth:generate`          | Generate both PostgreSQL and SQLite authentication schemas |
| `ui:add`                 | Add new UI components using shadcn                         |
| `release:test`           | Run semantic-release in dry-run mode                       |
