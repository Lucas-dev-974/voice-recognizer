import { Show } from "solid-js";
import { Button } from "../../../components/button/Button";
import { getUser } from "../../../app.state";

import "./FooterPressentation.css";

export function FooterPresentation() {
  function onClickDiscoverSolution() {}
  return (
    <div class="footer-presentation">
      <div class="discover-solution">
        <p>Découvrez notre solution</p>
        <Button onClick={onClickDiscoverSolution} text="Découvrir" />
      </div>

      <Show when={!getUser()}>
        <div class="register">
          <p>Vous n'avez pas de compte ?</p>
          <Button onClick={onClickDiscoverSolution} text="Enregistrez vous" />
        </div>
      </Show>
    </div>
  );
}
