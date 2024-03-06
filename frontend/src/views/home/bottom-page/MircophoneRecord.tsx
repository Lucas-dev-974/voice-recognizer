import { Show } from "solid-js";
import { MicrophoneIcon } from "../../../icons/Microphone";
import { startedRecording } from "./VoiceAnalysis";

export function MicrophoneRecordIcon() {
  return (
    <svg
      class="svg-area"
      viewBox="0 0 60 60"
      xmlns="http://www.w3.org/2000/svg"
    >
      <MicrophoneIcon />
      <Show when={startedRecording()}>
        <g transform="translate(40,43)">
          <circle id="radar" cx="0" cy="0" r="6" />
        </g>
      </Show>
    </svg>
  );
}
