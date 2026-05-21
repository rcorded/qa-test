import Page from './page.js';

class CartPage extends Page {
    get cartItems() { return $$('.cart_item'); }
    get btnCheckout() { return $('#checkout'); }
    get errorMessage() { return $('.error-message-container'); }

    async clickCheckout() {
        await this.btnCheckout.click();
    }

    async getCartItemsCount() {
        return await this.cartItems.length;
    }
}

const cartPage = new CartPage();
export default cartPage;
