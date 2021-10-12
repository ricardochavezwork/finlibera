{assign var=pageTitle value={#admin_pagine#}}
{assign var=menuActive value="pagine"}
{assign var=menuSubActive value=$smarty.request.pagina}
{assign var=breadcrumb_home value="Pagine"}
{assign var=breadcrumb value="<li class='active'>{$title}</li>"}
{include file="header.tpl"}

<h3 id="section_title">{$title}</h3>

{if isset($error)}
    <div class="errore">{$error}</div>
{/if}
{if isset($saved)}
    <div class="conferma">I dati sono stati acquisiti correttamente</div>
{/if}

<form id="formEdit" action="{$smarty.const.PHP_SELF}" method="post" class="form">
    <input type="hidden" name="action" value="save"/>
    <input type="hidden" name="pagina" value="{htmlentities($smarty.request.pagina, $smarty.const.ENT_QUOTES, 'UTF-8')}"/>
{foreach $LINGUE_TEXT as $lang_key => $lang_name}
    <div class="field">
        <label>{htmlentities($lang_name, $smarty.const.ENT_QUOTES, 'UTF-8')}*</label><br/><textarea name="Contenuto-{$lang_key}" class="texteditor">{htmlentities($contenuto[$lang_key], $smarty.const.ENT_QUOTES, 'UTF-8')}</textarea>
    </div>
{/foreach}
    <br/>
    <div class="toolbar">
        {if $canEdit}<input type="submit" class="button" value="SALVA"/>{/if}
        <input type="button" class="button" value="ANNULLA" onclick="window.location='{$smarty.const.PHP_SELF}?pagina={urlencode($smarty.request.pagina)}'"/>
    </div>
</form>

    <script type="text/javascript">
        var canEdit = {if $canEdit}true{else}false{/if};
        var root = "{$smarty.const.URL_ROOT}";
    {literal}
        $(function () {
            if (canEdit) {
                tinymce.init({selector:'textarea.texteditor', menubar : false, width: 600, height: 150, plugins: "textcolor link image table code responsivefilemanager", toolbar: [
                    "undo redo | styleselect | fontsizeselect | forecolor backcolor | bold italic | link image table | alignleft aligncenter alignright | bullist numlist outdent indent | responsivefilemanager | code",
                ], image_advtab: true, external_filemanager_path: root + "_gestione/filemanager/", external_plugins: { "filemanager" : root + "_gestione/filemanager/plugin.min.js"} });
            } else {
                setFormReadonly("formEdit");
            }
            var allFields = $("#formEdit textarea");
            $("#formEdit").submit(function() {
                tinymce.triggerSave();
                var canSubmit = true;
                $.each(allFields, function(index, value) {
                    if (!$(value).val() || $(value).val() == "<p></p>") {
                        alert($(value).parent().children("label").text() + " non puo' essere vuoto");
                        canSubmit = false;
                        return false;
                    }
                });
                return canSubmit;
            });
        });
    {/literal}
    </script>

{include file="footer.tpl"}