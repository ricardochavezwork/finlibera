<?php

$isAdmin = TRUE;

include_once 'privileges.php';

$PERMESSI_ADMIN = array(
    PRIV_ADMINACC_VIEW => "Vista Admin Account", PRIV_ADMINACC_EDIT => "Modifica Admin Account", PRIV_ADMINACC_DELETE => "Eliminazione Admin Account",
    PRIV_APT_VIEW => "Vista Appartamenti", PRIV_APT_EDIT => "Modifica Appartamenti", PRIV_APT_DELETE => "Eliminazione Appartamenti",
    PRIV_STANZE_VIEW => "Vista Stanze", PRIV_STANZE_EDIT => "Modifica Stanze", PRIV_STANZE_DELETE => "Eliminazione Stanze", PRIV_STANZE_BOOKING => "Prenotazione Stanze",
    PRIV_INQUILINI_VIEW => "Vista Inquilini", PRIV_INQUILINI_EDIT => "Modifica Inquilini", PRIV_INQUILINI_DELETE => "Eliminazione Inquilini",
    PRIV_PAGE_VIEW => "Vista Pagine", PRIV_PAGE_EDIT => "Modifica Pagine",
    PRIV_ZONE_VIEW => "Vista Zone", PRIV_ZONE_EDIT => "Modifica Zone", PRIV_ZONE_DELETE => "Eliminazione Zone",
    PRIV_RICHIEDENTI_VIEW => "Vista Richiedenti", PRIV_RICHIEDENTI_EDIT => "Modifica Richiedenti", PRIV_RICHIEDENTI_DELETE => "Eliminazione Richiedenti",
    PRIV_POSTIAUTO_VIEW => "Vista Posti Auto", PRIV_POSTIAUTO_EDIT => "Modifica Posti Auto", PRIV_POSTIAUTO_DELETE => "Eliminazione Posti Auto",
    PRIV_TRANSAZIONI_VIEW => "Vista Movimenti", PRIV_TRANSAZIONI_EDIT => "Modifica Movimenti", PRIV_TRANSAZIONI_DELETE => "Eliminazione Movimenti",
    PRIV_FATTURAZIONE_VIEW => "Vista lista fatture", PRIV_FATTURAZIONE_ADD => "Creazione fatture", PRIV_FATTURAZIONE_EDIT => "Modifica fatture", 
    PRIV_FATTURAZIONE_DOWNLOAD => "Download Fatture", PRIV_FATTURAZIONE_DELETE => "Eliminazione Fatture", PRIV_TRANSAZIONI_CONTABILE => "Transazioni - Contabile", 
    PRIV_TRANSAZIONI_COMMERCIALISTA => "Transazioni - Commercialista", PRIV_TRANSAZIONI_DATAENTRY => "Transazioni - DataEntry",
    PRIV_CHECKINCHECKOUT => "Check In - Check out", PRIV_ITT_READ => " Intestatari - Visualizza sezioni", PRIV_RECUPERO_CREDITI => "Recupero Crediti", PRIV_TICKET_OPEN => "Accesso Ticket", PRIV_TICKET_FORNITORE => "Ticket - Fornitore",
    PRIV_DOVEVIVO => "DoveVivo"
);

include_once '../common.php';

function canAccess($accesso) {
    global $AdminLogged;
    if (!$accesso)
        return TRUE;
    return $AdminLogged->CanAccess($accesso);
}

function checkAccessTransactionManager() {
    global $smarty;
    if (!(canAccess(PRIV_TRANSAZIONI_CONTABILE) || canAccess(PRIV_TRANSAZIONI_DATAENTRY) || canAccess(PRIV_TRANSAZIONI_COMMERCIALISTA))) {
        $smarty->display("no_privilege.tpl");
        die();
    }
}

function checkPrivilege($accesso) {
    global $smarty;
    if (!canAccess($accesso)) {
        $smarty->display("no_privilege.tpl");
        die();
    }
}
function getPostoAuto($posto) {
    switch ($posto) {
        case POSTOAUTO_SINGOLO:
            return "Singolo";
        case POSTOAUTO_DOPPIO:
            return "Doppio";
        default:
            return "";
    }
}
function getTipoPostoAuto($tipo) {
    switch ($tipo) {
        case TIPOPOSTOAUTO_BOX:
            return "Box";
        case TIPOPOSTOAUTO_COPERTO:
            return "Coperto";
        case TIPOPOSTOAUTO_SCOPERTO:
            return "Scoperto";
        default:
            return "";
    }
}

if (basename(PHP_SELF) != "login.php" && !$AdminLogged->IsLogged() && basename(PHP_SELF) != "dataExtraction.php"){
    Utils::RedirectTo (URL_HOST . "_gestione/login/");
}
    
