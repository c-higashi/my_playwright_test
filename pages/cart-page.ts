import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/cart.html');
  }

  async verifyNumOfProducts(numOfItems: number) {
    await expect(this.cartItems).toHaveCount(numOfItems);    
  }
}