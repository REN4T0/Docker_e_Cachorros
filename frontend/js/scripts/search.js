import { mainRoute } from "../services/route.js";

export async function search_dogs(srch) {
    const REQ = await fetch(`${mainRoute}/apelido/${srch.search_item}`, { method: "GET" });
    const RES = await REQ.json();
    return RES;
}