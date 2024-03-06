import { Button } from "../../../components/button/Button";
import { Title } from "./Title";

import "./StartProcessToRecord.css";

interface StartProcessToRecordProps {
  startVoiceAnalysis: () => void;
  startedVoiceAnalysis: boolean;
}

export function StartProcessToRecord(props: StartProcessToRecordProps) {
  return (
    <>
      <Title title="Débutez l'enregistrement de votre voix, pour une analyse." />
      <div
        class="start-process-to-record-button"
        hidden={props.startedVoiceAnalysis}
      >
        <Button onClick={props.startVoiceAnalysis} text="Commencer" />
      </div>
    </>
  );
}
