const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: "http://localhost:3000/SnapShot#/SnapScout",
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
