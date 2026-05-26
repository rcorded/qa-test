import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import { URLS, CREDENTIALS, SORT_VALUES } from '../data/constants.js';

describe('Test Case ID 6: Sorting Products', () => {
    before(async () => {
        await loginPage.open();
        await loginPage.login(CREDENTIALS.VALID_USER, CREDENTIALS.PASSWORD);        
        await inventoryPage.waitForPageToLoad();
    });

    it('TC-6: should correctly sort products by name and price in all directions', async () => {        
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.INVENTORY));

        // Step 1.1: Sort by Name (Z to A)
        await inventoryPage.sortProductsBy(SORT_VALUES.ZA);
        let actualNames = await inventoryPage.getProductNamesArray(); 
        let expectedNames = [...actualNames].sort((a, b) => b.localeCompare(a));
        expect(actualNames).toEqual(expectedNames); 

        // Step 1.2: Sort by Name (A to Z)
        await inventoryPage.sortProductsBy(SORT_VALUES.AZ);
        actualNames = await inventoryPage.getProductNamesArray(); 
        expectedNames = [...actualNames].sort((a, b) => a.localeCompare(b));
        expect(actualNames).toEqual(expectedNames);

        // Step 1.3: Sort by Price (low to high)
        await inventoryPage.sortProductsBy(SORT_VALUES.LOW_HIGH);
        let actualPrices = await inventoryPage.getProductPricesArray(); 
        let expectedPrices = [...actualPrices].sort((a, b) => a - b);
        expect(actualPrices).toEqual(expectedPrices);

        // Step 1.4: Sort by Price (high to low)
        await inventoryPage.sortProductsBy(SORT_VALUES.HIGH_LOW);
        actualPrices = await inventoryPage.getProductPricesArray(); 
        expectedPrices = [...actualPrices].sort((a, b) => b - a);
        expect(actualPrices).toEqual(expectedPrices);
    });
});