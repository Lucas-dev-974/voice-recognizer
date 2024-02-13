import { JSXElement, Match, Switch, createSignal } from "solid-js";
import "./authentication.css";
import { DefaultButton } from "../../components/button/Button";

function Login(): JSXElement {
  return (
    <div class="rounded relative bg-slate-100 lg:w-1/2 w-96 top-[-100px] xl:px-20 lg:px-15 md:px-15 px-10">
      <h3 class="text-dark-blue text-center text-lg py-5">Connexion</h3>

      <div class="pb-5">
        <div class="input-label grid py-3">
          <label class="text-dark-blue">Email</label>
          <input
            class="text-dark-blue rounded px-4 py-1"
            type="text"
            placeholder="Email"
          />
        </div>
        <div class="input-label grid py-3">
          <label class="text-dark-blue">Mot de passe</label>
          <input
            class="text-dark-blue rounded px-4 py-1"
            type="text"
            placeholder="Mot de passe"
          />
        </div>

        <div class="flex justify-between py-3">
          <DefaultButton text="S'enregistrer" onClick={() => {}} />
          <DefaultButton text="Se connecter" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}
function Register() {
  return <div class="">register</div>;
}

const [onAuth, setOnAuth] = createSignal<"login" | "register">("login");

export function Authentication() {
  return (
    <div class="authentification">
      <Switch>
        <Match when={onAuth() == "login"}>
          <Login />
        </Match>
        <Match when={onAuth() == "register"}>
          <Register />
        </Match>
      </Switch>
    </div>
  );
}
