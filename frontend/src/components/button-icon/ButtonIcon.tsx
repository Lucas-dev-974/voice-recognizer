import { JSXElement, Setter, children } from "solid-js";

import "./ButtonIcon.css";

interface ButtonIconProps {
  onClick: () => void;
  size?: "sm" | "md" | "lg";
  setRef?: Setter<HTMLButtonElement>;
  active: boolean;
  class?: string;
  icon: JSXElement;
}

export function ButtonIcon(props: ButtonIconProps) {
  const Icon = (): JSXElement => props.icon;

  return (
    <button
      classList={{
        active: props.active,
      }}
      ref={(props.setRef as Setter<HTMLButtonElement>) ?? null}
      class={props.class}
      onClick={props.onClick}
    >
      <Icon />
    </button>
  );
}
