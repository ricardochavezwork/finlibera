{assign var=pageTitle value={#admin_appartamenti#}}
{assign var=menuActive value="admin"}
{assign var=menuSubActive value="appartamenti"}
{if !isset($record)}
{assign var=breadcrumb value="<li class='active'>Appartamenti</li>"}
{else}
{assign var=breadcrumb value="<li class='active'><a href='?'>Appartamenti</a></li>"}
{/if}
{include file="header.tpl"}
<link rel="stylesheet" href="{$smarty.const.URL_ROOT}_gestione/css/style_property.css"/>
<script src='{$smarty.const.URL_ROOT}_gestione/js/lib.js{$mobileV_js}'></script>

{if isset($error)}
    <div class="errore">{$error}</div>
{/if}
{if isset($saved)}
    <div class="conferma">I dati sono stati acquisiti correttamente</div>
{/if}

{if !isset($record)}
    
    <style type="text/css">
        #maincont { width: 1115px; }
    </style>
    
    <h3 id="section_title">Elenco Appartamenti</h3>
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
                    {display: '', name : 'CellActions', width : 310, sortable : false, align: 'right'},
                    {display: 'Id', name : 'Id', hide: true},
                    {display: 'Indirizzo', name : 'Indirizzo', width : 150, sortable : true},
                    {display: 'Civico', name : 'Civico', width : 40, sortable : false},
                    {display: 'Zona', name : 'Zona', width : 35, sortable : false},
                    {display: 'Mq', name : 'Mq', width : 30, sortable : true},
                    {display: 'Stanze', name : 'Stanze', width : 45, sortable : true},
                    {display: 'Auto', name : 'PostoAuto', width : 35, sortable : true},
                    {display: 'Bagni', name : 'Bagni', width : 40, sortable : true},
                    {display: 'Sala', name : 'SalaPranzo', width : 35, sortable : true},
                    {display: 'Balconi', name : 'Balconi', width : 50, sortable : true},
                    {display: 'Terrazzi', name : 'Terrazzi', width : 50, sortable : true},
                    {display: 'Utile Att', name : 'Utile', width : 51, sortable : true},
                    {display: 'Utile/S Att', name : 'UtileStanza', width : 60, sortable : true},
                    {display: 'Utile Pro', name : 'UtilePro', width : 50, sortable : true},
                    {display: 'Utile/S Pro', name : 'UtileStanzaPro', width : 60, sortable : true},
                    {display: 'UtileS Diff', name : 'UtileSDiff', width : 65, sortable : true}
                ],
                usepager: true,
                useRp: true,
                rpOptions: [50, 100, 200, 250],
                rp: DEFAULT_LIST_LIMIT,
                onSubmit: addFormData,
                onSuccess: function() { $("#listRecords .button").button(); },
                buttons : [
                    {name: 'Nuovo Appartamento', bclass: 'add', onpress : function() { if (!canEdit) noPrivilege(); else window.location = "?Id=0"; }}
                ]
            });
        }
        function deleteRecord(id) {
            confirmDelete(function(id) {
                toggleBusy(true);
                window.location = "?action=delete&Id=" + id;
            }, id);
        }
        function addFormData() {
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
        .mezzo, .poi, .foto {margin-bottom: 2px;}
    </style>
    {/literal}
    
    <form id="formEdit" action="{$smarty.const.PHP_SELF}" method="post" class="form">
        <input type="hidden" name="action" value="save"/>
        <input type="hidden" name="Id" value="{$record['Id']}"/>
        
        <h3 id="section_title">INDIRIZZO</h3>
        {if $record['Id'] > 0}
        <div class="field">
            <label>Id</label><strong>{$record['Id']}</strong>
        </div>
        {/if}      
        <div class="field">
            <label>Visibile</label><select name="Visibile">{html_options values=$sino_values output=$sino_output selected=$record['Visibile']}</select>
        </div>
        <div class="field">
            <label>Societa</label><select name="Societa">{html_options values=$societa_values output=$t_societa selected=$record['Societa']}</select>
        </div>
        <div class="field">
            <label>Cedolare Secca*</label><select name="CedolareSecca">{html_options values=$cedolaresecca_values output=$cedolaresecca_output selected=$record['CedolareSecca']}</select>
        </div>
        <div class="field">
            <label>Tipo Immobile</label><select name="TipologiaImmobile">{html_options values=$tipoImmobile_values output=$tipoImmobile_output selected=$record['TipologiaImmobile']}</select>
        </div>
        <div class="field">
            <label>Uso</label><select name="UsoImmobile">{html_options values=$usoImmobile_values output=$usoImmobile_output selected=$record['UsoImmobile']}</select>
        </div>
        <div class="field">
            <label>Via/Piazza*</label><input type="text" name="Indirizzo" value="{htmlentities($record['Indirizzo'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Civico*</label><input type="text" name="Civico" value="{htmlentities($record['Civico'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>C.A.P.*</label><input type="text" class="input_numeric" name="CAP" value="{htmlentities($record['CAP'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Comune*</label><input type="text" name="Comune" value="{htmlentities($record['Citta'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Provincia*</label><input type="text" name="Provincia" value="{htmlentities($record['Provincia'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Nazione</label><select name="Nazione">{html_options values=$countries_values selected=$countries_selected output=$countries_output}</select>
        </div>
        <div class="field">
            <label>Zona</label><select id="Zona" name="Zona">{html_options values=$zona_values output=$zona_output selected=$record['Zona']}</select><br/><label>&nbsp;</label><img id="mappa" src="{$smarty.const.URL_ROOT}images/blank.gif" />
        </div>
        <div class="field">
            <label>Specifica Zona</label><input type="text" name="Descrizione" value="{htmlentities($record['Descrizione'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Citofono*</label><input type="text" name="Citofono" value="{htmlentities($record['Citofono'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        </br>
        <button class="btn btn-default collapse2pt btn-block" type="button">
            <h5>Contratti</h5>
        </button>

        <br>

        {if $canEdit}
        <button class="btn btn-default new-row__apt-contratto" type="button">
            <h5>Aggiungi</h5>
        </button>
        <br><br>
        {/if}

        <div class="registro-kanban">
        </div>
        
        <div class="field">
            <label>Indicazioni e Appunti</label><br/><textarea name="Indicazioni" class="texteditor">{htmlentities($record['Indicazioni'], $smarty.const.ENT_QUOTES, 'UTF-8')}</textarea>
        </div>
        <div class="field">
            <label>Tipo Stabile*</label><select name="TipoStabile">{html_options values=$tipostabile_values output=$tipostabile_output selected=$record['TipoStabile']}</select>
        </div>
        <br/>
        <h3 id="section_title">DATI CATASTALI</h3>
        <div class="field">
            <label>Mappale</label><input type="text" name="Mappale" value="{htmlentities($record['Mappale'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Foglio</label><input type="text" name="Foglio" value="{htmlentities($record['Foglio'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Subalterno</label><input type="text" name="Subalterno" value="{htmlentities($record['Subalterno'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Particella</label><input type="text" name="Particella" value="{htmlentities($record['Particella'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Classe</label><input type="text" name="Classe" value="{htmlentities($record['Classe'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Categoria</label><input type="text" name="Categoria" value="{htmlentities($record['Categoria'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Rendita</label><input type="text" class="input_decimal" name="Rendita" value="{htmlentities($record['Rendita'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Piano</label><input type="text" name="Piano" class="input_numeric" value="{if $record['Piano'] === 0}0{else}{htmlentities($record['Piano'], $smarty.const.ENT_QUOTES, 'UTF-8')}{/if}" />
        </div>
        <div class="field">
            <label>Scala</label><input type="text" name="Scala" value="{htmlentities($record['Scala'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Classe Energetica*</label><input type="text" name="ClasseEnergetica" value="{htmlentities($record['ClasseEnergetica'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>I.P.E.</label><input type="text" name="IPE" value="{htmlentities($record['IPE'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <br/>
        <h3 id="section_title">COMPOSIZIONE APPARTAMENTO</h3>
        <div class="field">
            <label>Stanze*</label><input type="text" class="input_numeric" name="Stanze" value="{htmlentities($record['Stanze'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Bagni*</label><input type="text" class="input_numeric" name="Bagni" value="{htmlentities($record['Bagni'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Cucina abitabile</label><select name="CucinaAbitabile">{html_options values=$sino_values output=$sino_output selected=$record['CucinaAbitabile']}</select>
        </div>
        <div class="field">
            <label>Sala pranzo</label><select name="SalaPranzo">{html_options values=$sino_values output=$sino_output selected=$record['SalaPranzo']}</select>
        </div>
        <div class="field">
            <label>Balconi*</label><input type="text" class="input_numeric" name="Balconi" value="{htmlentities($record['Balconi'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Terrazzi*</label><input type="text" class="input_numeric" name="Terrazzi" value="{htmlentities($record['Terrazzi'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Mq*</label><input type="text" class="input_numeric" name="Mq" value="{htmlentities($record['Mq'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <br/>
        <h3 id="section_title">DOTAZIONI APPARTAMENTO</h3>
        <div class="field">
            <label>TV</label><select name="Tv">{html_options values=$sino_values output=$sino_output selected=$record['Tv']}</select>
        </div>
        <div class="field">
            <label>WI-FI</label><select name="Wifi">{html_options values=$sino_values output=$sino_output selected=$record['Wifi']}</select>
        </div>
        <div class="field">
            <label>Lavatrice</label><select name="Lavatrice">{html_options values=$sino_values output=$sino_output selected=$record['Lavatrice']}</select>
        </div>
        <div class="field">
            <label>Lavastoviglie</label><select name="Lavastoviglie">{html_options values=$sino_values output=$sino_output selected=$record['Lavastoviglie']}</select>
        </div>
        <div class="field">
            <label>Boiler Acqua*</label><input type="text" name="BoilerAcqua" value="{htmlentities($record['BoilerAcqua'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Riscaldamento</label><select name="Riscaldamento">{html_options values=$riscaldamento_values output=$riscaldamento_output selected=$record['Riscaldamento']}</select>
        </div>
        <br/>
        <h3 id="section_title">COMPOSIZIONE STABILE</h3>
        <div class="field">
            <label>Portineria</label><select name="Portineria">{html_options values=$sino_values output=$sino_output selected=$record['Portineria']}</select>
        </div>
        <div class="field">
            <label>Ascensore</label><select name="Ascensore">{html_options values=$sino_values output=$sino_output selected=$record['Ascensore']}</select>
        </div>
        <div class="field">
            <label>Giardino</label><select name="Giardino">{html_options values=$sino_values output=$sino_output selected=$record['Giardino']}</select>
        </div>
        <div class="field">
            <label>Parco</label><select name="Parco">{html_options values=$sino_values output=$sino_output selected=$record['Parco']}</select>
        </div>
        <div class="field">
            <label>Posti Auto*</label><input type="text" class="input_numeric" name="PostoAuto" value="{htmlentities($record['PostoAuto'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Posti Bici*</label><input type="text" class="input_numeric" name="PostoBici" value="{htmlentities($record['PostoBici'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Abitato prev. da famiglie italiane</label><select name="FamIta">{html_options values=$sino_values output=$sino_output selected=$record['FamIta']}</select>
        </div>
        <br/>
        <h3 id="section_title">DATI DELLO STABILE</h3>
        <div class="field">
            <label>Custode</label><input type="text" name="Custode" value="{htmlentities($record['Custode'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Telefono Custode</label><input type="text" name="CustodeTelefono" value="{htmlentities($record['CustodeTelefono'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Orari Portineria</label><input type="text" name="OrariPortineria" value="{htmlentities($record['OrariPortineria'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Amministratore</label><input type="text" name="Amministratore" value="{htmlentities($record['Amministratore'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Indirizzo Amm.</label><input type="text" name="AmministratoreIndirizzo" value="{htmlentities($record['AmministratoreIndirizzo'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Telefono Amm.</label><input type="text" name="AmministratoreTelefono" value="{htmlentities($record['AmministratoreTelefono'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Fax Amm.</label><input type="text" name="AmministratoreFax" value="{htmlentities($record['AmministratoreFax'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Email Amm.</label><input type="text" name="AmministratoreEmail" value="{htmlentities($record['AmministratoreEmail'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <br/>
        <h3 id="section_title"><span class="title">MEZZI PUBBLICI</span> {if $canEdit}<a href="#" onclick="editMezzo(0); return false;" class="button button-icon button-icon-add">Aggiungi un mezzo</a>{/if}</h3>
        <div class="field">
            <div id="listMezzi">
            {if count($mezzi) > 0}
                {foreach $mezzi as $mezzo}
                    <div class="mezzo" id="mezzo{$mezzo['Id']}">
                        <input type="hidden" name="mezzi_Id[]" value="{$mezzo['Id']}"/>
                        <input type="hidden" name="mezzi_Tipo[]" value="{$mezzo['Tipo']}"/>
                        <input type="hidden" name="mezzi_Metro[]" value="{$mezzo['Metro']}"/>
                        <input type="hidden" name="mezzi_Mezzo[]" value="{htmlentities($mezzo['Mezzo'], $smarty.const.ENT_QUOTES, 'UTF-8')}"/>
                        <input type="hidden" name="mezzi_Distanza[]" value="{htmlentities($mezzo['Distanza'], $smarty.const.ENT_QUOTES, 'UTF-8')}"/>
                        {if $canEdit}<input type="button" value="Elimina" class="button" onclick="deleteMezzo({$mezzo['Id']})"/>{/if}
                        <img src="{$smarty.const.URL_ROOT}images/mezzo_{$mezzo['Tipo']}.png"/>
                        {if $mezzo["Metro"]}<span class="metro metro-{$mezzo["Metro"]}">{$mezzo["Metro"]}</span>{/if}<span>{htmlentities($mezzo['Mezzo'], $smarty.const.ENT_QUOTES, 'UTF-8')}{if intval($mezzo["Tipo"]) == MEZZI_METROPOLITANA} - Distanza: {htmlentities($mezzo['Distanza'], $smarty.const.ENT_QUOTES, 'UTF-8')}m{/if}</span>
                    </div>
                {/foreach}
            {/if}
               <span class="no-records">Nessun mezzo registrato</span>
            </div>
            <div id="tplMezzo" class="hide">
                <div class="mezzo" id="mezzo__MEZZO_ID__">
                    <input type="hidden" name="mezzi_Id[]" value="__MEZZO_ID__"/>
                    <input type="hidden" name="mezzi_Tipo[]" value="__MEZZO_TIPO__"/>
                    <input type="hidden" name="mezzi_Metro[]" value="__MEZZO_METRO__"/>
                    <input type="hidden" name="mezzi_Mezzo[]" value="__MEZZO_MEZZO__"/>
                    <input type="hidden" name="mezzi_Distanza[]" value="__MEZZO_DISTANZA__"/>
                    <input type="button" value="Elimina" class="button" onclick="deleteMezzo(__MEZZO_ID__)"/>
                    <img src="{$smarty.const.URL_ROOT}images/mezzo___MEZZO_TIPO__.png"/>
                    <span class="fermata">__MEZZO_MEZZO__<span class="distanza"> - Distanza: __MEZZO_DISTANZA__m</span></span>
                </div>
            </div>
        </div>
        <br/>
        <h3 id="section_title"><span class="title">PUNTI DI INTERESSE NELLA ZONA (P.O.I.)</span> {if $canEdit}<a href="#" onclick="editPOI(0); return false;" class="button button-icon button-icon-add">Aggiungi un P.O.I.</a>{/if}</h3>
        <div class="field">
            <div id="listPOI">
            {if count($poi) > 0}
                {foreach $poi as $pi}
                    <div class="poi" id="poi{$pi['Id']}">
                        <input type="hidden" name="poi_Id[]" value="{$pi['Id']}"/>
                        <input type="hidden" name="poi_Nome[]" value="{htmlentities($pi['Nome'], $smarty.const.ENT_QUOTES, 'UTF-8')}"/>
                        <input type="hidden" name="poi_UrlMappa[]" value="{htmlentities($pi['UrlMappa'], $smarty.const.ENT_QUOTES, 'UTF-8')}"/>
                        <input type="hidden" name="poi_UrlStreetView[]" value="{htmlentities($pi['UrlStreetView'], $smarty.const.ENT_QUOTES, 'UTF-8')}"/>
                        {if $canEdit}<input type="button" value="Elimina" class="button" onclick="deletePOI({$pi['Id']})"/>{/if}
                        <span>{htmlentities($pi['Nome'], $smarty.const.ENT_QUOTES, 'UTF-8')} - <a target="_blank" href="{htmlentities($pi['UrlMappa'], $smarty.const.ENT_QUOTES, 'UTF-8')}">Mappa</a> - <a target="_blank" href="{htmlentities($pi['UrlStreetView'], $smarty.const.ENT_QUOTES, 'UTF-8')}">Street View</a></span>
                    </div>
                {/foreach}
            {/if}
                <span class="no-records">Nessun P.O.I. registrato</span>
            </div>
            <div id="tplPOI" class="hide">
                <div class="poi" id="poi__POI_ID__">
                    <input type="hidden" name="poi_Id[]" value="__POI_ID__"/>
                    <input type="hidden" name="poi_Nome[]" value="__POI_NOME__"/>
                    <input type="hidden" name="poi_UrlMappa[]" value="__POI_MAPPA__"/>
                    <input type="hidden" name="poi_UrlStreetView[]" value="__POI_STREETVIEW__"/>
                    <input type="button" value="Elimina" class="button" onclick="deletePOI(__POI_ID__)"/>
                    <span>__POI_NOME__ - <a target="_blank" href="__POI_MAPPA__">Mappa</a> - <a target="_blank" href="__POI_STREETVIEW__">Street View</a></span>
                </div>
            </div>
        </div>
        <br/>
        <h3 id="section_title"><span class="title">TASSE</span> {if $canEdit}<a class="button button-icon button-icon-add addTax">Aggiungi Tassa</a> <a class="button taxManager">Gestisci</a>{/if}</h3>
        <div class="field">
            <div class="addTassa">
                <div class="field">
                    <label>Tipologia</label><select name="Attribuzione">{html_options values=$attribuzioni_values output=$attribuzioni_output}</select>
                </div>
                <div class="field">
                    <label>Anno</label>
                    <select id="year" name="TassaAnno">
                        <script>
                            var myDate = new Date();
                            var year = myDate.getFullYear();
                            for(var i = 2010; i < year+5; i++){
                                if(i == year){
                                    document.write('<option value="'+i+'" selected>'+i+'</option>');
                                }else{
                                    document.write('<option value="'+i+'">'+i+'</option>');
                                }
                            }
                        </script>
                    </select>
                </div>
                <div class="field">
                    <label>Importo</label><input type="text" name="TassaImporto" />
                </div>
               {if $canEdit}<a class="button button-icon button-icon-add actionAddTax">Aggiungi</a>{/if}
            </div>
            {if count($tasse) > 0}
                {foreach $tasse as $tassa}
                    <br/>
                    <span>{$tassa['t_Attribuzione']} - Anno: {$tassa['Anno']} - Importo: {$tassa['Importo']}</span>
                    <br class="tassaFields"/>
                {/foreach}
            {else}
                <span class="no-records">Nessuna tassa registrata</span>
            {/if}
        </div>
        <br/>
        <h3 id="section_title"><span class="title">FOTO</span> {if $canEdit}<a href="#" onclick="editFoto(0); return false;" class="button button-icon button-icon-add">Aggiungi una foto</a> <a href="#" onclick="multiuploadFoto(); return false;" class="button button-icon button-icon-addplus">Invia pi&ugrave; foto</a>{/if}</h3>
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
        <h3 id="section_title">ZONA</h3>
        <div class="field">
            <label>Mappa*</label><input type="text" name="UrlMappa" value="{htmlentities($record['UrlMappa'], $smarty.const.ENT_QUOTES, 'UTF-8')}"/>
        </div>
        <div class="field">
            <label>Street View*</label><input type="text" name="UrlStreetView" value="{htmlentities($record['UrlStreetView'], $smarty.const.ENT_QUOTES, 'UTF-8')}"/>
        </div>
        <div class="field">
            <label>Latitudine*</label><input type="text" class="input_decimal" name="Latitudine" value="{htmlentities($record['Latitudine'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Longitudine*</label><input type="text" class="input_decimal" name="Longitudine" value="{htmlentities($record['Longitudine'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <br/>
        <h3 id="section_title">COSTI/RICAVI</h3>
        <div class="field">
            <label>Canone*</label><input type="text" name="Canone" value="{htmlentities($record['Canone'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Spese*</label><input type="text" name="Spese" value="{htmlentities($record['Spese'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <div class="field">
            <label>Bollette*</label><input type="text" name="Bollette" value="{htmlentities($record['Bollette'], $smarty.const.ENT_QUOTES, 'UTF-8')}" />
        </div>
        <br/>
        <div class="toolbar">
            {if $canEdit}<input type="submit" class="button" value="SALVA"/>{/if}
            <input type="button" class="button" value="RITORNA" onclick="window.location='{$smarty.const.PHP_SELF}'"/>
            {if $record["Id"] > 0 && canAccess($smarty.const.PRIV_STANZE_VIEW)}<input type="button" class="button" value="STANZE" onclick="window.location='stanze.php?IdAppartamento={$record["Id"]}'"/>{/if}
            {if $record["Id"] > 0 && canAccess($smarty.const.PRIV_POSTIAUTO_VIEW)}<input type="button" class="button" value="POSTI AUTO" onclick="window.location='postiauto.php?IdAppartamento={$record["Id"]}'"/>{/if}
        </div>
        
    </form>
    
    <span id="tempId" class="hide"></span>
    <span id="tempColore" class="hide"></span>
    <div id="editMezzo" class="hide" title="Mezzo pubblico">
        <form class="form">
            <input type="hidden" name="Id"/>
            <p>
            <div class="field">
                <label>Tipo</label><select name="Tipo">{html_options values=$tipomezzo_values output=$tipomezzo_output}</select>
            </div>
            <div class="field">
                <label>Metropolitana</label><select name="Metro">{html_options values=$metro_values output=$metro_output}</select>
            </div>
            <div class="field">
                <label>Linea Suburbana</label><select name="Passante">{html_options values=$passanti_values output=$passanti_output}</select>
            </div>
            <div class="field">
                <label>Fermata</label><input type="text" name="Mezzo"/>
            </div>
            <div class="field">
                <label>Distanza (in metri)</label><input type="text" class="input_numeric" name="Distanza"/>
            </div>
            </p>
        </form>
    </div>
    <div id="editPOI" class="hide" title="Punto di interesse (P.O.I.)">
        <form class="form">
            <input type="hidden" name="Id"/>
            <p>
            <div class="field">
                <label>Nome</label><input type="text" name="Nome"/>
            </div>
            <div class="field">
                <label>Mappa</label><input type="text" name="Mappa"/>
            </div>
            <div class="field">
                <label>Street View</label><input type="text" name="StreetView"/>
            </div>
            </p>
        </form>
    </div>
    <div id="editFoto" class="hide" title="Foto">
        <form class="form" method="post" enctype="multipart/form-data">
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
    
    {if $record['Id'] > 0 && $countStanze > 1}
    
    <button class="btn btn-default collapse2pt btn-block" type="button">
        <h5>Stanze Doppie</h5>
    </button>
    
    <br>

    {if $canEdit}
    <button class="btn btn-default insert-stanze" type="button">
        <h5>Aggiungi al registro</h5>
    </button>
    <br><br>
    {/if}
    
    <div class="registroStzMultiple">
        <div class="data">
            <table id="registroStzMultiple"></table>
            <div id="registroStzMultiplePager"></div>
        </div>
    </div>
    
    {/if}
    
    <div id="multiUploadFoto" class="hide" title="Invio multiplo foto">
        <p>
            <div id="fileuploader">Invia</div>
            <div id="eventsmessage"></div>
        </p>
    </div>
        
    <script type="text/javascript">
        var dlgMezzo, dlgPOI, dlgFoto, dlgColoreBordo, dlgMultiUploadFoto;
        var myColorPicker;
        var multiUploadFotoObj;
        var canEdit = {if $canEdit}true{else}false{/if};
        var allPOI = [];
        var registro_contratti = new Array();
        {foreach $allPOI as $p name=idx}
            allPOI.push("{$p}");
        {/foreach}
            
         var record;
         {if $record['Id'] > 0}
             record = $.extend(new Appartamento(), {$record_encoded});
         {/if}
             
    {literal}
        
        var row_struct = $('<div class="registro-kanban-row"> <div class="registro-kanban-row__col" row-field="InizioTrattativa"> <span>Inizio Trattativa</span> <div><input type="date"></div> </div> <div class="registro-kanban-row__col" row-field="FineTrattativa"> <span>Fine Trattativa</span> <div><input type="date"></div> </div> <div class="registro-kanban-row__col" row-field="InizioContratto"> <span>Inizio Locazione</span> <div><input type="date"></div> </div> <div class="registro-kanban-row__col" row-field="FineContratto"> <span>Fine Locazione</span> <div><input type="date"></div> </div> <div class="registro-kanban-row__col" row-field="AlertContratto"> <span>Alert Contratto</span> <div><input type="date"></div> </div><div class="registro-kanban-row__col" row-field="Renovated"> <span>Stato Appartamento</span> <div><select> <option value="0" selected="selected">Invariato</option> <option value="1">Nuovo/Ristrutturato</option> </select></div> </div> </div>');
        
        function contratto_row_ui(root, parentRoot, item){
            this.root = root;
            this.parentRoot = parentRoot;
            this.item = item;
        }
        
        contratto_row_ui.prototype.init = function(){
            try{
                var self =  this;
                
                if(!this.item)
                    throw new TypeError('contratto_row_ui.prototype - inti : this.item undefined!');
                
                this.setValues();
                this.setListeners();
            }catch(e){
                console.error(e.message);
            }
        }
        
        contratto_row_ui.prototype.setValues = function(){
            try{
                
                var self = this;
                var item = this.item;
                var root = this.root;
                var matrix = item.getMatrix();
                
                for(var prop in matrix){
                    if(matrix[prop]){
                        root.find('div[row-field="' + prop + '"] input, div[row-field="' + prop + '"] select').val(matrix[prop]);
                    }
                }
                
            }catch(e){
                console.error(e.message);
            }
        }
        
        contratto_row_ui.prototype.setListeners = function(){
            try{
                var self = this;
                var item = this.item;
                var root = this.root;
                
                for(var prop in item){
                    root.find('div[row-field="' + prop + '"] input, div[row-field="' + prop + '"] select').change(function(){
                        var idApt = (record && record.Id) ? record.Id : 0;
                        var val = $(this).val();
                        var isValid = dateValidation(val) ? true : false;
                        var field = $(this).parent().parent();
                        var fieldName = field.attr('row-field');
                        item[fieldName] = val;
                        
                        if(item.InizioContratto && parseInt(idApt) > 0 && isValid){
                            item.Save(function(success){
                                if(!success){
                                    alert("Errore durante il salvataggio... Richiedere supporto.");
                                }
                            });
                        }else if(item.Id && parseInt(item.Id) > 0 && !item.InizioContratto){
                            alert("La data di inizio contratto è obbligatoria.");
                        }
                        
                        
                    });
                }
                
            }catch(e){
                console.error(e.message);
            }
        }
        
        $('button.new-row__apt-contratto').click(function(event){
            var idApt = (record && record.Id) ? record.Id : 0;
            var apt_contratto = new Appartamento_Contratto();
            apt_contratto.Id = 0;
            apt_contratto.IdAppartamento = idApt;

            var row = new contratto_row_ui();
            row.item = apt_contratto;
            row.parentRoot = $('div.registro-kanban');
            row.root = row_struct.clone();
            row.parentRoot.append(row.root);
            row.init();
            
            registro_contratti.push(row);

        });
        
        $(document).ready(function (){
            if(record){
                record.setStanzeMultiple(function (){
                    loadTableRegistroStzMultiple(record);
                });
                
                var apt_contratto = new Appartamento_Contratto();
                apt_contratto.IdAppartamento = record.Id;
                apt_contratto.Load(function(contratti){
                    if(contratti){
                        for(var i = 0; i < contratti.length; i++){
                            var contratto = contratti[i];
                            var row = new contratto_row_ui();
                            row.item = contratto;
                            row.parentRoot = $('div.registro-kanban');
                            row.root = row_struct.clone();
                            row.parentRoot.append(row.root);
                            row.init();
                            registro_contratti.push(row);
                        }
                    }
                });
            }else{
                $('button.new-row__apt-contratto').click();
            }
            
        });
        
        $(function () {
            
            $('#formEdit').submit(function() {
                // DO STUFF...
                $.each(registro_contratti, function(i,param){
                    var item = param.item;
                    for(var prop in item){
                        $('<input />').attr('type', 'hidden')
                        .attr('name', 'contratti[' + i + '][' + prop + ']')
                        .attr('value', item[prop])
                        .appendTo('#formEdit');
                    }
                });
                return true; // return false to cancel form action
            });
            
            $(".form .addTassa").hide();
            $(".form .addTax").click(function(){
                $(".form .addTassa").toggle();
                /*if($(".form .addTassa").is(":visible")){
                    $(".form .addTax").text("Indietro");
                    //$(".form .addTax").removeClass("button-icon-add");
                    //$(".form .addTax").addClass("");
                }else{
                    $(".form .addTax").text("Aggiungi Tassa");
                    $(".form .addTax").addClass("button button-icon-add");
                }*/
            });
            
            /*$(".form .addTassa .addTax").click(function(){
                alert("Ecco!");
            });*/
            
            $(".form").on("click",".addTassa .actionAddTax", function(){
                var p_idAppartamento = $(".form input[name='Id']").val();
                var t_Tipologia = $( ".form .addTassa select[name='Attribuzione'] option:selected" ).text();
                var p_Tipologia = $(".form .addTassa select[name='Attribuzione']").val();
                var p_Anno = $(".form .addTassa select[name='TassaAnno']").val();
                var p_Importo = $(".form .addTassa input[name='TassaImporto']").val();
                var errore = false;
                
                if(p_Importo <= 0 && p_Tipologia <= 0){
                    bootbox.alert("Campi mancanti!");
                    errore = true;
                }else if(p_Importo <= 0){
                    bootbox.alert("Inserire importo!");
                    errore = true;
                }else if(p_Tipologia <= 0){
                    bootbox.alert("Scegliere una tipologia!");
                    errore = true;
                }
                
                if(errore === false){
                    $.ajax({
                        type: 'GET',
                        url: '?action=saveTassa',
                        data: ('idAppartamento='+p_idAppartamento+'&idAttribuzione='+p_Tipologia+'&year='+p_Anno+'&importo='+p_Importo),
                        success: function(res){
                            if(res.success === true){
                                bootbox.alert(res.message);
                                $( ".tassaFields" ).last().after( '<br/><span>' + t_Tipologia + ' - Anno: '+ p_Anno +' - Importo: '+ p_Importo +'</span><br class="tassaFields"/>' );
                                
                                $(".form .addTassa select[name='Attribuzione']").val(0);
                                $(".form .addTassa input[name='TassaImporto']").val("");
                            }else if(res.success === false){
                                bootbox.alert(res.message);
                            }
                        } 
                    });
                }
                
            });
            
            if (canEdit) {
                tinymce.init({selector:'textarea.texteditor', menubar : false, width: 600, height: 150, plugins: "textcolor link image", toolbar: [
                    "undo redo | styleselect | fontsizeselect | forecolor backcolor | bold italic | link image | alignleft aligncenter alignright | bullist numlist outdent indent",
                ]});
            }
            
            $("#Zona").change(function() {
                showMappa();
            });
            showMappa();
            
            checkMezzi();
            checkPOI();
            checkFoto();
            
            $("#editPOI input[name=Nome]").autocomplete({
                source: allPOI
            });
            
            if (!canEdit) {
                setFormReadonly("formEdit");
            }
            
            myColorPicker = $(".mycolorpicker").ColorPicker({
                flat: true,
                onChange: function(hsb, hex, rgb) {
                    $("#tempColore").text("#" + hex);
                }
            });
            
            dlgMezzo = $("#editMezzo");
            dlgPOI = $("#editPOI");
            dlgFoto = $("#editFoto");
            
            dlgMezzo.dialog({
                width: 400,
                height: 370,
                autoOpen: false,
                modal: true,
                buttons: {
                    "Conferma": function() {
                        //var bValid = true;
                        //allFieldsMezzo.removeClass( "ui-state-error" );
                        var idMezzo = parseInt(dlgMezzo.find("input[name=Id]").val());
                        if (idMezzo == 0)
                            idMezzo = -(new Date().getTime());
                        var nomeMezzo = dlgMezzo.find("input[name='Mezzo']").val().trim();
                        var tipoMezzo = dlgMezzo.find("select[name=Tipo]").val();
                        var metroMezzo = dlgMezzo.find("select[name=Metro]").val();
                        var passanteMezzo = dlgMezzo.find("select[name=Passante]").val();
                        var distanza = dlgMezzo.find("input[name='Distanza']").val().trim();
                        if (tipoMezzo == "2") {
                            nomeMezzo = passanteMezzo;
                        }
                        if (nomeMezzo == "") {
                            alert("Digitare la Fermata");
                            return;
                        }
                        if (tipoMezzo != "0") {
                            var found = false;
                            var allMezzi = $("#listMezzi .mezzo");
                            $.each(allMezzi, function(index, value) {
                                if ($(value).find("input[name='mezzi_Tipo\[\]']").val() == tipoMezzo && $(value).find("input[name='mezzi_Mezzo\[\]']").val() == nomeMezzo) {
                                    found = true;
                                    return false;
                                }
                            });
                            if (found) {
                                dlgMezzo.dialog("close");
                                return;
                            }
                        }
                        var html = $("#tplMezzo").html();
                        html = html.replace(/__MEZZO_ID__/g, idMezzo);
                        html = html.replace(/__MEZZO_TIPO__/g, tipoMezzo);
                        html = html.replace(/__MEZZO_METRO__/g, metroMezzo);
                        html = html.replace(/__MEZZO_MEZZO__/g, htmlEncode(nomeMezzo));
                        html = html.replace(/__MEZZO_DISTANZA__/g, htmlEncode(distanza));
                        $("#listMezzi").append(html);
                        if (tipoMezzo == "0") {
                            $("#mezzo" + idMezzo + " .fermata").before($("<span/>").addClass("metro").addClass("metro-" + metroMezzo).text(metroMezzo));
                        } else {
                            $("#mezzo" + idMezzo + " .distanza").remove();
                        }
                        $("#listMezzi .no-records").hide();
                        dlgMezzo.dialog("close");
                    }
                }
            });
            dlgMezzo.find("select[name=Tipo]").change(function() {
                var selectMetro = dlgMezzo.find("select[name=Metro]");
                var selectPassante = dlgMezzo.find("select[name=Passante]");
                var textMezzo = dlgMezzo.find("input[name=Mezzo]");
                var textDistanza = dlgMezzo.find("input[name=Distanza]");
                if ($(this).val() == "0") {
                    selectPassante.parent().hide();
                    selectMetro.parent().show();
                    selectMetro.val(selectMetro.find(":first").attr("value"));
                    textMezzo.parent().show();
                    textDistanza.parent().show();
                } else {
                    selectMetro.parent().hide();
                    textDistanza.parent().hide();
                    textMezzo.parent().hide();
                    if ($(this).val() == "2") {
                        textMezzo.parent().hide();
                        selectPassante.parent().show();
                        selectPassante.val(selectPassante.find(":first").attr("value"));
                    } else {
                        selectPassante.parent().hide();
                        textMezzo.parent().show();
                    }
                }
            });
            
            dlgPOI.dialog({
                width: 400,
                height: 310,
                autoOpen: false,
                modal: true,
                buttons: {
                    "Conferma": function() {
                        var id = parseInt(dlgPOI.find("input[name=Id]").val());
                        if (id == 0)
                            id = -(new Date().getTime());
                        var nome = dlgPOI.find("input[name='Nome']").val().trim();
                        var mappa = dlgPOI.find("input[name=Mappa]").val().trim();
                        var streetView = dlgPOI.find("input[name='StreetView']").val().trim();
                        if (nome == "") {
                            alert("Digitare il Nome");
                            return;
                        }
                        var html = $("#tplPOI").html();
                        html = html.replace(/__POI_ID__/g, id);
                        html = html.replace(/__POI_NOME__/g, htmlEncode(nome));
                        html = html.replace(/__POI_MAPPA__/g, htmlEncode(mappa));
                        html = html.replace(/__POI_STREETVIEW__/g, htmlEncode(streetView));
                        $("#listPOI").append(html);
                        $("#listPOI .no-records").hide();
                        dlgPOI.dialog("close");
                    }
                }
            });

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
                        var descrizione = dlgFoto.find("input[name='Descrizione']").val();
                        var descrizioneEn = dlgFoto.find("input[name='Descrizione_en']").val();
                        var copertina = dlgFoto.find("select[name=Copertina]").val();
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
                                        if (copertina == 1) {
                                            $("#listFoto input[name=foto_Copertina\\[\\]]").val("0");
                                            $("#listFoto .Copertina").html("NO");
                                        }
                                        var fotoData = $.parseJSON(data.message);
                                        var html = $("#tplFoto").html();
                                        html = html.replace(/__FOTO_ID__/g, id);
                                        html = html.replace(/__FOTO_URL__/g, URL_ROOT + fotoData.url);
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
                                error: function(x) {
                                    toggleBusy(false);
                                    alert("Si e' verificato un errore");
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
                url: "?action=upload_foto_multi",
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
        
        function showMappa() {
            var nZona = $("#Zona").children("option").filter(":selected").text();
            nZona = nZona.substring(0, nZona.indexOf(" "));
            $("#mappa").attr("src", URL_ROOT + "images/mappa/zona_" + (nZona.length < 2 ? "0" : "") + nZona + ".png");
        }
        
        function editMezzo (idMezzo) {
            dlgMezzo.find("input[name=Id]").val(idMezzo);
            dlgMezzo.find("input[type=text]").val("");
            dlgMezzo.find("select").val(0);
            dlgMezzo.find("select[name=Tipo]").val(1);
            dlgMezzo.find("select[name=Tipo]").change();
            dlgMezzo.removeClass("hide");
            dlgMezzo.dialog("open");
        }
        function deleteMezzo (idMezzo) {
            confirmDelete(function(idMezzo) {
                $("#mezzo" + idMezzo).remove();
                checkMezzi();
            }, idMezzo);
        }
        function checkMezzi () {
            if ($("#listMezzi .mezzo").length == 0)
                $("#listMezzi .no-records").show();
            else
                $("#listMezzi .no-records").hide();
        }
        
        function editPOI (id) {
            dlgPOI.find("input[name=Id]").val(id);
            dlgPOI.find("input[type=text]").val("");
            dlgPOI.removeClass("hide");
            dlgPOI.dialog("open");
        }
        function deletePOI (id) {
            confirmDelete(function(id) {
                $("#poi" + id).remove();
                checkPOI();
            }, id);
        }
        function checkPOI () {
            if ($("#listPOI .poi").length == 0)
                $("#listPOI .no-records").show();
            else
                $("#listPOI .no-records").hide();
        }
        
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
        
        function loadTableStanze_Dialog(registro){
            if(registro && registro.length > 0){
                    $(".modal-dialog #registroStanze").jqGrid({
                            datatype: "local",
                            data: registro,
                            editurl: 'clientArray',
                            colModel: [
                                 { label : 'ID', name : 'Id', width : 3, align: 'center', sorttype:'integer', hidden: true },
                                 { label : 'Numero interno della stanza', name : 'Numero', width : 25, align: 'center', sorttype:'number' },
                                 { label : 'Azioni', name : 'CellActions', width : 20, align: 'left', sorttype:'number' }
                            ],
                            viewrecords: true, // show the current page, data rang and total records on the toolbar
                            width: 500,
                            height: 200,
                            pager: "#registroStanzePager"
                    });

                    $("#registroStanze").jqGrid('bindKeys');
            }
        }
        
        function loadTableRegistroStzMultiple(registro){
            
            var stanzeMultiple = loadFieldRegistroStzMultiple(registro);
            
            if(stanzeMultiple && stanzeMultiple.length > 0){
                $("#registroStzMultiple").jqGrid({
                        datatype: "local",
                        data: stanzeMultiple,
                        editurl: 'clientArray',
                        colModel: [
                             { label : 'ID', name : 'IdStanzaMultipla', width : 3, align: 'center', sorttype:'integer', hidden: true },
                             { label : 'Identificativo della stanza', name : 'Indirizzo', width : 25, align: 'left', sorttype:'text' },
                             { label : 'Prezzo suggerito', name : 'PrezzoSuggerito', width : 20, align: 'left', sorttype:'number' }
                        ],
                        viewrecords: true, // show the current page, data rang and total records on the toolbar
                        width: 500,
                        height: 200,
                        pager: "#registroStzMultiplePager",
                        grouping: true,
                        groupingView: {
                            groupField: ["IdStanzaMultipla"],
                            groupColumnShow: [true],
                            groupText: ["StanzaMultiplaID : <b>{0}</b> <button type='button' class='btn btn-default btn-sm removeStanzaMultipla' data-id='{0}' style='margin-left: 30px;'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span> Elimina stanza multipla (Solo relazione)</button>"],
                            groupOrder: ["asc"],
                            groupSummary: [false],
                            groupCollapse: false
                        }
                });
            
                $("#registroStzMultiple").jqGrid('bindKeys');
            }
        }
        
        function reload_registroStzMultiple(){
            record.setStanzeMultiple(function (){
        
                if ( $('#registroStzMultiple').children().length > 0 ) {
                    var stanzeMultiple = loadFieldRegistroStzMultiple(record);

                    jQuery('#registroStzMultiple').jqGrid('clearGridData');
                    jQuery('#registroStzMultiple').jqGrid('setGridParam', {data: stanzeMultiple});
                    jQuery('#registroStzMultiple').trigger('reloadGrid');
                }else{
                    loadTableRegistroStzMultiple(record);
                }

            });
            
        }
        
        function stanzaMultipla_add(arr){
            
            var stanzaMultipla = new Appartamenti_StanzeMultiple();
            stanzaMultipla.IdAppartamento = record.Id;
            stanzaMultipla.Stanze = new Array();
            
            bootbox.confirm({
                title: "Seleziona le stanze",
                message: "<div class='registroStanze'><div class='data'><table id='registroStanze'></table><div id='registroStanzePager'></div></div></div>",
                buttons: {
                    cancel: {
                        label: '<i class="fa fa-times"></i> Cancel'
                    },
                    confirm: {
                        label: '<i class="fa fa-check"></i> Confirm'
                    }
                },
                callback: function (result) {
                    if(result){
                        if(stanzaMultipla.Stanze.length > 0){
                            if(stanzaMultipla.Stanze.length > 1){
                                stanzaMultipla.saveRelationship(function (res){
                                    if(res && res.success){
                                        reload_registroStzMultiple();
                                        bootbox.alert("Salvataggio eseguito con successo!");
                                    }else{
                                        bootbox.alert("Errore durante il salvataggio!");
                                    }
                                });
                            }else{
                                bootbox.alert("Selezionare più stanze!");
                            }
                        }else{
                            bootbox.alert("Nessuna stanza selezionata!");
                        }
                    }
                }
            });
            
            loadTableStanze_Dialog(arr);
            
            $('.modal-content .registroStanze').on('click', '.push', function (){
                var id = parseInt($(this).attr('data-id'));
                var stanza = new Appartamenti_Stanze();
                stanza.Id = id;
                
                stanzaMultipla.Stanze.push(stanza);
                switchButton_Dialog(true, $(this));
            });
            
            $('.modal-content .registroStanze').on('click', '.removeStz', function (){
                var id = parseInt($(this).attr('data-id'));
                stanzaMultipla.Stanze = stanzaMultipla.Stanze.filter(function(el) {
                    return el.Id !== id;
                });
                
                switchButton_Dialog(false, $(this));
            });

        }
        
        function switchButton_Dialog(stato, el){
            var button;
            if(stato){
                button = $(el).replaceWith("<button type='button' class='btn btn-default btn-sm removeStz' data-id='" + $(el).attr('data-id') + "' style='background-color: rgba(255, 0, 0, 0.64); color: white;'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span> Rimuovi</button>");
            }else{
                button = $(el).replaceWith("<button type='button' class='btn btn-default btn-sm push' data-id='" + $(el).attr('data-id') + "'><span class='glyphicon glyphicon-edit' aria-hidden='true'></span> Inserisci</button>");
            }
        }
        
        function loadFieldRegistroStzMultiple(record){
            
            var stanzeMultiple = new Array();
            
            record.StanzeMultiple.forEach(function (arrayElement){
                if(arrayElement && arrayElement.Stanze && arrayElement.Stanze.length > 0){
                    arrayElement.Stanze.forEach(function (stanze){
                        stanze.Indirizzo = record.Indirizzo + " " + record.Civico + " c." + stanze.Numero;
                        stanzeMultiple.push(stanze);
                    });
                }
            });
            
            return stanzeMultiple;
        }
        
        function stanze_prepareDialog(){
            
            var stanze = null;
            var arr = new Array();
            
            if(record.Stanze_Rel){
                stanze = record.Stanze_Rel;
            }
            
            if(stanze && stanze.length > 0){
                stanze.forEach(function (el){
                    if(parseInt(el.IdStanzaMultipla) <= 0 || !el.IdStanzaMultipla){
                        el.CellActions = "<button type='button' class='btn btn-default btn-sm push' data-id='" + el.Id + "'><span class='glyphicon glyphicon-edit' aria-hidden='true'></span> Inserisci</button>";
                        el.Numero = " c." + el.Numero;
                        arr.push(el);
                    }
                });
                
                if(arr.length > 0){
                    stanzaMultipla_add(arr);
                }else{
                    bootbox.alert("Attenzione! Attualmente non ci sono stanze da associare.");
                }
                
            }else{
                bootbox.alert("Nessuna stanza trovata!");
            }
        }
        
        $('.insert-stanze').on('click', function (){
            record.setStanze(function (){
                stanze_prepareDialog();
            });
        });
        
        $('.registroStzMultiple').on('click', '.removeStanzaMultipla', function (){
            var id = parseInt($(this).attr('data-id'));
            var stanzaMultipla = new Appartamenti_StanzeMultiple();
            stanzaMultipla.IdAppartamento = record.Id;
            stanzaMultipla.Id = id;
            
            stanzaMultipla.delete(function (res){
                if(res && res.success){
                    reload_registroStzMultiple();
                    bootbox.alert("Eliminazione avvenuta con successo!");
                }else{
                    bootbox.alert("Errore durante l'eliminazione!");
                }
            });
            
        });
        
    {/literal}
    </script>
        
{/if}

{include file="footer.tpl"}