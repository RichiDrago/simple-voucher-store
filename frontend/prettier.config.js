/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
    printWidth: 150,
    tabWidth: 4,
    trailingComma: "es5",
    htmlWhitespaceSensitivity: "css",
    plugins: ["prettier-plugin-tailwindcss"],
};