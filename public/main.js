const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 680,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

    //mainWindow.webContents.openDevTools();


  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// IPC Main Process Handlers
ipcMain.on("message-to-main", (event, message) => {
  console.log("Message received in main process:", message);
  // Send response back to renderer
  event.reply("message-from-main", `Main process received: ${message}`);
});


// Send periodic updates to renderer
setInterval(() => {
  if (mainWindow) {
    mainWindow.webContents.send(
      "main-update",
      `Update from main: ${new Date().toISOString()}`
    );
  }
}, 5000);
