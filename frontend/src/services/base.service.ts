import { getUser } from "../app.state";
import { addError } from "../app.utils";
import { userLoginForm } from "../utils/auth.utils";

export enum HTTPMethod {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

enum HTTPDataType {
  json = "application/json",
  form = "multipart/form-data",
}

export class BaseService {
  static host: string = "http://127.0.0.1:8000/api";

  static buildForm(data: any) {
    const form = new FormData();
    const keys = Object.keys(data);

    keys.forEach((key) => form.append(key, data[key]));

    console.log("bodyt build ok");

    return form;
  }

  static async generic(url: string, method: HTTPMethod, data?: any) {
    let body;
    if (method != HTTPMethod.GET) body = { body: JSON.stringify(data) };

    let method_ = "";
    if (method == HTTPMethod.POST) method_ = "POST";
    if (method == HTTPMethod.GET) method_ = "GET";

    const isFormData = data instanceof FormData;
    if (isFormData) body = { body: data };

    try {
      const response = await fetch(this.host + url, {
        method: method_,
        ...body,
        headers: {
          ...(!isFormData ? { "content-type": "application/json" } : {}),
          ...this.getAuthorizationHeader(getUser()?.token),
        },
      });

      const json = await response.json();

      if (response.status != 200) {
        addError({ content: json.detail });
        return false;
      }

      return await json;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  static async post(url: string, data: object) {
    return await this.generic(url, HTTPMethod.POST, data);
  }

  static async get(url: string) {
    return await this.generic(url, HTTPMethod.GET);
  }

  static async update(url: string, data: object) {
    return await this.generic(url, HTTPMethod.PATCH, data);
  }

  static async delete(url: string) {
    return await this.generic(url, HTTPMethod.DELETE);
  }

  static getContentTypeHeader(data: object) {
    if (data instanceof FormData)
      return { "Content-Type": "multipart/form-data" };
    else return { "Content-Type": "application/json" };
  }

  static getAuthorizationHeader(token: string | undefined) {
    return { Authorization: "Bearer " + token };
  }
}
