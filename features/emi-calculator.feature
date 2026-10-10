@ui
Feature: EMI Calculator

  Scenario Outline: Calculate home loan EMI and verify the pie chart
    Given I open the EMI calculator
    When I calculate EMI for a loan of <amount> at <rate> percent for <years> years
    Then the monthly EMI should match the independently calculated value
    And the principal and interest chart should contain positive values

    Examples:
      | amount  | rate | years |
      | 2500000 | 10   | 10    |
      | 5000000 | 7.5  | 15    |
