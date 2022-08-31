# Using Cadl Ranch

Install `cadl-ranch` CLI globally or as a local dependency:

- **Globally**: run `npm install -g @azure-tools/cadl-ranch`. You can then use `cadl-ranch` as a CLI tool.
- **Locally**: run `npm install @azure-tools/cadl-ranch` which should add the dependency to package.json. You can then use `cadl-ranch` with `npx cadl-ranch`.

**NOTE** With local install you'll need to prefix `cadl-ranch` with `npx`(unless commands are written directly as npm scripts)

## Test against scenarios

### Cadl Ranch Config

Cadl ranch supports a config file where you can configure scenarios that are not supported by your generator.

Create a `cadl-ranch-config.yaml` file.

```yaml
# List of unsupported scenarios
unsupportedScenarios:
  - Foo_Bar
```

### Run mock api server

```bash
# Minimal
cadl-ranch serve ./path/to/scenarios

# Change the port
cadl-ranch serve ./path/to/scenarios --port 1234

# Specify where the coverage file should go
cadl-ranch serve ./path/to/scenarios --coverageFile ./path/to/cadl-ranch-coverage.json
```

### Validate and merge coverage

```bash
# Minimal
cadl-ranch check-coverage ./path/to/scenarios

# Path to cadl-ranch config file for generator
cadl-ranch serve ./path/to/scenarios --configFile ./cadl-ranch-config.yaml

# In case where there was multiple serve instance each creating their own coverage file
cadl-ranch serve ./path/to/scenarios --coverageFiles ./path/to/*-coverage.json --coverageFiles ./other/to/*-coverage.json

# Specify where the merged coverage file should go
cadl-ranch serve ./path/to/scenarios --mergedCoverageFile ./path/to/cadl-ranch-final-coverage.json
```
