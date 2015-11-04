<?php
//comment
	// Configuration
	$dbhost = 'localhost';
	$dbname = 'test';
	// Connect to test database
	$m = new Mongo("mongodb://$dbhost");
	$db = $m->$dbname;
	$dataTable = "forms";
	// Operations
	$method = $_SERVER['REQUEST_METHOD'];//$statusCode = $_POST['intake'];
	if($method == 'GET'){
		$pawprint = $_GET['pawprint'];
		$collection = $db->$dataTable;
		$cursor = $collection->find({paw : $pawprint});
		$jsonArr = (json_encode(iterator_to_array($cursor)));
		echo $jsonArr;
	}else if($method == 'POST'){
		$jsonData = $_POST['data'];
		$collection = $db->$dataTable;
		$collection->insert($jsonData);
		echo "inserted successfully";
	}
?>