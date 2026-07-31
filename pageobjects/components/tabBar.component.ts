import Page from '../page';

export class TabBarComponent extends Page {
    public get homeButton() {
        return $('~Home');
    }

    public get webviewButton() {
        return $('~Webview');
    }

    public get loginButton() {
        return $('~Login');
    }

    public get formsButton() {
        return $('~Forms');
    }

    public get swipeButton() {
        return $('~Swipe');
    }

    public get dragButton() {
        return $('~Drag');
    }

    public async openHome() {
        await this.clickElement(await this.homeButton);
    }

    public async openWebview() {
        await this.clickElement(await this.webviewButton);
    }

    public async openLogin() {
        await this.clickElement(await this.loginButton);
    }

    public async openForms() {
        await this.clickElement(await this.formsButton);
    }

    public async openSwipe() {
        await this.clickElement(await this.swipeButton);
    }

    public async openDrag() {
        await this.clickElement(await this.dragButton);
    }
}

export default new TabBarComponent();
