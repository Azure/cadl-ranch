import { ScenarioStatus } from "@azure-tools/cadl-ranch-coverage-sdk";
import { FunctionComponent } from "react";

export interface ScenarioStatusCellProps {
  readonly status: ScenarioStatus | undefined;
}

export const ScenarioStatusCell: FunctionComponent<ScenarioStatusCellProps> = ({ status }) => {
  const resolvedStatus = status ?? "not-implemented";
  return <td>{resolvedStatus}</td>;
};
