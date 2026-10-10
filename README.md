
# Streamhub QA Automation Assessment

## Overview

This project demonstrates UI automation, API testing, SQL queries,
and an AI-assisted locator self-healing exercise.

## Technology Stack

- Node.js
- Playwright
- Cucumber
- JavaScript
- SQLite-compatible SQL examples
- HTML test reporting

## Project Structure

- `src/` — EMI Calculator web application
- `features/` — Cucumber feature files
- `features/step-definitions/` — Cucumber step implementations
- `pages/` — Page Object Model
- `support/` — browser hooks and custom World
- `tests/sql/` — SQL challenge scripts
- `tests/broken-locators.example.js` — intentionally brittle locator examples
- `docs/ai-self-healing.md` — AI self-healing approach
- `reports/` — generated Cucumber HTML report

## Prerequisites

- Node.js and npm
- Git

## Installation

Install dependencies:

```bash
npm install
```

Install Chromium:

```bash
npx playwright install chromium
```

## Run the Application

Start the EMI Calculator from the project root:

```bash
npx http-server src -p 3000
```

Keep the server running.

## Run Automated Tests

In a separate terminal:

```bash
npm run test:e2e
```

The Cucumber report is generated at:

`reports/cucumber-report.html`

## SQL Challenges

The SQL files demonstrate:

1. Similar reverse transactions within 24 hours.
2. Three consecutive matches with at least 30 runs.

The included IPL records are illustrative sample data, not verified IPL 2024 statistics.

## AI Self-Healing Exercise

See `docs/ai-self-healing.md` and
`tests/broken-locators.example.js`.

The intentionally broken locator examples are excluded from normal test
execution. The documentation describes the proposed AI diagnosis,
repair, and validation workflow.

## Test Results

Record the actual test execution date, scenario count, step count,
and any failures here after the final run.

Include a screenshot or other execution evidence with the submission.

## AI Tool Reflection

Document the AI tools used, the suggestions accepted or rejected,
any debugging performed, and the validation carried out by the developer.
