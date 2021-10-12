<?php

include 'common.php';

$record = NULL;
$error = "";

if (isset($_REQUEST["Id"])) {
    $record = new Richiedente(intval($_REQUEST["Id"]));
    if ($record->Id < 1)
        Utils::RedirectTo ("?");
}

if (isset($_REQUEST["action"])) {
    switch ($_REQUEST["action"]) {
        
        case "load":
            $page = (isset($_REQUEST["page"]) ? intval($_REQUEST["page"]) : 1);
            $limit = (!isset($_REQUEST["rp"]) ? 0 : intval($_REQUEST["rp"]));
            $offset = Utils::GetPageOffset($page, $limit);
            $sortname = filter_input(INPUT_POST, "sortname");
            $sortorder = filter_input(INPUT_POST, "sortorder");
            $count = 0;
            switch ($sortname) {
                case "Stanza":
                    $sortname = "getNomeStanza(IdStanza)";
                    break;

                default:
                    break;
            }
            $records = Richiedente::Load(TRUE, $limit, $offset, $count, trim($sortname . " " . $sortorder));
            $zone = Zona::Load();
            for ($i = 0; $i < count($records); $i++) {
                $records[$i]["DataRegistrazione"] = strftime("%d/%m/%Y %H:%M", Utils::GetTimestamp($records[$i]["DataRegistrazione"]));
                if ($records[$i]["Email"])
                    $records[$i]["Email"] = sprintf ('<a href="mailto:%s">%s</a>', $records[$i]["Email"], $records[$i]["Email"]);
                if ($records[$i]["IdStanza"] > 0) {
                    $stanza = new Appartamento_Stanza($records[$i]["IdStanza"]);
                    if ($stanza->Id > 0) {
                        $appartamento = new Appartamento($stanza->IdAppartamento);
                        $records[$i]["Stanza"] = '<a href="stanze.php?Id=' . $records[$i]["IdStanza"] . '">' . htmlentities($appartamento->Indirizzo . " - " . $stanza->Numero, ENT_QUOTES, "UTF-8") . '</a>';
                    } else {
                        $records[$i]["Stanza"] = "Stanza non valida";
                    }
                } else {
                    $zona = $records[$i]["Zona"];
                    foreach ($zone as $z) {
                        if ($z->Mappa == $records[$i]["Zona"]) {
                            $zona .= " " . $z->Nome;
                            break;
                        }
                    }
                    $records[$i]["Stanza"] = sprintf("<strong>Disponibile da:</strong> %s<br/><strong>Prezzo:</strong> %s<br/><strong>Zona:</strong> %s<br/><strong>Metro:</strong> %s",
                            date("d/m/Y", Utils::GetTimestamp($records[$i]["Disponibilita"])),
                            strval($records[$i]["Prezzo"]) . " &#128;",
                            htmlentities($zona, ENT_QUOTES, "UTF-8"),
                            htmlentities($records[$i]["Metro"], ENT_QUOTES, "UTF-8"));
                }
                $records[$i]["CellActions"] = "";
                if ($AdminLogged->CanAccess(PRIV_RICHIEDENTI_DELETE))
                    $records[$i]["CellActions"] .= '<a href="#" class="button button_delete" onclick="javascript:deleteRecord(' . $records[$i]["Id"] . ')">Elimina</a>';
                if ($AdminLogged->CanAccess(PRIV_RICHIEDENTI_EDIT) || $AdminLogged->CanAccess(PRIV_RICHIEDENTI_VIEW))
                    $records[$i]["CellActions"] .= '<a href="?Id=' . $records[$i]["Id"] . '" class="button">Visualizza</a>';
            }
            Utils::PrintJson(Utils::JsonEncodeFlexigridMessage($records, $count, $page));
            break;
        
        case "save":
            checkPrivilege(PRIV_RICHIEDENTI_EDIT);
            Utils::FillObjectFromRow($record, $_REQUEST, TRUE);
            if (!$record->Cognome)
                $error .= "<li>" . $smarty->getConfigVariable("inq_cognome") . "</li>";
            if (!$record->Nome)
                $error .= "<li>" . $smarty->getConfigVariable("inq_nome") . "</li>";
            if (!$record->Email && !$record->Telefono)
                $error .= "<li>Telefono oppure Email</li>";
            if ($error) {
                $error = $smarty->getConfigVariable("missing_fields") . "<ul>" . $error . "</ul>";
            } else {
                $isNew = ($record->Id < 1);
                if ($record->Save()) {
                    
                    Utils::RedirectTo ("?Id=" . $record->Id . "&saved=1");
                    
                } else {
                    if (isset($_GET["saved"]))
                        unset($_GET["saved"]);
                    $error = $smarty->getConfigVariable("error_generic");
                }
            }
            break;
            
        case "delete":
            checkPrivilege(PRIV_RICHIEDENTI_DELETE);
            $record->Delete();
            Utils::RedirectToSelf(FALSE);
            break;
    }
}

checkPrivilege(PRIV_RICHIEDENTI_VIEW);

if ($error)
    $smarty->assign("error", $error);
if (filter_input(INPUT_GET, "saved") === "1")
    $smarty->assign("saved", TRUE);

$smarty->assign("canEdit", $AdminLogged->CanAccess(PRIV_RICHIEDENTI_EDIT));
if ($record) {
    
    $record = Utils::ObjectToArray($record);
    
    $record["DataRegistrazione"] = strftime("%d/%m/%Y %H:%M", Utils::GetTimestamp($record["DataRegistrazione"]));
    $record["Disponibilita"] = date("d/m/Y", Utils::GetTimestamp($record["Disponibilita"]));
    
    $zone = Zona::Load();
    $zona = $record["Zona"];
    foreach ($zone as $z) {
        if ($z->Mappa == $record["Zona"]) {
            $zona .= " " . $z->Nome;
            break;
        }
    }
    $record["Zona"] = $zona;
    
    $smarty->assign("record", $record);
    
    // Imposta la lista di valori SESSO
    $smarty->assign("sesso_values", array("M", "F"));
    $smarty->assign("sesso_output", array("Maschile", "Femminile"));
    
    // Imposta la lista di valori per PROFESSIONE
    $smarty->assign("professione_values", array(PROFESSIONE_NONE, PROFESSIONE_STUDENTE, PROFESSIONE_PROFESSIONISTA));
    $smarty->assign("professione_output", array(getProfessione(PROFESSIONE_NONE), getProfessione(PROFESSIONE_STUDENTE), getProfessione(PROFESSIONE_PROFESSIONISTA)));
    
    // Imposta la lista di valori per STATO
    $smarty->assign("stato_values", array(STATO_RICHIESTA_CONTATTARE, STATO_RICHIESTA_INATTESA, STATO_RICHIESTA_NONINTERESSATO, STATO_RICHIESTA_APPUNTAMENTO));
    $smarty->assign("stato_output", array("Contattare", "In attesa", "Non interessato", "Appuntamento"));
    
    // Imposta la lista di valori per TIPO MEZZO PUBBLICO
    $specializzazioni = Inquilino::LoadSpecializzazioni();
    for ($i = 0; $i < count($specializzazioni); ++$i) {
        $specializzazioni[$i] = str_replace('"', '\"', $specializzazioni[$i]);
    }
    $smarty->assign("specializzazioni", $specializzazioni);
    
    // Carica la stanza
    $stanza = new Appartamento_Stanza($record["IdStanza"]);
    $appartamento = new Appartamento($stanza->IdAppartamento);
    $smarty->assign("stanza", Utils::ObjectToArray($stanza));
    $smarty->assign("appartamento", Utils::ObjectToArray($appartamento));
}

$smarty->display('richiedenti.tpl');
