<?php

include_once '../../lib/api.php';
include '../privileges.php';


function canAccess($accesso) {
    global $AdminLogged;
    if (!$accesso)
        return TRUE;
    return $AdminLogged->CanAccess($accesso);
}
function checkPrivilege($accesso) {
    if (!canAccess($accesso)) {
        Utils::PrintJson(null, true);
        die();
    }
}

if (basename(PHP_SELF) != "login.php" && !$AdminLogged->IsLogged() && basename(PHP_SELF) != "dataExtraction.php" && basename(PHP_SELF) != "dataExtraction_Excel.php"){
    header("HTTP/1.1 401 Unauthorized");
    exit;
}