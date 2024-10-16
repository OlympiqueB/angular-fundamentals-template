export interface LoginResponseUser {
  email: string;
  name: string | null;
}

export interface LoginUserModel {
  email: string;
  password: string;
}

export interface LoginSuccessResponse {
  successful: true;
  result: string;
  user: LoginResponseUser;
}

export interface LoginErrorResponse {
  successful: false;
  result?: string;
  errors?: string[];
}

export type LoginResponse = LoginSuccessResponse | LoginErrorResponse;