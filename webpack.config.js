const path = require("path");

module.exports = options => {
  const base = {
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

  const example = {
    ...base,
    entry: {
      example: "./example/app.js"
    },
    output: {
      filename: "[name].js",
      path: path.join(__dirname, "dist"),
      publicPath: "/dist/"
    },
    externals: {
      framer: "Framer",
      "react-framer": "ReactFramer"
    }
  };

  const library = {
    ...base,
    entry: {
      "react-framer": "./src/index.js"
    },
    output: {
      filename: "[name].js",
      path: path.join(__dirname, "dist"),
      publicPath: "/dist/",
      library: {
        root: "ReactFramer",
        commonjs: "react-framer",
        amd: "react-framer"
      },
      libraryTarget: "umd"
    },
    externals: {
      framer: "Framer"
    }
  };

  return [example, library];
};
