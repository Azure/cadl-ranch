import { FunctionComponent, useState } from "react";
import { CoverageSummaryAllTypes, getCoverageSummary } from "./apis.js";
import { Dashboard } from "./components/dashboard.js";
import { useEffectAsync } from "./utils.js";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

export const App: FunctionComponent = () => {
  const [coverageSummaryAllTypes, setCoverageSummaryAllTypes] = useState<CoverageSummaryAllTypes | undefined>(undefined);

  useEffectAsync(async () => {
    const coverageSummaryAllTypes = await getCoverageSummary();

    if (coverageSummaryAllTypes) {
      setCoverageSummaryAllTypes(() => coverageSummaryAllTypes);
    }
  }, []);
  return (
    <FluentProvider theme={webLightTheme}>
      <div>{coverageSummaryAllTypes ? <Dashboard coverageSummaryAllTypes={coverageSummaryAllTypes}></Dashboard> : "Loading"}</div>
    </FluentProvider>
  );
};
