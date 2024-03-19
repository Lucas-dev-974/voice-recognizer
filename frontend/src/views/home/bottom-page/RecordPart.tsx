import { Show, onMount } from "solid-js";
import { StopRecordIcon } from "../../../icons/StopRecord";
import { MicrophoneRecordIcon } from "./MircophoneRecord";
import { startedRecording } from "./VoiceAnalysis";
import { ButtonIcon } from "../../../components/button-icon/ButtonIcon";
import { WaveSurferUtils } from "../../../utils/wavesurfer.uils";

import "./RecordPart.css";
interface RecordPartProps {
  startRecord: () => void;
  active: boolean;
  readingText: string;
}

export function RecordPart(props: RecordPartProps) {
  onMount(() => {
    WaveSurferUtils.setProgress(
      document.querySelector("#progress") as HTMLDivElement
    );
    WaveSurferUtils.createWavSurfer();
    WaveSurferUtils.enableEndRecord();
  });

  return (
    <div class="before-start-record">
      <p class="text-center">
        Veuillez lire le texte suivant à haute voix un fois l'enregistrement
        démarer:
      </p>
      <p class="text-justify">{props.readingText}</p>

      <p id="progress">00:00</p>
      <div id="mic" class="w-[300px]" />

      <div class="flex gap-2">
        <Show
          when={startedRecording()}
          fallback={
            <ButtonIcon
              class="microphone-icon"
              onClick={props.startRecord}
              active={props.active}
              icon={<MicrophoneRecordIcon />}
            />
          }
        >
          <ButtonIcon
            active={props.active}
            icon={<StopRecordIcon />}
            onClick={props.startRecord}
            class="stop-record-button"
          />
        </Show>
      </div>

      <div id="recordings" style="margin: 1rem 0" class="h-[30px]" />
    </div>
  );
}
