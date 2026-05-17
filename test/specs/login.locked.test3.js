import LoginPage from '../pageobjects/login.page.js';

describe('Test Case ID 3: Login with locked out test login', () => {

    before(async () => {
        // Precondition: User is on the login page
        await LoginPage.open();
        await expect(browser).toHaveUrl(`${browser.options.baseUrl}/`);

    });

    it('Step 1: Enter valid login into "Login" field', async () => {
        await LoginPage.inputUsername.setValue('locked_out_user');
        await expect(LoginPage.inputUsername).toHaveValue('locked_out_user');
    });

    it('Step 2: Enter valid password into "Password" field', async () => {
        await LoginPage.inputPassword.setValue('secret_sauce');
        
        await expect(LoginPage.inputPassword).toHaveValue('secret_sauce');
        
        // check if data is represented as dots
        await expect(LoginPage.inputPassword).toHaveAttribute('type', 'password');
    });

    it('Step 3: Click "Login" button', async () => {
        await LoginPage.btnSubmit.click();
        

        await expect(LoginPage.errorIcons).toBeElementsArrayOfSize(2); // сheck that there are only 2 error icon elements
        for (const icon of await LoginPage.errorIcons) {
            await expect(icon).toBeDisplayed();
        }

        // check if the fields are highlighted with red.
        await expect(LoginPage.inputUsername).toHaveElementClass(expect.stringContaining('error'));
        await expect(LoginPage.inputPassword).toHaveElementClass(expect.stringContaining('error'));

        // check if the error message is displayed
        await expect(LoginPage.errorMessage).toBeDisplayed();
        await expect(LoginPage.errorMessage).toHaveText(
            expect.stringContaining('Epic sadface: Sorry, this user has been locked out.')
        );
    });
});