/* eslint-disable import/no-extraneous-dependencies */
const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const dbHelper = require('./src/database/dbHelper');

let window;

function createWindow() {
    // Menu
    const menu = Menu.buildFromTemplate([
        {
            label: 'Main',
            submenu: [
                {
                    label: 'Exit',
                    click() {
                        app.quit();
                    }
                }
            ]
        }
    ]);

    Menu.setApplicationMenu(menu);

    window = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 'max',
        height: 'max'
    });
    window.loadURL('http://localhost:3000');
    window.on('closed', () => {
        window = null;
    });

    ipcMain.on('getVolunteerNames', async function() {
        const result = await dbHelper.getVolunteerNames();
        window.webContents.send('volunteerNamesSent', result);
    });

    ipcMain.on('getVolunteers', async (event, range) => {
        const result = await dbHelper.getVolunteers(range);
        window.webContents.send('volunteersSent', result);
    });

    ipcMain.on('deleteVolunteer', async (event, id) => {
        const result = await dbHelper.deleteVolunteer(id);
        window.webContents.send('volunteerDeleted', result);
    });

    ipcMain.on('insertVolunteer', async (event, volunteer) => {
        const insertedID = await dbHelper.insertVolunteer(volunteer);
        window.webContents.send('volunteerInserted', insertedID);
    });

    window.setMenu(null);
}
function databaseOperations() {
    dbHelper.checkIfDatabaseExists();
}

app.on('ready', databaseOperations);
app.on('ready', createWindow);
