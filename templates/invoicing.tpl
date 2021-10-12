{assign var=pageTitle value={#admin_newInvoice#}}
{assign var=menuActive value="admin"}
{assign var=menuSubActive value="fatture"}
{if !isset($record)}
{assign var=breadcrumb value="<li class='active'>Crea Fattura</li>"}
{else}
{assign var=breadcrumb value="<li class='active'><a href='?'>Crea Fattura</a></li>"}
{/if}

{include file="header.tpl"}
<link rel="stylesheet" href="{$smarty.const.URL_ROOT}_gestione/css/style_fatture.css" />
<!-- Include dei files js -->
<script src='{$smarty.const.URL_ROOT}_gestione/js/lib.js{$mobileV_js}'></script>

{if isset($error)}
    <div class="errore">{$error}</div>
{/if}

<h4>Dati generali della fattura:</h4>
<div class="table-responsive">
    <table class="table-cell table-1">
        <tr>
            <th class="col-md-4"><h5>Numero di fattura</h5></th>
            <th class="col-md-4"><h5>Data</h5></th>
            <th class="col-md-4"><h5>Totale</h5></th>
        </tr>
        <tr>
            <td class="col-md-4">
                <div class="input-generali input-group input-group-sm">
                  <span class="input-group-addon" id="sizing-addon1">Numero</span>
                  <input name="numero" type="number" class="form-control" placeholder="Fattura" aria-describedby="sizing-addon1">
                </div>
            </td>
            <td class="col-md-4">
                <div class="input-generali input-group-sm">
                    <input type="text" class="flatpickr form-control data-fattura" aria-describedby="sizing-addon1" data-allow-input="true">
                </div>
            </td>
            <td class="col-md-4">
                <div class="input-group-sm">
                    <h4><span class="glyphicon glyphicon-euro" aria-hidden="true"></span> <span id="totale"></span> (beta)</h4>
                </div>
            </td>
        </tr>
    </table>
</div>

{if !$invoice->Id && intval($actionStorno) === 0}
    <!--
    INQUILINO / CLIENTE : Autocomplete
    Leggere la documentazione su http://getbootstrap.com/components/#input-groups-buttons-dropdowns
    -->
    <br>
    <div class="input-generali row">
        <div class="col-lg-6">
            <div class="input-group">
              <div class="input-group-btn">
                  <button type="button" id="dropdownMenu4" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span class="caret"></span></button>
                <ul class="dropdown-menu t-destinatario">
                  <li><a t-destinatario="{$smarty.const.DESTINATARI_INQUILINI}">{$t_tipologiaDestinatario[$smarty.const.DESTINATARI_INQUILINI]}</a></li>
                  <li><a t-destinatario="{$smarty.const.DESTINATARI_CLIENTI}">{$t_tipologiaDestinatario[$smarty.const.DESTINATARI_CLIENTI]}</a></li>
                  <!--li role="separator" class="divider"></li>
                  <li><a href="#">Fornitori</a></li>
                  <li><a href="#">Manutenzioni</a></li-->
                </ul>
              </div><!-- /btn-group -->
              <input name='intestatario' type="text" class="form-control" aria-label="...">
            </div><!-- /input-group -->
        </div><!-- /.col-lg-6 -->
    </div><!-- /.row -->

{else}
    {if $invoice->TipologiaDestinatario == $smarty.const.DESTINATARI_INQUILINI}
        <h5>Destinatario : <label style="font-weight:bold">{$inquilino->Cognome} {$inquilino->Nome}</label></h5>
    {elseif $invoice->TipologiaDestinatario == $smarty.const.DESTINATARI_CLIENTI}
        <h5>Destinatario : <label style="font-weight:bold">{$cliente->Cognome} {$cliente->Nome}</label></h5>
    {/if}
{/if}

<div class="table-responsive" style="overflow: visible">
    <table class="table-cell table-2">
        <thead>
          <tr>
            <th class="col-md-4"><h5>Tipologia di fattura*</h5></th>
            <th class="col-md-4"><h5>Società</h5></th>
            <th class="col-md-4"><h5>Data Fine Locazione</h5></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="col-md-4">
                <div class="input-generali dropdown tipologia_fattura">
                    <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">{*$t_tipologia[$invoice->Tipologia]*}  <span class="caret"></span></button>
                    <ul class="dropdown-menu id-tipologia" aria-labelledby="dropdownMenu1">
                    {if count($tipologia_values) > 0}
                        {foreach $tipologia_values as $tipologia}
                            <li><a id-tipologia="{$tipologia}">{$t_tipologia[$tipologia]}</a>  </li>
                        {/foreach}
                    {/if}
                    </ul>
                </div>
            </td>
            <td class="col-md-4">
                <div class="input-generali dropdown societa">
                    <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu-Societa" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"> <span class="caret"></span></button>
                    <ul class="dropdown-menu id-societa" aria-labelledby="dropdownMenu-Societa">
                    {if count($societa_values) > 0}
                        {foreach $societa_values as $societa}
                            <li><a id-societa="{$societa}">{$t_societa[$societa]}</a>  </li>
                        {/foreach}
                    {/if}
                    </ul>
                </div>
            </td>
            <td class="col-md-4">
                <div class="input-generali input-group-sm">
                    <input type="text" class="flatpickr form-control data-fine" aria-describedby="sizing-addon1" data-allow-input="true">
                </div>
            </td>
          </tr>
        </tbody>
    </table>
</div>
<!-- TIPOLOGIA -->
{*
<div class="input-generali dropdown">
    <h5>Tipologia di fattura*</h5>
    <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">{*$t_tipologia[$invoice->Tipologia]*}{*  <span class="caret"></span></button>*}
{*    <ul class="dropdown-menu id-tipologia" aria-labelledby="dropdownMenu1">
    {if count($tipologia_values) > 0}
        {foreach $tipologia_values as $tipologia}
            <li><a id-tipologia="{$tipologia}">{$t_tipologia[$tipologia]}</a>  </li>
        {/foreach}
    {/if}
    </ul>
</div>

*}

<!-- INS -->
<div class="input-generali dropdown periodo-ins">
    <h5>Seleziona il periodo di locazione contrattuale*</h5>
    <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Dal periodo {$ins->DataInizio} {if $ins->DataFine} Al {$ins->DataFine}{/if}   <span class="caret"></span></button>
    <ul class="dropdown-menu id-ins" aria-labelledby="dropdownMenu2">
    {if count($loadIns) > 0}
        {foreach $loadIns as $inquilinoStanze}
            {if $inquilinoStanze->DataFine}
                <li><a id-ins="{$inquilinoStanze->Id}">Dal periodo {$inquilinoStanze->DataInizio} Al {$inquilinoStanze->DataFine}</a></li>
            {else}
                <li><a id-ins="{$inquilinoStanze->Id}">Dal periodo {$inquilinoStanze->DataInizio}</a></li>
            {/if}
        {/foreach}
    {/if}
    </ul>
</div>

<!-- PERIODO FATTURAZIONE -->
<div class="dropdown periodi-fatturazione">
    <h5>Periodo di fatturazione*</h5>
    <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Dal periodo {$periodiFatturazione_cast->Inizio} Al {$periodiFatturazione_cast->Fine}<span class="caret"></span></button>
    <ul class="dropdown-menu periodo-fatturazione" aria-labelledby="dropdownMenu3">
    {if count($periodiFatturazione) > 0}
            {foreach $periodiFatturazione as $periodo}
                {if $periodo->Inizio == $periodiFatturazione_cast->Inizio}
                <li><a pfi="{$periodo->Inizio}" pff="{$periodo->Fine}">Dal periodo {$periodo->Inizio} Al {$periodo->Fine}</a></li>
            {else}
                <li><a pfi="{$periodo->Inizio}" pff="{$periodo->Fine}">Dal periodo {$periodo->Inizio} Al {$periodo->Fine}</a></li>
            {/if}
        {/foreach}
    {/if}
    </ul>
</div>

<div class="table-responsive">
    <table class="table-cell table-3">
        <thead>
          <tr>
            <th class="col-md-2"><h5>Totale Fatture</h5></th>
            <th class="col-md-2"><h5>Conguaglio utenze</h5></th>
            <th class="col-md-2"><h5>Conguaglio spese</h5></th>
            <th class="col-md-2"><h5>Giorni non goduti</h5></th>
            <th class="col-md-2"><h5>Pulizie di fine locazione</h5></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="col-md-2">
                <div class="input-group input-group-sm">
                  <span class="input-group-addon" id="sizing-addon1">Num</span>
                  <input name="totaleFatture" type="number" class="form-control" placeholder="Fatture" aria-describedby="sizing-addon1">
                </div>
            </td>
            <td class="col-md-2">
                <div class="input-group input-group-sm">
                  <span class="input-group-addon" id="sizing-addon1">€</span>
                  <input name="conguaglioUtenze" type="number" class="form-control" placeholder="Importo" aria-describedby="sizing-addon1">
                </div>
            </td>
            <td class="col-md-2">
                <div class="input-group input-group-sm">
                  <span class="input-group-addon" id="sizing-addon1">€</span>
                  <input name="conguaglioSpese" type="number" class="form-control" placeholder="Importo" aria-describedby="sizing-addon1">
                </div>
            </td>
            <td class="col-md-2">
                <div class="input-group input-group-sm">
                  <span class="input-group-addon" id="sizing-addon1">Num</span>
                  <input name="subentro" type="number" class="form-control" placeholder="Giorni" aria-describedby="sizing-addon1">
                </div>
            </td>
            <td class="col-md-2">
                <div class="input-group input-group-sm checkbox">
                    <input name="pulizie" type="checkbox" data-toggle="toggle" data-on="SI" data-off="NO">
                </div>
            </td>
          </tr>
        </tbody>
    </table>
</div>

<br>
<div class="data">
    <table id="componentiDettagli"></table>
    <div id="componentiDettagliPager"></div>
</div>
<br>
<div class="data">
    <table id="fatturaDettagli"></table>
    <div id="fatturaDettagliPager"></div>
</div>

<div style="margin-top: 15px; height: 50px;">
    <a class="salva button" role="button" style="float: right; margin-right: 215px;"><span class="ui-button-text" style="width: 100px;">Salva</span></a>
</div>

<script>

    var thisDate = new Date();
    var fattura = new Fattura();
    var fdi = new Array();
    var fdc = new Array();
    var fcd = new Array();
    var loadIns = new Array();
    var ins = new Inquilino_Stanza();
    var inquilino = new Inquilino();
    var fattura_storno = new Fattura_Storno();
    var cliente = new Cliente();

    /*
     * Variabili globali per l'inserimento di ComponenteDettagli
     */
    var first_selected_componente; // Necessario a fermare il bug durante l'invio di Edit Dialog
    var first_selected_prezzo; // Necessario a fermare il bug durante l'invio di Edit Dialog
    var componenteSelected;
    var prezzoSelected;

    /*
     * Variabili globali per l'inserimento di FatturaDettagli
     */
    var first_selected_fdTipologia; // Necessario a fermare il bug durante l'invio di Edit Dialog
    var fdTipologiaSelected;

    /*
     * Variabili globali elementi html
     */

    var invoice_numero =  $(".input-generali input[name='numero']");
    var totale = $('#totale');
    var periodo_ins = $(".periodo-ins");
    var periodo_fatturazione = $(".periodi-fatturazione");
    var tipologia_fattura = $(".tipologia_fattura");
    var societa_fattura = $(".societa");
    var id_ins_dropdown = $('#dropdownMenu2');
    var id_tipologia_dropdown = $('#dropdownMenu1');
    var periodo_fatturazione_dropdown = $('#dropdownMenu3');
    var t_destinatario = $('#dropdownMenu4');
    var id_societa = $('#dropdownMenu-Societa');
    var invoice_data = $(".data-fattura");
    var ins_dataFine = $(".data-fine");
    var ins_totaleFatture = $(".input-group input[name='totaleFatture']");
    var ins_conguaglioUtenze = $(".input-group input[name='conguaglioUtenze']");
    var ins_conguaglioSpese = $(".input-group input[name='conguaglioSpese']");
    var ins_subentro = $(".input-group input[name='subentro']");
    var ins_pulizie = $(".input-group input[name='pulizie']");
    var col_dataFine = {
        title : $(".table-2 > thead > tr > th:nth-child(3)"),
        val : $(".table-2 > tbody > tr > td:nth-child(3) > div > input"),
        hideShowCol : function (action) {
            if(action){
                this.title.show();
                this.val.show();
            }else{
                this.title.hide();
                this.val.hide();
            }
        }
    };
    var table_1 = $(".table-1");
    var table_2 = $(".table-2");
    var table_3 = $(".table-3");

    var periodiFatturazione_cast = new FatturaDettagliInquilino();

    /*
     * assegnazione [VISUALIZZAZIONE]
     */
    fattura.Id = {$invoice->Id};
    fattura.Data = "{$invoice->Data}";
    fattura.Numero = {$invoice->Numero};
    fattura.Tipologia = {$invoice->Tipologia};
    fattura.TipologiaDestinatario = {$invoice->TipologiaDestinatario};
    fattura.Societa = {$invoice->Societa};

    {if $invoice->Id || intval($actionStorno) === 1}
        fdi = {$fdi_encoded};
        fdc = {$fdc_encoded};

        fcd = {$fcd_encoded};
        ins = $.extend(new Inquilino_Stanza(), {$ins_encoded});
        inquilino = $.extend(new Inquilino(), {$inquilino_encoded});
        cliente = $.extend(new Cliente(), {$cliente_encoded});
        loadIns = {$loadIns_encoded};

        fattura_storno = $.extend(new Fattura_Storno(), {$fatturaStorno_encoded});

        periodiFatturazione_cast.Inizio = "{$periodiFatturazione_cast->Inizio}";
        periodiFatturazione_cast.Fine = "{$periodiFatturazione_cast->Fine}";

    {/if}

    $(document).ready(function() {
        setToggle(ins.Pulizie, ins_pulizie);
        invoice_numero.val(fattura.Numero);
        id_tipologia_dropdown.text(titoloTipologia(fattura.Tipologia));
        t_destinatario.text(titoloTipologiaDestinatario(fattura.TipologiaDestinatario));
        id_societa.text(titoloSocieta(fattura.Societa));
        $(".dropdown-menu").css("cursor","pointer");

        invoice_data.flatpickr({
            dateFormat: 'd/m/Y',
            defaultDate: fattura.Data,
            onChange: function(dateObj, dateStr, instance) {
                fattura.Data = dateObj.yyyymmdd();
                if(parseInt(fattura.Numero) > 0){
                    checkInvoicePK(fattura, function (bool){
                        if(!bool){
                            bootbox.alert({
                                title : "Errore imprevisto!",
                                message: "Numero presente in quest'anno!"
                            });
                            fattura.Numero = 0;
                            invoice_numero.val(fattura.Numero);
                        }
                    });
                }
            }
        });

        loadTables(fattura);
        getTotale(fattura);

        var data;
        if(fattura.TipologiaDestinatario === {$smarty.const.DESTINATARI_INQUILINI}){
            data = ins;
            create_interface(fattura, data);
        }else if(fattura.TipologiaDestinatario === {$smarty.const.DESTINATARI_CLIENTI}){
            data = cliente;
            create_interface(fattura, data);
        }

    });

    $(".input-generali").on("focus","input[name='intestatario']", function(){
        if(fattura.TipologiaDestinatario === {$smarty.const.DESTINATARI_INQUILINI}){

            $(this).autocomplete({
                source: URL_ROOT + '_gestione/autocompleteMovimenti.php?action=inquilino',
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
                    inquilino.Id = ui.item.Id;
                    inquilino.Nome = ui.item.Nome;
                    inquilino.Cognome = ui.item.Cognome;
                    ins.Id = ui.item.IdIns;
                    ins.Caparra = ui.item.Caparra;
                    ins.Cauzione = ui.item.Cauzione;
                    ins.Note = ui.item.Note;
                    ins.IdInquilino =  ui.item.Id;
                    ins.IdStanza = ui.item.InsIdStanza;
                    ins.DataInizio = ui.item.InsDataInizio;
                    ins.DataFine = ui.item.InsDataFine;
                    ins.DataFirma = ui.item.InsDataFirma;
                    ins.PeriodoFatturazione = ui.item.InsPeriodoFatturazione;
                    ins.NumeroFatture = ui.item.NumeroFatture;
                    ins.ConguaglioUtenze = ui.item.ConguaglioUtenze;
                    ins.ConguaglioSpese = ui.item.ConguaglioSpese;
                    ins.GiorniNonGoduti = ui.item.GiorniNonGoduti;
                    ins.Pulizie = ui.item.Pulizie;
                    ins.Canone = ui.item.Canone;
                    ins.Spese = ui.item.Spese;
                    ins.Turistico = ui.item.Turistico;
                    loadOptions_periodo_ins(inquilino);
                    loadOptions_periodo_fatturazione();
                    loadSocieta(ins, function (e){
                        fattura.Societa = parseInt(e);
                        id_societa.text(titoloSocieta(fattura.Societa));
                        var invoice_clone = JSON.stringify(fattura);
                        $.getJSON( '?action=numbering&invoice=' + invoice_clone, function( data ) {
                            fattura.Numero = parseInt(data);
                            invoice_numero.val(fattura.Numero);
                        });
                    });
                }
            });
        }else{
            $(this).autocomplete({
                source: URL_ROOT + '_gestione/autocompleteMovimenti.php?action=cliente',
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
                    cliente.Id = ui.item.Id;
                }
            });
        }
    });

    /*
     * Funzione che permette di prepare gli elementi html secondo l'azione scelta (creare o modificare).
     */

    function create_interface(invoice, data){
        if(invoice){
            if(!invoice.Id && !data.Id){
                //Modalità di creazione
                periodo_ins.hide();
                periodo_fatturazione.hide();
                col_dataFine.hideShowCol(false);
                table_3.hide();
            }else{
                //Modalità di Modifica - Visualizzazione
                if(parseInt(invoice.TipologiaDestinatario) === {$smarty.const.DESTINATARI_INQUILINI}){
                    periodo_ins.show();
                    if(parseInt(invoice.Tipologia) === {$smarty.const.FATTURA_PI} || parseInt(invoice.Tipologia) === {$smarty.const.FATTURA_LOCAZIONE}){
                        periodo_fatturazione.show();
                        col_dataFine.hideShowCol(false);
                        table_3.hide();
                    }else if(parseInt(invoice.Tipologia) === {$smarty.const.FATTURA_CHIUSURA}){
                        periodo_fatturazione.hide();
                        col_dataFine.hideShowCol(true);
                        table_3.show();
                        loadFieldsValues();
                    }else if(parseInt(invoice.Tipologia) === {$smarty.const.FATTURA_STORNO} && parseInt(invoice.Id) > 0){
                        loadStorno_interface();
                    }else if(parseInt(invoice.Tipologia) === {$smarty.const.FATTURA_NONE}){
                        periodo_fatturazione.hide();
                        col_dataFine.hideShowCol(false);
                        table_3.hide();
                    }

                }else if(parseInt(invoice.TipologiaDestinatario) === {$smarty.const.DESTINATARI_CLIENTI}){
                    periodo_ins.hide();
                    periodo_fatturazione.hide();
                    col_dataFine.hideShowCol(false);
                    table_3.hide();
                    if(parseInt(invoice.Tipologia) === {$smarty.const.FATTURA_STORNO}){
                        loadStorno_interface();
                    }
                }
            }
        }

    }

    function switch_destinatario(invoice){
        invoice.TipologiaDestinatario = parseInt(invoice.TipologiaDestinatario);
        if(invoice.TipologiaDestinatario === {$smarty.const.DESTINATARI_INQUILINI}){
            $.jgrid.gridUnload('#fatturaDettagli');
            loadTables(invoice);

            //RESET TIPOLOGIA
            fattura.Tipologia = -1;
            id_tipologia_dropdown.text(titoloTipologia(fattura.Tipologia));
        }else if(invoice.TipologiaDestinatario === {$smarty.const.DESTINATARI_CLIENTI}){
            $.jgrid.gridUnload('#componentiDettagli');
            $.jgrid.gridUnload('#fatturaDettagli');
            loadTables(invoice);

            //S'è un cliente - Allora tipologia = altro
            fattura.Tipologia = {$smarty.const.FATTURA_NONE};
            id_tipologia_dropdown.text(titoloTipologia(fattura.Tipologia));
        }
    }

    function loadStorno_interface(){
        var stornoFattura = new Fattura();
        stornoFattura.Id = fattura_storno.IdFatturaStorno;
        var invoice_clone = JSON.stringify(stornoFattura);
        $.getJSON( '?action=loadInvoice&invoice=' + invoice_clone, function( data ) {
            if(data.success === true){
                if(data.invoice && parseInt(data.invoice.TipologiaDestinatario) === {$smarty.const.DESTINATARI_INQUILINI}){
                    var ins_storno = $.extend(new Inquilino_Stanza(), data.ins);
                    create_interface(data.invoice, ins_storno);
                    storno_interface();
                }else if(data.invoice && parseInt(data.invoice.TipologiaDestinatario) === {$smarty.const.DESTINATARI_CLIENTI}){
                    var cliente_storno = $.extend(new Cliente(), data.cliente);
                    create_interface(data.invoice, cliente_storno);
                    storno_interface();
                }
            }else{
                bootbox.alert("Errore durante il caricamento della fattura da Stornare!");
            }
        });
    }

    function reloadTable(){
        fattura.TipologiaDestinatario = parseInt(fattura.TipologiaDestinatario);
        if(fattura.TipologiaDestinatario === {$smarty.const.DESTINATARI_INQUILINI}){
            var invoice_clone = JSON.stringify(fattura);
            $.getJSON( '?action=loadInvoice&invoice=' + invoice_clone, function( data ) {
                if(data.success === true){
                    fattura = $.extend(new Fattura(), data.invoice);
                    jQuery("#fatturaDettagli").jqGrid('setGridParam',{
                        datatype: 'local',
                        data: data.fdi
                    }).trigger('reloadGrid');
                    jQuery("#componentiDettagli").jqGrid('setGridParam',{
                        datatype: 'local',
                        data: data.fcd
                    }).trigger('reloadGrid');
                }else{

                }
            });

        }else if(fattura.TipologiaDestinatario === {$smarty.const.DESTINATARI_CLIENTI}){

            var invoice_clone = JSON.stringify(fattura);

            $.getJSON( '?action=loadInvoice&invoice=' + invoice_clone, function( data ) {
                if(data.success === true){
                    fattura = $.extend(new Fattura(), data.invoice);
                    jQuery("#fatturaDettagli").jqGrid('setGridParam',{
                        datatype: 'local',
                        data: data.fdc
                    }).trigger('reloadGrid');
                }else{

                }
            });

        }

    }

    function reloadCastTable(callback){
        reloadCast_fcd(function(){
          reloadCast_fd(function(){
            if(callback){
              callback();
            }
          });
        });
    }

    function loadTables(invoice){
        if(invoice.TipologiaDestinatario === {$smarty.const.DESTINATARI_INQUILINI}){
            loadTable_fcd(fcd);
            loadTable_fdi(fdi);
        }else if(invoice.TipologiaDestinatario === {$smarty.const.DESTINATARI_CLIENTI}){
            loadTable_fdc(fdc);
        }

    }

    function loadTable_fcd (fcd){

        $("#componentiDettagli").jqGrid({
                datatype: "local",
                data: fcd,
                editurl: 'clientArray',
                 colModel: [
                        { label: 'Id', name: 'Id', width: 20, sorttype: 'integer' },
                        { label: 'IdComponente', name: 'IdComponente', width: 20, hidden: true },
                        { label: 'Iva', name: 'Iva', width: 20, hidden: true },
                        { label: 'Titolo', name: 'Titolo', width: 90 },
                        {
                            label: 'Prezzo',
                            name: 'Prezzo',
                            width: 30,
                            sorttype: 'number',
                            formatter: 'number',
                            editable: true, // must set editable to true if you want to make the field editable,
                            edittype: "custom",
                            editoptions: {
                                custom_value: getFreightElementValue,
                                custom_element: createFreightEditElement
                            }
                        }
                        // sorttype is used only if the data is loaded locally or loadonce is set to true
                ],
                onSelectRow: editRowComponentiDettagli, // the javascript function to call on row click. will ues to to put the row in edit mode
                viewrecords: true, // show the current page, data rang and total records on the toolbar
                width: 780,
                height: 150,
                rowNum: 30,
                //loadonce: true, // this is just for the demo
                caption: "Parametri di fatturazione fissi",
                pager: "#componentiDettagliPager",
                gridComplete : function (){
                  getTotale(fattura);
                }
        });

        // the bindKeys()
        $("#componentiDettagli").jqGrid('bindKeys');

        $("#componentiDettagli").navGrid("#componentiDettagliPager",
                { edit: false, add: true, del: true, search: true, refresh: true, view: true, align: "left" },
                // options for the Edit Dialog
                {
                    editCaption: "The Edit Dialog",
                    recreateForm: true,
                                        checkOnUpdate : true,
                                        checkOnSubmit : true,
                    closeAfterEdit: true,
                    errorTextFormat: function (data) {
                        return 'Error: ' + data.responseText
                    }
                },
                // options for the Add Dialog
                {
                    closeAfterAdd: true,
                    width: 800,
                    recreateForm: true,
                    checkOnSubmit: false,
                    reloadAfterSubmit: false,
                    errorTextFormat: function (data) {
                        return 'Error: ' + data.responseText
                    },
                    addCaption: "Aggiungi un parametro di fatturazione fisso",
                    beforeShowForm: function(form) {
                    var tab = $('#TblGrid_componentiDettagli tbody');
                    tab.empty();

                    /*
                     * Componente Row
                     */
                    var tr_Componente = $('<tr class="select_componente" id="tr_Titolo"></tr>');
                    var td_caption_componente = $('<td class="CaptionTD"></td>');
                    var td_data_componente = $('<td class="DataTD"></td>');
                    var label_componente = $('<label>Componente</label>');
                    var span_form_componente = $('<span class="FormElement"></span>');
                    var div_componente = $('<div class="customelement" id="Titolo" name="Titolo"></div>');
                    var select_componente = $('<select class="form-control"></select>');

                    tab.append(tr_Componente);
                    tr_Componente.append(td_caption_componente.append(label_componente)).append(td_data_componente);
                    td_caption_componente.append(label_componente);
                    td_data_componente.append(span_form_componente);
                    span_form_componente.append(div_componente);
                    div_componente.append(select_componente);

                    var option_default_componente = $("<option>", { value: 0 },"</option>");
                    option_default_componente.text("Seleziona un componente");
                    select_componente.append(option_default_componente);
                    select_componente.val(0);
                    first_selected_componente = 0;

                    /*
                     * Prezzo Row
                     */

                    var tr_Prezzo = $('<tr class="select_prezzo" id="tr_Prezzo"></tr>');
                    var td_caption_prezzo = $('<td class="CaptionTD"></td>');
                    var td_data_prezzo = $('<td class="DataTD"></td>');
                    var label_prezzo = $('<label>Prezzo</label>');
                    var span_form_prezzo = $('<span class="FormElement"></span>');
                    var div_prezzo = $('<div class="customelement" id="Prezzo" name="Prezzo"></div>');
                    var select_prezzo = $('<select class="form-control"></select>');

                    tab.append(tr_Prezzo);
                    tr_Prezzo.append(td_caption_prezzo.append(label_prezzo)).append(td_data_prezzo);
                    td_caption_prezzo.append(label_prezzo);
                    td_data_prezzo.append(span_form_prezzo);
                    span_form_prezzo.append(div_prezzo);
                    div_prezzo.append(select_prezzo);

                    var option_default_prezzo = $("<option>", { value: 0 },"</option>");
                    option_default_prezzo.text("Seleziona il prezzo");
                    select_prezzo.append(option_default_prezzo);
                    select_prezzo.val(0);
                    first_selected_prezzo = 0;

                    $.getJSON( '?action=loadC_DB', function( data ) {
                        for (var chiave in data) {
                            var option = $("<option>", { value: data[chiave].Id, iva: data[chiave].Iva },"</option>");
                            option.text(data[chiave].Titolo);
                            select_componente.append(option);
                        }
                    });

                    },
                    onclickSubmit : function(params, posdata) {
                        if(prezzoSelected && componenteSelected){
                            var tab = $('#TblGrid_componentiDettagli tbody');
                            var prezzo = tab.find('#Prezzo select').val();
                            var newComponenteDettagli = new ComponenteDettagli();
                            newComponenteDettagli.Id = prezzoSelected.find(':selected').attr('idcd');
                            newComponenteDettagli.IdComponente = componenteSelected.find(':selected').val();
                            newComponenteDettagli.Prezzo = prezzoSelected.find(':selected').text();
                            newComponenteDettagli.Titolo = componenteSelected.find(':selected').text();
                            newComponenteDettagli.Iva = componenteSelected.find(':selected').attr('iva');
                            var rowId = $.jgrid.randId();
                            jQuery("#componentiDettagli").addRowData(rowId, newComponenteDettagli);
                            prezzoSelected = null;
                            componenteSelected = null;
                            first_selected_componente = 0;
                            first_selected_prezzo = 0;
                        }
                        $('#cData').trigger('click');

                        forceUpdateIva();

                    }
                },
                // options for the Delete Dailog
                {
                    errorTextFormat: function (data) {
                        return 'Error: ' + data.responseText
                    }
                },
                { closeAfterEdit: true, focusField : 1 }
        );

        var lastSelectionComponentiDettagli;

        function editRowComponentiDettagli(id) {
            var grid = $("#componentiDettagli");
            if (id && id !== lastSelectionComponentiDettagli) {
                grid.jqGrid('restoreRow',lastSelectionComponentiDettagli);
                //grid.jqGrid('editRow',id, { keys: true });
                
                jQuery('#componentiDettagli').editRow(id, {
                    keys: true,
                    aftersavefunc: function (rowid, response, options) {
                        console.log("aftersavefunc");
                        forceUpdateIva();
                    }
                });
                
                lastSelectionComponentiDettagli = id;
            }
            
        }

        function createFreightEditElement(value, editOptions) {

            /*var rowData = jQuery("#componentiDettagli").jqGrid ('getRowData', lastSelectionComponentiDettagli);
            alert(rowData.IdComponente);*/

            var myGrid = $('#componentiDettagli'),
            selRowId = myGrid.jqGrid ('getGridParam', 'selrow'),
            celValue = myGrid.jqGrid ('getCell', selRowId, 'IdComponente');
            var componentiDettagliByIdC = null;
            var div =$("<div></div>");
            var select = $("<select class='form-control'></select>");
            $.getJSON( '?action=loadCDByIdC&idComponente=' + celValue, function( data ) {
                componentiDettagliByIdC = data;
                for (var chiave in componentiDettagliByIdC) {
                    var option = $("<option>", { value: componentiDettagliByIdC[chiave].Prezzo, name: "freight", id: "zero", idcd: componentiDettagliByIdC[chiave].Id, ivacd: componentiDettagliByIdC[chiave].Iva , selected: value = componentiDettagliByIdC[chiave].Prezzo },"</option>");
                    option.text(componentiDettagliByIdC[chiave].Prezzo);
                    select.append(option);
                }
            });

            select.val(parseInt(value));
            div.append(select);

            return div;
        }

        // The javascript executed specified by JQGridColumn.EditTypeCustomGetValue when EditType = EditType.Custom
        // One parameter passed - the custom element created in JQGridColumn.EditTypeCustomCreateElement
        function getFreightElementValue(elem, oper, value) {
            if (oper === "set") {
                var radioButton = $(elem).find("select option[value='" + value + "']");
                radioButton.prop("selected", true);
            }

            if (oper === "get") {
                var myGrid = $('#componentiDettagli'),
                //selRowId = myGrid.jqGrid ('getGridParam', 'selrow');
                selRowId = lastSelectionComponentiDettagli;
                var rowData = $('#componentiDettagli').jqGrid('getRowData', selRowId);
                var Id = $(elem).find("select option:selected").attr("idcd");
                rowData.Id = Id;
                rowData.Prezzo= $(elem).find("select option:selected").val();
                rowData.Iva = $(elem).find("select option:selected").attr("ivacd");
                $('#componentiDettagli').jqGrid('setRowData', selRowId, rowData);
                forceUpdateIva();
                return $(elem).find("select option:selected").val();
            }
        }

    }

    function loadTable_fdi (fdi){
        //var periodiFatturazione_cast_clone = JSON.stringify(periodiFatturazione_cast);
        $("#fatturaDettagli").jqGrid({
                datatype: "local",
                data: fdi,
                editurl: 'clientArray',
                 colModel: [
                        { label: 'Titolo', name: 'Titolo', width: 90, editable: true, edittype:"text"},
                        { label: 'IdAttribuzione', name: 'IdAttribuzione', width: 20, hidden: true },
                        { label: 'Descrizione', name: 'Descrizione', width: 0, hidden: true },
                        {
                            label: 'P.Inizio',
                            name: 'Inizio',
                            width: 50,
                            editable: true,
                            edittype:"text",
                            editoptions: {
                                // dataInit is the client-side event that fires upon initializing the toolbar search field for a column
                                // use it to place a third party control to customize the toolbar
                                dataInit: function (element) {
                                    $(element).datepicker({
                                        autoclose: true,
                                        dateFormat: 'yy-mm-dd',
                                        orientation : 'auto bottom'
                                    });
                                }
                            }
                        },
                        {
                            label: 'P.Fine',
                            name: 'Fine',
                            width: 50,
                            editable: true,
                            edittype:"text",
                            editoptions: {
                                // dataInit is the client-side event that fires upon initializing the toolbar search field for a column
                                // use it to place a third party control to customize the toolbar
                                dataInit: function (element) {
                                    $(element).datepicker({
                                        autoclose: true,
                                        dateFormat: 'yy-mm-dd',
                                        orientation : 'auto bottom'
                                    });
                                }
                            }
                        },
                        {
                            label: 'Totale',
                            name: 'Totale',
                            width: 40,
                            sorttype: 'number',
                            formatter: 'number',
                            editable: true // must set editable to true if you want to make the field editable
                        },
                        {
                            label: 'Sconto',
                            name: 'Sconto',
                            width: 40,
                            sorttype: 'number',
                            formatter: 'number',
                            editable: true // must set editable to true if you want to make the field editable
                        },
                        {
                            name: 'Iva', width: 20, index: 'Iva', align: "center",
                            editable: true,
                            edittype: 'checkbox', editoptions: { value: "1:0" },
                            formatter: "checkbox", formatoptions: { disabled: true }
                        }
                        // sorttype is used only if the data is loaded locally or loadonce is set to true
                ],
                onSelectRow: editRowFatturaDettagli, // the javascript function to call on row click. will ues to to put the row in edit mode
                viewrecords: true, // show the current page, data rang and total records on the toolbar
                width: 780,
                height: 200,
                rowNum: 30,
                //loadonce: true, // this is just for the demo
                caption: "Parametri di fatturazione variabili",
                pager: "#fatturaDettagliPager",
                gridComplete : function (){
                    getTotale(fattura);
                },
                beforeSelectRow: function (rowid, e) {
                    var $target = $(e.target), $td = $target.closest("td"),
                    iCol = $.jgrid.getCellIndex($td[0]),
                    colModel = $(this).jqGrid("getGridParam", "colModel");

                    if (iCol >= 0 && $target.is(":checkbox")) {
                        if($target.is(":checked")){
                            $("#fatturaDettagli").jqGrid("setCell", rowid, "Iva", "1");
                        }else{
                            $("#fatturaDettagli").jqGrid("setCell", rowid, "Iva", "0");
                        }
                        fattura.TipologiaDestinatario = parseInt(fattura.TipologiaDestinatario);
                        var data;
                        if(fattura.TipologiaDestinatario === {$smarty.const.DESTINATARI_INQUILINI}){
                            var allRowsComponentiDettagli = $('#componentiDettagli').jqGrid('getGridParam','data');
                            var allRowsFatturaDettagli = $('#fatturaDettagli').jqGrid('getGridParam','data');

                            if(allRowsComponentiDettagli.length > 0 && allRowsFatturaDettagli.length > 0){
                                data = {
                                    allRowsComponentiDettagli: allRowsComponentiDettagli,
                                    allRowsFatturaDettagli: allRowsFatturaDettagli,
                                    ins: ins
                                };

                                updateIva(fattura, data);

                            }
                        }else if(fattura.TipologiaDestinatario === {$smarty.const.DESTINATARI_CLIENTI}){

                            var allRowsFatturaDettagli = $('#fatturaDettagli').jqGrid('getGridParam','data');
                            if(allRowsFatturaDettagli.length > 0){
                                data = {
                                    allRowsFatturaDettagli: allRowsFatturaDettagli,
                                    cliente: cliente
                                };

                                updateIva(fattura, data);

                            }
                        }
                    }
                }
        });
        // the bindKeys()
        $("#fatturaDettagli").jqGrid('bindKeys');

        $("#fatturaDettagli").navGrid("#fatturaDettagliPager",
                { edit: false, add: true, del: true, search: true, refresh: true, view: true, align: "left" },
                // options for the Edit Dialog
                {
                    editCaption: "The Edit Dialog",
                    closeAfterEdit: true,
                    errorTextFormat: function (data) {
                        return 'Error: ' + data.responseText
                    }
                },
                // options for the Add Dialog
                {
                    closeAfterAdd: true,
                    recreateForm: true,
                    errorTextFormat: function (data) {
                        return 'Error: ' + data.responseText
                    },
                    addCaption: "Aggiungi un parametro di fatturazione variabile",
                    beforeShowForm: function(form) {
                        var tab = $('#TblGrid_fatturaDettagli tbody');
                        tab.empty();

                        /*
                         * Selezione Tipologia FatturaDettagli
                         */
                        var tr_fdTipologia = $('<tr class="select_fdTipologia" id="tr_Titolo"></tr>');
                        var td_caption_fdTipologia = $('<td class="CaptionTD"></td>');
                        var td_data_fdTipologia = $('<td class="DataTD"></td>');
                        var label_fdTipologia = $('<label>Tipologia</label>');
                        var span_form_fdTipologia = $('<span class="FormElement"></span>');
                        var div_fdTipologia = $('<div class="customelement" id="Titolo" name="Titolo"></div>');
                        var select_fdTipologia = $('<select class="form-control"></select>');

                        tab.append(tr_fdTipologia);
                        tr_fdTipologia.append(td_caption_fdTipologia.append(label_fdTipologia)).append(td_data_fdTipologia);
                        td_caption_fdTipologia.append(label_fdTipologia);
                        td_data_fdTipologia.append(span_form_fdTipologia);
                        span_form_fdTipologia.append(div_fdTipologia);
                        div_fdTipologia.append(select_fdTipologia);

                        var option_default_fdTipologia = $("<option>", { value: -1 },"</option>");
                        option_default_fdTipologia.text("Seleziona una tipologia di parametro");
                        var option_altro_fdTipologia = $("<option>", { value: 0 },"</option>");
                        option_altro_fdTipologia.text("Altro - Personalizzato");
                        select_fdTipologia.append(option_default_fdTipologia).append(option_altro_fdTipologia);
                        select_fdTipologia.val(-1);
                        first_selected_fdTipologia = -1;

                        $.getJSON( '?action=loadAttribuzioni', function( data ) {
                            for (var chiave in data) {
                                var option = $("<option>", { value: data[chiave].Id },"</option>");
                                option.text(data[chiave].Titolo);
                                select_fdTipologia.append(option);
                            }
                        });

                    },
                    onclickSubmit : function(params, posdata) {
                        var tab = $('#TblGrid_fatturaDettagli tbody');
                        var attribuzione = parseInt(tab.find('.select_fdTipologia select :selected').val());
                        var titolo, inizio, fine, prezzo, descrizione;
                        var checkVals = false;
                        if(attribuzione === 0){
                            titolo = tab.find('.input_Titolo input').val();
                            inizio = tab.find('.input_Inizio input').val();
                            fine = tab.find('.input_Fine input').val();
                            prezzo = tab.find('.input_Prezzo input').val();
                            descrizione = titolo;

                            if(titolo && prezzo){
                                checkVals = true;
                            }
                        }else if(attribuzione > 0){
                            titolo = tab.find('.select_fdTipologia select :selected').text();
                            inizio = tab.find('.input_Inizio input').val();
                            fine = tab.find('.input_Fine input').val();
                            prezzo = tab.find('.input_Prezzo input').val();

                            if(titolo && prezzo){
                                checkVals = true;
                            }
                        }

                        if(checkVals){
                            var addNew_FD = new FatturaDettagliInquilino();
                            addNew_FD.IdAttribuzione = attribuzione;
                            addNew_FD.Titolo = titolo;
                            addNew_FD.Inizio = inizio;
                            addNew_FD.Fine = fine;
                            addNew_FD.Totale = prezzo;
                            addNew_FD.Descrizione = descrizione;
                            var rowId = $.jgrid.randId();
                            jQuery("#fatturaDettagli").addRowData(rowId, addNew_FD);
                            first_selected_fdTipologia = -1;
                        }else{
                            bootbox.alert("Inserire tutti i campi!");
                        }
                        $('#cData').trigger('click');
                    }
                },
                // options for the Delete Dailog
                {
                    onclickSubmit : function(params, posdata) {
                        //forceUpdateIva();
                        //alert("onclickSubmit");
                    },
                    afterComplete: function () {
                        forceUpdateIva();
                        //alert("afterComplete");
                    }, 
                    errorTextFormat: function (data) {
                        return 'Error: ' + data.responseText
                    }
                },
                { closeAfterEdit: true, focusField : 1 }
        );
        
        var lastSelectionFatturaDettagli;
        function editRowFatturaDettagli(id, e) {
            var grid = $("#fatturaDettagli");
            if (id && id !== lastSelectionFatturaDettagli) {
                grid.jqGrid('restoreRow',lastSelectionFatturaDettagli);
                //jQuery('#fatturaDettagli').editRow(id, true);
                jQuery('#fatturaDettagli').editRow(id, {
                    keys : true,
                    oneditfunc: function() {
                        //alert ("edited"); 
                    },
                    aftersavefunc: function (rowid, response, options) {
                        //alert("row with rowid=" + rowid + " is successfuly modified.");
                        forceUpdateIva();
                    }
                });
                lastSelectionFatturaDettagli = id;
            }
        }
        
    }

    function loadTable_fdc (fdc){

        $("#fatturaDettagli").jqGrid({
                datatype: "local",
                data: fdc,
                editurl: 'clientArray',
                 colModel: [
                        { label: 'Titolo', name: 'Titolo', width: 90, editable: true, edittype:"text" },
                        { label: 'IdAttribuzione', name: 'IdAttribuzione', width: 20, hidden: true },
                        { label: 'Descrizione', name: 'Descrizione', width: 0, hidden: true },
                        {
                            label: 'P.Inizio',
                            name: 'Inizio',
                            width: 50,
                            editable: true,
                            edittype:"text",
                            editoptions: {
                                // dataInit is the client-side event that fires upon initializing the toolbar search field for a column
                                // use it to place a third party control to customize the toolbar
                                dataInit: function (element) {
                                    $(element).datepicker({
                                        autoclose: true,
                                        dateFormat: 'yy-mm-dd',
                                        orientation : 'auto bottom'
                                    });
                                }
                            }
                        },
                        {
                            label: 'P.Fine',
                            name: 'Fine',
                            width: 50,
                            editable: true,
                            edittype:"text",
                            editoptions: {
                                // dataInit is the client-side event that fires upon initializing the toolbar search field for a column
                                // use it to place a third party control to customize the toolbar
                                dataInit: function (element) {
                                    $(element).datepicker({
                                        autoclose: true,
                                        dateFormat: 'yy-mm-dd',
                                        orientation : 'auto bottom'
                                    });
                                }
                            }
                        },
                        {
                            label: 'Totale',
                            name: 'Totale',
                            width: 40,
                            sorttype: 'number',
                            formatter: 'number',
                            editable: true // must set editable to true if you want to make the field editable
                        },
                        {
                            label: 'Sconto',
                            name: 'Sconto',
                            width: 40,
                            sorttype: 'number',
                            formatter: 'number',
                            editable: true // must set editable to true if you want to make the field editable
                        },
                        {
                            name: 'Iva', width: 20, index: 'Iva', align: "center",
                            editable: true,
                            edittype: 'checkbox', editoptions: { value: "1:0" },
                            formatter: "checkbox", formatoptions: { disabled: true }
                        }
                        // sorttype is used only if the data is loaded locally or loadonce is set to true
                ],
                onSelectRow: editRowFatturaDettagli, // the javascript function to call on row click. will ues to to put the row in edit mode
                viewrecords: true, // show the current page, data rang and total records on the toolbar
                width: 780,
                height: 200,
                rowNum: 30,
                //loadonce: true, // this is just for the demo
                caption: "Parametri di fatturazione variabili",
                pager: "#fatturaDettagliPager",
                gridComplete : function (){
                    getTotale(fattura);
                },
                beforeSelectRow: function (rowid, e) {
                    var $target = $(e.target), $td = $target.closest("td"),
                    iCol = $.jgrid.getCellIndex($td[0]),
                    colModel = $(this).jqGrid("getGridParam", "colModel");

                    if (iCol >= 0 && $target.is(":checkbox")) {
                        if($target.is(":checked")){
                            $("#fatturaDettagli").jqGrid("setCell", rowid, "Iva", "1");
                        }else{
                            $("#fatturaDettagli").jqGrid("setCell", rowid, "Iva", "0");
                        }
                        var data;
                        fattura.TipologiaDestinatario = parseInt(fattura.TipologiaDestinatario);
                        if(fattura.TipologiaDestinatario === {$smarty.const.DESTINATARI_INQUILINI}){
                            var allRowsComponentiDettagli = $('#componentiDettagli').jqGrid('getGridParam','data');
                            var allRowsFatturaDettagli = $('#fatturaDettagli').jqGrid('getGridParam','data');

                            if(allRowsComponentiDettagli.length > 0 && allRowsFatturaDettagli.length > 0){
                                data = {
                                    allRowsComponentiDettagli: allRowsComponentiDettagli,
                                    allRowsFatturaDettagli: allRowsFatturaDettagli,
                                    ins: ins
                                };

                                updateIva(fattura, data);

                            }
                        }else if(fattura.TipologiaDestinatario === {$smarty.const.DESTINATARI_CLIENTI}){

                            var allRowsFatturaDettagli = $('#fatturaDettagli').jqGrid('getGridParam','data');
                            if(allRowsFatturaDettagli.length > 0){
                                data = {
                                    allRowsFatturaDettagli: allRowsFatturaDettagli,
                                    cliente: cliente
                                };

                                updateIva(fattura, data);

                            }
                        }
                    }
                }
        });

        // the bindKeys()
        $("#fatturaDettagli").jqGrid('bindKeys');
        
        $("#fatturaDettagli").navGrid("#fatturaDettagliPager",
                { edit: false, add: true, del: true, search: true, refresh: true, view: true, align: "left" },
                // options for the Edit Dialog
                {
                    editCaption: "The Edit Dialog",
                    recreateForm: true,
                                        checkOnUpdate : true,
                                        checkOnSubmit : true,
                    closeAfterEdit: true,
                    errorTextFormat: function (data) {
                        return 'Error: ' + data.responseText
                    }
                },
                // options for the Add Dialog
                {
                    closeAfterAdd: true,
                    recreateForm: true,
                    errorTextFormat: function (data) {
                        return 'Error: ' + data.responseText
                    },
                    addCaption: "Aggiungi un parametro di fatturazione variabile",
                    beforeShowForm: function(form) {
                        var tab = $('#TblGrid_fatturaDettagli tbody');
                        tab.empty();

                        /*
                         * Selezione Tipologia FatturaDettagli
                         */
                        var tr_fdTipologia = $('<tr class="select_fdTipologia" id="tr_Titolo"></tr>');
                        var td_caption_fdTipologia = $('<td class="CaptionTD"></td>');
                        var td_data_fdTipologia = $('<td class="DataTD"></td>');
                        var label_fdTipologia = $('<label>Tipologia</label>');
                        var span_form_fdTipologia = $('<span class="FormElement"></span>');
                        var div_fdTipologia = $('<div class="customelement" id="Titolo" name="Titolo"></div>');
                        var select_fdTipologia = $('<select class="form-control"></select>');

                        tab.append(tr_fdTipologia);
                        tr_fdTipologia.append(td_caption_fdTipologia.append(label_fdTipologia)).append(td_data_fdTipologia);
                        td_caption_fdTipologia.append(label_fdTipologia);
                        td_data_fdTipologia.append(span_form_fdTipologia);
                        span_form_fdTipologia.append(div_fdTipologia);
                        div_fdTipologia.append(select_fdTipologia);

                        var option_default_fdTipologia = $("<option>", { value: -1 },"</option>");
                        option_default_fdTipologia.text("Seleziona una tipologia di parametro");
                        var option_altro_fdTipologia = $("<option>", { value: 0 },"</option>");
                        option_altro_fdTipologia.text("Altro - Personalizzato");
                        select_fdTipologia.append(option_default_fdTipologia).append(option_altro_fdTipologia);
                        select_fdTipologia.val(-1);
                        first_selected_fdTipologia = -1;

                        $.getJSON( '?action=loadAttribuzioni', function( data ) {
                            for (var chiave in data) {
                                var option = $("<option>", { value: data[chiave].Id },"</option>");
                                option.text(data[chiave].Titolo);
                                select_fdTipologia.append(option);
                            }
                        });

                    },
                    onclickSubmit : function(params, posdata) {
                        var tab = $('#TblGrid_fatturaDettagli tbody');
                        var attribuzione = parseInt(tab.find('.select_fdTipologia select :selected').val());
                        var titolo, inizio, fine, prezzo, descrizione;
                        var checkVals = false;
                        if(attribuzione === 0){
                            titolo = tab.find('.input_Titolo input').val();
                            inizio = tab.find('.input_Inizio input').val();
                            fine = tab.find('.input_Fine input').val();
                            prezzo = tab.find('.input_Prezzo input').val();
                            descrizione = titolo;
                            if(titolo && prezzo){
                                checkVals = true;
                            }
                        }else if(attribuzione > 0){
                            titolo = tab.find('.select_fdTipologia select :selected').text();
                            inizio = tab.find('.input_Inizio input').val();
                            fine = tab.find('.input_Fine input').val();
                            prezzo = tab.find('.input_Prezzo input').val();

                            if(titolo && prezzo){
                                checkVals = true;
                            }
                        }

                        if(checkVals){
                            var addNew_FD = new FatturaDettagliInquilino();
                            addNew_FD.IdAttribuzione = attribuzione;
                            addNew_FD.Titolo = titolo;
                            addNew_FD.Inizio = inizio;
                            addNew_FD.Fine = fine;
                            addNew_FD.Totale = prezzo;
                            addNew_FD.Descrizione = descrizione;
                            var rowId = $.jgrid.randId();
                            jQuery("#fatturaDettagli").addRowData(rowId, addNew_FD);
                            first_selected_fdTipologia = -1;
                        }else{
                            bootbox.alert("Inserire tutti i campi!");
                        }
                        $('#cData').trigger('click');
                    }
                },
                // options for the Delete Dailog
                {
                    onclickSubmit : function(params, posdata) {
                    },
                    afterComplete: function () {
                        forceUpdateIva();
                    }, 
                    errorTextFormat: function (data) {
                        return 'Error: ' + data.responseText
                    }
                },
                { closeAfterEdit: true, focusField : 1 }
        );
        
        var lastSelectionFatturaDettagli;
        function editRowFatturaDettagli(id, e) {
            var grid = $("#fatturaDettagli");
            if (id && id !== lastSelectionFatturaDettagli) {
                grid.jqGrid('restoreRow',lastSelectionFatturaDettagli);
                //jQuery('#fatturaDettagli').editRow(id, true);
                jQuery('#fatturaDettagli').editRow(id, {
                    keys : true,
                    oneditfunc: function() {
                        //alert ("edited"); 
                    },
                    aftersavefunc: function (rowid, response, options) {
                        //alert("row with rowid=" + rowid + " is successfuly modified.");
                        forceUpdateIva();
                    }
                });
                lastSelectionFatturaDettagli = id;
            }
        }
        
    }

    function forceUpdateIva(){
        var data;
        var allRowsComponentiDettagli = $('#componentiDettagli').jqGrid('getGridParam','data');
        var allRowsFatturaDettagli = $('#fatturaDettagli').jqGrid('getGridParam','data');
        
        data = {
            allRowsComponentiDettagli: null,
            allRowsFatturaDettagli: null,
            ins: ins
        };

        if(allRowsComponentiDettagli && allRowsComponentiDettagli.length > 0){
            
            data.allRowsComponentiDettagli = allRowsComponentiDettagli;
            
        }
        
        if(allRowsFatturaDettagli && allRowsFatturaDettagli.length > 0){
            
            data.allRowsFatturaDettagli = allRowsFatturaDettagli;
            
        }
        
        updateIva(fattura, data);
        getTotale(fattura);

    }

</script>
<!-- Include dei files delle funzioni utilizzate -->
{include file="../invoice_common/invoice_functions.js.tpl"}

{include file="footer.tpl"}
