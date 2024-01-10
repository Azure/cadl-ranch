import { FunctionComponent } from "react";
import { CoverageSummary, CoverageSummaryAllTypes } from "../apis.js";
import { DashboardTable } from "./dashboard-table.js";
import { ResolvedCoverageReport } from "@azure-tools/cadl-ranch-coverage-sdk";
export interface DashboardProps {
  coverageSummaryAllTypes: CoverageSummaryAllTypes;
}

export const Dashboard: FunctionComponent<DashboardProps> = ({ coverageSummaryAllTypes }) => {
  const coverageSummaries: CoverageSummary[] = [];
  for (const type of coverageSummaryAllTypes.manifest.types) {
    const generatorReports: Record<string, ResolvedCoverageReport | undefined> = {};
    for (const name in coverageSummaryAllTypes.generatorReports) {
      const reports = coverageSummaryAllTypes.generatorReports[name as keyof typeof coverageSummaryAllTypes.generatorReports];
      const report = reports?.find(report => report.generatorMetadata.type === type);
      generatorReports[name] = report;
    }
    coverageSummaries.push({
      manifest: coverageSummaryAllTypes.manifest,
      generatorReports,
      type,
    });
  }

  const summaryTables = coverageSummaries.map(coverageSummary => 
    <DashboardTable coverageSummary={coverageSummary} />
  );

  return (
    <div>
      <h1>Cadl Ranch Coverage Dashboard</h1>
      <div>
        Commit:{" "}
        <a href={`https://github.com/Azure/cadl-ranch/commit/${coverageSummaryAllTypes.manifest.commit}`}>
          {coverageSummaryAllTypes.manifest.commit.slice(0, 6)}
        </a>
      </div>
      <div>Version: {coverageSummaryAllTypes.manifest.version}</div>
      <div>Scenario count: {coverageSummaryAllTypes.manifest.scenarios.length}</div>
      <div>Types: {coverageSummaryAllTypes.manifest.types.length}</div>      
      {summaryTables}
    </div>
  );
};
