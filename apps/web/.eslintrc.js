/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    amd: true,
  },
  ignorePatterns: ["postcss.config.js", "tailwind.config.js", ".eslintrc.js"],
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "args": "all",
        "argsIgnorePattern": "^_",
        "caughtErrors": "none"
      }
    ],
    "@typescript-eslint/no-unused-vars": 2,
    "react/jsx-filename-extension": [
      0,
      {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    ],
    "linebreak-style": ["error", "windows"],
    "react/function-component-definition": 0,
    "@next/next/no-img-element": "off",
    "no-nested-ternary": "off",
    "react/no-unescaped-entities": "off",
    "no-param-reassign": "off",
    "no-underscore-dangle": 0,
    "import/no-extraneous-dependencies": [
      "error",
      {
        peerDependencies: true,
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "import/no-unresolved": [
      0,
      {
        caseSensitive: false,
      },
    ],
    "max-len": [
      "error",
      {
        code: 170,
      },
    ],
    "no-tabs": [
      "error",
      {
        allowIndentationTabs: true,
      },
    ],
  },
  extends: ["@repo/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
    // project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint", "import"],
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  extends: [
    "airbnb-base",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  globals: {
    JSX: true,
  },
};
