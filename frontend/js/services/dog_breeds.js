// Requisição para obter raças de cachorro existentes
export async function getDogBreeds() {
    const REQ = await fetch("http://localhost:8070/dogs/breeds", {
        method: "GET",
    });

    return await REQ.json();
}
