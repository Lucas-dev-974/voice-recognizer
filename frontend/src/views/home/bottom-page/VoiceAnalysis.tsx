import { Show, createSignal } from "solid-js";
import { StartProcessToRecord } from "./StartProcessToRecord";
import { Title } from "./Title";
import { RecordPart } from "./RecordPart";

import "./VoiceAnalysis.css";
import { WaveSurferUtils } from "../../../utils/wavesurfer.uils";

export const [startedVoiceAnalysis, setStartedVoiceAnalysis] =
  createSignal(false);
export const [startedRecording, setStartedRecording] = createSignal(false);

const readingText: string =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

export function VoiceAnalysis() {
  function startVoiceAnalysis() {
    setStartedVoiceAnalysis(true);
  }

  function startRecord() {
    WaveSurferUtils.startRecord();
    setStartedRecording((prev) => !prev);
  }

  function stopRecord() {
    setStartedRecording(false);
  }

  return (
    <div class="voice-analysis">
      <Show
        when={startedVoiceAnalysis()}
        fallback={
          <StartProcessToRecord
            startVoiceAnalysis={startVoiceAnalysis}
            startedVoiceAnalysis={startedVoiceAnalysis()}
          />
        }
      >
        <Title title="Enregistrement pour analyse" />
        <RecordPart
          active={startedRecording()}
          readingText={readingText}
          startRecord={startRecord}
        />
      </Show>
    </div>
  );
}
