/*global module*/
/*global __dirname*/
/*eslint no-console: ["error", { allow: ["log", "error"] }] */
import webpack from "webpack"
import { resolve } from "path"
import postcssImport from "postcss-smart-import"
import postcssCssnext from "postcss-cssnext"
import postcssSorting from "postcss-sorting"
import precss from "precss"
import loadenv from "node-env-file"
import CompressionPlugin from "compression-webpack-plugin"

var env = "production"
console.log("環境:" + env)
loadenv("./nodeConfig/." + env)

module.exports = {
  context: resolve(__dirname, "src"),
  entry: {
    "js/application": "./js/app",
  },
  output: {
    path: resolve(__dirname, "product"),
    filename: "js/bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        include: /css/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              localIdentName: "[hash:base64]-[name]-[local]",
              modules: true,
            }
          } ,{
            loader: "postcss-loader",
          }
        ],
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.EnvironmentPlugin([
      "BASE_URL",
      "IMAGE_PATH",
      "UPLOAD_PATH",
      "ENV",
    ]),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [require("autoprefixer")({browsers: ["last 2 versions"]})]
      }
    }),
    postcssImport,
    postcssCssnext,
    precss,
    postcssSorting,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new CompressionPlugin({asset: "[path].gz[query]", algorithm: "gzip", test: /\.js$/, threshold: 10240, minRatio: 0.8})
  ],
}
