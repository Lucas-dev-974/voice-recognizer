import "./Login.css";

import { LabeledTextInput } from "../../../components/labeled/TextInput";

export function Login() {
  return (
    <div class="auth-card">
      <h3 class="text-dark-blue text-center text-lg py-5">Connexion</h3>

      <div class="py-2">
        <LabeledTextInput
          defaultValue=""
          id="email"
          label="Email"
          onInput={() => {}}
          placeholder="Entrer votre email"
        />
      </div>

      <div class="py-2">
        <LabeledTextInput
          defaultValue=""
          id="password"
          label="Mot de passe"
          onInput={() => {}}
          placeholder="Entrer votre mot de passe"
        />
        <a href="#" class="lost-password">
          Mot de passe oublié ?{" "}
        </a>
      </div>
    </div>
  );
}
