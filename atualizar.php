<?php
require_once 'dbconnect.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

if (isset($_POST['nome']) && isset($_POST['funcao']) && isset($_POST['cpf']) && isset($_POST['nascimento']) && isset($_POST['telefone'])) {
    $id = $_POST['id'];
    $nome = $_POST['nome'];
    $funcao = $_POST['funcao'];
    $cpf = $_POST['cpf'];
    $nascimento = $_POST['nascimento'];
    $telefone = $_POST['telefone'];

    $query = "UPDATE candidatos SET nome = '$nome', funcao = '$funcao', cpf = '$cpf', nascimento = '$nascimento', telefone = '$telefone' WHERE id = $id";
    $result = $mysqli->query($query);

    if ($result) {
        $response = array('status' => 'success', 'message' => 'Item adicionado com sucesso.');
    } else {
        $response = array('status' => 'error', 'message' => 'Falha ao adicionar o item.');
    }

    echo json_encode($response);
} else {
    $response = array('test' => $_POST['funcao'],'status' => 'error', 'message' => 'Campos obrigatórios não foram preenchidos.');
    echo json_encode($response);
}