import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { ProductsPage } from '../pages/products-page';

// Scenario 1-1: Log in with a valid user.
test('A valid user logs in', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.verifyUserIsLoggedIn();
});

// Scenario 1-2: Log in with an invalid user.
test('An invalid user attempts to log in', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login('standard_use', 'secret_sauce')
    await page.locator('id=login-button').click();
  
//  TODO: Figure out if there's a better way to get the error message.  getByText() doesn't fail even when a partial text is passed in.
  const error_message = page.getByText('Epic sadface: Username and password do not match any user in this service');
  await expect(error_message).toBeVisible();    
});

// Scenario 2: Validate the number of items on the page and also validate the sorting by price.
test('Verify the page content and sorting', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.verifyUserIsLoggedIn();
    
    const productsPage = new ProductsPage(page);
    // Verify the number of items on the page.
    const numProducts = 6;
    await productsPage.verifyNumOfProducts(numProducts)
            
    // Selecct Price (low to high) from the dropdown.    
    await productsPage.sortProducts('lohi');
    
    const first_price = await productsPage.getProductPrice(0);
    const last_price = await productsPage.getProductPrice(numProducts-1);
    for (let index = 1; index < numProducts-1; index++) {        
        const index_price = await productsPage.getProductPrice(index);
        expect(first_price).toBeLessThanOrEqual(index_price);
        expect(last_price).toBeGreaterThanOrEqual(index_price);        
    }
  });

  test('Add items to the cart and remove one item from the cart', async ({ page }) => {
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
    // TODO - Go to the cart page and verify the number.

    // Remove 1 item from the cart.
    await page.locator('id=remove-sauce-labs-onesie').click();    

    // Verify that there is only 1 item left in the cart.
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');       
    
    // TODO - Go to the cart page and verify the number. 
  });
  