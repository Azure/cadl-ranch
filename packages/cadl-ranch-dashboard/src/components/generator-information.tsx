import { ResolvedCoverageReport } from "@azure-tools/cadl-ranch-coverage-sdk";
import { Caption1, Text } from "@fluentui/react-components";
import { FunctionComponent } from "react";
import { ScenarioGroupRatioStatusBox } from "./scenario-group-status.js";

export type GeneratorInformationProps = {
  status: number;
  report: ResolvedCoverageReport;
};

export const GeneratorInformation: FunctionComponent<GeneratorInformationProps> = ({ status, report }) => {
  return (
    <table>
      <InfoRow
        label="Reported date"
        caption="Date this report was created"
        value={new Date(report.createdAt).toDateString()}
        valueTitle={report.createdAt}
      />
      <InfoRow
        label="Cadl Ranch Spec version"
        caption="This is the version of the spec package used to create this report"
        value={report.scenariosMetadata.version}
      />
      <InfoRow
        label="Generator version"
        caption="This is the version of the generator used to create this report."
        value={report.generatorMetadata.version}
      />
      <InfoRow
        label="Generator commit"
        caption="Git Sha of the generator used to create this report."
        value={report.generatorMetadata.commit?.slice(0, 8) ?? "?"}
        valueTitle={report.generatorMetadata.commit}
      />

      <InfoRow
        label="Status at time of report"
        caption="Coverage when the report was completed"
        value={<ScenarioGroupRatioStatusBox ratio={getCompletedRatioAtTimeOfReport(report)} />}
      />

      <InfoRow
        label="Current status"
        caption="Coverage of the current scenarios"
        value={<ScenarioGroupRatioStatusBox ratio={status} />}
      />
    </table>
  );
};

type InfoEntryProps = {
  label: string;
  caption: string;
  value: string | any;
  valueTitle?: string;
};

export const InfoRow: FunctionComponent<InfoEntryProps> = ({ label, caption, value, valueTitle }) => {
  return (
    <tr css={{ margin: "10px 0" }}>
      <td>
        <label>
          <Text block weight="semibold">
            {label}
          </Text>

          <Caption1 block>{caption}</Caption1>
        </label>
      </td>
      <td css={{ paddingLeft: 20, textAlign: "right" }}>
        <Text title={valueTitle}>{value}</Text>
      </td>
    </tr>
  );
};

function getCompletedRatioAtTimeOfReport(report: ResolvedCoverageReport) {
  let coveredCount = 0;
  const statues = Object.values(report.results);
  for (const status of statues) {
    if (status === "pass" || status === "not-applicable" || status === "not-supported") {
      coveredCount++;
    }
  }

  return coveredCount / statues.length;
}
