{assign var=pageTitle value={#admin_statistiche#}}
{assign var=menuActive value="admin"}
{assign var=menuSubActive value="adminaccount"}
{if !isset($record)}
{assign var=breadcrumb value="<li class='active'>Statistiche</li>"}
{else}
{assign var=breadcrumb value="<li class='active'><a href='?'>Statistiche</a></li>"}
{/if}
{include file="header.tpl"}


{if isset($error)}
    <div class="errore">{$error}</div>
{/if}

<div class="dropdown">
    <h5>Cambia anno</h5>
    <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"><span class="caret"></span></button>
    <ul class="dropdown-menu data_year" aria-labelledby="dropdownMenu1">
        
    </ul>
</div>
<br>
<div class="inflowOverview">
    <table id="report"></table>
    <div id="reportPager"></div>
</div>
<br>
<div class="giorniSfittoOverview">
    <table id="giorniSfitto"></table>
    <div id="giorniSfittoPager"></div>
</div>

<script>
    var year = new Date();
    
    function Trimestre(DataInizio, DataFine){
        this.DataInizio = DataInizio;
        this.DataFine = DataFine;
    }
    
    var trimestri = new Array();
    var thisDate = new Date();
    
    $(document).ready(function() {
        loadTrimestri(trimestri);
        loadTables(); 
       
        var year = thisDate.getFullYear();
        var ul = $('.data_year');  
        var button = $('#dropdownMenu1');
        
        for(var i = 2012; i < year+1; i++){
            var li = $("<li></li>");
            var a = $("<a>", { year: i },"</a>");
            a.text(i);
            if(i == year){
                button.text(i);
            }
            li.append(a);
            ul.append(li);
        }
       /*
        * Controllo trimestri generati
        */
       /*for (var chiave in trimestri) {
           alert(   "Trimestre n." + (chiave + 1)
                   + " Inizio: " + trimestri[chiave].DataInizio.toLocaleDateString()
                   + " Fine : " + trimestri[chiave].DataFine.toLocaleDateString()
                );
       }*/
       
    });
    
    $(".data_year").on("click","a", function (){
        var year = parseInt($(this).attr('year'));
        $('#dropdownMenu1').text(year);
        trimestri = [];
        loadTrimestri(trimestri, year);
        reloadTable_InflowOverview();
    });
    
    function loadTables(){
        var trimestri_clone = JSON.stringify(trimestri);
        $("#report").jqGrid({
		url: '?action=inflowOverviewQuarterly&trimestri=' + trimestri_clone,
		datatype: "json",
                editurl: 'clientArray',
		 colModel: [
			{ label: 'Trimestre', name: 'NTrimestre', width: 30, sorttype: 'integer', align: 'center' },
			{ label: 'Numero associazioni', name: 'NIns', width: 30, sorttype: 'number' },
			{ label: 'Entrate stimate', name: 'TotaleTrimestre', width: 30 }
		],
                //onSelectRow: editRowComponentiDettagli, // the javascript function to call on row click. will ues to to put the row in edit mode
		viewrecords: true, // show the current page, data rang and total records on the toolbar
		//width: 780,
		//height: 150,
                footerrow: true,
                userDataOnFooter: true, // use the userData parameter of the JSON response to display data on footer
		rowNum: 30,
		loadonce: true, // this is just for the demo
                caption: "Stima di entrate del " + year.getFullYear() + " per trimestre",
		pager: "#reportPager"
	});
        
        // the bindKeys() 
        $("#report").jqGrid('bindKeys');
        
        $("#giorniSfitto").jqGrid({
		url: '?action=sfittiStanze',
		datatype: "json",
                editurl: 'clientArray',
		 colModel: [
			{ label: 'IdS', name: 'Id', width: 10, sorttype: 'integer', align: 'center' },
                        { label: 'Indirizzo', name: 'Indirizzo', width: 70},
                        { label: 'C', name: 'Numero', width: 10},
			{ label: 'IdAdmin', name: 'IdAdmin', width: 30, sorttype: 'number' },
			{ label: 'T. giorni', name: 'tgs', width: 35 },
			{ label: 'Giorni di sfitto', name: 'gSfitto', width: 35 },
			{ label: 'Percentuale', name: 'pSfitto', width: 35, sorttype: 'integer' }
		],
                //onSelectRow: editRowComponentiDettagli, // the javascript function to call on row click. will ues to to put the row in edit mode
		viewrecords: true, // show the current page, data rang and total records on the toolbar
		width: 780,
		height: 350,
                //footerrow: true,
                //userDataOnFooter: true, // use the userData parameter of the JSON response to display data on footer
		rowNum: 250,
		loadonce: true, // this is just for the demo
                caption: "Classifica sfitto stanze",
		pager: "#giorniSfittoPager"
	});
        
        // the bindKeys() 
        $("#giorniSfitto").jqGrid('bindKeys');
    }
    
    function reloadTable_InflowOverview(){
        var trimestri_clone = JSON.stringify(trimestri);
        jQuery("#report").jqGrid('setGridParam',{ 
            url: '?action=inflowOverviewQuarterly&trimestri=' + trimestri_clone,
            datatype:'json'
        }).trigger('reloadGrid');
    }
    
    function loadTrimestri(trimestri, year){
        
        var overviewYear = new Date(); 
        
        if(!year){
            overviewYear = thisDate;
        }else{
            overviewYear.setYear(year);
        }
        
        
        var primo = new Trimestre();
        primo.DataInizio = new Date();
        primo.DataInizio.setYear(overviewYear.getFullYear());
        primo.DataInizio.setMonth(0);
        primo.DataInizio.setDate(1);
        primo.DataFine = new Date();
        primo.DataFine.setYear(overviewYear.getFullYear());
        primo.DataFine.setMonth(2);
        primo.DataFine.setDate(31);
        trimestri.push(primo);
        
        /*
         * Controlla se siamo nell'anno corrente. Sè TRUE allora genere fino al trimestre raggiunto.
         */
        if(thisDate.getYear() === overviewYear.getYear()){
            if(overviewYear.getMonth() >= 3){
                var secondo = new Trimestre();
                secondo.DataInizio = new Date();
                secondo.DataInizio.setYear(overviewYear.getFullYear());
                secondo.DataInizio.setMonth(3);
                secondo.DataInizio.setDate(1);
                secondo.DataFine = new Date();
                secondo.DataFine.setYear(overviewYear.getFullYear());
                secondo.DataFine.setMonth(5);
                secondo.DataFine.setDate(30);

                trimestri.push(secondo);
            }

            if(overviewYear.getMonth() >= 6){
                var terzo = new Trimestre();
                terzo.DataInizio = new Date();
                terzo.DataInizio.setYear(overviewYear.getFullYear());
                terzo.DataInizio.setMonth(6);
                terzo.DataInizio.setDate(1);
                terzo.DataFine = new Date();
                terzo.DataFine.setYear(overviewYear.getFullYear());
                terzo.DataFine.setMonth(8);
                terzo.DataFine.setDate(30);

                trimestri.push(terzo);
            }

            if(overviewYear.getMonth() >= 9){
                var quarto = new Trimestre();
                quarto.DataInizio = new Date();
                quarto.DataInizio.setYear(overviewYear.getFullYear());
                quarto.DataInizio.setMonth(9);
                quarto.DataInizio.setDate(1);
                quarto.DataFine = new Date();
                quarto.DataFine.setYear(overviewYear.getFullYear());
                quarto.DataFine.setMonth(11);
                quarto.DataFine.setDate(31);

                trimestri.push(quarto);
            }
        }else{
                var secondo = new Trimestre();
                secondo.DataInizio = new Date();
                secondo.DataInizio.setYear(overviewYear.getFullYear());
                secondo.DataInizio.setMonth(3);
                secondo.DataInizio.setDate(1);
                secondo.DataFine = new Date();
                secondo.DataFine.setYear(overviewYear.getFullYear());
                secondo.DataFine.setMonth(5);
                secondo.DataFine.setDate(30);

                var terzo = new Trimestre();
                terzo.DataInizio = new Date();
                terzo.DataInizio.setYear(overviewYear.getFullYear());
                terzo.DataInizio.setMonth(6);
                terzo.DataInizio.setDate(1);
                terzo.DataFine = new Date();
                terzo.DataFine.setYear(overviewYear.getFullYear());
                terzo.DataFine.setMonth(8);
                terzo.DataFine.setDate(30);

                var quarto = new Trimestre();
                quarto.DataInizio = new Date();
                quarto.DataInizio.setYear(overviewYear.getFullYear());
                quarto.DataInizio.setMonth(9);
                quarto.DataInizio.setDate(1);
                quarto.DataFine = new Date();
                quarto.DataFine.setYear(overviewYear.getFullYear());
                quarto.DataFine.setMonth(11);
                quarto.DataFine.setDate(31);

                trimestri.push(secondo, terzo, quarto);
        }
        
    }
</script>

{include file="footer.tpl"}