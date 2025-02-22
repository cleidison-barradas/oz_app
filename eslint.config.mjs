import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginJest from "eslint-plugin-jest";
import eslintPluginPrettierRecomended from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ["build/"] },
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{spec,test}.{js,jsx,ts,tsx}"],
    ...eslintPluginJest.configs["flat/recommended"],
    rules: {
      ...eslintPluginJest.configs["flat/recommended"].rules,
      "jest/prefer-expect-assertions": "off",
    },
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  eslintPluginPrettierRecomended,
];
