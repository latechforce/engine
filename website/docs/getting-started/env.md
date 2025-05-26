---
sidebar_position: 3
---

# Env

LTF Engine can be configured with an `.env` file in addition to the configuration file.

## NODE_ENV

The `NODE_ENV` environment variable is used to set the environment. You can choose between `development`, `production` and `test`.

```env
NODE_ENV=development
```

Default: `development`

## PORT

The `PORT` environment variable is used to set the port on which the server will run. You can use `*` to automatically find an available port.

```env
PORT=5678
```

Default: `3000`

## BASE_URL

The `BASE_URL` environment variable is used to set the base URL of the application.

```env
BASE_URL=https://my-app.com
```

Default: `http://localhost:{PORT}`

## LOG_LEVEL

The `LOG_LEVEL` environment variable is used to set the log level. You can choose between `silent`, `error`, `debug`, `info`, and `http`.

```env
LOG_LEVEL=info
```

Default: `http`

## DATABASE_PROVIDER

The `DATABASE_PROVIDER` environment variable is used to set the database provider. You can choose between `sqlite` and `postgres`.

```env
DATABASE_PROVIDER=postgres
```

Default: `sqlite`

## DATABASE_URL

The `DATABASE_URL` environment variable is used to set the database URL.

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres
```

Default: `./data/sqlite.db`

## AUTH_ADMIN_EMAIL

The `AUTH_ADMIN_EMAIL` environment variable is used to set the admin email.

```env
AUTH_ADMIN_EMAIL=admin@admin.com
```

Default: `admin@admin.com`

## AUTH_ADMIN_PASSWORD

The `AUTH_ADMIN_PASSWORD` environment variable is used to set the admin password.

```env
AUTH_ADMIN_PASSWORD=admin
```

Default: `admin`

> Should be set for production environment.

## AUTH_ADMIN_NAME

The `AUTH_ADMIN_NAME` environment variable is used to set the admin name.

```env
AUTH_ADMIN_NAME=admin
```

Default: `admin`

## AUTH_SECRET

The `AUTH_SECRET` environment variable is used to set the secret key for the authentication.

```env
AUTH_SECRET=72f83bbf-42a0-4dce-a7c1-f427f76c0641
```

Default: `secret`

> Should be set for production environment.

## SENTRY_DSN

The `SENTRY_DSN` environment variable is used to set the Sentry DSN.

```env
SENTRY_DSN=https://examplePublicKey@o0.ingest.sentry.io/0
```
