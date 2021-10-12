var companyAddresses = {
  finlibera : {
    segreteria : { Mail : "segreteria@finlibera.it", Name : "Segreteria Finlibera" },
    noreply : { Mail : "no-reply@finlibera.it", Name : "Finlibera" }
  },
  ecolibera : {
    segreteria : { Mail : "", Name : "" },
    noreply : { Mail : "no-reply@finlibera.it", Name : "Finlibera" }
  },
  milanostanze : {
    noreply : { Mail : "no-reply@milanostanze.it", Name : "Milanostanze" },
    segreteria : { Mail : "segreteria@milanostanze.it", Name : "Segreteria MilanoStanze" }
  }
};

var UITemplate = {
  finlibera : {
    title : "Finlibera",
    color : "#111B63",
    rootText : ".email-body",
    rootPreview : ".preview",
    topContent : '<html xmlns="http://www.w3.org/1999/xhtml"><head><!-- base href="https://raw.githubusercontent.com/TedGoas/Cerberus/master/cerberus-hybrid.html"> <meta charset="utf-8" --> <!-- utf-8 works for most cases --> <meta name="viewport" content="width=device-width"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine --> <meta name="x-apple-disable-message-reformatting"> <!-- Disable auto-scale in iOS 10 Mail entirely --> <title></title> <!-- The title tag shows in email notifications, like Android 4.4. --> <!-- Web Font / @font-face : BEGIN --> <!-- NOTE: If web fonts are not required, lines 10 - 27 can be safely removed. --> <!-- Desktop Outlook chokes on web font references and defaults to Times New Roman, so we force a safe fallback font. --> <!--[if mso]> <style> * { font-family: sans-serif !important; } </style> <![endif]--> <!-- All other clients get the webfont reference; some will render the font and others will silently fail to the fallbacks. More on that here: http://stylecampaign.com/blog/2015/02/webfont-support-in-email/ --> <!--[if !mso]><!--> <!-- insert web font reference, eg: <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet" type="text/css"> --> <!--<![endif]--> <!-- Web Font / @font-face : END --> <!-- CSS Reset --> <style> /* What it does: Remove spaces around the email design added by some email clients. */ /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */ html, body { margin: 0 auto !important; padding: 0 !important; height: 100% !important; width: 100% !important; } /* What it does: Stops email clients resizing small text. */ * { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; } /* What it does: Centers email on Android 4.4 */ div[style*="margin: 16px 0"] { margin:0 !important; } /* What it does: Stops Outlook from adding extra spacing to tables. */ table, td { mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; } /* What it does: Fixes webkit padding issue. Fix for Yahoo mail table alignment bug. Applies table-layout to the first 2 tables then removes for anything nested deeper. */ table { border-spacing: 0 !important; border-collapse: collapse !important; table-layout: fixed !important; margin: 0 auto !important; } table table table { table-layout: auto; } /* What it does: Uses a better rendering method when resizing images in IE. */ img { -ms-interpolation-mode:bicubic; } /* What it does: A work-around for iOS meddling in triggered links. */ .mobile-link--footer a, a[x-apple-data-detectors] { color:inherit !important; text-decoration: underline !important; } /* What it does: Prevents underlining the button text in Windows 10 */ .button-link { text-decoration: none !important; } </style> <!-- Progressive Enhancements --> <style> /* What it does: Hover styles for buttons */ .button-td, .button-a { transition: all 100ms ease-in; } .button-td:hover, .button-a:hover { background: #555555 !important; border-color: #555555 !important; } /* Media Queries */ @media screen and (max-width: 480px) { /* What it does: Forces elements to resize to the full width of their container. Useful for resizing images beyond their max-width. */ .fluid { width: 100% !important; max-width: 100% !important; height: auto !important; margin-left: auto !important; margin-right: auto !important; } /* What it does: Forces table cells into full-width rows. */ .stack-column, .stack-column-center { display: block !important; width: 100% !important; max-width: 100% !important; direction: ltr !important; } /* And center justify these ones. */ .stack-column-center { text-align: center !important; } /* What it does: Generic utility class for centering. Useful for images, buttons, and nested tables. */ .center-on-narrow { text-align: center !important; display: block !important; margin-left: auto !important; margin-right: auto !important; float: none !important; } table.center-on-narrow { display: inline-block !important; } } </style> </head> <body width="100%" bgcolor="#ffffff" style="margin: 0; mso-line-height-rule: exactly;" cz-shortcut-listen="true"> <center style="width: 100%;background: #ffffff;"> <!-- Visually Hidden Preheader Text : BEGIN --> <div style="display:none;font-size:1px;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;font-family: sans-serif;" class="preview"> </div> <!-- Visually Hidden Preheader Text : END --> <div style="max-width: 680px; margin: auto;"> <!--[if mso]> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="680" align="center"> <tr> <td> <![endif]--> <!-- Email Header : BEGIN --> <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px;"> <tbody><tr> <td style="padding: 20px 0; text-align: center" bgcolor="#ffffff" class=""> <a href="https://www.finlibera.it" style="text-decoration: none"> <img src="https://www.milanostanze.it/images/logo_finlibera.jpg" width="300" height="50" border="0" style="height: auto; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555; " class=""> </a> </td> </tr> </tbody></table> <!-- Email Header : END --> <!-- Email Body : BEGIN -->',
    middleContent : '<table role="presentation" class="email-body" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px;"> </table>',
    bottomContent : '<!-- Email Body : END --> <!-- Email Footer : BEGIN --> <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px;"> <tbody><tr> <td bgcolor="#111B63" ;="" style="padding: 33px 10px;width: 100%;font-size: 20px;font-family: sans-serif;line-height: 18px;text-align: center;color: #ffffff;" class=""> <a href="https://www.finlibera.it" style=" text-decoration: none; color: #ffffff; ">Finlibera.it</a> </td> </tr> </tbody></table> <!-- Email Footer : END --> <!--[if mso]> </td> </tr> </table> <![endif]--> </div> </center> </body></html>'
  },
  ecolibera : {
    title : "Ecolibera",
    color : "#797d76",
    rootText : ".email-body",
    rootPreview : ".preview",
    topContent : '<html xmlns="http://www.w3.org/1999/xhtml"><head><!-- base href="https://raw.githubusercontent.com/TedGoas/Cerberus/master/cerberus-hybrid.html"> <meta charset="utf-8" --> <!-- utf-8 works for most cases --> <meta name="viewport" content="width=device-width"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine --> <meta name="x-apple-disable-message-reformatting"> <!-- Disable auto-scale in iOS 10 Mail entirely --> <title></title> <!-- The title tag shows in email notifications, like Android 4.4. --> <!-- Web Font / @font-face : BEGIN --> <!-- NOTE: If web fonts are not required, lines 10 - 27 can be safely removed. --> <!-- Desktop Outlook chokes on web font references and defaults to Times New Roman, so we force a safe fallback font. --> <!--[if mso]> <style> * { font-family: sans-serif !important; } </style> <![endif]--> <!-- All other clients get the webfont reference; some will render the font and others will silently fail to the fallbacks. More on that here: http://stylecampaign.com/blog/2015/02/webfont-support-in-email/ --> <!--[if !mso]><!--> <!-- insert web font reference, eg: <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet" type="text/css"> --> <!--<![endif]--> <!-- Web Font / @font-face : END --> <!-- CSS Reset --> <style> /* What it does: Remove spaces around the email design added by some email clients. */ /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */ html, body { margin: 0 auto !important; padding: 0 !important; height: 100% !important; width: 100% !important; } /* What it does: Stops email clients resizing small text. */ * { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; } /* What it does: Centers email on Android 4.4 */ div[style*="margin: 16px 0"] { margin:0 !important; } /* What it does: Stops Outlook from adding extra spacing to tables. */ table, td { mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; } /* What it does: Fixes webkit padding issue. Fix for Yahoo mail table alignment bug. Applies table-layout to the first 2 tables then removes for anything nested deeper. */ table { border-spacing: 0 !important; border-collapse: collapse !important; table-layout: fixed !important; margin: 0 auto !important; } table table table { table-layout: auto; } /* What it does: Uses a better rendering method when resizing images in IE. */ img { -ms-interpolation-mode:bicubic; } /* What it does: A work-around for iOS meddling in triggered links. */ .mobile-link--footer a, a[x-apple-data-detectors] { color:inherit !important; text-decoration: underline !important; } /* What it does: Prevents underlining the button text in Windows 10 */ .button-link { text-decoration: none !important; } </style> <!-- Progressive Enhancements --> <style> /* What it does: Hover styles for buttons */ .button-td, .button-a { transition: all 100ms ease-in; } .button-td:hover, .button-a:hover { background: #555555 !important; border-color: #555555 !important; } /* Media Queries */ @media screen and (max-width: 480px) { /* What it does: Forces elements to resize to the full width of their container. Useful for resizing images beyond their max-width. */ .fluid { width: 100% !important; max-width: 100% !important; height: auto !important; margin-left: auto !important; margin-right: auto !important; } /* What it does: Forces table cells into full-width rows. */ .stack-column, .stack-column-center { display: block !important; width: 100% !important; max-width: 100% !important; direction: ltr !important; } /* And center justify these ones. */ .stack-column-center { text-align: center !important; } /* What it does: Generic utility class for centering. Useful for images, buttons, and nested tables. */ .center-on-narrow { text-align: center !important; display: block !important; margin-left: auto !important; margin-right: auto !important; float: none !important; } table.center-on-narrow { display: inline-block !important; } } </style> </head> <body width="100%" bgcolor="#FFFFFF" style="margin: 0; mso-line-height-rule: exactly;" cz-shortcut-listen="true"> <center style="width: 100%;background: #FFFFFF;"> <!-- Visually Hidden Preheader Text : BEGIN --> <div style="display:none;font-size:1px;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;font-family: sans-serif;" class="preview"> </div> <!-- Visually Hidden Preheader Text : END --> <div style="max-width: 680px; margin: auto;"> <!--[if mso]> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="680" align="center"> <tr> <td> <![endif]--> <!-- Email Header : BEGIN --> <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px;"> <tbody><tr> <td style="padding: 20px 0; text-align: center" bgcolor="#FFFFFF" class=""> <a href="https://www.ecolibera.it" style="text-decoration: none"> <img src="https://www.milanostanze.it/images/logo_ecolibera.jpg" width="300" height="50" border="0" style="height: auto; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555; " class=""> </a> </td> </tr> </tbody></table> <!-- Email Header : END --> <!-- Email Body : BEGIN -->',
    middleContent : '<table role="presentation" class="email-body" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px;"> </table>',
    bottomContent : '<!-- Email Body : END --> <!-- Email Footer : BEGIN --> <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px;"> <tbody><tr> <td bgcolor="#4a9520" ;="" style="padding: 33px 10px;width: 100%;font-size: 20px;font-family: sans-serif;line-height: 18px;text-align: center;color: #FFFFFF;" class=""> <a href="https://www.ecolibera.it" style=" text-decoration: none; color: #FFFFFF; ">Ecolibera.it</a> </td> </tr> </tbody></table> <!-- Email Footer : END --> <!--[if mso]> </td> </tr> </table> <![endif]--> </div> </center></body></html>'
  },
  milanostanze : {
    title : "MilanoStanze.it",
    color : "#2290C7",
    rootText : ".email-body",
    rootPreview : ".preview",
    topContent : '<html xmlns="http://www.w3.org/1999/xhtml"><head><!-- base href="https://raw.githubusercontent.com/TedGoas/Cerberus/master/cerberus-hybrid.html"> <meta charset="utf-8" --> <!-- utf-8 works for most cases --> <meta name="viewport" content="width=device-width"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine --> <meta name="x-apple-disable-message-reformatting"> <!-- Disable auto-scale in iOS 10 Mail entirely --> <title></title> <!-- The title tag shows in email notifications, like Android 4.4. --> <!-- Web Font / @font-face : BEGIN --> <!-- NOTE: If web fonts are not required, lines 10 - 27 can be safely removed. --> <!-- Desktop Outlook chokes on web font references and defaults to Times New Roman, so we force a safe fallback font. --> <!--[if mso]> <style> * { font-family: sans-serif !important; } </style> <![endif]--> <!-- All other clients get the webfont reference; some will render the font and others will silently fail to the fallbacks. More on that here: http://stylecampaign.com/blog/2015/02/webfont-support-in-email/ --> <!--[if !mso]><!--> <!-- insert web font reference, eg: <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet" type="text/css"> --> <!--<![endif]--> <!-- Web Font / @font-face : END --> <!-- CSS Reset --> <style> /* What it does: Remove spaces around the email design added by some email clients. */ /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */ html, body { margin: 0 auto !important; padding: 0 !important; height: 100% !important; width: 100% !important; } /* What it does: Stops email clients resizing small text. */ * { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; } /* What it does: Centers email on Android 4.4 */ div[style*="margin: 16px 0"] { margin:0 !important; } /* What it does: Stops Outlook from adding extra spacing to tables. */ table, td { mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; } /* What it does: Fixes webkit padding issue. Fix for Yahoo mail table alignment bug. Applies table-layout to the first 2 tables then removes for anything nested deeper. */ table { border-spacing: 0 !important; border-collapse: collapse !important; table-layout: fixed !important; margin: 0 auto !important; } table table table { table-layout: auto; } /* What it does: Uses a better rendering method when resizing images in IE. */ img { -ms-interpolation-mode:bicubic; } /* What it does: A work-around for iOS meddling in triggered links. */ .mobile-link--footer a, a[x-apple-data-detectors] { color:inherit !important; text-decoration: underline !important; } /* What it does: Prevents underlining the button text in Windows 10 */ .button-link { text-decoration: none !important; } </style> <!-- Progressive Enhancements --> <style> /* What it does: Hover styles for buttons */ .button-td, .button-a { transition: all 100ms ease-in; } .button-td:hover, .button-a:hover { background: #555555 !important; border-color: #555555 !important; } /* Media Queries */ @media screen and (max-width: 480px) { /* What it does: Forces elements to resize to the full width of their container. Useful for resizing images beyond their max-width. */ .fluid { width: 100% !important; max-width: 100% !important; height: auto !important; margin-left: auto !important; margin-right: auto !important; } /* What it does: Forces table cells into full-width rows. */ .stack-column, .stack-column-center { display: block !important; width: 100% !important; max-width: 100% !important; direction: ltr !important; } /* And center justify these ones. */ .stack-column-center { text-align: center !important; } /* What it does: Generic utility class for centering. Useful for images, buttons, and nested tables. */ .center-on-narrow { text-align: center !important; display: block !important; margin-left: auto !important; margin-right: auto !important; float: none !important; } table.center-on-narrow { display: inline-block !important; } } </style> </head> <body width="100%" bgcolor="#ffffff" style="margin: 0; mso-line-height-rule: exactly;" cz-shortcut-listen="true"><!-- Visually Hidden Preheader Text : BEGIN --> <div style="display:none;font-size:1px;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;font-family: sans-serif;" class="preview"> </div> <!-- Visually Hidden Preheader Text : END --><!--[if mso]> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="680" align="center"> <tr> <td> <![endif]--> <!-- Email Header : BEGIN --> <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px;"> <tbody><tr> <td style="padding: 20px 0; text-align: center" bgcolor="#ffffff" class=""> <a href="https://www.milanostanze.it" style="text-decoration: none"> <img src="https://www.milanostanze.it/images/logo_MilanoStanze600-2.jpg" width="300" height="50" border="0" style="height: auto; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555; " class=""> </a> </td> </tr> </tbody></table> <!-- Email Header : END --> <!-- Email Body : BEGIN -->',
    middleContent : '<table role="presentation" class="email-body" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px;"> </table>',
    bottomContent : '<!-- Email Body : END --> <!-- Email Footer : BEGIN --> <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 680px;"> <tbody><tr> <td bgcolor="#2290C7" ;="" style="padding: 33px 10px;width: 100%;font-size: 20px;font-family: sans-serif;line-height: 18px;text-align: center;color: #ffffff;" class=""> <a href="https://www.milanostanze.it" style=" text-decoration: none; color: #ffffff; ">MilanoStanze.it</a><br><span style="font-size: 9px;">Powered by DoveVivo</span> </td> </tr> </tbody></table> <!-- Email Footer : END --> <!--[if mso]> </td> </tr> </table> <![endif]--> </div></body></html>'
  }
};

var TextTemplate = {
  invoice : {
    0 : {
      it : {
        subject : "Milanostanze - Nuova Fattura",
        rootNominativo : ".ts-nominativo",
        rootCustomText : ".customText",
        rootBkDetails : ".bk-details",
        rootTotalInvoice : ".total",
        bk_details : {
          finlibera : $('<div>Bonifico Bancario da intestare a <strong>Finlibera s.p.a.</strong><br> IBAN: <strong>IT80S0100501606000000000812</strong><br> Bic/Swift: <strong>BNLIITRR</strong><br> Nome Banca: <strong>Banca Nazionale Del Lavoro</strong><br> Causale : <strong class="causale"></strong> <br><br>Per qualsiasi chiarimento contattare il seguente indirizzo email : <strong>segreteria@finlibera.it</strong></div>'),
          ecolibera : $('<div>Bonifco Bancario intestato a <strong>Ecolibera Srl</strong><br> IBAN: <strong>IT88T0100501606000000001225</strong><br> Bic/Swift: <strong>BNLIITRR</strong><br> Nome Banca: <strong>Banca Nazionale Del Lavoro</strong><br> Causale : <strong class="causale"></strong> <br><br>Per qualsiasi chiarimento contattare il seguente indirizzo email : <strong>segreteria@finlibera.it</strong></div>')
        },
        rootCausale : ".causale",
        content : '<tbody> <tr> <td bgcolor="#ffffff"> <table width="100%" style="max-width: 680px;" role="presentation" border="0" cellspacing="0" cellpadding="0"> <tbody> <tr> <td style="padding: 20px;text-align: left;color: rgb(34, 144, 199);line-height: 15px;font-family: sans-serif;font-size: 20px;"> <div style="color: #2290C7;" class="ts">Gentile <span class="ts-nominativo"></span>,</div><br> </td> </tr> </tbody> </table> </td> </tr> <tr> <td bgcolor="#ffffff"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 680px;"> <tbody> <tr> <td style="padding: 20px 20px 50px 20px;text-align: left;font-family: sans-serif;font-size: 15px;line-height: 20px;color: rgb(17,27,99);" class="customText">E&#8217; stata emessa una fattura di Sua competenza. Si prega di prendere visione del documento in allegato. <br>L&#39;importo totale dovuto è di <strong class="total"></strong> * IVA inclusa. <br><br><div class="bk-details"></div><br> Cordiali saluti,<br><strong>Segreteria Amministrativa</strong> </td> </tr> </tbody> </table> </td> </tr> </tbody>',
        build : function(intestatario, doc, callback){

          try {
            if (!intestatario || !(intestatario instanceof Intestatario))
              throw new TypeError('TextTemplate - Error evaluating build function parameter data');
            if (!doc || !(doc instanceof Fattura))
              throw new TypeError('TextTemplate - Error evaluating build function parameter data');
            if (!callback)
              throw new TypeError('TextTemplate : build -This method needs a callback argument');

            var nominativo = intestatario.getFormalNominativo();
            var ftNominativo = doc.getNominativoPDFMatrix();

            if (!nominativo || nominativo === "" || !ftNominativo || ftNominativo === "")
              throw new TypeError('TextTemplate : build -Locazione nominativo or ftNominativo error');

            var causale = "Fattura n° " + ftNominativo + " " + nominativo;

            var string = this.content,
            content = $('<div/>').html("<div>" + string + "</div>").contents();
            content.find(this.rootNominativo).append(intestatario.getNominativo());

            switch (parseInt(doc.Societa)) {
              case 0:
                content.find(this.rootBkDetails).append(this.bk_details.finlibera.clone());
                break;
              case 1:
                content.find(this.rootBkDetails).append(this.bk_details.ecolibera.clone());
                content.find(this.rootCustomText).css('color', 'rgb(121,125,118)');
                break;
            }

            content.find(this.rootTotalInvoice).append(doc.getTotaleMatrix());
            content.find(this.rootCausale).append(causale);

            callback(content.first());
          } catch (e) {
            console.log(e.message);
          }

        }
      },
      en : {
        subject : "Milanostanze - New Invoice",
        rootNominativo : ".ts-nominativo",
        rootCustomText : ".customText",
        rootBkDetails : ".bk-details",
        rootTotalInvoice : ".total",
        bk_details : {
          finlibera : $('<div>Bank Transfer Wire to <strong>Finlibera s.p.a.</strong><br> IBAN: <strong>IT80S0100501606000000000812</strong><br> Bic/Swift: <strong>BNLIITRR</strong><br> Bank name : <strong>Banca Nazionale Del Lavoro</strong><br> Description of transfer : <strong class="causale"></strong> <br><br>Should you need any further information/assistance , please do not hesitate to contact us at the following email : <strong>segreteria@finlibera.it</strong></div>'),
          ecolibera : $('<div>Bank Transfer Wire to <strong>Ecolibera Srl</strong><br> IBAN: <strong>IT88T0100501606000000001225</strong><br> Bic/Swift: <strong>BNLIITRR</strong><br> Bank name : <strong>Banca Nazionale Del Lavoro</strong><br> Description of transfer : <strong class="causale"></strong> <br><br>Should you need any further information/assistance , please do not hesitate to contact us at the following email : <strong>segreteria@finlibera.it</strong></div>')
        },
        rootCausale : ".causale",
        content : '<tbody> <tr> <td bgcolor="#ffffff"> <table width="100%" style="max-width: 680px;" role="presentation" border="0" cellspacing="0" cellpadding="0"> <tbody> <tr> <td style="padding: 20px;text-align: left;color: rgb(34, 144, 199);line-height: 15px;font-family: sans-serif;font-size: 20px;"> <div style="color: #2290C7;" class="ts">Dear <span class="ts-nominativo"></span>,</div><br> </td> </tr> </tbody> </table> </td> </tr> <tr> <td bgcolor="#ffffff"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 680px;"> <tbody> <tr> <td style="padding: 20px 20px 50px 20px;text-align: left;font-family: sans-serif;font-size: 15px;line-height: 20px;color: rgb(17, 27, 99);" class="customText">We are contacting you in regard to a new invoice that has been created on your account. You may find the invoice attached.<br>Total to pay : <strong class="total"></strong> * VAT included.  <br><br><div class="bk-details"></div><br>Kind Regards,<br><strong>Administrative secretary</strong> </td> </tr> </tbody> </table> </td> </tr> </tbody>',
        build : function(intestatario, doc, callback){

          try {
            if (!intestatario || !(intestatario instanceof Intestatario))
              throw new TypeError('TextTemplate - Error evaluating build function parameter data');
            if (!doc || !(doc instanceof Fattura))
              throw new TypeError('TextTemplate - Error evaluating build function parameter data');
            if (!callback)
              throw new TypeError('TextTemplate : build -This method needs a callback argument');

            var nominativo = intestatario.getFormalNominativo();
            var ftNominativo = doc.getNominativoPDFMatrix();

            if (!nominativo || nominativo === "" || !ftNominativo || ftNominativo === "")
              throw new TypeError('TextTemplate : build -Locazione nominativo or ftNominativo error');

            var causale = "Invoice n° " + ftNominativo + " " + nominativo;

            var string = this.content,
            content = $('<div/>').html("<div>" + string + "</div>").contents();
            content.find(this.rootNominativo).append(intestatario.getNominativo());

            switch (parseInt(doc.Societa)) {
              case 0:
                content.find(this.rootBkDetails).append(this.bk_details.finlibera.clone());
                break;
              case 1:
                content.find(this.rootBkDetails).append(this.bk_details.ecolibera.clone());
                content.find(this.rootCustomText).css('color', 'rgb(121,125,118)');
                break;
            }

            content.find(this.rootTotalInvoice).append(doc.getTotaleMatrix());
            content.find(this.rootCausale).append(causale);

            callback(content.first());
          } catch (e) {
            console.log(e.message);
          }

        }
      },
    },
    1 : {
      it : {
        subject : "Milanostanze - Fattura di primo ingresso",
        rootNominativo : ".ts-nominativo",
        rootCustomText : ".customText",
        rootRentPeriod : ".customText .rent-period",
        content : '<tbody> <tr> <td bgcolor="#ffffff"> <table width="100%" style="max-width: 680px;" role="presentation" border="0" cellspacing="0" cellpadding="0"> <tbody> <tr> <td style="padding: 20px;text-align: left;color: rgb(34, 144, 199);line-height: 15px;font-family: sans-serif;font-size: 20px;"> <div style="color: #2290C7;" class="ts">Gentile <span class="ts-nominativo"></span>,</div><br> </td> </tr> </tbody> </table> </td> </tr> <tr> <td bgcolor="#ffffff"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 680px;"> <tbody> <tr> <td style="padding: 20px 20px 50px 20px;text-align: left;font-family: sans-serif;font-size: 15px;line-height: 20px;color: #2290C7;" class="customText">Alleghiamo la fattura relativa al periodo <strong class="rent-period"></strong> di Sua competenza del contratto di locazione stipulato, secondo i termini stabiliti al punto 5). <br>Cordiali saluti,<br><strong>Segreteria Amministrativa</strong> </td> </tr> </tbody> </table> </td> </tr> </tbody>',
        build : function(intestatario, doc, callback){

          try {
            if (!intestatario || !(intestatario instanceof Intestatario))
              throw new TypeError('TextTemplate - Error evaluating build function parameter data');
            if (!doc || !(doc instanceof Fattura))
              throw new TypeError('TextTemplate - Error evaluating build function parameter data');
            if (!callback)
              throw new TypeError('TextTemplate : build -This method needs a callback argument');

            var string = this.content,
            content = $('<div/>').html("<div>" + string + "</div>").contents();
            content.find(this.rootNominativo).append(intestatario.getNominativo());

            var txt = doc.FatturaDettagli.getPeriodoLocazioneText();
            if (!txt || txt === "")
              throw new TypeError('TextTemplate : build -Locazione Text error');

            content.find(this.rootRentPeriod).append(txt);

            callback(content.first());
          } catch (e) {
            console.log(e.message);
          }

        }
      },
      en : {
        subject : "Milanostanze - First Rent Invoice",
        rootNominativo : ".ts-nominativo",
        rootCustomText : ".customText",
        rootRentPeriod : ".customText .rent-period",
        content : '<tbody> <tr> <td bgcolor="#ffffff"> <table width="100%" style="max-width: 680px;" role="presentation" border="0" cellspacing="0" cellpadding="0"> <tbody> <tr> <td style="padding: 20px;text-align: left;color: rgb(34, 144, 199);line-height: 15px;font-family: sans-serif;font-size: 20px;"> <div style="color: #2290C7;" class="ts">Dear <span class="ts-nominativo"></span>,</div><br> </td> </tr> </tbody> </table> </td> </tr> <tr> <td bgcolor="#ffffff"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 680px;"> <tbody> <tr> <td style="padding: 20px 20px 50px 20px;text-align: left;font-family: sans-serif;font-size: 15px;line-height: 20px;color: #2290C7;" class="customText">We are contacting you in regard to a new invoice that has been created on your account. You may find the invoice attached. This invoice is for the period <strong class="rent-period"></strong> according to your contract, point 5). <br>Kind Regards,<br><strong>Administrative secretary</strong> </td> </tr> </tbody> </table> </td> </tr> </tbody>',
        build : function(intestatario, doc, callback){

          try {
            if (!intestatario || !(intestatario instanceof Intestatario))
              throw new TypeError('TextTemplate - Error evaluating build function parameter data');
            if (!doc || !(doc instanceof Fattura))
              throw new TypeError('TextTemplate - Error evaluating build function parameter data');
            if (!callback)
              throw new TypeError('TextTemplate : build -This method needs a callback argument');

            var string = this.content,
            content = $('<div/>').html("<div>" + string + "</div>").contents();
            content.find(this.rootNominativo).append(intestatario.getNominativo());

            var txt = doc.FatturaDettagli.getPeriodoLocazioneText('en');
            if (!txt || txt === "")
              throw new TypeError('TextTemplate : build -Locazione Text error');

            content.find(this.rootRentPeriod).append(txt);

            callback(content.first());
          } catch (e) {
            console.log(e.message);
          }

        }
      },
    },
    2 : {
      it : {
        subject : "Milanostanze - Fattura di locazione",
        rootNominativo : ".ts-nominativo",
        rootCustomText : ".customText",
        rootRentPeriod : ".customText .rent-period",
        rootBkDetails : ".bk-details",
        rootTotalInvoice : ".total",
        bk_details : {
          finlibera : $('<div>Bonifico Bancario da intestare a <strong>Finlibera s.p.a.</strong><br> IBAN: <strong>IT80S0100501606000000000812</strong><br> Bic/Swift: <strong>BNLIITRR</strong><br> Nome Banca: <strong>Banca Nazionale Del Lavoro</strong><br> Causale : <strong class="causale"></strong> <br><br>Per qualsiasi chiarimento contattare il seguente indirizzo email : <strong>segreteria@finlibera.it</strong></div>'),
          ecolibera : $('<div>Bonifco Bancario intestato a <strong>Ecolibera Srl</strong><br> IBAN: <strong>IT88T0100501606000000001225</strong><br> Bic/Swift: <strong>BNLIITRR</strong><br> Nome Banca: <strong>Banca Nazionale Del Lavoro</strong><br> Causale : <strong class="causale"></strong> <br><br>Per qualsiasi chiarimento contattare il seguente indirizzo email : <strong>segreteria@finlibera.it</strong></div>')
        },
        rootCausale : ".causale",
        content : '<tbody> <tr> <td bgcolor="#ffffff"> <table width="100%" style="max-width: 680px;" role="presentation" border="0" cellspacing="0" cellpadding="0"> <tbody> <tr> <td style="padding: 20px;text-align: left;color: rgb(34, 144, 199);line-height: 15px;font-family: sans-serif;font-size: 20px;"> <div style="color: #2290C7;" class="ts">Gentile <span class="ts-nominativo"></span>,</div><br> </td> </tr> </tbody> </table> </td> </tr> <tr> <td bgcolor="#ffffff"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 680px;"> <tbody> <tr> <td style="padding: 20px 20px 50px 20px;text-align: left;font-family: sans-serif;font-size: 15px;line-height: 20px;color: #2290C7;" class="customText">Alleghiamo la fattura relativa al periodo <strong class="rent-period"></strong> di Sua competenza del contratto di locazione stipulato, secondo i termini stabiliti al punto 5). Le ricordiamo che il termine del pagamento è il giorno 1 del mese. <br>L&#39;importo totale dovuto è di <strong class="total"></strong> * IVA inclusa. <br><br><div class="bk-details"></div><br> Cordiali saluti,<br><strong>Segreteria Amministrativa</strong> </td> </tr> </tbody> </table> </td> </tr> </tbody>',
        build : function(intestatario, doc, callback){

          try {
            if (!intestatario || !(intestatario instanceof Intestatario))
              throw new TypeError('TextTemplate - Error evaluating build function parameter data');
            if (!doc || !(doc instanceof Fattura))
              throw new TypeError('TextTemplate - Error evaluating build function parameter data');
            if (!callback)
              throw new TypeError('TextTemplate : build -This method needs a callback argument');
            var txt = doc.FatturaDettagli.getPeriodoLocazioneText();
            if (!txt || txt === "")
              throw new TypeError('TextTemplate : build -Locazione Text error');

            var nominativo = intestatario.getFormalNominativo();
            var ftNominativo = doc.getNominativoPDFMatrix();

            if (!nominativo || nominativo === "" || !ftNominativo || ftNominativo === "")
              throw new TypeError('TextTemplate : build -Locazione nominativo or ftNominativo error');

            var causale = "Fattura n° " + ftNominativo + " " + nominativo;

            var string = this.content,
            content = $('<div/>').html("<div>" + string + "</div>").contents();
            content.find(this.rootNominativo).append(intestatario.getNominativo());

            switch (parseInt(doc.Societa)) {
              case 0:
                content.find(this.rootBkDetails).append(this.bk_details.finlibera.clone());
                break;
              case 1:
                content.find(this.rootBkDetails).append(this.bk_details.ecolibera.clone());
                break;
            }

            content.find(this.rootRentPeriod).append(txt);
            content.find(this.rootTotalInvoice).append(doc.getTotaleMatrix());
            content.find(this.rootCausale).append(causale);

            callback(content.first());
          } catch (e) {
            console.log(e.message);
          }

        }
      },
      en : {
        subject : "Milanostanze - Rent Invoice",
        rootNominativo : ".ts-nominativo",
        rootCustomText : ".customText",
        rootBkDetails : ".bk-details",
        rootRentPeriod : ".customText .rent-period",
        rootTotalInvoice : ".total",
        bk_details : {
          finlibera : $('<div>Bank Transfer Wire to <strong>Finlibera s.p.a.</strong><br> IBAN: <strong>IT80S0100501606000000000812</strong><br> Bic/Swift: <strong>BNLIITRR</strong><br> Bank name : <strong>Banca Nazionale Del Lavoro</strong><br> Description of transfer : <strong class="causale"></strong> <br><br>Should you need any further information/assistance , please do not hesitate to contact us at the following email : <strong>segreteria@finlibera.it</strong></div>'),
          ecolibera : $('<div>Bank Transfer Wire to <strong>Ecolibera Srl</strong><br> IBAN: <strong>IT88T0100501606000000001225</strong><br> Bic/Swift: <strong>BNLIITRR</strong><br> Bank name : <strong>Banca Nazionale Del Lavoro</strong><br> Description of transfer : <strong class="causale"></strong> <br><br>Should you need any further information/assistance , please do not hesitate to contact us at the following email : <strong>segreteria@finlibera.it</strong></div>')
        },
        rootCausale : ".causale",
        content : '<tbody> <tr> <td bgcolor="#ffffff"> <table width="100%" style="max-width: 680px;" role="presentation" border="0" cellspacing="0" cellpadding="0"> <tbody> <tr> <td style="padding: 20px;text-align: left;color: rgb(34, 144, 199);line-height: 15px;font-family: sans-serif;font-size: 20px;"> <div style="color: #2290C7;" class="ts">Dear <span class="ts-nominativo"></span>,</div><br> </td> </tr> </tbody> </table> </td> </tr> <tr> <td bgcolor="#ffffff"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 680px;"> <tbody> <tr> <td style="padding: 20px 20px 50px 20px;text-align: left;font-family: sans-serif;font-size: 15px;line-height: 20px;color: #2290C7;" class="customText">We are contacting you in regard to a new invoice that has been created on your account. You may find the invoice attached. This invoice is for the period <strong class="rent-period"></strong> according to your contract, point 5). We remind you that each payment period has as a deadline the first day of the month. <br>Total to pay : <strong class="total"></strong> * VAT included.  <br><br><div class="bk-details"></div><br>Kind Regards,<br><strong>Administrative secretary</strong> </td> </tr> </tbody> </table> </td> </tr> </tbody>',
        build : function(intestatario, doc, callback){

          try {
            if (!intestatario || !(intestatario instanceof Intestatario))
              throw new TypeError('TextTemplate - Error evaluating build function parameter data');
            if (!doc || !(doc instanceof Fattura))
              throw new TypeError('TextTemplate - Error evaluating build function parameter data');
            if (!callback)
              throw new TypeError('TextTemplate : build -This method needs a callback argument');

            var txt = doc.FatturaDettagli.getPeriodoLocazioneText('en');
            if (!txt || txt === "")
              throw new TypeError('TextTemplate : build -Locazione Text error');

            var nominativo = intestatario.getFormalNominativo();
            var ftNominativo = doc.getNominativoPDFMatrix();

            if (!nominativo || nominativo === "" || !ftNominativo || ftNominativo === "")
              throw new TypeError('TextTemplate : build -Locazione nominativo or ftNominativo error');

            var causale = "Invoice n° " + ftNominativo + " " + nominativo;

            var string = this.content,
            content = $('<div/>').html("<div>" + string + "</div>").contents();
            content.find(this.rootNominativo).append(intestatario.getNominativo());

            switch (parseInt(doc.Societa)) {
              case 0:
                content.find(this.rootBkDetails).append(this.bk_details.finlibera.clone());
                break;
              case 1:
                content.find(this.rootBkDetails).append(this.bk_details.ecolibera.clone());
                break;
            }

            content.find(this.rootRentPeriod).append(txt);
            content.find(this.rootTotalInvoice).append(doc.getTotaleMatrix());
            content.find(this.rootCausale).append(causale);

            callback(content.first());
          } catch (e) {
            console.log(e.message);
          }

        }
      },
    },
    3 : {
      it : {
        subject : "Milanostanze - Conteggi finali di locazione",
        rootNominativo : ".ts-nominativo",
        rootTotFatturato : ".totFatturato",
        rootDaVersare : ".totDaVersare",
        rootVersato : ".totVersato",
        rootDiffFatturatoVersato : ".diffFatturatoVersato",
        rootTotFatturaChiusura : ".totFatturaChiusura",
        rootLastDayFatturato : ".last-day-fatturato",
        rootLastDayVersato : ".last-day-versato",
        rootCauzione : ".totCauzione",
        rootSecCauzione : ".sec-cauzione",
        bk_details : {
          finlibera : $('<div>Bonifico Bancario da intestare a <strong>Finlibera s.p.a.</strong><br> IBAN: <strong>IT80S0100501606000000000812</strong><br> Bic/Swift: <strong>BNLIITRR</strong><br> Nome Banca: <strong>Banca Nazionale Del Lavoro</strong><br> Causale : <strong class="causale"></strong> <br></div>'),
          ecolibera : $('<div>Bonifco Bancario intestato a <strong>Ecolibera Srl</strong><br> IBAN: <strong>IT88T0100501606000000001225</strong><br> Bic/Swift: <strong>BNLIITRR</strong><br> Nome Banca: <strong>Banca Nazionale Del Lavoro</strong><br> Causale : <strong class="causale"></strong> <br></div>')
        },
        rootBkDetails : ".bk-details",
        rootCausale : ".causale",
        content : $('<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 680px;"> <tbody> <tr> <td bgcolor="#ffffff"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 20px 20px 20px;text-align: left;"> <h1 style="margin: 0; font-family: sans-serif; font-size: 24px; line-height: 125%; color: #333333; font-weight: normal;">Gentile <span class="ts-nominativo"></span>,</h1> </td> </tr> <tr> <td class="intro" style="padding: 0 20px 20px;font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;text-align: justify;"> <p style="margin: 0;">Le inviamo i conteggi di fine locazione da cui risultano a nostro credito euro <span><strong class="totDaVersare"></strong></span></p> </td> </tr><tr> <td style="padding: 0 20px 0px;font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;text-align: justify;"><h2 style="margin: 0;font-family: sans-serif;font-size: 18px;line-height: 125%;color: #555555;font-weight: bold; border-bottom:  2px solid;">Riepilogo</h2> </td> </tr><tr> <td bgcolor="#ffffff" align="left" height="100%" valign="top" width="100%" style=""> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="left" width="660"> <tr> <td align="left" valign="top" width="660"> <![endif]--> <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="left" width="100%" style="max-width:660px;"> <tbody><tr> <td align="left" valign="top" style="font-size:0;padding: 10px 0;"> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="left" width="660"> <tr> <td align="left" valign="top" width="330"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;" > <p style="margin: 0;"><strong>Importo totale fatturato al <span class="last-day-fatturato"></span> :</strong></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> <td align="left" valign="top" width="330"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px; text-align : justify;" > <p style="margin: 0;"><span class="totFatturato"></span> euro* (Importi già fatturati, compresi i bolli da 2 euro applicati su tutte le fatture)</p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr> </tbody></table> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr><tr> <td bgcolor="#ffffff" align="left" height="100%" valign="top" width="100%"> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="left" width="660"> <tr> <td align="left" valign="top" width="660"> <![endif]--> <table class="paid_sec" role="presentation" border="0" cellpadding="0" cellspacing="0" align="left" width="100%" style="max-width:660px;"> <tbody><tr> <td class="paid_sec_td" align="left" valign="top" style="font-size:0; padding: 10px 0;"> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="left" width="660"> <tr> <td align="left" valign="top" width="330"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;" > <p style="margin: 0;"><strong>Importo totale pagato al <span class="last-day-versato"></span> :</strong></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> <td align="left" valign="top" width="330"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;" > <p style="margin: 0;"><span class="totVersato"></span> euro*</p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr> </tbody></table> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr><tr> <td bgcolor="#ffffff" align="left" height="100%" valign="top" width="100%"> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="left" width="660"> <tr> <td align="left" valign="top" width="660"> <![endif]--> <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="left" width="100%" style="max-width:660px;"> <tbody><tr> <td align="left" valign="top" style="font-size:0; padding: 10px 0;"> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="left" width="660"> <tr> <td align="left" valign="top" width="330"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;" > <p style="margin: 0;"><strong>Differenza tra fatturato e pagato :</strong></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> <td align="left" valign="top" width="330"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;" > <p style="margin: 0;"><span class="diffFatturatoVersato"></span> euro</p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr> </tbody></table> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr><tr> <td bgcolor="#ffffff" align="left" height="100%" valign="top" width="100%"> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="left" width="660"> <tr> <td align="left" valign="top" width="660"> <![endif]--> <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="left" width="100%" style="max-width:660px;"> <tbody><tr> <td align="left" valign="top" style="font-size:0; padding: 10px 0;"> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="left" width="660"> <tr> <td align="left" valign="top" width="330"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;" > <p style="margin: 0;"><strong>Fattura finale di chiusura contratto :</strong></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> <td align="left" valign="top" width="330"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;" > <p style="margin: 0;"><span class="totFatturaChiusura"></span> euro</p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr> </tbody></table> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr><tr> <td bgcolor="#ffffff" align="left" height="100%" valign="top" width="100%"> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="left" width="660"> <tr> <td align="left" valign="top" width="660"> <![endif]--> <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="left" width="100%" style="max-width:660px;"> <tbody><tr> <td align="left" valign="top" style="font-size:0; padding: 10px 0;" bgcolor="#f8f8f8"> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="left" width="660"> <tr> <td align="left" valign="top" width="330"> <![endif]--> <div style="display:inline-block;margin: 0 -2px;width:100%;min-width:200px;max-width:330px;vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table class="account-balance" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;" > <p style="margin: 0;"><strong>Totale da pagare :</strong></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> <td align="left" valign="top" width="330"> <![endif]--> <div style="display:inline-block;margin: 0 -2px;width:100%;min-width:200px;max-width:330px;vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;" > <p style="margin: 0;"><strong><span class="totDaVersare"> </span> euro</strong></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr> </tbody></table> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr><tr> <td class="sec-cauzione" bgcolor="#ffffff" align="left" height="100%" valign="top" width="100%"> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="left" width="660"> <tr> <td align="left" valign="top" width="660"> <![endif]--> <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="left" width="100%" style="max-width:660px;"> <tbody><tr> <td align="left" valign="top" style="font-size:0; padding: 10px 0;"> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="left" width="660"> <tr> <td align="left" valign="top" width="330"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table class="amount-balance-result" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;" > <p style="margin: 0;"><strong>Le restituiamo l’intero importo della cauzione a suo credito pari a : </strong></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> <td align="left" valign="top" width="330"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;" > <p style="margin: 0;"><span class="totCauzione"></span> euro</p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr><tr> <td class="bank-details" style="padding: 10px 10px 10px 20px;font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;text-align: justify;"> <p style="margin: 0;"><strong>dopo che ci invia all’indirizzo mail segreteria@finlibera.it la seguente documentazione:</strong></p> </td> </tr><tr> <td class="positive-balance" style="padding: 10px 40px 40px;font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;text-align: justify;"> <p style="margin: 0;"><strong>1) </strong>Ricevuta del bonifico a nostro favore di: <span class="totDaVersare"><strong></strong></span></p><br><div class="bk-details" style="padding-left: 20px;"></div><br><p style="margin-top: 5;"><strong>2) </strong>Le sue coordinate bancarie complete di: <strong>Nome intestatario - Codice IBAN - BIC/SWIFT</strong></p> </td> </tr> </tbody></table> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr><tr> <td style="padding: 20px 20px 0px 20px;font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;text-align: justify;"><h2 style="margin: 0;font-family: sans-serif;font-size: 18px;line-height: 125%;font-weight: bold;border-bottom: 2px solid;">Storico pagamenti :</h2> </td> </tr><tr> <td bgcolor="#ffffff" align="left" height="100%" valign="top" width="100%" style=""> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="left" width="660"> <tr> <td align="left" valign="top" width="660"> <![endif]--> <table class="storico-pagamenti" role="presentation" border="0" cellpadding="0" cellspacing="0" align="left" width="100%" style="max-width:660px;"> <tbody> </tbody></table> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr><tr> <td style="padding: 40px 40px 40px;font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;text-align: justify;"> <p style="margin: 0;">Cordiali saluti,</p><span><strong>Segreteria Amministrativa</strong></span> </td> </tr> </tbody></table> </td> </tr> </tbody> </table>'),
        build : function(intestatario, doc, callback){
          var self = this;
          try {
            if (!intestatario || !(intestatario instanceof Intestatario))
              throw new TypeError('TextTemplate - Error evaluating build function parameter data');
            if (!doc || !(doc instanceof Fattura))
              throw new TypeError('TextTemplate - Error evaluating build function parameter data');
            if(!doc.FatturaDettagli || !doc.FatturaDettagli.FatturaDettagli || !doc.FatturaDettagli.FatturaDettagli.length > 0)
              throw new TypeError('TextTemplate - Cannot find FatturaDettagli');
            if (!callback)
              throw new TypeError('TextTemplate : build -This method needs a callback argument');

            var nominativo = intestatario.getFormalNominativo();
            var ftNominativo = doc.getNominativoPDFMatrix();

            if (!nominativo || nominativo === "" || !ftNominativo || ftNominativo === "")
              throw new TypeError('TextTemplate : build -Locazione nominativo or ftNominativo error');

            var causale = "Fattura n° " + ftNominativo + " " + nominativo;
            var fd = doc.FatturaDettagli.FatturaDettagli;
            var ins = new Inquilino_Stanza(fd[0].IdInquilinoStanze);
            ins.LoadRelationship(function(){
              ins.loadAccountBalance(function(data){
                var bals = data.Balance;
                var cauzione = new Number(ins.Cauzione);
                var canone = new Number(ins.Canone);
                var totFatturaChiusura = new Number(doc.Totale);
                var societa = doc.Societa;
                var totFatturato = new Number(data.TotFatturato - totFatturaChiusura);
                var totVersato = new Number(data.TotVersato);
                var totNonContabilizzato = new Number(ins.ImportoNonContabilizzato);
                totVersato -= totNonContabilizzato;
                var totDiffFtVers = totFatturato - totVersato;
                var spec_inc = ins.SpecificaImportoNonContabilizzato;
                var totDaVersare = ((totFatturaChiusura + totDiffFtVers)-totNonContabilizzato);
                var curdate = new Date();
                var isPrevIns = data.isPrevIns;
                var hasPrevIns = data.hasPrevIns;

                if(hasPrevIns){

                  switch (parseInt(ins.IdContractDocs)) {
                    case 1:
                    case 10:
                    case 17:
                    case 24:
                    case 32:
                      cauzione = canone * 3;
                      break;
                    case 2:
                    case 3:
                    case 20:
                    case 22:
                    case 27:
                    case 29:
                      cauzione = canone;
                      break;
                  }

                }

                bals.sort(function(a,b){
                  // Turn your strings into dates, and then subtract them
                  // to get a value that is either negative, positive, or zero.
                  return new Date(a.Fattura.Data) - new Date(b.Fattura.Data);
                });

                var str = self.content.clone();
                str.find(self.rootNominativo).append(intestatario.getNominativo());
                str.find(self.rootTotFatturato).append(totFatturato.formatMoney(2));
                str.find(self.rootDaVersare).append(totDaVersare.formatMoney(2));
                str.find(self.rootVersato).append(totVersato.formatMoney(2));

                if (totNonContabilizzato > 0) {
                  totDiffFtVers = totFatturato - (totVersato + totNonContabilizzato);
                }

                str.find(self.rootDiffFatturatoVersato).append(totDiffFtVers.formatMoney(2));
                str.find(self.rootTotFatturaChiusura).append(totFatturaChiusura.formatMoney(2));
                str.find(self.rootCauzione).append(cauzione.formatMoney(2));
                str.find(self.rootLastDayFatturato).append(curdate.ddmmyyyy());
                str.find(self.rootLastDayVersato).append(curdate.ddmmyyyy());

                if(totNonContabilizzato > 0 && spec_inc){
                  var inc_struct = $('<div class="nonContabilizzato_sec"><div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;"> <p class="spec-inc" style="margin: 0;"><strong></strong></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div><div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;"> <p class="inc-amount" style="margin: 0;"><span></span> euro</p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div><div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;"> <p class="inc-tot-versato__text" style="margin: 0;"><strong></strong></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div><div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;"> <p class="inc-tot-versato__amount" style="margin: 0;"><span></span> euro</p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div></div>');

                  var inc_struct_clone = inc_struct.clone();
                  var inc_totVersato_text = "Totale Versato : ";
                  var inc_totVersato_amount = totNonContabilizzato + totVersato;
                  var inc_totVersato_sub_text = totVersato.formatMoney(2) + ' euro + ' + totNonContabilizzato.formatMoney(2) + ' euro = ' + inc_totVersato_amount.formatMoney(2);

                  inc_struct_clone.find('.spec-inc strong').append(spec_inc + ' :');
                  inc_struct_clone.find('.inc-amount span').append(totNonContabilizzato.formatMoney(2));
                  inc_struct_clone.find('.inc-tot-versato__text strong').append(inc_totVersato_text);
                  inc_struct_clone.find('.inc-tot-versato__amount span').append(inc_totVersato_sub_text);

                  str.find('table.paid_sec td.paid_sec_td').append(inc_struct_clone);
                }

                switch (parseInt(societa)) {
                  case 0:
                    str.find(self.rootBkDetails).append(self.bk_details.finlibera.clone());
                    str.find(self.rootCausale).append(nominativo);
                    break;
                  case 1:
                    str.find(self.rootBkDetails).append(self.bk_details.ecolibera.clone());
                    str.find(self.rootCausale).append(nominativo);
                    break;
                }

                if(totDaVersare < 0){
                  totDaVersare = -totDaVersare;
                  var deposit_overpaid = totDaVersare + cauzione;
                  str.find('.intro').html($('<p style="margin: 0;">Le inviamo l’ultima fattura relativa alla Sua locazione e i conteggi di fine locazione da cui risultano a vostro credito euro <span><strong class="totDaVersare"></strong></span></p>'));
                  str.find(self.rootDaVersare).html(totDaVersare.formatMoney(2));
                  str.find('.account-balance td p strong').html('Totale a credito : ');
                  str.find('.amount-balance-result td p strong').html('Le restituiamo l’intero importo della cauzione e del suo credito pari a : ');
                  str.find(self.rootCauzione).html(deposit_overpaid.formatMoney(2));
                  str.find('.positive-balance').html($('<p style="margin-top: 5;"><strong>1) </strong>Le sue coordinate bancarie complete di: <strong>Nome intestatario - Codice IBAN - BIC/SWIFT</strong></p>'));
                }

                if(isPrevIns){
                  str.find(self.rootSecCauzione).remove();
                }

                var riepilogo_row_struct = $('<tr> <td bgcolor="#ffffff" align="center" height="100%" valign="top" width="100%" style=""> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" width="660"> <tr> <td align="center" valign="top" width="660"> <![endif]--> <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" width="100%" style="max-width:660px;"> <tbody><tr> <td bgcolor="#ffffff" align="center" valign="top" style="font-size:0;padding: 10px 0 20px;"> </td> </tr><tr> <td bgcolor="#f8f8f8" align="center" valign="top" style="font-size:0;padding: 10px 0 40px;"> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" width="660"> <tr> <td align="left" valign="top" width="220"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; max-width:33.33%; min-width:220px; vertical-align:top; width:100%;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px;"> <table class="invoice" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody><tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p style="margin: 0;border-bottom: 2px solid #555555;"><strong><span>FATTURA</span></strong></p> </td> </tr> <tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p class="ft-nominativo" style="margin: 0;"><span></span></p> </td> </tr><tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p class="tot-fattura" style="margin: 0;"><span></span></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> <td align="left" valign="top" width="220"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; max-width:33.33%; min-width:220px; vertical-align:top; width:100%;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px;"> <table class="transactions" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> <td align="left" valign="top" width="220"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; max-width:33.33%; min-width:220px; vertical-align:top; width:100%;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px;"> <table class="diff-transactions" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody><tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p style="margin: 0;border-bottom: 2px solid #555555;"><strong><span>DIFFERENZA</span></strong></p> </td> </tr> <tr> <td class="diff-transactions__amount" style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p style="margin: 0;"><span></span></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr><tr> <td bgcolor="#ffffff" align="center" valign="top" style="font-size:0;padding: 10px 0 20px;"> </td> </tr> </tbody></table> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr>');

                var pagamento_title = $('<tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p style="margin: 0;border-bottom: 2px solid #555555;"><strong><span>PAGATO</span></strong></p> </td> </tr>');

                var ramo_struct = $('<tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p class="transaction-row" style="margin: 0;"><span class="transaction-row__amount"></span><span class="transaction-row__date"></span></p> </td> </tr>');

                for (var i = 0; i < bals.length; i++) {
                  var bal = bals[i];
                  var riepilogo_row = riepilogo_row_struct.clone();
                  var ft_tmp = bal.Fattura;
                  var ft = new Fattura();
                  ft_tmp = $.extend(ft, ft_tmp);
                  var tot_pagato_ft = 0;
                  var diff_pagato_dov_ft = 0;

                  if(parseInt(ft.Tipologia) !== 3){
                    var rami = bal.Rami;
                    rami.sort(function(a,b){
                      // Turn your strings into dates, and then subtract them
                      // to get a value that is either negative, positive, or zero.
                      return new Date(a.DataOperazione) - new Date(b.DataOperazione);
                    });

                    var ft_nominativo = ft.getNominativo();
                    var ft_totale = new Number(ft.Totale);
                    var tipoDoc = 'Ft. ';
                    var ft_totale_txt = ft_totale;

                    if(parseInt(ft.Tipologia) === 4){
                      ft_totale_txt = 0 - ft_totale_txt;
                    }

                    riepilogo_row.find('table.invoice .ft-nominativo span').append(ft_nominativo);
                    riepilogo_row.find('table.invoice .tot-fattura span').append('Totale Ft : ' + ft_totale_txt.formatMoney(2) + ' €');

                    if(parseInt(ft.Tipologia) === 4){
                      ft_totale = -ft_totale;
                      tipoDoc = 'Nota di credito n. ';
                    }

                    //if(parseInt(ft.Tipologia) === 0 && ft.FatturaDettagli && ft.FatturaDettagli.FatturaDettagli && ft.FatturaDettagli.FatturaDettagli.length > 0){
                      ft.Linking();
                      var dataFattura = new Date(ft.Data);
                      riepilogo_row.find('table.invoice .ft-nominativo span').html(tipoDoc + ft.Numero + ' del ' + dataFattura.ddmmyyyy());
                      var fdis = ft.FatturaDettagli.FatturaDettagli;
                      var fdi_struct = $('<p class="ft-fdi" style="margin: 0;"><span></span></p>');

                      for (var z = 0; z < fdis.length; z++) {
                        var fdi_struct_clone = fdi_struct.clone();
                        var fdi_matrix = fdis[z].getPDFMatrix();
                        fdi_struct_clone.find('span').append('- ' + fdi_matrix.Title);
                        riepilogo_row.find('table.invoice .ft-nominativo').before().append(fdi_struct_clone);
                      }
                    //}

                    for (var x = 0; x < rami.length; x++) {
                      var ramo = rami[x];
                      var ramo_struct_clone = ramo_struct.clone();

                      if(x === 0){
                        riepilogo_row.find('table.transactions > tbody').append(pagamento_title.clone());
                      }

                      var importo = new Number(ramo.Importo);

                      if(i === 0 && x === 0 && totNonContabilizzato && totNonContabilizzato > 0){
                        importo += totNonContabilizzato;
                      }

                      tot_pagato_ft += importo;
                      var text_Importo = importo.formatMoney(2);

                      var dataOperazione = new Date(ramo.DataOperazione);
                      var text_DataOperazione = ' - ' + dataOperazione.ddmmyyyy();

                      ramo_struct_clone.find('.transaction-row span.transaction-row__amount').append(text_Importo + ' €');
                      ramo_struct_clone.find('.transaction-row span.transaction-row__date').append(text_DataOperazione);

                      riepilogo_row.find('table.transactions > tbody').append(ramo_struct_clone);

                    }

                    diff_pagato_dov_ft = tot_pagato_ft - ft_totale;
                    var diff_text = diff_pagato_dov_ft.formatMoney(2) + ' €';
                    if(diff_pagato_dov_ft > 0){
                      diff_text = '+' + diff_text;
                      riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount').css('color', '#50cc41');
                      riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount').css('font-weight', 'bold');
                    }else if(diff_pagato_dov_ft < 0){
                      riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount').css('color', '#ff0606');
                      riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount').css('font-weight', 'bold');
                    }
                    riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount p span').append(diff_text);

                    str.find('table.storico-pagamenti > tbody').append(riepilogo_row);

                  }
                }

                callback(str);
              });
            });
          } catch (e) {
            console.log(e.message);
          }

        },
        buildNoInvoice : function(ins, callback){
          var self = this;
          try {
            if (!ins || !(ins instanceof Inquilino_Stanza))
              throw new TypeError('TextTemplate - Error evaluating build function parameter data');

            if (!callback)
              throw new TypeError('TextTemplate : build -This method needs a callback argument');

            if(!ins.Inquilino)
              throw new TypeError('TextTemplate - buildNoInvoice : Inquilino undefined!');

            if(!ins.Stanza)
              throw new TypeError('TextTemplate - buildNoInvoice : Stanza undefined!');

            if(!ins.Stanza.Appartamento)
              throw new TypeError('TextTemplate - buildNoInvoice : ins.Stanza.Appartamento undefined!');

            var inquilino = ins.Inquilino;
            var lang = inquilino.Lang;
            var stanza = ins.Stanza;
            var apt = stanza.Appartamento;

            var nominativo = inquilino.getFormalNominativo();

            if (!nominativo || nominativo === "")
              throw new TypeError('TextTemplate : build - Locazione nominativo error');

            //ins.LoadRelationship(function(){
              ins.loadAccountBalance(function(data){
                var bals = data.Balance;
                var cauzione = new Number(ins.Cauzione);
                var canone = new Number(ins.Canone);
                var totFatturaChiusura = 0;
                var societa = apt.Societa;
                var totFatturato = new Number(data.TotFatturato - totFatturaChiusura);
                var totVersato = new Number(data.TotVersato);
                var totNonContabilizzato = new Number(ins.ImportoNonContabilizzato);
                totVersato -= totNonContabilizzato;
                var totDiffFtVers = totFatturato - totVersato;
                var spec_inc = ins.SpecificaImportoNonContabilizzato;
                var totDaVersare = ((totFatturaChiusura + totDiffFtVers)-totNonContabilizzato);
                var curdate = new Date();

                var isPrevIns = data.isPrevIns;
                var hasPrevIns = data.hasPrevIns;

                if(hasPrevIns){

                  switch (parseInt(ins.IdContractDocs)) {
                    case 1:
                    case 10:
                    case 17:
                    case 24:
                    case 32:
                      cauzione = canone * 3;
                      break;
                    case 2:
                    case 3:
                    case 20:
                    case 22:
                    case 27:
                    case 29:
                      cauzione = canone;
                      break;
                  }

                }



                bals.sort(function(a,b){
                  // Turn your strings into dates, and then subtract them
                  // to get a value that is either negative, positive, or zero.
                  return new Date(a.Fattura.Data) - new Date(b.Fattura.Data);
                });

                var str = self.content.clone();
                str.find(self.rootNominativo).append(inquilino.getNominativo());
                str.find(self.rootTotFatturato).append(totFatturato.formatMoney(2));
                str.find(self.rootDaVersare).append(totDaVersare.formatMoney(2));
                str.find(self.rootVersato).append(totVersato.formatMoney(2));

                if (totNonContabilizzato > 0) {
                  totDiffFtVers = totFatturato - (totVersato + totNonContabilizzato);
                }

                str.find(self.rootDiffFatturatoVersato).append(totDiffFtVers.formatMoney(2));
                str.find(self.rootTotFatturaChiusura).append(totFatturaChiusura.formatMoney(2));
                str.find(self.rootCauzione).append(cauzione.formatMoney(2));
                str.find(self.rootLastDayFatturato).append(curdate.ddmmyyyy());
                str.find(self.rootLastDayVersato).append(curdate.ddmmyyyy());

                if(totNonContabilizzato > 0 && spec_inc){
                  var inc_struct = $('<div class="nonContabilizzato_sec"><div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;"> <p class="spec-inc" style="margin: 0;"><strong></strong></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div><div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;"> <p class="inc-amount" style="margin: 0;"><span></span> euro</p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div><div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;"> <p class="inc-tot-versato__text" style="margin: 0;"><strong></strong></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div><div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;"> <p class="inc-tot-versato__amount" style="margin: 0;"><span></span> euro</p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div></div>');

                  var inc_struct_clone = inc_struct.clone();
                  var inc_totVersato_text = "Totale Versato : ";
                  var inc_totVersato_amount = totNonContabilizzato + totVersato;
                  var inc_totVersato_sub_text = totVersato.formatMoney(2) + ' euro + ' + totNonContabilizzato.formatMoney(2) + ' euro = ' + inc_totVersato_amount.formatMoney(2);

                  inc_struct_clone.find('.spec-inc strong').append(spec_inc + ' :');
                  inc_struct_clone.find('.inc-amount span').append(totNonContabilizzato.formatMoney(2));
                  inc_struct_clone.find('.inc-tot-versato__text strong').append(inc_totVersato_text);
                  inc_struct_clone.find('.inc-tot-versato__amount span').append(inc_totVersato_sub_text);

                  str.find('table.paid_sec td.paid_sec_td').append(inc_struct_clone);
                }

                switch (parseInt(societa)) {
                  case 0:
                    str.find(self.rootBkDetails).append(self.bk_details.finlibera.clone());
                    str.find(self.rootCausale).append(nominativo);
                    break;
                  case 1:
                    str.find(self.rootBkDetails).append(self.bk_details.ecolibera.clone());
                    str.find(self.rootCausale).append(nominativo);
                    break;
                }

                if(totDaVersare < 0){
                  totDaVersare = -totDaVersare;
                  var deposit_overpaid = totDaVersare + cauzione;
                  str.find('.intro').html($('<p style="margin: 0;">Le inviamo l’ultima fattura relativa alla Sua locazione e i conteggi di fine locazione da cui risultano a vostro credito euro <span><strong class="totDaVersare"></strong></span></p>'));
                  str.find(self.rootDaVersare).html(totDaVersare.formatMoney(2));
                  str.find('.account-balance td p strong').html('Totale a credito : ');
                  str.find('.amount-balance-result td p strong').html('Le restituiamo l’intero importo della cauzione e del suo credito pari a : ');
                  str.find(self.rootCauzione).html(deposit_overpaid.formatMoney(2));
                  str.find('.positive-balance').html($('<p style="margin-top: 5;"><strong>1) </strong>Le sue coordinate bancarie complete di: <strong>Nome intestatario - Codice IBAN - BIC/SWIFT</strong></p>'));
                }else if(totDaVersare === 0){
                  totDaVersare = -totDaVersare;
                  var deposit_overpaid = totDaVersare + cauzione;
                  //str.find('.intro').html($('<p style="margin: 0;">Le inviamo l’ultima fattura relativa alla Sua locazione e i conteggi di fine locazione da cui risultano a vostro credito euro <span><strong class="totDaVersare"></strong></span></p>'));
                  str.find(self.rootDaVersare).html(totDaVersare.formatMoney(2));
                  //str.find('.account-balance td p strong').html('Totale a credito : ');
                  str.find('.amount-balance-result td p strong').html('Le restituiamo l’intero importo della cauzione : ');
                  str.find(self.rootCauzione).html(deposit_overpaid.formatMoney(2));
                  str.find('.positive-balance').html($('<p style="margin-top: 5;"><strong>1) </strong>Le sue coordinate bancarie complete di: <strong>Nome intestatario - Codice IBAN - BIC/SWIFT</strong></p>'));
                }

                if(isPrevIns){
                  str.find(self.rootSecCauzione).remove();
                }

                var riepilogo_row_struct = $('<tr> <td bgcolor="#ffffff" align="center" height="100%" valign="top" width="100%" style=""> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" width="660"> <tr> <td align="center" valign="top" width="660"> <![endif]--> <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" width="100%" style="max-width:660px;"> <tbody><tr> <td bgcolor="#ffffff" align="center" valign="top" style="font-size:0;padding: 10px 0 20px;"> </td> </tr><tr> <td bgcolor="#f8f8f8" align="center" valign="top" style="font-size:0;padding: 10px 0 40px;"> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" width="660"> <tr> <td align="left" valign="top" width="220"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; max-width:33.33%; min-width:220px; vertical-align:top; width:100%;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px;"> <table class="invoice" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody><tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p style="margin: 0;border-bottom: 2px solid #555555;"><strong><span>FATTURA</span></strong></p> </td> </tr> <tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p class="ft-nominativo" style="margin: 0;"><span></span></p> </td> </tr><tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p class="tot-fattura" style="margin: 0;"><span></span></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> <td align="left" valign="top" width="220"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; max-width:33.33%; min-width:220px; vertical-align:top; width:100%;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px;"> <table class="transactions" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> <td align="left" valign="top" width="220"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; max-width:33.33%; min-width:220px; vertical-align:top; width:100%;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px;"> <table class="diff-transactions" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody><tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p style="margin: 0;border-bottom: 2px solid #555555;"><strong><span>DIFFERENZA</span></strong></p> </td> </tr> <tr> <td class="diff-transactions__amount" style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p style="margin: 0;"><span></span></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr><tr> <td bgcolor="#ffffff" align="center" valign="top" style="font-size:0;padding: 10px 0 20px;"> </td> </tr> </tbody></table> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr>');

                var pagamento_title = $('<tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p style="margin: 0;border-bottom: 2px solid #555555;"><strong><span>PAGATO</span></strong></p> </td> </tr>');

                var ramo_struct = $('<tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p class="transaction-row" style="margin: 0;"><span class="transaction-row__amount"></span><span class="transaction-row__date"></span></p> </td> </tr>');

                for (var i = 0; i < bals.length; i++) {
                  var bal = bals[i];
                  var riepilogo_row = riepilogo_row_struct.clone();
                  var ft_tmp = bal.Fattura;
                  var ft = new Fattura();
                  ft_tmp = $.extend(ft, ft_tmp);
                  var tot_pagato_ft = 0;
                  var diff_pagato_dov_ft = 0;

                  if(parseInt(ft.Tipologia) !== 3){
                    var rami = bal.Rami;
                    rami.sort(function(a,b){
                      // Turn your strings into dates, and then subtract them
                      // to get a value that is either negative, positive, or zero.
                      return new Date(a.DataOperazione) - new Date(b.DataOperazione);
                    });

                    var ft_nominativo = ft.getNominativo();
                    var ft_totale = new Number(ft.Totale);
                    var tipoDoc = 'Ft. ';
                    var ft_totale_txt = ft_totale;

                    if(parseInt(ft.Tipologia) === 4){
                      ft_totale_txt = 0 - ft_totale_txt;
                    }

                    riepilogo_row.find('table.invoice .ft-nominativo span').append(ft_nominativo);
                    riepilogo_row.find('table.invoice .tot-fattura span').append('Totale Ft : ' + ft_totale_txt.formatMoney(2) + ' €');

                    if(parseInt(ft.Tipologia) === 4){
                      ft_totale = -ft_totale;
                      tipoDoc = 'Nota di credito n. ';
                    }

                    //if(parseInt(ft.Tipologia) === 0 && ft.FatturaDettagli && ft.FatturaDettagli.FatturaDettagli && ft.FatturaDettagli.FatturaDettagli.length > 0){
                      ft.Linking();
                      var dataFattura = new Date(ft.Data);
                      riepilogo_row.find('table.invoice .ft-nominativo span').html(tipoDoc + ft.Numero + ' del ' + dataFattura.ddmmyyyy());
                      var fdis = ft.FatturaDettagli.FatturaDettagli;
                      var fdi_struct = $('<p class="ft-fdi" style="margin: 0;"><span></span></p>');

                      for (var z = 0; z < fdis.length; z++) {
                        var fdi_struct_clone = fdi_struct.clone();
                        var fdi_matrix = fdis[z].getPDFMatrix();
                        fdi_struct_clone.find('span').append('- ' + fdi_matrix.Title);
                        riepilogo_row.find('table.invoice .ft-nominativo').before().append(fdi_struct_clone);
                      }
                    //}

                    for (var x = 0; x < rami.length; x++) {
                      var ramo = rami[x];
                      var ramo_struct_clone = ramo_struct.clone();

                      if(x === 0){
                        riepilogo_row.find('table.transactions > tbody').append(pagamento_title.clone());
                      }

                      var importo = new Number(ramo.Importo);

                      if(i === 0 && x === 0 && totNonContabilizzato && totNonContabilizzato > 0){
                        importo += totNonContabilizzato;
                      }

                      tot_pagato_ft += importo;
                      var text_Importo = importo.formatMoney(2);

                      var dataOperazione = new Date(ramo.DataOperazione);
                      var text_DataOperazione = ' - ' + dataOperazione.ddmmyyyy();

                      ramo_struct_clone.find('.transaction-row span.transaction-row__amount').append(text_Importo + ' €');
                      ramo_struct_clone.find('.transaction-row span.transaction-row__date').append(text_DataOperazione);

                      riepilogo_row.find('table.transactions > tbody').append(ramo_struct_clone);

                    }

                    diff_pagato_dov_ft = tot_pagato_ft - ft_totale;
                    var diff_text = diff_pagato_dov_ft.formatMoney(2) + ' €';
                    if(diff_pagato_dov_ft > 0){
                      diff_text = '+' + diff_text;
                      riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount').css('color', '#50cc41');
                      riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount').css('font-weight', 'bold');
                    }else if(diff_pagato_dov_ft < 0){
                      riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount').css('color', '#ff0606');
                      riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount').css('font-weight', 'bold');
                    }
                    riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount p span').append(diff_text);

                    str.find('table.storico-pagamenti > tbody').append(riepilogo_row);

                  }
                }

                callback(str);
              });
            //});
          } catch (e) {
            console.log(e.message);
          }

        }
      },
      en : {
        subject : "Milanostanze - Final invoice and payment history",
        rootNominativo : ".ts-nominativo",
        rootTotFatturato : ".totFatturato",
        rootDaVersare : ".totDaVersare",
        rootVersato : ".totVersato",
        rootDiffFatturatoVersato : ".diffFatturatoVersato",
        rootTotFatturaChiusura : ".totFatturaChiusura",
        rootLastDayFatturato : ".last-day-fatturato",
        rootLastDayVersato : ".last-day-versato",
        rootCauzione : ".totCauzione",
        rootSecCauzione : ".sec-cauzione",
        bk_details : {
          finlibera : $('<div>Bank Transfer Wire to <strong>Finlibera s.p.a.</strong><br> IBAN: <strong>IT80S0100501606000000000812</strong><br> Bic/Swift: <strong>BNLIITRR</strong><br> Bank name : <strong>Banca Nazionale Del Lavoro</strong><br> Description of transfer : <strong class="causale"></strong> <br></div>'),
          ecolibera : $('<div>Bank Transfer Wire to <strong>Ecolibera Srl</strong><br> IBAN: <strong>IT88T0100501606000000001225</strong><br> Bic/Swift: <strong>BNLIITRR</strong><br> Bank name : <strong>Banca Nazionale Del Lavoro</strong><br> Description of transfer : <strong class="causale"></strong> <br></div>')
        },
        rootBkDetails : ".bk-details",
        rootCausale : ".causale",
        content : $('<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 680px;"> <tbody> <tr> <td bgcolor="#ffffff"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 20px 20px 20px;text-align: left;"> <h1 style="margin: 0; font-family: sans-serif; font-size: 24px; line-height: 125%; color: #333333; font-weight: normal;">Dear <span class="ts-nominativo"></span>,</h1> </td> </tr> <tr> <td class="intro" style="padding: 0 20px 20px;font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;text-align: justify;"> <p style="margin: 0;">We send you the last report regarding your rent and every movement of your payments, according to which you still have to pay us euro <span><strong class="totDaVersare"></strong></span></p> </td> </tr><tr> <td style="padding: 0 20px 0px;font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;text-align: justify;"><h2 style="margin: 0;font-family: sans-serif;font-size: 18px;line-height: 125%;color: #555555;font-weight: bold; border-bottom:  2px solid;">Summary</h2> </td> </tr><tr> <td bgcolor="#ffffff" align="center" height="100%" valign="top" width="100%" style=""> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" width="660"> <tr> <td align="center" valign="top" width="660"> <![endif]--> <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" width="100%" style="max-width:660px;"> <tbody><tr> <td align="left" valign="top" style="font-size:0;padding: 10px 0;"> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" width="660"> <tr> <td align="left" valign="top" width="330"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;" > <p style="margin: 0;"><strong>Total amount to be paid till <span class="last-day-fatturato"></span> :</strong></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> <td align="left" valign="top" width="330"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;text-align: justify;" > <p style="margin: 0;"><span class="totFatturato"></span> euro* (Includes stamps of 2 euros each applicated on every invoice)</p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr> </tbody></table> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr><tr> <td bgcolor="#ffffff" align="center" height="100%" valign="top" width="100%"> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" width="660"> <tr> <td align="center" valign="top" width="660"> <![endif]--> <table class="paid_sec" role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" width="100%" style="max-width:660px;"> <tbody><tr> <td class="paid_sec_td"  align="left" valign="top" style="font-size:0; padding: 10px 0;"> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" width="660"> <tr> <td align="left" valign="top" width="330"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;" > <p style="margin: 0;"><strong>Total amount paid till <span class="last-day-versato"></span> :</strong></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> <td align="left" valign="top" width="330"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;" > <p style="margin: 0;"><span class="totVersato"></span> euro*</p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr> </tbody></table> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr><tr> <td bgcolor="#ffffff" align="center" height="100%" valign="top" width="100%"> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" width="660"> <tr> <td align="center" valign="top" width="660"> <![endif]--> <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="left" width="100%" style="max-width:660px;"> <tbody><tr> <td align="left" valign="top" style="font-size:0; padding: 10px 0;"> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" width="660"> <tr> <td align="left" valign="top" width="330"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;" > <p style="margin: 0;"><strong>Difference between paid and be paid :</strong></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> <td align="left" valign="top" width="330"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;" > <p style="margin: 0;"><span class="diffFatturatoVersato"></span> euro</p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr> </tbody></table> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr><tr> <td bgcolor="#ffffff" align="center" height="100%" valign="top" width="100%"> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" width="660"> <tr> <td align="center" valign="top" width="660"> <![endif]--> <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" width="100%" style="max-width:660px;"> <tbody><tr> <td align="left" valign="top" style="font-size:0; padding: 10px 0;"> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" width="660"> <tr> <td align="left" valign="top" width="330"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;" > <p style="margin: 0;"><strong>Contract closing final invoice :</strong></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> <td align="left" valign="top" width="330"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;" > <p style="margin: 0;"><span class="totFatturaChiusura"></span> euro (details on the attached invoice)</p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr> </tbody></table> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr><tr> <td bgcolor="#ffffff" align="center" height="100%" valign="top" width="100%"> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" width="660"> <tr> <td align="center" valign="top" width="660"> <![endif]--> <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" width="100%" style="max-width:660px;"> <tbody><tr> <td align="left" valign="top" style="font-size:0; padding: 10px 0;" bgcolor="#f8f8f8"> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" width="660"> <tr> <td align="left" valign="top" width="330"> <![endif]--> <div style="display:inline-block;margin: 0 -2px;width:100%;min-width:200px;max-width:330px;vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table class="account-balance" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;" > <p style="margin: 0;"><strong>Total to be paid :</strong></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> <td align="left" valign="top" width="330"> <![endif]--> <div style="display:inline-block;margin: 0 -2px;width:100%;min-width:200px;max-width:330px;vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;" > <p style="margin: 0;"><strong><span class="totDaVersare"> </span> euro</strong></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr> </tbody></table> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr><tr> <td class="sec-cauzione" bgcolor="#ffffff" align="center" height="100%" valign="top" width="100%"> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" width="660"> <tr> <td align="center" valign="top" width="660"> <![endif]--> <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" width="100%" style="max-width:660px;"> <tbody><tr> <td align="left" valign="top" style="font-size:0; padding: 10px 0;"> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" width="660"> <tr> <td align="left" valign="top" width="330"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table class="amount-balance-result" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;" > <p style="margin: 0;"><strong>We will refund the total amount of the deposit to your credit equal to : </strong></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> <td align="left" valign="top" width="330"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;" > <p style="margin: 0;"><span class="totCauzione"></span> euro</p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr><tr> <td style="padding: 10px 10px 10px 20px;font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;text-align: justify;"> <p style="margin: 0;"><strong>when you will send us the following documentation to the email address segreteria@finlibera.it :</strong></p> </td> </tr><tr> <td class="positive-balance" style="padding: 10px 40px 40px;font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;text-align: justify;"> <p style="margin: 0;"><strong>1) </strong>Last payment receipt of : <span class="totDaVersare"><strong></strong></span></p><br><div class="bk-details" style="padding-left: 20px;"></div><br><p style="margin-top: 5;"><strong>2) </strong>Your bank account details : <strong>Complete name of the account - IBAN code - BIC/SWIFT</strong></p> </td> </tr> </tbody></table> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr><tr> <td style="padding: 20px 20px 0px 20px;font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;text-align: justify;"><h2 style="margin: 0;font-family: sans-serif;font-size: 18px;line-height: 125%;font-weight: bold;border-bottom: 2px solid;">Payment History :</h2> </td> </tr><tr> <td bgcolor="#ffffff" align="center" height="100%" valign="top" width="100%" style=""> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" width="660"> <tr> <td align="center" valign="top" width="660"> <![endif]--> <table class="storico-pagamenti" role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" width="100%" style="max-width:660px;"> <tbody> </tbody></table> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr><tr> <td style="padding: 40px 40px 40px;font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;text-align: justify;"> <p style="margin: 0;">Best Regards,</p><span><strong>Administrative Secretary</strong></span> </td> </tr> </tbody></table> </td> </tr> </tbody> </table>'),
        build : function(intestatario, doc, callback){
          var self = this;
          try {
            if (!intestatario || !(intestatario instanceof Intestatario))
              throw new TypeError('TextTemplate - Error evaluating build function parameter data');
            if (!doc || !(doc instanceof Fattura))
              throw new TypeError('TextTemplate - Error evaluating build function parameter data');
            if(!doc.FatturaDettagli || !doc.FatturaDettagli.FatturaDettagli || !doc.FatturaDettagli.FatturaDettagli.length > 0)
              throw new TypeError('TextTemplate - Cannot find FatturaDettagli');
            if (!callback)
              throw new TypeError('TextTemplate : build -This method needs a callback argument');

            var nominativo = intestatario.getFormalNominativo();
            var ftNominativo = doc.getNominativoPDFMatrix();

            if (!nominativo || nominativo === "" || !ftNominativo || ftNominativo === "")
              throw new TypeError('TextTemplate : build -Locazione nominativo or ftNominativo error');

            var causale = "Fattura n° " + ftNominativo + " " + nominativo;
            var fd = doc.FatturaDettagli.FatturaDettagli;
            var ins = new Inquilino_Stanza(fd[0].IdInquilinoStanze);
            ins.LoadRelationship(function(){
              ins.loadAccountBalance(function(data){
                var bals = data.Balance;
                var cauzione = new Number(ins.Cauzione);
                var canone = new Number(ins.Canone);
                var totFatturaChiusura = new Number(doc.Totale);
                var societa = doc.Societa;
                var totFatturato = new Number(data.TotFatturato - totFatturaChiusura);
                var totVersato = new Number(data.TotVersato);
                var totNonContabilizzato = new Number(ins.ImportoNonContabilizzato);
                totVersato -= totNonContabilizzato;
                var totDiffFtVers = totFatturato - totVersato;
                var spec_inc = ins.SpecificaImportoNonContabilizzato;
                var totDaVersare = ((totFatturaChiusura + totDiffFtVers)-totNonContabilizzato);
                var curdate = new Date();

                var isPrevIns = data.isPrevIns;
                var hasPrevIns = data.hasPrevIns;

                if(hasPrevIns){

                  switch (parseInt(ins.IdContractDocs)) {
                    case 1:
                    case 10:
                    case 17:
                    case 24:
                    case 32:
                      cauzione = canone * 3;
                      break;
                    case 2:
                    case 3:
                    case 20:
                    case 22:
                    case 27:
                    case 29:
                      cauzione = canone;
                      break;
                  }

                }

                bals.sort(function(a,b){
                  // Turn your strings into dates, and then subtract them
                  // to get a value that is either negative, positive, or zero.
                  return new Date(a.Fattura.Data) - new Date(b.Fattura.Data);
                });

                var str = self.content.clone();
                str.find(self.rootNominativo).append(intestatario.getNominativo());
                str.find(self.rootTotFatturato).append(totFatturato.formatMoney(2));
                str.find(self.rootDaVersare).append(totDaVersare.formatMoney(2));
                str.find(self.rootVersato).append(totVersato.formatMoney(2));

                if (totNonContabilizzato > 0) {
                  totDiffFtVers = totFatturato - (totVersato + totNonContabilizzato);
                }

                str.find(self.rootDiffFatturatoVersato).append(totDiffFtVers.formatMoney(2));
                str.find(self.rootTotFatturaChiusura).append(totFatturaChiusura.formatMoney(2));
                str.find(self.rootCauzione).append(cauzione.formatMoney(2));
                str.find(self.rootLastDayFatturato).append(curdate.ddmmyyyy());
                str.find(self.rootLastDayVersato).append(curdate.ddmmyyyy());

                if(totNonContabilizzato > 0 && spec_inc){
                  var inc_struct = $('<div class="nonContabilizzato_sec"><div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;"> <p class="spec-inc" style="margin: 0;"><strong></strong></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div><div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;"> <p class="inc-amount" style="margin: 0;"><span></span> euro</p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div><div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;"> <p class="inc-tot-versato__text" style="margin: 0;"><strong></strong></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div><div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;"> <p class="inc-tot-versato__amount" style="margin: 0;"><span></span> euro</p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div></div>');

                  var inc_struct_clone = inc_struct.clone();
                  var inc_totVersato_text = "Total paid : ";
                  var inc_totVersato_amount = totNonContabilizzato + totVersato;
                  var inc_totVersato_sub_text = totVersato.formatMoney(2) + ' euro + ' + totNonContabilizzato.formatMoney(2) + ' euro = ' + inc_totVersato_amount.formatMoney(2);

                  inc_struct_clone.find('.spec-inc strong').append(spec_inc + ' :');
                  inc_struct_clone.find('.inc-amount span').append(totNonContabilizzato.formatMoney(2));
                  inc_struct_clone.find('.inc-tot-versato__text strong').append(inc_totVersato_text);
                  inc_struct_clone.find('.inc-tot-versato__amount span').append(inc_totVersato_sub_text);

                  str.find('table.paid_sec td.paid_sec_td').append(inc_struct_clone);
                }

                switch (parseInt(societa)) {
                  case 0:
                    str.find(self.rootBkDetails).append(self.bk_details.finlibera.clone());
                    str.find(self.rootCausale).append(nominativo);
                    break;
                  case 1:
                    str.find(self.rootBkDetails).append(self.bk_details.ecolibera.clone());
                    str.find(self.rootCausale).append(nominativo);
                    break;
                }

                if(totDaVersare <= 0){
                  totDaVersare = -totDaVersare;
                  var deposit_overpaid = totDaVersare + cauzione;
                  str.find('.intro').html($('<p style="margin: 0;">We send you the last invoice regarding your rent and every movement of your payments, according to which you have a credit of <span><strong class="totDaVersare"></strong> euros</span></p>'));
                  str.find(self.rootDaVersare).html(totDaVersare.formatMoney(2));
                  str.find('.account-balance td p strong').html('Total credit : ');
                  str.find('.amount-balance-result td p strong').html('We will refund the total amount of the deposit and the amount overpaid equal to : ');
                  str.find(self.rootCauzione).html(deposit_overpaid.formatMoney(2));
                  str.find('.positive-balance').html($('<p style="margin-top: 5;"><strong>1) </strong>Your bank account details : <strong>Complete name of the account - IBAN code - BIC/SWIFT</strong></p>'));
                }

                if(isPrevIns){
                  str.find(self.rootSecCauzione).remove();
                }

                var riepilogo_row_struct = $('<tr> <td bgcolor="#ffffff" align="center" height="100%" valign="top" width="100%" style=""> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" width="660"> <tr> <td align="center" valign="top" width="660"> <![endif]--> <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" width="100%" style="max-width:660px;"> <tbody><tr> <td bgcolor="#ffffff" align="center" valign="top" style="font-size:0;padding: 10px 0 20px;"> </td> </tr><tr> <td bgcolor="#f8f8f8" align="center" valign="top" style="font-size:0;padding: 10px 0 40px;"> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" width="660"> <tr> <td align="left" valign="top" width="220"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; max-width:33.33%; min-width:220px; vertical-align:top; width:100%;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px;"> <table class="invoice" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody><tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p style="margin: 0;border-bottom: 2px solid #555555;"><strong><span>INVOICE</span></strong></p> </td> </tr> <tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p class="ft-nominativo" style="margin: 0;"><span></span></p> </td> </tr><tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p class="tot-fattura" style="margin: 0;"><span></span></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> <td align="left" valign="top" width="220"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; max-width:33.33%; min-width:220px; vertical-align:top; width:100%;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px;"> <table class="transactions" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> <td align="left" valign="top" width="220"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; max-width:33.33%; min-width:220px; vertical-align:top; width:100%;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px;"> <table class="diff-transactions" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody><tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p style="margin: 0;border-bottom: 2px solid #555555;"><strong><span>DIFFERENCE</span></strong></p> </td> </tr> <tr> <td class="diff-transactions__amount" style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p style="margin: 0;"><span></span></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr><tr> <td bgcolor="#ffffff" align="center" valign="top" style="font-size:0;padding: 10px 0 20px;"> </td> </tr> </tbody></table> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr>');

                var ramo_struct = $('<tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p class="transaction-row" style="margin: 0;"><span class="transaction-row__amount"></span><span class="transaction-row__date"></span></p> </td> </tr>');
                var pagamento_title = $('<tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p style="margin: 0;border-bottom: 2px solid #555555;"><strong><span>PAID</span></strong></p> </td> </tr>');

                for (var i = 0; i < bals.length; i++) {
                  var bal = bals[i];
                  var riepilogo_row = riepilogo_row_struct.clone();
                  var ft_tmp = bal.Fattura;
                  var ft = new Fattura();
                  ft_tmp = $.extend(ft, ft_tmp);
                  var tot_pagato_ft = 0;
                  var diff_pagato_dov_ft = 0;

                  if(parseInt(ft.Tipologia) !== 3){
                    var rami = bal.Rami;
                    rami.sort(function(a,b){
                      // Turn your strings into dates, and then subtract them
                      // to get a value that is either negative, positive, or zero.
                      return new Date(a.DataOperazione) - new Date(b.DataOperazione);
                    });

                    var ft_nominativo = ft.getNominativo();
                    var ft_totale = new Number(ft.Totale);
                    var tipoDoc = 'Invoice n. ';
                    var ft_totale_txt = ft_totale;

                    if(parseInt(ft.Tipologia) === 4){
                      ft_totale_txt = 0 - ft_totale_txt;
                    }

                    riepilogo_row.find('table.invoice .ft-nominativo span').append(ft_nominativo);
                    riepilogo_row.find('table.invoice .tot-fattura span').append('Total invoice : ' + ft_totale_txt.formatMoney(2) + ' €');

                    if(parseInt(ft.Tipologia) === 4){
                      ft_totale = -ft_totale;
                      tipoDoc = 'Credit note n. ';
                    }

                    //if(parseInt(ft.Tipologia) === 0 && ft.FatturaDettagli && ft.FatturaDettagli.FatturaDettagli && ft.FatturaDettagli.FatturaDettagli.length > 0){
                      ft.Linking();
                      var dataFattura = new Date(ft.Data);
                      riepilogo_row.find('table.invoice .ft-nominativo span').html(tipoDoc + ft.Numero + ' - ' + dataFattura.ddmmyyyy());
                      var fdis = ft.FatturaDettagli.FatturaDettagli;
                      var fdi_struct = $('<p class="ft-fdi" style="margin: 0;"><span></span></p>');

                      for (var z = 0; z < fdis.length; z++) {
                        var fdi_struct_clone = fdi_struct.clone();
                        var fdi_matrix = fdis[z].getPDFMatrix();
                        fdi_struct_clone.find('span').append('- ' + fdi_matrix.Title);
                        riepilogo_row.find('table.invoice .ft-nominativo').before().append(fdi_struct_clone);
                      }
                    //}

                    for (var x = 0; x < rami.length; x++) {
                      var ramo = rami[x];
                      var ramo_struct_clone = ramo_struct.clone();

                      if(x === 0){
                        riepilogo_row.find('table.transactions > tbody').append(pagamento_title.clone());
                      }

                      var importo = new Number(ramo.Importo);

                      if(i === 0 && x === 0 && totNonContabilizzato && totNonContabilizzato > 0){
                        importo += totNonContabilizzato;
                      }

                      tot_pagato_ft += importo;
                      var text_Importo = importo.formatMoney(2);

                      var dataOperazione = new Date(ramo.DataOperazione);
                      var text_DataOperazione = ' - ' + dataOperazione.ddmmyyyy();

                      ramo_struct_clone.find('.transaction-row span.transaction-row__amount').append(text_Importo + ' €');
                      ramo_struct_clone.find('.transaction-row span.transaction-row__date').append(text_DataOperazione);

                      riepilogo_row.find('table.transactions > tbody').append(ramo_struct_clone);

                    }

                    diff_pagato_dov_ft = tot_pagato_ft - ft_totale;
                    var diff_text = diff_pagato_dov_ft.formatMoney(2) + ' €';
                    if(diff_pagato_dov_ft > 0){
                      diff_text = '+' + diff_text;
                      riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount').css('color', '#50cc41');
                      riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount').css('font-weight', 'bold');
                    }else if(diff_pagato_dov_ft < 0){
                      riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount').css('color', '#ff0606');
                      riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount').css('font-weight', 'bold');
                    }
                    riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount p span').append(diff_text);


                    str.find('table.storico-pagamenti > tbody').append(riepilogo_row);
                  }
                }
                callback(str);
              });
            });
          } catch (e) {
            console.log(e.message);
          }

        },
        buildNoInvoice : function(ins, callback){
          var self = this;
          try {
            if (!ins || !(ins instanceof Inquilino_Stanza))
              throw new TypeError('TextTemplate - Error evaluating build function parameter data');

            if (!callback)
              throw new TypeError('TextTemplate : build -This method needs a callback argument');

            if(!ins.Inquilino)
              throw new TypeError('TextTemplate - buildNoInvoice : Inquilino undefined!');

            if(!ins.Stanza)
              throw new TypeError('TextTemplate - buildNoInvoice : Stanza undefined!');

            if(!ins.Stanza.Appartamento)
              throw new TypeError('TextTemplate - buildNoInvoice : ins.Stanza.Appartamento undefined!');

            var inquilino = ins.Inquilino;
            var lang = inquilino.Lang;
            var stanza = ins.Stanza;
            var apt = stanza.Appartamento;

            var nominativo = inquilino.getFormalNominativo();

            if (!nominativo || nominativo === "")
              throw new TypeError('TextTemplate : build - Locazione nominativo error');

            //ins.LoadRelationship(function(){
              ins.loadAccountBalance(function(data){
                var bals = data.Balance;
                var cauzione = new Number(ins.Cauzione);
                var canone = new Number(ins.Canone);
                var totFatturaChiusura = 0;
                var societa = apt.Societa;
                var totFatturato = new Number(data.TotFatturato - totFatturaChiusura);
                var totVersato = new Number(data.TotVersato);
                var totNonContabilizzato = new Number(ins.ImportoNonContabilizzato);
                totVersato -= totNonContabilizzato;
                var totDiffFtVers = totFatturato - totVersato;
                var spec_inc = ins.SpecificaImportoNonContabilizzato;
                var totDaVersare = ((totFatturaChiusura + totDiffFtVers)-totNonContabilizzato);
                var curdate = new Date();

                var isPrevIns = data.isPrevIns;
                var hasPrevIns = data.hasPrevIns;

                if(hasPrevIns){

                  switch (parseInt(ins.IdContractDocs)) {
                    case 1:
                    case 10:
                    case 17:
                    case 24:
                    case 32:
                      cauzione = canone * 3;
                      break;
                    case 2:
                    case 3:
                    case 20:
                    case 22:
                    case 27:
                    case 29:
                      cauzione = canone;
                      break;
                  }

                }

                bals.sort(function(a,b){
                  // Turn your strings into dates, and then subtract them
                  // to get a value that is either negative, positive, or zero.
                  return new Date(a.Fattura.Data) - new Date(b.Fattura.Data);
                });

                var str = self.content.clone();
                str.find(self.rootNominativo).append(inquilino.getNominativo());
                str.find(self.rootTotFatturato).append(totFatturato.formatMoney(2));
                str.find(self.rootDaVersare).append(totDaVersare.formatMoney(2));
                str.find(self.rootVersato).append(totVersato.formatMoney(2));

                if (totNonContabilizzato > 0) {
                  totDiffFtVers = totFatturato - (totVersato + totNonContabilizzato);
                }

                str.find(self.rootDiffFatturatoVersato).append(totDiffFtVers.formatMoney(2));
                str.find(self.rootTotFatturaChiusura).append(totFatturaChiusura.formatMoney(2));
                str.find(self.rootCauzione).append(cauzione.formatMoney(2));
                str.find(self.rootLastDayFatturato).append(curdate.ddmmyyyy());
                str.find(self.rootLastDayVersato).append(curdate.ddmmyyyy());

                if(totNonContabilizzato > 0 && spec_inc){
                  var inc_struct = $('<div class="nonContabilizzato_sec"><div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;"> <p class="spec-inc" style="margin: 0;"><strong></strong></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div><div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;"> <p class="inc-amount" style="margin: 0;"><span></span> euro</p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div><div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;"> <p class="inc-tot-versato__text" style="margin: 0;"><strong></strong></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div><div style="display:inline-block; margin: 0 -2px; width:100%; min-width:200px; max-width:330px; vertical-align:top;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px 10px 20px;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding-top: 10px;"> <p class="inc-tot-versato__amount" style="margin: 0;"><span></span> euro</p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div></div>');

                  var inc_struct_clone = inc_struct.clone();
                  var inc_totVersato_text = "Total paid : ";
                  var inc_totVersato_amount = totNonContabilizzato + totVersato;
                  var inc_totVersato_sub_text = totVersato.formatMoney(2) + ' euro + ' + totNonContabilizzato.formatMoney(2) + ' euro = ' + inc_totVersato_amount.formatMoney(2);

                  inc_struct_clone.find('.spec-inc strong').append(spec_inc + ' :');
                  inc_struct_clone.find('.inc-amount span').append(totNonContabilizzato.formatMoney(2));
                  inc_struct_clone.find('.inc-tot-versato__text strong').append(inc_totVersato_text);
                  inc_struct_clone.find('.inc-tot-versato__amount span').append(inc_totVersato_sub_text);

                  str.find('table.paid_sec td.paid_sec_td').append(inc_struct_clone);
                }

                switch (parseInt(societa)) {
                  case 0:
                    str.find(self.rootBkDetails).append(self.bk_details.finlibera.clone());
                    str.find(self.rootCausale).append(nominativo);
                    break;
                  case 1:
                    str.find(self.rootBkDetails).append(self.bk_details.ecolibera.clone());
                    str.find(self.rootCausale).append(nominativo);
                    break;
                }

                if(totDaVersare < 0){
                  totDaVersare = -totDaVersare;
                  var deposit_overpaid = totDaVersare + cauzione;
                  str.find('.intro').html($('<p style="margin: 0;">We send you the last invoice regarding your rent and every movement of your payments, according to which you have a credit of <span><strong class="totDaVersare"></strong> euros</span></p>'));
                  str.find(self.rootDaVersare).html(totDaVersare.formatMoney(2));
                  str.find('.account-balance td p strong').html('Total credit : ');
                  str.find('.amount-balance-result td p strong').html('We will refund the total amount of the deposit and the amount overpaid equal to : ');
                  str.find(self.rootCauzione).html(deposit_overpaid.formatMoney(2));
                  str.find('.positive-balance').html($('<p style="margin-top: 5;"><strong>1) </strong>Your bank account details : <strong>Complete name of the account - IBAN code - BIC/SWIFT</strong></p>'));
                }else if(totDaVersare === 0){
                  totDaVersare = -totDaVersare;
                  var deposit_overpaid = totDaVersare + cauzione;
                  //str.find('.intro').html($('<p style="margin: 0;">Le inviamo l’ultima fattura relativa alla Sua locazione e i conteggi di fine locazione da cui risultano a vostro credito euro <span><strong class="totDaVersare"></strong></span></p>'));
                  str.find(self.rootDaVersare).html(totDaVersare.formatMoney(2));
                  //str.find('.account-balance td p strong').html('Totale a credito : ');
                  str.find('.amount-balance-result td p strong').html('We will refund the total amount of the deposit : ');
                  str.find(self.rootCauzione).html(deposit_overpaid.formatMoney(2));
                  str.find('.positive-balance').html($('<p style="margin-top: 5;"><strong>1) </strong>Your bank account details : <strong>Complete name of the account - IBAN code - BIC/SWIFT</strong></p>'));
                }

                if(isPrevIns){
                  str.find(self.rootSecCauzione).remove();
                }

                var riepilogo_row_struct = $('<tr> <td bgcolor="#ffffff" align="center" height="100%" valign="top" width="100%" style=""> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" width="660"> <tr> <td align="center" valign="top" width="660"> <![endif]--> <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" width="100%" style="max-width:660px;"> <tbody><tr> <td bgcolor="#ffffff" align="center" valign="top" style="font-size:0;padding: 10px 0 20px;"> </td> </tr><tr> <td bgcolor="#f8f8f8" align="center" valign="top" style="font-size:0;padding: 10px 0 40px;"> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" width="660"> <tr> <td align="left" valign="top" width="220"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; max-width:33.33%; min-width:220px; vertical-align:top; width:100%;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px;"> <table class="invoice" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody><tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p style="margin: 0;border-bottom: 2px solid #555555;"><strong><span>INVOICE</span></strong></p> </td> </tr> <tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p class="ft-nominativo" style="margin: 0;"><span></span></p> </td> </tr><tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p class="tot-fattura" style="margin: 0;"><span></span></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> <td align="left" valign="top" width="220"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; max-width:33.33%; min-width:220px; vertical-align:top; width:100%;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px;"> <table class="transactions" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> <td align="left" valign="top" width="220"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; max-width:33.33%; min-width:220px; vertical-align:top; width:100%;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px;"> <table class="diff-transactions" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody><tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p style="margin: 0;border-bottom: 2px solid #555555;"><strong><span>DIFFERENCE</span></strong></p> </td> </tr> <tr> <td class="diff-transactions__amount" style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p style="margin: 0;"><span></span></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr><tr> <td bgcolor="#ffffff" align="center" valign="top" style="font-size:0;padding: 10px 0 20px;"> </td> </tr> </tbody></table> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr>');

                var ramo_struct = $('<tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p class="transaction-row" style="margin: 0;"><span class="transaction-row__amount"></span><span class="transaction-row__date"></span></p> </td> </tr>');
                var pagamento_title = $('<tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p style="margin: 0;border-bottom: 2px solid #555555;"><strong><span>PAID</span></strong></p> </td> </tr>');

                for (var i = 0; i < bals.length; i++) {
                  var bal = bals[i];
                  var riepilogo_row = riepilogo_row_struct.clone();
                  var ft_tmp = bal.Fattura;
                  var ft = new Fattura();
                  ft_tmp = $.extend(ft, ft_tmp);
                  var tot_pagato_ft = 0;
                  var diff_pagato_dov_ft = 0;

                  if(parseInt(ft.Tipologia) !== 3){
                    var rami = bal.Rami;
                    rami.sort(function(a,b){
                      // Turn your strings into dates, and then subtract them
                      // to get a value that is either negative, positive, or zero.
                      return new Date(a.DataOperazione) - new Date(b.DataOperazione);
                    });

                    var ft_nominativo = ft.getNominativo();
                    var ft_totale = new Number(ft.Totale);
                    var tipoDoc = 'Invoice n. ';
                    var ft_totale_txt = ft_totale;

                    if(parseInt(ft.Tipologia) === 4){
                      ft_totale_txt = 0 - ft_totale_txt;
                    }

                    riepilogo_row.find('table.invoice .ft-nominativo span').append(ft_nominativo);
                    riepilogo_row.find('table.invoice .tot-fattura span').append('Total invoice : ' + ft_totale_txt.formatMoney(2) + ' €');

                    if(parseInt(ft.Tipologia) === 4){
                      ft_totale = -ft_totale;
                      tipoDoc = 'Credit note n. ';
                    }

                    //if(parseInt(ft.Tipologia) === 0 && ft.FatturaDettagli && ft.FatturaDettagli.FatturaDettagli && ft.FatturaDettagli.FatturaDettagli.length > 0){
                      ft.Linking();
                      var dataFattura = new Date(ft.Data);
                      riepilogo_row.find('table.invoice .ft-nominativo span').html(tipoDoc + ft.Numero + ' - ' + dataFattura.ddmmyyyy());
                      var fdis = ft.FatturaDettagli.FatturaDettagli;
                      var fdi_struct = $('<p class="ft-fdi" style="margin: 0;"><span></span></p>');

                      for (var z = 0; z < fdis.length; z++) {
                        var fdi_struct_clone = fdi_struct.clone();
                        var fdi_matrix = fdis[z].getPDFMatrix();
                        fdi_struct_clone.find('span').append('- ' + fdi_matrix.Title);
                        riepilogo_row.find('table.invoice .ft-nominativo').before().append(fdi_struct_clone);
                      }
                    //}

                    for (var x = 0; x < rami.length; x++) {
                      var ramo = rami[x];
                      var ramo_struct_clone = ramo_struct.clone();

                      if(x === 0){
                        riepilogo_row.find('table.transactions > tbody').append(pagamento_title.clone());
                      }

                      var importo = new Number(ramo.Importo);

                      if(i === 0 && x === 0 && totNonContabilizzato && totNonContabilizzato > 0){
                        importo += totNonContabilizzato;
                      }

                      tot_pagato_ft += importo;
                      var text_Importo = importo.formatMoney(2);

                      var dataOperazione = new Date(ramo.DataOperazione);
                      var text_DataOperazione = ' - ' + dataOperazione.ddmmyyyy();

                      ramo_struct_clone.find('.transaction-row span.transaction-row__amount').append(text_Importo + ' €');
                      ramo_struct_clone.find('.transaction-row span.transaction-row__date').append(text_DataOperazione);

                      riepilogo_row.find('table.transactions > tbody').append(ramo_struct_clone);

                    }

                    diff_pagato_dov_ft = tot_pagato_ft - ft_totale;
                    var diff_text = diff_pagato_dov_ft.formatMoney(2) + ' €';
                    if(diff_pagato_dov_ft > 0){
                      diff_text = '+' + diff_text;
                      riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount').css('color', '#50cc41');
                      riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount').css('font-weight', 'bold');
                    }else if(diff_pagato_dov_ft < 0){
                      riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount').css('color', '#ff0606');
                      riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount').css('font-weight', 'bold');
                    }
                    riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount p span').append(diff_text);


                    str.find('table.storico-pagamenti > tbody').append(riepilogo_row);
                  }
                }
                callback(str);
              });
            //});
          } catch (e) {
            console.log(e.message);
          }

        }
      },
    },
    4 : {
      it : {
        subject : "Milanostanze - Nuova nota di credito",
        rootNominativo : ".ts-nominativo",
        rootCustomText : ".customText",
        rootBkDetails : ".bk-details",
        rootTotalInvoice : ".total",
        /*bk_details : {
          finlibera : $('<div>Bonifico Bancario da intestare a <strong>Finlibera s.p.a.</strong><br> IBAN: <strong>IT80S0100501606000000000812</strong><br> Bic/Swift: <strong>BNLIITRR</strong><br> Nome Banca: <strong>Banca Nazionale Del Lavoro</strong><br> Causale : <strong class="causale"></strong> <br><br>Per qualsiasi chiarimento contattare il seguente indirizzo email : <strong>segreteria@finlibera.it</strong></div>'),
          ecolibera : $('<div>Bonifco Bancario intestato a <strong>Ecolibera Srl</strong><br> IBAN: <strong>IT88T0100501606000000001225</strong><br> Bic/Swift: <strong>BNLIITRR</strong><br> Nome Banca: <strong>Banca Nazionale Del Lavoro</strong><br> Causale : <strong class="causale"></strong> <br><br>Per qualsiasi chiarimento contattare il seguente indirizzo email : <strong>segreteria@finlibera.it</strong></div>')
        },*/
        rootCausale : ".causale",
        content : '<tbody> <tr> <td bgcolor="#ffffff"> <table width="100%" style="max-width: 680px;" role="presentation" border="0" cellspacing="0" cellpadding="0"> <tbody> <tr> <td style="padding: 20px;text-align: left;color: rgb(34, 144, 199);line-height: 15px;font-family: sans-serif;font-size: 20px;"> <div style="color: #2290C7;" class="ts">Gentile <span class="ts-nominativo"></span>,</div><br> </td> </tr> </tbody> </table> </td> </tr> <tr> <td bgcolor="#ffffff"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 680px;"> <tbody> <tr> <td style="padding: 20px 20px 50px 20px;text-align: left;font-family: sans-serif;font-size: 15px;line-height: 20px;color: rgb(17,27,99);" class="customText">E&#8217; stata emessa una nota di credito di Sua competenza. Si prega di prendere visione del documento in allegato. <br>L&#39;importo totale è di <strong class="total"></strong> * IVA inclusa. <br><br>Per qualsiasi chiarimento contattare il seguente indirizzo email : <strong>segreteria@finlibera.it</strong></div><br><br><div class="bk-details"></div><br> Cordiali saluti,<br><strong>Segreteria Amministrativa</strong> </td> </tr> </tbody> </table> </td> </tr> </tbody>',
        build : function(intestatario, doc, callback){

          try {
            if (!intestatario || !(intestatario instanceof Intestatario))
              throw new TypeError('TextTemplate - Error evaluating build function parameter data');
            if (!doc || !(doc instanceof Fattura))
              throw new TypeError('TextTemplate - Error evaluating build function parameter data');
            if (!callback)
              throw new TypeError('TextTemplate : build -This method needs a callback argument');

            var nominativo = intestatario.getFormalNominativo();
            var ftNominativo = doc.getNominativoPDFMatrix();

            if (!nominativo || nominativo === "" || !ftNominativo || ftNominativo === "")
              throw new TypeError('TextTemplate : build -Locazione nominativo or ftNominativo error');

            var causale = "Fattura n° " + ftNominativo + " " + nominativo;

            var string = this.content,
            content = $('<div/>').html("<div>" + string + "</div>").contents();
            content.find(this.rootNominativo).append(intestatario.getNominativo());

            content.find(this.rootTotalInvoice).append(doc.getTotaleMatrix());
            content.find(this.rootCausale).append(causale);

            callback(content.first());
          } catch (e) {
            console.log(e.message);
          }

        }
      },
      en : {
        subject : "Milanostanze - New Credit Note",
        rootNominativo : ".ts-nominativo",
        rootCustomText : ".customText",
        rootBkDetails : ".bk-details",
        rootTotalInvoice : ".total",
        /*bk_details : {
          finlibera : $('<div>Bank Transfer Wire to <strong>Finlibera s.p.a.</strong><br> IBAN: <strong>IT80S0100501606000000000812</strong><br> Bic/Swift: <strong>BNLIITRR</strong><br> Bank name : <strong>Banca Nazionale Del Lavoro</strong><br> Description of transfer : <strong class="causale"></strong> <br><br>Should you need any further information/assistance , please do not hesitate to contact us at the following email : <strong>segreteria@finlibera.it</strong></div>'),
          ecolibera : $('<div>Bank Transfer Wire to <strong>Ecolibera Srl</strong><br> IBAN: <strong>IT88T0100501606000000001225</strong><br> Bic/Swift: <strong>BNLIITRR</strong><br> Bank name : <strong>Banca Nazionale Del Lavoro</strong><br> Description of transfer : <strong class="causale"></strong> <br><br>Should you need any further information/assistance , please do not hesitate to contact us at the following email : <strong>segreteria@finlibera.it</strong></div>')
        },*/
        rootCausale : ".causale",
        content : '<tbody> <tr> <td bgcolor="#ffffff"> <table width="100%" style="max-width: 680px;" role="presentation" border="0" cellspacing="0" cellpadding="0"> <tbody> <tr> <td style="padding: 20px;text-align: left;color: rgb(34, 144, 199);line-height: 15px;font-family: sans-serif;font-size: 20px;"> <div style="color: #2290C7;" class="ts">Dear <span class="ts-nominativo"></span>,</div><br> </td> </tr> </tbody> </table> </td> </tr> <tr> <td bgcolor="#ffffff"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 680px;"> <tbody> <tr> <td style="padding: 20px 20px 50px 20px;text-align: left;font-family: sans-serif;font-size: 15px;line-height: 20px;color: rgb(17, 27, 99);" class="customText">We are contacting you in regard to a new credit note that has been created on your account. You may find the document attached.<br>Total : <strong class="total"></strong> * VAT included.  <br><br>Should you need any further information/assistance , please do not hesitate to contact us at the following email : <strong>segreteria@finlibera.it</strong></div><br><br><div class="bk-details"></div><br>Kind Regards,<br><strong>Administrative secretary</strong> </td> </tr> </tbody> </table> </td> </tr> </tbody>',
        build : function(intestatario, doc, callback){

          try {
            if (!intestatario || !(intestatario instanceof Intestatario))
              throw new TypeError('TextTemplate - Error evaluating build function parameter data');
            if (!doc || !(doc instanceof Fattura))
              throw new TypeError('TextTemplate - Error evaluating build function parameter data');
            if (!callback)
              throw new TypeError('TextTemplate : build -This method needs a callback argument');

            var nominativo = intestatario.getFormalNominativo();
            var ftNominativo = doc.getNominativoPDFMatrix();

            if (!nominativo || nominativo === "" || !ftNominativo || ftNominativo === "")
              throw new TypeError('TextTemplate : build -Locazione nominativo or ftNominativo error');

            var causale = "Invoice n° " + ftNominativo + " " + nominativo;

            var string = this.content,
            content = $('<div/>').html("<div>" + string + "</div>").contents();
            content.find(this.rootNominativo).append(intestatario.getNominativo());

            content.find(this.rootTotalInvoice).append(doc.getTotaleMatrix());
            content.find(this.rootCausale).append(causale);

            callback(content.first());
          } catch (e) {
            console.log(e.message);
          }

        }
      }
    },
    getStructure : function(inv, lang){
      try {
        if (!inv || !(inv instanceof Fattura) || !lang || lang === "")
          throw new TypeError('TextTemplate - getStructure : Error evaluating build function parameter data');
        if (!(parseInt(inv.Tipologia) >= 0))
          throw new TypeError('TextTemplate - getStructure : Invoice Type undefined');

        var type = parseInt(inv.Tipologia);
        var st = this[type][lang];

        if (!st || st === "")
          throw new TypeError('TextTemplate - getStructure : Errore durante assegnazione struttura');

        return st;
      } catch (e) {
        console.log(e.message);
      }
    }
  },
  customBasicEmail : {
    title : "Email personalizzata",
    rootNominativo : ".ts-nominativo",
    rootCustomText : ".customText",
    content : '<!-- Hero Image, Flush : BEGIN --> <!--tr> <td bgcolor="#2290C7"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 30px; text-align: left; font-family: sans-serif; font-size: 19px; line-height: 20px; color: #ffffff;"> La tua richiesta è stata inviata con successo. Ti faremo sapere a breve! </td> </tr> </tbody></table> </td> </tr--> <tbody> <tr> <td bgcolor="#ffffff"> <table width="100%" role="presentation" border="0" cellspacing="0" cellpadding="0"> <tbody> <tr> <td style="padding: 20px;text-align: left;color: rgb(34, 144, 199);line-height: 15px;font-family: sans-serif;font-size: 20px;"> <div style="color: #2290C7;" class="ts">Gentile <span class="ts-nominativo"></span>,</div><br></td></tr> </tbody></table> </td> </tr> <tr> <td bgcolor="#ffffff"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody> <tr> <td style="padding: 20px 20px 50px 20px;text-align: left;font-family: sans-serif;font-size: 15px;line-height: 20px;color: #2290C7;" class="customText"> </td> </tr> </tbody></table> </td> </tr> <!-- Hero Image, Flush : END --> <!-- 1 Column Text + Button : BEGIN --> <!-- 1 Column Text + Button : END --> <!-- Background Image with Text : BEGIN --> <!-- Background Image with Text : END --> <!-- 2 Even Columns : BEGIN --> <!-- 2 Even Columns : END --> <!-- 3 Even Columns : BEGIN --> <!-- 3 Even Columns : END --> <!-- Thumbnail Left, Text Right : BEGIN --> <!-- Thumbnail Left, Text Right : END --> <!-- Thumbnail Right, Text Left : BEGIN --> <!-- Thumbnail Right, Text Left : END --> <!-- Clear Spacer : BEGIN --> <!-- Clear Spacer : END --> <!-- 1 Column Text + Button : BEGIN --> <!-- 1 Column Text + Button : BEGIN --> </tbody>',
    build : function(intestatario, txt, callback){
      if (!intestatario || !txt || !(intestatario instanceof Intestatario) || txt === "")
        throw new TypeError('TextTemplate - Error evaluating build function parameter data');
      if (!callback)
        throw new TypeError('TextTemplate : build -This method needs a callback argument');

      var string = this.content,
      content = $('<div/>').html("<div>" + string + "</div>").contents();
      content.find(this.rootNominativo).append(intestatario.getNominativo());
      content.find(this.rootCustomText).append(txt);

      callback(content.first());
    }
  },
  sollecitiEmail : {
    0 : {
      it : {
        subject : "MilanoStanze - Sollecito di pagamento",
        rootNominativo : ".ts-nominativo",
        rootDaVersare : ".totDaVersare",
        bk_details : {
          finlibera : $('<div>Bonifico Bancario da intestare a <strong>Finlibera s.p.a.</strong><br> IBAN: <strong>IT80S0100501606000000000812</strong><br> Bic/Swift: <strong>BNLIITRR</strong><br> Nome Banca: <strong>Banca Nazionale Del Lavoro</strong><br> Causale : <strong class="causale"></strong> <br><br><p style="margin: 0;">Qualora invece avesse già effettuato il versamento, le chiediamo di inviarci la ricevuta contabile al fine di verificare ogni eventuale nostro problema tecnico.</p><br>Per qualsiasi chiarimento contattare il seguente indirizzo email : <strong>segreteria@finlibera.it</strong></div>'),
          ecolibera : $('<div>Bonifco Bancario intestato a <strong>Ecolibera Srl</strong><br> IBAN: <strong>IT88T0100501606000000001225</strong><br> Bic/Swift: <strong>BNLIITRR</strong><br> Nome Banca: <strong>Banca Nazionale Del Lavoro</strong><br> Causale : <strong class="causale"></strong> <br><br><p style="margin: 0;">Qualora invece avesse già effettuato il versamento, le chiediamo di inviarci la ricevuta contabile al fine di verificare ogni eventuale nostro problema tecnico.</p><br>Per qualsiasi chiarimento contattare il seguente indirizzo email : <strong>segreteria@finlibera.it</strong></div>')
        },
        rootBkDetails : ".bk-details",
        rootCausale : ".causale",
        content : $('<div><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style=" max-width: 680px; margin: 0 !important;"> <tbody><tr> <td style="padding: 20px 20px 20px;text-align: left;"> <h1 style="margin: 0px; font-family: sans-serif; font-size: 24px; line-height: 125%; color: rgb(34, 144, 199); font-weight: normal;">Gentile <span class="ts-nominativo"></span>,</h1> </td> </tr> <tr> <td style="padding: 0 20px 20px;font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;text-align: justify;"> <p style="margin: 0;">La presente al fine di rappresentarle che, da una verifica contabile effettuata, risulta in debito di euro <span><strong class="totDaVersare">0</strong></span></p><br><p style="margin: 0;">Si invita a provvedere tempestivamente al pagamento e di inviare la relativa ricevuta contabile o richiedere informazioni al seguente indirizzo mail :<strong> pagamenti@finlibera.it </strong></p></td> </tr><tr> <td class="bk-details" style="padding: 0 20px 20px;font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;text-align: justify;"> </td> </tr><tr> <td style="padding: 0 20px 0px;font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;text-align: justify;"><h2 style="margin: 0;font-family: sans-serif;font-size: 18px;line-height: 125%;font-weight: bold;border-bottom: 2px solid;">Importi pagati non corrispondenti alle fatture emesse :</h2> </td> </tr><tr> <td bgcolor="#ffffff" align="left" height="100%" valign="top" width="100%" style=""> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="left" width="660"> <tr> <td align="left" valign="top" width="660"> <![endif]--> <table class="storico-pagamenti" role="presentation" border="0" cellpadding="0" cellspacing="0" align="left" width="100%" style="max-width:660px;"> <tbody></tbody></table> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr><tr> <td style="padding: 40px 40px 40px;font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;text-align: justify;"> <p style="margin: 0;">Cordiali saluti,</p><span><strong>Segreteria Amministrativa</strong></span> </td> </tr> </tbody></table></div>'),
        build : function(ins, accountBalance, callback){
          try {
            var self = this;

            if(!callback)
              throw new TypeError('TextTemplate - callback undefined');

            if(!ins || !(ins instanceof Inquilino_Stanza))
              throw new TypeError('TextTemplate - ins undefined');

            if(!ins.Inquilino || !(ins.Inquilino instanceof Inquilino))
              throw new TypeError('TextTemplate - inquilino undefined');

            var nominativo = ins.Inquilino.getFormalNominativo();
            var balance = accountBalance.Balance;
            var societa = accountBalance.Societa;
            console.log(accountBalance);
            var totFatturato = new Number(accountBalance.TotFatturato);
            var totDovRealTime = new Number(accountBalance.TotDovInRealTime);
            var totVersato = new Number(accountBalance.TotVersato);
            var totDaVersare = totDovRealTime - totVersato;
            var totNonContabilizzato = new Number(ins.ImportoNonContabilizzato);

            if(totNonContabilizzato && totNonContabilizzato > 0){
              totDovRealTime += totNonContabilizzato;
            }

            balance.sort(function(a,b){
              // Turn your strings into dates, and then subtract them
              // to get a value that is either negative, positive, or zero.
              return new Date(a.Fattura.Data) - new Date(b.Fattura.Data);
            });

            var str = self.content.clone();
            str.find(self.rootNominativo).append(nominativo);
            str.find(self.rootDaVersare).html(totDaVersare.formatMoney(2));

            switch (parseInt(societa)) {
              case 0:
                str.find(self.rootBkDetails).append(self.bk_details.finlibera.clone());
                str.find(self.rootCausale).append(nominativo);
                break;
              case 1:
                str.find(self.rootBkDetails).append(self.bk_details.ecolibera.clone());
                str.find(self.rootCausale).append(nominativo);
                break;
            }

            var riepilogo_row_struct = $('<tr> <td bgcolor="#ffffff" align="center" height="100%" valign="top" width="100%" style=""> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" width="660"> <tr> <td align="center" valign="top" width="660"> <![endif]--> <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" width="100%" style="max-width:660px;"> <tbody><tr> <td bgcolor="#ffffff" align="center" valign="top" style="font-size:0;padding: 10px 0 20px;"> </td> </tr><tr> <td bgcolor="#f8f8f8" align="center" valign="top" style="font-size:0;padding: 10px 0 40px;"> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" width="660"> <tr> <td align="left" valign="top" width="220"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; max-width:33.33%; min-width:220px; vertical-align:top; width:100%;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px;"> <table class="invoice" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody><tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p style="margin: 0;border-bottom: 2px solid #555555;"><strong><span>FATTURA</span></strong></p> </td> </tr> <tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p class="ft-nominativo" style="margin: 0;"><span></span></p> </td> </tr><tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p class="tot-fattura" style="margin: 0;"><span></span></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> <td align="left" valign="top" width="220"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; max-width:33.33%; min-width:220px; vertical-align:top; width:100%;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px;"> <table class="transactions" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> <td align="left" valign="top" width="220"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; max-width:33.33%; min-width:220px; vertical-align:top; width:100%;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px;"> <table class="diff-transactions" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody><tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p style="margin: 0;border-bottom: 2px solid #555555;"><strong><span>DIFFERENZA</span></strong></p> </td> </tr> <tr> <td class="diff-transactions__amount" style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p style="margin: 0;"><span></span></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr><tr> <td bgcolor="#ffffff" align="center" valign="top" style="font-size:0;padding: 10px 0 20px;"> </td> </tr> </tbody></table> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr>');

            var pagamento_title = $('<tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p style="margin: 0;border-bottom: 2px solid #555555;"><strong><span>PAGATO</span></strong></p> </td> </tr>');
            var ramo_struct = $('<tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p class="transaction-row" style="margin: 0;"><span class="transaction-row__amount"></span><span class="transaction-row__date"></span></p> </td> </tr>');

            var fatturato_loop = 0;

            for (var i = 0; i < balance.length; i++) {
              var bal = balance[i];
              var riepilogo_row = riepilogo_row_struct.clone();
              var ft_tmp = bal.Fattura;
              var ft = new Fattura();
              ft_tmp = $.extend(ft, ft_tmp);
              var tot_pagato_ft = 0;
              var diff_pagato_dov_ft = 0;

              if(parseInt(ft.Tipologia) !== 3){
                var rami = bal.Rami;
                rami.sort(function(a,b){
                  // Turn your strings into dates, and then subtract them
                  // to get a value that is either negative, positive, or zero.
                  return new Date(a.DataOperazione) - new Date(b.DataOperazione);
                });

                var ft_nominativo = ft.getNominativo();
                var ft_totale = new Number(ft.Totale);
                var tipoDoc = 'Ft. ';
                var ft_totale_txt = ft_totale;

                if(parseInt(ft.Tipologia) === 4){
                  ft_totale_txt = 0 - ft_totale_txt;
                }

                if(parseInt(ft.Tipologia) !== 4){
                  fatturato_loop += ft_totale;
                }

                riepilogo_row.find('table.invoice .ft-nominativo span').append(ft_nominativo);
                riepilogo_row.find('table.invoice .tot-fattura span').append('Totale Ft : ' + ft_totale_txt.formatMoney(2) + ' €');

                if(parseInt(ft.Tipologia) === 4){
                  ft_totale = -ft_totale;
                  fatturato_loop += ft_totale;
                  tipoDoc = 'Nota di credito n. ';
                }

                //if(parseInt(ft.Tipologia) === 0 && ft.FatturaDettagli && ft.FatturaDettagli.FatturaDettagli && ft.FatturaDettagli.FatturaDettagli.length > 0){
                  ft.Linking();
                  var dataFattura = new Date(ft.Data);

                  riepilogo_row.find('table.invoice .ft-nominativo span').html(tipoDoc + ft.Numero + ' del ' + dataFattura.ddmmyyyy());
                  var fdis = ft.FatturaDettagli.FatturaDettagli;
                  var fdi_struct = $('<p class="ft-fdi" style="margin: 0;"><span></span></p>');

                  for (var z = 0; z < fdis.length; z++) {
                    var fdi_struct_clone = fdi_struct.clone();
                    var fdi_matrix = fdis[z].getPDFMatrix();
                    fdi_struct_clone.find('span').append('- ' + fdi_matrix.Title);
                    riepilogo_row.find('table.invoice .ft-nominativo').before().append(fdi_struct_clone);
                  }
                //}

                for (var x = 0; x < rami.length; x++) {
                  var ramo = rami[x];
                  var ramo_struct_clone = ramo_struct.clone();

                  if(x === 0){
                    riepilogo_row.find('table.transactions > tbody').append(pagamento_title.clone());
                  }

                  var importo = new Number(ramo.Importo);

                  if(i === 0 && x === 0 && totNonContabilizzato && totNonContabilizzato > 0){
                    importo += totNonContabilizzato;
                  }

                  tot_pagato_ft += importo;
                  var text_Importo = importo.formatMoney(2);

                  var dataOperazione = new Date(ramo.DataOperazione);
                  var text_DataOperazione = ' - ' + dataOperazione.ddmmyyyy();

                  ramo_struct_clone.find('.transaction-row span.transaction-row__amount').append(text_Importo + ' €');
                  ramo_struct_clone.find('.transaction-row span.transaction-row__date').append(text_DataOperazione);

                  riepilogo_row.find('table.transactions > tbody').append(ramo_struct_clone);

                }

                if(fatturato_loop > totDovRealTime){
                  var totDovutoFuturo = totFatturato - totDovRealTime;
                  fatturato_loop = 0;
                  ft_totale = ft_totale - totDovutoFuturo;
                  diff_pagato_dov_ft = tot_pagato_ft - ft_totale;
                  var curdate = new Date();
                  riepilogo_row.find('table.invoice .tot-fattura').append('<br><br><span>Competenza al ' + curdate.ddmmyyyy() + ' : ' + ft_totale.formatMoney(2) + ' €</span>');
                }else{
                  diff_pagato_dov_ft = tot_pagato_ft - ft_totale;
                }

                var diff_text = diff_pagato_dov_ft.formatMoney(2) + ' €';
                if(diff_pagato_dov_ft > 0){
                  diff_text = '+' + diff_text;
                  riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount').css('color', '#50cc41');
                  riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount').css('font-weight', 'bold');
                }else if(diff_pagato_dov_ft < 0){
                  riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount').css('color', '#ff0606');
                  riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount').css('font-weight', 'bold');
                }
                riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount p span').append(diff_text);

                if(diff_pagato_dov_ft != 0){
                  str.find('table.storico-pagamenti > tbody').append(riepilogo_row);
                }

              }
            }

            callback(str);

          } catch (e) {
              console.log(e.message);
          }
        }
      },
      en : {
        subject : "Outstanding Account - MilanoStanze",
        rootNominativo : ".ts-nominativo",
        rootDaVersare : ".totDaVersare",
        bk_details : {
          finlibera : $('<div>Bank Transfer Wire to  <strong>Finlibera s.p.a.</strong><br> IBAN: <strong>IT80S0100501606000000000812</strong><br> Bic/Swift: <strong>BNLIITRR</strong><br> Bank name : <strong>Banca Nazionale Del Lavoro</strong><br> Description of transfer : <strong class="causale"></strong> <br><br><p style="margin: 0;">If payment has recently been made, please accept our thanks and send us your payment receipt allowing us to verify technical problems. </p><br>Your prompt attention to this matter would be greatly appreciated. If you have any queries regarding this account, please contact our office as soon as possible at the following email  : <strong>segreteria@finlibera.it</strong></div>'),
          ecolibera : $('<div>Bank Transfer Wire to <strong>Ecolibera Srl</strong><br> IBAN: <strong>IT88T0100501606000000001225</strong><br> Bic/Swift: <strong>BNLIITRR</strong><br> Bank name : <strong>Banca Nazionale Del Lavoro</strong><br> Description of transfer : <strong class="causale"></strong> <br><br><p style="margin: 0;">If payment has recently been made, please accept our thanks and send us your payment receipt allowing us to verify technical problems. </p><br>Your prompt attention to this matter would be greatly appreciated. If you have any queries regarding this account, please contact our office as soon as possible at the following email  : <strong>segreteria@finlibera.it</strong></div>')
        },
        rootBkDetails : ".bk-details",
        rootCausale : ".causale",
        content : $('<div><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style=" max-width: 680px; margin: 0 !important;"> <tbody><tr> <td style="padding: 20px 20px 20px;text-align: left;"> <h1 style="margin: 0px; font-family: sans-serif; font-size: 24px; line-height: 125%; color: rgb(34, 144, 199); font-weight: normal;">Dear <span class="ts-nominativo"></span>,</h1> </td> </tr> <tr> <td style="padding: 0 20px 20px;font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;text-align: justify;"> <p style="margin: 0;">This email is to formally notify you that according to our records the sum of € <span><strong class="totDaVersare">0</strong></span> is overdue for payment.</p><br><p style="margin: 0;">Please arrange payment of this account as soon as possible and send us your payment receipt at the following email : <strong> pagamenti@finlibera.it </strong></p></td> </tr><tr> <td class="bk-details" style="padding: 0 20px 20px;font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;text-align: justify;"> </td> </tr><tr> <td style="padding: 0 20px 0px;font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;text-align: justify;"><h2 style="margin: 0;font-family: sans-serif;font-size: 18px;line-height: 125%;font-weight: bold;border-bottom: 2px solid;">Amounts paid that do not correspond to the invoices issued :</h2> </td> </tr><tr> <td bgcolor="#ffffff" align="left" height="100%" valign="top" width="100%" style=""> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="left" width="660"> <tr> <td align="left" valign="top" width="660"> <![endif]--> <table class="storico-pagamenti" role="presentation" border="0" cellpadding="0" cellspacing="0" align="left" width="100%" style="max-width:660px;"> <tbody></tbody></table> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr><tr> <td style="padding: 40px 40px 40px;font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;text-align: justify;"> <p style="margin: 0;">Regards,</p><span><strong>Administrative Secretary</strong></span> </td> </tr> </tbody></table></div>'),
        build : function(ins, accountBalance, callback){
          try {
            var self = this;

            if(!callback)
              throw new TypeError('TextTemplate - callback undefined');

            if(!ins || !(ins instanceof Inquilino_Stanza))
              throw new TypeError('TextTemplate - ins undefined');

            if(!ins.Inquilino || !(ins.Inquilino instanceof Inquilino))
              throw new TypeError('TextTemplate - inquilino undefined');

            var nominativo = ins.Inquilino.getFormalNominativo();
            var balance = accountBalance.Balance;
            var societa = accountBalance.Societa;
            console.log(accountBalance);
            var totFatturato = new Number(accountBalance.TotFatturato);
            var totDovRealTime = new Number(accountBalance.TotDovInRealTime);
            var totVersato = new Number(accountBalance.TotVersato);
            var totDaVersare = totDovRealTime - totVersato;
            var totNonContabilizzato = new Number(ins.ImportoNonContabilizzato);

            if(totNonContabilizzato && totNonContabilizzato > 0){
              totDovRealTime += totNonContabilizzato;
            }

            balance.sort(function(a,b){
              // Turn your strings into dates, and then subtract them
              // to get a value that is either negative, positive, or zero.
              return new Date(a.Fattura.Data) - new Date(b.Fattura.Data);
            });

            var str = self.content.clone();
            str.find(self.rootNominativo).append(nominativo);
            str.find(self.rootDaVersare).html(totDaVersare.formatMoney(2));

            switch (parseInt(societa)) {
              case 0:
                str.find(self.rootBkDetails).append(self.bk_details.finlibera.clone());
                str.find(self.rootCausale).append(nominativo);
                break;
              case 1:
                str.find(self.rootBkDetails).append(self.bk_details.ecolibera.clone());
                str.find(self.rootCausale).append(nominativo);
                break;
            }

            var riepilogo_row_struct = $('<tr> <td bgcolor="#ffffff" align="center" height="100%" valign="top" width="100%" style=""> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" width="660"> <tr> <td align="center" valign="top" width="660"> <![endif]--> <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" width="100%" style="max-width:660px;"> <tbody><tr> <td bgcolor="#ffffff" align="center" valign="top" style="font-size:0;padding: 10px 0 20px;"> </td> </tr><tr> <td bgcolor="#f8f8f8" align="center" valign="top" style="font-size:0;padding: 10px 0 40px;"> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" width="660"> <tr> <td align="left" valign="top" width="220"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; max-width:33.33%; min-width:220px; vertical-align:top; width:100%;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px;"> <table class="invoice" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody><tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p style="margin: 0;border-bottom: 2px solid #555555;"><strong><span>INVOICE</span></strong></p> </td> </tr> <tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p class="ft-nominativo" style="margin: 0;"><span></span></p> </td> </tr><tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p class="tot-fattura" style="margin: 0;"><span></span></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> <td align="left" valign="top" width="220"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; max-width:33.33%; min-width:220px; vertical-align:top; width:100%;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px;"> <table class="transactions" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> <td align="left" valign="top" width="220"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; max-width:33.33%; min-width:220px; vertical-align:top; width:100%;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px;"> <table class="diff-transactions" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody><tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p style="margin: 0;border-bottom: 2px solid #555555;"><strong><span>DIFFERENCE</span></strong></p> </td> </tr> <tr> <td class="diff-transactions__amount" style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p style="margin: 0;"><span></span></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr><tr> <td bgcolor="#ffffff" align="center" valign="top" style="font-size:0;padding: 10px 0 20px;"> </td> </tr> </tbody></table> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr>');

            var pagamento_title = $('<tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p style="margin: 0;border-bottom: 2px solid #555555;"><strong><span>PAID</span></strong></p> </td> </tr>');
            var ramo_struct = $('<tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p class="transaction-row" style="margin: 0;"><span class="transaction-row__amount"></span><span class="transaction-row__date"></span></p> </td> </tr>');

            var fatturato_loop = 0;

            for (var i = 0; i < balance.length; i++) {
              var bal = balance[i];
              var riepilogo_row = riepilogo_row_struct.clone();
              var ft_tmp = bal.Fattura;
              var ft = new Fattura();
              ft_tmp = $.extend(ft, ft_tmp);
              var tot_pagato_ft = 0;
              var diff_pagato_dov_ft = 0;

              if(parseInt(ft.Tipologia) !== 3){
                var rami = bal.Rami;
                rami.sort(function(a,b){
                  // Turn your strings into dates, and then subtract them
                  // to get a value that is either negative, positive, or zero.
                  return new Date(a.DataOperazione) - new Date(b.DataOperazione);
                });

                var ft_nominativo = ft.getNominativo();
                var ft_totale = new Number(ft.Totale);
                var tipoDoc = 'Invoice n. ';
                var ft_totale_txt = ft_totale;

                if(parseInt(ft.Tipologia) === 4){
                  ft_totale_txt = 0 - ft_totale_txt;
                }

                if(parseInt(ft.Tipologia) !== 4){
                  fatturato_loop += ft_totale;
                }

                riepilogo_row.find('table.invoice .ft-nominativo span').append(ft_nominativo);
                riepilogo_row.find('table.invoice .tot-fattura span').append('Total Invoice Amount : ' + ft_totale_txt.formatMoney(2) + ' €');

                if(parseInt(ft.Tipologia) === 4){
                  ft_totale = -ft_totale;
                  fatturato_loop += ft_totale;
                  tipoDoc = 'Credit note n. ';
                }

                //if(parseInt(ft.Tipologia) === 0 && ft.FatturaDettagli && ft.FatturaDettagli.FatturaDettagli && ft.FatturaDettagli.FatturaDettagli.length > 0){
                  ft.Linking();
                  var dataFattura = new Date(ft.Data);
                  riepilogo_row.find('table.invoice .ft-nominativo span').html(tipoDoc + ft.Numero + ' - ' + dataFattura.ddmmyyyy());
                  var fdis = ft.FatturaDettagli.FatturaDettagli;
                  var fdi_struct = $('<p class="ft-fdi" style="margin: 0;"><span></span></p>');

                  for (var z = 0; z < fdis.length; z++) {
                    var fdi_struct_clone = fdi_struct.clone();
                    var fdi_matrix = fdis[z].getPDFMatrix();
                    fdi_struct_clone.find('span').append('- ' + fdi_matrix.Title);
                    riepilogo_row.find('table.invoice .ft-nominativo').before().append(fdi_struct_clone);
                  }
                //}

                for (var x = 0; x < rami.length; x++) {
                  var ramo = rami[x];
                  var ramo_struct_clone = ramo_struct.clone();

                  if(x === 0){
                    riepilogo_row.find('table.transactions > tbody').append(pagamento_title.clone());
                  }

                  var importo = new Number(ramo.Importo);

                  if(i === 0 && x === 0 && totNonContabilizzato && totNonContabilizzato > 0){
                    importo += totNonContabilizzato;
                  }

                  tot_pagato_ft += importo;
                  var text_Importo = importo.formatMoney(2);

                  var dataOperazione = new Date(ramo.DataOperazione);
                  var text_DataOperazione = ' - ' + dataOperazione.ddmmyyyy();

                  ramo_struct_clone.find('.transaction-row span.transaction-row__amount').append(text_Importo + ' €');
                  ramo_struct_clone.find('.transaction-row span.transaction-row__date').append(text_DataOperazione);

                  riepilogo_row.find('table.transactions > tbody').append(ramo_struct_clone);

                }

                if(fatturato_loop > totDovRealTime){
                  var totDovutoFuturo = totFatturato - totDovRealTime;
                  fatturato_loop = 0;
                  ft_totale = ft_totale - totDovutoFuturo;
                  diff_pagato_dov_ft = tot_pagato_ft - ft_totale;
                  var curdate = new Date();
                  riepilogo_row.find('table.invoice .tot-fattura').append('<br><br><span>Total as of ' + curdate.ddmmyyyy() + ' : ' + ft_totale.formatMoney(2) + ' €</span>');
                }else{
                  diff_pagato_dov_ft = tot_pagato_ft - ft_totale;
                }

                var diff_text = diff_pagato_dov_ft.formatMoney(2) + ' €';
                if(diff_pagato_dov_ft > 0){
                  diff_text = '+' + diff_text;
                  riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount').css('color', '#50cc41');
                  riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount').css('font-weight', 'bold');
                }else if(diff_pagato_dov_ft < 0){
                  riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount').css('color', '#ff0606');
                  riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount').css('font-weight', 'bold');
                }
                riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount p span').append(diff_text);

                if(diff_pagato_dov_ft != 0){
                  str.find('table.storico-pagamenti > tbody').append(riepilogo_row);
                }

              }
            }

            callback(str);

          } catch (e) {
              console.log(e.message);
          }
        }
      }
    },
    1 : {
      it : {
        subject : "MilanoStanze - Ultimo avviso",
        rootNominativo : ".ts-nominativo",
        rootDaVersare : ".totDaVersare",
        bk_details : {
          finlibera : $('<div>Bonifico Bancario da intestare a <strong>Finlibera s.p.a.</strong><br> IBAN: <strong>IT80S0100501606000000000812</strong><br> Bic/Swift: <strong>BNLIITRR</strong><br> Nome Banca: <strong>Banca Nazionale Del Lavoro</strong><br> Causale : <strong class="causale"></strong> <br></div>'),
          ecolibera : $('<div>Bonifco Bancario intestato a <strong>Ecolibera Srl</strong><br> IBAN: <strong>IT88T0100501606000000001225</strong><br> Bic/Swift: <strong>BNLIITRR</strong><br> Nome Banca: <strong>Banca Nazionale Del Lavoro</strong><br> Causale : <strong class="causale"></strong> <br></div>')
        },
        rootBkDetails : ".bk-details",
        rootCausale : ".causale",
        content : $('<div><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style=" max-width: 680px; margin: 0 !important;"> <tbody><tr> <td style="padding: 20px 20px 20px;text-align: left;"> <h1 style="margin: 0px; font-family: sans-serif; font-size: 24px; line-height: 125%; color: rgb(34, 144, 199); font-weight: normal;">Gentile <span class="ts-nominativo"></span>,</h1> </td> </tr> <tr> <td style="padding: 0 20px 20px;font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;text-align: justify;"> <p style="margin: 0;">Non ostante i precedenti solleciti, non risulta ancora versato l’importo di € <span><strong class="totDaVersare">0</strong></span></p><br><p style="margin: 0;">Secondo la normativa vigente in materia locatizia la sua condotta risulta inadempiente ai sensi dell’articolo 1587 cod. civ. e pertanto verrà considerato moroso.</p><br><p style="margin: 0;">Tutto quanto sopra ritenuto e premesso, si <strong>intima</strong> l’immediato pagamento di quanto dovuto e ancora non corrisposto entro e non oltre <strong>5 giorni</strong> dal ricevimento della presente, avvertendola che vanamente decorso il concesso termine Finlibera Spa in qualità di parte Locatrice, sarà libera di recedere immediatamente ed unilateralmente dal contratto di locazione sottoscritto ai sensi e per gli effetti dell’articolo 1453 codice civile, conferendo comunque mandato ai propri legali per il recupero forzoso del credito anche mediante pignoramento dei beni o del 1/5 dello stipendio.</p><br><p style="margin : 0;">Valga la presente quale formale costituzione in mora ed interruzione del termine prescrizionale.</p><br><p class="bk-details" style="margin : 0;"></p><br><p style="margin : 0;">Si richiede inoltre l’immediato invio della ricevuta contabile del suddetto pagamento all’indirizzo <strong>pagamenti@finlibera.it</strong></p><br><p style="margin : 0;">Per ogni richiesta di informazioni o chiarimenti scrivere a <strong>pagamenti@finlibera.it</strong></p> </td> </tr><tr> <td style="padding: 0 20px 0px;font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;text-align: justify;"><h2 style="margin: 0;font-family: sans-serif;font-size: 18px;line-height: 125%;font-weight: bold;border-bottom: 2px solid;">Importi pagati non corrispondenti alle fatture emesse :</h2> </td> </tr><tr> <td bgcolor="#ffffff" align="left" height="100%" valign="top" width="100%" style=""> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="left" width="660"> <tr> <td align="left" valign="top" width="660"> <![endif]--> <table class="storico-pagamenti" role="presentation" border="0" cellpadding="0" cellspacing="0" align="left" width="100%" style="max-width:660px;"> <tbody></tbody></table> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr><tr> <td style="padding: 40px 40px 40px;font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;text-align: justify;"> <p style="margin: 0;">Cordiali saluti,</p><span><strong>Segreteria Amministrativa</strong></span> </td> </tr> </tbody></table></div>'),
        build : function(ins, accountBalance, callback){
          try {
            var self = this;

            if(!callback)
              throw new TypeError('TextTemplate - callback undefined');

            if(!ins || !(ins instanceof Inquilino_Stanza))
              throw new TypeError('TextTemplate - ins undefined');

            if(!ins.Inquilino || !(ins.Inquilino instanceof Inquilino))
              throw new TypeError('TextTemplate - inquilino undefined');

            var nominativo = ins.Inquilino.getFormalNominativo();
            var balance = accountBalance.Balance;
            var societa = accountBalance.Societa;
            console.log(accountBalance);
            var totFatturato = new Number(accountBalance.TotFatturato);
            var totDovRealTime = new Number(accountBalance.TotDovInRealTime);
            var totVersato = new Number(accountBalance.TotVersato);
            var totDaVersare = totDovRealTime - totVersato;
            var totNonContabilizzato = new Number(ins.ImportoNonContabilizzato);

            if(totNonContabilizzato && totNonContabilizzato > 0){
              totDovRealTime += totNonContabilizzato;
            }

            balance.sort(function(a,b){
              // Turn your strings into dates, and then subtract them
              // to get a value that is either negative, positive, or zero.
              return new Date(a.Fattura.Data) - new Date(b.Fattura.Data);
            });

            var str = self.content.clone();
            str.find(self.rootNominativo).append(nominativo);
            str.find(self.rootDaVersare).html(totDaVersare.formatMoney(2));

            switch (parseInt(societa)) {
              case 0:
                str.find(self.rootBkDetails).append(self.bk_details.finlibera.clone());
                str.find(self.rootCausale).append(nominativo);
                break;
              case 1:
                str.find(self.rootBkDetails).append(self.bk_details.ecolibera.clone());
                str.find(self.rootCausale).append(nominativo);
                break;
            }

            var riepilogo_row_struct = $('<tr> <td bgcolor="#ffffff" align="center" height="100%" valign="top" width="100%" style=""> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" width="660"> <tr> <td align="center" valign="top" width="660"> <![endif]--> <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" width="100%" style="max-width:660px;"> <tbody><tr> <td bgcolor="#ffffff" align="center" valign="top" style="font-size:0;padding: 10px 0 20px;"> </td> </tr><tr> <td bgcolor="#f8f8f8" align="center" valign="top" style="font-size:0;padding: 10px 0 40px;"> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" width="660"> <tr> <td align="left" valign="top" width="220"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; max-width:33.33%; min-width:220px; vertical-align:top; width:100%;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px;"> <table class="invoice" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody><tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p style="margin: 0;border-bottom: 2px solid #555555;"><strong><span>FATTURA</span></strong></p> </td> </tr> <tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p class="ft-nominativo" style="margin: 0;"><span></span></p> </td> </tr><tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p class="tot-fattura" style="margin: 0;"><span></span></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> <td align="left" valign="top" width="220"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; max-width:33.33%; min-width:220px; vertical-align:top; width:100%;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px;"> <table class="transactions" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> <td align="left" valign="top" width="220"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; max-width:33.33%; min-width:220px; vertical-align:top; width:100%;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px;"> <table class="diff-transactions" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody><tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p style="margin: 0;border-bottom: 2px solid #555555;"><strong><span>DIFFERENZA</span></strong></p> </td> </tr> <tr> <td class="diff-transactions__amount" style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p style="margin: 0;"><span></span></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr><tr> <td bgcolor="#ffffff" align="center" valign="top" style="font-size:0;padding: 10px 0 20px;"> </td> </tr> </tbody></table> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr>');

            var pagamento_title = $('<tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p style="margin: 0;border-bottom: 2px solid #555555;"><strong><span>PAGATO</span></strong></p> </td> </tr>');
            var ramo_struct = $('<tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p class="transaction-row" style="margin: 0;"><span class="transaction-row__amount"></span><span class="transaction-row__date"></span></p> </td> </tr>');

            var fatturato_loop = 0;

            for (var i = 0; i < balance.length; i++) {
              var bal = balance[i];
              var riepilogo_row = riepilogo_row_struct.clone();
              var ft_tmp = bal.Fattura;
              var ft = new Fattura();
              ft_tmp = $.extend(ft, ft_tmp);
              var tot_pagato_ft = 0;
              var diff_pagato_dov_ft = 0;

              if(parseInt(ft.Tipologia) !== 3){
                var rami = bal.Rami;
                rami.sort(function(a,b){
                  // Turn your strings into dates, and then subtract them
                  // to get a value that is either negative, positive, or zero.
                  return new Date(a.DataOperazione) - new Date(b.DataOperazione);
                });

                var ft_nominativo = ft.getNominativo();
                var ft_totale = new Number(ft.Totale);
                var tipoDoc = 'Ft. ';
                var ft_totale_txt = ft_totale;

                if(parseInt(ft.Tipologia) === 4){
                  ft_totale_txt = 0 - ft_totale_txt;
                }

                if(parseInt(ft.Tipologia) !== 4){
                  fatturato_loop += ft_totale;
                }

                riepilogo_row.find('table.invoice .ft-nominativo span').append(ft_nominativo);
                riepilogo_row.find('table.invoice .tot-fattura span').append('Totale Ft : ' + ft_totale_txt.formatMoney(2) + ' €');

                if(parseInt(ft.Tipologia) === 4){
                  ft_totale = -ft_totale;
                  fatturato_loop += ft_totale;
                  tipoDoc = 'Nota di credito n. ';
                }

                //if(parseInt(ft.Tipologia) === 0 && ft.FatturaDettagli && ft.FatturaDettagli.FatturaDettagli && ft.FatturaDettagli.FatturaDettagli.length > 0){
                  ft.Linking();
                  var dataFattura = new Date(ft.Data);
                  riepilogo_row.find('table.invoice .ft-nominativo span').html(tipoDoc + ft.Numero + ' del ' + dataFattura.ddmmyyyy());
                  var fdis = ft.FatturaDettagli.FatturaDettagli;
                  var fdi_struct = $('<p class="ft-fdi" style="margin: 0;"><span></span></p>');

                  for (var z = 0; z < fdis.length; z++) {
                    var fdi_struct_clone = fdi_struct.clone();
                    var fdi_matrix = fdis[z].getPDFMatrix();
                    fdi_struct_clone.find('span').append('- ' + fdi_matrix.Title);
                    riepilogo_row.find('table.invoice .ft-nominativo').before().append(fdi_struct_clone);
                  }
                //}

                for (var x = 0; x < rami.length; x++) {
                  var ramo = rami[x];
                  var ramo_struct_clone = ramo_struct.clone();

                  if(x === 0){
                    riepilogo_row.find('table.transactions > tbody').append(pagamento_title.clone());
                  }

                  var importo = new Number(ramo.Importo);

                  if(i === 0 && x === 0 && totNonContabilizzato && totNonContabilizzato > 0){
                    importo += totNonContabilizzato;
                  }

                  tot_pagato_ft += importo;
                  var text_Importo = importo.formatMoney(2);

                  var dataOperazione = new Date(ramo.DataOperazione);
                  var text_DataOperazione = ' - ' + dataOperazione.ddmmyyyy();

                  ramo_struct_clone.find('.transaction-row span.transaction-row__amount').append(text_Importo + ' €');
                  ramo_struct_clone.find('.transaction-row span.transaction-row__date').append(text_DataOperazione);

                  riepilogo_row.find('table.transactions > tbody').append(ramo_struct_clone);

                }

                if(fatturato_loop > totDovRealTime){
                  var totDovutoFuturo = totFatturato - totDovRealTime;
                  fatturato_loop = 0;
                  ft_totale = ft_totale - totDovutoFuturo;
                  diff_pagato_dov_ft = tot_pagato_ft - ft_totale;
                  var curdate = new Date();
                  riepilogo_row.find('table.invoice .tot-fattura').append('<br><br><span>Competenza al ' + curdate.ddmmyyyy() + ' : ' + ft_totale.formatMoney(2) + ' €</span>');
                }else{
                  diff_pagato_dov_ft = tot_pagato_ft - ft_totale;
                }

                var diff_text = diff_pagato_dov_ft.formatMoney(2) + ' €';
                if(diff_pagato_dov_ft > 0){
                  diff_text = '+' + diff_text;
                  riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount').css('color', '#50cc41');
                  riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount').css('font-weight', 'bold');
                }else if(diff_pagato_dov_ft < 0){
                  riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount').css('color', '#ff0606');
                  riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount').css('font-weight', 'bold');
                }
                riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount p span').append(diff_text);

                if(diff_pagato_dov_ft != 0){
                  str.find('table.storico-pagamenti > tbody').append(riepilogo_row);
                }

              }
            }

            callback(str);

          } catch (e) {
              console.log(e.message);
          }
        }
      },
      en : {
        subject : "FINAL NOTICE - Outstanding Account - MilanoStanze",
        rootNominativo : ".ts-nominativo",
        rootDaVersare : ".totDaVersare",
        bk_details : {
          finlibera : $('<div>Bank Transfer Wire to  <strong>Finlibera s.p.a.</strong><br> IBAN: <strong>IT80S0100501606000000000812</strong><br> Bic/Swift: <strong>BNLIITRR</strong><br> Bank name : <strong>Banca Nazionale Del Lavoro</strong><br> Description of transfer : <strong class="causale"></strong> <br></div>'),
          ecolibera : $('<div>Bank Transfer Wire to <strong>Ecolibera Srl</strong><br> IBAN: <strong>IT88T0100501606000000001225</strong><br> Bic/Swift: <strong>BNLIITRR</strong><br> Bank name : <strong>Banca Nazionale Del Lavoro</strong><br> Description of transfer : <strong class="causale"></strong> <br></div>')
        },
        rootBkDetails : ".bk-details",
        rootCausale : ".causale",
        content : $('<div><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style=" max-width: 680px; margin: 0 !important;"> <tbody><tr> <td style="padding: 20px 20px 20px;text-align: left;"> <h1 style="margin: 0px; font-family: sans-serif; font-size: 24px; line-height: 125%; color: rgb(34, 144, 199); font-weight: normal;">Dear <span class="ts-nominativo"></span>,</h1> </td> </tr> <tr> <td style="padding: 0 20px 20px;font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;text-align: justify;"> <p style="margin: 0;">We are writing concerning the amount of € <span><strong class="totDaVersare">0</strong></span> which was due to be paid and, despite numerous requests for payment, remains outstanding.</p><br><p style="margin: 0;">As it is stated in the current legislation on the subject of leasing, your conduct is in breach in accordance with Article 1587 of the Italian Civil Code and therefore was considered defaulter.</p><br><p style="margin: 0;">All the above considered, we demand that payment of the full amount be paid to us within five days from today, warning the expiration of the term granted to Finlibera SPA as a Landlord. You will be free to withdraw immediately and unilaterally from the lease agreement signed under Article 1453 of the Italian Civil Code, allowing our lawyers for the forced recovery of the credit also through Civil Asset Forfeiture or 1/5 of the salary.</p><br><p class="bk-details" style="margin : 0;"></p><br><p style="margin : 0;">The entire balance must be paid immediately and the payment receipt must be send at the following email address : <strong>pagamenti@finlibera.it</strong></p><br><p style="margin : 0;">If you have any queries regarding this account, please contact our office as soon as possible at the following email : <strong>pagamenti@finlibera.it</strong></p> </td> </tr><tr> <td style="padding: 0 20px 0px;font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;text-align: justify;"><h2 style="margin: 0;font-family: sans-serif;font-size: 18px;line-height: 125%;font-weight: bold;border-bottom: 2px solid;">Amounts paid that do not correspond to the invoices issued : </h2> </td> </tr><tr> <td bgcolor="#ffffff" align="left" height="100%" valign="top" width="100%" style=""> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="left" width="660"> <tr> <td align="left" valign="top" width="660"> <![endif]--> <table class="storico-pagamenti" role="presentation" border="0" cellpadding="0" cellspacing="0" align="left" width="100%" style="max-width:660px;"> <tbody></tbody></table> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr><tr> <td style="padding: 40px 40px 40px;font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;text-align: justify;"> <p style="margin: 0;">Regards,</p><span><strong>Administrative Secretary</strong></span> </td> </tr> </tbody></table></div>'),
        build : function(ins, accountBalance, callback){
          try {
            var self = this;

            if(!callback)
              throw new TypeError('TextTemplate - callback undefined');

            if(!ins || !(ins instanceof Inquilino_Stanza))
              throw new TypeError('TextTemplate - ins undefined');

            if(!ins.Inquilino || !(ins.Inquilino instanceof Inquilino))
              throw new TypeError('TextTemplate - inquilino undefined');

            var nominativo = ins.Inquilino.getFormalNominativo();
            var balance = accountBalance.Balance;
            var societa = accountBalance.Societa;
            console.log(accountBalance);
            var totFatturato = new Number(accountBalance.TotFatturato);
            var totDovRealTime = new Number(accountBalance.TotDovInRealTime);
            var totVersato = new Number(accountBalance.TotVersato);
            var totDaVersare = totDovRealTime - totVersato;
            var totNonContabilizzato = new Number(ins.ImportoNonContabilizzato);

            if(totNonContabilizzato && totNonContabilizzato > 0){
              totDovRealTime += totNonContabilizzato;
            }

            balance.sort(function(a,b){
              // Turn your strings into dates, and then subtract them
              // to get a value that is either negative, positive, or zero.
              return new Date(a.Fattura.Data) - new Date(b.Fattura.Data);
            });

            var str = self.content.clone();
            str.find(self.rootNominativo).append(nominativo);
            str.find(self.rootDaVersare).html(totDaVersare.formatMoney(2));

            switch (parseInt(societa)) {
              case 0:
                str.find(self.rootBkDetails).append(self.bk_details.finlibera.clone());
                str.find(self.rootCausale).append(nominativo);
                break;
              case 1:
                str.find(self.rootBkDetails).append(self.bk_details.ecolibera.clone());
                str.find(self.rootCausale).append(nominativo);
                break;
            }

            var riepilogo_row_struct = $('<tr> <td bgcolor="#ffffff" align="center" height="100%" valign="top" width="100%" style=""> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" width="660"> <tr> <td align="center" valign="top" width="660"> <![endif]--> <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" width="100%" style="max-width:660px;"> <tbody><tr> <td bgcolor="#ffffff" align="center" valign="top" style="font-size:0;padding: 10px 0 20px;"> </td> </tr><tr> <td bgcolor="#f8f8f8" align="center" valign="top" style="font-size:0;padding: 10px 0 40px;"> <!--[if mso]> <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" width="660"> <tr> <td align="left" valign="top" width="220"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; max-width:33.33%; min-width:220px; vertical-align:top; width:100%;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px;"> <table class="invoice" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody><tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p style="margin: 0;border-bottom: 2px solid #555555;"><strong><span>INVOICE</span></strong></p> </td> </tr> <tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p class="ft-nominativo" style="margin: 0;"><span></span></p> </td> </tr><tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p class="tot-fattura" style="margin: 0;"><span></span></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> <td align="left" valign="top" width="220"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; max-width:33.33%; min-width:220px; vertical-align:top; width:100%;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px;"> <table class="transactions" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> <td align="left" valign="top" width="220"> <![endif]--> <div style="display:inline-block; margin: 0 -2px; max-width:33.33%; min-width:220px; vertical-align:top; width:100%;" class="stack-column"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"> <tbody><tr> <td style="padding: 10px 10px;"> <table class="diff-transactions" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px;text-align: left;"> <tbody><tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p style="margin: 0;border-bottom: 2px solid #555555;"><strong><span>DIFFERENCE</span></strong></p> </td> </tr> <tr> <td class="diff-transactions__amount" style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p style="margin: 0;"><span></span></p> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </div> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr><tr> <td bgcolor="#ffffff" align="center" valign="top" style="font-size:0;padding: 10px 0 20px;"> </td> </tr> </tbody></table> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr>');

            var pagamento_title = $('<tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p style="margin: 0;border-bottom: 2px solid #555555;"><strong><span>PAID</span></strong></p> </td> </tr>');
            var ramo_struct = $('<tr> <td style="font-family: sans-serif;font-size: 15px;line-height: 140%;color: #555555;padding-top: 10px;"> <p class="transaction-row" style="margin: 0;"><span class="transaction-row__amount"></span><span class="transaction-row__date"></span></p> </td> </tr>');

            var fatturato_loop = 0;

            for (var i = 0; i < balance.length; i++) {
              var bal = balance[i];
              var riepilogo_row = riepilogo_row_struct.clone();
              var ft_tmp = bal.Fattura;
              var ft = new Fattura();
              ft_tmp = $.extend(ft, ft_tmp);
              var tot_pagato_ft = 0;
              var diff_pagato_dov_ft = 0;

              if(parseInt(ft.Tipologia) !== 3){
                var rami = bal.Rami;
                rami.sort(function(a,b){
                  // Turn your strings into dates, and then subtract them
                  // to get a value that is either negative, positive, or zero.
                  return new Date(a.DataOperazione) - new Date(b.DataOperazione);
                });

                var ft_nominativo = ft.getNominativo();
                var ft_totale = new Number(ft.Totale);
                var tipoDoc = 'Invoice n. ';
                var ft_totale_txt = ft_totale;

                if(parseInt(ft.Tipologia) === 4){
                  ft_totale_txt = 0 - ft_totale_txt;
                }

                if(parseInt(ft.Tipologia) !== 4){
                  fatturato_loop += ft_totale;
                }

                riepilogo_row.find('table.invoice .ft-nominativo span').append(ft_nominativo);
                riepilogo_row.find('table.invoice .tot-fattura span').append('Total Invoice Amount : ' + ft_totale_txt.formatMoney(2) + ' €');

                if(parseInt(ft.Tipologia) === 4){
                  ft_totale = -ft_totale;
                  fatturato_loop += ft_totale;
                  tipoDoc = 'Credit note n. ';
                }

                //if(parseInt(ft.Tipologia) === 0 && ft.FatturaDettagli && ft.FatturaDettagli.FatturaDettagli && ft.FatturaDettagli.FatturaDettagli.length > 0){
                  ft.Linking();
                  var dataFattura = new Date(ft.Data);
                  riepilogo_row.find('table.invoice .ft-nominativo span').html(tipoDoc + ft.Numero + ' - ' + dataFattura.ddmmyyyy());
                  var fdis = ft.FatturaDettagli.FatturaDettagli;
                  var fdi_struct = $('<p class="ft-fdi" style="margin: 0;"><span></span></p>');

                  for (var z = 0; z < fdis.length; z++) {
                    var fdi_struct_clone = fdi_struct.clone();
                    var fdi_matrix = fdis[z].getPDFMatrix();
                    fdi_struct_clone.find('span').append('- ' + fdi_matrix.Title);
                    riepilogo_row.find('table.invoice .ft-nominativo').before().append(fdi_struct_clone);
                  }
                //}

                for (var x = 0; x < rami.length; x++) {
                  var ramo = rami[x];
                  var ramo_struct_clone = ramo_struct.clone();

                  if(x === 0){
                    riepilogo_row.find('table.transactions > tbody').append(pagamento_title.clone());
                  }

                  var importo = new Number(ramo.Importo);

                  if(i === 0 && x === 0 && totNonContabilizzato && totNonContabilizzato > 0){
                    importo += totNonContabilizzato;
                  }

                  tot_pagato_ft += importo;
                  var text_Importo = importo.formatMoney(2);

                  var dataOperazione = new Date(ramo.DataOperazione);
                  var text_DataOperazione = ' - ' + dataOperazione.ddmmyyyy();

                  ramo_struct_clone.find('.transaction-row span.transaction-row__amount').append(text_Importo + ' €');
                  ramo_struct_clone.find('.transaction-row span.transaction-row__date').append(text_DataOperazione);

                  riepilogo_row.find('table.transactions > tbody').append(ramo_struct_clone);

                }

                if(fatturato_loop > totDovRealTime){
                  var totDovutoFuturo = totFatturato - totDovRealTime;
                  fatturato_loop = 0;
                  ft_totale = ft_totale - totDovutoFuturo;
                  diff_pagato_dov_ft = tot_pagato_ft - ft_totale;
                  var curdate = new Date();
                  riepilogo_row.find('table.invoice .tot-fattura').append('<br><br><span>Total as of ' + curdate.ddmmyyyy() + ' : ' + ft_totale.formatMoney(2) + ' €</span>');
                }else{
                  diff_pagato_dov_ft = tot_pagato_ft - ft_totale;
                }

                var diff_text = diff_pagato_dov_ft.formatMoney(2) + ' €';
                if(diff_pagato_dov_ft > 0){
                  diff_text = '+' + diff_text;
                  riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount').css('color', '#50cc41');
                  riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount').css('font-weight', 'bold');
                }else if(diff_pagato_dov_ft < 0){
                  riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount').css('color', '#ff0606');
                  riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount').css('font-weight', 'bold');
                }
                riepilogo_row.find('table.diff-transactions > tbody .diff-transactions__amount p span').append(diff_text);

                if(diff_pagato_dov_ft != 0){
                  str.find('table.storico-pagamenti > tbody').append(riepilogo_row);
                }

              }
            }

            callback(str);

          } catch (e) {
              console.log(e.message);
          }
        }
      }
    }
  }
};

/**
 * [HTMLContent description]
 * @param {[String]} text                         [description]
 * @param {[String]} ui                           [description]
 * @param {[Intestatario_DocumentoFiscale]} ts_docF [description]
 */
var HTMLContent = function(text, ui, ts_docF){
  this.text = text;//Ex. Messaggio personalizzato.
  this.ui = ui;//Ex. Finlibera, Ecolibera, Milanostanze
  this.ts_docF = ts_docF;
};

HTMLContent.prototype.getNoInvoiceStructure = function(ins, callback){
  try {
    var self = this;

    if(!callback)
      throw new TypeError('HTMLContent - getNoInvoiceStructure : callback undefined!');

    if(!ins)
      throw new TypeError('HTMLContent - getNoInvoiceStructure : ins undefined!');

    if(!ins.Inquilino)
      throw new TypeError('HTMLContent - getNoInvoiceStructure : Inquilino undefined!');

    if(!ins.Stanza)
      throw new TypeError('HTMLContent - getNoInvoiceStructure : Stanza undefined!');

    if(!ins.Stanza.Appartamento)
      throw new TypeError('HTMLContent - getNoInvoiceStructure : ins.Stanza.Appartamento undefined!');

    console.log(ins);

    var inquilino = ins.Inquilino;
    var lang = inquilino.Lang;
    var stanza = ins.Stanza;
    var apt = stanza.Appartamento;
    var societa = parseInt(apt.Societa);
    var struct = $('<div></div>');

    var base = this.getUiTemplate("milanostanze");
    var baseHTML = null;
    var body = null;
    var template = TextTemplate["invoice"][3][lang];

    template.buildNoInvoice(ins, function(str){
      self.buildTemplate(str, base, null, function(html){
        callback(html);
      });
    });

  } catch (e) {
    console.log(e.message);
  }
};

HTMLContent.prototype.setMailDefaultValues = function(mail, callback){
  var self = this;

  try {
    if (!callback)
      throw new TypeError('HTMLContent - setMailDefaultValues : This method needs a callback argument');

    if (!this.ts_docF || !(this.ts_docF instanceof Intestatario_DocumentoFiscale) || !this.ts_docF.Intestatario || !(this.ts_docF.Intestatario instanceof Intestatario))
      throw new TypeError('HTMLContent - setMailDefaultValues : Error evaluating setMailDefaultValues function parameter data');

    if (!mail || !(mail instanceof Mail))
      throw new TypeError('HTMLContent - setMailDefaultValues : mail undefined');

    if (!this.ui || this.ui === "")
      throw new TypeError('HTMLContent - setMailDefaultValues : ui must be defined');

    var intestatario = this.ts_docF.Intestatario;
    if (!intestatario.Intestatario)
      throw new TypeError('HTMLContent - setMailDefaultValues : customer undefined');

    var customer = intestatario.Intestatario;

    if (!mail.Subject || mail.Subject === ""){
      if(this.ts_docF.DocumentoFiscale && this.ts_docF.DocumentoFiscale.Documento){
        var doc = this.ts_docF.DocumentoFiscale;
        var invoice = doc.Documento;
        var lang = intestatario.getLang();
        if (!lang) {
          lang = "it";
        }
        var st = TextTemplate["invoice"].getStructure(invoice, lang);
        mail.Subject = st.subject;
        var docF  = { Id : doc.Id, Type : doc.Type };
        mail.DocumentoFiscale = docF;
      }else{
        var htmlTemplate = this.getUiTemplate(this.ui);
        if (!htmlTemplate || !htmlTemplate.title)
          throw new TypeError('HTMLContent - setMailDefaultValues : htmlTemplate undefined');
        mail.Subject = htmlTemplate.title;
      }
    }

    if (!mail.To || mail.To.length === 0) {
      if (!customer.getPrimaryEmail() || customer.getPrimaryEmail() === "")
        throw new TypeError('HTMLContent - setMailDefaultValues : email undefined');

      var dest = { Id : intestatario.Id, Type : intestatario.Type};
      mail.To.push({ Mail : customer.getPrimaryEmail()});
      mail.Intestatario = dest;
    }

    if(customer.getSecondaryEmail()){
      mail.To.push({ Mail : customer.getSecondaryEmail()});
    }

    if (!mail.From) {
      mail.From = companyAddresses["finlibera"]["noreply"];
    }
    if (!mail.ReplyTo) {
      mail.ReplyTo = companyAddresses["finlibera"]["segreteria"];
    }

    callback();
  } catch (e) {
    console.log(e.message);
    callback(e);
  }
}

HTMLContent.prototype.setSollecito_EmailDefaultValues = function(ins, mail, subject, callback){
  try {
    var self = this;

    if(!ins)
      throw new TypeError('HTMLContent - setSollecito_EmailDefaultValues : ins undefined');

    if(!ins.Inquilino)
      throw new TypeError('HTMLContent - setSollecito_EmailDefaultValues : Inquilino undefined');

    if(!mail)
      throw new TypeError('HTMLContent - setSollecito_EmailDefaultValues : mail undefined');

    if(!subject)
      throw new TypeError('HTMLContent - setSollecito_EmailDefaultValues : subject undefined');

    if(!callback)
      throw new TypeError('HTMLContent - setSollecito_EmailDefaultValues : callback undefined');

    mail.Subject = subject;
    var customer = ins.Inquilino;
    var test = false;

    if(!test){
      mail.To.push({ Mail : customer.getPrimaryEmail()});
      if(customer.getSecondaryEmail()){
        mail.To.push({ Mail : customer.getSecondaryEmail() });
      }
    }else{
      mail.To.push({ Mail : "ricardo.chavez@milanostanze.it" });
    }

    if (!mail.From) {
      mail.From = companyAddresses["finlibera"]["noreply"];
    }
    if (!mail.ReplyTo) {
      mail.ReplyTo = companyAddresses["finlibera"]["segreteria"];
    }

    callback();

  } catch (e) {
    console.log(e.message);
  }
}

/**
 * [buildTemplate description]
 * @param  {[String]}   middleContent [description]
 * @param  {title, rootText, topContent, middleContent, bottomContent}   template      [description]
 * @param  {Function} callback      [description]
 * @return {[type]}                 [description]
 */
HTMLContent.prototype.buildTemplate = function(middleContent, template, preview, callback){
  try {
    /*if (!middleContent || !template || !template.topContent || !template.bottomContent)
      throw new TypeError('HTMLContent - buildTemplate : Error evaluating buildTemplate function parameter data');*/
    if(!middleContent)
      throw new TypeError('HTMLContent - buildTemplate : middleContent undefined');
    if(!template)
      throw new TypeError('HTMLContent - buildTemplate : template undefined');
    if(!template.topContent)
      throw new TypeError('HTMLContent - buildTemplate : template.topContent undefined');
    if(!template.bottomContent)
      throw new TypeError('HTMLContent - buildTemplate : template.bottomContent undefined');
    if (!callback)
      throw new TypeError('HTMLContent - buildTemplate : This method needs a callback argument');

    var string = template.topContent,
    topContent = $('<div/>').html("<div>" + string + "</div>").contents();

    if(preview){
      topContent.find(template.rootPreview).html(preview);
    }
    var email = $('<div></div>');
    //var email = topContent.html() + middleContent + template.bottomContent;
    email.append(topContent.html());
    email.append(middleContent);
    email.append(template.bottomContent);
    callback(email.html());
  } catch (e) {
    console.log(e.message);
    callback(e);
  }
}

/**
 * [getUiTemplate description]
 * @param  {[type]} tm [description]
 * @return {title, rootText, content}    [description]
 */
HTMLContent.prototype.getUiTemplate = function(tm){
  if(!tm || tm === "")
    throw new TypeError('HTMLContent - Error evaluating getUiTemplate function parameter data');

  return UITemplate[tm];
}

HTMLContent.prototype.setDefaultUi = function(){
  var self = this;

  if (this.ts_docF && this.ts_docF instanceof Intestatario_DocumentoFiscale && this.ts_docF.DocumentoFiscale && this.ts_docF.DocumentoFiscale.Documento) {
    var invoice = this.ts_docF.DocumentoFiscale.Documento;
    try {

      this.ui = "milanostanze";

      /*if(parseInt(invoice.Tipologia) === 3){
        this.ui = "milanostanze";
      }else{
        switch (parseInt(invoice.Societa)) {
          case 0:
            this.ui = "finlibera";
            break;
          case 1:
            this.ui = "ecolibera";
            break;
        }
      }*/
    } catch (e) {
      console.log(e.message);
    }
  }else{
    this.ui = "finlibera";
  }
}

HTMLContent.prototype.getCustomHTMLContent = function(callback){
  var self = this;

  try {
    if(!this.text || this.text === "")
      throw new TypeError('HTMLContent : getCustomHTMLContent - txt must be a string');
    if (!this.ui || this.ui === "")
      throw new TypeError('HTMLContent : getCustomHTMLContent - ui must be defined');

    var htmlTemplate = this.getUiTemplate(this.ui);
    var intestatario = this.ts_docF.Intestatario;
    TextTemplate["customBasicEmail"].build(intestatario, this.text, function(element){
      var string = htmlTemplate.middleContent,
      middleContent = $('<div/>').html("<div>" + string + "</div>").contents();
      middleContent.find(htmlTemplate.rootText).append(element.contents());
      middleContent.find(htmlTemplate.rootText).css("color", htmlTemplate.color);
      self.buildTemplate(middleContent.html(), htmlTemplate, function(content){
        try {
          if (content && content instanceof TypeError)
            throw content;
          if (callback) {
            callback(content);
          }
        } catch (e) {
          callback(e);
        }

      });
    });
  } catch (e) {
    console.log(e.message);
  }
};

HTMLContent.prototype.getInvoiceHTMLContent = function(callback){
  var self = this;

  try {
    if (!this.ui || this.ui === "")
      throw new TypeError('HTMLContent : getInvoiceHTMLContent - ui must be defined');
    if (!this.ts_docF || !(this.ts_docF instanceof Intestatario_DocumentoFiscale) || !this.ts_docF.Intestatario || !this.ts_docF.DocumentoFiscale)
      throw new TypeError('HTMLContent - Error evaluating getInvoiceHTMLContent function parameter data');
    if (!callback)
      throw new TypeError('HTMLContent : getInvoiceHTMLContent -This method needs a callback argument');

    var htmlTemplate = this.getUiTemplate(this.ui);
    var intestatario = this.ts_docF.Intestatario;
    var doc = this.ts_docF.DocumentoFiscale;

    if (!doc.Documento)
      throw new TypeError('HTMLContent - getInvoiceHTMLContent : Documento undefined');
    var invoice = doc.Documento;
    invoice.FatturaDettagli = null;
    invoice.Fattura_Componenti = null;
    invoice.LoadFD(function(){
      invoice.LoadComponenti(function(){
        var lang = intestatario.getLang();
        if (!lang) {
          lang = "it";
        }
        var st = TextTemplate["invoice"].getStructure(invoice, lang);
        st.build(intestatario, invoice, function(element){

          var string = htmlTemplate.middleContent,
          middleContent = $('<div/>').html("<div>" + string + "</div>").contents();
          element.find(st.rootCustomText).css("color", htmlTemplate.color);
          element.find(st.rootNominativo).parent().css("color", htmlTemplate.color);
          var preview = element.find(st.rootCustomText).html();
          middleContent.find(htmlTemplate.rootText).append(element.contents());
          self.buildTemplate(middleContent.html(), htmlTemplate, preview, function(content){
            try {
              if (content && content instanceof TypeError)
                throw content;

              if (callback) {
                callback(content);
              }
            } catch (e) {
              callback(e);
            }
          });
        });
      });
    });
  } catch (e) {
    console.log(e.message);
    callback(e);
  }
}

/*
  Class : emails_solleciti
*/
HTMLContent.prototype.getSollecitoHTMLContent = function(ins, emails_solleciti, callback){
  try {
    var self = this;

    if(!callback)
      throw new TypeError("HTMLContent - getSollecitoHTMLContent: this method needs a callback parameter!");

    if(!ins || !(ins instanceof Inquilino_Stanza))
      throw new TypeError("HTMLContent - getSollecitoHTMLContent: ins parameter undefined!");

    if(!ins.Inquilino || !(ins.Inquilino instanceof Inquilino))
      throw new TypeError('HTMLContent - getSollecitoHTMLContent: inquilino undefined');

    if(!emails_solleciti)
      throw new TypeError("HTMLContent - getSollecitoHTMLContent: emails_solleciti parameter undefined!");

    var content = null;
    var htmlTemplate = this.getUiTemplate("milanostanze");
    var tipoSollecito = emails_solleciti.tipoSollecito;
    var inquilino = ins.Inquilino;
    ins.loadAccountBalance(function(balance){
      switch (parseInt(tipoSollecito)) {
        case 1:
          var lang = inquilino.getLang();
          if (!lang) {
            lang = "it";
          }
          var st = TextTemplate["sollecitiEmail"][0][lang];
          st.build(ins, balance, function(element_content){
            if(element_content){
              var string = htmlTemplate.middleContent,
              middleContent = $('<div/>').html("<div>" + string + "</div>").contents();
              element_content.find(st.rootNominativo).parent().css("color", htmlTemplate.color);
              var preview = element_content.find(st.rootCustomText).html();
              middleContent.find(htmlTemplate.rootText).append(element_content.html());
              self.buildTemplate(middleContent.html(), htmlTemplate, preview, function(content){
                callback(content, st.subject, balance);
              });
            }
          });
          break;
        case 2:
        var lang = inquilino.getLang();
        if (!lang) {
          lang = "it";
        }
        var st = TextTemplate["sollecitiEmail"][1][lang];
        st.build(ins, balance, function(element_content){
          if(element_content){
            var string = htmlTemplate.middleContent,
            middleContent = $('<div/>').html("<div>" + string + "</div>").contents();
            element_content.find(st.rootNominativo).parent().css("color", htmlTemplate.color);
            var preview = element_content.find(st.rootCustomText).html();
            middleContent.find(htmlTemplate.rootText).append(element_content.html());
            self.buildTemplate(middleContent.html(), htmlTemplate, preview, function(content){
              callback(content, st.subject, balance);
            });
          }
        });
          break;
      }

      //callback(content);
    });

  } catch (e) {
    console.log();
  }
}

HTMLContent.prototype.getTextPreview = function(callback){
  var text = "";
  try {
    if (!callback)
      throw new TypeError('HTMLContent : getTextPreview -This method needs a callback argument');

    if (this.text && this.text !== "") {
      text = this.text;
      callback(text);
    }else{
      try {
        if (!this.ts_docF || !(this.ts_docF instanceof Intestatario_DocumentoFiscale) || !this.ts_docF.Intestatario)
          throw new TypeError('HTMLContent - Error evaluating getTextPreview function parameter data');
        var intestatario = this.ts_docF.Intestatario;

        if(this.ts_docF.DocumentoFiscale && this.ts_docF.DocumentoFiscale instanceof DocumentoFiscale){
          var doc = this.ts_docF.DocumentoFiscale;
          var invoice = doc.Documento;
          invoice.LoadFD(function(){
            invoice.LoadComponenti(function(){
              var lang = intestatario.getLang();
              if (!lang) {
                lang = "it";
              }
              var st = TextTemplate["invoice"].getStructure(invoice, lang);
              st.build(intestatario, invoice, function(element){
                text = element.find(st.rootCustomText).contents();
                callback(text);
              });
            });
          });

        }else{
          text = "Inserire testo della mail...";
          callback(text);
        }
      } catch (e) {
        console.log(e.message);
      }
    }
  } catch (e) {
    console.log(e.message);
  }
}

HTMLContent.prototype.getText = function(cb){
  var self = this;
  if (!cb) throw 'HTMLContent : getText -This method needs a callback argument';
  cb(this.text);
};

HTMLContent.prototype.setText = function(txt){
  try {
    if(!txt || txt === "")
      throw new TypeError('txt must be a string');
    this.text = txt;
  } catch (e) {
    console.log(e.message);
  }
};

/*TextTemplate.invoice.prototype.fillText = function(ts_DocF){

}

HTMLContent.prototype.setTextInvoiceTemplate = function(){

}*/
