<?php
//comment
	// Configuration
	$dbhost = 'localhost';
	$dbname = 'test';
	// Connect to test database
	$m = new Mongo("mongodb://$dbhost");
	$db = $m->$dbname;
	// Operations
	$method = $_SERVER['REQUEST_METHOD'];//$statusCode = $_POST['intake'];
	if($method == 'GET'){
		$dataTable = $_POST['table'];
		$collection = $db->$dataTable;
		$cursor = $collection->find();
		$jsonArr = (json_encode(iterator_to_array($cursor)));
		echo $jsonArr;
	}else if($method == 'POST'){
		$jsonData = $_POST['todoEs'];
		$dataTable = $_POST['table'];
		$collection = $db->$dataTable;
		$collection->remove(array());
		$collection->insert($jsonData);
		echo "inserted successfully";
	}
?>
