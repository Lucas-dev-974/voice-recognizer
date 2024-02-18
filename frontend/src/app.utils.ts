import { createSignal } from "solid-js";

export type ErrorType = {
  content: string;
};

export const [getErrors, setErrors] = createSignal<ErrorType[]>([]);
export function addError(error: ErrorType): void {
  setErrors((error_) => [...error_, error]);
}
