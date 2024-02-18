import "./TextInput.css";

interface TextInputProps {
  id: string;
  defaultValue: string;
  onInput: () => void;
  placeholder?: string;
}

export function TextInput(props: TextInputProps) {
  return (
    <input
      class="text-input"
      id={props.id}
      type="text"
      value={props.defaultValue}
      onInput={props.onInput}
      placeholder={props.placeholder ?? ""}
    />
  );
}
