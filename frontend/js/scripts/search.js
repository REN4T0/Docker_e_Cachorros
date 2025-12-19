export async function search_dogs(srch){
    const REQ = await fetch(`${window.location.origin}/backend/php/search.php`, {
        method:"POST",
        headers: {
            "Content-type":"application/json" 
        },
        body: JSON.stringify(srch)
    });

    const RES = await REQ.json();
    return RES;
}