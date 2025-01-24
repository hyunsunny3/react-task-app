import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: '@typescript-eslint/parser',
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
    overrides: [
      {
        files: ['**/*.ts', '**/*.tsx'], // TS/TSX 파일에 적용
        rules: {
          "no-unused-vars": "off", // TSX 파일에서 기본 규칙 비활성화
          "@typescript-eslint/no-unused-vars": "off", // TSX 파일에서 TS 규칙 비활성화
        },
      },
    ],
  },
);
