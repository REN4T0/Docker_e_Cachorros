import { get } from "../scripts/get.js";

export function clean_table(){
    const TABLE = document.querySelector("table");
    const TABLE_BODY = document.querySelector("tbody");

    if(TABLE && TABLE_BODY){
        TABLE.removeChild(TABLE_BODY);
    }
}

 export async function show_dogs(){
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