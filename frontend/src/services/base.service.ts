import { getUser } from "../app.state";

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

  static async generic(url: string, method: HTTPMethod, data: object = {}) {
    let response: Response;
    let body: object = {};

    if (data instanceof FormData) body = { body: data };
    else body = { body: JSON.stringify(data) };

    if (method == HTTPMethod.GET) body = {};

    try {
      response = await fetch(this.host + url, {
        method: method,
        ...body,
        headers: {
          ...this.getAuthorizationHeader(getUser()?.token),
          ...this.getContentTypeHeader(data),
        },
      });

      return response;
    } catch (error) {
      console.log("error", error);
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
