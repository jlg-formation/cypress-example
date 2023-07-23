describe("add and remove stock articles", () => {
  beforeEach(() => {
    cy.visit("https://jlg-formation.github.io/cypress-gestion-stock/");
  });

  it("add and remove stock articles", () => {
    cy.contains("Gestion Stock");

    cy.contains("footer", "Mentions Légales");
    cy.get("main").contains("h1", "Gérer efficacement votre stock");
    cy.get("button, .button").contains("voir le stock", { matchCase: false });
  });
});
