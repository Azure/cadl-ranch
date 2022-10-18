import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent } from "react";
import { TreeTableRow } from "./types.js";

interface RowLabelCellProps {
  row: TreeTableRow;
}
const INDENT_SIZE = 24;
export const RowLabelCell: FunctionComponent<RowLabelCellProps> = ({ row }) => {
  const caret = row.hasChildren ? <FontAwesomeIcon icon={row.expanded ? faChevronDown : faChevronRight} /> : null;
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
      title={row.item.scenarioDoc}
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
          }}
        >
          {row.item.name}
        </div>
      </div>
    </td>
  );
};
