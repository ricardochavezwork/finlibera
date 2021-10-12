<?php

include 'common.php';

$records_filtro2 = NULL;
$recordsRMRR2 = NULL;
$mesi = array("Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre");
$inizio = $_GET["inizio"];
$fine = $_GET["fine"];
$meseRichiesto = $_GET["meseRichiesto"];

if(isset($_REQUEST["action"])){
    switch ($_REQUEST["action"]){
        
        case "loadFiltroTop":
            $record = NULL;
            $record[0]["TOP"]= "1";
            $record[1]["TOP"]= "2";
            $record[2]["TOP"]= "3";
            $record[3]["TOP"]= "4";
            $record[4]["TOP"]= "5";
            $zona = stats_zona($num = false, $inizio, $fine);
            for($i = 0; $i < count($zona); $i++){
                $record[$i]["Zona"]= $zona[$i];
            }
            $numRZona = stats_zona($num=true, $inizio, $fine);
            for($i = 0; $i < count($numRZona); $i++){
                $record[$i]["NumRichiesteZona"]= $numRZona[$i];
            }
            $prezzo = stats_prezzo($num = false, $inizio, $fine);
            for($i = 0; $i < count($prezzo); $i++){
                $record[$i]["Prezzo"]= $prezzo[$i];
            }
            $numRPrezzo = stats_prezzo($num=true, $inizio, $fine);
            for($i = 0; $i < count($numRPrezzo); $i++){
                $record[$i]["NumRichiestePrezzo"]= $numRPrezzo[$i];
            }
            $disponibilita = stats_disponibilita($num = false, $inizio, $fine);
            for($i = 0; $i < count($disponibilita); $i++){
                if($disponibilita[$i]!="Non definito"){
                    $record[$i]["Disponibilita"]= $mesi[$disponibilita[$i]-1];
                }else{
                    $record[$i]["Disponibilita"]= $disponibilita[$i];
                }
            }
            $numRDisponibilita = stats_disponibilita($num=true, $inizio, $fine);
            for($i = 0; $i < count($numRDisponibilita); $i++){
                $record[$i]["NumRichiesteDisponibilita"]= $numRDisponibilita[$i];
            }
            $metro = stats_metro($num = false, $inizio, $fine);
            for($i = 0; $i < count($metro); $i++){
                $record[$i]["Metro"]= $metro[$i];
            }
            $numRMetro = stats_metro($num=true, $inizio, $fine);
            for($i = 0; $i < count($numRMetro); $i++){
                $record[$i]["NumRichiesteMetro"]= $numRMetro[$i];
            }
            Utils::PrintJson(Utils::JsonEncodeFlexigridMessage($record));
            break;
        case "loadFiltro":
            for($i = 0; $i < count($mesi); $i++){
                $records_filtro2[$i]["Mese"]= '<a data-mese="'.($i+1).'" data-inizio="'.$inizio.'" data-fine="'.$fine.'" class="button" >'.$mesi[$i].'</a>';
            }
            $zona = stats_zona_filtro($num=false, $inizio, $fine);
            for($i = 0; $i < 12; $i++){
                $records_filtro2[$i]["Zona"]= $zona[$i];
            }
            $numRZona = stats_zona_filtro($num = true, $inizio, $fine);
            for($i = 0; $i < 12; $i++){
                $records_filtro2[$i]["NumRichiesteZona"]= $numRZona[$i];
            }
            $prezzo = stats_prezzo_filtro($num=false, $inizio, $fine);
            for($i = 0; $i < 12; $i++){
                $records_filtro2[$i]["Prezzo"]= $prezzo[$i];
            }
            $numRPrezzo = stats_prezzo_filtro($num = true, $inizio, $fine);
            for($i = 0; $i < 12; $i++){
                $records_filtro2[$i]["NumRichiestePrezzo"]= $numRPrezzo[$i];
            }
            $disponibilita = stats_disponibilita_filtro($num=false, $inizio, $fine);
            for($i = 0; $i < 12; $i++){
                if($disponibilita[$i]!="Non definito"){
                    $records_filtro2[$i]["Disponibilita"]= $mesi[$disponibilita[$i]-1];
                }else{
                    $records_filtro2[$i]["Disponibilita"]= $disponibilita[$i];
                }
            }
            $numRDisponibilita = stats_disponibilita_filtro($num=true, $inizio, $fine);
            for($i = 0; $i < 12; $i++){
                $records_filtro2[$i]["NumRichiesteDisponibilita"]= $numRDisponibilita[$i];
            }
            $metro = stats_metro_filtro($num=false, $inizio, $fine);
            for($i = 0; $i < 12; $i++){
                $records_filtro2[$i]["Metro"]= $metro[$i];
            }
            $numRMetro = stats_metro_filtro($num = true, $inizio, $fine);
            for($i = 0; $i < 12; $i++){
                $records_filtro2[$i]["NumRichiesteMetro"]= $numRMetro[$i];
            }
            Utils::PrintJson(Utils::JsonEncodeFlexigridMessage($records_filtro2));
            break;
        case "loadFiltroStatsTopRooms":
            $recordsRMRR2 = NULL;
            $recordsRMRR2[0]["TOP"]= "1";
            $recordsRMRR2[1]["TOP"]= "2";
            $recordsRMRR2[2]["TOP"]= "3";
            $recordsRMRR2[3]["TOP"]= "4";
            $recordsRMRR2[4]["TOP"]= "5";
            $idStatsRooms = idTopRooms($inizio, $fine);
            $NumR = idTopRooms($inizio, $fine, $num=true);
            for($i = 0; $i < count($idStatsRooms); $i++){
                if($idStatsRooms[$i] != "Non definito"){
                    $recordsRMRR2[$i]["IdStanza"]= $idStatsRooms[$i];
                    $recordsRMRR2[$i]["NumRichieste"]= $NumR[$i];
                    $recordsRMRR2[$i]["Indirizzo"]= getIndirizzo($idStatsRooms[$i]);
                    $recordsRMRR2[$i]["Zona"]= getZona($idStatsRooms[$i]);
                    $recordsRMRR2[$i]["PrezzoSuggerito"]= getPrezzoSuggerito($idStatsRooms[$i]);
                    $recordsRMRR2[$i]["Metro"]= getMetro($idStatsRooms[$i]);
                }else{
                    $recordsRMRR2[$i]["IdStanza"]= $idStatsRooms[$i];
                    $recordsRMRR2[$i]["NumRichieste"]= $NumR[$i];
                    $recordsRMRR2[$i]["Indirizzo"]= $idStatsRooms[$i];
                    $recordsRMRR2[$i]["Zona"]= $idStatsRooms[$i];
                    $recordsRMRR2[$i]["PrezzoSuggerito"]= $idStatsRooms[$i];
                    $recordsRMRR2[$i]["Metro"]= $idStatsRooms[$i];
                }
            }
            Utils::PrintJson(Utils::JsonEncodeFlexigridMessage($recordsRMRR2));
            break;
        case "loadFiltroStatsRooms":
            for($i = 0; $i < count($mesi); $i++){
                $recordsRMRR2[$i]["Mese"]= '<a data-mese="'.($i+1).'" data-inizio="'.$inizio.'" data-fine="'.$fine.'" class="button" >'.$mesi[$i].'</a>';
            }
            $idStatsRooms = stats_rooms($inizio, $fine);
            $NumR = stats_rooms($inizio, $fine, $num=true);
            for($i = 0; $i < count($idStatsRooms); $i++){
                if($idStatsRooms[$i] != "Non definito"){
                    /*$recordsRMRR2[$i]["IdStanza"]= $idStatsRooms[$i];*/
                    $recordsRMRR2[$i]["NumRichieste"]= $NumR[$i];
                    $recordsRMRR2[$i]["Indirizzo"]= getIndirizzo($idStatsRooms[$i]);
                    $recordsRMRR2[$i]["Zona"]= getZona($idStatsRooms[$i]);
                    $recordsRMRR2[$i]["PrezzoSuggerito"]= getPrezzoSuggerito($idStatsRooms[$i]);
                    $recordsRMRR2[$i]["Metro"]= getMetro($idStatsRooms[$i]);
                }else{
                    /*$recordsRMRR2[$i]["IdStanza"]= $idStatsRooms[$i];*/
                    $recordsRMRR2[$i]["NumRichieste"]= $NumR[$i];
                    $recordsRMRR2[$i]["Indirizzo"]= $idStatsRooms[$i];
                    $recordsRMRR2[$i]["Zona"]= $idStatsRooms[$i];
                    $recordsRMRR2[$i]["PrezzoSuggerito"]= $idStatsRooms[$i];
                    $recordsRMRR2[$i]["Metro"]= $idStatsRooms[$i];
                }
            }
            Utils::PrintJson(Utils::JsonEncodeFlexigridMessage($recordsRMRR2));
            break;
        case "loadFiltroPlus":
            $records_filtro2 = NULL;
            $records_filtro2[0]["TOP"]= "1";
            $records_filtro2[1]["TOP"]= "2";
            $records_filtro2[2]["TOP"]= "3";
            $records_filtro2[3]["TOP"]= "4";
            $records_filtro2[4]["TOP"]= "5";
            $zona = stats_zona_filtro($num = false, $inizio, $fine, $plus = true, $meseRichiesto);
            for($i = 0; $i < count($zona); $i++){
                $records_filtro2[$i]["Zona"]= $zona[$i];
            }
            $numRZona = stats_zona_filtro($num = true, $inizio, $fine, $plus = true, $meseRichiesto);
            for($i = 0; $i < count($numRZona); $i++){
                $records_filtro2[$i]["NumRichiesteZona"]= $numRZona[$i];
            }
            $prezzo = stats_prezzo_filtro($num = false, $inizio, $fine, $plus = true, $meseRichiesto);
            for($i = 0; $i < count($prezzo); $i++){
                $records_filtro2[$i]["Prezzo"]= $prezzo[$i];
            }
            $numRPrezzo = stats_prezzo_filtro($num = true, $inizio, $fine, $plus = true, $meseRichiesto);
            for($i = 0; $i < count($numRPrezzo); $i++){
                $records_filtro2[$i]["NumRichiestePrezzo"]= $numRPrezzo[$i];
            }
            $disponibilita = stats_disponibilita_filtro($num = false, $inizio, $fine, $plus = true, $meseRichiesto);
            for($i = 0; $i < count($disponibilita); $i++){
                if($disponibilita[$i]!="Vuoto"){
                    $records_filtro2[$i]["Disponibilita"]= $mesi[$disponibilita[$i]-1];
                }else{
                    $records_filtro2[$i]["Disponibilita"]= $disponibilita[$i];
                }
            }
            $numRDisponibilita = stats_disponibilita_filtro($num = true, $inizio, $fine, $plus = true, $meseRichiesto);
            for($i = 0; $i < count($numRDisponibilita); $i++){
                $records_filtro2[$i]["NumRichiesteDisponibilita"]= $numRDisponibilita[$i];
            }
            $metro = stats_metro_filtro($num = false, $inizio, $fine, $plus = true, $meseRichiesto);
            for($i = 0; $i < count($metro); $i++){
                $records_filtro2[$i]["Metro"]= $metro[$i];
            }
            $numRMetro = stats_metro_filtro($num = true, $inizio, $fine, $plus = true, $meseRichiesto);
            for($i = 0; $i < count($numRMetro); $i++){
                $records_filtro2[$i]["NumRichiesteMetro"]= $numRMetro[$i];
            }
            Utils::PrintJson(Utils::JsonEncodeFlexigridMessage($records_filtro2));
            break;
        case "loadFiltroStatsRoomsPlus":
            $recordsRMRR2 = NULL;
            $recordsRMRR2[0]["TOP"]= "1";
            $recordsRMRR2[1]["TOP"]= "2";
            $recordsRMRR2[2]["TOP"]= "3";
            $recordsRMRR2[3]["TOP"]= "4";
            $recordsRMRR2[4]["TOP"]= "5";
            $idStatsRooms = stats_rooms($inizio, $fine, $num=false, $plus=true, $meseRichiesto);
            $NumR = stats_rooms($inizio, $fine, $num=true, $plus=true, $meseRichiesto);
            for($i = 0; $i < count($idStatsRooms); $i++){
                if($idStatsRooms[$i] != "Vuoto"){
                    /*$recordsRMRR2[$i]["IdStanza"]= $idStatsRooms[$i];*/
                    $recordsRMRR2[$i]["NumRichieste"]= $NumR[$i];
                    $recordsRMRR2[$i]["Indirizzo"]= getIndirizzo($idStatsRooms[$i]);
                    $recordsRMRR2[$i]["Zona"]= getZona($idStatsRooms[$i]);
                    $recordsRMRR2[$i]["PrezzoSuggerito"]= getPrezzoSuggerito($idStatsRooms[$i]);
                    $recordsRMRR2[$i]["Metro"]= getMetro($idStatsRooms[$i]);
                }else{
                    /*$recordsRMRR2[$i]["IdStanza"]= $idStatsRooms[$i];*/
                    $recordsRMRR2[$i]["NumRichieste"]= $NumR[$i];
                    $recordsRMRR2[$i]["Indirizzo"]= $idStatsRooms[$i];
                    $recordsRMRR2[$i]["Zona"]= $idStatsRooms[$i];
                    $recordsRMRR2[$i]["PrezzoSuggerito"]= $idStatsRooms[$i];
                    $recordsRMRR2[$i]["Metro"]= $idStatsRooms[$i];
                }
            }
            Utils::PrintJson(Utils::JsonEncodeFlexigridMessage($recordsRMRR2));
            break;
    }
}

function stats_zona_filtro($num = false, $inizio, $fine, $plus = false, $mese){
    $array = null;
    global $Database;
    if(!$plus){
        $query = "SELECT A.Month, A.Zona, A.Num FROM
(SELECT MONTH(DataRegistrazione) as 'Month', Zona, count(*) as 'Num'
FROM Richiedenti 
where IdStanza = 0
	AND DATE(DataRegistrazione) BETWEEN STR_TO_DATE('$inizio', '%d/%m/%Y') AND STR_TO_DATE('$fine', '%d/%m/%Y')
group by MONTH(DataRegistrazione), Zona order by MONTH(DataRegistrazione), Num DESC) as A group by A.Month;";
        if(!$num){
            if ($res = $Database->Query($query)) {
                for($i = 0; $i < 12; $i++){
                    $array[$i]="Non definito";
                }
                while ($row = $Database->Fetch($res)){
                    for($i = 0; $i < 12; $i++){
                        if($row["Month"]==($i+1)){
                            $array[$i] = $row["Zona"];
                        }
                    }
                }
                return $array;
            }
        }else{
            if ($res = $Database->Query($query)) {
                for($i = 0; $i < 12; $i++){
                    $array[$i]="Non definito";
                }
                while ($row = $Database->Fetch($res)){
                    for($i = 0; $i < 12; $i++){
                        if($row["Month"]==($i+1)){
                            $array[$i] = $row["Num"];
                        }
                    }
                }
                return $array;
            }
        }
    }else{
        $query = "SELECT MONTH(DataRegistrazione) as 'Month', Zona, count(*) as 'Num'
FROM Richiedenti 
where IdStanza = 0
	and MONTH(DataRegistrazione) = $mese
	AND DATE(DataRegistrazione) BETWEEN STR_TO_DATE('$inizio', '%d/%m/%Y') AND STR_TO_DATE('$fine', '%d/%m/%Y')
group by MONTH(DataRegistrazione), Zona order by MONTH(DataRegistrazione), Num DESC LIMIT 5;";
        if(!$num){
            if ($res = $Database->Query($query)) {
                for($i = 0; $i < 5; $i++){
                    $array[$i] = "Vuoto";
                }
                $x = 0;
                while ($row = $Database->Fetch($res)){
                    if($row["Zona"] == ""){
                        $array[$x] = "Non specificato";
                    }else{
                        $array[$x] = $row["Zona"];
                    }
                    $x++;
                }
                return $array;
            }
        }else{
            if ($res = $Database->Query($query)) {
                for($i = 0; $i < 5; $i++){
                    $array[$i] = "Vuoto";
                }
                $x = 0;
                while ($row = $Database->Fetch($res)){
                    $array[$x] = $row["Num"];
                    $x++;
                }
                return $array;
            }
        }
    }
    return $array;
}

function stats_prezzo_filtro($num = false, $inizio, $fine, $plus = false, $mese){
    $array = null;
    global $Database;
    if(!$plus){
        $query = "SELECT A.Month, A.Prezzo, A.Num FROM
(SELECT MONTH(DataRegistrazione) as 'Month', Prezzo, count(*) as 'Num'
FROM Richiedenti 
where IdStanza = 0
	AND DATE(DataRegistrazione) BETWEEN STR_TO_DATE('$inizio', '%d/%m/%Y') AND STR_TO_DATE('$fine', '%d/%m/%Y')
group by MONTH(DataRegistrazione), Prezzo order by MONTH(DataRegistrazione), Num DESC) as A group by A.Month;";
        if(!$num){
            if ($res = $Database->Query($query)) {
                for($i = 0; $i < 12; $i++){
                    $array[$i]="Non definito";
                }
                while ($row = $Database->Fetch($res)){
                    for($i = 0; $i < 12; $i++){
                        if($row["Month"]==($i+1)){
                            $array[$i] = $row["Prezzo"];
                        }
                    }
                }
                return $array;
            }
        }else{
            if ($res = $Database->Query($query)) {
                for($i = 0; $i < 12; $i++){
                    $array[$i]="Non definito";
                }
                while ($row = $Database->Fetch($res)){
                    for($i = 0; $i < 12; $i++){
                        if($row["Month"]==($i+1)){
                            $array[$i] = $row["Num"];
                        }
                    }
                }
                return $array;
            }
        }
    }else{
        $query = "SELECT MONTH(DataRegistrazione) as 'Month', Prezzo, count(*) as 'Num' FROM Richiedenti where IdStanza = 0 and Prezzo >= 0 AND MONTH(DataRegistrazione) = $mese AND DATE(DataRegistrazione) BETWEEN STR_TO_DATE('$inizio', '%d/%m/%Y') AND STR_TO_DATE('$fine', '%d/%m/%Y') group by MONTH(DataRegistrazione), Prezzo order by MONTH(DataRegistrazione), Num DESC;";
        if(!$num){
            if ($res = $Database->Query($query)) {
                for($i = 0; $i < 5; $i++){
                    $array[$i] = "Vuoto";
                }
                $x = 0;
                while ($row = $Database->Fetch($res)){
                    $array[$x] = $row["Prezzo"];
                    $x++;
                }
                return $array;
            }
        }else{
            if ($res = $Database->Query($query)) {
                for($i = 0; $i < 5; $i++){
                    $array[$i] = "Vuoto";
                }
                $x = 0;
                while ($row = $Database->Fetch($res)){
                    $array[$x] = $row["Num"];
                    $x++;
                }
                return $array;
            }
        }
    }
    return $array;
}

function stats_disponibilita_filtro($num = false, $inizio, $fine, $plus = false, $mese){
    $array = null;
    global $Database;
    if(!$plus){
        $query = "SELECT A.Month, A.Disponibilita, A.Num FROM
(SELECT MONTH(DataRegistrazione) as 'Month', MONTH(Disponibilita) as 'Disponibilita', count(*) as 'Num'
FROM Richiedenti 
where IdStanza = 0
	AND DATE(DataRegistrazione) BETWEEN STR_TO_DATE('$inizio', '%d/%m/%Y') AND STR_TO_DATE('$fine', '%d/%m/%Y')
group by MONTH(DataRegistrazione), MONTH(Disponibilita) order by MONTH(DataRegistrazione), Num DESC) as A group by A.Month;";
        if(!$num){
            if ($res = $Database->Query($query)) {
                for($i = 0; $i < 12; $i++){
                    $array[$i]="Non definito";
                }
                while ($row = $Database->Fetch($res)){
                    for($i = 0; $i < 12; $i++){
                        if($row["Month"]==($i+1)){
                            $array[$i] = $row["Disponibilita"];
                        }
                    }
                }
                return $array;
            }
        }else{
            if ($res = $Database->Query($query)) {
                for($i = 0; $i < 12; $i++){
                    $array[$i]="Non definito";
                }
                while ($row = $Database->Fetch($res)){
                    for($i = 0; $i < 12; $i++){
                        if($row["Month"]==($i+1)){
                            $array[$i] = $row["Num"];
                        }
                    }
                }
                return $array;
            }
        }
    }else{
        $query = "SELECT MONTH(DataRegistrazione) as 'Month', MONTH(Disponibilita) as 'Disponibilita', count(*) as 'Num'
FROM Richiedenti 
where IdStanza = 0
	AND MONTH(DataRegistrazione) = $mese
    AND MONTH(Disponibilita) is not null
	AND DATE(DataRegistrazione) BETWEEN STR_TO_DATE('$inizio', '%d/%m/%Y') AND STR_TO_DATE('$fine', '%d/%m/%Y')
group by MONTH(DataRegistrazione), MONTH(Disponibilita) order by MONTH(DataRegistrazione), Num DESC LIMIT 5;";
        if(!$num){
            if ($res = $Database->Query($query)) {
                for($i = 0; $i < 5; $i++){
                    $array[$i] = "Vuoto";
                }
                $x = 0;
                while ($row = $Database->Fetch($res)){
                    $array[$x] = $row["Disponibilita"];
                    $x++;
                }
                return $array;
            }
        }else{
            if ($res = $Database->Query($query)) {
                for($i = 0; $i < 5; $i++){
                    $array[$i] = "Vuoto";
                }
                $x = 0;
                while ($row = $Database->Fetch($res)){
                    $array[$x] = $row["Num"];
                    $x++;
                }
                return $array;
            }
        }
    }
    return $array;
}

function stats_metro_filtro($num = false, $inizio, $fine, $plus = false, $mese){
    $array = null;
    global $Database;
    if(!$plus){
        $query = "SELECT A.Month, A.Metro, A.Num FROM
(SELECT MONTH(DataRegistrazione) as 'Month', Metro, count(*) as 'Num'
FROM Richiedenti 
where IdStanza = 0
	and Metro != ''
    AND DATE(DataRegistrazione) BETWEEN STR_TO_DATE('$inizio', '%d/%m/%Y') AND STR_TO_DATE('$fine', '%d/%m/%Y')
group by MONTH(DataRegistrazione), Metro order by MONTH(DataRegistrazione), Num DESC) as A group by A.Month;";
        if(!$num){
            if ($res = $Database->Query($query)) {
                for($i = 0; $i < 12; $i++){
                    $array[$i]="Non definito";
                }
                while ($row = $Database->Fetch($res)){
                    for($i = 0; $i < 12; $i++){
                        if($row["Month"]==($i+1)){
                            $array[$i] = $row["Metro"];
                        }
                    }
                }
                return $array;
            }
        }else{
            if ($res = $Database->Query($query)) {
                for($i = 0; $i < 12; $i++){
                    $array[$i]="Non definito";
                }
                while ($row = $Database->Fetch($res)){
                    for($i = 0; $i < 12; $i++){
                        if($row["Month"]==($i+1)){
                            $array[$i] = $row["Num"];
                        }
                    }
                }
                return $array;
            }
        }
    }else{
        $query = "SELECT MONTH(DataRegistrazione) as 'Month', Metro, count(*) as 'Num'
FROM Richiedenti 
where IdStanza = 0
    and (Metro = 'M1' or Metro = 'M2' or Metro = 'M3' or Metro = 'M4' or Metro = 'M5') 
    AND MONTH(DataRegistrazione) = $mese
    AND DATE(DataRegistrazione) BETWEEN STR_TO_DATE('$inizio', '%d/%m/%Y') AND STR_TO_DATE('$fine', '%d/%m/%Y')
group by MONTH(DataRegistrazione), Metro order by MONTH(DataRegistrazione), Num DESC;";
        if(!$num){
            if ($res = $Database->Query($query)) {
                $x = 0;
                for($i = 0; $i < 5; $i++){
                    $array[$i] = "Vuoto";
                }
                while ($row = $Database->Fetch($res)){
                    if($row["Metro"] == ""){
                        $array[$x] = "Non specificato";
                    }else{
                        $array[$x] = $row["Metro"];
                    }
                    $x++;
                }
                return $array;
            }
        }else{
            if ($res = $Database->Query($query)) {
                $x = 0;
                for($i = 0; $i < 5; $i++){
                    $array[$i] = "Vuoto";
                }
                while ($row = $Database->Fetch($res)){
                    $array[$x] = $row["Num"];
                    $x++;
                }
                return $array;
            }
        }
    }
    return $array;
}

function getIndirizzo($Id){
    $value = null;
    global $Database;
    $query = sprintf("SELECT getNomeStanza($Id) as 'value';");
    if ($res = $Database->Query($query)) {
        if ($row = $Database->Fetch($res)){
            $value = $row["value"];
        }
    }
    return $value;
}

function getZona($Id){
    $value = null;
    global $Database;
    $query = sprintf("SELECT a.Zona as 'value' FROM Appartamenti a, Appartamenti_Stanze a_s WHERE a.Id = a_s.IdAppartamento AND a_s.Id = $Id;");
    if ($res = $Database->Query($query)) {
        if ($row = $Database->Fetch($res)){
            $value = $row["value"];
        }
    }
    return $value;
}

function getPrezzoSuggerito($Id){
    $value = null;
    global $Database;
    $query = sprintf("SELECT a_s.PrezzoSuggerito as 'value' FROM Appartamenti_Stanze a_s WHERE a_s.Id = $Id;");
    if ($res = $Database->Query($query)) {
        if ($row = $Database->Fetch($res)){
            $value = $row["value"];
        }
    }
    return $value;
}

function getMetro($Id){
    $value = null;
    global $Database;
    $query = sprintf("SELECT a_m.Metro as 'value' FROM Appartamenti a, Appartamenti_Mezzi a_m, Appartamenti_Stanze a_s WHERE a.Id = a_m.IdAppartamento AND a_m.Metro != '' AND a.Id = a_s.IdAppartamento AND a_s.Id = $Id LIMIT 1;");
    if ($res = $Database->Query($query)) {
        if ($row = $Database->Fetch($res)){
            $value = $row["value"];
        }
    }
    return $value;
}

function stats_rooms($inizio, $fine, $num=false, $plus=false, $mese) {
    $array = null;
    global $Database;
    if(!$plus){
        $query = "SELECT A.Month, A.IdStanza, A.Num 
FROM (SELECT MONTH(DataRegistrazione) as 'Month', IdStanza, count(*) as 'Num' FROM Richiedenti 
WHERE IdStanza != 0 
	AND DATE(DataRegistrazione) BETWEEN STR_TO_DATE('$inizio', '%d/%m/%Y') AND STR_TO_DATE('$fine', '%d/%m/%Y')
group by MONTH(DataRegistrazione), IdStanza order by MONTH(DataRegistrazione), Num DESC) 
as A group by A.Month;";
        if(!$num){
            if ($res = $Database->Query($query)) {
                for($i = 0; $i < 12; $i++){
                    $array[$i]="Non definito";
                }
                while ($row = $Database->Fetch($res)){
                    for($i = 0; $i < 12; $i++){
                        if($row["Month"]==($i+1)){
                            $array[$i] = $row["IdStanza"];
                        }
                    }
                }
                return $array;
            }
        }else{
            if ($res = $Database->Query($query)) {
                for($i = 0; $i < 12; $i++){
                    $array[$i]="Non definito";
                }
                while ($row = $Database->Fetch($res)){
                    for($i = 0; $i < 12; $i++){
                        if($row["Month"]==($i+1)){
                            $array[$i] = $row["Num"];
                        }
                    }
                }
                return $array;
            }
        }
    }else{
        $query = "SELECT MONTH(DataRegistrazione) as 'Month', IdStanza, count(*) as 'Num' FROM Richiedenti WHERE IdStanza != 0 AND MONTH(DataRegistrazione) = $mese AND DATE(DataRegistrazione) BETWEEN STR_TO_DATE('$inizio', '%d/%m/%Y') AND STR_TO_DATE('$fine', '%d/%m/%Y') group by MONTH(DataRegistrazione), IdStanza order by MONTH(DataRegistrazione), Num DESC LIMIT 5;";
        if(!$num){
            if ($res = $Database->Query($query)) {
                $x = 0;
                for($i = 0; $i < 5; $i++){
                    $array[$i] = "Vuoto";
                }
                while ($row = $Database->Fetch($res)){
                    $array[$x] = $row["IdStanza"];
                    $x++;
                }
                return $array;
            }
        }else{
            if ($res = $Database->Query($query)) {
                $x = 0;
                for($i = 0; $i < 5; $i++){
                    $array[$i] = "Vuoto";
                }
                while ($row = $Database->Fetch($res)){
                    $array[$x] = $row["Num"];
                    $x++;
                }
                return $array;
            }
        }
    }
    
    return $array;
}

//FUNZIONI DI "LoadFiltroTop"

function stats_zona($num = false, $inizio, $fine){
    $array = NULL;
    global $Database;
    $query = "SELECT Zona, count(*) as 'Num' FROM Richiedenti where IdStanza = 0 AND DATE(DataRegistrazione) BETWEEN STR_TO_DATE('$inizio', '%d/%m/%Y') AND STR_TO_DATE('$fine', '%d/%m/%Y') group by Zona order by Num DESC LIMIT 5;";
    if(!$num){
        if ($res = $Database->Query($query)) {
            $x = 0;
            while ($row = $Database->Fetch($res)){
                if($row["Zona"] == ""){
                    $array[$x] = "Non specificato";
                }else{
                    $array[$x] = $row["Zona"];
                }
                $x++;
            }
            return $array;
        }
    }else{
        if ($res = $Database->Query($query)) {
            $x = 0;
            while ($row = $Database->Fetch($res)){
                $array[$x] = $row["Num"];
                $x++;
            }
            return $array;
        }
    }
        
    return $array;
}

function stats_prezzo($num = false, $inizio, $fine){
    $array = NULL;
    global $Database;
    $query = "SELECT Prezzo, count(*) as 'Num' FROM Richiedenti where IdStanza = 0 AND DATE(DataRegistrazione) BETWEEN STR_TO_DATE('$inizio', '%d/%m/%Y') AND STR_TO_DATE('$fine', '%d/%m/%Y') group by Prezzo order by Num DESC LIMIT 5;";
    if(!$num){
        if ($res = $Database->Query($query)) {
            $x = 0;
            for($i = 0; $i < 5; $i++){
                $array[$i]="Non definito";
            }
            while ($row = $Database->Fetch($res)){
                $array[$x] = $row["Prezzo"];
                $x++;
            }
            return $array;
        }
    }else{
        if ($res = $Database->Query($query)) {
            $x = 0;
            for($i = 0; $i < 5; $i++){
                $array[$i]="Non definito";
            }
            while ($row = $Database->Fetch($res)){
                $array[$x] = $row["Num"];
                $x++;
            }
            return $array;
        }
    }
    return $array;
}

function stats_disponibilita($num = false, $inizio, $fine){
    $array = NULL;
    global $Database;
    $query = "SELECT MONTH(Disponibilita) as 'Disponibilita', count(*) as 'Num' FROM Richiedenti where IdStanza = 0 AND DATE(DataRegistrazione) BETWEEN STR_TO_DATE('$inizio', '%d/%m/%Y') AND STR_TO_DATE('$fine', '%d/%m/%Y') group by MONTH(Disponibilita) order by Num DESC LIMIT 5;";
    if(!$num){
        if ($res = $Database->Query($query)) {
            $x = 0;
            for($i = 0; $i < 5; $i++){
                $array[$i]="Non definito";
            }
            while ($row = $Database->Fetch($res)){
                $array[$x] = $row["Disponibilita"];
                $x++;
            }
            return $array;
        }
    }else{
        if ($res = $Database->Query($query)) {
            $x = 0;
            for($i = 0; $i < 5; $i++){
                $array[$i]="Non definito";
            }
            while ($row = $Database->Fetch($res)){
                $array[$x] = $row["Num"];
                $x++;
            }
            return $array;
        }
    }
    return $array;
}

function stats_metro($num = false, $inizio, $fine){
    global $Database;
    $query = "SELECT Metro, count(*) as 'Num' FROM Richiedenti where IdStanza = 0 AND Metro != '' AND DATE(DataRegistrazione) BETWEEN STR_TO_DATE('$inizio', '%d/%m/%Y') AND STR_TO_DATE('$fine', '%d/%m/%Y') group by Metro order by Num DESC LIMIT 5;";
    if(!$num){
        if ($res = $Database->Query($query)) {
            $x = 0;
            for($i = 0; $i < 5; $i++){
                $array[$i] = "Vuoto";
            }
            while ($row = $Database->Fetch($res)){
                if($row["Metro"] == ""){
                    $array[$x] = "Non specificato";
                }else{
                    $array[$x] = $row["Metro"];
                }
                $x++;
            }
            return $array;
        }
    }else{
        if ($res = $Database->Query($query)) {
            $x = 0;
            for($i = 0; $i < 5; $i++){
                $array[$i]="Non definito";
            }
            while ($row = $Database->Fetch($res)){
                $array[$x] = $row["Num"];
                $x++;
            }
            return $array;
        }
    }
    return $array;
}

// FUNZIONI PER "loadFiltroStatsTopRooms"

function idTopRooms($inizio, $fine, $num = false){
    $array = NULL;
    /* CONTROLLARE RISULTATI */
    global $Database;
    $query = "SELECT IdStanza, count(*) as 'Num' FROM Richiedenti where IdStanza != 0 AND DATE(DataRegistrazione) BETWEEN STR_TO_DATE('$inizio', '%d/%m/%Y') AND STR_TO_DATE('$fine', '%d/%m/%Y') group by IdStanza order by Num DESC LIMIT 5;";
    if(!$num){
        if ($res = $Database->Query($query)) {
            $x = 0;
            while ($row = $Database->Fetch($res)){
                $array[$x] = $row["IdStanza"];
                $x++;
            }
            return $array;
        }
    }else{
        if ($res = $Database->Query($query)) {
            $x = 0;
            while ($row = $Database->Fetch($res)){
                $array[$x] = $row["Num"];
                $x++;
            }
            return $array;
        }
    }
    return $array;
}