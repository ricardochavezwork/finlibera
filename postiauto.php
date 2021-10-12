<?php

include 'common.php';

$record = NULL;
$error = "";

if (isset($_REQUEST["Id"]))
    $record = new Appartamento_PostoAuto(intval($_REQUEST["Id"]));

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
            $count = 0;
            $records = Appartamento_PostoAuto::Load($appartamento->Id, TRUE, NULL, NULL, $count, trim($sortname . " " . $sortorder));
            for ($i = 0; $i < count($records); $i++) {
                $records[$i]["Posto"] = getPostoAuto($records[$i]["Posto"]);
                $records[$i]["Tipo"] = getTipoPostoAuto($records[$i]["Tipo"]);
                $records[$i]["CellActions"] = "";
                if ($AdminLogged->CanAccess(PRIV_POSTIAUTO_DELETE))
                    $records[$i]["CellActions"] .= '<a href="#" class="button button_delete" onclick="javascript:deleteRecord(' . $records[$i]["Id"] . ')">Elimina</a>';
                if ($AdminLogged->CanAccess(PRIV_POSTIAUTO_EDIT) || $AdminLogged->CanAccess(PRIV_POSTIAUTO_VIEW))
                    $records[$i]["CellActions"] .= '<a href="?Id=' . $records[$i]["Id"] . '" class="button">Visualizza</a>';
            }
            Utils::PrintJson(Utils::JsonEncodeFlexigridMessage($records, $count, $page));
            break;
            
        case "save":
            checkPrivilege(PRIV_POSTIAUTO_EDIT);
            Utils::FillObjectFromRow($record, $_REQUEST, TRUE);
            if ($record->Numero <= 0)
                $error .= "<li>Numero</li>";
            if ($record->Posto <= POSTOAUTO_NONE || $record->Posto > POSTOAUTO_DOPPIO)
                $error .= "<li>Posto</li>";
            if ($record->Tipo <= TIPOPOSTOAUTO_NONE || $record->Tipo > TIPOPOSTOAUTO_SCOPERTO)
                $error .= "<li>Tipo</li>";
            if ($record->Mq <= 0)
                $error .= "<li>Mq</li>";
            if ($record->Prezzo <= 0)
                $error .= "<li>Prezzo</li>";
            if (!$record->Descrizione)
                $error .= "<li>Descrizione</li>";
            //if ($record->Foto)
            //    $error .= "<li>Foto</li>";
            
            if ($error) {
                $error = $smarty->getConfigVariable("missing_fields") . "<ul>" . $error . "</ul>";
            } else {
                
                // Rimuovi foto
                if (isset($_REQUEST["DeleteFoto"]) && ($_REQUEST["DeleteFoto"] == "1" || $_REQUEST["DeleteFoto"] == "on")) {
                    $record->Foto = "";
                } else if (isset($_FILES["UploadFoto"])) {
                    // Upload foto
                    $upload = new FileUpload("UploadFoto", UPLOAD);
                    $upload->SetAllowedExtensions(array("png", "jpg", "gif"));
                    if (!$upload->IsUploaded()) {
                        //$error = "File non inviato " . print_r($_FILES, TRUE);
                    } elseif (!$upload->IsFileAllowed()) {
                        $error = "File non consentito";
                    } elseif ($upload->Upload()) {
                        $record->Foto = URL_UPLOAD . $upload->GetDestinationUrl();
                        /*$error = json_encode(array(
                            "url" => $url,
                            "thumb" => htmlspecialchars(phpThumbURL(THUMB_FOTO_SMALL . urlencode(combinePath(URL_ROOT, $url)), '../phpThumb/phpThumb.php'))
                        ));*/
                    }
                }
            }
            
            if (!$error) {
                $isNew = ($record->Id < 1);
                if ($record->Save()) {
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
            checkPrivilege(PRIV_STANZE_DELETE);
            $record->Delete();
            Utils::RedirectTo ("?IdAppartamento=" . $appartamento->Id);
            break;
    }
}

checkPrivilege(PRIV_POSTIAUTO_VIEW);

if ($error)
    $smarty->assign("error", $error);
if (filter_input(INPUT_GET, "saved") === "1")
    $smarty->assign("saved", TRUE);

$smarty->assign("appartamentoId", $appartamento->Id);
$smarty->assign("appartamento", $appartamento->Indirizzo . ($appartamento->Civico ? ", " . $appartamento->Civico : ""));
$smarty->assign("canEdit", $AdminLogged->CanAccess(PRIV_POSTIAUTO_EDIT));

if ($record) {
    $record = Utils::ObjectToArray($record);
    $record["FotoThumb"] = phpThumbURL(THUMB_FOTO_SMALL . urlencode(combinePath(URL_ROOT, $record["Foto"])), '../phpThumb/phpThumb.php');
    $smarty->assign("record", $record);
    
    // Imposta la lista di valori per POSTO
    $smarty->assign("posti_values", array(POSTOAUTO_NONE, POSTOAUTO_SINGOLO, POSTOAUTO_DOPPIO));
    $smarty->assign("posti_output", array("[Nessuno]", getPostoAuto(POSTOAUTO_SINGOLO), getPostoAuto(POSTOAUTO_DOPPIO)));
    
    // Imposta la lista di valori per TIPO
    $smarty->assign("tipo_values", array(TIPOPOSTOAUTO_NONE, TIPOPOSTOAUTO_BOX, TIPOPOSTOAUTO_COPERTO, TIPOPOSTOAUTO_SCOPERTO));
    $smarty->assign("tipo_output", array("[Nessuno]", getTipoPostoAuto(TIPOPOSTOAUTO_BOX), getTipoPostoAuto(TIPOPOSTOAUTO_COPERTO), getTipoPostoAuto(TIPOPOSTOAUTO_SCOPERTO)));
}

$smarty->display('postiauto.tpl');
