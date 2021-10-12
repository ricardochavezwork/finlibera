<?php

$page_title = "Fatturazione";
$url_section = "_gestione/invoices";
$sections = array(
    array("/#/dashboard/", "Dashboard"),
    array("/#/fatture-attive/", "Fatturazione Attiva"),
    array("/#/fatture-passive/", "Fatturazione Passiva"),
    array("/#/bozze/", "Bozze"),
    array("/#/notifiche/", "Notifiche")
);

include 'header.php';

$input = $_REQUEST["data"];

if(isset($_REQUEST["action"])){
    switch ($_REQUEST["action"]){
        case "search" :
            $res = new stdClass();
            $res->Success = false;
            $res->Data = array();
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $input = $decode;
            
            $filtro = $input->Filtro ? $input->Filtro : null;
            
            if($filtro){
                $pagination = ($filtro->Pagination ? $filtro->Pagination : null);
                $page = ($pagination->CurrentPage ? $pagination->CurrentPage : 1);
                $limit = ($pagination->LimitRows ? $pagination->LimitRows : 100);
                $offset = Utils::GetPageOffset($page, $limit);
                $count = 0;
                $order = ($pagination->OrderBy ? $pagination->OrderBy : "ft.Id DESC");
                $res->Data = Fattura::acube_search_draft($filtro, $order, $limit, $offset, $count);
                $res->TotalPages = Utils::GetPagesCount($count, $limit);
                $res->TotalRows = $count;
            }

            Utils::PrintJson($res, true);
            break;
        case "fatturePassive" :
            $res = new stdClass();
            $res->Success = false;
            $res->Data = array();
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $input = $decode;
            
            $filtro = $input->Filtro ? $input->Filtro : null;
            
            if($filtro){
                $pagination = ($filtro->Pagination ? $filtro->Pagination : null);
                $page = ($pagination->CurrentPage ? $pagination->CurrentPage : 1);
                $limit = ($pagination->LimitRows ? $pagination->LimitRows : 100);
                $offset = Utils::GetPageOffset($page, $limit);
                $count = 0;
                $order = ($pagination->OrderBy ? $pagination->OrderBy : "ff.Data DESC");
                $res->Data = DocumentoFiscale::SearchSupplierInvoices($filtro, $order, $limit, $offset, $count);
                $res->TotalPages = Utils::GetPagesCount($count, $limit);
                $res->TotalRows = $count;
            }

            Utils::PrintJson($res, true);
            break;
        case "fattureAttive" :
            $res = new stdClass();
            $res->Success = false;
            $res->Data = array();
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $input = $decode;
            
            $filtro = $input->Filtro ? $input->Filtro : null;
            
            if($filtro){
                $pagination = ($filtro->Pagination ? $filtro->Pagination : null);
                $page = ($pagination->CurrentPage ? $pagination->CurrentPage : 1);
                $limit = ($pagination->LimitRows ? $pagination->LimitRows : 100);
                $offset = Utils::GetPageOffset($page, $limit);
                $count = 0;
                $order = ($pagination->OrderBy ? $pagination->OrderBy : "ft.Data DESC, ft.Numero DESC");
                $res->Data = DocumentoFiscale::SearchCustomerInvoices($filtro, $order, $limit, $offset, $count);
                $res->TotalPages = Utils::GetPagesCount($count, $limit);
                $res->TotalRows = $count;
            }

            Utils::PrintJson($res, true);
            break;
        case "pendingInvoices" :
            $res = new stdClass();
            $res->Success = false;
            $res->Data = array();
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $input = $decode;
            
            $filtro = $input->Filtro ? $input->Filtro : null;
            
            if($filtro){
                $pagination = ($filtro->Pagination ? $filtro->Pagination : null);
                $page = ($pagination->CurrentPage ? $pagination->CurrentPage : 1);
                $limit = ($pagination->LimitRows ? $pagination->LimitRows : 100);
                $offset = Utils::GetPageOffset($page, $limit);
                $count = 0;
                $order = ($pagination->OrderBy ? $pagination->OrderBy : "ft.Data DESC, ft.Numero DESC");
                $res->Data = DocumentoFiscale::SearchPending_CustomerInvoices($filtro, $order, $limit, $offset, $count);
                $res->TotalPages = Utils::GetPagesCount($count, $limit);
                $res->TotalRows = $count;
            }

            Utils::PrintJson($res, true);
            break;
        case "notifications" :
            $res = new stdClass();
            $res->Success = false;
            $res->Data = array();
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $input = $decode;

            $filtro = $input->filtro ? $input->filtro : null;
            
            if($filtro){
                $pagination = ($filtro->Pagination ? $filtro->Pagination : null);
                $page = ($pagination->CurrentPage ? $pagination->CurrentPage : 1);
                $limit = ($pagination->LimitRows ? $pagination->LimitRows : 100);
                $offset = Utils::GetPageOffset($page, $limit);
                $count = 0;
                $order = ($pagination->OrderBy ? $pagination->OrderBy : "notif.DataRegistrazione DESC");
                $res->Data = FE_CustomerNotification::Search($filtro, $order, $limit, $offset, $count);
                $res->TotalPages = Utils::GetPagesCount($count, $limit);
                $res->TotalRows = $count;
            }

            Utils::PrintJson($res, true);
            break;
        /**
         * saveUUID : This func works only for Fatture (DocumentiFiscali Type : 1)
         */
        case "saveUUID":
            $res = new stdClass();
            $res->success = false;
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $input = $decode;
            
            $id_invoice = $input->id_invoice;
            $uuid = $input->uuid;
            
            if(intval($id_invoice) > 0){
                $docFisc = new DocumentoFiscale();
                $docFisc->Id = $id_invoice;
                $docFisc->Type = 1;
                $docFisc->UUID_Acube = $uuid;
                if($docFisc->SaveUUID()){
                    $res->success = true;
                }
            }
            
            Utils::PrintJson($res, true);
            break;
        case "DownloadPDF":
            $res = new stdClass();
            $res->success = false;
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $input = $decode;
            
            $uuid = $input->uuid;
            $token = $input->token;
            
            if($uuid && $token){
                $curl = curl_init();

                curl_setopt_array($curl, array(
                  CURLOPT_URL => "https://api.acubeapi.com/invoices/" . $uuid,
                  CURLOPT_RETURNTRANSFER => true,
                  CURLOPT_ENCODING => "",
                  CURLOPT_MAXREDIRS => 10,
                  CURLOPT_TIMEOUT => 30,
                  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                  CURLOPT_CUSTOMREQUEST => "GET",
                  CURLOPT_POSTFIELDS => "",
                  CURLOPT_HTTPHEADER => array(
                    "Authorization: Bearer " . $token,
                    "Content-Type: application/pdf",
                    "cache-control: no-cache"
                  ),
                ));

                $response = curl_exec($curl);
                $err = curl_error($curl);

                curl_close($curl);
                
                if($response){
                    $b64Doc = chunk_split(base64_encode($response));
                    $res->pdf = $b64Doc;
                    $res->success = true;
                }
                
            }
            
            
            Utils::PrintJson($res, true);
            break;
        case "numbering":
            $res = new stdClass();
            $res->success = false;
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $input = $decode;
            
            $res->dati = new stdClass();
            $res->dati->numero = null;
            $res->dati->data = null;
            
            $id_invoice = $input->id_invoice;
            $mode = $input->mode;
            
            if(intval($id_invoice) > 0 && intval($mode) > 0){
                
                $invoice = new Fattura($id_invoice);
                $docFisc = new DocumentoFiscale($id_invoice);
                
                switch (intval($mode)) {
                    case 1:
                        if(!$invoice->Numero && !$invoice->Data && !$docFisc->UUID_Acube){
                            $cur_date = new DateTime();
                            $invoice->Numbering();
                            $invoice->Data = $cur_date->format('Y-m-d');
                        }
                        break;
                    case 2:
                        if(!$docFisc->UUID_Acube){
                            $invoice->Numero = null;
                            $invoice->Data = null;
                        }
                        break;
                }
                
                $res->dati->numero = $invoice->Numero;
                $res->dati->data = $invoice->Data;
                
                if($invoice->Save()){
                    $res->success = true;
                }
                
            }
            
            Utils::PrintJson($res, true);
            break;
    }
}
                
?>
<link rel="stylesheet" href="<?php URL_ROOT ?>/_gestione/content/invoiceManager/css/style.css<?php echo $mobileV_css ?>"/>
<script src="<?php URL_HOST ?>/_gestione/content/invoiceManager/js/dashboard.js?version=1.2"></script>
<script src="<?php URL_HOST ?>/_gestione/content/invoiceManager/js/fatture_attive.js?version=1.5"></script>
<script src="<?php URL_HOST ?>/_gestione/content/invoiceManager/js/draftInvoices.js?version=1.8"></script>
<script src="<?php URL_HOST ?>/_gestione/content/invoiceManager/js/fatture_passive.js?version=1.6"></script>
<script src="<?php URL_HOST ?>/_gestione/content/invoiceManager/js/notifications.js?version=1.4"></script>
<script src="<?php URL_HOST ?>/_gestione/content/invoiceManager/js/lib.js?version=1.15"></script>
<script src="<?php URL_HOST ?>/_gestione/content/invoiceManager/js/init.js?version=1.4"></script>
<?php 

include 'footer.php';

?>
