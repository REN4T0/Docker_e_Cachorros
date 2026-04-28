export function showAlert (obj) {
    const ALERT = document.querySelector("div.alert");
    document.querySelector(".alert p").innerText = obj.message;
    ALERT.style.right = "1rem";

    setTimeout(() => {
        ALERT.style.right = "-25rem";
    }, 3000);
}