import { articles } from "../../fixtures/articles";

describe("add and remove stock articles", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200/");
  });

  it.only("should call the list of articles", () => {
    cy.intercept({ method: "GET", url: "/api/articles" }, articles).as(
      "getArticles"
    );
    cy.contains(".button", "Voir le stock").click();
    cy.wait("@getArticles");
    cy.get("tbody tr:not(:hidden)").should("have.length", 2);
  });

  it("should delete the pelle", () => {
    cy.intercept({ method: "GET", url: "/api/articles" }, articles).as(
      "getArticles"
    );
    cy.contains(".button", "Voir le stock").click();
    cy.wait("@getArticles");

    cy.contains("table tbody tr", "Pelle").click();

    cy.intercept({ method: "DELETE", url: "/api/articles" }, articles).as(
      "deleteArticles"
    );
    cy.intercept(
      { method: "GET", url: "/api/articles" },
      articles.filter((a) => a.name !== "Pelle")
    ).as("getArticles");
    cy.get("button[title='Supprimer']").click();
    cy.wait("@deleteArticles");
    cy.wait("@getArticles");
  });

  it("should add a new article", () => {
    cy.intercept({ method: "GET", url: "/api/articles" }, articles).as(
      "getArticles"
    );
    cy.contains(".button", "Voir le stock").click();
    cy.wait("@getArticles");

    cy.get(".button[title='Ajouter']").click();

    cy.get("input").first().clear().type("Truc");
    cy.tab().clear().type("12.34");
    cy.tab().clear().type("456");

    cy.intercept({ method: "POST", url: "/api/articles" }).as("addNewArticle");
    cy.intercept({ method: "GET", url: "/api/articles" }, [
      ...articles,
      { id: "a3", name: "Truc", price: 12.34, qty: 456 },
    ]).as("getArticles");
    cy.contains("button", "Ajouter").click();
    cy.wait("@addNewArticle");
    cy.wait("@getArticles");
  });
});
