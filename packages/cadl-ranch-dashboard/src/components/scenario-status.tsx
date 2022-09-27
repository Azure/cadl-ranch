import { ScenarioStatus } from "@azure-tools/cadl-ranch-coverage-sdk";
import { css } from "@emotion/react";
import {
  faCheck,
  faCircleExclamation,
  faEyeSlash,
  faTriangleExclamation,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent } from "react";
import { Colors } from "../constants.js";

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
  <div title="Pass" css={[ScenarioStatusBoxStyles, css({ backgroundColor: Colors.good })]}>
    <FontAwesomeIcon icon={faCheck} />
  </div>
);

export const FailStatus = () => (
  <div title="Fail" css={[ScenarioStatusBoxStyles, css({ backgroundColor: Colors.error })]}>
    <FontAwesomeIcon icon={faXmarkCircle} />
  </div>
);

export const NotSupportedStatus = () => (
  <div title="Not supported" css={[ScenarioStatusBoxStyles, css({ backgroundColor: Colors.borderDefault })]}>
    <FontAwesomeIcon icon={faEyeSlash} />
  </div>
);
export const NotApplicableStatus = () => (
  <div title="Not applicable" css={[ScenarioStatusBoxStyles, css({ backgroundColor: Colors.borderDefault })]}>
    <FontAwesomeIcon icon={faEyeSlash} />
  </div>
);

export const NotImplementedStatus = () => (
  <div title="Not implemented" css={[ScenarioStatusBoxStyles, css({ backgroundColor: Colors.warning })]}>
    <FontAwesomeIcon icon={faCircleExclamation} />
  </div>
);

export const NotReportedStatus = () => (
  <div title="Not reported" css={[ScenarioStatusBoxStyles, css({ backgroundColor: Colors.warning })]}>
    <FontAwesomeIcon icon={faTriangleExclamation} />
  </div>
);
