<?php

include_once 'common.php';

$input = $_POST["data"];

//TODO : Check privileges

if(isset($_REQUEST["action"])){
  switch ($_REQUEST["action"]){
    case "load":
      $res = new stdClass();
      $res->Success = false;
      
      $obj = urldecode ($input);
      $obj = stripslashes($obj);
      $obj = json_decode($obj);
      $res->data = null;
      
      if(intval($obj->Id) > 0){
         $res->data = new EmailLogs($id);
         $res->Success = true;
      }

      Utils::PrintJson($res, true);
      break;
    case "search":
      $res = new stdClass();
      $res->Success = false;
      
      $filters = urldecode ($input);
      $filters = stripslashes($filters);
      $filters = json_decode($filters);
      $res->data = array();
      
      $searchResults = EmailLogs::Search($filters);
      if($searchResults){
          $res->data = $searchResults;
          $res->Success = true;
      }
      
      Utils::PrintJson($res, true);
      break;
  }
}
