import Page from './page.js';

class CheckoutInfoPage extends Page {
    get inputFirstName () { return $('#first-name'); }
    get inputLastName () { return $('#last-name'); }
    get inputPostalCode () { return $('#postal-code'); }
    get btnContinue () { return $('#continue'); }

    async fillForm (firstName, lastName, postalCode) {
        await this.inputFirstName.setValue(firstName);
        await this.inputLastName.setValue(lastName);
        await this.inputPostalCode.setValue(postalCode);
    }

    async clickContinue () {
        await this.btnContinue.click();
    }
}

export default new CheckoutInfoPage();