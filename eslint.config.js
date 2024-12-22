import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(tseslint.configs.recommendedTypeChecked, {
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  files: ["**/*.{js,jsx,ts,tsx}"],
  languageOptions: {
    parser: typescriptParser,
    ecmaVersion: 2020,
    globals: globals.browser,
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
    "jsx-a11y": jsxA11y,
    "@stylistic": stylistic,
    react,
  },
  rules: {
    ...jsxA11y.configs.recommended.rules,
    ...reactHooks.configs.recommended.rules,
    // ...stylistic.configs.recommended.rules,
    ...reactRefresh.configs.recommended.rules,

    // ? React rules
    "react-hooks/rules-of-hooks": "error",
    "react/no-children-prop": [
      "warn",
      {
        allowFunctions: false,
      },
    ],
    "react/jsx-curly-brace-presence": [
      "error",
      { props: "never", children: "never", propElementValues: "always" },
    ],
    "react/button-has-type": ["error"],
    // Eslint rules
    "no-console": ["warn", { allow: ["warn", "error", "info"] }],
    "no-alert": "error",
    "max-lines": ["warn", { max: 250, skipComments: true }],
    "no-duplicate-imports": "error",
    "prefer-arrow-callback": "warn",
    // prettier-ignore
    "curly": ["warn", "all"],
    // prettier-ignore
    "eqeqeq": "error",
    "max-depth": ["warn", 3],
    "capitalized-comments": ["warn", "always"],
    "no-unsafe-finally": "error",
    "no-unreachable": "error",
    "for-direction": "error",
    // prettier-ignore
    "complexity": ["warn", 25],
    "no-magic-numbers": "off",
    "no-var": "error",
    "prefer-const": "error",
    "arrow-body-style": ["warn", "as-needed"],
    // Stylistic rules
    "@stylistic/quotes": ["error", "double", { avoidEscape: true }],
    "@stylistic/switch-colon-spacing": ["warn", { after: true, before: false }],
    "@stylistic/spaced-comment": ["warn", "always"],
    "@stylistic/semi-style": ["warn", "last"],
    "@stylistic/semi-spacing": ["warn", { before: false, after: true }],
    "@stylistic/no-multiple-empty-lines": [
      "warn",
      { max: 1, maxEOF: 1, maxBOF: 0 },
    ],
    "@stylistic/max-len": [
      "warn",
      {
        code: 120,
        ignoreStrings: true,
        ignoreComments: true,
        ignoreTemplateLiterals: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreRegExpLiterals: true,
      },
    ],
    "@stylistic/lines-between-class-members": ["error", "always"],
    "@stylistic/comma-style": ["error", "last"],
    "@stylistic/comma-spacing": ["error", { before: false, after: true }],
    "@stylistic/comma-dangle": ["warn", "never"],
    "@stylistic/arrow-spacing": ["warn", { before: true, after: true }],
    "@stylistic/arrow-parens": ["warn", "always"],
    "@stylistic/eol-last": ["warn", "always"],
    "@stylistic/array-bracket-spacing": ["warn", "never"],
    "@stylistic/lines-around-comment": [
      "warn",
      {
        beforeBlockComment: true,
        beforeLineComment: true,
        allowBlockStart: true,
        allowClassStart: true,
        allowObjectStart: true,
        allowArrayStart: true,
      },
    ],
    "@stylistic/lines-around-comment": [
      "warn",
      {
        allowEnumStart: true,
        allowInterfaceStart: true,
        allowModuleStart: true,
        allowTypeStart: true,
      },
    ],
    "@stylistic/keyword-spacing": [
      "warn",
      {
        before: true,
        after: true,
        overrides: {
          for: { before: false },
          while: { before: false },
          static: { after: false },
        },
      },
    ],
    "@stylistic/no-confusing-arrow": "warn",
    "@stylistic/no-multi-spaces": ["warn", { ignoreEOLComments: false }],
    "@stylistic/rest-spread-spacing": ["warn", "never"],
    "@stylistic/space-before-blocks": "warn",
    "@stylistic/type-annotation-spacing": "warn",
    "@stylistic/jsx-pascal-case": [
      "warn",
      { allowLeadingUnderscore: false, allowNamespace: true },
    ],
    "@stylistic/jsx-tag-spacing": [
      "warn",
      {
        beforeSelfClosing: "proportional-always",
        afterOpening: "never",
        beforeClosing: "never",
      },
    ],
    "@stylistic/padding-line-between-statements": [
      "warn",
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
      {
        blankLine: "any",
        prev: ["const", "let", "var"],
        next: ["const", "let", "var"],
      },
      { blankLine: "always", prev: "directive", next: "*" },
      { blankLine: "any", prev: "directive", next: "directive" },
      { blankLine: "always", prev: "*", next: "class" },
      { blankLine: "always", prev: "import", next: "*" },
      { blankLine: "any", prev: "import", next: "import" },
      { blankLine: "always", prev: "export", next: "*" },
      { blankLine: "any", prev: "export", next: "export" },
      { blankLine: "always", prev: "*", next: "try" },
      { blankLine: "always", prev: "try", next: "*" },
      { blankLine: "always", prev: "*", next: "default" },
      { blankLine: "always", prev: "*", next: "function" },
    ],
    "@stylistic/padding-line-between-statements": [
      "warn",
      {
        blankLine: "always",
        prev: "*",
        next: ["enum", "interface", "type"],
      },
    ],
    // ? Typescript rules
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true,
        destructuredArrayIgnorePattern: "[A-Z]",
        caughtErrors: "none",
      },
    ],
    "@typescript-eslint/no-magic-numbers": [
      "off",
      {
        ignoreEnums: true,
        ignoreNumericLiteralTypes: true,
        ignoreReadonlyClassProperties: true,
        ignoreTypeIndexes: true,
      },
    ],
    "@typescript-eslint/no-unnecessary-template-expression": "error",
    "@typescript-eslint/no-empty-object-type": [
      "warn",
      { allowWithName: "Props$", allowObjectTypes: "never" },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        fixStyle: "inline-type-imports"
      },
    ],
    "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
  }
});
