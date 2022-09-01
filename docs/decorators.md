## Cadl Ranch decorators

### `@scenarioService`

Decorator setting up the boilerplate for specs service namespace. Will automatically set:

- `@serviceTitle` using the namespace as a value
- `@serviceVersion` to `1.0.0`
- `@server` to `localhost:3000`
- `@route` using the parameter passed.

Usage:

```cadl
@scenarioSpec("/my-spec")
namespace MySpec;

```

### `@scenario`

Mark an operation, interface or namespace as a scenario. Optionally can provide the name of the scenario.

### `@scenarioDoc`

Specify how to implement this scenario. Value is markdown. Differ from @doc which describe the scenario to the end user.

### `@supportedBy`

Specify if something is supported only by some kind of SDK. Option: `arm`, `dpg`. By default everything.
