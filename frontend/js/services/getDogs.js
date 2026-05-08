import { mainRoute } from "../routes/route.js";

export async function getDogs() {
    const REQ = await fetch(mainRoute, {
        method: "GET",
    });

    const RES = await REQ.json();
    return RES;
}
