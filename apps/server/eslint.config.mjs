import path from 'node:path';
import { fileURLToPath } from 'node:url';

import baseConfig from '../../eslint.config.mjs';

// Fix __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default baseConfig.map((config) => {
    if (config.languageOptions?.parserOptions) {
        config.languageOptions.parserOptions.project = path.resolve(
            __dirname,
            'tsconfig.json',
        );
        config.languageOptions.parserOptions.tsconfigRootDir = __dirname;
    }
    return config;
});
