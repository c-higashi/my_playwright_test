import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { ProductsPage } from '../pages/products-page';
import { CartPage } from '../pages/cart-page';

// Scenario 1-1: Log in with a valid user.
test('A valid user logs in', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.verifyUserIsLoggedIn();
});

// Scenario 1-2: User cannot log in.
test('User cannot log in', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const password = 'secret_sauce'
    
    await loginPage.goto();

    // Case 1: Misspelled username
    await loginPage.login('standard_use', password)    
    await loginPage.verifyLoginErrorMessage('Epic sadface: Username and password do not match any user in this service')
  
    // Case 2: Locked out user
    await loginPage.login('locked_out_user', password)
    await loginPage.verifyLoginErrorMessage('Epic sadface: Sorry, this user has been locked out.')
});

// Scenario 2: Validate the number of items on the page after logging in and also validate the sorting by price.
test('Verify the page content and sorting', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const numProducts = 6;

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.verifyUserIsLoggedIn();
        
    // Verify the number of items on the page.    
    await productsPage.verifyNumOfProducts(numProducts)
            
    // Select Price (low to high) from the dropdown.    
    await productsPage.sortProducts('lohi');
    
    // Verity that the first item has the lowest price and that the last item has the highest price.
    const first_price = await productsPage.getProductPrice(0);
    const last_price = await productsPage.getProductPrice(numProducts-1);
    for (let index = 1; index < numProducts-1; index++) {        
        const index_price = await productsPage.getProductPrice(index);
        expect(first_price).toBeLessThanOrEqual(index_price);
        expect(last_price).toBeGreaterThanOrEqual(index_price);        
    }
  });

　// Scenario 3: Add and remove the items to and from the cart and verify the number of items in the cart.
  test('Add items to the cart and remove one item from the cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.verifyUserIsLoggedIn();

    // Add 3 items to the cart.
    await productsPage.addOrRemoveItemToAndFromCart('id=add-to-cart-sauce-labs-onesie');
    await productsPage.addOrRemoveItemToAndFromCart('id=add-to-cart-sauce-labs-bike-light');
    await productsPage.addOrRemoveItemToAndFromCart('id=add-to-cart-sauce-labs-bolt-t-shirt');

    // Verify that the cart icon shows 3.
    await productsPage.verifyNumOfProductsInCart('3');    
    
    // Go to the cart page and verify the number of products.    
    cartPage.goto();
    await cartPage.verifyNumOfProducts(3);

    // Remove 1 item from the cart.
    productsPage.goto();
    await productsPage.addOrRemoveItemToAndFromCart('id=remove-sauce-labs-onesie');
    
    // Verify that the cart icon shows 2.
    await productsPage.verifyNumOfProductsInCart('2');  
    
    // Go to the cart page and verify the number of products. 
    cartPage.goto();
    await cartPage.verifyNumOfProducts(2);
  });
  