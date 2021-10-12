{assign var=pageTitle value={#admin_richiedenti#}}
{assign var=menuActive value="admin"}
{assign var=menuSubActive value="richiedenti"}
{if !isset($record)}
{assign var=breadcrumb value="<li class='active'>Richiedenti</li>"}
{else}
{assign var=breadcrumb value="<li class='active'><a href='?'>Richiedenti</a></li>"}
{/if}
{include file="header.tpl"}

{if isset($error)}
    <div class="errore">{$error}</div>
{/if}
{if isset($saved)}
    <div class="conferma">I dati sono stati acquisiti correttamente</div>
{/if}

{if !isset($record)}
    
    <a href="stats_richiedenti.php" class="button"><h5 style="margin: 1px">Statistiche</h5></a>
    
    <h3 id="section_title">Elenco Richiedenti</h3>
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
                    {display: 'Data ricezione', name : 'DataRegistrazione', width: 100, sortable : true},
                    {display: 'Cognome', name : 'Cognome', width: 100, sortable : false},
                    {display: 'Nome', name : 'Nome', width: 100, sortable : false},
                    {display: 'Email', name : 'Email', width : 200, sortable : false},
                    {display: 'Telefono', name : 'Telefono', width : 100, sortable : false},
                    {display: 'Stanza', name : 'Stanza', width : 200, sortable : true}
                ],
                usepager: true,
                useRp: true,
                rpOptions: [50, 100, 200, 250],
                rp: DEFAULT_LIST_LIMIT,
                onSubmit: addFormData,
                onSuccess: function() { $("#listRecords .button").button(); }
            });
        }
        function deleteRecord(id) {
            confirmDelete(function(id) {
                toggleBusy(true);
                window.location = "?action=delete&Id=" + id;
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
    
    <form id="formEdit" method="post" class="form">
        <input type="hidden" name="action" value="save"/>
        
        <div class="field">
            <label>Id</label><strong>{$record['Id']}</strong>
        </div>
        <div class="field">
            <label>Data ricezione</label><strong>{$record['DataRegistrazione']}</strong>
        </div>
        {if $record['IdStanza'] > 0}
        <div class="field">
            <label>Appartamento</label><a href="appartamenti.php?Id={$appartamento["Id"]}">{htmlentities($appartamento['Indirizzo'], $smarty.const.ENT_QUOTES, 'UTF-8')}{if $appartamento['Civico']} {htmlentities($appartamento['Civico'], $smarty.const.ENT_QUOTES, 'UTF-8')}{/if}</a>
        </div>
        <div class="field">
            <label>Stanza</label><a href="stanze.php?Id={$stanza["Id"]}">{htmlentities($stanza['Numero'], $smarty.const.ENT_QUOTES, 'UTF-8')}</a>
        </div>
        {/if}
        <div class="field">
            <label>Cognome*</label><input type="text" name="Cognome" value="{htmlentities($record['Cognome'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Nome*</label><input type="text" name="Nome" value="{htmlentities($record['Nome'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        {*<div class="field">
            <label>Sesso</label><select name="Sesso">{html_options values=$sesso_values output=$sesso_output selected=$record['Sesso']}</select>
        </div>
        <div class="field">
            <label>Et&agrave;</label><input type="text" class="input_numeric" name="Eta" value="{htmlentities($record['Eta'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Professione</label><select name="Professione">{html_options values=$professione_values output=$professione_output selected=$record['Professione']}</select>
        </div>
        <div class="field">
            <label>Specializzazione</label><input type="text" name="Specializzazione" value="{htmlentities($record['Specializzazione'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Ente</label><input type="text" name="Ente" value="{htmlentities($record['Ente'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>*}
        <div class="field">
            <label>Email</label><input type="text" name="Email" value="{htmlentities($record['Email'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Telefono</label><input type="text" name="Telefono" value="{htmlentities($record['Telefono'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        {if $record['IdStanza'] > 0}
        <div class="field">
            <label>Messaggio</label><textarea name="Note" cols="80" rows="10" readonly="readonly">{htmlentities($record['Messaggio'], $smarty.const.ENT_QUOTES, 'UTF-8')}</textarea>
        </div>
        {else}
        <div class="field">
            <label>Disponibilit&agrave;</label><strong>{htmlentities($record['Disponibilita'], $smarty.const.ENT_QUOTES, 'UTF-8')}</strong>
        </div>
        <div class="field">
            <label>Prezzo massimo</label><strong>{htmlentities($record['Prezzo'], $smarty.const.ENT_QUOTES, 'UTF-8')} &#128;</strong>
        </div>
        <div class="field">
            <label>Zona</label><strong>{htmlentities($record['Zona'], $smarty.const.ENT_QUOTES, 'UTF-8')}</strong>
        </div>
        <div class="field">
            <label>Metro</label><strong>{htmlentities($record['Metro'], $smarty.const.ENT_QUOTES, 'UTF-8')}</strong>
        </div>
        {/if}
        <div class="field">
            <label>Stato</label><select name="Stato">{html_options values=$stato_values output=$stato_output selected=$record['Stato']}</select>
        </div>
        <div class="field">
            <label>Note</label><input type="text" name="Note" value="{htmlentities($record['Note'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <br/>
        <div class="toolbar">
            {if $canEdit}<input type="submit" class="button" value="SALVA"/>{/if}
            <input type="button" class="button" value="RITORNA" onclick="window.location='{$smarty.const.PHP_SELF}'"/>
        </div>
        
    </form>
        
    <script type="text/javascript">
        var specializzazioni = [];
        {foreach $specializzazioni as $s name=idx}
            specializzazioni[{$smarty.foreach.idx.iteration - 1}] = "{$s}";
        {/foreach}
        var canEdit = {if $canEdit}true{else}false{/if};
    {literal}
        $(function () {
            if (!canEdit) {
                setFormReadonly("formEdit");
            }
            $("#formEdit input[name=Specializzazione]").autocomplete({
                source: specializzazioni
            });
        });
    {/literal}
    </script>
        
{/if}

{include file="footer.tpl"}