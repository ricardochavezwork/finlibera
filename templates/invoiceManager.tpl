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
{if $canAdd}
    <!--div>
        <a href="invoicing.php" class="button"><h5 style="margin: 1px">Crea Fattura</h5></a>
    </div-->
    <a href="invoicing.php">
        <button type="button" class="btn btn-default btn-lg">
            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Crea
        </button>
    </a>
    <br>
{/if}

<!--
INQUILINO / CLIENTE : Autocomplete
Leggere la documentazione su http://getbootstrap.com/components/#input-groups-buttons-dropdowns
-->
<br>
<div class="input-generali row">
    <div class="col-lg-6">
        <div class="input-group">
          <div class="input-group-btn">
          <button type="button" id="dropdownMenu1" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span class="caret"></span></button>
            <ul class="dropdown-menu t-destinatario">
              <li><a t-destinatario="{$smarty.const.DESTINATARI_INQUILINI}">{$t_tipologiaDestinatario[$smarty.const.DESTINATARI_INQUILINI]}</a></li>
              <li><a t-destinatario="{$smarty.const.DESTINATARI_CLIENTI}">{$t_tipologiaDestinatario[$smarty.const.DESTINATARI_CLIENTI]}</a></li>
              <!--li role="separator" class="divider"></li>
              <li><a href="#">Fornitori</a></li>
              <li><a href="#">Manutenzioni</a></li-->
            </ul>
          </div><!-- /btn-group -->
          <input name='intestatario' type="text" class="form-control" aria-label="..." placeholder="Ricerca veloce">
        </div><!-- /input-group -->
    </div><!-- /.col-lg-6 -->
    <button type="button" class="btn btn-default reset">
        <span class="glyphicon glyphicon-refresh" aria-hidden="true"></span> Reset
    </button>
</div><!-- /.row -->

<br>
<div class="invoices">
    <div class="data">
        <table id="invoices"></table>
        <div id="invoicesPager"></div>
    </div>
</div>
<br>
<!--div class="invoiceRecovery">
    <div class="data">
        <table id="invoiceRecovery"></table>
        <div id="invoiceRecoveryPager"></div>
    </div>
</div-->


<script>

    var t_destinatario = $('#dropdownMenu1');
    var id_destinatario = {$smarty.const.DESTINATARI_INQUILINI};

    $(document).ready(function() {
        $(".dropdown-menu").css("cursor","pointer");
        t_destinatario.text(titoloTipologiaDestinatario(1));
        loadTables();
    });

    function loadTables(){
        /*$("#invoiceRecovery").jqGrid({
		url: '?action=recupero_fatture',
		datatype: "json",
                editurl: 'clientArray',
		 colModel: [
                        { label : 'Data Generazione', name : 'DataRegistrazione', width : 130, align: 'center' },
                        { label : 'Num', name : 'Numero', width : 50, align: 'center' },
                        { label : 'Data Fattura', name : 'Data', width : 80, align: 'center' },
                        { label : 'Attribuzione', name : 'Tipologia', width : 100, align: 'left' },
                        { label : 'Intestatario', name : 'Intestatario', width : 200, align: 'left' },
                        { label: '', name : 'CellActions', width : 150, align: 'left'}
		],
                //onSelectRow: editRowComponentiDettagli, // the javascript function to call on row click. will ues to to put the row in edit mode
		viewrecords: true, // show the current page, data rang and total records on the toolbar
		width: 980,
		height: 1000,
                //footerrow: true,
                //userDataOnFooter: true, // use the userData parameter of the JSON response to display data on footer
		rowNum: 500,
		loadonce: true, // this is just for the demo
                caption: "Recupero Fatture",
		pager: "#invoiceRecoveryPager",
                loadComplete: function (){
                    $("#invoiceRecovery .button").button();
                }
	});

        $("#invoiceRecovery").jqGrid('bindKeys');*/

        $("#invoices").jqGrid({
		url: '?action=load',
		datatype: "json",
                editurl: 'clientArray',
		 colModel: [
                        { label : 'Registrazione', name : 'DataRegistrazione', width : 120, align: 'center', sorttype:'date' },
                        { label : 'Num', name : 'Numero', width : 35, align: 'center', sorttype:'integer' },
                        { label : 'D-Fattura', name : 'Data', width : 80, align: 'center', sorttype:'date', formatter: 'date', srcformat: 'Y-m-d', newformat: 'n/j/Y' },
                        { label : 'Totale', name : 'Totale', width : 60, align: 'center', sorttype: 'number' },
                        { label : 'Attribuzione', name : 'Tipologia', width : 100, align: 'left' },
                        { label : 'Intestatario', name : 'Intestatario', width : 150, align: 'left' },
                        { label: '', name : 'CellActions', width : 130, align: 'left'}
		],
		viewrecords: true, // show the current page, data rang and total records on the toolbar
		width: 980,
		height: 1000,
		rowNum: 100,
                caption: "Registro Fatture",
		pager: "#invoicesPager",
                loadComplete: function (){
                    $("#invoices .button").button();
                }
	});

        $("#invoices").jqGrid('bindKeys');

        /*$("#invoiceRecovery").navGrid("#invoiceRecoveryPager",
            { edit: false, add: false, del: false, search: true, refresh: true, view: true, align: "left" }
        );*/

        $("#invoices").navGrid("#invoicesPager",
            { edit: false, add: false, del: false, search: true, refresh: true, view: true, align: "left" }
        );

        $("#content .reset").click(function (){
            jQuery("#invoices").jqGrid('setGridParam',{
                url: '?action=load',
		datatype: "json"
            }).trigger('reloadGrid');
            $(".input-generali input[name='intestatario']").val('');
        });

        $('#content').on('click', '.pdf', function (){
            var id = parseInt($(this).attr('data-id'));
            var itt_docF = new Intestatario_DocumentoFiscale();
            itt_docF.LoadRelationship(id, 1, function(){
                var invoicePdf = new PDF();
              var tsDoc_Pdf = new TSDOC_PDF(itt_docF, invoicePdf);
              tsDoc_Pdf.setPDF(function(err){
                if(err && err instanceof TypeError){
                  bootbox.alert("Attenzione! Errore durante l'elaborazione del PDF. Richiedere indicazioni.");
                }else{
                  tsDoc_Pdf.getFileTitle(function(title){
                    try {

                      if(title && title instanceof TypeError)
                        throw title;

                      tsDoc_Pdf.pdf.Download(title);
                    } catch (e) {
                      console.log(e.message);
                    }
                  });
                }
              });
            });
            //window.open("../_gestione/invoiceDownload.php?idFattura=" + id);
        });
        $('#content').on('click', '.view', function (){
            var id = parseInt($(this).attr('data-id'));
            window.open("../_gestione/invoicing.php?action=load&idFattura=" + id, "_self");
        });
        $('#content').on('click', '.remove', function (){
            var id = parseInt($(this).attr('data-id'));
            bootbox.confirm("Sei sicuro di voler eliminare questa fattura?", function(result) {
                if(result){
                    $.getJSON( '../_gestione/invoicing.php?action=delete&idFattura=' + id, function( data ) {
                        if(data.success){
                            jQuery("#invoices").jqGrid('setGridParam',{
                                url: '?action=load',
                                datatype: 'json',
                                mtype: 'GET'
                            }).trigger('reloadGrid');
                            bootbox.alert("Fattura eliminata con successo!");
                        }else{
                            bootbox.alert({
                                title : "Errore imprevisto!",
                                message: printErrors(data.message, true)
                            });
                        }
                    });
                }
            });
        });
        $('#content').on('click', '.plus', function (){
            var id = parseInt($(this).attr('data-id'));
            bootbox.dialog({
                title: "Scegliere un'azione.",
                message: '<div class="row">  ' +
                    '<div class="col-md-12"> ' +
                    '<form class="form-horizontal"> ' +
                    '<div class="form-group text-center"> ' +
                    '<div class="col-md-4"></div>' +
                    '<div class="col-md-4"> ' +
                    '<button type="button" class="btn btn-info pdf-open btn-block" data-id="' + id + '" >Visualizza PDF</button></div>' +
                    '<div class="col-md-4"></div>' +
                    '</div> ' +
                    '<div class="form-group text-center"> ' +
                    '<div class="col-md-4"></div>' +
                    '<div class="col-md-4"> ' +
                    '<button type="button" class="btn btn-info pdf-print btn-block" data-id="' + id + '" >Stampa PDF</button></div>' +
                    '<div class="col-md-4"></div>' +
                    '</div> ' +
                    '<div class="form-group text-center"> ' +
                    '<div class="col-md-4"></div>' +
                    '<div class="col-md-4"> ' +
                    '<button type="button" class="btn btn-info storno btn-block" data-id="' + id + '" >Nota di credito</button></div>' +
                    '<div class="col-md-4"></div>' +
                    '</div> ' +
                    '</form></div></div>',
                buttons: {
                    back: {
                        label: "Indietro",
                        className: "btn-danger",
                        callback: function () {
                        }
                    }
                }
            });
        });

        $('body').on('click', '.pdf-open', function (){
            bootbox.hideAll();
            var id = parseInt($(this).attr('data-id'));
            var itt_docF = new Intestatario_DocumentoFiscale();
            itt_docF.LoadRelationship(id, 1, function(){
              var invoicePdf = new PDF();
              var tsDoc_Pdf = new TSDOC_PDF(itt_docF, invoicePdf);
              tsDoc_Pdf.setPDF(function(err){
                if(err && err instanceof TypeError){
                  bootbox.alert("Attenzione! Errore durante l'elaborazione del PDF. Richiedere indicazioni.");
                }else{
                  tsDoc_Pdf.getFileTitle(function(title){
                    try {

                      if(title && title instanceof TypeError)
                        throw title;

                      tsDoc_Pdf.pdf.Open(title);
                    } catch (e) {
                      console.log(e.message);
                    }
                  });
                }
              });
            });
            //window.open("../_gestione/invoiceDownload.php?idFattura=" + id + '&pdf=1');
        });

        $('body').on('click', '.pdf-print', function (){
            bootbox.hideAll();
            var id = parseInt($(this).attr('data-id'));
            var itt_docF = new Intestatario_DocumentoFiscale();
            itt_docF.LoadRelationship(id, 1, function(){
              var invoicePdf = new PDF();
              var tsDoc_Pdf = new TSDOC_PDF(itt_docF, invoicePdf);
              tsDoc_Pdf.setPDF(function(err){
                if(err && err instanceof TypeError){
                  bootbox.alert("Attenzione! Errore durante l'elaborazione del PDF. Richiedere indicazioni.");
                }else{
                  tsDoc_Pdf.getFileTitle(function(title){
                    try {

                      if(title && title instanceof TypeError)
                        throw title;

                      tsDoc_Pdf.pdf.Print();
                    } catch (e) {
                      console.log(e.message);
                    }
                  });
                }
              });
            });
            //window.open("../_gestione/invoiceDownload.php?idFattura=" + id + '&pdf=2');
        });

        $('body').on('click', '.mail', function (){
            //bootbox.hideAll();
            //var id = parseInt($(this).attr('data-id'));
            //window.open('?action=sendPDF');
        });

        $('body').on('click', '.storno', function (){
            bootbox.hideAll();
            var id = parseInt($(this).attr('data-id'));
            bootbox.dialog({
              message: "Scegliere la tipologia di storno...",
              title: "Nota di credito",
              buttons: {
                parziale: {
                    label: "Parziale",
                    className: "btn-info",
                    callback: function() {
                      window.open("../_gestione/invoicing.php?action=load&idFattura=" + id + "&actionStorno=1", "_self");
                    }
                },
                totale: {
                    label: "Totale",
                    className: "btn-info",
                    callback: function() {
                      $.get('?action=saveStorno&idFattura=' + id, function (data){
                          if(data.success === true){
                              jQuery("#invoices").jqGrid('setGridParam',{
                                url: '?action=load',
                                datatype: 'json',
                                mtype: 'GET'
                              }).trigger('reloadGrid');
                              bootbox.alert("Storno avvenuto con successo!");
                          }else{
                              bootbox.alert("Errore: Problemi durante il salvataggio!");
                          }
                      });
                    }
                },
                back: {
                    label: "Indietro",
                    className: "btn-danger",
                    callback: function () {

                    }
                }
              }
            });
        });

    }

    /*
     * Metodo per la scelta della tipologiaDestinatario - Attributo di Fatture.
     */

    $(".t-destinatario").on("click", "a", function (){
        id_destinatario = parseInt($(this).attr('t-destinatario'));
        t_destinatario.text(titoloTipologiaDestinatario(id_destinatario));
    });

    $(".input-generali").on("focus","input[name='intestatario']", function(){
        if(id_destinatario === {$smarty.const.DESTINATARI_INQUILINI}){

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
                    var inquilino = $.extend(new Inquilino(), ui.item.Inquilino);
                    loadByInquilino(inquilino.Id);
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
                    var Id = ui.item.Id;
                    loadByCliente(Id);
                }
            });
        }
    });

    function loadByInquilino(Id){
        if(parseInt(Id) > 0){
            jQuery("#invoices").jqGrid('setGridParam',{
                url: '?action=loadByInquilino&idInquilino=' + Id,
                datatype: 'json',
                mtype: 'GET'
            }).trigger('reloadGrid');
        }
    }

    function loadByCliente(Id){
        if(parseInt(Id) > 0){
            jQuery("#invoices").jqGrid('setGridParam',{
                url: '?action=loadByCliente&idCliente=' + Id,
                datatype: 'json',
                mtype: 'GET'
            }).trigger('reloadGrid');
        }
    }

    function printErrors(array, dialog){

        var s = "";
        if(dialog === true){
            for (var chiave in array) {
                s = s + "<p>" + array[chiave] + "</p>";
            }
        }else{
            for (var chiave in array) {
                console.log(array[chiave]);
            }
        }

        return s;

    }

</script>
{include file="footer.tpl"}
