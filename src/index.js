const { app, BrowserWindow, screen } = require('electron');
const fs = require('fs');
const os = require('os');
const db = require('electron-db');
let $ = jQuery = require('jquery');
const path = require('path');
const AzureStorageBlob = require("@azure/storage-blob");
const { BlobServiceClient } = require("@azure/storage-blob");
const { AbortController } = require('@azure/abort-controller');
const { Console } = require('console');


async function creContai() {
  //connect to Azure blob storage
  const AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=quangthao;AccountKey=cKfCfJpFIxgFJSNKSSjRrTicWlTlUS+JoVZ5HB1KbpHaIwfbPDoyzHzdyEPH4moF595la7iyg9UEoMLaDQfMuA==;EndpointSuffix=core.windows.net";
  const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
  // Create a container
  const containerName = 'quickstart123';
  console.log('\nCreating container...');
  console.log('\t', containerName);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const createContainerResponse = await containerClient.create();
  console.log("Container was created successfully. requestId: ", createContainerResponse.requestId);
}

//creContai();
//upload file to azure-blob
var totalProcess = 0;
var countProcess = 0;
var percentProcess = 0;
async function uploadToBlob(fileU) {
  //connect to Azure blob storage
  const AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=quangthao;AccountKey=cKfCfJpFIxgFJSNKSSjRrTicWlTlUS+JoVZ5HB1KbpHaIwfbPDoyzHzdyEPH4moF595la7iyg9UEoMLaDQfMuA==;EndpointSuffix=core.windows.net";
  const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
  const containerName = 'quickstart123';
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const aborter = AbortController.timeout(30 * 1000 * 60);
  // Create a unique name for the blob
  await uploadLocalFile(aborter, containerClient, fileU);
}
async function uploadLocalFile(aborter, containerClient, filePath) {
  filePath = path.resolve(filePath);
  const fileName = path.basename(filePath);
  //console.log(filePath + "  " + fileName);
  const blobClient = containerClient.getBlobClient(filePath);
  //const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const blockBlobClient = blobClient.getBlockBlobClient();
  await blockBlobClient.uploadFile(filePath, aborter);
  statusProcess();
}

function statusProcess(){
  countProcess = countProcess + 1;
  percentProcess = parseFloat((countProcess / totalProcess)) * 100;
  console.log(percentProcess.toFixed(2) + "%");
  percentProcess = 0;
}

function showdir() {
  const list = require('list-contents');
  const dirRoot = "D:/Background 4K";
  list(dirRoot, (o) => {
    if (o.error) throw o.error;
    const arrFile = o.files;
    totalProcess = arrFile.length;
    for (i = 0; i < arrFile.length; i++) {
      for (j = 0; j < arrFile[i].length; j++) {
        if (arrFile[i][j] == String.fromCharCode(92)) {
          arrFile[i] = arrFile[i].replace(String.fromCharCode(92), "/");
        }
      }
      //console.log(dirRoot + arrFile[i]);
      uploadToBlob(dirRoot + "/" + arrFile[i]);
    }
  });
  totalProcess = 0;
  countProcess = 0;
  percentProcess = 0;
}
//showdir();

//check connect
function checkConnect() {
  const AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=quangthao;AccountKey=cKfCfJpFIxgFJSNKSSjRrTicWlTlUS+JoVZ5HB1KbpHaIwfbPDoyzHzdyEPH4moF595la7iyg9UEoMLaDQfMuA==;EndpointSuffix=core.windows.net";
  const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
  console.log(blobServiceClient.accountName)
  console.log(blobServiceClient.credential.accountKey)
  const containerName = 'quickstart123';
  const containerClient = blobServiceClient.getContainerClient(containerName);
  console.log(containerClient)
}
//checkConnect();
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  //const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  // Create the browser window.
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const mainWindow = new BrowserWindow({
    width: width * 2 / 3, height: height * 4 / 5,
    maxWidth: width * 2 / 3,
    maxHeight: height * 4 / 5,
    minHeight: height * 4 / 5,
    minWidth: width * 2 / 3,
    fullscreenable: false,
    fullscreen: false,
    maximizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  });
  //disable menu bar
  //mainWindow.setMenu(null);
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
