const TabBar = require('../../pageobjects/components/tabBar.component.js');
const HomePage = require('../../pageobjects/home.page');
const LoginPage = require('../../pageobjects/login.page');
const FormsPage = require('../../pageobjects/forms.page');
const SwipePage = require('../../pageobjects/swipe.page');

describe('Suíte de Testes: Navegação entre Telas', () => {

    it('Cenário 9: Deve navegar fluidamente entre todas as abas da barra inferior', async () => {
        // Navegar para Home e validar
        await TabBar.openHome();
        await expect(HomePage.homeTitle).toBeDisplayed();

        // Navegar para Webview e validar
        await TabBar.openWebview();
        await driver.pause(1000);

        // Navegar para Login e validar
        await TabBar.openLogin();
        await expect(LoginPage.loginTab).toBeDisplayed();

        // Navegar para Forms e validar
        await TabBar.openForms();
        await expect(FormsPage.textInput).toBeDisplayed();

        // Navegar para Swipe e validar
        await TabBar.openSwipe();
        await expect(SwipePage.swipeScreenTitle).toBeDisplayed();

        // Retornar para Home
        await TabBar.openHome();
        await expect(HomePage.homeTitle).toBeDisplayed();
    });
});
