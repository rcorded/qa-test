import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';

describe('Test Case ID 1: Valid Login', () => {

    before(async () => {
        // Precondition: User is on the login page
        await LoginPage.open();
        await expect(browser).toHaveUrl(`${browser.options.baseUrl}/`);
    });

    it('Step 1: Enter valid login into "Login" field', async () => {
        await LoginPage.inputUsername.setValue('standard_user');
        
        await expect(LoginPage.inputUsername).toHaveValue('standard_user'); 
    });

    it('Step 2: Enter valid password into "Password" field', async () => {
        await LoginPage.inputPassword.setValue('secret_sauce');
    
        await expect(LoginPage.inputPassword).toHaveValue('secret_sauce');

        // check if data is represented as dots
        await expect(LoginPage.inputPassword).toHaveAttribute('type', 'password');
    });

    it('Step 3: Click "Login" button', async () => {
        await LoginPage.btnSubmit.click();
        
        // check if this is the inventory page
        await expect(browser).toHaveUrl(expect.stringContaining('inventory.html'));
        
        await expect(InventoryPage.firstProductName).toBeDisplayed();
        await expect(InventoryPage.cartIcon).toBeDisplayed();
    });
});