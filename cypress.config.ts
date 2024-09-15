// cypress.config.js (CommonJS)

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    supportFile: false, // Disable the support file

    setupNodeEvents(on, config) {
      // Node event listeners here
    },
    baseUrl: "http://localhost:5173",
    specPattern: "test/e2e/cypress/**/*.cy.{js,jsx,ts,tsx}",
  },
});
