{assign var=pageTitle value="Autenticazione"}
{assign var=breadcrumb value="<li class='active'>Login</li>"}
{assign var=menuActive value="login"}
{include file="header.tpl"}

<div class="row">
    <div class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 login-signup-page">
        <form method="post">
            <input type="hidden" name="action" value="login"/>

            <h2>{#login_title#}</h2>
            
            <div class="input-group margin-bottom-20">
                <span class="input-group-addon"><i class="fa fa-user"></i></span>
                <input type="text" class="form-control" placeholder="Username" name="Username" value="{$username}">
            </div>                    
            <div class="input-group margin-bottom-20">
                <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                <input type="password" class="form-control" placeholder="Password" name="Password" value="">
            </div>

            <div class="row">
                <div class="col-md-6 col-sm-6"></div>
                <div class="col-md-6 col-sm-6">
                    <button type="submit" class="btn theme-btn pull-right">Login</button>                        
                </div>
            </div>

            {if ($error)}
                <div class="errore">{$error}</div>
            {/if}
        </form>
    </div>
</div>

{include file="footer.tpl"}
