module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended", // compatibility config that disables rules from eslint:recommended which are already handled by TypeScript
    "plugin:@typescript-eslint/recommended", // uses typescript-specific linting rules
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react/recommended" // uses react-specific linting rules
    // "prettier/@typescript-eslint",  // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    // "prettier/react", // disables react-specific linting rules that conflict with prettier
    // "plugin:prettier/recommended",  // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  plugins: ["@typescript-eslint", "react-hooks"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    project: "./tsconfig.eslint.json",
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    "@typescript-eslint/no-unnecessary-type-assertion": "off",
    "@typescript-eslint/adjacent-overload-signatures": "error",
    "@typescript-eslint/array-type": "error",
    "@typescript-eslint/ban-types": "error",
    "@typescript-eslint/class-name-casing": "error",
    "@typescript-eslint/explicit-member-accessibility": [
      "error",
      {
        overrides: {
          constructors: "off"
        }
      }
    ],
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/member-ordering": "error",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/consistent-type-assertions": "off",
    "@typescript-eslint/no-empty-interface": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-misused-new": "error",
    "@typescript-eslint/no-namespace": "error",
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/no-parameter-properties": "off",
    "@typescript-eslint/member-ordering": "off",
    "@typescript-eslint/triple-slash-reference": ["error", { types: "prefer-import" }],
    "@typescript-eslint/no-use-before-declare": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-var-requires": "error",
    "@typescript-eslint/prefer-for-of": "error",
    "@typescript-eslint/prefer-function-type": "error",
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    "@typescript-eslint/prefer-namespace-keyword": "error",
    "@typescript-eslint/type-annotation-spacing": "error",
    "@typescript-eslint/unified-signatures": "error",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: false
      }
    ],
    "@typescript-eslint/no-non-null-assertion": "off",
    "no-prototype-builtins": "off",
    camelcase: "off",
    "arrow-body-style": ["off"],
    "arrow-parens": ["error", "as-needed"],
    complexity: [
      "error",
      {
        max: 10
      }
    ],
    "constructor-super": "error",
    curly: "error",
    "default-case": "error",
    "dot-notation": "error",
    "eol-last": "error",
    "guard-for-in": "error",
    indent: "off",
    "linebreak-style": ["error", "unix"],
    "max-classes-per-file": ["error", 1],
    "no-unused-vars": "off",
    "new-parens": "error",
    "no-bitwise": "error",
    "no-caller": "error",
    "no-cond-assign": "error",
    "no-console": "error",
    "no-constant-condition": "error",
    "no-control-regex": "error",
    "no-debugger": "error",
    "no-empty": "error",
    "no-eval": "error",
    "no-fallthrough": "off",
    "no-invalid-regexp": "error",
    "no-invalid-this": "off",
    "require-await": "off",
    "no-irregular-whitespace": "error",
    "no-magic-numbers": [
      "error",
      {
        ignore: [-1, 0, 1, 100]
      }
    ],
    "no-multiple-empty-lines": "error",
    "no-new-wrappers": "error",
    "no-plusplus": [
      "error",
      {
        allowForLoopAfterthoughts: true
      }
    ],
    "no-regex-spaces": "error",
    "no-throw-literal": "error",
    "no-undef-init": "error",
    "no-unsafe-finally": "error",
    "no-unused-labels": "error",
    "no-var": "error",
    "object-shorthand": "error",
    "prefer-const": "error",
    "prefer-template": "error",
    "quote-props": ["error", "consistent-as-needed"],
    radix: "error",
    "space-before-function-paren": [
      "error",
      {
        anonymous: "never",
        asyncArrow: "always",
        named: "never"
      }
    ],
    "use-isnan": "error",
    "valid-typeof": "off",
    "react/prop-types": "off",
    "react/display-name": "off"
  },
  settings: {
    react: {
      version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  }
};
