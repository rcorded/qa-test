import Page from './page.js';

class CheckoutCompletePage extends Page {
    get completeHeader () { return $('.complete-header'); } // success message element
    get btnBackHome () { return $('#back-to-products'); }

    async clickBackHome () {
        await this.btnBackHome.click();
    }
}

export default new CheckoutCompletePage();