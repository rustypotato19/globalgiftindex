const API_URL =
    import.meta.env.VITE_API_URL ??
    "http://localhost:4000";

let accessToken: string | null = null;

let refreshPromise: Promise<string | null> | null =
    null;

export function setAccessToken(
    token: string | null
) {
    accessToken = token;
}

export function getAccessToken() {
    return accessToken;
}

async function refreshAccessToken():
    Promise<string | null> {
    if (refreshPromise) {
        return refreshPromise;
    }

    refreshPromise = (async () => {
        try {
            const response = await fetch(
                `${API_URL}/auth/refresh`,
                {
                    method: "POST",
                    credentials: "include"
                }
            );

            if (!response.ok) {
                return null;
            }

            const data = await response.json();

            setAccessToken(data.accessToken);

            return data.accessToken as string;
        } catch {
            return null;
        } finally {
            refreshPromise = null;
        }
    })();

    return refreshPromise;
}

export async function apiFetch(
    path: string,
    init: RequestInit = {}
): Promise<Response> {
    const headers = new Headers(init.headers);

    if (accessToken) {
        headers.set(
            "Authorization",
            `Bearer ${accessToken}`
        );
    }

    let response = await fetch(
        `${API_URL}${path}`,
        {
            ...init,
            headers,
            credentials: "include"
        }
    );

    if (
        response.status === 401 &&
        path !== "/auth/refresh" &&
        path !== "/auth/login" &&
        path !== "/auth/register"
    ) {
        const nextToken = await refreshAccessToken();

        if (!nextToken) {
            setAccessToken(null);
            return response;
        }

        const retryHeaders = new Headers(init.headers);

        retryHeaders.set(
            "Authorization",
            `Bearer ${nextToken}`
        );

        response = await fetch(
            `${API_URL}${path}`,
            {
                ...init,
                headers: retryHeaders,
                credentials: "include"
            }
        );
    }

    return response;
}