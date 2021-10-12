<?php

include_once 'common.php';

$input = $_REQUEST["data"];

//TODO : Check privileges

if(isset($_REQUEST["action"])){
    switch ($_REQUEST["action"]){
        case "loadRelationship":
            $res = new stdClass();
            /*$res->Success = false;*/
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            if(intval($decode->Id) > 0){
                $res->Data = Intestatario::LoadRelationship($decode->Id);
            }else{
                $res->Data = null;
            }

            Utils::PrintJson($res, true);
            break;
        case "saveRelationship":
            $res = new stdClass();
            $res->success = false;
            $res->Intestatario = null;
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $decode = Utils::objectToObject($decode, Intestatario);
            $decode->Linking();
            if($input){
                $res = $decode->SaveRelationship();
                
                if($res->Id && $res->Id > 0){
                    $res->success = true;
                    $res->Intestatario = Intestatario::LoadRelationship($res->Id);
                }
                
                
            }

            Utils::PrintJson($res, true);
            break;
        case "search":
            $res = new stdClass();
            $res->Success = false;
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $filtro = ($decode->FiltroIntestatario ? $decode->FiltroIntestatario : null);
            $pagination = ($filtro->Pagination ? $filtro->Pagination : null);
            //Utils::PrintJson($pagination, true);
            $page = ($pagination->CurrentPage ? $pagination->CurrentPage : 1);
            $limit = ($pagination->LimitRows ? $pagination->LimitRows : 100);
            $offset = Utils::GetPageOffset($page, $limit);
            $count = 0;
            $order = "";
            $res->Data = Intestatario::Search($filtro, $order, $limit, $offset, $count);
            $res->TotalPages = Utils::GetPagesCount($count, $limit);
            $res->TotalRows = $count;

            Utils::PrintJson($res, true);
            break;
        case "loadGiustificativi":
            $res = new stdClass();
            $res->Success = false;
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $filtro = ($decode->FiltroIntestatario ? $decode->FiltroIntestatario : null);
            $pagination = ($filtro->Pagination ? $filtro->Pagination : null);
            $page = ($pagination->CurrentPage ? $pagination->CurrentPage : 1);
            $limit = ($pagination->LimitRows ? $pagination->LimitRows : 2000);
            $offset = Utils::GetPageOffset($page, $limit);
            $count = 0;
            $order = "";
            $res->Data = array();
            $intestatario = ($decode->Intestatario ? Utils::objectToObject($decode->Intestatario, Intestatario) : null);
            $intestatario->Intestatario = null;
            if ($intestatario) {
              $res->Data = $intestatario->LoadGiustificativi($filtro, $order, $limit, $offset, $count, false);
            }

            $res->TotalPages = Utils::GetPagesCount($count, $limit);
            $res->TotalRows = $count;

            Utils::PrintJson($res, true);
            break;
        case "LoadInsByInquilino" :
            $res = new stdClass();
            $res->Data = array();
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $input = $decode;
            $inquilino = $input->Inquilino;

            if(intval($inquilino->Id) > 0){
                $data = Inquilino_Stanza::Load(null, $inquilino->Id);
                if(count($data) > 0){
                    foreach ($data as $key => $value) {
                        $data[$key]->setStanza();
                    }
                    $res->Data = $data;
                }
            }
            
            Utils::PrintJson($res, true);
            break;
        case "checkCodiceFiscaleExists":
            $res = new stdClass();
            $res->Count = 0;
            
            $data = urldecode ($input);
            $data = stripslashes($data);
            $data = json_decode($data);
            
            $tenant = $data->Inquilino;
            
            if($tenant->CodiceFiscale && $tenant->CodiceFiscale !== ""){
                $res->Count = Inquilino::checkCodiceFiscaleExists($tenant->CodiceFiscale);
            }
            
            Utils::PrintJson($res, true);
            break;
        /* TODO: Test */
        /* NOTE: Il DeleteRelationship non esiste, viene fatto direttamente dal oggetto Cliente/Fornitore */
        /*case "delete":
            $res = new stdClass();
            $res->Success = false;
            $input = json_decode($input);
            if(intval($input->Id) > 0){
                $res->Success = $input->Delete();
            }

            Utils::PrintJson($res, true);
            break;*/

    }
}
