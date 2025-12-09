import { Dog } from "../scripts/post.js";
import { get } from "../scripts/get.js";

function clean_table(){
    const TABLE = document.querySelector("table");
    const TABLE_BODY = document.querySelector("tbody");

    if(TABLE && TABLE_BODY){
        TABLE.removeChild(TABLE_BODY);
    }
}

async function show_dogs(){
    const TABLE = document.querySelector("table");
    const TABLE_BODY = document.createElement("tbody");

    const DOG_ROWS = await get();
    
    for (let row of DOG_ROWS){
        let table_row = document.createElement('tr');
        
        for(let dog_index in row){
            let table_data = document.createElement('td');
            table_data.innerText = row[dog_index];
            table_row.appendChild(table_data);
        }

        table_row.ap
    
        TABLE_BODY.appendChild(table_row);
    }

    TABLE.appendChild(TABLE_BODY);
}

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
        const RESPONSE = await Dog.post(DOG);
        console.log(RESPONSE);
        
        if(RESPONSE.code == "200"){
            console.log("Cachorro cadastrado com sucesso.");
            clean_table();
            await show_dogs();
        } else {
            console.log(`ERRO - ${RESPONSE}`);
        }
    }
});
