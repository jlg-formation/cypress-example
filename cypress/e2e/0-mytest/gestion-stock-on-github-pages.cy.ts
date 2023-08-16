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

    cy.get("input").should("have.length", 6);
    cy.get("input").first().clear().type("Tournevis Cruciforme");
    cy.tab().clear().type("12.34");
    cy.tab().invoke("val", 55).trigger("change");
    cy.tab().check();
    cy.tab().select("Alimentation");
    cy.tab();
    cy.get("input[type='radio']").first().should("have.focus");
    cy.get("input[type='radio']").check("perishable");
    cy.contains("Date de péremption");
    cy.tab().type("2025-08-25");
    cy.contains("button", "Ajouter").should("be.disabled");
  });
});
