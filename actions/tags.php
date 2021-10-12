<?php

include_once 'common.php';

$input = $_REQUEST["data"];

//TODO : Check privileges

if(isset($_REQUEST["action"])){
    switch ($_REQUEST["action"]){
        case "searchTagServizio":
            $res = new stdClass();
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $termine  = $decode->Termine;
            $res->Data = TagServizio::Search($termine);

            Utils::PrintJson($res, true);
            break;
        case "searchTagMovimento":
            $res = new stdClass();
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $termine  = $decode->Termine;
            $res->Data = TagMovimento::Search($termine);

            Utils::PrintJson($res, true);
            break;
        case "searchTagDocumentoFiscale":
            $res = new stdClass();
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $termine  = $decode->Termine;
            $res->Data = TagDocumentoFiscale::Search($termine);

            Utils::PrintJson($res, true);
            break;
        case "loadTagServizio":
            $res = new stdClass();
            $tags = new TagServizio();
            $tags->TagServizio = Array();    
            $result = TagServizio::Load();
            if(count($result) > 0){
                foreach ($result as $key => $value) {
                    $result[$key]->LoadRelationship();
                }
                
                $tags->TagServizio = $result;
            }
            
            $res->Data = $tags;

            Utils::PrintJson($res, true);
            break;
        case "loadTagMovimento":
            $res = new stdClass();
            $tags = new TagServizio();
            $tags->TagMovimento = Array();    
            $result = TagMovimento::Load();
            if(count($result) > 0){
                foreach ($result as $key => $value) {
                    $result[$key]->LoadRelationship();
                }
                
                $tags->TagMovimento = $result;
            }
            
            $res->Data = $tags;

            Utils::PrintJson($res, true);
            break;
        case "loadTagDocumentoFiscale":
            $res = new stdClass();
            $tags = new TagDocumentoFiscale();
            $tags->TagDocumentoFiscale = Array();    
            $result = TagDocumentoFiscale::Load();
            if(count($result) > 0){
                foreach ($result as $key => $value) {
                    $result[$key]->LoadRelationship();
                }
                
                $tags->TagDocumentoFiscale = $result;
            }
            
            $res->Data = $tags;

            Utils::PrintJson($res, true);
            break;
        case "loadTagCategories":
            $res = new stdClass();
            $tags = new TagCategories();
            $tags->TagCategories = Array();    
            $result = TagCategories::Load();
            if(count($result) > 0){
                $tags->TagCategories = $result;
            }
            
            $res->Data = $tags;

            Utils::PrintJson($res, true);
            break;
        case "saveTagServizio":
            $res = new stdClass();
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $data  = $decode->TagServizio;
            $tag = Utils::objectToObject($data, TagServizio);
            $tag->Linking();
            
            $res->success = $tag->SaveRelationship();
            $res->data = $tag;

            Utils::PrintJson($res, true);
            break;
        case "saveTagMovimento":
            $res = new stdClass();
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $data  = $decode->TagMovimento;
            $tag = Utils::objectToObject($data, TagMovimento);
            $tag->Linking();
            
            $res->success = $tag->SaveRelationship();
            $res->data = $tag;

            Utils::PrintJson($res, true);
            break;
        case "saveTagDocumentoFiscale":
            $res = new stdClass();
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $data  = $decode->TagDocumentoFiscale;
            $tag = Utils::objectToObject($data, TagDocumentoFiscale);
            $tag->Linking();
            
            $res->success = $tag->SaveRelationship();
            $res->data = $tag;

            Utils::PrintJson($res, true);
            break;
        case "saveDocumentoFiscale_TagDocumentoFiscale":
            $res = new stdClass();
            $decode = urldecode($input);
            $decode = json_decode($decode);
            $data = $decode->DocumentoFiscale_TagDocumentoFiscale;
            $tags = Utils::objectToObject($data, DocumentoFiscale_TagDocumentoFiscale);
            $tags->Linking();
            
            if(!$tags->DocumentoFiscale && intval($tags->IdDocumentoFiscale) > 0 && intval($tags->TipoDocumentoFiscale) > 0){
                $tags->DocumentoFiscale = new DocumentoFiscale();
                $tags->DocumentoFiscale->Id = $tags->IdDocumentoFiscale;
                $tags->DocumentoFiscale->Type = $tags->TipoDocumentoFiscale;
            }
            
            $res->success = $tags->SaveRelationship();
            $res->data = $tags;
            
            Utils::PrintJson($res, true);
            break;
        case "deleteDocumentoFiscale_TagDocumentoFiscale":
            $res = new stdClass();
            $decode = urldecode($input);
            $decode = json_decode($decode);
            $data = $decode->DocumentoFiscale_TagDocumentoFiscale;
            $tags = Utils::objectToObject($data, DocumentoFiscale_TagDocumentoFiscale);
            $tags->Linking();
            
            //MovimentoDettagli_TagMovimenti::DeleteByMovimento($tags->Movimento->Id);
            $res->success = $tags->Delete();
            $res->data = $tags;
            
            Utils::PrintJson($res, true);
            break;
        case "saveMovimentiDettagli_TagMovimenti":
            $res = new stdClass();
            $decode = urldecode($input);
            $decode = json_decode($decode);
            $data = $decode->MovimentoDettagli_TagMovimenti;
            $tags = Utils::objectToObject($data, MovimentoDettagli_TagMovimenti);
            $tags->Linking();
            
            //MovimentoDettagli_TagMovimenti::DeleteByMovimento($tags->Movimento->Id);
            $res->success = $tags->SaveRelationship();
            $res->data = $tags;
            
            Utils::PrintJson($res, true);
            break;
        case "deleteMovimentiDettagli_TagMovimenti":
            $res = new stdClass();
            $decode = urldecode($input);
            $decode = json_decode($decode);
            $data = $decode->MovimentoDettagli_TagMovimenti;
            $tags = Utils::objectToObject($data, MovimentoDettagli_TagMovimenti);
            $tags->Linking();
            
            //MovimentoDettagli_TagMovimenti::DeleteByMovimento($tags->Movimento->Id);
            $res->success = $tags->Delete();
            $res->data = $tags;
            
            Utils::PrintJson($res, true);
            break;
        case "saveRamoMovimento_TagMovimenti":
            $res = new stdClass();
            $decode = urldecode($input);
            $decode = json_decode($decode);
            $data = $decode->RamoMovimento_TagMovimenti;
            $tags = Utils::objectToObject($data, RamoMovimento_TagMovimenti);
            $tags->Linking();
            
            //RamoMovimento_TagMovimenti::DeleteByMovimento($tags->Movimento->Id);
            $res->success = $tags->SaveRelationship();
            $res->data = $tags;
            
            Utils::PrintJson($res, true);
            break;
        case "deleteRamoMovimento_TagMovimenti":
            $res = new stdClass();
            $decode = urldecode($input);
            $decode = json_decode($decode);
            $data = $decode->RamoMovimento_TagMovimenti;
            $tags = Utils::objectToObject($data, RamoMovimento_TagMovimenti);
            $tags->Linking();
            
            //RamoMovimento_TagMovimenti::DeleteByMovimento($tags->Movimento->Id);
            $res->success = $tags->Delete();
            $res->data = $tags;
            
            Utils::PrintJson($res, true);
            break;
    }
}
