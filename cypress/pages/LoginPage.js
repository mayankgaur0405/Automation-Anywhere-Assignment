class AuthPage {
  openApp() {
    cy.visit("/");
  }

  fillEmail(userEmail = Cypress.env("username")) {
    cy.get('[name="username"]', { timeout: 10000 })
      .should("be.visible")
      .type(userEmail);
  }

  fillPassword(userPass = Cypress.env("password")) {
    cy.get('[name="password"]', { timeout: 10000 })
      .should("be.visible")
      .type(userPass);
  }

  submitLoginForm() {
    cy.get('[name="submitLogin"]', { timeout: 10000 })
      .should("be.visible")
      .click();
  }

  performLogin(userEmail = Cypress.env("username"), userPass = Cypress.env("password")) {
    this.fillEmail(userEmail);
    this.fillPassword(userPass);
    this.submitLoginForm();
  }
}

export default AuthPage;
