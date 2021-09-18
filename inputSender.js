const electron = require("electron");
const { PythonShell } = require("python-shell");

const { ipcRenderer } = electron;

let sendImmediatelyBtn = document.querySelector("#sendImmediatelyBtn");
let uploadBtn = document.querySelector("#uploadBtn");
let pathWay = document.querySelector("#pathWay");
let inputValue = document.querySelector("#message");
global.contactValue = "";

uploadBtn.addEventListener("click", () => {
  ipcRenderer.send("open-file-dialog-for-file");
});

ipcRenderer.on("selected-file", function (event, path) {
  contactValue = path;
  pathWay.value = contactValue;
});

sendImmediatelyBtn.addEventListener("click", () => {
  //ipcRenderer.send("key", "DENEME");
  if (contactValue === "") {
    pathWay.value = "Lütfen Uygun Bir Kişi Listesi Seçiniz!"
    return;
  }
  sendMessageInfo(inputValue.value, contactValue);
});

function sendMessageInfo(message, path) {
  let messageInfo = {
    message: message,
    path: path,
  };

  let pyshell = new PythonShell("./WhatsAppMessageSender/application.py");
  //console.log(`JavaScript Tarafı Mesajı-> ${messageInfo.message}`);
  pyshell.send(JSON.stringify([messageInfo]));

  pyshell.on("message", function (message) {
    console.log(message);
  });

  pyshell.end(function (err) {
    if (err) {
      throw err;
    }
    console.log("finished");
  });
}
