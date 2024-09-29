// 插件方法
import { createNotification } from "./chrome";
// 浏览器方法
// import { createNotification } from "./web";

document.addEventListener("DOMContentLoaded", () => {
  const basic = document.getElementById("basic");
  //   const progressNotif = document.getElementById("progress");
  //   const list = document.getElementById("list");

  basic!.addEventListener("click", () => {
    createNotification({
      // id: "basic",
      title: "通知标题，必须的，一行",
      message:
        "必选 最多显示4行，超出会...显示，如果有contextMessage ，则最多3行",
      // iconUrl: "images/test2.png",
      iconUrl: "https://t11.baidu.com/it/u=3646446013,223838069&fm=30&app=106&f=JPEG?w=512&h=512&s=F28D25E06C4394CE863F4910030010DB",
      action: {
        type: "OpenUrl",
        url: "https://www.baidu.com",
      },
    });
  });

  //   progressNotif.addEventListener("click", () => {
  //     let options = {
  //       type: "progress", // 这个只会使用 Google Chrome Helper(Alert) 通知 不受requireInteraction参数影响
  //       title: "Progress Notification",
  //       message: "This is a Progress Notification",
  //       iconUrl: "images/logo-256.png",
  //       progress: 69,
  //       requireInteraction: false, //无效参数 需不需要手动关闭是系统设置
  //     };
  //     chrome.notifications.create(options);
  //   });

  //   list.addEventListener("click", () => {
  //     let options = {
  //       type: "list",
  //       title: "List Notification",
  //       message: "This is a List Notification",
  //       iconUrl: "images/logo-256.png",
  //       //   requireInteraction: true,
  //       items: [
  //         { title: "list element 1", message: "list message 1" },
  //         { title: "list element 2", message: "list message 2" },
  //       ],
  //     };
  //     chrome.notifications.create(options);
  //   });
});
