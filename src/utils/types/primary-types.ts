export type loginType = "login" | "signup";

export type LoginResponse = {
  user?: {
    id: string;
    full_name: string;
    email: string;
  };
  message?: string;
};
