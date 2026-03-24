export async function del(id) {
    const REQ = await fetch(`http://localhost:8070/dogs/${id}`,{
        "method":"DELETE",
        headers:{
            "Content-type":"application/json"
        },
        //body: JSON.stringify(id)
    });

    // return await REQ.json();
}