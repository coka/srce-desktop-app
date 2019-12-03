/* eslint-disable import/no-extraneous-dependencies */
const { app, BrowserWindow, Menu } = require('electron');
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
        width: "max",
        height: "max"
    });
    window.loadURL('http://localhost:3000');
    window.on('closed', () => {
        window = null;
    });

    window.setMenu(null);
}
function databaseOperations() {
    dbHelper.checkIfDatabaseExists();
}

app.on('ready', databaseOperations);
app.on('ready', createWindow);

