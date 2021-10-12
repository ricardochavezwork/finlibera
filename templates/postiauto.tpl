{assign var=pageTitle value={#admin_postiauto#}}
{assign var=menuActive value="admin"}
{assign var=menuSubActive value="appartamenti"}
{if !isset($record)}
{assign var=breadcrumb value="<li><a href=\"appartamenti.php\">Appartamenti</a></li><li class='active'>Posti Auto</li>"}
{else}
{assign var=breadcrumb value="<li><a href=\"appartamenti.php\">Appartamenti</a></li><li class='active'><a href='?IdAppartamento={$appartamentoId}'>Posti Auto</a></li>"}
{/if}
{include file="header.tpl"}

<h3 id="section_title"><strong>Appartamento: {htmlentities($appartamento, $smarty.const.ENT_QUOTES, 'UTF-8')}</strong><a href="appartamenti.php?Id={$appartamentoId}"><img src="{$smarty.const.URL_ROOT}images/undo.png" align="absmiddle" hspace="5" style="margin-left: 20px;"/>Ritorna all'appartamento</a></h3>

{if isset($error)}
    <div class="errore">{$error}</div>
{/if}
{if isset($saved)}
    <div class="conferma">I dati sono stati acquisiti correttamente</div>
{/if}

{if !isset($record)}
    
    <h3 id="section_title">Elenco Posti Auto</h3>
    <table id="listRecords"></table>
    
    <script type="text/javascript">
        var idAppartamento = {$appartamentoId};
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
                url: '?action=load&IdAppartamento=' + idAppartamento,
                dataType: 'json',
                colModel : [
                    {display: '', name : 'CellActions', width : 160, sortable : false, align: 'right'},
                    {display: 'Id', name : 'Id', hide : true},
                    {display: 'Numero', name : 'Numero', width : 50, sortable : true},
                    {display: 'Posto', name : 'Posto', width : 70, sortable : true},
                    {display: 'Tipo', name : 'Tipo', width : 70, sortable : true},
                    {display: 'Mq', name : 'Mq', width : 50, sortable : true},
                    {display: 'Prezzo', name : 'Prezzo', width : 70, sortable : true},
                    {display: 'Descrizione', name : 'Descrizione', width : 350, sortable : true}
                ],
                usepager: true,
                useRp: true,
                rpOptions: [50, 100, 200, 250],
                rp: DEFAULT_LIST_LIMIT,
                onSubmit: addFormData,
                onSuccess: function() { $("#listRecords .button").button(); },
                buttons : [
                    {name: 'Nuovo Posto Auto', bclass: 'add', onpress : function() { if (!canEdit) noPrivilege(); else window.location = '?Id=0&IdAppartamento=' + idAppartamento; }}
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
    
    {literal}
    <style type="text/css">
        .foto {margin-bottom: 2px;}
    </style>
    {/literal}
    
    <form id="formEdit" action="{$smarty.const.PHP_SELF}" method="post" class="form" enctype="multipart/form-data">
        <input type="hidden" name="action" value="save"/>
        <input type="hidden" name="Id" value="{$record['Id']}"/>
        <input type="hidden" name="IdAppartamento" value="{$appartamentoId}"/>
        
        {if $record['Id'] > 0}
        <div class="field">
            <label>Id</label><strong>{$record['Id']}</strong>
        </div>
        <br/>
        {/if}
        <h3 id="section_title">APPARTENENZA</h3>
        <div class="field">
            <label>Appartamento</label><strong>{htmlentities($appartamento, $smarty.const.ENT_QUOTES, 'UTF-8')}</strong>
        </div>
        <h3 id="section_title">ATTRIBUTI</h3>
        <div class="field">
            <label>Numero*</label><input type="text" class="input_numeric" name="Numero" value="{htmlentities($record['Numero'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Posto*</label><select name="Posto">{html_options values=$posti_values output=$posti_output selected=$record['Posto']}</select>
        </div>
        <div class="field">
            <label>Tipo*</label><select name="Tipo">{html_options values=$tipo_values output=$tipo_output selected=$record['Tipo']}</select>
        </div>
        <div class="field">
            <label>Mq*</label><input type="text" class="input_numeric" name="Mq" value="{htmlentities($record['Mq'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Prezzo*</label><input type="text" class="input_decimal" name="Prezzo" value="{htmlentities($record['Prezzo'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Descrizione*</label><input type="text" name="Descrizione" value="{htmlentities($record['Descrizione'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <br/>
        <h3 id="section_title"><span class="title">FOTO</span></h3>
        <div class="field">
            <input type="hidden" name="Foto" value="{htmlentities($record['Foto'], $smarty.const.ENT_QUOTES, 'UTF-8')}"/>
            {if $record["Foto"]}
                <img src="{$record["FotoThumb"]}" /> <input type="checkbox" name="DeleteFoto"/> Rimuovi
                <br/><label>Cambia:</label> <input type="file" name="UploadFoto"/>
            {else}
                <span class="no-records">Nessuna foto registrata</span>
                <br/><label>Invia:</label> <input type="file" name="UploadFoto"/>
            {/if}
        </div>
        <br/>
        <div class="toolbar">
            {if $canEdit}<input type="submit" class="button" value="SALVA"/>{/if}
            <input type="button" class="button" value="RITORNA" onclick="window.location='{$smarty.const.PHP_SELF}?IdAppartamento={$appartamentoId}'"/>
        </div>
        
    </form>
    
    <script type="text/javascript">
        var appartamentoId = {$appartamentoId};
        var canEdit = {if $canEdit}true{else}false{/if};
        $(function () {
            if (canEdit) {
                {*tinymce.init({selector:'textarea.texteditor', menubar : false, width: 600, height: 100, plugins: "textcolor link image", toolbar: [
                    "undo redo | styleselect | fontsizeselect | forecolor backcolor | bold italic | link image | alignleft aligncenter alignright | bullist numlist outdent indent",
                ]});*}
            } else {
                setFormReadonly("formEdit");
            }
        });
    </script>
        
{/if}

{include file="footer.tpl"}