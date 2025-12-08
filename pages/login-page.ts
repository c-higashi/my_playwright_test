import { expect, type Locator, type Page } from '@playwright/test';
import { ProductsPage } from './products-page';
import { CONFIG } from '../config/config';
import exp from 'constants';

export class LoginPage {
  readonly page: Page;
  readonly usernameTextbox: Locator;
  readonly passwordTextbox: Locator;
  readonly loginButton: Locator;
  readonly standardUserName: string;
  readonly validPassword: string;
  readonly lockedOutUserName: string;

  constructor(page: Page) {
    this.page = page;    
    this.usernameTextbox = page.getByTestId('username')    
    this.passwordTextbox = page.getByTestId('password');    
    this.loginButton = page.getByTestId('login-button');

    this.standardUserName = CONFIG.credentials.standardUser.username;
    this.validPassword = CONFIG.credentials.standardUser.password;
    this.lockedOutUserName = CONFIG.credentials.lockedOutUser.username;
  }

  async goto() {
    await this.page.goto(CONFIG.baseUrl);
    await expect(this.page).toHaveTitle(/Swag Labs/);
    await expect(this.usernameTextbox).toBeVisible();
    await expect(this.passwordTextbox).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.usernameTextbox.fill(username);
    await this.passwordTextbox.fill(password);
    await this.loginButton.click();
  }

  async verifyUserIsLoggedIn() {    
    const productPage = new ProductsPage(this.page);
    await expect(productPage.pageTitle).toBeVisible();
    await expect(productPage.burgerMenuIcon).toBeVisible();    
    await expect(this.page.locator('.shopping_cart_link')).toBeVisible();
    await expect(this.page.locator('.inventory_list')).toBeVisible();    
  }

  async verifyLoginErrorMessage(errorMessage : string){
    const error_message = this.page.getByText(errorMessage);
    await expect(error_message).toBeVisible();    
  }
}