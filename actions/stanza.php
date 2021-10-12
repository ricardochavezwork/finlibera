<?php


include_once 'common.php';

$input = $_REQUEST["data"];

if(isset($_REQUEST["action"])){
    switch ($_REQUEST["action"]){
        case "getAvailableRooms":
            $res = new stdClass();
            
            $data = urldecode ($input);
            $data = stripslashes($data);
            $data = json_decode($data);
            
            //Utils::PrintJson($data, true);
            
            $filter = ($data->filters ? $data->filters : null);
            $page = ($filter->page ? $filter->page : 1);
            $limit = ($filter->limit ? $filter->limit : 100);
            $order = ($filter->order ? $filter->order : null);
            $offset = Utils::GetPageOffset($page, $limit);
            $count = 0;
            
            $term = $data->term;
            
            $res->data = Appartamento_Stanza::getAvailableRooms($term, $order, $limit, $offset, $count);
            
            
            Utils::PrintJson($res, true);
            break;
        case "getCopertinaUrl":
            $res = new stdClass();
            global $Database;
            
            $data = urldecode ($input);
            $data = stripslashes($Database->Escape($data));
            $data = json_decode($data);
            
            $IdStanza = $data->Id;
            
            $res->data = Appartamento_Stanza::getCopertinaUrl($IdStanza);
            
            
            Utils::PrintJson($res, true);
            break;
        case "toogleBooking":
            $res = new stdClass();
            $res->success = false;
            global $Database;
            
            $data = urldecode ($input);
            $data = stripslashes($Database->Escape($data));
            $data = json_decode($data);
            
            $id = $data->Id;
            $type = $data->BookType;
            
            if($id > 0){
                $aptStanza = new Appartamento_Stanza($id);
                /*
                 * Se' la data c'è ed è attivo allora cancella la prenotazione. Altrimenti se la data c'è ma non è attivo, allora sovrascrivi.
                 */
                if($aptStanza->isBooked()){
                    
                    if(intval($aptStanza->BookType) > 0 && intval($type) > 0){
                        $res->success = $aptStanza->SaveBooking(TRUE, $type);
                    }else{
                        $res->success = $aptStanza->SaveBooking(FALSE);
                    }
                    
                }else{
                    $res->success = $aptStanza->SaveBooking(TRUE, $type);
                }
            }
            
            Utils::PrintJson($res, true);
            break;
    }
}