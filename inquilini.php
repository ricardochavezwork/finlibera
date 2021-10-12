<?php

include 'common.php';

$record = NULL;
$error = "";

if (isset($_REQUEST["Id"])){
    $record = new Inquilino(intval($_REQUEST["Id"]));
    
    if($record->LuogoNascita > 0){
        $luogoN = new Cities($record->LuogoNascita);
        $record->LuogoNascita_nome = $luogoN->city_name;
    }    
    if(!$record->CodiceFiscale && $record->LuogoNascita > 0){
        if($record->Nome && $record->Cognome && $record->DataNascita && $record->Sesso){
            $dataNascita = new DateTime($record->DataNascita);
            $inq = new CodiceFiscale();
            $inq->setDateSeparator("-");
            $codice = $inq->calcola($record->Nome, $record->Cognome, $dataNascita->format('d-m-Y'), $record->Sesso, $luogoN->city_code_land);
            
            $record->CodiceFiscale = $codice;
            
        }
    }
}
//Utils::PrintJson($record, true);
$archivio = (isset($_REQUEST["Archivio"]) ? intval($_REQUEST["Archivio"]) : NULL);

if (isset($_REQUEST["action"])) {
    switch ($_REQUEST["action"]) {
        
        case "load":
            $page = (isset($_REQUEST["page"]) ? intval($_REQUEST["page"]) : 1);
            $limit = (!isset($_REQUEST["rp"]) ? 0 : intval($_REQUEST["rp"]));
            $offset = Utils::GetPageOffset($page, $limit);
            $count = 0;
            $records = Inquilino::Load($archivio, TRUE, $limit, $offset, $count);
            for ($i = 0; $i < count($records); $i++) {
                $ricavo = 0;
                //$records[$i]["CodiceFiscale"] = "Ok";
                $records[$i]["Eta"] = Utils::GetAge($records[$i]["DataNascita"]);
                if ($records[$i]["Email"])
                    $records[$i]["Email"] = sprintf ('<a href="mailto:%s">%s</a>', $records[$i]["Email"], $records[$i]["Email"]);
                $records[$i]["CellActions"] = "";
                if ($AdminLogged->CanAccess(PRIV_INQUILINI_DELETE))
                    $records[$i]["CellActions"] .= '<a href="#" class="button button_delete" onclick="javascript:deleteRecord(' . $records[$i]["Id"] . ')">Elimina</a>';
                if ($AdminLogged->CanAccess(PRIV_INQUILINI_EDIT) || $AdminLogged->CanAccess(PRIV_INQUILINI_VIEW))
                    $records[$i]["CellActions"] .= '<a href="?Id=' . $records[$i]["Id"] . ($archivio !== NULL ? "&Archivio=" . strval ($archivio) : "") . '" class="button">Visualizza</a>';
            }
            Utils::PrintJson(Utils::JsonEncodeFlexigridMessage($records, $count, $page));
            break;
        
        case "search":
            $term = stripslashes($_REQUEST["term"]);
            $records = Inquilino::Search($term);
            Utils::PrintJson($records, TRUE);
            break;
        
        case "autocompleteNazione":
            $term = stripslashes($_REQUEST["term"]);
            $results = Nazione::autocomplete($term);
            Utils::PrintJson($results, TRUE);
            break;
        
        case "autocompleteCity":
            $term = stripslashes($_REQUEST["term"]);
            $results = Cities::autocomplete($term);
            Utils::PrintJson($results, TRUE);
            break;
        
        case "codiceFiscale":
            $i = $_GET["inquilino"];
            $inquilino = new Inquilino();
            $inquilino = Utils::JsonDecodeToClass($i, $inquilino, TRUE);
            $dataNascita = new DateTime($inquilino->DataNascita);
            $luogoN = new Cities($inquilino->LuogoNascita);
            $inq = new CodiceFiscale();
            $inq->setDateSeparator("-");
            $codice = $inq->calcola($inquilino->Nome, $inquilino->Cognome, $dataNascita->format('d-m-Y'), $inquilino->Sesso, $luogoN->city_code_land);
            Utils::PrintJson($codice, true);
            break;
        
        case "upload_foto":
            checkPrivilege(PRIV_INQUILINI_EDIT);
            $success = FALSE;
            $upload = new FileUpload("Foto", UPLOAD);
            $upload->SetAllowedExtensions(array("png", "jpg", "gif"));
            if (!$upload->IsUploaded()) {
                $error = "File non inviato " . print_r($_FILES, TRUE);
            } elseif (!$upload->IsFileAllowed()) {
                $error = "File non consentito";
            } elseif ($upload->Upload()) {
                $success = TRUE;
                $error = URL_UPLOAD . $upload->GetDestinationUrl();
            }
            Utils::PrintJson(Utils::JsonEncodeSuccessMessage($success, $error));
            break;
            
        case "save":
            checkPrivilege(PRIV_INQUILINI_EDIT);
            $record->DataNascita = sprintf("%s-%s-%s", filter_input(INPUT_POST, "DataNascita_Year"), filter_input(INPUT_POST, "DataNascita_Month"), filter_input(INPUT_POST, "DataNascita_Day"));
            if (!Utils::IsValidDate($record->DataNascita))
                $record->DataNascita = "";
            Utils::FillObjectFromRow($record, $_REQUEST, TRUE);
            if (!$record->Nome)
                $error .= "<li>" . $smarty->getConfigVariable("inq_nome") . "</li>";
            if (!$record->Cognome)
                $error .= "<li>" . $smarty->getConfigVariable("inq_cognome") . "</li>";
            if (!$record->DataNascita)
                $error .= "<li>Data nascita</li>";
            if (!$record->Professione)
                $error .= "<li>Professione</li>";
            if (!$record->Specializzazione)
                $error .= "<li>Specializzazione</li>";
            if (!$record->Ente)
                $error .= "<li>Ente</li>";
            if (!$record->Email)
                $error .= "<li>Email</li>";
            if (!$record->Telefono)
                $error .= "<li>Telefono</li>";
            if (!$record->Indirizzo)
                $error .= "<li>Indirizzo</li>";
            if (!$record->Civico)
                $error .= "<li>Civico</li>";
            if (!$record->CAP)
                $error .= "<li>CAP</li>";
            if (!$record->Citta)
                $error .= "<li>Citta</li>";
            if (!$record->LuogoNascita)
                $error .= "<li>LuogoNascita</li>";
            if (!$record->CodiceFiscale)
                $error .= "<li>CodiceFiscale</li>";
            if ($error) {
                $error = $smarty->getConfigVariable("missing_fields") . "<ul>" . $error . "</ul>";
            } else {
                $isNew = ($record->Id < 1);
                if ($record->Save()) {
                    
                    // Salva le STANZE
                    if (!isset($_REQUEST["stanze_Id"])) {
                        $stanze = Inquilino_Stanza::Load(NULL, $record->Id);
                        foreach ($stanze as $stanza) {
                            $stanza->Delete();
                        }
                    } else {
                        $stanzeId = $_REQUEST["stanze_Id"];
                        $stanzeIdStanza = $_REQUEST["stanze_IdStanza"];
                        $stanzeFirma = $_REQUEST["stanze_DataFirma"];
                        $stanzeInizio = $_REQUEST["stanze_DataInizio"];
                        $stanzeFine = $_REQUEST["stanze_DataFine"];
                        $stanzeTuristico = $_REQUEST["stanze_Turistico"];
                        $stanzePeriodoFatturazione = $_REQUEST["stanze_PeriodoFatturazione"];
                        $stanzeCaparra = $_REQUEST["stanze_Caparra"];
                        $stanzeCanone = $_REQUEST["stanze_Canone"];
                        $stanzeSpese = $_REQUEST["stanze_Spese"];
                        $stanzeCauzione = $_REQUEST["stanze_Cauzione"];
                        $stanzeNumeroFatture = $_REQUEST["stanze_NumeroFatture"];
                        $stanzeConguaglioUtenze = $_REQUEST["stanze_ConguaglioUtenze"];
                        $stanzeConguaglioSpese = $_REQUEST["stanze_ConguaglioSpese"];
                        $stanzeGiorniNonGoduti = $_REQUEST["stanze_GiorniNonGoduti"];
                        $stanzePulizie = $_REQUEST["stanze_Pulizie"];
                        $stanzeNote = $_REQUEST["stanze_Note"];
                        // Elimina le stanze eliminate
                        if (!$isNew) {
                            $stanze = Inquilino_Stanza::Load(NULL, $record->Id);
                            foreach ($stanze as $stanza) {
                                if (!in_array($stanza->Id, $stanzeId)) {
                                    $stanza->Delete();
                                }
                            }
                        }
                        for ($i = 0; $i < count($stanzeId); $i++) {
                            if ($stanzeId[$i] == "__STANZA_ID__")
                                continue;
                            $aggiornaStanza = FALSE;
                            $stanza = new Inquilino_Stanza($stanzeId[$i]);
                            if ($stanzeId[$i] > 0 && $stanza->DataFine != $stanzeFine[$i])
                                $aggiornaStanza = TRUE;
                            $stanza->IdInquilino = $record->Id;
                            $stanza->IdStanza = $stanzeIdStanza[$i];
                            $stanza->DataFirma = $stanzeFirma[$i];
                            $stanza->DataInizio = $stanzeInizio[$i];
                            $stanza->DataFine = $stanzeFine[$i];
                            $stanza->Turistico = $stanzeTuristico[$i];
                            $stanza->PeriodoFatturazione = $stanzePeriodoFatturazione[$i];
                            $stanza->Caparra = $stanzeCaparra[$i];
                            $stanza->Canone = $stanzeCanone[$i];
                            $stanza->Spese = $stanzeSpese[$i];
                            $stanza->Cauzione = $stanzeCauzione[$i];
                            $stanza->NumeroFatture = $stanzeNumeroFatture[$i];
                            $stanza->ConguaglioUtenze = $stanzeConguaglioUtenze[$i];
                            $stanza->ConguaglioSpese = $stanzeConguaglioSpese[$i];
                            $stanza->GiorniNonGoduti = $stanzeGiorniNonGoduti[$i];
                            $stanza->Pulizie = $stanzePulizie[$i];
                            $stanza->Note = $stanzeNote[$i];
                            $stanza->Save();
                            
                            if ($aggiornaStanza) {
                                $s = new Appartamento_Stanza($stanza->IdStanza);
                                if ($s->Id > 0)
                                    $s->SaveDataAggiornamento();
                            }
                            
                            // Aggiorna il prezzo attuale della stanza
                            /*if ($stanza->Canone > 0 && !$stanza->DataFine) {
                                $s->PrezzoAttuale = $stanza->Canone;
                                $s->PrezzoAttuale;
                                $s->Save();
                            }*/
                        }
                    }
                    
                    // Salva i POSTI AUTO
                    if (!isset($_REQUEST["postiauto_Id"])) {
                        $postiauto = Inquilino_PostoAuto::Load(NULL, $record->Id);
                        foreach ($postiauto as $postoauto) {
                            $postoauto->Delete();
                        }
                    } else {
                        $postiautoId = $_REQUEST["postiauto_Id"];
                        $postiautoIdStanza = $_REQUEST["postiauto_IdPostoAuto"];
                        $postiautoInizio = $_REQUEST["postiauto_DataInizio"];
                        $postiautoFine = $_REQUEST["postiauto_DataFine"];
                        $postiautoNote = $_REQUEST["postiauto_Note"];
                        // Elimina le postiauto eliminate
                        if (!$isNew) {
                            $postiauto = Inquilino_PostoAuto::Load(NULL, $record->Id);
                            foreach ($postiauto as $postoauto) {
                                if (!in_array($postoauto->Id, $postiautoId)) {
                                    $postoauto->Delete();
                                }
                            }
                        }
                        for ($i = 0; $i < count($postiautoId); $i++) {
                            if ($postiautoId[$i] == "__POSTOAUTO_ID__")
                                continue;
                            $postoauto = new Inquilino_PostoAuto($postiautoId[$i]);
                            $postoauto->IdInquilino = $record->Id;
                            $postoauto->IdPostoAuto = $postiautoIdStanza[$i];
                            $postoauto->DataInizio = $postiautoInizio[$i];
                            $postoauto->DataFine = $postiautoFine[$i];
                            $postoauto->Note = $postiautoNote[$i];
                            $postoauto->Save();
                        }
                    }
                    
                    //exit("<pre>".print_r($fotoId, TRUE)."</pre>");
                    Utils::RedirectTo ("?Id=" . $record->Id . "&saved=1");
                    
                } else {
                    if (isset($_GET["saved"]))
                        unset($_GET["saved"]);
                    $error = $smarty->getConfigVariable("error_generic");
                }
            }
            break;
            
        case "delete":
            checkPrivilege(PRIV_INQUILINI_DELETE);
            $record->Delete();
            Utils::RedirectTo($archivio !== NULL ? "?Archivio=" . strval($archivio) : "");
            break;
    }
}

checkPrivilege(PRIV_INQUILINI_VIEW);

if ($error)
    $smarty->assign("error", $error);
if (filter_input(INPUT_GET, "saved") === "1")
    $smarty->assign("saved", TRUE);

$smarty->assign("canEdit", $AdminLogged->CanAccess(PRIV_INQUILINI_EDIT));
if ($archivio !== NULL)
    $smarty->assign("archivio", $archivio);

if (!$record) {
    
    // Imposta la lista di valori SI/NO
    $smarty->assign("archivio_values", array("0", "1", "-1"));
    $smarty->assign("archivio_output", array("No", "S&igrave;", "Non assegnatari"));
    
} else {
    
    $smarty->assign("record", Utils::ObjectToArray($record));
    if($record->LuogoNascita > 0){
        $smarty->assign("luogoNascita", $record->LuogoNascita_nome);
    }
    
    // Imposta la lista degli utenti admin
    $admin_values = array("0");
    $admin_output = array("[Nessuno]");
    $admins = AdminAccount::Load();
    foreach ($admins as $i) {
        $admin_values[] = $i->Id;
        $admin_output[] = $i->Username;
    }
    $smarty->assign("admin_values", $admin_values);
    $smarty->assign("admin_output", $admin_output);
    
    //Turistico
    $smarty->assign("turistico_values", array(0, 1));
    //$smarty->assign("turistico_values", array(0, 1));
    $smarty->assign("t_turistico", array("DEFAULT - Lungo Termine", "TURISTICO"));
    
    //PeriodoFatturazione
    $smarty->assign("periodoFatturazione_values", array("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"));
    $smarty->assign("t_periodoFatturazione", array("ogni mese", "ogni 2 mesi", "DEFAULT - Trimestrale", "ogni 4 mesi", "ogni 5 mesi", "ogni 6 mesi", "ogni 7 mesi", "ogni 8 mesi", "ogni 9 mesi", "ogni 10 mesi", "ogni 11 mesi", "ogni 12 mesi"));
    
    // Imposta la lista di valori SESSO
    $smarty->assign("sesso_values", array("M", "F"));
    $smarty->assign("sesso_output", array("Maschile", "Femminile"));
    
    // Imposta la lista di valori per PROFESSIONE
    $smarty->assign("professione_values", array(PROFESSIONE_NONE, PROFESSIONE_STUDENTE, PROFESSIONE_PROFESSIONISTA));
    $smarty->assign("professione_output", array(getProfessione(PROFESSIONE_NONE), getProfessione(PROFESSIONE_STUDENTE), getProfessione(PROFESSIONE_PROFESSIONISTA)));
    
    // Imposta la lista di valori per TIPO MEZZO PUBBLICO
    $specializzazioni = Inquilino::LoadSpecializzazioni();
    for ($i = 0; $i < count($specializzazioni); ++$i) {
        $specializzazioni[$i] = str_replace('"', '\"', $specializzazioni[$i]);
    }
    $smarty->assign("specializzazioni", $specializzazioni);
    
    // Carica le stanze
    if (isset($_REQUEST["action"]) && $_REQUEST["action"] == "save" && !isset($_REQUEST["stanze_Id"]))
        $_REQUEST["stanze_Id"] = array();
    if (isset($_REQUEST["stanze_Id"])) {
        $stanze = array();
        $stanzeId = $_REQUEST["stanze_Id"];
        $stanzeIdStanza = $_REQUEST["stanze_IdStanza"];
        $stanzeFirma = $_REQUEST["stanze_DataFirma"];
        $stanzeInizio = $_REQUEST["stanze_DataInizio"];
        $stanzeFine = $_REQUEST["stanze_DataFine"];
        $stanzeTuristico = $_REQUEST["stanze_Turistico"];
        $stanzePeriodoFatturazione = $_REQUEST["stanze_PeriodoFatturazione"];
        $stanzeCanone = $_REQUEST["stanze_Canone"];
        $stanzeSpese = $_REQUEST["stanze_Spese"];
        $stanzeCauzione = $_REQUEST["stanze_Cauzione"];
        $stanzeNumeroFatture = $_REQUEST["stanze_NumeroFatture"];
        $stanzeConguaglioUtenze = $_REQUEST["stanze_ConguaglioUtenze"];
        $stanzeConguaglioSpese = $_REQUEST["stanze_ConguaglioSpese"];
        $stanzeGiorniNonGoduti = $_REQUEST["stanze_GiorniNonGoduti"];
        $stanzePulizie = $_REQUEST["stanze_Pulizie"];
        $stanzeNote = $_REQUEST["stanze_Note"];
        for ($i = 0; $i < count($stanzeId); $i++) {
            $stanze[] = array(
                "Id" => $stanzeId[$i],
                "IdStanza" => $stanzeIdStanza[$i],
                "DataFirma" => $stanzeFirma[$i],
                "DataInizio" => $stanzeInizio[$i],
                "DataFine" => $stanzeFine[$i],
                "Turistico" => $stanzeTuristico[$i],
                "PeriodoFatturazione" => $stanzePeriodoFatturazione[$i],
                "Canone" => $stanzeCanone[$i],
                "Spese" => $stanzeSpese[$i],
                "Cauzione" => $stanzeCauzione[$i],
                "NumeroFatture" => $stanzeNumeroFatture[$i],
                "ConguaglioUtenze" => $stanzeConguaglioUtenze[$i],
                "ConguaglioSpese" => $stanzeConguaglioSpese[$i],
                "GiorniNonGoduti" => $stanzeGiorniNonGoduti[$i],
                "Pulizie" => $stanzePulizie[$i],
                "Note" => $stanzeNote[$i]
            );
        }
    } else {
        $stanze = Inquilino_Stanza::Load(NULL, $record->Id, TRUE);
    }
    if (isset($_REQUEST["addStanza"]) && intval($_REQUEST["addStanza"]) > 0) {
        $newStanza = new Inquilino_Stanza();
        $newStanza->Id = -mktime();
        $newStanza->IdStanza = intval($_REQUEST["addStanza"]);
        $newStanza->DataInizio = date("Y-m-d");
        $stanze[] = Utils::ObjectToArray($newStanza);
        $smarty->assign("addStanza", $newStanza->Id);
    }
    for ($i = 0; $i < count($stanze); $i++) {
        $stanza = new Appartamento_Stanza($stanze[$i]["IdStanza"]);
        $appartamento = new Appartamento($stanza->IdAppartamento);
        $stanze[$i]["DataFirma"] = str_replace("-", "/", $stanze[$i]["DataFirma"]);
        $stanze[$i]["DataInizio"] = str_replace("-", "/", $stanze[$i]["DataInizio"]);
        $stanze[$i]["DataFine"] = str_replace("-", "/", $stanze[$i]["DataFine"]);
        $stanze[$i]["Appartamento"] = "[" . $appartamento->Id . "] " . $appartamento->Indirizzo . ($appartamento->Civico ? " " . $appartamento->Civico : "");
        $stanze[$i]["Stanza"] = $stanza->Numero;
    }
    $smarty->assign("stanze", $stanze);
    
    // Carica i posti auto
    if (isset($_REQUEST["action"]) && $_REQUEST["action"] == "save" && !isset($_REQUEST["postiauto_Id"]))
        $_REQUEST["postiauto_Id"] = array();
    if (isset($_REQUEST["postiauto_Id"])) {
        $postiauto = array();
        $postiautoId = $_REQUEST["postiauto_Id"];
        $postiautoIdPostoAuto = $_REQUEST["postiauto_IdPostoAuto"];
        $postiautoInizio = $_REQUEST["postiauto_DataInizio"];
        $postiautoFine = $_REQUEST["postiauto_DataFine"];
        $postiautoNote = $_REQUEST["postiauto_Note"];
        for ($i = 0; $i < count($postiautoId); $i++) {
            $postiauto[] = array(
                "Id" => $postiautoId[$i],
                "IdPostoAuto" => $postiautoIdPostoAuto[$i],
                "DataInizio" => $postiautoInizio[$i],
                "DataFine" => $postiautoFine[$i],
                "Note" => $postiautoNote[$i]
            );
        }
    } else {
        $postiauto = Inquilino_PostoAuto::Load(NULL, $record->Id, TRUE);
    }
    if (isset($_REQUEST["addPostoAuto"]) && intval($_REQUEST["addPostoAuto"]) > 0) {
        $newPosto = new Inquilino_PostoAuto();
        $newPosto->Id = -mktime();
        $newPosto->IdPostoAuto = intval($_REQUEST["addPostoAuto"]);
        $newPosto->DataInizio = date("Y-m-d");
        $postiauto[] = Utils::ObjectToArray($newPosto);
        $smarty->assign("addPostoAuto", $newPosto->Id);
    }
    for ($i = 0; $i < count($postiauto); $i++) {
        $posto = new Appartamento_PostoAuto($postiauto[$i]["IdPostoAuto"]);
        $appartamento = new Appartamento($posto->IdAppartamento);
        $postiauto[$i]["DataInizio"] = str_replace("-", "/", $postiauto[$i]["DataInizio"]);
        $postiauto[$i]["DataFine"] = str_replace("-", "/", $postiauto[$i]["DataFine"]);
        $postiauto[$i]["Appartamento"] = "[" . $appartamento->Id . "] " . $appartamento->Indirizzo . ($appartamento->Civico ? " " . $appartamento->Civico : "");
        $postiauto[$i]["PostoAuto"] = $posto->Id;
    }
    $smarty->assign("postiauto", $postiauto);
}

$smarty->display('inquilini.tpl');

