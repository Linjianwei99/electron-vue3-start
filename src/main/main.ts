const { app, BrowserWindow } = require('electron')

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
  createWindow()
})