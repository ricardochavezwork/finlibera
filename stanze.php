<?php

include 'common.php';

$record = NULL;
$error = "";

if (isset($_REQUEST["Id"]))
    $record = new Appartamento_Stanza(intval($_REQUEST["Id"]));

$idAppartamento = intval($_REQUEST["IdAppartamento"]);
if ($record && $record->Id > 0)
    $idAppartamento = $record->IdAppartamento;

$appartamento = new Appartamento($idAppartamento);

if ($appartamento->Id < 1)
    Utils::RedirectTo ("appartamenti.php");

if (isset($_REQUEST["action"])) {
    switch ($_REQUEST["action"]) {
        
        case "load":
            $page = (isset($_REQUEST["page"]) ? intval($_REQUEST["page"]) : 1);
            $sortname = filter_input(INPUT_POST, "sortname");
            $sortorder = filter_input(INPUT_POST, "sortorder");
            switch ($sortname) {
                case "PrezzoAttuale":
                    $sortname = "getCanone(Id)";
                    break;
            }
            $count = 0;
            $records = Appartamento_Stanza::Load($appartamento->Id, NULL, TRUE, NULL, NULL, $count, trim($sortname . " " . $sortorder));
            for ($i = 0; $i < count($records); $i++) {
                $room_clone = new Appartamento_Stanza($records[$i]);
                $records[$i]["MarketPrice"] = number_format((float)$room_clone->getMarketPrice(), 2, '.', '');
                $records[$i]["Bagno"] = getBagno($records[$i]["Bagno"]);
                $records[$i]["Pavimento"] = getPavimento($records[$i]["Pavimento"]);
                $inquilini = Inquilino_Stanza::LoadUltimoInquilino($records[$i]["Id"]);
                $now = mktime();
                $inquilino_stanza = new Inquilino_Stanza();
                if (count($inquilini) > 0 && (!$inquilini[0]->DataFine || Utils::GetTimestamp($inquilini[0]->DataFine) > $now)) {
                    $inquilino_stanza = $inquilini[0];
                }
                $records[$i]["PrezzoAttuale"] = $inquilino_stanza->Id < 1 ? "" : strval($inquilino_stanza->Canone);
                
                $inquilini = Inquilino_Stanza::LoadUltimoInquilino($records[$i]["Id"], FALSE);
                $now = mktime();
                $inquilino = new Inquilino();
                $inquilino_stanza = new Inquilino_Stanza();
                if (count($inquilini) > 0 && /*Utils::GetTimestamp($inquilini[0]->DataInizio) <= $now &&*/ (!$inquilini[0]->DataFine || Utils::GetTimestamp($inquilini[0]->DataFine) > $now)) {
                    $inquilino_stanza = $inquilini[0];
                    $inquilino = new Inquilino($inquilino_stanza->IdInquilino);
                }
                $records[$i]["Inquilino"] = $inquilino->Id < 1 ? '' : '<a href="inquilini.php?Id=' . $inquilino->Id . '">' . htmlentities(trim($inquilino->Nome . " " . $inquilino->Cognome), ENT_QUOTES, 'UTF-8') . '</a>' .
                        (!$inquilino->Email ? "" : ", " . '<a href="mailto:' . $inquilino->Email . '">' . htmlentities(trim($inquilino->Email), ENT_QUOTES, 'UTF-8') . '</a>') .
                        (!$inquilino->Telefono ? "" : ", " . htmlentities(trim($inquilino->Telefono), ENT_QUOTES, 'UTF-8'));
                
                $records[$i]["CellActions"] = "";
                if ($AdminLogged->CanAccess(PRIV_STANZE_DELETE))
                    $records[$i]["CellActions"] .= '<a href="#" class="button button_delete" onclick="javascript:deleteRecord(' . $records[$i]["Id"] . ')">Elimina</a>';
                if ($AdminLogged->CanAccess(PRIV_STANZE_EDIT) || $AdminLogged->CanAccess(PRIV_STANZE_VIEW))
                    $records[$i]["CellActions"] .= '<a href="?Id=' . $records[$i]["Id"] . '" class="button">Visualizza</a>';
            }
            Utils::PrintJson(Utils::JsonEncodeFlexigridMessage($records, $count, $page));
            break;
            
        case "save":
            checkPrivilege(PRIV_STANZE_EDIT);
            Utils::FillObjectFromRow($record, $_REQUEST, TRUE);
            //Utils::PrintJson($_REQUEST, true);
            if ($record->IdAdmin <= 0)
                $error .= "<li>Operatore/Admin</li>";
            if (!$record->Numero)
                $error .= "<li>" . $smarty->getConfigVariable("room_number") . "</li>";
            /*if ($record->PrezzoSuggerito <= 0)
                $error .= "<li>Prezzo Originale</li>";*/
            if ($record->PrezzoDinamico <= 0)
                $error .= "<li>Prezzo Dinamico</li>";
            if ($record->PrezzoScontato > 0 && (!$record->ScadenzaSconto || $record->ScadenzaSconto === ""))
                $error .= "<li>Inserire scadenza dello sconto</li>";
            if ($record->Mq <= 0)
                $error .= "<li>Mq</li>";
            if ($record->Balconi === "" || $record->Balconi < 0)
                $error .= "<li>Balconi</li>";
            if ($record->Terrazzi === "" || $record->Terrazzi < 0)
                $error .= "<li>Terrazzi</li>";
            if ($record->LettoMatrimoniale === "" || $record->LettoMatrimoniale < 0)
                $error .= "<li>Letto Matrimoniale</li>";
            if ($record->TipoLetto === "" || !$record->TipoLetto)
                $error .= "<li>Tipologia Letto</li>";
            if ($record->Sedie === "" || $record->Sedie < 0)
                $error .= "<li>Sedie</li>";
            if ($record->TavoloPranzo === "" || $record->TavoloPranzo < 0)
                $error .= "<li>Tavolo da pranzo</li>";
            if ($record->Cassetti === "" || $record->Cassetti < 0)
                $error .= "<li>Cassetti</li>";
            if ($record->Scrivania === "" || $record->Scrivania < 0)
                $error .= "<li>Scrivania</li>";
            if ($record->Specchi === "" || $record->Specchi < 0)
                $error .= "<li>Specchi</li>";
            if ($record->AnteArmadi === "" || $record->AnteArmadi < 1)
                $error .= "<li>Ante armadio</li>";
            if (!$record->TitoloAnnuncio)
                $error .= "<li>Titolo annuncio</li>";
            if (!$record->DescrizioneAnnuncio)
                $error .= "<li>Descrizione annuncio</li>";
            if (!$record->TitoloAnnuncio_en)
                $error .= "<li>Titolo annuncio (inglese)</li>";
            if (!$record->DescrizioneAnnuncio_en)
                $error .= "<li>Descrizione annuncio (inglese)</li>";
            
            $copertina = FALSE;
            $foto = FALSE;
            $fotoId = $_REQUEST["foto_Id"];
            $fotoCopertina = $_REQUEST["foto_Copertina"];
            for ($i = 0; $i < count($fotoId); $i++) {
                if ($fotoId[$i] == "__FOTO_ID__")
                    continue;
                $foto = TRUE;
                if ($fotoCopertina[$i]) {
                    $copertina = TRUE;
                    break;
                }
            }
            if (!$foto)
                $error .= "<li>Almeno una foto</li>";
            if (!$copertina)
                $error .= "<li>Almeno una foto come copertina</li>";
            
            if ($error) {
                $error = $smarty->getConfigVariable("missing_fields") . "<ul>" . $error . "</ul>";
            } else {
                $checkFirstVersion = false;
                if(intval($record->Id) > 0){
                    $oldVersion = new Appartamento_Stanza($record->Id);
                    if(intval($oldVersion->Tipo) === 0 && intval($record->Tipo) > 0){
                        $checkFirstVersion = true;
                    }
                }
                
                if($record->Tipo > 0 && (intval($record->Id) <= 0 || $checkFirstVersion)){
                    
                    $postiLetti = array();
                    $associazione = new Appartamento_StanzaMultipla($record->IdStanzaMultipla);
                    $associazione->IdAppartamento = $record->IdAppartamento;
                    
                    $stanzaMultipla = new Appartamento_StanzaMultipla($record->IdStanzaMultipla);
                    $stanzaMultipla->setStanze();

                    //Salva le modifiche effettuate su tutti i posti letto
                    if(count($stanzaMultipla->Stanze) > 0){
                        foreach ($stanzaMultipla->Stanze as $key => $value) {
                            $record_clone = clone $record;
                            $record_clone->Id = $stanzaMultipla->Stanze[$key]->Id;
                            $postiLetti[] = $record_clone;
                        }
                    }

                    //Nel caso in cui da doppia si passi a tripla - Non il contrario. C'è bisogno di un delete
                    $counter = (($record->Tipo + 1) - count($stanzaMultipla->Stanze));
                    if($counter > 0){
                        for ($i = 0; $i <= $record->Tipo; $i++){
                            $record_clone = clone $record;
                            if(intval($record_clone->Id) > 0 && $i === 0){
                                $postiLetti[] = $record_clone;
                            }else{
                                $record_clone->Id = 0;
                                $postiLetti[] = $record_clone;
                            }
                        }
                    }
                    
                    $stop = 0;
                    $associazione->Stanze = array();
                    $associazione->Foto = array();
                    for ($index = 0; $index < count($postiLetti); $index++) {
                        $postoLetto = clone $postiLetti[$index];
                        if($index === 0 && intval($postoLetto->Id) <= 0 ){
                            $postoLetto->Numero = $postoLetto->Numero . " A";
                        }else if($index === 1 && intval($postoLetto->Id) <= 0 ){
                            $postoLetto->Numero = $postoLetto->Numero . " B";
                        }
                        
                        $isNew = ($postoLetto->Id < 1);
                        
                        if ($postoLetto->Save()) {
                            
                            $associazione->Stanze[] = clone $postoLetto;
                            // Salva le FOTO
                            if($postoLetto->Id > 0){
                                $foto = Appartamento_Stanza_Foto::Load($postoLetto->Id);
                                foreach ($foto as $f) {
                                    $f->Delete();
                                }
                            }
                            
                            
                            $fotoId = $_REQUEST["foto_Id"];
                            $fotoUrl = $_REQUEST["foto_Url"];
                            $fotoCopertina = $_REQUEST["foto_Copertina"];
                            $fotoColoreBordo = $_REQUEST["foto_ColoreBordo"];
                            $fotoDescrizione = $_REQUEST["foto_Descrizione"];
                            $fotoDescrizioneEn = $_REQUEST["foto_Descrizione_en"];
                            
                            if($index > 0 && count($fotoCopertina) > 1){
                                $iCopertina = array_search(1, $fotoCopertina);
                                $fotoCopertina[$iCopertina] = 0;
                                //All'interno di $fotoCopertina c'è  __FOTO_COPERTINA__, quindi -2
                                if($iCopertina === (count($fotoCopertina) - 2)){
                                    $fotoCopertina[$iCopertina - 1] = 1;
                                }else{
                                    $fotoCopertina[$iCopertina + 1] = 1;
                                }
                            }
                            
                            
                            for ($i = 0; $i < count($fotoId); $i++) {
                                if ($fotoId[$i] == "__FOTO_ID__")
                                    continue;
                                $f = new Appartamento_Stanza_Foto();
                                
                                $f->Id = 0;
                                $f->IdStanza = $postoLetto->Id;
                                $f->Url = stripslashes($fotoUrl[$i]);
                                $f->Copertina = $fotoCopertina[$i];
                                $f->ColoreBordo = stripslashes($fotoColoreBordo[$i]);
                                $f->Descrizione = stripslashes($fotoDescrizione[$i]);
                                $f->Descrizione_en = stripslashes($fotoDescrizioneEn[$i]);
                                $f->Save();
                                $associazione->Foto[] = $f;
                            }
                            
                        }else{
                            $stop++;
                        }
                    }
                    
                    //Associazione
                    $associazione->SaveRelationship();
                    
                    if(intval($stop) === 0 && count($associazione->Stanze) > 0){
                        Utils::RedirectTo ("?Id=" . $associazione->Stanze[0]->Id . "&saved=1");
                    }else{
                        if (isset($_GET["saved"]))
                            unset($_GET["saved"]);
                        $error = $smarty->getConfigVariable("error_generic");
                    }
                    
                    
                    
                }else{
                
                    if ($record->Save()) {

                        // Salva le FOTO
                        if (!isset($_REQUEST["foto_Id"])) {
                            $foto = Appartamento_Stanza_Foto::Load($record->Id);
                            foreach ($foto as $f) {
                                $f->Delete();
                            }
                        } else {
                            $fotoId = $_REQUEST["foto_Id"];
                            $fotoUrl = $_REQUEST["foto_Url"];
                            $fotoCopertina = $_REQUEST["foto_Copertina"];
                            $fotoColoreBordo = $_REQUEST["foto_ColoreBordo"];
                            $fotoDescrizione = $_REQUEST["foto_Descrizione"];
                            $fotoDescrizioneEn = $_REQUEST["foto_Descrizione_en"];
                            // Elimina le foto eliminate
                            if (!$isNew) {
                                $foto = Appartamento_Stanza_Foto::Load($record->Id);
                                foreach ($foto as $f) {
                                    if (!in_array($f->Id, $fotoId)) {
                                        $f->Delete();
                                    }
                                }
                            }
                            for ($i = 0; $i < count($fotoId); $i++) {
                                if ($fotoId[$i] == "__FOTO_ID__")
                                    continue;
                                $f = new Appartamento_Stanza_Foto();
                                if ($fotoId[$i] > 0)
                                    $f->Id = $fotoId[$i];
                                $f->IdStanza = $record->Id;
                                $f->Url = stripslashes($fotoUrl[$i]);
                                $f->Copertina = $fotoCopertina[$i];
                                $f->ColoreBordo = stripslashes($fotoColoreBordo[$i]);
                                $f->Descrizione = stripslashes($fotoDescrizione[$i]);
                                $f->Descrizione_en = stripslashes($fotoDescrizioneEn[$i]);
                                $f->Save();
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
            }
            break;
            
        case "delete":
            checkPrivilege(PRIV_STANZE_DELETE);
            $record->Delete();
            Utils::RedirectTo ("?IdAppartamento=" . $appartamento->Id);
            break;
        
        case "upload_foto":
            checkPrivilege(PRIV_STANZE_EDIT);
            $success = FALSE;
            $upload = new FileUpload("Foto", UPLOAD);
            $upload->SetAllowedExtensions(array("png", "jpg", "gif"));
            if (!$upload->IsUploaded()) {
                $error = "File non inviato " . print_r($_FILES, TRUE);
            } elseif (!$upload->IsFileAllowed()) {
                $error = "File non consentito";
            } elseif ($upload->Upload()) {
                $success = TRUE;
                $url = URL_UPLOAD . $upload->GetDestinationUrl();
                $error = json_encode(array(
                    "url" => $url,
                    "thumb" => htmlspecialchars(phpThumbURL(THUMB_FOTO_SMALL . urlencode(combinePath(URL_ROOT, $url)), '../phpThumb/phpThumb.php'))
                ));
            }
            Utils::PrintJson(Utils::JsonEncodeSuccessMessage($success, $error));
            break;
            
        case "upload_foto_multi":
            $ret = array();
            if (isset($_FILES["Foto"])) {
                $basefolder = date("Y") . "/" . date("m") . "/" . date("d") . "/";
                $output_dir = UPLOAD . $basefolder;
                $upload = new FileUpload("Foto");
                if (file_exists($output_dir) || @mkdir($output_dir, 0777, TRUE)) {
                    $error = $_FILES["Foto"]["error"];
                    // Se e' stato inviato un file singolo, lo trasforma in array
                    if (!is_array($_FILES["Foto"]["name"])) {
                        $_FILES["Foto"]["name"] = array($_FILES["Foto"]["name"]);
                        $_FILES["Foto"]["tmp_name"] = array($_FILES["Foto"]["tmp_name"]);
                    }
                    // Files multipli
                    $fileCount = count($_FILES["Foto"]["name"]);
                    for($i = 0; $i < $fileCount; ++$i) {
                        $fileName = $upload->GetTempname($upload->GetFilenameExtension($_FILES["Foto"]["name"][$i]));
                        if (@move_uploaded_file($_FILES["Foto"]["tmp_name"][$i], $output_dir . $fileName)) {
                            $url = URL_UPLOAD . $basefolder . $fileName;
                            $ret[] = json_encode(array(
                                "url" => $url,
                                "thumb" => htmlspecialchars(phpThumbURL(THUMB_FOTO_SMALL . urlencode(combinePath(URL_ROOT, $url)), '../phpThumb/phpThumb.php'))
                            ));
                        }
                    }
                }
            }
            Utils::PrintJson($ret, TRUE);
            break;
    }
}

checkPrivilege(PRIV_STANZE_VIEW);

if ($error)
    $smarty->assign("error", $error);
if (filter_input(INPUT_GET, "saved") === "1")
    $smarty->assign("saved", TRUE);

$smarty->assign("appartamentoId", $appartamento->Id);
$smarty->assign("aptUso", $appartamento->UsoImmobile);

$smarty->assign("appartamento", $appartamento->Indirizzo . ($appartamento->Civico ? ", " . $appartamento->Civico : ""));
$smarty->assign("canEdit", $AdminLogged->CanAccess(PRIV_STANZE_EDIT));

$idStanzaMultipla = 0;

if ($record) {
    $record = Utils::ObjectToArray($record);
    $inquilini = Inquilino_Stanza::LoadUltimoInquilino($record["Id"]);
    
    if($record["IdStanzaMultipla"] > 0){
        $idStanzaMultipla = $record["IdStanzaMultipla"];
    }
    
    $now = mktime();
    $inquilino_stanza = new Inquilino_Stanza();
    if (count($inquilini) > 0 && (!$inquilini[0]->DataFine || Utils::GetTimestamp($inquilini[0]->DataFine) > $now)) {
        $inquilino_stanza = $inquilini[0];
    }
    $record["PrezzoAttuale"] = $inquilino_stanza->Id < 1 ? "0" : strval($inquilino_stanza->Canone);
    $smarty->assign("record", $record);
    
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
    
    // Imposta la lista di valori SI/NO
    $smarty->assign("sino_values", array("0", "1"));
    $smarty->assign("sino_output", array("No", "S&igrave;"));
    
    // Imposta la lista di valori per TIPO STANZA
    $smarty->assign("tipo_values", array(STANZA_SINGOLA, STANZA_DOPPIA, STANZA_TRIPLA));
    $smarty->assign("tipo_output", array("Singola", "Doppia", "Tripla"));
    
    // Imposta la lista di valori per TIPO STANZA
    $smarty->assign("tipoLetto_values", array(LETTO_SINGOLO, LETTO_MATRIMONIALE));
    $smarty->assign("tipoLetto_output", array("Singolo", "Matrimoniale"));
    
    // Imposta la lista di valori per BAGNO
    $smarty->assign("bagno_values", array(BAGNO_COMUNE, BAGNO_PRIVATO));
    $smarty->assign("bagno_output", array("Comune", "Privato"));
    
    // Imposta la lista di valori per PAVIMENTO
    $smarty->assign("pavimento_values", array(PAVIMENTO_MATTONELLE, PAVIMENTO_PARQUET, PAVIMENTO_MOQUETTE, PAVIMENTO_MARMO, PAVIMENTO_CERAMICA, PAVIMENTO_PIASTRELLE));
    $smarty->assign("pavimento_output", array("Mattonelle", "Parquet", "Moquette", "Marmo", "Ceramica", "Piastrelle"));
    
    // Carica le foto
    if (isset($_REQUEST["action"]) && $_REQUEST["action"] == "save" && !isset($_REQUEST["foto_Id"]))
        $_REQUEST["foto_Id"] = array();
    if (isset($_REQUEST["foto_Id"])) {
        $foto = array();
        $fotoId = $_REQUEST["foto_Id"];
        $fotoUrl = $_REQUEST["foto_Url"];
        $fotoCopertina = $_REQUEST["foto_Copertina"];
        $fotoColoreBordo = $_REQUEST["foto_ColoreBordo"];
        $fotoDescrizione = $_REQUEST["foto_Descrizione"];
        $fotoDescrizioneEn = $_REQUEST["foto_Descrizione_en"];
        for ($i = 0; $i < count($fotoId); $i++) {
            if ($fotoId[$i] == "__FOTO_ID__")
                continue;
            $f = new Appartamento_Stanza_Foto();
            $f->Id = $fotoId[$i];
            $f->IdStanza = $record->Id;
            $f->Url = stripslashes($fotoUrl[$i]);
            $f->Copertina = $fotoCopertina[$i];
            $f->ColoreBordo = stripslashes($fotoColoreBordo[$i]);
            $f->Descrizione = stripslashes($fotoDescrizione[$i]);
            $f->Descrizione_en = stripslashes($fotoDescrizioneEn[$i]);
            $foto[] = Utils::ObjectToArray($f);
        }
    } else {
        $foto = Appartamento_Stanza_Foto::Load($record["Id"], NULL, TRUE);
    }
    for ($i = 0; $i < count($foto); $i++) {
        $foto[$i]["Thumb"] = htmlspecialchars(phpThumbURL(THUMB_FOTO_SMALL . urlencode(combinePath(URL_ROOT, $foto[$i]["Url"])), '../phpThumb/phpThumb.php'));
    }
    $smarty->assign("foto", $foto);
    
    $history_affitti = array();
    $recs = Inquilino_Stanza::Load($record["Id"]);
    foreach ($recs as $r) {
        $inquilino = new Inquilino($r->IdInquilino);
        $new = Utils::ObjectToArray($r);
        $new["DataInizio"] = (!$new["DataInizio"] ? "N.D." : date("d/m/Y", Utils::GetTimestamp($new["DataInizio"])));
        $new["DataFine"] = (!$new["DataFine"] ? "N.D." : date("d/m/Y", Utils::GetTimestamp($new["DataFine"])));
        $new["Inquilino"] = $inquilino->Nome . " " . $inquilino->Cognome;
        $history_affitti[] = $new;
    }
    $smarty->assign("history_affitti", $history_affitti);
}

$smarty->assign("idStanzaMultipla", $idStanzaMultipla);

$smarty->display('stanze.tpl');
