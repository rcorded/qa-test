import Page from './page.js';

class CheckoutOverviewPage extends Page {
    get inventoryItemName () { return $('.inventory_item_name'); }
    get itemTotal () { return $('.summary_subtotal_label'); } // total price
    get btnFinish () { return $('#finish'); }

    // complete the checkout process by clicking the finish button
    async clickFinish () {
        await this.btnFinish.click();
    }
}

export default new CheckoutOverviewPage();