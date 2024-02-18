import { getUser } from "../app.state";
import { BaseService } from "../services/base.service";

export const authUtil = {
  isLogged: function () {
    if (getUser() == undefined) return false;
  },

  checkToken: function () {
    if (getUser()?.token == undefined) return false;
  },
};
