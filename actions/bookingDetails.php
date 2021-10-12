<?php

include_once 'common.php';
$input = $_REQUEST["data"];

if(isset($_REQUEST["action"])){
    switch ($_REQUEST["action"]){
        case "saveRelationship":
            $res = new stdClass();
            global $Database;
            $res->success = false;
            
            $data = urldecode ($input);
            $data = stripslashes($Database->Escape($data));
            $data = json_decode($data);
            
            $bookingDetails = Utils::objectToObject($data, Booking_Details);
            $bookingDetails->Linking();
            
            $resSave = $bookingDetails->SaveRelationship();
            //$resSave->success = true;
            
            if($resSave->success && intval($bookingDetails->Id) > 0){
                $res->success = true;
                $res->Data = new Booking_Details($bookingDetails->Id);
                $res->Data->setPersonalInfo();
                $res->Data->setStanza();
                $res->Data->setIntestazione();
                $res->Data->setPrevIns();
                $res->Data->Stanza->setAvailability();
            }else{
                $res->test = $resSave->test;
            }
            
            Utils::PrintJson($res, true);
            break;
        case "sendContract":
            $res = new stdClass();
            $res->success = false;
            global $Database;
            
            $data = urldecode ($input);
            $data = stripslashes($Database->Escape($data));
            $data = json_decode($data);
            
            $prevBookingDetails = Utils::objectToObject($data, Booking_Details);
            $prevBookingDetails->Linking();
            
            $bookingDetails = new Booking_Details($prevBookingDetails->Id);
            $bookingDetails->setPersonalInfo();
            $bookingDetails->setIntestazione();
            
            $lease = new Booking_ContractDocs($bookingDetails->IdLease);
            $stanza = new Appartamento_Stanza($bookingDetails->IdStanza);
            $apt = new Appartamento($stanza->IdAppartamento);
            
            //$res->success = true;
            
            if($bookingDetails->SendContract($lease, $stanza, $apt)){
                $res->success = true;
            }
            
            Utils::PrintJson($res, true);
            break;
        case "contractPreview":
            $res = new stdClass();
            $res->success = false;
            global $Database;
            
            $data = urldecode ($input);
            $data = stripslashes($Database->Escape($data));
            $data = json_decode($data);
            
            $prevBookingDetails = Utils::objectToObject($data, Booking_Details);
            $prevBookingDetails->Linking();
            
            $bookingDetails = new Booking_Details($prevBookingDetails->Id);
            $bookingDetails->setPersonalInfo();
            $bookingDetails->setIntestazione();
            
            $lease = new Booking_ContractDocs($bookingDetails->IdLease);
            $stanza = new Appartamento_Stanza($bookingDetails->IdStanza);
            $apt = new Appartamento($stanza->IdAppartamento);
            
            $res->pdf = array();
            $res->email = null;
            
            if($bookingDetails->doppioTuristico()){
                $first = clone $bookingDetails;
                $second = clone $bookingDetails;
                
                $startDateContract = new DateTime($bookingDetails->DataInizio);
                $startDateContract->add(new DateInterval('P29D'));
                
                $first->DataFine = $startDateContract->format('Y-m-d');
                $startDateContract->add(new DateInterval('P1D'));
                $second->DataInizio = $startDateContract->format('Y-m-d');
                $second->Cauzione = 0;
                
                $pdfString_first = $first->getHTMLStringContract($lease, $stanza, $apt);
                $pdfString_second = $second->getHTMLStringContract($lease, $stanza, $apt);
                $emalContent = $bookingDetails->getHTLMStringEmail($lease, $stanza, $apt);
                
                if($pdfString_first && $pdfString_second && $emalContent){
                    $res->success = true;
                    $res->pdf[] = $pdfString_first;
                    $res->pdf[] = $pdfString_second;
                    $res->email = $emalContent;
                }
                
            }else{
                $pdfString = $bookingDetails->getHTMLStringContract($lease, $stanza, $apt);
                $emalContent = $bookingDetails->getHTLMStringEmail($lease, $stanza, $apt);
                
                if($pdfString && $emalContent){
                    $res->success = true;
                    $res->pdf[] = $pdfString;
                    $res->email = $emalContent;
                }
            }
            
            Utils::PrintJson($res, true);
            break;
        case "setDeclined":
            $res = new stdClass();
            $res->success = false;
            global $Database;
            
            $data = urldecode ($input);
            $data = stripslashes($Database->Escape($data));
            $data = json_decode($data);
            
            $prevBookingDetails = Utils::objectToObject($data, Booking_Details);
            $prevBookingDetails->Linking();
            
            $bookingDetails = new Booking_Details($prevBookingDetails->Id);
            if($bookingDetails->setStatus(BOOKING_STATO_RIFIUTATO)){
                $res->success = true;
            }
            
            Utils::PrintJson($res, true);
            break;
        case "setCancelled":
            $res = new stdClass();
            $res->success = false;
            global $Database;
            
            $data = urldecode ($input);
            $data = stripslashes($Database->Escape($data));
            $data = json_decode($data);
            
            $prevBookingDetails = Utils::objectToObject($data, Booking_Details);
            $prevBookingDetails->Linking();
            
            $bookingDetails = new Booking_Details($prevBookingDetails->Id);
            if($bookingDetails->setStatus(BOOKING_STATO_ELIMINATO)){
                $res->success = true;
            }
            
            Utils::PrintJson($res, true);
            break;
        case "setConfirmed":
            $res = new stdClass();
            $res->success = false;
            global $Database;
            
            $data = urldecode ($input);
            $data = stripslashes($Database->Escape($data));
            $data = json_decode($data);
            
            $prevBookingDetails = Utils::objectToObject($data, Booking_Details);
            $prevBookingDetails->Linking();
            
            $bookingDetails = new Booking_Details($prevBookingDetails->Id);
            $bookingDetails->setPersonalInfo();
            $bookingDetails->setPrevIns();
            $bookingDetails->setIntestazione();
            if($bookingDetails->generateInquilino()){
                if($bookingDetails->setStatus(BOOKING_STATO_CONFERMATO)){
                    $res->success = true;
                }
            }
            
            Utils::PrintJson($res, true);
            break;
        case "loadActives":
            $res = new stdClass();
            $res->Success = false;
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $input = $decode;
            $booking = ($input->Booking ? $input->Booking : null);
            $filtro = ($input->Filtro ? $input->Filtro : null);
            $pagination = ($filtro->Pagination ? $filtro->Pagination : null);
            $page = ($pagination->CurrentPage ? $pagination->CurrentPage : 1);
            $limit = ($pagination->LimitRows ? $pagination->LimitRows : 100);
            $offset = Utils::GetPageOffset($page, $limit);
            $count = 0;
            $order = ($pagination->OrderBy ? $pagination->OrderBy : " DataRegistrazione DESC");
            $res->Data = Booking_Details::loadActives($filtro, $order, $limit, $offset, $count);
            $res->TotalPages = Utils::GetPagesCount($count, $limit);
            $res->TotalRows = $count;

            Utils::PrintJson($res, true);
            break;
        case "loadConfirmed":
            $res = new stdClass();
            $res->Success = false;
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $input = $decode;
            $booking = ($input->Booking ? $input->Booking : null);
            $filtro = ($input->Filtro ? $input->Filtro : null);
            $pagination = ($filtro->Pagination ? $filtro->Pagination : null);
            $page = ($pagination->CurrentPage ? $pagination->CurrentPage : 1);
            $limit = ($pagination->LimitRows ? $pagination->LimitRows : 100);
            $offset = Utils::GetPageOffset($page, $limit);
            $count = 0;
            $order = ($pagination->OrderBy ? $pagination->OrderBy : " DataRegistrazione DESC");
            $res->Data = Booking_Details::loadConfirmed($filtro, $order, $limit, $offset, $count);
            $res->TotalPages = Utils::GetPagesCount($count, $limit);
            $res->TotalRows = $count;

            Utils::PrintJson($res, true);
            break;
        case "loadExpired":
            $res = new stdClass();
            $res->Success = false;
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $input = $decode;
            $booking = ($input->Booking ? $input->Booking : null);
            $filtro = ($input->Filtro ? $input->Filtro : null);
            $pagination = ($filtro->Pagination ? $filtro->Pagination : null);
            $page = ($pagination->CurrentPage ? $pagination->CurrentPage : 1);
            $limit = ($pagination->LimitRows ? $pagination->LimitRows : 100);
            $offset = Utils::GetPageOffset($page, $limit);
            $count = 0;
            $order = ($pagination->OrderBy ? $pagination->OrderBy : " DataRegistrazione DESC");
            $res->Data = Booking_Details::loadExpired($filtro, $order, $limit, $offset, $count);
            $res->TotalPages = Utils::GetPagesCount($count, $limit);
            $res->TotalRows = $count;

            Utils::PrintJson($res, true);
            break;
        case "loadDeclined":
            $res = new stdClass();
            $res->Success = false;
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $input = $decode;
            $booking = ($input->Booking ? $input->Booking : null);
            $filtro = ($input->Filtro ? $input->Filtro : null);
            $pagination = ($filtro->Pagination ? $filtro->Pagination : null);
            $page = ($pagination->CurrentPage ? $pagination->CurrentPage : 1);
            $limit = ($pagination->LimitRows ? $pagination->LimitRows : 100);
            $offset = Utils::GetPageOffset($page, $limit);
            $count = 0;
            $order = ($pagination->OrderBy ? $pagination->OrderBy : " DataRegistrazione DESC");
            $res->Data = Booking_Details::loadDeclined($filtro, $order, $limit, $offset, $count);
            $res->TotalPages = Utils::GetPagesCount($count, $limit);
            $res->TotalRows = $count;

            Utils::PrintJson($res, true);
            break;
        case "loadCancelled":
            $res = new stdClass();
            $res->Success = false;
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $input = $decode;
            $booking = ($input->Booking ? $input->Booking : null);
            $filtro = ($input->Filtro ? $input->Filtro : null);
            $pagination = ($filtro->Pagination ? $filtro->Pagination : null);
            $page = ($pagination->CurrentPage ? $pagination->CurrentPage : 1);
            $limit = ($pagination->LimitRows ? $pagination->LimitRows : 100);
            $offset = Utils::GetPageOffset($page, $limit);
            $count = 0;
            $order = ($pagination->OrderBy ? $pagination->OrderBy : " DataRegistrazione DESC");
            $res->Data = Booking_Details::loadCancelled($filtro, $order, $limit, $offset, $count);
            $res->TotalPages = Utils::GetPagesCount($count, $limit);
            $res->TotalRows = $count;

            Utils::PrintJson($res, true);
            break;
        case "getDefaultContract":
            $res = new stdClass();
            global $Database;
            
            $data = urldecode ($input);
            $data = stripslashes($Database->Escape($data));
            $data = json_decode($data);
            
            $booking = Utils::objectToObject($data, Booking_Details);
            $booking->Linking();
            
            $contractType = $booking->getDefaultContract();
            $res->IdLease = $contractType;
            
            Utils::PrintJson($res, true);
            break;
        case "getDiscountRent":
            $res = new stdClass();
            $res->success = false;
            $res->data = null;
            global $Database;
            
            $data = urldecode ($input);
            $data = stripslashes($Database->Escape($data));
            $data = json_decode($data);
            
            $booking = Utils::objectToObject($data, Booking_Details);
            $booking->Linking();
            
            if($booking->setOneOffDiscountRent()){
                $res->success = true;
                $res->data = $booking;
            }
            
            Utils::PrintJson($res, true);
            break;
    }
}