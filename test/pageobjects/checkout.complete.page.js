import Page from './page.js';

class CheckoutCompletePage extends Page {
    get completeHeader() { return $('.complete-header'); }
    get btnBackHome() { return $('#back-to-products'); }

    async clickBackHome() {
        await this.btnBackHome.click();
    }
}

const checkoutCompletePage = new CheckoutCompletePage();
export default checkoutCompletePage;