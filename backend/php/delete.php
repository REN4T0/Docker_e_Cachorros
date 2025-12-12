<?php
    include_once("../../conn.php");

    header("Access-Control-Allow-Origin: http://localhost:8080");
    header("Access-Control-Allow-Method: POST");
    header("Access-Control-Allow-Headers: Content-type");
    header("Content-Type: application/json");

    $data = json_decode(file_get_contents("php://input"), true);
    $id = htmlspecialchars($data);

    try {
        $sql = "DELETE FROM dogs WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':id' => $id
        ]);

        echo json_encode([
            "code" => "200",
            "status" => "success",
            "msg" => "Cachorro removido"
        ]);

    } catch (Exception $err) {
        echo json_encode([
            "code" => "500",
            "status" => "server_error",
            "msg" => "Não foi possível remover do banco de dados",
            "error" => "$err"
        ]);
    }
?>