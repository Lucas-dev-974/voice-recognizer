import "./button.css";

// TODO make css for button size

interface DefaultButtonProps {
  text: string;
  onClick: () => void;
  size?: "sm" | "md" | "lg";
}

export function DefaultButton(props: DefaultButtonProps) {
  return (
    <button class="default-button" onClick={props.onClick}>
      {props.text}
    </button>
  );
}
