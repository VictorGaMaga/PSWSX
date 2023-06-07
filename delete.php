<?php
require_once 'dbconnect.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$id = $_POST['id'];

$query = "DELETE FROM candidatos WHERE id = '$id'";
$result = $mysqli->query($query);

if ($result) {
    $response = array('status' => 'success', 'message' => 'Item excluído com sucesso.');
} else {
    $response = array('status' => 'error', 'message' => 'Falha ao excluir o item.');
}

echo json_encode($response);

