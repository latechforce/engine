---
sidebar_position: 5
---

# Architecture

## Overview

We aim to follow a [clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) approach to structure the project.

The core business logic is located in the `src/domain` directory.

The `src/application` directory contains the features of the project.

The `src/infrastructure` directory contains the validators, server, database, authentication, and other external services.

The `src/interface` directory contains the controllers, middlewares, routes, and other interfaces.

The `src/client` directory contains the client code as a React application.
