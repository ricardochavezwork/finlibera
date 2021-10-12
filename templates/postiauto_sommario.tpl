{assign var=pageTitle value={#admin_postiauto_sommario#}}
{assign var=menuActive value="admin"}
{assign var=menuSubActive value="postiauto"}
{assign var=breadcrumb value="<li class='active'>Posti auto</li>"}
{include file="header.tpl"}

<table id="listRecords"></table>

<script type="text/javascript">
    $(document).ready(function() {
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
                { display: 'Id', name : 'Id', hide: true },
                { display: 'Indirizzo', name : 'Indirizzo', width : 150, sortable : true },
                { display: 'Numero', name : 'Numero', width : 50, sortable : true },
                { display: 'Posto', name : 'Posto', width : 70, sortable : true },
                { display: 'Tipo', name : 'Tipo', width : 70, sortable : true },
                { display: 'Mq', name : 'Mq', width : 50, sortable : true },
                { display: '&#128; Prezzo', name : 'Prezzo', width : 70, sortable : true },
                { display: 'Inquilino', name : 'Inquilino', width : 150, sortable : true },
                { display: 'Et&agrave;', name : 'Eta', width : 50, sortable : true },
                { display: 'Professione', name : 'Professione', width : 120, sortable : true },
                { display: 'Data Inizio', name : 'DataInizio', width : 100, sortable : true }
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
        $("#listRecords").flexOptions({ params: dt });
        return true;
    }
</script>

{include file="footer.tpl"}