import { mainRoute } from "../services/route.js";

export async function getMetrics() {
    const REQ = await fetch(`${mainRoute}/telemetria`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    });

    const RES = await REQ.json();
    return RES;
}