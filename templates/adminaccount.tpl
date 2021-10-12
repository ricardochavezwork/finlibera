{assign var=pageTitle value={#admin_adminaccount#}}
{assign var=menuActive value="admin"}
{assign var=menuSubActive value="adminaccount"}
{if !isset($record)}
{assign var=breadcrumb value="<li class='active'>Admin Account</li>"}
{else}
{assign var=breadcrumb value="<li class='active'><a href='?'>Admin Account</a></li>"}
{/if}
{include file="header.tpl"}

{if isset($error)}
    <div class="errore">{$error}</div>
{/if}
{if isset($saved)}
    <div class="conferma">I dati sono stati acquisiti correttamente</div>
{/if}

{if $canEdit}
    <a href="statistiche.php" class="button"><h5 style="margin: 1px">Statistiche</h5></a><a href="serversettings.php" class="button"><h5 style="margin: 1px">Gestione contenuto</h5></a>
{/if}

{if !isset($record)}
    
    <h3 id="section_title">Elenco Account</h3>
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
                    {display: 'Nome utente', name : 'Username', width: 100, sortable : false},
                    {display: 'Amministratore', name : 'Amministratore', width: 90, sortable : false},
                    {display: 'Telefono', name : 'Telefono', width: 120, sortable : false},
                    {display: 'Email utente', name : 'Email', width: 200, sortable : false},
                    {display: 'Inquilini', name : 'Inquilini', width: 75, sortable : false},
                    {display: 'Stanze', name : 'Stanze', width: 75, sortable : false},
                    {display: 'Appartamenti', name : 'Appartamenti', width: 75, sortable : false},
                    {display: 'Stabili', name : 'Stabili', width: 75, sortable : false}
                ],
                usepager: true,
                useRp: true,
                rpOptions: [50, 100, 200, 250],
                rp: DEFAULT_LIST_LIMIT,
                onSubmit: addFormData,
                onSuccess: function() { $("#listRecords .button").button(); },
                buttons : [
                    {name: 'Nuovo Account', bclass: 'add', onpress : function() { if (!canEdit) noPrivilege(); else window.location = "?Id=0"; }}
                ]
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
    {/literal}
    </script>
    
{else}
    
    <form id="formEdit" action="{$smarty.const.PHP_SELF}" method="post" class="form">
        <input type="hidden" name="action" value="save"/>
        <input type="hidden" name="Id" value="{$record['Id']}"/>
        
        {if $record['Id'] > 0}
        <div class="field">
            <label>Id</label><strong>{$record['Id']}</strong>
        </div>
        {/if}
        <div class="field">
            <label>Nome utente*</label><input type="text" name="Username" value="{htmlentities($record['Username'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
        {if $record["Id"] > 0}
            <label>Cambia password</label><input type="password" name="Password" />
        {else}
            <label>Password*</label><input type="password" name="Password" />
        {/if}
        </div>
        <div class="field">
            <label>Telefono*</label><input type="text" name="Telefono" value="{htmlentities($record['Telefono'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>EMail</label><input type="text" name="Email" value="{htmlentities($record['Email'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Amministratore</label><select name="Amministratore">{html_options values=$sino_values output=$sino_output selected=$record['Amministratore']}</select>
        </div>
        <div class="field">
            <label><strong>Privilegi di accesso</strong></label><br clear="all"/>
        {for $i=0 to (count($privilegi_values) - 1)}
            <div style="padding: 2px 20px;"><label for="Privilegi_{$i}">{htmlentities($privilegi_output[$i], $smarty.const.ENT_QUOTES, 'UTF-8')}</label> <input type="checkbox" id="Privilegi_{$i}" name="Privilegi[]" value="{$privilegi_values[$i]}" {if in_array($privilegi_values[$i], $privilegi)}checked{/if} /></div>
        {/for}
        </div>
        <br/>
        <div class="toolbar">
            {if $canEdit}<input type="submit" class="button" value="SALVA"/>{/if}
            <input type="button" class="button" value="RITORNA" onclick="window.location='{$smarty.const.PHP_SELF}'"/>
        </div>
        
    </form>
    
    <script type="text/javascript">
        var canEdit = {if $canEdit}true{else}false{/if};
    {literal}
        $(function () {
            if (!canEdit) {
                setFormReadonly("formEdit");
            }
            $("#formEdit").submit(function () {
                toggleBusy(true);
            });
        });
    {/literal}
    </script>
        
{/if}

{include file="footer.tpl"}