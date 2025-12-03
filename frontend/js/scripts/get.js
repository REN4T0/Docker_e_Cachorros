export async function get(){
    const REQ = await fetch(`http://${window.location.hostname}:${window.location.port}/backend/php/read.php`, {
        "method":"GET",
        headers:{
            "Contet-type":"application/json"
        },
        body: JSON.parse()
    });

    const RES = await REQ.json();
    console.log(RES);
    return RES;
}