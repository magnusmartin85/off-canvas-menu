module.exports = {
  extends: ["stylelint-config-standard-scss", "stylelint-config-prettier"],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    "declaration-empty-line-before": null,
    "color-no-invalid-hex": true,
    "at-rule-no-unknown": null,
    "function-no-unknown": null,
    "string-quotes": "double",
  },
  overrides: [
    {
      files: ["*.scss", "**/*.scss"],
      customSyntax: "postcss-scss",
    },
  ],
};
