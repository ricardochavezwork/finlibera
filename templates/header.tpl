<!DOCTYPE html>
<html>
    <head>
        <title>{#title#}</title>
        <meta charset="utf-8">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <META NAME="ROBOTS" CONTENT="NOINDEX, NOFOLLOW">
        <link rel="icon" href="{$smarty.const.URL_ROOT}images/logo.png" type="image/png" />
        <!-- BEGIN THEME -->
        <link rel="stylesheet" href="{$smarty.const.URL_ROOT}css/fonts/font-awesome.min.css"/>
        <link rel="stylesheet"  href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css"/>
        {*<link rel="stylesheet" href="{$smarty.const.URL_ROOT}css/bootstrap.min.css"/>*}
        {*<link rel="stylesheet" href="{$smarty.const.URL_ROOT}css/bootstrap-select.css">*}
        <link rel="stylesheet" href="{$smarty.const.URL_ROOT}css/uniform/css/uniform.default.css"/>
        <link rel="stylesheet" href="{$smarty.const.URL_ROOT}css/style-metronic.css"/>
        <link rel="stylesheet" href="{$smarty.const.URL_ROOT}css/style-responsive.css"/>
        {*<link rel="stylesheet" href="{$smarty.const.URL_ROOT}css/prices.css"/>*}
        <link rel="stylesheet" href="{$smarty.const.URL_ROOT}css/uploadfile.min.css"/>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <!-- END THEME -->
        <link href="{$smarty.const.URL_ROOT}js/jquery-ui-1.11.0/jquery-ui.css" rel="stylesheet"/>
        {*<link rel="stylesheet" href="{$smarty.const.URL_ROOT}css/ui.jqgrid.css">*}
        <link rel="stylesheet" type="text/css" media="screen" href="{$smarty.const.URL_ROOT}css/ui.jqgrid-bootstrap.css"/>
        <link rel="stylesheet" href="{$smarty.const.URL_ROOT}css/flexigrid.pack.css"/>
        <link rel="stylesheet" href="{$smarty.const.URL_ROOT}css/colorpicker.css"/>
        <link rel="stylesheet" href="{$smarty.const.URL_ROOT}css/style_admin.css"/>
        <link rel="stylesheet" href="{$smarty.const.URL_ROOT}css/bootstrap-toggle.min.css"/>
        <link rel="stylesheet" href="{$smarty.const.URL_ROOT}_gestione/css/style_stats.css"/>
        <link rel="stylesheet" href="{$smarty.const.URL_ROOT}_gestione/css/style_movimenti.css"/>
        <link rel="stylesheet" href="{$smarty.const.URL_ROOT}css/flatpickr.material_blue.min.css"/>
        <link rel="stylesheet" href="{$smarty.const.URL_ROOT}css/handsontable.full.css"/>

        <script type="text/javascript" src="{$smarty.const.URL_ROOT}js/jquery-1.11.1.min.js"></script>
        <script type="text/javascript" src="{$smarty.const.URL_ROOT}js/bootstrap.min.js"></script>
        <script src="{$smarty.const.URL_ROOT}js/jquery-ui-1.11.0/jquery-ui.min.js"></script>
        <script type="text/javascript" src="{$smarty.const.URL_ROOT}js/bootbox.js"></script>
        <script type="text/javascript" src="{$smarty.const.URL_ROOT}js/jquery.ui.datepicker-it.js"></script>
        {*<script type="text/javascript" src="{$smarty.const.URL_ROOT}js/bootstrap-datepicker.js"></script>*}
        <script type="text/javascript" src="{$smarty.const.URL_ROOT}js/flexigrid.js"></script>
        <script src="{$smarty.const.URL_ROOT}js/jquery.form.min.js"></script>
        <script type="text/javascript" src="{$smarty.const.URL_ROOT}js/jquery.themepunch.plugins.min.js"></script>
        <script type="text/javascript" src="{$smarty.const.URL_ROOT}js/jquery.themepunch.revolution.min.js"></script>
        <script type="text/javascript" src="{$smarty.const.URL_ROOT}js/jquery.bxslider.min.js"></script>
        <script type="text/javascript" src="{$smarty.const.URL_ROOT}js/tinymce/tinymce.min.js"></script>
        <script type="text/javascript" src="{$smarty.const.URL_ROOT}js/plupload-2.1.2/js/plupload.full.min.js"></script>
        <script type="text/javascript" src="{$smarty.const.URL_ROOT}js/colorpicker.js"></script>
        <script type="text/javascript" src="{$smarty.const.URL_ROOT}js/bootstrap-toggle.min.js"></script>
        <script type="text/javascript" src="{$smarty.const.URL_ROOT}js/jquery.uploadfile.min.js"></script>
        {*<script type="text/javascript" src="{$smarty.const.URL_ROOT}js/jquery-1.11.1.min.js"></script>*}
        {*<script type="text/javascript" src="{$smarty.const.URL_ROOT}js/bootstrap-select.js"></script>*}
        {*<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>*}
        {*<script type="text/javascript"  src="{$smarty.const.URL_ROOT}lib/guriddo/js/trirand/i18n/grid.locale-it.js"/></script>*}
        {*<script type="text/javascript"  src="{$smarty.const.URL_ROOT}lib/guriddo/js/trirand/jquery.jqGrid.min.js"/></script>*}
        <script type="text/javascript"  src="{$smarty.const.URL_ROOT}js/jqGrid/grid.locale-it.js"/></script>
        <script type="text/javascript"  src="{$smarty.const.URL_ROOT}js/jqGrid/jquery.jqGrid.min.js"/></script>
        <script type="text/javascript" src="{$smarty.const.URL_ROOT}js/flatpickr.js"></script>
        <script type="text/javascript" src="{$smarty.const.URL_ROOT}js/handsontable.full.js"></script>
        <script> 
            var URL_HOST = "{$smarty.const.URL_HOST}";
            var ACTIONS = URL_HOST + "_gestione/actions/";
        </script>
        <script src='{$smarty.const.URL_ROOT}_gestione/js/lib.js'></script>
        <script src='{$smarty.const.URL_ROOT}_gestione/js/attachmentTemplates.js{$mobileV_js}'></script>
        <script src='{$smarty.const.URL_ROOT}_gestione/js/emailTemplates.js{$mobileV_js}'></script>
        <script src='{$smarty.const.URL_ROOT}lib/pdfmake/build/pdfmake.min.js'></script>
        <script src='{$smarty.const.URL_ROOT}lib/pdfmake/build/vfs_fonts.js'></script>
        
        <script>
		$.jgrid.defaults.width = 780;
		$.jgrid.defaults.styleUI = 'Bootstrap';
	</script>
        <script type="text/javascript">
            var DEFAULT_LIST_LIMIT = 250 {*$smarty.const.DEFAULT_LIST_LIMIT*};
            var TEXT_CONFIRM_DELETE = "{#confirm_delete#}";
            var URL_ROOT = "{$smarty.const.URL_ROOT}";
            var UPLOAD_ROOT = URL_ROOT + "{$smarty.const.URL_UPLOAD}";
            var THUMB_FOTO_SMALL = "{$smarty.const.THUMB_FOTO_SMALL}";
            var divBusy;
            {literal}

            window.jQuery.fn.forceNumericOnly = function (allowDecimals) {
                return this.each(function () {
                    $(this).keydown(function (event) {
                        //console.log(event.which + " >> " + event.keyCode);
                        // Allow: backspace, delete, tab, escape
                        if (event.which == 46 || event.which == 8 || event.which == 9 || event.which == 27 ||
                            // Allow: home, end, left, right
                            (event.which >= 35 && event.which <= 39) ||
                            // Allow: Ctrl+A
                            (event.keyCode == 65 && (event.metaKey || event.ctrlKey)) ||
                            // Allow: Ctrl+C
                            (event.keyCode == 67 && (event.metaKey || event.ctrlKey)) ||
                            // Allow: Ctrl+V
                            (event.keyCode == 86 && (event.metaKey || event.ctrlKey)) ||
                            // Allow: Ctrl+X
                            (event.keyCode == 88 && (event.metaKey || event.ctrlKey)) ||
                            // Allow: minus
                            (event.which == 189) ||
                            // Allow: numbers
                            $.isNumeric(String.fromCharCode(event.which)) ||
                            (allowDecimals && event.which == 190 && $(this).val().indexOf(".") == -1)) {
                            return;
                        } else {
                            if (event.shiftKey || (event.which < 48 || event.which > 57) && (event.which < 96 || event.which > 105)) {
                                event.preventDefault();
                            }
                        }
                    });
                });
            };

            $(document).ready(function() {
                divBusy = $("#loading");
                divBusy.dialog({
                    autoOpen: false,
                    modal: true,
                    closeOnEscape: false,
                    draggable: false,
                    resizable: false,
                    dialogClass: 'dlg-loading',
                    height: 'auto',
                    width: 'auto'
                });
                $(".input_numeric").forceNumericOnly(false);
                $(".input_decimal").forceNumericOnly(true);
            });

            function noPrivilege() {
                alert("Non hai i permessi per effettuare questa operazione");
            }

            function setFormReadonly(formId) {
                var allFields = $("#" + formId + " input[type=text], #" + formId + " input[type=checkbox], #" + formId + " input[type=text], #" + formId + " select, #" + formId + " textarea");
                $.each(allFields, function(index, value) {
                    var html = '<span><strong>' + htmlEncode($(value).val()) + '</strong></span>';
                    $(value).after(html);
                    $(value).remove();
                });
            }

            function confirmDelete (callbackFunc, callbackArgs) {
                if (confirm(TEXT_CONFIRM_DELETE)) {
                    if (callbackFunc)
                        callbackFunc(callbackArgs);
                    return true;
                }
                return false;
            }

            function drawMenu(obj) {
                obj.parent().find("ul.subnav").slideDown('fast').show(); //Drop down the subnav on click
                obj.parent().hover(function() {
                }, function(){
                        obj.parent().find("ul.subnav").slideUp('slow'); //When the mouse hovers out of the subnav, move it back up
                });
            }

            function toggleBusy(enable) {
                divBusy.dialog(enable ? "open" : "close");
            }

            function isValidDate(text) {
                var comp = text.replace(/-/g,'/').split('/');
                var m = parseInt(comp[1]);
                var d = parseInt(comp[2]);
                var y = parseInt(comp[0]);
                var date = new Date(text);
                return (date.getFullYear() == y && date.getMonth() + 1 == m && date.getDate() == d);
            }

            function htmlEncode(value){
                return $('<div/>').text(value === 0 ? "0" : value).html();
            }
            function htmlDecode(value){
                return $('<div/>').html(value).text();
            }

            function ucfirst(str,force){
                str=force ? str.toLowerCase() : str;
                return str.replace(/(\b)([a-zA-Z])/,
                       function(firstLetter){
                          return   firstLetter.toUpperCase();
                       });
            }
            function ucwords(str,force){
                str=force ? str.toLowerCase() : str;
                return str.replace(/(\b)([a-zA-Z])/g,
                         function(firstLetter){
                            return   firstLetter.toUpperCase();
                         });
            }

            function dump(obj) {
                var out = '';
                for (var i in obj) {
                    out += i + ": " + obj[i] + "\n";
                }

                alert(out);

                // or, if you wanted to avoid alerts...

                var pre = document.createElement('pre');
                pre.innerHTML = out;
                document.body.appendChild(pre)
            }
            {/literal}
        </script>
    </head>
    <body>
        {include file="mainmenu.tpl"}
        {if $pageTitle}
        <div class="row breadcrumbs margin-bottom-40">
            <div class="container">
                <div class="col-md-4 col-sm-4">
                    <h1>{$pageTitle}</h1>
                </div>
                <div class="col-md-8 col-sm-8">
                    <ul class="pull-right breadcrumb">
                        <li>{if !$breadcrumb_home}Admin{else}{$breadcrumb_home}{/if}</li>
                        {if $breadcrumb}{$breadcrumb}{/if}
                    </ul>
                </div>
            </div>
        </div>
        {/if}
        <div id="maincont">
        <div id="content">
