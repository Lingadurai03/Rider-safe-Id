import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import rootConfig from '../../eslint.config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...rootConfig,
  {
    files: ['src/**/*.{ts,tsx}', 'next-env.d.ts', 'next.config.ts'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.eslint.json'], // 👈 Now points to correct local config
      },
    },
  },
];
