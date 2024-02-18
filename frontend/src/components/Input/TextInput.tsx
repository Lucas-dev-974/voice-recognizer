import "./TextInput.css";

interface TextInputProps {
  id: string;
  defaultValue: string;
  onInput: (value: string) => void;
  placeholder?: string;
}

export function TextInput(props: TextInputProps) {
  return (
    <input
      class="text-input"
      id={props.id}
      type="text"
      value={props.defaultValue}
      onInput={(element) => props.onInput(element.target.value)}
      placeholder={props.placeholder ?? ""}
    />
  );
}
