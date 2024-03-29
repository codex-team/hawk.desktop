const { app, shell, BrowserWindow, Menu } = require('electron');
const electronDefaultMenu = require('electron-default-menu');

const Logger = require('./utils/logger');
const log = Logger.getLogger();

let mainWindow;

/**
 * Create the browser window.
 */
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    minWidth: 1200,
    height: 800,
    minHeight: 800,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  const registerProtocols = require('./protocols');

  registerProtocols();

  mainWindow.loadFile('/');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  const menu = electronDefaultMenu(app, shell);

  // Set application menu
  Menu.setApplicationMenu(Menu.buildFromTemplate(menu));

  // mainWindow.webContents.openDevTools();
}

/**
 * On ready initial function
 */
app.on('ready', () => {
  try {
    log.info('App is ready');

    createWindow();

    /**
     * Do not try to check for updates in dev mode
     */
    if (!require('electron-is-dev')) {
      require('./utils/autoupdater');
    }
  } catch (error) {
    log.error(error);

    app.quit();
  }
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
