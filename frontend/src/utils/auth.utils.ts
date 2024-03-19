import { createSignal } from "solid-js";
import { User } from "../model/User";
import { addError, changePage, saveInLocal } from "../app.utils";
import { Pages, getUser, setUser } from "../app.state";
import { AuthenticationService } from "../services/authentication.service";

export type UserLoginForm = Pick<User, "email" | "password">;
export type UserRegisterForm = Omit<User, "id" | "token"> & {
  passwordConfirmation: string;
};

export const [userRegisterForm, setUserRegisterForm] =
  createSignal<UserRegisterForm>({
    email: "",
    password: "",
    passwordConfirmation: "",
    last_name: "",
    name: "",
  });

export const [userLoginForm, setUserLoginForm] = createSignal<UserLoginForm>({
  email: "",
  password: "",
});

export class AuthUtils {
  static isUserLogged() {
    return getUser() ? true : false;
  }

  static succesAuthentication(user: User) {
    setUser(user);
    saveInLocal("user", user);
    changePage(Pages.home);
  }

  static async valideRegisterForm() {
    if (
      userRegisterForm()?.email &&
      userRegisterForm()?.name &&
      userRegisterForm()?.last_name &&
      userRegisterForm()?.password &&
      userRegisterForm()?.passwordConfirmation
    ) {
      const samePasswordAsVerificationPassword =
        userRegisterForm()?.password !=
        userRegisterForm()?.passwordConfirmation;

      if (samePasswordAsVerificationPassword) {
        addError({ content: "Les mot de passe ne correspondent pas." });
        return;
      }

      const user = await AuthenticationService.register(
        userRegisterForm() as UserRegisterForm
      );

      if (!user) return;
      console.log("okokok", user);

      AuthUtils.succesAuthentication(user);
    } else
      addError({ content: "Veuillez compléter le formulaire de connexion." });
  }

  static async valideLoginForm() {
    if (userLoginForm()?.email && userLoginForm()?.password) {
      const user = await AuthenticationService.login(
        userLoginForm() as UserLoginForm
      );

      if (!user) return;
      AuthUtils.succesAuthentication(user);
    } else
      addError({ content: "Veuillez compléter le formulaire de connexion." });
  }

  static updateUserRegisterForm(user: Partial<UserRegisterForm>) {
    setUserRegisterForm((user_) => {
      if (!user_) return user_;
      return { ...user_, ...user };
    });
  }

  static updateUserLoginForm(user: Partial<UserRegisterForm>) {
    setUserLoginForm((user_) => {
      if (!user_) return user_;
      return { ...user_, ...user };
    });
  }
}
