import { getDogBreeds } from "../scripts/dog_breeds.js";
import { showBreedSelectOptions } from "./breed_options.js";

export async function open_modal(id, action) {
    const INPUT_LABELS = ["", "Raça", "Apelido", "Gênero"];
    const INPUT_CLASSES = ["id", "breed", "surname", "gender"];
    const SLCT_OPTS = ["M", "F"];

    const BODY = document.querySelector("body");

    const BKGRND_MDL = document.createElement('div');
    BKGRND_MDL.classList.add("modal_background");

    const MODAL = document.createElement('div');
    MODAL.classList.add("modal");

    if (action === "edit") {
        const CLOSE_ICON = document.createElement("img");
        CLOSE_ICON.classList.add("close_icon");
        CLOSE_ICON.src = `${window.location.origin}/frontend/icons/close.svg`;

        const CLOSE_BTN = document.createElement("button");
        CLOSE_BTN.classList.add("close");

        const MODAL_TITLE = document.createElement("h2");
        MODAL_TITLE.innerText = "Atualizar registro do cachorro";

        const MODAL_FORM = document.createElement('form');

        for (let i in INPUT_LABELS) {
            const LABEL = document.createElement("label");
            LABEL.innerText = INPUT_LABELS[i];

            const INPUT = document.createElement("input");
            INPUT.classList.add("updated_dog_info");
            INPUT.value = document.querySelector(`#dog${id} .${INPUT_CLASSES[i]}`).textContent;

            if (INPUT_CLASSES[i] === "id") INPUT.setAttribute("readonly", "true");
            if (INPUT_CLASSES[i] === "id") INPUT.setAttribute("hidden", "true");

            if (INPUT_CLASSES[i] === "breed" || INPUT_CLASSES[i] === "gender") {
                const SLCT_LABEL = document.createElement("label");
                SLCT_LABEL.innerText = INPUT_LABELS[i];

                const SLCT = document.createElement("select");
                SLCT.classList.add(`updated_dog_info`);

                if (INPUT_CLASSES[i] === "breed") {
                    for (let index of await getDogBreeds()) {
                        const OPT = document.createElement("option");
                        OPT.innerText = index;
                        OPT.value = index;

                        if (OPT.value == document.querySelector(`#dog${id} .${INPUT_CLASSES[i]}`).textContent) {
                            OPT.setAttribute("selected", "true");
                        }

                        SLCT.appendChild(OPT);
                    }

                } else {
                    for (let c in SLCT_OPTS) {
                        const OPT = document.createElement('option');
                        SLCT_OPTS[c] == "M" ? OPT.innerText = "Macho" : OPT.innerText = "Fêmea";
                        OPT.value = SLCT_OPTS[c];

                        if (OPT.value == document.querySelector(`#dog${id} .${INPUT_CLASSES[i]}`).textContent) {
                            OPT.setAttribute("selected", "true");
                        }

                        SLCT.appendChild(OPT);
                    }
                }

                MODAL_FORM.appendChild(SLCT_LABEL);
                MODAL_FORM.appendChild(SLCT);

            } else {
                MODAL_FORM.appendChild(LABEL);
                MODAL_FORM.appendChild(INPUT);
            }
        }

        const UPDATE_BTN = document.createElement("button");
        UPDATE_BTN.classList.add("update");
        UPDATE_BTN.innerText = "Atualizar";

        MODAL_FORM.appendChild(UPDATE_BTN);
        CLOSE_BTN.appendChild(CLOSE_ICON);
        MODAL.appendChild(CLOSE_BTN);
        MODAL.appendChild(MODAL_TITLE);
        MODAL.appendChild(MODAL_FORM);
    }

    if(action === "delete") {
        const P = document.createElement("p");
        const TABLE = document.createElement("table");
        const TABLE_HEADER_ROW = document.createElement("tr");
        const TABLE_ROW = document.createElement("tr");
        const FLEX_DIV = document.createElement("div");
        const CANCEL_BUTTON = document.createElement("button");
        const CONFIRM_DEL_BUTTON = document.createElement("button");

        const TABLE_HEADERS_LIST = ["Raça", "Apelido", "Sexo"];
        const RECORD_ARRAY = [document.querySelector(`#dog${id} .breed`).textContent, document.querySelector(`#dog${id} .surname`).textContent, document.querySelector(`#dog${id} .gender`).textContent];
        
        for(let header in TABLE_HEADERS_LIST) {
            const TABLE_HEADER = document.createElement("th");
            TABLE_HEADER.innerText = TABLE_HEADERS_LIST[header];
            TABLE_HEADER_ROW.appendChild(TABLE_HEADER);
        }
        
        for(let recordData in RECORD_ARRAY) {
            const TABLE_DATA = document.createElement("td");
            TABLE_DATA.innerText = RECORD_ARRAY[recordData];
            TABLE_ROW.appendChild(TABLE_DATA);
        }

        P.innerText = `Você realmente deseja eliminar esse registro?\nID: ${id}`;
        TABLE.classList.add("delete-modal-table");
        FLEX_DIV.classList.add("flex-div");
        CANCEL_BUTTON.innerText = "Cancelar";
        CANCEL_BUTTON.classList.add("cancel");
        CONFIRM_DEL_BUTTON.innerText = "Eliminar";
        CONFIRM_DEL_BUTTON.classList.add("remove");
        CONFIRM_DEL_BUTTON.id = id;

        TABLE.appendChild(TABLE_HEADER_ROW);
        TABLE.appendChild(TABLE_ROW);
        FLEX_DIV.appendChild(CANCEL_BUTTON);
        FLEX_DIV.appendChild(CONFIRM_DEL_BUTTON);
        MODAL.appendChild(P);
        MODAL.appendChild(TABLE);
        MODAL.appendChild(FLEX_DIV);
    }

    BKGRND_MDL.appendChild(MODAL);
    BODY.appendChild(BKGRND_MDL);
}

export function close_modal() {
    const BODY = document.querySelector("body");
    const BKGRND_MDL = document.querySelector(".modal_background");
    BODY.removeChild(BKGRND_MDL);
}