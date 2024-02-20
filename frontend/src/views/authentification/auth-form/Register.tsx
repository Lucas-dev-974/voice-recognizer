import { Setter, createSignal, onMount } from "solid-js";
import { LabeledTextInput } from "../../../components/labeled/TextInput";
import { AuthUtils } from "../auth.utils";

export function Register() {
  return (
    <div class="auth-card">
      <h3 class="text-dark-blue text-center text-lg py-5">Enregistrement</h3>

      <div class="py-2">
        <LabeledTextInput
          defaultValue=""
          id="email"
          label="Email"
          onInput={(value) =>
            AuthUtils.updateUserRegisterForm({ email: value })
          }
          placeholder="Entrer votre email"
        />
      </div>

      <div class="py-2">
        <LabeledTextInput
          defaultValue=""
          id="name"
          label="Nom"
          onInput={(value) => AuthUtils.updateUserRegisterForm({ name: value })}
          placeholder="Entrer votre nom"
        />
      </div>

      <div class="py-2">
        <LabeledTextInput
          defaultValue=""
          id="last-name"
          label="Prénom"
          onInput={(value) =>
            AuthUtils.updateUserRegisterForm({ lastName: value })
          }
          placeholder="Entrer votre prénom"
        />
      </div>

      <div class="py-2">
        <LabeledTextInput
          defaultValue=""
          id="password"
          label="Mot de passe"
          onInput={(value) =>
            AuthUtils.updateUserRegisterForm({ password: value })
          }
          placeholder="Entrer votre mot de passe"
        />
      </div>

      <div class="py-2">
        <LabeledTextInput
          defaultValue=""
          id="password-confirm"
          label="Confirmation mot de passe"
          onInput={(value) =>
            AuthUtils.updateUserRegisterForm({ passwordConfirmation: value })
          }
          placeholder="Confirmer votre mot de passe"
        />
      </div>
    </div>
  );
}
