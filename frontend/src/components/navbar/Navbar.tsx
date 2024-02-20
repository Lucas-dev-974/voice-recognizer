import { Show } from "solid-js";
import { Pages, logged } from "../../app.state";
import { DefaultButton } from "../button/Button";

import "./navbar.css";
import { changePage } from "../../app.utils";

export function Navbar() {
  async function login() {
    changePage(Pages.authentication);
  }

  return (
    <nav id="navbar">
      <div class="logo" onClick={() => changePage(Pages.home)}>
        Secure Voice - SV
      </div>
      <Show when={!logged()}>
        <div class="actions">
          <DefaultButton text="connexion" onClick={login} />
        </div>
      </Show>
    </nav>
  );
}
