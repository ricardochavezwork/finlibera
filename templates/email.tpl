{include file="header.tpl"}

{if ($success)}
    
    I dati sono stati registrati correttamente, <a href="{$smarty.const.PHP_SELF}">clicca qui</a> per continuare.
    
{else}
    
    {if ($error)}
        <div class="errore">{$error}</div>
    {/if}
    
    <form method="post" class="form form_email">

        <input type="hidden" name="action" value="save"/>
        <div class="field">
            <label>{#email_from_name#}</label><input type="text" name="FromName" value="{htmlentities($fromName, $smarty.const.ENT_QUOTES, 'UTF-8')}"/>
        </div>
        <div class="field">
            <label>{#email_from_email#}</label><input type="text" name="FromEmail" value="{htmlentities($fromEmail, $smarty.const.ENT_QUOTES, 'UTF-8')}"/>
        </div>
        <div class="field">
            <label>{#email_subject#}</label><input type="text" name="Subject" value="{htmlentities($subject, $smarty.const.ENT_QUOTES, 'UTF-8')}"/>
        </div>
        <div class="field">
            <label>{#email_message#}</label><textarea name="Message">{htmlentities($message, $smarty.const.ENT_QUOTES, 'UTF-8')}</textarea>
        </div>
        <div class="toolbar">
            <input type="submit" class="button" name="submit" value="{#email_send#}"/>
        </div>

    </form>
    
{/if}
    
{include file="footer.tpl"}