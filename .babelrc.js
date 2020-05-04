module.exports = {
  presets: ['@theforeman/builder/babel'],
  transformIgnorePatterns: ["^.+\\.svg$"],
  transform: {
    "^.+\\.svg$": "jest-svg-transformer"
  },
  module: {
    rules: [
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
    ],
  },
};
