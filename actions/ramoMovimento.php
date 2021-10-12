<?php

include_once 'common.php';

$input = $_REQUEST["data"];

//TODO : Check privileges

if(isset($_REQUEST["action"])){
  switch ($_REQUEST["action"]){
    case "load":
      $res = new stdClass();
      $res->Success = false;
      $decode = urldecode ($input);
      $decode = json_decode($decode);
      $input  = $decode;
      if(intval($input->Id) > 0){
          $id = $input->Id;
          $res->Data = RamoMovimento::LoadRelationship($id);
      }else{
          $res->Data = null;
      }

      Utils::PrintJson($res, true);
      break;
    case "save":
      $res = new stdClass();
      $res->Success = false;
      $decode = urldecode ($input);
      $decode = json_decode($decode);
      $ramo = Utils::objectToObject($decode, RamoMovimento);
      $ramo->Linking();
      if(RamoMovimento::SaveRelationship($ramo)){
        $res->Success = true;
      }

      Utils::PrintJson($res, true);
      break;
    case "remove":
      $res = new stdClass();
      $res->Success = false;
      $decode = urldecode ($input);
      $decode = json_decode($decode);
      $ramo = Utils::objectToObject($decode, RamoMovimento);
      $ramo->Linking();
      if($ramo->DeleteRelationship()){
        $res->Success = true;
      }

      Utils::PrintJson($res, true);
      break;
  }
}
