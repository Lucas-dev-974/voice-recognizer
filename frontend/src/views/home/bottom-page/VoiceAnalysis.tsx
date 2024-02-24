import { createSignal } from "solid-js";
import { DefaultButton } from "../../../components/button/Button";
import "./VoiceAnalysis.css";

export function VoiceAnalysis() {
  const [startedVoiceAnalysis, setStartedVoiceAnalysis] = createSignal(false);

  function startVoiceAnalysis() {}

  return (
    <div class="voice-analysis">
      <p class="text-2xl text-center">
        Débutez l'enregistrement de votre voix, pour une analyse.
      </p>

      <div class="w-1/3 mx-auto">
        <DefaultButton onClick={startVoiceAnalysis} text="Commencer" />
      </div>
    </div>
  );
}
