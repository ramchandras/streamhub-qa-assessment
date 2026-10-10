
/*
 * Streamhub AI Self-Healing Exercise
 *
 * INTENTIONALLY BROKEN LOCATORS.
 * Do not import this file into the normal test suite.
 * Use these examples to demonstrate AI-assisted diagnosis and repair.
 */

const brokenLocators = (page) => ({
  // 1. Incorrect test ID
  monthlyEmi: page.getByTestId("monthly-payment"),

  // 2. Incorrect accessible name
  calculateButton: page.getByRole("button", {
    name: "Submit Loan"
  }),

  // 3. Brittle positional selector
  loanAmount: page.locator("div:nth-child(2) > input"),

  // 4. Unstable generated class
  interestRate: page.locator(".css-8f3abc"),

  // 5. Overly broad text selector
  emiText: page.getByText("EMI")
});

module.exports = { brokenLocators };
