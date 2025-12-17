<?php
    include_once("../../conn.php");

    header("Access-Control-Allow-Origin: http://localhost:8080");
    header("Access-Control-Allow-Method: GET");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json;");

    $data = json_decode(file_get_contents("php://input"), true);
    $search_value = $data["search"];

    $sql = "SELECT * FROM dogs WHERE surname = ':surname%A'";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':surname' => $search_value;
    ]);
?>