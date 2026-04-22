export function clean_form(formInputs) {
    // document.querySelectorAll("form input");

    for (let input of formInputs) {
        input.id === "breed" || input.id === "gender" ? input.options[0].setAttribute("selected", "true") : input.value = "";
    }
}