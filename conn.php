<?php
    $host = "database";
    $user = "postgres";
    $pass = "renato";
    $db = "petshop";
    $port = "5432";

    $dsn = "pgsql:host=$host;port=$port;dbname=$db";

    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false
    ];

    $pdo = new PDO($dsn, $user, $pass, $options);
?>