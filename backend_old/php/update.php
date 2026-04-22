<?php
    include_once("../../conn.php");

    header("Access-Control-Allow-Origin: http://localhost:8080");
    header("Access-Control-Allow-Method: POST");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");

    $data = json_decode(file_get_contents("php://input"), true);

    $id = htmlspecialchars($data['id']);
    $breed = htmlspecialchars($data['breed']);
    $surname = htmlspecialchars($data['surname']);
    $gender = htmlspecialchars($data['gender']);

    try {
        $sql = "UPDATE dogs SET breed = :breed, surname = :surname, gender = :gender WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':breed' => $breed,
            ':surname' => $surname,
            ':gender' => $gender,
            ':id' => $id
        ]);

        echo json_encode([
            "code" => "200",
            "status" => "success",
            "msg" => "Cachorro atualizadp com sucesso"
        ]);

    } catch (Exception $err) {
         echo json_encode([
            "code" => "500",
            "status" => "server_error",
            "msg" => "Não foi possível atualizar o banco de dados",
            "error" => $err
        ]);
    }
?>