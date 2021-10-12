<?php

include_once 'common.php';

$input = $_REQUEST["data"];

//TODO : Check privileges

if(isset($_REQUEST["action"])){
    switch ($_REQUEST["action"]){
        case "load":
            $admin = new stdClass();
            $admin->Id = $AdminLogged->Id;
            $admin->Username = $AdminLogged->Username;
            $admin->Amministratore = $AdminLogged->Amministratore;
            $admin->Email = $AdminLogged->Email;
            $admin->Role = 0;
            $admin->Level = 0;
            $admin->Roles = array();

            if($AdminLogged->CanAccess(PRIV_TRANSAZIONI_CONTABILE) && intval($AdminLogged->Amministratore) <= 0){
                $admin->Roles[] = 1;
            }
            
            if ($AdminLogged->CanAccess(PRIV_TRANSAZIONI_COMMERCIALISTA) && intval($AdminLogged->Amministratore) <= 0) {
                $admin->Roles[] = 2;
            }
            
            if($AdminLogged->CanAccess(PRIV_TRANSAZIONI_DATAENTRY) && intval($AdminLogged->Amministratore) <= 0){
                $admin->Roles[] = 3;
            }
            
            if($AdminLogged->CanAccess(PRIV_ITT_READ) && intval($AdminLogged->Amministratore) <= 0){
                $admin->Roles[] = 4;
            }
            
            if($AdminLogged->CanAccess(PRIV_RECUPERO_CREDITI) && intval($AdminLogged->Amministratore) <= 0){
                $admin->Roles[] = 5;
            }
            
            if($AdminLogged->CanAccess(PRIV_STANZE_BOOKING) && intval($AdminLogged->Amministratore) <= 0){
                $admin->Roles[] = 6;
            }
            
            if($AdminLogged->CanAccess(PRIV_FATTURAZIONE_VIEW) && intval($AdminLogged->Amministratore) <= 0){
                $admin->Roles[] = 7;
            }

            if($AdminLogged->CanAccess(PRIV_APT_EDIT) && intval($AdminLogged->Amministratore) <= 0){
                $admin->Roles[] = 8;//PropertiesAdmin
            }

            if($AdminLogged->CanAccess(PRIV_TICKET_FORNITORE) && intval($AdminLogged->Amministratore) <= 0){
                $admin->Roles[] = 9;//Fornitore
            }

            if ($AdminLogged->CanAccess(PRIV_TICKET_OPEN) && intval($AdminLogged->Amministratore) <= 0) {
                $admin->Roles[] = 10;//Fornitore
            }

            if ($AdminLogged->CanAccess(PRIV_DOVEVIVO) && intval($AdminLogged->Amministratore) <= 0) {
                $admin->Roles[] = 11;//DoveVivo
            }
            
            
            Utils::PrintJson($admin, true);
            break;
    }
}
