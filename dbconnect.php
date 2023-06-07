<?php
$hostname = "localhost";
$usuario = "root";
$senha = "";
$bancodedadosname = "rh";

$mysqli = new mysqli($hostname, $usuario, $senha, $bancodedadosname);

if ($mysqli->connect_error) {
    die("Falha na conexão: " . $mysqli->connect_error);
}
