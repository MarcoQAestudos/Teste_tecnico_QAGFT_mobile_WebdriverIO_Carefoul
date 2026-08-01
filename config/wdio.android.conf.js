const path = require('path');
const { config: sharedConfig } = require('./wdio.shared.conf');

process.env.ANDROID_HOME = process.env.ANDROID_HOME || 'C:\\Users\\estdo\\AppData\\Local\\Android\\Sdk';
process.env.ANDROID_SDK_ROOT = process.env.ANDROID_SDK_ROOT || process.env.ANDROID_HOME;

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
        // Capabilities para Android (UiAutomator2) - native-demo-app
        platformName: 'Android',
        'appium:deviceName': 'Android Emulator',
        'appium:automationName': 'UiAutomator2',
        'appium:app': path.join(process.cwd(), './apps/android.wdio.native.app.v1.0.8.apk'),
        maxInstances: 1,
        'appium:appPackage': 'com.wdiodemoapp',
        'appium:appActivity': 'com.wdiodemoapp.MainActivity',
        'appium:appWaitPackage': 'com.wdiodemoapp',
        'appium:appWaitActivity': 'com.wdiodemoapp.MainActivity',
        'appium:appWaitDuration': 60000,
        'appium:newCommandTimeout': 240,
        'appium:autoGrantPermissions': true
    }]
};
