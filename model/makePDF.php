<?PHP
require_once('../plugins/mpdf60/mpdf.php');
$mpdf = new mPDF();
$test = 'test variable';
$mpdf->WriteHTML('<p>Put whatever html you want here and add variables like this: ' . $test . '.</p>');
$mpdf->Output();
exit;
?>