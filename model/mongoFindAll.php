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
    if($method == 'GET' && $_GET['req'] == 'admin'){
        $where = array('isApprovedByAdmin' => 'false', 'isApprovedByEmployer' => 'true');
        $collection = $db->$dataTable;
        $cursor = $collection->find($where);
        $jsonArr = json_encode(iterator_to_array($cursor));
        echo $jsonArr;
    }
	else if($method == 'GET' && isset($_GET['dept']))
    {
        $dept = $_GET['dept'];
        $where = array('isApprovedByEmployer' => 'false', 'dept' => $dept);
        $collection = $db->$dataTable;
        $cursor = $collection->find($where);
        $jsonArr = json_encode(iterator_to_array($cursor));
        echo $jsonArr;
    }
    else{
        $where = array('paw' => $_GET['paw']);
		$collection = $db->$dataTable;
		$cursor = $collection->find($where);
		$jsonArr = (json_encode(iterator_to_array($cursor)));
		echo $jsonArr;
    }
?>