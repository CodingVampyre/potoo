const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const url = require('url');
const Fs = require('fs');
const db = require('./electron/database.module');

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

    // *********
    // * Hooks *
    // *********
    
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
        event.sender.send('log', imagePaths);
        const files = imagePaths.filePaths.map(filePath => Fs.readFileSync(filePath, { encoding: 'base64' }));
        event.sender.send('fileLoadedIntoMemory', files);
    });
    
    ipcMain.on('storeImages', async (event, images) => {
        event.sender.send('log', '[storing] start');
        await db.storeImages(images);
        event.sender.send('log', '[storing] end');
        event.sender.send('storedImages');
    });
    
    ipcMain.on('fetchImages', async (event) => {
        event.sender.send('log', '[fetching] start');
        const images = await db.listImages();
        event.sender.send('log', '[fetching] end');
        event.sender.send('fetchedImages', images);
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

