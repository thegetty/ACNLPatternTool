// DO NOT EVEN TRY TO USE BABEL-NODE CLI
// THIS FILE IS MEANT TO BE PASSED TO WEBPACK
const { pathToClientSrc, pathToZxingBuild } = require("../etc/paths");

// USE WEBPACK FORMAT, NOT BABEL.CONFIG.JS FORMAT
const babelDevConfig = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry", // this is the key. use 'usage' for further codesize reduction, but it's still 'experimental'
      },
    ],
  ],
  plugins: [
    [
      "babel-plugin-module-resolver",
      {
        root: [pathToClientSrc],
        alias: {
          "^@zxing/library$": pathToZxingBuild,
        },
      },
    ],
    ["@babel/plugin-proposal-object-rest-spread"],
    [("@babel/plugin-transform-runtime", {})],
    [("@babel/plugin-proposal-export-namespace-from", {})],
    [("@babel/plugin-transform-modules-commonjs", {})],
  ],
};

const babelProdConfig = {
  ...babelDevConfig,
};

module.exports = {
  babelDevConfig,
  babelProdConfig,
};
