export default {
  manifest_version: 3,
  name: "G notifications",
  description: "浏览器通知",
  version: "0.0.1",
  permissions: ["alarms", "notifications"],
  // 通知中，如果icon为网络图片，需要添加host_permissions
  host_permissions: ["<all_urls>"],
  action: {
    default_title: "浏览器通知demo",
  },
  options_ui: {
    open_in_tab: true,
    page: "popup.html",
  },
  background: {
    service_worker: "src/service-worker.ts",
    type: "module",
  },
  icons: {
    "32": "images/logo-32.png",
    "128": "images/logo-128.png",
  },
};
