const { config: sharedConfig } = require('./wdio.shared.conf');

exports.config = {
    ...sharedConfig,

    user: process.env.BROWSERSTACK_USERNAME || 'SEU_USUARIO_BROWSERSTACK',
    key: process.env.BROWSERSTACK_ACCESS_KEY || 'SUA_CHAVE_BROWSERSTACK',

    hostname: 'hub.browserstack.com',
    services: ['browserstack'],

    capabilities: [{
        // Capabilities para dispositivo real Android na nuvem BrowserStack
        'bstack:options': {
            projectName: 'Desafio QA Mobile Banco Carrefour',
            buildName: 'Build - native-demo-app JS WDIO',
            sessionName: 'Testes Regressivos Mobile JS',
            userName: process.env.BROWSERSTACK_USERNAME || 'SEU_USUARIO_BROWSERSTACK',
            accessKey: process.env.BROWSERSTACK_ACCESS_KEY || 'SUA_CHAVE_BROWSERSTACK',
            debug: true,
            networkLogs: true
        },
        platformName: 'Android',
        'appium:deviceName': 'Google Pixel 7',
        'appium:platformVersion': '13.0',
        'appium:app': process.env.BROWSERSTACK_APP_ID || 'bs://c7000000000000000000000000000000'
    }]
};
