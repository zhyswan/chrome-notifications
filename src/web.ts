import { NotificationOption } from "./chrome";
// 检查浏览器是否支持通知
function checkNotificationSupport() {
  return "Notification" in window;
}

// 请求通知权限
function requestNotificationPermission() {
  return Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      return true;
    } else {
      return false;
    }
  });
}

// 创建通知
export function createNotification({
  id,
  title,
  message,
  iconUrl,
  action = {},
}: NotificationOption) {
  if (!checkNotificationSupport()) {
    console.error("此浏览器不支持通知。");
    return;
  }

  requestNotificationPermission().then((permissionGranted) => {
    if (permissionGranted) {
      const options = {
        body: message,
        icon: iconUrl,
        tag: id,
        // data: { id: id },
        // badge: "images/logo-32.png", // mac无效
        // image: "images/logo-128.png", // max无效
        // requireInteraction: true,
      };
      const notification = new Notification(title, options);

      // 监听通知关闭事件
      notification.onclose = () => {
        console.log("通知已关闭");
      };

      // 监听通知点击事件
      notification.onclick = (event) => {
        console.log("通知被点击", event);
        // 例如，打开一个 URL
        if (action.type === "OpenUrl" && action.url) {
          window.open(action.url, "_blank");
        }
      };

      // 设置一个超时，防止通知未显示或被收起的情况
      setTimeout(() => {
        if (notification) {
          notification.close();
          console.log("通知超时或被收起");
        }
      }, 5000); // 默认5秒超时
    } else {
      console.error("通知权限被拒绝。");
    }
  });
}
