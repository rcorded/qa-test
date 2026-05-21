import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';
import checkoutInfoPage from '../pageobjects/checkout.info.page.js';
import checkoutOverviewPage from '../pageobjects/checkout.overview.page.js';
import checkoutCompletePage from '../pageobjects/checkout.complete.page.js';
import { URLS } from '../data/constants.js';
import { faker } from '@faker-js/faker';

describe('Test Case ID 8: Valid Checkout', () => {
    let savedProductName;
    let savedProductPrice;
    let firstName;
    let lastName;
    let postalCode;

    before(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.INVENTORY));
        firstName = faker.person.firstName();
        lastName = faker.person.lastName();
        postalCode = faker.location.zipCode();
    });

    it('Step 1: Click on the "Add to cart" button near any product', async () => {
        savedProductName = await inventoryPage.getFirstProductName();
        savedProductPrice = await inventoryPage.getFirstProductPrice();
        await inventoryPage.addFirstProductToCart();
        await expect(inventoryPage.cartBadge).toHaveText('1');
    });

    it('Step 2: Click on the "Cart" button at the top right corner', async () => {
        await inventoryPage.goToCart();
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.CART));
        const cartItemName = await cartPage.cartItems[0].$('.inventory_item_name');
        await expect(cartItemName).toHaveText(savedProductName);
    });

    it('Step 3: Click on the "Checkout" button', async () => {
        await cartPage.clickCheckout();
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.CHECKOUT_STEP_ONE));
        await expect(checkoutInfoPage.inputFirstName).toBeDisplayed();
    });

    it('Steps 4-6: Fill fields with valid data', async () => {
        await checkoutInfoPage.fillForm(firstName, lastName, postalCode);
        await expect(checkoutInfoPage.inputFirstName).toHaveValue(firstName);
        await expect(checkoutInfoPage.inputLastName).toHaveValue(lastName);
        await expect(checkoutInfoPage.inputPostalCode).toHaveValue(postalCode);
    });

    it('Step 7: Click on the "Continue" button', async () => {
        await checkoutInfoPage.clickContinue();
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.CHECKOUT_STEP_TWO));
        await expect(checkoutOverviewPage.inventoryItemName).toHaveText(savedProductName);
        await expect(checkoutOverviewPage.itemTotal).toHaveText(expect.stringContaining(savedProductPrice));
    });

    it('Step 8: Click on the "Finish" button', async () => {
        await checkoutOverviewPage.clickFinish();
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.CHECKOUT_COMPLETE));
        await expect(checkoutCompletePage.completeHeader).toHaveText('Thank you for your order!');
    });

    it('Step 9: Click on the "Back Home" button', async () => {
        await checkoutCompletePage.clickBackHome();
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.INVENTORY));
        await expect(inventoryPage.firstProductName).toBeDisplayed();
        await expect(inventoryPage.cartBadge).not.toExist();
    });
});