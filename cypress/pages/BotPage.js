class BotWorker {
  makeBot(botTitle) {
    cy.contains("button", "Create a bot…", { timeout: 15000 }).should("be.visible").click({ force: true });

    cy.get(".modal-form__content", { timeout: 15000 }).should("be.visible");

    cy.get('input[name="name"]', { timeout: 15000 }).clear().type(botTitle);

    cy.get('[data-value="WINDOWS"]:visible', { timeout: 15000 }).first().click({ force: true });

    cy.get('button[name="submit"]', { timeout: 15000 }).contains("Create & edit").click();
  }

  checkBot(botTitle) {
    cy.contains(botTitle, { timeout: 15000 }).should("exist");
  }
}

export default BotWorker;
