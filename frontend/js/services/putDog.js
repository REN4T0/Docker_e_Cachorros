import { mainRoute } from "../routes/route.js";

export async function putDog(dogObj) {
    const REQ = await fetch(`${mainRoute}/${dogObj.id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(dogObj)
    });

    const RES = await REQ.json();
    return RES;
}