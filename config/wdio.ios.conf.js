const path = require('path');
const { config: sharedConfig } = require('./wdio.shared.conf');

exports.config = {
    ...sharedConfig,

    port: 4723,
    services: [
        ['appium', {
            args: {
                relaxedSecurity: true
            },
            logPath: './logs'
        }]
    ],

    capabilities: [{
        // Capabilities para iOS Simulator (XCUITest) - native-demo-app
        platformName: 'iOS',
        'appium:deviceName': 'iPhone 15',
        'appium:platformVersion': '17.0',
        'appium:automationName': 'XCUITest',
        'appium:app': path.join(process.cwd(), './apps/ios.simulator.wdio.native.app.v1.0.8.zip'),
        'appium:newCommandTimeout': 240,
        'appium:autoAcceptAlerts': true
    }]
};
