import { notify } from "./chrome";
// import { notify } from "./web";

chrome.action.onClicked.addListener(function () {
  // chrome.tabs.create({ url: "popup.html" });
  chrome.runtime.openOptionsPage()
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
  notify({
    title: "通知标题，必须的，一行",
    message:
      "必选 最多显示4行，超出会...显示，如果有contextMessage ，则最多3行",
    iconUrl: "https://t11.baidu.com/it/u=3646446013,223838069&fm=30&app=106&f=JPEG?w=512&h=512&s=F28D25E06C4394CE863F4910030010DB",
    action: {
      type: "OpenUrl",
      url: "https://www.baidu.com",
    },
  });
}
