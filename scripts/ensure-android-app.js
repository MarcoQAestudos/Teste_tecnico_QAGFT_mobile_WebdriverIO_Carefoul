const fs = require('fs');
const path = require('path');
const https = require('https');

const appDir = path.join(process.cwd(), 'apps');
const appFile = path.join(appDir, 'android.wdio.native.app.v1.0.8.apk');
const appUrl = 'https://github.com/webdriverio/native-demo-app/releases/download/v1.0.8/android.wdio.native.app.v1.0.8.apk';

function downloadFile(url, destination) {
    return new Promise((resolve, reject) => {
        fs.mkdirSync(path.dirname(destination), { recursive: true });

        const file = fs.createWriteStream(destination);
        https.get(url, (response) => {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                response.resume();
                return downloadFile(response.headers.location, destination).then(resolve).catch(reject);
            }

            if (response.statusCode !== 200) {
                response.resume();
                return reject(new Error(`Failed to download app: HTTP ${response.statusCode}`));
            }

            response.pipe(file);
            file.on('finish', () => {
                file.close(() => resolve(destination));
            });
        }).on('error', (error) => {
            fs.unlink(destination, () => {});
            reject(error);
        });

        file.on('error', (error) => {
            fs.unlink(destination, () => {});
            reject(error);
        });
    });
}

async function main() {
    if (fs.existsSync(appFile)) {
        console.log(`Android app already exists at ${appFile}`);
        return;
    }

    console.log(`Downloading Android app to ${appFile}...`);
    await downloadFile(appUrl, appFile);
    console.log(`Android app ready at ${appFile}`);
}

main().catch((error) => {
    console.error(error.message);
    process.exit(1);
});
