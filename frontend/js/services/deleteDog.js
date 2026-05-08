import { mainRoute } from "../routes/route.js";

export async function deleteDog(id) {
    const REQ = await fetch(`${mainRoute}/${id}`, { "method": "DELETE", });
    return await REQ.json();
}