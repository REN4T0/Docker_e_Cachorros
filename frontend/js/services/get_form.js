import { Dog } from "../scripts/post.js";
import { get } from "../scripts/get.js";

document.addEventListener('click', async e => {
    e.preventDefault();
    e.stopPropagation();

    let el = e.target;

    if(el.classList.contains("send")){
        const DOG_DATA = new Array();
        const INPUTS = document.querySelectorAll("form .dog_info");

        for(let input of INPUTS) DOG_DATA.push(input.value);

        const DOG = new Dog(DOG_DATA);
        const RESPONSE = Dog.post(DOG);
        console.log(RESPONSE);
        
        if(RESPONSE.code == "200"){
            console.log("Cachorro cadastrado com sucesso.");
        } else {
            console.log(`ERRO - ${RESPONSE}`);
        }
    }
});