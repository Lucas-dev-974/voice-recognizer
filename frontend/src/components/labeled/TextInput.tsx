import { TextInput } from "../Input/TextInput";

import "./TextInput.css";

interface LabeledTextInputProps {
  onInput: (value: string) => void;
  label: string;
  defaultValue: string;
  id: string;
  placeholder?: string;
}

export function LabeledTextInput(props: LabeledTextInputProps) {
  return (
    <div class="labeled-text-input">
      <label class="text-input-labed" for={props.id}>
        {props.label}
      </label>
      <TextInput
        id={props.id}
        defaultValue={props.defaultValue}
        onInput={props.onInput}
        placeholder={props.placeholder}
      />
    </div>
  );
}
