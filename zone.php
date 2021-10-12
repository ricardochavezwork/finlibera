<?php

include 'common.php';

$record = NULL;
$error = "";

if (isset($_REQUEST["Id"]))
    $record = new Zona(intval($_REQUEST["Id"]));

if (isset($_REQUEST["action"])) {
    switch ($_REQUEST["action"]) {
        
        case "load":
            $page = (isset($_REQUEST["page"]) ? intval($_REQUEST["page"]) : 1);
            $limit = (!isset($_REQUEST["rp"]) ? 0 : intval($_REQUEST["rp"]));
            $offset = Utils::GetPageOffset($page, $limit);
            $count = 0;
            $records = Zona::Load(TRUE, $limit, $offset, $count);
            for ($i = 0; $i < count($records); $i++) {
                $records[$i]["CellActions"] = "";
                if ($AdminLogged->CanAccess(PRIV_ZONE_DELETE))
                    $records[$i]["CellActions"] .= '<a href="#" class="button button_delete" onclick="javascript:deleteRecord(' . $records[$i]["Id"] . ')">Elimina</a>';
                if ($AdminLogged->CanAccess(PRIV_ZONE_EDIT) || $AdminLogged->CanAccess(PRIV_ZONE_VIEW))
                    $records[$i]["CellActions"] .= '<a href="?Id=' . $records[$i]["Id"] . '" class="button">Visualizza</a>';
            }
            Utils::PrintJson(Utils::JsonEncodeFlexigridMessage($records, $count, $page));
            break;
        
        case "save":
            checkPrivilege(PRIV_ZONE_EDIT);
            Utils::FillObjectFromRow($record, $_REQUEST, TRUE);
            if (!$record->Nome)
                $error .= "<li>" . $smarty->getConfigVariable("zona_nome") . "</li>";
            if (!$record->Mappa)
                $error .= "<li>Mappa</li>";
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
            checkPrivilege(PRIV_ZONE_DELETE);
            $record->Delete();
            Utils::RedirectToSelf(FALSE);
            break;
    }
}

checkPrivilege(PRIV_ZONE_VIEW);

if ($error)
    $smarty->assign("error", $error);
if (filter_input(INPUT_GET, "saved") === "1")
    $smarty->assign("saved", TRUE);

$smarty->assign("canEdit", $AdminLogged->CanAccess(PRIV_ZONE_EDIT));

if ($record) {
    $smarty->assign("record", Utils::ObjectToArray($record));
    
    // Imposta la lista di valori MAPPA
    $zone_values = array_merge(array(""), $ZONE);
    $zone_output = array_merge(array(""), $ZONE);
    $smarty->assign("mappa_values", $zone_values);
    $smarty->assign("mappa_output", $zone_output);
}

$smarty->display('zone.tpl');
