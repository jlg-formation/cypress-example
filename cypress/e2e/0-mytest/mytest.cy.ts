describe("add and remove stock articles", () => {
  beforeEach(() => {
    cy.visit("https://jlg-formation.github.io/cypress-gestion-stock/");
  });

  it("check the home page content", () => {
    cy.contains("Gestion Stock");

    cy.contains("footer", "Mentions Légales");
    cy.get("main").contains("h1", "Gérer efficacement votre stock");
    cy.get("button, .button").contains("voir le stock", { matchCase: false });
  });

  it("check the links", () => {
    cy.get("footer a").click();
    cy.url().should(
      "eq",
      "https://jlg-formation.github.io/cypress-gestion-stock/legal"
    );
    cy.go("back");
    cy.url().should(
      "eq",
      "https://jlg-formation.github.io/cypress-gestion-stock/"
    );
  });
});
