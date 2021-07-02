/**
 * Script for inserting HTML code to garage's index.html file
 *
 * @file
 */
const fs = require('fs');
const path = require('path');

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

const BAR_HEIGHT = 21;

/**
 * Create a missing HTML code to be injected
 *
 * @type {string}
 */
const missingHTML = `
  <script>
  </script>

  <style>
    body {
      margin-top: ${BAR_HEIGHT}px;
    }

    .titlebar {
      -webkit-user-select: none;
      -webkit-app-region: drag;

      background: #1a1d26;
      position: fixed;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: row;
      width: 100%;
      height: ${BAR_HEIGHT}px;

      padding-left: 4px;

      align-items: center;
      align-content: center;
      justify-content: flex-start;

      z-index: 9998;
    }

    .titlebar-title {
      position: absolute;
      width: 100%;
      text-align: center;
      color: rgba(219, 230, 255, 0.6);
    }

    .titlebar-button {
      -webkit-user-select: auto;
      -webkit-app-region: no-drag;

      width: 12px;
      height: 12px;
      border-radius: 50%;

      margin: 0 4px;

      z-index: 9999;
    }

    #quit {
      background: #ff5f5e;
    }
    #minimize {
      background: #ffbc4f;
    }
    #maximize {
      background: #21ce5a;
    }
  </style>

  <div class="titlebar">
    <div class="titlebar-title">Hawk Desktop</div>

    <div id="quit" class="titlebar-button"></div>
    <div id="minimize" class="titlebar-button"></div>
    <div id="maximize" class="titlebar-button"></div>
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
