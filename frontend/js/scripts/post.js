export class Dog {
    constructor(dog_data) {
        this.breed = dog_data[0];
        this.surname = dog_data[1];
        this.gender = dog_data[2]
    }

    static async put(data) {
        console.log(data.id);
        
        try {
            const REQ = await fetch(`http://localhost:8070/dogs/${data.id}`, {
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
        let route;

        try {
            if (operation == "post") {
                route = `http://localhost:8070/dogs`;
                // delete data.id;
                console.log(data);
            } else {
                return await this.put(data);
                //route = `http://${window.location.hostname}:${window.location.port}/backend/php/update.php`;
                //data.id
            }

            const REQ = await fetch(route, {
                "method": "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
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
}