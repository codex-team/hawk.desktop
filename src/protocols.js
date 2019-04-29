const { protocol } = require('electron');
const path = require('path');

// Used for redirecting request to index.html and handle static assets
protocol.interceptFileProtocol('file', function (req, callback) {
  let url = req.url.substr(7); // cut file://

  if (!/^\/static/.test(url)) url = '/index.html';

  // eslint-disable-next-line standard/no-callback-literal
  callback({ path: path.normalize(path.join(__dirname, '../hawk.garage/dist', url)) });
}, (error) => {
  if (error) {
    console.error('Failed to register protocol');
  }
});
