import { Setter, createSignal, onMount } from "solid-js";
import { LabeledTextInput } from "../../../components/labeled/TextInput";
import { User } from "../../../model/User";
import { addError } from "../../../app.utils";
import { setUser } from "../../../app.state";

type UserRegisterForm = Omit<User, "id" | "token"> & {
  passwordConfirmation: string;
};

export function Register(props: { setValidateCallback: Setter<any> }) {
  const [userRegisterForm, setUserRegisterForm] =
    createSignal<UserRegisterForm>();

  function updateUserRegisterForm(user: Partial<UserRegisterForm>) {
    setUserRegisterForm((user_) => {
      if (!user_) return user_;
      return { ...user_, ...user };
    });
  }

  function validateForm(): void {
    console.log("okok");

    if (!userRegisterForm()?.email) addError({ content: "email manquant, " });
    if (!userRegisterForm()?.password)
      addError({ content: "mot de passe manquant, " });
    if (!userRegisterForm()?.name) addError({ content: "nom manquant, " });
    if (!userRegisterForm()?.lastName)
      addError({ content: "prénom manquant, " });
    if (!userRegisterForm()?.passwordConfirmation)
      addError({ content: "confirmation du mot de passe manquant, " });

    if (
      userRegisterForm()?.passwordConfirmation != userRegisterForm()?.password
    )
      addError({ content: "Les mot de passe ne correspondent pas." });

    setUser(userRegisterForm() as unknown as User);
  }

  props.setValidateCallback(validateForm);
  return (
    <div class="auth-card">
      <h3 class="text-dark-blue text-center text-lg py-5">Enregistrement</h3>

      <div class="py-2">
        <LabeledTextInput
          defaultValue=""
          id="email"
          label="Email"
          onInput={(value) => updateUserRegisterForm({ email: value })}
          placeholder="Entrer votre email"
        />
      </div>

      <div class="py-2">
        <LabeledTextInput
          defaultValue=""
          id="name"
          label="Nom"
          onInput={(value) => updateUserRegisterForm({ name: value })}
          placeholder="Entrer votre nom"
        />
      </div>

      <div class="py-2">
        <LabeledTextInput
          defaultValue=""
          id="last-name"
          label="Prénom"
          onInput={(value) => updateUserRegisterForm({ lastName: value })}
          placeholder="Entrer votre prénom"
        />
      </div>

      <div class="py-2">
        <LabeledTextInput
          defaultValue=""
          id="password"
          label="Mot de passe"
          onInput={(value) => updateUserRegisterForm({ password: value })}
          placeholder="Entrer votre mot de passe"
        />
      </div>

      <div class="py-2">
        <LabeledTextInput
          defaultValue=""
          id="password-confirm"
          label="Confirmation mot de passe"
          onInput={(value) =>
            updateUserRegisterForm({ passwordConfirmation: value })
          }
          placeholder="Confirmer votre mot de passe"
        />
      </div>
    </div>
  );
}
