import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
    // Ingore build and dipendency folders
    {
        ignores: ["dist/**", "node_modules/**"],
    },
    // Base rules for JS files
    {
        files: ["**/*.{js,mjs,cjs,jsx}"],
        env: { node: true, es2022: true },
    },
    // Base rules for TS files
    {
        files: ["**/*.{ts,tsx}"],
        env: { node: true, es2022: true },
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
            },
        },
    },
    // Recommended config for JS
    pluginJs.configs.recommended,
    // Recommended config for TS
    tseslint.configs.recommended,
];
