{assign var=pageTitle value={#admin_stanze_sommario#}}
{assign var=menuActive value="admin"}
{assign var=menuSubActive value="stanze"}
{if !isset($record)}
{assign var=breadcrumb value="<li class='active'>Stanze</li>"}
{else}
{assign var=breadcrumb value="<li class='active'><a href='?'>Stanze</a></li>"}
{/if}

{include file="header.tpl"}

<script src='{$smarty.const.URL_ROOT}_gestione/js/lib.js{$mobileV_js}'></script>

{if isset($error)}
    <div class="errore">{$error}</div>
{/if}

<!--
APPARTAMENTO / STANZA : Autocomplete
Leggere la documentazione su http://getbootstrap.com/components/#input-groups-buttons-dropdowns
-->
<br>
<div class="input-generali row">
    <div class="col-lg-6">
        <div class="input-group">
          <div class="input-group-btn">
          <button type="button" id="dropdownMenu1" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span class="caret"></span></button>
            <ul class="dropdown-menu t-ricerca">
              <li><a t-ricerca="apt">Appartamento</a></li>
              <li><a t-ricerca="aptStanza">Stanza</a></li>
              <!--li role="separator" class="divider"></li>
              <li><a href="#">Fornitori</a></li>
              <li><a href="#">Manutenzioni</a></li-->
            </ul>
          </div><!-- /btn-group -->
          <input name='ricerca' type="text" class="form-control" aria-label="..." placeholder="Ricerca veloce">
        </div><!-- /input-group -->
    </div><!-- /.col-lg-6 -->
    <button type="button" class="btn btn-default reset">
        <span class="glyphicon glyphicon-refresh" aria-hidden="true"></span> Reset
    </button>
</div><!-- /.row -->

<br>

<div class="rooms">
    <div class="data">
        <table id="rooms"></table>
        <div id="roomsPager"></div>
    </div>
</div>

<script>

    function AdminAccount(canBook){
        this.canBook = new Privilege(canBook);
    }

    var admin = new AdminAccount(false);
    var registro = new Array();

    var t_ricerca = $('#dropdownMenu1');
    var id_ricerca = "apt";

    {if $canBook}
        admin.canBook.set(true);
    {/if}

    $(document).ready(function() {
        $("#content").css("margin-left","-100px");
        $(".dropdown-menu").css("cursor","pointer");
        t_ricerca.text(titoloTipologiaRicerca("apt"));
        loadTables();
    });

    function loadTables(){
        $.getJSON( '?action=load', function( data ) {
            console.log(data);
            registro = data.rows.Load;
            loadFieldsRegistro(registro, function (e){
                registro = e;
                loadTableRegistro(registro);
            });
        });
    }

    function loadTableByIdStanza(id){
        if(parseInt(id) > 0){
            $.getJSON( '?action=loadByIdStanza&Id=' + id, function( data ) {
                registro = data.rows.Load;
                loadFieldsRegistro(registro, function (e){
                    registro = e;
                    reloadTable(registro);
                });
            });
        }
    }

    function loadTableByIdApt(id){
        if(parseInt(id) > 0){
            $.getJSON( '?action=loadByIdAppartamento&Id=' + id, function( data ) {
                registro = data.rows.Load;
                loadFieldsRegistro(registro, function (e){
                    registro = e;
                    reloadTable(registro);
                });
            });
        }
    }

    function reloadTable(data){
        jQuery("#rooms").jqGrid("clearGridData");
        jQuery("#rooms").jqGrid('setGridParam',{
            datatype: 'local',
            data: data
        }).trigger('reloadGrid');
    }

    function loadFieldsRegistro(registro, callback){
        var arr = new Array();
        var counter = 0;

        var runCallback = function() {
            if(callback){
                callback(arr);
            }
        };

        if(registro && registro.length > 0){
            registro.forEach(function(arrayElement) {

                arrayElement.CellActions = "";
                if(admin.canBook.checkPrivilege() && arrayElement.Free){
                    var style_button = "btn-default";
                    var button_text = "Non prenotata";
                    if(arrayElement.IsBooked){
                        style_button = "btn-warning";
                        button_text = "Prenotata";

                        switch (parseInt(arrayElement.Appartamento_Stanza.BookType)) {
                          case 0:
                            arrayElement.CellActions += '<select class="book ' + style_button + '" data-id="' + arrayElement.Id + '"><option value="0" selected>Non Prenotata</option><option value="1">Prenotata</option><option value="2">Prenotazione Estesa</option></select>';
                            break;
                          case 1:
                            arrayElement.CellActions += '<select class="book ' + style_button + '" data-id="' + arrayElement.Id + '"><option value="0">Non Prenotata</option><option selected value="1">Prenotata</option><option value="2">Prenotazione Estesa</option></select>';
                            break;
                          case 2:
                            arrayElement.CellActions += '<select class="book ' + style_button + '" data-id="' + arrayElement.Id + '"><option value="0">Non Prenotata</option><option value="1">Prenotata</option><option selected value="2">Prenotazione Estesa</option></select>';
                            break;
                          default:
                            arrayElement.CellActions += '<select class="book ' + style_button + '" data-id="' + arrayElement.Id + '"><option selected value="0">Non Prenotata</option><option value="1">Prenotata</option><option value="2">Prenotazione Estesa</option></select>';
                            break;
                        }

                    }else{
                      arrayElement.CellActions += '<select class="book ' + style_button + '" data-id="' + arrayElement.Id + '"><option value="0" selected>Non Prenotata</option><option value="1">Prenotata</option><option value="2">Prenotazione Estesa</option></select>';
                    }

                    //arrayElement.CellActions += "<button type='button' class='btn " + style_button + " btn-sm book' data-id='" + arrayElement.Id + "'><span class='glyphicon glyphicon-book' aria-hidden='true'></span> " + button_text + "</button>";
                    //arrayElement.CellActions += '<select class="round"><option>Prenota</option><option selected>Libera</option><option>Uniplaces</option></select>';
                }

                arrayElement.Indirizzo = '<a href="appartamenti.php?Id=' + arrayElement.Appartamento.Id + '">' + arrayElement.Appartamento.Indirizzo + (arrayElement.Appartamento.Civico ? ", " + arrayElement.Appartamento.Civico : "") + '</a>';
                arrayElement.Numero = '<a href="stanze.php?Id=' + arrayElement.Id + '">' + arrayElement.Numero + '</a>';

                var assignValue = function (r){
                    arrayElement.AptStanza = r.AptStanza;
                    arr.push(arrayElement);
                    if(counter === registro.length){
                        runCallback();
                    }
                };

                counter++;
                assignValue(arrayElement);

            });
        }

    }

    function loadTableRegistro(registro){
        if(registro && registro.length > 0){
            $("#rooms").jqGrid({
                    datatype: "local",
                    data: registro,
                    editurl: 'clientArray',
                    colModel: [
                         { label : 'Id', name : 'Id', width : 20, align: 'center', sorttype:'integer', hidden: true, searchoptions: { searchhidden: true } },
                         { label : 'Appartamento', name : 'Indirizzo', width : 80, align: 'left', sorttype:'text' },
                         { label : 'Stanza', name : 'Numero', width : 30, align: 'left', sorttype:'number' },
                         { label : '&#128; Attuale', name : 'PrezzoAttuale', width : 40, align: 'left', sorttype:'number' },
                         /*{ label : '&#128; Originale', name : 'PrezzoSuggerito', width : 45, align: 'left', sorttype:'number' },*/
                         { label : '&#128; Dinamico', name : 'PrezzoDinamico', width : 45, align: 'left', sorttype:'number' },
                         { label : 'Inquilino', name : 'Inquilino', width : 60, align: 'left', sorttype:'text' },
                         { label : 'Et&agrave;', name : 'Eta', width : 20, align: 'left', sorttype:'number' },
                         { label : 'Professione', name : 'Professione', width : 60, align: 'left', sorttype:'text' },
                         { label : 'Inizio', name : 'DataInizio', width : 45, align: 'left', sorttype:'date', formatter: 'date', srcformat: 'Y-m-d', newformat: 'n/j/Y' },
                         { label : 'Fine', name : 'DataFine', width : 45, align: 'left', sorttype:'date', formatter: 'date', srcformat: 'Y-m-d', newformat: 'n/j/Y' },
                         { label : 'Admin', name : 'Admin', width : 30, align: 'left', sorttype:'text' },
                         { label : 'Azioni', name : 'CellActions', width : 60, align: 'left' }

                    ],
                    viewrecords: true, // show the current page, data rang and total records on the toolbar
                    width: 1200,
                    height: 1000,
                    rowNum: 25,
                    caption: "Registro Stanze",
                    pager: "#roomsPager"
            });

            // the bindKeys()
            $("#rooms").jqGrid('bindKeys');
            $("#rooms").navGrid("#roomsPager",
                { edit: false, add: false, del: false, search: true, refresh: false, view: false, align: "left" }
            );

        }
    }

    $('.rooms').on('change', '.book', function (){
        var el = $(this);
        var id = parseInt(el.attr('data-id'));
        var value = parseInt(el.val());
        var data = { Id : id, BookType : value };
        console.log(data);
        var clone = JSON.stringify(data);
        var url = "?action=toogleBooking&data=" + clone;

        if(id > 0){
            $.getJSON( url , function (data){
                //console.log(data);
                if(data.success){
                    if(value > 0){
                        el.removeClass("btn-default");
                        el.addClass("btn-warning");
                        //el.text("Prenotata");
                    }else if(value === 0){
                        el.removeClass("btn-warning");
                        el.addClass("btn-default");
                        //el.text("Non prenotata");
                    }
                }else{
                    bootbox.alert("Errore del sistema!");
                }
            });
        }
    });

    $("#content .reset").click(function (){
        $.getJSON( '?action=load', function( data ) {
            registro = data.rows.Load;
            loadFieldsRegistro(registro, function (e){
                registro = e;
                reloadTable(registro);
            });
        });
    });

    /*
     * Metodo per la scelta della tipologiaDestinatario - Attributo di Fatture.
     */

    $(".t-ricerca").on("click", "a", function (){
        id_ricerca = $(this).attr('t-ricerca');
        t_ricerca.text(titoloTipologiaRicerca(id_ricerca));
    });

    $(".input-generali").on("focus","input[name='ricerca']", function(){
        if(id_ricerca === "apt"){

            $(this).autocomplete({
                source: URL_ROOT + '_gestione/autocompleteMovimenti.php?action=appartamento',
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
                    var id = ui.item.id;

                    loadTableByIdApt(id);
                }
            });
        }else{
            $(this).autocomplete({
                source: URL_ROOT + '_gestione/autocompleteMovimenti.php?action=aptStanze',
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
                    var id = ui.item.Appartamento_Stanza.Id;

                    loadTableByIdStanza(id);
                }
            });
        }
    });

    function titoloTipologiaRicerca(param){
        var str = "NONE";

        if(param === "apt"){
            str = "Appartamento";
        }else if(param === "aptStanza"){
            str = "Stanza";
        }

        return str;
    }

</script>

{include file="footer.tpl"}
