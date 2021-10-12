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
                case "Inquilino":
                    $sortname = "CONCAT(i.Nome,' ',i.Cognome)";
                    break;
                case "Eta":
                    $sortname = "getAge(i.DataNascita)";
                    break;
            }
            $count = 0;
            $records = Appartamento_PostoAuto::LoadSommario($limit, $offset, $count, trim($sortname . " " . $sortorder));
            for ($i = 0; $i < count($records); $i++) {
                $appartamento = new Appartamento($records[$i]["IdAppartamento"]);
                $records[$i]["Indirizzo"] = '<a href="appartamenti.php?Id=' . $appartamento->Id . '">' . htmlentities($appartamento->Indirizzo . ($appartamento->Civico ? ", " . $appartamento->Civico : ""), ENT_QUOTES, 'UTF-8') . '</a>';
                $records[$i]["Numero"] = '<a href="postiauto.php?Id=' . $records[$i]["Id"] . '">' . htmlentities($records[$i]["Numero"], ENT_QUOTES, 'UTF-8') . '</a>';
                $records[$i]["Posto"] = getPostoAuto($records[$i]["Posto"]);
                $records[$i]["Tipo"] = getTipoPostoAuto($records[$i]["Tipo"]);
                $inquilini = Inquilino_PostoAuto::LoadUltimoInquilino($records[$i]["Id"]);
                $now = mktime();
                $inquilino = new Inquilino();
                $inquilino_stanza = new Inquilino_PostoAuto();
                if (count($inquilini) > 0 && Utils::GetTimestamp($inquilini[0]->DataInizio) <= $now && (!$inquilini[0]->DataFine || Utils::GetTimestamp($inquilini[0]->DataFine) > $now)) {
                    $inquilino_stanza = $inquilini[0];
                    $inquilino = new Inquilino($inquilino_stanza->IdInquilino);
                }
                $records[$i]["Inquilino"] = $inquilino->Id < 1 ? '[Libero]' : '<a href="inquilini.php?Id=' . $inquilino->Id . '">' . htmlentities(trim($inquilino->Nome . " " . $inquilino->Cognome), ENT_QUOTES, 'UTF-8') . '</a>';
                $records[$i]["Eta"] = $inquilino->Id < 1 ? "" : Utils::GetAge($inquilino->DataNascita);
                $records[$i]["Professione"] = $inquilino->Id < 1 ? "" : getProfessione($inquilino->Professione);
                $records[$i]["DataInizio"] = $inquilino->Id < 1 ? "" : date("d/m/Y", Utils::GetTimestamp($inquilino_stanza->DataInizio));
                $records[$i]["DataFine"] = $inquilino->Id < 1 ? "" : date("d/m/Y", Utils::GetTimestamp($inquilino_stanza->DataFine));
            }
            Utils::PrintJson(Utils::JsonEncodeFlexigridMessage($records, $count, $page));
            break;
    }
}

$smarty->display('postiauto_sommario.tpl');
