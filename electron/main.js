const { app, BrowserWindow, Menu } = require('electron')
const path = require("path")

const createWindow = () => {
    const mainWin = new BrowserWindow({
        width: 1000,
        height: 800,
    })

    const env = app.isPackaged ? "production" : "development";
    const indexHtml = {
        development: "http://localhost:1111", // 开发环境
        production: path.join(__dirname, "../dist/index.html"), // 生产环境
    };

    // mainWin.webContents.openDevTools();
    mainWin.loadURL(indexHtml[env]);
}

// 准备完成调用创建方法
app.whenReady().then(() => {
    createWindow()
})
Menu.setApplicationMenu(null);  //去掉菜单栏
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})