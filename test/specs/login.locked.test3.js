import loginPage from '../pageobjects/login.page.js';
import { URLS, ERROR_MESSAGES } from '../data/constants.js';

describe('Test Case ID 3: Login with locked out test login', () => {
    before(async () => {
        await loginPage.open();
    });

    it('Should be on the login page', async () => {
        await expect(browser).toHaveUrl(`${URLS.BASE}/`);
    });

    it('Step 1: Enter valid login into "Login" field', async () => {
        await loginPage.setUsername('locked_out_user');
        await expect(loginPage.inputUsername).toHaveValue('locked_out_user');
    });

    it('Step 2: Enter valid password into "Password" field', async () => {
        await loginPage.setPassword('secret_sauce');
        await expect(loginPage.inputPassword).toHaveValue('secret_sauce');
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
        await expect(loginPage.errorMessage).toHaveText(expect.stringContaining(ERROR_MESSAGES.LOCKED_OUT_USER));
    });
});