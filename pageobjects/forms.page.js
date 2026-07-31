const Page = require('./page');

class FormsPage extends Page {
    // Campo de Entrada de Texto
    get textInput() {
        return $('~text-input');
    }

    get inputTextResult() {
        return $('~input-text-result');
    }

    // Switch Toggle
    get switchToggle() {
        return $('~switch');
    }

    get switchTextResult() {
        return $('~switch-text');
    }

    // Dropdown
    get dropdownSelect() {
        return $('~Dropdown');
    }

    get dropdownValue() {
        return $('//*[@resource-id="text_input"]');
    }

    get dropdownPickerItem() {
        return $('//android.widget.CheckedTextView[contains(@text, "webdriver.io")] | //android.widget.TextView[contains(@text, "webdriver.io")]');
    }

    // Botões Ativos/Inativos
    get activeButton() {
        return $('~button-Active');
    }

    get inactiveButton() {
        return $('~button-Inactive');
    }

    // Modais e Alertas
    get alertTitle() {
        if (driver.isAndroid) {
            return $('//*[@resource-id="com.wdiodemoapp:id/alert_title" or @resource-id="android:id/alertTitle"]');
        }
        return $('//XCUIElementTypeStaticText[contains(@label, "This button")] | //android.widget.TextView[contains(@text, "This button")]');
    }

    get alertMessage() {
        return $('id=android:id/message');
    }

    get alertOkButton() {
        return $('id=android:id/button1');
    }

    // Ações de Negócio
    async typeTextInput(text) {
        const input = await this.textInput;
        await input.waitForDisplayed({ timeout: 10000 });
        await input.setValue(text);
        try {
            await driver.hideKeyboard();
        } catch (e) {}

        const resultEl = await this.inputTextResult;
        await resultEl.waitForDisplayed({ timeout: 10000 });
    }

    async toggleSwitch() {
        await this.clickElement(await this.switchToggle);
    }

    async selectOptionFromDropdown() {
        await this.clickElement(await this.dropdownSelect);
        await driver.pause(500);
        const pickerItems = await $$('//android.widget.CheckedTextView[contains(@text, "webdriver")]|//android.widget.TextView[contains(@text, "webdriver")]');
        if (pickerItems.length > 0) {
            await this.clickElement(pickerItems[0]);
        } else {
            const fallbackItems = await $$('//android.widget.CheckedTextView|//android.widget.TextView');
            if (fallbackItems.length > 0) {
                await this.clickElement(fallbackItems[0]);
            }
        }
        await driver.pause(500);
    }

    async clickActiveButton() {
        await this.clickElement(await this.activeButton);
        try {
            await (await this.alertTitle).waitForDisplayed({ timeout: 5000 });
        } catch (err) {
            // ignore; test assertion will catch if not displayed
        }
    }

    async dismissAlert() {
        if (await (await this.alertOkButton).isDisplayed()) {
            await this.clickElement(await this.alertOkButton);
        }
    }
}

module.exports = new FormsPage();
