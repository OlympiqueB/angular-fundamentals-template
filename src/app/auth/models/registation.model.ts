export interface RegistrationUserModel {
  name: string;
  email: string;
  password: string;
}

export interface RegistrationErrorResponse {
  successful: false;
  errors: string[];
}

export interface RegistrationSuccessResponse {
  successful: true;
  result: "User was created.";
}

export type RegistrationResponse = RegistrationErrorResponse | RegistrationSuccessResponse;
