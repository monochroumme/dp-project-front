module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  globals: {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2022,
    sourceType: "module",
    project: "./tsconfig.json"
  },
  settings: {
    'import/extensions': [".js", ".jsx", ".ts", ".tsx"],
    'import/resolver': {
      typescript: {}
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
  },
  plugins: ['react-refresh', 'react', '@typescript-eslint', 'react-hooks', 'import'],
  rules: {
    'react-refresh/only-export-components': "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "no-fallthrough": "off",
    "no-console": "off",
    "consistent-return": "off",
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "variable",
        "modifiers": ["unused"],
        "format": ["strictCamelCase"],
        "leadingUnderscore": "require"
      },
    ],
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "no-empty": "off",
    "no-continue": "off",
    "no-nested-ternary": "off",
    "import/no-extraneous-dependencies": "off",
    "no-case-declarations": "off",
    "linebreak-style": "off",
    "max-len": ["error", {"code": 120, "ignoreUrls": true, "ignoreComments": true, "ignoreStrings": true}],
    "arrow-body-style": [
      "error",
      "as-needed"
    ],
    "react/self-closing-comp": [
      "error",
      {
        "component": true,
        "html": true
      }
    ],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        "prefer": "type-imports"
      }
    ],
    "padding-line-between-statements": [
      "error",
      {
        "blankLine": "always",
        "prev": "*",
        "next": "return"
      },
      {
        "blankLine": "always",
        "prev": "const",
        "next": "if"
      },
      {
        "blankLine": "always",
        "prev": "let",
        "next": "if"
      },
      {
        "blankLine": "always",
        "prev": "if",
        "next": "if"
      }
    ],
    "react/jsx-props-no-spreading": "off",
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto"
      }
    ],
    "react/jsx-curly-brace-presence": [
      "error",
      {
        "props": "never",
        "children": "never"
      }
    ],
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        "warnOnUnassignedImports": true,
        "groups": [
          "builtin",
          "external",
          "internal",
          "type",
          "sibling",
          "parent",
          "index",
          "object"
        ]
      }
    ],
    "react/jsx-sort-props": [
      1,
      {
        "multiline": "last",
        "shorthandFirst": true,
        "reservedFirst": true
      }
    ],
    "import/prefer-default-export": "off",
    "react/no-array-index-key": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/lines-between-class-members": "off",
    "react-hooks/exhaustive-deps": "off",
    "react/prop-types": "off",
    "react/require-default-props": "off",
    "react/destructuring-assignment": ["off", "always", {
      "ignoreClassFields": true,
      "destructureInSignature": "ignore"
    }],
    "@typescript-eslint/no-unused-vars": ["error", {
      "argsIgnorePattern": "^_",
      "ignoreRestSiblings": true,
      "destructuredArrayIgnorePattern": "^_"
    }],
    "@typescript-eslint/no-shadow": ["error"],
    "react-hooks/rules-of-hooks": "error",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "ts": "never",
        "tsx": "never"
      }
    ],
    "no-param-reassign": ["error", {"props": false}],
    "func-style": [
      "error",
      "expression",
      {"allowArrowFunctions": true}
    ],
  }
}
