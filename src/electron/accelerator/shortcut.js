const electron = require('electron');

const Application = electron.app;

module.exports = {
    'CmdOrCtrl+Q': () => {
        Application.quit();
    },
    'CmdOrCtrl+H': () => {
        Application.hide();
    }
}
