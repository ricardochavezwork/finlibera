<?php

$page_title = "Gestionale";
$url_section = "_gestione/";
$sections = array(
    array("/#/", "Pagina iniziale")
);

include 'header.php';

if (isset($_REQUEST["action"])) {
    switch ($_REQUEST["action"]) {
        case "static_page":
            //Utils::StaticPage("http://" . $_SERVER["SERVER_NAME"] . URL_ROOT . "index_B.php?static_page=1", UPLOAD . "static_index.html");
            Utils::StaticPage("http://" . $_SERVER["SERVER_NAME"] . URL_ROOT . "index.php?static_page=1", UPLOAD . "static_index.html");
            Utils::StaticPage("http://" . $_SERVER["SERVER_NAME"] . URL_ROOT . "index.php?static_page=1&force_mobile=1", UPLOAD . "static_index_mobile.html");
            //Utils::RedirectToSelf(FALSE);
            Utils::PrintJson(true, true);
            break;
    }
}

$staticHomepage = FALSE;
$path = UPLOAD . "static_index.html";
$i = strrpos($path, ".");
if ($i !== FALSE) {
    $basename = substr($path, 0, $i);
    $ext = substr($path, $i);
    $filesHomepage = glob($basename . "_it_*" . $ext);
    if ($filesHomepage && is_array($filesHomepage)) {
        foreach ($filesHomepage as $filename) {
            $time = filemtime($filename);
            if (!$staticHomepage || $time > $staticHomepage) {
                $staticHomepage = $time;
            }
        }
    }
}

if ($staticHomepage){
    $sp_date = new DateTime();
    $sp_date->setTimestamp($staticHomepage);
    ?>

<script>
    var sp_lastUpdate = new Date("<?php echo $sp_date->format('Y-m-d H:i'); ?>".replace(/\s/, 'T'));
</script>
    <?php
}

?>

<link rel="stylesheet" href="<?php echo URL_ROOT ?>_gestione/content/index/css/style.css?version=1.0"/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js"></script>
<script src="<?php URL_HOST ?>/_gestione/content/index/js/init.js?version=1.2"></script>

<?php 

include 'footer.php';

?>