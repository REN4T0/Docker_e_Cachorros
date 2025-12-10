export function open_modal(id){
    const INPUT_LABELS = ["Raça", "Apelido"];
    const INPUT_CLASSES = ["breed", "surname"];
    const SLCT_OPTS = ["M", "F"];

    const BODY = document.querySelector("body");

    const BKGRND_MDL = document.createElement('div');
    BKGRND_MDL.classList.add("modal_background");

    const MODAL = document.createElement('div');
    MODAL.classList.add("modal");

    const CLOSE_ICON = document.createElement("img");
    CLOSE_ICON.classList.add("close_icon");
    CLOSE_ICON.src = `${window.location.origin}/frontend/icons/close.svg`;

    const CLOSE_BTN = document.createElement("button");
    CLOSE_BTN.classList.add("close");

    const MODAL_TITLE = document.createElement("h2");
    MODAL_TITLE.innerText = "Atualizar registro do cachorro";

    const MODAL_FORM = document.createElement('form');

    for(let i in INPUT_LABELS){
        const LABEL = document.createElement("label");
        LABEL.innerText = INPUT_LABELS[i];

        const INPUT = document.createElement("input");
        INPUT.classList.add("updated_dog_info");
        console.log(document.querySelector(`#${id} td.${INPUT_CLASSES[i]}`)); 
        INPUT.value = document.querySelector(`#${id} .${INPUT_CLASSES[i]}`).textContent;

        MODAL_FORM.appendChild(LABEL);
        MODAL_FORM.appendChild(INPUT);
    }

    const SLCT_LABEL = document.createElement("label");
    SLCT_LABEL.innerText = "Gênero";
    const GNDR_SLCT = document.createElement("select");
    GNDR_SLCT.classList.add("updated_dog_info");

    for(let i in SLCT_OPTS){
        const OPT = document.createElement('option');
        SLCT_OPTS[i] == "M" ? OPT.innerText = "Masculino" : OPT.innerText = "Feminino";
        OPT.value = SLCT_OPTS[i];

        GNDR_SLCT.appendChild(OPT);
    }

    const UPDATE_BTN = document.createElement("button");
    UPDATE_BTN.classList.add("update");
    UPDATE_BTN.innerText = "Atualizar";

    MODAL_FORM.appendChild(SLCT_LABEL);
    MODAL_FORM.appendChild(GNDR_SLCT);
    MODAL_FORM.appendChild(UPDATE_BTN);
    CLOSE_BTN.appendChild(CLOSE_ICON);
    MODAL.appendChild(CLOSE_BTN);
    MODAL.appendChild(MODAL_TITLE);
    MODAL.appendChild(MODAL_FORM);
    BKGRND_MDL.appendChild(MODAL);
    BODY.appendChild(BKGRND_MDL);
}

export function close_modal(){
    const BODY = document.querySelector("body");
    const BKGRND_MDL = document.querySelector(".modal_background");
    BODY.removeChild(BKGRND_MDL);
}