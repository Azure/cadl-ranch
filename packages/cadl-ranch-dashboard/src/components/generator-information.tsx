import { ResolvedCoverageReport } from "@azure-tools/cadl-ranch-coverage-sdk";
import { Caption1, Text } from "@fluentui/react-components";
import { FunctionComponent } from "react";

export type GeneratorInformationProps = {
  report: ResolvedCoverageReport;
};

export const GeneratorInformation: FunctionComponent<GeneratorInformationProps> = ({ report }) => {
  return (
    <table>
      <InfoRow
        label="Generator version"
        caption="This is the version of the generator used to create this report."
        value={report.generatorMetadata.version}
      />
      <InfoRow
        label="Cadl Ranch Spec version"
        caption="This is the version of the spec package used to create this report"
        value={report.scenariosMetadata.version}
      />
      <InfoRow
        label="Reported date"
        caption="Date this report was created"
        value={new Date(report.createdAt).toDateString()}
        valueTitle={report.createdAt}
      />
    </table>
  );
};

type InfoEntryProps = {
  label: string;
  caption: string;
  value: string;
  valueTitle?: string;
};
const InfoRow: FunctionComponent<InfoEntryProps> = ({ label, caption, value, valueTitle }) => {
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
