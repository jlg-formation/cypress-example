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

  it("should not add an bad article", () => {
    cy.contains(".button", "Voir le stock").click();
    cy.get(".button[title='Ajouter']").click();

    cy.url().should(
      "eq",
      "https://jlg-formation.github.io/cypress-gestion-stock/stock/add"
    );

    cy.get("input").should("have.length", 3);
    cy.get("input").first().clear().type("Tournevis Cruciforme");
    cy.get("input").eq(1).clear().type("12.34");
    cy.get("input").last().clear().type("456");

    cy.contains("button", "Ajouter").should("be.disabled");
  });
});
