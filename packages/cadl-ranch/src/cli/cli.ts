import { resolve } from "path";
import yargs from "yargs";
import { validateScenarios } from "../actions/index.js";
import { logger } from "../logger.js";

async function main() {
  await yargs(process.argv.slice(2))
    .scriptName("cadl-ranch")
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
    .demandCommand(1, "You must use one of the supported commands.")
    .parse();
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.log("Error", error);
  process.exit(1);
});
