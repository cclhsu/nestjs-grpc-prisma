module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['node_modules', 'bin', 'build', 'dist', 'out', 'public', '.eslintrc.js', 'generated', 'src/**/generated/*',],
  rules: {
    // '@typescript-eslint/interface-name-prefix': 'off',
    // '@typescript-eslint/explicit-function-return-type': 'off',
    // '@typescript-eslint/explicit-module-boundary-types': 'off',
    // '@typescript-eslint/no-explicit-any': 'off',
    // '@typescript-eslint/no-unused-vars': ['error'],
    // '@typescript-eslint/space-before-function-paren': ['error'],
    // 'prettier/prettier': ['error', { trailingComma: 'none' }],
    // 'no-multiple-empty-lines': [2, { max: 1 }],
    // 'space-before-function-paren': ['error', 'always'],
    // 'array-bracket-spacing': ['error', 'never'],
    // 'no-whitespace-before-property': 'error',
    // 'no-unused-vars': 'off',
    // 'object-curly-spacing': [2, 'always', { 'objectsInObjects': false, 'arraysInObjects': false }],
    // 'quotes': ['error', 'single']

    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/no-unused-modules': 'error',
    // array element multiline
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
  },
};
