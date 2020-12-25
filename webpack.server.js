require("dotenv").config();

module.exports = {
  module: {
    rules: [
      {
          test: /node_modules[/\\]jsonstream/i
          , loader: 'shebang-loader'
      }
    ]
  }
};
