<?php

include_once 'common.php';
include '../invoice_common/invoice_functions.php';

$input = $_POST["data"];
$ins_input = $_POST["ins"];
$input_filters = $_POST["filters"];

//TODO : Check privileges

if(isset($_REQUEST["action"])){
  switch ($_REQUEST["action"]){
    case "load":
      $res = new stdClass();
      $res->success = false;
      $id = urldecode ($input);
      $id = stripslashes($id);
      $id = json_decode($id);
      if(intval($id) > 0){
         $res->data = new Fattura($id);
      }

      Utils::PrintJson($res, true);
      break;
    case "saveRelationship":
      /*UTILIZZATO SPECIFICAMENTE SOLO PER LE CHIUSURE*/
      $res = new stdClass();
      $res->success = false;
      $decode = urldecode ($input);
      $decode = stripslashes($decode);
      $decode = json_decode($decode);
      
      $ins_decode = urldecode ($ins_input);
      $ins_decode = stripslashes($ins_decode);
      $ins_decode = json_decode($ins_decode);
      
      $invoice = Utils::objectToObject($decode, Fattura);
      $ins = new Inquilino_Stanza($ins_decode->Id);
      $fdi = Array();
      $fcd = Array();
      
      /*if($invoice->Id === 0){
          $invoice->Numbering();
      }*/
      
      if($invoice && $invoice->FatturaDettagli && $invoice->FatturaDettagli->FatturaDettagli && count($invoice->FatturaDettagli->FatturaDettagli) > 0){
          $fdi_items = $invoice->FatturaDettagli->FatturaDettagli;
          foreach ($fdi_items as $key => $fdi_item) {
              $fdi[] = Utils::objectToObject($fdi_item, FatturaDettagliInquilini);
          }
      }
      
      if($invoice && $invoice->Fattura_Componenti && $invoice->Fattura_Componenti->Fattura_Componenti && count($invoice->Fattura_Componenti->Fattura_Componenti) > 0){
          $fcd_items = $invoice->Fattura_Componenti->Fattura_Componenti;
          foreach ($fcd_items as $key => $fcd_item) {
              $cd = $fcd_item->ComponenteDettagli;
              $fcd[] = Utils::objectToObject($cd, ComponenteDettagli);
          }
      }
      
      $data = new stdClass();
      $data->ins = $ins;
      $data->fdi = $fdi;
      $data->fcd = $fcd;
      
      $response = saveInvoice($invoice, $data);
      
      if($response->success){
          $res->success = true;
      }
      
      Utils::PrintJson($res, true);
      break;
    case "search":
      $res = new stdClass();
      $res->success = false;
      $filters = urldecode ($input_filters);
      $filters = stripslashes($filters);
      $filters = json_decode($filters);
      $searchResults = Fattura::Search($filters);
      $res->data = $searchResults;

      Utils::PrintJson($res, true);
      break;
    case "searchPreview":
      $res = new stdClass();
      $res->success = false;
      $filters = urldecode ($input_filters);
      $filters = stripslashes($filters);
      $filters = json_decode($filters);
      $searchResults = Fattura::Search($filters);
      $overview = Intestatario_DocumentoFiscale::getSearchPreview($searchResults);
      
      $res->data = $overview;
      Utils::PrintJson($res, true);
      break;
    case "loadFD":
      $res = new stdClass();
      $res->success = false;
      $invoice = urldecode ($input);
      $invoice = stripslashes($invoice);
      $invoice = json_decode($invoice);
      $cl = new stdClass();
      $cl->FatturaDettagli = array();
      
      switch (intval($invoice->TipologiaDestinatario)) {
          case 1:
              $cl->FatturaDettagli = FatturaDettagliInquilini::LoadDettagli($invoice->Id);
              if (count($cl->FatturaDettagli) > 0) {
               foreach ($cl->FatturaDettagli as $key => $value) {
                $cl->FatturaDettagli[$key]->LoadRelationship();
               }
              }
              break;
          case 2:
              $cl->FatturaDettagli = FatturaDettagliClienti::LoadDettagli($invoice->Id);
              if (count($cl->FatturaDettagli) > 0) {
               foreach ($cl->FatturaDettagli as $key => $value) {
                $cl->FatturaDettagli[$key]->LoadRelationship();
               }
              }
              break;
      }
      
      $res->data = $cl;
      Utils::PrintJson($res, true);
      break;
    case "LoadComponenti":
      $res = new stdClass();
      $res->success = false;
      $invoice = urldecode ($input);
      $invoice = stripslashes($invoice);
      $invoice = json_decode($invoice);
      $cl = new stdClass();
      if(intval($invoice->Id) > 0){
          $cl->Fattura_Componenti = Fattura_ComponentiDettagli::LoadByInvoice($invoice->Id);
      }
      
      $res->data = $cl;
      Utils::PrintJson($res, true);
      break;
    case "loadStorno":
       $res = new stdClass();
       $res->success = false;
       $id = urldecode ($input);
       $id = stripslashes($id);
       $id = json_decode($id);
       if(intval($id) > 0){
          $res->data = new Fattura_Storno($id);
       }

       Utils::PrintJson($res, true);
       break;
    case "getCustomerDetails":
        $decode = urldecode ($input);
        $decode = stripslashes($decode);
        $decode = json_decode($decode);
        $invoice = Utils::objectToObject($decode, Fattura);
        $datiAnagrafici = null;
        
        $intestatario = $invoice->getIntestatario();
        $cliente = new Cliente($intestatario->Id, false, true);
        $cliente->setCliente();
        $sub_cliente = $cliente->Cliente;
        
        if(intval($invoice->TipologiaDestinatario) === 1){
            $fd = FatturaDettagliInquilini::LoadDettagli($invoice->Id);
            $ins = new Inquilino_Stanza($fd[0]->IdInquilinoStanze);
            $ins->setInquilino_Intestazione();
            if($ins->Inquilino_Intestazione){
                $sub_cliente = $ins->Inquilino_Intestazione;
            }
        }
        
        if($sub_cliente){
            $datiAnagrafici = new stdClass();
            $datiAnagrafici->CodiceFiscale = $sub_cliente->CodiceFiscale ? $sub_cliente->CodiceFiscale : null;
            $datiAnagrafici->PartitaIva = $sub_cliente->PartitaIva ? $sub_cliente->PartitaIva : null;
            $datiAnagrafici->Nome = $sub_cliente->Nome ? $sub_cliente->Nome : null;
            $datiAnagrafici->Cognome = $sub_cliente->Cognome ? $sub_cliente->Cognome : null;
            $datiAnagrafici->RagioneSociale = $sub_cliente->RagioneSociale ? $sub_cliente->RagioneSociale : null;
            $datiAnagrafici->Indirizzo = $sub_cliente->Indirizzo ? $sub_cliente->Indirizzo : null;
            $datiAnagrafici->Civico = $sub_cliente->Civico ? $sub_cliente->Civico : null;
            $datiAnagrafici->CAP = $sub_cliente->CAP ? $sub_cliente->CAP : null;
            $datiAnagrafici->Citta = $sub_cliente->Citta ? $sub_cliente->Citta : null;
            $datiAnagrafici->Stato = $sub_cliente->Stato ? $sub_cliente->Stato : null;
            $datiAnagrafici->Paese = $sub_cliente->Paese ? $sub_cliente->Paese : null;
            
        }
        
        Utils::PrintJson($datiAnagrafici, true);
        break;
    case "getACUBE_format":
        $decode = urldecode ($input);
        $decode = stripslashes($decode);
        $decode = json_decode($decode);
        $invoice = Utils::objectToObject($decode, Fattura);
        
        $acube_format = $invoice->getInvoice_acube_format();
        
        Utils::PrintJson($acube_format, true);
        break;
    case "setStornoTotale":
        $response = new stdClass();
        $response->success = false;

        $decode = urldecode ($input);
        $decode = stripslashes($decode);
        $decode = json_decode($decode);
        $ft = Utils::objectToObject($decode, Fattura);
        $idFattura = $ft->Id;
        
        if(intval($idFattura) > 0){
            $invoice = new Fattura($idFattura);
            $response->invoice = $invoice;
            $response->success = true;
            if($invoice->TipologiaDestinatario == DESTINATARI_INQUILINI){
                $load = (object)routing_load_Fatture($invoice);
                $response->fdi = $load->fdi;
                $response->fcd = $load->fcd;
                $response->ins = $load->ins;
                
                $response->fdi = FDprepareForStorno($response->fdi);
                
                $invoice->Id = 0;
                $invoice->Numero = 0;
                $invoice->Data = null;
                $invoice->Tipologia = FATTURA_STORNO;
                $s = new Fattura_Storno();
                $s->IdFatturaStorno = $idFattura;
                $s->Tipologia = STORNO_TOTALE;

                $response->storno = $s;
                
                $response = saveInvoice($invoice, $response);
                
            }else if($invoice->TipologiaDestinatario == DESTINATARI_CLIENTI){
                $load = (object)routing_load_Fatture($invoice);
                $response->fdc = $load->fdc;
                $response->cliente = $load->cliente;
                
                $response->fdc = FDprepareForStorno($response->fdc);
                
                $invoice->Id = 0;
                $invoice->Numero = 0;
                $invoice->Data = null;
                $invoice->Tipologia = FATTURA_STORNO;
                $s = new Fattura_Storno();
                $s->IdFatturaStorno = $idFattura;
                $s->Tipologia = STORNO_TOTALE;

                $response->storno = $s;
                
                $response = saveInvoice($invoice, $response);
            }
        }
        
        Utils::PrintJson($response, true);
        break;
        
    
  }
}
