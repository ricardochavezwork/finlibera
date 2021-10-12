{assign var=pageTitle value={#admin_zone#}}
{assign var=menuActive value="admin"}
{assign var=menuSubActive value="zone"}
{assign var=breadcrumb value="<li class='active'>Zone</li>"}
{include file="header.tpl"}

{if isset($error)}
    <div class="errore">{$error}</div>
{/if}
{if isset($saved)}
    <div class="conferma">I dati sono stati acquisiti correttamente</div>
{/if}

{if !isset($record)}
    
    <h3 id="section_title">Elenco Zone</h3>
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
                    {display: 'Mappa', name : 'Mappa', width: 150, sortable : false},
                    {display: 'Nome', name : 'Nome', width: 300, sortable : false}
                ],
                usepager: true,
                useRp: true,
                rpOptions: [50, 100, 200, 250],
                rp: DEFAULT_LIST_LIMIT,
                onSubmit: addFormData,
                onSuccess: function() { $("#listRecords .button").button(); },
                buttons : [
                    {name: 'Nuova Zona', bclass: 'add', onpress : function() { if (!canEdit) noPrivilege(); else window.location = "?Id=0"; }}
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
    </script>
    {/literal}
    
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
            <label>{#zona_mappa#}</label><select name="Mappa">{html_options values=$mappa_values output=$mappa_output selected=$record['Mappa']}</select>
        </div>
        <div class="field">
            <label>{#zona_nome#}*</label><input type="text" name="Nome" value="{htmlentities($record['Nome'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
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