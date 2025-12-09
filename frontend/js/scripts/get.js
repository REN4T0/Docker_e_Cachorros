export async function get(){
    const REQ = await fetch(`http://${window.location.hostname}:${window.location.port}/backend/php/read.php`, {
        method:"GET",
        headers:{
            "Content-type":"application/json"
        },
    });

    const RES = await REQ.json();
    return RES;
}