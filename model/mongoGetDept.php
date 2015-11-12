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
		$department = $_GET['dept'];
		$collection = $db->$dataTable;
		$searchArray = array('dept' => $department);
		$cursor = $collection->find($searchArray);
//		$cursor->sort(array('date' = -1));
		$jsonArr = (json_encode(iterator_to_array($cursor)));
		echo $jsonArr;
	}
?>