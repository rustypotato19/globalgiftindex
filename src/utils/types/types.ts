export type User = {
    uid: string;
    username: string;
    email: string;
};

export type AuthResponse = {
    accessToken: string;
    user: User;
};

export type AuthStatus =
    | "loading"
    | "authenticated"
    | "unauthenticated";

export type AuthContextValue = {
    status: AuthStatus;
    user: User | null;
    login: (
        email: string,
        password: string
    ) => Promise<void>;
    register: (
        username: string,
        email: string,
        password: string
    ) => Promise<void>;
    logout: () => Promise<void>;
};