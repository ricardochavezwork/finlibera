<?php

include_once 'common.php';

$input = $_REQUEST["data"];

//checkPrivilege(PRIV_APT_VIEW);

if(isset($_REQUEST["action"])){
    switch ($_REQUEST["action"]){
        case "setStanzeMultiple":
            //Load delle stanzeMultiple in base all'Id dell'Appartamento
            $res = null;
            if(intval($input) > 0){
                $res = new Appartamento($input);
                $res->setStanzeMultiple();
            }
            
            Utils::PrintJson($res, true);
            break;
        case "setStanze":
            //Load delle stanze in base all'Id dell'Appartamento
            $res = null;
            if(intval($input) > 0){
                $res = new Appartamento($input);
                $res->setStanze();
                
                if($res->Stanze_Rel && count($res->Stanze_Rel) > 0){
                    for ($index = 0; $index < count($res->Stanze_Rel); $index++) {
                        $res->Stanze_Rel[$index]->setAvailability();
                        $res->Stanze_Rel[$index]->isBooked = $res->Stanze_Rel[$index]->isBooked();
                    }
                }
                
            }
            
            Utils::PrintJson($res, true);
            break;
        case "loadByIdStanza":
            $res = new stdClass();
            $res->success = false;
            $id = urldecode ($input);
            $id = stripslashes($id);
            $id = json_decode($id);
            if(intval($id) > 0){
               $res->data = Appartamento::LoadByIdStanza($id);
            }
           
            Utils::PrintJson($res, true);
            break;
        case "save-prop-ag":
            $res = new stdClass();
            $res->success = false;
            $res->data = null;

            $data = urldecode ($input);
            $data = stripslashes($data);
            $data = json_decode($data);

            $item = Utils::objectToObject($data, Proprietario_Agenzia);

            if($item->Save()){
                $res->success = true;
                $res->data = $item;
            }else {
                $res->sms = "Errore durante il salvataggio. Richiedere assistenza.";
            }

            Utils::PrintJson($res, true);
            break;
        case "load-apt_contratto":
            $res = new stdClass();
            $res->success = false;
            $res->data = null;

            $data = urldecode ($input);
            $data = stripslashes($data);
            $data = json_decode($data);
            
            $item = Utils::objectToObject($data, Appartamento_Contratto);
            if(intval($item->IdAppartamento) > 0){
                $res->data = Appartamento_Contratto::Load($item->IdAppartamento);
            }
            

            Utils::PrintJson($res, true);
            break;
        case "save-apt_contratto":
            $res = new stdClass();
            $res->success = false;
            $res->data = null;

            $data = urldecode ($input);
            $data = stripslashes($data);
            $data = json_decode($data);

            $item = Utils::objectToObject($data, Appartamento_Contratto);
            if($item->Save()){
                $res->success = true;
                $res->data = $item;
            }

            Utils::PrintJson($res, true);
            break;
    }
}

