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
	$method = $_SERVER['REQUEST_METHOD'];
	if($method == 'GET'){
		$id = $_GET['id'];
		$collection = $db->$dataTable;
        $searchArray = array('id' => $id);
		$cursor = $collection->find($searchArray);
		$jsonArr = (json_encode(iterator_to_array($cursor)));
		echo $jsonArr;
	}/*else if($method == 'POST'){
		$jsonData = $_POST['data'];
		$collection = $db->$dataTable;
		$collection->insert($jsonData);
		echo "inserted successfully";
	}*/
?>