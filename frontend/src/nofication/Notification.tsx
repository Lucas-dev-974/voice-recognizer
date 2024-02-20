import { For, JSXElement, createEffect, createSignal, on } from "solid-js";
import { NotificationItem } from "./NotificationItem";

import "./Notification.css";
import { getErrors } from "../app.utils";

type NotificationType = {
  id?: number;
  content: string | JSXElement;
  type: string;
};

const [getNotifications, setNotifications] = createSignal<NotificationType[]>(
  []
);

export function appendNotification(notification: NotificationType) {
  let newId = getNotifications().length;

  getNotifications().forEach((notification) => {
    if (notification.id == newId) newId += 1;
  });

  setNotifications((notification_) => [
    ...notification_,
    { ...notification, id: newId },
  ]);
}

export function removeNotification(notificationId: number) {
  setNotifications((notification_) =>
    [...notification_].filter((notif) => notif.id != notificationId)
  );
}

export function NotificationsService() {
  createEffect(
    on(
      getErrors,
      () => {
        getErrors().forEach((err) => {
          let errorExisting = false;
          getNotifications().forEach((notification) => {
            if (notification.content == err.content) errorExisting = true;
          });

          if (!errorExisting)
            appendNotification({ content: err.content, type: "error" });
        });
      },
      { defer: false }
    )
  );

  return (
    <div class="notification-container">
      <For each={getNotifications()}>
        {(notification) => (
          <NotificationItem
            content={notification.content}
            id={notification.id as number}
          />
        )}
      </For>
    </div>
  );
}
