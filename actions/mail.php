<?php

include_once 'common.php';

$input = (isset($_POST['data'])) ? $_POST['data'] : '';
$file = $_POST["pdf"];
define ("EMAIL_DEV", "ricardo.chavez.all@gmail.com");

//TODO : Check privileges

if(isset($_REQUEST["action"])){
  switch ($_REQUEST["action"]){
    case "send":
        $res = new stdClass();
        $res->Success = false;
        $mail = new Mail();
        $emailLog = new EmailLogs();
        $notification = urldecode ($input);
        //$notification = stripslashes($notification);
        $notification = json_decode($notification);
        $intestatario = $notification->Intestatario;
        $docFisc = $notification->DocumentoFiscale;
        
        $To = $notification->To;
        $CC = $notification->CC;
        $BCC = $notification->BCC;
        $From = $notification->From;
        $ReplyTo = $notification->ReplyTo;
        

        //set FROM
        if($From && $From->Mail && $From->Mail !== ""){
            $fromName = $From->Mail;

            if($From->Name && $From->Name !== "")
                $fromName = $From->Name;

            switch ($From->Mail) {
                case 'services@milanostanze.it':
                    $mail->setServices();
                    break;
                case 'noreply-bookings@milanostanze.it':
                    $mail->setNoReplyBookings();
                    break;
                case 'noreply-customers@milanostanze.it':
                    $mail->setNoReplyCustomers();
                    break;
                case 'noreply-newsletter@milanostanze.it':
                    $mail->setNoReplyNewsletter();
                    break;
            }

            $mail->setFrom($From->Mail, $fromName);
        }

        $mail->Subject = $notification->Subject;
        $mail->body = $notification->Content;
      
        //set To
        if($To && count($To) > 0){
            foreach ($To as $key => $sTo) {
                if($sTo->Mail && $sTo->Name){
                    $mail->addAddress($sTo->Mail, $sTo->Name);
                }else if($sTo->Mail){
                    $mail->addAddress($sTo->Mail, $sTo->Mail);
                }
            }
        }
        
        //set CC
        if($CC && count($CC) > 0){
            foreach ($CC as $key => $sCC) {
                if($sCC->Mail && $sCC->Name){
                    $mail->addCC($sCC->Mail, $sCC->Name);
                }else if($sCC->Mail){
                    $mail->addCC($sCC->Mail, $sCC->Mail);
                }
            }
        }
        
        //set BCC
        if($BCC && count() > 0){
            foreach ($BCC as $key => $sBCC) {
                if($sBCC->Mail && $sBCC->Name){
                    $mail->addBCC($sBCC->Mail, $sBCC->Name);
                }else if($sBCC->Mail){
                    $mail->addBCC($sBCC->Mail, $sBCC->Mail);
                }
            }
        }
        
        //set ReplyTo
        if($ReplyTo && $ReplyTo->Mail && $ReplyTo->Mail !== ""){
            $replyToName = $ReplyTo->Mail;
            
            if($ReplyTo->Name && $ReplyTo->Name !== "")
                $replyToName = $ReplyTo->Name;
            
            $mail->addReplyTo($ReplyTo->Mail, $replyToName);
        }

        if ($file) {
            $attachment = urldecode ($file);
            $attachment = stripslashes($attachment);
            $attachment = json_decode($attachment);
            $title = $attachment->Title;
            $base = base64_decode($attachment->File);
            $resource = base64_decode(str_replace(" ", "+", substr($base, strpos($base, ","))));
            $mail->addStringAttachment($resource, $title, "base64", "application/pdf");
        }
        
        if($mail->Send()){
            $res->Success = true;
            if($intestatario){
                $emailLog->IdIntestatario = $intestatario->Id;
                $emailLog->TipoIntestatario = $intestatario->Type;
                $emailLog->IdDocumentoFiscale = $docFisc->Id;
                $emailLog->TipoDocumentoFiscale = $docFisc->Type;
                $emailLog->IdAdmin = $AdminLogged->Id;
                $emailLog->Save();
            }
        }

        Utils::PrintJson($res, true);
        break;
  }
}
