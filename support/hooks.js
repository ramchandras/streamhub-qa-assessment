
const { Before, After, Status } = require("@cucumber/cucumber");

Before({ tags: "@ui" }, async function () {
  await this.launchBrowser();
});

After(async function (scenario) {
  if (
    scenario.pickle.tags.some(tag => tag.name === "@ui") &&
    scenario.result?.status === Status.FAILED &&
    this.page
  ) {
    await this.attach(await this.page.screenshot({ fullPage: true }), "image/png");
  }

  await this.apiContext?.dispose();
  await this.closeBrowser();
});
