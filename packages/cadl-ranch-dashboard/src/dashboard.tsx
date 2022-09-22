import { FunctionComponent } from "react";
import { ScenarioManifest } from "./apis.js";

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
    <table>
      <thead>
        <tr>
          <td>Scenario name</td>
          {languages.map((lang) => (
            <td key={lang}>{lang}</td>
          ))}
        </tr>
      </thead>

      {rows}
    </table>
  );
};
