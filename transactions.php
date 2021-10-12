<?php

$page_title = "Transazioni";
$url_section = "_gestione/transactions";
$sections = array(
    array("/#/main/", "Elenco Transazioni")
);

include 'header.php';
include './invoice_common/invoice_functions.php';
include_once LIBROOT . "/PHPExcel/PHPExcel.php";

if(isset($_REQUEST["action"])){
    switch ($_REQUEST["action"]){
        case "upload":
            $response = new stdClass();
            $response->success = false;
            $response->data = $_FILES["files"];
            if ( isset($_FILES["files"])) {
                //if there was an error uploading the file
                if ($_FILES["files"]["error"][0] > 0) {
                    $response->success = false;
                    $response->Error = "Return Code: " . $_FILES["files"]["error"][0] . "<br />";
                }else{
                    if (file_exists($_FILES["files"]["name"][0])) {
                        unlink($_FILES["files"]["name"][0]);
                    }
                    $storagename = "transactions.xls";
                    move_uploaded_file($_FILES["files"]["tmp_name"][0],  UPLOAD . $storagename);
                    $response->success = true;
                }
            }else {
                $response->Error = "No file selected <br />";
            }
            
            Utils::PrintJson($response, true);
            break;
        case "importToDB":
            set_time_limit(500);
            $response = new stdClass();
            $response->success = false;
            $response->count = 0;
            $response->data = array();
            $response->saved = array();
            $response->conflict = array();
            $response->exists = array();
            $response->error = '';
            $response->error_log = '';
            
            // This is the file path to be uploaded.
            $inputFileName = UPLOAD . 'transactions.xls';
            
            try {
                    $response->success = true;
                    $objPHPExcel = PHPExcel_IOFactory::load($inputFileName);
            } catch(Exception $e) {
                    $response->success = false;
                    $response->error_log = 'Error loading file "'.pathinfo($inputFileName,PATHINFO_BASENAME).'": '.$e->getMessage();
                    $response->error = 'Carica il file!';
                    Utils::PrintJson($response, true);
                    die();
            }
            
            $allDataInSheet = $objPHPExcel->getActiveSheet()->toArray(null,true,true,true);
            $arrayCount = count($allDataInSheet);  // Here get total count of row in that Excel sheet
            $estrattiPrevYears = FALSE;
            if($allDataInSheet[1]["B"] === "FINLIBERA S.P.A." || $allDataInSheet[1]["O"] === "FINLIBERA S.P.A."){
                $societa = FINLIBERA;
            }else if($allDataInSheet[1]["B"] === "ECOLIBERA SRL" || $allDataInSheet[1]["O"] === "ECOLIBERA SRL"){
                $societa = ECOLIBERA;
            }
            
            if($allDataInSheet[1]["A"] === "Filiale"){
                $estrattiPrevYears = TRUE;
            }
            
            if(!$estrattiPrevYears){
                for($i=8;$i<$arrayCount;$i++){
                    $response->count++;
                    $txn = new Movimento();
                    $txn->DataOperazione = DateTime::createFromFormat('d/m/Y', trim($allDataInSheet[$i]["A"]))->format('Y-m-d');
                    $txn->DataValuta = DateTime::createFromFormat('d/m/Y', trim($allDataInSheet[$i]["B"]))->format('Y-m-d');
                    $txn->Importo = Utils::tofloat(trim($allDataInSheet[$i]["C"]));
                    $txn->Causale = trim($allDataInSheet[$i]["D"]);
                    $txn->Descrizione = trim($allDataInSheet[$i]["E"]);
                    $txn->Societa = $societa;
                    if(!$txn->IfExists()){
                        if($txn->Save()){
                            $response->saved[] = $txn;
                        }else{
                            $response->conflict[] = $txn;
                        }
                    }else{
                        $response->exists[] = $txn;
                    }

                    $response->data[] = $txn;

                }
            }else{
                for($i=2;$i<=$arrayCount;$i++){
                    $response->count++;
                    
                    $importo = ($allDataInSheet[$i]["G"] === "-") ? $allDataInSheet[$i]["G"] . $allDataInSheet[$i]["H"] : $allDataInSheet[$i]["H"];
                    
                    $txn = new Movimento();
                    $txn->DataOperazione = DateTime::createFromFormat('d/m/Y', trim($allDataInSheet[$i]["C"]))->format('Y-m-d');
                    $txn->DataValuta = DateTime::createFromFormat('d/m/Y', trim($allDataInSheet[$i]["D"]))->format('Y-m-d');
                    $txn->Importo = Utils::tofloat(trim($importo));
                    $txn->Causale = trim($allDataInSheet[$i]["E"]);
                    $txn->Descrizione = trim($allDataInSheet[$i]["N"]);
                    $txn->Societa = $societa;
                    if(!$txn->IfExists()){
                        if($txn->Save()){
                            $response->saved[] = $txn;
                        }else{
                            $response->conflict[] = $txn;
                        }
                    }else{
                        $response->exists[] = $txn;
                    }

                    $response->data[] = $txn;

                }
            }
            
            if (file_exists($inputFileName)) {
                unlink($inputFileName);
            }
            
            Utils::PrintJson($response, true);
            break;
    }
}

?>
<link rel="stylesheet" href="<?php echo URL_ROOT ?>_gestione/css/togglePanel.css<?php echo $mobileV_css ?>"/>
<link rel="stylesheet" href="<?php echo URL_ROOT ?>_gestione/css/style_popup_container.css<?php echo $mobileV_css ?>"/>
<link rel="stylesheet" href="<?php echo URL_ROOT ?>_gestione/content/transactions/css/style.css?version=2.0"/>
<script src="<?php URL_HOST ?>/_gestione/js/togglePanel.js<?php echo $mobileV_js ?>"></script>
<script src="<?php URL_HOST ?>/_gestione/js/fatturaFornitore.js<?php echo $mobileV_js ?>"></script>
<script src="<?php URL_HOST ?>/_gestione/js/servizio_ui.js<?php echo $mobileV_js ?>"></script>
<script src="<?php URL_HOST ?>/_gestione/js/csg_fornitore.js<?php echo $mobileV_js ?>"></script>
<script src="<?php URL_HOST ?>/_gestione/js/autocomplete_Intestatari.js<?php echo $mobileV_js ?>"></script>
<script src="<?php URL_HOST ?>/_gestione/content/transactions/js/lib.js?version=2.6"></script>
<script src="<?php URL_HOST ?>/_gestione/content/transactions/js/sec_transactions.js?version=1.2"></script>
<script src="<?php URL_HOST ?>/_gestione/content/transactions/js/init.js?version=1.2"></script>
<?php 

include 'footer.php';

?>
