import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import react from "eslint-plugin-react";

export default [
  { ignores: ["dist"] },
  js.configs.recommended,
  { files: ["src/**/*.{js,jsx}"], languageOptions: { ecmaVersion: 2023, globals: globals.browser, parserOptions: { ecmaFeatures: { jsx: true }, sourceType: "module" } }, plugins: { react, "react-hooks": reactHooks, "react-refresh": reactRefresh }, rules: { ...reactHooks.configs.recommended.rules, ...reactRefresh.configs.vite.rules, "react/jsx-uses-vars": "error", "no-unused-vars": ["error", { argsIgnorePattern: "^_" }] } }
];
