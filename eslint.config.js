import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.ts"],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json"
      }
    },

    plugins: {
      "@typescript-eslint": tseslint
    },

    rules: {

      // require explicit types everywhere
      "@typescript-eslint/typedef": [
        "error",
        {
          variableDeclaration: true,
          parameter: true,
          propertyDeclaration: true,
          memberVariableDeclaration: true,
          arrowParameter: true
        }
      ],

      // require return types
      "@typescript-eslint/explicit-function-return-type": "error",

      // require return types for exported functions
      "@typescript-eslint/explicit-module-boundary-types": "error",

      // exhaustive union checking
      "@typescript-eslint/switch-exhaustiveness-check": "error",

      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

    }
  }
];
