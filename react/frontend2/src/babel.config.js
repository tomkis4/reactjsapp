module.exports = {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            node: "current",
          },
        },
      ],
      "@babel/preset-react",
    ],
    plugins: [
      // Lista dodatkowych pluginów Babela
    ],
  };
  