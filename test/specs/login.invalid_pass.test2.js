import loginPage from '../pageobjects/login.page.js';
import { URLS, ERROR_MESSAGES, CREDENTIALS, EXPECTED_COUNTS } from '../data/constants.js';
import { faker } from '@faker-js/faker';

describe('Test Case ID 2: Login with invalid password', () => {
    before(async () => {
        await loginPage.open();
    });

    it('TC-2: should prevent login with an invalid password and display an error message', async () => {        
        await expect(browser).toHaveUrl(`${URLS.BASE}/`);

        // Step 1: Enter valid login into "Login" field
        await loginPage.setUsername(CREDENTIALS.VALID_USER);
        await expect(loginPage.inputUsername).toHaveValue(CREDENTIALS.VALID_USER);

        // Step 2: Enter invalid password into "Password" field
        const randomInvalidPassword = faker.internet.password();
        await loginPage.setPassword(randomInvalidPassword);
        await expect(loginPage.inputPassword).toHaveValue(randomInvalidPassword);
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
        await expect(loginPage.errorMessage).toHaveText(expect.stringContaining(ERROR_MESSAGES.INVALID_CREDENTIALS));
    });
});