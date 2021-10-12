<?php

include_once 'common.php';

$input = $_REQUEST["data"];

//TODO : Check privileges

if(isset($_REQUEST["action"])){
    switch ($_REQUEST["action"]){
        case "checkPartitaIva":
            $res = new stdClass();
            $res->success = true;
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $fornitore = Utils::objectToObject($decode, Fornitore);
            
            if($fornitore->PartitaIva){
                $term = $fornitore->PartitaIva;
                global $Database;
                $sql = sprintf("SELECT * FROM Fornitori WHERE PartitaIva = '%s' LIMIT 1;", $term);
                if ($result = $Database->Query($sql)){
                    if ($row = $Database->Fetch($result)){
                        $res->Data = $row;
                    }
                }
                
                if($res->Data && $res->Data > 0){
                    $res->success = false;
                }
            }
            
            Utils::PrintJson($res, true);
            break;
    }
}
