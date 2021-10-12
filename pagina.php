<?php

include 'common.php';

if (!isset($_REQUEST["pagina"]))
    Utils::RedirectTo("index.php");

switch ($_REQUEST["pagina"]) {
    case "chisiamo":
        $filePath = array(
            "it" => UPLOAD . "chisiamo-it.html",
            "en" => UPLOAD . "chisiamo-en.html"
        );
        $title = "Chi Siamo";
        break;

    case "cosafacciamo":
        $filePath = array(
            "it" => UPLOAD . "cosafacciamo-it.html",
            "en" => UPLOAD . "cosafacciamo-en.html"
        );
        $title = "Cosa Facciamo";
        break;
    case "polimi":
        $filePath = array(
            "it" => UPLOAD . "polimi-it.html",
            "en" => UPLOAD . "polimi-en.html"
        );
        $title = "Politecnico";
        break;
    case "unicatt":
        $filePath = array(
            "it" => UPLOAD . "unicatt-it.html",
            "en" => UPLOAD . "unicatt-en.html"
        );
        $title = "Università Cattolica";
        break;
    case "24orebs":
        $filePath = array(
            "it" => UPLOAD . "24orebs-it.html",
            "en" => UPLOAD . "24orebs-en.html"
        );
        $title = "24 ore business school";
        break;
    case "iulm":
        $filePath = array(
            "it" => UPLOAD . "iulm-it.html",
            "en" => UPLOAD . "iulm-en.html",
        );
        break;
    case "bocconi":
        $filePath = array(
            "it" => UPLOAD . "bocconi-it.html",
            "en" => UPLOAD . "bocconi-en.html"
        );
        $title = "Bocconi";
        break;
    case "offertespeciali":
        $filePath = array(
            "it" => UPLOAD . "offertespeciali-it.html",
            "en" => UPLOAD . "offertespeciali-en.html"
        );
        $title = "Offerte speciali";
        break;
    
    case "landlordAd":
        $filePath = array(
            "it" => UPLOAD . "gestione_Immobili-it.html",
            "en" => UPLOAD . "gestione_Immobili-en.html"
        );
        $title = "Annuncio proprietario";
        break;

    case "privacy":
        $filePath = array(
            "it" => UPLOAD . "privacy-it.html",
            "en" => UPLOAD . "privacy-en.html"
        );
        $title = "Privacy";
        break;

    case "sitemap":
        $filePath = array(
            "it" => UPLOAD . "sitemap-it.html",
            "en" => UPLOAD . "sitemap-en.html"
        );
        $title = "Site Map";
        break;

    case "contatti":
        $filePath = array(
            "it" => UPLOAD . "contatti-it.html",
            "en" => UPLOAD . "contatti-en.html"
        );
        $title = "Contatti";
        break;
    case "convenzioni":
        $filePath = array(
            "it" => UPLOAD . "convenzioni-it.html",
            "en" => UPLOAD . "convenzioni-en.html"
        );
        $title = "Convenzioni";
        break;
    case "dicono-di-noi":
        $filePath = array(
            "it" => UPLOAD . "dicono-di-noi-it.html",
            "en" => UPLOAD . "dicono-di-noi-en.html"
        );
        $title = "Dicono di noi";
        break;
    case "investitori":
        $filePath = array(
            "it" => UPLOAD . "investitori-it.html",
            "en" => UPLOAD . "investitori-en.html"
        );
        $title = "Investitori";
        break;
    case "agenzie":
        $filePath = array(
            "it" => UPLOAD . "agenzie-it.html",
            "en" => UPLOAD . "agenzie-en.html"
        );
        $title = "Agenzie";
        break;
    case "citywire":
        $filePath = array(
            "it" => UPLOAD . "citywire-it.html",
            "en" => UPLOAD . "citywire-en.html"
        );
        $title = "CityWire";
        break;
    case "cookies-policy":
        $filePath = array(
            "it" => UPLOAD . "cookies-policy-it.html",
            "en" => UPLOAD . "cookies-policy-en.html"
        );
        $title = "Cookies Policy";
        break;
    case "informativasito":
        $filePath = array(
            "it" => UPLOAD . "informativasito-it.html",
            "en" => UPLOAD . "informativasito-en.html"
        );
        $title = "Informativa Sito";
        break;
    case "termsofuse":
        $filePath = array(
            "it" => UPLOAD . "termsofuse-it.html",
            "en" => UPLOAD . "termsofuse-en.html"
        );
        $title = "Terms of use";
        break;
    case "informativacookies":
        $filePath = array(
            "it" => UPLOAD . "informativacookies-it.html",
            "en" => UPLOAD . "informativacookies-en.html"
        );
        $title = "Informativa Cookies";
        break;
    default:
        Utils::RedirectTo("index.php");
}

if (isset($_REQUEST["action"]) && $_REQUEST["action"] == "save") {
    checkPrivilege(PRIV_PAGE_EDIT);
    foreach ($LINGUE as $l) {
        $contenuto = (isset($_REQUEST["Contenuto-" . $l]) ? stripslashes($_REQUEST["Contenuto-" . $l]) : "");
        @file_put_contents($filePath[$l], $contenuto);
    }
    Utils::RedirectTo ("?pagina=" . urlencode(stripslashes($_REQUEST["pagina"])) . "&saved=1");
}

checkPrivilege(PRIV_PAGE_VIEW);

// Carica i contenuti
$contenuto = array();
foreach ($LINGUE as $l) {
    $contenuto[$l] = "";
    if (file_exists($filePath[$l]))
        $contenuto[$l] = file_get_contents ($filePath[$l]);
}

if (filter_input(INPUT_GET, "saved") === "1")
    $smarty->assign("saved", TRUE);

$smarty->assign("LINGUE", $LINGUE);
$smarty->assign("LINGUE_TEXT", $LINGUE_TEXT);
$smarty->assign("canEdit", $AdminLogged->CanAccess(PRIV_PAGE_EDIT));
$smarty->assign("title", $title);
$smarty->assign("contenuto", $contenuto);
$smarty->display('pagina.tpl');
