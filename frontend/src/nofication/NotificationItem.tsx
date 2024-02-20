import { JSXElement, createSignal } from "solid-js";
import { CloseIcon } from "../icons/CloseIcon";

import "./NotificationItem.css";
import { removeNotification } from "./Notification";

interface NotificationItemProps {
  content: string | JSXElement;
  id: number;
}

export function NotificationItem(props: NotificationItemProps) {
  const [ref, setRef] = createSignal<HTMLElement>(
    document.createElement("div")
  );

  function closeNotification() {
    removeNotification(props.id);
    ref().remove();
  }
  return (
    <div ref={setRef} class="notification-item">
      <p> {props.content} </p>

      <div class="close-icon" onClick={closeNotification}>
        <CloseIcon />
      </div>
    </div>
  );
}
