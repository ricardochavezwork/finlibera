<?php

include 'common.php';
include './invoice_common/invoice_functions.php';
include_once LIBROOT . "/PHPExcel/PHPExcel.php";

/*$input = $_POST["data"];*/
$IdIns = $_GET["idIns"];
checkPrivilege(PRIV_FATTURAZIONE_ADD);

if(intval($IdIns) > 0){
    $ins = new Inquilino_Stanza($IdIns);
    $ins->setInquilino();
    $ins->setStanza();
    $tenant = $ins->Inquilino;
    $stanza = $ins->Stanza;
    $apt = $stanza->Appartamento;
    $bookingDetails = null;
    $prevIns = 0;
    $isSwitchRoom = Booking_Details::isSwitchRoom($ins->Id);
    
    if(intval($ins->IdBookingDetails) > 0){
        $bookingDetails = new Booking_Details($ins->IdBookingDetails);
    }
    
    if(intval($bookingDetails->IdInquilinoStanza) > 0){
        $prevIns = intval($bookingDetails->IdInquilinoStanza);
    }
    
    $inqNominativo = $tenant->getFormalNominativo();
    
    $fileName = '../upload/conteggiExcel/' . $ins->Id . '.xlsx';
    $originaleFileName = '../upload/conteggiExcel/FILECHIUSURE_ORIGINALE.xlsx';
    
    if (file_exists($fileName)) {
        unlink($fileName);
    }
    
    ######## BEGIN : INS VARIABLES #########
            
    $dataInizio = new DateTime($ins->DataInizio);
    $dataFine = new DateTime($ins->DataFine);
    $dataFineEffettiva = clone $dataFine;
    $dataFineEffettiva->sub(new DateInterval('P1D'));
    $totLocazione = calcoloCanoneLocazionePeriodo($ins->Id, $ins->DataInizio, $dataFineEffettiva->format('Y-m-d'));

    ######## END : INS VARIABLES   #########
    
    // Load an existing spreadsheet
 
    $phpExcel = PHPExcel_IOFactory::load($originaleFileName);
    
    // Get the first sheet

    $sheet = $phpExcel->getSheetByName('Calcolo');

    $sheet->setCellValue('A4', $stanza->getNominativo());
    $sheet->setCellValue('C4', $dataInizio->format('d/m/Y'));
    $sheet->setCellValue('D4', $dataFine->format('d/m/Y'));
    $sheet->setCellValue('F4', Appartamento::countStanze($apt->Id));
    $sheet->setCellValue('C8', $ins->Canone);
    $sheet->setCellValue('C50', Inquilino_Stanza::getTotDiscountsByIns($ins->Id));
    
    if($isSwitchRoom){
        $sheet->setCellValue('C35', 0);
        $sheet->setCellValue('D35', "Cambio stanza");
    }
    
    
    
    ###### BEGIN : MOVIMENTI ######
            
            
    $sheet_ft = $phpExcel->getSheetByName('Fatture');
    $sheet_movimenti = $phpExcel->getSheetByName('Movimenti');
    $sheet_manutenzioni = $phpExcel->getSheetByName('Manutenzioni');
    $sheet_ISTAT = $phpExcel->getSheetByName('ISTAT');
    $sheet_vars = $phpExcel->getSheetByName('Vars');

    $accountBalance = Inquilino_Stanza::LoadAccountBalance($ins->Id);
    //$manutenzioni = Servizio::Load(null, null, null, $ins->Id);
    $manutenzioni = Servizio::LoadFrom2020(null, null, null, $ins->Id);
    $rami = array();
    $rowB = 1;
    $nc = 0;
    $countFT = 0;

    if($ins->ImportoNonContabilizzato > 0){
        $rowB++;
        $sheet_movimenti->setCellValue('A' . $rowB, "");
        $sheet_movimenti->setCellValue('B' . $rowB, $ins->SpecificaImportoNonContabilizzato);
        $sheet_movimenti->setCellValue('C' . $rowB, $ins->ImportoNonContabilizzato);
    }
    
    foreach ($accountBalance as $key => $doc) {

        $row = $key + 2;
        $invoice = $doc->Fattura;
        $pyms = $doc->Rami;

        $invoice_date = new DateTime($invoice->Data);
        $invoice_total = $invoice->Totale;

        if(($invoice->Totale >= 77.47) && (intval($invoice->Tipologia) !== FATTURA_CHIUSURA)){
            $countFT++;
        }
        
        if(($invoice->Totale >= 77.47) && (intval($invoice->Tipologia) === FATTURA_STORNO)){
            $countFT -= 2;
        }

        if(intval($invoice->Tipologia) === FATTURA_STORNO){
            $invoice_total *= -1; 
        }

        $sheet_ft->setCellValue('A' . $row, $invoice_date->format('d/m/Y'));
        $sheet_ft->setCellValue('B' . $row, $invoice->Numero);
        $sheet_ft->setCellValue('C' . $row, $invoice_total);
        $sheet_ft->setCellValue('D' . $row, $invoice->Tipologia);

        if(count($pyms) > 0){
            foreach ($pyms as $keyB => $pym) {
                $pym = (object) $pym;
                $rowB++;
                $pym_date = new DateTime($pym->DataOperazione);

                $sheet_movimenti->setCellValue('A' . $rowB, $pym_date->format('d/m/Y'));
                $sheet_movimenti->setCellValue('C' . $rowB, $pym->Importo);
            }
        }
    }
    
    $sheet->setCellValue('D28', $countFT);

    foreach ($manutenzioni as $keyC => $manu) {
        if(intval($manu->IdFornitore) === 6010){
            if($manu->isPenalePulizie()){
                $sheet->setCellValue('D48', "si");
                continue;
            }
        }

        $rowC = $keyC + 2;
        $manu->LoadRelationship();
        if($manu->ServizioDescrizione){
            $descr = $manu->ServizioDescrizione;

            if($descr->Descrizione && $descr->Descrizione !== ""){
                $sheet_manutenzioni->setCellValue('B' . $rowC, $descr->Descrizione);
            }
        }

        if($manu->ServizioImporto){
            $importo = $manu->ServizioImporto;
            if($importo->Importo && floatval($importo->Importo) !== 0){
                $sheet_manutenzioni->setCellValue('C' . $rowC, $importo->Importo);
            }
        }
    }

    if(intval($ins->Pulizie) > 0){
        $sheet->setCellValue('D48', "si");
    }

    if(intval($ins->AffittatoDaSolo) > 0){
        $sheet->setCellValue('C40', 0);
        $sheet->setCellValue('D40', "Affittato da solo");
        $sheet->setCellValue('C41', 0);
        $sheet->setCellValue('D41', "Affittato da solo");
    }

    $penalePymRateizzato = getPenalePagamentoRateizzato($ins);

    if(!$penalePymRateizzato){
        $penalePymRateizzato = 0;
    }

    $sheet->setCellValue('C42', -$penalePymRateizzato);

    $penaRitardoPagamenti = getPenaleRitardoPagamenti($ins);

    if(!$penaRitardoPagamenti){
        $penaRitardoPagamenti = 0;
    }

    $sheet->setCellValue('C43', -$penaRitardoPagamenti);

    $totManutenzioniFatturate = $ins->getTotManutenzioniFatturate();
    $totTariFatturato = $ins->getTotTariFatturato();
    $totTvFatturato = $ins->getTotTvFatturato();

    $sheet->setCellValue('D31', $totManutenzioniFatturate);
    $sheet->setCellValue('D32', $totTariFatturato);
    $sheet->setCellValue('D33', $totTvFatturato);

    $variazioniIstat = $ins->getPercentualiISTAT();

    foreach ($variazioniIstat as $keyD => $variazioneIstat) {
        $rowD = $keyD+2;
        $percentuale = $variazioneIstat->Percentuale;
        $dataVariazione = new DateTime($variazioneIstat->DataVariazione);
        $sheet_ISTAT->setCellValue('A' . $rowD, $percentuale);
        $sheet_ISTAT->setCellValue('B' . $rowD, $dataVariazione->format('Y'));
    }
    
    $tassaRegistrazione = floatval(getTassaRegistrazionePI($ins->Id, $ins->Canone));
    $tCell = floatval($sheet->getCell('C15')->getFormattedValue());
    $cauzioneCell = intval($sheet->getCell('C14')->getFormattedValue());
    $cauzioneIns = intval($ins->Cauzione);
    
    if($tassaRegistrazione !== $tCell){
        $sheet->setCellValue('C15', $tassaRegistrazione);
    }
    
    if($cauzioneIns !== $cauzioneCell){
        $sheet->setCellValue('C14', $cauzioneIns);
    }
    
    if($prevIns > 0){
        $sheet->setCellValue('C17', 0);
    }
    
    $dataFirma = new DateTime($ins->DataInizio);
    
    if($ins->DataFirma){
        $dataFirma = new DateTime($ins->DataFirma);
    }
    
    // BEGIN : IRP
    
    $IRP = Inquilino_Stanza::getIRP($ins->Id);
    
    if($IRP > 0){
        /*$sheet->setCellValue('C44', 0);*/
        $sheet->setCellValue('D45', $IRP);
        $sheet_vars->setCellValue('B10', $IRP);
    }
    
    // END : IRP
    
    $sheet_vars->setCellValue('B4', $dataFirma->format('d/m/Y'));
    $sheet_vars->setCellValue('B5', $ins->PeriodoFatturazione);
    $sheet_vars->setCellValue('B6', $ins->IdContractDocs);
    $sheet_vars->setCellValue('B7', $ins->ImportoNonContabilizzato);
    $sheet_vars->setCellValue('C7', $ins->SpecificaImportoNonContabilizzato);
    $sheet_vars->setCellValue('B9', $ins->Turistico);
    $sheet_vars->setCellValue('B11', $totLocazione);
    
    ###### END : MOVIMENTI   ######
    
    header('Content-Description: File Transfer');
    header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    header('Content-Disposition: attachment;filename="' . $inqNominativo . '.xlsx"');
    header('Content-Transfer-Encoding: binary');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    
    $writer = PHPExcel_IOFactory::createWriter($phpExcel, "Excel2007");
    $writer->save('php://output');
    
    exit;
    
}   
