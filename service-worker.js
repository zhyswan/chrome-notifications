// import { createNotification } from "./utils.js";
chrome.runtime.onInstalled.addListener(() => {
  console.log("插件已安装");

  // 创建一个简单的通知
  //   createNotification({
  //     iconUrl: "images/logo-128.png",
  //     title: "插件已安装",
  //     message: "这是一个来自Chrome插件的通知。",
  //   });
});

chrome.action.onClicked.addListener(function () {
  chrome.tabs.create({ url: "popup.html" });
});

export {};
