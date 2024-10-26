module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import',
    "prettier",
    "eslint-plugin-import-helpers",
    'node'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'standard-with-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/no-unused-vars": "off",
    'import/no-unresolved': 'error',
    'import/no-cycle': 'warn',
    'node/no-extraneous-import': [
      'error',
      {
        allowModules: ['express'],
      },
    ],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto"
      }
    ],
    "import-helpers/order-imports": [
      "warn",
      {
        newlinesBetween: "always",
        groups: [
          ["/^nestjs/", "/@nestjs/"],
          "/components/",
          "/^module/",
          "/^@shared/",
          "/absolute/",
          ["parent", "sibling", "index"]
        ],
        alphabetize: {
          order: "asc",
          ignoreCase: true
        }
      }
    ]
  },
  settings: {
    ['import/parsers']: { '@typescript-eslint/parser': ['.ts', '.tsx'] },
    ['import/resolver']: {
      node: {
        extensions: ['.ts'],
        moduleDirectory: ['node_modules', 'src/'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
