async function helloworld() {
    const REQ = await fetch(`http://localhost:8090/php/send_hw.php`);
    const RES = await REQ.json();
    return RES;
}

const HELLO_WORLD = await helloworld();

const TITLE = document.createElement("h1");
TITLE.innerText = HELLO_WORLD.value;
document.querySelector("div").appendChild(TITLE);