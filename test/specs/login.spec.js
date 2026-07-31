const TabBar = require('../../pageobjects/components/tabBar.component.js');
const LoginPage = require('../../pageobjects/login.page');
const loginData = require('../../data/loginData.json');

describe('Suíte de Testes: Autenticação e Cadastro (Login & Sign Up)', () => {

    beforeEach(async () => {
        await LoginPage.dismissAlert();
        await TabBar.openLogin();
    });

    afterEach(async () => {
        await LoginPage.dismissAlert();
    });

    it('Cenário 1: Deve realizar login com sucesso informando credenciais válidas', async () => {
        const { email, password, expectedSuccessTitle, expectedSuccessMessage } = loginData.validUser;

        await LoginPage.performLogin(email, password);
        await LoginPage.waitForValidation();

        await expect(LoginPage.alertTitle).toBeDisplayed();
        const alertTitle = await LoginPage.alertTitle.getText();
        expect(alertTitle).toContain(expectedSuccessTitle);

        const alertMessage = await LoginPage.alertMessage.getText();
        expect(alertMessage).toContain(expectedSuccessMessage);

        await LoginPage.dismissAlert();
    });

    it('Cenário 2: Deve exibir mensagem de erro ao tentar login com e-mail em formato inválido', async () => {
        const { email, password, expectedErrorMessage } = loginData.invalidEmailUser;

        await LoginPage.performLogin(email, password);
        await LoginPage.waitForValidation();

        await expect(LoginPage.errorMessageText).toBeDisplayed();
        const errorText = await LoginPage.errorMessageText.getText();
        expect(errorText).toContain(expectedErrorMessage);
    });

    it('Cenário 3: Deve cadastrar novo usuário com sucesso quando todas as informações forem válidas', async () => {
        const { email, password, confirmPassword, expectedSuccessTitle, expectedSuccessMessage } = loginData.validSignUpUser;

        await LoginPage.performSignUp(email, password, confirmPassword);
        await LoginPage.waitForValidation();

        await expect(LoginPage.alertTitle).toBeDisplayed();
        const alertTitle = await LoginPage.alertTitle.getText();
        expect(alertTitle).toContain(expectedSuccessTitle);

        const alertMessage = await LoginPage.alertMessage.getText();
        expect(alertMessage).toContain(expectedSuccessMessage);

        await LoginPage.dismissAlert();
    });

    it('Cenário 4: Deve exibir mensagem de erro ao tentar cadastrar com senhas divergentes', async () => {
        const { email, password, confirmPassword, expectedErrorMessage } = loginData.passwordMismatchUser;

        await LoginPage.performSignUp(email, password, confirmPassword);
        await LoginPage.waitForValidation();

        await expect(LoginPage.errorMessageText).toBeDisplayed();
        const errorText = await LoginPage.errorMessageText.getText();
        expect(errorText).toContain(expectedErrorMessage);
    });
});
