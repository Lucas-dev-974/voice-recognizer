import "./Login.css";

import { LabeledTextInput } from "../../../components/labeled/TextInput";
import { AuthUtils } from "../auth.utils";

export function Login() {
  return (
    <div class="auth-card">
      <h3 class="text-dark-blue text-center text-lg py-5">Connexion</h3>

      <div class="py-2">
        <LabeledTextInput
          id="email"
          label="Email"
          onInput={(value) => AuthUtils.updateUserLoginForm({ email: value })}
          placeholder="Entrer votre email"
        />
      </div>

      <div class="py-2">
        <LabeledTextInput
          id="password"
          label="Mot de passe"
          onInput={(value) =>
            AuthUtils.updateUserLoginForm({ password: value })
          }
          placeholder="Entrer votre mot de passe"
        />
        <a href="#" class="lost-password">
          Mot de passe oublié ?
        </a>
      </div>
    </div>
  );
}
