export interface TreeTableRow {
  key: string;
  item: any;
  expanded: boolean;
  depth: number;
  hasChildren: boolean;
  index: number;
  toggleExpand(): void;
}
