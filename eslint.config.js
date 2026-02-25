export default [
  {
    ignores: [
      'dist/**',
      'build/**',
      'node_modules/**',
      'src/js/js_mavlink_v2.js'
    ]
  },
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        process: 'readonly',
        navigator: 'readonly',
        fetch: 'readonly'
      }
    },
    rules: {}
  }
];
