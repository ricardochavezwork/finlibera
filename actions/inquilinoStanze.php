<?php

include_once 'common.php';
include '../invoice_common/invoice_functions.php';

$input = $_POST["data"];

//TODO : Check privileges

if(isset($_REQUEST["action"])){
  switch ($_REQUEST["action"]){
    case "loadRelationship":
      $res = new stdClass();
      $res->success = false;
      $ins = urldecode ($input);
      $ins = stripslashes($ins);
      $ins = json_decode($ins);
      $rel = null;
      if($ins && $ins->Id && intval($ins->Id) > 0){
          $rel = new Inquilino_Stanza($ins->Id);
          $rel->setInquilino_Intestazione();
      }
      
      $res->data = $rel;
      Utils::PrintJson($res, true);
      break;
    case "searchIns":
      $res = new stdClass();
      $res->Data = array();
      $decode = urldecode ($input);
      $decode = json_decode($decode);
      $termine  = $decode->Termine;

      $ins = Inquilino_Stanza::Search($termine);

      if(count($ins) > 0){
          $res->Data = $ins;
      }

      Utils::PrintJson($res, true);
      break;
    case "loadCheckOut":
      $res = new stdClass();
      $decode = urldecode ($input);
      $decode = json_decode($decode);
      $input = $decode;
      $filter = ($input->filters ? $input->filters : null);
      $fromDate = ($filter->fromDate ? $filter->fromDate : null);
      $termine = ($filter->termine ? $filter->termine : null);
      $page = ($filter->page ? $filter->page : 1);
      $limit = ($filter->limit ? $filter->limit : 100);
      $order = ($filter->order ? $filter->order : null);
      $offset = Utils::GetPageOffset($page, $limit);
      $count = 0;
      $res->Data = Inquilino_Stanza::loadCheckOut($fromDate, $termine, $order, $limit, $offset, $count);
      $res->TotalPages = Utils::GetPagesCount($count, $limit);
      $res->TotalRows = $count;

      Utils::PrintJson($res, true);
      break;
    case "updateJSONFile":
      $output = new stdClass();
      $output->success = false;
      $count = 0;
      $res = Inquilino_Stanza::loadDelayed("", "", null, null, $count);
      //Utils::PrintJson($res, true);

      $struct = new stdClass();
      $struct->LastUpdated = new DateTime();
      $struct->Rows = Array();

      if($res && count($res->Inquilino_Stanza) > 0){
          $struct->Rows = $res->Inquilino_Stanza;
          $struct->TotIns = $res->TotIns;
      }

      $fileRoot = '../../upload/json/overdue_payments.json';
      
      //Utils::PrintJson($fileRoot, true);

      if(file_exists($fileRoot)){
          unlink($fileRoot);
      }

      $fp = fopen($fileRoot, 'w');
      fwrite($fp, json_encode($struct));
      fclose($fp);
      
      if(file_exists($fileRoot)){
          $output->success = true;
      }
      
      Utils::PrintJson($output, true);
      break;
    case "loadConteggi":
      $res = new stdClass();
      $decode = urldecode ($input);
      $decode = json_decode($decode);
      $input = $decode;
      $filter = ($input->filters ? $input->filters : null);
      $fromDate = ($filter->fromDate ? $filter->fromDate : null);
      $termine = ($filter->termine ? $filter->termine : null);
      $page = ($filter->page ? $filter->page : 1);
      $limit = ($filter->limit ? $filter->limit : 100);
      $order = ($filter->order ? $filter->order : null);
      $offset = Utils::GetPageOffset($page, $limit);
      $count = 0;
      $res->Data = Inquilino_Stanza::loadConteggiFinali($order, $limit, $offset, $count);
      $res->TotalPages = Utils::GetPagesCount($count, $limit);
      $res->TotalRows = $count;

      Utils::PrintJson($res, true);
      break;
  
    case "loadConteggiUscenti":
      $res = new stdClass();
      $decode = urldecode ($input);
      $decode = json_decode($decode);
      $input = $decode;
      $filter = ($input->filters ? $input->filters : null);
      $fromDate = ($filter->fromDate ? $filter->fromDate : null);
      $termine = ($filter->termine ? $filter->termine : null);
      $page = ($filter->page ? $filter->page : 1);
      $limit = ($filter->limit ? $filter->limit : 100);
      $order = ($filter->order ? $filter->order : null);
      $offset = Utils::GetPageOffset($page, $limit);
      $count = 0;
      $res->Data = Inquilino_Stanza::loadConteggiUscenti($order, $limit, $offset, $count);
      $res->TotalPages = Utils::GetPagesCount($count, $limit);
      $res->TotalRows = $count;

      Utils::PrintJson($res, true);
      break;
  
    case "loadConteggiEffettuati":
      $res = new stdClass();
      $decode = urldecode ($input);
      $decode = json_decode($decode);
      $input = $decode;
      $filter = ($input->filters ? $input->filters : null);
      $fromDate = ($filter->fromDate ? $filter->fromDate : null);
      $termine = ($filter->termine ? $filter->termine : null);
      $page = ($filter->page ? $filter->page : 1);
      $limit = ($filter->limit ? $filter->limit : 100);
      $order = ($filter->order ? $filter->order : null);
      $offset = Utils::GetPageOffset($page, $limit);
      $count = 0;
      $res->Data = Inquilino_Stanza::loadConteggiEffettuati($order, $limit, $offset, $count);
      $res->TotalPages = Utils::GetPagesCount($count, $limit);
      $res->TotalRows = $count;

      Utils::PrintJson($res, true);
      break;
  
    case "loadConteggiInviati":
      $res = new stdClass();
      $decode = urldecode ($input);
      $decode = json_decode($decode);
      $input = $decode;
      $filter = ($input->filters ? $input->filters : null);
      $fromDate = ($filter->fromDate ? $filter->fromDate : null);
      $termine = ($filter->termine ? $filter->termine : null);
      $page = ($filter->page ? $filter->page : 1);
      $limit = ($filter->limit ? $filter->limit : 100);
      $order = ($filter->order ? $filter->order : null);
      $offset = Utils::GetPageOffset($page, $limit);
      $count = 0;
      $res->Data = Inquilino_Stanza::loadConteggiInviati($order, $limit, $offset, $count);
      $res->TotalPages = Utils::GetPagesCount($count, $limit);
      $res->TotalRows = $count;

      Utils::PrintJson($res, true);
      break;
  
    case "loadMorosiUsciti":
      $res = new stdClass();
      $decode = urldecode ($input);
      $decode = json_decode($decode);
      $input = $decode;
      $filter = ($input->filters ? $input->filters : null);
      $fromDate = ($filter->fromDate ? $filter->fromDate : null);
      $termine = ($filter->termine ? $filter->termine : null);
      $page = ($filter->page ? $filter->page : 1);
      $limit = ($filter->limit ? $filter->limit : 100);
      $order = ($filter->order ? $filter->order : null);
      $offset = Utils::GetPageOffset($page, $limit);
      $count = 0;
      $res->Data = Inquilino_Stanza::loadMorosiUsciti($order, $limit, $offset, $count);
      $res->TotalPages = Utils::GetPagesCount($count, $limit);
      $res->TotalRows = $count;

      Utils::PrintJson($res, true);
      break;
  
    case "loadAccountBalance":
      $res = new stdClass();
      $res->success = false;
      global $Database;
      
      $ins = urldecode ($input);
      $ins = stripslashes($Database->Escape($ins));
      $ins = json_decode($ins);
      $ins = Utils::objectToObject($ins, Inquilino_Stanza);
      
      $rel = null;
      if($ins && $ins->Id && intval($ins->Id) > 0){
          $rel = Inquilino_Stanza::LoadAccountBalance($ins->Id);
      }
      
      $totFt = Inquilino_Stanza::getTotFtByIns($ins->Id);
      $totVersato = Inquilino_Stanza::getTotVersatoByIns($ins->Id);
      $totDovInRealTime = Inquilino_Stanza::getTotDovutoInRealTimeByIns($ins->Id, $ins->ImportoNonContabilizzato, $ins->DataInizio, $ins->DataFine);
      $isPrevIns = $ins->isPrevIns();
      $hasPrevIns = $ins->hasPrevIns();
      
      $aptS = new Appartamento_Stanza($ins->IdStanza);
      $apt = new Appartamento($aptS->IdAppartamento);
      
      $trs = new stdClass();
      $trs->Balance = $rel;
      $trs->Societa = $apt->Societa;
      $trs->TotFatturato = $totFt;
      $trs->TotVersato = $totVersato;
      $trs->TotDovInRealTime = $totDovInRealTime; 
      $trs->isPrevIns = $isPrevIns;
      $trs->hasPrevIns = $hasPrevIns;
      
      $res->data = $trs;
      Utils::PrintJson($res, true);
      break;
    case "loadConteggiFinali":
      $res = new stdClass();
      $res->success = false;
      global $Database;
      $res->invoice = new stdClass();
      $res->ts_docF = null;
      $res->accountBalance = new stdClass();
      $res->blockingFinalInvoice = array();
      $res->missingServices = array();
      $ins = urldecode ($input);
      $ins = stripslashes($Database->Escape($ins));
      $ins = json_decode($ins);
      
      $ins = Utils::objectToObject($ins, Inquilino_Stanza);
      
      $totFtChiusura = 0;
      
      if($ins && $ins->Id && intval($ins->Id) > 0 && $ins->DataFine){
          $idFtChiusura = Inquilino_Stanza::getIdFatturaChiusura($ins->Id);
          if($idFtChiusura && intval($idFtChiusura) > 0){
              $ft = new Fattura($idFtChiusura);
              $ft->FatturaDettagli = new stdClass();
              $ft->Fattura_Componenti = new stdClass();
              $ft_componente = Fattura_ComponentiDettagli::LoadByInvoice($ft->Id);
              
              $fd = FatturaDettagliInquilini::LoadDettagli($ft->Id);
              if (count($fd) > 0) {
               foreach ($fd as $key => $value) {
                $fd[$key]->LoadRelationship();
                $totFtChiusura += $fd[$key]->Totale;
               }
              }
              
              $ft->FatturaDettagli->FatturaDettagli = $fd;
              
              if($ft_componente && count($ft_componente) > 0){
                  foreach ($ft_componente as $key => $value) {
                    $totFtChiusura +=  $ft_componente[$key]->getComponentePrezzo();
                   }
              }
              
              $ft->Fattura_Componenti->Fattura_Componenti = $ft_componente;
              $ft->Totale = $totFtChiusura;
              
              $res->invoice = $ft;
              
              $documentoFiscale = new DocumentoFiscale();
              $documentoFiscale->Id = $ft->Id;
              $documentoFiscale->Type = $ft->Type;
              $documentoFiscale->Documento = $ft;
              
              $intestatario = $documentoFiscale->getIntestatario();
              $intestatario->setIntestatario();
              
              $ts_docF = new Intestatario_DocumentoFiscale();
              $ts_docF->Intestatario = $intestatario;
              $ts_docF->DocumentoFiscale = $documentoFiscale;
              
              $res->ts_docF = $ts_docF;
              
          }else{
              $ft = new Fattura();
              $ft->Id = 0;
              $ft->TipologiaDestinatario = 1;
              $ft->Tipologia = 3;
              $ft->Numero = null;
              $ft->Data = null;
              $ft->FatturaDettagli = new stdClass();
              $ft->Fattura_Componenti = new stdClass();
              $ft->Societa = castSocieta($ins);
              //$ft->Fattura_Componenti->Fattura_Componenti = getTitoloComponente($componenti);
              
              $fd = autofill_FatturaDettagli_Chiusura($ft, $ins);
              if (count($fd) > 0) {
               foreach ($fd as $key => $value) {
                $fd[$key]->LoadRelationship();
                $totFtChiusura += $fd[$key]->Totale;
               }
              }
              
              $ft->FatturaDettagli->FatturaDettagli = $fd;
              
              $ft->Fattura_Componenti->Fattura_Componenti = Array();
              
              $componenti = autofill_Componenti_Chiusura($ins, $ft);
              if(count($componenti) > 0){
                  foreach ($componenti as $key => $value) {
                    $componenti[$key]->setComponente();
                    $f_c = new Fattura_ComponentiDettagli();
                    $f_c->IdComponentiDettagli = $componenti[$key]->Id;
                    $f_c->ComponenteDettagli = $componenti[$key];
                    $f_c->IdFattura = $ft->Id;
                    $ft->Fattura_Componenti->Fattura_Componenti[] = $f_c;
                    $totFtChiusura += $f_c->getComponentePrezzo();
                  }
              }
              
              $ft->Totale = $totFtChiusura;
              
              $res->invoice = $ft;
          }
          
          $totFt = Inquilino_Stanza::getTotFtByIns($ins->Id);
          $totVersato = Inquilino_Stanza::getTotVersatoByIns($ins->Id);
          $totDovInRealTime = Inquilino_Stanza::getTotDovutoInRealTimeByIns($ins->Id, $ins->ImportoNonContabilizzato, $ins->DataInizio,  $ins->DataFine);
          $totDovControllo = Inquilino_Stanza::getTotDovutoControlloByIns($ins->Id);
          $totDiscounts = Inquilino_Stanza::getTotDiscountsByIns($ins->Id);
          $ticket_chiusuraBloccata = Ticket::BlockingFinalInvoice($ins->Id);
          $ticket_serviziMancanti = Ticket::ServiziMancanti($ins->Id);

          if(count($ticket_chiusuraBloccata) > 0)
            $res->blockingFinalInvoice = $ticket_chiusuraBloccata;

          if (count($ticket_serviziMancanti) > 0)
            $res->missingServices = $ticket_serviziMancanti;

          if($idFtChiusura && intval($idFtChiusura) > 0 && $totFtChiusura > 0){
              $totFt = $totFt - $totFtChiusura;
          }

          $trs = new stdClass();
          $trs->TotFatturato = $totFt;
          $trs->TotVersato = $totVersato;
          $trs->TotDovInRealTime = $totDovInRealTime;
          $trs->TotDovControllo = $totDovControllo;
          $trs->TotBollette = $ins->getTotBolletteDuringStay();
          $trs->TotSpese = $ins->getTotSpeseDuringStay();
          $trs->TotConguaglio = $ins->getConguaglioUtenze();
          $trs->TotDiscounts = $totDiscounts;
          
          $res->accountBalance = $trs;
      }
        
      Utils::PrintJson($res, true);
      break;
    case "saveSollecitoPagamento" :
      $res = new stdClass();
      $res->success = false;
      
      $sollecito = urldecode ($input);
      $sollecito = stripslashes($sollecito);
      $sollecito = json_decode($sollecito);
      
      global $Database;

      $query = sprintf("CALL SaveSollecitiPagamenti(0, %d, %d, %f, %f, %f, null)",
                  $sollecito->IdInquilinoStanze,
                  $sollecito->TipoSollecito,
                  $sollecito->TotDovInRealTime,
                  $sollecito->TotVersato,
                  $sollecito->TotSollecitato
              );
      if ($Database->Query($query)){
        $res->success = true;
      }
      
      Utils::PrintJson($res, true);
      break;
    case "loadStoricoSolleciti" :
      $res = new stdClass();
      global $Database;
      $res->success = false;
      
      $ins = urldecode ($input);
      $ins = stripslashes($ins);
      $ins = json_decode($ins);
      $res->data = new stdClass();
      $res->data->storicoSolleciti = array();
      
      $sql = sprintf("SELECT * 
                      FROM SollecitiPagamenti sp
                      WHERE sp.IdInquilinoStanze = %d
                      ORDER BY sp.DataRegistrazione DESC", $ins->Id);
      
      if ($result = $Database->Query($sql)){
          while ($row = $Database->Fetch($result)) {
              $res->data->storicoSolleciti[] = $row; 
          }
      }
      
      Utils::PrintJson($res, true);
      break;
    case "setInquilino":
      $res = new stdClass();
      $res->success = false;
      $ins = urldecode ($input);
      $ins = stripslashes($ins);
      $ins = json_decode($ins);
      $rel = null;
      if($ins && $ins->IdInquilino && intval($ins->IdInquilino) > 0){
          $rel = new Inquilino($ins->IdInquilino);
          $ins->Inquilino = $rel;
      }
      
      $res->data = $ins;
      Utils::PrintJson($res, true);
      break;
    case "setStanza":
      $res = new stdClass();
      $res->success = false;
      $ins = urldecode ($input);
      $ins = stripslashes($ins);
      $ins = json_decode($ins);
      $rel = null;
      if($ins && $ins->IdStanza && intval($ins->IdStanza) > 0){
          $rel = new Appartamento_Stanza($ins->IdStanza);
          $rel->setAppartamento();
          $ins->Stanza = $rel;
      }
      
      $res->data = $ins;
      Utils::PrintJson($res, true);
      break;
    case "toggleControlloPagamenti":
      $res = new stdClass();
      $decode = urldecode ($input);
      $decode = json_decode($decode);
      $ins = Utils::objectToObject($decode, Inquilino_Stanza);
      
      $res->success = $ins->toggleControlloPagamenti();
      $res->data = $ins;

      Utils::PrintJson($res, true);
      break;
  
    case "loadControlloPagamenti_archived":
      $res = new stdClass();
      $decode = urldecode ($input);
      $decode = json_decode($decode);
      $input = $decode;
      $filter = ($input->filters ? $input->filters : null);
      $page = ($filter->page ? $filter->page : 1);
      $limit = ($filter->limit ? $filter->limit : 100);
      $order = ($filter->order ? $filter->order : null);
      $offset = Utils::GetPageOffset($page, $limit);
      $count = 0;
      $res->Data = Inquilino_Stanza::loadControlloPagamenti_archived($order, $limit, $offset, $count);
      $res->TotalPages = Utils::GetPagesCount($count, $limit);
      $res->TotalRows = $count;

      Utils::PrintJson($res, true);
      break;
    case "conteggiSetIgnore":
      $res = new stdClass();
      $res->success = false;
      global $Database;

      $data = urldecode ($input);
      $data = stripslashes($Database->Escape($data));
      $data = json_decode($data);

      $prevIns = Utils::objectToObject($data, Inquilino_Stanza);

      $ins = new Inquilino_Stanza($prevIns->Id);
      if($ins->setConteggiStatus(CONTEGGI_STATO_IGNORE)){
          $res->success = true;
      }
      

      Utils::PrintJson($res, true);
      break;
    case "conteggiSetNoInvoice":
      $res = new stdClass();
      $res->success = false;
      global $Database;

      $data = urldecode ($input);
      $data = stripslashes($Database->Escape($data));
      $data = json_decode($data);

      $prevIns = Utils::objectToObject($data, Inquilino_Stanza);
      
      $ins = new Inquilino_Stanza($prevIns->Id);
      if($ins->setConteggiStatus(CONTEGGI_STATO_NOINVOICE)){
          $res->success = true;
      }
      

      Utils::PrintJson($res, true);
      break;
    case "getLastInsByInquilino":
      $res = new stdClass();
      $res->Data = null;
      
      $data = urldecode ($input);
      $data = stripslashes($data);
      $data = json_decode($data);

      $ins = Utils::objectToObject($data, Inquilino_Stanza);
      $prevIdIns = Inquilino_Stanza::getLastInsByInquilino($ins->IdInquilino);
       
      
      if($prevIdIns > 0){
          $prevIns = new Inquilino_Stanza($prevIdIns);
          $prevIns->LoadRelationship();
           
          $res->Data = $prevIns;
      }
      
      Utils::PrintJson($res, true);     
      break;
  }
}
