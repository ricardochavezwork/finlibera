<?php

include_once 'common.php';

$input = $_REQUEST["data"];

//TODO : Check privileges

if(isset($_REQUEST["action"])){
    switch ($_REQUEST["action"]){
        case "setDocumentoFiscale":
            $res = new stdClass();
            /*$res->Success = false;*/
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $input  = $decode;
            if(intval($input->Id) > 0){
                $doc = new DocumentoFiscale($input->Id);
                $doc->setDocumentoFiscale();
                $doc->setEmailLogs();
                $res->Data = $doc;
            }else{
                $res->Data = null;
            }
            
            Utils::PrintJson($res, true);
            break;
            
        case "loadDocumentoFornitore":
            $res = new stdClass();
            $res->success = false;
            $res->data = null;
            
            $data = urldecode ($input);
            $data = stripslashes($data);
            $data = json_decode($data);
            
            if(intval($data->IdDocumentoFiscale) > 0){
                $docFornitore = new DocumentoFornitore($data->IdDocumentoFiscale);
                $docFornitore->setFattura();
                $docFornitore->setServizio();
                $res->success = true;
                $res->data = $docFornitore;
            }
            
            Utils::PrintJson($res, true);
            break;
        case "countServizi" :
            $res = new stdClass();
            $res->success = false;
            $res->data = null;
            
            $data = urldecode ($input);
            $data = stripslashes($data);
            $data = json_decode($data);
            
            if(intval($data->IdDocumentoFiscale) > 0){
                $docFornitore = new DocumentoFornitore($data->IdDocumentoFiscale);
                $docFornitore->setCountServizi();
                $res->success = true;
                $res->data = $docFornitore;
            }
            
            Utils::PrintJson($res, true);
            break;
        case "deleteDocumentoFornitore":
            
            $res = new stdClass();
            $res->success = false;
            $res->data = null;
            
            $data = urldecode ($input);
            $data = stripslashes($data);
            $data = json_decode($data);
            
            $smsErrorBegin = '<div><p>Attenzione, non è possibile poter eliminare questo documento in quanto è associato ai seguenti movimenti :</p>';
            $smsErrorEnd = '</div>';
            $textMovimento = '<p>- Movimento del <span>%%DATAOPERAZIONE%%</span> con causale <span style=" font-weight: bold;">%%CAUSALEMOVIMENTO%%</span></p>';
            
            if(intval($data->IdDocumentoFiscale) > 0){
                //Controllo associazione RamoMovimento_DocumentoFiscale
                $mov = RamoMovimento_DocumentoFiscale::ifDocRelExists($data->IdDocumentoFiscale);
                if(count($mov) > 0){
                    foreach ($mov as $key => $value) {
                        $textMovimento_clone = $textMovimento;
                        $dataOperazione = new DateTime($value->DataOperazione);
                        $textMovimento_clone = str_replace("%%DATAOPERAZIONE%%", $dataOperazione->format("d/m/Y"), $textMovimento_clone);
                        $textMovimento_clone = str_replace("%%CAUSALEMOVIMENTO%%", $value->Descrizione, $textMovimento_clone);
                        $smsErrorBegin .= $textMovimento_clone;
                    }
                    
                    $smsErrorBegin .= $smsErrorEnd;
                    
                    $res->data = $smsErrorBegin;
                }else{
                    //Rimozione di docFornitore
                    $doc = new DocumentoFornitore($data->IdDocumentoFiscale);
                    if($doc->DeleteRelationship()){
                        $res->success = true;
                    }else{
                        $res->data = '<div>Errore imprevisto! Richiedere supporto.</div>';
                    }
                }
            }
            
            Utils::PrintJson($res, true);
        case "checkUniqueValuesFtFornitore":
            $res = new stdClass();
            $res->success = true;
            $decode = urldecode ($input);
            //$decode = stripslashes($decode);
            $decode = json_decode($decode);
            $fornitore = $decode->Intestatario->Intestatario;
            $docFiscale = Utils::objectToObject($decode->DocumentoFiscale, DocumentoFiscale);
            $ftFornitore = Utils::objectToObject($docFiscale->Documento, FatturaFornitore);
            
            if(intval($ftFornitore->Id) > 0){
                
                $ft = new FatturaFornitore($ftFornitore->Id);
                if($ft->Numero === $ftFornitore->Numero && $ft->Data === $ftFornitore->Data){
                    $res->success = true;
                }else if($ftFornitore->Numero && intval($ftFornitore->Numero) > 0 && intval($fornitore->Id) > 0 && $ftFornitore->Data){
                    global $Database;
                    $sql = sprintf("SELECT * FROM DocumentiFornitori df, FattureFornitori ftF WHERE df.IdDocumentoFiscale = ftF.Id AND df.IdFornitore = %d AND STRCMP(ftF.Numero, '%s') = 0 AND YEAR(ftF.Data) = YEAR('%s')", $fornitore->Id, $ftFornitore->Numero, $ftFornitore->Data);
                    if ($result = $Database->Query($sql)){
                        if ($row = $Database->Fetch($result)){
                            $res->Data = $row;
                        }
                    }

                    if($res->Data && $res->Data > 0){
                        $res->success = false;
                    }
                }
            }else{
                if($ftFornitore->Numero && intval($ftFornitore->Numero) > 0 && intval($fornitore->Id) > 0 && $ftFornitore->Data){
                    global $Database;
                    $sql = sprintf("SELECT * FROM DocumentiFornitori df, FattureFornitori ftF WHERE df.IdDocumentoFiscale = ftF.Id AND df.IdFornitore = %d AND STRCMP(ftF.Numero, '%s') = 0 AND YEAR(ftF.Data) = YEAR('%s')", $fornitore->Id, $ftFornitore->Numero, $ftFornitore->Data);
                    if ($result = $Database->Query($sql)){
                        if ($row = $Database->Fetch($result)){
                            $res->Data = $row;
                        }
                    }

                    if($res->Data && $res->Data > 0){
                        $res->success = false;
                    }
                }
            }
            
            Utils::PrintJson($res, true);
            break;
        case "saveDocumentoFornitore":
            $res = new stdClass();
            $res->success = false;
            
            $decode = urldecode($input);
            $decode = json_decode($decode);
            
            $docFornitore = Utils::objectToObject($decode, DocumentoFornitore);
            $docFornitore->Linking();
            
            $saveDocFor = DocumentoFornitore::SaveRelationship($docFornitore, $docFornitore->Fattura);
            if($saveDocFor->success && intval($saveDocFor->IdDocFisc) > 0){
                $res->data = new DocumentoFiscale($saveDocFor->IdDocFisc);
                $res->data->setDocumentoFiscale();
                $res->success = true;
            }
            
            Utils::PrintJson($res, true);
            break;
        case "setIntestatario_DocumentoFiscale":
            $res = new stdClass();
            $res->data = null;
            
            $data = $input;
            
            $IdDocFisc = $data["Id"];
            $TypeDocFisc = $data["Type"];
            if(intval($IdDocFisc) > 0 && $TypeDocFisc){
                $itt_docF = new Intestatario_DocumentoFiscale();
                $itt_docF->LoadRelationship($IdDocFisc, $TypeDocFisc);
                $res->data = $itt_docF;
            }
            
            Utils::PrintJson($res, true);
            break;
    }
}
