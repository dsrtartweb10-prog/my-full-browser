export default [
  {
    files: ["src/**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly"
      }
    },
    plugins: {},
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      indent: ["error", 2],
      "no-unused-vars": ["warn"],
      "no-console": "off"
    }
  },
  {
    files: ["src/renderer/**/*.js"],
    languageOptions: {
      globals: {
        window: "readonly",
        document: "readonly"
      }
    }
  },
  {
    files: ["src/main/**/*.js", "src/preload/**/*.js"],
    languageOptions: {
      globals: {
        process: "readonly",
        __dirname: "readonly"
      }
    }
  }
];
