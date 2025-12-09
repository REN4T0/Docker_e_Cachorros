<?php
    include_once("../../conn.php");

    header("Access-Control-Allow-Origin: http://localhost:80");
    header("Access-Control-Allow-Method: GET");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json;");

    $sql = "SELECT * FROM dogs";
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