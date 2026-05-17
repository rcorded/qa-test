import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js';
import CheckoutInfoPage from '../pageobjects/checkout.info.page.js';
import CheckoutOverviewPage from '../pageobjects/checkout.overview.page.js';
import CheckoutCompletePage from '../pageobjects/checkout.complete.page.js';

describe('Test Case ID 8: Valid Checkout', () => {
    
    let savedProductName;
    let savedProductPrice;

    before(async () => {
        // Precondition: User is logged in and on the inventory page
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(browser).toHaveUrl(expect.stringContaining('inventory.html'));
    });

    it('Step 1: Click on the "Add to cart" button near any product', async () => {
    
        savedProductName = await InventoryPage.firstProductName.getText();
        savedProductPrice = await InventoryPage.firstProductPrice.getText();

        await InventoryPage.firstProductAddBtn.click();
        
        // check if the number near the cart at the top right increase by 1
        await expect(InventoryPage.cartBadge).toHaveText('1');
    });

    it('Step 2: Click on the "Cart" button at the top right corner', async () => {
        await InventoryPage.goToCart();
        
        // check if the Cart page is displayed
        await expect(browser).toHaveUrl(expect.stringContaining('cart.html'));
        
        // check if product are the same as was added at step 1
        const cartItemName = await CartPage.cartItems[0].$('.inventory_item_name');
        await expect(cartItemName).toHaveText(savedProductName);
    });

    it('Step 3: Click on the "Checkout" button', async () => {
        await CartPage.clickCheckout();
        
        // check if checkout form are displayed 
        await expect(browser).toHaveUrl(expect.stringContaining('checkout-step-one.html'));
        await expect(CheckoutInfoPage.inputFirstName).toBeDisplayed();
    });

    it('Steps 4-6: Fill fields with valid data', async () => {
        await CheckoutInfoPage.fillForm('QA', 'Trainee', '12345');
        
        await expect(CheckoutInfoPage.inputFirstName).toHaveValue('QA');
        await expect(CheckoutInfoPage.inputLastName).toHaveValue('Trainee');
        await expect(CheckoutInfoPage.inputPostalCode).toHaveValue('12345');
    });

    it('Step 7: Click on the "Continue" button', async () => {
        await CheckoutInfoPage.clickContinue();
        
        // check or were redirected to "Overview" page
        await expect(browser).toHaveUrl(expect.stringContaining('checkout-step-two.html'));
        
        // check if products from step 1 is displayed
        await expect(CheckoutOverviewPage.inventoryItemName).toHaveText(savedProductName);
        
        await expect(CheckoutOverviewPage.itemTotal).toHaveText(expect.stringContaining(savedProductPrice));
    });

    it('Step 8: Click on the "Finish" button', async () => {
        await CheckoutOverviewPage.clickFinish();
        
        await expect(browser).toHaveUrl(expect.stringContaining('checkout-complete.html'));
        
        await expect(CheckoutCompletePage.completeHeader).toHaveText('Thank you for your order!');
    });

    it('Step 9: Click on the "Back Home" button', async () => {
        await CheckoutCompletePage.clickBackHome();
        
        // check if user is redirected to the inventory page
        await expect(browser).toHaveUrl(expect.stringContaining('inventory.html'));
        
        await expect(InventoryPage.firstProductName).toBeDisplayed();
        
        // check if the cart is empty
        await expect(InventoryPage.cartBadge).not.toExist();
    });
});