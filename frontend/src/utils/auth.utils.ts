import { user } from "../app.state";
import { BaseService } from "../services/base.service";

export const authUtil = {
  isLogged: function () {
    if (user() == undefined) return false;
  },

  checkToken: function () {
    if (user()?.token == undefined) return false;
  },
};
