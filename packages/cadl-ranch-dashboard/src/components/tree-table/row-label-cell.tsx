import { FunctionComponent } from "react";
import { TreeTableRow } from "./types.js";
import { Button, Popover, PopoverSurface, PopoverTrigger, Title3, Tooltip } from "@fluentui/react-components";
import ReactMarkdown from "react-markdown";
import { ScenarioData } from "@azure-tools/cadl-ranch-coverage-sdk";
import {
  BookInformation20Regular,
  ChevronDown20Filled,
  ChevronRight20Filled,
  Braces20Filled,
} from "@fluentui/react-icons";

export interface RowLabelCellProps {
  row: TreeTableRow;
}
const INDENT_SIZE = 14;
export const RowLabelCell: FunctionComponent<RowLabelCellProps> = ({ row }) => {
  const caret = row.hasChildren ? row.expanded ? <ChevronDown20Filled /> : <ChevronRight20Filled /> : null;
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
  return (
    <Popover withArrow>
      <PopoverTrigger disableButtonEnhancement>
        <Tooltip content="Show scenario documentation" relationship="label">
          <Button icon={<BookInformation20Regular />} aria-label="Show information" appearance="transparent" />
        </Tooltip>
      </PopoverTrigger>
      <PopoverSurface>
        <Title3>Scenario documentation</Title3>
        <ReactMarkdown children={scenario.scenarioDoc} remarkPlugins={[]} />
      </PopoverSurface>
    </Popover>
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
    <Tooltip content="Go to source" relationship="label">
      <Button
        icon={<Braces20Filled />}
        as="a"
        appearance="transparent"
        aria-label="Go to source"
        href={url}
        target="_blank"
      />
    </Tooltip>
  );
};

function getGithubLineNumber(value: number): `L${number}` {
  return `L${value + 1}`;
}
