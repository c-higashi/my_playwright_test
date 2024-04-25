import { test, expect } from '@playwright/test';
import { LoginPage } from './login-page';

// Scenario 1-1: Log in by a valid user.
test('A valid user logs in', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.verifyUserIsLoggedIn();
});

// Scenario 1-2: Log in by an invalid user.
test('An invalid user attempts to log in', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login('standard_use', 'secret_sauce')
    await page.locator('id=login-button').click();
  
//  TODO: Figure out if there's a better way to get the error message.  getByText() doesn't fail even when a partial text is passed in.
  const error_message = await page.getByText('Epic sadface: Username and password do not match any user in this service');
  await expect(error_message).toBeVisible();    
});

// Scenario 2: Validate the number of items on the page and also validate the sorting by price.
test('verify the page content and sorting', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.verifyUserIsLoggedIn();
    
    const item_prices = await page.locator('.inventory_item_price');
    
    // Verify the number of items on the page.
    await expect(item_prices).toHaveCount(6); 

    // Selecct Price (low to high) from the dropdown.
    await page.selectOption('.product_sort_container', 'lohi');    

    // TODO - Extract price parsing below to a helper function.
    const first_price = parseFloat((await item_prices.nth(0).textContent() || "").substring(1));
    const last_price = parseFloat((await item_prices.nth(5).textContent() || "").substring(1));
    for (let index = 1; index < 5; index++) {
        const index_price = parseFloat((await item_prices.nth(index).textContent() || "").substring(1));
        await expect(first_price).toBeLessThanOrEqual(index_price);
        await expect(last_price).toBeGreaterThanOrEqual(index_price);        
    }
  });

  test('Add items to the cart and remove some from the cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.verifyUserIsLoggedIn();

    // Add 3 items to the cart.
    await page.locator('id=add-to-cart-sauce-labs-onesie').click();
    await page.locator('id=add-to-cart-sauce-labs-bike-light').click();
    await page.locator('id=add-to-cart-sauce-labs-bolt-t-shirt').click();

    // Verify that the cart has 3 items.
    await expect(page.locator('.shopping_cart_badge')).toHaveText('3');

    // Remove 2 items from the cart.
    await page.locator('id=remove-sauce-labs-onesie').click();
    await page.locator('id=remove-sauce-labs-bike-light').click();

    // Verify that there is only 1 item left in the cart.
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');        
  });
  