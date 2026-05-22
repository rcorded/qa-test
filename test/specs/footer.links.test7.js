import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import { URLS, SOCIAL_URLS, CREDENTIALS } from '../data/constants.js';

describe('Test Case ID 7: Footer Links', () => {
    let mainTabId;

    before(async () => {
        await loginPage.open();
        await loginPage.login(CREDENTIALS.VALID_USER, CREDENTIALS.PASSWORD);
        mainTabId = await browser.getWindowHandle();
    });

    it('Should be on the inventory page', async () => {
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.INVENTORY));
    });

    it('Step 1: Click on the "Twitter" icon and verify new tab', async () => {
        await inventoryPage.clickTwitter();
        await browser.waitUntil(async () => (await browser.getWindowHandles()).length > 1);
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1]);
        await expect(browser).toHaveUrl(SOCIAL_URLS.TWITTER);
        await browser.closeWindow();
        await browser.switchToWindow(mainTabId);
    });

    it('Step 2: Click on the "Facebook" icon and verify new tab', async () => {
        await inventoryPage.clickFacebook();
        await browser.waitUntil(async () => (await browser.getWindowHandles()).length > 1);
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1]);
        await expect(browser).toHaveUrl(expect.stringContaining(SOCIAL_URLS.FACEBOOK));
        await browser.closeWindow();
        await browser.switchToWindow(mainTabId);
    });

    it('Step 3: Click on the "Linkedin" icon and verify new tab', async () => {
        await inventoryPage.clickLinkedin();
        await browser.waitUntil(async () => (await browser.getWindowHandles()).length > 1);
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1]);
        await expect(browser).toHaveUrl(expect.stringContaining(SOCIAL_URLS.LINKEDIN));
        await browser.closeWindow();
        await browser.switchToWindow(mainTabId);
    });
});