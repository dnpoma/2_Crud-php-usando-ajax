<?php
	// incluimos la conexión a MySQL

	include_once('dbcon.php');

	// variables para insertar datos a mysqli
	$nombre = strip_tags(trim($_POST["nombre"]));
    $nombre = str_replace(array("\r","\n"),array(" "," "), $nombre);
	$cedula = filter_var(trim($_POST["cedula"]), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $pais = filter_var(trim($_POST["pais"]), FILTER_SANITIZE_STRING);
    $password = trim(md5($_POST['password']));
    
    $query = "INSERT INTO clientes (nombre, email, pais, password, cli_cedula) 
	VALUES('$nombre', '$email', '$pais', '$password', '$cedula')";
    
	if ($con->query($query)) {  
        return true;
    }else{
        return false;
    }

?>