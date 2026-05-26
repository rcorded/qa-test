import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import { URLS, CREDENTIALS } from '../data/constants.js';

describe('Test Case ID 1: Valid Login', () => {
    before(async () => {
        await loginPage.open();
    });

    it('TC-1: should successfully log in with valid credentials', async () => {        
        await expect(browser).toHaveUrl(`${URLS.BASE}/`);

        // Step 1: Enter valid login into "Login" field
        await loginPage.setUsername(CREDENTIALS.VALID_USER);
        await expect(loginPage.inputUsername).toHaveValue(CREDENTIALS.VALID_USER);

        // Step 2: Enter valid password into "Password" field
        await loginPage.setPassword(CREDENTIALS.PASSWORD);
        await expect(loginPage.inputPassword).toHaveValue(CREDENTIALS.PASSWORD);
        await expect(loginPage.inputPassword).toHaveAttribute('type', 'password');

        // Step 3: Click "Login" button
        await loginPage.clickSubmit();    
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.INVENTORY));
        await expect(inventoryPage.firstProductName).toBeDisplayed();
        await expect(inventoryPage.cartIcon).toBeDisplayed();
    });
});