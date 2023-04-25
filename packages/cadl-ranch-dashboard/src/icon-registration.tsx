import { registerIcons } from "@fluentui/react";
import { ChevronDownIcon, ChevronRightIcon, CodeIcon, DocumentationIcon } from "@fluentui/react-icons-mdl2";

// Register here icons you need to use with `iconName` in <Icon /> or `<IconButton />`
// https://developer.microsoft.com/en-us/fluentui#/styles/web/icons
registerIcons({
  icons: {
    Documentation: <DocumentationIcon />,
    Code: <CodeIcon />,
    ChevronDown: <ChevronDownIcon />,
    ChevronRight: <ChevronRightIcon />,
  },
});
