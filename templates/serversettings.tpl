{assign var=pageTitle value={#admin_custom_data#}}
{assign var=menuActive value="admin"}
{assign var=menuSubActive value="adminaccount"}
{if !isset($record)}
{assign var=breadcrumb value="<li class='active'>Contenuti</li>"}
{else}
{assign var=breadcrumb value="<li class='active'><a href='?'>Contenuti</a></li>"}
{/if}
{include file="header.tpl"}


{if isset($error)}
    <div class="errore">{$error}</div>
{/if}
<br>
<div class="dataKeys">
    <table id="dataKeys"></table>
    <div id="dataKeysPager"></div>
</div>

<div style="margin-top: 15px; height: 50px;">
    <a class="salva button" role="button" style="float: right; margin-right: 215px;"><span class="ui-button-text" style="width: 100px;">Salva</span></a>
</div>

<script>
    
    function ServerSettings(DataKey, DataValue){
        this.DataKey = DataKey;
        this.DataValue = DataValue;
    }
    
    var loadSS = new Array();
    
    {if count($records_encoded) > 0}
        loadSS = {$records_encoded};
    {/if}
    
    $(document).ready(function (){
        loadTables();
    });
    
    function loadTables(){
        $("#dataKeys").jqGrid({
		datatype: "local",
                data: loadSS,
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
                                delbutton : false 
                            }       
                        },
			{ label: 'DataKey', name: 'DataKey', width: 35 /* , editable: true, edittype: "text" */ },
			{ label: 'Valore', name: 'DataValue', width: 70, editable: true, edittype: "text" }
			// sorttype is used only if the data is loaded locally or loadonce is set to true
		],
                onSelectRow: editRow,
		viewrecords: true, // show the current page, data rang and total records on the toolbar
		width: 780,
		height: 150,
		rowNum: 30,
		loadonce: true, // this is just for the demo
                caption: "Elenco dei dati",
		pager: "#dataKeysPager"
	});
        
        var lastSelection;

        function editRow(id) {
            if (id && id !== lastSelection) {
                var grid = $("#dataKeys");
                grid.jqGrid('restoreRow',lastSelection);
                grid.jqGrid('editRow',id, { keys:true, focusField: 4 });
                lastSelection = id;
            }
        }
        
        // the bindKeys() 
        $("#dataKeys").jqGrid('bindKeys');
    }
    
    /*
     * Evento: Salvataggio
     */
    $('.salva').on('click', function (){
        var allRowsDataKeys = $('#dataKeys').jqGrid('getGridParam','data');
        var loadSS_clone = JSON.stringify(allRowsDataKeys);
        if($(allRowsDataKeys).length > 0){
            $.getJSON( '?action=save&records=' + loadSS_clone, function( data ) {
                if(data === true){
                    bootbox.alert("Records salvati con successo!");
                }else{
                    bootbox.alert("Errore imprevisto!");
                }
            });
        }else{
            bootbox.alert("Non ci sono dati da salvare!");
        }
    });
    
</script>

{include file="footer.tpl"}