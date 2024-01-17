import { FunctionComponent } from "react";
import { CoverageSummary } from "../apis.js";
import { DashboardTable } from "./dashboard-table.js";
import { Card, CardHeader, Text, tokens } from "@fluentui/react-components";
import { InfoRow } from "./generator-information.js";

export interface DashboardProps {
  coverageSummaries: CoverageSummary[];
}

export const Dashboard: FunctionComponent<DashboardProps> = ({ coverageSummaries }) => {
  const summaryTables = coverageSummaries.map((coverageSummary) => (
    <div css={{ margin: 5 }}>
      <DashboardTable coverageSummary={coverageSummary} />
    </div>
  ));

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
        <CadlRanchSpecsCard coverageSummary={coverageSummaries[0]} />
      </div>
      <div css={{ height: 30 }}></div>
      {summaryTables}
    </div>
  );
};

const CadlRanchSpecsCard: FunctionComponent<{ coverageSummary: CoverageSummary }> = ({ coverageSummary }) => {
  return (
    <Card css={{ width: 500 }}>
      <CardHeader header={<Text weight="bold">Specs Manifest</Text>} />
      <table>
        <InfoRow
          label="Commit"
          caption="Git Sha of the manifest used to create this report."
          value={
            <a href={`https://github.com/Azure/cadl-ranch/commit/${coverageSummary.manifest.commit}`}>
              {coverageSummary.manifest.commit.slice(0, 6)}
            </a>
          }
        />
        <InfoRow
          label="Version"
          caption="Version of the cadl-ranch-specs package used to create this report."
          value={coverageSummary.manifest.version}
        />
        <InfoRow
          label="Scenario count"
          caption="Number of scenarios at this time"
          value={coverageSummary.manifest.scenarios.length}
        />
      </table>
    </Card>
  );
};
