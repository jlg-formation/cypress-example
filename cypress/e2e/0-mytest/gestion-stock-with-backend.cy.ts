import { articles } from "../../fixtures/articles";

describe("add and remove stock articles", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200/");
  });

  it("should call the list of articles", () => {
    cy.contains(".button", "Voir le stock").click();
    cy.intercept({ method: "GET", url: "/api/articles" }, articles).as(
      "getArticles"
    );
  });
});
