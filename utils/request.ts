// http.ts
export const http = {
    async get(url: string, headers: Record<string, string> = {}): Promise<any> {
        const response = await fetch(url, { headers });
        return await response.json();
    },

    async post(url: string, data: any, headers: Record<string, string> = {}): Promise<any> {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    },

    async put(url: string, data: any, headers: Record<string, string> = {}): Promise<any> {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    },

    async del(url: string, headers: Record<string, string> = {}): Promise<any> {
        const response = await fetch(url, { method: "DELETE", headers });
        return await response.json();
    },
};