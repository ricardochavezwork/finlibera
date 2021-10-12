<?php

$page_title = "Centro Notifiche";
$url_section = "_gestione/notificationsCenter.php";
$sections = array(
    array("/#/", "Invio Fatture")
);

include 'header.php';
?>
<link rel="stylesheet" href="<?php echo URL_ROOT ?>_gestione/css/buttonStyle.css"/>
<link rel="stylesheet" href="<?php echo URL_ROOT ?>css/flatpickr.material_blue.min.css"/>
<link rel="stylesheet" href="<?php echo URL_ROOT ?>_gestione/content/notificationsCenter/css/style.css?version=2.2"/>
<script type="text/javascript" src="<?php echo URL_ROOT ?>js/flatpickr.js"></script>
<script src="<?php URL_HOST ?>/_gestione/content/notificationsCenter/js/init.js?version=2.2"></script>
<?php 

include 'footer.php';

?>