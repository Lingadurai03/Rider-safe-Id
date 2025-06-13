import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import rootConfig from '../../eslint.config.mjs'; // adjust path if needed

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...rootConfig, // 🌟 Extend root config first!
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
];

export default eslintConfig;
