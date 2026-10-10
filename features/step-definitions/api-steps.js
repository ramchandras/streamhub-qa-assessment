
const { When, Then } = require("@cucumber/cucumber");
const assert = require("node:assert/strict");
const { request } = require("@playwright/test");

const API_URL = "https://jsonplaceholder.typicode.com/posts";

When("I send a valid create post request", async function () {
  this.apiContext = await request.newContext();

  this.apiResponse = await this.apiContext.post(API_URL, {
    data: {
      title: "Streamhub API test",
      body: "Valid post request",
      userId: 1
    }
  });
});

When(
  "I send a create post request with an excessively long title",
  async function () {
    this.apiContext = await request.newContext();

    this.apiResponse = await this.apiContext.post(API_URL, {
      data: {
        title: "A".repeat(10000),
        body: "Long title boundary test",
        userId: 1
      }
    });
  }
);

When(
  "I send a create post request with special characters",
  async function () {
    this.apiContext = await request.newContext();

    this.apiResponse = await this.apiContext.post(API_URL, {
      data: {
        title: "<>{}[]!@#$%^&*()'\"",
        body: "Special character test",
        userId: 1
      }
    });
  }
);

When("I send a create post request without userId", async function () {
  this.apiContext = await request.newContext();

  this.apiResponse = await this.apiContext.post(API_URL, {
    data: {
      title: "Missing userId test",
      body: "Invalid request test"
    }
  });
});

Then("the API response status should be {int}", async function (status) {
  assert.equal(this.apiResponse.status(), status);
});

Then(
  "the response should contain the created post details",
  async function () {
    const body = await this.apiResponse.json();

    assert.equal(body.title, "Streamhub API test");
    assert.equal(body.userId, 1);
    assert.ok(body.id !== undefined);
  }
);

Then(
  "the API should respond without a server error",
  async function () {
    assert.ok(
      this.apiResponse.status() < 500,
      `Unexpected server error: ${this.apiResponse.status()}`
    );
  }
);
