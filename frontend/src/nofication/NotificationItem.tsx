import { JSXElement, createSignal } from "solid-js";
import { CloseIcon } from "../icons/CloseIcon";

import "./NotificationItem.css";

interface NotificationItemProps {
  content: string | JSXElement;
}

export function NotificationItem(props: NotificationItemProps) {
  const [ref, setRef] = createSignal<HTMLElement>(
    document.createElement("div")
  );

  function closeNotification() {
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
