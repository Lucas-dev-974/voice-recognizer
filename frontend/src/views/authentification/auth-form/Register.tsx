import { LabeledTextInput } from "../../../components/labeled/TextInput";

export function Register() {
  return (
    <div class="auth-card">
      <h3 class="text-dark-blue text-center text-lg py-5">Enregistrement</h3>

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
      </div>

      <div class="py-2">
        <LabeledTextInput
          defaultValue=""
          id="password-confirm"
          label="Confirmation mot de passe"
          onInput={() => {}}
          placeholder="Confirmer votre mot de passe"
        />
      </div>
    </div>
  );
}
