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
		$department = $_GET['department'];
		$collection = $db->$dataTable;
		if($department =! NULL){
			$searchArray = array('dept' => $department);
		}else{
			$searchArray = array('paw' => $pawprint);
		}
		$cursor = $collection->find($searchArray);
		$jsonArr = (json_encode(iterator_to_array($cursor)));
		echo $jsonArr;
	}else if($method == 'POST'){
		$jsonData = $_POST['data'];
		$collection = $db->$dataTable;
		$collection->insert($jsonData);
		echo "Insert successful";
	}
?>
