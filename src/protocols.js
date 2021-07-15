const { protocol } = require('electron');
const path = require('path');

module.exports = () => {
  // Used for redirecting request to index.html and handle static assets
  protocol.interceptFileProtocol('file', (req, callback) => {
    console.log(req.url);
    let url = req.url.substr(8); // cut file://

    /** Remove path to magic root dir from url */
    url = url.replace(path.parse(url).root, '');

    /** If no 'static' at the start of path then return index.html */
    if (!/^static/.test(url)) {
      url = '/index.html';
    }

    // eslint-disable-next-line
    callback({ path: path.normalize(path.join(__dirname, '..', 'hawk.garage', 'dist', url)) });
  }, (error) => {
    if (error) {
      console.error('Failed to register protocol');
    }
  });
};
