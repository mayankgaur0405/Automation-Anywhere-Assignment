import LoginPage from "../pages/LoginPage";

describe("Login Test with Fixture Data", () => {
  const loginPage = new LoginPage();

  it("should login successfully using testData.json", () => {
    cy.visit("/");
    loginPage.performLogin();
  });
});