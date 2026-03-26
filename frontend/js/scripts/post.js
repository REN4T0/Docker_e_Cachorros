import { mainRoute } from "../services/route.js";

export class Dog {
    constructor(dog_data) {
        this.breed = dog_data[0];
        this.surname = dog_data[1];
        this.gender = dog_data[2]
    }

    static async put(data) {
        try {
            const REQ = await fetch(`${mainRoute}/${data.id}`, {
                "method": "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    breed: data.breed,
                    surname: data.surname,
                    gender: data.gender
                })
            });

            return await REQ.json();
        } catch (err) {
            return {
                code: "500",
                msg: "Não foi possível realizar contato com o servidor",
                error: err
            }
        }
    }

    static async post(data, operation) {
        try {
            if (operation == "post") {
                //console.log(data);

                const REQ = await fetch(mainRoute, {
                    "method": "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                return await REQ.json();
            } else {
                return await this.put(data);
            }

        } catch (err) {
            return {
                code: "500",
                msg: "Não foi possível realizar contato com o servidor",
                error: err
            }
        }
    }
}