<?PHP
require_once('../plugins/mpdf60/mpdf.php');
$mpdf = new mPDF();
$mpdf->WriteHTML('<p>Your first taste of creating PDF from HTML</p>');
$mpdf->Output();
exit;
?>