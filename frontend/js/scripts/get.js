export async function get(){
    const REQ = await fetch(`http://localhost:8070/dogs`, {
        method:"GET",
        headers:{
            "Content-type":"application/json"
        },
    });

    const RES = await REQ.json();
    return RES;
}