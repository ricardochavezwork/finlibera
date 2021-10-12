<?php

include 'common.php';

$record = NULL;
$records_filtro1 = NULL;
$recordsRR = NULL;
$recordsRMRR = NULL;
$mesi = array("Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre");
$meseRichiesto = $_GET["meseRichiesto"];
//$error = "";

if(isset($_REQUEST["action"])){
    switch ($_REQUEST["action"]){
        
        case "loadrankingOfRequest":
            $record = NULL;
            $record[0]["TOP"]= "1";
            $record[1]["TOP"]= "2";
            $record[2]["TOP"]= "3";
            $record[3]["TOP"]= "4";
            $record[4]["TOP"]= "5";
            $idStatsRichieste = piuRichiesti($num=false);
            $NumR = piuRichiesti($num=true);
            for($i = 0; $i < count($idStatsRichieste); $i++){
                /*$record[$i]["Id"]= $idStatsRichieste[$i];*/
                $record[$i]["NumRichieste"]= $NumR[$i];
                $record[$i]["Zona"]= getZonaR($idStatsRichieste[$i]);
                $record[$i]["Prezzo"]= getPrezzoR($idStatsRichieste[$i]);
                $record[$i]["Disponibilita"]= getDisponibilitaR($idStatsRichieste[$i]);
                $record[$i]["Metro"]= getMetroR($idStatsRichieste[$i]);
            }
            Utils::PrintJson(Utils::JsonEncodeFlexigridMessage($record));
            break;
        case "load":
            $record[0]["TOP"]= "1";
            $record[1]["TOP"]= "2";
            $record[2]["TOP"]= "3";
            $record[3]["TOP"]= "4";
            $record[4]["TOP"]= "5";
            $zona = stats_zona();
            for($i = 0; $i < count($zona); $i++){
                $record[$i]["Zona"]= $zona[$i];
            }
            $numRZona = stats_zona($num=true);
            for($i = 0; $i < count($numRZona); $i++){
                $record[$i]["NumRichiesteZona"]= $numRZona[$i];
            }
            $prezzo = stats_prezzo();
            for($i = 0; $i < count($prezzo); $i++){
                $record[$i]["Prezzo"]= $prezzo[$i];
            }
            $numRPrezzo = stats_prezzo($num=true);
            for($i = 0; $i < count($numRPrezzo); $i++){
                $record[$i]["NumRichiestePrezzo"]= $numRPrezzo[$i];
            }
            $disponibilita = stats_disponibilita();
            for($i = 0; $i < count($disponibilita); $i++){
                $record[$i]["Disponibilita"]= $mesi[$disponibilita[$i]-1];
            }
            $numRDisponibilita = stats_disponibilita($num=true);
            for($i = 0; $i < count($numRDisponibilita); $i++){
                $record[$i]["NumRichiesteDisponibilita"]= $numRDisponibilita[$i];
            }
            $metro = stats_metro();
            for($i = 0; $i < count($metro); $i++){
                $record[$i]["Metro"]= $metro[$i];
            }
            $numRMetro = stats_metro($num=true);
            for($i = 0; $i < count($numRMetro); $i++){
                $record[$i]["NumRichiesteMetro"]= $numRMetro[$i];
            }
            Utils::PrintJson(Utils::JsonEncodeFlexigridMessage($record));
            break;
        case "loadFiltro":
            for($i = 0; $i < count($mesi); $i++){
                $records_filtro1[$i]["Mese"]= '<a data-mese="'.($i+1).'" class="button" >'.$mesi[$i].'</a>';
            }
            $zona = stats_zona_filtro();
            for($i = 0; $i < count($zona); $i++){
                $records_filtro1[$i]["Zona"]= $zona[$i];
            }
            $numRZona = stats_zona_filtro($num=true);
            for($i = 0; $i < count($numRZona); $i++){
                $records_filtro1[$i]["NumRichiesteZona"]= $numRZona[$i];
            }
            $prezzo = stats_prezzo_filtro();
            for($i = 0; $i < count($prezzo); $i++){
                $records_filtro1[$i]["Prezzo"]= $prezzo[$i];
            }
            $numRPrezzo = stats_prezzo_filtro($num=true);
            for($i = 0; $i < count($numRPrezzo); $i++){
                $records_filtro1[$i]["NumRichiestePrezzo"]= $numRPrezzo[$i];
            }
            $disponibilita = stats_disponibilita_filtro();
            for($i = 0; $i < count($disponibilita); $i++){
                $records_filtro1[$i]["Disponibilita"]= $mesi[$disponibilita[$i]-1];
            }
            $numRDisponibilita = stats_disponibilita_filtro($num=true);
            for($i = 0; $i < count($numRDisponibilita); $i++){
                $records_filtro1[$i]["NumRichiesteDisponibilita"]= $numRDisponibilita[$i];
            }
            $metro = stats_metro_filtro();
            for($i = 0; $i < count($metro); $i++){
                $records_filtro1[$i]["Metro"]= $metro[$i];
            }
            $numRMetro = stats_metro_filtro($num=true);
            for($i = 0; $i < count($numRMetro); $i++){
                $records_filtro1[$i]["NumRichiesteMetro"]= $numRMetro[$i];
            }
            Utils::PrintJson(Utils::JsonEncodeFlexigridMessage($records_filtro1));
            break;
        case "loadRankingRooms":
            $recordsRR[0]["TOP"]= "1";
            $recordsRR[1]["TOP"]= "2";
            $recordsRR[2]["TOP"]= "3";
            $recordsRR[3]["TOP"]= "4";
            $recordsRR[4]["TOP"]= "5";
            $IdRooms = idTopRooms();
            $NumR = idTopRooms($num=true);
            for($i = 0; $i < count($IdRooms); $i++){
                /*$recordsRR[$i]["IdStanza"]= $IdRooms[$i];*/
                $recordsRR[$i]["NumRichieste"]= $NumR[$i];
                $recordsRR[$i]["Indirizzo"]= getIndirizzo($IdRooms[$i]);
                $recordsRR[$i]["Zona"]= getZona($IdRooms[$i]);
                $recordsRR[$i]["PrezzoSuggerito"]= getPrezzoSuggerito($IdRooms[$i]);
                $recordsRR[$i]["Metro"]= getMetro($IdRooms[$i]);
            }
            Utils::PrintJson(Utils::JsonEncodeFlexigridMessage($recordsRR));
            break;
        case "loadRankingOfMonthlyRequests_Rooms":
            for($i = 0; $i < count($mesi); $i++){
                $recordsRMRR[$i]["Mese"]= '<a data-mese="'.($i+1).'" class="button" >'.$mesi[$i].'</a>';
            }
            $idStatsRooms = stats_rooms();
            $NumR = stats_rooms($num=true);
            for($i = 0; $i < count($idStatsRooms); $i++){
                /*$recordsRMRR[$i]["IdStanza"]= $idStatsRooms[$i];*/
                $recordsRMRR[$i]["NumRichieste"]= $NumR[$i];
                $recordsRMRR[$i]["Indirizzo"]= getIndirizzo($idStatsRooms[$i]);
                $recordsRMRR[$i]["Zona"]= getZona($idStatsRooms[$i]);
                $recordsRMRR[$i]["PrezzoSuggerito"]= getPrezzoSuggerito($idStatsRooms[$i]);
                $recordsRMRR[$i]["Metro"]= getMetro($idStatsRooms[$i]);
            }
            Utils::PrintJson(Utils::JsonEncodeFlexigridMessage($recordsRMRR));
            break;
        case "loadFiltroPlus":
            $records_filtro1 = NULL;
            $records_filtro1[0]["TOP"]= "1";
            $records_filtro1[1]["TOP"]= "2";
            $records_filtro1[2]["TOP"]= "3";
            $records_filtro1[3]["TOP"]= "4";
            $records_filtro1[4]["TOP"]= "5";
            $zona = stats_zona_filtro($num=false, $plus=true, $meseRichiesto);
            for($i = 0; $i < count($zona); $i++){
                $records_filtro1[$i]["Zona"]= $zona[$i];
            }
            $numRZona = stats_zona_filtro($num=true, $plus=true, $meseRichiesto);
            for($i = 0; $i < count($numRZona); $i++){
                $records_filtro1[$i]["NumRichiesteZona"]= $numRZona[$i];
            }
            $prezzo = stats_prezzo_filtro($num=false, $plus=true,$meseRichiesto);
            for($i = 0; $i < count($prezzo); $i++){
                $records_filtro1[$i]["Prezzo"]= $prezzo[$i];
            }
            $numRPrezzo = stats_prezzo_filtro($num=true, $plus=true, $meseRichiesto);
            for($i = 0; $i < count($numRPrezzo); $i++){
                $records_filtro1[$i]["NumRichiestePrezzo"]= $numRPrezzo[$i];
            }
            $disponibilita = stats_disponibilita_filtro($num=false, $plus=true,$meseRichiesto);
            for($i = 0; $i < count($disponibilita); $i++){
                $records_filtro1[$i]["Disponibilita"]= $mesi[$disponibilita[$i]-1];
            }
            $numRDisponibilita = stats_disponibilita_filtro($num=true, $plus=true, $meseRichiesto);
            for($i = 0; $i < count($numRDisponibilita); $i++){
                $records_filtro1[$i]["NumRichiesteDisponibilita"]= $numRDisponibilita[$i];
            }
            $metro = stats_metro_filtro($num=false, $plus=true,$meseRichiesto);
            for($i = 0; $i < count($metro); $i++){
                $records_filtro1[$i]["Metro"]= $metro[$i];
            }
            $numRMetro = stats_metro_filtro($num=true, $plus=true, $meseRichiesto);
            for($i = 0; $i < count($numRMetro); $i++){
                $records_filtro1[$i]["NumRichiesteMetro"]= $numRMetro[$i];
            }
            Utils::PrintJson(Utils::JsonEncodeFlexigridMessage($records_filtro1));
            break;
        case "loadRankingRoomsPlus":
            $recordsRR = NULL;
            $recordsRR[0]["TOP"]= "1";
            $recordsRR[1]["TOP"]= "2";
            $recordsRR[2]["TOP"]= "3";
            $recordsRR[3]["TOP"]= "4";
            $recordsRR[4]["TOP"]= "5";
            $IdRooms = stats_rooms($num=false, $plus=true, $meseRichiesto);
            $NumR = stats_rooms($num=true, $plus=true, $meseRichiesto);
            for($i = 0; $i < count($IdRooms); $i++){
                /*$recordsRR[$i]["IdStanza"]= $IdRooms[$i];*/
                $recordsRR[$i]["NumRichieste"]= $NumR[$i];
                $recordsRR[$i]["Indirizzo"]= getIndirizzo($IdRooms[$i]);
                $recordsRR[$i]["Zona"]= getZona($IdRooms[$i]);
                $recordsRR[$i]["PrezzoSuggerito"]= getPrezzoSuggerito($IdRooms[$i]);
                $recordsRR[$i]["Metro"]= getMetro($IdRooms[$i]);
            }
            Utils::PrintJson(Utils::JsonEncodeFlexigridMessage($recordsRR));
            break;
    }
}

function stats_zona($num = false, $array = NULL){
    global $Database;
    $query = sprintf("SELECT Zona, count(*) as 'Num' FROM Richiedenti where IdStanza = 0 group by Zona order by Num DESC LIMIT 5;");
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

function stats_prezzo($num = false, $array = NULL){
    global $Database;
    $query = sprintf("SELECT Prezzo, count(*) as 'Num' FROM Richiedenti where IdStanza = 0 group by Prezzo order by Num DESC LIMIT 5;");
    if(!$num){
        if ($res = $Database->Query($query)) {
            $x = 0;
            while ($row = $Database->Fetch($res)){
                $array[$x] = $row["Prezzo"];
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

function stats_disponibilita($num = false, $array = NULL){
    global $Database;
    $query = sprintf("SELECT MONTH(Disponibilita) as 'Disponibilita', count(*) as 'Num' FROM Richiedenti where IdStanza = 0 group by MONTH(Disponibilita) order by Num DESC LIMIT 5;");
    if(!$num){
        if ($res = $Database->Query($query)) {
            $x = 0;
            while ($row = $Database->Fetch($res)){
                $array[$x] = $row["Disponibilita"];
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

function stats_metro($num = false, $array = NULL){
    global $Database;
    $query = sprintf("SELECT Metro, count(*) as 'Num' FROM Richiedenti where IdStanza = 0 group by Metro order by Num DESC LIMIT 5;");
    if(!$num){
        if ($res = $Database->Query($query)) {
            $x = 0;
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
            while ($row = $Database->Fetch($res)){
                $array[$x] = $row["Num"];
                $x++;
            }
            return $array;
        }
    }
    return $array;
}

function stats_zona_filtro($num = false, $plus = false, $mese = 0, $array = NULL){
    global $Database;
    if(!$plus){
        $query = sprintf("SELECT A.Month, A.Zona, A.Num FROM (SELECT MONTH(DataRegistrazione) as 'Month', Zona, count(*) as 'Num' FROM Richiedenti where IdStanza = 0 group by MONTH(DataRegistrazione), Zona order by MONTH(DataRegistrazione), Num DESC) as A group by A.Month;");
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
        $query = sprintf("SELECT MONTH(DataRegistrazione) as 'Month', Zona, count(*) as 'Num' FROM Richiedenti where IdStanza = 0 and MONTH(DataRegistrazione)=$mese group by MONTH(DataRegistrazione), Zona order by MONTH(DataRegistrazione), Num DESC LIMIT 5;");
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
    }
    return $array;
}

function stats_prezzo_filtro($num = false, $plus = false, $mese = 0, $array = NULL){
    global $Database;
    if(!$plus){
        $query = sprintf("SELECT A.Month, A.Prezzo, A.Num FROM
(SELECT MONTH(DataRegistrazione) as 'Month', Prezzo, count(*) as 'Num'
FROM Richiedenti 
where IdStanza = 0
group by MONTH(DataRegistrazione), Prezzo order by MONTH(DataRegistrazione), Num DESC) as A group by A.Month;");
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
        $query = sprintf("SELECT MONTH(DataRegistrazione) as 'Month', Prezzo, count(*) as 'Num' FROM Richiedenti where IdStanza = 0 and MONTH(DataRegistrazione)=$mese and Prezzo >= 0 group by MONTH(DataRegistrazione), Prezzo order by MONTH(DataRegistrazione), Num DESC;");
        if(!$num){
            if ($res = $Database->Query($query)) {
                $x = 0;
                for($i = 0; $i < 5; $i++){
                    $array[$i] = "Vuoto";
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

function stats_disponibilita_filtro($num = false, $plus = false, $mese = 0, $array = NULL){
    global $Database;
    if(!$plus){
        $query = sprintf("SELECT A.Month, A.Disponibilita, A.Num FROM
(SELECT MONTH(DataRegistrazione) as 'Month', MONTH(Disponibilita) as 'Disponibilita', count(*) as 'Num'
FROM Richiedenti 
where IdStanza = 0
group by MONTH(DataRegistrazione), MONTH(Disponibilita) order by MONTH(DataRegistrazione), Num DESC) as A group by A.Month;");
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
        $query = sprintf("SELECT MONTH(DataRegistrazione) as 'Month', MONTH(Disponibilita) as 'Disponibilita', count(*) as 'Num' FROM Richiedenti where IdStanza = 0 AND MONTH(DataRegistrazione) = $mese AND MONTH(Disponibilita) is not null group by MONTH(DataRegistrazione), MONTH(Disponibilita) order by MONTH(DataRegistrazione), Num DESC LIMIT 5");
        if(!$num){
            if ($res = $Database->Query($query)) {
                $x = 0;
                while ($row = $Database->Fetch($res)){
                    $array[$x] = $row["Disponibilita"];
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
    }
    return $array;
}

function stats_metro_filtro($num = false, $plus = false, $mese = 0, $array = NULL){
    global $Database;
    if(!$plus){
        $query = sprintf("SELECT A.Month, A.Metro, A.Num FROM
(SELECT MONTH(DataRegistrazione) as 'Month', Metro, count(*) as 'Num'
FROM Richiedenti 
where IdStanza = 0
	and Metro != ''
group by MONTH(DataRegistrazione), Metro order by MONTH(DataRegistrazione), Num DESC) as A group by A.Month;");
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
        $query = sprintf("SELECT MONTH(DataRegistrazione) as 'Month', Metro, count(*) as 'Num' FROM Richiedenti where IdStanza = 0 and (Metro = 'M1' or Metro = 'M2' or Metro = 'M3' or Metro = 'M4' or Metro = 'M5') AND MONTH(DataRegistrazione) = $mese group by MONTH(DataRegistrazione), Metro order by MONTH(DataRegistrazione), Num DESC;");
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

function idTopRooms($num = false, $array = NULL){
    /* CONTROLLARE RISULTATI */
    global $Database;
    $query = sprintf("SELECT IdStanza, count(*) as 'Num' FROM Richiedenti where IdStanza != 0 group by IdStanza order by Num DESC LIMIT 5;");
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

function stats_rooms($num= false, $plus=false, $mese, $array = NULL) {
    global $Database;
    if(!$plus){
        $query = sprintf("SELECT A.Month, A.IdStanza, A.Num FROM (SELECT MONTH(DataRegistrazione) as 'Month', IdStanza, count(*) as 'Num' FROM Richiedenti WHERE IdStanza != 0 group by MONTH(DataRegistrazione), IdStanza order by MONTH(DataRegistrazione), Num DESC) as A group by A.Month;");
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
        $query = "SELECT MONTH(DataRegistrazione) as 'Month', IdStanza, count(*) as 'Num' FROM Richiedenti WHERE IdStanza != 0 AND MONTH(DataRegistrazione) = $mese group by MONTH(DataRegistrazione), IdStanza order by MONTH(DataRegistrazione), Num DESC LIMIT 5;";
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

function piuRichiesti($num = false, $array = NULL) {
    global $Database;
    $query = sprintf("SELECT Id, Zona, Prezzo, MONTH(Disponibilita), Metro, count(*) as 'Num' FROM Richiedenti where IdStanza = 0 group by Zona, Prezzo, MONTH(Disponibilita), Metro order by Num DESC LIMIT 5;");
    if(!$num){
        if ($res = $Database->Query($query)) {
            $x = 0;
            while ($row = $Database->Fetch($res)){
                $array[$x] = $row["Id"];
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

function getZonaR($Id){
    $value = "Non definito";
    global $Database;
    $query = sprintf("SELECT Zona as 'value' FROM Richiedenti where Id = %d;", $Id);
    if ($res = $Database->Query($query)) {
        if ($row = $Database->Fetch($res)){
            if($row["value"] != ""){
                $value = $row["value"];
            }else{
                $value = "Vuoto";
            }
        }
    }
    return $value;
}

function getPrezzoR($Id){
    $value = "Non definito";
    global $Database;
    $query = sprintf("SELECT Prezzo as 'value' FROM Richiedenti where Id = %d;", $Id);
    if ($res = $Database->Query($query)) {
        if ($row = $Database->Fetch($res)){
            if($row["value"] != ""){
                $value = $row["value"];
            }else{
                $value = "Vuoto";
            }
        }
    }
    return $value;
}

function getDisponibilitaR($Id){
    $value = "Non definito";
    global $Database;
    $query = sprintf("SELECT MONTH(Disponibilita) as 'value' FROM Richiedenti where Id = %d;", $Id);
    if ($res = $Database->Query($query)) {
        if ($row = $Database->Fetch($res)){
            if($row["value"] != ""){
                $value = $row["value"];
            }else{
                $value = "Vuoto";
            }
        }
    }
    return $value;
}

function getMetroR($Id){
    $value = "Non definito";
    global $Database;
    $query = sprintf("SELECT Metro as 'value' FROM Richiedenti where Id = %d;", $Id);
    if ($res = $Database->Query($query)) {
        if ($row = $Database->Fetch($res)){
            if($row["value"] != ""){
                $value = $row["value"];
            }else{
                $value = "Vuoto";
            }
        }
    }
    return $value;
}

$smarty->display('stats_richiedenti.tpl');

