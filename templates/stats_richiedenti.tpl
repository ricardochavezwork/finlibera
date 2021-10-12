{assign var=pageTitle value="Statistiche Richiedenti"}
{assign var=menuActive value="admin"}
{assign var=menuSubActive value="richiedenti"}
{include file="header.tpl"}

<!--<h3 id="section_title">TOP 5 IN CLASSIFICA DA SEMPRE</h3>

<table id="rankingOfRequest"></table>-->

<div id="select_period">
    <h5>Seleziona il periodo di registrazione delle richieste</h5>
    <p>Dal: <input type="text" id="datepicker"></p>
    <p>Al: <input type="text" id="datepicker2"></p>
    <h6 id="sms"></h6>
    <a class="button">Filtra</a>
</div>

<h3 id="section_title">TOP 5 IN CLASSIFICA</h3>

<div id="table_replaceTop">
    <table id="listRecords"></table>
</div>


<h3 id="section_title">CLASSIFICA PER MESE</h3>

<div id="table_replace">
    <table id="listRecords2"></table>
</div>

<h3 id="section_title">TOP 5 DELLE STANZE PIU' RICHIESTE DA SEMPRE</h3>

<div id="table_replaceTopRooms">
    <table id="rankingRooms"></table>
</div>

<h3 id="section_title">CLASSIFICA DELLE STANZE PIU' RICHIESTE PER MESE</h3>

<div id="table_replace2">
    <table id="rankingOfMonthlyRequests_Rooms"></table>
</div>

<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title"></h4>
      </div>
      <div class="modal-body">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Chiudi</button>
      </div>
    </div>

  </div>
</div>

<script type="text/javascript">
        $(document).ready(function() {
            
            refreshRecords();
            
            $("#select_period .button").css("width", "250px");
            $("#select_period .button").click(function() { 
                var inizio = $('#datepicker').val();
                var fine = $('#datepicker2').val();
                if(inizio != "" && fine != ""){
                    $('#sms').html("");
                    $('#table_replace').html("<table id='listRecords3'></table>");
                    filtroStats(inizio, fine);
                    $('#table_replace2').html("<table id='rankingOfMonthlyRequests_Rooms2'></table>");
                    filtroStatsRooms(inizio, fine);
                    $('#table_replaceTop').html("<table id='listRecords'></table>");
                    filtroStatsTop(inizio, fine);
                    $('#table_replaceTopRooms').html("<table id='rankingRooms'></table>");
                    filtroStatsTopRooms(inizio, fine);
                }else{
                    $('#sms').html("*completare tutti i campi!");
                }
            });
        });
        
        //$("#table_replace .flexigrid .bDiv #listRecords2 tbody tr").click(function(){
        /*$("#listRecords2 .trSelected").click(function(){
            alert("value");    
        });*/
        
        function refreshRecords() {
            //toggleBusy(true);
            $("#rankingOfRequest").flexigrid({
                allowSelection: false,
                showToggleBtn: false,
                height : 'auto',
                url: '?action=loadrankingOfRequest',
                dataType: 'json',
                colModel : [
                     { display : 'TOP', name : 'TOP', width : 90, sortable : true, align : 'center' },
                     /*{ display : 'Id', name : 'Id', width : 100, sortable : true },*/
                     { display : 'Numero Richieste', name : 'NumRichieste', width : 100, sortable : true },
                     { display : 'Zona', name : 'Zona', width : 100, sortable : true },
                     { display : 'Prezzo', name : 'Prezzo', width : 100, sortable : true },
                     { display : 'Disponibilita', name : 'Disponibilita', width : 100, sortable : true },
                     { display : 'Metro', name : 'Metro', width : 100, sortable : true, align : 'center' }
                ],
                usepager: false,
                useRp: false,
                rpOptions: [50, 100, 200, 250],
                rp: DEFAULT_LIST_LIMIT,
                //onSubmit: addFormData,
                onSuccess: function() { $("#rankingOfRequest .button").button(); }
            });
            
            $("#listRecords").flexigrid({
                allowSelection: false,
                showToggleBtn: false,
                height : 'auto',
                url: '?action=load',
                dataType: 'json',
                colModel : [
                     { display : 'TOP', name : 'TOP', width : 90, sortable : true, align : 'center' },
                     { display : 'Zona', name : 'Zona', width : 100, sortable : true },
                     { display : 'Numero Richieste', name : 'NumRichiesteZona', width : 100, sortable : true },
                     { display : 'Prezzo', name : 'Prezzo', width : 100, sortable : true },
                     { display : 'Numero Richieste', name : 'NumRichiestePrezzo', width : 100, sortable : true },
                     { display : 'Disponibilita', name : 'Disponibilita', width : 100, sortable : true },
                     { display : 'Numero Richieste', name : 'NumRichiesteDisponibilita', width : 100, sortable : true },
                     { display : 'Metro', name : 'Metro', width : 100, sortable : true, align : 'center' },
                     { display : 'Numero Richieste', name : 'NumRichiesteMetro', width : 100, sortable : true },
                ],
                usepager: false,
                useRp: false,
                rpOptions: [50, 100, 200, 250],
                rp: DEFAULT_LIST_LIMIT,
                //onSubmit: addFormData,
                onSuccess: function() { $("#listRecords .button").button(); }
            });
            $("#listRecords2").flexigrid({
                allowSelection: false,
                showToggleBtn: false,
                height : 'auto',
                url: '?action=loadFiltro',
                dataType: 'json',
                colModel : [
                     { display : 'Mese', name : 'Mese', width : 90, sortable : true, align : 'center' },
                     { display : 'Zona', name : 'Zona', width : 100, sortable : true },
                     { display : 'Numero Richieste', name : 'NumRichiesteZona', width : 100, sortable : true },
                     { display : 'Prezzo', name : 'Prezzo', width : 100, sortable : true },
                     { display : 'Numero Richieste', name : 'NumRichiestePrezzo', width : 100, sortable : true },
                     { display : 'Disponibilita', name : 'Disponibilita', width : 100, sortable : true },
                     { display : 'Numero Richieste', name : 'NumRichiesteDisponibilita', width : 100, sortable : true },
                     { display : 'Metro', name : 'Metro', width : 100, sortable : true, align : 'center' },
                     { display : 'Numero Richieste', name : 'NumRichiesteMetro', width : 100, sortable : true },
                ],
                usepager: false,
                useRp: false,
                rpOptions: [50, 100, 200, 250],
                rp: DEFAULT_LIST_LIMIT,
                //onSubmit: addFormData,
                onSuccess: function() { 
                    $("#listRecords2 .button").button();
                    $("#listRecords2 .button").css("width", "80px");
                    $("#listRecords2 .button").click(function() { 
                        funcEspandi($(this).attr("data-mese")); 
                    });
                }
            });
            
            $("#rankingRooms").flexigrid({
                allowSelection: false,
                showToggleBtn: false,
                height : 'auto',
                url: '?action=loadRankingRooms',
                dataType: 'json',
                colModel : [
                     { display : 'TOP', name : 'TOP', width : 90, sortable : true, align : 'center' },
                     /*{ display : 'IdStanza', name : 'IdStanza', width : 100, sortable : true },*/
                     { display : 'Numero Richieste', name : 'NumRichieste', width : 100, sortable : true },
                     { display : 'Indirizzo', name : 'Indirizzo', width : 140, sortable : true },
                     { display : 'Zona', name : 'Zona', width : 100, sortable : true },
                     { display : 'PrezzoSuggerito', name : 'PrezzoSuggerito', width : 100, sortable : true, align : 'center' },
                     { display : 'Metro', name : 'Metro', width : 100, sortable : true }
                ],
                usepager: false,
                useRp: false,
                rpOptions: [50, 100, 200, 250],
                rp: DEFAULT_LIST_LIMIT,
                //onSubmit: addFormData,
                onSuccess: function() { 
                    $("#rankingRooms .button").button(); 
                }
            });
            
            $("#rankingOfMonthlyRequests_Rooms").flexigrid({
                allowSelection: false,
                showToggleBtn: false,
                height : 'auto',
                url: '?action=loadRankingOfMonthlyRequests_Rooms',
                dataType: 'json',
                colModel : [
                     { display : 'Mese', name : 'Mese', width : 90, sortable : true, align : 'center' },
                     /*{ display : 'IdStanza', name : 'IdStanza', width : 100, sortable : true },*/
                     { display : 'Numero Richieste', name : 'NumRichieste', width : 100, sortable : true },
                     { display : 'Indirizzo', name : 'Indirizzo', width : 140, sortable : true },
                     { display : 'Zona', name : 'Zona', width : 100, sortable : true },
                     { display : 'PrezzoSuggerito', name : 'PrezzoSuggerito', width : 100, sortable : true, align : 'center' },
                     { display : 'Metro', name : 'Metro', width : 100, sortable : true }
                ],
                usepager: false,
                useRp: false,
                rpOptions: [50, 100, 200, 250],
                rp: DEFAULT_LIST_LIMIT,
                //onSubmit: addFormData,
                onSuccess: function() { 
                    $("#rankingOfMonthlyRequests_Rooms .button").button(); 
                    $("#rankingOfMonthlyRequests_Rooms .button").css("width", "80px");
                    $("#rankingOfMonthlyRequests_Rooms .button").click(function() { 
                        funcEspandiRooms($(this).attr("data-mese")); 
                    });
                }
            });
            
        }
        
    </script>
    
    <script>
        
        function filtroStatsTop(inizio, fine) {
            $("#listRecords").flexigrid({
                allowSelection: false,
                showToggleBtn: false,
                height : 'auto',
                url: URL_ROOT + "_gestione/filtro.php" + '?inizio='+inizio+'&fine='+fine+'&action=loadFiltroTop',
                dataType: 'json',
                colModel : [
                     { display : 'TOP', name : 'TOP', width : 90, sortable : true, align : 'center' },
                     { display : 'Zona', name : 'Zona', width : 100, sortable : true },
                     { display : 'Numero Richieste', name : 'NumRichiesteZona', width : 100, sortable : true },
                     { display : 'Prezzo', name : 'Prezzo', width : 100, sortable : true },
                     { display : 'Numero Richieste', name : 'NumRichiestePrezzo', width : 100, sortable : true },
                     { display : 'Disponibilita', name : 'Disponibilita', width : 100, sortable : true },
                     { display : 'Numero Richieste', name : 'NumRichiesteDisponibilita', width : 100, sortable : true },
                     { display : 'Metro', name : 'Metro', width : 100, sortable : true, align : 'center' },
                     { display : 'Numero Richieste', name : 'NumRichiesteMetro', width : 100, sortable : true },
                ],
                usepager: false,
                useRp: false,
                rpOptions: [50, 100, 200, 250],
                rp: DEFAULT_LIST_LIMIT,
                onSuccess: function() { $("#listRecords .button").button();}
            });
        }
        
        function filtroStatsTopRooms(inizio, fine) {
            $("#rankingRooms").flexigrid({
                allowSelection: false,
                showToggleBtn: false,
                height : 'auto',
                url: URL_ROOT + "_gestione/filtro.php" + '?inizio='+inizio+'&fine='+fine+'&action=loadFiltroStatsTopRooms',
                dataType: 'json',
                colModel : [
                     { display : 'TOP', name : 'TOP', width : 90, sortable : true, align : 'center' },
                     { display : 'IdStanza', name : 'IdStanza', width : 100, sortable : true },
                     { display : 'Numero Richieste', name : 'NumRichieste', width : 100, sortable : true },
                     { display : 'Indirizzo', name : 'Indirizzo', width : 140, sortable : true },
                     { display : 'Zona', name : 'Zona', width : 100, sortable : true },
                     { display : 'PrezzoSuggerito', name : 'PrezzoSuggerito', width : 100, sortable : true, align : 'center' },
                     { display : 'Metro', name : 'Metro', width : 100, sortable : true }
                ],
                usepager: false,
                useRp: false,
                rpOptions: [50, 100, 200, 250],
                rp: DEFAULT_LIST_LIMIT,
                //onSubmit: addFormData,
                onSuccess: function() { 
                    $("#rankingRooms .button").button(); 
                }
            });
        }
        
        function filtroStats(inizio, fine) {
            $("#listRecords3").flexigrid({
                allowSelection: false,
                showToggleBtn: false,
                height : 'auto',
                url: URL_ROOT + "_gestione/filtro.php" + '?inizio='+inizio+'&fine='+fine+'&action=loadFiltro',
                dataType: 'json',
                colModel : [
                     { display : 'Mese', name : 'Mese', width : 90, sortable : true, align : 'center' },
                     { display : 'Zona', name : 'Zona', width : 100, sortable : true },
                     { display : 'Numero Richieste', name : 'NumRichiesteZona', width : 100, sortable : true },
                     { display : 'Prezzo', name : 'Prezzo', width : 100, sortable : true },
                     { display : 'Numero Richieste', name : 'NumRichiestePrezzo', width : 100, sortable : true },
                     { display : 'Disponibilita', name : 'Disponibilita', width : 100, sortable : true },
                     { display : 'Numero Richieste', name : 'NumRichiesteDisponibilita', width : 100, sortable : true },
                     { display : 'Metro', name : 'Metro', width : 100, sortable : true, align : 'center' },
                     { display : 'Numero Richieste', name : 'NumRichiesteMetro', width : 100, sortable : true },
                ],
                usepager: false,
                useRp: false,
                rpOptions: [50, 100, 200, 250],
                rp: DEFAULT_LIST_LIMIT,
                onSuccess: function() { 
                    $("#listRecords3 .button").button();
                    $("#listRecords3 .button").css("width", "80px");
                    $("#listRecords3 .button").click(function() { 
                        funcEspandiFiltro($(this).attr("data-mese"),$(this).attr("data-inizio"),$(this).attr("data-fine")); 
                    });
                }
            });
        }
    
        function funcEspandi(mese) {
            var mesi = ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];
            $('#myModal .modal-body').html("<table id='listRecords4'></table>");
            $("#listRecords4").flexigrid({
                allowSelection: false,
                showToggleBtn: false,
                height : 'auto',
                url: '?action=loadFiltroPlus&meseRichiesto='+mese,
                dataType: 'json',
                colModel : [
                     { display : 'TOP', name : 'TOP', width : 90, sortable : true, align : 'center' },
                     { display : 'Zona', name : 'Zona', width : 100, sortable : true },
                     { display : 'Numero Richieste', name : 'NumRichiesteZona', width : 100, sortable : true },
                     { display : 'Prezzo', name : 'Prezzo', width : 100, sortable : true },
                     { display : 'Numero Richieste', name : 'NumRichiestePrezzo', width : 100, sortable : true },
                     { display : 'Disponibilita', name : 'Disponibilita', width : 100, sortable : true },
                     { display : 'Numero Richieste', name : 'NumRichiesteDisponibilita', width : 100, sortable : true },
                     { display : 'Metro', name : 'Metro', width : 100, sortable : true, align : 'center' },
                     { display : 'Numero Richieste', name : 'NumRichiesteMetro', width : 100, sortable : true },
                ],
                usepager: false,
                useRp: false,
                rpOptions: [50, 100, 200, 250],
                rp: DEFAULT_LIST_LIMIT,
                //onSubmit: addFormData,
                onSuccess: function() { 
                    $("#listRecords4 .button").button();
                    $("#listRecords4 .button").css("width", "80px");
                }
            });
            $('.modal-title').html("Dettagli statistiche : " + mesi[mese-1]);
            $('#myModal').modal('show'); 
            
        }
        
        function filtroStatsRooms(inizio, fine) {
            $("#rankingOfMonthlyRequests_Rooms2").flexigrid({
                allowSelection: false,
                showToggleBtn: false,
                height : 'auto',
                url: URL_ROOT + "_gestione/filtro.php" + '?inizio='+inizio+'&fine='+fine+'&action=loadFiltroStatsRooms',
                dataType: 'json',
                colModel : [
                     { display : 'Mese', name : 'Mese', width : 90, sortable : true, align : 'center' },
                     /*{ display : 'IdStanza', name : 'IdStanza', width : 100, sortable : true },*/
                     { display : 'Numero Richieste', name : 'NumRichieste', width : 100, sortable : true },
                     { display : 'Indirizzo', name : 'Indirizzo', width : 140, sortable : true },
                     { display : 'Zona', name : 'Zona', width : 100, sortable : true },
                     { display : 'PrezzoSuggerito', name : 'PrezzoSuggerito', width : 100, sortable : true, align : 'center' },
                     { display : 'Metro', name : 'Metro', width : 100, sortable : true }
                ],
                usepager: false,
                useRp: false,
                rpOptions: [50, 100, 200, 250],
                rp: DEFAULT_LIST_LIMIT,
                onSuccess: function() { 
                    $("#rankingOfMonthlyRequests_Rooms2 .button").button();
                    $("#rankingOfMonthlyRequests_Rooms2 .button").css("width", "80px");
                    $("#rankingOfMonthlyRequests_Rooms2 .button").click(function() { 
                        funcEspandiFiltroRooms($(this).attr("data-mese"),$(this).attr("data-inizio"),$(this).attr("data-fine")); 
                    });
                }
            });
        }
        
        function funcEspandiFiltro(mese, inizio, fine) {
            var mesi = ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];
            $('#myModal .modal-body').html("<table id='listRecords4'></table>");
            $("#listRecords4").flexigrid({
                allowSelection: false,
                showToggleBtn: false,
                height : 'auto',
                url: URL_ROOT + "_gestione/filtro.php" + '?inizio='+inizio+'&fine='+fine+'&action=loadFiltroPlus&meseRichiesto='+mese,
                dataType: 'json',
                colModel : [
                     { display : 'TOP', name : 'TOP', width : 90, sortable : true, align : 'center' },
                     { display : 'Zona', name : 'Zona', width : 100, sortable : true },
                     { display : 'Numero Richieste', name : 'NumRichiesteZona', width : 100, sortable : true },
                     { display : 'Prezzo', name : 'Prezzo', width : 100, sortable : true },
                     { display : 'Numero Richieste', name : 'NumRichiestePrezzo', width : 100, sortable : true },
                     { display : 'Disponibilita', name : 'Disponibilita', width : 100, sortable : true },
                     { display : 'Numero Richieste', name : 'NumRichiesteDisponibilita', width : 100, sortable : true },
                     { display : 'Metro', name : 'Metro', width : 100, sortable : true, align : 'center' },
                     { display : 'Numero Richieste', name : 'NumRichiesteMetro', width : 100, sortable : true },
                ],
                usepager: false,
                useRp: false,
                rpOptions: [50, 100, 200, 250],
                rp: DEFAULT_LIST_LIMIT,
                //onSubmit: addFormData,
                onSuccess: function() { 
                    $("#listRecords4 .button").button();
                    $("#listRecords4 .button").css("width", "80px");
                }
            });
            $('.modal-title').html("Dettagli statistiche : " + mesi[mese-1]);
            $('#myModal').modal('show'); 
            
        }
        
        function funcEspandiRooms(mese) {
            var mesi = ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];
            $('#myModal .modal-body').html("<table id='listRecords4'></table>");
            $("#listRecords4").flexigrid({
                allowSelection: false,
                showToggleBtn: false,
                height : 'auto',
                url: '?action=loadRankingRoomsPlus&meseRichiesto='+mese,
                dataType: 'json',
                colModel : [
                     { display : 'TOP', name : 'TOP', width : 90, sortable : true, align : 'center' },
                     /*{ display : 'IdStanza', name : 'IdStanza', width : 100, sortable : true },*/
                     { display : 'Numero Richieste', name : 'NumRichieste', width : 100, sortable : true },
                     { display : 'Indirizzo', name : 'Indirizzo', width : 140, sortable : true },
                     { display : 'Zona', name : 'Zona', width : 100, sortable : true },
                     { display : 'PrezzoSuggerito', name : 'PrezzoSuggerito', width : 100, sortable : true, align : 'center' },
                     { display : 'Metro', name : 'Metro', width : 100, sortable : true }
                ],
                usepager: false,
                useRp: false,
                rpOptions: [50, 100, 200, 250],
                rp: DEFAULT_LIST_LIMIT,
                //onSubmit: addFormData,
                onSuccess: function() { 
                    $("#rankingRooms .button").button(); 
                }
            });
            $('.modal-title').html("Dettagli statistiche : " + mesi[mese-1]);
            $('#myModal').modal('show'); 
            
        }
        
        function funcEspandiFiltroRooms(mese, inizio, fine) {
            var mesi = ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];
            $('#myModal .modal-body').html("<table id='listRecords4'></table>");
            $("#listRecords4").flexigrid({
                allowSelection: false,
                showToggleBtn: false,
                height : 'auto',
                url: URL_ROOT + "_gestione/filtro.php" + '?inizio='+inizio+'&fine='+fine+'&action=loadFiltroStatsRoomsPlus&meseRichiesto='+mese,
                dataType: 'json',
                colModel : [
                     { display : 'TOP', name : 'TOP', width : 90, sortable : true, align : 'center' },
                     /*{ display : 'IdStanza', name : 'IdStanza', width : 100, sortable : true },*/
                     { display : 'Numero Richieste', name : 'NumRichieste', width : 100, sortable : true },
                     { display : 'Indirizzo', name : 'Indirizzo', width : 140, sortable : true },
                     { display : 'Zona', name : 'Zona', width : 100, sortable : true },
                     { display : 'PrezzoSuggerito', name : 'PrezzoSuggerito', width : 100, sortable : true, align : 'center' },
                     { display : 'Metro', name : 'Metro', width : 100, sortable : true }
                ],
                usepager: false,
                useRp: false,
                rpOptions: [50, 100, 200, 250],
                rp: DEFAULT_LIST_LIMIT,
                //onSubmit: addFormData,
                onSuccess: function() { 
                    $("#listRecords4 .button").button();
                    $("#listRecords4 .button").css("width", "80px");
                }
            });
            $('.modal-title').html("Dettagli statistiche : " + mesi[mese-1]);
            $('#myModal').modal('show'); 
            
        }
        
    </script>
    
    <script>
  $(function() {
    $( "#datepicker" ).datepicker({
      changeMonth: true,
      changeYear: true
    });
    $( "#datepicker2" ).datepicker({
      changeMonth: true,
      changeYear: true
    });
  });
  </script>
    
    {include file="footer.tpl"}