const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env, argv) => {
  const isDev = argv.mode === "development";
  const plugins = [];

  if (!isDev) {
    plugins.push(
      ...[
        new ESLintPlugin({
          emitWarning: true,
          emitError: true,
          failOnError: true,
          failOnWarning: true,
          extensions: ["ts", "tsx", "js", "jsx", "json"],
        }),
        new ForkTsCheckerWebpackPlugin({
          formatter: "codeframe",
        }),
        new CircularDependencyPlugin({
          exclude: /node_modules/,
          failOnError: true,
          cwd: process.cwd(),
        }),
      ]
    );
  }

  return {
    mode: "production",
    target: "web",
    entry: ["./src/index.ts"],
    output: {
      filename: "index.js",
      path: __dirname + "/dist",
      library: "use-mounted-effect",
      libraryTarget: "umd",
      globalObject: "this",
      umdNamedDefine: true,
    },
    resolve: {
      extensions: [".ts"],
      alias: {
        react: path.resolve(__dirname, "./node_modules/react"),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: "babel-loader",
            },
          ],
        },
      ],
    },
    externals: {
      react: {
        commonjs: "react",
        commonjs2: "react",
        amd: "React",
        root: "React",
      },
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: !isDev,
            },
            output: {
              comments: false,
            },
          },
        }),
      ],
    },
    plugins,
  };
};
