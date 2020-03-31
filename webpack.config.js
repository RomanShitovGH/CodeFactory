const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); 
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./static/app.jsx", 
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "public")
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: "static",
                to: "",
                ignore: [
                    "*.jsx"
                ]
            }
        ])
    ],
    module: {
        rules: [
          {
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-react"]
              }
            }
          }
        ]
    },
    devServer: {
      //contentBase: __dirname + "/public/",
      //overlay: true,
      // inline: true,
      // port: 3000,
      
    },

}

