import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';
import { URLS, ERROR_MESSAGES } from '../data/constants.js';

describe('Test Case ID 9: Checkout without products', () => {
    before(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    it('Should be on the inventory page', async () => {
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.INVENTORY));
    });

    it('Step 1: Click on the "Cart" button at the top right corner', async () => {
        await inventoryPage.goToCart();
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.CART));
        await expect(cartPage.cartItems).toBeElementsArrayOfSize(0);
    });

    it('Step 2: Click on the "Checkout" button', async () => {
        await cartPage.clickCheckout();
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.CART));
        await expect(cartPage.errorMessage).toBeDisplayed();
        await expect(cartPage.errorMessage).toHaveText(expect.stringContaining(ERROR_MESSAGES.EMPTY_CART));
    });
});