<?php
	$dbhost = 'localhost';
	$dbname = 'test';
	
	$m = new Mongo("mongodb://$dbhost");
	$db = $m->$dbname;
	$dataTable = "newForms";
	
	$method = $_SERVER['REQUEST_METHOD'];

	if($method == "GET")
	{
		$collection = $db->$dataTable;
		$cursor = $collection->find();
		$jsonArr = (json_encode(iterator_to_array($cursor)));
		echo $jsonArr;
	}

	else if($method == 'POST')
	{
		$jsonData = $_POST['data'];
		$collection = $db->$dataTable;
		$collection->insert($jsonData);

		print "success!";
	}
?>
