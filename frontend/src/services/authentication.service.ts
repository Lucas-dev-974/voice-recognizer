import { getUser } from "../app.state";
import { User } from "../model/User";
import { UserLoginForm, UserRegisterForm } from "../utils/auth.utils";
import { BaseService } from "./base.service";

export class AuthenticationService {
  static async token() {
    return await BaseService.get("/authentification/token");
  }

  static async login(user: UserLoginForm) {
    return await BaseService.post("/authentification", user);
  }

  static async register(user: UserRegisterForm) {
    return await BaseService.post("/authentification/register", user);
  }
}
