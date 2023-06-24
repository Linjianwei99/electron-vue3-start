const { app, BrowserWindow, Tray, Menu } = require('electron')
// import { app, BrowserWindow, Tray, Menu } from 'electron'


const NODE_ENV = process.env.NODE_ENV
const appTray = require('./tray/index.ts');
const winURL = NODE_ENV === 'development'
? `http://localhost:3000`
: `file://${__dirname}/index.html`

const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false, // 取消跨域
      contextIsolation: false, // v12版本需要加多这一行
      // enableRemoteModule: true //v10版本 打开remote模块
    },
    width: 1000,
    height: 600,
  })

  win.loadURL(winURL)

  if (NODE_ENV === "development") {
    win.webContents.openDevTools()
  }
}

app.whenReady().then(() => {
  createWindow()
  appTray.test()

  app.on('activate', function () {
    // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他
    // 打开的窗口，那么程序会重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在
// 任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})