import { BaseService } from "./base.service";

export class AudioService {
  static async import(audio: Blob) {
    const form: FormData = new FormData();
    form.append("file", audio);
    return await BaseService.post("/file/", form);
  }
}
