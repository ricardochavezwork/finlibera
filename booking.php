<?php

$page_title = "Sistema di Booking";
$url_section = "_gestione/booking.php";
$sections = array(
    array("/#/", "Richieste"),
    array("/#/", "Prenotazioni confermate"),
    array("/#/", "Storico")
);

include 'header.php';
include_once LIBROOT . '/dompdf/autoload.inc.php';

$input = $_REQUEST["data"];

if(isset($_REQUEST["action"])){
    switch ($_REQUEST["action"]){
        case "autocompleteCity":
            $term = stripslashes($_REQUEST["term"]);
            $results = Cities::autocomplete($term);
            Utils::PrintJson($results, TRUE);
            break;
        case "getCodiceFiscale":
            $res = new stdClass();
            $res->code = null;
            
            $data = urldecode ($input);
            $data = stripslashes($data);
            $data = json_decode($data);
            
            if($data->DataNascita && $data->DataNascita !== "" && $data->Cognome && $data->Cognome !== "" && $data->Nome && $data->Nome !== "" && $data->Sesso && $data->Sesso !== "none" && $data->LuogoNascita && intval($data->LuogoNascita) > 0){
                $dataNascita = new DateTime($data->DataNascita);
                $luogoN = new Cities($data->LuogoNascita);
                $inq = new CodiceFiscale();
                $inq->setDateSeparator("-");
                $codice = $inq->calcola($data->Nome, $data->Cognome, $dataNascita->format('d-m-Y'), $data->Sesso, $luogoN->city_code_land);

                if($codice){
                    $res->code = $codice;
                }
            }
            
            Utils::PrintJson($res, true);
            break;
    }
}

?>
<link rel="stylesheet" href="<?php echo URL_ROOT ?>_gestione/css/togglePanel.css<?php echo $mobileV_css ?>"/>
<link rel="stylesheet" href="<?php echo URL_ROOT ?>_gestione/content/booking/css/style.css?version=2.1"/>
<script src="<?php URL_HOST ?>/_gestione/content/booking/js/init.js?version=1.3"></script>
<script src="<?php URL_HOST ?>/_gestione/content/booking/js/booking_request.js?version=1.3"></script>
<script src="<?php URL_HOST ?>/_gestione/content/booking/js/single_booking.js?version=1.9"></script>
<script src="<?php URL_HOST ?>/_gestione/content/booking/js/booking_confirmed.js?version=1.3"></script>
<script src="<?php URL_HOST ?>/_gestione/content/booking/js/booking_history.js?version=1.3"></script>
<?php 

include 'footer.php';

?>