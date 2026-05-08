import { showAlert } from "../assets/alert.js";

export function checkNullForm(data) {
    if (data.includes("") || data.includes(null) || data.includes(undefined)) {
        showAlert({message: "Não é possível cadastrar valores vazios."});
        throw new Error("Não é possível cadastrar valores vazios.");
    }
}