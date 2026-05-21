import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import { URLS } from '../data/constants.js';

describe('Test Case ID 4: Logout', () => {
    before(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    it('Should be on the inventory page', async () => {
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.INVENTORY));
    });

    it('Step 1: Click "Burger" menu button', async () => {
        await inventoryPage.openMenu();
        await expect(inventoryPage.menuItems).toBeElementsArrayOfSize(4);
        for (const item of await inventoryPage.menuItems) {
            await expect(item).toBeDisplayed();
        }
    });

    it('Step 2: Click "Logout" button', async () => {
        await inventoryPage.logout();
        await expect(browser).toHaveUrl(`${URLS.BASE}/`);
        await expect(loginPage.inputUsername).toHaveValue('');
        await expect(loginPage.inputPassword).toHaveValue('');
    });
});