const TabBar = require('../../pageobjects/components/tabBar.component.js');
const SwipePage = require('../../pageobjects/swipe.page');

describe('Suíte de Testes: Gestos Mobile (Swipe)', () => {

    beforeEach(async () => {
        await TabBar.openSwipe();
    });

    it('Cenário 10: Deve realizar gesto de swipe lateral e vertical para revelar elementos ocultos', async () => {
        await expect(SwipePage.swipeScreenTitle).toBeDisplayed();

        // Realiza swipe lateral nos cards
        await SwipePage.swipeLeft();
        await driver.pause(500);
        await SwipePage.swipeLeft();

        // Realiza swipe vertical para baixo para rolar a tela
        await SwipePage.swipeDown();

        // Valida se o texto oculto "You found me" se tornou visível
        await expect(SwipePage.hiddenFoundText).toBeDisplayed();
    });
});
