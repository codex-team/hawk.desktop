const { autoUpdater } = require('electron-updater');

const Logger = require('./logger');
const log = Logger.getLogger();

/**
 * Autoupdater events
 */
autoUpdater.on('checking-for-update', () => {
  log.log('Checking for update');
});

autoUpdater.on('error', (error) => {
  log.error('Error while checking for updates', error);
});

autoUpdater.on('update-available', (updateInfo) => {
  log.log('Update is available:', updateInfo);
});

autoUpdater.on('update-not-available', (updateInfo) => {
  log.log('No updates are available', updateInfo);
});

autoUpdater.on('download-progress', (progressInfo) => {
  let logMessage = `speed ${progressInfo.bytesPerSecond} b/s; progress ${progressInfo.percent}%; downloaded ${progressInfo.transferred} out of ${progressInfo.total} bytes`;

  log.log(logMessage);
});

autoUpdater.on('update-downloaded', (updateInfo) => {
  log.log('Update is ready', updateInfo);

  /* Or force quit app and install update */
  // autoUpdater.quitAndInstall();
});

/**
 * Check for updates on script start
 *
 * Silently: autoUpdater.checkForUpdates();
 * With notification: autoUpdater.checkForUpdatesAndNotify();
 */
autoUpdater.checkForUpdatesAndNotify();

/* Check updates every minute */
setInterval(() => {
  autoUpdater.checkForUpdates();
}, 60 * 60 * 1000);
