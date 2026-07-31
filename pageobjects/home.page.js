const Page = require('./page');

class HomePage extends Page {
    get homeTitle() {
        return $('~Home');
    }

    get demoAppDescription() {
        return $('//android.widget.TextView[contains(@text, "Demo App")] | //XCUIElementTypeStaticText[contains(@label, "Demo App")]');
    }

    async isLoaded() {
        return await (await this.homeTitle).isDisplayed();
    }
}

module.exports = new HomePage();
