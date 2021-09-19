const electron = require("electron");
const { PythonShell } = require("python-shell");

const { ipcRenderer } = electron;

let completeMessage = "Tamamlandı";

let uploadBtn = document.querySelector("#uploadBtn");
let timedUploadBtn = document.querySelector("#timedUploadBtn");
let sendImmediatelyBtn = document.querySelector("#sendImmediatelyBtn");
let sendTimedBtn = document.querySelector("#sendTimedBtn");

let pathWay = document.querySelector("#pathWay");
let timedPathWay = document.querySelector("#timedPathWay");
let instantMessage = document.querySelector("#instantMessage");

let timedMessage = document.querySelector("#timedMessage");
let timeHour = document.querySelector("#timeHour");
let timeMin = document.querySelector("#timeMin");
global.contactValue = "";

uploadBtn.addEventListener("click", () => {
  contactValue = "";
  ipcRenderer.send("open-file-dialog-for-file");
});
timedUploadBtn.addEventListener("click", () => {
  contactValue = "";
  ipcRenderer.send("open-file-dialog-for-file");
});

ipcRenderer.on("selected-file", function (event, path) {
  contactValue = path;
  pathWay.value = contactValue;
  timedPathWay.value = contactValue;
});

sendImmediatelyBtn.addEventListener("click", () => {
  if (contactValue === "") {
    alert("Lütfen Uygun Bir Kişi Listesi Seçiniz!");
    pathWay.value = "Lütfen Uygun Bir Kişi Listesi Seçiniz!";
    timedPathWay.value = "Lütfen Uygun Bir Kişi Listesi Seçiniz!";
    return;
  }
  sendMessageInfo(instantMessage.value, contactValue);
});

sendTimedBtn.addEventListener("click", () => {
  if (contactValue === "") {
    alert("Lütfen Uygun Bir Kişi Listesi Seçiniz!");
    pathWay.value = "Lütfen Uygun Bir Kişi Listesi Seçiniz!";
    timedPathWay.value = "Lütfen Uygun Bir Kişi Listesi Seçiniz!";
    return;
  }
  sendMessageInfoWithTime(timedMessage.value, contactValue, timeHour.value, timeMin.value);
});

function sendMessageInfo(message, path) {
  let messageInfo = {
    choose: 1,
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
    alert(completeMessage);
  });
}

function sendMessageInfoWithTime(message, path, timeHour, timeMin) {
  let messageInfo = {
    choose: 2,
    message: message,
    path: path,
    timeHour: timeHour,
    timeMin: timeMin,
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
    alert(completeMessage);
  });
}
