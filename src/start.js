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
        minHeight: 600,
        minWidth: 800,
        webPreferences: {
            nodeIntegration: true,
        },
        titleBarStyle: 'hiddenInset',
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
        const files = imagePaths.filePaths.map(filePath => Fs.readFileSync(filePath, { encoding: 'base64' }));
        event.sender.send('openImageFileDialogResult', files);
    });
    
    ipcMain.on('storeImages', async (event, images) => {
        await db.storeImages(images);
        event.sender.send('storeImageResult');
    });
    
    ipcMain.on('fetchImages', async (event) => {
        const images = await db.listImages();
        event.sender.send('fetchImagesResult', images);
    });

    ipcMain.on('deleteImage', async (event, id) => {
        await db.removeImage(id);
        event.sender.send('deleteImageResult');
    });

    ipcMain.on('updateTags', async (event, id, tags) => {
        await db.updateTags(id, tags);
        event.sender.send('updateTagsResult');
    });

    ipcMain.on('fetchImagesByTags', async (event, tags) => {
        const images = await db.searchImagesByTags(tags);
        event.sender.send('fetchImagesByTagsResult', images);
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

