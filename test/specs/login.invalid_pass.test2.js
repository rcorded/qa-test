import loginPage from '../pageobjects/login.page.js';
import { URLS, ERROR_MESSAGES } from '../data/constants.js';
import { faker } from '@faker-js/faker';

describe('Test Case ID 2: Login with invalid password', () => {
    before(async () => {
        await loginPage.open();
    });

    it('Should be on the login page', async () => {
        await expect(browser).toHaveUrl(`${URLS.BASE}/`);
    });

    it('Step 1: Enter valid login into "Login" field', async () => {
        await loginPage.setUsername('standard_user');
        await expect(loginPage.inputUsername).toHaveValue('standard_user');
    });

    it('Step 2: Enter invalid password into "Password" field', async () => {
        const randomInvalidPassword = faker.internet.password();
        await loginPage.setPassword(randomInvalidPassword);
        await expect(loginPage.inputPassword).toHaveValue(randomInvalidPassword);
        await expect(loginPage.inputPassword).toHaveAttribute('type', 'password');
    });

    it('Step 3: Click "Login" button', async () => {
        await loginPage.clickSubmit();
        await expect(loginPage.errorIcons).toBeElementsArrayOfSize(2);
        for (const icon of await loginPage.errorIcons) {
            await expect(icon).toBeDisplayed();
        }
        await expect(loginPage.inputUsername).toHaveElementClass(expect.stringContaining('error'));
        await expect(loginPage.inputPassword).toHaveElementClass(expect.stringContaining('error'));
        await expect(loginPage.errorMessage).toBeDisplayed();
        await expect(loginPage.errorMessage).toHaveText(expect.stringContaining(ERROR_MESSAGES.INVALID_CREDENTIALS));
    });
});