const TabBar = require('../../pageobjects/components/tabBar.component.js');
const FormsPage = require('../../pageobjects/forms.page');
const formData = require('../../data/formData.json');

describe('Suíte de Testes: Componentes e Formulários (Forms)', () => {

    beforeEach(async () => {
        const formsButton = await $('//android.widget.Button[@content-desc="Forms"] | //android.widget.Button[.//android.widget.TextView[@text="Forms"]] | //*[@content-desc="Forms" or @text="Forms"]');
        await formsButton.waitForExist({ timeout: 60000 });
        await formsButton.waitForDisplayed({ timeout: 60000 });
        await formsButton.click();
    });

    it('Cenário 5: Deve preencher campo de texto e verificar espelhamento em tempo real', async () => {
        const textToType = formData.sampleInputText;

        await FormsPage.typeTextInput(textToType);

        await expect(FormsPage.inputTextResult).toBeDisplayed();
    });

    it('Cenário 6: Deve alternar o estado do botão Switch e atualizar a legenda exibida', async () => {
        const initialText = await FormsPage.switchTextResult.getText();

        await FormsPage.toggleSwitch();

        const updatedText = await FormsPage.switchTextResult.getText();
        expect(updatedText).not.toEqual(initialText);
    });

    it('Cenário 7: Deve selecionar uma opção no Dropdown e verificar a opção ativa', async () => {
        await FormsPage.selectOptionFromDropdown();

        await expect(FormsPage.dropdownValue).toBeDisplayed();
        const dropdownValue = await FormsPage.dropdownValue.getText();
        expect(dropdownValue).toContain(formData.dropdownOption);
    });

    it('Cenário 8: Deve clicar no botão Ativo e validar a exibição do modal de mensagem', async () => {
        await FormsPage.clickActiveButton();

        await expect(FormsPage.alertTitle).toBeDisplayed();
        const alertTitleText = await FormsPage.alertTitle.getText();
        expect(alertTitleText).toContain(formData.activeModal.expectedTitle);

        await FormsPage.dismissAlert();
    });
});
