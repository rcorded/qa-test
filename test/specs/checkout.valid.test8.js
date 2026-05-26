import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';
import checkoutInfoPage from '../pageobjects/checkout.info.page.js';
import checkoutOverviewPage from '../pageobjects/checkout.overview.page.js';
import checkoutCompletePage from '../pageobjects/checkout.complete.page.js';
import { URLS, SUCCESS_MESSAGES, CREDENTIALS, EXPECTED_COUNTS } from '../data/constants.js';
import { faker } from '@faker-js/faker';

describe('Test Case ID 8: Valid Checkout', () => {
    before(async () => {
        await loginPage.open();
        await loginPage.login(CREDENTIALS.VALID_USER, CREDENTIALS.PASSWORD);
        await inventoryPage.waitForPageToLoad();
    });

    it('TC-8: should successfully complete the full checkout process', async () => {        
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.INVENTORY));
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const postalCode = faker.location.zipCode();

        // Step 1: Click on the "Add to cart" button near any product
        const savedProductName = await inventoryPage.getFirstProductName();
        const savedProductPrice = await inventoryPage.getFirstProductPrice();
        await inventoryPage.addFirstProductToCart();
        await expect(inventoryPage.cartBadge).toHaveText(EXPECTED_COUNTS.CART_BADGE_ONE);

        // Step 2: Click on the "Cart" button at the top right corner
        await inventoryPage.goToCart();
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.CART));
        await expect(cartPage.firstCartItemName).toHaveText(savedProductName);

        // Step 3: Click on the "Checkout" button
        await cartPage.clickCheckout();
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.CHECKOUT_STEP_ONE));
        await expect(checkoutInfoPage.inputFirstName).toBeDisplayed();

        // Steps 4-6: Fill fields with valid data
        await checkoutInfoPage.fillForm(firstName, lastName, postalCode);
        await expect(checkoutInfoPage.inputFirstName).toHaveValue(firstName);
        await expect(checkoutInfoPage.inputLastName).toHaveValue(lastName);
        await expect(checkoutInfoPage.inputPostalCode).toHaveValue(postalCode);

        // Step 7: Click on the "Continue" button
        await checkoutInfoPage.clickContinue();
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.CHECKOUT_STEP_TWO));
        await expect(checkoutOverviewPage.inventoryItemName).toHaveText(savedProductName);
        await expect(checkoutOverviewPage.itemTotal).toHaveText(expect.stringContaining(savedProductPrice));

        // Step 8: Click on the "Finish" button
        await checkoutOverviewPage.clickFinish();
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.CHECKOUT_COMPLETE));
        await expect(checkoutCompletePage.completeHeader).toHaveText(SUCCESS_MESSAGES.CHECKOUT_COMPLETE);

        // Step 9: Click on the "Back Home" button
        await checkoutCompletePage.clickBackHome();
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.INVENTORY));
        await expect(inventoryPage.firstProductName).toBeDisplayed();
        await expect(inventoryPage.cartBadge).not.toExist();
    });
});