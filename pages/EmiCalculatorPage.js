
class EmiCalculatorPage {
  constructor(page) {
    this.page = page;
    this.loanAmount = page.getByLabel("Loan Amount (₹)");
    this.interestRate = page.getByLabel("Interest Rate (% per year)");
    this.loanTenure = page.getByLabel("Loan Tenure (years)");
    this.calculateButton = page.getByRole("button", {
      name: "Calculate EMI"
    });
    this.monthlyEmi = page.getByTestId("monthly-emi");
    this.totalInterest = page.getByTestId("total-interest");
    this.totalPayment = page.getByTestId("total-payment");
    this.chart = page.locator("#emiChart");
    this.chartStatus = page.getByRole("status");
  }

  async open() {
    await this.page.goto(process.env.BASE_URL);
  }

  async calculate(amount, rate, years) {
    await this.loanAmount.fill(String(amount));
    await this.interestRate.fill(String(rate));
    await this.loanTenure.fill(String(years));
    await this.calculateButton.click();
  }
}

module.exports = EmiCalculatorPage;
