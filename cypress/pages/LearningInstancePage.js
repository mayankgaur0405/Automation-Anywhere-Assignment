class InstanceBuilder {
  openModule() {
    cy.get('button[name="ai"]', { timeout: 15000 }).should("be.visible").click();
    cy.get('a[name="module-cognitive-iqbot-learning-instances"]', { timeout: 15000 }).should("be.visible").click();

    cy.url().should("include", "/modules/cognitive/iqbot/pages/learning-instances");

    cy.get("body").then(($body) => {
      if ($body.find(".main-layout-upgrade-banner").length) {
        cy.get(".main-layout-upgrade-banner__close").click();
      }
    });

    cy.waitUntil(() =>
      cy
        .get("iframe.modulepage-frame", { timeout: 20000 })
        .its("0.contentDocument.body")
        .should("not.be.empty")
        .then(cy.wrap)
        .find("#create-learning-instance-button button")
        .then(($btn) => !$btn.hasClass("command-button__button--is_disabled"))
    );

    return this;
  }

  buildInstance(details) {
    cy.get("iframe.modulepage-frame", { timeout: 20000 })
      .its("0.contentDocument.body")
      .should("not.be.empty")
      .then(cy.wrap)
      .find("#create-learning-instance-button button")
      .click({ force: true });

    cy.get("iframe.modulepage-frame")
      .its("0.contentDocument.body")
      .then(cy.wrap)
      .find('input[name="name"]')
      .clear()
      .type(details.name);

    cy.get("iframe.modulepage-frame")
      .its("0.contentDocument.body")
      .then(cy.wrap)
      .find('textarea[name="description"]')
      .clear()
      .type(details.description);

    cy.get("iframe.modulepage-frame")
      .its("0.contentDocument.body")
      .then(cy.wrap)
      .find('div[data-name="domainId"] button[data-path="RioSelectInputQuery.toggle-button"]')
      .first()
      .click({ force: true });

    cy.wait(2000);

    cy.get("iframe.modulepage-frame")
      .its("0.contentDocument.body")
      .then(cy.wrap)
      .find(".rio-select-input-dropdown-option-label-line__text-label-line")
      .contains("User-defined")
      .click({ force: true });

    cy.get("iframe.modulepage-frame")
      .its("0.contentDocument.body")
      .then(cy.wrap)
      .find('div[data-name="domainId"] .clipped-text__string--for_presentation')
      .should("contain.text", "User-defined");

    cy.get("iframe.modulepage-frame")
      .its("0.contentDocument.body")
      .then(cy.wrap)
      .contains("button", "Next")
      .click();

    cy.get("iframe.modulepage-frame")
      .its("0.contentDocument.body")
      .then(cy.wrap)
      .contains("button", "Add a field")
      .click();

    cy.get("iframe.modulepage-frame")
      .its("0.contentDocument.body")
      .then(cy.wrap)
      .find('input[placeholder="Field name"]')
      .type(details.fields.fieldName);

    cy.get("iframe.modulepage-frame")
      .its("0.contentDocument.body")
      .then(cy.wrap)
      .find('input[placeholder="Field label"]')
      .type(details.fields.fieldLabel);

    cy.get("iframe.modulepage-frame")
      .its("0.contentDocument.body")
      .then(cy.wrap)
      .find('input[name="confidenceThreshold"]')
      .click();

    cy.wait(500);

    cy.get("iframe.modulepage-frame")
      .its("0.contentDocument.body")
      .then(cy.wrap)
      .find('button[aria-label="Create"].command-button__button--is_solid')
      .should("have.attr", "data-input-status", "INTERACTIVE")
      .click();

    return this;
  }

  confirmInstanceCreated(details) {
    cy.get('a[name="dashboard"]').should("be.visible").click();
    cy.wait(3000);

    cy.get("body").then(($body) => {
      if ($body.find("iframe").length) {
        cy.get("iframe")
          .its("0.contentDocument.body")
          .should("not.be.empty")
          .then(cy.wrap)
          .contains(details.name, { timeout: 15000 })
          .should("exist")
          .and("be.visible");
      } else {
        cy.contains(details.name, { timeout: 15000 })
          .should("exist")
          .and("be.visible");
      }
    });

    return this;
  }
}

export default InstanceBuilder;
