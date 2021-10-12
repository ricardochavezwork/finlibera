<?php

include 'common.php';


if (isset($_REQUEST["action"])) {
    switch ($_REQUEST["action"]) {
        
        case "load":
            $page = (isset($_REQUEST["page"]) ? intval($_REQUEST["page"]) : 1);
            $limit = (!isset($_REQUEST["rp"]) ? 0 : intval($_REQUEST["rp"]));
            $offset = Utils::GetPageOffset($page, $limit);
            $sortname = filter_input(INPUT_POST, "sortname");
            $sortorder = filter_input(INPUT_POST, "sortorder");
            switch ($sortname) {
                case "PrezzoAttuale":
                    $sortname = "si.Canone";
                    break;
                case "Inquilino":
                    $sortname = "CONCAT(i.Nome,' ',i.Cognome)";
                    break;
                case "Eta":
                    $sortname = "getAge(i.DataNascita)";
                    break;
                case "Admin":
                    $sortname = "u.Username";
                    break;
            }
            $count = 0;
            $records = Appartamento_Stanza::LoadSommario(TRUE, $limit, $offset, $count, trim($sortname . " " . $sortorder));
            for ($i = 0; $i < count($records); $i++) {
                $appartamento = new Appartamento($records[$i]["IdAppartamento"]);
                $records[$i]["Indirizzo"] = '<a href="appartamenti.php?Id=' . $appartamento->Id . '">' . htmlentities($appartamento->Indirizzo . ($appartamento->Civico ? ", " . $appartamento->Civico : ""), ENT_QUOTES, 'UTF-8') . '</a>';
                $records[$i]["Numero"] = '<a href="stanze.php?Id=' . $records[$i]["Id"] . '">' . htmlentities($records[$i]["Numero"], ENT_QUOTES, 'UTF-8') . '</a>';
                $inquilini = Inquilino_Stanza::LoadUltimoInquilino($records[$i]["Id"], FALSE);
                $now = mktime();
                $inquilino = new Inquilino();
                $inquilino_stanza = new Inquilino_Stanza();
                if (count($inquilini) > 0 && /*Utils::GetTimestamp($inquilini[0]->DataInizio) <= $now &&*/ (!$inquilini[0]->DataFine || Utils::GetTimestamp($inquilini[0]->DataFine) > $now)) {
                    $inquilino_stanza = $inquilini[0];
                    $inquilino = new Inquilino($inquilino_stanza->IdInquilino);
                }
                $admin = new AdminAccount($inquilino->IdAdmin);
                if ($admin->Id < 1)
                    $admin = new AdminAccount($records[$i]["IdAdmin"]);
                $records[$i]["PrezzoAttuale"] = $inquilino_stanza->Id < 1 ? "" : strval($inquilino_stanza->Canone);
                $records[$i]["Inquilino"] = $inquilino->Id < 1 ? '<a href="javascript:editStanza(' . $records[$i]["Id"] . ')">[Libera]</a>' : '<a href="inquilini.php?Id=' . $inquilino->Id . '">' . htmlentities(trim($inquilino->Nome . " " . $inquilino->Cognome), ENT_QUOTES, 'UTF-8') . '</a>';
                $records[$i]["Eta"] = $inquilino->Id < 1 ? "" : Utils::GetAge($inquilino->DataNascita);
                $records[$i]["Professione"] = $inquilino->Id < 1 ? "" : getProfessione($inquilino->Professione);
                $records[$i]["DataInizio"] = $inquilino->Id < 1 ? "" : date("d/m/Y", Utils::GetTimestamp($inquilino_stanza->DataInizio));
                $records[$i]["DataFine"] = $inquilino->Id < 1 ? "" : ($inquilino_stanza->DataFine ? date("d/m/Y", Utils::GetTimestamp($inquilino_stanza->DataFine)) : "N.D.");
                //$records[$i]["DataFine"] = $inquilino->Id < 1 ? "" : $inquilino_stanza->DataFine;
                $records[$i]["Admin"] = htmlentities($admin->Username, ENT_QUOTES, 'UTF-8');
            }
            Utils::PrintJson(Utils::JsonEncodeFlexigridMessage($records, $count, $page));
            break;
    }
}

$smarty->display('stanze_sommario.tpl');
