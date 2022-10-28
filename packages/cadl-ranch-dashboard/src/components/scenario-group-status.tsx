import { css } from "@emotion/react";
import { FunctionComponent } from "react";
import { Colors } from "../constants.js";

export interface ScenarioGroupStatusRatioBoxProps {
  readonly ratio: number;
}

export const ScenarioGroupRatioStatusBox: FunctionComponent<ScenarioGroupStatusRatioBoxProps> = ({ ratio }) => {
  let css = groupRatioStyles.zero;
  if (ratio === 1) {
    css = groupRatioStyles.perfect;
  } else if (ratio > 0.8) {
    css = groupRatioStyles.ok;
  } else if (ratio > 0) {
    css = groupRatioStyles.bad;
  }
  return (
    <div
      title="Pass"
      css={[
        {
          height: "100%",
          width: "100%",
          display: "flex",
          color: Colors.bgSubtle,
          alignItems: "center",
          justifyContent: "center",
        },
        css,
      ]}
    >
      {Math.floor(ratio * 100)}%
    </div>
  );
};

const groupRatioStyles = {
  perfect: css({ backgroundColor: Colors.good }),
  ok: css({ backgroundColor: Colors.ok }),
  bad: css({ backgroundColor: Colors.warning }),
  zero: css({ backgroundColor: Colors.warning }),
};
