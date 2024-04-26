import { expect, type Locator, type Page } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly itemPrices: Locator;
//   readonly productSortDropdownLoator: string;
//   readonly pomLink: Locator;
//   readonly tocList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemPrices = page.locator('.inventory_item_price');
    // this.productSortDropdownLoator = '.product_sort_container';
    // this.pomLink = page.locator('li', {
    //   hasText: 'Guides',
    // }).locator('a', {
    //   hasText: 'Page Object Model',
    // });
    // this.tocList = page.locator('article div.markdown ul > li > a');
  }

  async goto() {
    await this.page.goto('https://playwright.dev');
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

  async getProductPrice(productIndex: number): Promise<number>{
    return parseFloat((await this.itemPrices.nth(productIndex).textContent() || "").substring(1));
  }

}