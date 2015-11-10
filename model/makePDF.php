<?PHP
require_once('../plugins/mpdf60/mpdf.php');
session_start();
$mpdf = new mPDF();
$test = 'test variable';
$arr = $_SESSION['BioData'];






$mpdf->WriteHTML('
	<p>Name: ' . $arr['Full_Name'] . '.</p>
	<p>Title: ' . $arr['Title'] . '.</p>
	<p>Department: ' . $arr['Department'] . '.</p>
	<p>SSO: ' . $arr['SSO'] . '.</p>
	<p>Employee ID: ' . $arr['Employee_ID'] . '.</p>
	<p>Campus Address: ' . $arr['Campus_Address'] . '.</p>
	<p>Phone Number: ' . $arr['Phone_Number'] . '.</p>
	<p>Ferpa Score: ' . $arr['Ferpa_Score'] . '.</p>
	');
$copystaffmember = false;
if ($copystaffmember == true) {//I will change these variables to what actually gets sent back from mongo
	$mpdf->WriteHTML('
	<p>New Request: ' . $newRequest . '.</p>
	<p>Additional Request: ' . $addRequest . '.</p>
	<p>Student Worker: ' . $studentWorker . '.</p>
	');
}

$mpdf->Output();
exit;
?>