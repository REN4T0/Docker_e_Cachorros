import { Dog } from "../scripts/post.js";
import { get } from "../scripts/get.js";
import { del } from "../scripts/delete.js";
import { open_modal } from "../assets/modal.js";
import { close_modal } from "../assets/modal.js";

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
        let c = 0;
        
        for(let dog_index in row){
            let table_data = document.createElement('td');
            table_data.classList = dog_index;
            table_data.innerText = row[dog_index];
            table_row.id = `dog${row.id}`;
            table_row.appendChild(table_data);
        }

        do {
            let td_button = document.createElement("td");
            let tbutton = document.createElement("button");
            let tbimg = document.createElement("img");

            if(c === 0){
                tbimg.src = `${window.location.origin}/frontend/icons/delete.svg`;
                tbimg.classList.add("delete");
                tbutton.classList.add("delete");
            } else {
                tbimg.src = `${window.location.origin}/frontend/icons/edit.svg`; 
                tbimg.classList.add("edit");
                tbutton.classList.add("edit");
            }

            tbimg.id = row.id;
            tbutton.id = row.id;
            tbutton.appendChild(tbimg);
            td_button.appendChild(tbutton);
            table_row.appendChild(td_button);

            c++;
        } while (c <= 1);
    
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
});
