<?php
    include_once("../../conn.php");

    header("Access-Control-Allow-Origin: http://localhost:8080"); // Podem vir quaisquer dados vindos desse domínio;
    header("Access-Control-Allow-Method: POST"); // Definir o método em questão, que nesse caso é POST, indicando que irei cadastrar algo;
    header("Access-Control-Allow-Headers: Content-Type"); // Indicando que o tipo dos dados virão em um cabeçalho;
    header("Content-Type: application/json"); // E que o tipo desses dados virá em JSON;

    $data = json_decode(file_get_contents("php://input"), true); // Decodificando os dados

    $breed = htmlspecialchars($data['breed']);
    $surname = htmlspecialchars($data['surname']);
    $gender = htmlspecialchars($data['gender']);

    try{
        $sql = "INSERT INTO dogs (breed, surname, gender) VALUES (:breed, :surname, :gender)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':breed' => $breed,
            ':surname' => $surname,
            ':gender' => $gender
        ]);

        echo json_encode([
            "code" => "200",
            "status" => "success",
            "msg" => "Cachorro cadastrado com sucess"
        ]);
        
    }catch(Exception $err){
        echo json_encode([
            "code" => "500",
            "status" => "server_error",
            "msg" => "Não foi possível cadastrar no banco de dados"
            "error" => $err
        ]);
    }
?>