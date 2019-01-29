type StringKeysOf<T> = {
    [P in keyof T]: P extends string ? P : never;
}[keyof T];

export type QueryParams<T> = {
    [P in keyof T]: T[P] extends string | number | undefined ? T[P] : never;
}

export interface Authentication {
    user: string;
    pass: string;
}

export async function get<T>(href: string, {params, auth}: {params?: QueryParams<T>, auth?: Authentication}) {
    return await fetch(buildUrl(href, params), buildFetchOptions("GET", auth));
}

export async function post<T>(href: string, params?: QueryParams<T>, body?: any) {
    const bodyStr = body == null ? null : JSON.stringify(body);

    return fetch(buildUrl(href, params), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: bodyStr
    });
}

function buildUrl<T>(href: string, params?: QueryParams<T>): string {
    const url = new URL(href);
    if (params != null) {
        const keys = Object.keys(params) as Array<StringKeysOf<T>>;
        keys.forEach(key => {
            url.searchParams.set(key, String(params[key]));
        })
    }

    return url.href;
}

function buildFetchOptions<T>(method: "GET" | "POST", auth?: Authentication, body?: any) {
    const headers: HeadersInit = {};
    if (auth) {
        headers["Authorization"] = `Basic ${btoa(`${auth.user}:${auth.pass}`)}`
    }
    return {
        method,
        headers
    }
}
