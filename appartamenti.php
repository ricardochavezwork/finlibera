<?php

include 'common.php';

$record = NULL;
$error = "";
$idAppartamento = $_GET["idAppartamento"];
$idAttribuzione = $_GET["idAttribuzione"];
$importo = $_GET["importo"];
$year = $_GET["year"];

if (isset($_REQUEST["Id"]))
    $record = new Appartamento(intval($_REQUEST["Id"]));

if (isset($_REQUEST["action"])) {
    switch ($_REQUEST["action"]) {

        case "load":
            setlocale(LC_MONETARY, 'it_IT');
            $indirizzo = (isset($_REQUEST["Indirizzo"]) ? stripslashes($_REQUEST["Indirizzo"]) : "");
            $page = (isset($_REQUEST["page"]) ? intval($_REQUEST["page"]) : 1);
            $limit = (!isset($_REQUEST["rp"]) ? 0 : intval($_REQUEST["rp"]));
            $offset = Utils::GetPageOffset($page, $limit);
            $sortname = filter_input(INPUT_POST, "sortname");
            $sortorder = filter_input(INPUT_POST, "sortorder");
            switch ($sortname) {
                case "Stanze":
                    $sortname = "countStanze(Id)";
                    break;
                case "Utile":
                    $sortname = "utileAppartamento(Id)";
                    break;
            }
            $count = 0;
            $records = Appartamento::Load($indirizzo, TRUE, $limit, $offset, $count, trim($sortname . " " . $sortorder));
            for ($i = 0; $i < count($records); $i++) {
                $records[$i]["Stanze"] = DataClass::CountRecords(Appartamento_Stanza::TABLE_NAME, "IdAppartamento = " . $records[$i]["Id"]);
                
                //Utile Attuale
                $utile = Appartamento::GetUtile($records[$i]["Id"]);
                $utileS = Appartamento::getUtileStanza($records[$i]["Id"], $utile, $records[$i]["Stanze"]);
                $records[$i]["Utile"] = intval($utile);
                $records[$i]["UtileStanza"] = intval($utileS);
                
                //Utile Proiettato
                $utilePro = Appartamento::GetUtileProiezione($records[$i]["Id"]);
                $utileSPro = Appartamento::getUtileStanza($records[$i]["Id"], $utilePro, $records[$i]["Stanze"]);
                $utileSDiff = $utileS - $utileSPro;
                $records[$i]["UtilePro"] = intval($utilePro);
                $records[$i]["UtileStanzaPro"] = intval($utileSPro);
                $records[$i]["UtileSDiff"] = intval($utileSDiff);
                
                $records[$i]["CellActions"] = "";
                if ($AdminLogged->CanAccess(PRIV_APT_DELETE))
                    $records[$i]["CellActions"] .= '<a href="#" class="button button_delete" onclick="javascript:deleteRecord(' . $records[$i]["Id"] . ')">Elimina</a>';
                if ($AdminLogged->CanAccess(PRIV_STANZE_VIEW))
                    $records[$i]["CellActions"] .= '<a href="stanze.php?IdAppartamento=' . $records[$i]["Id"] . '" class="button">Stanze</a>';
                if ($AdminLogged->CanAccess(PRIV_POSTIAUTO_VIEW))
                    $records[$i]["CellActions"] .= '<a href="postiauto.php?IdAppartamento=' . $records[$i]["Id"] . '" class="button">Posti Auto</a>';
                if ($AdminLogged->CanAccess(PRIV_APT_EDIT) || $AdminLogged->CanAccess(PRIV_APT_VIEW))
                    $records[$i]["CellActions"] .= '<a href="?Id=' . $records[$i]["Id"] . '" class="button">Visualizza</a>';
            }
            Utils::PrintJson(Utils::JsonEncodeFlexigridMessage($records, $count, $page));
            break;

        case "upload_foto":
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
            } else {
                $error = "Errore imprevisto";
                $lastError = error_get_last();
                if ($lastError && is_array($lastError) && count($lastError) > 0)
                    $error .= " (" . htmlentities($lastError["message"], ENT_QUOTES, 'UTF-8') . ")";
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

        case "save":
            checkPrivilege(PRIV_APT_EDIT);
            $record->DataInizioLocazione = sprintf("%s-%s-%s", filter_input(INPUT_POST, "DataInizioLocazione_Year"), filter_input(INPUT_POST, "DataInizioLocazione_Month"), filter_input(INPUT_POST, "DataInizioLocazione_Day"));
            $record->DataFineLocazione = sprintf("%s-%s-%s", filter_input(INPUT_POST, "DataFineLocazione_Year"), filter_input(INPUT_POST, "DataFineLocazione_Month"), filter_input(INPUT_POST, "DataFineLocazione_Day"));
            if (!Utils::IsValidDate($record->DataInizioLocazione))
                $record->DataInizioLocazione = "";
            if (!Utils::IsValidDate($record->DataFineLocazione))
                $record->DataFineLocazione = "";
            Utils::FillObjectFromRow($record, $_REQUEST, TRUE);
            if (!$record->Indirizzo)
                $error .= "<li>" . $smarty->getConfigVariable("apt_indirizzo") . "</li>";
            if (!$record->Civico)
                $error .= "<li>Civico</li>";
            if (!$record->CAP)
                $error .= "<li>C.A.P.</li>";
            if ($record->CedolareSecca < 0)
                $error .= "<li>Cedolare Secca</li>";
            if ($record->TipologiaImmobile <= 0)
                $error .= "<li>Tipologia Immobile</li>";
            if ($record->UsoImmobile <= 0)
                $error .= "<li>Uso</li>";
            if (!$record->Citta)
                $error .= "<li>Comune</li>";
            if (!$record->Provincia)
                $error .= "<li>Provincia</li>";
            if (!$record->Citofono)
                $error .= "<li>Citofono</li>";
            if ($record->TipoStabile === "" || $record->TipoStabile < 0)
                $error .= "<li>Tipo Stabile</li>";
            if ($record->Piano === "")
                $error .= "<li>Piano</li>";
            if (!$record->ClasseEnergetica)
                $error .= "<li>Classe Energetica</li>";
            if (!$record->IPE)
                $error .= "<li>IPE</li>";
            if ($record->Stanze <= 0)
                $error .= "<li>Stanze</li>";
            if ($record->Bagni <= 0)
                $error .= "<li>Bagni</li>";
            if ($record->Balconi === "" || $record->Balconi < 0)
                $error .= "<li>Balconi</li>";
            if ($record->Terrazzi === "" || $record->Terrazzi < 0)
                $error .= "<li>Terrazzi</li>";
            if ($record->Mq <= 0)
                $error .= "<li>Mq</li>";
            if ($record->BoilerAcqua === "" || $record->BoilerAcqua < 0)
                $error .= "<li>Boiler Acqua</li>";
            if ($record->PostoAuto === "" || $record->PostoAuto < 0)
                $error .= "<li>Posti Auto</li>";
            if ($record->PostoBici === "" || $record->PostoBici < 0)
                $error .= "<li>Posti Bici</li>";
            if ($record->UrlMappa === "")
                $error .= "<li>URL Mappa</li>";
            if ($record->UrlStreetView === "")
                $error .= "<li>URL Street View</li>";
            if ($record->Latitudine === "")
                $error .= "<li>Latitudine</li>";
            if ($record->Longitudine === "")
                $error .= "<li>Longitudine</li>";
            if ($record->Canone === "" || $record->PostoBici < 0)
                $error .= "<li>Canone</li>";
            if ($record->Spese === "")
                $error .= "<li>Spese</li>";
            if ($record->Bollette === "")
                $error .= "<li>Bollette</li>";
            /*if ($record->DataFineLocazione === "")
                $error .= "<li>Data fine locazione</li>";*/

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
                $isNew = ($record->Id < 1);
                if ($record->Save()) {

                    // Salva i MEZZI PUBBLICI
                    if (!isset($_REQUEST["mezzi_Id"])) {
                        $mezzi = Appartamento_Mezzo::Load($record->Id);
                        foreach ($mezzi as $mezzo) {
                            $mezzo->Delete();
                        }
                    } else {
                        $mezziId = $_REQUEST["mezzi_Id"];
                        $mezziTipo = $_REQUEST["mezzi_Tipo"];
                        $mezziMetro = $_REQUEST["mezzi_Metro"];
                        $mezziMezzo = $_REQUEST["mezzi_Mezzo"];
                        $mezziDistanza = $_REQUEST["mezzi_Distanza"];
                        // Elimina i mezzi eliminati
                        if (!$isNew) {
                            $mezzi = Appartamento_Mezzo::Load($record->Id);
                            foreach ($mezzi as $mezzo) {
                                if (!in_array($mezzo->Id, $mezziId)) {
                                    $mezzo->Delete();
                                }
                            }
                        }
                        for ($i = 0; $i < count($mezziId); $i++) {
                            if ($mezziId[$i] == "__MEZZO_ID__")
                                continue;
                            $mezzo = new Appartamento_Mezzo();
                            if ($mezziId[$i] > 0)
                                $mezzo->Id = $mezziId[$i];
                            $mezzo->IdAppartamento = $record->Id;
                            $mezzo->Tipo = stripslashes($mezziTipo[$i]);
                            $mezzo->Metro = ($mezzo->Tipo == MEZZI_METROPOLITANA ? stripslashes($mezziMetro[$i]) : "");
                            $mezzo->Mezzo = stripslashes($mezziMezzo[$i]);
                            $mezzo->Distanza = stripslashes($mezziDistanza[$i]);
                            $mezzo->Save();
                        }
                    }

                    // Salva i PUNTI DI INTERESSE
                    if (!isset($_REQUEST["poi_Id"])) {
                        $poi = Appartamento_POI::Load($record->Id);
                        foreach ($poi as $p) {
                            $p->Delete();
                        }
                    } else {
                        $poiId = $_REQUEST["poi_Id"];
                        $poiNome = $_REQUEST["poi_Nome"];
                        $poiMappa = $_REQUEST["poi_UrlMappa"];
                        $poiStreetView = $_REQUEST["poi_UrlStreetView"];
                        // Elimina i punti eliminati
                        if (!$isNew) {
                            $poi = Appartamento_POI::Load($record->Id);
                            foreach ($poi as $p) {
                                if (!in_array($p->Id, $poiId)) {
                                    $p->Delete();
                                }
                            }
                        }
                        for ($i = 0; $i < count($poiId); $i++) {
                            if ($poiId[$i] == "__POI_ID__")
                                continue;
                            $p = new Appartamento_POI();
                            if ($poiId[$i] > 0)
                                $p->Id = $poiId[$i];
                            $p->IdAppartamento = $record->Id;
                            $p->Nome = stripslashes($poiNome[$i]);
                            $p->UrlMappa = stripslashes($poiMappa[$i]);
                            $p->UrlStreetView = stripslashes($poiStreetView[$i]);
                            $p->Save();
                        }
                    }

                    // Salva le FOTO
                    if (!isset($_REQUEST["foto_Id"])) {
                        $foto = Appartamento_Foto::Load($record->Id);
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
                            $foto = Appartamento_Foto::Load($record->Id);
                            foreach ($foto as $f) {
                                if (!in_array($f->Id, $fotoId)) {
                                    $f->Delete();
                                }
                            }
                        }
                        for ($i = 0; $i < count($fotoId); $i++) {
                            if ($fotoId[$i] == "__FOTO_ID__")
                                continue;
                            $f = new Appartamento_Foto();
                            if ($fotoId[$i] > 0)
                                $f->Id = $fotoId[$i];
                            $f->IdAppartamento = $record->Id;
                            $f->Url = stripslashes($fotoUrl[$i]);
                            $f->Copertina = $fotoCopertina[$i];
                            $f->ColoreBordo = stripslashes($fotoColoreBordo[$i]);
                            $f->Descrizione = stripslashes($fotoDescrizione[$i]);
                            $f->Descrizione_en = stripslashes($fotoDescrizioneEn[$i]);
                            $f->Save();
                        }
                    }
                    
                    //Salvataggio di Appartamento_Contratto
                    $contratti = $_REQUEST["contratti"];
                    if($isNew && count($contratti) > 0){
                        foreach ($contratti as $key => $contratto) {
                            $row = new Appartamento_Contratto($contratto);
                            $row->Id = 0;
                            $row->IdAppartamento = $record->Id;
                            $row->Save();
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
            checkPrivilege(PRIV_APT_DELETE);
            $record->Delete();
            Utils::RedirectToSelf(FALSE);
            break;

        case "autocomplete":
            $result = "";
            $term = (!isset($_REQUEST["term"]) ? "" : trim(stripslashes($_REQUEST["term"])));
            if ($term) {
                $appartamenti = Appartamento::Load($term);
                foreach ($appartamenti as $i) {
                    $result[] = "[" . $i->Id . "] " . $i->Indirizzo . ($i->Civico ? " " . $i->Civico : "");
                }
            }
            Utils::PrintJson($result, TRUE);
            break;
        case "saveTassa":
            $controllo = Appartamento_Tasse::GetTax($idAppartamento, $idAttribuzione, $year);
            $success = true;
            if($controllo > 0){
                $alert = "Attenzione: Tassa presente, nessun dato registrato!";
                $success = false;
            }else{
                $tassa = new Appartamento_Tasse();
                $tassa->IdAppartamento = $idAppartamento;
                $tassa->IdAttribuzione = $idAttribuzione;
                $tassa->Importo = $importo;
                $tassa->Anno = $year;
                if($tassa->Save()){
                    $alert = "Salvataggio avvenuto con successo!";
                }else{
                    $alert = "Errore durante il salvataggio! Riprova più tardi.";
                    $success = false;
                }
            }
            //Utils::PrintJson($controllo);
            Utils::PrintJson(Utils::JsonEncodeSuccessMessage($success, $alert));
            break;
    }
}

checkPrivilege(PRIV_APT_VIEW);

if ($error)
    $smarty->assign("error", $error);
if (filter_input(INPUT_GET, "saved") === "1")
    $smarty->assign("saved", TRUE);

$smarty->assign("canEdit", $AdminLogged->CanAccess(PRIV_APT_EDIT));
if ($record) {
    $smarty->assign("record", Utils::ObjectToArray($record));

    // Imposta la lista delle Zone
    $zone_values = array();
    $zone_output = array();
    $zone = Zona::Load();
    foreach ($zone as $z) {
        $zone_values[] = $z->Id;
        $zone_output[] = $z->Mappa . " - " . $z->Nome;
    }
    $smarty->assign("zona_values", $zone_values);
    $smarty->assign("zona_output", $zone_output);

    // Imposta la lista di valori SI/NO
    $smarty->assign("sino_values", array("0", "1"));
    $smarty->assign("sino_output", array("No", "S&igrave;"));

    //SOCIETA
    $smarty->assign("societa_values", array(FINLIBERA, ECOLIBERA));
    $smarty->assign("t_societa", array("FINLIBERA", "ECOLIBERA"));

    // Imposta la lista di valori per RISCALDAMENTO
    $smarty->assign("riscaldamento_values", array(RISCALDAMENTO_NO, RISCALDAMENTO_AUTONOMO, RISCALDAMENTO_CENTRALIZZATO));
    $smarty->assign("riscaldamento_output", array("No", "Autonomo", "Centralizzato"));

    // Imposta la lista di valori per TIPO MEZZO PUBBLICO
    $smarty->assign("tipomezzo_values", array(MEZZI_BUSTRAM, MEZZI_METROPOLITANA, MEZZI_PASSANTE));
    $smarty->assign("tipomezzo_output", array("Bus/Tram", "Metropolitana", "Passante"));

    // Imposta la lista di valori per TIPO STABILE
    $smarty->assign("tipostabile_values", array("", TIPOSTABILE_SIGNORILE, TIPOSTABILE_CIVILE, TIPOSTABILE_CASA_INDIPENDENTE, TIPOSTABILE_VILLA_INDIPENDENTE, TIPOSTABILE_APPARTAMENTO_VILLA));
    $smarty->assign("tipostabile_output", array("", "Stabile signorile", "Stabile civile", "Casa indipendente", "Villa indipendente", "Appartamento in villa"));

    // Cedolare Secca
    $smarty->assign("cedolaresecca_values", array(-1, CEDOLARESECCA_NONE, CEDOLARESECCA_YES));
    $smarty->assign("cedolaresecca_output", array("scegli", "NO", "SI"));
    
    // Tipologia Immobile
    $smarty->assign("tipoImmobile_values", array(IMMOBILE_TIPOLOGIA_NONE, IMMOBILE_TIPOLOGIA_APPARTAMENTO, IMMOBILE_TIPOLOGIA_LOFT, IMMOBILE_TIPOLOGIA_VILLA));
    $smarty->assign("tipoImmobile_output", array("scegli", "Appartamento", "Loft", "Villa"));

    // Uso Immobile
    $smarty->assign("usoImmobile_values", array(IMMOBILE_USO_NONE, IMMOBILE_USO_IN_CONDIVISIONE, IMMOBILE_USO_INDIPENDENTE));
    $smarty->assign("usoImmobile_output", array("scegli", "In condivisione", "Indipendente"));

    
    // Imposta la lista delle metropolitane
    $metro_values = array();
    $metro_output = array();
    foreach ($METRO as $m) {
        $metro_values[] = $m;
        $metro_output[] = $m;
    }
    $smarty->assign("metro_values", $metro_values);
    $smarty->assign("metro_output", $metro_output);

    // Imposta la lista dei POI
    $allPOI = Appartamento_POI::LoadAll();
    $smarty->assign("allPOI", $allPOI);

    // Imposta la lista delle linee suburbane
    $passanti_values = array();
    $passanti_output = array();
    foreach ($PASSANTI as $m) {
        $passanti_values[] = $m;
        $passanti_output[] = $m;
    }
    $smarty->assign("passanti_values", $passanti_values);
    $smarty->assign("passanti_output", $passanti_output);

    // Imposta la lista delle linee suburbane
    /*$bus_values = array();
    $bus_output = array();
    foreach ($BUS as $m) {
        $bus_values[] = $m;
        $bus_output[] = $m;
    }
    $smarty->assign("bus_values", $bus_values);
    $smarty->assign("bus_output", $bus_output);*/

    // Carica le Nazioni
    $countries_values = array();
    $countries_output = array();
    $countries_selected = $record->Nazione;
    $countries = Nazione::Load();
    foreach ($countries as $country) {
        $countries_values[] = $country->Codice;
        $countries_output[] = $country->Nome;
    }
    $smarty->assign("countries_values", $countries_values);
    $smarty->assign("countries_output", $countries_output);
    $smarty->assign("countries_selected", $countries_selected);

    // Carica i mezzi pubblici
    if (isset($_REQUEST["action"]) && $_REQUEST["action"] == "save" && !isset($_REQUEST["mezzi_Id"]))
        $_REQUEST["mezzi_Id"] = array();
    if (isset($_REQUEST["mezzi_Id"])) {
        $mezzi = array();
        $mezziId = $_REQUEST["mezzi_Id"];
        $mezziTipo = $_REQUEST["mezzi_Tipo"];
        $mezziMetro = $_REQUEST["mezzi_Metro"];
        $mezziMezzo = $_REQUEST["mezzi_Mezzo"];
        $mezziDistanza = $_REQUEST["mezzi_Distanza"];
        for ($i = 0; $i < count($mezziId); $i++) {
            if ($mezziId[$i] == "__MEZZO_ID__")
                continue;
            $mezzo = new Appartamento_Mezzo();
            if ($mezziId[$i] > 0)
                $mezzo->Id = $mezziId[$i];
            $mezzo->IdAppartamento = $record->Id;
            $mezzo->Tipo = $mezziTipo[$i];
            $mezzo->Metro = ($mezzo->Tipo == MEZZI_METROPOLITANA ? $mezziMetro[$i] : "");
            $mezzo->Mezzo = $mezziMezzo[$i];
            $mezzo->Distanza = $mezziDistanza[$i];
            $mezzi[] = Utils::ObjectToArray($mezzo);
        }
    } else {
        $mezzi = Appartamento_Mezzo::Load($record->Id, TRUE);
    }
    $smarty->assign("mezzi", $mezzi);

    // Carica i punti di interesse
    if (isset($_REQUEST["action"]) && $_REQUEST["action"] == "save" && !isset($_REQUEST["poi_Id"]))
        $_REQUEST["poi_Id"] = array();
    if (isset($_REQUEST["poi_Id"])) {
        $poi = array();
        $poiId = $_REQUEST["poi_Id"];
        $poiNome = $_REQUEST["poi_Nome"];
        $poiMappa = $_REQUEST["poi_UrlMappa"];
        $poiStreetView = $_REQUEST["poi_UrlStreetView"];
        for ($i = 0; $i < count($poiId); $i++) {
            if ($poiId[$i] == "__POI_ID__")
                continue;
            $p = new Appartamento_POI();
            if ($poiId[$i] > 0)
                $p->Id = $poiId[$i];
            $p->IdAppartamento = $record->Id;
            $p->Nome = $poiNome[$i];
            $p->UrlMappa = $poiMappa[$i];
            $p->UrlStreetView = $poiStreetView[$i];
            $poi[] = Utils::ObjectToArray($p);
        }
    } else {
        $poi = Appartamento_POI::Load($record->Id, TRUE);
    }
    $smarty->assign("poi", $poi);

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
            $f = new Appartamento_Foto();
            $f->Id = $fotoId[$i];
            $f->IdAppartamento = $record->Id;
            $f->Url = stripslashes($fotoUrl[$i]);
            $f->Copertina = $fotoCopertina[$i];
            $f->ColoreBordo = stripslashes($fotoColoreBordo[$i]);
            $f->Descrizione = stripslashes($fotoDescrizione[$i]);
            $f->Descrizione_en = stripslashes($fotoDescrizioneEn[$i]);
            $foto[] = Utils::ObjectToArray($f);
        }
    } else {
        $foto = Appartamento_Foto::Load($record->Id, NULL, TRUE);
    }
    for ($i = 0; $i < count($foto); $i++) {
        $foto[$i]["Thumb"] = htmlspecialchars(phpThumbURL(THUMB_FOTO_SMALL . urlencode(combinePath(URL_ROOT, $foto[$i]["Url"])), '../phpThumb/phpThumb.php'));
    }
    $smarty->assign("foto", $foto);

    //Carica le tasse
    $count = 0;
    $tasse = array();
    if (intval($record->Id) > 0) {
      $tasse = Appartamento_Tasse::Load($record->Id, null, TRUE, null, null, $count, " Anno, Id");
      /*foreach ($tasse as $key=>$row){
          $attribuzione = new Attribuzione($row->IdAttribuzione);
          $tasse[$key]["t_Attribuzione"] = $attribuzione->Titolo;
      }*/
      for($i = 0; $i < count($tasse); $i++){
          $attribuzione = new Attribuzione($tasse[$i]["IdAttribuzione"]);
          $tasse[$i]["t_Attribuzione"] = $attribuzione->Titolo;
      }
    }
    $smarty->assign("tasse", $tasse);
    //Carica gli attributi
    $attribuzioni = Attribuzione::Load(TRUE);
    $attribuzioni_values[] = 0;
    $attribuzioni_output[] = "Scegliere un'opzione";
    for($i = 0; $i < count($attribuzioni); $i++){
        $attribuzioni_values[] = $attribuzioni[$i]["Id"];
        $attribuzioni_output[] = $attribuzioni[$i]["Titolo"];
    }
    //$smarty->assign("attribuzioni", $attribuzioni);
    $smarty->assign("attribuzioni_values", $attribuzioni_values);
    $smarty->assign("attribuzioni_output", $attribuzioni_output);

    //CountStanze
    $countStanze = Appartamento::countStanze($record->Id);
    $smarty->assign("countStanze", $countStanze);

    /*
    * ENCODED VERSION : Permette di assegnare facilmente un oggetto php a una variabile JS.
    */
    $smarty->assign("record_encoded", json_encode($record));
    $smarty->assign("adminLogged_encoded", json_encode($AdminLogged));


}

$smarty->display('appartamenti.tpl');
