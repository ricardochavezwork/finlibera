<?php

include 'common.php';

$record = NULL;
$error = "";

if (isset($_REQUEST["Id"])) {
    $record = new AdminAccount(intval($_REQUEST["Id"]));
    /*if ($record->Id == $AdminLogged->Id)
        Utils::RedirectTo ("?");*/
}

if (isset($_REQUEST["action"])) {
    switch ($_REQUEST["action"]) {
        
        case "load":
            $page = (isset($_REQUEST["page"]) ? intval($_REQUEST["page"]) : 1);
            $limit = (!isset($_REQUEST["rp"]) ? 0 : intval($_REQUEST["rp"]));
            $offset = Utils::GetPageOffset($page, $limit);
            $count = 0;
            $records = AdminAccount::Load("", $limit, $offset, $count, TRUE);
            for ($i = 0; $i < count($records); $i++) {
                $records[$i]["Amministratore"] = ($records[$i]["Amministratore"] ? "SI" : "NO");
                $records[$i]["CellActions"] = "";
                $records[$i]["Inquilini"] = AdminAccount::NumInquilini($records[$i]["Id"]);
                $records[$i]["Stanze"] = AdminAccount::NumStanze($records[$i]["Id"]);
                $records[$i]["Appartamenti"] = AdminAccount::numAppartamenti($records[$i]["Id"]);
                $records[$i]["Stabili"] = AdminAccount::NumStabili($records[$i]["Id"]);
                
          
                    if ($AdminLogged->CanAccess(PRIV_ADMINACC_DELETE)){
                        $records[$i]["CellActions"] .= '<a href="#" class="button button_delete" onclick="javascript:deleteRecord(' . $records[$i]["Id"] . ')">Elimina</a>';
                    }
                    if ($AdminLogged->CanAccess(PRIV_ADMINACC_EDIT) || $AdminLogged->CanAccess(PRIV_ADMINACC_VIEW)){
                        $records[$i]["CellActions"] .= '<a href="?Id=' . $records[$i]["Id"] . '" class="button">Visualizza</a>';
                    }
                    
                
                
            }
            Utils::PrintJson(Utils::JsonEncodeFlexigridMessage($records, $count, $page));
            break;
        
        case "save":
            checkPrivilege(PRIV_ADMINACC_EDIT);
            $password = $record->Password;
            Utils::FillObjectFromRow($record, $_REQUEST, TRUE);
            if (!$record->Username)
                $error .= "<li>Nome utente</li>";
            if ($record->Id < 1 && !$record->Password)
                $error .= "<li>Password</li>";
            if (!$record->Telefono)
                $error .= "<li>Telefono</li>";
            if ($error) {
                $error = $smarty->getConfigVariable("missing_fields") . "<ul>" . $error . "</ul>";
            } else {
                
                $accesso = "";
                $privilegi = $_REQUEST["Privilegi"];
                if ($privilegi && is_array($privilegi)) {
                    foreach ($privilegi as $i) {
                        if ($i)
                            $accesso .= ($accesso ? "," : "") . $i;
                    }
                }
                $record->SetAccesso($accesso);
                
                if ($record->Id > 0 && !$record->Password)
                    $record->Password = $password;
                else
                    $record->Password = sha1($record->Password);
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
            checkPrivilege(PRIV_ADMINACC_DELETE);
            $record->Delete();
            Utils::RedirectToSelf(FALSE);
            break;
    }
}

checkPrivilege(PRIV_ADMINACC_VIEW);

if ($error)
    $smarty->assign("error", $error);
if (filter_input(INPUT_GET, "saved") === "1")
    $smarty->assign("saved", TRUE);

$smarty->assign("canEdit", $AdminLogged->CanAccess(PRIV_ADMINACC_EDIT));

if ($record) {
    $smarty->assign("record", Utils::ObjectToArray($record));
    $smarty->assign("privilegi", $record->GetPrivilegi());
    
    // Imposta la lista di valori SI/NO
    $smarty->assign("sino_values", array("0", "1"));
    $smarty->assign("sino_output", array("No", "S&igrave;"));
    
    // Imposta la lista di valori PRIVILEGI
    $privilegi_values = array();
    $privilegi_output = array();
    foreach ($PERMESSI_ADMIN as $key => $value) {
        $privilegi_values[] = $key;
        $privilegi_output[] = $value;
    }
    $smarty->assign("privilegi_values", $privilegi_values);
    $smarty->assign("privilegi_output", $privilegi_output);
}

$smarty->display('adminaccount.tpl');
