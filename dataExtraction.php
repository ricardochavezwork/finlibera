<?php

include 'common.php';
include './invoice_common/invoice_functions.php';

$run = TRUE;
$test = FALSE;
define("ULTERIORE_AUMENTO_PREZZOSUGGERITO", 0);

$response = new stdClass();
$response->records = array();

$smarty->clearConfig();
$smarty->configLoad("../../configs/" . $Language . ".conf");
//$smarty->configLoad("../../configs/en.conf");

if($run){
    
    $includeInvisible = true;
    
    $aptStanze = Appartamento::Search("(a.Visibile = 1 AND s.Visibile = 1)");

    foreach ($aptStanze as $key => $value) {
        $row = (object)$value;
        
        $stanza = new Appartamento_Stanza($row->IdStanza);
        
        $record = new stdClass();
        $record->BuildingDetails = array();
        $record->BDMRDetails = new stdClass(); //Arredi, Dotazioni
        $record->APTDetails = new stdClass(); //Casa
        $record->Tenants = array();
        $dotazioni = array();
        $arredi = array();
        $casa = array();
        $spaziComuni = array();
        
        //CASA
        if ($row->Tv > 0){
            $casa[] = $smarty->getConfigVariable("tv");            
        }
        if ($row->Wifi > 0){
            $casa[] = $smarty->getConfigVariable("wifi");            
        }
        if ($row->Balconi > 0){
            $casa[] = $smarty->getConfigVariable("balcone");            
        }
        if ($row->Lavatrice > 0){
            $casa[] = $smarty->getConfigVariable("lavatrice");            
        }
        if ($row->Lavastoviglie > 0){
            $casa[] = $smarty->getConfigVariable("lavastoviglie");            
        }
        
        //STABILE
        if ($row->Portineria > 0){
            $record->BuildingDetails[] = $smarty->getConfigVariable("portineria");
        }
        if ($row->Giardino > 0){
            $record->BuildingDetails[] = $smarty->getConfigVariable("giardino");            
        }
        if ($row->PostoAuto > 0){
            $record->BuildingDetails[] = $smarty->getConfigVariable("posto_auto");            
        }
        if ($row->Ascensore > 0){
            $record->BuildingDetails[] = $smarty->getConfigVariable("ascensore");            
        }
        if ($row->Parco > 0){
            $record->BuildingDetails[] = $smarty->getConfigVariable("parco");            
        }
        if ($row->PostoBici > 0){
            $record->BuildingDetails[] = $smarty->getConfigVariable("posto_bici");            
        }
        
        //SPAZI COMUNI
        if ($row->CucinaAbitabile > 0){
            $spaziComuni[] = $smarty->getConfigVariable("cucina_abitabile");
        }
        if ($row->Bagni > 0){
            $spaziComuni[] = ($row->Bagni == 1 ? $smarty->getConfigVariable("n1_bagni") : str_replace("%%N%%", $row->Bagni, $smarty->getConfigVariable("n_bagni")));
        }
        if ($row->SalaPranzo > 0){
            $spaziComuni[] = $smarty->getConfigVariable("pranzo");
        }
        if ($row->Balconi > 0){
            $spaziComuni[] = ($row->Bagni == 1 ? $smarty->getConfigVariable("n1_balconi") : str_replace("%%N%%", $row->Balconi, $smarty->getConfigVariable("n_balconi")));
        }
            
        
        //ARREDI
        if ($stanza->CucinaPrivata > 0){
            $arredi[] = $smarty->getConfigVariable("cucina_privata");
        }
        if ($stanza->CabinaArmadio > 0){
            $arredi[] = $smarty->getConfigVariable("cabina_armadio");
        }
        if ($stanza->LettoMatrimoniale > 0){
            $arredi[] = $smarty->getConfigVariable("letto_matrimoniale");
        }
        if ($stanza->Scrivania > 0){
            $arredi[] = $smarty->getConfigVariable("scrivania");
        }
        if ($stanza->TavoloPranzo > 0){
            $arredi[] = $smarty->getConfigVariable("tavolo");
        }
        if ($stanza->AnteArmadi > 0){
            $arredi[] = str_replace("%%N%%", $stanza->AnteArmadi, $smarty->getConfigVariable("ante_armadio"));
        }
        if ($stanza->Cassetti > 0){
            $arredi[] = str_replace("%%N%%", $stanza->Cassetti, $smarty->getConfigVariable("n_cassetti"));
        } 
        if ($stanza->Specchi > 0){
            $arredi[] = $smarty->getConfigVariable("specchi");
        }
        if ($stanza->Mensole > 0){
            $arredi[] = $smarty->getConfigVariable("mensole");
        }
        if ($stanza->Sedie > 0){
            $arredi[] = $smarty->getConfigVariable("sedie");
        }
        
        //DOTAZIONI
        
        if ($stanza->Bagno == BAGNO_PRIVATO){
            $dotazioni[] = $smarty->getConfigVariable("bagno_privato");
        }
        if ($stanza->Balconi > 0){
            $dotazioni[] = $smarty->getConfigVariable("balcone");
        }  
        if ($stanza->Pavimento == PAVIMENTO_PARQUET){
            $dotazioni[] = $smarty->getConfigVariable("parquet");
        }
        if ($stanza->Antenna > 0){
            $dotazioni[] = $smarty->getConfigVariable("antenna");
        }
        if ($stanza->Tv > 0){
            $dotazioni[] = $smarty->getConfigVariable("tv");
        }
        if ($stanza->Multiluce > 0){
            $dotazioni[] = $smarty->getConfigVariable("multiluce");
        }
        
        //Posizione
        
        $indicazioni = new stdClass();
        $indicazioni->Via = $row->Indirizzo;
        $indicazioni->Civico = $row->Civico;
        
        if($row->Descrizione){
            $indicazioni->Zone = $row->Descrizione;
        }else{
            $zona = new Zona($row->Zona);
            $indicazioni->Zone = $zona->Nome;
        }
        
        // Carica i mezzi pubblici
        
        $transports = new stdClass();
        $transports->Subway = array();
        $transports->Bus = array();
        $transports->Train = array();
        
        $metro = array();
        $bus = array();
        $passanti = array();
        $mezzi = Appartamento_Mezzo::Load($row->Id, TRUE);
        foreach ($mezzi as $mezzo) {
            switch ($mezzo["Tipo"]) {
                case MEZZI_METROPOLITANA:
                    $found = FALSE;
                    for ($mezzo1 = 0; $mezzo1 < count($metro); ++$mezzo1) {
                        if (strcasecmp($mezzo["Mezzo"], $metro[$mezzo1]["Mezzo"]) == 0) {
                            $found = TRUE;
                            $metro[$mezzo1]["Metro"][] = $mezzo["Metro"];
                            sort($metro[$mezzo1]["Metro"]);
                            break;
                        }
                    }
                    if (!$found) {
                        $mezzo["Metro"] = array($mezzo["Metro"]);
                        $metro[] = $mezzo;
                    }
                    break;
                case MEZZI_BUSTRAM:
                    $bus[] = $mezzo;
                    break;
                case MEZZI_PASSANTE:
                    $passanti[] = $mezzo;
                    break;
            }
        }
        
        foreach($metro as $stop){
            $stop = (object)$stop;
            $m = new stdClass();
            $m->Title = $stop->Mezzo;
            $m->Distance = $stop->Distanza;
            $m->Lines = $stop->Metro;
            
            $transports->Subway[] = $m;
        }
        
        foreach ($bus as $stop){
            $stop = (object)$stop;
            $transports->Bus[] = $stop->Mezzo;
        }
        
        foreach ($passanti as $stop){
            $stop = (object)$stop;
            $transports->Train[] = $stop->Mezzo;
        }
        
        $record->NearbyTransports = $transports;
        
        //Disponibilità
        
        $d = new stdClass();
        $inquilini = Inquilino_Stanza::Load($stanza->Id);
        $dataStanzaLibera = mktime();
        $availability = null;
        $currentDate = new DateTime();
        if (count($inquilini) == 0) {
            $d->Status = $smarty->getConfigVariable("room_detail_disponibile_subito");
            $availability = new DateTime();
        } else {
            $dal = 0;
            $now = mktime();
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
            $availability = null;
        }
        
        $d->Availability = $availability;
        
        //Agente
        $agente = new stdClass();
        $agente->Name = "";
        $agente->PhoneContact = "";
        $agente->Email = "";
        if ($stanza->IdAdmin > 0) {
            $admin = new AdminAccount($stanza->IdAdmin);
            $agente->Name = $admin->Username;
            if ($admin->Telefono){
                $agente->PhoneContact = (substr($admin->Telefono, 0, 1) != "+" ? "+39 " : "") . $admin->Telefono;
            }
            
            if($admin->Email){
                $agente->Email = $admin->Email;
            }
            
        }
        
        $d->Realtor = $agente;
        
        $d->MonthlyPrice = floatval($stanza->PrezzoDinamico);
        
        if($d->Availability){
            $avail = clone $d->Availability;
            
            $price = getPrezzoStanzaPartners($stanza, $avail, 1);
            $d->MonthlyPrice = floatval($price->MonthlyPrice);
            
        }
        
        $d->AdminFee = adminFee($d->MonthlyPrice);
        
        // Carica gli inquilini
        $tenants = array();
        $stanze = Appartamento_Stanza::Load($row->Id);
        $now = mktime();
        foreach ($stanze as $s) {
            $inquilini = Inquilino_Stanza::Load($s->Id);
            rsort($inquilini);
            $found = FALSE;
            foreach ($inquilini as $j) {
                if (!$j->DataFine || ($j->IdStanza != $stanza->Id && Utils::GetTimestamp($j->DataFine) > $now)) {
                    $found = TRUE;
                    if ($j->DataFine)
                        $disponibileTimestamp = Utils::GetTimestamp ($j->DataFine);
                    else
                        $disponibileTimestamp = mktime (0, 0, 0, date("m", $dataStanzaLibera), date("d", $dataStanzaLibera), date("Y", $dataStanzaLibera) + 1);
                    $inquilino = new Inquilino($j->IdInquilino);
                    $specializzazione = getProfessione($inquilino->Professione);
                    if ($inquilino->Specializzazione) {
                        $specializzazione = $inquilino->Specializzazione;
                        //if (strlen($specializzazione) > 14)
                        //    $specializzazione = substr($specializzazione, 0, 13) . ".";
                    }

                    $tenants[] = array(
                        "Id" => $s->Id,
                        "Prezzo" => str_replace (".00", "", $s->PrezzoSuggerito),
                        "Foto" => getFotoInquilino($inquilino->Sesso, $inquilino->Professione),
                        "Nome" => $inquilino->Nome,
                        "Eta" => ($inquilino->DataNascita ? Utils::GetAge($inquilino->DataNascita) . " " . $smarty->getConfigVariable("eta") : ""),
                        "Professione" => getProfessione($inquilino->Professione),
                        "Specializzazione" => $specializzazione,
                        "DisponibileTimestamp" => $disponibileTimestamp
                        );
                    break;
                }
            }
            if (!$found) {
                $disponibileTimestamp = $now;
                /*$tenants[] = array(
                    "Id" => $s->Id,
                    "Nome" => "",
                    "Prezzo" => str_replace (".00", "", $s->PrezzoSuggerito),
                    "DisponibileTimestamp" => $disponibileTimestamp
                );*/
            }
        }
        
        // Imposta come libere le stanze in prossimita' di quella attuale
        $clearTenants = array();
        if ($dataStanzaLibera) {
            for ($j = 0; $j < count($tenants); ++$j) {
                if ($tenants[$j]["Id"] != $stanza->Id && $tenants[$j]["Nome"]) {
                    $diff = Utils::DateDiff("d", $dataStanzaLibera, $tenants[$j]["DisponibileTimestamp"], TRUE);
                    if (abs($diff) <= 30) {
                        $clearTenants[] = $j;
                        /*$tenants[$j]["Foto"] = "";
                        $tenants[$j]["Nome"] = "";
                        $tenants[$j]["Eta"] = "";
                        $tenants[$j]["Professione"] = "";
                        $tenants[$j]["Specializzazione"] = "";*/
                    }
                }
            }
        }
        
        for($x = 0; $x < count($clearTenants); $x++){
            unset($tenants[$clearTenants[$x]]);
        }
        
        foreach ($tenants as $chiave => $valore) {
            $tenant = new stdClass();
            $tenant->Nome = $valore["Nome"];
            $tenant->Eta = $valore["Eta"];
            $tenant->Professione = $valore["Professione"];
            $tenant->Specializzazione = $valore["Specializzazione"];
            
            $record->Tenants[] = $tenant;
        }
        
        //FOTO
        $aptPhotos = Appartamento_Foto::Load($row->Id);
        $clone_aptPhotos = array();
        foreach ($aptPhotos as $k => $v) {
            $photo = new stdClass();
            $photo->Url = "http://www.milanostanze.it/" . $v->Url;
            $photo->Descrizione = $v->Descrizione;
            $photo->Descrizione_en = $v->Descrizione_en;
            $clone_aptPhotos[] = $photo;
        }
        $record->APTDetails->Photos = $clone_aptPhotos;
        
        $roomPhotos = Appartamento_Stanza_Foto::Load($stanza->Id);
        $clone_roomPhotos = array();
        foreach ($roomPhotos as $k => $v) {
            $photo = new stdClass();
            $photo->Url = "http://www.milanostanze.it/" . $v->Url;
            $photo->Descrizione = $v->Descrizione;
            $photo->Descrizione_en = $v->Descrizione_en;
            $clone_roomPhotos[] = $photo;
        }
        
        $record->BDMRDetails->Photos = $clone_roomPhotos;
        
        //STANZE APPARTAMENTO
        $stnz = array();
        
        $rooms = Appartamento_Stanza::Load($row->Id);
        
        
        foreach ($rooms as $e => $a) {
            
            if($a->Id !== $stanza->Id){
                $room = new stdClass();
            
                $room->Furnishing = array();
                $room->Equipment = array();

                //ARREDI
                if ($a->CucinaPrivata > 0){
                    $room->Furnishing[] = $smarty->getConfigVariable("cucina_privata");
                }
                if ($a->CabinaArmadio > 0){
                    $room->Furnishing[] = $smarty->getConfigVariable("cabina_armadio");
                }
                if ($a->LettoMatrimoniale > 0){
                    $room->Furnishing[] = $smarty->getConfigVariable("letto_matrimoniale");
                }
                if ($a->Scrivania > 0){
                    $room->Furnishing[] = $smarty->getConfigVariable("scrivania");
                }
                if ($a->TavoloPranzo > 0){
                    $room->Furnishing[] = $smarty->getConfigVariable("tavolo");
                }
                if ($a->AnteArmadi > 0){
                    $room->Furnishing[] = str_replace("%%N%%", $a->AnteArmadi, $smarty->getConfigVariable("ante_armadio"));
                }
                if ($a->Cassetti > 0){
                    $room->Furnishing[] = str_replace("%%N%%", $a->Cassetti, $smarty->getConfigVariable("n_cassetti"));
                } 
                if ($a->Specchi > 0){
                    $room->Furnishing[] = $smarty->getConfigVariable("specchi");
                }
                if ($a->Mensole > 0){
                    $room->Furnishing[] = $smarty->getConfigVariable("mensole");
                }
                if ($a->Sedie > 0){
                    $room->Furnishing[] = $smarty->getConfigVariable("sedie");
                }

                //DOTAZIONI

                if ($a->Bagno == BAGNO_PRIVATO){
                    $room->Equipment[] = $smarty->getConfigVariable("bagno_privato");
                }
                if ($a->Balconi > 0){
                    $room->Equipment[] = $smarty->getConfigVariable("balcone");
                }  
                if ($a->Pavimento == PAVIMENTO_PARQUET){
                    $room->Equipment[] = $smarty->getConfigVariable("parquet");
                }
                if ($a->Antenna > 0){
                    $room->Equipment[] = $smarty->getConfigVariable("antenna");
                }
                if ($a->Tv > 0){
                    $room->Equipment[] = $smarty->getConfigVariable("tv");
                }
                if ($a->Multiluce > 0){
                    $room->Equipment[] = $smarty->getConfigVariable("multiluce");
                }

                //FOTO
                $roomPhotos = Appartamento_Stanza_Foto::Load($a->Id);
                $clone_roomPhotos = array();
                foreach ($roomPhotos as $llave => $valor) {
                    $photo = new stdClass();
                    $photo->Url = "http://www.milanostanze.it/" . $valor->Url;
                    $photo->Descrizione = $valor->Descrizione;
                    $photo->Descrizione_en = $valor->Descrizione_en;
                    $clone_roomPhotos[] = $photo;
                }

                $room->Photos = $clone_roomPhotos;

                $room->Mq = $a->Mq;
                $room->RoomNumber = $a->Numero;

                $stnz[] = $room;
            }
            
        }
        
        $tipo = "";
        switch ($stanza->Tipo) {
            case STANZA_DOPPIA:
                $tipo = $smarty->getConfigVariable("room_detail_stanza_doppia");
                break;
            case STANZA_TRIPLA:
                $tipo = $smarty->getConfigVariable("room_detail_stanza_tripla");
                break;
            default:
                $tipo = $smarty->getConfigVariable("room_detail_stanza_singola");
                break;
        }
        
        $record->Position = $indicazioni;
        $record->Booking = $d;
        $record->BDMRDetails->Furnishing = $arredi;
        $record->BDMRDetails->Equipment = $dotazioni;
        $record->BDMRDetails->Mq = $stanza->Mq;
        $record->BDMRDetails->Id = $stanza->Id;
        $record->BDMRDetails->RoomNumber = $stanza->Numero;
        $record->BDMRDetails->Category = ($stanza->Tipo + 1);
        $record->APTDetails->House = $casa;
        $record->APTDetails->SharedAreas = $spaziComuni;
        $record->APTDetails->Mq = $row->Mq;
        $record->APTDetails->Floor = $row->Piano;
        $record->APTDetails->TotalRooms = $row->Stanze;
        $record->APTDetails->Rooms = $stnz;
                
        $response->records[] = $record;
        
    }
    
    if($test){
        Utils::PrintJson($response, true);
    }else{
        $file = UPLOAD . 'MilanoStanze' . date("Ymd") . '.json';
    
        $fp = fopen($file, 'w');
        fwrite($fp, json_encode($response));
        fclose($fp);

        if (!file_exists($file)){
            // se non esiste stampo un errore
            echo "There was an error downloading your file!";
        }else{
            // Se il file esiste...
            // Imposto gli header della pagina per forzare il download del file
            header("Cache-Control: public");
            header("Content-Description: File Transfer");
            header("Content-Disposition: attachment; filename= " . 'MilanoStanze' . date("Ymd") . '.json');
            header("Content-Transfer-Encoding: binary");
            // Leggo il contenuto del file
            readfile($file);
            unlink($file);
            
            $log = new Log();
            $log->IdActivityType = 1;
            $log->IdAdmin = $AdminLogged->Id;
            $log->Save();

        }
    }
    
}else{
    echo 'Non disponibile';
}

