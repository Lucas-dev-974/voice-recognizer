import { createSignal } from "solid-js";
import { Pages, setCurrentPage, setUser } from "./app.state";
import { User } from "./model/User";

export type ErrorType = {
  id?: number;
  content: string;
};

export const [getErrors, setErrors] = createSignal<ErrorType[]>([]);
export function addError(error: ErrorType): void {
  error = {
    ...error,
    id: getErrors().length,
  };

  setErrors((error_) => [...error_, error]);
}

export function saveInLocal(key: string, value: any): void {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocal(key: string) {
  return window.localStorage.getItem(key);
}

export function retrieveLocal() {
  const user = getFromLocal("user");
  if (user) setUser(user != "undefined" ? JSON.parse(user) : undefined);

  const page = getFromLocal("page");
  if (page) setCurrentPage(JSON.parse(page));
}

export function changePage(page: Pages): void {
  setCurrentPage(page);
  saveInLocal("page", page);
}
