import { Dog } from "../scripts/post.js";

document.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();

    let el = e.target;

    if(el.classList.contains("send")){
        const DOG_DATA = new Array();
        const INPUTS = document.querySelectorAll("form .dog_info");

        for(let input of INPUTS) DOG_DATA.push(input.value);

        console.log(DOG_DATA);
        const DOG = new Dog(DOG_DATA);
        console.log(DOG);
        
        const RESPONSE = Dog.post(DOG);
    }
});

console.log(window.location.hostname, window.location.port);