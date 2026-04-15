import { showBreedSelectOptions } from "../assets/breed_options.js";

// Requisição para obter raças de cachorro existentes
export async function getDogBreeds() {
    const REQ = await fetch("https://dog.ceo/api/breeds/list/all", {
        method: "GET",
    });

    const RES = await REQ.json();
    return RES;
}

// Listando o as raças de cachorro do objeto retornado da requsisção
export function listAllDogBreeds(obj) {
    const dogBreedsList = []

    for (let key in obj.message) {
        dogBreedsList.push(key);

        if (obj.message[key].length > 0) {
            for (let i = 0; i < obj.message[key].length; i++) {
                dogBreedsList.push(`${key} ${obj.message[key][i]}`);
            }
        }
    }

    // Chamando a função que vai manipular o DOM e criar as options necessárias dentro do select das raças
    showBreedSelectOptions(dogBreedsList);
}
