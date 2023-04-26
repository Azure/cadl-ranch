import { ScenarioData } from "@azure-tools/cadl-ranch-coverage-sdk";

export interface TreeTableRow {
  key: string;
  item: ManifestTreeNode;
  expanded: boolean;
  depth: number;
  hasChildren: boolean;
  index: number;
  toggleExpand(): void;
}

export interface ManifestTreeNode {
  name: string;
  fullName: string;
  scenario?: ScenarioData;
  children: Record<string, ManifestTreeNode>;
}
