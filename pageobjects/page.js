module.exports = class Page {
    /**
     * Espera e clica em um elemento
     */
    async clickElement(element) {
        await element.waitForExist({ timeout: 30000 });
        await element.waitForDisplayed({ timeout: 30000 });
        await element.click();
    }

    /**
     * Preenche um campo de texto após garantir que está visível
     */
    async fillInput(element, value) {
        await element.waitForDisplayed({ timeout: 15000 });
        await element.click();
        await driver.pause(400);

        if (driver.isAndroid) {
            await this.setAndroidInputValue(element, value);

            let isPassword = false;
            try {
                isPassword = (await element.getAttribute('password')) === 'true';
            } catch (err) {
                // ignore
            }

            if (!isPassword) {
                let currentText = await element.getText();
                if (currentText !== value) {
                    await this.setAndroidInputValue(element, value);
                    currentText = await element.getText();
                }
                if (currentText !== value && value.endsWith(currentText)) {
                    const missingPrefix = value.slice(0, value.length - currentText.length);
                    await element.click();
                    await driver.pause(200);
                    await element.addValue(missingPrefix);
                }
            }

            try {
                await driver.hideKeyboard();
            } catch (err) {
                // ignore if keyboard can't be hidden
            }
        } else {
            await element.setValue(value);
        }

        await driver.pause(200);
    }

    async setAndroidInputValue(element, value) {
        try {
            await driver.execute('mobile: replaceElementValue', {
                elementId: element.elementId,
                text: value,
            });
            return;
        } catch (err) {
            // fallback for drivers without replaceElementValue
        }

        try {
            await element.clearValue();
        } catch (err) {
            // ignore
        }

        await driver.pause(300);
        await element.addValue(value);
    }

    /**
     * Obtém o texto de um elemento
     */
    async getElementText(element) {
        await element.waitForDisplayed({ timeout: 15000 });
        return await element.getText();
    }

    /**
     * Executa gesto de Swipe (deslizar) vertical ou horizontal
     */
    async swipe(from, to) {
        await driver.action('pointer', { pointerType: 'touch' })
            .move({ duration: 0, x: from.x, y: from.y })
            .down({ button: 0 })
            .move({ duration: 1000, x: to.x, y: to.y })
            .up({ button: 0 })
            .perform();
    }
};
