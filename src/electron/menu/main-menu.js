const electron = require('electron');

const Application = electron.app;

module.exports = [{
	label: 'Electreact',
	submenu: [{
		label: 'Hide',
		accelerator: 'CmdOrCtrl+H',
		click() {
			Application.hide();
		}
	}, {
		label: 'Exit',
		accelerator: 'CmdOrCtrl+Q',
		click() {
			Application.quit();
		}
	}]
}];
