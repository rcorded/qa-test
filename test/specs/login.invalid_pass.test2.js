import LoginPage from '../pageobjects/login.page.js';

describe('Test Case ID 2: Login with invalid password', () => {

    before(async () => {
        // Precondition: User is on the login page
        await LoginPage.open();
        await expect(browser).toHaveUrl(`${browser.options.baseUrl}/`);

    });

    it('Step 1: Enter valid login into "Login" field', async () => {
        await LoginPage.inputUsername.setValue('standard_user');
        await expect(LoginPage.inputUsername).toHaveValue('standard_user');
    });

    it('Step 2: Enter invalid password into "Password" field', async () => {

        const randomInvalidPassword = 'sjdfkl34wrj';  // random value
        await LoginPage.inputPassword.setValue(randomInvalidPassword);
        
        // check if data is entered to the field
        await expect(LoginPage.inputPassword).toHaveValue(randomInvalidPassword);
        
        // check if data is represented as dots
        await expect(LoginPage.inputPassword).toHaveAttribute('type', 'password');
    });

    it('Step 3: Click "Login" button', async () => {
        await LoginPage.btnSubmit.click();
        
        // check if "X" icons are displayed on the "Login" and "Password" fields
        await expect(LoginPage.errorIcons).toBeElementsArrayOfSize(2); // сheck that there are only 2 elements
        for (const icon of await LoginPage.errorIcons) {
            await expect(icon).toBeDisplayed();
        }

        // check if the fields are highlighted with red
        await expect(LoginPage.inputUsername).toHaveElementClass(expect.stringContaining('error'));
        await expect(LoginPage.inputPassword).toHaveElementClass(expect.stringContaining('error'));

        // check if the error message is displayed
        await expect(LoginPage.errorMessage).toBeDisplayed();
        await expect(LoginPage.errorMessage).toHaveText(
            expect.stringContaining('Epic sadface: Username and password do not match any user in this service')
        );
    });
});