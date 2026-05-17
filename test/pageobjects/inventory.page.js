import Page from './page.js';

class InventoryPage extends Page {
    get cartIcon () { return $('.shopping_cart_link'); }

    get cartBadge () { return $('.shopping_cart_badge'); } 
    get firstProductAddBtn () { return $$('.btn_inventory')[0]; } 
    get firstProductName () { return $$('.inventory_item_name')[0]; }
    get firstProductPrice () { return $$('.inventory_item_price')[0]; }

    get twitterIcon () { return $('.social_twitter a'); }
    get facebookIcon () { return $('.social_facebook a'); }
    get linkedinIcon () { return $('.social_linkedin a'); }

    // sorting dropdown elements
    get sortDropdown () { return $('.product_sort_container'); }
    
    get allProductNames () { return $$('.inventory_item_name'); }
    get allProductPrices () { return $$('.inventory_item_price'); }

    get burgerMenuBtn () { return $('#react-burger-menu-btn'); }
    get menuItems () { return $$('.bm-item-list a'); } 
    get logoutBtn () { return $('#logout_sidebar_link'); }

    // navigate to the shopping cart page
    async goToCart () {
        await this.cartIcon.click();
    }

    // selects a sorting option
    async sortProductsBy (value) {
        await this.sortDropdown.selectByAttribute('value', value);
    }

    // get all product names
    async getProductNamesArray () {
        return await this.allProductNames.map(async (el) => await el.getText());
    }

    // get all product prices
    async getProductPricesArray () {
        const texts = await this.allProductPrices.map(async (el) => await el.getText());
        // convert strings into numbers
        return texts.map(text => parseFloat(text.replace('$', '')));
    }

    async openMenu () {
        await this.burgerMenuBtn.click();
        // wait until the button becomes active
        await this.logoutBtn.waitForDisplayed({ timeout: 2000 });
    }

    async logout () {
        await this.logoutBtn.click();
    }


}

export default new InventoryPage();