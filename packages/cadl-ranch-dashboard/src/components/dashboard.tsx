import { FunctionComponent } from "react";
import { CoverageSummary } from "../apis.js";
import { DashboardTable } from "./dashboard-table.js";

export interface DashboardProps {
  coverageSummary: CoverageSummary;
}

export const Dashboard: FunctionComponent<DashboardProps> = ({ coverageSummary }) => {
  return (
    <div>
      <h1>Cadl Ranch Coverage Dashboard</h1>
      <div>
        Commit:{" "}
        <a href={`https://github.com/Azure/cadl-ranch/commit/${coverageSummary.manifest.commit}`}>
          {coverageSummary.manifest.commit.slice(0, 6)}
        </a>
      </div>
      <div>Version: {coverageSummary.manifest.version}</div>
      <div>Scenario count: {coverageSummary.manifest.scenarios.length}</div>
      <DashboardTable coverageSummary={coverageSummary} />
    </div>
  );
};
