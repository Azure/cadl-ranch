import { css } from "@emotion/react";
import { FunctionComponent } from "react";
import { CoverageSummary, GeneratorNames } from "./apis.js";
import { ScenarioStatusCell } from "./components/scenario-status.js";
import { Colors } from "./constants.js";

export interface DashboardProps {
  coverageSummary: CoverageSummary;
}

export const Dashboard: FunctionComponent<DashboardProps> = ({ coverageSummary }) => {
  const languages: GeneratorNames[] = Object.keys(coverageSummary.generatorReports) as any;
  const rows = coverageSummary.manifest.scenarios.map((x) => {
    return (
      <tr key={x.name}>
        <td>{x.name}</td>
        {languages.map((lang) => (
          <ScenarioStatusCell key={lang} status={coverageSummary.generatorReports[lang]?.results[x.name]} />
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
    padding: "6px 13px",
    border: `1px solid ${Colors.borderDefault}`,
  },
  "& th": {
    backgroundColor: Colors.bgSubtle,
  },
});
