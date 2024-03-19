export type User = {
  id?: string;
  email: string;
  name: string;
  last_name: string;
  token: string;
  password?: string;
  recognizableVoice?: boolean;
};
