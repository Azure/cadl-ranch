import { ScenarioManifest } from "@azure-tools/cadl-ranch-coverage-sdk";
import { FunctionComponent, useState } from "react";
import { getManifest } from "./apis.js";
import { Dashboard } from "./dashboard.js";
import { useEffectAsync } from "./utils.js";

export const App: FunctionComponent = () => {
  const [manifest, setManifest] = useState<ScenarioManifest | undefined>(undefined);

  useEffectAsync(async () => {
    const manifest = await getManifest();
    if (manifest) {
      setManifest(() => manifest);
    }
  }, []);
  return (
    <div>
      <h1>Cadl Ranch Coverage Dashboard</h1>
      {manifest ? <Dashboard manifest={manifest}></Dashboard> : "Loading"}
    </div>
  );
};
