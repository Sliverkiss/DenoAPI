import { Request, Response } from "file:///src/deps.ts";
import { http } from "file:///src/utils/request.ts";

export async function status(req: Request): Promise<Response> {
    const params = req.url.searchParams;
    const userId = params.get("userId");
    const token = params.get("token");
    let headers = {
        'Sec-Fetch-Dest': `empty`,
        'Connection': `keep-alive`,
        'Accept-Encoding': `gzip, deflate, br`,
        'x-api-client': `true`,
        'Sec-Fetch-Site': `same-origin`,
        'User-Agent': `Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/111.0.5563.101 Mobile/15E148 Safari/604.1`,
        'Sec-Fetch-Mode': `cors`,
        'Cookie': `token=${token}`,
        'Referer': `https://dash.deno.com/account/overview`,
        'Host': `dash.deno.com`,
        'Accept-Language': `zh-CN,zh-Hans;q=0.9`,
        'Accept': `application/json`
    }
    const data = await http.get(`https://dash.deno.com/_api/v1/organizations/${userId}/analytics`, headers);

    let [, ..._values] = data.values;
    _values = sumNumbersInArrayByIndex(_values);
    let _keys = data.fields.filter(e => e.name != 'time').map(e => e.name);
    let result = {};
    for (let i = 0; i++; i < _keys.length - 1) {
        result[_keys[i]] = _values[i];
    }
    return result;
}

function sumNumbersInArrayByIndex(arr) {
    return arr.reduce((acc, curr) => {
        curr.forEach((value, index) => {
            if (typeof value === 'number') {
                acc[index] = (acc[index] || 0) + value;
            }
        });
        return acc;
    }, []);
}