import { ScenarioManifest } from "@azure-tools/cadl-ranch-coverage-sdk";
import { css } from "@emotion/react";
import { FunctionComponent } from "react";
import { Colors } from "./constants.js";

const languages = ["python", "typescript", "csharp", "java"];
export interface DashboardProps {
  manifest: ScenarioManifest;
}

export const Dashboard: FunctionComponent<DashboardProps> = ({ manifest }) => {
  const rows = manifest.scenarios.map((x) => {
    return (
      <tr key={x.name}>
        <td>{x.name}</td>
        {languages.map((lang) => (
          <td key={lang}></td>
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
  "& tr:nth-child(2n)": {
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
