const { app } = require('electron');
const path = require('path');

const appData = app.getPath('userData');

module.exports = {
  appDataDir: appData,
  logsDir: path.join(appData, 'logs')
};
