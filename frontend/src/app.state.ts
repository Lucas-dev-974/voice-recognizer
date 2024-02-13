import { createSignal } from "solid-js";
import { User } from "./model/User";

export enum Pages {
  home,
  authentication,
}

export const [currentPage, setCurrentPage] = createSignal<Pages>(Pages.home);
export const [user, setUser] = createSignal<User>();
export const [logged, setLogged] = createSignal<boolean>(false);
