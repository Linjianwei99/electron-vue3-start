const { app, BrowserWindow, Tray, Menu } = require('electron')
const path = require('path')

// import path from 'path'
class AppTray {

  initTray() {
    const ICON_PATH = path.join(__dirname,'favicon.ico');
    const tray = new Tray(ICON_PATH)
    const contextMenu = Menu.buildFromTemplate([
      { label: 'Item1', type: 'radio' },
      { label: 'Item2', type: 'radio' },
      { label: 'Item3', type: 'radio', checked: true },
      { label: 'Item4', type: 'radio' }
    ])
    tray.setToolTip('Electron App')
    tray.setContextMenu(contextMenu)
  }
}

exports.test = function () {
  const appTray = new AppTray()
  const ICON_PATH = path.join(__dirname, '../../../public/favicon.ico');
  const tray = new Tray(ICON_PATH)
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  tray.setToolTip('Electron App')
  tray.setContextMenu(contextMenu)
  // appTray.initTray()
  console.log('appTray', appTray)
}

// require = require("esm")(module)
// module.exports = require("./js/electronMain.js")