describe("App Initialization", () => {
  it("loads the app and displays the title", () => {
    cy.visit("/");
    cy.contains("h1", "Planet OSM!").should("be.visible");
  });
});
