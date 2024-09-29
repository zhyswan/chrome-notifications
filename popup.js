// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// 插件方法
import { createNotification } from "./utils.js";
// 浏览器方法
// import { createNotification } from "./web.js";

document.addEventListener("DOMContentLoaded", () => {
  const basic = document.getElementById("basic");
  //   const progressNotif = document.getElementById("progress");
  //   const list = document.getElementById("list");

  basic.addEventListener("click", () => {
    createNotification({
      id: "basic",
      title: "通知标题，必须的，一行",
      message:
        "必选 最多显示4行，超出会...显示，如果有contextMessage ，则最多3行",
      iconUrl: "images/logo-256.png",
      action: {
        type: "openUrl",
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
