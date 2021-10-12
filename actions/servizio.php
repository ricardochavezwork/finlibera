<?php

include_once 'common.php';

$input = $_REQUEST["data"];

//TODO : Check privileges

if(isset($_REQUEST["action"])){
    switch ($_REQUEST["action"]){
        case "multiSave":
            $res = new stdClass();
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $data  = $decode->Servizio;
            $servizio = Utils::objectToObject($data, Servizio);
            $servizio->Linking();
            
            $res->success = $servizio->MultiSave();
            $res->data = $servizio;

            Utils::PrintJson($res, true);
            break;
        case "saveServizioDocumentoFornitore":
            $res = new stdClass();
            $res->success = false;
            $counter = 0;
            $test = array();
            
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            
            $sv  = $decode->Servizio;
            $servizio = Utils::objectToObject($sv, Servizio);
            $servizio->Linking();
            
            $doc = $decode->DocumentoFornitore;
            $docFornitore = Utils::objectToObject($doc, DocumentoFornitore);
            $docFornitore->Linking();
            
            /**
            * ####################################################################
            * ######## ELMINAZIONE SERVIZI : Prima di salvare le nuove modifiche #
            * ####################################################################
            */

            if($docFornitore->IdDocumentoFiscale && intval($docFornitore->IdDocumentoFiscale) > 0){
                $delete = Servizio_DocumentoFornitore::DeleteRelationship($docFornitore->IdDocumentoFiscale);
                if(!$delete){
                    $counter++;
                    $test[] = 1;
                }
            }
            
            if($servizio->Servizio && count($servizio->Servizio) > 0){
                $servizi = $servizio->Servizio;
                $save = Servizio_DocumentoFornitore::SaveRelationship($servizi, $docFornitore);
                $servizio->Test = $save;
                if(!$save->success){
                    $counter++;
                    $test[] = 2;
                }
            }
            
            if($counter === 0){
                $res->success = true;
            }
            
            
            $res->data = $servizio;

            Utils::PrintJson($res, true);
            break;
        case "searchAptStz":
            $res = new stdClass();
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $termine  = $decode->Termine;
            $searchResults = new stdClass();
            $searchResults->Appartamento = array();
            $searchResults->AppartamentoStanza = array();
            
            $apt = Appartamento::SearchAptByTermine($termine);
            $aptStz = Appartamento_Stanza::Search($termine);
            
            if(count($apt) > 0){
                $searchResults->Appartamento = $apt;
            }
            
            if(count($aptStz) > 0){
                $searchResults->AppartamentoStanza = $aptStz;
            }
            
            $res->Data = $searchResults;

            Utils::PrintJson($res, true);
            break;
        case "loadAptStz":
            $res = new stdClass();
            $loadResults = new stdClass();
            $loadResults->Appartamento = array();
            $loadResults->AppartamentoStanza = array();
            
            $apt = Appartamento::Load(null, false, "10");
            
            if(count($apt) > 0){
                $loadResults->Appartamento = $apt;
            }
            
            /*if(count($aptStz) > 0){
                $loadResults->AppartamentoStanza = $aptStz;
            }*/
            
            $res->Data = $loadResults;

            Utils::PrintJson($res, true);
            break;
    }
}
