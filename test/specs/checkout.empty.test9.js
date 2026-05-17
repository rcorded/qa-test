import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js';

describe('Test Case ID 9: Checkout without products', () => {
    
    before(async () => {
        // Precondition: User is on the logined account and on the inventory page
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(browser).toHaveUrl(expect.stringContaining('inventory.html'));
    });

    it('Step 1: Click on the "Cart" button at the top right corner', async () => {
        await InventoryPage.goToCart();
        
        await expect(browser).toHaveUrl(expect.stringContaining('cart.html'));
        await expect(CartPage.cartItems).toBeElementsArrayOfSize(0);
    });

    it('Step 2: Click on the "Checkout" button', async () => {
        await CartPage.clickCheckout();

        await expect(browser).toHaveUrl(expect.stringContaining('cart.html'));
        await expect(CartPage.errorMessage).toBeDisplayed();
        
        await expect(CartPage.errorMessage).toHaveText(expect.stringContaining('Cart is empty'));
    });
});