const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000', // Adjust this to your app's URL if needed
    supportFile: false, // Disable support file if not using it
  },
});
