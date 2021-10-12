<?php

$page_title = "Clienti";
$url_section = "_gestione/clients";
$sections = array(
    array("/#/", "Elenco Clienti")
);

include 'header.php';

$input = $_REQUEST["data"];

if(isset($_REQUEST["action"])){
    switch ($_REQUEST["action"]){
        case "search" :
            $res = new stdClass();
            $res->Success = false;
            $res->Data = array();
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $input = $decode;

            $filtro = $input->Filtro ? $input->Filtro : null;

            if($filtro){
                $pagination = ($filtro->Pagination ? $filtro->Pagination : null);
                $page = ($pagination->CurrentPage ? $pagination->CurrentPage : 1);
                $limit = ($pagination->LimitRows ? $pagination->LimitRows : 100);
                $offset = Utils::GetPageOffset($page, $limit);
                $count = 0;
                $order = ($pagination->OrderBy ? $pagination->OrderBy : "Id DESC");
                $res->Data = Cliente::Search_ClientsManager($filtro, $order, $limit, $offset, $count);
                $res->TotalPages = Utils::GetPagesCount($count, $limit);
                $res->TotalRows = $count;
            }

            Utils::PrintJson($res, true);
            break;
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


<link rel="stylesheet" href="<?php echo URL_ROOT ?>_gestione/content/clients/css/style.css?version=2.1"/>
<script src="<?php URL_HOST ?>/_gestione/content/booking/js/single_booking.js?version=1.8"></script>
<script src="<?php URL_HOST ?>/_gestione/content/clients/js/sec_clients.js?v=1.5"></script>
<script src="<?php URL_HOST ?>/_gestione/content/clients/js/init.js?v=1.2"></script>
<script src="<?php URL_HOST ?>/_gestione/content/booking/js/booking_request.js?version=1.2"></script>
<input type="text" id="clipboard">
<?php 

include 'footer.php';

?>