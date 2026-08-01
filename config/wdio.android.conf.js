const path = require('path');
const { config: sharedConfig } = require('./wdio.shared.conf');

process.env.ANDROID_HOME = process.env.ANDROID_HOME || 'C:\\Users\\estdo\\AppData\\Local\\Android\\Sdk';
process.env.ANDROID_SDK_ROOT = process.env.ANDROID_SDK_ROOT || process.env.ANDROID_HOME;

const deviceName = process.env.ANDROID_DEVICE_NAME || 'Android Emulator';
const udid = process.env.ANDROID_SERIAL || '';

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
        'appium:deviceName': deviceName,
        ...(udid ? { 'appium:udid': udid } : {}),
        'appium:automationName': 'UiAutomator2',
        'appium:app': path.join(process.cwd(), './apps/android.wdio.native.app.v1.0.8.apk'),
        maxInstances: 1,
        'appium:appPackage': 'com.wdiodemoapp',
        'appium:appActivity': 'com.wdiodemoapp.MainActivity',
        'appium:appWaitPackage': 'com.wdiodemoapp',
        'appium:appWaitActivity': 'com.wdiodemoapp.MainActivity',
        'appium:appWaitDuration': 60000,
        'appium:newCommandTimeout': 240,
        'appium:autoGrantPermissions': true,
        'appium:ignoreHiddenApiPolicyError': true,
        'appium:adbExecTimeout': 60000
    }]
};
