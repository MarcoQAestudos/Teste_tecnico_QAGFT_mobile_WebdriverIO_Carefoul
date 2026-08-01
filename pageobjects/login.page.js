const Page = require('./page');
const TabBar = require('./components/tabBar.component');

class LoginPage extends Page {
    get loginScreen() {
        return $('//*[@content-desc="Login-screen" or @resource-id="com.wdiodemoapp:id/login-screen" or @text="Login"]');
    }

    // Aba de Seleção (Login / Sign Up)
    get loginTab() {
        return $('//*[@content-desc="button-login-container" or @resource-id="com.wdiodemoapp:id/button-login-container" or @text="Login"]');
    }

    get signUpTab() {
        return $('//*[@content-desc="button-sign-up-container" or @resource-id="com.wdiodemoapp:id/button-sign-up-container" or @text="Sign up"]');
    }

    // Campos do Formulário
    get emailInput() {
        return $('//*[@content-desc="input-email" or @resource-id="com.wdiodemoapp:id/input-email" or @text="Email"]');
    }

    get passwordInput() {
        return $('//*[@content-desc="input-password" or @resource-id="com.wdiodemoapp:id/input-password" or @text="Password"]');
    }

    get confirmPasswordInput() {
        return $('//*[@content-desc="input-repeat-password" or @resource-id="com.wdiodemoapp:id/input-repeat-password" or @text="Repeat password"]');
    }

    // Botões de Submissão
    get loginButton() {
        return $('//*[@content-desc="button-LOGIN" or @resource-id="com.wdiodemoapp:id/button-LOGIN" or @text="LOGIN"]');
    }

    get signUpButton() {
        return $('//*[@content-desc="button-SIGN UP" or @resource-id="com.wdiodemoapp:id/button-SIGN UP" or @text="SIGN UP"]');
    }

    // Elementos de Validação de Erro e Modais
    get errorMessageText() {
        return $('//android.widget.TextView[contains(@text, "Please enter") or contains(@text, "valid email") or contains(@text, "same password") or contains(@text, "invalid") or contains(@text, "error")] | //XCUIElementTypeStaticText[contains(@label, "Please enter") or contains(@label, "valid email") or contains(@label, "same password") or contains(@label, "invalid") or contains(@label, "error")]');
    }

    get alertTitle() {
        if (driver.isAndroid) {
            return $('//*[@resource-id="com.wdiodemoapp:id/alert_title" or @resource-id="android:id/alertTitle"]');
        }
        return $('//XCUIElementTypeStaticText[contains(@label, "Signed Up") or contains(@label, "Success") or contains(@label, "This button")]');
    }

    get alertMessage() {
        return $('id=android:id/message');
    }

    get alertOkButton() {
        return $('id=android:id/button1');
    }

    async ensureLoginScreen() {
        try {
            await this.loginScreen.waitForDisplayed({ timeout: 5000 });
        } catch (err) {
            await TabBar.openLogin();
            await this.loginScreen.waitForDisplayed({ timeout: 15000 });
        }
    }

    async isSignUpFormVisible() {
        try {
            return await (await this.confirmPasswordInput).isDisplayed();
        } catch (err) {
            return false;
        }
    }

    // Ações de Negócio
    async switchToLoginTab() {
        await this.ensureLoginScreen();

        if (await this.isSignUpFormVisible()) {
            await this.clickElement(await this.loginTab);
        }

        await (await this.loginButton).waitForDisplayed({ timeout: 15000 });
        await (await this.passwordInput).waitForDisplayed({ timeout: 15000 });
    }

    async switchToSignUpTab() {
        await this.ensureLoginScreen();

        if (!(await this.isSignUpFormVisible())) {
            await this.clickElement(await this.signUpTab);
        }

        await (await this.signUpButton).waitForDisplayed({ timeout: 15000 });
        await (await this.confirmPasswordInput).waitForDisplayed({ timeout: 15000 });
    }

    async performLogin(email, pass) {
        await this.switchToLoginTab();
        await this.fillInput(await this.emailInput, email);
        await this.fillInput(await this.passwordInput, pass);
        try {
            await driver.hideKeyboard();
        } catch (err) {
            // ignore
        }
        await this.clickElement(await this.loginButton);
    }

    async performSignUp(email, pass, confirmPass) {
        await this.switchToSignUpTab();
        await this.fillInput(await this.emailInput, email);
        await this.fillInput(await this.passwordInput, pass);
        await this.fillInput(await this.confirmPasswordInput, confirmPass);
        try {
            await driver.hideKeyboard();
        } catch (err) {
            // ignore
        }
        await this.clickElement(await this.signUpButton);
    }

    async waitForValidation(timeout = 10000) {
        await driver.waitUntil(async () => {
            try {
                if (await (await this.errorMessageText).isDisplayed()) return true;
            } catch (e) {}
            try {
                if (await (await this.alertTitle).isDisplayed()) return true;
            } catch (e) {}
            return false;
        }, { timeout, timeoutMsg: 'Nenhuma mensagem de validação ou alerta foi exibida' });
    }

    async dismissAlert() {
        try {
            const okBtn = await this.alertOkButton;
            if (await okBtn.isDisplayed()) {
                await this.clickElement(okBtn);
                await driver.pause(500);
            }
        } catch (e) {
            // Ignore if no alert is open
        }
    }
}

module.exports = new LoginPage();
