import { User } from "../model/User";
import { BaseService } from "./base.service";

export class AuthenticationService {
  static async token(token: Pick<User, "token">) {
    return await BaseService.get("/authentification/token");
  }

  static async login(user: Pick<User, "email" | "password">) {
    return await BaseService.post("/authentification", user);
  }

  static async register(user: User) {
    return await BaseService.post("/authentification", user);
  }
}
