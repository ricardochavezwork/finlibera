<?php

include_once 'common.php';

$input = $_REQUEST["data"];

//TODO : Check privileges

if(isset($_REQUEST["action"])){
  switch ($_REQUEST["action"]){
    case "remove":
      $res = new stdClass();
      $res->Success = false;
      $decode = urldecode ($input);
      $decode = json_decode($decode);
      $m_i = Utils::objectToObject($decode, Movimento_Intestatario);
      $m_i->Linking();
      if($m_i->DeleteRelationship()){
        $res->Success = true;
      }

      Utils::PrintJson($res, true);
      break;
  }
}
