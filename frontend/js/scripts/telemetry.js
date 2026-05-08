import { mainRoute } from "../routes/route.js";

export async function getMetrics() {
    const REQ = await fetch(`${mainRoute}/telemetry`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    });

    const RES = await REQ.json();
    return RES;
}