<?php
require_once 'dbconnect.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$valor = $_GET['valor']."%";

/* $query = "SELECT * FROM candidatos; */
$query = "SELECT * FROM candidatos ORDER BY (CASE WHEN nome LIKE '" . $valor . "' THEN 0 ELSE 1 END) ASC, nome ASC";
$result = $mysqli->query($query);

if ($result->num_rows > 0) {
    $itens = array();
    while ($row = $result->fetch_assoc()) {
        $itens[] = $row;
    }
    $response = array('status' => 'success', 'itens' => $itens);
} else {
    $response = array('status' => 'error', 'message' => 'Nenhum item encontrado.');
}

echo json_encode($response);
