import {
  defaultTheme_default,
  identifier_default,
  init_defaultTheme,
  init_esm2 as init_esm,
  init_identifier,
  useTheme_default
} from "./chunk-VYXFUWAP.js";
import {
  require_react
} from "./chunk-TMS5W5UL.js";
import {
  __esm,
  __toESM
} from "./chunk-ROME4SDB.js";

// capstone-ui/node_modules/@mui/material/styles/useTheme.js
function useTheme() {
  const theme = useTheme_default(defaultTheme_default);
  if (true) {
    React.useDebugValue(theme);
  }
  return theme[identifier_default] || theme;
}
var React;
var init_useTheme = __esm({
  "capstone-ui/node_modules/@mui/material/styles/useTheme.js"() {
    "use client";
    React = __toESM(require_react());
    init_esm();
    init_defaultTheme();
    init_identifier();
  }
});

export {
  useTheme,
  init_useTheme
};
//# sourceMappingURL=chunk-IKX4ZUK6.js.map
