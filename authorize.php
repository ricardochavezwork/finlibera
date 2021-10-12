<?php

include_once '../lib/Auth.php';

{
    echo Auth::SignIn([
        'id' => 1,
        'name' => 'Eduardo'
    ]);
}


/*try {
    $token = $_GET['t'];
    Auth::Check($token);
    header("Status: 200");
} catch (Exception $ex) {
    header("HTTP/1.1 401 Unauthorized");
    exit;
}*/