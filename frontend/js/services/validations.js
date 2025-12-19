export function checkNullForm(data){
    if(data.includes("") || data.includes(null) || data.includes(undefined)){
        throw new Error("Não é possível cadastrar valores vazios");
    }
}