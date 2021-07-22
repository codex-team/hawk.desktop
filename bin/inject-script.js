/**
 * Script for inserting HTML code to garage's index.html file
 *
 * @file
 */
const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const postcssNestedAncestors = require('postcss-nested-ancestors');
const postcssNested = require('postcss-nested');

/**
 * Path to index.html file from garage
 *
 * @type {string}
 */
const PATH_TO_INDEX_FILE = path.join(__dirname, '..', 'hawk.garage', 'dist', 'index.html');
const PATH_TO_INDEX_FILE_BACKUP = path.join(__dirname, '..', 'hawk.garage', 'dist', 'index.html.backup');

/**
 * If backup file is missing then we need to clone it from the source file
 */
if (!fs.existsSync(PATH_TO_INDEX_FILE_BACKUP)) {
  const fileContent = fs.readFileSync(PATH_TO_INDEX_FILE, 'utf8');

  fs.writeFileSync(PATH_TO_INDEX_FILE_BACKUP, fileContent, 'utf8');
}

/**
 * Read index.html backup file
 *
 * @type {string}
 */
const backupFileContent = fs.readFileSync(PATH_TO_INDEX_FILE_BACKUP, 'utf8');

const VERSION = require('../package.json').version;

/**
 * Get OS name: linux, mac, win
 * @type {string}
 */
const OS = require('../src/utils/get-platform')();

/**
 * Create a missing HTML code to be injected
 *
 * @type postcss
 */
const rawStyles = fs.readFileSync(path.join(__dirname, 'styles', 'index.pcss'));
const STYLES = postcss([
  postcssNestedAncestors,
  postcssNested,
])
  .process(rawStyles)
  .css;

/**
 * Create a missing HTML code to be injected
 *
 * @type {string}
 */
const missingHTML = `
  <style>
    ${STYLES}
  </style>

  <div class="titlebar titlebar--${OS}">
    <div class="titlebar-title"><b>Hawk Desktop</b> ${VERSION}</div>

    <div id="quit" class="titlebar-button titlebar-button__${OS} titlebar-button__${OS}--quit"></div>
    <div id="minimize" class="titlebar-button titlebar-button__${OS} titlebar-button__${OS}--minimize"></div>
    <div id="maximize" class="titlebar-button titlebar-button__${OS} titlebar-button__${OS}--maximize"></div>
  </div>

  <script>
    const { BrowserWindow } = require('electron').remote;
    const win = BrowserWindow.getFocusedWindow();

    const minimize = document.getElementById("minimize");
    const maximize = document.getElementById("maximize");
    const quit = document.getElementById("quit");

    minimize.addEventListener("click", () => {
      win.minimize();
    });

    maximize.addEventListener("click", () => {
      win.setFullScreen(!win.isFullScreen());
    });

    quit.addEventListener("click", () => {
      win.close();
    });
  </script>
`;

/**
 * Inject the code
 *
 * @type {string}
 */
const newFileContent = backupFileContent.replace('<body>', `<body>${missingHTML}`);

/**
 * Save a new index.html file
 */
fs.writeFileSync(PATH_TO_INDEX_FILE, newFileContent, 'utf8');

/**
 * Success message
 */
console.log('Script was injected successfully!');
