<?php

include_once 'common.php';

$input = $_REQUEST["data"];

checkPrivilege(PRIV_APT_VIEW);

if(isset($_REQUEST["action"])){
    switch ($_REQUEST["action"]){
        case "saveRelationship":
            $res = new stdClass();
            $res->success = false;
            $input = Utils::objectToObject(json_decode($input), Appartamento_StanzaMultipla);
            if($input && $input instanceof Appartamento_StanzaMultipla){
                if($input->Stanze && count($input->Stanze) > 0){
                    foreach ($input->Stanze as $key => $stanza) {
                        $input->Stanze[$key] = Utils::objectToObject($input->Stanze[$key], Appartamento_Stanza);
                    }
                    
                    $res->success = $input->SaveRelationship();
                }
            }
            
            Utils::PrintJson($res, true);
            break;
        case "delete":
            
            $res = new stdClass();
            $res->success = false;
            $input = Utils::objectToObject(json_decode($input), Appartamento_StanzaMultipla);
            
            if(intval($input->Id) > 0){
                $stanzaMultipla = new Appartamento_StanzaMultipla();
                $stanzaMultipla->Id = $input->Id;
                $res->success = $stanzaMultipla->Delete();
            }
            
            Utils::PrintJson($res, true);
            break;
    }
}
