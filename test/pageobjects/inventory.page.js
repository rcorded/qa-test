import Page from './page.js';

class InventoryPage extends Page {
    get cartIcon() { return $('.shopping_cart_link'); }
    get inventoryContainer() { return $('.inventory_container'); }
    get cartBadge() { return $('.shopping_cart_badge'); }
    get firstProductAddBtn() { return $$('.btn_inventory')[0]; }
    get firstProductName() { return $$('.inventory_item_name')[0]; }
    get firstProductPrice() { return $$('.inventory_item_price')[0]; }
    get twitterIcon() { return $('.social_twitter a'); }
    get facebookIcon() { return $('.social_facebook a'); }
    get linkedinIcon() { return $('.social_linkedin a'); }
    get sortDropdown() { return $('.product_sort_container'); }
    get allProductNames() { return $$('.inventory_item_name'); }
    get allProductPrices() { return $$('.inventory_item_price'); }
    get burgerMenuBtn() { return $('#react-burger-menu-btn'); }
    get menuItems() { return $$('.bm-item-list a'); }
    get logoutBtn() { return $('#logout_sidebar_link'); }

    async goToCart() {
        await this.cartIcon.click();
    }

    async addFirstProductToCart() {
        await this.firstProductAddBtn.click();
    }

    async getFirstProductName() {
        return await this.firstProductName.getText();
    }

    async getFirstProductPrice() {
        return await this.firstProductPrice.getText();
    }

    async clickTwitter() {
        await this.twitterIcon.click();
    }

    async clickFacebook() {
        await this.facebookIcon.click();
    }

    async clickLinkedin() {
        await this.linkedinIcon.click();
    }

    async sortProductsBy(value) {
        await this.sortDropdown.selectByAttribute('value', value);
    }

    async getProductNamesArray() {
        return await this.allProductNames.map(async (el) => await el.getText());
    }

    async getProductPricesArray() {
        const texts = await this.allProductPrices.map(async (el) => await el.getText());
        return texts.map(text => parseFloat(text.replace('$', '')));
    }

    async openMenu() {
        await this.burgerMenuBtn.click();
        await this.logoutBtn.waitForDisplayed({ timeout: 2000 });
    }

    async logout() {
        await this.logoutBtn.click();
    }

    async waitForPageToLoad() {
        await this.cartIcon.waitForDisplayed();
        await this.inventoryContainer.waitForDisplayed();
    }
}

export default new InventoryPage();