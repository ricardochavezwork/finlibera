<?php
/**
 * PHPExcel
 *
 * Copyright (c) 2006 - 2015 PHPExcel
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 *
 * @category   PHPExcel
 * @package    PHPExcel
 * @copyright  Copyright (c) 2006 - 2015 PHPExcel (http://www.codeplex.com/PHPExcel)
 * @license    http://www.gnu.org/licenses/old-licenses/lgpl-2.1.txt	LGPL
 * @version    ##VERSION##, ##DATE##
 */
/** Error reporting */
error_reporting(E_ALL);
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);
date_default_timezone_set('Europe/London');

include 'common.php';
include './invoice_common/invoice_functions.php';
include_once LIBROOT . "/PHPExcel/PHPExcel.php";

// Create new PHPExcel object
$objPHPExcel = new PHPExcel();
// Set document properties
$objPHPExcel->getProperties()->setCreator("Milanostanze.it")
			     ->setLastModifiedBy("Milanostanze.it")
			     ->setTitle("Milanostanze - Link delle foto")
			     ->setSubject("Foto Parti comuni e Stanze");

$run = TRUE;
$test = FALSE;
$response = new stdClass();
$response->records = array();
$smarty->clearConfig();
$smarty->configLoad("../../configs/" . $Language . ".conf");


// Add some data
$objPHPExcel->setActiveSheetIndex(0)
            ->setCellValue('A1', 'Appartamento')
            ->setCellValue('B1', 'Foto Parti Comuni')
            ->setCellValue('B2', 'Link')
            ->setCellValue('C2', 'Descrizione')
            ->setCellValue('D1', 'Info Generali')
            ->setCellValue('D2', 'Numero Stanza')
            ->setCellValue('E2', 'Link Milanostanze.it')
            ->setCellValue('F2', 'Disponibilità')
            ->setCellValue('G2', 'Stato')
            ->setCellValue('H2', 'Prezzo')
            ->setCellValue('I2', 'AdminFee')
            ->setCellValue('J2', 'Agente')
            ->setCellValue('K1', 'Foto Stanze')
            ->setCellValue('K2', 'Link')
            ->setCellValue('L2', 'Descrizione');

$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(35);
$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(45);
$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(20);
$objPHPExcel->getActiveSheet()->getColumnDimension('D')->setWidth(20);
$objPHPExcel->getActiveSheet()->getColumnDimension('E')->setWidth(45);
$objPHPExcel->getActiveSheet()->getColumnDimension('F')->setWidth(20);
$objPHPExcel->getActiveSheet()->getColumnDimension('G')->setWidth(20);
$objPHPExcel->getActiveSheet()->getColumnDimension('H')->setWidth(20);
$objPHPExcel->getActiveSheet()->getColumnDimension('I')->setWidth(20);
$objPHPExcel->getActiveSheet()->getColumnDimension('J')->setWidth(20);
$objPHPExcel->getActiveSheet()->getColumnDimension('K')->setWidth(45);
$objPHPExcel->getActiveSheet()->getColumnDimension('L')->setWidth(20);

$objPHPExcel->getDefaultStyle()->getAlignment()->setWrapText(true);

/**$objPHPExcel->getActiveSheet()->getStyle('B1:B'.$objPHPExcel->getActiveSheet()->getHighestRow())
    ->getAlignment()->setWrapText(true);

$objPHPExcel->getActiveSheet()->getStyle('E1:E'.$objPHPExcel->getActiveSheet()->getHighestRow())
    ->getAlignment()->setWrapText(true);*/

if($run){
  $includeInvisible = true;
  $styleArray = array(
    'font'  => array(
        'bold'  => true,
        'color' => array('rgb' => '14699b'),
        'size'  => 12,
        'name'  => 'Verdana'
    ));

  $apts = Appartamento::Load();
  $indexApt = 4;
  foreach ($apts as $key => $value) {
      $apt = (object)$value;
      if (intval($apt->Visibile) > 0) {
        $record = new stdClass();
        $record->Apt = $apt->Indirizzo;
        $record->Pics = array();
        $record->Rooms = array();
        $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A' . $indexApt, $apt->Indirizzo);
        $objPHPExcel->getActiveSheet()->getStyle('A' . $indexApt)->applyFromArray($styleArray);

        $aptPhotos = Appartamento_Foto::Load($apt->Id);
        $aptStanze = Appartamento_Stanza::Load($apt->Id);

        foreach ($aptPhotos as $k => $v) {
          $i = $indexApt + $k;
          $photo = new stdClass();
          $photo->Url = "http://www.milanostanze.it" . $v->Url;
          $photo->Descrizione = $v->Descrizione;

          $pic = new stdClass();
          $pic->Link = $photo->Url;
          $pic->Descrizione = $photo->Descrizione;
          $record->Pics[] = $pic;

          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('B' . $i, $photo->Url)
                      ->setCellValue('C' . $i, $photo->Descrizione);
        }

        foreach ($aptStanze as $x => $stanza) {
          $roomPhotos = Appartamento_Stanza_Foto::Load($stanza->Id);

          $room = new stdClass();
          $room->Num = $stanza->Numero;
          $room->Pics = array();

          //Agente
          $admin = new AdminAccount($stanza->IdAdmin);

          //Disponibilita
          $d = new stdClass();
          $inquilini = Inquilino_Stanza::Load($stanza->Id);
          $dataStanzaLibera = time();
          $availability = null;
          $currentDate = new DateTime();
          if (count($inquilini) == 0) {
              $d->Status = $smarty->getConfigVariable("room_detail_disponibile_subito");
          } else {
              $dal = 0;
              $now = time();
              foreach ($inquilini as $i) {
                  if (!$i->DataFine) {
                      $dal = -1;
                  } else if (/*$now >= Utils::GetTimestamp($i->DataInizio) &&*/ ($dal == 0 || $dal < Utils::GetTimestamp($i->DataFine))) {
                      $dal = Utils::GetTimestamp($i->DataFine);
                      $availability = new DateTime($i->DataFine);
                  }
              }
              if ($dal == -1) {
                  $dataStanzaLibera = 0;
                  $d->Status = $smarty->getConfigVariable("room_detail_disponibile_no");
                  $availability = null;
              } else if ($dal <= $now) {
                  $d->Status = $smarty->getConfigVariable("room_detail_disponibile_subito");
              } else {
                  $dataStanzaLibera = $dal;
                  $d->Status = $smarty->getConfigVariable("room_detail_disponibile_data") . " " . strftime("%d %B", $dal);
              }
          }

          if($stanza->isBooked()){
              $d->Status = "Prenotata";
          }

          $d->Availability = ($availability ? $availability->format('d/m/Y') : null);

					//Prezzo
          if($availability){
              $avail = clone $availability;
              $cur = new DateTime();
                
              if($avail < $cur){
                  $avail = $cur;
              }

              switch (intval($avail->format('m'))) {
                  case 1 :
                  case 2 :
                  case 3 :
                  case 4 :
                      $d->MonthlyPrice = ($stanza->PrezzoSuggerito + 20);
                      break;
                  case 5 :
                      if(intval($avail->format('d')) >= 15){
                          $d->MonthlyPrice = $stanza->PrezzoSuggerito;
                      }else{
                          $d->MonthlyPrice = ($stanza->PrezzoSuggerito + 20);
                      }
                      break;
                  case 6 :
                  case 7 :
                      $d->MonthlyPrice = $stanza->PrezzoSuggerito;
                      break;
                  case 8 :
                      if(intval($avail->format('d')) >= 16){
                          $d->MonthlyPrice = ($stanza->PrezzoSuggerito + 50);
                      }else{
                          $d->MonthlyPrice = $stanza->PrezzoSuggerito;
                      }
                      break;
                  case 9 :
                  case 10 :
                  case 11 :
                      $d->MonthlyPrice = ($stanza->PrezzoSuggerito + 50);
                      break;
                  case 12 :
                      if(intval($avail->format('d')) >= 16){
                          $d->MonthlyPrice = ($stanza->PrezzoSuggerito + 20);
                      }else{
                          $d->MonthlyPrice = ($stanza->PrezzoSuggerito + 50);
                      }
                      break;
              }
          }else{
              $d->MonthlyPrice = $stanza->PrezzoSuggerito;
          }

          $d->AdminFee = adminFee($d->MonthlyPrice);

          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('D' . $indexApt, 'C' . $stanza->Numero)
                      ->setCellValue('J' . $indexApt, $admin->Username)
                      ->setCellValue('E' . $indexApt, "http://www.milanostanze.it/room/" . $stanza->Id)
                      ->setCellValue('F' . $indexApt, $d->Availability)
                      ->setCellValue('G' . $indexApt, $d->Status)
                      ->setCellValue('H' . $indexApt, $d->MonthlyPrice)
                      ->setCellValue('I' . $indexApt, $d->AdminFee);
          $objPHPExcel->getActiveSheet()->getStyle('D' . $indexApt)->applyFromArray($styleArray);

          foreach ($roomPhotos as $k => $v) {
              $i = $indexApt + $k;
              $photo = new stdClass();
              $photo->Url = "http://www.milanostanze.it" . $v->Url;
              $photo->Descrizione = $v->Descrizione;

              $pic = new stdClass();
              $pic->Link = $photo->Url;
              $pic->Descrizione = $photo->Descrizione;
              $room->Pics[] = $pic;

              $objPHPExcel->setActiveSheetIndex(0)
                          ->setCellValue('K' . $i, $photo->Url)
                          ->setCellValue('L' . $i, $photo->Descrizione);
          }

          $record->Rooms[] = $room;


          if (count($aptPhotos) > count($roomPhotos)) {
            $indexApt += count($aptPhotos);
          }else{
            $indexApt += count($roomPhotos);
          }
        }

      }

      $response->records[] = $record;

  }

  if ($test) {
    Utils::PrintJson($response, true);
  }else{
    // Rename worksheet
    $objPHPExcel->getActiveSheet()->setTitle('Milanostanze');
    // Set active sheet index to the first sheet, so Excel opens this as the first sheet
    $objPHPExcel->setActiveSheetIndex(0);
    // Redirect output to a client’s web browser (Excel5)
    header('Content-Type: application/vnd.ms-excel');
    header('Content-Disposition: attachment;filename="FotoMilanostanze.xls"');
    header('Cache-Control: max-age=0');
    // If you're serving to IE 9, then the following may be needed
    header('Cache-Control: max-age=1');
    // If you're serving to IE over SSL, then the following may be needed
    header ('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
    header ('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT'); // always modified
    header ('Cache-Control: cache, must-revalidate'); // HTTP/1.1
    header ('Pragma: public'); // HTTP/1.0
    $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
    $objWriter->save('php://output');
    exit;
  }

}else{
  echo "Stato : Sospeso";
}
