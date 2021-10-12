{assign var=pageTitle value="Gestione sito"}
{include file="header.tpl"}

<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">

<p>
    Benvenuto nell'area amministrativa di <strong>MilanoStanze</strong>
</p>

<p>
    <strong>Ultima generazione homepage:</strong> {if $staticHomepage}{$staticHomepage}{else}Mai{/if} <a href="?action=static_page">[Genera ora]</a>
</p>

<div class="divider" style="width: 100%; height: 40px;"></div>

<div class="tools" style="
    background-color: #F9F9F9;
    padding: 20px;
    width: 100%;
    height: 280px;
    position: relative;
    display: block;
"><div class="title-tools" style="
    position: relative;
    width: 100%;
    height: auto;
    color: #464c59;
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 15px;
    float: left;
    ">Scorciatoie</div><div class="tools-elements" style="
    width: 100%;
    height: 100%;
    float: left;
    position: relative;
"><div class="tools-tool" style="
    width: 20%;
    background: #fff;
    height: auto;
    cursor: pointer;
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    box-sizing: border-box;
    border-bottom: 1px solid #e6e8ec;
    float: left;
    display: block;
"><a href="https://docs.google.com/a/milanostanze.it/spreadsheets/d/1ceKW11BnuG0M50FL8JsLSfMCxQrD0mtGvv3kSRTNskM/edit?usp=sharing" target="_blank"><div class="tool-top" style="
    width: 100%;
    height: auto;
    position: relative;
    float: left;
"><i class="material-icons" style="font-size: 139px;margin-left: 25px;color: #0f9d58;">dashboard</i></div><div class="tool-bottom" style="
    position: relative;
    width: 100%;
    height: 35px;
    float: left;
    display: block;
"><img class="a-Ua-c" src="//ssl.gstatic.com/docs/doclist/images/mediatype/icon_1_spreadsheet_x16.png" alt="Fogli Google" style="
    width: auto;
    height: auto;
    position: relative;
    float: left;
    margin: 12px;
"><div style="
    width: auto;
    height: auto;
    position: relative;
    float: left;
    margin: 8px;
    ">TICKETS</div></div></a></div><div class="tools-tool" style="
    width: 20%;
    background: #fff;
    height: auto;
    cursor: pointer;
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    box-sizing: border-box;
    border-bottom: 1px solid #e6e8ec;
    float: left;
    display: block;
    margin-left: 20px;
"><a href="https://docs.google.com/spreadsheets/d/1KOItHHSdRZlMoA9dELtFhMgPL0yt9hCkfmHpSxrn1Cg/edit?invite=CKPAj5cI&amp;ts=596f6955#gid=0" target="_blank"><div class="tool-top" style="
    width: 100%;
    height: auto;
    position: relative;
    float: left;
"><i class="material-icons" style="
    font-size: 139px;
    margin-left: 25px;
    color: #0f9d58;
">perm_contact_calendar</i></div><div class="tool-bottom" style="
    position: relative;
    width: 100%;
    height: 35px;
    float: left;
    display: block;
"><img class="a-Ua-c" src="//ssl.gstatic.com/docs/doclist/images/mediatype/icon_1_spreadsheet_x16.png" alt="Fogli Google" style="
    width: auto;
    height: auto;
    position: relative;
    float: left;
    margin: 12px;
"><div style="
    width: auto;
    height: auto;
    position: relative;
    float: left;
    margin: 8px;
    ">Calendario Finlibera</div></div></a></div><div class="tools-tool" style="
    width: 20%;
    background: #fff;
    height: auto;
    cursor: pointer;
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    box-sizing: border-box;
    border-bottom: 1px solid #e6e8ec;
    float: left;
    display: block;
    margin-left: 20px;
"><a href="http://www.milanostanze.it/_gestione/listino.partners.php" target="_blank"><div class="tool-top" style="
    width: 100%;
    height: auto;
    position: relative;
    float: left;
"><i class="material-icons" style="font-size: 139px;margin-left: 25px;color: #0f9d58;">dashboard</i></div><div class="tool-bottom" style="
    position: relative;
    width: 100%;
    height: 35px;
    float: left;
    display: block;
"><img class="a-Ua-c" src="//ssl.gstatic.com/docs/doclist/images/mediatype/icon_1_spreadsheet_x16.png" alt="Fogli Google" style="
    width: auto;
    height: auto;
    position: relative;
    float: left;
    margin: 12px;
"><div style="
    width: auto;
    height: auto;
    position: relative;
    float: left;
    margin: 8px;
    ">Listino Partners</div></div></a></div></div></div>

{include file="footer.tpl"}