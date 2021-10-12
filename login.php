<?php

include 'common.php';

if($AdminLogged->IsLogged() && !isset($_REQUEST["action"])){
    Utils::RedirectTo (URL_HOST . "_gestione/");
}


$page_title = 'Login | MilanoStanze.it';
$input = $_REQUEST["data"];

if(isset($_REQUEST["action"])){
    switch ($_REQUEST["action"]){
        case "login":
            $res = new stdClass();
            $res->success = false;
            $res->errorSms = null;
            $error = null;
            $decode = urldecode ($input);
            $decode = json_decode($decode);
            $input = $decode;

            $username = $input->user;
            $password = $input->psw;

            if (!$username || !$password)
                $error = "Campi vuoti!";
            else {
                $account = NULL;
                if (AdminAccount::CheckLogin($username, sha1($password), $account)) {
                    AdminAccount::SetSession($account);
                    $res->success = true;
                } else {
                    $error = "Errore credenziali";
                }
            }
            
            if($error)
                $res->errorSms = $error;
            
            Utils::PrintJson($res, true); 
            break;
        case "logout":
            $AdminLogged->Logout();
            //Utils::RedirectTo("login-old.php");
            break;
    }
}

?>

<!DOCTYPE html>
<html>
    <head>
        <title><?php echo $page_title ?></title>
        <meta charset="utf-8">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <META NAME="ROBOTS" CONTENT="NOINDEX, NOFOLLOW">
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0, viewport-fit=cover">
        <meta name="title" content="<?php echo $page_title ?>"/>
        <link rel="icon" href="<?php echo URL_ROOT ?>images/logo.png" type="image/png" />
        <!-- BEGIN  THEME -->
        <link rel="stylesheet" href="<?php echo URL_ROOT ?>css/fonts/font-awesome.min.css"/>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="<?php echo URL_ROOT ?>_gestione/vendor/bootstrap/css/bootstrap.min.css"/>
        <link rel="stylesheet" href="<?php echo URL_ROOT ?>_gestione/vendor/animate/animate.css"/>
        <link rel="stylesheet" href="<?php echo URL_ROOT ?>_gestione/vendor/css-hamburgers/hamburgers.min.css"/>
        <link rel="stylesheet" href="<?php echo URL_ROOT ?>_gestione/vendor/select2/select2.min.css"/>
        <link rel="stylesheet" href="<?php echo URL_ROOT ?>_gestione/content/login/css/main.css"/>
        <link rel="stylesheet" href="<?php echo URL_ROOT ?>_gestione/content/login/css/util.css"/>
        <!-- END THEME -->
        <link href="<?php echo URL_ROOT ?>js/jquery-ui-1.11.0/jquery-ui.css" rel="stylesheet"/>
        <!-- BEGIN SCRIPTs -->
        <script type="text/javascript" src="<?php echo URL_ROOT ?>js/jquery-1.11.1.min.js"></script>
        <script src="<?php echo URL_ROOT ?>js/jquery-ui-1.11.0/jquery-ui.min.js"></script>
        <script src="<?php echo URL_ROOT ?>js/jquery.form.min.js"></script>
        <script>
            var URL_HOST = "<?php echo URL_HOST ?>";
        </script>
        <!-- END SCRIPTs -->
    </head>
    <body>
        <div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<div class="login100-pic js-tilt" data-tilt>
					<img src="<?php echo URL_ROOT ?>images/logo-ms-icon.svg" alt="IMG">
				</div>
				<form class="login100-form validate-form" onsubmit="return false;">
					<span class="login100-form-title">
						Area Riservata
					</span>

					<div class="wrap-input100 validate-input" data-validate = "È richiesta un'email valida: ex@abc.xyz">
						<input class="input100 email-field" type="text" name="email" placeholder="Email">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

					<div class="wrap-input100 validate-input" data-validate = "È richiesta una password">
						<input class="input100 psw-field" type="password" name="pass" placeholder="Password">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>

					<div class="container-login100-form-btn">
						<button class="login100-form-btn">
							Login
						</button>
					</div>
				</form>
			</div>
      <div class="wellcome-sms__hide">
        <span></span>
      </div>
		</div>
	</div>

<!--===============================================================================================-->
	<script src="<?php echo URL_ROOT ?>_gestione/vendor/bootstrap/js/popper.js"></script>
	<script src="<?php echo URL_ROOT ?>_gestione/vendor/bootstrap/js/bootstrap.min.js"></script>
<!--===============================================================================================-->
	<script src="<?php echo URL_ROOT ?>_gestione/vendor/select2/select2.min.js"></script>
<!--===============================================================================================-->
	<script src="<?php echo URL_ROOT ?>_gestione/vendor/tilt/tilt.jquery.min.js"></script>
	<script >
		$('.js-tilt').tilt({
			scale: 1.1
		})
	</script>
<!--===============================================================================================-->
	<script src="<?php echo URL_ROOT ?>_gestione/content/login/js/main.js"></script>
    </body>
