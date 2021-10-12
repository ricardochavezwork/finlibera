<?php

include 'common.php';
include './invoice_common/invoice_functions.php';
$idFattura = $_GET["idFattura"];
$idInquilino = $_GET["idInquilino"];
$idCliente = $_GET["idCliente"];

checkPrivilege(PRIV_FATTURAZIONE_VIEW);
define ("MAIL_NOTIFICA_FROM_EMAIL", "notifiche@milanostanze.it");
define ("MAIL_NOTIFICA_FROM_NAME", "MilanoStanze.it");
define ("DEBUG_MAIL", FALSE);
define ("DEBUG_MAIL_TO", "ricardo.chavez.work@gmail.com");

if(isset($_REQUEST["action"])){
    switch ($_REQUEST["action"]){
        case "load":
            $page = (isset($_REQUEST["page"]) ? intval($_REQUEST["page"]) : 1);
            $limit = (!isset($_REQUEST["rows"]) ? 0 : intval($_REQUEST["rows"]));
            $offset = Utils::GetPageOffset($page, $limit);
            $count = 0;
            $records = Fattura::Load(null, null, false, true, false, $limit, $offset, $count, "Data DESC, Numero DESC");
            $pages = Utils::GetPagesCount($count, $limit);
            //$row = new Fattura();
            if($records){
                foreach ($records as $key => $row){
                    $response->invoice = $row;
                    if($row->TipologiaDestinatario == DESTINATARI_INQUILINI){
                        $load = (object)routing_load_Fatture($row);
                        $response->fdi = $load->fdi;
                        $response->fcd = $load->fcd;
                        $response->ins = $load->ins;
                        $response->inquilino = $load->inquilino;
                        
                        $records[$key]->Nome = $response->inquilino->Nome;
                        $records[$key]->Cognome = $response->inquilino->Cognome;
                        $records[$key]->Intestatario = $response->inquilino->Cognome . " " . $response->inquilino->Nome;

                    }else if($row->TipologiaDestinatario == DESTINATARI_CLIENTI){
                        $load = (object)routing_load_Fatture($row);
                        $response->fdc = $load->fdc;
                        $response->cliente = $load->cliente;
                        
                        $records[$key]->Nome = $response->cliente->Nome;
                        $records[$key]->Cognome = $response->cliente->Cognome;
                        $records[$key]->Intestatario = $response->cliente->Cognome . " " . $response->cliente->Nome;
                        
                    }
                    
                    $records[$key]->Tipologia = titoloTipologia($row->Tipologia);
                    $records[$key]->Totale = $row->Totale;
                    $records[$key]->CellActions = "";
                    //$records[$key]->CellActions = '<a href="../_gestione/download-fattura.php?idFattura='. $records[$key]->Id .'" target="_blank" class="button">Download</a>';
                    //$records[$key]->CellActions = '<a href="../_gestione/download-fattura.php?idFattura='. $records[$key]->Id .'" target="_blank" class="button">Download</a>';
                    //$records[$key]->CellActions = '<a href="../_gestione/invoiceDownload.php?idFattura='. $records[$key]->Id .'" target="_blank" class="button">Download</a>';
                    //$records[$key]->CellActions .= '<a href="../_gestione/invoicing.php?action=load&idFattura='. $records[$key]->Id .'" class="button">Visualizza</a>';
                    if($AdminLogged->CanAccess(PRIV_FATTURAZIONE_DOWNLOAD)){
                        $records[$key]->CellActions .= "<button type='button' class='btn btn-default btn-sm pdf' data-id='" . $records[$key]->Id . "'><span class='glyphicon glyphicon-file' aria-hidden='true'></span></button>";
                    }
                    if($AdminLogged->CanAccess(PRIV_FATTURAZIONE_ADD) || $AdminLogged->CanAccess(PRIV_FATTURAZIONE_EDIT)){
                        $records[$key]->CellActions .= "<button type='button' class='btn btn-default btn-sm view' data-id='" . $records[$key]->Id . "'><span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span></button>";
                    }
                    if($AdminLogged->CanAccess(PRIV_FATTURAZIONE_DELETE)){
                        $records[$key]->CellActions .= "<button type='button' class='btn btn-default btn-sm remove' data-id='" . $records[$key]->Id . "'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button>";
                    }
                    if($AdminLogged->CanAccess(PRIV_FATTURAZIONE_ADD) || $AdminLogged->CanAccess(PRIV_FATTURAZIONE_EDIT)){
                        $records[$key]->CellActions .= "<button type='button' class='btn btn-default btn-sm plus' data-id='" . $records[$key]->Id . "'><span class='glyphicon glyphicon-option-vertical' aria-hidden='true'></span></button>";
                    }
                    //$records[$key]->CellActions .= '<a data-id='. $records[$key]->Id .'" class="button">Elimina</a>';
                }
            }
            Utils::PrintJson(Utils::JqGridTable($records, $count, $page, $pages));
            break;
        
        case "recupero_fatture":
            $page = (isset($_REQUEST["page"]) ? intval($_REQUEST["page"]) : 1);
            $limit = (!isset($_REQUEST["rp"]) ? 0 : intval($_REQUEST["rp"]));
            $offset = Utils::GetPageOffset($page, $limit);
            $order = "Data desc";
            $count = 0;
            $periodoInizio = (($periodoInizio) ? null : $periodoInizio);
            $periodoFine = (($periodoFine) ? null : $periodoFine);
            $records = Fattura::Load($periodoInizio, $periodoFine, true, false, false, $limit, $offset, $count, $order);
            $flag_value_off = "Valore non presente";
            if($records){
                foreach ($records as $key => $row){
                    $mdi = MovimentoDettagliInquilino::LoadByIdFattura($row->Id);
                    //$ins = new Inquilino_Stanza($mdi[0]->IdStanza, $mdi); 
                    $i = new Inquilino($mdi[0]->IdInquilino);
                    $records[$key]->Nome = $i->Nome;
                    $records[$key]->Cognome = $i->Cognome;
                    if($records[$key]->Nome && $records[$key]->Cognome){
                        $records[$key]->Intestatario = $i->Cognome . " " . $i->Nome;
                    }
                    $records[$key]->Intestatario = checkNullValues($records[$key]->Intestatario, $flag_value_off . " [OFF]");
                    $records[$key]->DataRegistrazione = checkNullValues($records[$key]->DataRegistrazione, $flag_value_off);
                    $records[$key]->Tipologia = titoloTipologia($row->Tipologia);
                    //$records[$key]->Tipologia = Attribuzione::Load($row->Tipologia)[0]->Titolo;
                    $records[$key]->CellActions = "";
                    if($AdminLogged->CanAccess(PRIV_FATTURAZIONE_ADD)){
                        $records[$key]->CellActions = '<a href="invoicing.php?action=recovery&idFattura='. $records[$key]->Id .'" class="button">Recovery</a>';
                    }
                }
            }
            //Utils::PrintJson(Utils::JsonEncodeSuccessMessage(true, $periodoInizio));
            Utils::PrintJson(Utils::JsonEncodeFlexigridMessage($records, $count, $page));
            break;
            
        case "saveStorno":
            $response = new stdClass();
            $response->success = false;
            
            if(intval($idFattura) > 0){
                $invoice = new Fattura($idFattura);
                $response->invoice = $invoice;
                $response->success = true;
                if($invoice->TipologiaDestinatario == DESTINATARI_INQUILINI){
                    $load = (object)routing_load_Fatture($invoice);
                    $response->fdi = $load->fdi;
                    $response->fcd = $load->fcd;
                    $response->ins = $load->ins;
                    
                    $response->fdi = FDprepareForStorno($response->fdi);
                    
                    $invoice->Id = 0;
                    $invoice->Numero = 0;
                    $invoice->Data = null;
                    $invoice->Tipologia = FATTURA_STORNO;
                    $s = new Fattura_Storno();
                    $s->IdFatturaStorno = $idFattura;
                    $s->Tipologia = STORNO_TOTALE;

                    $response->storno = $s;
                    
                    $response = saveInvoice($invoice, $response);
                    
                }else if($invoice->TipologiaDestinatario == DESTINATARI_CLIENTI){
                    $load = (object)routing_load_Fatture($invoice);
                    $response->fdc = $load->fdc;
                    $response->cliente = $load->cliente;
                    
                    $response->fdc = FDprepareForStorno($response->fdc);
                    
                    $invoice->Id = 0;
                    $invoice->Numero = 0;
                    $invoice->Data = null;
                    $invoice->Tipologia = FATTURA_STORNO;
                    $s = new Fattura_Storno();
                    $s->IdFatturaStorno = $idFattura;
                    $s->Tipologia = STORNO_TOTALE;

                    $response->storno = $s;
                    
                    $response = saveInvoice($invoice, $response);
                    
                }
            }
            
            Utils::PrintJson($response, true);
            break;
        case "loadByInquilino":
            $page = (isset($_REQUEST["page"]) ? intval($_REQUEST["page"]) : 1);
            $limit = (!isset($_REQUEST["rows"]) ? 0 : intval($_REQUEST["rows"]));
            $offset = Utils::GetPageOffset($page, $limit);
            $count = 0;
            if(intval($idInquilino) > 0){
                $inquilino = new Inquilino($idInquilino);
                $records = $inquilino->loadFattureByIdInquilino(false, $limit, $offset, $count);
                $pages = Utils::GetPagesCount($count, $limit);
                if($records){
                    foreach ($records as $key => $row){
                        $response->invoice = $row;
                        $load = (object)routing_load_Fatture($row);
                        $response->fdi = $load->fdi;
                        $response->fcd = $load->fcd;
                        $response->ins = $load->ins;
                        $response->inquilino = $load->inquilino;

                        $records[$key]->Nome = $response->inquilino->Nome;
                        $records[$key]->Cognome = $response->inquilino->Cognome;
                        $records[$key]->Intestatario = $response->inquilino->Cognome . " " . $response->inquilino->Nome;

                        $records[$key]->Tipologia = titoloTipologia($row->Tipologia);
                        $records[$key]->Totale = $row->Totale;
                        $records[$key]->CellActions = "";
                        
                        if($AdminLogged->CanAccess(PRIV_FATTURAZIONE_DOWNLOAD)){
                            $records[$key]->CellActions .= "<button type='button' class='btn btn-default btn-sm pdf' data-id='" . $records[$key]->Id . "'><span class='glyphicon glyphicon-file' aria-hidden='true'></span></button>";
                        }
                        if($AdminLogged->CanAccess(PRIV_FATTURAZIONE_ADD) || $AdminLogged->CanAccess(PRIV_FATTURAZIONE_EDIT)){
                            $records[$key]->CellActions .= "<button type='button' class='btn btn-default btn-sm view' data-id='" . $records[$key]->Id . "'><span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span></button>";
                        }
                        if($AdminLogged->CanAccess(PRIV_FATTURAZIONE_DELETE)){
                            $records[$key]->CellActions .= "<button type='button' class='btn btn-default btn-sm remove' data-id='" . $records[$key]->Id . "'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button>";
                        }
                        if($AdminLogged->CanAccess(PRIV_FATTURAZIONE_ADD) || $AdminLogged->CanAccess(PRIV_FATTURAZIONE_EDIT)){
                            $records[$key]->CellActions .= "<button type='button' class='btn btn-default btn-sm plus' data-id='" . $records[$key]->Id . "'><span class='glyphicon glyphicon-option-vertical' aria-hidden='true'></span></button>";
                        }
                    }
                }
            }
            
            Utils::PrintJson(Utils::JqGridTable($records, $count, $page, $pages));
            break;
        case "loadByCliente":
            $page = (isset($_REQUEST["page"]) ? intval($_REQUEST["page"]) : 1);
            $limit = (!isset($_REQUEST["rows"]) ? 0 : intval($_REQUEST["rows"]));
            $offset = Utils::GetPageOffset($page, $limit);
            $count = 0;
            if(intval($idCliente) > 0){
                $cliente = new Cliente($idCliente);
                $records = $cliente->loadFattureByIdCliente(false, $limit, $offset, $count);
                $pages = Utils::GetPagesCount($count, $limit);
                if($records){
                    foreach ($records as $key => $row){
                        $response->invoice = $row;
                        $load = (object)routing_load_Fatture($row);
                        $response->fdc = $load->fdc;
                        $response->cliente = $load->cliente;
                        
                        $records[$key]->Nome = $response->cliente->Nome;
                        $records[$key]->Cognome = $response->cliente->Cognome;
                        $records[$key]->Intestatario = $response->cliente->Cognome . " " . $response->cliente->Nome;

                        $records[$key]->Tipologia = titoloTipologia($row->Tipologia);
                        $records[$key]->Totale = $row->Totale;
                        $records[$key]->CellActions = "";
                        
                        if($AdminLogged->CanAccess(PRIV_FATTURAZIONE_DOWNLOAD)){
                            $records[$key]->CellActions .= "<button type='button' class='btn btn-default btn-sm pdf' data-id='" . $records[$key]->Id . "'><span class='glyphicon glyphicon-file' aria-hidden='true'></span></button>";
                        }
                        if($AdminLogged->CanAccess(PRIV_FATTURAZIONE_ADD) || $AdminLogged->CanAccess(PRIV_FATTURAZIONE_EDIT)){
                            $records[$key]->CellActions .= "<button type='button' class='btn btn-default btn-sm view' data-id='" . $records[$key]->Id . "'><span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span></button>";
                        }
                        if($AdminLogged->CanAccess(PRIV_FATTURAZIONE_DELETE)){
                            $records[$key]->CellActions .= "<button type='button' class='btn btn-default btn-sm remove' data-id='" . $records[$key]->Id . "'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button>";
                        }
                        if($AdminLogged->CanAccess(PRIV_FATTURAZIONE_ADD) || $AdminLogged->CanAccess(PRIV_FATTURAZIONE_EDIT)){
                            $records[$key]->CellActions .= "<button type='button' class='btn btn-default btn-sm plus' data-id='" . $records[$key]->Id . "'><span class='glyphicon glyphicon-option-vertical' aria-hidden='true'></span></button>";
                        }
                    }
                }
            }
            
            Utils::PrintJson(Utils::JqGridTable($records, $count, $page, $pages));
            break;
    }
}

$smarty->assign("canAdd", $AdminLogged->CanAccess(PRIV_FATTURAZIONE_ADD));
$smarty->assign("t_tipologiaDestinatario", array("NONE","Inquilino", "Altri clienti", "Beneficiari", "Manutentori"));
$smarty->display('invoiceManager.tpl');