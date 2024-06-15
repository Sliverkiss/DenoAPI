import { Context, Response } from "file:///src/deps.ts";
import { http } from "file:///src/utils/request.ts";

export async function status(ctx: Context): Promise<Response> {
    const params = ctx.request.url.searchParams;
    const userId = params.get("userId");
    const data = await http.get(`https://dash.deno.com/_api/v1/organizations/${userId}/analytics`);
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