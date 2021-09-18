const electron = require("electron");
const url = require("url");
const path = require("path");
const os = require("os");
const { Menu, app, BrowserWindow, ipcMain, dialog } = require("electron");

let mainWindow;
// 800* 650

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      nativeWindowOpen: true,
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "main.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);

  ipcMain.on("key", (err, data) => {
    console.log(data);
  });

  ipcMain.on("key:inputValue", (err, data) => {
    console.log(data);
  });

  ipcMain.on("open-file-dialog-for-file", (e) => {
    const properties =
      os.platform() === "linux" || os.platform() === "win32"
        ? ["openFile"]
        : ["openFile", "openDirectory"];
    dialog.showOpenDialog({ properties }).then((data) => {
      if (data.filePaths.length > 0) {
        e.sender.send("selected-file", data.filePaths[0]);
      }
    });
  });
});

const mainMenuTemplate = [
  {
    label: "Dosya",
    submenu: [
      {
        label: "Tümünü Sil",
      },
      {
        label: "Çıkış",
        role: "quit",
      },
    ],
  },
];

if (process.platform == "darwin") {
  mainMenuTemplate.unshift({
    label: app.getName(),
    role: "TODO",
  });
}

if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push({
    label: "Dev Tools",
    submenu: [
      {
        label: "Open Dev Window",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
      {
        label: "Yenile",
        role: "reload",
      },
    ],
  });
}
