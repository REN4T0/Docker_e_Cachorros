<?php
    include_once("../../conn.php");

    header("Access-Control-Allow-Origin: http://localhost:8080");
    header("Access-Control-Allow-Method: POST");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json;");

    $data = json_decode(file_get_contents("php://input"), true);
    $search_value = htmlspecialchars($data["search_item"]);

    $sql = "SELECT * FROM dogs WHERE surname ILIKE '$search_value%'";
    $result = $pdo->query($sql);

    $response = [];

    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        array_push($response, [
            "id" => $row['id'],
            "breed" => $row['breed'],
            "surname" => $row['surname'],
            "gender" => $row['gender'] 
        ]);
    }

    echo json_encode($response);
?>