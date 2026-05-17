import Page from './page.js';

class LoginPage extends Page {
    get inputUsername () { return $('#user-name'); }
    get inputPassword () { return $('#password'); }
    get btnSubmit () { return $('#login-button'); }

    get errorMessage () { return $('.error-message-container'); }
    get errorIcons () { return $$('.error_icon'); } // an array of 'x' icons in the input fields


    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    open () {
        return super.open('');
    }
}

export default new LoginPage();