import { FunctionComponent, useState } from "react";
import { CoverageSummary, getCoverageSummary } from "./apis.js";
import { Dashboard } from "./components/dashboard.js";
import { useEffectAsync } from "./utils.js";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

export const App: FunctionComponent = () => {
  const [coverageSummary, setCoverageSummary] = useState<CoverageSummary | undefined>(undefined);

  useEffectAsync(async () => {
    const coverageSummary = await getCoverageSummary();

    if (coverageSummary) {
      setCoverageSummary(() => coverageSummary);
    }
  }, []);
  return (
    <FluentProvider theme={webLightTheme}>
      <div>{coverageSummary ? <Dashboard coverageSummary={coverageSummary}></Dashboard> : "Loading"}</div>
    </FluentProvider>
  );
};
