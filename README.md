# Cadl Ranch

## Requirements

- Node 16+
- pnpm 7.5.2+

## Usage

See [usage docs](./docs/using-cadl-ranch.md)

## Develop

This project uses [pnpm workspaces](https://pnpm.io/workspaces) to manage multiple packages.

1. Install dependencies

```bash
pnpm install
```

2. Build

```bash
pnpm build
```

3. Build in watch mode(rebuild automatically on save)

```bash
pnpm watch
```

[Docs on writing scenarios specs](./docs/writing-scenario-spec.md)
[Docs on writing mock apis](./docs/writing-mock-apis.md)

### Other helpful commands

#### Clean

```bash
pnpm clean
```

#### Generate the scenario summary

```bash
pnpm generate-scenarios-summary
```

## Links

- [Cadl Ranch Specs](./packages/cadl-ranch-specs/) to work on scenarios and/or mock apis.

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

### Before making a Pull request

Make sure to run the following commands:

- `pnpm validate-scenarios`
- `pnpm validate-mock-apis`
- `pnpm generate-scenarios-summary`
- `pnpm format`
- `pnpm changeset add` or `pnpm changeset add --empty`
- `pnpm cspell`

Go through [PR checklist](./.github/pull_request_template.md)

### Release a new version

1. Run `pnpm changeset version` to bump the versions according to the changesets.
2. Make a new branch called `publish/<xyz>`
3. Make a PR and merge
4. The packages with a new version should get automatically bumped

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft
trademarks or logos is subject to and must follow
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.
