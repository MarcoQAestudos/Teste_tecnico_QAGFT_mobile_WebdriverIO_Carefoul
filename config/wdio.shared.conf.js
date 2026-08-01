exports.config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    //
    runner: 'local',

    //
    // ==================
    // Specify Test Files
    // ==================
    //
    specs: [
        '../test/specs/**/*.js'
    ],
    exclude: [],

    //
    // ============
    // Capabilities
    // ============
    //
    maxInstances: 1,
    capabilities: [],

    //
    // ===================
    // Test Configurations
    // ===================
    //
    logLevel: 'info',
    bail: 0,
    baseUrl: '',
    waitforTimeout: 20000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],

    mochaOpts: {
        ui: 'bdd',
        timeout: 120000
    },

    before: async function () {
        const bottomNav = $('//*[@content-desc="Home" or @text="Home" or @content-desc="Forms" or @text="Forms"]');
        await bottomNav.waitForExist({ timeout: 60000 });
        await bottomNav.waitForDisplayed({ timeout: 60000 });
    },

    //
    // =====
    // Hooks
    // =====
    //
    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (error) {
            const fs = require('fs');
            const path = require('path');
            try {
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                const dir = path.join(process.cwd(), 'logs', 'debug');
                if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
                const testName = (test && (typeof test.fullTitle === 'function' ? test.fullTitle() : test.title)) || 'unknown_test';
                const baseName = `${testName.replace(/[^a-z0-9-_\.]/ig, '_')}_${timestamp}`;
                const screenshot = await driver.takeScreenshot();
                const screenshotPath = path.join(dir, `${baseName}.png`);
                fs.writeFileSync(screenshotPath, screenshot, 'base64');
                const source = await driver.getPageSource();
                const sourcePath = path.join(dir, `${baseName}.xml`);
                fs.writeFileSync(sourcePath, source, 'utf8');
                console.log('Saved debug artifacts to', dir);
            } catch (e) {
                console.error('Failed to write debug artifacts', e);
            }
        }
    }
};
