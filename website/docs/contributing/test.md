---
sidebar_position: 5
---

# Test & development

We aim to follow a [Test-Driven Development (TDD)](https://en.wikipedia.org/wiki/Test-driven_development) approach to develop the project.

## Philosophy

We use our end-to-end tests to document the features of the project.

Each test is based on a example configuration.

Example configurations and end-to-end tests are following the same folder structure.

There are used in the documentation as guides, so they should be as complete as possible.

## How to develop a new feature?

1. Create a new example that demonstrates the feature.
2. Create the end-to-end for the feature.
3. Implement the feature, using unit tests if needed.
4. Run the tests to ensure the feature works.
5. Write the documentation for the feature.

## Where to write tests?

### Examples

We use examples to demonstrate the features of the project.
They are used to write our end-to-end, unit tests and documentation guides.
All examples are located in the `example` directory.

You can run all examples with the following command:

```bash
bun run example
```

You can also run a specific example with the following command:

```bash
bun run example <filter>
```

The filter is a regular expression that matches the example name.

### End-to-end tests

We use [Playwright](https://playwright.dev/) to write end-to-end tests.
All end-to-end tests are located in the `e2e` directory.
Each test location should be following the `example` folder structure.

You can run all end-to-end tests with the following command:

```bash
bun run e2e
```

You can also run a specific end-to-end test with the following command:

```bash
bun run e2e <filter>
```

The filter is a regular expression that matches the test name.

### Unit tests

We use [Bun Test](https://bun.sh/docs/testing) to write unit tests.
All unit tests are located in the `test` directory.

You can run all unit tests with the following command:

```bash
bun run test
```

You can also run a specific unit test with the following command:

```bash
bun run test <filter>
```

The filter is a regular expression that matches the test name.
