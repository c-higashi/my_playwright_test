# saucedemo

## This is the automated tests for the website  https://www.saucedemo.com/ using Playwright (typescript).

### NOTES
- For this exercise I have configured this framework so that the tests only run in Chrome. <br>
- The tests are configured to run in parallel. <br>
- The tests run in headless mode by default. <br>

### Pre-requisite <br>
Please install Playwright: please run `npm init playwright@latest` <br>

### Tests
All the tests are in `tests/saucedemo.spec.ts`.

### Executing the tests
How to run all the tests: please run `npx playwright test saucedemo.spec.ts`

How to run the tests in headed mode: please run `npx playwright test saucedemo.spec.ts  --headed`

How to run an individual test (in headed mode): please run `npx playwright test saucedemo.spec.ts --headed --grep "<test name>"`

How to generate the test result report: please run `npx playwright show-report`