const Page = require('./page');

class SwipePage extends Page {
    get swipeScreenTitle() {
        return driver.isAndroid
            ? $('//android.widget.TextView[contains(@text, "Swipe")] | //XCUIElementTypeStaticText[contains(@label, "Swipe")]')
            : $('~Swipe-screen');
    }

    get carouselCard() {
        return $('~card');
    }

    get hiddenFoundText() {
        return $('//*[contains(@text, "You found me") or contains(@label, "You found me") or contains(@content-desc, "You found me")]');
    }

    /**
     * Desliza o carousel de cards para a esquerda (Horizontal Swipe)
     */
    async swipeLeft() {
        const windowSize = await driver.getWindowSize();
        const startX = Math.round(windowSize.width * 0.9);
        const endX = Math.round(windowSize.width * 0.1);
        const y = Math.round(windowSize.height * 0.65);

        for (let i = 0; i < 4; i += 1) {
            await this.swipe({ x: startX, y }, { x: endX, y });
            await driver.pause(400);
        }
    }

    /**
     * Desliza a tela para baixo (Vertical Swipe) para revelar conteúdo oculto
     */
    async swipeDown() {
        const windowSize = await driver.getWindowSize();
        const startY = Math.round(windowSize.height * 0.85);
        const endY = Math.round(windowSize.height * 0.25);
        const x = Math.round(windowSize.width * 0.5);

        for (let i = 0; i < 4; i += 1) {
            await this.swipe({ x, y: startY }, { x, y: endY });
            await driver.pause(400);
        }
    }
}

module.exports = new SwipePage();
