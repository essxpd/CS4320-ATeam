<?php
//comment
	// Configuration
	$dbhost = 'localhost';
	$dbname = 'test';
	// Connect to test database
	$m = new Mongo("mongodb://$dbhost");
	$db = $m->$dbname;
	$dataTable = "form_templates";
	// Operations
	$method = $_SERVER['REQUEST_METHOD'];

    	if($method == 'POST'){
        	$id = $_POST["id"];
        	$id = new MongoId($id);
        	$collection = $db->$dataTable;
		$searchArray = array('_id' => $id);
		
		$collection->remove($searchArray);
		print "successful removal";
    	}
?>

