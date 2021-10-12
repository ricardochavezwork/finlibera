<?php

// Include the main TCPDF library (search for installation path).
include 'common.php';
/*include_once LIBROOT . "/Inquilino_Stanza.php";
include_once LIBROOT . "/Appartamento_Stanza.php";
include_once LIBROOT . "/Attribuzione.php";
include_once LIBROOT . "/FatturaDettagliInquilini.php";
include_once LIBROOT . "/Fattura_ComponentiDettagli.php";*/
include './invoice_common/invoice_functions.php';
checkPrivilege(PRIV_FATTURAZIONE_DOWNLOAD);

$IdFattura = $_GET["idFattura"];
$actionPDF = $_GET["pdf"];
$response = new stdClass();
$coordinate = new stdClass();
$footer = new stdClass();

$response->success = false;

if(!$actionPDF){
    $actionPDF = 0; // Download
}

if(intval($IdFattura) > 0){
    $invoice = new Fattura($IdFattura);
    $loadSpecifiche = new stdClass();
    $response->invoice = $invoice;
    $response->success = true;
    if($invoice->TipologiaDestinatario == DESTINATARI_INQUILINI){
        $load = (object)routing_load_Fatture($invoice);
        $response->invoice = $load->invoice;
        $response->fdi = $load->fdi;
        $response->fcd = $load->fcd;
        $response->ins = $load->ins;
        $loadSpecifiche = download_invoice($response);
        $response->inquilino = $loadSpecifiche->inquilino;
        $response->appartamentoStanza = $loadSpecifiche->appartamentoStanza;
        $response->appartamento = $loadSpecifiche->appartamento;
        $response->attribuzione = $loadSpecifiche->attribuzione;
        
        if(intval($invoice->Tipologia) === FATTURA_STORNO){
            $response->fattura_storno = new Fattura_Storno($invoice->Id);
            $response->fatturaStornata = new Fattura($response->fattura_storno->IdFatturaStorno);
        }
        
    }else if($invoice->TipologiaDestinatario == DESTINATARI_CLIENTI){
        $load = (object)routing_load_Fatture($invoice);
        $response->invoice = $load->invoice;
        $response->fdc = $load->fdc;
        $response->cliente = $load->cliente;
        $response->data = download_invoice($response);
        
        if(intval($invoice->Tipologia) === FATTURA_STORNO){
            $response->fattura_storno = new Fattura_Storno($invoice->Id);
            $response->fatturaStornata = new Fattura($response->fattura_storno->IdFatturaStorno);
        }
        
    }
}

if($response->invoice->Societa == FINLIBERA){
    /*
     * COORDINATE BANCARIE
     */
    $coordinate->beneficiario = "Finlibera s.p.a.";
    $coordinate->iban = "IT80S0100501606000000000812";
    $coordinate->swift = "BNLIITRR";
    $coordinate->banca = "Banca Nazionale Del lavoro";

    /*
     * FOOTER
     */
    $footer->indirizzo = "Via Pier Lombardo, 30 - 20135 Milano MI";
    $footer->telefono = "+39 0236743720";
    $footer->mail = "segreteria@finlibera.it";
    $footer->pec = "finlibera@pec.it";
    $footer->web = "www.finlibera.it";
    $footer->partitaIva = "07301400961";
    $footer->rea = "MI-1949464";
    $footer->capitaleSociale = "250.000 €";
    $footer->sedeLegale = "Via Pier Lombardo, 30 - 20135 Milano";
}else if($response->invoice->Societa == ECOLIBERA){
    /*
     * COORDINATE BANCARIE
     */
    $coordinate->beneficiario = "Ecolibera Srl";
    $coordinate->iban = "IT88T0100501606000000001225";
    $coordinate->swift = "BNLIITRR";
    $coordinate->banca = "Banca Nazionale Del lavoro";

    /*
     * FOOTER
     */
    $footer->indirizzo = "Via Pier Lombardo, 30 - 20135 Milano MI";
    $footer->telefono = "+39 0236743720";
    $footer->mail = "ecolibera@legalmail.it";
    $footer->web = "www.ecolibera.it";
    $footer->partitaIva = "03950960165";
    $footer->rea = "BG-422559";
    $footer->sedeLegale = "Via Angelo Mai,4 - 24121 Bergamo";
}

function download_invoice($response) {
    $data = new stdClass();
    if($response->invoice->TipologiaDestinatario == DESTINATARI_INQUILINI){
        $data = pdf_Inquilino($response);
    }else if($response->invoice->TipologiaDestinatario == DESTINATARI_CLIENTI){
        $data = pdf_Cliente($response);
    }
    
    return $data;
}

function pdf_Inquilino($response) {
    $data = new stdClass();
    
    $data->inquilino = new Inquilino($response->ins->IdInquilino);
    $data->appartamentoStanza = new Appartamento_Stanza($response->ins->IdStanza);
    $data->appartamento = new Appartamento($data->appartamentoStanza->IdAppartamento);
    $data->attribuzione = titoloTipologia($response->invoice->Tipologia);
    
    return $data;
}

function pdf_Cliente($response) {
    
}

$smarty->assign("ins", json_encode($response->ins));
$smarty->assign("invoice", json_encode($response->invoice));
$smarty->assign("inquilino", json_encode($response->inquilino));
$smarty->assign("fdi", json_encode($response->fdi));
$smarty->assign("fcd", json_encode($response->fcd));
$smarty->assign("fdc", json_encode($response->fdc));
$smarty->assign("cliente", json_encode($response->cliente));
$smarty->assign("appartamento", json_encode($response->appartamento));
$smarty->assign("stanza", json_encode($response->appartamentoStanza));
$smarty->assign("fattura_storno", json_encode($response->fattura_storno));
$smarty->assign("fatturaStornata", json_encode($response->fatturaStornata));
$smarty->assign("actionPDF", $actionPDF);

$smarty->display('invoiceDownload.js.tpl');