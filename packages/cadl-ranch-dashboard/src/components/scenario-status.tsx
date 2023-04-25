import { ScenarioStatus } from "@azure-tools/cadl-ranch-coverage-sdk";
import { css } from "@emotion/react";
import {
  AcceptMediumIcon,
  AlertSolidIcon,
  HideIcon,
  StatusErrorFullIcon,
  WarningSolidIcon,
} from "@fluentui/react-icons-mdl2";
import { FunctionComponent } from "react";
import { Colors, ScenarioStatusColors } from "../constants.js";

export interface ScenarioStatusBoxProps {
  readonly status: ScenarioStatus | undefined;
}

export const ScenarioStatusBox: FunctionComponent<ScenarioStatusBoxProps> = ({ status }) => {
  switch (status) {
    case "pass":
      return <PassStatus />;
    case "fail":
      return <FailStatus />;
    case "not-applicable":
      return <NotApplicableStatus />;
    case "not-supported":
      return <NotSupportedStatus />;
    case "not-implemented":
      return <NotImplementedStatus />;
    case undefined: {
      return <NotReportedStatus />;
    }
    default:
      return <div>Unexpected value {status}</div>;
  }
};

const ScenarioStatusBoxStyles = css({
  height: "100%",
  width: "100%",
  color: Colors.bgSubtle,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const PassStatus = () => (
  <div title="Pass" css={[ScenarioStatusBoxStyles, css({ backgroundColor: ScenarioStatusColors.pass })]}>
    <AcceptMediumIcon />
  </div>
);

export const FailStatus = () => (
  <div title="Fail" css={[ScenarioStatusBoxStyles, css({ backgroundColor: ScenarioStatusColors.fail })]}>
    <StatusErrorFullIcon />
  </div>
);

export const NotSupportedStatus = () => (
  <div
    title="Not supported"
    css={[ScenarioStatusBoxStyles, css({ backgroundColor: ScenarioStatusColors.notSupported })]}
  >
    <HideIcon />
  </div>
);
export const NotApplicableStatus = () => (
  <div
    title="Not applicable"
    css={[ScenarioStatusBoxStyles, css({ backgroundColor: ScenarioStatusColors.notApplicable })]}
  >
    <HideIcon />
  </div>
);

export const NotImplementedStatus = () => (
  <div
    title="Not implemented"
    css={[ScenarioStatusBoxStyles, css({ backgroundColor: ScenarioStatusColors.notImplemented })]}
  >
    <AlertSolidIcon />
  </div>
);

export const NotReportedStatus = () => (
  <div title="Not reported" css={[ScenarioStatusBoxStyles, css({ backgroundColor: ScenarioStatusColors.notReported })]}>
    <WarningSolidIcon />
  </div>
);
