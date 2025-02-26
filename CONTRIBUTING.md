# Contribution Guidelines

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

This document proposes guidelines for contributing to the La Tech Force Engine repository.

The objectives of the guidelines are:

- Make sure that contributing is an enjoyable experience, and that contributors are respected. (e.g. avoid endless discussions and flame wars)
- Make sure that the quality of the codebase increases over time. (or at least remains stable)
- Make sure that contributions solve more problems than they create. (e.g. a "fix" that was not tested properly will cause long discussions)
- Make sure to not wasting other contributors' time.

These are just guidelines, not rules, use your best judgment and feel free to propose changes to this document in a pull request.

## What to contribute

You can contribute to La Tech Force Engine in various ways:

- Fix bugs or contribute to the development of features on which help is wanted: [see our To Do list](https://github.com/orgs/latechforce/projects/1)
- Submit Github issues for bugs you (or other users) found ([template](https://github.com/latechforce/engine/issues/new?assignees=&labels=&projects=&template=bug_report.md&title=))
- Give feedback, suggest feature and/or provide value in ongoing discussions in [issues](https://github.com/latechforce/engine/issues) and [pull requests](https://github.com/latechforce/engine/pulls)

> **Working on your first Pull Request?** You can learn how from this _free_ series [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github). And don't hesitate to ask for assistance by posting a message in any of the Github issues that you would like to contribute to.

## How to contribute to the code base

1. Fork and clone the [@latechforce\_/engine repository](https://github.com/latechforce/engine), and make sure it runs properly on your computer
2. Inform other contributors that you intend to contribute by posting a comment to the Github issue of your choice. Don't hesitate to ask questions if needed.
3. Make changes in your local copy of the code, run automated tests, commit, then [submit a Pull Request](https://github.com/latechforce/engine/compare)
4. Wait for your PR to be reviewed and merged into the `main` branch of La Tech Force Engine's repository
5. Be available to reply if a contributor gets involved in the reviewing process of your PR.

## Creating New Integrations and Actions

When contributing new integrations or integration actions, we provide templates to ensure consistency:

### New Integration

To create a new integration, use the template provided in `.cursor/new-integration.md`. This template will guide you through:

- Setting up the integration structure
- Implementing required interfaces
- Creating necessary test files
- Adding proper error handling
- Setting up configuration

### New Integration Action

For adding new actions to existing integrations, refer to `.cursor/new-integration-action.md`. This template covers:

- Action implementation structure
- Required parameters and return types
- Error handling patterns
- Test case setup
- Documentation requirements

## Acceptance criteria for Pull Requests (PR)

- A PR must address just one Github issue. Any PR that address zero or more than one Github issue (e.g. "cleaned .gitignore and added installation guide" are two independant PR) will be rejected.
- A PR must not break any functionality of the product. Every precaution (e.g. writing and running automated tests) must be taken to avoid that.

## Core principles

More generally, make sure to follow these three principles:

- Keep your PRs short
- Keep your PRs simple
- Avoid submitting PRs that may cause long discussions with the PR reviewer and/or other contributors

🤗 Beginners, you are welcome too! Don't be afraid, sending a PR is a great way to learn. You will probably be reassured by this article: [How To Win Friends And Make Pull Requests On GitHub](http://readwrite.com/2014/07/02/github-pull-request-etiquette/), and don't hesitate to ask for help.

## Code guidelines

- Optimize for search: [Like in the React.js project](https://facebook.github.io/react/contributing/design-principles.html), we want to make it easy for contributors to search for symbols (constants, variables and function names). So don't hesitate to give them verbose/specific names.

## Project Structure

The codebase follows Clean Architecture patterns with the following structure:

- **src/** Source code
  - **/domain** Core business logic and entities
    - **/entities** Domain entities (Action, App, Field, File, etc.)
    - **/services** Core services (CodeCompiler, Logger, Server, etc.)
    - **/integrations** Integration interfaces and types
    - **/interfaces** Configuration interfaces
  - **/adapter** Interface adapters
    - **/api** API layer and mappers
    - **/spi** Service Provider Interfaces for drivers and integrations
  - **/infrastructure** External implementations
    - **/drivers** Driver implementations (Database, Server, etc.)
      - **/bun** Bun-specific drivers
      - **/common** Shared driver implementations
    - **/integrations** Integration implementations
      - **/bun** Bun-specific integrations
      - **/common** Shared integration implementations
- **test/** Test utilities and e2e tests
- **schema/** JSON schema definitions
- **.cursor/** Templates for new code components
- **examples/** Example applications and implementations

## Contact information

You can contact Thomas JEANNEAU by email at: thomas.jeanneau@latechforce.com
