import defaultIcon from "../public/images/logo-256.png";
let isNotificationListenerBound = false;
export type NotificationOption = {
  id?: string;
  title: string;
  message: string;
  iconUrl?: string;
  action?: {
    type?: "OpenUrl";
    url?: string;
  };
};
const idActionMap: Record<string, NotificationOption["action"]> = {};

export function notify({
  id,
  title,
  message,
  iconUrl,
  action = {},
}: NotificationOption) {
  if (!isNotificationListenerBound) {
    isNotificationListenerBound = true;
    // 通知被点击
    chrome.notifications.onClicked.addListener((nid) => {
      // console.log("onClicked", nid);
      const action = idActionMap[nid] || {};
      switch (action.type) {
        case "OpenUrl":
          action.url && chrome.tabs.create({ url: action.url });
          // chrome.notifications.clear(nid);
          break;
        default:
          break;
      }
    });

    // // 自动关闭不会触发
    // chrome.notifications.onClosed.addListener((nid, byUser) => {
    //   console.log("onClosed", nid, byUser);
    //   chrome.notifications.onClosed.removeListener();
    // });

    //   chrome.notifications.onButtonClicked.addListener(
    //     (notificationId, buttonIndex) => {
    //       console.log(
    //         "通知中设置的buttons按钮被点击了",
    //         notificationId,
    //         buttonIndex
    //       );
    //       chrome.tabs.create({ url: "https://www.google.com" });
    //     }
    //   );

    // 没效果
    //   chrome.notifications.onShowSettings.addListener(() => {
    //     console.log("用户点击了通知的设置按钮");
    //     // 在这里执行你需要的操作，例如打开设置页面
    //     // chrome.runtime.openOptionsPage();
    //     chrome.tabs.create({ url: "https://www.163.com" });
    //   });
  }

  let options: chrome.notifications.NotificationOptions = {
    type: "basic", //image progress 在mac上不显示 list在mac上只显示一条
    title: title,
    // contextMessage: "显示在title 和 message中间，一行粗体消息，超出会...显示",
    message: message,
    iconUrl: iconUrl || defaultIcon,  // 方图 最大显示 160 * 160 提供 320 * 320 以适应高分屏, 在background中可以使用网络图片，(其他情况下只能使用插件内图片,尚不确定)
    //   priority: 2,
    // requireInteraction: false, //默认 false 使用 Google Chrome通知； 为true 使用 Google Chrome Helper(Alert) 通知 ，与系统设置有关，需不需要手动关闭与系统设置有关
    // 最多2个按钮
    // buttons: [
    //   {
    //     title: "Button Title 1",
    //   },
    //   {
    //     title: "Button Title 2",
    //   },
    // ],
  };

  const createNotificationsPromise = id
    ? chrome.notifications.create(id, options)
    : chrome.notifications.create(options);

  return createNotificationsPromise
    .then((nid) => {
      // console.log("通知:", nid);
      idActionMap[nid] = action;
      return nid;
    })
    .catch((error) => console.log(error));
}
