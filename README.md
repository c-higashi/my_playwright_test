# saucedemo

**NOTE1:** For this exercise I have configured this framework so that the tests only run in Chrome. <br>
**NOTE2:** The tests are configured to run in parallel. <br>
**NOTE3:** The tests run in headless mode by default. <br>

### Pre-requisite <br>
Please install Playwright: please run `npm init playwright@latest` <br>

### Executing the tests
How to run all the tests: please run `npx playwright test saucedemo.spec.ts`

How to run the tests in headed mode: please run `npx playwright test saucedemo.spec.ts  --headed`

How to run an individual test (in headed mode): please run `npx playwright test saucedemo.spec.ts --headed --grep "<test name>"`

How to generate the test result report: please run `npx playwright show-report`