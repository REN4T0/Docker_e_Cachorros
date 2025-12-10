export async function get(){
    const REQ = await fetch(`${window.location.origin}/backend/php/read.php`, {
        method:"GET",
        headers:{
            "Content-type":"application/json"
        },
    });

    const RES = await REQ.json();
    return RES;
}