//for build-electron old script : mkdir build/electron & robocopy electron build/electron /S 
//to create windows installer run:
    // npm run build -> creates build folder
    // npm run build-electron
    // npm run build-src
    // npm run package -> creates dist folder
    // inside dist there should be an exe file -> installer that creates a desktop shortcut


/* eslint-disable import/no-extraneous-dependencies */
const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const dbHelper = require('./src/database/dbHelper');

//windows installer 
if (handleSquirrelEvent(app)) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
}

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
        }
    });
    window.setFullScreen(true)
    window.loadURL('http://localhost:3000');

    //building url
    // const url = require('url')
    // const path = require('path');
    // window.loadURL(url.format({
    //     pathname: path.join(__dirname, 'public/index.html'),
    //     protocol: 'file:',
    //     slashes: true
    //   }));

    window.on('closed', () => {
        window = null;
    });

    ipcMain.on('getVolunteerNames', async function() {
        const result = await dbHelper.getVolunteerNames();
        window.webContents.send('volunteerNamesSent', result);
    });

    ipcMain.on('getVolunteers', async function() {
        const result = await dbHelper.getVolunteers();
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



//windows isntaller
function handleSquirrelEvent(application) {
    if (process.argv.length === 1) {
        return false;
    }

    const ChildProcess = require('child_process');
    const path = require('path');

    const appFolder = path.resolve(process.execPath, '..');
    const rootAtomFolder = path.resolve(appFolder, '..');
    const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
    const exeName = path.basename(process.execPath);

    const spawn = function(command, args) {
        let spawnedProcess, error;

        try {
            spawnedProcess = ChildProcess.spawn(command, args, {
                detached: true
            });
        } catch (error) {}

        return spawnedProcess;
    };

    const spawnUpdate = function(args) {
        return spawn(updateDotExe, args);
    };

    const squirrelEvent = process.argv[1];
    switch (squirrelEvent) {
        case '--squirrel-install':
        case '--squirrel-updated':
            // Optionally do things such as:
            // - Add your .exe to the PATH
            // - Write to the registry for things like file associations and
            //   explorer context menus

            // Install desktop and start menu shortcuts
            spawnUpdate(['--createShortcut', exeName]);

            setTimeout(application.quit, 1000);
            return true;

        case '--squirrel-uninstall':
            // Undo anything you did in the --squirrel-install and
            // --squirrel-updated handlers

            // Remove desktop and start menu shortcuts
            spawnUpdate(['--removeShortcut', exeName]);

            setTimeout(application.quit, 1000);
            return true;

        case '--squirrel-obsolete':
            // This is called on the outgoing version of your app before
            // we update to the new version - it's the opposite of
            // --squirrel-updated

            application.quit();
            return true;
    }
};

