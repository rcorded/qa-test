import Page from './page.js';

class CartPage extends Page {

    // get an array of all items in the cart
    get cartItems () { return $$('.cart_item'); }
    get btnCheckout () { return $('#checkout'); }
    
    // selector for the error message 
    get errorMessage () { return $('.error-message-container'); }

    async clickCheckout () {
        await this.btnCheckout.click();
    }
}

export default new CartPage();