import { CoverageReport } from "@azure-tools/cadl-ranch-coverage-sdk";
import { css } from "@emotion/react";
import { FunctionComponent } from "react";
import { CoverageSummary, GeneratorNames } from "./apis.js";
import { ScenarioStatusBox } from "./components/scenario-status.js";
import { Colors } from "./constants.js";

export interface DashboardProps {
  coverageSummary: CoverageSummary;
}

export const Dashboard: FunctionComponent<DashboardProps> = ({ coverageSummary }) => {
  const languages: GeneratorNames[] = Object.keys(coverageSummary.generatorReports) as any;
  const rows = coverageSummary.manifest.scenarios.map((x) => {
    return (
      <tr key={x.name}>
        <td css={ScenarioNameCellStyles} title={x.scenarioDoc}>
          {x.name}
        </td>
        {languages.map((lang) => (
          <td key={lang} css={ScenarioStatusCellStyles}>
            <ScenarioStatusBox status={coverageSummary.generatorReports[lang]?.results[x.name]} />
          </td>
        ))}
      </tr>
    );
  });
  return (
    <table css={TableStyles}>
      <thead>
        <DashboardHeaderRow coverageSummary={coverageSummary} />
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

interface DashboardHeaderRow {
  coverageSummary: CoverageSummary;
}
const DashboardHeaderRow: FunctionComponent<DashboardHeaderRow> = ({ coverageSummary }) => {
  const data: [string, number, CoverageReport | undefined][] = Object.entries(coverageSummary.generatorReports).map(
    ([language, report]) => {
      if (report === undefined) {
        return [language, 0, undefined];
      }
      let coveredCount = 0;
      for (const scenario of coverageSummary.manifest.scenarios) {
        const status = report.results[scenario.name];
        if (status === "pass" || status === "not-applicable") {
          coveredCount++;
        }
      }
      return [language, coveredCount / coverageSummary.manifest.scenarios.length, report];
    },
  );

  const title = [].join("\n");
  return (
    <tr>
      <th>Scenario name</th>
      {data.map(([lang, status, report]) => (
        <th key={lang} title={title}>
          <div>{lang}</div>
          <div>{Math.floor(status * 100)}%</div>
          <div>{report?.scenariosMetadata?.version}</div>
        </th>
      ))}
    </tr>
  );
};
const TableStyles = css({
  "borderCollapse": "collapse",
  "& tr:nth-of-type(2n)": {
    backgroundColor: Colors.bgSubtle,
  },
  "& td, & th": {
    border: `1px solid ${Colors.borderDefault}`,
    height: "32px",
  },
  "& th": {
    padding: "6px 13px",
    backgroundColor: Colors.bgSubtle,
  },
});

const ScenarioNameCellStyles = css({
  padding: "6px 13px",
});
const ScenarioStatusCellStyles = css({
  padding: 0,
  width: 120,
});
