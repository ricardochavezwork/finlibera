<?php

include 'common.php';
include './invoice_common/invoice_functions.php';

//$idInquilino = $_GET["Id"];
$idInquilino = $_REQUEST["Id"];
$idAppartamento = $_REQUEST["IdApt"];
$idIns = $_REQUEST["IdIns"];
$idDisdetta = $_REQUEST["IdDisdetta"];
$idInp = $_REQUEST["IdInp"];
$idAppartamento_stanza = $_REQUEST["IdAptStanza"];
$idAppartamento_postoAuto = $_REQUEST["IdAptPostoAuto"];
$i = $_POST["inquilino"];
$disd = $_GET["disdetta"];
$fattura = $_GET["invoice"];
$ins = $_GET["ins"];
$inp = $_GET["inp"];
$input = (isset($_POST['data'])) ? $_POST['data'] : '';

if($_REQUEST){
    checkPrivilege(PRIV_INQUILINI_VIEW);
}else{
    //Creazione inquilini
    checkPrivilege(PRIV_INQUILINI_EDIT);
}


if(isset($_REQUEST["action"])){
    switch ($_REQUEST["action"]){
        case "load":
            $response = new stdClass();
            $response->success = true;
            if($idInquilino > 0){
                $response->Inquilino = new Inquilino($idInquilino);
                $response->LoadIns = Inquilino_Stanza::Load(NULL, $idInquilino);
                $response->LoadInP = Inquilino_PostoAuto::Load(NULL, $idInquilino);
            }
            Utils::PrintJson($response, true);
            break;
        case "loadAppartamento":
            $response = new stdClass();
            $response->success = true;
            if($idAppartamento > 0){
                $response->Appartamento = new Appartamento($idAppartamento);
            }
            Utils::PrintJson($response, true);
            break;
        case "loadAptStanza":
            $response = new stdClass();
            $response->success = true;
            if($idAppartamento_stanza > 0){
                $response->Appartamento_Stanza = new Appartamento_Stanza($idAppartamento_stanza);
            }
            Utils::PrintJson($response, true);
            break;
        case "loadInsDisdette":
            $response = new stdClass();
            $response->success = true;
            if($idIns > 0){
                $response->LoadInsDisdette = Inquilino_Disdetta::Load($idIns);
            }
            Utils::PrintJson($response, true);
            break;
        case "loadDisdetta":
            $response = new stdClass();
            $response->success = true;
            if($idDisdetta > 0){
                $response->Inquilino_Disdetta = new Inquilino_Disdetta($idDisdetta);
            }
            Utils::PrintJson($response, true);
            break;
        case "loadAptPostiAuto":
            $response = new stdClass();
            $response->success = true;
            if($idAppartamento_postoAuto > 0){
                $response->Appartamento_PostoAuto = new Appartamento_PostoAuto($idAppartamento_postoAuto);
            }
            Utils::PrintJson($response, true);
            break;
        case "loadIns":
            $response = new stdClass();
            $response->success = true;
            if($idIns > 0){
                $response->Ins = new Inquilino_Stanza($idIns);
            }
            Utils::PrintJson($response, true);
            break;
        case "loadInp":
            $response = new stdClass();
            $response->success = true;
            if($idInp > 0){
                $response->Inp = new Inquilino_PostoAuto($idInp);
            }
            Utils::PrintJson($response, true);
            break;
        case "autocompleteCity":
            $term = stripslashes($_REQUEST["term"]);
            $results = Cities::autocomplete($term);
            Utils::PrintJson($results, TRUE);
            break;
        case "codiceFiscale":
            //$i = $_GET["inquilino"];
            $decode = urldecode($i);
            $decode = json_decode($decode);
            $inquilino =  Utils::objectToObject($decode, Inquilino);
            $dataNascita = new DateTime($inquilino->DataNascita);
            $luogoN = new Cities($inquilino->LuogoNascita);
            $inq = new CodiceFiscale();
            $inq->setDateSeparator("-");
            $codice = $inq->calcola($inquilino->Nome, $inquilino->Cognome, $dataNascita->format('d-m-Y'), $inquilino->Sesso, $luogoN->city_code_land);
            Utils::PrintJson($codice, true);
            break;
        case "saveInquilino":
            $response = new stdClass();
            $response->success = false;
            $decode = urldecode($i);
            $decode = json_decode($decode);
            $inquilino =  Utils::objectToObject($decode, Inquilino);
            $fidelityCardNotification = false;
            
            if($inquilino->Id && intval($inquilino->Id) > 0){
                $old_item = new Inquilino($inquilino->Id);
                if(intval($old_item->FidelityCard) === 0 && intval($inquilino->FidelityCard) > 0){
                    $fidelityCardNotification = true;
                }
            }else if(intval($inquilino->Id) === 0 && intval($inquilino->FidelityCard) > 0){
                $fidelityCardNotification = true;
            }
            
            if($inquilino->Save()){
                $response->success = true;
                $response->Inquilino = $inquilino;
            }
            
            if($fidelityCardNotification){
                $inquilino->sendFidelityCardNotification();
            }
            
            Utils::PrintJson($response, true);
            break;
        case "saveDisdetta":
            $response = new stdClass();
            $response->success = false;
            $disdetta = Utils::objectToObject(json_decode($disd), Inquilino_Disdetta);
            if($disdetta->Save()){
                $response->success = true;
                $response->Disdetta = $disdetta;
                $response->Ins = new Inquilino_Stanza($disdetta->IdInquilinoStanze);
                if(intval($disdetta->Stato) === 2){
                    $response->Ins->DataFine = null;
                }else{
                    $response->Ins->DataFine = $disdetta->DataFine;
                }
                
                if($response->Ins->Id > 0){
                    $insPrev = new Inquilino_Stanza($response->Ins->Id);
                    if($response->Ins->DataFine != $insPrev->DataFine){
                        $s = new Appartamento_Stanza($response->Ins->IdStanza);
                        if ($s->Id > 0){
                            $s->SaveDataAggiornamento();
                        }    
                    }
                }
                
                if($response->Ins->Save()){
                    $readjustment = readjustment_Ins($response->Ins);
                    
                    if(count($readjustment->Ins) > 0){
                        //Foreach per il caricamento dei nomi degli inquilini.
                        //Richiamo funzione per il controllo dello storno e della sua generazione
                        foreach ($readjustment->Ins as $key => $value) {
                            $obj = new stdClass();
                            $obj->Ins = $value;
                            $obj->Inquilino = new Inquilino($value->IdInquilino);
                            $response->Readjustment[] = $obj;

                            $storni = checkStorno($value);
                            if(count($storni) > 0){
                                foreach ($storni->Storni as $chiave => $valore) {
                                    $response->Storno[] = $storni->Storni[$chiave];
                                }
                            }
                        }

                    }else{
                        $storni = checkStorno($response->Ins);
                        if(count($storni) > 0){
                            foreach ($storni->Storni as $chiave => $valore) {
                                $response->Storno[] = $storni->Storni[$chiave];
                            }
                        }
                    }
                    
                    
                    
                    $idAllineamento = $response->Ins->fixMissingLeases();
                    $allineamentoLocazione = new stdClass();
                    
                    //Utils::PrintJson($idAllineamento, true);
                    
                    if(intval($idAllineamento) > 0){
                        $allineamentoLocazione->invoice = new Fattura($idAllineamento);
                        $allineamentoLocazione->fd = FatturaDettagliInquilini::LoadDettagli($idAllineamento);
                        $response->Locazione = $allineamentoLocazione;
                    }

                    $response->success = true;
                }else{
                    $response->success = false;
                }
                
            }
            Utils::PrintJson($response, true);
            
            break;
        case "saveIns":
            $response = new stdClass();
            $response->success = false;
            $response->Storno = array();
            $response->Readjustment = array();

            global $Database;

            $data = urldecode ($input);
            $data = stripslashes($Database->Escape($data));
            $data = json_decode($data);
      
            $inquilinoStanza = Utils::objectToObject($data, Inquilino_Stanza);

            if($inquilinoStanza->Id > 0){
                $insPrev = new Inquilino_Stanza($inquilinoStanza->Id);
                if($inquilinoStanza->DataFine != $insPrev->DataFine){
                    $s = new Appartamento_Stanza($inquilinoStanza->IdStanza);
                    if ($s->Id > 0){
                        $s->SaveDataAggiornamento();
                    }    
                }
            }

            if($inquilinoStanza->Save()){
                
                $response->FPI = generateFPI($inquilinoStanza);
                $idAllineamento = $inquilinoStanza->fixMissingLeases();
                
                $allineamentoLocazione = new stdClass();
                //Utils::PrintJson($idAllineamento, true);

                if(intval($idAllineamento) > 0){
                    $allineamentoLocazione->invoice = new Fattura($idAllineamento);
                    $allineamentoLocazione->fd = FatturaDettagliInquilini::LoadDettagli($idAllineamento);
                    $response->Locazione = $allineamentoLocazione;
                }
                
                $readjustment = readjustment_Ins($inquilinoStanza);
                
                if(count($readjustment->Ins) > 0){
                    //Foreach per il caricamento dei nomi degli inquilini.
                    //Richiamo funzione per il controllo dello storno e della sua generazione
                    foreach ($readjustment->Ins as $key => $value) {
                        $obj = new stdClass();
                        $obj->Ins = $value;
                        $obj->Inquilino = new Inquilino($value->IdInquilino);
                        $response->Readjustment[] = $obj;
                        
                        $storni = checkStorno($value);
                        if(count($storni) > 0){
                            foreach ($storni->Storni as $chiave => $valore) {
                                $response->Storno[] = $storni->Storni[$chiave];
                            }
                        }
                    }
                    
                }
                
                /*
                 * Funzione per aggiornamento del campo "booked" di aptStanza
                 */
                $aptStanza = new Appartamento_Stanza($inquilinoStanza->IdStanza);
                if($aptStanza->Booked !== NULL){
                    $booked = new DateTime($aptStanza->Booked);
                    $ins_Inizio = new DateTime($inquilinoStanza->DataInizio);
                    if($booked <= $ins_Inizio){
                        $aptStanza->SaveBooking(FALSE);
                    }
                }
                
                $response->success = true;
                $response->Ins = $inquilinoStanza;
            }
            Utils::PrintJson($response, true);
            break;
        case "saveInp":
            $response = new stdClass();
            $response->success = false;
            $inquilinoPostoAuto = Utils::objectToObject(json_decode($inp), Inquilino_PostoAuto);
            
            if($inquilinoPostoAuto->Save()){
                
                $response->success = true;
                $response->Inp = $inquilinoPostoAuto;
                
            }
            
            Utils::PrintJson($response, true);
            break;
        case "revocaDisdetta":
            $response = new stdClass();
            $response->success = false;
            $disdetta = Utils::objectToObject(json_decode($disd), Inquilino_Disdetta);
            $disdetta->Revoca();
            
            $ins = new Inquilino_Stanza($disdetta->IdInquilinoStanze);
            $ins->DataFine = null;
            if($ins->Save()){
                $idAllineamento = $ins->fixMissingLeases();
                $allineamentoLocazione = new stdClass();

                if(intval($idAllineamento) > 0){
                    $allineamentoLocazione->invoice = new Fattura($idAllineamento);
                    $allineamentoLocazione->fd = FatturaDettagliInquilini::LoadDettagli($idAllineamento);
                    $response->Locazione = $allineamentoLocazione;
                }
                $response->success = true;
            }
            
            Utils::PrintJson($response, true);
            break;
        case "sendDisdetta":
            $res = new stdClass();
            $res->Success = false;
            $mail = new Mail();
            $mail->setNoReplyCustomers();
            $notification = urldecode ($input);
            $notification = json_decode($notification);
            
            $ins = Utils::objectToObject($notification->ins, Inquilino_Stanza);
            $inquilino = Utils::objectToObject($notification->ins->Inquilino, Inquilino);
            $stanza = Utils::objectToObject($notification->ins->Stanza, Appartamento_Stanza);
            $admin = new AdminAccount($stanza->IdAdmin);
            
            if($notification->subject){
                $subject = $notification->subject;
            }else{
                $subject = "Ricezione Disdetta - MilanoStanze.it";
                if($inquilino->Lang && $inquilino->Lang !== "it"){
                    $subject = "Contract Cancellation - MilanoStanze.it";
                }
            }
            
            $content = $notification->content;
         
            $emailAddress = $inquilino->PrimaryEmail;
            
            //$emailAddress = 'ricardo.chavez.work@gmail.com';
            
            if($emailAddress && $emailAddress !== ''){
                $mail->prepare($subject, $content, $emailAddress, "no-reply@milanostanze.it", "MilanoStanze.it");
                if($inquilino->SecondaryEmail && $inquilino->SecondaryEmail !== ""){
                    $mail->addAddress($inquilino->SecondaryEmail, $inquilino->SecondaryEmail);
                }
                $mail->addReplyTo("segreteria@finlibera.it", "Segreteria");
                $mail->addCC("segreteria@finlibera.it", "Segreteria");
                $mail->addCC($admin->Email, $admin->Username);
                
                if($mail->Send()){
                    $res->Success = true;
                }
            }

            Utils::PrintJson($res, true);
            break;
    }
}else{
    
}

$LoadAgenti = AdminAccount::Load();
$agenti = array();
foreach ($LoadAgenti as $key => $value) {
    $agente = new stdClass();
    $agente->Id = $value->Id;
    $agente->Username = $value->Username;
    $agenti[] = $agente;
}

$professioni = array();
$professione_none = new stdClass();
$professione_none->Value = PROFESSIONE_NONE;
$professione_none->Output = getProfessione(PROFESSIONE_NONE);

$professione_stud = new stdClass();
$professione_stud->Value = PROFESSIONE_STUDENTE;
$professione_stud->Output = getProfessione(PROFESSIONE_STUDENTE);

$professione_prof = new stdClass();
$professione_prof->Value = PROFESSIONE_PROFESSIONISTA;
$professione_prof->Output = getProfessione(PROFESSIONE_PROFESSIONISTA);

$professioni[] = $professione_none;
$professioni[] = $professione_stud;
$professioni[] = $professione_prof;

$fonti = array();
$fonte_none = new stdClass();
$fonte_none->Value = FONTE_NONE;
$fonte_none->Output = "Nessuna";

$fonte_uniplaces = new stdClass();
$fonte_uniplaces->Value = FONTE_UNIPLACES;
$fonte_uniplaces->Output = "Uniplaces";

$fonte_spotahome = new stdClass();
$fonte_spotahome->Value = FONTE_SPOTAHOME;
$fonte_spotahome->Output = "Spotahome";

$fonte_zappyrent = new stdClass();
$fonte_zappyrent->Value = FONTE_ZAPPYRENT;
$fonte_zappyrent->Output = "ZappyRent";

$fonte_gromia = new stdClass();
$fonte_gromia->Value = FONTE_GROMIA;
$fonte_gromia->Output = "Gromia";

$fonte_housing = new stdClass();
$fonte_housing->Value = FONTE_HOUSING;
$fonte_housing->Output = "HousingAnywhere";

$fonte_ms = new stdClass();
$fonte_ms->Value = FONTE_MILANOSTANZE;
$fonte_ms->Output = "MilanoStanze";

$fonte_immobiliare = new stdClass();
$fonte_immobiliare->Value = FONTE_IMMOBILIARE;
$fonte_immobiliare->Output = "Immobiliare";

$fonte_bakeca = new stdClass();
$fonte_bakeca->Value = FONTE_BAKECA;
$fonte_bakeca->Output = "Bakeca";

$fonte_idealista = new stdClass();
$fonte_idealista->Value = FONTE_IDEALISTA;
$fonte_idealista->Output = "Idealista";

$fonte_fb = new stdClass();
$fonte_fb->Value = FONTE_FB;
$fonte_fb->Output = "Facebook";

$fonte_kijiji = new stdClass();
$fonte_kijiji->Value = FONTE_KIJIJI;
$fonte_kijiji->Output = "Kijiji";

$fonte_subito = new stdClass();
$fonte_subito->Value = FONTE_SUBITO;
$fonte_subito->Output = "Subito.it";

$fonte_trovit = new stdClass();
$fonte_trovit->Value = FONTE_TROVIT;
$fonte_trovit->Output = "Trovit";

$fonti[] = $fonte_none;
$fonti[] = $fonte_uniplaces;
$fonti[] = $fonte_spotahome;
$fonti[] = $fonte_housing;
$fonti[] = $fonte_zappyrent;
$fonti[] = $fonte_ms;
$fonti[] = $fonte_immobiliare;
$fonti[] = $fonte_bakeca;
$fonti[] = $fonte_idealista;
$fonti[] = $fonte_fb;
$fonti[] = $fonte_kijiji;
$fonti[] = $fonte_subito;
$fonti[] = $fonte_trovit;

$smarty->assign("idInquilino", $idInquilino);
$smarty->assign("agenti", $agenti);
$smarty->assign("professioni", $professioni);
$smarty->assign("fonti", $fonti);
$smarty->assign("canView", $AdminLogged->CanAccess(PRIV_INQUILINI_VIEW));
$smarty->assign("canEdit", $AdminLogged->CanAccess(PRIV_INQUILINI_EDIT));
$smarty->assign("canDelete", $AdminLogged->CanAccess(PRIV_INQUILINI_DELETE));

/*
 * ENCODED VERSION : Permette di assegnare facilmente un oggetto php a una variabile JS.
 */

$smarty->assign("agenti_encoded", json_encode($agenti));
$smarty->assign("professioni_encoded", json_encode($professioni));
$smarty->assign("fonti_encoded", json_encode($fonti));

$smarty->display('tenants.tpl');
