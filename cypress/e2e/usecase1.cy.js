
import LoginPage from "../pages/LoginPage";
import BotWorker from "../pages/BotPage";
import BoxEditor from "../pages/messageBoxPage";

describe("Use Case 1: Bot Creation using Fixture Data", () => {
  const loginPage = new LoginPage();
  const botWorker = new BotWorker();
  const boxEditor = new BoxEditor();


  beforeEach(() => {
    cy.fixture("testData").then((data) => {
      cy.visit("/");
      loginPage.performLogin(data.username, data.password);
    });
  });

  it("should create a message box bot and assert creation", () => {
    cy.fixture("testData").then((data) => {
      botWorker.makeBot(data.botName);
      botWorker.checkBot(data.botName);

      boxEditor.searchAndAddBox();
      boxEditor.writeBoxText("Bot By Mayank");
      boxEditor.saveBox();
      boxEditor.confirmBoxSaved("Bot By Mayank");
      boxEditor.closeEditorWindow();
    });
  });
});
