import { JSXElement, Match, Switch, createSignal } from "solid-js";
import "./authentication.css";
import { DefaultButton } from "../../components/button/Button";
import { Login } from "./auth-form/Login";
import { Register } from "./auth-form/Register";

const [onAuth, setOnAuth] = createSignal<"login" | "register">("login");

export function Authentication() {
  const [callback, setCallback] = createSignal<() => void>();

  return (
    <div class="authentification">
      <div class="rounded relative bg-slate-100 lg:w-1/2 w-96 top-[-100px] xl:px-20 lg:px-15 md:px-15 px-10">
        <Switch>
          <Match when={onAuth() == "login"}>
            <Login />
          </Match>
          <Match when={onAuth() == "register"}>
            <Register setValidateCallback={setCallback} />
          </Match>
        </Switch>

        <div class="flex justify-end gap-2 py-3">
          <Switch>
            <Match when={onAuth() == "login"}>
              <DefaultButton
                text="S'enregistrer"
                onClick={() => setOnAuth("register")}
              />
              <ValidateButton validate={callback} />
            </Match>
            <Match when={onAuth() == "register"}>
              <DefaultButton
                text="Se connecter"
                onClick={() => setOnAuth("login")}
              />
              <ValidateButton validate={callback} />
            </Match>
          </Switch>
        </div>
      </div>
    </div>
  );
}

function ValidateButton(props: { validate: () => void }): JSXElement {
  return <DefaultButton text="Valider" onClick={props.validate} />;
}
