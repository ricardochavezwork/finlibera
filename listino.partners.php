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
			     ->setTitle("Listino Milanostanze")
			     ->setSubject("Disponibilita e Prezzo");

$run = TRUE;
$test = FALSE;
$smarty->clearConfig();
$smarty->configLoad("../../configs/" . $Language . ".conf");

$styleTitolo2 = array(
    'font'  => array(
        'bold'  => true,
        'color' => array('rgb' => '44546A'),
        'size'  => 13,
        'name'  => 'Calibri'
    ));

$styleContent = array(
    'font'  => array(
        'bold'  => false,
        'color' => array('rgb' => '44546A'),
        'size'  => 12,
        'name'  => 'Calibri Light'
    ));

$styleBorder = array(
  'borders' => array(
    'bottom' => array(
      'style' => PHPExcel_Style_Border::BORDER_MEDIUM,
      'color' => array('rgb' => 'A2B8E1')
    )
  )
);

$alignmentCenter = array(
    'alignment' => array(
        'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
    )
);

// Add some data
$objPHPExcel->setActiveSheetIndex(0)
            ->setCellValue('A3', '')
            ->setCellValue('B3', 'Appartamento')
            ->setCellValue('C3', 'N° Stanza')
            ->setCellValue('D3', 'PrezzoPartners')
            ->setCellValue('E3', 'Disponibilità')
            ->setCellValue('F3', 'Stato')
            ->setCellValue('G3', 'Admin Fee')
            ->setCellValue('H3', 'Agente')
            ->setCellValue('I3', 'Url MilanoStanze');

$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(10);
$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(35);
$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(15);
$objPHPExcel->getActiveSheet()->getColumnDimension('D')->setWidth(25);
$objPHPExcel->getActiveSheet()->getColumnDimension('E')->setWidth(15);
$objPHPExcel->getActiveSheet()->getColumnDimension('F')->setWidth(35);
$objPHPExcel->getActiveSheet()->getColumnDimension('G')->setWidth(15);
$objPHPExcel->getActiveSheet()->getColumnDimension('H')->setWidth(15);
$objPHPExcel->getActiveSheet()->getColumnDimension('I')->setWidth(45);

$objPHPExcel->getActiveSheet()->getStyle('A3:I3')->applyFromArray($styleTitolo2);
$objPHPExcel->getActiveSheet()->getStyle('A3:I3')->applyFromArray($styleBorder);

$objPHPExcel->getDefaultStyle()->getAlignment()->setWrapText(true);

$objPHPExcel->getActiveSheet()
    ->getStyle('C1:C256')
    ->applyFromArray($alignmentCenter);

$objPHPExcel->getActiveSheet()
    ->getStyle('D1:D256')
    ->applyFromArray($alignmentCenter);

$objPHPExcel->getActiveSheet()
    ->getStyle('E1:E256')
    ->applyFromArray($alignmentCenter);

$objPHPExcel->getActiveSheet()
    ->getStyle('G1:G256')
    ->applyFromArray($alignmentCenter);

$objPHPExcel->getActiveSheet()
    ->getStyle('H1:H256')
    ->applyFromArray($alignmentCenter);

if($run){
  $listing = Appartamento::LoadMilanoStanzeListing(TRUE, NULL, 2);
  
  $index = 4;
  
  foreach ($listing->records as $key => $record) {
      //$apt = (object)$value;
      $apt = $record->apt;
      if($apt->rooms && count($apt->rooms) > 0){
          
          $rooms = $apt->rooms;
          
          foreach ($rooms as $key => $room) {
              if($room->visibile && intval($room->visibile) > 0){
                $objPHPExcel->setActiveSheetIndex(0)
                  ->setCellValue('B' . $index, $apt->details->address);

                $objPHPExcel->setActiveSheetIndex(0)
                            ->setCellValue('C' . $index, $room->num);

                $objPHPExcel->setActiveSheetIndex(0)
                            ->setCellValue('D' . $index, $room->booking->monthlyPrice);

                $objPHPExcel->setActiveSheetIndex(0)
                            ->setCellValue('E' . $index, $room->booking->availability->DMY);

                $objPHPExcel->setActiveSheetIndex(0)
                            ->setCellValue('F' . $index, $room->booking->availability->status);

                $objPHPExcel->setActiveSheetIndex(0)
                            ->setCellValue('G' . $index, $room->booking->adminFee);

                $objPHPExcel->setActiveSheetIndex(0)
                            ->setCellValue('H' . $index, $room->realtor->name);

                $objPHPExcel->setActiveSheetIndex(0)
                            ->setCellValue('I' . $index, $room->url);

                $objPHPExcel->getActiveSheet()->getStyle('A' . $index . ':I' . $index)->applyFromArray($styleContent);
                $index++;
              }
          }
      }
  }

  if ($test) {
    Utils::PrintJson($listing, true);
  }else{
    // Rename worksheet
    $objPHPExcel->getActiveSheet()->setTitle('Milanostanze');
    // Set active sheet index to the first sheet, so Excel opens this as the first sheet
    $objPHPExcel->setActiveSheetIndex(0);
    // Redirect output to a client’s web browser (Excel5)
    header('Content-Type: application/vnd.ms-excel');
    header('Content-Disposition: attachment;filename="Milanostanze.xls"');
    header('Cache-Control: max-age=0');
    // If you're serving to IE 9, then the following may be needed
    header('Cache-Control: max-age=1');
    // If you're serving to IE over SSL, then the following may be needed
    header ('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // date in the past
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
