const path = require("path");

module.exports = options => {
  return {
    entry: {
      "react-framer": "./src/index.js",
      example: "./example/app.js"
    },
    output: {
      filename: "[name].js",
      path: path.join(__dirname, "dist"),
      publicPath: "/dist/"
    },
    module: {
      rules: [
        {
          test: /.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                cacheDirectory: true
              }
            }
          ]
        }
      ]
    },
    externals: {
      framer: "Framer"
    }
  };
};
