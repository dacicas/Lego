
import {test, expect} from "@playwright/test";
import { assert } from "console";

 
//   This is the login suite
 
test.describe('Login', () =>{
        test.beforeEach(async ({page}) =>{
                await page.goto('https://www.saucedemo.com/v1/index.html')
                await page.locator('[data-test="username"]').fill("standard_user")
                await page.locator('[data-test="password"]').fill("secret_sauce")
                await page.getByRole('button', { name: 'LOGIN' }).click()
                      
        })
        test("User is able to login to swaglabs", async ({page})=>{
                await expect(page.locator('#header_container div').nth(1)).toBeVisible();
        }) 
        test("User is able to logout from swaglabs", async ({page})=>{
                await page.getByRole('button', { name: 'Open Menu' }).click();
                await page.getByRole('link', { name: 'Logout' }).click();
                await expect(page.getByRole('button', { name: 'LOGIN' })).toBeVisible();
        });
        
});

test('User is unable to login with wrong credentials', async ({page}) =>{
        await page.goto('https://www.saucedemo.com/v1/index.html')
        await page.locator('[data-test="username"]').fill("standard_user")
        await page.locator('[data-test="password"]').fill("secret_saucess")
        await page.getByRole('button', { name: 'LOGIN' }).click()
        await expect(page.locator('[data-test="error"]')).toBeVisible();
});


  //This Suite checks that the shop page and the cart page work as intended
 
test.describe("Cart", ()=>{
        test.beforeEach(async ({page}) =>{
                await page.goto('https://www.saucedemo.com/v1/index.html')
                await page.locator('[data-test="username"]').fill("standard_user")
                await page.locator('[data-test="password"]').fill("secret_sauce")
                await page.getByRole('button', { name: 'LOGIN' }).click()
                await expect(page.locator('#header_container div').nth(1)).toBeVisible();            
        });
        test("User can add all items to cart", async ({page}) =>{
                await expect(page.locator('#item_4_title_link')).toContainText('Sauce Labs Backpack');
                await page.locator('div').filter({ hasText: /^\$29\.99ADD TO CART$/ }).getByRole('button').click();
                await expect(page.locator('#item_0_title_link')).toContainText('Sauce Labs Bike Light');
                await page.locator('div').filter({ hasText: /^\$9\.99ADD TO CART$/ }).getByRole('button').click();
                await page.getByRole('link', { name: 'Sauce Labs Bolt T-Shirt' }).click();
                await page.getByRole('button', { name: '<- Back' }).click();
                await expect(page.locator('#item_1_title_link')).toContainText('Sauce Labs Bolt T-Shirt');
                await page.getByRole('button', { name: 'ADD TO CART' }).first().click();
                await expect(page.locator('#item_5_title_link')).toContainText('Sauce Labs Fleece Jacket');
                await page.locator('div').filter({ hasText: /^\$49\.99ADD TO CART$/ }).getByRole('button').click();
                await expect(page.locator('#item_2_title_link')).toContainText('Sauce Labs Onesie');
                await page.locator('div').filter({ hasText: /^\$7\.99ADD TO CART$/ }).getByRole('button').click();
                await expect(page.locator('#item_3_title_link')).toContainText('Test.allTheThings() T-Shirt (Red)');
                await page.getByRole('button', { name: 'ADD TO CART' }).click();
                await expect(page.locator('#shopping_cart_container')).toContainText('6');
        });
        test("User can add some items to cart navigate to cart then go back to continue shopping",async ({page}) =>{
                await expect(page.locator('#item_4_title_link')).toContainText('Sauce Labs Backpack');
                await page.locator('div').filter({ hasText: /^\$29\.99ADD TO CART$/ }).getByRole('button').click();
                await expect(page.locator('#item_0_title_link')).toContainText('Sauce Labs Bike Light');
                await page.locator('div').filter({ hasText: /^\$9\.99ADD TO CART$/ }).getByRole('button').click();
                await expect(page.locator('#item_2_title_link')).toContainText('Sauce Labs Onesie');
                await page.locator('div').filter({ hasText: /^\$7\.99ADD TO CART$/ }).getByRole('button').click();
                await page.getByRole('link', { name: '3' }).click();
                await page.getByRole('link', { name: 'Continue Shopping' }).click();
        });
        test("User can remove items from cart", async ({page}) =>{
                await expect(page.locator('#item_4_title_link')).toContainText('Sauce Labs Backpack');
                await page.locator('div').filter({ hasText: /^\$29\.99ADD TO CART$/ }).getByRole('button').click();
                await expect(page.locator('#item_0_title_link')).toContainText('Sauce Labs Bike Light');
                await page.locator('div').filter({ hasText: /^\$9\.99ADD TO CART$/ }).getByRole('button').click();
                await expect(page.locator('#item_2_title_link')).toContainText('Sauce Labs Onesie');
                await page.locator('div').filter({ hasText: /^\$7\.99ADD TO CART$/ }).getByRole('button').click();
                await page.getByRole('link', { name: '3' }).click();
                await page.locator('div').filter({ hasText: /^7\.99REMOVE$/ }).getByRole('button').click();
                await expect(page.locator('#shopping_cart_container')).toContainText('2');
        })

});
//This suite is checking the checkout process
test.describe("Checkout", ()=>{
        test.beforeEach(async ({page}) =>{
                await page.goto('https://www.saucedemo.com/v1/index.html')
                await page.locator('[data-test="username"]').fill("standard_user")
                await page.locator('[data-test="password"]').fill("secret_sauce")
                await page.getByRole('button', { name: 'LOGIN' }).click()
                await expect(page.locator('#header_container div').nth(1)).toBeVisible(); 
                await page.locator('div').filter({ hasText: /^\$29\.99ADD TO CART$/ }).getByRole('button').click();
                await expect(page.locator('#item_0_title_link')).toContainText('Sauce Labs Bike Light');
                await page.locator('div').filter({ hasText: /^\$9\.99ADD TO CART$/ }).getByRole('button').click();
                await expect(page.locator('#item_2_title_link')).toContainText('Sauce Labs Onesie');
                await page.locator('div').filter({ hasText: /^\$7\.99ADD TO CART$/ }).getByRole('button').click();
                await page.getByRole('link', { name: '3' }).click(); 
        });
        test("Users can add details in the first checkout window", async ({page})=>{
                await page.getByRole('link', { name: 'CHECKOUT' }).click();
                await page.locator('[data-test="firstName"]').click();
                await page.locator('[data-test="firstName"]').fill('Daniel');
                await page.locator('[data-test="firstName"]').press('Tab');
                await page.locator('[data-test="lastName"]').fill('Cicas');
                await page.locator('[data-test="lastName"]').press('Tab');
                await page.locator('[data-test="postalCode"]').fill('222345');
                await page.getByRole('button', { name: 'CONTINUE' }).click();
                await expect(page.getByText('Checkout: Overview')).toBeVisible();
        })
        test("User cant continue if they dont add info to the checkout window", async ({page})=>{
                await page.getByRole('link', { name: 'CHECKOUT' }).click();
                await page.getByRole('button', { name: 'CONTINUE' }).click();
                await expect(page.locator('[data-test="error"]')).toBeVisible();
        })
        test("User can cancel before checkout", async ({page})=>{
                await page.getByRole('link', { name: 'CHECKOUT' }).click();
                await page.locator('[data-test="firstName"]').click();
                await page.locator('[data-test="firstName"]').fill('Daniel');
                await page.locator('[data-test="firstName"]').press('Tab');
                await page.locator('[data-test="lastName"]').fill('Cicas');
                await page.locator('[data-test="lastName"]').press('Tab');
                await page.locator('[data-test="postalCode"]').fill('222345');
                await page.getByRole('button', { name: 'CONTINUE' }).click();
                await expect(page.getByText('Checkout: Overview')).toBeVisible();
                await expect(page.locator('#item_4_title_link')).toContainText('Sauce Labs Backpack');
                await expect(page.locator('#item_0_title_link')).toContainText('Sauce Labs Bike Light');
                await expect(page.locator('#item_2_title_link')).toContainText('Sauce Labs Onesie');
                await expect(page.locator('#checkout_summary_container')).toContainText('Total: $51.81');
                await page.getByRole('link', { name: 'CANCEL' }).click();
        })
        test("User is able to finish the checkout process", async ({page}) =>{
                await page.getByRole('link', { name: 'CHECKOUT' }).click();
                await page.locator('[data-test="firstName"]').click();
                await page.locator('[data-test="firstName"]').fill('Daniel');
                await page.locator('[data-test="firstName"]').press('Tab');
                await page.locator('[data-test="lastName"]').fill('Cicas');
                await page.locator('[data-test="lastName"]').press('Tab');
                await page.locator('[data-test="postalCode"]').fill('222345');
                await page.getByRole('button', { name: 'CONTINUE' }).click();
                await expect(page.getByText('Checkout: Overview')).toBeVisible();
                await expect(page.locator('#item_4_title_link')).toContainText('Sauce Labs Backpack');
                await expect(page.locator('#item_0_title_link')).toContainText('Sauce Labs Bike Light');
                await expect(page.locator('#item_2_title_link')).toContainText('Sauce Labs Onesie');
                await expect(page.locator('#checkout_summary_container')).toContainText('Total: $51.81');
                await page.getByRole('link', { name: 'FINISH' }).click();
                await expect(page.getByRole('heading')).toContainText('THANK YOU FOR YOUR ORDER');
                await expect(page.locator('#checkout_complete_container')).toContainText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');

        })

})





