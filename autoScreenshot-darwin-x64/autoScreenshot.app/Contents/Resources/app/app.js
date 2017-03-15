const electron = require('electron')
const desktopCapturer = electron.desktopCapturer
const electronScreen = electron.screen
const shell = electron.shell
const ul = document.querySelector("ul");
const time = document.getElementById("time")

const fs = require('fs')
const os = require('os')
const path = require('path')

const screenshot = document.getElementById('screenshot')
const screenshotMsg = document.getElementById('screenshot-path')

var dem = 0;

screenshot.addEventListener('click', function (event) {
  AutoScreenShot(time.value * 1000);
})

function determineScreenShotSize () {
  const screenSize = electronScreen.getPrimaryDisplay().workAreaSize
  const maxDimension = Math.max(screenSize.width, screenSize.height)
  return {
    width: maxDimension * window.devicePixelRatio,
    height: maxDimension * window.devicePixelRatio
  }
}



function addPickture(url) {
	var li = document.createElement("li");
  var _img = document.createElement('img');
  _img.id = "item";
  _img.src=url;
  _img.addEventListener('click', function (event) {
      shell.openExternal('file://' + url);
  });
  li.appendChild(_img);
  ul.appendChild(li);
}

function screenShot() {
  screenshotMsg.textContent = 'Gathering screens...'
  const thumbSize = determineScreenShotSize()
  let options = { types: ['screen'], thumbnailSize: thumbSize }

  desktopCapturer.getSources(options, function (error, sources) {
    if (error) return console.log(error)

      sources.forEach(function (source) {
        if (source.name === 'Entire screen' || source.name === 'Screen 1') {
          const screenshotPath = path.join(os.tmpdir(), 'screenshot_'+ dem + '.png')
          dem++;
          fs.writeFile(screenshotPath, source.thumbnail.toPng(), function (error) {
            if (error) return console.log(error)
        addPickture(screenshotPath)
        const message = `Saved screenshot to: ${screenshotPath}`
        screenshotMsg.textContent = message
      })
        }
      })
  })
}

var auto = setTimeout(function(){ autoRefresh(); }, 100);
function AutoScreenShot(time) {
  screenShot();
  setTimeout(function(){ autoRefresh(); }, 100);
  function autoRefresh(){
   clearTimeout(auto);
   auto = setTimeout(function(){ screenShot(); autoRefresh(); }, time);
 }
}














