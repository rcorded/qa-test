import Page from './page.js';

class LoginPage extends Page {
    get inputUsername() { return $('#user-name'); }
    get inputPassword() { return $('#password'); }
    get btnSubmit() { return $('#login-button'); }
    get errorMessage() { return $('.error-message-container'); }
    get errorIcons() { return $$('.error_icon'); }

    async login(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    async setUsername(username) {
        await this.inputUsername.setValue(username);
    }

    async setPassword(password) {
        await this.inputPassword.setValue(password);
    }

    async clickSubmit() {
        await this.btnSubmit.click();
    }

    open() {
        return super.open('');
    }
}

const loginPage = new LoginPage();
export default loginPage;

