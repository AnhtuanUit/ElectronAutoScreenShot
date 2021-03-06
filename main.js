
const {app, BrowserWindow} = require('electron')

let win;

function createWindow () {
	win = new BrowserWindow({width: 800, height: 600})
	win.on('closed', () => {
		win = null
	})


// Or load a local HTML file
win.loadURL(`file://${__dirname}/index.html`)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
  	app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})
