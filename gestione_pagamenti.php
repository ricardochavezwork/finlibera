<?php

$page_title = "Controllo Pagamenti";
$url_section = "_gestione/gestione_pagamenti.php";
$sections = array(
    array("/#/controllo-pagamenti/", "Controllo Pagamenti")
);

include 'header.php';
                
?>
<link rel="stylesheet" href="<?php echo URL_ROOT ?>_gestione/css/togglePanel.css<?php echo $mobileV_css ?>"/>
<link rel="stylesheet" href="<?php echo URL_ROOT ?>_gestione/content/controllo_pagamenti/css/style.css?version=2.1"/>
<link rel="stylesheet" href="<?php echo URL_ROOT ?>lib/chartist-js/chartist.min.css"/>
<script src='<?php echo URL_ROOT ?>lib/chartist-js/chartist.min.js'></script>
<script src="<?php URL_HOST ?>/_gestione/content/controllo_pagamenti/js/controllo_pagamenti.js?version=1.4"></script>
<script src="<?php URL_HOST ?>/_gestione/content/controllo_pagamenti/js/init.js?version=1.2"></script>
<?php 

include 'footer.php';

?>