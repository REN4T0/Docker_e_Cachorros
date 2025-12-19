import { Dog } from "../scripts/post.js";
import { del } from "../scripts/delete.js";
import { open_modal } from "../assets/modal.js";
import { close_modal } from "../assets/modal.js";
import { show_dogs } from "../assets/table.js";
import { clean_table } from "../assets/table.js";
import { search_dogs } from "../scripts/search.js";
import { get } from "../scripts/get.js";

// function validate_form(unval_data) {
    // if (unval_data.includes("", null, undefined)) {
    //     throw new Error("Não é possível cadastrar valores vazios.");
    // } else {
    //     return {
    //         code: "200",
    //         msg: "Dados válidos"
    //     }
    // }
// }

// Assim que a página carregar, os registros do banco de dados serão consultado e exibidos na tela.
window.addEventListener("load", async () => {
    clean_table();
    show_dogs(await get());
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
            // validate_form();

            // Criando uma instância do cachorro cadastrado e enviando para a função estática que vai mandar os dados para o banco
            const DOG = new Dog(DOG_DATA);
            const RESPONSE = await Dog.post(DOG, "post");

            if (RESPONSE.code == "200") {
                console.log(RESPONSE);

                // Limpando a tabela e gerando novamente.
                clean_table();
                show_dogs();

            } else {
                console.log(RESPONSE);

            }

        } catch (err) {
            console.log(err);
        }
    }

    // Deletando o registro do banco
    if (el.classList.contains("delete")) {
        const RESPONSE = await del(el.id); // O id do registro é coletado por meio do atributo #id que está no elemento

        if (RESPONSE.code === "200") {
            console.log(RESPONSE);
            clean_table();
            show_dogs();
        } else {
            console.log(RESPONSE);
        }
    }

    // Condicionais que definem a abertura e o fechamento do modal
    if (el.classList.contains("edit")) open_modal(el.id);
    if (el.classList.contains("close") || el.classList.contains("close_icon")) close_modal();

    if (el.classList.contains("update")) {
        const DOG_DATA = new Array();
        const INPUTS = document.querySelectorAll("form .updated_dog_info");

        for (let input of INPUTS) DOG_DATA.push(input.value);

        let id = DOG_DATA.shift(); // Presenrvando o ID do registro

        const NEW_DOG = new Dog(DOG_DATA); // Criando uma instância dos dados do cachorro que será atualizado
        NEW_DOG.id = id; // Inserindo o ID na instância gerada

        const RESPONSE = await Dog.post(NEW_DOG, "update"); // Enviando para o método estático que envia dados para serem inseridas no banco de dados

        if (RESPONSE.code == "200") {
            console.log(RESPONSE);
            clean_table();
            show_dogs();
            close_modal();
        } else {
            console.log(RESPONSE);
        }
    }

    if(el.classList.contains("search")){
        const SEARCH_ITEM = document.querySelector("#search").value;
        const SEARCH_RES = await search_dogs({search_item: SEARCH_ITEM});

        if(SEARCH_RES.length > 0){
            console.log(SEARCH_RES);
            clean_table();
            show_dogs(SEARCH_RES);
        } else {
            clean_table();
        }
    }
});
