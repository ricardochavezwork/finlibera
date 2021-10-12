<?php

include 'common.php';
include './invoice_common/invoice_functions.php';

/*$fornitore = new Fornitore();
$fornitore->RagioneSociale = "Sementilli Andrea";
$fornitore->Save();*/

//TITLE : Salvataggio di più servizi
/*
$servizi = array();
$docFor = new DocumentoFornitore();
$docFor->IdDocumentoFiscale = 0;
$docFor->IdFornitore = 4924;
$docFor->Descrizione = "Proforma 456";

$servizio1 = new Servizio();
$servizio2 = new Servizio();
$importo1 = new ServizioImporto();
$importo2 = new ServizioImporto();
$descrizione1 = new ServizioDescrizione();
$descrizione2 = new ServizioDescrizione();
$data1 = new ServizioData();
$data2 = new ServizioData();

$descrizione1->Descrizione = "SISTEMAZIONE TAPPARELLA";
$descrizione2->Descrizione = "SISTEMAZIONE TAPPARELLA";
$importo1->Importo = 90;
$importo2->Importo = 90;
$data1->Data = "2017-07-06";
$data2->Data = "2017-07-06";

$servizio1->ServizioDescrizione = $descrizione1;
$servizio1->ServizioData = $data1;
$servizio1->ServizioImporto = $importo1;
$servizio1->IdAppartamentiStanze = 78;

$servizio2->ServizioDescrizione = $descrizione2;
$servizio2->ServizioData = $data2;
$servizio2->ServizioImporto = $importo2;
$servizio2->IdAppartamentiStanze = 79;

//TAG

//$res = Servizio::SaveRelationship($servizio1);

$servizi[] = $servizio1;
$servizi[] = $servizio2;

$res = Servizio_DocumentoFornitore::SaveRelationship($servizi, $docFor);
*/
//

//TITLE: CARICAMENTO DEI SERVIZI (e i suoi rami) SECONDO UN DOCFISC
//$res = Servizio_DocumentoFornitore::LoadByIdDocumentoFiscale(6866);

//TITLE : Eliminare un determinato ramo di servizio

/*$ramo = new ServizioData(2);
$res = $ramo->Delete();*/

//TITLE: ELIMINARE TUTTI I SERVIZI DI UN DETERMINATO DOCFISC

//$res = Servizio_DocumentoFornitore::DeleteRelationship(6871);

//TITLE : Inserimento tag

/*$servizio_tag = new Servizio_TagServizio();

$tag = new TagServizio(1);
$tags = array();
$tags[] = $tag;
$servizio = new Servizio(1);

$servizio_tag->Tags = $tags;
$servizio_tag->Servizio = $servizio;

$res = $servizio_tag->SaveRelationship();*/

//$res = new FatturaFornitore(6880);

//TITLE : Ricerca dei tagservizi
//$res = TagServizio::Search("str");

/*$res = new TagMovimenti_TagCategories(4);
$res->LoadRelationship();*/

/*$servizio = Utils::objectToObject($sv, Servizio);
$servizio->Linking();

Utils::PrintJson($servizio, true);

$res->success = false;

if($servizio->Servizio && count($servizio->Servizio) > 0){
    $servizi = $servizio->Servizio;
    $doc = $decode->DocumentoFornitore;
    $docFornitore = Utils::objectToObject($doc, DocumentoFornitore);
    $docFornitore->Linking();

    $saveRes = Servizio_DocumentoFornitore::SaveRelationship($servizi, $docFornitore);
    $res->success = $saveRes;
}*/

//$res = Servizio_DocumentoFornitore::LoadServizi(7078);

//$res = Servizio_DocumentoFornitore::DeleteRelationship(7078);

/*$ins = new Inquilino_Stanza(1627);

$res = new stdClass();
$res->success = false;

$rel = null;
if($ins && $ins->Id && intval($ins->Id) > 0){
    $rel = Inquilino_Stanza::LoadAccountBalance($ins->Id);
}

$totFt = Inquilino_Stanza::getTotFtByIns($ins->Id);
$totVersato = Inquilino_Stanza::getTotVersatoByIns($ins->Id);
$totDovInRealTime = Inquilino_Stanza::getTotDovutoInRealTimeByIns($ins->Id, $ins->ImportoNonContabilizzato, $ins->DataInizio, $ins->DataFine);

$trs = new stdClass();
$trs->Balance = $rel;
$trs->TotFatturato = $totFt;
$trs->TotVersato = $totVersato;
$trs->TotDovInRealTime = $totDovInRealTime; 

$res->data = $trs;*/

Utils::PrintJson($res, true);
