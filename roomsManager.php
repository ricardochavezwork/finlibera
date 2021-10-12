<?php

include 'common.php';
include './invoice_common/invoice_functions.php';

$id = $_GET["Id"];
$data = $_GET["data"];

checkPrivilege(PRIV_STANZE_VIEW);

if(isset($_REQUEST["action"])){
    switch ($_REQUEST["action"]){
        
        case "load":
            $response = new stdClass();
            $response->success = true;
            $response->Load = array();
            $page = (isset($_REQUEST["page"]) ? intval($_REQUEST["page"]) : 1);
            $limit = (!isset($_REQUEST["rows"]) ? 0 : intval($_REQUEST["rows"]));
            $offset = Utils::GetPageOffset($page, $limit);
            $count = 0;
            $records = Appartamento_Stanza::LoadSommario(FALSE, $limit, $offset, $count);
            $pages = Utils::GetPagesCount($count, $limit);
            if($records){
                foreach ($records as $key => $row){
                    $records[$key]->Appartamento = new Appartamento($records[$key]->IdAppartamento);
                    $inquilini = Inquilino_Stanza::LoadUltimoInquilino($records[$key]->Id, FALSE);
                    $now = mktime();
                    $inquilino = new Inquilino();
                    $inquilino_stanza = new Inquilino_Stanza();
                    if (count($inquilini) > 0 && /*Utils::GetTimestamp($inquilini[0]->DataInizio) <= $now &&*/ (!$inquilini[0]->DataFine || Utils::GetTimestamp($inquilini[0]->DataFine) > $now)) {
                        $inquilino_stanza = $inquilini[0];
                        $inquilino = new Inquilino($inquilino_stanza->IdInquilino);
                    }
                    
                    $admin = new AdminAccount($inquilino->IdAdmin);
                    if ($admin->Id < 1){
                        $admin = new AdminAccount($records[$key]->IdAdmin);
                    }
                    $records[$key]->Appartamento_Stanza = new Appartamento_Stanza($records[$key]->Id);
                    $records[$key]->Free = ($inquilino->Id < 1 || $inquilino_stanza->DataFine) ? TRUE : FALSE;
                    $records[$key]->IsBooked = $records[$key]->Appartamento_Stanza->isBooked();
                    $records[$key]->PrezzoAttuale = $inquilino_stanza->Id < 1 ? "" : strval($inquilino_stanza->Canone);
                    $records[$key]->Inquilino = $inquilino->Id < 1 ? '[Libera]' : htmlentities(trim($inquilino->Nome . " " . $inquilino->Cognome), ENT_QUOTES, 'UTF-8');
                    $records[$key]->Eta = $inquilino->Id < 1 ? "" : Utils::GetAge($inquilino->DataNascita);
                    $records[$key]->Professione = $inquilino->Id < 1 ? "" : getProfessione($inquilino->Professione);
                    $records[$key]->DataInizio = $inquilino->Id < 1 ? "" : $inquilino_stanza->DataInizio;
                    $records[$key]->DataFine = $inquilino->Id < 1 ? "" : $inquilino_stanza->DataFine;
                    $records[$key]->Admin = htmlentities($admin->Username, ENT_QUOTES, 'UTF-8');
                    
                }
            }
            
            $response->Load = $records;
            Utils::PrintJson(Utils::JqGridTable($response, $count, $page, $pages));
            break;
        case "toogleBooking":
            $response = new stdClass();
            $response->success = false;
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
                        $response->success = $aptStanza->SaveBooking(TRUE, $type);
                    }else{
                        $response->success = $aptStanza->SaveBooking(FALSE);
                    }
                    
                }else{
                    $response->success = $aptStanza->SaveBooking(TRUE, $type);
                }
            }
            
            Utils::PrintJson($response, true);
            break;
        case "loadByIdStanza":
            $response = new stdClass();
            $response->success = true;
            $response->Load = array();
            $page = (isset($_REQUEST["page"]) ? intval($_REQUEST["page"]) : 1);
            $limit = (!isset($_REQUEST["rp"]) ? 0 : intval($_REQUEST["rp"]));
            $offset = Utils::GetPageOffset($page, $limit);
            $count = 0;
            if($id > 0){
                $records = Appartamento_Stanza::LoadSommario(FALSE, $limit, $offset, $count, null, null, $id);
                $pages = Utils::GetPagesCount($count, $limit);
                if($records){
                    foreach ($records as $key => $row){
                        $records[$key]->Appartamento = new Appartamento($records[$key]->IdAppartamento);
                        $inquilini = Inquilino_Stanza::LoadUltimoInquilino($records[$key]->Id, FALSE);
                        $now = mktime();
                        $inquilino = new Inquilino();
                        $inquilino_stanza = new Inquilino_Stanza();
                        if (count($inquilini) > 0 && /*Utils::GetTimestamp($inquilini[0]->DataInizio) <= $now &&*/ (!$inquilini[0]->DataFine || Utils::GetTimestamp($inquilini[0]->DataFine) > $now)) {
                            $inquilino_stanza = $inquilini[0];
                            $inquilino = new Inquilino($inquilino_stanza->IdInquilino);
                        }

                        $admin = new AdminAccount($inquilino->IdAdmin);
                        if ($admin->Id < 1){
                            $admin = new AdminAccount($records[$key]->IdAdmin);
                        }
                        $records[$key]->Appartamento_Stanza = new Appartamento_Stanza($records[$key]->Id);
                        $records[$key]->Free = ($inquilino->Id < 1 || $inquilino_stanza->DataFine) ? TRUE : FALSE;
                        $records[$key]->IsBooked = $records[$key]->Appartamento_Stanza->isBooked();
                        $records[$key]->PrezzoAttuale = $inquilino_stanza->Id < 1 ? "" : strval($inquilino_stanza->Canone);
                        $records[$key]->Inquilino = $inquilino->Id < 1 ? '[Libera]' : htmlentities(trim($inquilino->Nome . " " . $inquilino->Cognome), ENT_QUOTES, 'UTF-8');
                        $records[$key]->Eta = $inquilino->Id < 1 ? "" : Utils::GetAge($inquilino->DataNascita);
                        $records[$key]->Professione = $inquilino->Id < 1 ? "" : getProfessione($inquilino->Professione);
                        $records[$key]->DataInizio = $inquilino->Id < 1 ? "" : $inquilino_stanza->DataInizio;
                        $records[$key]->DataFine = $inquilino->Id < 1 ? "" : $inquilino_stanza->DataFine;
                        $records[$key]->Admin = htmlentities($admin->Username, ENT_QUOTES, 'UTF-8');

                    }
                }

                $response->Load = $records;
            }
            Utils::PrintJson(Utils::JqGridTable($response, $count, $page, $pages));
            break;
        case "loadByIdAppartamento":
            $response = new stdClass();
            $response->success = true;
            $response->Load = array();
            $page = (isset($_REQUEST["page"]) ? intval($_REQUEST["page"]) : 1);
            $limit = (!isset($_REQUEST["rp"]) ? 0 : intval($_REQUEST["rp"]));
            $offset = Utils::GetPageOffset($page, $limit);
            $count = 0;
            if($id > 0){
                $records = Appartamento_Stanza::LoadSommario(FALSE, $limit, $offset, $count, null, $id);
                $pages = Utils::GetPagesCount($count, $limit);
                if($records){
                    foreach ($records as $key => $row){
                        $records[$key]->Appartamento = new Appartamento($records[$key]->IdAppartamento);
                        $inquilini = Inquilino_Stanza::LoadUltimoInquilino($records[$key]->Id, FALSE);
                        $now = mktime();
                        $inquilino = new Inquilino();
                        $inquilino_stanza = new Inquilino_Stanza();
                        if (count($inquilini) > 0 && /*Utils::GetTimestamp($inquilini[0]->DataInizio) <= $now &&*/ (!$inquilini[0]->DataFine || Utils::GetTimestamp($inquilini[0]->DataFine) > $now)) {
                            $inquilino_stanza = $inquilini[0];
                            $inquilino = new Inquilino($inquilino_stanza->IdInquilino);
                        }

                        $admin = new AdminAccount($inquilino->IdAdmin);
                        if ($admin->Id < 1){
                            $admin = new AdminAccount($records[$key]->IdAdmin);
                        }
                        $records[$key]->Appartamento_Stanza = new Appartamento_Stanza($records[$key]->Id);
                        $records[$key]->Free = ($inquilino->Id < 1 || $inquilino_stanza->DataFine) ? TRUE : FALSE;
                        $records[$key]->IsBooked = $records[$key]->Appartamento_Stanza->isBooked();
                        $records[$key]->PrezzoAttuale = $inquilino_stanza->Id < 1 ? "" : strval($inquilino_stanza->Canone);
                        $records[$key]->Inquilino = $inquilino->Id < 1 ? '[Libera]' : htmlentities(trim($inquilino->Nome . " " . $inquilino->Cognome), ENT_QUOTES, 'UTF-8');
                        $records[$key]->Eta = $inquilino->Id < 1 ? "" : Utils::GetAge($inquilino->DataNascita);
                        $records[$key]->Professione = $inquilino->Id < 1 ? "" : getProfessione($inquilino->Professione);
                        $records[$key]->DataInizio = $inquilino->Id < 1 ? "" : $inquilino_stanza->DataInizio;
                        $records[$key]->DataFine = $inquilino->Id < 1 ? "" : $inquilino_stanza->DataFine;
                        $records[$key]->Admin = htmlentities($admin->Username, ENT_QUOTES, 'UTF-8');

                    }
                }

                $response->Load = $records;
            }
            Utils::PrintJson(Utils::JqGridTable($response, $count, $page, $pages));
            break;
    }
}

$smarty->assign("canBook", $AdminLogged->CanAccess(PRIV_STANZE_BOOKING));
$smarty->display('roomsManager.tpl');