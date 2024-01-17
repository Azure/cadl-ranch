import { FunctionComponent } from "react";
import { CoverageSummary } from "../apis.js";
import { DashboardTable } from "./dashboard-table.js";
import { Card, CardHeader, Text, tokens } from "@fluentui/react-components";

export interface DashboardProps {
  coverageSummary: CoverageSummary;
}

export const Dashboard: FunctionComponent<DashboardProps> = ({ coverageSummary }) => {
  return (
    <div>
      <div
        css={{
          display: "flex",
          gap: 50,
          backgroundColor: tokens.colorBrandBackground,
          color: tokens.colorNeutralForegroundInverted,
        }}
      >
        <h1 style={{ fontSize: 20, padding: "0 5px" }}>Cadl Ranch Coverage Dashboard</h1>
      </div>
      <div css={{ margin: 5 }}>
        <CadlRanchSpecsCard coverageSummary={coverageSummary} />
      </div>
      <div css={{ height: 30 }}></div>
      <div css={{ margin: 5 }}>
        <DashboardTable coverageSummary={coverageSummary} />
      </div>
    </div>
  );
};

const CadlRanchSpecsCard: FunctionComponent<DashboardProps> = ({ coverageSummary }) => {
  return (
    <Card css={{ width: 300 }}>
      <CardHeader header={<Text weight="bold">Specs Manifest</Text>} />
      <div>
        Commit:{" "}
        <a href={`https://github.com/Azure/cadl-ranch/commit/${coverageSummary.manifest.commit}`}>
          {coverageSummary.manifest.commit.slice(0, 6)}
        </a>
      </div>
      <div>Version: {coverageSummary.manifest.version}</div>
      <div>Scenario count: {coverageSummary.manifest.scenarios.length}</div>
    </Card>
  );
};
