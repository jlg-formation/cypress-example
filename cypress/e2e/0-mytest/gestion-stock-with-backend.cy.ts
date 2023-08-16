import { articles } from "../../fixtures/articles";

describe("add and remove stock articles", () => {
  it("should call the list of articles", () => {
    cy.clock();
    cy.visit("http://localhost:4200/");
    cy.intercept({ method: "GET", url: "/api/articles" }, articles).as(
      "getArticles"
    );
    cy.contains(".button", "Voir le stock").click();
    cy.tick(3000);
    cy.wait("@getArticles");
    cy.get("tbody tr:not(:hidden)").should("have.length", articles.length);
  });

  it("should delete the pelle", () => {
    cy.clock();
    cy.visit("http://localhost:4200/");
    cy.intercept({ method: "GET", url: "/api/articles" }, articles).as(
      "getArticles"
    );
    cy.contains(".button", "Voir le stock").click();
    cy.tick(3000);
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
    cy.tick(3000);
    cy.wait("@deleteArticles");
    cy.tick(3000);
    cy.wait("@getArticles");
  });

  it("should add a new article", () => {
    cy.clock();
    // note that .tab() cannot work with .clock()
    cy.visit("http://localhost:4200/");
    cy.intercept({ method: "GET", url: "/api/articles" }, articles).as(
      "getArticles"
    );
    cy.contains(".button", "Voir le stock").click();
    cy.tick(3000);
    cy.wait("@getArticles");

    cy.get(".button[title='Ajouter']").click();
    cy.url().should("eq", "http://localhost:4200/stock/add");

    cy.get("input").should("have.length", 6);
    cy.get("input").first().clear().type("Truc");
    cy.get("input").eq(1).clear().type("12.34");
    cy.get("input").eq(2).invoke("val", 55).trigger("change");
    cy.get("input").eq(3).check();
    cy.get("select").select("Alimentation");

    cy.get("input[type='radio']").check("perishable");
    cy.contains("Date de péremption");
    cy.get("input").eq(6).type("2025-08-25");

    cy.intercept({ method: "POST", url: "/api/articles" }).as("addNewArticle");
    cy.intercept({ method: "GET", url: "/api/articles" }, [
      ...articles,
      { id: "a3", name: "Truc", price: 12.34, qty: 55 },
    ]).as("getArticles");
    cy.contains("button", "Ajouter").click();
    cy.tick(3000);
    cy.wait("@addNewArticle");
    cy.tick(3000);
    cy.wait("@getArticles");
  });
});
