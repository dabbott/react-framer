const path = require("path");

module.exports = options => {
  return {
    entry: {
      lib: "./index.js",
      app: "./app.js"
    },
    output: {
      filename: "[name]-bundle.js",
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
    }
  };
};
