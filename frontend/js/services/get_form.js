import { Dog } from "../scripts/post.js";
import { del } from "../scripts/delete.js";
import { open_modal } from "../assets/modal.js";
import { close_modal } from "../assets/modal.js";
import { show_dogs } from "../assets/table.js";
import { clean_table } from "../assets/table.js";

window.addEventListener("load", async () => {
    await show_dogs();
})

document.addEventListener('click', async e => {
    e.preventDefault();
    e.stopPropagation();

    let el = e.target;

    if(el.classList.contains("send")){
        const DOG_DATA = new Array();
        const INPUTS = document.querySelectorAll("form .dog_info");

        for(let input of INPUTS) DOG_DATA.push(input.value);

        const DOG = new Dog(DOG_DATA);
        const RESPONSE = await Dog.post(DOG, "post");
        
        if(RESPONSE.code == "200"){
            console.log(RESPONSE);
            clean_table();
            await show_dogs();
        } else {
            console.log(RESPONSE);
        }
    }

    if(el.classList.contains("delete")){
        const RESPONSE = await del(el.id);
        console.log(RESPONSE);

        if(RESPONSE.code === "200"){
            clean_table();
            await show_dogs();
        } else {
            console.log(RESPONSE);
        }
    }

    if(el.classList.contains("edit")){
        open_modal(el.id);
    }

    if(el.classList.contains("close") || el.classList.contains("close_icon")){
        close_modal();
    }

    if(el.classList.contains("update")){
        const DOG_DATA = new Array();
        const INPUTS = document.querySelectorAll("form .updated_dog_info");

        for(let input of INPUTS){
            DOG_DATA.push(input.value);
        }

        let id = DOG_DATA.shift(); // Presenrvando o ID do registro

        const NEW_DOG = new Dog(DOG_DATA); // Criando uma instância dos dados do cachorro que será atualizado
        NEW_DOG.id = id; // Colando o ID na instância gerada

        const RESPONSE = await Dog.post(NEW_DOG, "update"); // Enviando para o método estático que envia dados para serem inseridas no banco de dados

        if(RESPONSE.code == "200"){
            console.log(RESPONSE);
            clean_table();
            show_dogs();
            close_modal();
        } else {
            console.log(RESPONSE);
        }
    }
});
