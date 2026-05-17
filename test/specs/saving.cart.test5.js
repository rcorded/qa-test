import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js';

describe('Test Case ID 5: Saving the cart after logout', () => {
    
    let savedProductName;

    before(async () => {
        // Precondition: User is logged in and on the inventory page
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(browser).toHaveUrl(expect.stringContaining('inventory.html'));
    });

    it('Step 1: Click on the "Add to cart" button near any product', async () => {
        // save the first product name
        savedProductName = await InventoryPage.firstProductName.getText();
        
        await InventoryPage.firstProductAddBtn.click();
        
        // check if the number near the cart increase by 1
        await expect(InventoryPage.cartBadge).toHaveText('1');
    });

    it('Step 2: Click on the "Burger" button at the top left corner', async () => {
        await InventoryPage.openMenu();
        
        await expect(InventoryPage.menuItems).toBeElementsArrayOfSize(4);
        
        for (const item of await InventoryPage.menuItems) {
            await expect(item).toBeDisplayed();  // check if the items are displayed
        }  
    });

    it('Step 3: Click on the "Logout" button', async () => {
        await InventoryPage.logout();
        
        // check if user are redirected to the "Login" page
        await expect(browser).toHaveUrl(`${browser.options.baseUrl}/`);
        
        // check if "Username" and "Password" field are empty
        await expect(LoginPage.inputUsername).toHaveValue('');
        await expect(LoginPage.inputPassword).toHaveValue('');
    });

    it('Step 4: Login to the account using the same valid login and password', async () => {
        await LoginPage.login('standard_user', 'secret_sauce');
        
        // check if the user is redirected to the inventory page
        await expect(browser).toHaveUrl(expect.stringContaining('inventory.html'));
        
        await expect(InventoryPage.firstProductName).toBeDisplayed();
        await expect(InventoryPage.cartBadge).toHaveText('1');
    });

    it('Step 5: Click on the "Cart" button at the top right corner', async () => {
        await InventoryPage.goToCart();
        
        // check if the cart page is displayed
        await expect(browser).toHaveUrl(expect.stringContaining('cart.html'));
        
        // check if a product is the same as was added at step 1
        const cartItemName = await CartPage.cartItems[0].$('.inventory_item_name');
        await expect(cartItemName).toHaveText(savedProductName);
    });
});