const defaultIcon = "images/logo-256.png";
let isNotificationListenerBound = false;
const idActionMap: Record<string, any> = {};
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
export function createNotification({
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
      console.log("onClicked", nid);
      const action = idActionMap[nid] || {};
      switch (action.type) {
        case "OpenUrl":
          chrome.tabs.create({ url: action.url });
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
    iconUrl: iconUrl || defaultIcon,
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
      console.log("通知:", nid);
      idActionMap[nid] = action;
      return nid;
    })
    .catch((error) => console.log(error));
}
