const Page = require('../page');

class TabBarComponent extends Page {
    get homeButton() {
        return $('~Home');
    }

    get webviewButton() {
        return $('~Webview');
    }

    get loginButton() {
        return $('~Login');
    }

    get formsButton() {
        return $('~Forms');
    }

    get swipeButton() {
        return $('~Swipe');
    }

    get dragButton() {
        return $('~Drag');
    }

    async openHome() {
        await this.clickElement(await this.homeButton);
    }

    async openWebview() {
        await this.clickElement(await this.webviewButton);
    }

    async openLogin() {
        const loginBtn = await this.loginButton;
            await loginBtn.waitForExist({ timeout: 30000 });
            await loginBtn.waitForDisplayed({ timeout: 30000 });
            // click up to 3 times until the Login screen is visible
            const loginScreen = $('~Login-screen');
            // try several times to click and wait for the screen to appear
            for (let i = 0; i < 5; i++) {
                await this.clickElement(loginBtn);
                try {
                    if (await loginScreen.waitForDisplayed({ timeout: 3000 })) break;
                } catch (err) {
                    // retry
                }
                await driver.pause(500);
            }
            // final assurance: wait longer and fail fast if Login screen didn't open
            await loginScreen.waitForDisplayed({ timeout: 15000 });
    }

    async openForms() {
        await this.clickElement(await this.formsButton);
    }

    async openSwipe() {
        await this.clickElement(await this.swipeButton);
    }

    async openDrag() {
        await this.clickElement(await this.dragButton);
    }
}

module.exports = new TabBarComponent();
