import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';
import { URLS, ERROR_MESSAGES, CREDENTIALS, EXPECTED_COUNTS } from '../data/constants.js';

describe('Test Case ID 9: Checkout without products', () => {
    
    before(async () => {
        await loginPage.open();
        await loginPage.login(CREDENTIALS.VALID_USER, CREDENTIALS.PASSWORD);
        await inventoryPage.waitForPageToLoad();
    });

    it('TC-9: should not allow checkout with an empty cart and display an error', async () => {
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.INVENTORY));

        // Step 1: Click on the "Cart" button at the top right corner
        await inventoryPage.goToCart();
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.CART));
        await expect(cartPage.cartItems).toBeElementsArrayOfSize(EXPECTED_COUNTS.EMPTY_CART_ITEMS);

        // Step 2: Click on the "Checkout" button
        await cartPage.clickCheckout();
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.CART));
        await expect(cartPage.errorMessage).toBeDisplayed();
        await expect(cartPage.errorMessage).toHaveText(expect.stringContaining(ERROR_MESSAGES.EMPTY_CART));
    });
});