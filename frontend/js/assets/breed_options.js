// Função que cria as options com as raças existentes no select do formulário de cadastro
export function showBreedSelectOptions(arr) {
    const SELECT_ELEMENT = document.querySelector("select.breed");

    for (let index of arr) {
        const OPTION = document.createElement("option");
        OPTION.innerText = index;
        OPTION.value = index;

        SELECT_ELEMENT.appendChild(OPTION);
    }
}