{assign var=pageTitle value={#admin_stanze#}}
{assign var=menuActive value="admin"}
{assign var=menuSubActive value="appartamenti"}
{if !isset($record)}
{assign var=breadcrumb value="<li><a href=\"appartamenti.php\">Appartamenti</a></li><li class='active'>Stanze</li>"}
{else}
{assign var=breadcrumb value="<li><a href=\"appartamenti.php\">Appartamenti</a></li><li class='active'><a href='?IdAppartamento={$appartamentoId}'>Stanze</a></li>"}
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
    
    <h3 id="section_title">Elenco Stanze</h3>
    {*<div class="search">
        <form id="formSearch" action="{$smarty.const.PHP_SELF}" method="post" class="form">
            <div class="field">
                <label>Cognome/Nome/Codice Fiscale</label><input type="text" name="Nominativo"/>
            </div>
            <div class="toolbar">
                <input type="submit" class="button" value="Applica filtro"/>
                <input type="button" class="button" value="Resetta filtro" onclick="this.form.reset(); $(this.form).submit();"/>
            </div>
        </form>
    </div>*}
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
                    {display: 'Id', name : 'Id', hide: true},
                    {display: 'Numero', name : 'Numero', width : 50, sortable : true},
                    {display: 'MQ', name : 'Mq', width : 30, sortable : true},
                    {display: 'Bagno', name : 'Bagno', width : 100, sortable : true},
                    {display: 'Balc.', name : 'Balconi', width : 30, sortable : true},
                    {display: 'Pavimento', name : 'Pavimento', width : 80, sortable : true},
                    {display: 'TV', name : 'Tv', width : 30, sortable : true},
                    /*{display: '€ Originale', name : 'PrezzoSuggerito', width : 65, sortable : true},*/
                    {display: '€ Originale', name : 'PrezzoDinamico', width : 65, sortable : true},
                    {display: '€ Sconto', name : 'PrezzoScontato', width : 65, sortable : true},
                    {display: '€ Online', name : 'MarketPrice', width : 50, sortable : true},
                    {display: 'Attuale', name : 'PrezzoAttuale', width : 50, sortable : true},
                    {display: 'Inquilino', name : 'Inquilino', width : 400, sortable : false}
                ],
                usepager: true,
                useRp: true,
                rpOptions: [50, 100, 200, 250],
                rp: DEFAULT_LIST_LIMIT,
                onSubmit: addFormData,
                onSuccess: function() { $("#listRecords .button").button(); },
                buttons : [
                    {name: 'Nuova Stanza', bclass: 'add', onpress : function() { if (!canEdit) noPrivilege(); else window.location = '?Id=0&IdAppartamento=' + idAppartamento; }}
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
    
    <form id="formEdit" action="{$smarty.const.PHP_SELF}" method="post" class="form">
        <input type="hidden" name="action" value="save"/>
        <input type="hidden" name="Id" value="{$record['Id']}"/>
        <input type="hidden" name="IdAppartamento" value="{$appartamentoId}"/>
        
        {if $record['Id'] > 0}
        <div class="field">
            <label>Id</label><strong>{$record['Id']}</strong>
        </div>
        <br/>
        {/if}
        <div class="field">
            <label>Operatore/Admin*</label><select name="IdAdmin">{html_options values=$admin_values output=$admin_output selected=$record['IdAdmin']}</select>
        </div>
        <h3 id="section_title">APPARTENENZA</h3>
        <div class="field">
            <label>Appartamento</label><strong>{htmlentities($appartamento, $smarty.const.ENT_QUOTES, 'UTF-8')}</strong>
        </div>
        <div class="field">
            <label>N&deg; Stanza*</label><input type="text" name="Numero" value="{htmlentities($record['Numero'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Visibile</label><select name="Visibile">{html_options values=$sino_values output=$sino_output selected=$record['Visibile']}</select>
        </div>
        <h3 id="section_title">ATTRIBUTI</h3>
        <div class="field">
            <label>Tipo</label><select name="Tipo">{html_options values=$tipo_values output=$tipo_output selected=$record['Tipo']}</select>
        </div>
        <div class="field">
            <label>Affitto Breve</label><select name="AffittoBreve">{html_options values=$sino_values output=$sino_output selected=$record['AffittoBreve']}</select>
        </div>
        <div class="field">
            <label>Bagno</label><select name="Bagno">{html_options values=$bagno_values output=$bagno_output selected=$record['Bagno']}</select>
        </div>
        <!--div class="field">
            <label>Prezzo Originale*</label><input type="text" class="input_decimal" name="PrezzoSuggerito" value="{*htmlentities($record['PrezzoSuggerito'], $smarty.const.ENT_QUOTES, 'UTF-8')*}" />
        </div-->
        <div class="field">
            <label>Prezzo *</label><input type="text" class="input_decimal" name="PrezzoDinamico" value="{htmlentities($record['PrezzoDinamico'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Prezzo Scontato</label><input type="text" class="input_decimal" name="PrezzoScontato" value="{htmlentities($record['PrezzoScontato'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Scadenza sconto</label><input type="date" class="input_decimal" name="ScadenzaSconto" value="{htmlentities($record['ScadenzaSconto'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Prezzo Attuale</label><strong>{$record['PrezzoAttuale']} &#128;</strong>{*<input type="text" class="input_decimal" name="PrezzoAttuale" value="{htmlentities($record['PrezzoAttuale'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />*}
        </div>
        <br/>
        <h3 id="section_title">ARCHITETTURA</h3>
        <div class="field">
            <label>Mq*</label><input type="text" class="input_numeric" name="Mq" value="{htmlentities($record['Mq'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Balconi*</label><input type="text" class="input_numeric" name="Balconi" value="{htmlentities($record['Balconi'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Terrazzi*</label><input type="text" class="input_numeric" name="Terrazzi" value="{htmlentities($record['Terrazzi'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Pavimento</label><select name="Pavimento">{html_options values=$pavimento_values output=$pavimento_output selected=$record['Pavimento']}</select>
        </div>
        <br/>
        <h3 id="section_title">DOTAZIONI</h3>
        <div class="field">
            <label>TV</label><select name="Tv">{html_options values=$sino_values output=$sino_output selected=$record['Tv']}</select>
        </div>
        <div class="field">
            <label>Multiluce</label><select name="Multiluce">{html_options values=$sino_values output=$sino_output selected=$record['Multiluce']}</select>
        </div>
        <div class="field">
            <label>Antenna</label><select name="Antenna">{html_options values=$sino_values output=$sino_output selected=$record['Antenna']}</select>
        </div>
        <div class="field">
            <label>Aria condizionata</label><select name="Condizionatore">{html_options values=$sino_values output=$sino_output selected=$record['Condizionatore']}</select>
        </div>
        <br/>
        <h3 id="section_title">ARREDI</h3>
        <div class="field">
            <label>Letto*</label><input type="text" class="input_numeric" name="LettoMatrimoniale" value="{htmlentities($record['LettoMatrimoniale'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Tipologia Letto</label><select name="TipoLetto">{html_options values=$tipoLetto_values output=$tipoLetto_output selected=$record['TipoLetto']}</select>
        </div>
        <div class="field">
            <label>Sedie*</label><input type="text" class="input_numeric" name="Sedie" value="{htmlentities($record['Sedie'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Tavolo da pranzo*</label><input type="text" class="input_numeric" name="TavoloPranzo" value="{htmlentities($record['TavoloPranzo'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Cassetti*</label><input type="text" class="input_numeric" name="Cassetti" value="{htmlentities($record['Cassetti'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Mensole</label><select name="Mensole">{html_options values=$sino_values output=$sino_output selected=$record['Mensole']}</select>
        </div>
        <div class="field">
            <label>Scrivania*</label><input type="text" class="input_numeric" name="Scrivania" value="{htmlentities($record['Scrivania'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Specchi*</label><input type="text" class="input_numeric" name="Specchi" value="{htmlentities($record['Specchi'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Ante armadio*</label><input type="text" class="input_numeric" name="AnteArmadi" value="{htmlentities($record['AnteArmadi'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Cabina armadio</label><select name="CabinaArmadio">{html_options values=$sino_values output=$sino_output selected=$record['CabinaArmadio']}</select>
        </div>
        <div class="field">
            <label>Cucina privata</label><select name="CucinaPrivata">{html_options values=$sino_values output=$sino_output selected=$record['CucinaPrivata']}</select>
        </div>
        <br/>
        <h3 id="section_title">ANNUNCIO</h3>
        <div class="field">
            <label>Titolo*</label><input type="text" name="TitoloAnnuncio" value="{htmlentities($record['TitoloAnnuncio'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />{*<br/><textarea name="TitoloAnnuncio" class="texteditor">{htmlentities($record['TitoloAnnuncio'], $smarty.const.ENT_QUOTES, 'UTF-8')}</textarea>*}
        </div>
        <div class="field">
            <label>Descrizione*</label><input type="text" name="DescrizioneAnnuncio" value="{htmlentities($record['DescrizioneAnnuncio'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />{*<br/><textarea name="DescrizioneAnnuncio" class="texteditor">{htmlentities($record['DescrizioneAnnuncio'], $smarty.const.ENT_QUOTES, 'UTF-8')}</textarea>*}
        </div>
        <div class="field">
            <label>Titolo (inglese)*</label><input type="text" name="TitoloAnnuncio_en" value="{htmlentities($record['TitoloAnnuncio_en'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />{*<br/><textarea name="TitoloAnnuncio" class="texteditor">{htmlentities($record['TitoloAnnuncio'], $smarty.const.ENT_QUOTES, 'UTF-8')}</textarea>*}
        </div>
        <div class="field">
            <label>Descrizione (inglese)*</label><input type="text" name="DescrizioneAnnuncio_en" value="{htmlentities($record['DescrizioneAnnuncio_en'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />{*<br/><textarea name="DescrizioneAnnuncio" class="texteditor">{htmlentities($record['DescrizioneAnnuncio'], $smarty.const.ENT_QUOTES, 'UTF-8')}</textarea>*}
        </div>
        <br/>
        <h3 id="section_title"><span class="title">FOTO</span> {if $canEdit}<a href="#" onclick="editFoto(0); return false;" class="button button-icon button-icon-add">Aggiungi una foto</a> <a href="#" onclick="multiuploadFoto(); return false;" class="button button-icon button-icon-addplus">Invia pi&ugrave; foto</a>{/if}</h3>
        <div class="field">
            <label>Virtual Tour</label><input type="text" name="VirtualTour" value="{htmlentities($record['VirtualTour'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Video Tour</label><input type="text" name="VideoTour" value="{htmlentities($record['VideoTour'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <div id="listFoto">
            {if count($foto) > 0}
                {foreach $foto as $f}
                    <div class="foto" id="foto{$f['Id']}">
                        <input type="hidden" name="foto_Id[]" value="{$f['Id']}"/>
                        <input type="hidden" name="foto_Url[]" value="{htmlentities($f['Url'], $smarty.const.ENT_QUOTES, 'UTF-8')}"/>
                        <input type="hidden" name="foto_Copertina[]" value="{$f['Copertina']}"/>
                        <input type="hidden" name="foto_ColoreBordo[]" value="{$f['ColoreBordo']}"/>
                        <input type="hidden" name="foto_Descrizione[]" value="{htmlentities($f['Descrizione'], $smarty.const.ENT_QUOTES, 'UTF-8')}"/>
                        <input type="hidden" name="foto_Descrizione_en[]" value="{htmlentities($f['Descrizione_en'], $smarty.const.ENT_QUOTES, 'UTF-8')}"/>
                        {if $canEdit}<div style="float:left; padding: 50px 10px 0 0;"><input type="button" value="Modifica" class="button" onclick="editFoto({$f['Id']})"/>
                        <br/><br/><input type="button" value="Elimina" class="button" onclick="deleteFoto({$f['Id']})"/></div>{/if}
                        <a href="{combinePath($smarty.const.URL_ROOT, $f['Url'])}" target="_blank"><img class="foto_thumb" src="{$f['Thumb']}" style="border: 2px solid {$f['ColoreBordo']};" /></a>
                        <span class="foto_descrizione">{htmlentities($f['Descrizione'], $smarty.const.ENT_QUOTES, 'UTF-8')}</span>
                        <span class="foto_copertina">{if $f['Copertina']}[Copertina]{/if}</span>
                        <br clear="all"/>
                    </div>
                {/foreach}
            {/if}
                <span class="no-records">Nessuna foto registrata</span>
            </div>
            <div id="tplFoto" class="hide">
                <div class="foto" id="foto__FOTO_ID__">
                    <input type="hidden" name="foto_Id[]" value="__FOTO_ID__"/>
                    <input type="hidden" name="foto_Url[]" value="__FOTO_URL__"/>
                    <input type="hidden" name="foto_Copertina[]" value="__FOTO_COPERTINA__"/>
                    <input type="hidden" name="foto_ColoreBordo[]" value="__FOTO_COLOREBORDO__"/>
                    <input type="hidden" name="foto_Descrizione[]" value="__FOTO_DESCRIZIONE__"/>
                    <input type="hidden" name="foto_Descrizione_en[]" value="__FOTO_DESCRIZIONE_EN__"/>
                    {if $canEdit}<div style="float:left; padding: 50px 10px 0 0;"><input type="button" value="Modifica" class="button" onclick="editFoto(__FOTO_ID__)"/>
                    <br/><br/><input type="button" value="Elimina" class="button" onclick="deleteFoto(__FOTO_ID__)"/></div>{/if}
                    <img class="foto_thumb" src="__FOTO_THUMB__" style="border: 2px solid __FOTO_COLOREBORDO__;" />
                    <span class="foto_descrizione">__FOTO_DESCRIZIONE__</span>
                    <span class="foto_copertina"></span>
                    <br clear="all"/>
                </div>
            </div>
        </div>
        <br/>
        <h3 id="section_title">BILANCIO</h3>
        <br/>
        <h3 id="section_title">MANUTENZIONI</h3>
        <br/>
        <h3 id="section_title">BILANCIO</h3>
        <br/>
        <h3 id="section_title">DANNI</h3>
        <br/>
        <h3 id="section_title">BOLLETTE</h3>
        <br/>
        <div class="toolbar">
            {if $canEdit}<input type="submit" class="button" value="SALVA"/>{/if}
            <input type="button" class="button" value="RITORNA" onclick="window.location='{$smarty.const.PHP_SELF}?IdAppartamento={$appartamentoId}'"/>
        </div>
        
    </form>
        
    <div id="history_affitti">
        <h3 id="section_title">STORICO AFFITTI</h3>
        <div class="history_content">
            <ul>
            {foreach $history_affitti as $affitto}
            <li>
                Dal <strong>{$affitto["DataInizio"]}</strong> al <strong>{$affitto["DataFine"]}</strong> in affitto a <a href="inquilini.php?Id={$affitto["IdInquilino"]}">{htmlentities($affitto["Inquilino"], $smarty.const.ENT_QUOTES, 'UTF-8')}</a> (Caparra: {$affitto.Caparra} &euro; - Canone: {$affitto.Canone} &euro; - Spese: {$affitto.Spese} &euro; - Cauzione: {$affitto.Cauzione} &euro;)
            </li>
            {/foreach}
            </ul>
        </div>
    </div>
    
    <span id="tempId" class="hide"></span>
    <span id="tempColore" class="hide"></span>
    <div id="editFoto" class="hide" title="Foto">
        <form action="?IdAppartamento={$appartamentoId}" class="form" method="post" enctype="multipart/form-data">
            <input type="hidden" name="action" value="upload_foto"/>
            <input type="hidden" name="Id"/>
            <p>
            <div class="field">
                <label>File</label><input type="file" name="Foto"/>
            </div>
            <div class="field">
                <label>Descrizione</label><input type="text" name="Descrizione"/>
            </div>
            <div class="field">
                <label>Descrizione (inglese)</label><input type="text" name="Descrizione_en"/>
            </div>
            <div class="field">
                <label>Copertina</label><select name="Copertina">{html_options values=$sino_values output=$sino_output}</select>
            </div>
            <div class="field">
                <label>Colore bordo</label><div class="mycolorpicker"></div>
            </div>
            </p>
        </form>
    </div>
    {*<div id="editColoreBordo" class="hide" title="Colore bordo">
        <p>
            <div class="mycolorpicker"></div>
        </p>
    </div>*}
    <div id="multiUploadFoto" class="hide" title="Invio multiplo foto">
        <p>
            <div id="fileuploader">Invia</div>
            <div id="eventsmessage"></div>
        </p>
    </div>
        
    <script type="text/javascript">
        var appartamentoId = {$appartamentoId};
        var aptUso = {$aptUso};
        var idStanzaMultipla = {$idStanzaMultipla};
        var dlgFoto, dlgColoreBordo, dlgMultiUploadFoto;
        var myColorPicker;
        var multiUploadFotoObj;
        var canEdit = {if $canEdit}true{else}false{/if};
    {literal}
        $(function () {
            if (canEdit) {
                tinymce.init({selector:'textarea.texteditor', menubar : false, width: 600, height: 100, plugins: "textcolor link image", toolbar: [
                    "undo redo | styleselect | fontsizeselect | forecolor backcolor | bold italic | link image | alignleft aligncenter alignright | bullist numlist outdent indent",
                ]});
            } else {
                setFormReadonly("formEdit");
            }
            
            checkFoto();
            
            myColorPicker = $(".mycolorpicker").ColorPicker({
                flat: true,
                onChange: function(hsb, hex, rgb) {
                    $("#tempColore").text("#" + hex);
                }
            });
            
            dlgFoto = $("#editFoto");
            dlgFoto.dialog({
                width: 400,
                height: 570,
                autoOpen: false,
                modal: true,
                buttons: {
                    "Conferma": function() {
                        var id = parseInt(dlgFoto.find("input[name=Id]").val());
                        var isNew = (id == 0);
                        if (isNew)
                            id = -(new Date().getTime());
                        var copertina = dlgFoto.find("select[name=Copertina]").val();
                        var descrizione = dlgFoto.find("input[name='Descrizione']").val();
                        var descrizioneEn = dlgFoto.find("input[name='Descrizione_en']").val();
                        var coloreBordo = $("#tempColore").html();
                        if (!isNew) {
                            toggleBusy(true);
                            if (copertina == 1) {
                                $("#listFoto input[name=\"foto_Copertina\[\]\"]").val("0");
                                $("#listFoto span.foto_copertina").html("");
                            }
                            $("#foto" + id + " input[name=\"foto_Descrizione\[\]\"]").val(descrizione);
                            $("#foto" + id + " input[name=\"foto_Descrizione_en\[\]\"]").val(descrizioneEn);
                            $("#foto" + id + " input[name=\"foto_Copertina\[\]\"]").val(copertina);
                            $("#foto" + id + " input[name=\"foto_ColoreBordo\[\]\"]").val(coloreBordo);
                            $("#foto" + id + " span.foto_descrizione").html(htmlEncode(descrizione));
                            $("#foto" + id + " span.foto_copertina").html(copertina == 1 ? "[Copertina]" : "");
                            $("#foto" + id + " img.foto_thumb").css("border-color", coloreBordo);
                            dlgFoto.dialog("close");
                            toggleBusy(false);
                        } else {
                            var file = dlgFoto.find("input[name='Foto']").val();
                            if (file == "") {
                                alert("Selezionare il file");
                                return;
                            }
                            toggleBusy(true);
                            dlgFoto.find("form").ajaxForm({
                                dataType: 'json',
                                success: function (data) {
                                    if (data.success) {
                                        var html = $("#tplFoto").html();
                                        var fotoData = $.parseJSON(data.message);
                                        html = html.replace(/__FOTO_ID__/g, id);
                                        html = html.replace(/__FOTO_URL__/g, htmlEncode(fotoData.url));
                                        html = html.replace(/__FOTO_THUMB__/g, URL_ROOT + fotoData.thumb);
                                        html = html.replace(/__FOTO_COPERTINA__/g, copertina);
                                        html = html.replace(/__FOTO_COLOREBORDO__/g, coloreBordo);
                                        html = html.replace(/__FOTO_DESCRIZIONE__/g, htmlEncode(descrizione));
                                        html = html.replace(/__FOTO_DESCRIZIONE_EN__/g, htmlEncode(descrizioneEn));
                                        $("#listFoto").append(html);
                                        if (copertina == 1) {
                                            $("#listFoto input[name=\"foto_Copertina\[\]\"]").val("0");
                                            $("#listFoto span.foto_copertina").html("");
                                            $("#foto" + id + " input[name=\"foto_Copertina\[\]\"]").val(copertina);
                                            $("#foto" + id + " span.foto_copertina").html("[Copertina]");
                                        }
                                        $("#listFoto .no-records").hide();
                                        dlgFoto.dialog("close");
                                    } else {
                                        alert(data.messagge != "" ? data.message : "Si e' verificato un errore");
                                    }
                                    toggleBusy(false);
                                },
                                error: function(x, textStatus, errorThrown) {
                                    toggleBusy(false);
                                    alert("Si e' verificato un errore");
                                    //+x.responseText
                                    //dump(x);
                                }
                            });
                            dlgFoto.find("form").submit();
                        }
                    }
                }
            });
            
            /*dlgColoreBordo = $("#editColoreBordo");
            dlgColoreBordo.dialog({
                width: 400,
                height: 330,
                autoOpen: false,
                modal: true,
                buttons: {
                    "Conferma": function() {
                        $("#foto" + $("#tempId").text() + " input[name='foto_ColoreBordo[]']").val($("#tempColore").html());
                        $("#foto" + $("#tempId").text() + " .colore-bordo").css("background-color", $("#tempColore").html());
                        dlgColoreBordo.dialog("close");
                    }
                }
            });*/
            
            dlgMultiUploadFoto = $("#multiUploadFoto");
            dlgMultiUploadFoto.dialog({
                width: 540,
                height: 450,
                autoOpen: false,
                modal: true,
                buttons: {
                    "Conferma": function() {
                        multiUploadFotoObj.startUpload();
                        //toggleBusy(true);
                    }
                }
            });
            multiUploadFotoObj = $("#fileuploader").uploadFile({
                url: "?action=upload_foto_multi&IdAppartamento=" + appartamentoId,
                multiple: true,
                autoSubmit: false,
                allowedTypes: "png,gif,jpg,jpeg",
                //maxFileCount: 10,
                dragDropStr: "<span><b>Trascina e rilascia i files qui</b></span>",
                abortStr: "Abbandona",
                cancelStr: "Annulla",
                doneStr: "Fatto",
                extErrorStr: "non &egrave; consentito. Estensioni consentite: ",
                duplicateErrorStr: "non &egrave; consentito. Il file &egrave; gi&agrave; stato inserito.",
                sizeErrorStr: "non &egrave; consentita. Dimensione massima consentita: ",
                uploadErrorStr: "Invio non consentito",
                maxFileCountErrorStr: "non &egrave; consentito. Numero massimo di files consentiti: ",
                downloadStr: "Scarica",
                fileName: "Foto",
                onSuccess: function(files,data,xhr) {
                    //$("#eventsmessage").html($("#eventsmessage").html()+"<br/>Success for: "+JSON.stringify(data));
                    if (data)
                        data = $.parseJSON(data);
                    if (data && data.url) {
                        var id = -(new Date().getTime());
                        var copertina = 0;
                        var coloreBordo = "#2a9ad1";
                        var descrizione = "";
                        var descrizioneEn = "";
                        var html = $("#tplFoto").html();
                        html = html.replace(/__FOTO_ID__/g, id);
                        html = html.replace(/__FOTO_URL__/g, URL_ROOT + data.url);
                        html = html.replace(/__FOTO_THUMB__/g, URL_ROOT + data.thumb);
                        html = html.replace(/__FOTO_COPERTINA__/g, copertina);
                        html = html.replace(/__FOTO_COLOREBORDO__/g, coloreBordo);
                        html = html.replace(/__FOTO_DESCRIZIONE__/g, htmlEncode(descrizione));
                        html = html.replace(/__FOTO_DESCRIZIONE_EN__/g, htmlEncode(descrizioneEn));
                        $("#listFoto").append(html);
                        $("#listFoto .no-records").hide();
                    }
                }/*,
                afterUploadAll: function() {
                    toggleBusy(false);
                    //dlgMultiUploadFoto.dialog("close");
                }*/
            });
        });
        
        function editFoto (id) {
            dlgFoto.find("input[name=Id]").val(id);
            if (id != 0) {
                dlgFoto.find("input[type=file]").parent().hide();
                dlgFoto.find("input[name=Descrizione]").val($("#foto" + id + " input[name=\"foto_Descrizione\[\]\"]").val());
                dlgFoto.find("input[name=Descrizione_en]").val($("#foto" + id + " input[name=\"foto_Descrizione_en\[\]\"]").val());
                dlgFoto.find("select[name=Copertina]").val($("#foto" + id + " input[name=\"foto_Copertina\[\]\"]").val());
                myColorPicker.ColorPickerSetColor($("#foto" + id + " input[name=\"foto_ColoreBordo\[\]\"]").val());
            } else {
                dlgFoto.find("input[type=file]").val("");
                dlgFoto.find("input[type=file]").parent().show();
                dlgFoto.find("input[type=text]").val("");
                dlgFoto.find("select").val(0);
                var defaultColor = "#2a9ad1";
                $("#tempColore").html(defaultColor);
                myColorPicker.ColorPickerSetColor(defaultColor);
            }
            dlgFoto.removeClass("hide");
            dlgFoto.dialog("open");
        }
        function deleteFoto (id) {
            confirmDelete(function(id) {
                $("#foto" + id).remove();
                checkFoto();
            }, id);
        }
        function checkFoto () {
            if ($("#listFoto .foto").length == 0)
                $("#listFoto .no-records").show();
            else
                $("#listFoto .no-records").hide();
        }
        function fotoCopertina (id) {
            $("#listFoto input[name=foto_Copertina\\[\\]]").val("0");
            $("#listFoto .Copertina").html("NO");
            $("#foto" + id + " input[name=foto_Copertina\\[\\]]").val("1");
            $("#foto" + id + " .Copertina").html("SI");
        }
        
        /*function editBorderColor (id) {
            $("#tempId").text(id);
            var currentColor = $("#foto" + id + " input[name='foto_ColoreBordo[]']").val();
            $("#tempColore").html(currentColor);
            myColorPicker.ColorPickerSetColor(currentColor);
            dlgColoreBordo.removeClass("hide");
            dlgColoreBordo.dialog("open");
        }*/
        
        function multiuploadFoto () {
            $("#eventsmessage").html("");
            dlgMultiUploadFoto.removeClass("hide");
            dlgMultiUploadFoto.dialog("open");
        }
        
        /*$(document).ready(function() {
            
            var sPrezzoSuggerito = $("input[name=PrezzoSuggerito]");
            var sPrezzoDinamico = $("input[name=PrezzoDinamico]");
            var sPrezzoScontato = $("input[name=PrezzoScontato]");
            
            sPrezzoSuggerito.change(function(){
                var prezzoSuggerito = parseFloat(sPrezzoSuggerito.val());
                
                if(parseInt(idStanzaMultipla) > 0){
                    sPrezzoDinamico.val(prezzoSuggerito + 25);
                }else if(parseInt(aptUso) === 2){
                    sPrezzoDinamico.val(prezzoSuggerito + 100);
                }else{
                    sPrezzoDinamico.val(prezzoSuggerito + 50);
                }
                
            });

        });*/
        
    {/literal}
    </script>
        
{/if}

{include file="footer.tpl"}