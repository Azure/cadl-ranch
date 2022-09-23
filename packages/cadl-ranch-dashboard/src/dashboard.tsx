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
        <td css={ScenarioNameCellStyles}>{x.name}</td>
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
        <tr>
          <th>Scenario name</th>
          {languages.map((lang) => (
            <th key={lang}>{lang}</th>
          ))}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
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
});
