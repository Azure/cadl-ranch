import { FunctionComponent } from "react";
import { TreeTableRow } from "./types.js";
import { Text, IconButton, Callout, Icon, TooltipHost } from "@fluentui/react";
import ReactMarkdown from "react-markdown";
import { ScenarioData } from "@azure-tools/cadl-ranch-coverage-sdk";
import { useBoolean, useId } from "@fluentui/react-hooks";

export interface RowLabelCellProps {
  row: TreeTableRow;
}
const INDENT_SIZE = 24;
export const RowLabelCell: FunctionComponent<RowLabelCellProps> = ({ row }) => {
  const caret = row.hasChildren ? <Icon iconName={row.expanded ? "ChevronDown" : "ChevronRight"} /> : null;
  const marginLeft = row.depth * INDENT_SIZE;
  return (
    <td
      css={[
        {
          minWidth: 260,
          padding: "0 5px",
        },
        row.hasChildren ? { cursor: "pointer" } : undefined,
      ]}
      onClick={row.toggleExpand}
    >
      <div style={{ marginLeft, display: "flex", alignItems: "center" }}>
        <div
          css={{
            transition: "transform 0.2s linear",
          }}
        >
          {caret}
        </div>
        <div
          css={{
            marginLeft: "10px",
            flex: 1,
          }}
        >
          {row.item.name}
        </div>
        <div css={{}}>
          {row.item.scenario && <ScenarioInfoButton scenario={row.item.scenario} />}
          {row.item.scenario && <GotoSourceButton scenario={row.item.scenario} />}
        </div>
      </div>
    </td>
  );
};

type ScenarioInfoButtonProps = {
  scenario: ScenarioData;
};

const ScenarioInfoButton: FunctionComponent<ScenarioInfoButtonProps> = ({ scenario }) => {
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
  const buttonId = useId("callout-button");

  return (
    <TooltipHost content="Show scenario documentation">
      <IconButton
        id={buttonId}
        iconProps={{ iconName: "Documentation" }}
        aria-label="Show information"
        onClick={toggleIsCalloutVisible}
      />
      {isCalloutVisible && (
        <Callout
          role="dialog"
          gapSpace={0}
          target={`#${buttonId}`}
          onDismiss={toggleIsCalloutVisible}
          setInitialFocus
          css={{ padding: 20 }}
        >
          <Text as="h1" block variant="xLarge">
            Scenario documentation
          </Text>
          <ReactMarkdown children={scenario.scenarioDoc} remarkPlugins={[]} />
        </Callout>
      )}
    </TooltipHost>
  );
};

type ShowSourceButtonProps = {
  scenario: ScenarioData;
};
const GotoSourceButton: FunctionComponent<ShowSourceButtonProps> = ({ scenario }) => {
  const baseUrl = "https://github.com/Azure/cadl-ranch/blob/main/packages/cadl-ranch-specs/http/";
  const start = getGithubLineNumber(scenario.location.start.line);
  const end = getGithubLineNumber(scenario.location.end.line);
  const url = `${baseUrl}/${scenario.location.path}#${start}-${end}`;
  return (
    <TooltipHost content="Go to source">
      <IconButton iconProps={{ iconName: "Code" }} aria-label="Go to source" href={url} target="_blank" />
    </TooltipHost>
  );
};

function getGithubLineNumber(value: number): `L${number}` {
  return `L${value + 1}`;
}
