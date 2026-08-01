const Page = require('../page');

class TabBarComponent extends Page {
    get homeButton() {
        return $('//*[@content-desc="Home" or @resource-id="com.wdiodemoapp:id/Home" or @text="Home"]');
    }

    get webviewButton() {
        return $('//*[@content-desc="Webview" or @resource-id="com.wdiodemoapp:id/Webview" or @text="Web" or @text="Webview"]');
    }

    get loginButton() {
        return $('//*[@content-desc="Login" or @resource-id="com.wdiodemoapp:id/Login" or @text="Login"]');
    }

    get formsButton() {
        return $('//*[@content-desc="Forms" or @resource-id="com.wdiodemoapp:id/Forms" or @text="Forms"]');
    }

    get swipeButton() {
        return $('//*[@content-desc="Swipe" or @resource-id="com.wdiodemoapp:id/Swipe" or @text="Swipe"]');
    }

    get dragButton() {
        return $('//*[@content-desc="Drag" or @text="Drag"]');
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
        const loginScreen = $('//*[@content-desc="Login-screen" or @resource-id="com.wdiodemoapp:id/login-screen" or @text="Login"]');
        for (let i = 0; i < 5; i++) {
            await this.clickElement(loginBtn);
            try {
                await loginScreen.waitForDisplayed({ timeout: 5000 });
                break;
            } catch (err) {
                await driver.pause(500);
            }
        }
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
