describe("add and remove stock articles", () => {
  beforeEach(() => {
    cy.visit("https://jlg-formation.github.io/cypress-gestion-stock/");
  });

  it("add and remove stock articles", () => {
    cy.contains("Gestion Stock");
  });
});
