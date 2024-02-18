import { For, JSXElement, createSignal } from "solid-js";
import { NotificationItem } from "./NotificationItem";

import "./Notification.css";

type NotificationType = {
  content: string | JSXElement;
  type: string;
};

const [getNotifications, setNotifications] = createSignal<NotificationType[]>(
  []
);

export function appendNotification(notification: NotificationType) {
  setNotifications((notification_) => [...notification_, notification]);
}

export function NotificationsService() {
  return (
    <div class="notification-container">
      <For each={getNotifications()}>
        {(notification) => <NotificationItem content={notification.content} />}
      </For>
    </div>
  );
}
