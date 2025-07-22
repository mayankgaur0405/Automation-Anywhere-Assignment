import InstanceBuilder from "../pages/LearningInstancePage";
import AuthHandler from "../pages/LoginPage";

describe("Use Case 2: Create Learning Instance with Fixture Data", () => {
  const authHandler = new AuthHandler();
  const instanceBuilder = new InstanceBuilder();

  beforeEach(() => {
    cy.fixture("testData").then((data) => {
      cy.visit("/");
      authHandler.performLogin(data.username, data.password);
    });
  });

  it("should create a learning instance and verify", () => {
    cy.fixture("testData").then((data) => {
      instanceBuilder.openModule();
      instanceBuilder.buildInstance(data.learningInstance);
      instanceBuilder.confirmInstanceCreated(data.learningInstance);
    });
  });
});
