// Funções de interação com o banco de dados
import { Dog } from "../classes/Dog.js";
import { deleteDog } from "../services/deleteDog.js";
import { getDogs } from "../services/getDogs.js";
import { searchDog } from "../services/searchDog.js";
import { postDog } from "../services/postDog.js";
import { putDog } from "../services/putDog.js";
// Funções de exibição de dados
import { open_modal, close_modal } from "../assets/modal.js";
import { show_dogs } from "../assets/table.js";
import { clean_table } from "../assets/table.js";
import { showAlert } from "../assets/alert.js";
// Funções de validações
import { checkNullForm } from "../validator/validations.js";
// Função de telemetria
import { getMetrics } from "./telemetry.js";
import { getDogBreeds } from "./dog_breeds.js";
import { clean_form } from "../assets/clear_form.js";
import { showBreedSelectOptions } from "../assets/breed_options.js";

// Assim que a página carregar, os registros do banco de dados serão consultado e exibidos na tela.
window.addEventListener("load", async () => {
    try {
        showBreedSelectOptions(await getDogBreeds());
    } catch (err) {
        console.log(err);
        showAlert(err);
    }

    try {
        clean_table();
        show_dogs(await getDogs());
    } catch (err) {
        console.log(err);
        showAlert(err);
    }

    console.log(await getMetrics());
});

document.addEventListener('click', async e => {
    e.preventDefault();
    e.stopPropagation();

    let el = e.target;

    // Enviando dados para cadastrar
    if (el.classList.contains("send")) {
        const DOG_DATA = new Array();
        const INPUTS = document.querySelectorAll("form .dog_info");

        for (let input of INPUTS) DOG_DATA.push(input.value); // Iterando sobre cada array do formulário de cadastro e inserindo o valor no array DOG_DATA

        try {
            checkNullForm(DOG_DATA);

            // Criando uma instância do cachorro cadastrado e enviando para a função estática que vai mandar os dados para o banco
            const DOG = new Dog(DOG_DATA);
            const RESPONSE = await postDog(DOG);

            if (RESPONSE.code === "200") {
                console.log(RESPONSE);
                showAlert(RESPONSE);

                // Limpando a tabela e gerando novamente.
                clean_table();
                clean_form(INPUTS);
                show_dogs(await getDogs());

            } else {
                console.log(RESPONSE);
                showAlert(RESPONSE);
            }

            console.log(await getMetrics());
        } catch (err) {
            console.log(err);
            showAlert(err);
        }
    }

    // Ativando o modal que confirma se o usuário realmente quer deletar o registro...
    if (el.classList.contains("delete")) open_modal(el.id, "delete");

    // Confirmação da exclusão do registro
    if (el.classList.contains("remove")) {
        try {
            const RESPONSE = await deleteDog(el.id); // O ID do registro é coletado por meio do atributo #id que está no elemento
            console.log(RESPONSE);
            close_modal();
            showAlert(RESPONSE);
            clean_table();
            show_dogs(await getDogs());

        } catch (err) {
            console.log(err);
            showAlert(err);
        }

        console.log(await getMetrics());
    }

    // Condicionais que definem a abertura e o fechamento do modal
    if (el.classList.contains("edit")) open_modal(el.id, "edit");
    if (el.classList.contains("close") || el.classList.contains("close_icon") || el.classList.contains("cancel")) close_modal();

    if (el.classList.contains("update")) {
        const DOG_DATA = new Array();
        const INPUTS = document.querySelectorAll("form .updated_dog_info");

        for (let input of INPUTS) DOG_DATA.push(input.value);

        try {
            checkNullForm(DOG_DATA);
            const ID = DOG_DATA.shift(); // Preservando o ID do registro

            const NEW_DOG = new Dog(DOG_DATA); // Criando uma instância dos dados do cachorro que será atualizado
            NEW_DOG.id = ID; // Atualizando o objeto, inserindo o ID na instância gerada

            const RESPONSE = await putDog(NEW_DOG); // Enviando para o método estático que envia dados para serem inseridas no banco de dados

            if (RESPONSE.code === "200") {
                console.log(RESPONSE);
                showAlert(RESPONSE);
                close_modal();
                clean_table();
                show_dogs(await getDogs());
            } else {
                console.log(RESPONSE);
                showAlert(RESPONSE);
            }

        } catch (err) {
            console.log(err);
            showAlert(err);
        }

        console.log(await getMetrics());
    }

    // Condição para permitir a pesquisa por cachorros
    if (el.classList.contains("search") || el.classList.contains("search-icon")) {
        const SEARCH_ITEM = document.querySelector("#search").value;

        try {
            // Se a pesquisa tiver um valor vazio, retornará a lista padrão de todos os cachorros na tabela do banco
            const SEARCH_RES = SEARCH_ITEM != "" ? await searchDog({ search_item: SEARCH_ITEM }) : await getDogs();

            if (SEARCH_RES.length > 0) {
                console.log(SEARCH_RES);
                clean_table();
                show_dogs(SEARCH_RES);
            } else {
                clean_table();
            }
        } catch (err) {
            console.log(err);
            showAlert(err);
        }

        console.log(await getMetrics());
    }

    if (el.classList.contains("back-to-index")) {
        window.location.href = "http://localhost:8081/index.html";
    }
});