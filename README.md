# saucedemo

NOTE1: For this exercise I have configured this framework so that the tests only run in Chrome.
NOTE2: The tests are configured to run in parallel.
NOTE3: The tests run in headless mode by default.

Pre-requisite
How to install Playwright: please run `npm init playwright@latest`

How to run all the tests: please run `npx playwright test saucedemo.spec.ts`

How to run tests in headed mode: please run `npx playwright test saucedemo.spec.ts  --headed`


How to run an individual test (in headed mode): please run `npx playwright test saucedemo.spec.ts --headed --grep "<test name>"`

How to generate the test result report: please run `npx playwright show-report`