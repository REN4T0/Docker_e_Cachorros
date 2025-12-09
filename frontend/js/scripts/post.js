export class Dog {
    constructor(dog_data){
        this.breed = dog_data[0];
        this.surname = dog_data[1];
        this.gender = dog_data[2]
    }

    static async post(data){
        const REQ = await fetch(`http://${window.location.hostname}:${window.location.port}/backend/php/create.php`, {
            "method":"POST",
            headers : {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        });

        return await REQ.json();
    }
}