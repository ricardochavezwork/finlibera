{assign var=pageTitle value={#admin_fatture#}}
{assign var=menuActive value="admin"}
{assign var=menuSubActive value="fatture"}
{if !isset($record)}
{assign var=breadcrumb value="<li class='active'>Fatture</li>"}
{else}
{assign var=breadcrumb value="<li class='active'><a href='?'>Fatture</a></li>"}
{/if}
{include file="header.tpl"}

<!-- Include dei files js -->
<script src='{$smarty.const.URL_ROOT}_gestione/js/lib.js{$mobileV_js}'></script>

{if isset($error)}
    <div class="errore">{$error}</div>
{/if}

<h3 id="section_title">Recupero Fatture</h3>

{if $invoice->Numero}

<h5>Destinatario : <label style="font-weight:bold">{$inquilino->Cognome} {$inquilino->Nome}</label></h5> 

<h5>Dati generali della fattura:</h5>
<div class="input-generali">
    <table>
        <tr>
            <th><div class="short">Numero</div></th>
            <th><div class="short">Data</div></th>
        </tr>
        <tr>
            <td><input name='numero' class="short" type="number" value="" required/></td>
            <td><input name='data-fattura' class="short data" type="text" value="" required/></td>
        </tr>
    </table>
</div>

<!-- INS -->
<div class="input-generali dropdown">
    <h5>Seleziona il periodo di locazione contrattuale*</h5>
    <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Dal periodo {$ins_cast->DataInizio} {if $ins_cast->DataFine} Al {$ins_cast->DataFine}{/if}   <span class="caret"></span></button>
    <ul class="dropdown-menu id-ins" aria-labelledby="dropdownMenu1">
    {if count($ins) > 0}
        {foreach $ins as $inquilinoStanze}
            {if $inquilinoStanze->DataFine}
                <li><a id_ins="{$inquilinoStanze->Id}">Dal periodo {$inquilinoStanze->DataInizio} Al {$inquilinoStanze->DataFine}</a></li>
            {else}
                <li><a id_ins="{$inquilinoStanze->Id}">Dal periodo {$inquilinoStanze->DataInizio}</a></li>
            {/if}
        {/foreach}
    {/if}
    </ul>
</div>
    
<!-- TIPOLOGIA -->
<div class="input-generali dropdown">
    <h5>Tipologia di fattura*</h5>{*<select name="Tipologia">{html_options values=$tipologia_values output=$t_tipologia}</select>*}
    <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">{$t_tipologia[$invoice->Tipologia]}  <span class="caret"></span></button>
    <ul class="dropdown-menu id-tipologia" aria-labelledby="dropdownMenu2">
    {if count($tipologia_values) > 0}
        {foreach $tipologia_values as $tipologia}
            <li><a id-tipologia="{$tipologia}">{$t_tipologia[$tipologia]}</a>  </li>
        {/foreach}
    {/if}
    </ul>
</div>

<!-- PERIODO FATTURAZIONE -->
{if $invoice->Tipologia == $smarty.const.FATTURA_PI OR $invoice->Tipologia == $smarty.const.FATTURA_LOCAZIONE}
    <div class="dropdown">
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
{/if}
<br>
<div class="dinamic_componentiDettagli">
    <div class="data">
        <table id="componentiDettagli"></table>
        <div id="componentiDettagliPager"></div>
    </div>
</div>
<br>
<div class="dinamic_fdi">
    <div class="data">
        <table id="fatturaDettagli"></table>
        <div id="fatturaDettagliPager"></div>
    </div>
</div>
<div style="margin-top: 15px; height: 50px;">
    <a class="salva button" role="button" style="float: right; margin-right: 215px;"><span class="ui-button-text" style="width: 100px;">Salva</span></a>
</div>
{/if}
<script>

    var fattura = new Fattura();
    var loadIns = new Array();
    var ins = new Inquilino_Stanza(
        {$ins_cast->Id},
        {$ins_cast->IdInquilino},
        {$ins_cast->IdStanza},
        {$ins_cast->Turistico},
        {$ins_cast->PeriodoFatturazione},
        "{$ins_cast->DataFirma}",
        "{$ins_cast->DataInizio}",
        "{$ins_cast->DataFine}",
        {$ins_cast->Caparra},
        {$ins_cast->Canone},
        {$ins_cast->Spese},
        {$ins_cast->Cauzione},
        {$ins_cast->NumeroFatture},
        {$ins_cast->ConguaglioUtenze},
        {$ins_cast->ConguaglioSpese},
        {$ins_cast->GiorniNonGoduti},
        {$ins_cast->Pulizie},
        "{$ins_cast->Note}");

    var periodiFatturazione_cast = new FatturaDettagliInquilino();
    periodiFatturazione_cast.Inizio = "{$periodiFatturazione_cast->Inizio}";
    periodiFatturazione_cast.Fine = "{$periodiFatturazione_cast->Fine}";
    
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
    
    var id_ins_dropdown = $('#dropdownMenu1');
    var id_tipologia_dropdown = $('#dropdownMenu2');
    var periodo_fatturazione_dropdown = $('#dropdownMenu3');
    
    loadIns = {$ins_encoded};
    
    fattura.Id = {$invoice->Id};
    fattura.Data = "{$invoice->Data}";
    fattura.Numero = {$invoice->Numero};
    fattura.Tipologia = {$invoice->Tipologia};
    fattura.TipologiaDestinatario = {$invoice->TipologiaDestinatario};
   
    $(document).ready(function() {
        $(".input-generali input[name='numero']").val(fattura.Numero);
        $(".input-generali input[name='data-fattura']").val(fattura.Data);
        
        $(".dropdown-menu").css("cursor","pointer");
        loadTables();
        
        /*
         * Tramite il seguente codice possiamo trasformare elementi html generati, con attributi specifici, in array di oggetti.
         * @type Array
         * Potrebbe servire per il salvataggio delle righe di flexigrid. 
         */
        /*var arr = $('.dinamic_componentiDettagli .data .componenteDettaglio').toArray();
        refreshRecords();
        $("#listRecords").flexAddData(pushRow(extractColumn(arr, 'data-id')));*/
        
    });
    
    function reloadTable(){
        var invoice_clone = JSON.stringify(fattura);
        var ins_clone = JSON.stringify(ins);
        var periodiFatturazione_cast_clone = JSON.stringify(periodiFatturazione_cast);
        jQuery("#componentiDettagli").jqGrid('setGridParam',{ 
            url: '?action=loadCD&invoice=' + invoice_clone + '&ins=' + ins_clone,
            datatype:'json'
        }).trigger('reloadGrid');
        jQuery("#fatturaDettagli").jqGrid('setGridParam',{ 
            url: '?action=loadFDI&invoice=' + invoice_clone + '&periodo=' + periodiFatturazione_cast_clone + '&ins=' + ins_clone,
            datatype:'json'
        }).trigger('reloadGrid');
    }
    
    function loadTables(){
        var invoice_clone = JSON.stringify(fattura);
        var ins_clone = JSON.stringify(ins);
        $("#componentiDettagli").jqGrid({
		url: '?action=loadCD&invoice=' + invoice_clone + '&ins=' + ins_clone,
		datatype: "json",
                editurl: 'clientArray',
		 colModel: [
                        {
                            label: "Edit Actions",
                            name: "actions",
                            width: 20,
                            formatter: "actions",
                            formatoptions: {
                                keys: true,
                                editOptions: {},
                                addOptions: {},
                                delOptions: {}
                            }       
                        },
			{ label: 'Id', name: 'Id', width: 20, sorttype: 'integer' },
			{ label: 'IdComponente', name: 'IdComponente', width: 20, hidden: true },
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
		loadonce: true, // this is just for the demo
                caption: "Parametri di fatturazione fissi",
		pager: "#componentiDettagliPager"
                /*ondblClickRow: function(rowid) {
                    jQuery(this).jqGrid(
                            'editGridRow', 
                            rowid,
                            {
                                recreateForm:true,closeAfterEdit:true,
                                closeOnEscape:true,reloadAfterSubmit:false
                                
                             }
                    );
                    var rowData = jQuery(this).jqGrid ('getRowData', rowid);
                    
                }*/
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
                            var option = $("<option>", { value: data[chiave].Id },"</option>");
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
                            var rowId = $.jgrid.randId();
                            jQuery("#componentiDettagli").addRowData(rowId, newComponenteDettagli);
                            prezzoSelected = null;
                            componenteSelected = null;
                            first_selected_componente = 0;
                            first_selected_prezzo = 0;
                        }
                        $('#cData').trigger('click');
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

        
        var periodiFatturazione_cast_clone = JSON.stringify(periodiFatturazione_cast);
        $("#fatturaDettagli").jqGrid({
		url: '?action=loadFDI&invoice=' + invoice_clone + '&periodo=' + periodiFatturazione_cast_clone + '&ins=' + ins_clone,
		datatype: "json",
                editurl: 'clientArray',
		 colModel: [
                        {
                            label: "Edit Actions",
                            name: "actions",
                            width: 50,
                            formatter: "actions",
                            formatoptions: {
                                keys: true,
                                editOptions: {},
                                addOptions: {},
                                delOptions: {}
                            }       
                        },
			{ label: 'Titolo', name: 'Titolo', width: 90 },
                        { label: 'IdAttribuzione', name: 'IdAttribuzione', width: 20, hidden: true },
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
                        }
			// sorttype is used only if the data is loaded locally or loadonce is set to true
		],
                onSelectRow: editRowFatturaDettagli, // the javascript function to call on row click. will ues to to put the row in edit mode
		viewrecords: true, // show the current page, data rang and total records on the toolbar
		width: 780,
		height: 200,
		rowNum: 30,
		loadonce: true, // this is just for the demo
                caption: "Parametri di fatturazione variabili",
		pager: "#fatturaDettagliPager"
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
                        var titolo, inizio, fine, prezzo;
                        var checkVals = false;
                        if(attribuzione === 0){
                            titolo = tab.find('.input_Titolo input').val();
                            inizio = tab.find('.input_Inizio input').val();
                            fine = tab.find('.input_Fine input').val();
                            prezzo = tab.find('.input_Prezzo input').val();
                            
                            if(titolo && inizio && fine && prezzo){
                                checkVals = true;
                            }
                        }else if(attribuzione > 0){
                            titolo = tab.find('.select_fdTipologia select :selected').text();
                            inizio = tab.find('.input_Inizio input').val();
                            fine = tab.find('.input_Fine input').val();
                            prezzo = tab.find('.input_Prezzo input').val();
                            
                            if(titolo && inizio && fine && prezzo){
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
                    errorTextFormat: function (data) {
                        return 'Error: ' + data.responseText
                    }
                },
                { closeAfterEdit: true, focusField : 1 }
        );
        
        var lastSelectionFatturaDettagli;
        var lastSelectionComponentiDettagli;
        {literal}
        function editRowFatturaDettagli(id) {
            if (id && id !== lastSelectionFatturaDettagli) {
                var grid = $("#fatturaDettagli");
                grid.jqGrid('restoreRow',lastSelectionFatturaDettagli);
                lastSelectionFatturaDettagli = id;
                grid.jqGrid('editRow',id, {keys: true} );
            }
        }
        function editRowComponentiDettagli(id) {
            if (id && id !== lastSelectionComponentiDettagli) {
                var grid = $("#componentiDettagli");
                grid.jqGrid('restoreRow',lastSelectionComponentiDettagli);
                grid.jqGrid('editRow',id, {keys: true});
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
                    var option = $("<option>", { value: componentiDettagliByIdC[chiave].Prezzo, name: "freight", id: "zero", idcd: componentiDettagliByIdC[chiave].Id, selected: value == componentiDettagliByIdC[chiave].Prezzo },"</option>");
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
                    selRowId = myGrid.jqGrid ('getGridParam', 'selrow');
                    var rowData = $('#componentiDettagli').jqGrid('getRowData', selRowId);
                    var Id = $(elem).find("select option:selected").attr("idcd");
                    rowData.Id = Id;
                    $('#componentiDettagli').jqGrid('setRowData', selRowId, rowData);
                    return $(elem).find("select option:selected").val();
                }
            }
        
        {/literal}
    }
    
</script>
<!-- Include dei files delle funzioni utilizzate -->
{include file="../invoice_common/invoice_functions.js.tpl"}


{include file="footer.tpl"}