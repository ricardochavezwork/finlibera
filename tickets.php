<?php

$page_title = "Tickets";
$url_section = "_gestione/tickets";
$sections = array(
    array("/#/main/", "Ticket")
);

include 'header.php';

$input = $_REQUEST["data"];

if(isset($_REQUEST["action"])){
    switch ($_REQUEST["action"]) {
        case "search":
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
                $order = ($pagination->OrderBy ? $pagination->OrderBy : "DESC");
                $res->Data = Ticket::Search($filtro, $order, $limit, $offset, $count);
                $res->TotalPages = Utils::GetPagesCount($count, $limit);
                $res->TotalRows = $count;
            }

            Utils::PrintJson($res, true);
            break;
        case "search-inquilini":
            $res = new stdClass();
            $res->Success = false;
            $res->Data = array();
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $filtro = $decode;

            $keywords = $filtro->keywords ? $filtro->keywords : null;
            $dataRichiesta = $filtro->dataRichiesta ? $filtro->dataRichiesta : null;
            $filtro->checkInLimit = 9;
            $limit = null;

            if($keywords){
                $count = 0;
                $order = "";
                $res->Data = Ticket::SearchByInquilino($filtro, $order, $limit, $count);
                $res->TotalRows = $count;
            }

            Utils::PrintJson($res, true);
            break;
        case "search-apt":
            $res = new stdClass();
            $res->Success = false;
            $res->Data = array();
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $filtro = $decode;

            $keywords = $filtro->keywords ? $filtro->keywords : null;
            $limit = null;

            if($keywords){
                $count = 0;
                $order = "";
                $res->Data = Ticket::SearchByApt($filtro, $order, $limit, $count);
                $res->TotalRows = $count;
            }

            Utils::PrintJson($res, true);
            break;
        case "search-room":
            $res = new stdClass();
            $res->Success = false;
            $res->Data = array();
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $filtro = $decode;

            $keywords = $filtro->keywords ? $filtro->keywords : null;
            $limit = null;

            if($keywords){
                $count = 0;
                $order = "";
                $res->Data = Ticket::SearchByRoom($filtro, $order, $limit, $count);
                $res->TotalRows = $count;
            }

            Utils::PrintJson($res, true);
            break;
        case "search-fornitori":
            $res = new stdClass();
            $res->Success = false;
            $res->Data = array();
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $filtro = $decode;

            $keywords = $filtro->keywords ? $filtro->keywords : null;
            $limit = null;

            if($keywords){
                $count = 0;
                $order = "";
                $res->Data = Ticket::SearchFornitore($filtro, $order, $limit, $count);
                $res->TotalRows = $count;
            }

            Utils::PrintJson($res, true);
            break;
        case "load-ticket":
            $res = new stdClass();
            $res->data = null;

            $data = urldecode ($input);
            $data = stripslashes($Database->Escape($data));
            $data = json_decode($data);

            $tmp = Utils::objectToObject($data, Ticket);

            if(intval($tmp) > 0){
                $ticket = new Ticket($tmp->Id);
                $res->data = $ticket;
            }

            Utils::PrintJson($res, true);
            break;
        case "load-fornitore":
            global $Database;
            $res = new stdClass();
            $res->data = null;

            $data = urldecode ($input);
            $data = stripslashes($Database->Escape($data));
            $data = json_decode($data);

            $ticket = Utils::objectToObject($data, Ticket);
            if($ticket->IdFornitore && intval($ticket->IdFornitore) > 0){
                $fornitore = new Fornitore($ticket->IdFornitore);
                $item = new stdClass();
                $item->Id = $fornitore->Id;
                $item->nominativo = $fornitore->getNominativo();
                $res->data = $item;
            }
            
            Utils::PrintJson($res, true);
            break;
        case "load-assigns":
            global $Database;
            $res = new stdClass();
            $res->data = null;

            $data = urldecode ($input);
            $data = stripslashes($Database->Escape($data));
            $data = json_decode($data);

            $ticket = Utils::objectToObject($data, Ticket);

            if($ticket->Id && intval($ticket->Id) > 0){
                $assigns = TicketAssegnazione::LoadArrayByIdTicket($ticket->Id);
                $res->data = $assigns;
            }
            
            Utils::PrintJson($res, true);
            break;
        case "load-registro-rows":
            global $Database;
            $res = new stdClass();
            $res->data = null;
            $res->hasServizi = false;

            $data = urldecode ($input);
            $data = stripslashes($Database->Escape($data));
            $data = json_decode($data);

            $filtro = $data;
            $idTicket = $filtro->Id;
            if($idTicket && intval($idTicket) > 0){
                $registro = RegistroTicket::LoadByIdTicket($idTicket);
                $res->data = $registro;
                $hasServizi = RegistroTicket::hasServizi($idTicket);
                $res->hasServizi = $hasServizi;
            }
            
            Utils::PrintJson($res, true);
            break;
        case "save-ticket":
            global $Database;
            $res = new stdClass();
            $res->success = false;
            $res->data = null;

            $data = urldecode ($input);
            $data = stripslashes($Database->Escape($data));
            $data = json_decode($data);

            $ticket = Utils::objectToObject($data, Ticket);
            $ticket->IdAdminAccount = $AdminLogged->Id;
            if($ticket->Save()){
                $res->success = true;
                $res->data = $ticket;
            }

            Utils::PrintJson($res, true);
            break;
        case "save-registro":
            global $Database;
            $res = new stdClass();
            $res->success = false;
            $res->data = null;

            $data = urldecode ($input);
            $data = stripslashes($Database->Escape($data));
            $data = json_decode($data);

            $registro = Utils::objectToObject($data, RegistroTicket);

            if($registro->Save()){
                $res->success = true;
                $res->data = $registro;
            }

            Utils::PrintJson($res, true);
            break;
        case "delete-registro":
            global $Database;
            $res = new stdClass();
            $res->success = false;
            $res->data = null;

            $data = urldecode ($input);
            $data = stripslashes($Database->Escape($data));
            $data = json_decode($data);

            $registro = Utils::objectToObject($data, RegistroTicket);

            if($registro->Delete()){
                $res->success = true;
            }

            Utils::PrintJson($res, true);
            break;
        case "toggle-assegnazione":
            global $Database;
            $res = new stdClass();
            $res->success = false;
            $res->data = null;

            $data = urldecode ($input);
            $data = stripslashes($Database->Escape($data));
            $data = json_decode($data);

            $assign = Utils::objectToObject($data, TicketAssegnazione);
            if(intval($assign->Id) > 0){
                if($assign->Delete()){
                    $res->success = true;
                }
            }else{
                if($assign->Save()){
                    $res->success = true;
                    $res->data = $assign;
                }
            }
            
            Utils::PrintJson($res, true);
            break;
        case "getPropertyName":
            global $Database;
            $res = new stdClass();
            $res->success = false;
            $res->data = 'Non presente';

            $data = urldecode ($input);
            $data = stripslashes($Database->Escape($data));
            $data = json_decode($data);

            $ticket = Utils::objectToObject($data, Ticket);
            if($ticket->Id && intval($ticket->Id) > 0){
                $assigns = TicketAssegnazione::LoadArrayByIdTicket($ticket->Id);
                $tot = count($assigns);
                if($tot > 0){
                    $res->data = Ticket::getPropertyReference($assigns);
                }
            }
            
            Utils::PrintJson($res, true);
            break;
        case "genera-servizi":
            global $Database;
            $res = new stdClass();
            $res->success = false;

            $data = urldecode ($input);
            $data = stripslashes($Database->Escape($data));
            $data = json_decode($data);

            $ticket = Utils::objectToObject($data, Ticket);

            if($ticket->Id && intval($ticket->Id) > 0){
                $res->success = RegistroTicket::generaServizi($ticket->Id);
            }

            Utils::PrintJson($res, true);         
            break;
    }
}

?>

<link rel="stylesheet" href="<?php URL_ROOT ?>/_gestione/content/tickets/css/style.css<?php echo $mobileV_css ?>"/>
<script src="<?php URL_HOST ?>/_gestione/content/tickets/js/tickets.js?version=1.1"></script>
<script src="<?php URL_HOST ?>/_gestione/content/tickets/js/init.js?version=1.1"></script>

<?php

include 'footer.php';

?>