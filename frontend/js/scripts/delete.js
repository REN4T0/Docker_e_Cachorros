export async function del(id) {
    const REQ = await fetch(`${window.location.origin}/backend/php/delete.php`,{
        "method":"POST",
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify(id)
    });

    return await REQ.json();
}