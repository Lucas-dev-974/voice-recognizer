import { Show } from "solid-js";
import "./navbar.css";
import { Pages, logged, setCurrentPage } from "../../app.state";
import { DefaultButton } from "../button/Button";

export function Navbar() {
  async function login() {
    setCurrentPage(Pages.authentication);
  }

  return (
    <nav id="navbar">
      <div class="logo">Secure Voice - SV</div>
      <Show when={!logged()}>
        <div class="actions">
          <DefaultButton text="connexion" onClick={login} />
        </div>
      </Show>
    </nav>
  );
}
