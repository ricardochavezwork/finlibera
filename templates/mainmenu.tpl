<div class="header navbar navbar-default navbar-static-top no-scrolling-fixed">
    <div class="container">
        <div class="navbar-header">
            <!-- BEGIN RESPONSIVE MENU TOGGLER -->
            <button class="navbar-toggle btn navbar-btn" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <!-- END RESPONSIVE MENU TOGGLER -->
            <!-- BEGIN LOGO (you can use logo image instead of text)-->
            <a class="navbar-brand logo-v1" href="{$smarty.const.URL_ROOT}">
                <img {if $site_language == "it"} src="{$smarty.const.URL_ROOT}images/logo_milanostanze3_ita.png" {/if} {if $site_language == "en"} src="{$smarty.const.URL_ROOT}images/logo_milanostanze3_en.png" {/if} height="110px" id="logoimg" alt="">
                {*<span>{#title#}</span>*}
            </a>
            <!-- END LOGO -->
        </div>

        <!-- BEGIN TOP NAVIGATION MENU -->
        <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
            {*if ($adminAccount['Id'] > 0)}
                <li><a href="#" style="cursor: default; border-top-color: #FFFFFF; color: #000000;">Ciao, {htmlentities($adminAccount['Username'], $smarty.const.ENT_QUOTES, 'UTF-8')}</a></li>
            {/if*}
                <li class="{if $menuActive == 'home'}active{/if}"><a href="index.php">Home</a></li>
        {if ($adminAccount['Id'] > 0)}
                <li class="dropdown {if $menuActive == 'admin'}active{/if}">
                    <a class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="0" data-close-others="false" href="#">
                        Admin
                        <i class="fa fa-angle-down"></i>
                    </a>
                    <ul class="dropdown-menu">
                        {if canAccess($smarty.const.PRIV_ADMINACC_VIEW)}<li {if $menuSubActive == 'adminaccount'}class="active"{/if}><a href="adminaccount.php">{#menu_adminaccount#}</a></li>{/if}
                        {if canAccess($smarty.const.PRIV_APT_VIEW)}<li {if $menuSubActive == 'appartamenti'}class="active"{/if}><a href="properties/">{#menu_properties#}</a></li>{/if}
                        {if canAccess($smarty.const.PRIV_INQUILINI_VIEW)}<li {if $menuSubActive == 'inquilini'}class="active"{/if}><a href="clientsManager.php">{#menu_inquilini#}</a><a href="gestione_pagamenti.php" style="display:  flex;justify-content: center;"> - {#menu_inquilini_gestione_pagamenti#}</a><a href="conteggi_chiusura.php" style="display:  flex;justify-content: center;"> - {#menu_inquilini_conteggi_chiusura#}</a></li>{/if}
                        {if (canAccess($smarty.const.PRIV_TRANSAZIONI_CONTABILE) OR canAccess($smarty.const.PRIV_TRANSAZIONI_DATAENTRY) OR canAccess($smarty.const.PRIV_TRANSAZIONI_COMMERCIALISTA))}<li {if $menuSubActive == 'transactions'}class="active"{/if}><a href="transactions.php">{#menu_movimenti#}</a></li>{/if}
                        {if canAccess($smarty.const.PRIV_FATTURAZIONE_VIEW)}<li {if $menuSubActive == 'fatture'}class="active"{/if}><a href="invoices/#/fatture-attive/">{#menu_fatture#}</a></li>{/if}
                        {if canAccess($smarty.const.PRIV_STANZE_BOOKING)}<li {if $menuSubActive == 'booking'}class="active"{/if}><a href="booking.php">{#menu_booking#}</a></li>{/if}
                        {if canAccess($smarty.const.PRIV_POSTIAUTO_VIEW)}<li {if $menuSubActive == 'postiauto'}class="active"{/if}><a href="postiauto_sommario.php">{#menu_postiauto#}</a></li>{/if}
                        {if canAccess($smarty.const.PRIV_ZONE_VIEW)}<li {if $menuSubActive == 'zone'}class="active"{/if}><a href="zone.php">{#menu_zone#}</a></li>{/if}
                        {if canAccess($smarty.const.PRIV_RICHIEDENTI_VIEW)}<li {if $menuSubActive == 'richiedenti'}class="active"{/if}><a href="richiedenti.php">{#menu_richiedenti#}</a></li>{/if}
                        {if canAccess($smarty.const.PRIV_TRANSAZIONI_CONTABILE)}<li {if $menuSubActive == 'notificationsCenter'} class="active"{/if}><a href="notificationsCenter.php">{#menu_centroNotifiche#}</a></li>{/if}
                        <li><a href="../?invisible=1">Anteprima sito con tutte le stanze</a></li>
                    </ul>
                </li>
                {if canAccess($smarty.const.PRIV_PAGE_VIEW)}<li class="dropdown {if $menuActive == 'pagine'}active{/if}">
                    <a class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="0" data-close-others="false" href="#">
                        {#menu_pagine#}
                        <i class="fa fa-angle-down"></i>
                    </a>
                    <ul class="dropdown-menu">
                        <li {if $menuSubActive == 'chisiamo'}class="active"{/if}><a href="pagina.php?pagina=chisiamo">{#menu_pagine_chisiamo#}</a></li>
                        <li {if $menuSubActive == 'cosafacciamo'}class="active"{/if}><a href="pagina.php?pagina=cosafacciamo">{#menu_pagine_cosafacciamo#}</a></li>
                        <li {if $menuSubActive == 'offertespeciali'}class="active"{/if}><a href="pagina.php?pagina=offertespeciali">{#menu_pagine_offertespeciali#}</a></li>
                        <li {if $menuSubActive == 'landlordAd'}class="active"{/if}><a href="pagina.php?pagina=landlordAd">{#menu_pagine_landlordAd#}</a></li>
                        <li {if $menuSubActive == 'privacy'}class="active"{/if}><a href="pagina.php?pagina=privacy">{#menu_pagine_privacy#}</a></li>
                        <li {if $menuSubActive == 'sitemap'}class="active"{/if}><a href="pagina.php?pagina=sitemap">{#menu_pagine_sitemap#}</a></li>
                        <li {if $menuSubActive == 'contatti'}class="active"{/if}><a href="pagina.php?pagina=contatti">{#menu_pagine_contatti#}</a></li>
                        <li {if $menuSubActive == 'convenzioni'}class="active"{/if}><a href="pagina.php?pagina=convenzioni">{#menu_convenzioni#}</a></li>
                        <li {if $menuSubActive == 'dicono-di-noi'}class="active"{/if}><a href="pagina.php?pagina=dicono-di-noi">{#menu_dicono_di_noi#}</a></li>
                        <li {if $menuSubActive == 'investitori'}class="active"{/if}><a href="pagina.php?pagina=investitori">{#menu_investitori#}</a></li>
                        <li {if $menuSubActive == 'agenzie'}class="active"{/if}><a href="pagina.php?pagina=agenzie">{#menu_agenzie#}</a></li>
                        <li {if $menuSubActive == 'polimi'}class="active"{/if}><a href="pagina.php?pagina=polimi">{#menu_pagine_polimi#}</a></li>
                        <li {if $menuSubActive == 'unicatt'}class="active"{/if}><a href="pagina.php?pagina=unicatt">{#menu_pagine_unicat#}</a></li>
                        <li {if $menuSubActive == '24orebs'}class="active"{/if}><a href="pagina.php?pagina=24orebs">{#menu_pagine_24ore#}</a></li>
                        <li {if $menuSubActive == 'bocconi'}class="active"{/if}><a href="pagina.php?pagina=bocconi">{#menu_pagine_bocconi#}</a></li>
                        <li {if $menuSubActive == 'iulm'}class="active"{/if}><a href="pagina.php?pagina=iulm">{#menu_pagine_iulm#}</a></li>
                        <li {if $menuSubActive == 'cookies-policy'}class="active"{/if}><a href="pagina.php?pagina=cookies-policy">{#menu_cookies#}</a></li>
                        <li {if $menuSubActive == 'informativasito'}class="active"{/if}><a href="pagina.php?pagina=informativasito">{#menu_informativasito#}</a></li>
                        <li {if $menuSubActive == 'termsofuse'}class="active"{/if}><a href="pagina.php?pagina=termsofuse">{#menu_termsofuse#}</a></li>
                        <li {if $menuSubActive == 'informativacookies'}class="active"{/if}><a href="pagina.php?pagina=informativacookies">{#menu_informativacookies#}</a></li>
                    </ul>
                </li>{/if}
                {*<li class="dropdown {if $menuActive == 'bo'}active{/if}">
                    <a class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="0" data-close-others="false" href="#">
                        BackOffice
                        <i class="fa fa-angle-down"></i>
                    </a>
                    <ul class="dropdown-menu">
                        {if canAccess($smarty.const.PRIV_TRANSAZIONI_VIEW)}<li {if $menuSubActive == 'transazioni'}class="active"{/if}><a href="transazioni.php">{#menu_transazioni#}</a></li>{/if}
                    </ul>
                </li>*}
                <li><a href="login/?action=logout" title="Disconnetti {htmlentities($adminAccount['Username'], $smarty.const.ENT_QUOTES, 'UTF-8')}">Logout</a></li>
        {/if}
            </ul>
        </div>
        <!-- BEGIN TOP NAVIGATION MENU -->
    </div>
</div>
