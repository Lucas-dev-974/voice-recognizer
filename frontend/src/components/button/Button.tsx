import { Setter } from "solid-js";

import "./button.css";

// TODO make css for button size

interface ButtonProps {
  text: string;
  onClick: () => void;
  size?: "sm" | "md" | "lg";
  setRef?: Setter<HTMLButtonElement>;
  active?: boolean;
}

export function Button(props: ButtonProps) {
  return (
    <button
      classList={{
        active: props.active,
      }}
      ref={(props.setRef as Setter<HTMLButtonElement>) ?? null}
      class="button"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}
