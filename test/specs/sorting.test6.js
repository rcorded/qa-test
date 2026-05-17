import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';

describe('Test Case ID 6: Sorting Products', () => {

    before(async () => {
        // Precondition: User is logged in and on the inventory page
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(browser).toHaveUrl(expect.stringContaining('inventory.html'));
    });

    it('Step 1.1: Sort by Name (Z to A)', async () => {
        await InventoryPage.sortProductsBy('za');
        
        // get current order from site
        const actualNames = await InventoryPage.getProductNamesArray();
        
        // sort by js 
        const expectedNames = [...actualNames].sort((a, b) => b.localeCompare(a));
        
        // compare
        expect(actualNames).toEqual(expectedNames);
    });

    it('Step 1.2: Sort by Name (A to Z)', async () => {
        await InventoryPage.sortProductsBy('az');
        
        const actualNames = await InventoryPage.getProductNamesArray();
        
        const expectedNames = [...actualNames].sort((a, b) => a.localeCompare(b));
        
        expect(actualNames).toEqual(expectedNames);
    });

    it('Step 1.3: Sort by Price (low to high)', async () => {
        await InventoryPage.sortProductsBy('lohi');
        
        const actualPrices = await InventoryPage.getProductPricesArray();
        
        const expectedPrices = [...actualPrices].sort((a, b) => a - b);
        
        expect(actualPrices).toEqual(expectedPrices);
    });

    it('Step 1.4: Sort by Price (high to low)', async () => {
        await InventoryPage.sortProductsBy('hilo');
        
        const actualPrices = await InventoryPage.getProductPricesArray();
        
        const expectedPrices = [...actualPrices].sort((a, b) => b - a);
        
        expect(actualPrices).toEqual(expectedPrices);
    });
});