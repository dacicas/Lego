export class SingInPage {
   /**@param {import('@playwright/test').Page} page */ 

   constructor(page) {
    this.page = page;
    this.usernameInput = this.page.locator('[data-test="username"]');
    this.passwordInput = this.page.locator('[data-test="password"]');
    this.loginButton = this.page.getByRole('button', { name: 'LOGIN' });
   }

   async goto(){
    await this.page.goto("https://www.saucedemo.com/v1/index.html");
   }

   async addUsername (){
    await this.usernameInput.fill("standard_user")
   }

   async addPassword (text){
    await this.passwordInput.fill("secret_sauce")
   }

   async clickLogin(){
    await this.loginButton.click
   }
}