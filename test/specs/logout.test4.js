import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';

describe('Test Case ID 4: Logout', () => {

    before(async () => {
        // Precondition: User is logged into the account and on the inventory page
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(browser).toHaveUrl(expect.stringContaining('inventory.html'));
    });

    it('Step 1: Click on the "Burger" button at the top left corner', async () => {
        await InventoryPage.openMenu();
        
        // сheck that there are only 4 menu items
        await expect(InventoryPage.menuItems).toBeElementsArrayOfSize(4);
        
        for (const item of await InventoryPage.menuItems) {
            await expect(item).toBeDisplayed(); // check if the items are displayed
        }
    });

    it('Step 2: Click on the "Logout" button', async () => {
        await InventoryPage.logout();
        
        // check if user are redirected to the "Login" page
        await expect(browser).toHaveUrl(`${browser.options.baseUrl}/`);
        
        // check if "Username" and "Password" field are empty
        await expect(LoginPage.inputUsername).toHaveValue('');
        await expect(LoginPage.inputPassword).toHaveValue('');
    });
});