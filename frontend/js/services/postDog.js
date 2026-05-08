import { mainRoute } from "../routes/route.js";

export async function postDog(dogObj) {
    const REQ = await fetch(mainRoute, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(dogObj)
    });

    const RES = await REQ.json();
    return RES;
}