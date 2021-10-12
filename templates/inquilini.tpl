{assign var=pageTitle value={#admin_inquilini#}}
{assign var=menuActive value="admin"}
{assign var=menuSubActive value="inquilini"}
{if !isset($record)}
{assign var=breadcrumb value="<li class='active'>Inquilini</li>"}
{else}
{assign var=breadcrumb value="<li class='active'><a href='?'>Inquilini</a></li>"}
{/if}
{include file="header.tpl"}
<script src='{$smarty.const.URL_ROOT}_gestione/js/lib.js{$mobileV_js}'></script>

{if isset($error)}
    <div class="errore">{$error}</div>
{/if}
{if isset($saved)}
    <div class="conferma">I dati sono stati acquisiti correttamente</div>
{/if}

{if !isset($record)}
    
    <h3 id="section_title">Elenco Inquilini</h3>
    <div class="search">
        <form id="formSearch" action="{$smarty.const.PHP_SELF}" method="post" class="form">
            <div class="field">
                <label>Visualizza archivio</label><select name="Archivio">{html_options values=$archivio_values output=$archivio_output selected=$archivio}</select>
            </div>
            <div class="toolbar">
                <input type="submit" class="button" value="Applica filtro"/>
                {*<input type="button" class="button" value="Resetta filtro" onclick="this.form.reset(); $(this.form).submit();"/>*}
            </div>
        </form>
    </div>
    <table id="listRecords"></table>
    
    <script type="text/javascript">
        var canEdit = {if $canEdit}true{else}false{/if};
    {literal}
        $(document).ready(function() {
            $('#formSearch').submit(function (){
                $('#listRecords').flexOptions({newp: 1}).flexReload();
                return false;
            });
            refreshRecords();
        });
        
        function refreshRecords() {
            toggleBusy(true);
            $("#listRecords").flexigrid({
                allowSelection: false,
                showToggleBtn: false,
                height : 'auto',
                url: '?action=load',
                dataType: 'json',
                colModel : [
                    {display: '', name : 'CellActions', width: 160, sortable : false, align: 'right'},
                    {display: 'Id', name : 'Id', hide: true},
                    {display: 'Nome', name : 'Nome', width: 75, sortable : false},
                    {display: 'Cognome', name : 'Cognome', width: 75, sortable : false},
                    {display: 'Sesso', name : 'Sesso', width: 40, sortable : false},
                    {display: 'Et&agrave;', name : 'Eta', width: 30, sortable : false},
                    {display: 'Ente', name : 'Ente', width : 110, sortable : false},
                    {display: 'Email', name : 'Email', width : 200, sortable : false},
                    {display: 'Telefono', name : 'Telefono', width : 80, sortable : false},
                    {display: 'LdN', name : 'LuogoNascita', width : 35, sortable : false},
                    {display: 'Codice Fiscale', name : 'CodiceFiscale', width : 100, sortable : false}
                ],
                usepager: true,
                useRp: true,
                rpOptions: [50, 100, 200, 250],
                rp: DEFAULT_LIST_LIMIT,
                onSubmit: addFormData,
                onSuccess: function() { $("#listRecords .button").button(); },
                buttons : [
                    {name: 'Nuovo Inquilino', bclass: 'add', onpress : function() { if (!canEdit) noPrivilege(); else window.location = "?Id=0"; }}
                ]
            });
        }
        function deleteRecord(id) {
            confirmDelete(function(id) {
                toggleBusy(true);
                window.location = "?action=delete&Id=" + id + "&Archivio=" + $("#formSearch select[name=Archivio]").val();
            }, id);
        }
        function addFormData(){
            toggleBusy(false);
            var dt = $('#formSearch').serializeArray();
            $("#listRecords").flexOptions({params: dt});
            return true;
        }
    </script>
    {/literal}
    
{else}
    
    <form id="formEdit" method="post" class="form" action="{$smarty.const.PHP_SELF}">
        <input type="hidden" name="action" value="save"/>
        <input type="hidden" name="Id" value="{$record['Id']}"/>
        <input type="hidden" name="LuogoNascita" value="{htmlentities($record['LuogoNascita'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        {if isset($archivio)}<input type="hidden" name="Archivio" value="{$archivio}"/>{/if}
        
        {if $record['Id'] > 0}
        <div class="field">
            <label>Id</label><strong>{$record['Id']}</strong>
        </div>
        {/if}
        <div class="field">
            <label>Operatore/Admin</label><select name="IdAdmin">{html_options values=$admin_values output=$admin_output selected=$record['IdAdmin']}</select>
        </div>
        <div class="field">
            <label>Nome*</label><input type="text" name="Nome" value="{htmlentities($record['Nome'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Cognome*</label><input type="text" name="Cognome" value="{htmlentities($record['Cognome'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Sesso*</label><select name="Sesso">{html_options values=$sesso_values output=$sesso_output selected=$record['Sesso']}</select>
        </div>
        <div class="field">
            <label>Data nascita*</label>{html_select_date month_empty="N.D." day_empty="N.D." year_empty="N.D." time=$record['DataNascita'] start_year="1900" reverse_years="true" prefix="DataNascita_" month_extra="class='month'" day_extra="class='day'" year_extra="class='year'" day_value_format="%02d"}
        </div>
        <div class="field">
            <label>Professione*</label><select name="Professione">{html_options values=$professione_values output=$professione_output selected=$record['Professione']}</select>
        </div>
        <div class="field">
            <label>Specializzazione*</label><input type="text" maxlength="15" name="Specializzazione" value="{htmlentities($record['Specializzazione'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Ente*</label><input type="text" name="Ente" value="{htmlentities($record['Ente'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Email*</label><input type="text" name="Email" value="{htmlentities($record['Email'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Telefono*</label><input type="text" name="Telefono" value="{htmlentities($record['Telefono'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Indirizzo*</label><input type="text" name="Indirizzo" value="{htmlentities($record['Indirizzo'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Civico*</label><input type="text" name="Civico" value="{htmlentities($record['Civico'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Citta'*</label><input type="text" name="Citta" value="{htmlentities($record['Citta'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>CAP*</label><input type="text" name="CAP" value="{htmlentities($record['CAP'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Luogo di nascita'*</label><input type="text" name="LuogoNascita_nome" value="{htmlentities($luogoNascita, $smarty.const.ENT_QUOTES, 'UTF-8')}"/>
        </div>
        <div class="field">
            <label>Codice Fiscale*</label><input type="text" name="CodiceFiscale" value="{htmlentities($record['CodiceFiscale'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Note</label><input type="text" name="Note" value="{htmlentities($record['Note'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <br/>
        <h3 id="section_title">APPARTAMENTI/STANZE {if $canEdit}<a href="#" onclick="editStanza(0); return false;"><img src="{$smarty.const.URL_ROOT}images/add.png" align="absmiddle" hspace="5" style="margin-left: 20px;"/>Aggiungi</a>{/if}</h3>
        <div class="field">
            <div id="listStanze">
            {if count($stanze) > 0}
                {foreach $stanze as $stanza}
                    <div class="stanza" id="stanza{$stanza['Id']}">
                        <input type="hidden" name="stanze_Id[]" value="{$stanza['Id']}"/>
                        <input type="hidden" name="stanze_IdStanza[]" value="{$stanza['IdStanza']}"/>
                        <input type="hidden" name="stanze_Appartamento[]" value="{htmlentities($stanza['Appartamento'], $smarty.const.ENT_QUOTES, 'UTF-8')}"/>
                        <input type="hidden" name="stanze_Stanza[]" value="{htmlentities($stanza['Stanza'], $smarty.const.ENT_QUOTES, 'UTF-8')}"/>
                        <input type="hidden" name="stanze_DataFirma[]" value="{htmlentities($stanza['DataFirma'], $smarty.const.ENT_QUOTES, 'UTF-8')}"/>
                        <input type="hidden" name="stanze_DataInizio[]" value="{htmlentities($stanza['DataInizio'], $smarty.const.ENT_QUOTES, 'UTF-8')}"/>
                        <input type="hidden" name="stanze_DataFine[]" value="{htmlentities($stanza['DataFine'], $smarty.const.ENT_QUOTES, 'UTF-8')}"/>
                        <input type="hidden" name="stanze_Turistico[]" value="{htmlentities($stanza['Turistico'], $smarty.const.ENT_QUOTES, 'UTF-8')}"/>
                        <input type="hidden" name="stanze_PeriodoFatturazione[]" value="{htmlentities($stanza['PeriodoFatturazione'], $smarty.const.ENT_QUOTES, 'UTF-8')}"/>
                        <input type="hidden" name="stanze_Caparra[]" value="{$stanza['Caparra']}"/>
                        <input type="hidden" name="stanze_Canone[]" value="{$stanza['Canone']}"/>
                        <input type="hidden" name="stanze_Spese[]" value="{$stanza['Spese']}"/>
                        <input type="hidden" name="stanze_Cauzione[]" value="{$stanza['Cauzione']}"/>
                        <input type="hidden" name="stanze_NumeroFatture[]" value="{$stanza['NumeroFatture']}"/>
                        <input type="hidden" name="stanze_ConguaglioUtenze[]" value="{$stanza['ConguaglioUtenze']}"/>
                        <input type="hidden" name="stanze_ConguaglioSpese[]" value="{$stanza['ConguaglioSpese']}"/>
                        <input type="hidden" name="stanze_GiorniNonGoduti[]" value="{$stanza['GiorniNonGoduti']}"/>
                        <input type="hidden" name="stanze_Pulizie[]" value="{$stanza['Pulizie']}"/>
                        <input type="hidden" name="stanze_Note[]" value="{htmlentities($stanza['Note'], $smarty.const.ENT_QUOTES, 'UTF-8')}"/>
                        {if $canEdit}<input type="button" value="Elimina" class="button button_delete" onclick="deleteStanza({$stanza['Id']})"/>
                        <input type="button" value="Modifica" class="button" onclick="editStanza({$stanza['Id']})"/>{/if}
                        <span>{htmlentities($stanza['Appartamento'], $smarty.const.ENT_QUOTES, 'UTF-8')} {htmlentities($stanza['Stanza'], $smarty.const.ENT_QUOTES, 'UTF-8')} - dal {htmlentities($stanza['DataInizio'], $smarty.const.ENT_QUOTES, 'UTF-8')} al {htmlentities($stanza['DataFine'], $smarty.const.ENT_QUOTES, 'UTF-8')} - Caparra: {$stanza['Caparra']} - Canone: {$stanza['Canone']} - Spese: {$stanza['Spese']} - Cauzione: {$stanza['Cauzione']}<br/>Note: {htmlentities($stanza['Note'], $smarty.const.ENT_QUOTES, 'UTF-8')}</span>
                    </div>
                {/foreach}
            {/if}
               <span class="no-records">Nessuna stanza registrata</span>
            </div>
        </div>
        <br/>
        <h3 id="section_title">APPARTAMENTI/POSTI AUTO {if $canEdit}<a href="#" onclick="editPostoAuto(0); return false;"><img src="{$smarty.const.URL_ROOT}images/add.png" align="absmiddle" hspace="5" style="margin-left: 20px;"/>Aggiungi</a>{/if}</h3>
        <div class="field">
            <div id="listPostiAuto">
            {if count($postiauto) > 0}
                {foreach $postiauto as $postoauto}
                    <div class="postoauto" id="postoauto{$postoauto['Id']}">
                        <input type="hidden" name="postiauto_Id[]" value="{$postoauto['Id']}"/>
                        <input type="hidden" name="postiauto_IdPostoAuto[]" value="{$postoauto['IdPostoAuto']}"/>
                        <input type="hidden" name="postiauto_Appartamento[]" value="{htmlentities($postoauto['Appartamento'], $smarty.const.ENT_QUOTES, 'UTF-8')}"/>
                        <input type="hidden" name="postiauto_PostoAuto[]" value="{htmlentities($postoauto['PostoAuto'], $smarty.const.ENT_QUOTES, 'UTF-8')}"/>
                        <input type="hidden" name="postiauto_DataInizio[]" value="{htmlentities($postoauto['DataInizio'], $smarty.const.ENT_QUOTES, 'UTF-8')}"/>
                        <input type="hidden" name="postiauto_DataFine[]" value="{htmlentities($postoauto['DataFine'], $smarty.const.ENT_QUOTES, 'UTF-8')}"/>
                        <input type="hidden" name="postiauto_Caparra[]" value="{$postoauto['Caparra']}"/>
                        <input type="hidden" name="postiauto_Note[]" value="{htmlentities($postoauto['Note'], $smarty.const.ENT_QUOTES, 'UTF-8')}"/>
                        {if $canEdit}<input type="button" value="Elimina" class="button button_delete" onclick="deletePostoAuto({$postoauto['Id']})"/>
                        <input type="button" value="Modifica" class="button" onclick="editPostoAuto({$postoauto['Id']})"/>{/if}
                        <span>{htmlentities($postoauto['Appartamento'], $smarty.const.ENT_QUOTES, 'UTF-8')} {htmlentities($postoauto['PostoAuto'], $smarty.const.ENT_QUOTES, 'UTF-8')} - dal {htmlentities($postoauto['DataInizio'], $smarty.const.ENT_QUOTES, 'UTF-8')} al {htmlentities($postoauto['DataFine'], $smarty.const.ENT_QUOTES, 'UTF-8')}<br/>Note: {htmlentities($postoauto['Note'], $smarty.const.ENT_QUOTES, 'UTF-8')}</span>
                    </div>
                {/foreach}
            {/if}
               <span class="no-records">Nessun posto auto registrato</span>
            </div>
        </div>
        <br/>
        <div class="toolbar">
            {if $canEdit}<input type="submit" class="button" value="SALVA"/>{/if}
            <input type="button" class="button" value="RITORNA" onclick="window.location='{$smarty.const.PHP_SELF}{if isset($archivio)}?Archivio={$archivio}{/if}'"/>
        </div>
        
    </form>
        
    <form>
        <div id="tplStanza" class="hide">
            <div class="stanza" id="stanza__STANZA_ID__">
                <input type="hidden" name="stanze_Id[]" value="__STANZA_ID__"/>
                <input type="hidden" name="stanze_IdStanza[]" value="__STANZA_IDSTANZA__"/>
                <input type="hidden" name="stanze_Appartamento[]" value="__STANZA_APPARTAMENTO__"/>
                <input type="hidden" name="stanze_Stanza[]" value="__STANZA_STANZA__"/>
                <input type="hidden" name="stanze_DataFirma[]" value="__STANZA_DATAFIRMA__"/>
                <input type="hidden" name="stanze_DataInizio[]" value="__STANZA_DATAINIZIO__"/>
                <input type="hidden" name="stanze_DataFine[]" value="__STANZA_DATAFINE__"/>
                <input type="hidden" name="stanze_Turistico[]" value="__STANZA_TURISTICO__"/>
                <input type="hidden" name="stanze_PeriodoFatturazione[]" value="__STANZA_PERIODOFATTURAZIONE__"/>
                <input type="hidden" name="stanze_Caparra[]" value="__STANZA_CAPARRA__"/>
                <input type="hidden" name="stanze_Canone[]" value="__STANZA_CANONE__"/>
                <input type="hidden" name="stanze_Spese[]" value="__STANZA_SPESE__"/>
                <input type="hidden" name="stanze_Cauzione[]" value="__STANZA_CAUZIONE__"/>
                <input type="hidden" name="stanze_NumeroFatture[]" value="__STANZA_NUMEROFATTURE__"/>
                <input type="hidden" name="stanze_ConguaglioUtenze[]" value="__STANZA_CONGUAGLIOUTENZE__"/>
                <input type="hidden" name="stanze_ConguaglioSpese[]" value="__STANZA_CONGUAGLIOSPESE__"/>
                <input type="hidden" name="stanze_GiorniNonGoduti[]" value="__STANZA_GIORNINONGODUTI__"/>
                <input type="hidden" name="stanze_Pulizie[]" value="__STANZA_PULIZIE__"/>
                <input type="hidden" name="stanze_Note[]" value="__STANZA_NOTE__"/>
                <input type="button" value="Elimina" class="button button_delete" onclick="deleteStanza(__STANZA_ID__)"/>
                <input type="button" value="Modifica" class="button" onclick="editStanza(__STANZA_ID__)"/>
                <span>__STANZA_APPARTAMENTO__ __STANZA_STANZA__ - dal __STANZA_DATAINIZIO__ al __STANZA_DATAFINE__ - Caparra: __STANZA_CAPARRA__ - Canone: __STANZA_CANONE__ - Spese: __STANZA_SPESE__ - Cauzione: __STANZA_CAUZIONE__<br/>Note: __STANZA_NOTE__</span>
            </div>
        </div>
    </form>
    <div id="editStanza" class="hide" title="Stanza">
        <form class="form">
            <input type="hidden" name="Id"/>
            <p>
            <div class="field">
                <label>Appartamento</label><input type="text" name="Appartamento"/>
            </div>
            <div class="field">
                <label>Stanza</label><select name="Stanza"></select>
            </div>
            <div class="field">
                <label>Data stipulazione contratto</label>{html_select_date start_year="1900" end_year="+10" reverse_years="true" prefix="DataFirma_" month_extra="class='month'" day_extra="class='day'" year_extra="class='year'" day_value_format="%02d"}
            </div>
            <div class="field">
                <label>Data inizio</label>{html_select_date start_year="1900" end_year="+10" reverse_years="true" prefix="DataInizio_" month_extra="class='month'" day_extra="class='day'" year_extra="class='year'" day_value_format="%02d"}
            </div>
            <div class="field">
                <label>Data fine</label>{html_select_date month_empty="N.D." day_empty="N.D." year_empty="N.D." time="0" start_year="1900" end_year="+10" reverse_years="true" prefix="DataFine_" month_extra="class='month'" day_extra="class='day'" year_extra="class='year'" day_value_format="%02d"}
            </div>
            <div class="field">
                <label>Tipologia Contratto</label><select name="Turistico">{html_options values=$turistico_values output=$t_turistico}</select>
            </div>
            <div class="field">
                <label>Periodo Fatturazione Locazione</label><select name="PeriodoFatturazione">{html_options values=$periodoFatturazione_values output=$t_periodoFatturazione}</select>
            </div>
            <div class="field">
                <label>Caparra</label><input type="text" class="input_decimal" name="Caparra"/>
            </div>
            <div class="field">
                <label>Canone</label><input type="text" class="input_decimal" name="Canone"/>
            </div>
            <div class="field">
                <label>Spese</label><input type="text" class="input_decimal" name="Spese"/>
            </div>
            <div class="field">
                <label>Cauzione</label><input type="text" class="input_decimal" name="Cauzione"/>
            </div>
            <div class="field">
                <label>Numero Fatture</label><input type="text" class="input_numeric" name="NumeroFatture"/>
            </div>
            <div class="field">
                <label>Conguaglio Utenze</label><input type="text" class="input_decimal" name="ConguaglioUtenze"/>
            </div>
            <div class="field">
                <label>Conguaglio Spese</label><input type="text" class="input_decimal" name="ConguaglioSpese"/>
            </div>
            <div class="field">
                <label>Giorni non goduti</label><input type="text" class="input_numeric" name="GiorniNonGoduti"/>
            </div>
            <div class="field">
                <label>Pulizie di fine locazione</label><input type="checkbox" data-toggle="toggle" data-on="SI" data-off="NO" name="Pulizie"/>
            </div>
            <div class="field">
                <label>Note</label><input type="text" name="Note"/>
            </div>
            </p>
        </form>
    </div>
        
    <form>
        <div id="tplPostoAuto" class="hide">
            <div class="postoauto" id="postoauto__POSTOAUTO_ID__">
                <input type="hidden" name="postiauto_Id[]" value="__POSTOAUTO_ID__"/>
                <input type="hidden" name="postiauto_IdPostoAuto[]" value="__POSTOAUTO_IDPOSTOAUTO__"/>
                <input type="hidden" name="postiauto_Appartamento[]" value="__POSTOAUTO_APPARTAMENTO__"/>
                <input type="hidden" name="postiauto_PostoAuto[]" value="__POSTOAUTO_POSTOAUTO__"/>
                <input type="hidden" name="postiauto_DataInizio[]" value="__POSTOAUTO_DATAINIZIO__"/>
                <input type="hidden" name="postiauto_DataFine[]" value="__POSTOAUTO_DATAFINE__"/>
                <input type="hidden" name="postiauto_Note[]" value="__POSTOAUTO_NOTE__"/>
                <input type="button" value="Elimina" class="button button_delete" onclick="deleteStanza(__POSTOAUTO_ID__)"/>
                <input type="button" value="Modifica" class="button" onclick="editStanza(__POSTOAUTO_ID__)"/>
                <span>__POSTOAUTO_APPARTAMENTO__ __POSTOAUTO_POSTOAUTO__ - dal __POSTOAUTO_DATAINIZIO__ al __POSTOAUTO_DATAFINE__<br/>Note: __POSTOAUTO_NOTE__</span>
            </div>
        </div>
    </form>
    <div id="editPostoAuto" class="hide" title="PostoAuto">
        <form class="form">
            <input type="hidden" name="Id"/>
            <p>
            <div class="field">
                <label>Appartamento</label><input type="text" name="Appartamento"/>
            </div>
            <div class="field">
                <label>Posto Auto</label><select name="PostoAuto"></select>
            </div>
            <div class="field">
                <label>Data inizio</label>{html_select_date start_year="1900" end_year="+10" reverse_years="true" prefix="DataInizio_" month_extra="class='month'" day_extra="class='day'" year_extra="class='year'" day_value_format="%02d"}
            </div>
            <div class="field">
                <label>Data fine</label>{html_select_date month_empty="N.D." day_empty="N.D." year_empty="N.D." time="0" start_year="1900" end_year="+10" reverse_years="true" prefix="DataFine_" month_extra="class='month'" day_extra="class='day'" year_extra="class='year'" day_value_format="%02d"}
            </div>
            <div class="field">
                <label>Note</label><input type="text" name="Note"/>
            </div>
            </p>
        </form>
    </div>
        
    <script type="text/javascript">
        var specializzazioni = [];
        {foreach $specializzazioni as $s name=idx}
            specializzazioni[{$smarty.foreach.idx.iteration - 1}] = "{$s}";
        {/foreach}
        var dlgStanza, acplAppartamento, selectStanza;
        var dlgPostoAuto, acplAppartamentoPostoAuto, selectPostoAuto;
        var currentIdAppartamento = 0;
        var canEdit = {if $canEdit}true{else}false{/if};
        var addStanza = {if isset($addStanza)}{$addStanza}{else}0{/if};
        var addPostoAuto = {if isset($addPostoAuto)}{$addPostoAuto}{else}0{/if};
    {literal}
        $(function () {
            
            if (!canEdit) {
                setFormReadonly("formEdit");
            }
            
            dlgStanza = $("#editStanza");
            acplAppartamento = $("#editStanza input[name=Appartamento]");
            selectStanza = $("#editStanza select[name=Stanza]");
            
            checkStanze();
            loadStanze(0);
            
            dlgPostoAuto = $("#editPostoAuto");
            acplAppartamentoPostoAuto = $("#editPostoAuto input[name=Appartamento]");
            selectPostoAuto = $("#editPostoAuto select[name=PostoAuto]");
            
            checkPostiAuto();
            loadPostiAuto(0);
            
            $("input[name=Nome], input[name=Cognome], input[name=Specializzazione], input[name=Ente]").blur(function() { $(this).val(ucwords($(this).val(), true)); });
            
            $("#formEdit input[name=Specializzazione]").autocomplete({
                source: specializzazioni
            });
            
            dlgStanza.dialog({
                width: 550,
                height: 450,
                autoOpen: false,
                modal: true,
                buttons: {
                    "Conferma": function() {
                        
                        var id = parseInt(dlgStanza.find("input[name=Id]").val());
                        if (id == 0)
                            id = -(new Date().getTime());
                        var appartamento = acplAppartamento.val().trim();
                        var stanza = "";
                        var idStanza = parseInt(selectStanza.val());
                        if (idStanza > 0)
                            stanza = selectStanza.children(":selected").html();
                        var dataFirma = dlgStanza.find("select[name=DataFirma_Year]").val() + "/" + dlgStanza.find("select[name=DataFirma_Month]").val() + "/" + dlgStanza.find("select[name=DataFirma_Day]").val();
                        var dataInizio = dlgStanza.find("select[name=DataInizio_Year]").val() + "/" + dlgStanza.find("select[name=DataInizio_Month]").val() + "/" + dlgStanza.find("select[name=DataInizio_Day]").val();
                        var dataFine = dlgStanza.find("select[name=DataFine_Year]").val() + "/" + dlgStanza.find("select[name=DataFine_Month]").val() + "/" + dlgStanza.find("select[name=DataFine_Day]").val();
                        var turistico = dlgStanza.find("select[name=Turistico]").val();
                        var periodoFatturazione = parseInt(dlgStanza.find("select[name=PeriodoFatturazione]").val());
                        var caparra = dlgStanza.find("input[name=Caparra]").val();
                        var canone = dlgStanza.find("input[name=Canone]").val();
                        var spese = dlgStanza.find("input[name=Spese]").val();
                        var cauzione = dlgStanza.find("input[name=Cauzione]").val();
                        var numeroFatture = dlgStanza.find("input[name=NumeroFatture]").val();
                        var conguaglioUtenze = dlgStanza.find("input[name=ConguaglioUtenze]").val();
                        var conguaglioSpese = dlgStanza.find("input[name=ConguaglioSpese]").val();
                        var giorniNonGoduti = dlgStanza.find("input[name=GiorniNonGoduti]").val();
                        var pulizie = "0";
                        if(dlgStanza.find("input[name=Pulizie]").prop('checked')){
                            pulizie = "1";
                        }
                        var note = dlgStanza.find("input[name=Note]").val();
                        if (appartamento == "") {
                            alert("Selezionare l'appartamento");
                            return;
                        }
                        if (stanza == "") {
                            alert("Selezionare la stanza");
                            return;
                        }
                        if (!isValidDate(dataFirma)) {
                            alert("Selezionare una data stipulazione contratto valida");
                            return;
                        }
                        if (!isValidDate(dataInizio)) {
                            alert("Selezionare una data inizio valida");
                            return;
                        }
                        if (!isValidDate(dataFine)) {
                            if (dataFine != "//") {
                                alert("Selezionare una data fine valida oppure N.D.");
                                return;
                            }
                            dataFine = "";
                        }
                        if(turistico == "" || turistico < 0){
                            alert("Selezionare tipo Inquilino");
                            return;
                        }
                        if(periodoFatturazione == "" || periodoFatturazione < 1){
                            alert("Selezionare periodo fatturazione");
                            return;
                        }
                        if (caparra == "" || caparra < 0) {
                            alert("Digitare la Caparra");
                            return;
                        }
                        if (canone == "" || canone < 0) {
                            alert("Digitare il Canone");
                            return;
                        }
                        if (spese == "" || spese < 0) {
                            alert("Digitare le Spese");
                            return;
                        }
                        if (cauzione == "" || cauzione < 0) {
                            alert("Digitare la Cauzione");
                            return;
                        }
                        var html = $("#tplStanza").html();
                        html = html.replace(/__STANZA_ID__/g, id);
                        html = html.replace(/__STANZA_IDSTANZA__/g, idStanza);
                        html = html.replace(/__STANZA_APPARTAMENTO__/g, htmlEncode(appartamento));
                        html = html.replace(/__STANZA_STANZA__/g, stanza);
                        html = html.replace(/__STANZA_DATAFIRMA__/g, htmlEncode(dataFirma));
                        html = html.replace(/__STANZA_DATAINIZIO__/g, htmlEncode(dataInizio));
                        html = html.replace(/__STANZA_DATAFINE__/g, htmlEncode(dataFine));
                        html = html.replace(/__STANZA_TURISTICO__/g, turistico);
                        html = html.replace(/__STANZA_PERIODOFATTURAZIONE__/g, periodoFatturazione);
                        html = html.replace(/__STANZA_CAPARRA__/g, htmlEncode(caparra));
                        html = html.replace(/__STANZA_CANONE__/g, htmlEncode(canone));
                        html = html.replace(/__STANZA_SPESE__/g, htmlEncode(spese));
                        html = html.replace(/__STANZA_CAUZIONE__/g, htmlEncode(cauzione));
                        html = html.replace(/__STANZA_NUMEROFATTURE__/g, htmlEncode(numeroFatture));
                        html = html.replace(/__STANZA_CONGUAGLIOUTENZE__/g, htmlEncode(conguaglioUtenze));
                        html = html.replace(/__STANZA_CONGUAGLIOSPESE__/g, htmlEncode(conguaglioSpese));
                        html = html.replace(/__STANZA_GIORNINONGODUTI__/g, htmlEncode(giorniNonGoduti));
                        html = html.replace(/__STANZA_PULIZIE__/g, htmlEncode(pulizie));
                        html = html.replace(/__STANZA_NOTE__/g, htmlEncode(note));
                        if ($("#listStanze #stanza" + id).length == 0)
                            $("#listStanze").append(html);
                        else
                            $("#listStanze #stanza" + id).html(html);
                        $("#listStanze .no-records").hide();
                        dlgStanza.dialog("close");
                    }
                }
            });
            
            var cache = {};
            acplAppartamento.autocomplete({
                minLength: 2,
                source: function( request, response ) {
                    var term = request.term;
                    if (!term)
                        return;
                    if ( term in cache ) {
                      response( cache[ term ] );
                      loadStanze(0);
                      return;
                    }
                    $.getJSON( "appartamenti.php?action=autocomplete", request, function( data, status, xhr ) {
                        cache[ term ] = data;
                        response( data );
                        loadStanze(0);
                    });
                },
                select: function( event, ui ) {
                    loadStanze(0);
                }
            });
            acplAppartamento.blur(function() {loadStanze(0);});
            
            if (addStanza != 0) {
                editStanza(addStanza);
            }
            
            dlgPostoAuto.dialog({
                width: 550,
                height: 450,
                autoOpen: false,
                modal: true,
                buttons: {
                    "Conferma": function() {
                        var id = parseInt(dlgPostoAuto.find("input[name=Id]").val());
                        if (id == 0)
                            id = -(new Date().getTime());
                        var appartamento = acplAppartamentoPostoAuto.val().trim();
                        var posto = "";
                        var idPostoAuto = parseInt(selectPostoAuto.val());
                        if (idPostoAuto > 0)
                            posto = selectPostoAuto.children(":selected").html();
                        var dataInizio = dlgPostoAuto.find("select[name=DataInizio_Year]").val() + "/" + dlgPostoAuto.find("select[name=DataInizio_Month]").val() + "/" + dlgPostoAuto.find("select[name=DataInizio_Day]").val();
                        var dataFine = dlgPostoAuto.find("select[name=DataFine_Year]").val() + "/" + dlgPostoAuto.find("select[name=DataFine_Month]").val() + "/" + dlgPostoAuto.find("select[name=DataFine_Day]").val();
                        var note = dlgPostoAuto.find("input[name=Note]").val();
                        if (appartamento == "") {
                            alert("Selezionare l'appartamento");
                            return;
                        }
                        if (posto == "") {
                            alert("Selezionare il posto auto");
                            return;
                        }
                        if (!isValidDate(dataInizio)) {
                            alert("Selezionare una data inizio valida");
                            return;
                        }
                        if (!isValidDate(dataFine)) {
                            if (dataFine != "//") {
                                alert("Selezionare una data fine valida oppure N.D.");
                                return;
                            }
                            dataFine = "";
                        }
                        var html = $("#tplPostoAuto").html();
                        html = html.replace(/__POSTOAUTO_ID__/g, id);
                        html = html.replace(/__POSTOAUTO_IDPOSTOAUTO__/g, idPostoAuto);
                        html = html.replace(/__POSTOAUTO_APPARTAMENTO__/g, htmlEncode(appartamento));
                        html = html.replace(/__POSTOAUTO_POSTOAUTO__/g, posto);
                        html = html.replace(/__POSTOAUTO_DATAINIZIO__/g, htmlEncode(dataInizio));
                        html = html.replace(/__POSTOAUTO_DATAFINE__/g, htmlEncode(dataFine));
                        html = html.replace(/__POSTOAUTO_NOTE__/g, htmlEncode(note));
                        if ($("#listPostiAuto #postoauto" + id).length == 0)
                            $("#listPostiAuto").append(html);
                        else
                            $("#listPostiAuto #postoauto" + id).html(html);
                        $("#listPostiAuto .no-records").hide();
                        dlgPostoAuto.dialog("close");
                    }
                }
            });
            
            acplAppartamentoPostoAuto.autocomplete({
                minLength: 2,
                source: function( request, response ) {
                    var term = request.term;
                    if (!term)
                        return;
                    if ( term in cache ) {
                      response( cache[ term ] );
                      loadPostiAuto(0);
                      return;
                    }
                    $.getJSON( "appartamenti.php?action=autocomplete", request, function( data, status, xhr ) {
                        cache[ term ] = data;
                        response( data );
                        loadPostiAuto(0);
                    });
                },
                select: function( event, ui ) {
                    loadPostiAuto(0);
                }
            });
            acplAppartamentoPostoAuto.blur(function() {loadPostiAuto(0);});
            
            if (addPostoAuto != 0) {
                editPostoAuto(addPostoAuto);
            }
        });
        
        function loadStanze (selected) {
            var idAppartamento = 0;
            if (acplAppartamento.val()) {
                idAppartamento = acplAppartamento.val().substring(0, acplAppartamento.val().indexOf("]"));
                idAppartamento = parseInt(idAppartamento.substring(1));
                if (isNaN(idAppartamento))
                    idAppartamento = 0;
                else
                    idAppartamento = parseInt(idAppartamento);
            }
            if (currentIdAppartamento == 0 || idAppartamento != currentIdAppartamento) {
                selectStanza.html('<option value="0">[Seleziona]</option>');
                currentIdAppartamento = idAppartamento;
                if (idAppartamento > 0) {
                    $.getJSON( "stanze.php", {action: 'load', IdAppartamento: idAppartamento}, function( data, status, xhr ) {
                        $.each(data.rows, function(index, value) {
                            selectStanza.append('<option value="' + value.Id + '"' + (selected && value.Id == selected ? ' selected="selected"' : '') + '>' + value.Numero + '</option>');
                        });
                    });
                }
            }
        }
        function editStanza (idStanza) {
            currentIdAppartamento = 0;
            dlgStanza.find("input[name=Id]").val(idStanza);
            dlgStanza.find("input[type=text]").val("");
            dlgStanza.find("select").val("");
            dlgStanza.find("select[name=Stanza]").val(0);
            if (idStanza != 0) {
                var div = $("#stanza" + idStanza);
                dlgStanza.find("input[name=Appartamento]").val(div.find("input[name=stanze_Appartamento\\[\\]]").val());
                loadStanze(div.find("input[name=stanze_IdStanza\\[\\]]").val());
                var dataInizio = div.find("input[name=stanze_DataInizio\\[\\]]").val().split("/");
                dlgStanza.find("select[name=DataInizio_Year]").val(dataInizio[0]);
                dlgStanza.find("select[name=DataInizio_Month]").val(dataInizio[1]);
                dlgStanza.find("select[name=DataInizio_Day]").val(dataInizio[2]);
                var dataFine = div.find("input[name=stanze_DataFine\\[\\]]").val().split("/");
                if (dataFine.length == 1)
                    dataFine = ["", "", ""];
                dlgStanza.find("select[name=DataFine_Year]").val(dataFine[0]);
                dlgStanza.find("select[name=DataFine_Month]").val(dataFine[1]);
                dlgStanza.find("select[name=DataFine_Day]").val(dataFine[2]);
                var dataFirma = div.find("input[name=stanze_DataFirma\\[\\]]").val().split("/");
                dlgStanza.find("select[name=DataFirma_Year]").val(dataFirma[0]);
                dlgStanza.find("select[name=DataFirma_Month]").val(dataFirma[1]);
                dlgStanza.find("select[name=DataFirma_Day]").val(dataFirma[2]);
                dlgStanza.find("select[name=Turistico]").val(div.find("input[name=stanze_Turistico\\[\\]]").val());
                dlgStanza.find("select[name=PeriodoFatturazione]").val(div.find("input[name=stanze_PeriodoFatturazione\\[\\]]").val());
                dlgStanza.find("input[name=Caparra]").val(div.find("input[name=stanze_Caparra\\[\\]]").val());
                dlgStanza.find("input[name=Canone]").val(div.find("input[name=stanze_Canone\\[\\]]").val());
                dlgStanza.find("input[name=Spese]").val(div.find("input[name=stanze_Spese\\[\\]]").val());
                dlgStanza.find("input[name=Cauzione]").val(div.find("input[name=stanze_Cauzione\\[\\]]").val());
                dlgStanza.find("input[name=NumeroFatture]").val(div.find("input[name=stanze_NumeroFatture\\[\\]]").val());
                dlgStanza.find("input[name=ConguaglioUtenze]").val(div.find("input[name=stanze_ConguaglioUtenze\\[\\]]").val());
                dlgStanza.find("input[name=ConguaglioSpese]").val(div.find("input[name=stanze_ConguaglioSpese\\[\\]]").val());
                dlgStanza.find("input[name=GiorniNonGoduti]").val(div.find("input[name=stanze_GiorniNonGoduti\\[\\]]").val());
                dlgStanza.find("input[name=Pulizie]").val(div.find("input[name=stanze_Pulizie\\[\\]]").val());
                if(div.find("input[name=stanze_Pulizie\\[\\]]").val() === '1'){
                    dlgStanza.find("input[name=Pulizie]").bootstrapToggle('on');
                }else{
                    dlgStanza.find("input[name=Pulizie]").bootstrapToggle('off');
                }
                dlgStanza.find("input[name=Note]").val(div.find("input[name=stanze_Note\\[\\]]").val());
            }
            dlgStanza.removeClass("hide");
            dlgStanza.dialog("open");
        }
        function deleteStanza (idStanza) {
            confirmDelete(function(idStanza) {
                $("#stanza" + idStanza).remove();
                checkStanze();
            }, idStanza);
        }
        function checkStanze () {
            if ($("#listStanze .stanza").length == 0)
                $("#listStanze .no-records").show();
            else
                $("#listStanze .no-records").hide();
        }
        
        function loadPostiAuto (selected) {
            var idAppartamento = 0;
            if (acplAppartamentoPostoAuto.val()) {
                idAppartamento = acplAppartamentoPostoAuto.val().substring(0, acplAppartamentoPostoAuto.val().indexOf("]"));
                idAppartamento = parseInt(idAppartamento.substring(1));
                if (isNaN(idAppartamento))
                    idAppartamento = 0;
                else
                    idAppartamento = parseInt(idAppartamento);
            }
            if (currentIdAppartamento == 0 || idAppartamento != currentIdAppartamento) {
                selectPostoAuto.html('<option value="0">[Seleziona]</option>');
                currentIdAppartamento = idAppartamento;
                if (idAppartamento > 0) {
                    $.getJSON( "postiauto.php", {action: 'load', IdAppartamento: idAppartamento}, function( data, status, xhr ) {
                        $.each(data.rows, function(index, value) {
                            selectPostoAuto.append('<option value="' + value.Id + '"' + (selected && value.Id == selected ? ' selected="selected"' : '') + '>' + value.Id + '</option>');
                        });
                    });
                }
            }
        }
        function editPostoAuto (idPostoAuto) {
            currentIdAppartamento = 0;
            dlgPostoAuto.find("input[name=Id]").val(idPostoAuto);
            dlgPostoAuto.find("input[type=text]").val("");
            dlgPostoAuto.find("select").val("");
            dlgPostoAuto.find("select[name=PostoAuto]").val(0);
            if (idPostoAuto != 0) {
                var div = $("#postoauto" + idPostoAuto);
                dlgPostoAuto.find("input[name=Appartamento]").val(div.find("input[name=postiauto_Appartamento\\[\\]]").val());
                loadPostiAuto(div.find("input[name=postiauto_IdPostoAuto\\[\\]]").val());
                var dataInizio = div.find("input[name=postiauto_DataInizio\\[\\]]").val().split("/");
                dlgPostoAuto.find("select[name=DataInizio_Year]").val(dataInizio[0]);
                dlgPostoAuto.find("select[name=DataInizio_Month]").val(dataInizio[1]);
                dlgPostoAuto.find("select[name=DataInizio_Day]").val(dataInizio[2]);
                var dataFine = div.find("input[name=postiauto_DataFine\\[\\]]").val().split("/");
                if (dataFine.length == 1)
                    dataFine = ["", "", ""];
                dlgPostoAuto.find("select[name=DataFine_Year]").val(dataFine[0]);
                dlgPostoAuto.find("select[name=DataFine_Month]").val(dataFine[1]);
                dlgPostoAuto.find("select[name=DataFine_Day]").val(dataFine[2]);
                dlgPostoAuto.find("input[name=Note]").val(div.find("input[name=postiauto_Note\\[\\]]").val());
            }
            dlgPostoAuto.removeClass("hide");
            dlgPostoAuto.dialog("open");
        }
        function deletePostoAuto (idPostoAuto) {
            confirmDelete(function(idPostoAuto) {
                $("#postoauto" + idPostoAuto).remove();
                checkPostiAuto();
            }, idPostoAuto);
        }
        function checkPostiAuto () {
            if ($("#listPostiAuto .postoauto").length == 0)
                $("#listPostiAuto .no-records").show();
            else
                $("#listPostiAuto .no-records").hide();
        }
        
        $("#formEdit").on("focus","input[name='LuogoNascita_nome']", function(){
            $(this).autocomplete({
                source: '?action=autocompleteCity',
                minChars: 2,
                autoFill: true,
                mustMatch:true,
                delay: 0,//0
                cacheLength: 1,
                max:30,
                formatItem: function (row) {
                return row[0] + " (" + row[2] + ", " + row[1] + ")"+" "+row[5];
                },
                formatMatch: function (row) {
                return row[0];
                },
                formatResult: function (row) {
                return row[0];
                },
                select: function(e, ui){
                    $("#formEdit input[name='LuogoNascita']").val(parseInt(ui.item.city_code_istat));
                    $(this).val(ui.item.value);
                    codiceFiscale();
                }
            });
        });
        
        $("#formEdit").on("focus","input[name='Citta']", function(){
            $(this).autocomplete({
                source: '?action=autocompleteCity',
                minChars: 2,
                autoFill: true,
                mustMatch:true,
                delay: 0,//0
                cacheLength: 1,
                max:30,
                formatItem: function (row) {
                return row[0] + " (" + row[2] + ", " + row[1] + ")"+" "+row[5];
                },
                formatMatch: function (row) {
                return row[0];
                },
                formatResult: function (row) {
                return row[0];
                },
                select: function(e, ui){
                    $("#formEdit input[name='CAP']").val(parseInt(ui.item.city_code_postal));
                    //$(this).val(ui.item.value);
                    /*var cap = $("#formEdit input[name='CAP']").val();
                    
                    if(!cap){
                        $("#formEdit input[name='CAP']").val(parseInt(ui.item.city_code_postal));
                    }*/
                    //$(this).val(ui.item);
                }
            });
        });
        
        $("#formEdit input[name='Nome'], input[name='Cognome'], select[name='Sesso'], select[name='DataNascita_Month'], select[name='DataNascita_Day'], select[name='DataNascita_Year']").change(function (){
            codiceFiscale();
        });
        
        /*$("#formEdit input[name='LuogoNascita_nome']").change( function (){
            console.log("2");
        });*/
        
        function codiceFiscale(){
            var codice = new Inquilino();
            codice.Nome = $("#formEdit input[name='Nome']").val();
            codice.Cognome = $("#formEdit input[name='Cognome']").val();
            codice.Sesso = $("#formEdit select[name='Sesso']").val();
            codice.LuogoNascita = $("#formEdit input[name='LuogoNascita']").val();
            
            var mese = parseInt($("#formEdit select[name='DataNascita_Month']").val());
            var giorno = parseInt($("#formEdit select[name='DataNascita_Day']").val());
            var anno = parseInt($("#formEdit select[name='DataNascita_Year']").val());
            
            
            var dataNascita = new Date();
            dataNascita.setMonth(mese-1);
            dataNascita.setDate(giorno);
            dataNascita.setYear(anno);
            
            codice.DataNascita = dataNascita.yyyymmdd();
            
            if(codice.Nome && codice.Cognome && codice.Sesso && parseInt(codice.LuogoNascita) > 0 && !isNaN(dataNascita)){
                var codice_clone = JSON.stringify(codice);
                $.getJSON( '?action=codiceFiscale&inquilino=' + codice_clone, function( data ) {
                    $("#formEdit input[name='CodiceFiscale']").val(data);
                });
            }
            
        }
        
    {/literal}
    </script>
        
{/if}

{include file="footer.tpl"}