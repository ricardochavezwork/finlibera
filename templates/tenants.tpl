{assign var=pageTitle value={#admin_inquilini#}}
{assign var=menuActive value="admin"}
{assign var=menuSubActive value="inquilini"}
{if !isset($record)}
{assign var=breadcrumb value="<li class='active'>Inquilini</li>"}
{else}
{assign var=breadcrumb value="<li class='active'><a href='?'>Inquilini</a></li>"}
{/if}

{include file="header.tpl"}

<script src='{$smarty.const.URL_ROOT}_gestione/js/lib.js{$mobileV_js}'></script>

{if isset($error)}
    <div class="errore">{$error}</div>
{/if}

<button class="btn btn-default collapseTables btn-block" type="button">
    <h5>Dati generali</h5>
</button>

<br>
<div class="table-responsive" style="overflow: visible" id="collapseTables">
    <table class="table-cell table-1">
        <thead>
            <tr>
            <th class="col-md-8"><h5>Agente</h5></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="col-md-8">
                    <div class="input-generali dropdown i_agente">
                        <button class="btn btn-default dropdown-toggle btn-block" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"> <span class="caret"></span></button>
                        <ul class="dropdown-menu id-tipologia btn-block" aria-labelledby="dropdownMenu1">
                            {if count($agenti) > 0}
                                {foreach $agenti as $agente}
                                    <li><a id-agente="{$agente->Id}">{$agente->Username}</a>  </li>
                                {/foreach}
                            {/if}
                        </ul>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <table class="table-cell table-2">
        <thead>
            <tr>
            <th class="col-md-4"><h5>Nome</h5></th>
            <th class="col-md-4"><h5>Cognome</h5></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="col-md-4">
                    <div class="input-generali">
                        <input name="nome" type="text" class="form-control" placeholder="...">
                    </div>
                </td>
                <td class="col-md-4">
                    <div class="input-generali">
                        <input name="cognome" type="text" class="form-control" placeholder="...">
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <table class="table-cell table-3">
        <thead>
            <tr>
            <th class="col-md-4"><h5>Sesso</h5></th>
            <th class="col-md-4"><h5>Data di nascita</h5></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="col-md-4">
                    <div class="input-group input-generali checkbox">
                        <input name="sesso" type="checkbox" data-toggle="toggle" data-on="Femminile" data-off="Maschile">
                    </div>
                </td>
                <td class="col-md-4">
                    <div class="input-generali">
                        <input type="text" class="flatpickr form-control data-nascita" aria-describedby="sizing-addon1" data-allow-input="true">
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <table class="table-cell table-4">
        <thead>
            <tr>
            <th class="col-md-6"><h5>Professioni</h5></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="col-md-6">
                    <div class="input-generali dropdown i_professione">
                        <button class="btn btn-default dropdown-toggle btn-block" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"> <span class="caret"></span></button>
                        <ul class="dropdown-menu id-tipologia btn-block" aria-labelledby="dropdownMenu2">
                            {if count($professioni) > 0}
                                {foreach $professioni as $professione}
                                    <li><a id-professione="{$professione->Value}">{$professione->Output}</a>  </li>
                                {/foreach}
                            {/if}
                        </ul>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <table class="table-cell table-13">
        <thead>
            <tr>
            <th class="col-md-6"><h5>Fonte</h5></th>
            <th class="col-md-6"><h5>Lingua</h5></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="col-md-6">
                    <div class="input-generali dropdown i_fonte">
                        <button class="btn btn-default dropdown-toggle btn-block" type="button" id="dropdownMenu3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"> <span class="caret"></span></button>
                        <ul class="dropdown-menu id-fonte btn-block" aria-labelledby="dropdownMenu3">
                            {if count($fonti) > 0}
                                {foreach $fonti as $fonte}
                                    <li><a id-fonte="{$fonte->Value}">{$fonte->Output}</a>  </li>
                                {/foreach}
                            {/if}
                        </ul>
                    </div>
                </td>
                <td class="col-md-4">
                    <div class="input-group input-generali checkbox">
                        <input name="lingua" type="checkbox" data-toggle="toggle" data-on="Inglese" data-off="Italiano">
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <table class="table-cell table-5">
        <thead>
            <tr>
            <th class="col-md-4"><h5>Specializzazione</h5></th>
            <th class="col-md-4"><h5>Ente</h5></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="col-md-4">
                    <div class="input-generali">
                        <input name="specializzazione" type="text" class="form-control" placeholder="...">
                    </div>
                </td>
                <td class="col-md-4">
                    <div class="input-generali">
                        <input name="ente" type="text" class="form-control" placeholder="...">
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <table class="table-cell table-6">
        <thead>
            <tr>
            <th class="col-sm-1"><h5>Email *</h5></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="col-sm-1">
                    <!-- input-addon e' una classe per manipolare lo scroll -->
                    <div class="input-group input-addon" style="min-width: 585px;">
                        <span class="input-group-addon" id="sizing-addon2">@</span>
                        <input name="email" type="text" class="form-control" placeholder="Email" aria-describedby="sizing-addon2">
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <table class="table-cell table-6">
        <thead>
            <tr>
            <th class="col-sm-1"><h5>Email Secondaria</h5></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="col-sm-1">
                    <!-- input-addon e' una classe per manipolare lo scroll -->
                    <div class="input-group input-addon" style="min-width: 585px;">
                        <span class="input-group-addon" id="sizing-addon2">@</span>
                        <input name="secondaryemail" type="text" class="form-control" placeholder="Email Secondaria" aria-describedby="sizing-addon2">
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <table class="table-cell table-7">
        <thead>
            <tr>
            <th class="col-md-8"><h5>Telefono</h5></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="col-md-8">
                    <!-- input-addon e' una classe per manipolare lo scroll -->
                    <div class="input-group input-addon" style="min-width: 275px;">
                        <span class="input-group-addon" id="sizing-addon2">tel.</span>
                        <input name="telefono" type="text" class="form-control" placeholder="..." aria-describedby="sizing-addon2">
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <table class="table-cell table-8">
        <thead>
            <tr>
            <th class="col-md-8"><h5>Indirizzo</h5></th>
            <th class="col-md-4"><h5>Civico</h5></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="col-md-8">
                    <div class="input-generali">
                        <input name="indirizzo" type="text" class="form-control" placeholder="...">
                    </div>
                </td>
                <td class="col-md-4">
                    <div class="input-generali">
                        <input name="civico" type="text" class="form-control" placeholder="...">
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <table class="table-cell table-9">
        <thead>
            <tr>
            <th class="col-md-8"><h5>Citta</h5></th>
            <th class="col-md-4"><h5>CAP</h5></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="col-md-8">
                    <div class="input-generali">
                        <input name="citta" type="text" class="form-control" placeholder="...">
                    </div>
                </td>
                <td class="col-md-4">
                    <div class="input-generali">
                        <input name="cap" type="text" class="form-control" placeholder="...">
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <table class="table-cell table-14"> <thead> <tr> <th class="col-md-4"><h5>Regione/Stato</h5></th><th class="col-md-4"><h5>Paese</h5></th><th class="col-md-4"><h5>Paese Sigla</h5></th> </tr> </thead> <tbody> <tr> <td class="col-md-4"> <div class="input-generali"> <input name="stato" type="text" class="form-control" placeholder="..."> </div> </td><td class="col-md-4"> <div class="input-generali"> <input name="paese" type="text" class="form-control" placeholder="..."> </div> </td><td class="col-md-4"> <div class="input-generali"> <input name="paese_sigla" type="text" class="form-control" placeholder="..."> </div> </td> </tr> </tbody> </table>
    <table class="table-cell table-10">
        <thead>
            <tr>
            <th class="col-md-6"><h5>Luogo di nascita</h5></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="col-md-6">
                    <div class="input-generali">
                        <input name="luogoNascita" type="text" class="form-control" placeholder="...">
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <table class="table-cell table-11">
        <thead>
            <tr>
            <th class="col-md-6"><h5>Codice Fiscale</h5></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="col-md-6">
                    <div class="input-generali">
                        <input name="codiceFiscale" type="text" class="form-control" placeholder="...">
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <table class="table-cell table-14">
        <thead>
            <tr>
            <th class="col-md-6"><h5>N° ID Estero</h5></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="col-md-6">
                    <div class="input-generali">
                        <input name="foreignID" type="text" class="form-control" placeholder="...">
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <table class="table-cell table-12">
        <thead>
            <tr>
            <th class="col-md-6"><h5>Note</h5></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="col-md-6">
                    <div class="input-generali">
                        <input name="note" type="text" class="form-control" placeholder="...">
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <table class="table-cell table-3">
        <thead>
            <tr>
            <th class="col-md-4"><h5>Fidelity Card</h5></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="col-md-4">
                    <div class="input-group input-generali checkbox">
                        <input name="fidelitycard" type="checkbox" data-toggle="toggle" data-on="Si" data-off="No">
                    </div>
                </td>
            </tr>
        </tbody>
    </table>

</div>

<br>

<button class="btn btn-default collapseIns btn-block" type="button">
    <h5>Registro Inquilino-Stanze</h5>
</button>

<br>

{if $canEdit}
<button class="btn btn-default create-ins" type="button">
    <h5>Aggiungi al registro</h5>
</button>
<br><br>
{/if}

<div class="registroIns">
    <div class="data">
        <table id="registroIns"></table>
        <div id="registroInsPager"></div>
    </div>
</div>

<br>

<button class="btn btn-default collapseInp btn-block" type="button">
    <h5>Registro Inquilino-PostiAuto</h5>
</button>

<br>

{if $canEdit}
<button class="btn btn-default create-inp" type="button">
    <h5>Aggiungi al registro</h5>
</button>
<br><br>
{/if}

<div class="registroInp">
    <div class="data">
        <table id="registroInp"></table>
        <div id="registroInpPager"></div>
    </div>
</div>

<br>

{if $canEdit}
<button class="btn btn-info create-i" type="button">
    <h5>Salva Inquilino</h5>
</button>
<br><br>
{/if}

<script>

    /*
     * Variabili globali elementi html
     */

    var id_agente_dropdown = $('#dropdownMenu1');
    var id_professione_dropdown = $("#dropdownMenu2");
    var id_fonte_dropdown = $("#dropdownMenu3");

    var i_nome = $(".input-generali input[name='nome']");
    var i_cognome = $(".input-generali input[name='cognome']");
    var i_sesso = $(".input-generali input[name='sesso']");
    var i_lang = $(".input-generali input[name='lingua']");
    var i_dataNascita = $(".data-nascita");
    var i_idAdmin = $(".i_agente");
    var i_professione = $(".i_professione");
    var i_fonte = $(".i_fonte");
    var i_specializzazione = $(".input-generali input[name='specializzazione']");
    var i_ente = $(".input-generali input[name='ente']");
    var i_email = $(".input-addon input[name='email']");
    var i_secondaryemail = $(".input-addon input[name='secondaryemail']");
    var i_telefono = $(".input-addon input[name='telefono']");
    var i_indirizzo = $(".input-generali input[name='indirizzo']");
    var i_civico = $(".input-generali input[name='civico']");
    var i_citta = $(".input-generali input[name='citta']");
    var i_cap = $(".input-generali input[name='cap']");
    var i_stato = $(".input-generali input[name='stato']");
    var i_paese = $(".input-generali input[name='paese']");
    var i_paese_sigla = $(".input-generali input[name='paese_sigla']");
    var i_luogoNascita = $(".input-generali input[name='luogoNascita']");
    var i_codiceFiscale = $(".input-generali input[name='codiceFiscale']");
    var i_foreignID = $(".input-generali input[name='foreignID']");
    var i_note = $(".input-generali input[name='note']");
    var i_fidelityCard = $(".input-generali input[name='fidelitycard']");

    var table_1 = $(".table-1");
    var table_2 = $(".table-2");
    var table_3 = $(".table-3");
    var table_4 = $(".table-4");
    var table_5 = $(".table-5");
    var table_6 = $(".table-6");
    var table_7 = $(".table-7");
    var table_8 = $(".table-8");
    var table_9 = $(".table-9");
    var table_10 = $(".table-10");
    var table_11 = $(".table-11");
    var table_12 = $(".table-12");
    var table_13 = $(".table-13");
    var table_14 = $(".table-14");

    function AdminAccount(canView, canEdit, canDelete){
        this.canView = new Privilege(canView);
        this.canEdit = new Privilege(canEdit);
        this.canDelete = new Privilege(canDelete);
        this.modifiesDisabled = function (){
            if(!this.canEdit.checkPrivilege()){
                i_idAdmin.find("button").addClass("disabled");
                i_professione.find("button").addClass("disabled");
                table_1.find("input").prop("disabled", true);
                table_2.find("input").prop("disabled", true);
                table_3.find("input").prop("disabled", true);
                table_4.find("input").prop("disabled", true);
                table_5.find("input").prop("disabled", true);
                table_6.find("input").prop("disabled", true);
                table_7.find("input").prop("disabled", true);
                table_8.find("input").prop("disabled", true);
                table_9.find("input").prop("disabled", true);
                table_10.find("input").prop("disabled", true);
                table_11.find("input").prop("disabled", true);
                table_12.find("input").prop("disabled", true);
                table_13.find("input").prop("disabled", true);
                table_14.find("input").prop("disabled", true);
            }
        }
    }

    var idInquilino = parseInt({$idInquilino});
    var inquilino = new Inquilino();
    var admin = new AdminAccount(false, false, false);
    var registroIns = new Array();
    var registroInp = new Array();
    var agenti;
    var professioni;
    var fonti;

    {if $canView}
        admin.canView.set(true);
    {/if}
    {if $canEdit}
        admin.canEdit.set(true);
    {/if}
    {if $canDelete}
        admin.canDelete.set(true);
    {/if}

    {if count($agenti) > 0}
        agenti = {$agenti_encoded};
    {/if}

    {if count($professioni) > 0}
        professioni = {$professioni_encoded};
    {/if}

    {if count($fonti) > 0}
        fonti = {$fonti_encoded};
    {/if}

    id_agente_dropdown.text("Fede, Barbara, Andrea...");
    id_professione_dropdown.text("Nessuna");
    id_fonte_dropdown.text("Nessuna");

    $(document).ready(function (){

        $(".dropdown-menu").css("cursor","pointer");

        if(idInquilino > 0){

            loadInquilino(idInquilino);

        }else{
            //Creazione inquilino
            interface_addInquilino();
        }

        admin.modifiesDisabled();

    });

    /*
     * General Functions
     */

    function loadInquilino(Id){
        $.getJSON( '?action=load&Id=' + Id, function( data ) {
            console.log(data);
            inquilino = $.extend(new Inquilino(), data.Inquilino);
            registroIns = data.LoadIns;
            registroInp = data.LoadInP;
            loadFieldsInquilino(inquilino);
            loadFieldsRegistroIns(registroIns, function (e){
                registroIns = e;
                loadTableRegistroIns(e);
            });
            loadFieldsRegistroInp(registroInp, function (r){
                registroInp = r;
                loadTableRegistroInp(r);
            });
            //reloadIns();
        });
    }

    function loadInquilino_Stanza(Id, callback){
        var ins = new Inquilino_Stanza();
        if(parseInt(Id) > 0){
            $.getJSON( '?action=loadIns&IdIns=' + Id, function( data ) {
                ins = $.extend(new Inquilino_Stanza(), data.Ins);

                if(ins && callback){
                    callback(ins);
                }

            });
        }

        return ins;
    }

    function loadInquilino_Disdetta(Id, callback){
        var insDisdetta = new Inquilino_Disdetta();
        if(parseInt(Id) > 0){
            $.getJSON( '?action=loadDisdetta&IdDisdetta=' + Id, function( data ) {
                insDisdetta = $.extend(new Inquilino_Disdetta(), data.Inquilino_Disdetta);

                if(insDisdetta && callback){
                    callback(insDisdetta);
                }

            });
        }

        return insDisdetta;
    }

    function loadIns_Disdette(Id, callback){
        var insDisdette = new Array();
        if(parseInt(Id) > 0){
            $.getJSON( '?action=loadInsDisdette&IdIns=' + Id, function( data ) {
                insDisdette = data.LoadInsDisdette;

                if(insDisdette && callback){
                    callback(insDisdette);
                }

            });
        }

        return insDisdette;
    }

    function loadInquilino_PostiAuto(Id, callback){
        var inp = new Inquilino_PostiAuto();
        if(parseInt(Id) > 0){
            $.getJSON( '?action=loadInp&IdInp=' + Id, function( data ) {
                inp = $.extend(new Inquilino_PostiAuto(), data.Inp);

                if(inp && callback){
                    callback(inp);
                }

            });
        }

        return inp;
    }

    function loadAppartamento(Id, callback){
        var appartamento = new Appartamento();
        if(parseInt(Id) > 0){
            $.getJSON( '?action=loadAppartamento&IdApt=' + Id, function( data ) {
                appartamento = $.extend(new Appartamento(), data.Appartamento);

                if(appartamento && callback){
                    callback(appartamento);
                }

            });
        }

        return appartamento;
    }

    function loadAppartamento_Stanza(Id, callback){
        var apt_Stanza = new Appartamenti_Stanze();
        if(Id > 0){
            $.getJSON( '?action=loadAptStanza&IdAptStanza=' + Id, function( data ) {
                apt_Stanza = $.extend(new Appartamenti_Stanze(), data.Appartamento_Stanza);

                if(apt_Stanza && callback){
                    callback(apt_Stanza);
                }

            });
        }

        return apt_Stanza;
    }

    function loadAppartamento_PostiAuto(Id, callback){
        var apt_PostiAuto = new Appartamenti_PostiAuto();
        if(Id > 0){
            $.getJSON( '?action=loadAptPostiAuto&IdAptPostoAuto=' + Id, function( data ) {
                apt_PostiAuto = $.extend(new Appartamenti_PostiAuto(), data.Appartamento_PostoAuto);

                if(apt_PostiAuto && callback){
                    callback(apt_PostiAuto);
                }

            });
        }

        return apt_PostiAuto;
    }

    function loadTableRegistroIns(registro){
        if(registro && registro.length > 0){
            $("#registroIns").jqGrid({
                    datatype: "local",
                    data: registro,
                    editurl: 'clientArray',
                    colModel: [
                         //{ label : 'Id', name : 'Id', width : 20, align: 'center', sorttype:'integer', hidden: true, searchoptions: { searchhidden: true } },
                         { label : 'Appartamento', name : 'AptStanza', width : 60, align: 'left', sorttype:'text' },
                         { label : 'Inizio', name : 'DataInizio', width : 35, align: 'left', sorttype:'date', formatter: 'date', srcformat: 'Y-m-d', newformat: 'n/j/Y' },
                         { label : 'Fine', name : 'DataFine', width : 35, align: 'left', sorttype:'date', formatter: 'date', srcformat: 'Y-m-d', newformat: 'n/j/Y' },
                         { label : 'Canone', name : 'Canone', width : 40, align: 'left', sorttype:'number' },
                         { label : 'Spese', name : 'Spese', width : 40, align: 'left', sorttype:'number' },
                         { label : 'Cauzione', name : 'Cauzione', width : 40, align: 'left', sorttype:'number' },
                         { label : 'Caparra', name : 'Caparra', width : 40, align: 'left', sorttype:'number' },
                         { label : 'Note', name : 'Note', width : 50, align: 'left', sorttype:'text' },
                         { label : '', name : 'CellActions', width : 60, align: 'left' }

                    ],
                    viewrecords: true, // show the current page, data rang and total records on the toolbar
                    width: 995,
                    height: 150,
                    pager: "#registroInsPager"
            });

            // the bindKeys()
            $("#registroIns").jqGrid('bindKeys');
        }
    }

    function loadTableRegistroDisdette(registro){

        if(registro && registro.length > 0){
            $(".modal-dialog #registroDisdette").jqGrid({
                    datatype: "local",
                    data: registro,
                    editurl: 'clientArray',
                    colModel: [
                         //{ label : 'Id', name : 'Id', width : 20, align: 'center', sorttype:'integer', hidden: true, searchoptions: { searchhidden: true } },
                         { label : 'Data Invio Postale', name : 'DataInvioPostale', width : 35, align: 'left', sorttype:'date', formatter: 'date', srcformat: 'Y-m-d', newformat: 'n/j/Y' },
                         { label : 'Fine Locazione', name : 'DataFine', width : 35, align: 'left', sorttype:'date', formatter: 'date', srcformat: 'Y-m-d', newformat: 'n/j/Y' },
                         { label : 'Stato', name : 'Stato', width : 40, align: 'left' },
                         { label : 'Data Registrazione', name : 'DataRegistrazione', width : 40, align: 'left' },
                         { label : '', name : 'CellActions', width : 40, align: 'left' }

                    ],
                    viewrecords: true, // show the current page, data rang and total records on the toolbar
                    width: 925,
                    height: 150,
                    pager: "#registroDisdettePager"
            });

            // the bindKeys()
            $("#registroDisdette").jqGrid('bindKeys');

        }

    }

    function loadTableRegistroInp(registro){
        if(registro && registro.length > 0){
            $("#registroInp").jqGrid({
                    datatype: "local",
                    data: registro,
                    editurl: 'clientArray',
                    colModel: [
                         //{ label : 'Id', name : 'Id', width : 20, align: 'center', sorttype:'integer', hidden: true, searchoptions: { searchhidden: true } },
                         { label : 'Appartamento', name : 'Apt', width : 60, align: 'left', sorttype:'text' },
                         { label : 'Inizio', name : 'DataInizio', width : 35, align: 'left', sorttype:'date', formatter: 'date', srcformat: 'Y-m-d', newformat: 'n/j/Y' },
                         { label : 'Fine', name : 'DataFine', width : 35, align: 'left', sorttype:'date', formatter: 'date', srcformat: 'Y-m-d', newformat: 'n/j/Y' },
                         { label : 'Prezzo', name : 'Prezzo', width : 40, align: 'left', sorttype:'number' },
                         { label : '', name : 'CellActions', width : 60, align: 'left' }

                    ],
                    viewrecords: true, // show the current page, data rang and total records on the toolbar
                    width: 995,
                    height: 150,
                    pager: "#registroInpPager"
            });

            // the bindKeys()
            $("#registroInp").jqGrid('bindKeys');
        }
    }

    function interface_addInquilino(){
        i_dataNascita.flatpickr({
            dateFormat: 'd/m/Y',
            onChange: function(dateObj, dateStr, instance) {
                inquilino.DataNascita = dateObj.yyyymmdd();
                codiceFiscale(inquilino);
            }
        });
        inquilino.Sesso = "M";
        setToggle(inquilino.Sesso, i_sesso);
        inquilino.Lang = "it";
        setToggle(inquilino.Lang, i_lang);
        inquilino.FidelityCard = 0;
        setToggle(inquilino.FidelityCard, i_fidelityCard);
    }

    function loadFieldsRegistroIns(registro, callback){
        var arr = new Array();
        var counter = 0;

        var runCallback = function() {
            if(callback){
                callback(arr);
            }
        };

        if(registro.length > 0){

            registro.forEach(function(arrayElement) {

                arrayElement.CellActions = "";

                if(admin.canEdit.checkPrivilege()){
                    arrayElement.CellActions += "<button type='button' class='btn btn-default btn-sm view' data-id='" + arrayElement.Id + "'><span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span></button>";
                }
                if(admin.canEdit.checkPrivilege()){
                    arrayElement.CellActions += "<button type='button' class='btn btn-default btn-sm exit' data-id='" + arrayElement.Id + "'><span class='glyphicon glyphicon-send' aria-hidden='true'></span></button>";
                }
                /*if(admin.canEdit.checkPrivilege()){
                    arrayElement.CellActions += "<button type='button' class='btn btn-default btn-sm remove' data-id='" + arrayElement.Id + "'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button>";
                }*/
                var assignValue = function (r){
                    arrayElement.AptStanza = r.AptStanza;
                    arr.push(arrayElement);
                    if(counter === registro.length){
                        runCallback();
                    }
                };

                loadAppartamento_Stanza(arrayElement.IdStanza, function (e){
                    loadAppartamento(e.IdAppartamento, function (r){
                        counter++;
                        arrayElement.AptStanza = r.Indirizzo + " " + r.Civico + " c." + e.Numero;
                        assignValue(arrayElement);
                    });
                });
            });
        }
    }

    function loadFieldsRegistroDisdette(registro){
        var arr = new Array();

        if(registro.length > 0){

            registro.forEach(function(arrayElement) {

                arrayElement.CellActions = "";

                if(admin.canEdit.checkPrivilege() && parseInt(arrayElement.Stato) === 1){
                    arrayElement.CellActions += "<button type='button' class='btn btn-default btn-sm edit' data-id='" + arrayElement.Id + "'><span class='glyphicon glyphicon-edit' aria-hidden='true'></span></button>";
                }
                if(admin.canEdit.checkPrivilege() && parseInt(arrayElement.Stato) === 1){
                    arrayElement.CellActions += "<button type='button' class='btn btn-default btn-sm cancel' data-id='" + arrayElement.Id + "' style='margin-left: 10px;'><span class='glyphicon glyphicon-minus-sign' aria-hidden='true'></span></button>";
                }

                if(parseInt(arrayElement.Stato) === 1){
                    arrayElement.Stato = "Valido";
                }else if(parseInt(arrayElement.Stato) === 2){
                    arrayElement.Stato = "Revocato";
                }else{
                    arrayElement.Stato = "Non definito";
                }

                arr.push(arrayElement);

            });
        }

        return arr;

    }

    function loadFieldsRegistroInp(registro, callback){
        var arr = new Array();
        var counter = 0;

        var runCallback = function() {
            if(callback){
                callback(arr);
            }
        };

        if(registro.length > 0){

            registro.forEach(function(arrayElement) {

                arrayElement.CellActions = "";

                /*if(admin.canEdit.checkPrivilege()){
                    arrayElement.CellActions += "<button type='button' class='btn btn-default btn-sm view' data-id='" + arrayElement.Id + "'><span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span></button>";
                }
                if(admin.canEdit.checkPrivilege()){
                    arrayElement.CellActions += "<button type='button' class='btn btn-default btn-sm exit' data-id='" + arrayElement.Id + "'><span class='glyphicon glyphicon-send' aria-hidden='true'></span></button>";
                }*/
                /*if(admin.canEdit.checkPrivilege()){
                    arrayElement.CellActions += "<button type='button' class='btn btn-default btn-sm remove' data-id='" + arrayElement.Id + "'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button>";
                }*/
                var assignValue = function (r){
                    arrayElement.Apt = r.Apt;
                    arrayElement.Prezzo = r.Prezzo;
                    arr.push(arrayElement);
                    if(counter === registro.length){
                        runCallback();
                    }
                };

                loadAppartamento_PostiAuto(arrayElement.IdPostoAuto, function (e){
                    loadAppartamento(e.IdAppartamento, function (r){
                        counter++;
                        arrayElement.Apt = r.Indirizzo + " " + r.Civico + " c." + e.Numero;
                        arrayElement.Prezzo = e.Prezzo;
                        assignValue(arrayElement);
                    });
                });
            });
        }
    }

    function loadFieldsInquilino(param_inquilino){
        if(param_inquilino instanceof Inquilino){
            i_nome.val(param_inquilino.Nome);
            i_cognome.val(param_inquilino.Cognome);
            i_specializzazione.val(param_inquilino.Specializzazione);
            i_fonte.val(param_inquilino.Fonte);
            i_ente.val(param_inquilino.Ente);
            i_email.val(param_inquilino.PrimaryEmail);
            i_secondaryemail.val(param_inquilino.SecondaryEmail);
            i_telefono.val(param_inquilino.Telefono);
            i_indirizzo.val(param_inquilino.Indirizzo);
            i_civico.val(param_inquilino.Civico);
            i_citta.val(param_inquilino.Citta);
            i_cap.val(param_inquilino.CAP);
            i_stato.val(param_inquilino.Stato);
            i_paese.val(param_inquilino.Paese);
            i_paese_sigla.val(param_inquilino.Paese_Sigla_ISO3166_2);
            i_codiceFiscale.val(param_inquilino.CodiceFiscale);
            i_foreignID.val(param_inquilino.ForeignIdentificationNumber);
            i_note.val(param_inquilino.Note);
            setTitoloDropdown(agenti, "Id", id_agente_dropdown, param_inquilino.IdAdmin, "Username");
            setTitoloDropdown(professioni, "Value", id_professione_dropdown, param_inquilino.Professione, "Output");
            setTitoloDropdown(fonti, "Value", id_fonte_dropdown, param_inquilino.Fonte, "Output");

            setToggle(param_inquilino.Sesso, i_sesso);
            setToggle(param_inquilino.Lang, i_lang);
            setToggle(param_inquilino.FidelityCard, i_fidelityCard);

            i_dataNascita.flatpickr({
                dateFormat: 'd/m/Y',
                defaultDate: param_inquilino.DataNascita,
                onChange: function(dateObj, dateStr, instance) {
                    inquilino.DataNascita = dateObj.yyyymmdd();
                    codiceFiscale(inquilino);
                }
            });

        }
    }

    function loadFieldsAptStanza(ins){
        var apt, aptStanza;
        if(parseInt(ins.Id) > 0){
            loadAppartamento_Stanza(ins.IdStanza, function (e){
                aptStanza = e;
                loadAppartamento(e.IdAppartamento, function (f){
                    apt = f;
                    apt.label = apt.Indirizzo + " " + apt.Civico;
                    aptStanza.label = "C. " + aptStanza.Numero;
                    ins_showDialog(ins, apt, aptStanza);
                });
            });
        }else{
            apt = new Appartamento();
            aptStanza = new Appartamenti_Stanze();
            apt.label = "";
            aptStanza.label = "";
            ins.Pulizie = 0;
            ins.AffittatoDaSolo = 0;
            ins.IdInquilino = inquilino.Id;
            ins_showDialog(ins, apt, aptStanza);
        }
    }

    function loadFieldsAptPostiAuto(inp){
        var apt, aptPostoAuto;
        if(parseInt(inp.Id) > 0){
            loadAppartamento_PostiAuto(inp.IdPostoAuto, function (e){
                aptPostoAuto = e;
                loadAppartamento(e.IdAppartamento, function (f){
                    apt = f;
                    apt.label = apt.Indirizzo + " " + apt.Civico;
                    aptPostoAuto.label = "C. " + aptPostoAuto.Numero;
                    inp_showDialog(inp, apt, aptPostoAuto);
                });
            });
        }else{
            apt = new Appartamento();
            aptPostoAuto = new Appartamenti_Stanze();
            apt.label = "";
            aptPostoAuto.label = "";
            inp.Pulizie = 0;
            ins.AffittatoDaSolo = 0;
            inp.IdInquilino = inquilino.Id;
            inp_showDialog(inp, apt, aptPostoAuto);
        }
    }

    function setToggle(checkVal, toggle){
        if(parseInt(checkVal) === 1 || checkVal === "F" || checkVal === "en"){
            toggle.bootstrapToggle('on');
        }else if(parseInt(checkVal) === 0 || checkVal === "M" || checkVal === "it"){
            toggle.bootstrapToggle('off');
        }
    }

    function setTitoloDropdown(array, array_prop, dropdown, val, obj_prop){
      console.log(array);
        var obj = $.grep(array, function(e){ return  parseInt(e[array_prop]) === parseInt(val); });
        dropdown.text(obj[0][obj_prop]);
    }

    function checkInquilinoValues(i){
        var success = false;
        var counter = 0;
        var errors = [];

        if(!i.Nome){
            counter++;
            errors.push("Inserire il Nome!");
        }
        if(!i.Cognome){
            counter++;
            errors.push("Inserire il Cognome!");
        }
        if(!i.Ente){
            counter++;
            errors.push("Inserire Ente!");
        }
        
        if(!i.Professione || !(parseInt(i.Professione) > 0)){
            counter++;
            errors.push("Inserire Professione!");
        }
        
        if(!i.Specializzazione && parseInt(i.Professione) === 2){
            counter++;
            errors.push("Inserire Specializzazione!");
        }
        if(i.Specializzazione && i.Specializzazione.length > 15){
            counter++;
            errors.push("Numero caratteri di Specializzazione superati!");
        }
        if(!(i.Sesso === 'M' || i.Sesso === 'F')){
            counter++;
            errors.push("Scegliere il sesso!");
        }

        if(parseInt(i.IdAdmin) <= 0 || !i.IdAdmin){
            counter++;
            errors.push("Scegliere un agente!");
        }

        if(!i.DataNascita || !dateValidation(i.DataNascita)){
            counter++;
            errors.push("Data Nascita invalida!");
        }

        if(!i.PrimaryEmail){
            counter++;
            errors.push("Email vuota!");
        }

        if(!i.Telefono){
            counter++;
            errors.push("Telefono non inserito!");
        }

        if(!i.Indirizzo){
            counter++;
            errors.push("Indirizzo non inserito!");
        }

        if(!i.Civico){
            counter++;
            errors.push("Civico vuoto!");
        }

        if(!i.CAP){
            counter++;
            errors.push("CAP vuoto!");
        }

        if(!i.Citta){
            counter++;
            errors.push("Citta' vuota!");
        }
        
        if(!i.Stato){
            counter++;
            errors.push("Regione/Stato vuoto!");
        }
        
        if(!i.Paese){
            counter++;
            errors.push("Paese vuoto!");
        }
        
        if(!i.Paese_Sigla_ISO3166_2){
            counter++;
            errors.push("Paese Sigla vuoto!");
        }

        if(parseInt(i.LuogoNascita) <= 0 || !i.LuogoNascita){
            counter++;
            errors.push("Il Luogo di Nascita non può essere vuoto!");
        }
        
        if(!i.CodiceFiscale && !i.ForeignIdentificationNumber){
            counter++;
            errors.push("- CodiceFiscale e N° ID Estero vuoti. Almeno uno dei due deve essere valorizzato!");
        }
        
        if(i.CodiceFiscale && !(i.CodiceFiscale.length >= 11 && i.CodiceFiscale.length <= 16)){
          counter++;
          errors.push("- Attenzione, il Cod. Fiscale deve essere lungo tra 11 e 16 caratteri!");
        }

        if(i.ForeignIdentificationNumber && !(i.ForeignIdentificationNumber.length > 0 && i.ForeignIdentificationNumber.length <= 28)){
          counter++;
          errors.push("- Attenzione, il N° ID Estero deve essere lungo tra 1 e 28 caratteri!");
        }

        if(counter > 0){
            bootbox.alert({
                title : "<span style='color: red; font-weight: bold;'>Errore Imprevisto!</span>",
                message: printErrors(errors, true)
            });
        }else{
            success = true;
        }

        return success;

    }

    function checkDisdettaValues(disdetta){
        var success = false;
        var counter = 0;
        var errors = [];

        if(!disdetta.DataInvioPostale || !dateValidation(disdetta.DataInvioPostale)){
            counter++;
            errors.push("Data Invio Postale non corretta!");
        }

        if(!disdetta.DataFine || !dateValidation(disdetta.DataFine)){
            counter++;
            errors.push("Data Fine non corretta!");
        }

        if(disdetta.DataInvioPostale && disdetta.DataFine){
            var ini = new Date(disdetta.DataInvioPostale);
            var fin = new Date(disdetta.DataFine);

            if(ini > fin){
                counter++;
                errors.push("Controllare il periodo di locazione!");
            }

        }

        if(counter > 0){
            bootbox.alert({
                title : "<span style='color: red; font-weight: bold;'>Errore Imprevisto!</span>",
                message: printErrors(errors, true)
            });
        }else{
            success = true;
        }

        return success;

    }

    function checkInsValues(ins){
        var success = false;
        var counter = 0;
        var errors = [];

        if(parseInt(ins.IdStanza) <= 0){
            counter++;
            errors.push("Scegliere una stanza!");
        }

        if(!ins.DataFirma || !dateValidation(ins.DataFirma)){
            counter++;
            errors.push("Data Firma non corretta!");
        }

        if(!ins.DataInizio || !dateValidation(ins.DataInizio)){
            counter++;
            errors.push("Data Inizio non corretta!");
        }

        if(parseInt(ins.PeriodoFatturazione) < 0 || !ins.PeriodoFatturazione){
            counter++;
            errors.push("Scegliere un periodo di fatturazione!");
        }

        if(parseInt(ins.Turistico) < 0 || !ins.Turistico){
            counter++;
            errors.push("Scegliere una tipologia di contratto!");
        }

        if(parseFloat(ins.Canone) <= 0){
            counter++;
            errors.push("Importo canone non inserito!");
        }

        if(ins.DataFine && !dateValidation(ins.DataFine)){
            counter++;
            errors.push("Data Fine non corretta!");
        }

        if(ins.DataInizio && ins.DataFine){
            var ini = new Date(ins.DataInizio);
            var fin = new Date(ins.DataFine);

            if(ini > fin){
                counter++;
                errors.push("Controllare il periodo di locazione!");
            }

        }

        if(counter > 0){
            bootbox.alert({
                title : "<span style='color: red; font-weight: bold;'>Errore Imprevisto!</span>",
                message: printErrors(errors, true)
            });
        }else{
            success = true;
        }

        return success;
    }

    function checkInpValues(inp){
        var success = false;
        var counter = 0;
        var errors = [];

        if(parseInt(inp.IdPostoAuto) <= 0){
            counter++;
            errors.push("Scegliere un posto auto!");
        }

        if(!inp.DataInizio || !dateValidation(inp.DataInizio)){
            counter++;
            errors.push("Data Inizio non corretta!");
        }

        if(inp.DataFine && !dateValidation(inp.DataFine)){
            counter++;
            errors.push("Data Fine non corretta!");
        }

        if(counter > 0){
            bootbox.alert({
                title : "<span style='color: red; font-weight: bold;'>Errore Imprevisto!</span>",
                message: printErrors(errors, true)
            });
        }else{
            success = true;
        }

        return success;
    }

    /*
     * CHANGE EVENTS
     */

    /*
     * Toggles
     */

     //Toggle delle tabelle di "Dati Generali"
    $( ".collapseTables" ).click(function() {
        $( "#collapseTables" ).toggle( "slow" );
    });

    $( ".collapseIns" ).click(function() {
        $( ".registroIns" ).toggle( "slow" );
    });

    $( ".collapseInp" ).click(function() {
        $( ".registroInp" ).toggle( "slow" );
    });

    $('.create-ins').on('click', function (){
        var ins = new Inquilino_Stanza();
        if(checkInquilinoValues(inquilino)){
            loadFieldsAptStanza(ins);
        }
    });

    $('.create-inp').on('click', function (){
        var inp = new Inquilino_PostiAuto();
        loadFieldsAptPostiAuto(inp);
    });

    $('.create-i').on('click', function (){
        saveInquilino(inquilino);
    });

    $('.registroIns').on('click', '.view', function (){
        var id = parseInt($(this).attr('data-id'));
        loadInquilino_Stanza(id, function (e){
            loadFieldsAptStanza(e);
        });
    });

    $('.registroIns').on('click', '.remove', function (){
        var id = parseInt($(this).attr('data-id'));

    });

    $('.registroIns').on('click', '.exit', function (){
        var id = parseInt($(this).attr('data-id'));
        loadIns_Disdette(id, function (e){
            if(e && e.length > 0){
                insDisdette_showDialog(id, e);
            }else{
                //Dialog per la creazione di disdetta.
                disdetta_showDialog(id, e);
            }

        });
    });

    $('body').on('click', '.inquilino-open', function (){
        var id = parseInt($(this).attr('data-id'));
        window.open("../_gestione/tenants.php?Id=" + id, "_blank");
    });

    $('body').on('click', '.open-invoice', function (){
        var id = parseInt($(this).attr('data-id'));
        window.open("../_gestione/invoicing.php?action=load&idFattura=" + id, "_blank");
    });

    $('body').on('click', '.remove-invoice', function (){
        var id = parseInt($(this).attr('data-id'));
        bootbox.confirm("Sei sicuro di voler eliminare questa fattura?", function(result) {
            if(result){
                $.getJSON( '../_gestione/invoicing.php?action=delete&idFattura=' + id, function( data ) {
                    if(data.success){
                        bootbox.alert("Fattura eliminata con successo!");
                    }else{
                        bootbox.alert({
                            title : "<span style='color: red; font-weight: bold;'>Errore Imprevisto!</span>",
                            message: printErrors(data.message, true)
                        });
                    }
                });
            }
        });
    });

    $('#content').on('focus', '.input-generali input', function (){
        $('html, body').animate({ scrollTop:$(this).position().top - 130 },300);
    });

    $('#content').on('focus', '.input-addon input', function (){
        $('html, body').animate({ scrollTop:$(this).position().top + 470 },300);
    });

    i_sesso.change(function() {
        if($(this).prop('checked')){
            if(inquilino.Sesso !== 'F'){
                codiceFiscale(inquilino);
            }
            inquilino.Sesso = 'F';

        }else{
            if(inquilino.Sesso !== 'M'){
                codiceFiscale(inquilino);
            }
            inquilino.Sesso = 'M';
        }
    });
    
    i_fidelityCard.change(function() {
        if($(this).prop('checked')){
            inquilino.FidelityCard = 1;
        }else{
            inquilino.FidelityCard = 0;
        }
    });

    i_lang.change(function() {
        if($(this).prop('checked')){
            inquilino.Lang = 'en';
        }else{
            inquilino.Lang = 'it';
        }
    });

    /*
     * Dropdowns
     */

    i_idAdmin.on("click","a", function (){
        inquilino.IdAdmin = parseInt($(this).attr('id-agente'));
        setTitoloDropdown(agenti, "Id", id_agente_dropdown, inquilino.IdAdmin, "Username");
    });

    i_professione.on("click","a", function (){
        inquilino.Professione = parseInt($(this).attr('id-professione'));
        setTitoloDropdown(professioni, "Value", id_professione_dropdown, inquilino.Professione, "Output");
    });

    i_fonte.on("click","a", function (){
        inquilino.Fonte = parseInt($(this).attr('id-fonte'));
        setTitoloDropdown(fonti, "Value", id_fonte_dropdown, inquilino.Fonte, "Output");
    });

    /*
     * Input
     */

    i_dataNascita.change(function (){
        var data = toDate(i_dataNascita);
        inquilino.DataNascita = data.yyyymmdd();
        codiceFiscale(inquilino);
    });

    i_nome.change(function (){
        inquilino.Nome = $(this).val();
        codiceFiscale(inquilino);
    });

    i_cognome.change(function (){
        inquilino.Cognome = $(this).val();
        codiceFiscale(inquilino);
    });

    i_specializzazione.change(function (){
        inquilino.Specializzazione = $(this).val();
    });

    i_specializzazione.keyup(function() {
        if($(this).val().length > 15){
            inputChangeStyle_Alert($(this), true);
        }else{
            inputChangeStyle_Alert($(this), false);
        }
    });

    i_ente.change(function (){
        inquilino.Ente = $(this).val();
    });

    i_email.change(function (){
        inquilino.PrimaryEmail = $(this).val();
    });
    
    i_secondaryemail.change(function (){
        inquilino.SecondaryEmail = $(this).val();
    });

    i_telefono.change(function (){
        inquilino.Telefono = $(this).val();
    });

    i_indirizzo.change(function (){
        inquilino.Indirizzo = $(this).val();
    });

    i_civico.change(function (){
        inquilino.Civico = $(this).val();
    });

    i_citta.change(function (){
        inquilino.Citta = $(this).val();
    });
    
    i_stato.change(function(){
        inquilino.Stato = $(this).val();
    });
    
    i_paese.change(function(){
        inquilino.Paese = $(this).val();
    });
    
    i_paese_sigla.change(function(){
        inquilino.Paese_Sigla_ISO3166_2 = $(this).val();
    });

    i_cap.change(function (){
        inquilino.CAP = $(this).val();
    });

    /*i_luogoNascita.change(function (){
        inquilino.LuogoNascita = $(this).val();
    });*/

    i_note.change(function (){
        inquilino.Note = $(this).val();
    });

    i_codiceFiscale.change(function (){
        inquilino.CodiceFiscale = $(this).val();
    });
    
    i_foreignID.change(function (){
        inquilino.ForeignIdentificationNumber = $(this).val();
    });

    /*
     * Autocomplete
     */

    i_luogoNascita.on("focus", function(){
        $(this).autocomplete({
            source: '?action=autocompleteCity',
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
                inquilino.LuogoNascita = parseInt(ui.item.city_code_istat);
                codiceFiscale(inquilino);
                $(this).val(ui.item.value);
            }
        });
    });

    i_citta.on("focus", function(){
        $(this).autocomplete({
            source: '?action=autocompleteCity',
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
                inquilino.Citta = ui.item.value;
                inquilino.CAP = ui.item.city_code_postal;
                i_cap.val(inquilino.CAP);
            }
        });
    });

    function inputChangeStyle_Alert(selector, bool){
        if(bool && bool === true){
            $(selector).css("border-bottom-color", "#fc023c");
        }else{
            $(selector).css("border-bottom-color", "#c9c9c9");
        }
    }

    function codiceFiscale(param_inquilino){
        if(param_inquilino.Nome && param_inquilino.Cognome && param_inquilino.Sesso && parseInt(param_inquilino.LuogoNascita) > 0 && param_inquilino.DataNascita){
            var clone = encodeURIComponent(JSON.stringify(param_inquilino));
            $.ajax({
                method: "POST",
                url: '?action=codiceFiscale',
                data: { inquilino : clone },
            }).done(function(data){
              if (data) {
                inquilino.CodiceFiscale = data;
                i_codiceFiscale.val(data);
              }else{
                bootbox.alert("Errore durante la generazione del codice ficale! Per favore , ricontrollare i dati inseriti e riprovare.");
              }
            });
        }

    }

    function saveIns(ins, callback){
        var ins_clone = encodeURIComponent((JSON.stringify(ins)));
        var link = "?action=saveIns";

        if(checkInsValues(ins)){
            ins_showAlerts(ins, function (e){
                if(e){
                    $.ajax({
                        method: "POST",
                        url: link,
                        data: { data : ins_clone },
                    }).done(function(data){
                        if(callback){ // Quando l'inquilino è nuovo
                            callback(data);
                        }else{
                            if(data.success){
                                reloadIns();
                                ins_prepareDialog(data);

                                //Ricarica tabella
                            }else{
                                bootbox.alert("Errore durante il salvataggio!");
                            }
                        }
                    }).fail(function(xhr, status, error) {
                        bootbox.alert("Errore del caricamento! Richiedere supporto #tenants.tpl-1");
                    });
                }else{
                    bootbox.alert("Non registrato!");
                }
            });

        }
    }

    function saveDisdetta(disdetta, callback){
      console.log("saveDisdetta");
        var disdetta_clone = JSON.stringify(disdetta);
        var link = "?action=saveDisdetta&disdetta=" + disdetta_clone;
        if(checkDisdettaValues(disdetta)){
            $.get(link, function (data){
              console.log(data);
                if(callback){
                    callback(data);
                }else{

                    if(data.success && data.Ins && data.Disdetta && !data.Storno && !data.Readjustment && !data.Locazione){
                        var ins = $.extend(new Inquilino_Stanza(), data.Ins);
                        //var disd = $.extend(new Inquilino_Disdetta(), data.Disdetta);
                        loadInquilino(inquilino.Id);
                        reloadIns();
                        loadIns_Disdette(ins.Id, function (e){
                            if(e && e.length > 0){
                                insDisdette_showDialog(ins.Id, e);
                            }
                        });

                        //Invio Notifica per Email
                        if(disdetta.SendEmail){
                          sendEmailDisdetta(disdetta);
                        }

                    }else if(data.success || (data.Storno && data.Storno.length > 0) || (data.Readjustment && data.Readjustment.length > 0)){
                        loadInquilino(inquilino.Id);
                        reloadIns();
                        ins_prepareDialog(data);

                        //Invio Notifica per Email
                        if(disdetta.SendEmail){
                          sendEmailDisdetta(disdetta);
                        }

                    }else{
                        bootbox.alert("Errore durante il salvataggio!");
                    }
                }
            });
        }
    }

    function saveInp(inp, callback){
        var inp_clone = JSON.stringify(inp);
        var link = "?action=saveInp&inp=" + inp_clone;

        if(checkInpValues(inp)){
            $.get(link, function (data){
                if(callback){ // Quando l'inquilino è nuovo
                    callback(data);
                }else{
                    if(data.success){
                        console.log(data);
                        reloadInp();
                        bootbox.alert("Salvataggio avvenuto con successo!");
                        //Ricarica tabella
                    }else{
                        bootbox.alert("Errore durante il salvataggio!");
                    }
                }
            });

        }
    }

    function reloadIns(){
        var link = "";
        if(parseInt(inquilino.Id) > 0){
            link = "?action=load&Id=" + inquilino.Id;
            $.get(link, function (data){
                if(data.LoadIns.length > 0){
                    loadFieldsRegistroIns(data.LoadIns, function (e){
                        registroIns = e;
                        jQuery("#registroIns").jqGrid('setGridParam',{
                            datatype: 'local',
                            data: registroIns
                        }).trigger('reloadGrid');
                    });
                }
            });
        }
    }

    function reloadInp(){
        var link = "";
        if(parseInt(inquilino.Id) > 0){
            link = "?action=load&Id=" + inquilino.Id;
            $.get(link, function (data){
                if(data.LoadInP.length > 0){
                    loadFieldsRegistroInp(data.LoadInP, function (e){
                        registroInp = e;
                        jQuery("#registroInp").jqGrid('setGridParam',{
                            datatype: 'local',
                            data: registroInp
                        }).trigger('reloadGrid');
                    });
                }
            });
        }
    }

    function saveInquilino(i, callback){
        if(checkInquilinoValues(i)){
            inquilino_showAlerts(i, function (e){
                if(e){
                  var clone = encodeURIComponent(JSON.stringify(i));
                  $.ajax({
                      method: "POST",
                      url: '?action=saveInquilino',
                      data: { inquilino : clone },
                  }).done(function(data){
                    if(callback){
                        callback(data);
                    }else{
                        if(data.success){
                            bootbox.alert("Salvataggio Inquilino avvenuto con successo!");
                            inquilino.Id = data.Inquilino.Id;
                            loadFieldsInquilino(inquilino);
                        }else{
                            bootbox.alert("Errore durante il salvataggio!");
                        }
                    }
                  });
                }else{
                    bootbox.alert("Inquilino non registrato!");
                }
            });

        }
    }

    /*
     * Visualizza un dialog nel caso in cui ci siano valori da confermare.
     */
    function ins_showAlerts(ins, callback){

        alert_DataFine(ins, function (q){
            if(q){
                alert_DataFirma(ins, function (w){
                    if(w){
                        alert_DataInizio(ins, function (t){
                            if(t){
                                alert_Spese(ins, function (e){
                                    if(e){
                                        alert_Cauzione(ins, function (r){
                                            if(callback && r){
                                                callback(r);
                                            }else{
                                                bootbox.alert("Non registrato!");
                                            }
                                        });
                                    }else{
                                        bootbox.alert("Non registrato!");
                                    }

                                });
                            }else{
                                bootbox.alert("Non registrato!");
                            }
                        });
                    }else{
                        bootbox.alert("Non registrato!");
                    }
                });
            }else{
                bootbox.alert("Non registrato!");
            }
        });

    }

    function inquilino_showAlerts(inq, callback){
        alert_DataNascita(inq, function (r){
            if(callback && r){
                callback(r);
            }else{
                bootbox.alert("Non registrato!");
            }
        });
    }

    function alert_DataNascita(inq, callback){
        var current = new Date();
        var stick = new Date();
        var limit = current.getFullYear() - 40;
        stick.setFullYear(limit);
        var data;

        if(inq.DataNascita){
            data = new Date(inq.DataNascita);
            if(data < stick || (current.getFullYear() - data.getFullYear() < 18)){
                bootbox.confirm("E' corretto come Data Nascita : " + data.ddmmyyyy() + " ?", function(result) {
                    if(callback){
                        callback(result);
                    }
                });
            }else{
                if(callback){
                    callback(true);
                }
            }
        }else{
            if(callback){
                callback(false);
            }
        }
    }

    function alert_DataFine(ins, callback){
        var stick = new Date('2011-01-01');
        var data;

        if(ins.DataFine){
            data = new Date(ins.DataFine);
            if(data < stick){
                bootbox.confirm("E' corretto come Data Fine : " + data.ddmmyyyy() + " ?", function(result) {
                    if(callback){
                        callback(result);
                    }
                });
            }else{
                if(callback){
                    callback(true);
                }
            }
        }else{
            if(callback){
                callback(true);
            }
        }
    }

    function alert_DataInizio(ins, callback){
        var stick = new Date('2011-01-01');
        var data;

        if(ins.DataInizio){
            data = new Date(ins.DataInizio);
            if(data < stick){
                bootbox.confirm("E' corretto come Data Inizio : " + data.ddmmyyyy() + " ?", function(result) {
                    if(callback){
                        callback(result);
                    }
                });
            }else{
                if(callback){
                    callback(true);
                }
            }
        }else{
            if(callback){
                callback(false);
            }
        }
    }

    function alert_DataFirma(ins, callback){
        var stick = new Date('2011-01-01');
        var data;

        if(ins.DataFirma){
            data = new Date(ins.DataFirma);
            if(data < stick){
                bootbox.confirm("E' corretto come Data Firma : " + data.ddmmyyyy() + " ?", function(result) {
                    if(callback){
                        callback(result);
                    }
                });
            }else{
                if(callback){
                    callback(true);
                }
            }
        }else{
            if(callback){
                callback(false);
            }
        }
    }

    function alert_Spese(ins, callback){

        if(parseFloat(ins.Spese) < 50 || parseFloat(ins.Spese) > 50){
            bootbox.confirm("E' corretto Spese : " + ins.Spese + " € ?", function(result) {
                if(callback){
                    callback(result);
                }
            });
        }else{
            if(callback){
                callback(true);
            }
        }

    }

    function alert_Cauzione(ins, callback){

        if(parseFloat(ins.Cauzione) < 500 || parseFloat(ins.Cauzione) > 4500){
            bootbox.confirm("E' corretto Cauzione : " + ins.Cauzione + " € ?", function(result) {
                if(callback){
                    callback(result);
                }
            });
        }else{
            if(callback){
                callback(true);
            }
        }

    }

    function ins_prepareDialog(data){
        var sms = {
            invoice : null,
            storni : new Array(),
            readjustments : new Array(),
            locazione : null
        };
        if((data.FPI && data.FPI.invoice ) || (data.Storno && data.Storno.length > 0) || (data.Readjustment && data.Readjustment.length > 0) || data.Locazione){
            if(data.FPI && data.FPI.invoice){
                var fpi = $.extend(new Fattura(), data.FPI.invoice);
                sms.invoice = fpi;
            }

            if(data.Storno && data.Storno.length > 0){
                for(var chiave in data.Storno){
                    var oggetto = data.Storno[chiave];
                    var storno = { Inquilino : null, Invoice : null };
                    storno.Invoice = $.extend(new Fattura(), oggetto.Invoice);
                    storno.Inquilino = $.extend(new Inquilino(), oggetto.Inquilino);
                    sms.storni.push(storno);
                }
            }

            if(data.Readjustment && data.Readjustment.length > 0){
                for(var key in data.Readjustment){
                    var obj = { Ins : null, Inquilino : null };
                    obj.Ins = $.extend(new Inquilino_Stanza(), data.Readjustment[key].Ins);
                    obj.Inquilino = $.extend(new Inquilino(), data.Readjustment[key].Inquilino);
                    sms.readjustments.push(obj);
                }
            }

            if (data.Locazione && data.Locazione.invoice && data.Locazione.fd) {
              var loc = $.extend(new Fattura(), data.Locazione.invoice);
              loc.FatturaDettagli = new FatturaDettagli();
              loc.FatturaDettagli.FatturaDettagli = data.Locazione.fd;
              loc.FatturaDettagli.Linking();
              sms.locazione = loc;
            }

            ins_successDialog(sms);

        }else{
            bootbox.alert("Salvataggio avvenuto con successo!");
        }
    }

    function ins_successDialog(data){

        var fattura;
        var smsFPI, fpi_buttons;
        var inq;
        var sms = new Array();
        var dialog = new bootbox_Dialog();

        if(data.invoice){
            fattura = data.invoice;

            fattura.Data = new Date(fattura.Data);

            smsFPI = {
                rows : [
                    { type: "line", titolo : "Tipologia : " + titoloTipologia(fattura.Tipologia), width : 6 },
                    { type: "line", titolo : titoloSocieta(fattura.Societa) + " Fattura : " + fattura.Numero, width : 6 },
                    { type: "line", titolo : "Data Fattura : " + fattura.Data.ddmmyyyy(), width : 6 },
                    { type: "line", titolo : "Totale : " + fattura.Totale, width : 6 },
                ],
                options : [ ]
            };

            fpi_buttons = {
                rows : [
                    { type: "button", value : fattura.Id , class : "btn-md btn-default remove-invoice btn-block", text : "Rimuovi", width: 6 },
                    { type: "button", value : fattura.Id , class : "btn-md btn-info open-invoice btn-block", text : "Apri", width: 6 }
                ]
            };

            sms.push(smsFPI, fpi_buttons);

        }

        if(data.storni && data.storni.length > 0){
            var storni = data.storni;
            for(var chiave in storni){
                var storno = storni[chiave];
                var invoice = storno.Invoice;
                inq = storno.Inquilino;
                invoice.Data = new Date(invoice.Data);
                var body = {
                    rows : [
                        { type: "line", titolo : "Intestatario : " + inq.Cognome + " " + inq.Nome, width : 6 },
                        { type: "line", titolo : "Tipologia : " + titoloTipologia(invoice.Tipologia), width : 6 },
                        { type: "line", titolo : titoloSocieta(invoice.Societa) + " Fattura : " + invoice.Numero, width : 6 },
                        { type: "line", titolo : "Data Fattura : " + invoice.Data.ddmmyyyy(), width : 6 },
                        { type: "line", titolo : "Totale : " + invoice.Totale, width : 6 },
                    ],
                    options : [ ]
                };

                var button = {
                    rows : [
                        { type: "button", value : invoice.Id , class : "btn-md btn-default remove-invoice btn-block", text : "Rimuovi", width: 6 },
                        { type: "button", value : invoice.Id , class : "btn-md btn-info open-invoice btn-block", text : "Apri", width: 6 }
                    ]
                };

                sms.push(body, button);
            }
        }

        if(data.readjustments && data.readjustments.length > 0){
            var objs = data.readjustments;
            for(var key in objs){
                var obj = objs[key];
                inq = obj.Inquilino;
                var ins = obj.Ins;
                ins.DataInizio = new Date(ins.DataInizio);
                ins.DataFine = new Date(ins.DataFine);
                var corpo = {
                    rows : [
                        { type: "line", titolo : "Sovrapposizione corretta con succeso", width : 6 },
                        { type: "line", titolo : "Intestatario : " + inq.Cognome + " " + inq.Nome, width : 6 },
                        { type: "line", titolo : "Data Inzio : " + ins.DataInizio.ddmmyyyy(), width : 6 },
                        { type: "line", titolo : "Data Fine : " + ins.DataFine.ddmmyyyy(), width : 6 },
                    ],
                    options : [ ]
                };
                var pulsante = {
                    rows : [
                        { type: "button", value : ins.IdInquilino , class : "btn-md btn-info inquilino-open btn-block", text : "Apri", width: 6 }
                    ]
                };

                sms.push(corpo, pulsante);
            }
        }

        if(data.locazione){
          var ftLoc = data.locazione;
          console.log(ftLoc);
          var dataFt = new Date(ftLoc.Data);

          var smsLoc = {
              rows : [
                  { type: "line", titolo : "Allineamento locazione avvenuto!", width : 6 },
                  { type: "line", titolo : titoloSocieta(ftLoc.Societa) + " Fattura : " + ftLoc.Numero, width : 6 },
                  { type: "line", titolo : "Periodo " + ftLoc.FatturaDettagli.getPeriodoLocazioneText(), width : 6 },
                  { type: "line", titolo : "Data Fattura : " + dataFt.ddmmyyyy(), width : 6 },
                  { type: "line", titolo : "Totale : " + ftLoc.Totale, width : 6 },
              ],
              options : [ ]
          };

          var loc_btn = {
              rows : [
                  { type: "button", value : ftLoc.Id , class : "btn-md btn-default remove-invoice btn-block", text : "Rimuovi", width: 6 },
                  { type: "button", value : ftLoc.Id , class : "btn-md btn-info open-invoice btn-block", text : "Apri", width: 6 }
              ]
          };

          sms.push(smsLoc, loc_btn);
        }

        bootbox.dialog({
            title: "Dettagli del salvataggio",
            message: dialog.createDialog(sms),
            buttons: {
                back: {
                    label: "Indietro",
                    className: "btn-danger",
                    callback: function () {
                    }
                }
            }
        });

    }

    function disdetta_showDialog(IdIns, disdetta){

        var ins;

        loadInquilino_Stanza(IdIns, function (e){
            ins = e;
        });

        if(IdIns && disdetta){
            bootbox.form({
                title: 'Inserimento disdetta',
                fields: {
                    DataInvioPostale: {
                        label: 'Data Invio Postale',
                        type:  'date',
                        customClass: 'dataInvioPostale',
                        value: disdetta.DataInvioPostale,
                    },
                    DataFine: {
                        label: 'Data Fine',
                        customClass: 'dataFine',
                        type:  'date',
                        value: disdetta.DataFine,
                    },
                    SendEmail: {
                        label: 'Notifica via email',
                        customClass: 'sendEmail',
                        type:  'checkbox',
                        value: disdetta.SendEmail,
                    }
                },
                callback : function (values){
                    if(!values){
                        bootbox.hideAll();
                    }else{
                        var disdetta_prev = disdetta;
                        disdetta =  $.extend(new Inquilino_Disdetta(), values);
                        disdetta.IdInquilinoStanze = IdIns;
                        if(disdetta_prev.Id && parseInt(disdetta_prev.Id) > 0){
                            disdetta.Id = disdetta_prev.Id;
                            disdetta.Stato = disdetta_prev.Stato;
                        }else{
                            disdetta.Id = 0;
                            disdetta.Stato = 1;
                        }

                        saveDisdetta(disdetta);

                    }
                }

            });



            $(".modal-dialog .dataInvioPostale").change(function (){
                var dataPosta = toDate($(this));
                var dataFine;

                if(ins.DataInizio && dataPosta && !isNaN(dataPosta)){
                    ins.DataInizio = new Date(ins.DataInizio);
                    if(ins.DataInizio.getDate() >= dataPosta.getDate()){
                        dataFine = new Date(dataPosta.setDate(ins.DataInizio.getDate()));
                        dataFine.setMonth(dataFine.getMonth() + 3);
                        $(".modal-dialog .dataFine").val(dataFine.ddmmyyyy());
                    }else{
                        dataFine = new Date(dataPosta.setDate(ins.DataInizio.getDate()));
                        dataFine.setMonth(dataFine.getMonth() + 4);
                        $(".modal-dialog .dataFine").val(dataFine.ddmmyyyy());
                    }
                }

            });

            $('.modal-dialog .sendEmail input').prop('checked', true);

            $(".modal-dialog .dataFine").change(function (){
            });

        }
    }

    function ins_showDialog(ins, apt, aptStanza){
        if(ins){
            bootbox.form({
                title: 'Dettagli di locazione',
                fields: {
                    IdStanza: {
                        label: 'Appartamento',
                        type:  'data-id',
                        customClass: 'idStanza',
                        value: apt.label,
                        data_value: ins.IdStanza,
                    },
                    Stanza: {
                        label: 'Stanza',
                        type:  'text',
                        customClass: 'stanza',
                        disabled: true,
                        value: aptStanza.label,
                    },
                    DataFirma: {
                        label: 'Data di stipulazione contratto',
                        type:  'date',
                        value: ins.DataFirma,
                    },
                    DataInizio: {
                        label: 'Data inizio locazione',
                        type:  'date',
                        value: ins.DataInizio,
                    },
                    DataFine: {
                        label: 'Data fine locazione',
                        type:  'date',
                        disabled: true,
                        value: ins.DataFine,
                    },
                    Turistico : {
                        label: 'Tipologia Contratto',
                        type:  'select',
                        value: ins.Turistico,
                        options: [
                            { value: 0, text: 'DEFAULT - Lungo Termine'},
                            { value: 1, text: 'Turistico'}
                        ]
                    },
                    PeriodoFatturazione : {
                        label: 'Periodo Fatturazione Locazione',
                        type:  'select',
                        value: ins.PeriodoFatturazione,
                        options: [
                            { value: 1, text: 'ogni mese'},
                            { value: 2, text: 'ogni 2 mesi'},
                            { value: 3, text: 'DEFAULT - Trimestrale'},
                            { value: 4, text: 'ogni 4 mesi'},
                            { value: 5, text: 'ogni 5 mesi'},
                            { value: 6, text: 'ogni 6 mesi'},
                            { value: 7, text: 'ogni 7 mesi'},
                            { value: 8, text: 'ogni 8 mesi'},
                            { value: 9, text: 'ogni 9 mesi'},
                            { value: 10, text: 'ogni 10 mesi'},
                            { value: 11, text: 'ogni 11 mesi'},
                            { value: 12, text: 'ogni 12 mesi'},
                        ]
                    },
                    Canone : {
                        label: 'Canone',
                        type:  'float',
                        value: ins.Canone,
                    },
                    Spese : {
                        label: 'Spese',
                        type:  'float',
                        value: ins.Spese,
                    },
                    Cauzione : {
                        label: 'Cauzione',
                        type:  'float',
                        value: ins.Cauzione,
                    },
                    ImportoNonContabilizzato : {
                        label: 'Importo non contabilizzato',
                        type:  'float',
                        value: ins.ImportoNonContabilizzato,
                    },
                    SpecificaImportoNonContabilizzato : {
                        label: 'Specifica - Importo non contabilizzato',
                        type: 'textarea',
                        value: ins.SpecificaImportoNonContabilizzato,
                    },
                    Compensazione : {
                        label: 'Compensazione',
                        type:  'float',
                        value: ins.Compensazione
                    },
                    SpecificaCompensazione : {
                        label : 'Specifica Compensazione',
                        type : 'textarea',
                        value : ins.SpecificaCompensazione
                    },
                    ImportoReso : {
                        label: 'Importo Reso',
                        type:  'float',
                        value: ins.ImportoReso
                    },
                    DataReso : {
                        label: 'Data Reso',
                        type:  'date',
                        value: ins.DataReso
                    },
                    NoteReso : {
                        label : 'Note Reso',
                        type : 'textarea',
                        value : ins.NoteReso
                    },
                    Caparra : {
                        label: 'Caparra',
                        type:  'float',
                        value: ins.Caparra,
                    },
                    NumeroFatture : {
                        label: 'Numero Fatture',
                        type:  'number',
                        value: ins.NumeroFatture,
                    },
                    ConguaglioUtenze : {
                        label: 'Conguaglio Utenze',
                        type:  'float',
                        value: ins.ConguaglioUtenze,
                    },
                    ConguaglioSpese : {
                        label: 'Conguaglio Spese',
                        type:  'float',
                        value: ins.ConguaglioSpese,
                    },
                    GiorniNonGoduti : {
                        label: 'Giorni non goduti',
                        type:  'number',
                        value: ins.GiorniNonGoduti,
                    },
                    Pulizie : {
                        label: 'Pulizie',
                        type: 'toggle',
                        value: ins.Pulizie,
                    },
                    AffittatoDaSolo : {
                        label: 'Affittato da solo?',
                        type: 'toggle',
                        value: ins.AffittatoDaSolo,
                    },
                    Note: {
                        label: 'Note',
                        type: 'textarea',
                        value: ins.Note,
                    }
                },
                callback: function (values) {
                    if(!values){
                        bootbox.hideAll();
                    }else{
                        var ins_prev = ins;
                        ins =  $.extend(new Inquilino_Stanza(), values);
                        ins.IdInquilino = inquilino.Id;
                        ins.Id = ins_prev.Id;
                        ins.IdBookingDetails = ins_prev.IdBookingDetails;
                        ins.IdContractDocs = ins_prev.IdContractDocs;
                        if(parseInt(ins.IdInquilino) > 0){
                            saveIns(ins);
                        }else{
                            //Salva inquilino e poi ins
                            saveInquilino(inquilino, function (e){
                                if(e.success && parseInt(e.Inquilino.Id) > 0){
                                    inquilino.Id = e.Inquilino.Id;
                                    ins.IdInquilino = inquilino.Id;
                                    saveIns(ins, function (r){
                                        if(r.success){
                                            loadInquilino(inquilino.Id);
                                            reloadIns();
                                            ins_prepareDialog(r);
                                            //Ricarica tabella
                                        }else{
                                            bootbox.alert("Errore durante il salvataggio!");
                                        }
                                    });
                                }
                            });
                        }

                    }
                }
            });

            $(".modal-dialog .idStanza").autocomplete({
                source: URL_ROOT + '_gestione/autocompleteMovimenti.php?action=aptStanze',
                minChars: 2,
                appendTo: ".modal-dialog",
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
                    if(ui.item){
                        $(this).attr('data-id', ui.item.Appartamento_Stanza.Id);
                        $('.modal-dialog .stanza').val("C. " + ui.item.Appartamento_Stanza.Numero);
                    }
                }
            });

        }

    }

    function inp_showDialog(inp, apt, aptPostoAuto){
        if(inp){
            bootbox.form({
                title: 'Dettagli di locazione',
                fields: {
                    IdPostoAuto: {
                        label: 'Appartamento',
                        type:  'data-id',
                        customClass: 'idPostoAuto',
                        value: apt.label,
                        data_value: inp.IdPostoAuto,
                    },
                    Stanza: {
                        label: 'Posto Auto',
                        type:  'text',
                        customClass: 'postoAuto',
                        disabled: true,
                        value: aptPostoAuto.label,
                    },
                    DataInizio: {
                        label: 'Data inizio locazione',
                        type:  'date',
                        value: inp.DataInizio,
                    },
                    DataFine: {
                        label: 'Data fine locazione',
                        type:  'date',
                        value: inp.DataFine,
                    }
                },
                callback: function (values) {
                    console.log(values);
                    if(!values){
                        bootbox.hideAll();
                    }else{
                        var inp_prev = inp;
                        inp =  $.extend(new Inquilino_PostiAuto(), values);
                        inp.IdInquilino = inquilino.Id;
                        inp.Id = inp_prev.Id;
                        if(parseInt(inp.IdInquilino) > 0){
                            saveInp(inp);
                        }else{
                            //Salva inquilino e poi inp
                            saveInquilino(inquilino, function (e){
                                if(e.success && parseInt(e.Inquilino.Id) > 0){
                                    inquilino.Id = e.Inquilino.Id;
                                    inp.IdInquilino = inquilino.Id;
                                    saveInp(inp, function (r){
                                        if(r.success){
                                            loadInquilino(inquilino.Id);
                                            reloadInp();
                                            bootbox.alert("Salvataggio avvenuto con successo!");
                                            //Ricarica tabella
                                        }else{
                                            bootbox.alert("Errore durante il salvataggio!");
                                        }
                                    });
                                }
                            });
                        }

                    }
                }
            });

            $(".modal-dialog .idPostoAuto").autocomplete({
                source: URL_ROOT + '_gestione/autocompleteMovimenti.php?action=aptPostoAuto',
                minChars: 2,
                appendTo: ".modal-dialog",
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
                    if(ui.item){
                        $(this).attr('data-id', ui.item.Appartamento_PostoAuto.Id);
                        $('.modal-dialog .postoAuto').val("C. " + ui.item.Appartamento_PostoAuto.Numero);
                    }
                }
            });

        }

    }

    function insDisdette_showDialog(Idins, registro, allineamentoLoc){

        console.log(registro);

        bootbox.dialog({
            title: "Registro Disdette",
            message:'<div class="row">' +
                    '<div class="form-group">' +
                    '<div class="col-md-2"><button type="button" class="btn btn-default add-disdetta btn-block" data-id="' + Idins + '" >Inserisci</button></div>' +
                    '</div></div>' +
                    '</br>' +
                    '<div class="registroDisdette">' +
                        '<div class="data">' +
                            '<table id="registroDisdette"></table>' +
                            '<div id="registroDisdettePager"></div>' +
                        '</div>' +
                    '</div>',
            className: 'jqGridTable',
            buttons: {
                back: {
                    label: "Indietro",
                    className: "btn-danger",
                    callback: function () {
                    }
                }
            }
        });

        if (allineamentoLoc && allineamentoLoc.Locazione) {
          ins_prepareDialog(allineamentoLoc);
        }

        var e = loadFieldsRegistroDisdette(registro);
        loadTableRegistroDisdette(e);

        $('.modal-content .registroDisdette').on('click', '.edit', function (){
            var id = parseInt($(this).attr('data-id'));
            loadInquilino_Disdetta(id, function (e){
                bootbox.hideAll();
                //Dialog per la creazione di disdetta.
                disdetta_showDialog(Idins, e);

            });
        });

        $('.modal-content').on('click', '.add-disdetta', function (){
            var lock = false;
            loadIns_Disdette(Idins, function (e){
                if(e && e.length > 0){
                    for(var chiave in e){
                        if(parseInt(e[chiave].Stato) < 2){
                            lock = true;
                        }
                    }

                    if(!lock){
                        bootbox.hideAll();
                        //Dialog per la creazione di disdetta.
                        disdetta_showDialog(Idins, new Inquilino_Disdetta());
                    }else{
                        bootbox.alert("Sono presenti disdette valide!");
                    }

                }

            });
        });

        $('.modal-content').on('click', '.cancel', function (){

            var id = parseInt($(this).attr('data-id'));
            bootbox.hideAll();
            revocaDisdetta_showDialog(id, Idins);


        });

    }

    function revocaDisdetta_showDialog(id, Idins){

        bootbox.form({
            title: 'Revocare la disdetta?',
            fields: {
                SendEmail: {
                    label: 'Notifica via email',
                    customClass: 'sendEmail',
                    type:  'checkbox',
                    value: true,
                }
            },
            callback : function (values){
                if(values){
                  loadInquilino_Disdetta(id, function (e){
                      var disdetta_clone = JSON.stringify(e);

                      $.getJSON( '../_gestione/tenants.php?action=revocaDisdetta&disdetta=' + disdetta_clone, function( data ) {
                        console.log(data);
                          if(data.success){
                            loadIns_Disdette(Idins, function (r){
                                if(r && r.length > 0){
                                    insDisdette_showDialog(Idins, r, data);
                                }
                            });

                            if(values.SendEmail){
                              sendEmailRevoca(Idins);
                            }

                          }else{
                              bootbox.alert("Errore imprevisto!");
                          }
                      });

                  });

                }
            }

        });

    }

    function sendEmailDisdetta(disdetta){
      try {

        var self = this;

        if(!disdetta)
          throw new TypeError('tenants.tpl - sendEmailDisdetta : disdetta undefined!');

        var ins = new Inquilino_Stanza(disdetta.IdInquilinoStanze);
        ins.LoadRelationship(function(){
          ins.setInquilino(function(){
            ins.setStanza(function(){

              var emailContent = setEmailStructure(ins);

              var email = {
                content : emailContent,
                ins : ins
              }
              var clone = encodeURIComponent(JSON.stringify(email));
              $.ajax({
                  method: "POST",
                  url: '?action=sendDisdetta',
                  data: { data : clone },
              }).done(function(data){
                if(data && data.Success){
                  bootbox.alert('Email di notifica inviata con successo!');
                }else{
                  bootbox.alert('Errore durante l&#8217;invio della mail di notifica! Richiedere assistenza.');
                }
              });

            });
          });
        });

        var struct_it = $('<div><!-- base href="https://raw.githubusercontent.com/TedGoas/Cerberus/master/cerberus-hybrid.html"> <meta charset="utf-8" --> <!-- utf-8 works for most cases --> <meta name="viewport" content="width=device-width"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine --> <meta name="x-apple-disable-message-reformatting"> <!-- Disable auto-scale in iOS 10 Mail entirely --> <title></title> <!-- The title tag shows in email notifications, like Android 4.4. --> <!-- Web Font / @font-face : BEGIN --> <!-- NOTE: If web fonts are not required, lines 10 - 27 can be safely removed. --> <!-- Desktop Outlook chokes on web font references and defaults to Times New Roman, so we force a safe fallback font. --> <!--[if mso]> <style> * { font-family: sans-serif !important; } </style> <![endif]--> <!-- All other clients get the webfont reference; some will render the font and others will silently fail to the fallbacks. More on that here: http://stylecampaign.com/blog/2015/02/webfont-support-in-email/ --> <!--[if !mso]><!--> <!-- insert web font reference, eg: <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet" type="text/css"> --> <!--<![endif]--> <!-- Web Font / @font-face : END --> <!-- CSS Reset --> <style> /* What it does: Remove spaces around the email design added by some email clients. */ /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */ html, body { margin: 0 auto !important; padding: 0 !important; height: 100% !important; width: 100% !important; } /* What it does: Stops email clients resizing small text. */ * { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; } /* What it does: Centers email on Android 4.4 */ div[style*="margin: 16px 0"] { margin:0 !important; } /* What it does: Stops Outlook from adding extra spacing to tables. */ table, td { mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; } /* What it does: Fixes webkit padding issue. Fix for Yahoo mail table alignment bug. Applies table-layout to the first 2 tables then removes for anything nested deeper. */ table { border-spacing: 0 !important; border-collapse: collapse !important; table-layout: fixed !important; margin: 0 auto !important; } table table table { table-layout: auto; } /* What it does: Uses a better rendering method when resizing images in IE. */ img { -ms-interpolation-mode:bicubic; } /* What it does: A work-around for iOS meddling in triggered links. */ .mobile-link--footer a, a[x-apple-data-detectors] { color:inherit !important; text-decoration: underline !important; } /* What it does: Prevents underlining the button text in Windows 10 */ .button-link { text-decoration: none !important; } </style> <!-- Progressive Enhancements --> <style> /* What it does: Hover styles for buttons */ .button-td, .button-a { transition: all 100ms ease-in; } .button-td:hover, .button-a:hover { background: #555555 !important; border-color: #555555 !important; } /* Media Queries */ @media screen and (max-width: 480px) { /* What it does: Forces elements to resize to the full width of their container. Useful for resizing images beyond their max-width. */ .fluid { width: 100% !important; max-width: 100% !important; height: auto !important; margin-left: auto !important; margin-right: auto !important; } /* What it does: Forces table cells into full-width rows. */ .stack-column, .stack-column-center { display: block !important; width: 100% !important; max-width: 100% !important; direction: ltr !important; } /* And center justify these ones. */ .stack-column-center { text-align: center !important; } /* What it does: Generic utility class for centering. Useful for images, buttons, and nested tables. */ .center-on-narrow { text-align: center !important; display: block !important; margin-left: auto !important; margin-right: auto !important; float: none !important; } table.center-on-narrow { display: inline-block !important; } } </style> <!-- Visually Hidden Preheader Text : BEGIN --> <div style="display:none;font-size:1px;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;font-family: sans-serif;" class="preview"> </div> <!-- Visually Hidden Preheader Text : END --> <div style="max-width: 680px; margin: 0;"> <!--[if mso]> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="680" align="center"> <tr> <td> <![endif]--> <!-- Email Header : BEGIN --> <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px;margin: 0 !important;"> <tbody><tr> <td style="padding: 20px 0; text-align: center" bgcolor="#ffffff" class=""> <a href="https://www.milanostanze.it" style="text-decoration: none"> <img src="https://www.milanostanze.it/images/logo_MilanoStanze600-2.jpg" width="300" height="50" border="0" style="height: auto; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555; " class=""> </a> </td> </tr> </tbody></table> <!-- Email Header : END --> <!-- Email Body : BEGIN --></div><table role="presentation" class="email-body" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px;"> </table><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style=" max-width: 680px; margin: 0 !important;"> <tbody><tr> <td style="padding: 20px 20px 20px;text-align: left;"> <h1 style="margin: 0px; font-family: sans-serif; font-size: 24px; line-height: 125%; color: rgb(34, 144, 199); font-weight: normal;">Gentile <span class="ts-nominativo"></span>,</h1> </td> </tr> <tr> <td style="padding: 0 20px 20px;font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;text-align: justify;"> <p style="margin: 0;">È pervenuta in data odierna presso i nostri uffici la lettera di disdetta relativa al contratto di locazione stipulato per la stanza in <span class="aptRoom"></span>.<br>Le ricordiamo che la locazione avrà termine il <span class="moveOut"></span> secondo i termini di disdetta pattuiti sul contratto.</p><br><p style="margin: 0;">La invitiamo pertanto a contattare il seguente indirizzo mail : andrea.gisabella@finlibera.it (Indicare nome, cognome e appartamento) al fine di fissare un appuntamento per il check out e la riconsegna delle chiavi. Tale appuntamento potrà essere fissato con un preavviso di almeno 3 giorni lavorativi, dal lunedì al venerdì dalle 9:00 alle 17:30 escluso i festivi.</p><br><p style="margin: 0;">Cordiali Saluti,<br><strong>Segreteria Amministrativa</strong></p></td> </tr> </tbody></table><!-- Email Body : END --> <!-- Email Footer : BEGIN --> <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px;margin: 0 !important;"> <tbody><tr> <td bgcolor="#2290C7" ;="" style="padding: 33px 10px;width: 100%;font-size: 20px;font-family: sans-serif;line-height: 18px;text-align: center;color: #ffffff;" class=""> <a href="https://www.milanostanze.it" style=" text-decoration: none; color: #ffffff; ">MilanoStanze.it</a> </td> </tr> </tbody></table> <!-- Email Footer : END --> <!--[if mso]> </td> </tr> </table> <![endif]--> </div>');

        var struct_en = $('<div><!-- base href="https://raw.githubusercontent.com/TedGoas/Cerberus/master/cerberus-hybrid.html"> <meta charset="utf-8" --> <!-- utf-8 works for most cases --> <meta name="viewport" content="width=device-width"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine --> <meta name="x-apple-disable-message-reformatting"> <!-- Disable auto-scale in iOS 10 Mail entirely --> <title></title> <!-- The title tag shows in email notifications, like Android 4.4. --> <!-- Web Font / @font-face : BEGIN --> <!-- NOTE: If web fonts are not required, lines 10 - 27 can be safely removed. --> <!-- Desktop Outlook chokes on web font references and defaults to Times New Roman, so we force a safe fallback font. --> <!--[if mso]> <style> * { font-family: sans-serif !important; } </style> <![endif]--> <!-- All other clients get the webfont reference; some will render the font and others will silently fail to the fallbacks. More on that here: http://stylecampaign.com/blog/2015/02/webfont-support-in-email/ --> <!--[if !mso]><!--> <!-- insert web font reference, eg: <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet" type="text/css"> --> <!--<![endif]--> <!-- Web Font / @font-face : END --> <!-- CSS Reset --> <style> /* What it does: Remove spaces around the email design added by some email clients. */ /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */ html, body { margin: 0 auto !important; padding: 0 !important; height: 100% !important; width: 100% !important; } /* What it does: Stops email clients resizing small text. */ * { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; } /* What it does: Centers email on Android 4.4 */ div[style*="margin: 16px 0"] { margin:0 !important; } /* What it does: Stops Outlook from adding extra spacing to tables. */ table, td { mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; } /* What it does: Fixes webkit padding issue. Fix for Yahoo mail table alignment bug. Applies table-layout to the first 2 tables then removes for anything nested deeper. */ table { border-spacing: 0 !important; border-collapse: collapse !important; table-layout: fixed !important; margin: 0 auto !important; } table table table { table-layout: auto; } /* What it does: Uses a better rendering method when resizing images in IE. */ img { -ms-interpolation-mode:bicubic; } /* What it does: A work-around for iOS meddling in triggered links. */ .mobile-link--footer a, a[x-apple-data-detectors] { color:inherit !important; text-decoration: underline !important; } /* What it does: Prevents underlining the button text in Windows 10 */ .button-link { text-decoration: none !important; } </style> <!-- Progressive Enhancements --> <style> /* What it does: Hover styles for buttons */ .button-td, .button-a { transition: all 100ms ease-in; } .button-td:hover, .button-a:hover { background: #555555 !important; border-color: #555555 !important; } /* Media Queries */ @media screen and (max-width: 480px) { /* What it does: Forces elements to resize to the full width of their container. Useful for resizing images beyond their max-width. */ .fluid { width: 100% !important; max-width: 100% !important; height: auto !important; margin-left: auto !important; margin-right: auto !important; } /* What it does: Forces table cells into full-width rows. */ .stack-column, .stack-column-center { display: block !important; width: 100% !important; max-width: 100% !important; direction: ltr !important; } /* And center justify these ones. */ .stack-column-center { text-align: center !important; } /* What it does: Generic utility class for centering. Useful for images, buttons, and nested tables. */ .center-on-narrow { text-align: center !important; display: block !important; margin-left: auto !important; margin-right: auto !important; float: none !important; } table.center-on-narrow { display: inline-block !important; } } </style> <!-- Visually Hidden Preheader Text : BEGIN --> <div style="display:none;font-size:1px;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;font-family: sans-serif;" class="preview"> </div> <!-- Visually Hidden Preheader Text : END --> <div style="max-width: 680px; margin: 0;"> <!--[if mso]> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="680" align="center"> <tr> <td> <![endif]--> <!-- Email Header : BEGIN --> <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px;margin: 0 !important;"> <tbody><tr> <td style="padding: 20px 0; text-align: center" bgcolor="#ffffff" class=""> <a href="https://www.milanostanze.it" style="text-decoration: none"> <img src="https://www.milanostanze.it/images/logo_MilanoStanze600-2.jpg" width="300" height="50" border="0" style="height: auto; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555; " class=""> </a> </td> </tr> </tbody></table> <!-- Email Header : END --> <!-- Email Body : BEGIN --></div><table role="presentation" class="email-body" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px;"> </table><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style=" max-width: 680px; margin: 0 !important;"> <tbody><tr> <td style="padding: 20px 20px 20px;text-align: left;"> <h1 style="margin: 0px; font-family: sans-serif; font-size: 24px; line-height: 125%; color: rgb(34, 144, 199); font-weight: normal;">Dear <span class="ts-nominativo"></span>,</h1> </td> </tr> <tr> <td style="padding: 0 20px 20px;font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;text-align: justify;"> <p style="margin: 0;">Today we received in our offices your letter concerning contract cancellation for room <span class="aptRoom"></span>.<br>We would like to remind you that the contract will end on <span class="moveOut"></span> according to every terms of agreement on the contract.</p><br><p style="margin: 0;">To arrange your check-out and the return of property keys, please contact the following email address: andrea.gisabella@finlibera.it ( Indicate name, surname and apartment address). This appointment can be requested with a notice of at least 3 business days, from monday to friday from 9:00 AM to 5:30 PM, excluding holidays.</p><br><p style="margin: 0;">Best Regards,<br><strong>Administrative secretary</strong></p></td> </tr> </tbody></table><!-- Email Body : END --> <!-- Email Footer : BEGIN --> <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px;margin: 0 !important;"> <tbody><tr> <td bgcolor="#2290C7" ;="" style="padding: 33px 10px;width: 100%;font-size: 20px;font-family: sans-serif;line-height: 18px;text-align: center;color: #ffffff;" class=""> <a href="https://www.milanostanze.it" style=" text-decoration: none; color: #ffffff; ">MilanoStanze.it</a> </td> </tr> </tbody></table> <!-- Email Footer : END --> <!--[if mso]> </td> </tr> </table> <![endif]--></div>');

        function setEmailStructure(recipient){
          var nomeCognome = recipient.Inquilino.getPDFMatrix();
          var aptRoom = recipient.Stanza.getTitle();
          var moveOut = new Date(recipient.DataFine);
          moveOut.setDate(moveOut.getDate()-1);

          var struct = recipient.Inquilino.Lang === "it" ? struct_it.clone() : struct_en.clone();
          struct.find('span.ts-nominativo').append(nomeCognome.fullName);
          struct.find('.aptRoom').append(aptRoom);
          struct.find('.moveOut').append(moveOut.ddmmyyyy());


          /*var win = window.open("", "disdetta", "");
          win.document.body.innerHTML = struct.html();*/

          return struct.html();

        }

      } catch (e) {
        console.log(e.message);
      }
    }

    function sendEmailRevoca(idIns){
      try {

        var self = this;

        if(!idIns)
          throw new TypeError('tenants.tpl - sendEmailRevoca : idIns undefined!');

        var ins = new Inquilino_Stanza(idIns);
        ins.LoadRelationship(function(){
          ins.setInquilino(function(){
            ins.setStanza(function(){

              var emailContent = setEmailStructure(ins);
              var inquilino = ins.Inquilino;
              var subject = inquilino.Lang === 'it' ? "Ricezione di revoca di disdetta -  MilanoStanze" : "You're contract cancellation has been revoked - MilanoStanze";

              var email = {
                subject :subject,
                content : emailContent,
                ins : ins
              }
              var clone = encodeURIComponent(JSON.stringify(email));
              $.ajax({
                  method: "POST",
                  url: '?action=sendDisdetta',
                  data: { data : clone },
              }).done(function(data){
                if(data && data.Success){
                  bootbox.alert('Email di notifica inviata con successo!');
                }else{
                  bootbox.alert('Errore durante l&#8217;invio della mail di notifica! Richiedere assistenza.');
                }
              });

            });
          });
        });

        var struct_it = $('<div><!-- base href="https://raw.githubusercontent.com/TedGoas/Cerberus/master/cerberus-hybrid.html"> <meta charset="utf-8" --> <!-- utf-8 works for most cases --> <meta name="viewport" content="width=device-width"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine --> <meta name="x-apple-disable-message-reformatting"> <!-- Disable auto-scale in iOS 10 Mail entirely --> <title></title> <!-- The title tag shows in email notifications, like Android 4.4. --> <!-- Web Font / @font-face : BEGIN --> <!-- NOTE: If web fonts are not required, lines 10 - 27 can be safely removed. --> <!-- Desktop Outlook chokes on web font references and defaults to Times New Roman, so we force a safe fallback font. --> <!--[if mso]> <style> * { font-family: sans-serif !important; } </style> <![endif]--> <!-- All other clients get the webfont reference; some will render the font and others will silently fail to the fallbacks. More on that here: http://stylecampaign.com/blog/2015/02/webfont-support-in-email/ --> <!--[if !mso]><!--> <!-- insert web font reference, eg: <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet" type="text/css"> --> <!--<![endif]--> <!-- Web Font / @font-face : END --> <!-- CSS Reset --> <style> /* What it does: Remove spaces around the email design added by some email clients. */ /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */ html, body { margin: 0 auto !important; padding: 0 !important; height: 100% !important; width: 100% !important; } /* What it does: Stops email clients resizing small text. */ * { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; } /* What it does: Centers email on Android 4.4 */ div[style*="margin: 16px 0"] { margin:0 !important; } /* What it does: Stops Outlook from adding extra spacing to tables. */ table, td { mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; } /* What it does: Fixes webkit padding issue. Fix for Yahoo mail table alignment bug. Applies table-layout to the first 2 tables then removes for anything nested deeper. */ table { border-spacing: 0 !important; border-collapse: collapse !important; table-layout: fixed !important; margin: 0 auto !important; } table table table { table-layout: auto; } /* What it does: Uses a better rendering method when resizing images in IE. */ img { -ms-interpolation-mode:bicubic; } /* What it does: A work-around for iOS meddling in triggered links. */ .mobile-link--footer a, a[x-apple-data-detectors] { color:inherit !important; text-decoration: underline !important; } /* What it does: Prevents underlining the button text in Windows 10 */ .button-link { text-decoration: none !important; } </style> <!-- Progressive Enhancements --> <style> /* What it does: Hover styles for buttons */ .button-td, .button-a { transition: all 100ms ease-in; } .button-td:hover, .button-a:hover { background: #555555 !important; border-color: #555555 !important; } /* Media Queries */ @media screen and (max-width: 480px) { /* What it does: Forces elements to resize to the full width of their container. Useful for resizing images beyond their max-width. */ .fluid { width: 100% !important; max-width: 100% !important; height: auto !important; margin-left: auto !important; margin-right: auto !important; } /* What it does: Forces table cells into full-width rows. */ .stack-column, .stack-column-center { display: block !important; width: 100% !important; max-width: 100% !important; direction: ltr !important; } /* And center justify these ones. */ .stack-column-center { text-align: center !important; } /* What it does: Generic utility class for centering. Useful for images, buttons, and nested tables. */ .center-on-narrow { text-align: center !important; display: block !important; margin-left: auto !important; margin-right: auto !important; float: none !important; } table.center-on-narrow { display: inline-block !important; } } </style> <!-- Visually Hidden Preheader Text : BEGIN --> <div style="display:none;font-size:1px;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;font-family: sans-serif;" class="preview"> </div> <!-- Visually Hidden Preheader Text : END --> <div style="max-width: 680px; margin: 0;"> <!--[if mso]> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="680" align="center"> <tr> <td> <![endif]--> <!-- Email Header : BEGIN --> <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px;margin: 0 !important;"> <tbody><tr> <td style="padding: 20px 0; text-align: center" bgcolor="#ffffff" class=""> <a href="https://www.milanostanze.it" style="text-decoration: none"> <img src="https://www.milanostanze.it/images/logo_MilanoStanze600-2.jpg" width="300" height="50" border="0" style="height: auto; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555; " class=""> </a> </td> </tr> </tbody></table> <!-- Email Header : END --> <!-- Email Body : BEGIN --></div><table role="presentation" class="email-body" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px;"> </table><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style=" max-width: 680px; margin: 0 !important;"> <tbody><tr> <td style="padding: 20px 20px 20px;text-align: left;"> <h1 style="margin: 0px; font-family: sans-serif; font-size: 24px; line-height: 125%; color: rgb(34, 144, 199); font-weight: normal;">Gentile <span class="ts-nominativo"></span>,</h1> </td> </tr> <tr> <td style="padding: 0 20px 20px;font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;text-align: justify;"> <p style="margin: 0;">È pervenuta in data odierna presso i nostri uffici la lettera revoca di disdetta relativa al contratto di locazione stipulato per la stanza in <span class="aptRoom"></span>.</p><br><p style="margin: 0;">Cordiali Saluti,<br><strong>Segreteria Amministrativa</strong></p></td> </tr> </tbody></table><!-- Email Body : END --> <!-- Email Footer : BEGIN --> <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px;margin: 0 !important;"> <tbody><tr> <td bgcolor="#2290C7" ;="" style="padding: 33px 10px;width: 100%;font-size: 20px;font-family: sans-serif;line-height: 18px;text-align: center;color: #ffffff;" class=""> <a href="https://www.milanostanze.it" style=" text-decoration: none; color: #ffffff; ">MilanoStanze.it</a> </td> </tr> </tbody></table> <!-- Email Footer : END --> <!--[if mso]> </td> </tr> </table> <![endif]--></div>');

        var struct_en = $('<div><!-- base href="https://raw.githubusercontent.com/TedGoas/Cerberus/master/cerberus-hybrid.html"> <meta charset="utf-8" --> <!-- utf-8 works for most cases --> <meta name="viewport" content="width=device-width"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine --> <meta name="x-apple-disable-message-reformatting"> <!-- Disable auto-scale in iOS 10 Mail entirely --> <title></title> <!-- The title tag shows in email notifications, like Android 4.4. --> <!-- Web Font / @font-face : BEGIN --> <!-- NOTE: If web fonts are not required, lines 10 - 27 can be safely removed. --> <!-- Desktop Outlook chokes on web font references and defaults to Times New Roman, so we force a safe fallback font. --> <!--[if mso]> <style> * { font-family: sans-serif !important; } </style> <![endif]--> <!-- All other clients get the webfont reference; some will render the font and others will silently fail to the fallbacks. More on that here: http://stylecampaign.com/blog/2015/02/webfont-support-in-email/ --> <!--[if !mso]><!--> <!-- insert web font reference, eg: <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet" type="text/css"> --> <!--<![endif]--> <!-- Web Font / @font-face : END --> <!-- CSS Reset --> <style> /* What it does: Remove spaces around the email design added by some email clients. */ /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */ html, body { margin: 0 auto !important; padding: 0 !important; height: 100% !important; width: 100% !important; } /* What it does: Stops email clients resizing small text. */ * { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; } /* What it does: Centers email on Android 4.4 */ div[style*="margin: 16px 0"] { margin:0 !important; } /* What it does: Stops Outlook from adding extra spacing to tables. */ table, td { mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; } /* What it does: Fixes webkit padding issue. Fix for Yahoo mail table alignment bug. Applies table-layout to the first 2 tables then removes for anything nested deeper. */ table { border-spacing: 0 !important; border-collapse: collapse !important; table-layout: fixed !important; margin: 0 auto !important; } table table table { table-layout: auto; } /* What it does: Uses a better rendering method when resizing images in IE. */ img { -ms-interpolation-mode:bicubic; } /* What it does: A work-around for iOS meddling in triggered links. */ .mobile-link--footer a, a[x-apple-data-detectors] { color:inherit !important; text-decoration: underline !important; } /* What it does: Prevents underlining the button text in Windows 10 */ .button-link { text-decoration: none !important; } </style> <!-- Progressive Enhancements --> <style> /* What it does: Hover styles for buttons */ .button-td, .button-a { transition: all 100ms ease-in; } .button-td:hover, .button-a:hover { background: #555555 !important; border-color: #555555 !important; } /* Media Queries */ @media screen and (max-width: 480px) { /* What it does: Forces elements to resize to the full width of their container. Useful for resizing images beyond their max-width. */ .fluid { width: 100% !important; max-width: 100% !important; height: auto !important; margin-left: auto !important; margin-right: auto !important; } /* What it does: Forces table cells into full-width rows. */ .stack-column, .stack-column-center { display: block !important; width: 100% !important; max-width: 100% !important; direction: ltr !important; } /* And center justify these ones. */ .stack-column-center { text-align: center !important; } /* What it does: Generic utility class for centering. Useful for images, buttons, and nested tables. */ .center-on-narrow { text-align: center !important; display: block !important; margin-left: auto !important; margin-right: auto !important; float: none !important; } table.center-on-narrow { display: inline-block !important; } } </style> <!-- Visually Hidden Preheader Text : BEGIN --> <div style="display:none;font-size:1px;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;font-family: sans-serif;" class="preview"> </div> <!-- Visually Hidden Preheader Text : END --> <div style="max-width: 680px; margin: 0;"> <!--[if mso]> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="680" align="center"> <tr> <td> <![endif]--> <!-- Email Header : BEGIN --> <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px;margin: 0 !important;"> <tbody><tr> <td style="padding: 20px 0; text-align: center" bgcolor="#ffffff" class=""> <a href="https://www.milanostanze.it" style="text-decoration: none"> <img src="https://www.milanostanze.it/images/logo_MilanoStanze600-2.jpg" width="300" height="50" border="0" style="height: auto; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555; " class=""> </a> </td> </tr> </tbody></table> <!-- Email Header : END --> <!-- Email Body : BEGIN --></div><table role="presentation" class="email-body" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px;"> </table><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style=" max-width: 680px; margin: 0 !important;"> <tbody><tr> <td style="padding: 20px 20px 20px;text-align: left;"> <h1 style="margin: 0px; font-family: sans-serif; font-size: 24px; line-height: 125%; color: rgb(34, 144, 199); font-weight: normal;">Dear <span class="ts-nominativo"></span>,</h1> </td> </tr> <tr> <td style="padding: 0 20px 20px;font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;text-align: justify;"> <p style="margin: 0;">Today we received in our offices your letter concerning your willingness to revoke the cancellation of your contract for room <span class="aptRoom"></span>.<br></p><br><p style="margin: 0;">Best Regards,<br><strong>Administrative secretary</strong></p></td> </tr> </tbody></table><!-- Email Body : END --> <!-- Email Footer : BEGIN --> <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px;margin: 0 !important;"> <tbody><tr> <td bgcolor="#2290C7" ;="" style="padding: 33px 10px;width: 100%;font-size: 20px;font-family: sans-serif;line-height: 18px;text-align: center;color: #ffffff;" class=""> <a href="https://www.milanostanze.it" style=" text-decoration: none; color: #ffffff; ">MilanoStanze.it</a> </td> </tr> </tbody></table> <!-- Email Footer : END --> <!--[if mso]> </td> </tr> </table> <![endif]--></div>');

        function setEmailStructure(recipient){
          var nomeCognome = recipient.Inquilino.getPDFMatrix();
          var aptRoom = recipient.Stanza.getTitle();
          var moveOut = new Date(recipient.DataFine);
          moveOut.setDate(moveOut.getDate()-1);

          var struct = recipient.Inquilino.Lang === "it" ? struct_it.clone() : struct_en.clone();
          struct.find('span.ts-nominativo').append(nomeCognome.fullName);
          struct.find('.aptRoom').append(aptRoom);

          /*var win = window.open("", "disdetta", "");
          win.document.body.innerHTML = struct.html();*/

          return struct.html();

        }

      } catch (e) {
        console.log(e.message);
      }
    }

</script>

{include file="footer.tpl"}
