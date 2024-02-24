import { Match, Switch, createSignal } from "solid-js";
import "./authentication.css";
import { DefaultButton } from "../../components/button/Button";
import { Login } from "./auth-form/Login";
import { Register } from "./auth-form/Register";
import { AuthUtils } from "../../utils/auth.utils";

const [onAuth, setOnAuth] = createSignal<"login" | "register">("login");

export function Authentication() {
  function toggleAuthCard() {
    if (onAuth() == "register") setOnAuth("login");
    else setOnAuth("register");
  }

  async function validateForm() {
    if (onAuth() == "login") await AuthUtils.valideLoginForm();
    else await AuthUtils.valideRegisterForm();
  }
  return (
    <div class="authentification">
      <div class="rounded relative bg-slate-100 lg:w-1/2 w-96 top-[-100px] xl:px-20 lg:px-15 md:px-15 px-10">
        <Switch>
          <Match when={onAuth() == "login"}>
            <Login />
          </Match>
          <Match when={onAuth() == "register"}>
            <Register />
          </Match>
        </Switch>

        <div class="flex justify-end gap-2 py-3">
          <DefaultButton
            text={onAuth() == "register" ? "Se connecter" : "S'enregistrer"}
            onClick={toggleAuthCard}
          />
          <DefaultButton text="Valider" onClick={validateForm} />
        </div>
      </div>
    </div>
  );
}
