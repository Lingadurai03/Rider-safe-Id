import rootConfig from '../../eslint.config.mjs';

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
