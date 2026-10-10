
const loanAmountInput = document.getElementById("loanAmount");
const interestRateInput = document.getElementById("interestRate");
const loanTenureInput = document.getElementById("loanTenure");
const calculateBtn = document.getElementById("calculateBtn");
const errorMessage = document.getElementById("errorMessage");

let emiChart;

function calculateLoan(principal, annualRate, years) {
  const months = years * 12;
  const monthlyRate = annualRate / 12 / 100;

  const emi = monthlyRate === 0
    ? principal / months
    : principal * monthlyRate * Math.pow(1 + monthlyRate, months) /
      (Math.pow(1 + monthlyRate, months) - 1);

  const totalPayment = emi * months;

  return {
    emi,
    totalPayment,
    totalInterest: totalPayment - principal,
    months
  };
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  }).format(value);
}

function updateChart(principal, interest) {
  const context = document.getElementById("emiChart");

  if (emiChart) {
    emiChart.destroy();
  }

  emiChart = new Chart(context, {
    type: "pie",
    data: {
      labels: ["Principal", "Total Interest"],
      datasets: [{
        data: [principal, interest]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });

  document.getElementById("chartStatus").textContent =
    `Principal: ${formatCurrency(principal)}; ` +
    `Total Interest: ${formatCurrency(interest)}`;
}

function calculateAndRender() {
  errorMessage.hidden = true;

  const principal = Number(loanAmountInput.value);
  const annualRate = Number(interestRateInput.value);
  const years = Number(loanTenureInput.value);

  if (
    !Number.isFinite(principal) || principal <= 0 ||
    !Number.isFinite(annualRate) || annualRate < 0 ||
    !Number.isFinite(years) || years <= 0 ||
    years > 40
  ) {
    errorMessage.textContent =
      "Enter a positive loan amount, a non-negative interest rate, " +
      "and a tenure greater than 0 and no more than 40 years.";
    errorMessage.hidden = false;
    return;
  }

  const result = calculateLoan(principal, annualRate, years);

  document.getElementById("monthlyEmi").textContent =
    formatCurrency(result.emi);
  document.getElementById("totalInterest").textContent =
    formatCurrency(result.totalInterest);
  document.getElementById("totalPayment").textContent =
    formatCurrency(result.totalPayment);

  document.getElementById("reportLoanAmount").textContent =
    formatCurrency(principal);
  document.getElementById("reportInterestRate").textContent =
    `${annualRate}%`;
  document.getElementById("reportTenure").textContent =
    `${years} years`;
  document.getElementById("reportMonths").textContent =
    String(result.months);

  updateChart(principal, result.totalInterest);
}

calculateBtn.addEventListener("click", calculateAndRender);
