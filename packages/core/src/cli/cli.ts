import yargs from "yargs";
import { validateScenarios } from "../actions/index.js";

async function main() {
  await yargs(process.argv.slice(2))
    .scriptName("cadl-testserver")
    .help()
    .strict()
    .parserConfiguration({
      "greedy-arrays": false,
      "boolean-negation": false,
    })
    .option("debug", {
      type: "boolean",
      description: "Output debug log messages.",
      default: false,
    })
    .command(
      "validate-scenarios",
      "Compile and validate all the Cadl scenarios.",
      (cmd) => {
        return cmd.positional("scenariosPath", {
          description: "Path to the scenarios",
          type: "string",
          demandOption: true,
        });
      },
      async (args) => {
        await validateScenarios(args);
      },
    ).argv;
}

main().catch((error) => {
  console.log("Error", error);
  process.exit(1);
});
