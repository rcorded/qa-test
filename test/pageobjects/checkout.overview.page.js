import Page from './page.js';

class CheckoutOverviewPage extends Page {
    get inventoryItemName() { return $('.inventory_item_name'); }
    get itemTotal() { return $('.summary_subtotal_label'); }
    get btnFinish() { return $('#finish'); }

    async clickFinish() {
        await this.btnFinish.click();
    }
}

export default new CheckoutOverviewPage();