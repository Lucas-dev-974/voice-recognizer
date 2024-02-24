import { Match, Switch } from "solid-js";
import { getUser } from "../../../app.state";
import { VoiceRecongition } from "./VoiceRecognition";
import { VoiceAnalysis } from "./VoiceAnalysis";

export function SerivceUse() {
  return (
    <div class="service-use h-full">
      <Switch>
        <Match when={getUser()?.recognizableVoice}>
          <VoiceRecongition />
        </Match>

        <Match when={!getUser()?.recognizableVoice}>
          <VoiceAnalysis />
        </Match>
      </Switch>
    </div>
  );
}
