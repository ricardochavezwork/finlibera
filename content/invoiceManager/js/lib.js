function invoice_acube(fattura_elettronica_header, fattura_elettronica_body, altri_dati){
  this.fattura_elettronica_header = fattura_elettronica_header;
  this.fattura_elettronica_body = fattura_elettronica_body;
  this.altri_dati = altri_dati;
}

function fatture_passive(supplier, invoice, uuid_invoice){
  this.supplier = supplier;
  this.invoice = invoice;
  this.uuid_invoice = uuid_invoice;
}

function fatture_attive(customer, invoice, uuid_invoice, altri_dati){
  this.customer = customer;
  this.invoice = invoice;
  this.uuid_invoice = uuid_invoice;
  this.altri_dati = altri_dati;
}

(function(){

  var header_struct = {
    "dati_trasmissione": {
      "codice_destinatario": null //required
    },
    "cedente_prestatore": {
      "dati_anagrafici": {
        "id_fiscale_iva": {
          "id_paese": null,
          "id_codice": null // required
        },
        "anagrafica": null, // required. typeOnly.
        "regime_fiscale": null // required
      },
      "sede": {
        "indirizzo": null, // required
        "cap": null, // required
        "comune": null, // required
        "nazione": null // required
      }
    },
    "cessionario_committente": {
      "dati_anagrafici": {
        "id_fiscale_iva": null,
        "anagrafica": null // required. typeOnly.
      },
      "sede": {
        "indirizzo": null, // required
        "cap": null, // required
        "comune": null, // required
        "nazione": null // required
      }
    }
  };

  var single_invoice_struct = {
    "dati_generali": {
      "dati_generali_documento": {
        "tipo_documento": null, //required. typeOnly.
        "divisa": "EUR",
        "data": null,// required
        "numero": null, // numero
        "importo_totale_documento" : null
      }
    },
    "dati_beni_servizi": {
      "dettaglio_linee": null, // required. Array of FatturaPADettaglioLinee
      "dati_riepilogo": null // Array of FatturaPADatiRiepilogo
    }
  };

  invoice_acube.prototype.getJWToken = function(callback){
    try {
      var self = this;
      var token = null;

      if(!callback)
        throw new TypeError('invoice_acube - getJWToken : callback undefined.');

      $.ajax({
          method : "POST",
          contentType : "application/json",
          /*url : "https://api-sandbox.acubeapi.com/login_check",
          data : JSON.stringify({"email" : "ricardo.chavez@finlibera.it", "password" : "Z8tf03O1sw7Dt52C"})*/
          url : "https://api.acubeapi.com/login_check",
          data : JSON.stringify({"email" : "ricardo.chavez@finlibera.it", "password" : "9#Rm6?g-PE65weak"})
      }).done(function(res){
        if(res && res.token){
          token = res.token;
        }

        callback(token);
      });
    } catch (e) {
      console.log(e.message);
    }
  }

  /**
   * [ TODO: Before sending the invoice,  ]
   * @param  {[type]}   token    [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  invoice_acube.prototype.sendInvoiceToACUBE = function(token, callback){
    try {
      var self = this;

      if(!token)
        throw new TypeError('invoice_acube - sendInvoiceToACUBE : token undefined.');

      if(!callback)
        throw new TypeError('invoice_acube - sendInvoiceToACUBE : callback undefined.');

      this.checkInvoice(function(checkInvoice_res, checkInvoice_errorSms){
        if(!checkInvoice_res && checkInvoice_errorSms && checkInvoice_errorSms.length > 0){
          callback(checkInvoice_res, checkInvoice_errorSms);
        }else{
          self.numbering(1, function(numbering_res, numbering_errors){
            if(numbering_res){
              self.transferToACUBE(token, function(res, errorSms){
                if(res && res.uuid){
                  var uuid = res.uuid;
                  self.saveUUID(uuid, function(uuid_res){
                    if(uuid_res && uuid_res.success){
                      callback(true);
                    }else{
                      var uuid_smsError = new Array();
                      uuid_smsError.push("Errore riscontrato durante il salvataggio del codice UUID.");
                      callback(false, uuid_smsError);
                    }
                  });
                }else{
                  callback(res, errorSms);
                }
              });
            }else{
              callback(numbering_res, numbering_errors);
            }
          });
        }
      });
    } catch (e) {
      console.log(e.message);
    }
  }

  invoice_acube.prototype.transferToACUBE = function(token, callback){
    try {
      var self = this;

      if(!callback)
        throw new TypeError('invoice_acube - transferToACUBE : callback undefined.');

      if(!token)
        throw new TypeError('invoice_acube - transferToACUBE : token undefined.');

      var invoice = JSON.stringify(this);
      var errorSms = new Array();

      $.ajax({
          method : "POST",
          contentType : "application/json",
          /*url : "https://api-sandbox.acubeapi.com/invoices",*/
          url : "https://api.acubeapi.com/invoices",
          beforeSend: function(xhr) {
               xhr.setRequestHeader("Authorization", "Bearer " + token)
          },
          data : invoice,
          error: function(e) {
            if(e && e.responseJSON && e.responseJSON['hydra:description']){
              errorSms.push( e.responseJSON['hydra:description']);
              callback(false, errorSms);
            }
          }
      }).done(function(res){
        callback(res);
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  invoice_acube.prototype.RetrievesASpecificInvoice = function(uuid, token, callback){
    try {
      var self = this;

      if(!callback)
        throw new TypeError('invoice_acube - RetrievesASpecificInvoice : callback undefined.');

      if(!token)
        throw new TypeError('invoice_acube - RetrievesASpecificInvoice : token undefined.');

      if(!uuid)
        throw new TypeError('invoice_acube - RetrievesASpecificInvoice : uuid undefined.');

      var errorSms = new Array();

      $.ajax({
          method : "GET",
          contentType : "application/json",
          url : "https://api.acubeapi.com/invoices/" + uuid,
          beforeSend: function(xhr) {
               xhr.setRequestHeader("Authorization", "Bearer " + token);
               xhr.setRequestHeader("Accept", "application/json");
          },
          error: function(e) {
            if(e && e.responseJSON && e.responseJSON['hydra:description']){
              errorSms.push( e.responseJSON['hydra:description']);
              callback(false, errorSms);
            }
          }
      }).done(function(res){
        callback(res);
      });
    } catch (e) {
      console.log(e.message);
    }
  }

  invoice_acube.prototype.DownloadPDF = function(item, uuid, token){
    try {
      var self = this;

      if(!token)
        throw new TypeError('invoice_acube - DownloadPDF : token undefined.');

      if(!uuid)
        throw new TypeError('invoice_acube - DownloadPDF : uuid undefined.');

      if(!item)
        throw new TypeError('invoice_acube - DownloadPDF : item undefined.');

      var supplier = item.supplier;
      var invoice = item.invoice;

      var dati = {
        uuid : uuid,
        token : token
      }

      var clone = encodeURIComponent(JSON.stringify(dati));

      $.ajax({
          method: "POST",
          url: '?action=DownloadPDF',
          data: { data : clone },
      }).done(function(res){
        if(res && res.success && res.pdf){
          var pdf = res.pdf;
          var linkSource = "data:application/pdf;base64," + pdf;
          var downloadLink = document.createElement("a");
          var fileName = invoice.getNominativo() + " - " + supplier.getNominativo() + ".pdf";

          downloadLink.href = linkSource;
          downloadLink.download = fileName;
          downloadLink.click();
        }else{
          bootbox.alert("Si è verificato un errore durante il download del file.");
        }
      }).fail(function(xhr, status, error) {
        DefaultErrorHandler(xhr, status, error);
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  invoice_acube.prototype.DownloadAttachments = function(attachments, callback){
    try {
      var self = this;

      if(!attachments)
        throw new TypeError('invoice_acube - DownloadAttachments : attachments undefined!');

      if(!callback)
        throw new TypeError('invoice_acube - DownloadAttachments : callback undefined!');

      for (var i = 0; i < attachments.length; i++) {
        var attachment = attachments[i];
        var format = null;
        var out = attachment.attachment;
        var formato_attachment = attachment.formato_attachment ? attachment.formato_attachment.toUpperCase() : null;
        var nome_attachment = attachment.nome_attachment;

        if(!formato_attachment && nome_attachment){
          formato_attachment = nome_attachment.substr(nome_attachment.length - 3).toUpperCase();
        }

        switch (formato_attachment) {
          case "PDF":
            format = "application/pdf";
            break;
          case "JPG":
            format = "application/jpg";
            break;
          case "TXT":
            format = "application/txt";
            break;
        }

        if(format){
          var linkSource = "data:" + format + ";base64," + out;
          var downloadLink = document.createElement("a");
          var fileName = nome_attachment;

          downloadLink.href = linkSource;
          downloadLink.download = fileName;
          downloadLink.click();
        }else{
          console.log(attachment);
          bootbox.alert("Questo formato non è ancora stato abilitato. Comunicare questo messaggio e richiedere assitenza.");
        }

      }

      callback();

    } catch (e) {
      console.log(e.message);
    }
  }

  invoice_acube.prototype.getNotification = function(uuid_notif, callback){
    try {
      var self = this;

      if(!uuid_notif)
        throw new TypeError('invoice_acube - getNotification : uuid_notif undefined.');

      if(!callback)
        throw new TypeError('invoice_acube - getNotification : callback undefined.');

      this.getJWToken(function(token){
        if(token){
          $.ajax({
              method : "GET",
              contentType : "application/json",
              url : "https://api.acubeapi.com/notifications/" + uuid_notif,
              beforeSend: function(xhr) {
                   xhr.setRequestHeader("Authorization", "Bearer " + token)
              }
          }).done(function(res){
            callback(res);
          });
        }
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  invoice_acube.prototype.getInvoice = function(uuid_invoice, callback){
    try {
      var self = this;

      if(!uuid_invoice)
        throw new TypeError('invoice_acube - getNotification : uuid_invoice undefined.');

      if(!callback)
        throw new TypeError('invoice_acube - getNotification : callback undefined.');

      this.getJWToken(function(token){
        if(token){
          $.ajax({
              method : "GET",
              contentType : "application/json",
              url : "https://api.acubeapi.com/invoices/" + uuid_invoice,
              beforeSend: function(xhr) {
                   xhr.setRequestHeader("Authorization", "Bearer " + token)
              }
          }).done(function(res){
            callback(res);
          });
        }
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  /**
   * Una bozza di fattura prima di essere inviata ad acube si dovrà il numero e la data.
   * Su PHP ci sarà un controllo che si occuperà di non sovrascrivere il numero e la data di fattura per quelle
   * fatture che abbiano già tali campi. Il prossimo numero di fattura sarà dopo la fattura con l'ultimo numero
   * e che abbia un UUID.Questo perchè se la ft viene respinta da ACUBE, evitiamo di creare dei buchi.
   * Se una fattura viene respinta, allora si utilizzerà la modalita 2 di rimozione.
   */
  invoice_acube.prototype.numbering = function(mode, callback){
    try {
      var self = this;

      if(!mode || !(mode > 0))
        throw new TypeError('invoice_acube - numbering : mode undefined.');

      if(!callback)
        throw new TypeError('invoice_acube - numbering : callback undefined.');

      var dati = {
        id_invoice : self.altri_dati.id_invoice,
        mode : mode
      }

      var clone = encodeURIComponent(JSON.stringify(dati));
      $.ajax({
          method: "POST",
          url: '?action=numbering',
          data: { data : clone },
      }).done(function(res){
        console.log("Numero ricevuto");
        console.log(res);
        if(res && res.success && res.dati){
          self.setNumbering(res.dati);
          callback(true);
        }else{
          var errors = new Array('Errore di assegnazione/rimozione numero e data di fattura');
          callback(false, errors);
        }

      }).fail(function(xhr, status, error) {
        DefaultErrorHandler(xhr, status, error);
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  invoice_acube.prototype.setNumbering = function(dati){
    try {
      var self = this;

      if(!dati)
        throw new TypeError('invoice_acube - setNumbering : dati undefined.');

      /*var body = this.fattura_elettronica_body[0];
      var dati_generali = body.dati_generali;
      var dati_generali_documento = dati_generali.dati_generali_documento;

      dati_generali_documento.numero = dati.numero;
      dati_generali_documento.data = dati.data;*/

      this.fattura_elettronica_body[0].dati_generali.dati_generali_documento.numero = dati.numero;
      this.fattura_elettronica_body[0].dati_generali.dati_generali_documento.data = dati.data;

    } catch (e) {
      console.log(e.message);
    }
  }

  invoice_acube.prototype.saveUUID = function(uuid, callback){
    try {
      var self = this;

      if(!uuid)
        throw new TypeError('invoice_acube - saveUUID : uuid undefined.');

      if(!callback)
        throw new TypeError('invoice_acube - saveUUID : callback undefined.');

      if(!this.altri_dati)
        throw new TypeError('invoice_acube - saveUUID : this.altri_dati undefined');

      var altri_dati = this.altri_dati;

      if(!(parseInt(altri_dati.id_invoice) > 0))
        throw new TypeError('invoice_acube - saveUUID : altri_dati.id_invoice undefined.');

      var id_invoice = altri_dati.id_invoice;
      var dati = {
        uuid : uuid,
        id_invoice : id_invoice
      };

      var clone = encodeURIComponent(JSON.stringify(dati));

      $.ajax({
          method: "POST",
          url: '?action=saveUUID',
          data: { data : clone },
      }).done(function(res){
        callback(res);
      }).fail(function(xhr, status, error) {
        DefaultErrorHandler(xhr, status, error);
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  invoice_acube.prototype.checkInvoice = function(callback){
    try {

      var self = this;
      var res = true;
      var errorSms = new Array();

      if(!callback)
        throw new TypeError('invoice_acube - checkInvoice : callback undefined!');

      if(!this.fattura_elettronica_header)
        throw new TypeError('invoice_acube - checkInvoice : this.fattura_elettronica_header undefined.');

      if(!this.fattura_elettronica_body)
        throw new TypeError('invoice_acube - checkInvoice : this.fattura_elettronica_body');

      var body = this.fattura_elettronica_body;

      this.checkHeaderFields(function(header_res, header_errorSms){

        if(!header_res && header_errorSms.length > 0){
          res = false;
          errorSms = errorSms.concat(header_errorSms);
        }

        each(body, function(key, r, index){
          self.checkSingleBodyFields(body[index], function(body_res, body_errorSms){
            if(!body_res && body_errorSms.length > 0){
              errorSms = errorSms.concat(body_errorSms);
              res = false;
            }

            //TODO: Controllare che il seguente codice sia effettivamente corretto.
            if(body.length === (index+1)){
              callback(res, errorSms);
            }
          });
        });
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  invoice_acube.prototype.checkHeaderFields = function(callback){
    try {
      var self = this;
      var res = true;
      var errorSms = new Array();

      if(!callback)
        throw new TypeError('invoice_acube - checkHeaderFields : callback undefined!');

      if(!this.fattura_elettronica_header)
        throw new TypeError('invoice_acube - checkHeaderFields : this.fattura_elettronica_header undefined');

      var header = this.fattura_elettronica_header;

      //BEGIN : Checks

      if(!header.dati_trasmissione.codice_destinatario)
        errorSms.push('Dati Trasmissione : Codice Destinatario non valido o non presente!');

      if(!header.cedente_prestatore.dati_anagrafici.id_fiscale_iva.id_codice)
        errorSms.push('Cedente Prestatore : PIVA non valida!');

      if(!header.cedente_prestatore.dati_anagrafici.anagrafica)
        errorSms.push('Cedente Prestatore : Denominazione non valida!');

      if(!header.cedente_prestatore.dati_anagrafici.regime_fiscale)
        errorSms.push('Cedente Prestatore : Regime fiscale non presente.');

      if(!header.cedente_prestatore.sede.indirizzo)
        errorSms.push('Cedente Prestatore : Il campo "indirizzo" della sede non è valido!');

      if(!header.cedente_prestatore.sede.cap)
        errorSms.push('Cedente Prestatore : Il campo "cap" della sede non è valido!');

      if(!header.cedente_prestatore.sede.comune)
        errorSms.push('Cedente Prestatore : Il campo "comune" della sede non è valido!');

      if(!header.cedente_prestatore.sede.nazione)
        errorSms.push('Cedente Prestatore : Il campo "nazione" della sede non è valido!');

      //cessionario_committente

      /*if(!header.cessionario_committente.dati_anagrafici.id_fiscale_iva.id_codice)
        errorSms.push('Cessionario Committente : Codice Fiscale Iva non valida!');*/

      if(!header.cessionario_committente.dati_anagrafici.codice_fiscale && ((!header.cessionario_committente.dati_anagrafici.id_fiscale_iva) || (header.cessionario_committente.dati_anagrafici.id_fiscale_iva && (!header.cessionario_committente.dati_anagrafici.id_fiscale_iva.id_codice || !header.cessionario_committente.dati_anagrafici.id_fiscale_iva.id_paese))))
        errorSms.push('Cessionario Committente : Codice Fiscale e N° ID Estero vuoti. Almeno uno dei due deve essere valorizzato.');

      if(header.cessionario_committente.dati_anagrafici.id_fiscale_iva && header.cessionario_committente.dati_anagrafici.id_fiscale_iva.id_codice && !(header.cessionario_committente.dati_anagrafici.id_fiscale_iva.id_codice.length > 0 && header.cessionario_committente.dati_anagrafici.id_fiscale_iva.id_codice.length <= 28))
        errorSms.push('Cessionario Committente : N° ID Estero deve essere lungo tra 1 e 28 caratteri.');

      if(header.cessionario_committente.dati_anagrafici.codice_fiscale && !(header.cessionario_committente.dati_anagrafici.codice_fiscale.length >= 11 && header.cessionario_committente.dati_anagrafici.codice_fiscale.length <= 16))
        errorSms.push('Cessionario Committente : Codice Fiscale deve essere lungo tra 11 e 16 caratteri.');

      if(!header.cessionario_committente.dati_anagrafici.anagrafica)
        errorSms.push('Cessionario Committente : Denominazione non valida!');

      if(!header.cessionario_committente.sede.indirizzo)
        errorSms.push('Cessionario Committente : Il campo "indirizzo" della sede non è valido!');

      if(!header.cessionario_committente.sede.cap)
        errorSms.push('Cessionario Committente : Il campo "cap" della sede non è valido!');

      if(!header.cessionario_committente.sede.comune)
        errorSms.push('Cessionario Committente : Il campo "comune" della sede non è valido!');

      if(!header.cessionario_committente.sede.nazione)
        errorSms.push('Cessionario Committente : Il campo "nazione" della sede non è valido!');

      //END : Checks

      if(errorSms.length > 0)
        res = false;

      callback(res, errorSms);
    } catch (e) {
      console.log(e.message);
    }
  }

  invoice_acube.prototype.checkSingleBodyFields = function(item, callback){
    try {
      var self = this;
      var res = true;
      var errorSms = new Array();

      if(!item)
        throw new TypeError('invoice_acube - checkSingleBodyFields : item undefined.');

      if(!callback)
        throw new TypeError('invoice_acube - checkSingleBodyFields : callback undefined.');

      if(!this.fattura_elettronica_body)
        throw new TypeError('invoice_acube - checkSingleBodyFields : this.fattura_elettronica_body undefined');

      var body = this.fattura_elettronica_body;

      if(!item.dati_generali.dati_generali_documento.tipo_documento)
        errorSms.push('Dati Generali - Tipo documento non valido o non presente.');

      /*if(!item.dati_generali.dati_generali_documento.data)
        errorSms.push('Dati Generali - Data documento non valido o non presente.');

      if(!item.dati_generali.dati_generali_documento.numero)
        errorSms.push('Dati Generali - Numero documento non valido o non presente.');*/

      if(!(item.dati_beni_servizi.dettaglio_linee.length > 0))
        errorSms.push('Beni e Servizi - Attenzione, non sono presenti beni o servizi.');

      if(!(item.dati_beni_servizi.dati_riepilogo.length > 0))
        errorSms.push('Beni e Servizi - Attenzione, non sono presenti riepiloghi del documento.');

      if(errorSms.length > 0)
        res = false;

      callback(res, errorSms);
    } catch (e) {
      console.log(e.message);
    }
  }

  /**
   * [This function converts a Fattura Object into Invoice-ACUBE Format. Initially, the invoice number is not required. The invoice parameter must have
   * FatturaDettagli Objects and FatturaComponenti Objects]
   * @param  {[type]} invoice [Fattura]
   * @return {[type]}         [invoice_acube]
   */
  invoice_acube.prototype.convertToACUBEFormat = function(supplier, customer, invoice_rows, dati_generali, dati_fatture_collegate, riepilogo, altri_dati){
    try {

      if(!supplier)
        throw new TypeError('invoice_acube - convertToACUBEFormat : supplier undefined.');

      if(!customer)
        throw new TypeError('invoice_acube - convertToACUBEFormat : customer undefined.');

      if(!invoice_rows)
        throw new TypeError('invoice_acube - convertToACUBEFormat : invoice_rows undefined.');

      if(!dati_generali)
        throw new TypeError('invoice_acube - convertToACUBEFormat : dati_generali undefined.');

      if(!riepilogo)
        throw new TypeError('invoice_acube - convertToACUBEFormat : riepilogo undefined.');

      if(!altri_dati)
        throw new TypeError('invoice_acube - convertToACUBEFormat : altri_dati undefined.');

      this.fattura_elettronica_header = $.extend(true, {}, header_struct);
      this.fattura_elettronica_body = new Array();
      this.altri_dati = altri_dati;

      var header = this.fattura_elettronica_header;
      var body = this.fattura_elettronica_body;

      var codice_destinatario = '0000000';

      if(customer.CodiceDestinatario && customer.CodiceDestinatario !== ""){
        codice_destinatario = customer.CodiceDestinatario;
      }

      if(!customer.CodiceDestinatario && !customer.CodiceFiscale && customer.ForeignIdentificationNumber){
        codice_destinatario = 'XXXXXXX';
      }

      header.dati_trasmissione.codice_destinatario = codice_destinatario;
      header.cedente_prestatore.dati_anagrafici.id_fiscale_iva.id_paese = supplier.id_paese;
      header.cedente_prestatore.dati_anagrafici.id_fiscale_iva.id_codice = supplier.id_codice;
      header.cedente_prestatore.dati_anagrafici.anagrafica = supplier.anagrafica;
      header.cedente_prestatore.dati_anagrafici.regime_fiscale = supplier.regime_fiscale;
      header.cedente_prestatore.sede.indirizzo = supplier.indirizzo;
      header.cedente_prestatore.sede.cap = supplier.cap;
      header.cedente_prestatore.sede.comune = supplier.comune;
      header.cedente_prestatore.sede.provincia = supplier.provincia;
      header.cedente_prestatore.sede.nazione = supplier.nazione;

      if(customer.PartitaIva && customer.Paese){
        header.cessionario_committente.dati_anagrafici.id_fiscale_iva = {
          id_paese : customer.Paese,
          id_codice : customer.PartitaIva
        };
      }

      if(customer.PecDestinatario){
        header.dati_trasmissione.pec_destinatario = customer.PecDestinatario;
      }

      if(customer.CodiceFiscale){
        header.cessionario_committente.dati_anagrafici.codice_fiscale = customer.CodiceFiscale ? customer.CodiceFiscale : null;
      }

      if(!customer.CodiceFiscale && customer.ForeignIdentificationNumber){
        header.cessionario_committente.dati_anagrafici.id_fiscale_iva = {
          id_paese : customer.Paese,
          id_codice : customer.ForeignIdentificationNumber
        }
      }

      if(customer.RagioneSociale){
        header.cessionario_committente.dati_anagrafici.anagrafica = {
          denominazione : customer.RagioneSociale
        };
      }else {
        header.cessionario_committente.dati_anagrafici.anagrafica = {
          nome : customer.Nome,
          cognome : customer.Cognome
        };
      }

      header.cessionario_committente.sede.indirizzo = customer.Indirizzo ? customer.Indirizzo : null;
      header.cessionario_committente.sede.numero_civico = customer.Civico ? customer.Civico : null;
      header.cessionario_committente.sede.cap = customer.CAP ? customer.CAP : null;
      header.cessionario_committente.sede.comune = customer.Citta ? customer.Citta : null;
      /*header.cessionario_committente.sede.provincia = customer.Stato ? customer.Stato : null;*/
      header.cessionario_committente.sede.nazione = customer.Paese ? customer.Paese : null;

      var item = {
        "dati_generali" : {
          "dati_generali_documento" : dati_generali,
        },
        "dati_beni_servizi" : {
          "dettaglio_linee" : invoice_rows,
          "dati_riepilogo" : riepilogo
        }
      };

      if(dati_fatture_collegate){
        item.dati_generali.dati_fatture_collegate = new Array();
        item.dati_generali.dati_fatture_collegate.push(dati_fatture_collegate);
      }

      body.push(item);

    } catch (e) {
      console.log(e.message);
    }
  }

  invoice_acube.prototype.get_customer_denominazione = function(){
    try {
      var self = this;
      var denominazione = null;

      if(!this.fattura_elettronica_header)
        throw new TypeError('invoice_acube - get_customer_denominazione : this.fattura_elettronica_header undefined');

      if(!this.fattura_elettronica_header.cessionario_committente)
        throw new TypeError('invoice_acube - get_customer_denominazione : this.fattura_elettronica_header.cessionario_committente undefined');

      if(!this.fattura_elettronica_header.cessionario_committente.dati_anagrafici)
        throw new TypeError('invoice_acube - get_customer_denominazione : this.fattura_elettronica_header.cessionario_committente.dati_anagrafici undefined');

      if(!this.fattura_elettronica_header.cessionario_committente.dati_anagrafici.anagrafica)
        throw new TypeError('invoice_acube - get_customer_denominazione : this.fattura_elettronica_header.cessionario_committente.dati_anagrafici.anagrafica undefined');

      var anagrafica = this.fattura_elettronica_header.cessionario_committente.dati_anagrafici.anagrafica;

      if(anagrafica.denominazione){
        denominazione = anagrafica.denominazione;
      }else if(anagrafica.nome && anagrafica.cognome){
        denominazione = anagrafica.nome + " " + anagrafica.cognome;
      }

      return denominazione;
    } catch (e) {
      console.log(e.message);
    }
  }

  invoice_acube.prototype.get_customer_cf = function(){
    try {
      var self = this;
      var cf_text = "Non presente";

      if(!this.fattura_elettronica_header)
        throw new TypeError('invoice_acube - get_customer_denominazione : this.fattura_elettronica_header undefined');

      if(!this.fattura_elettronica_header.cessionario_committente)
        throw new TypeError('invoice_acube - get_customer_denominazione : this.fattura_elettronica_header.cessionario_committente undefined');

      if(!this.fattura_elettronica_header.cessionario_committente.dati_anagrafici)
        throw new TypeError('invoice_acube - get_customer_denominazione : this.fattura_elettronica_header.cessionario_committente.dati_anagrafici undefined');

      var cf = this.fattura_elettronica_header.cessionario_committente.dati_anagrafici.codice_fiscale;

      if(cf){
        cf_text = 'CF: ' + cf;
      }

      return cf_text;
    } catch (e) {
      console.log(e.message);
    }
  }

  invoice_acube.prototype.get_supplier_denominazione = function(){
    try {
      var self = this;
      var denominazione = null;

      if(!this.fattura_elettronica_header)
        throw new TypeError('invoice_acube - get_supplier_denominazione : this.fattura_elettronica_header undefined');

      if(!this.fattura_elettronica_header.cedente_prestatore)
        throw new TypeError('invoice_acube - get_supplier_denominazione : this.fattura_elettronica_header.cedente_prestatore undefined');

      if(!this.fattura_elettronica_header.cedente_prestatore.dati_anagrafici)
        throw new TypeError('invoice_acube - get_supplier_denominazione : this.fattura_elettronica_header.cedente_prestatore.dati_anagrafici undefined');

      if(!this.fattura_elettronica_header.cedente_prestatore.dati_anagrafici.anagrafica)
        throw new TypeError('invoice_acube - get_supplier_denominazione : this.fattura_elettronica_header.cedente_prestatore.dati_anagrafici.anagrafica undefined');

      if(!this.fattura_elettronica_header.cedente_prestatore.dati_anagrafici.anagrafica.denominazione)
        throw new TypeError('invoice_acube - get_supplier_denominazione : this.fattura_elettronica_header.cedente_prestatore.dati_anagrafici.anagrafica.denominazione undefined');

      var anagrafica = this.fattura_elettronica_header.cedente_prestatore.dati_anagrafici.anagrafica;

      denominazione = anagrafica.denominazione;

      return denominazione;

    } catch (e) {
      console.log(e.message);
    }
  }

  invoice_acube.prototype.get_total_invoice = function(){
    try {
      var self = this;
      var total = 0;

      if(!this.fattura_elettronica_body || !(this.fattura_elettronica_body.length > 0))
        throw new TypeError('invoice_acube - get_total_invoice : this.fattura_elettronica_body error');

      var body = this.fattura_elettronica_body[0];
      var dati_beni_servizi = body.dati_beni_servizi;
      var dati_riepilogo = dati_beni_servizi.dati_riepilogo;

      for (var i = 0; i < dati_riepilogo.length; i++) {
        var dr = dati_riepilogo[i];
        total += parseFloat(dr.imponibile_importo);
        total += parseFloat(dr.imposta);
      }

      return total;
    } catch (e) {
      console.log(e.message);
    }
  }

  invoice_acube.prototype.draftInvoices_row_matrix = function(){
    try {
      var self = this;

      if(!this.altri_dati)
        throw new TypeError('invoice_acube - draftInvoices_row_matrix : this.altri_dati undefined;');

      var altri_dati = this.altri_dati;
      var body = this.fattura_elettronica_body[0];
      var doc = body.dati_generali.dati_generali_documento;

      var data_registrazione = (new Date(altri_dati.data_registrazione)).itaFormat();
      var data_ft = (new Date(doc.data)).ddmmyyyy();
      var totale_ft = (new Number(self.get_total_invoice()).formatMoney(2));

      var matrix = {
        data_registrazione : data_registrazione,
        tipo_documento : altri_dati.tipo_documento,
        total : totale_ft,
        customer_denominazione : self.get_customer_denominazione(),
        supplier_denominazione : self.get_supplier_denominazione(),
        numero : doc.numero,
        tipoDoc : doc.tipo_documento,
        data : data_ft,
        cf : self.get_customer_cf(),
      }

      return matrix;
    } catch (e) {
      console.log(e.message);
    }
  }

  fatture_passive.prototype.Linking = function(){
    try {
      var self = this;

      if(this.supplier){
        this.supplier = $.extend(new Fornitore(), this.supplier);
      }

      if(this.invoice){
        this.invoice = $.extend(new FatturaFornitore(), this.invoice);
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  fatture_passive.prototype.row_matrix = function(){
    try {
      var self = this;

      var supplier = this.supplier;
      var invoice = this.invoice;

      var data_ft = (new Date(invoice.Data)).ddmmyyyy();
      var allegati = "Nessun allegato";
      var denominazione = "";
      var idFiscaleIva = "";
      var importo = (new Number(invoice.Totale).formatMoney(2));
      var societa = "FINLIBERA SPA";
      var uuid = "Non presente";
      var tipoDoc = "Non presente";

      if(this.uuid_invoice){
        uuid = this.uuid_invoice;
      }

      if(invoice.TipoDocumento){
        tipoDoc = invoice.TipoDocumento;
      }

      if(invoice.Societa && parseInt(invoice.Societa) > 0){
        societa = "ECOLIBERA SRL";
      }

      if(supplier.Cognome){
        denominazione = supplier.Cognome;
      }

      if(supplier.Nome){
        denominazione += (denominazione === "" ? supplier.Nome : (" " + supplier.Nome));
      }

      if(supplier.RagioneSociale){
        denominazione += (denominazione === "" ? supplier.RagioneSociale : (" - " + supplier.RagioneSociale));
      }

      if(invoice.Allegati && parseInt(invoice.Allegati) > 0){
        allegati = "Allegati : " + invoice.Allegati;
      }

      if(supplier.CodiceFiscale){
        idFiscaleIva = "CF : " + supplier.CodiceFiscale;
      }

      if(supplier.PartitaIva){
        idFiscaleIva += (idFiscaleIva === "" ? supplier.PartitaIva : (" - P.IVA : " + supplier.PartitaIva));
      }

      var matrix = {
        denominazione : denominazione,
        idFiscaleIva : idFiscaleIva,
        numero : invoice.Numero,
        data : data_ft,
        importo : importo,
        type : tipoDoc,
        uuid : uuid,
        allegati : allegati,
        societa : societa
      };

      return matrix;

    } catch (e) {
      console.log(e.message);
    }
  }

  fatture_attive.prototype.Linking = function(){
    try {
      var self = this;

      if(this.customer){
        switch (parseInt(this.customer.Type)) {
          case 1:
            this.customer = $.extend(new Inquilino(), this.customer);
            break;
          case 2:
            this.customer = $.extend(new AltroCliente(), this.customer);
            break;
        }
      }

      if(this.invoice){
        this.invoice = $.extend(new Fattura(), this.invoice);
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  fatture_attive.prototype.row_matrix = function(){
    try {
      var self = this;

      var customer = this.customer;
      var invoice = this.invoice;

      var data_ft = (new Date(invoice.Data)).ddmmyyyy();
      var denominazione = "";
      var idFiscaleIva = "";
      var importo = (new Number(invoice.Totale).formatMoney(2));
      var societa = "FINLIBERA SPA";
      var uuid = "Non presente";
      var tipoDoc = "Non specificato";

      if(this.uuid_invoice){
        uuid = this.uuid_invoice;
      }

      if(parseInt(invoice.Tipologia) > 0){
        tipoDoc = invoice.titoloTipologia();
      }

      if(invoice.Societa && parseInt(invoice.Societa) > 0){
        societa = "ECOLIBERA SRL";
      }

      if(customer.Cognome){
        denominazione = customer.Cognome;
      }

      if(customer.Nome){
        denominazione += (denominazione === "" ? customer.Nome : (" " + customer.Nome));
      }

      if(customer.RagioneSociale){
        denominazione += (denominazione === "" ? customer.RagioneSociale : (" - " + customer.RagioneSociale));
      }

      if(customer.CodiceFiscale){
        idFiscaleIva = "CF : " + customer.CodiceFiscale;
      }

      if(customer.PartitaIva){
        idFiscaleIva += (idFiscaleIva === "" ? customer.PartitaIva : (" - P.IVA : " + customer.PartitaIva));
      }

      var matrix = {
        denominazione : denominazione,
        idFiscaleIva : idFiscaleIva,
        numero : invoice.Numero,
        data : data_ft,
        importo : importo,
        type : tipoDoc,
        uuid : uuid,
        societa : societa
      };

      return matrix;

    } catch (e) {
      console.log(e.message);
    }
  }

})();
