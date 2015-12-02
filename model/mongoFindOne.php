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
    $action = $_POST['action'];
	if($method == 'GET'){
		$id = $_GET['id'];
		$collection = $db->$dataTable;
        $searchArray = array('id' => $id);
		$cursor = $collection->find($searchArray);
		$jsonArr = (json_encode(iterator_to_array($cursor)));
		echo $jsonArr;
	}
    else if($method == 'POST' && $action == 'reject'){
        $tempId = $_POST["id"];
        foreach($tempId as $value){
            $id = $value;
        }
        $id = new MongoId($id);
        $collection = $db->$dataTable;
		$searchArray = array('_id' => $id);
        $updateArray = array('isRejected' => 'true');
		$cursor = $collection->findAndModify($searchArray, array('$set' => $updateArray), array('new' => 'true'));
		echo "success";
    }
    else if($method == 'POST'){
        $tempId = $_POST["id"];
        $userType = $_POST["userType"];
        foreach($tempId as $value){
            $id = $value;
        }
        $id = new MongoId($id);
        $collection = $db->$dataTable;
		$searchArray = array('_id' => $id);
        if($userType == 'admin'){
            $updateArray = array('isApprovedByAdmin' => 'true');
        }
        else{
            $updateArray = array('isApprovedByEmployer' => 'true');
        }
		$cursor = $collection->findAndModify($searchArray, array('$set' => $updateArray), array('new' => 'true'));
		echo "success";
    }
?>
