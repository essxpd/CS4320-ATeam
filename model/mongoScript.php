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
		$timestamp = $_GET['date'];
		$collection = $db->$dataTable;
		if(!is_null($department)){
			$searchArray = array('dept' => $department);
		}else if(!is_null($pawprint)){
			$searchArray = array('paw' => $pawprint);
		}else if(!is_null($timestamp)){
			$searchArray = array('date' => $timestamp);
		}else{
			$searchArray = array();
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
