module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: [
    "eslint:recommended",
    "plugin:node/recommended"
  ],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module"
  },
  rules: {
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "indent": ["error", 2],
    "no-unused-vars": ["warn"],
    "no-console": "off"
  },
  overrides: [
    {
      files: ["src/renderer/**/*.js"],
      env: {
        browser: true,
        node: false
      }
    },
    {
      files: ["src/main/**/*.js", "src/preload/**/*.js"],
      env: {
        node: true,
        browser: false
      }
    }
  ]
};
