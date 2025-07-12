import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import pluginQuery from '@tanstack/eslint-plugin-query'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [{
  plugins:{
    '@tanstack/query': pluginQuery,
  },
  rules:{
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    '@tanstack/query/exhaustive-deps': 'error',
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),

}];

export default eslintConfig;
