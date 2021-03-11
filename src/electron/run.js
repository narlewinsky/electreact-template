const electron = require('electron');
const url = require('url');
const path = require('path');

const Application = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const GlobalShortcut = electron.globalShortcut;
const Notification = electron.Notification;

const mainMenu = require('./menu/main-menu');
const accelerators = require('./accelerator/shortcut');

let mainWindow;

const createWindow = () => {
	mainWindow = new BrowserWindow({
		width: 1600,
		height: 1000,
		webPreferences: {
			nodeIntegration: true
		}
	});

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, './index.html'),
		protocol: 'file:',
		slashes: true
	}));

	mainWindow.on('closed', () => {
		mainWindow = null;
	});

	//

	Menu.setApplicationMenu(Menu.buildFromTemplate(mainMenu));

    for (let accelerator in accelerators) {
        GlobalShortcut.register(accelerator, accelerators[accelerator]);
    }

};

Application.on('ready', createWindow);

Application.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		Application.quit()
	}
});

Application.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});
