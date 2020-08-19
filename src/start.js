const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const url = require('url');
const Fs = require('fs');
const db = require('./database/database.module');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    mainWindow.loadURL(process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../public/index.html'),
        protocol: 'file:',
        slashes: true,
    }));

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    mainWindow.webContents.openDevTools();

    // HOOKS
    ipcMain.on('openImageFileDialog', async (event, data) => {
        // open file dialog
        const imagePaths = await dialog.showOpenDialog(mainWindow, {
            title: 'Select Image',
            filters: [
                { name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'gif'] },
                { name: 'Videos', extensions: ['webm'] },
            ],
            properties: ['openFile', 'multiSelections'],
        });

        // load images
        const files = imagePaths.filePaths.map(filePath => Fs.readFileSync(filePath, { encoding: 'base64' }));
        event.sender.send('fileLoadedIntoMemory', files);
    });

    ipcMain.on('storeImages', async (event, images) => {
        db.storeImages(images);
        ipcMain.send('storedImages');
    });

    ipcMain.on('fetchImages', async (event) => {
        const images = db.listImages();
        ipcMain.send('fetchedImaged', images);
    });
} 

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

