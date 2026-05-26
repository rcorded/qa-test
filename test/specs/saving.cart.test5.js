import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';
import { URLS, CREDENTIALS, EXPECTED_COUNTS } from '../data/constants.js';

describe('Test Case ID 5: Cart saving', () => {
    before(async () => {
        await loginPage.open();
        await loginPage.login(CREDENTIALS.VALID_USER, CREDENTIALS.PASSWORD);        
        await inventoryPage.waitForPageToLoad();
    });

    it('TC-5: should save the cart state after logout and login', async () => {        
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.INVENTORY));

        // Step 1: Click on the "Add to cart" button near any product
        const savedProductName = await inventoryPage.getFirstProductName(); 
        await inventoryPage.addFirstProductToCart();
        await expect(inventoryPage.cartBadge).toHaveText(EXPECTED_COUNTS.CART_BADGE_ONE);

        // Step 2: Log out from the account
        await inventoryPage.openMenu();
        await expect(inventoryPage.menuItems).toBeElementsArrayOfSize(EXPECTED_COUNTS.MENU_ITEMS);
        for (const item of await inventoryPage.menuItems) {
            await expect(item).toBeDisplayed();
        }
        await inventoryPage.logout();
        await expect(browser).toHaveUrl(`${URLS.BASE}/`);
        await expect(loginPage.inputUsername).toHaveValue('');
        await expect(loginPage.inputPassword).toHaveValue('');

        // Step 3: Log in to the account again
        await loginPage.login(CREDENTIALS.VALID_USER, CREDENTIALS.PASSWORD);
        await inventoryPage.waitForPageToLoad();
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.INVENTORY));
        await expect(inventoryPage.firstProductName).toBeDisplayed();
        await expect(inventoryPage.cartBadge).toHaveText(EXPECTED_COUNTS.CART_BADGE_ONE);

        // Step 4: Click on the "Cart" button at the top right corner
        await inventoryPage.goToCart();
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.CART));
        await expect(cartPage.firstCartItemName).toHaveText(savedProductName);
    });
});