import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import { URLS, CREDENTIALS, EXPECTED_COUNTS } from '../data/constants.js';

describe('Test Case ID 4: Logout', () => {
    before(async () => {
        await loginPage.open();
        await loginPage.login(CREDENTIALS.VALID_USER, CREDENTIALS.PASSWORD);        
        await inventoryPage.waitForPageToLoad();
    });

    it('TC-4: should successfully log out via the burger menu', async () => {        
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.INVENTORY));

        // Step 1: Click "Burger" menu button
        await inventoryPage.openMenu();
        await expect(inventoryPage.menuItems).toBeElementsArrayOfSize(EXPECTED_COUNTS.MENU_ITEMS);
        for (const item of await inventoryPage.menuItems) {
            await expect(item).toBeDisplayed();
        }

        // Step 2: Click "Logout" button
        await inventoryPage.logout();        
        await expect(browser).toHaveUrl(`${URLS.BASE}/`);
        await expect(loginPage.inputUsername).toHaveValue('');
        await expect(loginPage.inputPassword).toHaveValue('');
    });
});