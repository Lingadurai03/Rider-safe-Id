import { dirname } from 'path';
import { fileURLToPath } from 'url';

import rootConfig from '../../eslint.config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
    ...rootConfig,
    {
        files: ['src/**/*.ts'],
        languageOptions: {
            parserOptions: {
                project: ['./tsconfig.json'],
            },
        },
    },
];
