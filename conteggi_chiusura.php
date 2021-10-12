<?php

$page_title = "Conteggi di chiusura";
$url_section = "_gestione/conteggi_chiusura.php";
$sections = array(
    array("/#/", "Conteggi di chiusura")
);

include 'header.php';
?>

<link rel="stylesheet" href="<?php echo URL_ROOT ?>_gestione/content/conteggi_chiusura/css/style.css?version=2.2"/>
<script src="<?php URL_HOST ?>/_gestione/content/conteggi_chiusura/js/conteggiFinali.js?version=1.14"></script>
<script src="<?php URL_HOST ?>/_gestione/content/conteggi_chiusura/js/init.js?version=1.1"></script>
<?php 

include 'footer.php';

?>
