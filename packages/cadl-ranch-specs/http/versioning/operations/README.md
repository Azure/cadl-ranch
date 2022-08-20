# Multi-version client operations tests

Tests for protocol-only operations in multi-version generated clients.

## Terminology

Service version can be specified when a client is constructed, so any client version can target its "latest" service version and all prior service versions.

For example, consider the following:

- v1 client is released with latest service version 2022-01-01
- v2 client is released with latest service version 2022-02-02

Then, the following are true:

- Client v1 can call api-version=2022-01-01 operations on the service
- Client v1 cannot call api-version=2022-02-02 operations on the service
- Client v2 can call api-version=2022-01-01 operations on the service
- Client v2 can call api-version=2022-02-02 operations on the service

## Scenarios

### Operation is added from v1 to v2

Cadl input

- [v1 client](./main-v1client.cadl)
- [v2 client](./main-v2client.cadl)

Test Cases

- Calling 2022-01-01 method from v1 client succeeds
- Calling 2022-01-01 method from v2 client succeeds with no modifications to calling code (created with api-version=latest)
- Calling 2022-01-01 method from v2 client succeeds (created with api-version=2022-02-02)
- Calling 2022-01-01 method from v2 client succeeds (created with api-version=2022-01-01)
- Calling 2022-02-02 method from v1 client fails (raises client-side exception)
- Calling 2022-02-02 method from v2 client succeeds (created with api-version=latest or api-version=2022-02-02)
- Calling 2022-02-02 method from v2 client where api-version=2022-01-01 fails (client-side exception)
- From v1 client, request routes use `api-version=2022-01-01`
- From v2 client created with api-version=latest, request routes include `api-version=2022-02-02`
- From v2 client created with api-version=2022-02-02, request routes include `api-version=2022-02-02`
- From v2 client created with api-version=2022-01-01, request routes include `api-version=2022-01-01`

### Optional input is added to parameter list in v1
