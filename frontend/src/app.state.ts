import { createSignal } from "solid-js";
import { User } from "./model/User";

export enum Pages {
  home,
  authentication,
}

export const [currentPage, setCurrentPage] = createSignal<Pages>(Pages.home);
export const [getUser, setUser] = createSignal<User>();
