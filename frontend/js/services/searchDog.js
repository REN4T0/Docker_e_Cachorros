import { mainRoute } from "../routes/route.js";

export async function searchDog(srch) {
    const REQ = await fetch(`${mainRoute}/apelido/${srch.search_item}`, { method: "GET" });
    const RES = await REQ.json();
    return RES;
}