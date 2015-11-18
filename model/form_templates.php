<?php
	$dbhost = 'localhost';
	$dbname = 'test';
	
	$m = new Mongo("mongodb://$dbhost");
	$db = $m->$dbname;
	$dataTable = "form_templates";
	
	$method = $_SERVER['REQUEST_METHOD'];

	
	if($method == "GET")
	{
		$app = $_GET['app'];
		if(!is_null($app)){
			$searchArray = array('application' => $app);
		}

		$collection = $db->$dataTable;
		$cursor = $collection->find($searchArray);
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


