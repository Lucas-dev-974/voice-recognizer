import { JSXElement, Match, Show, Switch } from "solid-js";
import { Pages, setUser } from "../../app.state";
import { Button } from "../button/Button";

import "./navbar.css";
import { changePage, saveInLocal } from "../../app.utils";
import { AuthUtils } from "../../utils/auth.utils";

function LoginButton(props: { login: () => void }): JSXElement {
  return (
    <div class="actions">
      <Button text="connexion" onClick={props.login} />
    </div>
  );
}

function LogoutButton(props: { logout: () => void }): JSXElement {
  return (
    <div class="actions">
      <Button text="déconnexion" onClick={props.logout} />
    </div>
  );
}

export function Navbar() {
  async function login() {
    changePage(Pages.authentication);
  }

  function logout() {
    setUser();
    saveInLocal("user", undefined);
  }

  return (
    <nav id="navbar">
      <div class="logo" onClick={() => changePage(Pages.home)}>
        Secure Voice - SV
      </div>

      <Switch>
        <Match when={!AuthUtils.isUserLogged()}>
          <LoginButton login={login} />
        </Match>
        <Match when={AuthUtils.isUserLogged()}>
          <LogoutButton logout={logout} />
        </Match>
      </Switch>
    </nav>
  );
}
