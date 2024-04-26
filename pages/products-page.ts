import { expect, type Locator, type Page } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly itemPrices: Locator;
  readonly shoppingCart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemPrices = page.locator('.inventory_item_price');
    this.shoppingCart = page.locator('.shopping_cart_badge');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  /**
   * 
   * @param numOfItems : Verifies the number of products shown on the page.
   */
  async verifyNumOfProducts(numOfItems : number) {
    await expect(this.itemPrices).toHaveCount(numOfItems);
  } 

  /**
   * 
   * @param sortOption : Possible values are as following:
   *                     - az => Name (A to Z)
   *                     - za => Name (Z to A)
   *                     - lohi => Price (low to high)
   *                     - hilo => Price (high to low)
   *                    example: sortProducts('lohi')
   */
  async sortProducts(sortOption: string) {
    await this.page.selectOption('.product_sort_container', sortOption);        
  }

  /**
   * 
   * @param productIndex : Returns the price for each item.
   * @returns 
   */
  async getProductPrice(productIndex: number): Promise<number>{
    return parseFloat((await this.itemPrices.nth(productIndex).textContent() || "").substring(1));
  }

  /**
   * 
   * @param numOfItems : Verifies the number on the shopping cart icon.
   */
  async verifyNumOfProductsInCart(numOfItems : string){
    await expect(this.shoppingCart).toHaveText(numOfItems);
  }

  async addOrRemoveItemToAndFromCart(itemLocator : string){
    await this.page.locator(itemLocator).click();
  }

}