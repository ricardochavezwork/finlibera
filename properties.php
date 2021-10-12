<?php

$page_title = "Proprietà";
$url_section = "_gestione/properties";
$sections = array(
    array("/#/dashboard/", "Dashboard"),
    array("/#/main/", "Proprietà"),
    array("/#/owners-agencies/", "Proprietari e Agenzie"),
);

include 'header.php';

$input = $_REQUEST["data"];

if(isset($_REQUEST["action"])){
    switch ($_REQUEST["action"]){
        case "search" :
            $res = new stdClass();
            $res->Success = false;
            $res->Data = array();
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $input = $decode;

            $filtro = $input->Filtro ? $input->Filtro : null;

            if($filtro){
                $pagination = ($filtro->Pagination ? $filtro->Pagination : null);
                $page = ($pagination->CurrentPage ? $pagination->CurrentPage : 1);
                $limit = ($pagination->LimitRows ? $pagination->LimitRows : 100);
                $offset = Utils::GetPageOffset($page, $limit);
                $count = 0;
                $order = ($pagination->OrderBy ? $pagination->OrderBy : "DataInizioLocazione DESC");
                $res->Data = Appartamento::SearchGestV2($filtro, $order, $limit, $offset, $count);
                $res->TotalPages = Utils::GetPagesCount($count, $limit);
                $res->TotalRows = $count;
            }

            Utils::PrintJson($res, true);
            break;
        case "loadStoricoAcquisizioniByYear":
            $res = new stdClass();
            $res->Data = Appartamento::LoadStoricoAcquisizioniByYear();

            Utils::PrintJson($res, true);
            break;
        case "loadStoricoAcquisizioniByMonth":
            $res = new stdClass();
            $res->Data = Appartamento::LoadStoricoAcquisizioniByMonth();

            Utils::PrintJson($res, true);
            break;
        case "search-owner-agency":
            $res = new stdClass();
            $res->Success = false;
            $res->Data = array();
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $input = $decode;

            $filtro = $input->Filtro ? $input->Filtro : null;

            if($filtro){
                $pagination = ($filtro->Pagination ? $filtro->Pagination : null);
                $page = ($pagination->CurrentPage ? $pagination->CurrentPage : 1);
                $limit = ($pagination->LimitRows ? $pagination->LimitRows : 100);
                $offset = Utils::GetPageOffset($page, $limit);
                $count = 0;
                $order = ($pagination->OrderBy ? $pagination->OrderBy : "DataRegistrazione DESC");
                $res->Data = Appartamento_Proprietario_Agenzia::Search($filtro, $order, $limit, $offset, $count);
                $res->TotalPages = Utils::GetPagesCount($count, $limit);
                $res->TotalRows = $count;
            }

            Utils::PrintJson($res, true);
            break;
        case "load-prop-owner-agency":
            $res = new stdClass();
            $res->apts = array();
            $res->rel = array();

            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $input = $decode;

            $owner_agency = $input;

            if(intval($owner_agency->Id) > 0){
                
                $searchResults = Appartamento_Proprietario_Agenzia::CustomSearch($owner_agency->Id);

                if(count($searchResults->rel) > 0)
                    $res->rel = $searchResults->rel;

                if(count($searchResults->apts) > 0)
                    $res->apts = $searchResults->apts;
            }

            Utils::PrintJson($res, true);
            break;
        case "save":
            $res = new stdClass();
            $res->success = false;

            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $input = $decode;

            $isActive = $input->isActive;
            $apt = $input->item;
            $owAg = $input->owAg;

            $apt_owAg = new Appartamento_Proprietario_Agenzia();
            $apt_owAg->IdAppartamento = $apt->Id;
            $apt_owAg->IdProprietarioAgenzia = $owAg->Id;

            if($isActive){
                //remove
                if($apt_owAg->Delete()){
                    $res->success = true;
                }
            }else{
                //add
                if($apt_owAg->Save()){
                    $res->success = true;
                }
            }
            
            Utils::PrintJson($res, true);
            break;
    }
}

?>
<link rel="stylesheet" href="<?php echo URL_ROOT ?>_gestione/content/properties/css/style.css?version=2.1"/>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js" async defer></script>
<script src="<?php URL_HOST ?>/_gestione/content/properties/js/dashboard.js?version=1.2"></script>
<script src="<?php URL_HOST ?>/_gestione/content/properties/js/properties.js?version=1.6"></script>
<script src="<?php URL_HOST ?>/_gestione/content/properties/js/owner_agency.js?version=1.7"></script>
<script src="<?php URL_HOST ?>/_gestione/content/properties/js/init.js?version=1.4"></script>
<?php 

include 'footer.php';

?>