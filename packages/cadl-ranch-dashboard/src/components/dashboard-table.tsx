import { ResolvedCoverageReport } from "@azure-tools/cadl-ranch-coverage-sdk";
import { css } from "@emotion/react";
import { faShieldAlt, faTrowelBricks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent } from "react";
import { CoverageSummary, GeneratorNames } from "../apis.js";
import { Colors } from "../constants.js";
import { ScenarioStatusBox } from "./scenario-status.js";

export interface DashboardTableProps {
  coverageSummary: CoverageSummary;
}

export const DashboardTable: FunctionComponent<DashboardTableProps> = ({ coverageSummary }) => {
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
  const data: [string, number, ResolvedCoverageReport | undefined][] = Object.entries(
    coverageSummary.generatorReports,
  ).map(([language, report]) => {
    if (report === undefined) {
      return [language, 0, undefined];
    }
    let coveredCount = 0;
    for (const scenario of coverageSummary.manifest.scenarios) {
      const status = report.results[scenario.name];
      if (status === "pass" || status === "not-applicable" || status === "not-supported") {
        coveredCount++;
      }
    }
    return [language, coveredCount / coverageSummary.manifest.scenarios.length, report];
  });

  return (
    <tr>
      <th>Scenario name</th>
      {data.map(([lang, status, report]) => (
        <GeneratorHeaderCell key={lang} status={status} report={report} />
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
  padding: "0 13px",
});
const ScenarioStatusCellStyles = css({
  padding: 0,
  width: 120,
});

export interface GeneratorHeaderCellProps {
  status: number;
  report: ResolvedCoverageReport | undefined;
}

export const GeneratorHeaderCell: FunctionComponent<GeneratorHeaderCellProps> = ({ status, report }) => {
  return (
    <th css={{ padding: "0 !important" }}>
      <div
        css={{
          display: "grid",
          gridTemplateAreas: `
            "name name"
            "gen-version spec-version"
            "status status"
          `,
        }}
      >
        <div
          title="Generator name"
          css={{ gridArea: "name", borderBottom: `1px solid ${Colors.borderDefault}`, padding: 5 }}
        >
          {report?.generatorMetadata?.name}
        </div>
        <div
          title="Scenario version used in this coverage."
          css={[
            versionStyles,
            {
              gridArea: "gen-version",
              borderRight: `1px solid ${Colors.borderDefault}`,
            },
          ]}
        >
          <FontAwesomeIcon icon={faTrowelBricks} css={{ marginRight: 5 }} />

          {report?.generatorMetadata?.version ?? "?"}
        </div>
        <div
          title="Scenario version used in this coverage."
          css={[
            versionStyles,
            {
              gridArea: "spec-version",
            },
          ]}
        >
          <FontAwesomeIcon icon={faShieldAlt} css={{ marginRight: 5 }} />
          {report?.scenariosMetadata?.version ?? "?"}
        </div>
        <div
          title="Coverage stats"
          css={{ gridArea: "status", borderTop: `1px solid ${Colors.borderDefault}`, padding: 5 }}
        >
          {Math.floor(status * 100)}%
        </div>
      </div>
    </th>
  );
};

const versionStyles = css({
  fontSize: "9pt",
  fontWeight: "normal",
  color: Colors.lightText,
  padding: 5,
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});
