<?php

include 'common.php';
include './invoice_common/invoice_functions.php';

// Generated by curl-to-PHP: http://incarnate.github.io/curl-to-php/

$invoice = array (
  'fattura_elettronica_header' => 
  array (
    'dati_trasmissione' => 
    array (
      'codice_destinatario' => '1234567',
    ),
    'cedente_prestatore' => 
    array (
      'dati_anagrafici' => 
      array (
        'id_fiscale_iva' => 
        array (
          'id_paese' => 'IT',
          'id_codice' => '1234567',
        ),
        'anagrafica' => 
        array (
          'denominazione' => 'John Doe',
        ),
        'regime_fiscale' => 'RF01',
      ),
      'sede' => 
      array (
        'indirizzo' => 'Via di Qua, 1',
        'cap' => '20145',
        'comune' => 'Milano',
        'provincia' => 'MI',
        'nazione' => 'IT',
      ),
    ),
    'cessionario_committente' => 
    array (
      'dati_anagrafici' => 
      array (
        'id_fiscale_iva' => 
        array (
          'id_paese' => 'IT',
          'id_codice' => '09876543211',
        ),
        'anagrafica' => 
        array (
          'denominazione' => 'Jane Doe',
        ),
      ),
      'sede' => 
      array (
        'indirizzo' => 'Via di La, 2',
        'cap' => '20145',
        'comune' => 'Milano',
        'provincia' => 'MI',
        'nazione' => 'IT',
      ),
    ),
  ),
  'fattura_elettronica_body' => 
  array (
    0 => 
    array (
      'dati_generali' => 
      array (
        'dati_generali_documento' => 
        array (
          'tipo_documento' => 'TD01',
          'divisa' => 'EUR',
          'data' => '2018-07-10',
          'numero' => '1',
        ),
      ),
      'dati_beni_servizi' => 
      array (
        'dettaglio_linee' => 
        array (
          0 => 
          array (
            'numero_linea' => 1,
            'descrizione' => 'Descrizione articolo',
            'prezzo_unitario' => '10.00',
            'prezzo_totale' => '10.00',
            'aliquota_iva' => '22.00',
          ),
        ),
        'dati_riepilogo' => 
        array (
          0 => 
          array (
            'aliquota_iva' => '22.00',
            'imponibile_importo' => '10.00',
            'imposta' => '2.20',
          ),
        ),
      ),
    ),
  ),
);

$credentials = array(
    'email' => 'ricardo.chavez@finlibera.it',
    'password' => 'Z8tf03O1sw7Dt52C'
);

$here = json_encode($credentials);

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://api-sandbox.acubeapi.com/login_check");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $here);
curl_setopt($ch, CURLOPT_POST, 1);

$headers = array();
$headers[] = "Content-Type: application/json";
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$result = json_decode(curl_exec($ch));

if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}
curl_close ($ch);

$token = ($result->token ? $result->token : null);

if($token){
    
    $here2 = json_encode($invoice);

    // Generated by curl-to-PHP: http://incarnate.github.io/curl-to-php/
    $ch2 = curl_init();

    curl_setopt($ch2, CURLOPT_URL, "https://api-sandbox.acubeapi.com/invoices");
    curl_setopt($ch2, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch2, CURLOPT_POSTFIELDS, $here2);
    curl_setopt($ch2, CURLOPT_POST, 1);

    $headers2 = array();
    $headers2[] = "Authorization: Bearer " . $token;
    $headers2[] = "Content-Type: application/json";
    
    curl_setopt($ch2, CURLOPT_HTTPHEADER, $headers2);

    $result2 = json_decode(curl_exec($ch2));

    if (curl_errno($ch2)) {
        Utils::PrintJson('Error:' . curl_error($ch2), true);
    }else{
        Utils::PrintJson($result2, true);
    }
    
    curl_close ($ch2);
}



 