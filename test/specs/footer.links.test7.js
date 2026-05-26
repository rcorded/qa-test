import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import { URLS, SOCIAL_URLS, CREDENTIALS } from '../data/constants.js';

describe('Test Case ID 7: Footer Links', () => {
    let mainTabId;

    const verifySocialLink = async (clickAction, expectedUrl) => {
        await clickAction(); 
        await browser.waitUntil(async () => (await browser.getWindowHandles()).length > 1);
        const handles = await browser.getWindowHandles(); 
        await browser.switchToWindow(handles[1]);
        await expect(browser).toHaveUrl(expectedUrl); 
        await browser.closeWindow();
        await browser.switchToWindow(mainTabId); 
    };

    before(async () => {
        await loginPage.open();
        await loginPage.login(CREDENTIALS.VALID_USER, CREDENTIALS.PASSWORD); 
        await inventoryPage.waitForPageToLoad();       
        mainTabId = await browser.getWindowHandle();
    });

    it('TC-7: should open Twitter, Facebook, and LinkedIn links in new tabs', async () => {
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.INVENTORY));

        // Step 1: Click on the "Twitter" icon and verify new tab
        await verifySocialLink(
            async () => await inventoryPage.clickTwitter(), 
            SOCIAL_URLS.TWITTER
        );

        // Step 2: Click on the "Facebook" icon and verify new tab
        await verifySocialLink(
            async () => await inventoryPage.clickFacebook(), 
            expect.stringContaining(SOCIAL_URLS.FACEBOOK)
        );

        // Step 3: Click on the "Linkedin" icon and verify new tab
        await verifySocialLink(
            async () => await inventoryPage.clickLinkedin(), 
            expect.stringContaining(SOCIAL_URLS.LINKEDIN)
        );
    });
});