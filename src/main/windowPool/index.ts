import { merge } from 'lodash';
const { BrowserWindow, BrowserView, screen } = require('electron');

type WindowItem = {
  id: string;
  name: string;
  // [x: string]: string;
}

class WindowsPoolManager {

  maxInstance = 3

  defaultRoute = ''

  // 窗口容器
  _winPool: WindowItem[] = []

  constructor(options = {}) {
    this.initPool()
  }

  initPool() {
    for (let i = 0; i < this.maxInstance; i++) {
      // this.createPoolWindowItem();
    }
  }

  getWindowConfig(config = {}) {
    const baseConfig = {
      backgroundColor: '#fff',
      resizable: false,
      frame: false,
      show: false,
      modal: false,
      skipTaskbar: true,
      thickFrame: true,
      devTools: true,
      maximizable: false,
      webPreferences: {
        webviewTag: false,
        enableRemoteModule: true,
        nodeIntegration: true,
        webgl: false
      }
    }

    return merge(baseConfig, config);
  }

  createWindowInstance(config: {} | undefined) {
    const winCfg = this.getWindowConfig(config);
    const window = new BrowserWindow(winCfg);

    // 初始化窗口item
    window.on('closed', () => {
      this.removeWindow(window.id);
    });

    return window;
  }

  routerPush(option: any) {
    if (!option.win && !option.name) return
  }

  // 设置窗口数据
  setWindowData(data: any, winId: string) {
    this._winPool = this._winPool.map(winItem => winItem.id === winId ? data : winItem)
  }

  // 移除窗口
  removeWindow(id: number) {
    console.log('id', id)
  }

  // 根据id获取窗体实例
  getWindowInfoById (id: string) {
    return this._winPool.find(winItem => winItem.id === id)
  }

  getWindowInfoByName (name: string) {
    return this._winPool.find(winItem => winItem.name === name)
  }
  
  // 获取全部窗口
  getWindowsPool () {
    return this._winPool
  }
}

export const windowsPoolManager = new WindowsPoolManager()