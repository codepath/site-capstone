import {
  FormControlContext_default,
  init_FormControlContext,
  init_useFormControl,
  useFormControl
} from "./chunk-ICY775H5.js";
import {
  capitalize_default,
  init_capitalize
} from "./chunk-UYMRIPGX.js";
import {
  init_base
} from "./chunk-OGHFN7UP.js";
import {
  _objectWithoutPropertiesLoose,
  clsx_m_default,
  composeClasses,
  extendSxProp,
  generateUtilityClass,
  generateUtilityClasses,
  init_clsx_m,
  init_esm,
  init_esm2,
  init_generateUtilityClass2 as init_generateUtilityClass,
  init_objectWithoutPropertiesLoose,
  init_styled,
  init_useThemeProps,
  require_jsx_runtime,
  require_prop_types,
  styled_default,
  useThemeProps2 as useThemeProps
} from "./chunk-VYXFUWAP.js";
import {
  _extends,
  init_extends
} from "./chunk-HRRVIR7H.js";
import {
  require_react
} from "./chunk-TMS5W5UL.js";
import {
  __esm,
  __toESM
} from "./chunk-ROME4SDB.js";

// capstone-ui/node_modules/@mui/material/Typography/typographyClasses.js
function getTypographyUtilityClass(slot) {
  return generateUtilityClass("MuiTypography", slot);
}
var typographyClasses, typographyClasses_default;
var init_typographyClasses = __esm({
  "capstone-ui/node_modules/@mui/material/Typography/typographyClasses.js"() {
    init_esm();
    init_generateUtilityClass();
    typographyClasses = generateUtilityClasses("MuiTypography", ["root", "h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "body1", "body2", "inherit", "button", "caption", "overline", "alignLeft", "alignRight", "alignCenter", "alignJustify", "noWrap", "gutterBottom", "paragraph"]);
    typographyClasses_default = typographyClasses;
  }
});

// capstone-ui/node_modules/@mui/material/Typography/Typography.js
var React, import_prop_types, import_jsx_runtime, _excluded, useUtilityClasses, TypographyRoot, defaultVariantMapping, colorTransformations, transformDeprecatedColors, Typography, Typography_default;
var init_Typography = __esm({
  "capstone-ui/node_modules/@mui/material/Typography/Typography.js"() {
    "use client";
    init_objectWithoutPropertiesLoose();
    init_extends();
    React = __toESM(require_react());
    import_prop_types = __toESM(require_prop_types());
    init_clsx_m();
    init_esm2();
    init_base();
    init_styled();
    init_useThemeProps();
    init_capitalize();
    init_typographyClasses();
    import_jsx_runtime = __toESM(require_jsx_runtime());
    _excluded = ["align", "className", "component", "gutterBottom", "noWrap", "paragraph", "variant", "variantMapping"];
    useUtilityClasses = (ownerState) => {
      const {
        align,
        gutterBottom,
        noWrap,
        paragraph,
        variant,
        classes
      } = ownerState;
      const slots = {
        root: ["root", variant, ownerState.align !== "inherit" && `align${capitalize_default(align)}`, gutterBottom && "gutterBottom", noWrap && "noWrap", paragraph && "paragraph"]
      };
      return composeClasses(slots, getTypographyUtilityClass, classes);
    };
    TypographyRoot = styled_default("span", {
      name: "MuiTypography",
      slot: "Root",
      overridesResolver: (props, styles) => {
        const {
          ownerState
        } = props;
        return [styles.root, ownerState.variant && styles[ownerState.variant], ownerState.align !== "inherit" && styles[`align${capitalize_default(ownerState.align)}`], ownerState.noWrap && styles.noWrap, ownerState.gutterBottom && styles.gutterBottom, ownerState.paragraph && styles.paragraph];
      }
    })(({
      theme,
      ownerState
    }) => _extends({
      margin: 0
    }, ownerState.variant && theme.typography[ownerState.variant], ownerState.align !== "inherit" && {
      textAlign: ownerState.align
    }, ownerState.noWrap && {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }, ownerState.gutterBottom && {
      marginBottom: "0.35em"
    }, ownerState.paragraph && {
      marginBottom: 16
    }));
    defaultVariantMapping = {
      h1: "h1",
      h2: "h2",
      h3: "h3",
      h4: "h4",
      h5: "h5",
      h6: "h6",
      subtitle1: "h6",
      subtitle2: "h6",
      body1: "p",
      body2: "p",
      inherit: "p"
    };
    colorTransformations = {
      primary: "primary.main",
      textPrimary: "text.primary",
      secondary: "secondary.main",
      textSecondary: "text.secondary",
      error: "error.main"
    };
    transformDeprecatedColors = (color) => {
      return colorTransformations[color] || color;
    };
    Typography = React.forwardRef(function Typography2(inProps, ref) {
      const themeProps = useThemeProps({
        props: inProps,
        name: "MuiTypography"
      });
      const color = transformDeprecatedColors(themeProps.color);
      const props = extendSxProp(_extends({}, themeProps, {
        color
      }));
      const {
        align = "inherit",
        className,
        component,
        gutterBottom = false,
        noWrap = false,
        paragraph = false,
        variant = "body1",
        variantMapping = defaultVariantMapping
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
      const ownerState = _extends({}, props, {
        align,
        color,
        className,
        component,
        gutterBottom,
        noWrap,
        paragraph,
        variant,
        variantMapping
      });
      const Component = component || (paragraph ? "p" : variantMapping[variant] || defaultVariantMapping[variant]) || "span";
      const classes = useUtilityClasses(ownerState);
      return (0, import_jsx_runtime.jsx)(TypographyRoot, _extends({
        as: Component,
        ref,
        ownerState,
        className: clsx_m_default(classes.root, className)
      }, other));
    });
    true ? Typography.propTypes = {
      // ----------------------------- Warning --------------------------------
      // | These PropTypes are generated from the TypeScript type definitions |
      // |     To update them edit the d.ts file and run "yarn proptypes"     |
      // ----------------------------------------------------------------------
      /**
       * Set the text-align on the component.
       * @default 'inherit'
       */
      align: import_prop_types.default.oneOf(["center", "inherit", "justify", "left", "right"]),
      /**
       * The content of the component.
       */
      children: import_prop_types.default.node,
      /**
       * Override or extend the styles applied to the component.
       */
      classes: import_prop_types.default.object,
      /**
       * @ignore
       */
      className: import_prop_types.default.string,
      /**
       * The component used for the root node.
       * Either a string to use a HTML element or a component.
       */
      component: import_prop_types.default.elementType,
      /**
       * If `true`, the text will have a bottom margin.
       * @default false
       */
      gutterBottom: import_prop_types.default.bool,
      /**
       * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
       *
       * Note that text overflow can only happen with block or inline-block level elements
       * (the element needs to have a width in order to overflow).
       * @default false
       */
      noWrap: import_prop_types.default.bool,
      /**
       * If `true`, the element will be a paragraph element.
       * @default false
       */
      paragraph: import_prop_types.default.bool,
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
      /**
       * Applies the theme typography styles.
       * @default 'body1'
       */
      variant: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["body1", "body2", "button", "caption", "h1", "h2", "h3", "h4", "h5", "h6", "inherit", "overline", "subtitle1", "subtitle2"]), import_prop_types.default.string]),
      /**
       * The component maps the variant prop to a range of different HTML element types.
       * For instance, subtitle1 to `<h6>`.
       * If you wish to change that mapping, you can provide your own.
       * Alternatively, you can use the `component` prop.
       * @default {
       *   h1: 'h1',
       *   h2: 'h2',
       *   h3: 'h3',
       *   h4: 'h4',
       *   h5: 'h5',
       *   h6: 'h6',
       *   subtitle1: 'h6',
       *   subtitle2: 'h6',
       *   body1: 'p',
       *   body2: 'p',
       *   inherit: 'p',
       * }
       */
      variantMapping: import_prop_types.default.object
    } : void 0;
    Typography_default = Typography;
  }
});

// capstone-ui/node_modules/@mui/material/Typography/index.js
var init_Typography2 = __esm({
  "capstone-ui/node_modules/@mui/material/Typography/index.js"() {
    "use client";
    init_Typography();
    init_typographyClasses();
    init_typographyClasses();
  }
});

// capstone-ui/node_modules/@mui/material/InputAdornment/inputAdornmentClasses.js
function getInputAdornmentUtilityClass(slot) {
  return generateUtilityClass("MuiInputAdornment", slot);
}
var inputAdornmentClasses, inputAdornmentClasses_default;
var init_inputAdornmentClasses = __esm({
  "capstone-ui/node_modules/@mui/material/InputAdornment/inputAdornmentClasses.js"() {
    init_esm();
    init_generateUtilityClass();
    inputAdornmentClasses = generateUtilityClasses("MuiInputAdornment", ["root", "filled", "standard", "outlined", "positionStart", "positionEnd", "disablePointerEvents", "hiddenLabel", "sizeSmall"]);
    inputAdornmentClasses_default = inputAdornmentClasses;
  }
});

// capstone-ui/node_modules/@mui/material/InputAdornment/InputAdornment.js
var React2, import_prop_types2, import_jsx_runtime2, import_jsx_runtime3, _span, _excluded2, overridesResolver, useUtilityClasses2, InputAdornmentRoot, InputAdornment, InputAdornment_default;
var init_InputAdornment = __esm({
  "capstone-ui/node_modules/@mui/material/InputAdornment/InputAdornment.js"() {
    "use client";
    init_objectWithoutPropertiesLoose();
    init_extends();
    React2 = __toESM(require_react());
    import_prop_types2 = __toESM(require_prop_types());
    init_clsx_m();
    init_base();
    init_capitalize();
    init_Typography2();
    init_FormControlContext();
    init_useFormControl();
    init_styled();
    init_inputAdornmentClasses();
    init_useThemeProps();
    import_jsx_runtime2 = __toESM(require_jsx_runtime());
    import_jsx_runtime3 = __toESM(require_jsx_runtime());
    _excluded2 = ["children", "className", "component", "disablePointerEvents", "disableTypography", "position", "variant"];
    overridesResolver = (props, styles) => {
      const {
        ownerState
      } = props;
      return [styles.root, styles[`position${capitalize_default(ownerState.position)}`], ownerState.disablePointerEvents === true && styles.disablePointerEvents, styles[ownerState.variant]];
    };
    useUtilityClasses2 = (ownerState) => {
      const {
        classes,
        disablePointerEvents,
        hiddenLabel,
        position,
        size,
        variant
      } = ownerState;
      const slots = {
        root: ["root", disablePointerEvents && "disablePointerEvents", position && `position${capitalize_default(position)}`, variant, hiddenLabel && "hiddenLabel", size && `size${capitalize_default(size)}`]
      };
      return composeClasses(slots, getInputAdornmentUtilityClass, classes);
    };
    InputAdornmentRoot = styled_default("div", {
      name: "MuiInputAdornment",
      slot: "Root",
      overridesResolver
    })(({
      theme,
      ownerState
    }) => _extends({
      display: "flex",
      height: "0.01em",
      // Fix IE11 flexbox alignment. To remove at some point.
      maxHeight: "2em",
      alignItems: "center",
      whiteSpace: "nowrap",
      color: (theme.vars || theme).palette.action.active
    }, ownerState.variant === "filled" && {
      // Styles applied to the root element if `variant="filled"`.
      [`&.${inputAdornmentClasses_default.positionStart}&:not(.${inputAdornmentClasses_default.hiddenLabel})`]: {
        marginTop: 16
      }
    }, ownerState.position === "start" && {
      // Styles applied to the root element if `position="start"`.
      marginRight: 8
    }, ownerState.position === "end" && {
      // Styles applied to the root element if `position="end"`.
      marginLeft: 8
    }, ownerState.disablePointerEvents === true && {
      // Styles applied to the root element if `disablePointerEvents={true}`.
      pointerEvents: "none"
    }));
    InputAdornment = React2.forwardRef(function InputAdornment2(inProps, ref) {
      const props = useThemeProps({
        props: inProps,
        name: "MuiInputAdornment"
      });
      const {
        children,
        className,
        component = "div",
        disablePointerEvents = false,
        disableTypography = false,
        position,
        variant: variantProp
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded2);
      const muiFormControl = useFormControl() || {};
      let variant = variantProp;
      if (variantProp && muiFormControl.variant) {
        if (true) {
          if (variantProp === muiFormControl.variant) {
            console.error("MUI: The `InputAdornment` variant infers the variant prop you do not have to provide one.");
          }
        }
      }
      if (muiFormControl && !variant) {
        variant = muiFormControl.variant;
      }
      const ownerState = _extends({}, props, {
        hiddenLabel: muiFormControl.hiddenLabel,
        size: muiFormControl.size,
        disablePointerEvents,
        position,
        variant
      });
      const classes = useUtilityClasses2(ownerState);
      return (0, import_jsx_runtime2.jsx)(FormControlContext_default.Provider, {
        value: null,
        children: (0, import_jsx_runtime2.jsx)(InputAdornmentRoot, _extends({
          as: component,
          ownerState,
          className: clsx_m_default(classes.root, className),
          ref
        }, other, {
          children: typeof children === "string" && !disableTypography ? (0, import_jsx_runtime2.jsx)(Typography_default, {
            color: "text.secondary",
            children
          }) : (0, import_jsx_runtime3.jsxs)(React2.Fragment, {
            children: [position === "start" ? (
              /* notranslate needed while Google Translate will not fix zero-width space issue */
              _span || (_span = (0, import_jsx_runtime2.jsx)("span", {
                className: "notranslate",
                children: "​"
              }))
            ) : null, children]
          })
        }))
      });
    });
    true ? InputAdornment.propTypes = {
      // ----------------------------- Warning --------------------------------
      // | These PropTypes are generated from the TypeScript type definitions |
      // |     To update them edit the d.ts file and run "yarn proptypes"     |
      // ----------------------------------------------------------------------
      /**
       * The content of the component, normally an `IconButton` or string.
       */
      children: import_prop_types2.default.node,
      /**
       * Override or extend the styles applied to the component.
       */
      classes: import_prop_types2.default.object,
      /**
       * @ignore
       */
      className: import_prop_types2.default.string,
      /**
       * The component used for the root node.
       * Either a string to use a HTML element or a component.
       */
      component: import_prop_types2.default.elementType,
      /**
       * Disable pointer events on the root.
       * This allows for the content of the adornment to focus the `input` on click.
       * @default false
       */
      disablePointerEvents: import_prop_types2.default.bool,
      /**
       * If children is a string then disable wrapping in a Typography component.
       * @default false
       */
      disableTypography: import_prop_types2.default.bool,
      /**
       * The position this adornment should appear relative to the `Input`.
       */
      position: import_prop_types2.default.oneOf(["end", "start"]).isRequired,
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx: import_prop_types2.default.oneOfType([import_prop_types2.default.arrayOf(import_prop_types2.default.oneOfType([import_prop_types2.default.func, import_prop_types2.default.object, import_prop_types2.default.bool])), import_prop_types2.default.func, import_prop_types2.default.object]),
      /**
       * The variant to use.
       * Note: If you are using the `TextField` component or the `FormControl` component
       * you do not have to set this manually.
       */
      variant: import_prop_types2.default.oneOf(["filled", "outlined", "standard"])
    } : void 0;
    InputAdornment_default = InputAdornment;
  }
});

// capstone-ui/node_modules/@mui/material/InputAdornment/index.js
var init_InputAdornment2 = __esm({
  "capstone-ui/node_modules/@mui/material/InputAdornment/index.js"() {
    init_InputAdornment();
    init_inputAdornmentClasses();
    init_inputAdornmentClasses();
  }
});

export {
  getTypographyUtilityClass,
  typographyClasses_default,
  Typography_default,
  init_Typography2 as init_Typography,
  getInputAdornmentUtilityClass,
  inputAdornmentClasses_default,
  InputAdornment_default,
  init_InputAdornment2 as init_InputAdornment
};
//# sourceMappingURL=chunk-WA4QV6ZE.js.map
