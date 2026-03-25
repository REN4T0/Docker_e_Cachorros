import { mainRoute } from "../services/route.js";

export async function get() {
    const REQ = await fetch(mainRoute, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        },
    });

    const RES = await REQ.json();
    return RES;
}