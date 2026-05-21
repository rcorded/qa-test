import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';
import { URLS } from '../data/constants.js';

describe('Test Case ID 5: Cart saving', () => {
    let savedProductName;

    before(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    it('Should be on the inventory page', async () => {
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.INVENTORY));
    });

    it('Step 1: Click on the "Add to cart" button near any product', async () => {
        savedProductName = await inventoryPage.getFirstProductName();
        await inventoryPage.addFirstProductToCart();
        await expect(inventoryPage.cartBadge).toHaveText('1');
    });

    it('Step 2: Log out from the account', async () => {
        await inventoryPage.openMenu();
        await expect(inventoryPage.menuItems).toBeElementsArrayOfSize(4);
        for (const item of await inventoryPage.menuItems) {
            await expect(item).toBeDisplayed();
        }
        await inventoryPage.logout();
        await expect(browser).toHaveUrl(`${URLS.BASE}/`);
        await expect(loginPage.inputUsername).toHaveValue('');
        await expect(loginPage.inputPassword).toHaveValue('');
    });

    it('Step 3: Log in to the account again', async () => {
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.INVENTORY));
        await expect(inventoryPage.firstProductName).toBeDisplayed();
        await expect(inventoryPage.cartBadge).toHaveText('1');
    });

    it('Step 4: Click on the "Cart" button at the top right corner', async () => {
        await inventoryPage.goToCart();
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.CART));
        const cartItemName = await cartPage.cartItems[0].$('.inventory_item_name');
        await expect(cartItemName).toHaveText(savedProductName);
    });
});