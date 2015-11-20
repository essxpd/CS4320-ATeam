<?PHP
require_once('../plugins/mpdf60/mpdf.php');
session_start();
$mpdf = new mPDF();
$test = 'test variable';
$arr = $_SESSION['BioData'];

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
		$form = $_GET['htmlObject'];
		$collection = $db->$dataTable;
        $searchArray = array('id' => $id);
		$cursor = $collection->find($searchArray);
		$mongoArr = iterator_to_array($cursor);
	}



$stylesheet = file_get_contents('../styles/main.css');
$mpdf->WriteHTML('
    <link rel="stylesheet" href="../styles/PDFform.css">
	<h1>myZou SECURITY Request Form</h1>
	<h2>University of Missouri - Columbia </h2>
	<hr>
	<table>
		<tr>
			<td>
				<b>Name:</b> ' . $arr['Full_Name'] .'
			</td>
			<td>
				<b>SSO:</b> ' . $arr['SSO'] .'
			</td>
		</tr>
		<tr>
			<td>
				<b>Title:</b> ' . $arr['Title'] .'
			</td>
			<td>
				<b>Employee ID:</b> ' . $arr['Employee_ID'] .'
			</td>
		</tr>
		<tr>
			<td>
				<b>Department:</b> ' . $arr['Department'] .'
			</td>
			<td>
				<b>Campus Address:</b> ' . $arr['Campus_Address'] .'
			</td>
		</tr>
		<tr>
			<td>
				<b>Phone Number:</b> ' . $arr['Phone_Number'] .'
			</td>
			<td>
				<b>FERPA Score:</b> ' . $arr['Ferpa_Score'] .'
			</td>
		</tr>
	</table>
	<hr>
	' . $form
	);
	
	
	
	
	
	
	
	
	
/*$copystaffmember = false;
if ($copystaffmember == true) {//I will change these variables to what actually gets sent back from mongo
	$mpdf->WriteHTML('
	<p>New Request: ' . $newRequest . '.</p>
	<p>Additional Request: ' . $addRequest . '.</p>
	<p>Student Worker: ' . $studentWorker . '.</p>
	');
}
*/



$mpdf->Output();
exit;
?>