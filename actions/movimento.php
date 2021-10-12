<?php

include_once 'common.php';

$input = $_REQUEST["data"];

//TODO : Check privileges

if(isset($_REQUEST["action"])){
    switch ($_REQUEST["action"]){
        case "load":
            $res = new stdClass();
            $res->Success = false;
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $input = $decode;
            if(intval($input->Id) > 0){
                $res->Data = new Movimento($input->Id);
                if($res->Data){
                    $res->Data->LoadRelationship();
                }
            }else{
                $res->Data = null;
            }

            Utils::PrintJson($res, true);
            break;
        case "loadMovimenti":
            $res = new stdClass();
            $res->Success = false;
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $input = $decode;
            $movimento = ($input->Movimento ? $input->Movimento : null);
            $filtro = ($input->FiltroMovimento ? $input->FiltroMovimento : null);
            $pagination = ($filtro->Pagination ? $filtro->Pagination : null);
            $page = ($pagination->CurrentPage ? $pagination->CurrentPage : 1);
            $limit = ($pagination->LimitRows ? $pagination->LimitRows : 100);
            $offset = Utils::GetPageOffset($page, $limit);
            $count = 0;
            $order = " DataOperazione DESC";
            $res->Data = Movimento::Load($order, $limit, $offset, $count, FALSE);
            $res->TotalPages = Utils::GetPagesCount($count, $limit);
            $res->TotalRows = $count;

            Utils::PrintJson($res, true);
            break;
        case "loadMovimentiRegistrati":
            $res = new stdClass();
            $res->Success = false;
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $input = $decode;
            $movimento = ($input->Movimento ? $input->Movimento : null);
            $filtro = ($input->FiltroMovimento ? $input->FiltroMovimento : null);
            $pagination = ($filtro->Pagination ? $filtro->Pagination : null);
            $page = ($pagination->CurrentPage ? $pagination->CurrentPage : 1);
            $limit = ($pagination->LimitRows ? $pagination->LimitRows : 100);
            $offset = Utils::GetPageOffset($page, $limit);
            $count = 0;
            $order = " DataOperazione DESC";
            $res->Data = Movimento::LoadRecorded($order, $limit, $offset, $count, FALSE);
            $res->TotalPages = Utils::GetPagesCount($count, $limit);
            $res->TotalRows = $count;

            Utils::PrintJson($res, true);
            break;
        case "loadSpecs":
            $res = new stdClass();
            /*$res->Success = false;*/
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $input = $decode;
            if(intval($input->Id) > 0){
                $res->Data = Movimento_Intestatario::LoadRelationship($input->Id);
            }else{
                $res->Data = null;
            }

            Utils::PrintJson($res, true);
            break;
        case "search":
            $res = new stdClass();
            $res->Success = false;
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $input = $decode;
            $movimento = ($input->Movimento ? $input->Movimento : null);
            $filtro = ($input->FiltroMovimento ? $input->FiltroMovimento : null);
            $pagination = ($filtro->Pagination ? $filtro->Pagination : null);
            $page = ($pagination->CurrentPage ? $pagination->CurrentPage : 1);
            $limit = ($pagination->LimitRows ? $pagination->LimitRows : 100);
            $offset = Utils::GetPageOffset($page, $limit);
            $count = 0;
            $order = " DataOperazione DESC";
            $res->Data = Movimento::Search($filtro, $order, $limit, $offset, $count);
            //$res->Data = Movimento::Load($order, $limit, $offset, $count, FALSE);
            $res->TotalPages = Utils::GetPagesCount($count, $limit);
            $res->TotalRows = $count;

            Utils::PrintJson($res, true);
            break;
        case "searchOnRecorded":
            $res = new stdClass();
            $res->Success = false;
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $input = $decode;
            $movimento = ($input->Movimento ? $input->Movimento : null);
            $filtro = ($input->FiltroMovimento ? $input->FiltroMovimento : null);
            $pagination = ($filtro->Pagination ? $filtro->Pagination : null);
            $page = ($pagination->CurrentPage ? $pagination->CurrentPage : 1);
            $limit = ($pagination->LimitRows ? $pagination->LimitRows : 100);
            $offset = Utils::GetPageOffset($page, $limit);
            $count = 0;
            $order = " DataOperazione DESC";
            $res->Data = Movimento::SearchOnRecorded($filtro, $order, $limit, $offset, $count);
            //$res->Data = Movimento::Load($order, $limit, $offset, $count, FALSE);
            $res->TotalPages = Utils::GetPagesCount($count, $limit);
            $res->TotalRows = $count;

            Utils::PrintJson($res, true);
            break;
        case "save":
            $res = new stdClass();
            $res->Success = false;
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $movimento = Utils::objectToObject($decode, Movimento);
            $movimento->Linking();
            $movimentoDettagli = Movimento::setMovimentoDettagli($movimento->Id);
            $errors = 0;

            if ($movimento->Giustificativi && count($movimento->Giustificativi) > 0) {
              $giustificativi = $movimento->Giustificativi;
              foreach ($giustificativi as $key => $value) {
                $giustificativo = $giustificativi[$key];
                if (!$giustificativo->MovimentoDettagli) {
                  $giustificativo->MovimentoDettagli = $movimentoDettagli;
                }
                $giustificativo->SaveRelationship();
              }
            }

            if ($errors === 0) {
              $res->Success = true;
            }

            Utils::PrintJson($res, true);
            break;
        case "saveMovimentoDettagli":
            $res = new stdClass();
            $res->success = false;
            $counter = 0;
            $test = array();
            
            $decode = urldecode($input);
            $decode = json_decode($decode);
            
            $movimento_dettagli = Utils::objectToObject($decode, MovimentoDettagli);
            if(!$movimento_dettagli->Save()){
                $counter++;
                $test[] = 4;
            }
            
            if($counter === 0){
                $res->data = $movimento_dettagli;
                $res->success = true;
            }
            
            Utils::PrintJson($res, true);
            break;
    }
}
