<?php

include 'common.php';
$ss_records = $_GET["records"];
$records = ServerSettings::Load();

if (isset($_REQUEST["action"])) {
    switch ($_REQUEST["action"]) {

    // Action Save
        case "save":
            $data_ss = json_decode($ss_records, false);
            $status = false;
            foreach ($data_ss as $key => $row){
                $record = new ServerSettings();
                $record = Utils::JsonDecodeToClass($row, $record);
                //$record = new ServerSettings($addSS, TRUE);
                /*if (isset ($_REQUEST["create"]) && array_key_exists($record->DataKey, $ServerSettings)) {
                    $error = "This Key is already registered";
                } else {
                    $error = $record;
                    if ($record->Save()) {
                        $status = true;
                    } else
                        $error = "An error occurred";
                }*/
                if ($record->Save()) {
                        $status = true;
                    } else
                        $error = "An error occurred";
            }
            Utils::PrintJson($status, TRUE);
            //Utils::PrintJson($status, TRUE);
            break;

    // Action Delete
        case "delete":
            $record = new ServerSettings($_REQUEST, TRUE);
            if ($record->Delete()) {
                // Return to list
                Utils::RedirectTo("?deleted=1");
            } else {
                Utils::RedirectTo("?");
            }
            break;

    }
}

$smarty->assign("records_encoded", json_encode($records));
$smarty->display('serversettings.tpl');




