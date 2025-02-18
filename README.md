# La Tech Force Engine - Backend Generator

La Tech Force Engine is a backend generator from a JSON configuration, fast and easy.

## Requirements

- [Bun](https://bun.sh/) v1.2.0 or later
- [VS Code](https://code.visualstudio.com/) editor

## Getting Started

Clone the project, install project dependencies, and start contributing:

```
$ git clone https://github.com/latechforce/engine.git latechforce-engine
$ cd ./latechforce-engine
$ bun install
$ bun run test:e2e
$ bun run test:unit
```

The `bun run test` and `bun run test:integration` commands will not work because they require private environnement variables.
You can run this tests by pushing a commit to the repository.

**Important**: You need to have docker installed on your machine to run the e2e tests (you can use [Docker Desktop](https://docs.docker.com/desktop/)).

## Scripts

- `bun run format` — Format the code using Prettier
- `bun run lint` — Validate the code using ESLint
- `bun run clean` — Remove the `dist/` directory
- `bun run build:schema` —  Generate the JSON schema
- `bun run build` — Build the engine for production
- `bun run test:e2e` — Run the end-to-end tests with Bun
- `bun run test:unit` — Run the unit tests with Bun

## How to Update

- `bun upgrade` — Bump Bun to the latest version
- `bun update` — Update Node.js modules (dependencies)

## Hello World Example

Go to the [`examples/hello-world`](https://github.com/latechforce/engine/tree/main/examples/hello-world) folder, install dependencies, and start hacking:

```
$ cd ./examples/hello-world
$ bun install
$ bun start
```

You can find the Open API documentation at [`http://localhost:3000/api/docs`](http://localhost:3000/api/docs).

You can test the API at [`http://localhost:3000/api/docs#tag/automation/POST/api/automation/hello-world`](http://localhost:3000/api/docs#tag/automation/POST/api/automation/hello-world).

## Starter Kit

You can use our [starter kit](https://github.com/latechforce/engine-starter-kit) to start a new project.

## Configuration

A configuration is a JSON representation of the application. It contains the tables, automations, drivers, integrations, etc...

You can [explore the configuration here](https://json-schema.app/view/%23?url=https%3A%2F%2Fraw.githubusercontent.com%2Flatechforce%2Fengine%2Frefs%2Fheads%2Fmain%2Fschema%2Fapp.schema.json).

We invite you to navigate into the `examples/` folder to see some examples.

## Contributing

La Tech Force Engine is built and maintained by a small team – we'd love your help to fix bugs and add features!

You can read our [contributing guide here](https://github.com/latechforce/engine/blob/main/CONTRIBUTING.md) and our [code of conduct here](https://github.com/latechforce/engine/blob/main/CODE_OF_CONDUCT.md).

## License

Copyright (c) 2025-present Thomas JEANNEAU, La Tech Force (thomas.jeanneau@latechforce.com). This source code is licensed under the MIT license found in the [LICENSE](https://github.com/latechforce/engine/blob/main/LICENSE).
