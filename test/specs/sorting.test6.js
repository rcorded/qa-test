import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import { URLS, CREDENTIALS } from '../data/constants.js';

describe('Test Case ID 6: Sorting Products', () => {
    before(async () => {
        await loginPage.open();
        await loginPage.login(CREDENTIALS.VALID_USER, CREDENTIALS.PASSWORD);
    });

    it('Should be on the inventory page', async () => {
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.INVENTORY));
    });

    it('Step 1.1: Sort by Name (Z to A)', async () => {
        await inventoryPage.sortProductsBy('za');
        const actualNames = await inventoryPage.getProductNamesArray();
        const expectedNames = [...actualNames].sort((a, b) => b.localeCompare(a));
        expect(actualNames).toEqual(expectedNames);
    });

    it('Step 1.2: Sort by Name (A to Z)', async () => {
        await inventoryPage.sortProductsBy('az');
        const actualNames = await inventoryPage.getProductNamesArray();
        const expectedNames = [...actualNames].sort((a, b) => a.localeCompare(b));
        expect(actualNames).toEqual(expectedNames);
    });

    it('Step 1.3: Sort by Price (low to high)', async () => {
        await inventoryPage.sortProductsBy('lohi');
        const actualPrices = await inventoryPage.getProductPricesArray();
        const expectedPrices = [...actualPrices].sort((a, b) => a - b);
        expect(actualPrices).toEqual(expectedPrices);
    });

    it('Step 1.4: Sort by Price (high to low)', async () => {
        await inventoryPage.sortProductsBy('hilo');
        const actualPrices = await inventoryPage.getProductPricesArray();
        const expectedPrices = [...actualPrices].sort((a, b) => b - a);
        expect(actualPrices).toEqual(expectedPrices);
    });
});