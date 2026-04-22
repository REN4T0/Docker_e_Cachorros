export function clean_form(formInputs){
    // document.querySelectorAll("form input");

    for(let input of formInputs) {
        input.value = "";
    }
}