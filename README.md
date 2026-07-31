# Desafio Técnico de Automação de Testes Mobile (JavaScript) - Banco Carrefour 🚀

[![WebDriverIO](https://img.shields.io/badge/WebDriverIO-v8%2Fv9-orange.svg)](https://webdriver.io/)
[![Appium](https://img.shields.io/badge/Appium-v2.x-purple.svg)](https://appium.io/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow.svg)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-blue.svg)](.github/workflows/mobile-tests.yml)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Este repositório contém a solução do **Desafio de Automação de Testes Mobile** para o **Banco Carrefour** desenvolvida em **JavaScript (Node.js)** utilizando o aplicativo de demonstração oficial **`native-demo-app`** do WebDriverIO.

---

## 📋 Resumo da Solução e Requisitos Atendidos

| Requisito | Status | Implementação |
| :--- | :---: | :--- |
| **Linguagem JavaScript** | ✅ | Todo o código foi escrito em JavaScript puro (CommonJS / Node.js). |
| **10 Cenários de Teste** | ✅ | Cobertura completa de Login, Cadastro, Formulários, Erros, Navegação e Swipe. |
| **Page Object Model (POM)** | ✅ | Estruturado em `pageobjects/` com herança (`Page` base) e componentes (`tabBar.component.js`). |
| **Data-Driven Testing (JSON)** | ✅ | Testes parametrizados via arquivos JSON em `data/loginData.json` e `data/formData.json`. |
| **Execução Android e iOS** | ✅ | Suporte a UiAutomator2 (Android) e XCUITest (iOS) configurados em `config/`. |
| **Integração BrowserStack** | ✅ | Suporte a execução em dispositivos reais na nuvem em `config/wdio.browserstack.conf.js`. |
| **Relatórios de Teste** | ✅ | Integração com **Allure Report** e Spec Reporter com captura automática de screenshot em falhas. |

---

## 🧪 Relação dos 10 Cenários de Teste (JavaScript)

| # | Suíte | Descrição do Cenário | Padrão / Tática |
| :-: | :--- | :--- | :--- |
| **1** | `login.spec.js` | Realizar login com sucesso informando credenciais válidas. | POM + Data-Driven |
| **2** | `login.spec.js` | Validar mensagem de erro ao tentar login com e-mail em formato inválido. | POM + Data-Driven + Erro |
| **3** | `login.spec.js` | Realizar cadastro de novo usuário com sucesso e validação de modal. | POM + Data-Driven |
| **4** | `login.spec.js` | Validar mensagem de erro ao tentar cadastrar com senhas divergentes. | POM + Data-Driven + Erro |
| **5** | `forms.spec.js` | Preencher campo de texto e verificar espelhamento em tempo real. | POM + Data-Driven |
| **6** | `forms.spec.js` | Alternar estado do botão Switch (ON/OFF) e verificar estado. | POM |
| **7** | `forms.spec.js` | Selecionar opção no Dropdown e verificar seleção ativa. | POM + Data-Driven |
| **8** | `forms.spec.js` | Clicar em botão Ativo e validar o modal de confirmação. | POM + Modal |
| **9** | `navigation.spec.js` | Validar navegação fluida entre todas as abas da barra inferior (Home, Webview, Login, Forms, Swipe). | POM + Componente TabBar |
| **10** | `swipe.spec.js` | Executar gesto mobile Swipe horizontal e vertical para revelar elementos ocultos. | POM + Gestos W3C |

---

## 🏗️ Estrutura do Projeto (JavaScript)

```
qa-mobile-carrefour-wdio/
├── config/
│   ├── wdio.shared.conf.js         # Configuração compartilhada base
│   ├── wdio.android.conf.js        # Configuração para Emulador Android
│   ├── wdio.ios.conf.js            # Configuração para Simulador iOS
│   └── wdio.browserstack.conf.js   # Configuração para Cloud BrowserStack
├── data/
│   ├── loginData.json              # Massa de dados para Login/Cadastro (Data-Driven)
│   └── formData.json               # Massa de dados para Formulários (Data-Driven)
├── pageobjects/
│   ├── page.js                     # Classe base em JS com métodos Appium
│   ├── components/
│   │   └── tabBar.component.js     # Componente da barra de navegação inferior em JS
│   ├── home.page.js                # Page Object da tela Home em JS
│   ├── login.page.js               # Page Object da tela Login/Cadastro em JS
│   ├── forms.page.js               # Page Object da tela Forms em JS
│   └── swipe.page.js               # Page Object da tela Swipe em JS
├── test/
│   ├── specs/
│   │   ├── login.spec.js           # Testes de Autenticação em JS (Cenários 1 a 4)
│   │   ├── forms.spec.js           # Testes de Formulários em JS (Cenários 5 a 8)
│   │   ├── navigation.spec.js      # Teste de Navegação em JS (Cenário 9)
│   │   └── swipe.spec.js           # Teste de Gestos Swipe em JS (Cenário 10)
├── package.json                    # Dependências e scripts de execução
└── README.md                       # Documentação do projeto
```

---

## ⚙️ Pré-requisitos de Ambiente

Para executar os testes localmente, certifique-se de ter os seguintes componentes instalados:

1. **Node.js** (versão 18 ou superior) & **npm**
2. **Java JDK** (versão 11 ou 17) & variável `JAVA_HOME` configurada
3. **Android Studio** (para Android) & variável `ANDROID_HOME` configurada com Android Emulator (AVD)
4. **Xcode** (para iOS - exclusivo para macOS) & Xcode Command Line Tools
5. **Appium 2.x** e Drivers:
   ```bash
   npm install -g appium
   appium driver install uiautomator2
   appium driver install xcuitest
   ```
6. **APK do aplicativo native-demo-app**:
   - Baixe a APK atualizada no repositório oficial do WebDriverIO: [native-demo-app releases](https://github.com/webdriverio/native-demo-app/releases)
   - Salve a APK em `./apps/android.wdio.native.app.v1.0.8.apk`

---

## 🚀 Como Executar os Testes em JavaScript

### 1. Instalação de Dependências
```bash
npm install
```

### 2. Execução no Emulador Android (Local)
```bash
npm run test:android
```

### 3. Execução no Simulador iOS (macOS Local)
```bash
npm run test:ios
```

### 4. Execução em Dispositivos Reais via BrowserStack (Cloud)
```bash
# Windows PowerShell
OBS: Não tenho Acesso ao BrowserStack favor configurar no de vocês 
$env:BROWSERSTACK_USERNAME="seu_usuario"
$env:BROWSERSTACK_ACCESS_KEY="sua_chave"

# Executar testes na nuvem BrowserStack
npm run test:browserstack
```

---

## 📊 Geração de Relatórios (Allure Report)

```bash
# Gerar o relatório
npm run report:generate

# Abrir o relatório no navegador
npm run report:open
```

---

## 👨‍💻 Autor

Desenvolvido para o **QA Marco GFT - Desafio Técnico de QA Mobile - Banco Carrefour**.
