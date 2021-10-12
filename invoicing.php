<?php

include 'common.php';
include './invoice_common/invoice_functions.php';
$idFattura = $_GET["idFattura"];
$idComponente = $_GET["idComponente"];
$i = $_GET["inquilino"];
$fattura = $_GET["invoice"];
$ins = $_GET["ins"];
$fatturaCliente = $_GET["cliente"];
$fatturaINS = $_GET["ins"];
$fatturaCD = $_GET["fcd"];
$fatturaDI = $_GET["fdi"];
$fatturaDC = $_GET["fdc"];
$fatturaSTORNO = $_GET["storno"];
$periodo = $_GET["periodo"];
$actionStorno = $_GET["actionStorno"]; // S'è "1" allora parte

/*
 * Creazioni Variabili Globali (Per evitare errore : Cannot read property 'length' of null)
 */
$fdi = array();
$fdc = array();
$fcd = array();


checkPrivilege(PRIV_FATTURAZIONE_ADD);// #NOTE: DA CREARE/CAMBIARE

$thisDate = new DateTime();

if(isset($_REQUEST["action"])){
    
    switch ($_REQUEST["action"]){
        case "loadInvoice":
            $response = new stdClass();
            $response->success = false;
            $data_invoice = json_decode($fattura, false);
            if(intval($data_invoice->Id) > 0){
                $invoice = new Fattura($data_invoice->Id);
                $response->invoice = $invoice;
                $response->success = true;
                if($invoice->TipologiaDestinatario == DESTINATARI_INQUILINI){
                    $load = (object)routing_load_Fatture($invoice);
                    $response->fdi = $load->fdi;
                    $response->fcd = $load->fcd;
                    $response->ins = $load->ins;
                    
                }else if($invoice->TipologiaDestinatario == DESTINATARI_CLIENTI){
                    $load = (object)routing_load_Fatture($invoice);
                    $response->fdc = $load->fdc;
                    $response->cliente = $load->cliente;
                }
            }
            Utils::PrintJson($response, true);
            break;
        case "load":
            $invoice = new Fattura($idFattura);
            if(!$invoice->Numero){
                $invoice->Numero = 0;//Per correggere errore assegnazione Javascript
            }
            if($invoice->TipologiaDestinatario == DESTINATARI_INQUILINI){
                $load = (object)routing_load_Fatture($invoice);
                $fdi = $load->fdi;
                $fcd = $load->fcd;
                $ins = $load->ins;
                $inquilino = $load->inquilino;
                
                $loadIns = Inquilino_Stanza::Load(null, $load->inquilino->Id); // Serve per creare il dropdown per la scelta di ins.
                if(hasLocazione($invoice)){
                    $periodiFatturazione = loadPeriodi($invoice, $load->ins);
                    /*
                     * $periodiFatturazione_cast , il suo valore deve essere la successiva fattura di locazione. Creare la sua funzione.
                     * IMPORTANTE: Questo (quanto detto prima sul commento) non vale per la visualizzazione di una fattura. Ma solo per la creazione.
                     * In quanto nella visualizzazione $periodiFatturazione_cast non e' altro che la locazione di $fdi (vedere qualche riga sotto, dentro il foreach)
                     */
                    foreach ($fdi as $key => $value) {
                        if($value->IdAttribuzione == 25){
                            $periodiFatturazione_cast = $value;
                        }
                    }
                }
                
                if(intval($invoice->Tipologia) === FATTURA_STORNO){
                    $fatturaStorno = new Fattura_Storno($invoice->Id);
                }
                
            }else if($invoice->TipologiaDestinatario == DESTINATARI_CLIENTI){
                $load = (object)routing_load_Fatture($invoice);
                $fdc = $load->fdc;
                $cliente = $load->cliente;
                
                if(intval($invoice->Tipologia) === FATTURA_STORNO){
                    $fatturaStorno = new Fattura_Storno($invoice->Id);
                }
                
            }
            
            if(intval($actionStorno) === 1){
                $fatturaStorno = new Fattura_Storno();
                $fatturaStorno->Tipologia = STORNO_SEMPLICE;
                $fatturaStorno->IdFatturaStorno = $invoice->Id;
                $invoice->Id = 0;
                $invoice->Tipologia = FATTURA_STORNO;
                $invoice->Numero = 0;
                $invoice->Data = null;
                //$invoice->assignInvoiceFields(null, null, $currentDate);
                
                if(intval($invoice->TipologiaDestinatario) === DESTINATARI_INQUILINI){
                    $fdi = FDprepareForStorno($fdi);
                }else if(intval($invoice->TipologiaDestinatario) === DESTINATARI_CLIENTI){
                    $fdc = FDprepareForStorno($fdc);
                }
                
            }
            
            break;
            
        case "delete":
            $response = new stdClass();
            $response->success = true;
            if(intval($idFattura) > 0){
                $invoice = new Fattura($idFattura);
                $response = routing_delete_Fatture($invoice);
                if($response->errors > 0){
                    $response->success = false;
                }else{
                    if(!$invoice->Delete()){
                        $response->errors++;
                        $response->success = false;
                        $response->message[] = "Errore durante l'eliminazione della fattura.";
                    }else{
                        if(intval($invoice->Tipologia) === FATTURA_STORNO){
                            $storno = new Fattura_Storno($invoice->Id);
                            $storno->Delete();
                        }
                    }
                }
            }else{
                $response->success = false;
                $response->message[] = "Errore con i parametri in input";
            }
            Utils::PrintJson($response, true);
            break;
            
        case "recovery":
            $response = new stdClass();
            $response->success = false;
            $response->message = array();
            
            $invoice = new Fattura($idFattura);
            //$invoice->Data = DateTime::createFromFormat('Y-m-d', $invoice->Data)->format('d/m/Y');
            $mdi = MovimentoDettagliInquilino::LoadByIdFattura($invoice->Id);
            $inquilino = new Inquilino($mdi[0]->IdInquilino);
            $loadIns = Inquilino_Stanza::Load(null, $inquilino->Id);
            
            /*
             * Metodo di predizione dell'Inquilino_Stanza tramite il MovimentoDettagli corrispondente.
             * Restituisce una classe di Inquilino_Stanza(). Se il numero di $loadIns è maggiore di 1 allora 
             * la predizione viene attivata, altrimenti viene restituito $loadIns[0].
             */
            $ins = new Inquilino_Stanza();
            if(count($loadIns) > 1){
                $mdi_fine_column = extractColumn($mdi, 'Fine');
                $max_mdi_fine = max($mdi_fine_column);
                $trovato = false;
                foreach ($loadIns as $key => $value) {
                    if(DateTime::createFromFormat('Y-m-d', $max_mdi_fine) <= DateTime::createFromFormat('Y-m-d', $value->DataFine)){
                        $ins = $value;
                        $trovato = true;
                    }
                }
                
                if(!$trovato){
                    foreach ($loadIns as $key => $value) {
                        if(DateTime::createFromFormat('Y-m-d', $max_mdi_fine) >= DateTime::createFromFormat('Y-m-d', $value->DataInizio)){
                            $ins = $value;
                            $trovato = true;
                        }
                    }
                }
                
            }else{
                if(count($loadIns) > 0){
                    $ins = $loadIns[0];
                }
            }
            
            $md = new MovimentoDettagli($mdi[0]->IdMovimentoDettagli);
            //$mdiInizio_cast = new DateTime($mdi[0]->Inizio);
            $invoice->Tipologia = tipologiaValue($md->IdAttribuzione);
            $invoice->Societa = castSocieta($ins);
            $response = createInvoice($invoice, $ins, $mdi[0]->Inizio);
            $invoice = $response->invoice;
            $fdi = $response->fdi;
            $fcd = $response->fcd;
            
            if(hasLocazione($invoice)){
                $periodiFatturazione = loadPeriodi($invoice, $ins);
                /*
                 * $periodiFatturazione_cast , il suo valore deve essere la successiva fattura di locazione. Creare la sua funzione.
                 * IMPORTANTE: Questo (quanto detto prima sul commento) non vale per la visualizzazione di una fattura. Ma solo per la creazione.
                 * In quanto nella visualizzazione $periodiFatturazione_cast non e' altro che la locazione di $fdi (vedere qualche riga sotto, dentro il foreach)
                 */
                foreach ($fdi as $key => $value) {
                    $value = Utils::objectToObject($value, "FatturaDettagliInquilini");
                    if($value->IdAttribuzione == 25){
                        $periodiFatturazione_cast = $value;
                    }
                }
            }
            
            break;
        case "recovery_old":
            $invoice = new Fattura($idFattura);
            //$invoice->Data = DateTime::createFromFormat('Y-m-d', $invoice->Data)->format('d/m/Y');
            $mdi = MovimentoDettagliInquilino::LoadByIdFattura($invoice->Id);
            $inquilino = new Inquilino($mdi[0]->IdInquilino);
            $loadIns = Inquilino_Stanza::Load(null, $inquilino->Id);
            
            /*
             * Metodo di predizione dell'Inquilino_Stanza tramite il MovimentoDettagli corrispondente.
             * Restituisce una classe di Inquilino_Stanza(). Se il numero di $loadIns è maggiore di 1 allora 
             * la predizione viene attivata, altrimenti viene restituito $loadIns[0].
             */
            $ins = new Inquilino_Stanza();
            if(count($loadIns) > 1){
                $mdi_fine_column = extractColumn($mdi, 'Fine');
                $max_mdi_fine = max($mdi_fine_column);
                $trovato = false;
                foreach ($loadIns as $key => $value) {
                    if(DateTime::createFromFormat('Y-m-d', $max_mdi_fine) <= DateTime::createFromFormat('Y-m-d', $value->DataFine)){
                        $ins = $value;
                        $trovato = true;
                    }
                }
                
                if(!$trovato){
                    foreach ($loadIns as $key => $value) {
                        if(DateTime::createFromFormat('Y-m-d', $max_mdi_fine) >= DateTime::createFromFormat('Y-m-d', $value->DataInizio)){
                            $ins = $value;
                            $trovato = true;
                        }
                    }
                }
                
            }else{
                if(count($loadIns) > 0){
                    $ins = $loadIns[0];
                }
            }
            
            $md = new MovimentoDettagli($mdi[0]->IdMovimentoDettagli);
            $invoice->Tipologia = tipologiaValue($md->IdAttribuzione);
            
            /*
             * Autofill Fattura
             */        
            
            $invoice = routing_autofill_Fatture($invoice, $ins);
            
            /*
             * Metodo di previsione del periodo
             */
            
            $periodiFatturazione = array();
            $periodiCompletati_flag = false;
            $periodiFatturazione_cast = new FatturaDettagliInquilini();
            $mdiInizio_cast = new DateTime($mdi[0]->Inizio);
            
            if(!$ins->DataFirma){
                $dataInizioContratto = $ins->DataInizio;
            }else{
                $dataInizioContratto = $ins->DataFirma;
            }
            
            while ($periodiCompletati_flag === false){
                if(count($periodiFatturazione)=== 0){
                    $periodo = new FatturaDettagliInquilini();
                    $periodo->IdAttribuzione = 25;
                    $periodo->IdFattura = $invoice->Id;
                    $periodo->IdInquilinoStanze = $ins->Id;
                    $periodo->Inizio = $ins->DataInizio;
                    $periodo->Fine = dataFine_generalizedFunction($dataInizioContratto, $periodo->Inizio, $ins->PeriodoFatturazione ,$ins->DataFine);
                    $compare_Inizio = new DateTime($periodo->Inizio);
                    $compare_Fine = new DateTime($periodo->Fine);
                    $stopGeneratingDates = stopGeneratingDates($periodo->Fine, $ins->DataFine);
                    if(($mdiInizio_cast >= $compare_Inizio) && ($mdiInizio_cast <= $compare_Fine)){
                        $periodiFatturazione_cast = $periodo;
                    }
                    if($stopGeneratingDates){
                        $periodiCompletati_flag = $stopGeneratingDates;
                    }
                    $periodiFatturazione[] = $periodo;
                }else if(count($periodiFatturazione) > 0){
                    $periodo = new FatturaDettagliInquilini();
                    $periodo->IdAttribuzione = 25;
                    $periodo->IdFattura = $invoice->Id;
                    $periodo->IdInquilinoStanze = $ins->Id;
                    $lastElement = end($periodiFatturazione);
                    $inizio = new DateTime($lastElement->Fine);
                    $inizio->add(new DateInterval('P1D'));
                    $periodo->Inizio = $inizio->format('Y-m-d');
                    $periodo->Fine = dataFine_generalizedFunction($dataInizioContratto, $periodo->Inizio, $ins->PeriodoFatturazione ,$ins->DataFine);
                    $compare_Inizio = new DateTime($periodo->Inizio);
                    $compare_Fine = new DateTime($periodo->Fine);
                    $stopGeneratingDates = stopGeneratingDates($periodo->Fine, $ins->DataFine);
                    if(($mdiInizio_cast >= $compare_Inizio) && ($mdiInizio_cast <= $compare_Fine)){
                        $periodiFatturazione_cast = $periodo;
                    }
                    if($stopGeneratingDates){
                        $periodiCompletati_flag = $stopGeneratingDates;
                    }
                    $periodiFatturazione[] = $periodo;
                }
            }
            
            if($periodiFatturazione_cast->Inizio){
                $dataInizio = $periodiFatturazione_cast->Inizio;
                //$dataFine = $data_periodiFatturazione_cast->Fine;
                $dataFine = dataFine_generalizedFunction($dataInizioContratto, $dataInizio, $ins->PeriodoFatturazione, $ins->DataFine);
                $fdi = routing_autofill_FatturaDettagli($invoice, $ins, $dataInizio, $dataFine);
            }else if($invoice->Tipologia === FATTURA_CHIUSURA){
                $fdi = routing_autofill_FatturaDettagli($invoice, $ins);
            }
            
            if(count($fdi) > 0){
                $fdi = getTitoloAttribuzione($fdi);
            }
            
            $fcd = routing_autofill_ComponentiDettagli($invoice, $ins);
            $fcd = getTitoloComponente($fcd);
            
            break;
            
        /*
         * LoadIns viene utilizzato nella creazione delle opzioni per la scelta del periodo di locazione contrattuale quando nel autocomplete viene scelto
         * qualcuno.
         */
        case "loadIns":
            $data_inquilino = json_decode($i, false);
            $result = Inquilino_Stanza::Load(NULL, $data_inquilino->Id);
            Utils::PrintJson($result, true);
            break;
        /*
         * 
         */
        case "loadSocieta":
            $data_ins = json_decode($ins, false);
            $societa = castSocieta($data_ins);
            Utils::PrintJson($societa, true);
            break;
        /*
         * LoadPeriodi serve a suggerire il periodo di fatturazione di alcune fatture , come la locazione.
         */
        case "loadPeriodi":
            $data_invoice = json_decode($fattura, false);
            $data_ins_cast = json_decode($ins, false);
            $periodiFatturazione = loadPeriodi($data_invoice, $data_ins_cast);
            Utils::PrintJson($periodiFatturazione, true);
            break;
        case "loadFDI":
            /*
             * Autofill FattureDettagli secondo $ins_cast e $invoice.
             */
            $data_periodiFatturazione_cast = json_decode($periodo, false);
            $data_invoice = json_decode($fattura, false);
            $data_ins_cast = json_decode($ins, false);
            
            if(!$data_ins_cast->DataFirma){
                $data_ins_cast->DataFirma = $data_ins_cast->DataInizio;
            }
            
            if($data_periodiFatturazione_cast->Inizio){
                $data_periodiFatturazione_cast->Inizio = getDataInizioFatturaTrimestrale($data_invoice, $data_ins_cast, $data_periodiFatturazione_cast->Inizio);
                $dataInizio = $data_periodiFatturazione_cast->Inizio;
                //$dataFine = $data_periodiFatturazione_cast->Fine;
                $dataFine = dataFine_generalizedFunction($data_invoice, $data_ins_cast, $dataInizio);
                $fattureDettagli = routing_autofill_FatturaDettagli($data_invoice, $data_ins_cast, $dataInizio, $dataFine);
            }else if($data_invoice->Tipologia === FATTURA_CHIUSURA){
                $fattureDettagli = routing_autofill_FatturaDettagli($data_invoice, $data_ins_cast);
            }
            
            if(count($fattureDettagli) > 0){
                $fattureDettagliExpanded = getTitoloAttribuzione($fattureDettagli);
            }
            
            Utils::PrintJson($fattureDettagliExpanded, true);
            break;
        /*
         * loadCD utilizza le seguenti funzioni: 
         * 
         * - routing_autofill_ComponentiDettagli()
         * - getTitoloComponente()
         */
        case "loadCD":
            /*
             * Autofill FattureDettagli secondo $ins_cast e $invoice.
             */
            $data_invoice = json_decode($fattura, false);
            $data_ins = json_decode($ins, false);
            /*
             * Autofill Componenti secondo $ins_cast e $invoice.
             */
            
            $componenti = routing_autofill_ComponentiDettagli($data_invoice, $data_ins);
            $componentiExpanded = getTitoloComponente($componenti);
            
            Utils::PrintJson($componentiExpanded, true);
            break;
        
        case "loadC_DB":
            $c = Componente::Load();
            Utils::PrintJson($c, true);
            break;
        case "loadAttribuzioni":
            $attribuzioni = Attribuzione::Load();
            Utils::PrintJson($attribuzioni, true);
            break;
        case "loadCDByIdC":
            $cd = ComponenteDettagli::LoadByIdComponente($idComponente);
            //$cExpanded = getTitoloComponente($c);
            Utils::PrintJson($cd, true);
            break;
        case "numbering":
            $invoice = new Fattura();
            $invoice = Utils::JsonDecodeToClass($fattura, $invoice, TRUE);
            $invoice->Numbering();
            Utils::PrintJson(0, true);
            break;
        case "checkInvoicePK":
            $invoice = new Fattura();
            $invoice = Utils::JsonDecodeToClass($fattura, $invoice, TRUE);
            $success = checkInvoicePK($invoice);// IF TRUE , INVOICE DATA IS OKAY.
            Utils::PrintJson($success, true);
            break;
        case "saveFattura" : 
            //$data_invoice = json_decode($fattura, false);
            /*
             * Primo utilizzo di Utils::JsonDecodeToClass :
             * Sè si tratta di un normale Oggetto Json allora mettere TRUE.
             * Se invece si tratta di un Array di oggetti allora prima fare il json_decode e
             * dopo nel ciclo fare il Utils::JsonDecodeToClass senza true;
             * 
             */
            
            $addFattura = new Fattura();
            $addFattura = Utils::JsonDecodeToClass($fattura, $addFattura, TRUE);
            $data = new stdClass();
            $response = new stdClass();
            $response->success = false;
            $response->message = array();
            
            if($addFattura->TipologiaDestinatario == DESTINATARI_INQUILINI){
                $data->fcd = json_decode($fatturaCD);
                $data->fdi = json_decode($fatturaDI, false);
                $data->ins = json_decode($fatturaINS);
                //$data->ins = Utils::JsonDecodeToClass($fatturaINS, "Inquilino_Stanza", TRUE);
                if(intval($addFattura->Tipologia) === FATTURA_STORNO){
                    $data->storno = json_decode($fatturaSTORNO);
                }
                
                $response = saveInvoice($addFattura, $data);
                
            }else if($addFattura->TipologiaDestinatario == DESTINATARI_CLIENTI){
                $data->fdc = json_decode($fatturaDC, false);
                $data->cliente = json_decode($fatturaCliente);
                if(intval($addFattura->Tipologia) === FATTURA_STORNO){
                    $data->storno = json_decode($fatturaSTORNO);
                }
                $response = saveInvoice($addFattura, $data);
                
            }
            
            Utils::PrintJson($response, true);
            break;
    }
}else{
    $newInvoice_cast = new Fattura();
    //$newInvoice_cast->Data = $thisDate->format('Y-m-d');
    $newInvoice_cast->Tipologia = -1;
    $newInvoice_cast->TipologiaDestinatario = DESTINATARI_INQUILINI;
    $newInvoice_cast->Societa = FINLIBERA;
    $newInvoice_cast->Numero = 0;
    //$newInvoice_cast->Numbering();
    //$newInvoice_cast->assignInvoiceFields(null, null, $currentDate);
    
}

/*
 * PARAMETRI PER LA VISUALIZZAZIONE E MODIFICA
 */
$smarty->assign("invoice", ((!$invoice->Id && intval($actionStorno) === 0)  ? $newInvoice_cast : $invoice));
$smarty->assign("fdi", $fdi);
$smarty->assign("fdc", $fdc);
$smarty->assign("fcd", $fcd);
$smarty->assign("ins", $ins);
$smarty->assign("fatturaStorno", $fatturaStorno);
$smarty->assign("actionStorno", $actionStorno);
$smarty->assign("loadIns", $loadIns);
$smarty->assign("inquilino", $inquilino);
$smarty->assign("cliente", $cliente);
$smarty->assign("periodiFatturazione", $periodiFatturazione);//SERVE a suggerire i periodi per alcune fatture di locazione.
$smarty->assign("periodiFatturazione_cast", $periodiFatturazione_cast);// Può essere in [visualizza] : fdi->IdAttribuzione == 25 oppure la successiva f_locazione 

/*
 * ENCODED VERSION : Permette di assegnare facilmente un oggetto php a una variabile JS.
 */

$smarty->assign("fdi_encoded", json_encode($fdi));
$smarty->assign("fdc_encoded", json_encode($fdc));
$smarty->assign("fcd_encoded", json_encode($fcd));
$smarty->assign("ins_encoded", json_encode($ins));
$smarty->assign("fatturaStorno_encoded", json_encode($fatturaStorno));
$smarty->assign("loadIns_encoded", json_encode($loadIns));
$smarty->assign("inquilino_encoded", json_encode($inquilino));
$smarty->assign("cliente_encoded", json_encode($cliente));

/*
 * PARAMETRI PER LA CREAZIONE DI FATTURA
 */
//$smarty->assign("numero_cast", intval($newInvoice_cast->Numero));

/*
 * PARAMETRI GENERALI
 */
$smarty->assign("tipologia_values", array(FATTURA_NONE, FATTURA_PI, FATTURA_LOCAZIONE, FATTURA_CHIUSURA, FATTURA_STORNO));
$smarty->assign("t_tipologia", array("Altro","Primo Ingresso", "Fattura di Locazione", "Fattura di Chiusura", "Nota di credito"));
$smarty->assign("societa_values", array(FINLIBERA, ECOLIBERA));
$smarty->assign("t_societa", array("Finlibera","Ecolibera"));
$smarty->assign("t_tipologiaDestinatario", array("NONE","Inquilino", "Altri clienti", "Beneficiari", "Manutentori"));
$smarty->display('invoicing.tpl');