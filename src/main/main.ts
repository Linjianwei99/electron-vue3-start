const { app, BrowserWindow, Tray, Menu } = require('electron')
const path = require('path')

let winURL = process.env.NODE_ENV === 'development'
? `http://localhost:9080`
: `file://${__dirname}/index.html`
winURL = 'http://localhost:5173/'
console.log('winURL', winURL)
const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: 800,
    height: 600,
  })

  win.loadURL(winURL)
}

app.whenReady().then(() => {
  // 设置托盘
  // let iconPath
  // if (process.env.WEBPACK_DEV_SERVER_URL) {
  //   // 测试环境
  //     iconPath = path.join(app.getAppPath(), 'favicon.ico');
  // }else {
  //     //正式环境
  //     iconPath = path.join(path.dirname(app.getPath('exe')), 'favicon.ico');
  //   }
  //   console.log('iconPath', iconPath)
  const iconSrc = path.join(__dirname, '../../public/favicon.ico');
  const tray = new Tray(iconSrc)
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
  createWindow()
})