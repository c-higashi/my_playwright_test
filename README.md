# saucedemo

This is the automated tests for the website  https://www.saucedemo.com/ using Playwright (TypeScript).

### NOTES
- For this exercise I have configured this framework so that the tests only run in Chrome.
- The tests are configured to run in parallel.
- The tests run in headless mode by default.

### Prerequisites 
- Playwright is [installed](https://playwright.dev/docs/intro#installing-playwright) on your system.
- You have checked out this project locally from Git.

### Tests
All tests are contained in [/tests/saucedemo.spec.ts](./tests/saucedemo.spec.ts).

### Executing the tests
Pease run the following commands to check out and run the tests.
```bash
git clone https://github.com/c-higashi/saucedemo.git
cd saucedemo
npx playwright test saucedemo.spec.ts
```

How to run the tests in headed mode:
```bash
npx playwright test saucedemo.spec.ts  --headed
```

How to run an individual test (in headed mode): 
```bash
 npx playwright test saucedemo.spec.ts --headed --grep "<test name>"
```

How to generate the test result report:
```bash
 npx playwright show-report
```