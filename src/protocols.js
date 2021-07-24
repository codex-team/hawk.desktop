const { protocol } = require('electron');
const path = require('path');

module.exports = () => {
  // Used for redirecting request to index.html and handle static assets
  protocol.interceptFileProtocol('file', (req, callback) => {
    /**
     * Removes 'file:///' protocol from url and returns filePath
     */
    let filePath = req.url.substring(8);

    /**
     * Removes root from filePath
     * On Windows it will remove drive name from path
     */
    filePath = filePath.replace(path.parse(filePath).root, '');

    /**
     * If filePath is empty, set path to 'index.html' file
     */
    if (filePath === '') {
      filePath = 'index.html';
    }

    // eslint-disable-next-line
    callback({ path: path.normalize(path.join(__dirname, '..', 'hawk.garage', 'dist', filePath)) });
  }, (error) => {
    if (error) {
      console.error('Failed to register protocol');
    }
  });
};
