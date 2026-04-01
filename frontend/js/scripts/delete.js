import { mainRoute } from "../services/route.js";

export async function del(id) {
    const REQ = await fetch(`${mainRoute}/${id}`, { "method": "DELETE", });
    return await REQ.json();
}