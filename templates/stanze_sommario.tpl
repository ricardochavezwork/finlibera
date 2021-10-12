{assign var=pageTitle value={#admin_stanze_sommario#}}
{assign var=menuActive value="admin"}
{assign var=menuSubActive value="stanze"}
{assign var=breadcrumb value="<li class='active'>Stanze</li>"}
{include file="header.tpl"}

<table id="listRecords"></table>

<div id="editStanza" class="hide" title="Assegna stanza">
    <form class="form">
        <input type="hidden" name="IdStanza"/>
        <p>
            <span style="font-size: 0.9em;">Digita per selezionare un inquilino oppure clicca <strong>CONFERMA</strong> per assegnare ad un nuovo inquilino</span>
        <div class="field">
            <label>Inquilino</label><input type="text" name="Inquilino"/>
        </div>
        </p>
    </form>
</div>

<script type="text/javascript">
    var dlgStanza;
{literal}
    $(document).ready(function() {
        $('#formSearch').submit(function (){
            $('#listRecords').flexOptions({newp: 1}).flexReload();
            return false;
        });
        refreshRecords();
        
        var cache = {};
        $("#editStanza input[name=Inquilino]").autocomplete({
            minLength: 2,
            source: "inquilini.php?action=search"
        });
        
        dlgStanza = $("#editStanza");
        dlgStanza.dialog({
            width: 550,
            height: 230,
            autoOpen: false,
            modal: true,
            buttons: {
                "Conferma": function() {
                    var idStanza = parseInt(dlgStanza.find("input[name=IdStanza]").val());
                    var idInquilino = dlgStanza.find("input[name=Inquilino]").val();
                    if (idInquilino.length > 0 && idInquilino.substring(0, 1) == "[" && idInquilino.indexOf("]") != -1) {
                        idInquilino = idInquilino.substring(1);
                        idInquilino = idInquilino.substring(0, idInquilino.indexOf("]"));
                    }
                    toggleBusy(true);
                    document.location.href = "inquilini.php?Id=" + idInquilino + "&addStanza=" + idStanza;
                }
            }
        });

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
                {display: 'Id', name : 'Id', hide: true},
                {display: 'Indirizzo', name : 'Indirizzo', width : 150, sortable : true},
                {display: 'Numero', name : 'Numero', width : 50, sortable : true},
                {display: '&#128; Attuale', name : 'PrezzoAttuale', width : 70, sortable : true},
                {display: '&#128; Suggerito', name : 'PrezzoSuggerito', width : 70, sortable : true},
                {display: 'Inquilino', name : 'Inquilino', width : 150, sortable : true},
                {display: 'Et&agrave;', name : 'Eta', width : 50, sortable : true},
                {display: 'Professione', name : 'Professione', width : 120, sortable : true},
                {display: 'Data Entrata', name : 'DataInizio', width : 80, sortable : true},
                {display: 'Data Uscita', name : 'DataFine', width : 80, sortable : false},
                {display: 'Admin', name : 'Admin', width : 120, sortable : true}
            ],
            usepager: true,
            useRp: true,
            rpOptions: [50, 100, 200, 250],
            rp: DEFAULT_LIST_LIMIT,
            onSubmit: addFormData,
            onSuccess: function() { $("#listRecords .button").button(); }
        });
    }
    function addFormData(){
        toggleBusy(false);
        var dt = $('#formSearch').serializeArray();
        $("#listRecords").flexOptions({params: dt});
        return true;
    }
    
    function editStanza(idStanza) {
        dlgStanza.find("input[name=IdStanza]").val(idStanza);
        dlgStanza.find("input[name=Inquilino]").val("");
        dlgStanza.removeClass("hide");
        dlgStanza.dialog("open");
    }
</script>
{/literal}

{include file="footer.tpl"}