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

Alternative to start in background

```bash
cadl-ranch server start ./path/to/scenarios # Takes the same arguments as serve
```

### Stop running server

```bash
cadl-ranch server stop # Stop at the default port
cadl-ranch server stop --port  1234 # If started the server at another port
```

### Validate and merge coverage

```bash
# Minimal
cadl-ranch check-coverage ./path/to/scenarios

# Path to cadl-ranch config file for generator
cadl-ranch check-coverage ./path/to/scenarios --configFile ./cadl-ranch-config.yaml

# In case where there was multiple serve instance each creating their own coverage file
cadl-ranch check-coverage ./path/to/scenarios --coverageFiles ./path/to/*-coverage.json --coverageFiles ./other/to/*-coverage.json

# Specify where the merged coverage file should go
cadl-ranch check-coverage ./path/to/scenarios --mergedCoverageFile ./path/to/cadl-ranch-final-coverage.json
```

### Upload coverage

Upload the coverage. Upload from the `main` branch. DO NOT upload on PR this WILL override the latest index.

```bash
# Minimal
cadl-ranch upload-coverage --generatorName typescript --version=0.1.0

# Specify Coverage file
cadl-ranch upload-coverage --generatorName typescript --version=0.1.0  --coverageFile ./path/to/cadl-ranch-final-coverage.json
```

Options:

- `--storageAccountName`: Name of the storage account to publish coverage. Use `cadlranchcoverage` for Azure Cadl Ranch dashboard.
- `--generatorName`: Name of the generator. Must be one of `"python", "typescript", "csharp", "java"`
- `--generatorVersion`: Version of the generator
- `--coverageFile`: Path to the coverage file

#### Upload in azure devops

**This is applicable in the azure-sdk/internal ado project only.**

Add the following step

```yaml
- task: AzureCLI@2
  displayName: Upload scenario manifest
  inputs:
    azureSubscription: "Cadl Ranch Storage"
    scriptType: "bash"
    scriptLocation: "inlineScript"
    inlineScript: `cadl-ranch upload-coverage --storageAccountName azuresdkcadlranch ... FILL options fitting your generator here as described above...`
```
