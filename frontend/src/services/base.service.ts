import { getUser } from "../app.state";
import { addError } from "../app.utils";
import { userLoginForm } from "../utils/auth.utils";

enum HTTPMethod {
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
    return form;
  }

  static async generic(url: string, method: HTTPMethod, data?: any) {
    let body;

    if (method != HTTPMethod.GET) body = { body: BaseService.buildForm(data) };
    try {
      const response = await fetch(this.host + url, {
        method: method,
        ...body,
        headers: {
          ...this.getAuthorizationHeader(getUser()?.token),
          // ...this.getContentTypeHeader(data),
        },
      });

      const json = await response.json();

      if (response.status != 200) {
        addError({ content: json });
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
    return { Authorization: "bearer " + token };
  }
}
