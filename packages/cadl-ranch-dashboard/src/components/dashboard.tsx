import { FunctionComponent } from "react";
import { CoverageSummary } from "../apis.js";
import { DashboardTable } from "./dashboard-table.js";
export interface DashboardProps {
  coverageSummaries: CoverageSummary[];
}

export const Dashboard: FunctionComponent<DashboardProps> = ({ coverageSummaries }) => {
  const summaryTables = coverageSummaries.map(coverageSummary => 
    <DashboardTable coverageSummary={coverageSummary} />
  );

  return (
    <div>
      <h1>Cadl Ranch Coverage Dashboard</h1>
      <div>
        Commit:{" "}
        <a href={`https://github.com/Azure/cadl-ranch/commit/${coverageSummaries[0].manifest.commit}`}>
          {coverageSummaries[0].manifest.commit.slice(0, 6)}
        </a>
      </div>
      <div>Version: {coverageSummaries[0].manifest.version}</div>
      <div>Scenario count: {coverageSummaries[0].manifest.scenarios.length}</div>
      <div>Modes: {coverageSummaries[0].manifest.modes.length}</div>      
      {summaryTables}
    </div>
  );
};
