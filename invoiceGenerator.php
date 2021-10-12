<?php

include 'common.php';
include './invoice_common/invoice_functions.php';
define ("EMAIL_FORM_RICHIESTA", "smartliving@milanostanze.it");
define ("EMAIL_NOTIFICA_ADMIN", "ricardo.chavez.work@gmail.com");

//0 9 20 * * root /var/www/www.milanostanze.it/milanostanze/_services/invoiceGenerator.ssh | mail -s "Notifica Cron" ricardo.chavez.work@gmail.com

checkPrivilege(PRIV_FATTURAZIONE_DELETE);//Delete ha maggiore rilevanza tra tutti

//$fatturePI = Inquilino_Stanza::LoadInquiliniEntrati('2016-09-01', '2016-09-22', false, $limit, $offset, $count);
//$fattureLocazione = Inquilino_Stanza::LoadNextLocazione('2016-04-01', '2016-12-22', true);
//$fattureChiusura = Inquilino_Stanza::LoadInquiliniUsciti('2016-09-01', '2016-09-22', false, $limit, $offset, $count);
//Utils::PrintJson($fattureLocazione, true);

$today = FALSE;
if(!$today){
    $thisMonth = new DateTime();
    $thisMonth->add(new DateInterval('P1M'));
    $ini = clone $thisMonth;
    $fin = clone $thisMonth;
    $ini->setDate($thisMonth->format("Y"), $thisMonth->format("m"), 1);
    $fin->setDate($thisMonth->format("Y"), $thisMonth->format("m"), $thisMonth->format("t"));
    $dataInizio = clone $ini;// La prima volta Ã¨ meglio se fare un test dal 1 gennaio 2016.
    $dataFine = clone $fin;// La prima vola avrÃ  come valore il giorno prima della messa in produzione.
}else{
    $dataInizio = null;
    $dataFine = null;
}
set_time_limit(900);
$run = TRUE;
$riepilogo = TRUE;
$test = FALSE;
$mail = TRUE;
$FLocazione = TRUE;
$FPI = FALSE;
$FChiusura = FALSE;
$FTARESTV = FALSE;

$data = new stdClass();
$data->success = false;
$data->message = array();
$data->inquiliniApertura = array();
$data->inquiliniLocazione = array();
$data->inquiliniChiusura = array();
$body = "";

if($run){

    if($dataInizio && $dataFine){
        $start = $dataInizio->format('Y-m-d');
        $finish = $dataFine->format('Y-m-d');
    }else{
        $start = null;
        $finish = null;
    }

    if($FPI){
        $fatturePI = Inquilino_Stanza::LoadInquiliniEntrati($start, $finish, false, $limit, $offset, $count);
        foreach ($fatturePI as $key => $value) {
            $value = (object)$value;
            $i = new Inquilino($value->IdInquilino);
            $i->Tipologia = "Apertura";
            $i->DataEntrata = $value->DataInizio;
            $data->inquiliniApertura[] = $i;
        }
    }

    if($FLocazione){
        $fattureLocazione = Inquilino_Stanza::LoadNextLocazione($start, $finish, true);
        //Utils::PrintJson($fattureLocazione, true);
        foreach ($fattureLocazione as $key => $value) {
            $value = (object)$value;
            $i = new Inquilino($value->IdInquilino);
            $i->Tipologia = "Locazione";
            $i->NextDataInizio = $value->NextDataInizio;
            $i->Turistico = $value->Turistico;
            $data->inquiliniLocazione[] = $i;
        }
    }

    if($FChiusura){
        $fattureChiusura = Inquilino_Stanza::LoadInquiliniUsciti($start, $finish, false, $limit, $offset, $count);
        foreach ($fattureChiusura as $key => $value) {
            $value = (object)$value;
            $i = new Inquilino($value->IdInquilino);
            $i->Tipologia = "Chiusura";
            $i->DataFine = $value->DataFine;
            $data->inquiliniChiusura[] = $i;
        }
    }

    if($FTARESTV){
        $fattureTasse = Inquilino_Stanza::LoadInsTaresTv2016(true);
    }

}


/*$ins_test = new Inquilino_Stanza(698);
$ins_test->DataFine = "2017-10-15";

if($ins_test->GetMesiEffettiviDurataContratto()%12 === 0){
    $s = "Ok";
}else{
    $s = "Non sei al 13 mese";
}

Utils::PrintJson($s, true);*/



if(count($fatturePI) > 0){
    $response = new stdClass();
    $response->success = false;
    $response->message = array();
    foreach ($fatturePI as $key => $row){

        $invoice = new Fattura();
        $invoice->Tipologia = FATTURA_PI; //V
        $invoice->Societa = castSocieta($row);
        //$invoice->Numbering();
        //$invoice->Data = $currentDate->format('Y-m-d');
        //$invoice->assignInvoiceFields($dataInizio, $dataFine, $currentDate);

        if(!$test){
            $response = createInvoice($invoice, $row);
            $invoice = $response->invoice;
            $response->save = saveInvoice($invoice, $response);
        }

    }

    if($riepilogo){
        $data->message[] = sprintf(" - Sono stati passati %d fatture di primo ingresso", count($fatturePI));
        $body .= sprintf(" - Sono stati passati %d fatture di primo ingresso", count($fatturePI));
    }

}

if(count($fattureLocazione) > 0){
    $response = new stdClass();
    $response->success = false;
    $response->message = array();
    foreach ($fattureLocazione as $key => $row){

        $row = (object)$row;
        $invoice = new Fattura();
        $invoice->Tipologia = FATTURA_LOCAZIONE; //V
        $invoice->Societa = castSocieta($row);
        /*if(intval($row->Turistico) <= 0){
            $invoice->Numbering();
            $invoice->Data = $currentDate->format('Y-m-d');
        }*/
        //$invoice->assignInvoiceFields($dataInizio, $dataFine, $currentDate);

        if(!$test){
            $response = createInvoice($invoice, $row);
            $invoice = $response->invoice;
            $response->save = saveInvoice($invoice, $response);
        }
    }

    if($riepilogo){
        $data->message[] = sprintf(" - Sono stati passati %d fatture di locazione", count($fattureLocazione));
        $body .= sprintf(" - Sono stati passati %d fatture di locazione", count($fattureLocazione));
    }

}

if(count($fattureChiusura) > 0){
    $response = new stdClass();
    $response->success = false;
    $response->message = array();
    foreach ($fattureChiusura as $key => $row){

        $invoice = new Fattura();
        $invoice->Tipologia = FATTURA_CHIUSURA; //V
        $invoice->Societa = castSocieta($row);
        //$invoice->Numbering();
        //$invoice->Data = $currentDate->format('Y-m-d');
        //$invoice->assignInvoiceFields($dataInizio, $dataFine, $currentDate);

        if(!$test){
            $response = createInvoice($invoice, $row);
            $invoice = $response->invoice;
            $response->save = saveInvoice($invoice, $response);
        }
    }

    if($riepilogo){
        $data->message[] = sprintf(" - Sono stati passati %d fatture di chiusura", count($fattureChiusura));
        $body .= sprintf(" - Sono stati passati %d fatture di chiusura", count($fattureChiusura));
    }
}

/**
 * $fattureTasse : Array di Inquilino_Stanza
 */
if(count($fattureTasse) > 0){
    foreach ($fattureTasse as $key => $element) {
        $element = (object)$element;
        $invoice = new Fattura();
        $invoice->Tipologia = FATTURA_NONE; //V
        $invoice->Societa = castSocieta($element);
        $data = new stdClass();
        $data->ins = $element;
        $data->fdi = array();

        $stipula = new DateTime($element->DataFirma);
        $limit = new DateTime('2017-03-01');

        if(!$test){
          if($stipula >= $limit){

            if(intval($element->IdAppartamento) != 18){
                $importo = 108;
                $tares = new FatturaDettagliInquilini();
                $tares->Descrizione = "Tassa di smaltimento rifiuti ed altri servizi indivisibili";
                $tares->IdAttribuzione = 33;
                $tares->IdInquilinoStanze = $element->Id;
                $tares->Totale = Appartamento_Tasse::calcoloTares($importo, 1, $element->InsStart, $element->InsEnd);

                if(floatval($tares->Totale) > 0){
                    $data->fdi[] = $tares;
                }
            }

            if(count($data->fdi) > 0){
                $invoice->TipologiaDestinatario = DESTINATARI_INQUILINI;
                saveInvoice($invoice, $data);
            }
          }else{
            //TARES
            $countStanze = 0;
            $stanze = Appartamento_Stanza::Load($element->IdAppartamento);
            if($stanze && count($stanze) > 0){
                $countStanze = count($stanze);
            }

            if(intval($element->IdAppartamento) != 18){

                $importo = Appartamento_Tasse::GetTax($element->IdAppartamento, 33, '2016');
                $tares = new FatturaDettagliInquilini();
                $tares->Descrizione = "Tassa spazzatura anno : 2016 (quota parte 1/" . $countStanze . ")";
                $tares->IdAttribuzione = 33;
                $tares->IdInquilinoStanze = $element->Id;
                $tares->Totale = Appartamento_Tasse::calcoloTares($importo, $countStanze, $element->InsStart, $element->InsEnd);

                if(floatval($tares->Totale) > 0){
                    $data->fdi[] = $tares;
                }

            }

            //TV
            $importo2 = new ComponenteDettagli(ComponenteDettagli::GetComponenteDettagliByDate(8, '2016-01-01'));
            $tv = new FatturaDettagliInquilini();
            $tv->Descrizione = "Tassa canone TV : 2016 (quota parte 1/" . $countStanze . ")";
            $tv->IdAttribuzione = 34;
            $tv->IdInquilinoStanze = $element->Id;
            $tv->Totale = Appartamento_Tasse::calcoloTares($importo2->Prezzo, $countStanze, $element->InsStart, $element->InsEnd);

            if(floatval($tv->Totale) > 0){
                $data->fdi[] = $tv;
            }

            if(count($data->fdi) > 0){
                $invoice->TipologiaDestinatario = DESTINATARI_INQUILINI;
                saveInvoice($invoice, $data);
            }
          }
        }
    }
}

if($run && $riepilogo && !$mail){
   Utils::PrintJson($data, true);
}

if($run && $mail && $body !== ""){
  //$body = "Hi";
  $mail = new Mail();
  $mail->setServices();
  $mail->prepare("Riepilogo Fatture Generate", $body, EMAIL_NOTIFICA_ADMIN, EMAIL_FORM_RICHIESTA, EMAIL_FORM_RICHIESTA);
  $mail->addReplyTo(EMAIL_FORM_RICHIESTA, EMAIL_FORM_RICHIESTA);
  $mail->Send();
}
