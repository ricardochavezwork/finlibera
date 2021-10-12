<?php

include 'common.php';
$q = $_GET['term'];
$idAppartamento = $_GET["idAppartamento"];

if(isset($_REQUEST["action"])){
    switch ($_REQUEST["action"]){
        case "inquilino":
            $resArray = array();
            $a_json_row = array();
            $parts = explode(' ', $q);
            $p = count($parts);
            $query = "SELECT i.Id, a.Id as 'Ida', i_s.Id as 'IdIns', i_s.PeriodoFatturazione as 'InsPeriodoFatturazione', i_s.Canone as 'Canone', i_s.Spese as 'Spese', i_s.DataFirma as 'DataFirma', i_s.Note as 'Note', i_s.Caparra as 'Caparra', i_s.Cauzione as 'Cauzione', i_s.Turistico as 'Turistico', i_s.NumeroFatture as 'NumeroFatture', i_s.ConguaglioUtenze as 'ConguaglioUtenze', i_s.ConguaglioSpese as 'ConguaglioSpese', i_s.GiorniNonGoduti as 'GiorniNonGoduti', i_s.Pulizie as 'Pulizie', i_s.IdStanza as 'InsIdStanza', i_s.DataFirma as 'InsDataFirma', i_s.DataInizio as 'InsDataInizio', i_s.DataFine as 'InsDataFine', a_s.Id as 'Idas', i.IdAdmin as 'IdAdmin', i.Cognome as 'Cognome', i.Nome as 'Nome', a.Indirizzo as 'Indirizzo', a.Civico as 'Civico', a_s.Numero as 'Numero'
FROM Inquilini i, Inquilini_Stanze i_s, Appartamenti a, Appartamenti_Stanze a_s
WHERE i.Id = i_s.IdInquilino
	AND i_s.IdStanza = a_s.Id
    AND a.Id = a_s.IdAppartamento
    AND (i_s.Id IN (SELECT i_s.Id FROM Inquilini_Stanze i_s 
INNER JOIN (SELECT Id, IdInquilino, MAX(DataFine) AS DataFine
  FROM Inquilini_Stanze GROUP BY IdInquilino) AS MAX USING (IdInquilino, DataFine)) or i_s.DataFine is null)";
            for($i = 0; $i < $p; $i++) {
              $query .= " AND (Cognome LIKE '%". $Database->Escape($parts[$i]) ."%' OR Nome LIKE '%". $Database->Escape($parts[$i]) ."%' OR a.Indirizzo LIKE '%". $Database->Escape($parts[$i]) ."%' OR a.Civico LIKE '%". $Database->Escape($parts[$i]) ."%')";
            }
            $query .= " LIMIT 10";
            $res = $Database->Query($query);
            if (!$res) {
                $resArray = array();
            }else{
                $stringa='';
                $e = 0;
                while($row = $Database->Fetch($res)){
                    //$insertRow = array('label' => $row['Cognome']. " " . $row['Nome']. " - " . $row['Indirizzo']. " " . $row['Civico']. " s." . $row['Numero'] );
                    //array_push($resArray,$insertRow);
                    /*$a_json_row["id"] = $row['Id'];
                    $a_json_row["ida"] = $row['Ida'];
                    $a_json_row["idas"] = $row['Idas'];
                    $a_json_row["idins"] = $row['IdIns'];
                    $a_json_row["insIdStanza"] = $row['InsIdStanza'];
                    $a_json_row["insDataInizio"] = $row['InsDataInizio'];
                    $a_json_row["insDataFine"] = $row['InsDataFine'];
                    $a_json_row["insDataFirma"] = $row['InsDataFirma'];
                    $a_json_row["insPeriodoFatturazione"] = $row['InsPeriodoFatturazione'];
                    $a_json_row["nome"] = $row['Nome'];
                    $a_json_row["cognome"] = $row['Cognome'];
                    $a_json_row["nomeAppartamento"] = $row['Indirizzo']. " " . $row['Civico']. " c." . $row['Numero'];
                    $a_json_row["value"] = $row['Cognome']. " " . $row['Nome'];
                    $a_json_row["label"] = $row['Cognome']. " " . $row['Nome']. " - " . $row['Indirizzo']. " " . $row['Civico']. " c." . $row['Numero'];*/
                    $a_json_row = (object)$row;
                    $a_json_row->Agente = new AdminAccount($a_json_row->IdAdmin);
                    $a_json_row->InquilinoStanza = new Inquilino_Stanza($a_json_row->IdIns);
                    $a_json_row->Inquilino = new Inquilino($a_json_row->Id);
                    $a_json_row->Appartamento = new Appartamento($a_json_row->Ida);
                    $a_json_row->Appartamento->NumeroStanza = $a_json_row->Numero;
                    $a_json_row->value = $a_json_row->Cognome . " " . $a_json_row->Nome;
                    $a_json_row->label = $a_json_row->Cognome . " " . $a_json_row->Nome . " - " . $a_json_row->Indirizzo . " " . $a_json_row->Civico . " c. " . $a_json_row->Numero;
                    array_push($resArray,$a_json_row);
                    $stringa="";
                    $e++;
                }
            }
            Utils::PrintJson($resArray, true);
            break;
        case "aptStanze":
            $resArray = array();
            $row_obj = array();
            $parts = explode(' ', $q);
            $p = count($parts);
            $query = "SELECT aptStanza.* FROM Appartamenti apt, Appartamenti_Stanze aptStanza WHERE apt.Id = aptStanza.IdAppartamento ";
            for($i = 0; $i < $p; $i++) {
              $query .= " AND (apt.Indirizzo LIKE '%". $Database->Escape($parts[$i]) ."%' OR apt.Civico LIKE '%". $Database->Escape($parts[$i]) ."%')";
            }
            $query .= " LIMIT 10";
            $res = $Database->Query($query);
            if (!$res) {
                $resArray = array();
            }else{
                $stringa='';
                $e = 0;
                while($row = $Database->Fetch($res)){
                    $row_obj = (object)$row;
                    $a_json_row = new stdClass();
                    $a_json_row->Appartamento = new Appartamento($row_obj->IdAppartamento);
                    $a_json_row->Appartamento_Stanza = new Appartamento_Stanza($row_obj->Id);
                    $a_json_row->value = $a_json_row->Appartamento->Indirizzo . " " . $a_json_row->Appartamento->Civico;
                    $a_json_row->label = $a_json_row->Appartamento->Indirizzo . " " . $a_json_row->Appartamento->Civico . " c. " . $a_json_row->Appartamento_Stanza->Numero;
                    array_push($resArray,$a_json_row);
                    $stringa="";
                    $e++;
                }
            }
            Utils::PrintJson($resArray, true);
            break;
        case "aptPostoAuto":
            $resArray = array();
            $row_obj = array();
            $parts = explode(' ', $q);
            $p = count($parts);
            $query = "SELECT aptPostoAuto.* FROM Appartamenti apt, Appartamenti_PostiAuto aptPostoAuto WHERE apt.Id = aptPostoAuto.IdAppartamento ";
            for($i = 0; $i < $p; $i++) {
              $query .= " AND (apt.Indirizzo LIKE '%". $Database->Escape($parts[$i]) ."%' OR apt.Civico LIKE '%". $Database->Escape($parts[$i]) ."%')";
            }
            $query .= " LIMIT 10";
            $res = $Database->Query($query);
            if (!$res) {
                $resArray = array();
            }else{
                $stringa='';
                $e = 0;
                while($row = $Database->Fetch($res)){
                    $row_obj = (object)$row;
                    $a_json_row = new stdClass();
                    $a_json_row->Appartamento = new Appartamento($row_obj->IdAppartamento);
                    $a_json_row->Appartamento_PostoAuto = new Appartamento_PostoAuto($row_obj->Id);
                    $a_json_row->value = $a_json_row->Appartamento->Indirizzo . " " . $a_json_row->Appartamento->Civico;
                    $a_json_row->label = $a_json_row->Appartamento->Indirizzo . " " . $a_json_row->Appartamento->Civico . " c. " . $a_json_row->Appartamento_PostoAuto->Numero;
                    array_push($resArray,$a_json_row);
                    $stringa="";
                    $e++;
                }
            }
            Utils::PrintJson($resArray, true);
            break;
        case "inquilinoFattura":
            $resArray = array();
            $a_json_row = array();
            $parts = explode(' ', $q);
            $p = count($parts);
            $query = "SELECT * FROM Inquilini WHERE Id > 0 ";
            for($i = 0; $i < $p; $i++) {
              $query .= " AND (Cognome LIKE '%". $Database->Escape($parts[$i]) ."%' OR Nome LIKE '%". $Database->Escape($parts[$i]) ."%')";
            }
            $query .= " LIMIT 5";
            $res = $Database->Query($query);
            if (!$res) {
                $resArray = array();
            }else{
                $stringa='';
                $e = 0;
                while($row = $Database->Fetch($res)){
                    //$insertRow = array('label' => $row['Cognome']. " " . $row['Nome']. " - " . $row['Indirizzo']. " " . $row['Civico']. " s." . $row['Numero'] );
                    //array_push($resArray,$insertRow);
                    $a_json_row["id"] = $row['Id'];
                    $a_json_row["nome"] = $row['Nome'];
                    $a_json_row["cognome"] = $row['Cognome'];
                    $a_json_row["value"] = $row['Cognome']. " " . $row['Nome'];
                    $a_json_row["label"] = $row['Cognome']. " " . $row['Nome'];
                    array_push($resArray,$a_json_row);
                    $stringa="";
                    $e++;
                }
            }
            echo json_encode($resArray);
            break;
        case "beneficiario":
            $resArray = array();
            $a_json_row = array();
            $parts = explode(' ', $q);
            $p = count($parts);
            $query = "SELECT * FROM Beneficiari WHERE Id is not null";
            for($i = 0; $i < $p; $i++) {
              $query .= " AND (Cognome LIKE '%". $Database->Escape($parts[$i]) ."%' OR Nome LIKE '%". $Database->Escape($parts[$i]) ."%' OR RagioneSociale LIKE '%". $Database->Escape($parts[$i]) ."%')";
            }
            $query .= " LIMIT 40";
            $res = $Database->Query($query);
            if (!$res) {
                $resArray = array();
            }else{
                $stringa='';
                $e = 0;
                while($row = $Database->Fetch($res)){
                    $a_json_row["id"] = $row['Id'];
                    if($row['Cognome'] == ""){
                        $a_json_row["value"] = $row['RagioneSociale'];
                        $a_json_row["label"] = $row['RagioneSociale'];
                    }else if($row['RagioneSociale'] == ""){
                        $a_json_row["value"] = $row['Cognome'] . " " . $row['Nome'];
                        $a_json_row["label"] = $row['Cognome'] . " " . $row['Nome'];
                    }else{
                        $a_json_row["value"] = $row['Cognome'] . " " . $row['Nome'] . " - " . $row['RagioneSociale'];
                        $a_json_row["label"] = $row['Cognome'] . " " . $row['Nome'] . " - " . $row['RagioneSociale'];
                    }
                    array_push($resArray,$a_json_row);
                    $stringa="";
                    $e++;
                }
            }
            echo json_encode($resArray);
            break;
        case "manutenzione":
            $resArray = array();
            $a_json_row = array();
            $parts = explode(' ', $q);
            $p = count($parts);
            $query = "SELECT * FROM Beneficiari WHERE Id is not null";
            for($i = 0; $i < $p; $i++) {
              $query .= " AND (Cognome LIKE '%". $Database->Escape($parts[$i]) ."%' OR Nome LIKE '%". $Database->Escape($parts[$i]) ."%' OR RagioneSociale LIKE '%". $Database->Escape($parts[$i]) ."%')";
            }
            $query .= " LIMIT 40";
            $res = $Database->Query($query);
            if (!$res) {
                $resArray = array();
            }else{
                $stringa='';
                $e = 0;
                while($row = $Database->Fetch($res)){
                    $a_json_row["id"] = $row['Id'];
                    if($row['Cognome'] == ""){
                        $a_json_row["value"] = $row['RagioneSociale'];
                        $a_json_row["label"] = $row['RagioneSociale'];
                    }else if($row['RagioneSociale'] == ""){
                        $a_json_row["value"] = $row['Cognome'] . " " . $row['Nome'];
                        $a_json_row["label"] = $row['Cognome'] . " " . $row['Nome'];
                    }else{
                        $a_json_row["value"] = $row['Cognome'] . " " . $row['Nome'] . " - " . $row['RagioneSociale'];
                        $a_json_row["label"] = $row['Cognome'] . " " . $row['Nome'] . " - " . $row['RagioneSociale'];
                    }
                    array_push($resArray,$a_json_row);
                    $stringa="";
                    $e++;
                }
            }
            echo json_encode($resArray);
            break;
        case "cliente":
            $resArray = array();
            $a_json_row = array();
            $parts = explode(' ', $q);
            $p = count($parts);
            $query = "SELECT * FROM AltriClienti WHERE Id is not null";
            for($i = 0; $i < $p; $i++) {
              $query .= " AND (Cognome LIKE '%". $Database->Escape($parts[$i]) ."%' OR Nome LIKE '%". $Database->Escape($parts[$i]) ."%' OR RagioneSociale LIKE '%". $Database->Escape($parts[$i]) ."%')";
            }
            $query .= " LIMIT 10";
            
            //Utils::PrintJson($query, true);
            
            $res = $Database->Query($query);
            if (!$res) {
                $resArray = array();
            }else{
                $stringa='';
                $e = 0;
                while($row = $Database->Fetch($res)){
                    /*$a_json_row["id"] = $row['Id'];
                    if($row['Cognome'] == ""){
                        $a_json_row["value"] = $row['RagioneSociale'];
                        $a_json_row["label"] = $row['RagioneSociale'];
                    }else if($row['RagioneSociale'] == ""){
                        $a_json_row["value"] = $row['Cognome'] . " " . $row['Nome'];
                        $a_json_row["label"] = $row['Cognome'] . " " . $row['Nome'];
                    }else{
                        $a_json_row["value"] = $row['Cognome'] . " " . $row['Nome'] . " - " . $row['RagioneSociale'];
                        $a_json_row["label"] = $row['Cognome'] . " " . $row['Nome'] . " - " . $row['RagioneSociale'];
                    }
                    array_push($resArray,$a_json_row);
                    $stringa="";*/
                    $a_json_row = (object)$row;
                    $a_json_row->value = $a_json_row->Cognome . " " . $a_json_row->Nome;
                    $a_json_row->label = ($a_json_row->RagioneSociale ? $a_json_row->value . " - " . $a_json_row->RagioneSociale : $a_json_row->value);
                    array_push($resArray,$a_json_row);
                    $stringa="";
                    $e++;
                }
            }
            echo json_encode($resArray);
            break;
        case "attribuzione":
            $resArray = array();
            $a_json_row = array();
            $parts = explode(' ', $q);
            $p = count($parts);
            $query = "SELECT * FROM Attribuzioni WHERE Titolo is not null";
            for($i = 0; $i < $p; $i++) {
              $query .= " AND (Titolo LIKE '%". $Database->Escape($parts[$i]) ."%')";
            }
            $query .= " LIMIT 40";
            $res = $Database->Query($query);
            if (!$res) {
                $resArray = array();
            }else{
                $stringa='';
                $e = 0;
                while($row = $Database->Fetch($res)){
                    $a_json_row["id"] = $row['Id'];
                    $a_json_row["value"] = $row['Titolo'];
                    $a_json_row["label"] = $row['Titolo'];
                    array_push($resArray,$a_json_row);
                    $stringa="";
                    $e++;
                }
            }
            echo json_encode($resArray);
            break;
        case "giustificativo":
            $resArray = array();
            $a_json_row = array();
            $parts = explode(' ', $q);
            $p = count($parts);
            $query = "SELECT * FROM Giustificativi WHERE Titolo is not null";
            for($i = 0; $i < $p; $i++) {
              $query .= " AND (Titolo LIKE '%". $Database->Escape($parts[$i]) ."%')";
            }
            $query .= " LIMIT 40";
            $res = $Database->Query($query);
            if (!$res) {
                $resArray = array();
            }else{
                $stringa='';
                $e = 0;
                while($row = $Database->Fetch($res)){
                    $a_json_row["id"] = $row['Id'];
                    $a_json_row["value"] = $row['Titolo'];
                    $a_json_row["label"] = $row['Titolo'];
                    array_push($resArray,$a_json_row);
                    $stringa="";
                    $e++;
                }
            }
            echo json_encode($resArray);
            break;
        case "appartamento":
            $resArray = array();
            $a_json_row = array();
            $parts = explode(' ', $q);
            $p = count($parts);
            $query = "SELECT * FROM Appartamenti WHERE Indirizzo is not null";
            for($i = 0; $i < $p; $i++) {
              $query .= " AND (Indirizzo LIKE '%". $Database->Escape($parts[$i]) ."%')";
            }
            $query .= " LIMIT 40";
            $res = $Database->Query($query);
            if (!$res) {
                $resArray = array();
            }else{
                $stringa='';
                $e = 0;
                while($row = $Database->Fetch($res)){
                    $a_json_row["id"] = $row['Id'];
                    $a_json_row["value"] = $row['Indirizzo']. " " . $row['Civico'];
                    $a_json_row["label"] = $row['Indirizzo']. " " . $row['Civico'];
                    array_push($resArray,$a_json_row);
                    $stringa="";
                    $e++;
                }
            }
            echo json_encode($resArray);
            break;
        case "stanza":
            $resArray = array();
            $a_json_row = array();
            $query = "SELECT * FROM Appartamenti_Stanze WHERE IdAppartamento = $idAppartamento;";
            $res = $Database->Query($query);
            if (!$res) {
                $resArray = array();
            }else{
                $stringa='';
                $e = 0;
                while($row = $Database->Fetch($res)){
                    $a_json_row["id"] = $row['Id'];
                    $a_json_row["label"] = "Stanza n. " .$row['Numero'];
                    array_push($resArray,$a_json_row);
                    $stringa="";
                    $e++;
                }
            }
            echo json_encode($resArray, JSON_PRETTY_PRINT);
            break;
    }
}