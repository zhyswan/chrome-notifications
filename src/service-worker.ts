import { createNotification } from "./chrome";
// import { createNotification } from "./web";

chrome.action.onClicked.addListener(function () {
  chrome.tabs.create({ url: "popup.html" });
});

chrome.runtime.onInstalled.addListener(() => {
  console.log("插件已安装");
  // 创建或重置闹钟
  chrome.alarms.create("notify", { periodInMinutes: 60 }); // 0.08333 分钟约等于 5 秒
});

// 监听闹钟事件 浏览器打开就有闹钟事件
chrome.alarms.onAlarm.addListener((alarm) => {
  console.log("闹钟已触发", alarm);
  if (alarm.name === "notify") {
    createNoti();
  }
});

function createNoti() {
  createNotification({
    title: "通知标题，必须的，一行",
    message:
      "必选 最多显示4行，超出会...显示，如果有contextMessage ，则最多3行",
    iconUrl: "images/logo-256.png",
    action: {
      type: "OpenUrl",
      url: "https://www.baidu.com",
    },
  });
}
