import loginPage from '../pageobjects/login.page.js';
import { URLS, ERROR_MESSAGES, CREDENTIALS, EXPECTED_COUNTS } from '../data/constants.js';

describe('Test Case ID 3: Login with locked out test login', () => {
    before(async () => {
        await loginPage.open();
    });

    it('TC-3: should prevent login for a locked out user and display an error message', async () => {
        await expect(browser).toHaveUrl(`${URLS.BASE}/`);

        // Step 1: Enter valid login into "Login" field
        await loginPage.setUsername(CREDENTIALS.LOCKED_USER);
        await expect(loginPage.inputUsername).toHaveValue(CREDENTIALS.LOCKED_USER);

        // Step 2: Enter valid password into "Password" field
        await loginPage.setPassword(CREDENTIALS.PASSWORD);
        await expect(loginPage.inputPassword).toHaveValue(CREDENTIALS.PASSWORD);
        await expect(loginPage.inputPassword).toHaveAttribute('type', 'password');

        // Step 3: Click "Login" button
        await loginPage.clickSubmit();        
        await expect(loginPage.errorIcons).toBeElementsArrayOfSize(EXPECTED_COUNTS.ERROR_ICONS);
        for (const icon of await loginPage.errorIcons) {
            await expect(icon).toBeDisplayed();
        }
        await expect(loginPage.inputUsername).toHaveElementClass(expect.stringContaining('error'));
        await expect(loginPage.inputPassword).toHaveElementClass(expect.stringContaining('error'));
        await expect(loginPage.errorMessage).toBeDisplayed();
        await expect(loginPage.errorMessage).toHaveText(expect.stringContaining(ERROR_MESSAGES.LOCKED_OUT_USER));
    });
});