import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import { URLS } from '../data/constants.js';

describe('Test Case ID 1: Valid Login', () => {
    before(async () => {
        await loginPage.open();
    });

    it('Should be on the login page', async () => {
        await expect(browser).toHaveUrl(`${URLS.BASE}/`);
    });

    it('Step 1: Enter valid login into "Login" field', async () => {
        await loginPage.setUsername('standard_user');
        await expect(loginPage.inputUsername).toHaveValue('standard_user');
    });

    it('Step 2: Enter valid password into "Password" field', async () => {
        await loginPage.setPassword('secret_sauce');
        await expect(loginPage.inputPassword).toHaveValue('secret_sauce');
        await expect(loginPage.inputPassword).toHaveAttribute('type', 'password');
    });

    it('Step 3: Click "Login" button', async () => {
        await loginPage.clickSubmit();
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.INVENTORY));
        await expect(inventoryPage.firstProductName).toBeDisplayed();
        await expect(inventoryPage.cartIcon).toBeDisplayed();
    });
});