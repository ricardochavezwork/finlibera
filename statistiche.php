<?php

include 'common.php';
$trimestri = $_GET["trimestri"];
$inizio = $_GET["inizio"];
$fine = $_GET["fine"];

function my_sort($x,$y){
    
    $a = intval($x->pSfitto);
    $b = intval($y->pSfitto);
    
    if ($a==$b) return 0;
    return ($b<$a)?-1:1;
    
}

/*$n = calcoloSfitti(12, "2015-01-01", "2015-12-31");
Utils::PrintJson($n, true);*/

if (isset($_REQUEST["action"])) {
    switch ($_REQUEST["action"]) {
        case "inflowOverviewQuarterly":
            $data_trimestri = json_decode($trimestri, false);
            $res = array();
            $tot = 0;
            $count = count($data_trimestri);
            $date_from = null;
            $date_to = null;
            foreach ($data_trimestri as $key => $row){
                $inizio = new DateTime($row->DataInizio);
                $fine = new DateTime($row->DataFine);
                
                if($key === 0){
                    $date_from = $inizio;
                }
                
                if($key === ($count - 1)){
                    $date_to = $fine;
                }
                
                $trimestre["NTrimestre"] = ($key + 1) . ") " . $inizio->format('d/m/Y') . " - " . $fine->format('d/m/Y');
                $trimestre["TotaleTrimestre"] = Inquilino_Stanza::inflowOverview($inizio->format('Y-m-d'), $fine->format('Y-m-d'), null, true);
                $trimestre["NIns"] = Inquilino_Stanza::inflowOverview($inizio->format('Y-m-d'), $fine->format('Y-m-d'), 2, true);
                $totTrimestre = intval($trimestre["TotaleTrimestre"]);
                if($totTrimestre > 0){
                    $tot += $totTrimestre;
                }
                $res[]= $trimestre;
            }
            
            if($date_from && $date_to){
                $aggiunta = Inquilino_Stanza::inflowOverview($date_from->format('Y-m-d'), $date_to->format('Y-m-d'), 1, true);
                $tot += intval($aggiunta);
            }
            
            $userdata["NTrimestre"] = "";
            $userdata["NIns"] = "Total";
            $userdata["TotaleTrimestre"] = number_format($tot, 2);
            
            Utils::PrintJson(Utils::JsonEncodeJqGrid($userdata, $res));
            //Utils::PrintJson($date_to->format('Y-m-d'), true);
            break;
        case "sfittiStanze":
            $stanze = Appartamento_Stanza::LoadVisibili();
            if(count($stanze) > 1){
                foreach ($stanze as $key => $row) {
                    $calcolo = calcoloSfitti($row->Id, "2016-01-01", "2017-01-31");
                    $stanze[$key]->gSfitto = intval($calcolo["tot"]);
                    $stanze[$key]->tgs = intval($calcolo["giorniPeriodo"]);
                    $stanze[$key]->pSfitto = number_format(((intval($calcolo["tot"]) * 100) / intval($calcolo["giorniPeriodo"])), 2);
                    //$stanze[$key]->gSfitto = calcoloSfitti($row->Id, $inizio, $fine);
                    $appartamento = new Appartamento($row->IdAppartamento);
                    $stanze[$key]->Indirizzo = $appartamento->Indirizzo . " - " . $appartamento->Civico;
                    $admin = new AdminAccount($row->IdAdmin);
                    $stanze[$key]->IdAdmin = $admin->Username;
                }
            }
            
            usort($stanze, "my_sort");
            
            Utils::PrintJson($stanze, true);
            break;
    }
}

/**
 * Sfitti per IdStanza
 */
function calcoloSfitti ($idStanza, $dataInizioPeriodo, $dataFinePeriodo){
    global $Database;
    $tot = 0;
    $giorniOccupati = 0;
    $giorniPeriodo = 0;
    $m_DataInizio = null;
    $m_DataFine = null;
    $DataInizioPeriodo = null;
    $DataFinePeriodo =  new DateTime($dataFinePeriodo);

    $funzioneDataInizio = sprintf("stats_getDataInizio(DataInizio, DataFine, '%s', '%s') as m_DataInizio" , $dataInizioPeriodo, $dataFinePeriodo);
    $funzioneDataFine = sprintf("stats_getDataFine(DataInizio, DataFine, '%s', '%s') as m_DataFine" , $dataInizioPeriodo, $dataFinePeriodo);
    $funzioneInizioPeriodo = sprintf("stats_getDataInizioPeriodo(IdStanza, '%s', '%s') as DataInizioPeriodo" , $dataInizioPeriodo, $dataFinePeriodo);
    $where = sprintf("DataInizio <= '%s' AND (DataFine >= '%s' OR DataFine is null) AND IdStanza = %d", $dataFinePeriodo, $dataInizioPeriodo, $idStanza);
    //$query = sprintf("SELECT *, %s, %s, %s FROM Inquilini_Stanze where %s", $funzioneDataInizio, $funzioneDataFine, $funzioneInizioPeriodo, $where);
    $query = "SELECT *, " . $funzioneDataInizio . ", " . $funzioneDataFine . ", " . $funzioneInizioPeriodo . " FROM Inquilini_Stanze where " . $where;
    if ($res = $Database->Query($query))
    {
        $x = 0;
        while ($row = $Database->Fetch($res)){
            $m_DataInizio = new DateTime($row["m_DataInizio"]);
            $m_DataFine = new DateTime($row["m_DataFine"]);
            $DataInizioPeriodo = new DateTime($row["DataInizioPeriodo"]);
            $giorniOccupati += $m_DataInizio->diff($m_DataFine)->days;
            $x++;
        }
        /*if($x > 0){
            
        }*/
    }
    
    if($DataInizioPeriodo && $giorniOccupati){
        $giorniPeriodo = $DataInizioPeriodo->diff($DataFinePeriodo)->days;
        $tot = $giorniPeriodo - $giorniOccupati;
    }
    
    $result = array("tot" => $tot, "giorniPeriodo" => $giorniPeriodo, "giorniOccupati" => $giorniOccupati);
    return $result;
    //return $tot;
}

$smarty->display('statistiche.tpl');