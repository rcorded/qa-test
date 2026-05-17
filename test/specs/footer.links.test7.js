import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';

describe('Test Case ID 7: Footer Links', () => {
    
    let mainTabId;

    before(async () => {
        // Precondition: User is logged in and on the inventory page
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(browser).toHaveUrl(expect.stringContaining('inventory.html'));
        
        // get the current tab id before the clicks
        const handles = await browser.getWindowHandles();
        mainTabId = handles[0];
    });

    it('Step 1: Click on the "Twitter" icon and verify new tab', async () => {
        await InventoryPage.twitterIcon.click();
        
        // wait for the new tab to open 
        await browser.waitUntil(async () => (await browser.getWindowHandles()).length > 1);
        
        // get the updated list of tabs and switch to the second one
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1]);
        
        // check if twitter is opened 
        await expect(browser).toHaveUrl(/twitter\.com|x\.com/);
        
        await browser.closeWindow();
        await browser.switchToWindow(mainTabId);
    });

    it('Step 2: Click on the "Facebook" icon and verify new tab', async () => {
        await InventoryPage.facebookIcon.click();
        
        await browser.waitUntil(async () => (await browser.getWindowHandles()).length > 1);
        
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1]);
        
        await expect(browser).toHaveUrl(expect.stringContaining('facebook.com'));
        
        await browser.closeWindow();
        await browser.switchToWindow(mainTabId);
    });

    it('Step 3: Click on the "Linkedin" icon and verify new tab', async () => {
        await InventoryPage.linkedinIcon.click();
        
        await browser.waitUntil(async () => (await browser.getWindowHandles()).length > 1);
        
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1]);
        
        await expect(browser).toHaveUrl(expect.stringContaining('linkedin.com'));
        
        await browser.closeWindow();
        await browser.switchToWindow(mainTabId);
    });
});