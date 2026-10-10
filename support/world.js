
const { setWorldConstructor, World } = require("@cucumber/cucumber");
const { chromium } = require("@playwright/test");
require("dotenv").config();

class CustomWorld extends World {
  async launchBrowser() {
    this.browser = await chromium.launch({ headless: true });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async closeBrowser() {
    await this.browser?.close();
  }
}

setWorldConstructor(CustomWorld);
