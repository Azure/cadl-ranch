import { join, resolve } from "path";
import yargs from "yargs";
import { validateScenarios } from "../actions/index.js";
import { logger } from "../logger.js";
import "source-map-support/register.js";
import { serve } from "../actions/serve.js";
import { validateMockApis } from "../actions/validate-mock-apis.js";

export const DEFAULT_PORT = 3000;

async function main() {
  await yargs(process.argv.slice(2))
    .scriptName("cadl-ranch")
    .strict()
    .help()
    // .strict()
    .parserConfiguration({
      "greedy-arrays": false,
      "boolean-negation": false,
    })
    .option("debug", {
      type: "boolean",
      description: "Output debug log messages.",
      default: false,
    })
    .middleware((args) => {
      if (args.debug) {
        logger.level = "debug";
      }
    })
    .command(
      "validate-scenarios <scenariosPath>",
      "Compile and validate all the Cadl scenarios.",
      (cmd) => {
        return cmd.positional("scenariosPath", {
          description: "Path to the scenarios",
          type: "string",
          demandOption: true,
        });
      },
      async (args) => {
        await validateScenarios({
          scenariosPath: resolve(process.cwd(), args.scenariosPath),
        });
      },
    )
    .command(
      "serve <scenariosPath>",
      "Serve the mock api at the given paths.",
      (cmd) => {
        return cmd
          .positional("scenariosPath", {
            description: "Path to the scenarios and mock apis",
            type: "string",
            demandOption: true,
          })
          .option("port", {
            alias: "p",
            type: "number",
            description: "Port where to host the server",
            default: DEFAULT_PORT,
          })
          .option("coverageFile", {
            type: "string",
            description: "Path to the coverage file.",
            default: join(process.cwd(), "cadl-ranch-coverage.json"),
          });
      },
      async (args) => {
        await serve({
          scenariosPath: resolve(process.cwd(), args.scenariosPath),
          port: args.port,
          coverageFile: args.coverageFile,
        });
      },
    )
    .command(
      "validate-mock-apis <scenariosPath>",
      "Validate mock apis have all the scenarios specified",
      (cmd) => {
        return cmd.positional("scenariosPath", {
          description: "Path to the scenarios and mock apis",
          type: "string",
          demandOption: true,
        });
      },
      async (args) => {
        await validateMockApis({
          scenariosPath: resolve(process.cwd(), args.scenariosPath),
        });
      },
    )
    .demandCommand(1, "You must use one of the supported commands.")
    .parse();
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.log("Error", error);
  process.exit(1);
});
