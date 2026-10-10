
const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("node:assert/strict");
const EmiCalculatorPage = require("../../pages/EmiCalculatorPage");

Given("I open the EMI calculator", async function () {
  this.emiPage = new EmiCalculatorPage(this.page);
  await this.emiPage.open();
});

When(
  "I calculate EMI for a loan of {int} at {float} percent for {int} years",
  async function (amount, rate, years) {
    this.loan = { amount, rate, years };
    await this.emiPage.calculate(amount, rate, years);
  }
);

Then(
  "the monthly EMI should match the independently calculated value",
  async function () {
    const { amount, rate, years } = this.loan;
    const months = years * 12;
    const monthlyRate = rate / 1200;

    const expectedEmi =
      monthlyRate === 0
        ? amount / months
        : amount * monthlyRate * Math.pow(1 + monthlyRate, months) /
          (Math.pow(1 + monthlyRate, months) - 1);

    const displayedText = await this.emiPage.monthlyEmi.textContent();
    const displayedEmi = Number(displayedText.replace(/[^\d.]/g, ""));

    assert.ok(
      Number.isFinite(displayedEmi) &&
        Math.abs(displayedEmi - expectedEmi) < 0.02,
      `Expected EMI ₹${expectedEmi.toFixed(2)}, received ₹${displayedEmi.toFixed(2)}`
    );
  }
);

Then(
  "the principal and interest chart should contain positive values",
  async function () {
    await this.emiPage.chart.waitFor({ state: "visible" });

    const chartData = await this.page
      .locator("#chartStatus")
      .textContent();

    const values = [...chartData.matchAll(/₹([\d,]+(?:\.\d+)?)/g)]
      .map(match => Number(match[1].replace(/,/g, "")));

    assert.equal(values.length, 2, "Expected principal and interest values");
    assert.ok(
      values.every(value => Number.isFinite(value) && value > 0),
      "Principal and interest values must be positive"
    );
  }
);
