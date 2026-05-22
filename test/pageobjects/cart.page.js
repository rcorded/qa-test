import Page from './page.js';

class CartPage extends Page {
    get cartItems() { return $$('.cart_item'); }
    get btnCheckout() { return $('#checkout'); }
    get errorMessage() { return $('.error-message-container'); }
    get firstCartItemName() { return $$('.inventory_item_name')[0]; }

    async clickCheckout() {
        await this.btnCheckout.click();
    }

    async getCartItemsCount() {
        return await this.cartItems.length;
    }
}

export default new CartPage();
