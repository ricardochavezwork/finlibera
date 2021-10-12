
var JSON_ROOT = "../upload/json/";

/* DESTINATARI */
var DESTINATARI_NONE = 0;
var DESTINATARI_INQUILINI = 1;
var DESTINATARI_CLIENTI = 2;
var DESTINATARI_BENEFICIARI = 3;
var DESTINATARI_MANUTENZIONI = 4;

/* SOCIETA */
var FINLIBERA = 0;
var ECOLIBERA = 1;

//TIPOLOGIE FATTURE
var FATTURA_NONE = 0;
var FATTURA_PI = 1;
var FATTURA_LOCAZIONE = 2;
var FATTURA_CHIUSURA = 3;
var FATTURA_STORNO = 4;
var FATTURA_TARESTV = 5;

const MANUTENZIONE_FEE = 85;

function each(collection, iterator) {
    var index = 0;
    $.each(collection, function(key, value) {
      iterator(key, value, index++);
    });
}

/**
* Execute a function given a delay time
* 
* @param {type} func
* @param {type} wait
* @param {type} immediate
* @returns {Function}
*/
var debounce = function (func, wait, immediate) {
  var timeout;
  return function() {
      var context = this, args = arguments;
      var later = function() {
              timeout = null;
              if (!immediate) func.apply(context, args);
      };
      var now = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (now) func.apply(context, args);
  };
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function DefaultErrorHandler(xhr, status, error){
  //Ajax request failed.
  if(xhr && xhr.status){
    var status = xhr.status;
    switch (status) {
      case 401:
      case 302:
        window.location.href = '/_gestione/login/';
        break;
    }
  }
}

function dateDiff(dt1, dt2){
    /*
     * setup 'empty' return object
     */
    var ret = { days:0, months:0, years:0 };

    /*
     * If the dates are equal, return the 'empty' object
     */
    if (dt1 == dt2) return ret;

    /*
     * ensure dt2 > dt1
     */
    if (dt1 > dt2)
    {
        var dtmp = dt2;
        dt2 = dt1;
        dt1 = dtmp;
    }

    /*
     * First get the number of full years
     */

    var year1 = dt1.getFullYear();
    var year2 = dt2.getFullYear();

    var month1 = dt1.getMonth();
    var month2 = dt2.getMonth();

    var day1 = dt1.getDate();
    var day2 = dt2.getDate();

    /*
     * Set initial values bearing in mind the months or days may be negative
     */

    ret['years'] = year2 - year1;
    ret['months'] = month2 - month1;
    ret['days'] = day2 - day1;

    /*
     * Now we deal with the negatives
     */

    /*
     * First if the day difference is negative
     * eg dt2 = 13 oct, dt1 = 25 sept
     */
    if (ret['days'] < 0)
    {
        /*
         * Use temporary dates to get the number of days remaining in the month
         */
        var dtmp1 = new Date(dt1.getFullYear(), dt1.getMonth() + 1, 1, 0, 0, -1);

        var numDays = dtmp1.getDate();

        ret['months'] -= 1;
        ret['days'] += numDays;

    }

    /*
     * Now if the month difference is negative
     */
    if (ret['months'] < 0)
    {
        ret['months'] += 12;
        ret['years'] -= 1;
    }

    return ret;
}

function dateDiff_countDays(firstDate, secondDate) {
  var one_day=1000*60*60*24;    // Convert both dates to milliseconds
  var date1_ms = firstDate.getTime();
  var date2_ms = secondDate.getTime();    // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;        // Convert back to days and return

  return Math.round(difference_ms/one_day);
}

Date.prototype.yyyymmdd = function() {

    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
    var dd  = this.getDate().toString();

    return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]);
};

Date.prototype.addHours = function(h) {
   this.setTime(this.getTime() + (h*60*60*1000));
   return this;
}

Date.prototype.getDatetimeLocalFormat = function(){

  var res = this.yyyymmdd();
  var hour = (this.getHours() < 10) ? '0' + this.getHours() : this.getHours();
  var minute = (this.getMinutes() < 10) ? '0' + this.getMinutes() : this.getMinutes();
  res += 'T' + hour + ':' + minute;

  return res;
}

Date.prototype.getDateTimeFormat = function(){
  var res = this.yyyymmdd();
  var hour = (this.getHours() < 10) ? '0' + this.getHours() : this.getHours();
  var minute = (this.getMinutes() < 10) ? '0' + this.getMinutes() : this.getMinutes();
  res += ' ' + hour + ':' + minute + ':00';

  return res;
}

Date.prototype.friendlyFormat = function(){
  var delta = Math.round((+new Date - this) / 1000);

  var minute = 60,
      hour = minute * 60,
      day = hour * 24,
      week = day * 7;

  var fuzzy;

  if (delta < 30) {
      fuzzy = 'Aggiornato in questo istante.';
  } else if (delta < minute) {
      fuzzy = 'Aggiornato ' + delta + ' secondi fa.';
  } else if (delta < 2 * minute) {
      fuzzy = 'Aggiornato un minuto fa.'
  } else if (delta < hour) {
      fuzzy = 'Ultimo aggiornamento avvenuto ' + Math.floor(delta / minute) + ' minuti fa.';
  } else if (Math.floor(delta / hour) == 1) {
      fuzzy = "Aggiornato un'ora fa."
  } else if (delta < day) {
      fuzzy = 'Ultimo aggiornamento avvenuto ' + Math.floor(delta / hour) + ' ore fa.';
  } else if (delta < day * 2) {
      fuzzy = 'Ultimo aggiornamento avvenuto ieri.';
  }else{
    fuzzy = 'Ultimo aggiornamento avvenuto il ' + this.itaFormat();
  }

  return fuzzy;
}

Date.prototype.ddmmyyyy = function() {

    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
    var dd  = this.getDate().toString();

    return (dd[1]?dd:"0"+dd[0]) + '/' + (mm[1]?mm:"0"+mm[0]) + '/' + yyyy;
};

Date.prototype.itaFormat = function(){
  var text = this.ddmmyyyy();

  text += " alle " + addZero(this.getHours()) + ':' + addZero(this.getMinutes()) + ':' + addZero(this.getSeconds());

  function addZero(val){
    return parseInt(val) < 10 ? "0" + val : val;
  }

  return text;
}

Number.prototype.formatMoney = function(c, d, t){
var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "," : d,
    t = t == undefined ? "." : t,
    s = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{ 3 })(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

function Attribuzione(Id, Titolo){
 this.Id = Id;
 this.Titolo = Titolo;
}

function Fattura (Id, Numero, Data, Totale, Causale, TipologiaDestinatario, Tipologia, IdGiustificativo, Societa, DataRegistrazione, DataAggiornamento, Modificabile){
   this.Id = parseInt(Id);
   this.Numero = Numero;
   this.Data = Data;
   this.Totale = Totale;
   this.Causale = Causale;
   this.TipologiaDestinatario = parseInt(TipologiaDestinatario);
   this.Tipologia = parseInt(Tipologia);
   this.IdGiustificativo = parseInt(IdGiustificativo);
   this.Societa = parseInt(Societa);
   this.DataRegistrazione = DataRegistrazione;
   this.DataAggiornamento = DataAggiornamento;
   this.Modificabile = Modificabile;
   this.FatturaDettagli;
   this.Fattura_Componenti;
   this.Tipologie = new Array("Altro", "Apertura", "Locazione", "Chiusura", "Nota di credito");
}

Fattura.prototype.getTipologieKeywords = function(){
 var tipologie = new Array();

 var altro = {
   id : 0,
   keywords : ["Altro","Non assegnato"]
 };

 var apertura = {
   id : 1,
   keywords : ["Primo Ingresso","Apertura","Aperture"]
 };

 var locazione = {
   id : 2,
   keywords : ["Locazione", "Locazioni", "Trimestrali"]
 }

 var chiusura = {
   id : 3,
   keywords : ["Chiusura", "Chiusure", "Fine"]
 };

 var nc = {
   id : 4,
   keywords : ["Nota credito", "Note credito", "Storno", "Storni"]
 };

 tipologie.push(altro, apertura, locazione, chiusura, nc);

 return tipologie;
}

Fattura.prototype.titoloTipologia = function(){
 var titolo = "Non assegnato";

 switch (parseInt(this.Tipologia)) {
   case 0:
     titolo = "Altro";
     break;
   case 1:
     titolo = "Apertura";
     break;
   case 2:
     titolo = "Locazione";
     break;
   case 3:
     titolo = "Chiusura";
     break;
   case 4:
     titolo = "Nota di credito";
 }

 return titolo;
};

Fattura.prototype.getTotale = function(){
 var tot = 0;

 if(this.Totale){
   tot = this.Totale;
 }

 return tot;
};

Fattura.prototype.getTitle_Societa = function (){

   var string = "";

   switch (parseInt(this.Societa)) {
     case 0:
       string = "Finlibera SPA";
       break;
     case 1:
       string = "Ecolibera";
       break;
   }

   return string;
};

Fattura.prototype.getTipologieFromText = function(text){
 var tipologie = this.Tipologie;
 var termini = text.split(",");
 var result = new Array();
 if (text && text !== "") {
   for (var x = 0; x < termini.length; x++) {
     var termine = termini[x].replace(/ /g,'');
     for (var i = 0; i < tipologie.length; i++) {
       if (tipologie[i].includes(termine) && !result.includes(i)) {
         result.push(i);
       }
     }
   }
 }

 return result;
};

Fattura.prototype.getNominativo = function(){
 var nominativo = "";

 if(this.Numero && this.Numero !== ""){
   nominativo += (nominativo === "" ? "Ft. " + this.Numero : " Ft. " + this.Numero);
 }

 if(this.Data && this.Data !== ""){
   var dataFattura = new Date(this.Data);
   nominativo += (nominativo === "" ? dataFattura.ddmmyyyy() : " del " + dataFattura.ddmmyyyy() );
 }


 nominativo += (nominativo === "" ? this.titoloTipologia() : " - " + this.titoloTipologia());


 return nominativo;
};

Fattura.prototype.ivaExists = function(){
 var bool = false;

 if (this.FatturaDettagli && this.FatturaDettagli.ivaExists()) {
   bool = true;
 }else if(this.Fattura_Componenti && this.Fattura_Componenti.ivaExists()){
   bool = true;
 }

 return bool;
}

Fattura.prototype.getTotaleMatrix = function(){
 var n = new Number(this.Totale);

 var totale = n.formatMoney(2) + " €";

 return totale;
}

Fattura.prototype.Load = function(callback){
 var self = this;
 if (this.Id && parseInt(this.Id) > 0) {
   var clone = encodeURIComponent(JSON.stringify(this.Id));
   $.ajax({
       method: "POST",
       url: ACTIONS + 'fattura.php?action=load',
       data: { data : clone },
   }).done(function(data){
     if (data && data.data) {
       var res = data.data;
       res = $.extend(self, res);
       //res.Linking();
       if (callback) {
         callback();
       }
     }
   }).fail(function(xhr, status, error) {
     DefaultErrorHandler(xhr, status, error);
   });
 }
}

Fattura.prototype.SaveRelationship = function(ins, callback){
 try {
   var self = this;

   if(!callback)
     throw new TypeError('Fattura - SaveRelationship : This method needs a callback argument');

   var clone = encodeURIComponent(JSON.stringify(this));
   var ins_clone = encodeURIComponent(JSON.stringify(ins));

   $.ajax({
     method: "POST",
     url: ACTIONS + 'fattura.php?action=saveRelationship',
     data: { data : clone, ins : ins_clone },
   }).done(function(res){
     if(res && res.success){
       callback(true);
     }else{
       callback(false);
     }
   }).fail(function(xhr, status, error) {
     DefaultErrorHandler(xhr, status, error);
   });
 } catch (e) {
   console.log(e.message);
 }
}

Fattura.prototype.SearchPreview = function(Filters, callback){
 var self = this;
 var clone = encodeURIComponent(JSON.stringify(self));
 var clone_filters = encodeURIComponent(JSON.stringify(Filters));
 $.ajax({
     method: "POST",
     url: ACTIONS + 'fattura.php?action=searchPreview',
     data: { data : clone, filters : clone_filters },
 }).done(function(data){
   if (data.data) {
     var res = data.data;
     if (callback) {
       callback(res);
     }
   }

 }).fail(function(xhr, status, error) {
   DefaultErrorHandler(xhr, status, error);
 });
};

Fattura.prototype.Search = function(Filters, callback){
 var self = this;
 var clone = encodeURIComponent(JSON.stringify(self));
 var clone_filters = encodeURIComponent(JSON.stringify(Filters));
 $.ajax({
     method: "POST",
     url: ACTIONS + 'fattura.php?action=search',
     data: { data : clone, filters : clone_filters },
 }).done(function(data){
   if (data && data.data) {
     var res = data.data;
     if (callback) {
       callback(res);
     }
   }
 }).fail(function(xhr, status, error) {
   DefaultErrorHandler(xhr, status, error);
 });
};

Fattura.prototype.LoadFD = function(callback){
   var self = this;
   if (!this.FatturaDettagli || this.FatturaDettagli.length === 0) {

     this.FatturaDettagli = new FatturaDettagli();
     this.FatturaDettagli.Load(this, function(){
       if (callback) {
         callback();
       }
     });
   }else{
     callback();
   }
};

Fattura.prototype.LoadComponenti = function(callback){
 var self = this;
 if (!this.Fattura_Componenti || !this.Fattura_Componenti.length === 0) {
   this.Fattura_Componenti = new Fattura_Componenti();
   this.Fattura_Componenti.Load(this, function(){
     if (callback) {
       callback();
     }
   });
 }else{
   callback();
 }

}

Fattura.prototype.getNominativoPDFMatrix = function(){
 var pdfMatrix = "";

 try {
   if (!this.Numero || !(parseInt(this.Numero) > 0))
     throw new TypeError('Fattura - getNominativoPDFMatrix : Numero Error ');
   if (!this.Data || !dateValidation(this.Data))
     throw new TypeError('Fattura - getNominativoPDFMatrix : Data Error ');
   var date = new Date(this.Data);
   pdfMatrix = this.Numero;
   pdfMatrix += "/" + date.getFullYear().toString().substr(2,2);
 } catch (e) {
   console.log(e.message);
 }

 return pdfMatrix;
}

Fattura.prototype.getScadenza = function(){
 var pdfMatrix = "";

 try {
   if (this.FatturaDettagli) {
     var fd = this.FatturaDettagli;
     var locazione = fd.getLocazione();
     var date = new Date(locazione.Inizio);
     pdfMatrix = date.ddmmyyyy();
   }
 } catch (e) {
   console.log(e.message);
 }

 return pdfMatrix;
}

Fattura.prototype.getPDFMatrix = function(){
 var pdfMatrix = "";

 if(this.Data && dateValidation(this.Data)){
   var date = new Date(this.Data);
   pdfMatrix = "Milano, " + date.ddmmyyyy();
 }

 return pdfMatrix;
}

Fattura.prototype.Linking = function(){
 if(this.FatturaDettagli){
   this.FatturaDettagli = $.extend(new FatturaDettagli(), this.FatturaDettagli);
   this.FatturaDettagli.Linking();
 }

 if(this.Fattura_Componenti){
   this.Fattura_Componenti = $.extend(new Fattura_Componenti(), this.Fattura_Componenti);
   this.Fattura_Componenti.Linking();
 }
}

Fattura.prototype.getCustomerDetails = function(callback){
 try {
   var self = this;

   if(!callback)
     throw new TypeError('Fattura - getCustomerDetails : callback undefined.');

   var clone = encodeURIComponent(JSON.stringify(self));
   $.ajax({
       method: "POST",
       url: ACTIONS + 'fattura.php?action=getCustomerDetails',
       data: { data : clone },
   }).done(function(data){
         callback(data);
   }).fail(function(xhr, status, error) {
     DefaultErrorHandler(xhr, status, error);
   });

 } catch (e) {
   console.log(e.message);
 }
}

Fattura.prototype.get_invoice_rows_acube_format = function(){
 try {
   var self = this;


 } catch (e) {
   console.log(e.message);
 }
}

Fattura.prototype.getACUBE_format = function(callback){
 try {
   var self = this;

   if(!callback)
     throw new TypeError('Fattura - getACUBE_format : callback undefined.');

   var clone = encodeURIComponent(JSON.stringify(self));
   $.ajax({
       method: "POST",
       url: ACTIONS + 'fattura.php?action=getACUBE_format',
       data: { data : clone },
   }).done(function(data){
     console.log(data);
         callback(data);
   }).fail(function(xhr, status, error) {
     DefaultErrorHandler(xhr, status, error);
   });

 } catch (e) {
   console.log(e.message);
 }
}

Fattura.prototype.getNumber = function(){
 try {
   var self = this;

   if(!this.Numero)
     throw new TypeError('Fattura - getNumber : this.Numero undefined!');

   var number = this.Numero ? this.Numero : "Numero assente";

   return number;
 } catch (e) {
   console.log(e.message);
 }
}

Fattura.prototype.setStornoTotale = function(callback){
  try {
    var self = this;
 
    if(!callback)
      throw new TypeError('Fattura - setStornoTotale : callback undefined.');
 
    var clone = encodeURIComponent(JSON.stringify(self));
    $.ajax({
        method: "POST",
        url: ACTIONS + 'fattura.php?action=setStornoTotale',
        data: { data : clone },
    }).done(function(data){
      if (data) {
        callback(data);
      }else{
        callback(false);
      }
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });
 
  } catch (e) {
    console.log(e.message);
  }
 }

function Fattura_Storno(IdFattura, IdFatturaStorno, Tipologia){
   this.IdFattura = IdFattura;
   this.IdFatturaStorno = IdFatturaStorno;
   this.Tipologia = Tipologia;
}

Fattura_Storno.prototype.Load = function(callback){
 var self = this;
 if (this.IdFattura && parseInt(this.IdFattura) > 0) {
   var clone = encodeURIComponent(JSON.stringify(this.IdFattura));
   $.ajax({
       method: "POST",
       url: ACTIONS + 'fattura.php?action=loadStorno',
       data: { data : clone },
   }).done(function(data){
     if (data && data.data) {
       var res = data.data;
       res = $.extend(self, res);
       //res.Linking();
       if (callback) {
         callback();
       }
     }
   }).fail(function(xhr, status, error) {
     DefaultErrorHandler(xhr, status, error);
   });
 }
}

function Componente(Id, Titolo, Iva){
   this.Id = Id;
   this.Titolo = Titolo;
   this.Iva = Iva;
}

Componente.prototype.getPDFMatrix = function(){
 var pdfMatrix = "";

 try {
   if ( !this.Titolo || this.Titolo === "" )
     throw new TypeError('Componente : getPDFMatrix - Titolo must be defined');
   pdfMatrix = this.Titolo;

   if (this.Iva && parseInt(this.Iva) === 1) {
     pdfMatrix += " *";
   }

 } catch (e) {
   console.log(e.message);
 }

 return pdfMatrix;
}

Componente.prototype.ivaExists = function(){
 var bool = false;

 if(this.Iva && parseInt(this.Iva) === 1){
   bool = true;
 }

 return bool;
}

function ComponenteDettagli(Id, IdComponente, Prezzo, Inizio, Fine, Componente){
   this.Id = Id;
   this.IdComponente = IdComponente;
   this.Prezzo = Prezzo;
   this.Inizio = Inizio;
   this.Fine = Fine;
   this.Componente = Componente;
}

ComponenteDettagli.prototype.getPDFMatrix = function(){
 var pdfMatrix = {
   Title : null,
   Amount : null
 }
 try {
   if (!this.Componente)
     throw new TypeError('ComponenteDettagli : getPDFMatrix - Componente must be defined');
   pdfMatrix.Title = this.Componente.getPDFMatrix();
   if (!this.Prezzo)
     throw new TypeError('ComponenteDettagli : getPDFMatrix - Amount must be defined');
   var price = new Number(this.Prezzo);
   pdfMatrix.Amount = price.formatMoney(2) + " €";
 } catch (e) {
   console.log(e.message);
 }

 return pdfMatrix;
};

ComponenteDettagli.prototype.Linking = function(){
 if (this.Componente) {
   this.Componente = $.extend(new Componente(), this.Componente);
 }
}

ComponenteDettagli.prototype.ivaExists = function(){
 var bool = false;

 if(this.Componente){
   bool = this.Componente.ivaExists();
 }

 return bool;
}

function Fattura_ComponentiDettagli (IdFattura , IdComponentiDettagli, ComponenteDettagli){
   this.IdFattura = IdFattura;
   this.IdComponentiDettagli = IdComponentiDettagli;
   this.ComponenteDettagli = ComponenteDettagli;
}

Fattura_ComponentiDettagli.prototype.getPDFMatrix = function(){
 var pdfMatrix = null;

 try {
   if ( !this.ComponenteDettagli )
     throw new TypeError('Fattura_ComponentiDettagli : getPDFMatrix - ComponenteDettagli must be defined');
   pdfMatrix = this.ComponenteDettagli.getPDFMatrix();
 } catch (e) {
   console.log(e.message);
 }

 return pdfMatrix;
};

Fattura_ComponentiDettagli.prototype.ivaExists = function(){
 var bool = false;

 if (this.ComponenteDettagli) {
   bool = this.ComponenteDettagli.ivaExists();
 }

 return bool;
}

Fattura_ComponentiDettagli.prototype.Linking = function(){
 if (this.ComponenteDettagli) {
   this.ComponenteDettagli = $.extend(new ComponenteDettagli(), this.ComponenteDettagli);
   this.ComponenteDettagli.Linking();
 }
};

function FatturaDettagli(fatturaDettagli){
 this.FatturaDettagli = fatturaDettagli;
}

FatturaDettagli.prototype.ivaExists = function(){
 var bool = false;
 var tot = 0;
 if (this.FatturaDettagli && this.FatturaDettagli.length > 0) {

   var fds = this.FatturaDettagli;
   for (var i in fds) {
     if (parseInt(fds[i].Iva) === 1) {
       tot++;
     }
   }
 }
 if(tot > 0){
   bool = true;
 }

 return bool;
}

FatturaDettagli.prototype.Linking = function(){
 if(this.FatturaDettagli && this.FatturaDettagli.length > 0){
     var ftComponenti = this.FatturaDettagli;
     each(ftComponenti, function (key, registro, index){
       if (ftComponenti[key].hasOwnProperty('IdCliente')) {
         ftComponenti[key] = $.extend(new FatturaDettagliCliente(), ftComponenti[key]);
         ftComponenti[key].Linking();
       }else if(ftComponenti[key].hasOwnProperty('IdInquilinoStanze')){
         ftComponenti[key] = $.extend(new FatturaDettagliInquilino(), ftComponenti[key]);
         ftComponenti[key].Linking();
       }
     });
 }
}

FatturaDettagli.prototype.Load = function(invoice, callback){
 var self = this;
 if (invoice && parseInt(invoice.Id) > 0) {
   var clone = encodeURIComponent(JSON.stringify(invoice));
   $.ajax({
       method: "POST",
       url: ACTIONS + 'fattura.php?action=loadFD',
       data: { data : clone },
   }).done(function(data){
     if (data && data.data) {
       var res = data.data;
       res = $.extend(self, res);
       res.Linking();
       if (callback) {
         callback();
       }
     }
   }).fail(function(xhr, status, error) {
     DefaultErrorHandler(xhr, status, error);
   });
 }
};

FatturaDettagli.prototype.getLocazione = function(){
 var periodo = null;
 if (this.FatturaDettagli && this.FatturaDettagli.length > 0) {

   var fds = this.FatturaDettagli;
   for (var i in fds) {
     if (parseInt(fds[i].IdAttribuzione) === 25) {
       periodo = fds[i];
     }
   }
 }

 return periodo;
};

FatturaDettagli.prototype.getIva = function(){
 var iva = null;
 if (this.FatturaDettagli && this.FatturaDettagli.length > 0) {

   var fds = this.FatturaDettagli;
   for (var i in fds) {
     if (parseInt(fds[i].IdAttribuzione) === 32) {
       iva = fds[i];
     }
   }
 }

 return iva;
};

FatturaDettagli.prototype.getPeriodoLocazioneText = function(lang){
 var locazione = this.getLocazione();
 var text = null;
 try {
   if (!locazione || !locazione.Inizio)
     throw new TypeError('FatturaDettagli - Locazione is not defined');

   var inizio = new Date(locazione.Inizio);
   text = lang && lang ==="en" ? "from " : "dal ";
   text += inizio.ddmmyyyy() + " ";
   if (locazione.Fine && locazione.Fine !== "" && text) {
     var fine = new Date(locazione.Fine);
     text += lang && lang ==="en" ? " to " : " al ";
     text += fine.ddmmyyyy()
   }

 } catch (e) {
   console.log(e.message);
 }

 return text;
};

FatturaDettagli.prototype.hasDiscounts = function(){
 try {
   var self = this;

   var bool = false;
   var tot = 0;
   if (this.FatturaDettagli && this.FatturaDettagli.length > 0) {

     var fds = this.FatturaDettagli;
     for (var i in fds) {
       if (parseFloat(fds[i].Sconto) > 0) {
         tot++;
       }
     }
   }
   if(tot > 0){
     bool = true;
   }

   return bool;

 } catch (e) {
   console.log(e.message);
 }
}

function Fattura_Componenti(fatturaComponenti){
 this.Fattura_Componenti = fatturaComponenti;
}

/**
* [description]
* @param  { [Fattura]}   invoice  [description]
* @param  { Function} callback [description]
* @return { [type]}            [description]
*/
Fattura_Componenti.prototype.Load = function(invoice, callback){
 var self = this;
 if (invoice && parseInt(invoice.Id) > 0) {
   var clone = encodeURIComponent(JSON.stringify(invoice));
   $.ajax({
       method: "POST",
       url: ACTIONS + 'fattura.php?action=LoadComponenti',
       data: { data : clone },
   }).done(function(data){
     if (data && data.data) {
       var res = data.data;
       res = $.extend(self, res);
       res.Linking();
       if (callback) {
         callback();
       }
     }
   }).fail(function(xhr, status, error) {
     DefaultErrorHandler(xhr, status, error);
   });
 }
}

Fattura_Componenti.prototype.Linking = function(){
 if(this.Fattura_Componenti && this.Fattura_Componenti.length > 0){
     var ftComponenti = this.Fattura_Componenti;
     each(ftComponenti, function (key, registro, index){
       ftComponenti[key] = $.extend(new Fattura_ComponentiDettagli(), ftComponenti[key]);
       ftComponenti[key].Linking();
     });
 }
}

Fattura_Componenti.prototype.ivaExists = function(){
 var bool = false;
 var tot = 0;

 if(this.Fattura_Componenti && this.Fattura_Componenti.length > 0){
     var ftComponenti = this.Fattura_Componenti;
     each(ftComponenti, function (key, registro, index){
       if(ftComponenti[key].ivaExists()){
         tot++;
       }
     });
 }
 if(tot > 0){
   bool = true;
 }

 return bool;
}

function FatturaDettagliInquilino(Id, IdFattura, IdInquilinoStanze, Inizio, Fine, Totale, Sconto, Iva, IdAttribuzione, Descrizione, Attribuzione){
   this.Id = Id;
   this.IdFattura = IdFattura;
   this.IdInquilinoStanze = IdInquilinoStanze;
   this.Inizio = Inizio;
   this.Fine = Fine;
   this.Totale = Totale;
   this.Sconto = Sconto;
   this.Iva = Iva;
   this.IdAttribuzione = IdAttribuzione;
   this.Descrizione = Descrizione;
   this.Attribuzione = Attribuzione;
}

FatturaDettagliInquilino.prototype.Linking = function(){
 if(this.Attribuzione){
   this.Attribuzione = $.extend(new Attribuzione(), this.Attribuzione);
 }
}

FatturaDettagliInquilino.prototype.getPDFMatrix = function(){
 var pdfMatrix = {
   Title : null,
   Amount : null,
   Discount : null,
   Total : null
 };

 if (this.Descrizione && this.Descrizione !== ""){
   pdfMatrix.Title = this.Descrizione;
 }else if(this.Attribuzione && this.Attribuzione instanceof Attribuzione && this.Attribuzione.Titolo){
   pdfMatrix.Title = this.Attribuzione.Titolo;
 }

 try {
   if ((!pdfMatrix.Title || pdfMatrix.Title === "") && this.Id !== -1)
     throw new TypeError('FatturaDettagliInquilino - getPDFMatrix : pdfMatrix.Title empty');
   /* Per le locazioni con Descrizione, non inserire il periodo */
   if(this.Inizio && this.Inizio !== "" && this.Fine && this.Fine !== "" && !(this.IdAttribuzione && parseInt(this.IdAttribuzione) === 25 && this.Descrizione && this.Descrizione !== "")){
     var dataInizio = new Date(this.Inizio);
     var dataFine = new Date(this.Fine);
     pdfMatrix.Title += " " + dataInizio.ddmmyyyy() + " - " + dataFine.ddmmyyyy();
   }

   if (this.Iva && parseInt(this.Iva) === 1) {
     pdfMatrix.Title += " *";
   }
   var amount = new Number(this.Totale);
   var total = amount;
   pdfMatrix.Amount = amount.formatMoney(2) + " €";

   var sconto = new Number(0);
   if(this.Sconto){
     sconto = new Number(this.Sconto);
     total -= sconto;
   }

   pdfMatrix.Discount = sconto.formatMoney(2) + " €";
   pdfMatrix.Total = total.formatMoney(2) + " €";

 } catch (e) {
   console.log(e.message);
 }

 return pdfMatrix;
}

FatturaDettagliInquilino.prototype.switchIva = function(){
 try {
   var self = this;
   if(parseInt(this.Iva) > 0){
     this.Iva = 0;
   }else{
     this.Iva = 1;
   }
 } catch (e) {
   console.log(e.message);
 }
}

FatturaDettagliInquilino.prototype.setDescrizione = function(text){
 try {
   var self = this;

   if(!text || text === "")
     throw new TypeError("FatturaDettagliInquilino - setDescrizione : text undefined");

   this.Descrizione = text;

 } catch (e) {
   console.log(e.message);
 }
}

FatturaDettagliInquilino.prototype.setTotale = function(price){
 try {
   var self = this;

   if(!price || price === "")
     throw new TypeError("FatturaDettagliInquilino - setTotale : price undefined");

   this.Totale = price;

 } catch (e) {
   console.log(e.message);
 }
}

function FatturaDettagliCliente(Id, IdFattura, IdCliente, Inizio, Fine, Iva, Totale, Sconto, IdAttribuzione, Descrizione, Attribuzione){
   this.Id = Id;
   this.IdFattura = IdFattura;
   this.IdCliente = IdCliente;
   this.Inizio = Inizio;
   this.Fine = Fine;
   this.Iva = Iva;
   this.Totale = Totale;
   this.Sconto = Sconto;
   this.IdAttribuzione = IdAttribuzione;
   this.Descrizione = Descrizione;
   this.Attribuzione = Attribuzione;
}

FatturaDettagliCliente.prototype.Linking = function(){
 if(this.Attribuzione){
   this.Attribuzione = $.extend(new Attribuzione(), this.Attribuzione);
 }
}

FatturaDettagliCliente.prototype.getPDFMatrix = function(){
 var pdfMatrix = {
   Title : null,
   Amount : null,
   Discount : null,
   Total : null
 };

 if (this.Descrizione && this.Descrizione !== ""){
   pdfMatrix.Title = this.Descrizione;
 }else if(this.Attribuzione && this.Attribuzione instanceof Attribuzione && this.Attribuzione.Titolo){
   pdfMatrix.Title = this.Attribuzione.Titolo;
 }

 try {
   if (!pdfMatrix.Title || pdfMatrix.Title === "")
     throw new TypeError('FatturaDettagliCliente - getPDFMatrix : pdfMatrix.Title empty');
   if(this.Inizio && this.Inizio !== "" && this.Fine && this.Fine !== ""){
     var dataInizio = new Date(this.Inizio);
     var dataFine = new Date(this.Fine);
     pdfMatrix.Title += " " + dataInizio.ddmmyyyy() + " - " + dataFine.ddmmyyyy();
   }

   if (this.Iva && parseInt(this.Iva) === 1) {
     pdfMatrix.Title += " *";
   }

   var amount = new Number(this.Totale);
   var total = amount;
   pdfMatrix.Amount = amount.formatMoney(2) + " €";

   var sconto = new Number(0);
   if(this.Sconto){
     sconto = new Number(this.Sconto);
     total -= sconto;
   }

   pdfMatrix.Discount = sconto.formatMoney(2) + " €";
   pdfMatrix.Total = total.formatMoney(2) + " €";

 } catch (e) {
   console.log(e.message);
 }

 return pdfMatrix;
}

function Inquilino_Stanza(Id, IdInquilino, IdStanza, IdBookingDetails, IdContractDocs, Turistico, PeriodoFatturazione, DataFirma, DataInizio, DataFine, Caparra, Canone, Spese, Cauzione, ImportoNonContabilizzato, SpecificaImportoNonContabilizzato, Compensazione, SpecificaCompensazione, ImportoReso, DataReso, NoteReso, NumeroFatture, ConguaglioUtenze, ConguaglioSpese, GiorniNonGoduti, Pulizie, AffittatoDaSolo, Note, ControlloPagamenti, FlagConteggi, Inquilino_Intestazione, Inquilino, Stanza, Inquilino_Stanza){
   this.Id = Id;
   this.IdInquilino = IdInquilino;
   this.IdStanza = IdStanza;
   this.IdBookingDetails = IdBookingDetails;
   this.IdContractDocs = IdContractDocs;
   this.Turistico = Turistico;
   this.PeriodoFatturazione = PeriodoFatturazione;
   this.DataFirma = DataFirma;
   this.DataInizio = DataInizio;
   this.DataFine = DataFine;
   this.Caparra = Caparra;
   this.Canone = Canone;
   this.Spese = Spese;
   this.Cauzione = Cauzione;
   this.ImportoNonContabilizzato = ImportoNonContabilizzato;
   this.SpecificaImportoNonContabilizzato = SpecificaImportoNonContabilizzato;
   this.Compensazione = Compensazione;
   this.SpecificaCompensazione = SpecificaCompensazione;
   this.ImportoReso = ImportoReso;
   this.DataReso = DataReso;
   this.NoteReso = NoteReso;
   this.NumeroFatture = NumeroFatture;
   this.ConguaglioUtenze = ConguaglioUtenze;
   this.ConguaglioSpese = ConguaglioSpese;
   this.GiorniNonGoduti = GiorniNonGoduti;
   this.Pulizie = Pulizie;
   this.AffittatoDaSolo = AffittatoDaSolo;
   this.Note = Note;
   this.ControlloPagamenti = ControlloPagamenti;
   this.FlagConteggi = FlagConteggi;
   this.Inquilino_Intestazione = Inquilino_Intestazione;
   this.Inquilino = Inquilino;
   this.Stanza = Stanza;
   this.Inquilino_Stanza = Inquilino_Stanza;
}

Inquilino_Stanza.prototype.Linking = function(){
 if (this.Inquilino_Intestazione) {
   this.Inquilino_Intestazione = $.extend(new Inquilino_Intestazione(), this.Inquilino_Intestazione);
 }

 if (this.Inquilino) {
   this.Inquilino = $.extend(new Inquilino(), this.Inquilino);
 }

 if (this.Stanza) {
   this.Stanza = $.extend(new Appartamenti_Stanze(), this.Stanza);
   this.Stanza.Linking();
 }

 if(this.Inquilino_Stanza && this.Inquilino_Stanza.length > 0){
   var inquilini = this.Inquilino_Stanza;
   each(inquilini, function (key, registro, index){
       inquilini[key] = $.extend(new Inquilino_Stanza(), inquilini[key]);
       inquilini[key].Linking();
   });
 }
}

Inquilino_Stanza.prototype.getTitle = function(){
 try {
   var self = this;

   var title = "";

   if(this.Inquilino){
     title += (title === "" ? this.Inquilino.getFormalNominativo() : " " + this.Inquilino.getFormalNominativo());
   }

   if(this.DataInizio){
     var dataInizio = new Date(this.DataInizio);
     title += (title === "" ? "Dal " + dataInizio.ddmmyyyy() : " - dal " + dataInizio.ddmmyyyy());
   }

   if(this.DataFine && this.DataFine !== ""){
     var dataFine = new Date(this.DataFine);
     title += (title === "" ? "Al " + dataFine.ddmmyyyy() : " al " + dataFine.ddmmyyyy());
   }

   return title;
 } catch (e) {
   console.log(e.message);
 }
}

Inquilino_Stanza.prototype.getRoomTitle = function(){
 try {
   var self = this;

   if(!this.Stanza)
     throw new TypeError('Inquilino_Stanza - getRoomTitle : this.Stanza undefined');

   var title = this.Stanza.getTitle();

   return title;
 } catch (e) {
   console.log(e.message);
 }
}

Inquilino_Stanza.prototype.getDateMatrix = function(){
 try {
   var self = this;
   var matrix = {
     moveIn : null,
     moveOut : null
   }

   if(this.DataInizio){
     var dataInizio = new Date(this.DataInizio);
     matrix.moveIn = dataInizio;
   }

   if(this.DataFine && this.DataFine !== ""){
     var dataFine = new Date(this.DataFine);
     matrix.moveOut = dataFine;
   }

   return matrix;

 } catch (e) {
   console.log(e.message);
 }
}

Inquilino_Stanza.prototype.LoadRelationship = function(callback){
 var self = this;
 if (this && parseInt(this.Id) > 0) {
   var clone = encodeURIComponent(JSON.stringify(self));
   $.ajax({
       method: "POST",
       url: ACTIONS + 'inquilinoStanze.php?action=loadRelationship',
       data: { data : clone },
   }).done(function(data){
     if (data && data.data) {
       var res = data.data;
       res = $.extend(self, res);
       res.Linking();
       if (callback) {
         callback();
       }
     }
   }).fail(function(xhr, status, error) {
     DefaultErrorHandler(xhr, status, error);
   });
 }
}

Inquilino_Stanza.prototype.Search = function(termine, callback){
 var self = this;

 if (!termine) {
   termine = "";
 }

 var data = { Termine : termine };
 var clone = encodeURIComponent(JSON.stringify(data));

 $.ajax({
     method: "POST",
     url: ACTIONS + 'inquilinoStanze.php?action=searchIns',
     data: { data : clone },
 }).done(function(res){
   if(res){
       res = $.extend(self, res.Data);
       res.Linking();
   }

   if(callback){
       callback();
   }
 }).fail(function(xhr, status, error) {
   DefaultErrorHandler(xhr, status, error);
 });
}

Inquilino_Stanza.prototype.updateJSON = function(callback){
 $.ajax({
     method: "POST",
     url: ACTIONS + 'inquilinoStanze.php?action=updateJSONFile'
 }).done(function(res){
   callback(res);
 }).fail(function(xhr, status, error) {
   DefaultErrorHandler(xhr, status, error);
 });
}

Inquilino_Stanza.prototype.loadCheckOut = function(fromDate, termine, order, page, limit, callback){
 var self = this;

 if(!fromDate){
   fromDate = "";
 }

 if (!termine) {
   termine = "";
 }

 if (!order) {
   order = "";
 }

 if (!page) {
   page = "";
 }

 if(!limit){
   limit = "";
 }

 var data = { filters : {
   fromDate : fromDate,
   termine : termine,
   order : order,
   page : page,
   limit : limit
 }};
 var clone = encodeURIComponent(JSON.stringify(data));

 $.ajax({
     method: "POST",
     url: ACTIONS + 'inquilinoStanze.php?action=loadCheckOut',
     data: { data : clone },
 }).done(function(res){
   if(res){
       res = $.extend(self, res.Data);
       res.Linking();
   }

   if(callback){
       callback();
   }
 }).fail(function(xhr, status, error) {
   DefaultErrorHandler(xhr, status, error);
 });
}

Inquilino_Stanza.prototype.loadDelayed = function(termine, order, page, limit, callback){
 var self = this;

 if (!termine) {
   termine = "";
 }

 if (!order) {
   order = "";
 }

 if (!page) {
   page = "";
 }

 if(!limit){
   limit = "";
 }

 var data = { filters : {
   termine : termine,
   order : order,
   page : page,
   limit : limit
 }};
 var clone = encodeURIComponent(JSON.stringify(data));

 $.ajax({
     method: "POST",
     url: ACTIONS + 'inquilinoStanze.php?action=loadDelayed',
     data: { data : clone },
 }).done(function(res){
   if(res){
       res = $.extend(self, res.Data);
       res.Linking();
   }

   if(callback){
       callback();
   }
 }).fail(function(xhr, status, error) {
   DefaultErrorHandler(xhr, status, error);
 });
}

Inquilino_Stanza.prototype.loadDelayedFromJson = function(callback, intt_ui){

 var self = this;

 var hxr = $.getJSON(JSON_ROOT + "overdue_payments.json?nocache=" + (new Date()).getTime(), function(data) {
   var jsonRes = {
     lastUpdated : (data && data.LastUpdated) ? data.LastUpdated : null,
     totIns : (data && data.TotIns) ? data.TotIns : null
   }

   if(data && data.Rows && data.Rows.length > 0){
     var rows = data.Rows;
     var res = new Inquilino_Stanza();
     res.Inquilino_Stanza = data.Rows;
     res = $.extend(self, res);
     res.Linking();
   }

   if(callback){
     callback(jsonRes);
   }

 });

 if(intt_ui && intt_ui.addXhr){
   intt_ui.addXhr(hxr);
 }

}

Inquilino_Stanza.prototype.loadConteggi = function(order, page, limit, callback, intt_ui){
 var self = this;

 if (!order) {
   order = "";
 }

 if (!page) {
   page = "";
 }

 if(!limit){
   limit = "";
 }

 var data = { filters : {
   order : order,
   page : page,
   limit : limit
 }};
 var clone = encodeURIComponent(JSON.stringify(data));

 var xhr = $.ajax({
     method: "POST",
     url: ACTIONS + 'inquilinoStanze.php?action=loadConteggi',
     data: { data : clone },
 }).done(function(res){
   if(res){
       res = $.extend(self, res.Data);
       res.Linking();
   }

   if(callback){
       callback();
   }
 }).fail(function(xhr, status, error) {
   DefaultErrorHandler(xhr, status, error);
 });

 xhr.Title = "loadConteggi";

 if(intt_ui && intt_ui.addXhr){
   intt_ui.addXhr(xhr);
 }

}

Inquilino_Stanza.prototype.loadMorosiUsciti = function(order, page, limit, callback, intt_ui){
 var self = this;

 if (!order) {
   order = "";
 }

 if (!page) {
   page = "";
 }

 if(!limit){
   limit = "";
 }

 var data = { filters : {
   order : order,
   page : page,
   limit : limit
 }};
 var clone = encodeURIComponent(JSON.stringify(data));

 var xhr = $.ajax({
     method: "POST",
     url: ACTIONS + 'inquilinoStanze.php?action=loadMorosiUsciti',
     data: { data : clone },
 }).done(function(res){
   if(res){
       res = $.extend(self, res.Data);
       res.Linking();
   }

   if(callback){
       callback();
   }
 }).fail(function(xhr, status, error) {
   DefaultErrorHandler(xhr, status, error);
 });

 xhr.Title = "loadMorosiUsciti";

 if(intt_ui && intt_ui.addXhr){
   intt_ui.addXhr(xhr);
 }

}

Inquilino_Stanza.prototype.loadConteggiUscenti = function(order, page, limit, callback, intt_ui){
 var self = this;

 if (!order) {
   order = "";
 }

 if (!page) {
   page = "";
 }

 if(!limit){
   limit = "";
 }

 var data = { filters : {
   order : order,
   page : page,
   limit : limit
 }};
 var clone = encodeURIComponent(JSON.stringify(data));

 var xhr = $.ajax({
     method: "POST",
     url: ACTIONS + 'inquilinoStanze.php?action=loadConteggiUscenti',
     data: { data : clone },
 }).done(function(res){
   if(res){
       res = $.extend(self, res.Data);
       res.Linking();
   }

   if(callback){
       callback();
   }
 }).fail(function(xhr, status, error) {
   DefaultErrorHandler(xhr, status, error);
 });

 if(intt_ui && intt_ui.addXhr){
   intt_ui.addXhr(xhr);
 }

}

Inquilino_Stanza.prototype.loadAccountBalance = function(callback){
 var self = this;
 var clone = encodeURIComponent(JSON.stringify(this));

 $.ajax({
     method: "POST",
     url: ACTIONS + 'inquilinoStanze.php?action=loadAccountBalance',
     data: { data : clone },
 }).done(function(res){
   if(callback && res && res.data){
       callback(res.data);
   }
 }).fail(function(xhr, status, error) {
   DefaultErrorHandler(xhr, status, error);
 });

}

Inquilino_Stanza.prototype.loadConteggiFinali = function(callback){
 var self = this;
 var clone = encodeURIComponent(JSON.stringify(this));

 $.ajax({
     method: "POST",
     url: ACTIONS + 'inquilinoStanze.php?action=loadConteggiFinali',
     data: { data : clone },
 }).done(function(data){

   if(callback && data){

     var res = data.invoice;
     var accountBalance = data.accountBalance;
     var ts_docF = null;
     var blockingTickets = data.blockingFinalInvoice;
     var missingServices = data.missingServices;

     var invoice = new Fattura();
     res = $.extend(invoice, res);
     res.Linking();

     if(data.ts_docF && data.ts_docF.Intestatario && data.ts_docF.DocumentoFiscale){
       var itt =  $.extend(new Intestatario(), data.ts_docF.Intestatario);
       itt.Linking();
       var docF = $.extend(new DocumentoFiscale(), data.ts_docF.DocumentoFiscale);
       docF.Linking();
       ts_docF = new Intestatario_DocumentoFiscale(itt, docF);
     }

     each(blockingTickets, function (key, registro, index) {
      blockingTickets[key] = $.extend(new Ticket(), blockingTickets[key]);
     });

     each(missingServices, function (key2, registro2, index2) {
       missingServices[key2] = $.extend(new Ticket(), missingServices[key2]);
     });

     callback(invoice, accountBalance, ts_docF, blockingTickets, missingServices);
   }
 }).fail(function(xhr, status, error) {
   DefaultErrorHandler(xhr, status, error);
 });

}

Inquilino_Stanza.prototype.loadConteggiEffettuati = function(order, page, limit, callback, intt_ui){
 var self = this;

 if (!order) {
   order = "";
 }

 if (!page) {
   page = "";
 }

 if(!limit){
   limit = "";
 }

 var data = { filters : {
   order : order,
   page : page,
   limit : limit
 }};
 var clone = encodeURIComponent(JSON.stringify(data));

 var xhr = $.ajax({
     method: "POST",
     url: ACTIONS + 'inquilinoStanze.php?action=loadConteggiEffettuati',
     data: { data : clone },
 }).done(function(res){
   if(res){
       res = $.extend(self, res.Data);
       res.Linking();
   }

   if(callback){
       callback();
   }
 }).fail(function(xhr, status, error) {
   DefaultErrorHandler(xhr, status, error);
 });

 if(intt_ui && intt_ui.addXhr){
   intt_ui.addXhr(xhr);
 }

}

Inquilino_Stanza.prototype.loadControlloPagamenti_archived = function(order, page, limit, callback, intt_ui){
 var self = this;

 if (!order) {
   order = "";
 }

 if (!page) {
   page = "";
 }

 if(!limit){
   limit = "";
 }

 var data = { filters : {
   order : order,
   page : page,
   limit : limit
 }};
 var clone = encodeURIComponent(JSON.stringify(data));

 var xhr = $.ajax({
     method: "POST",
     url: ACTIONS + 'inquilinoStanze.php?action=loadControlloPagamenti_archived',
     data: { data : clone },
 }).done(function(res){
   if(res){
       res = $.extend(self, res.Data);
       res.Linking();
   }

   if(callback){
       callback();
   }
 }).fail(function(xhr, status, error) {
   DefaultErrorHandler(xhr, status, error);
 });

 if(intt_ui && intt_ui.addXhr){
   intt_ui.addXhr(xhr);
 }

}

Inquilino_Stanza.prototype.loadConteggiInviati = function(order, page, limit, callback, intt_ui){
 var self = this;

 if (!order) {
   order = "";
 }

 if (!page) {
   page = "";
 }

 if(!limit){
   limit = "";
 }

 var data = { filters : {
   order : order,
   page : page,
   limit : limit
 }};
 var clone = encodeURIComponent(JSON.stringify(data));

 var xhr = $.ajax({
     method: "POST",
     url: ACTIONS + 'inquilinoStanze.php?action=loadConteggiInviati',
     data: { data : clone },
 }).done(function(res){
   if(res){
       res = $.extend(self, res.Data);
       res.Linking();
   }

   if(callback){
       callback();
   }
 }).fail(function(xhr, status, error) {
   DefaultErrorHandler(xhr, status, error);
 });

 if(intt_ui && intt_ui.addXhr){
   intt_ui.addXhr(xhr);
 }

}

Inquilino_Stanza.prototype.loadStoricoSolleciti = function(callback){
 var self = this;
 var clone = encodeURIComponent(JSON.stringify(this));

 $.ajax({
     method: "POST",
     url: ACTIONS + 'inquilinoStanze.php?action=loadStoricoSolleciti',
     data: { data : clone },
 }).done(function(res){
   if(callback && res && res.data){
       callback(res.data);
   }
 }).fail(function(xhr, status, error) {
   DefaultErrorHandler(xhr, status, error);
 });

}

Inquilino_Stanza.prototype.setInquilino = function(callback){
 var self = this;
 if (this && parseInt(this.Id) > 0) {
   var clone = encodeURIComponent(JSON.stringify(self));
   $.ajax({
       method: "POST",
       url: ACTIONS + 'inquilinoStanze.php?action=setInquilino',
       data: { data : clone },
   }).done(function(data){
     if (data && data.data) {
       var res = data.data;
       res = $.extend(self, res);
       res.Linking();
       if (callback) {
         callback();
       }
     }
   }).fail(function(xhr, status, error) {
     DefaultErrorHandler(xhr, status, error);
   });
 }
}

Inquilino_Stanza.prototype.setStanza = function(callback){
 var self = this;
 if (this && parseInt(this.Id) > 0) {
   var clone = encodeURIComponent(JSON.stringify(self));
   $.ajax({
       method: "POST",
       url: ACTIONS + 'inquilinoStanze.php?action=setStanza',
       data: { data : clone },
   }).done(function(data){
     if (data && data.data) {
       var res = data.data;
       res = $.extend(self, res);
       res.Linking();
       if (callback) {
         callback();
       }
     }
   }).fail(function(xhr, status, error) {
     DefaultErrorHandler(xhr, status, error);
   });
 }
}

Inquilino_Stanza.prototype.toggleControlloPagamenti = function(callback){
 var self = this;
 if (parseInt(this.Id) > 0) {
   var clone = encodeURIComponent(JSON.stringify(self));
   $.ajax({
       method: "POST",
       url: ACTIONS + 'inquilinoStanze.php?action=toggleControlloPagamenti',
       data: { data : clone },
   }).done(function(data){
     if (data && data.success && data.data) {
       var res = data.data;
       res = $.extend(self, res);
       res.Linking();
       if (callback) {
         callback();
       }
     }
   }).fail(function(xhr, status, error) {
     DefaultErrorHandler(xhr, status, error);
   });
 }
}

Inquilino_Stanza.prototype.conteggiSetIgnore = function(callback){
 try {
   var self = this;
   var success = false;

   if(!callback)
     throw new TypeError('Inquilino_Stanza - conteggiSetIgnore : callback undefined');

   var clone = encodeURIComponent(JSON.stringify(self));

   $.ajax({
       method: "POST",
       url: ACTIONS + 'inquilinoStanze.php?action=conteggiSetIgnore',
       data: { data : clone },
   }).done(function(res){

     if(res && res.success){
       success = true;
     }

     callback(success);
   }).fail(function(xhr, status, error) {
     DefaultErrorHandler(xhr, status, error);
   });
 } catch (e) {
   console.log(e.message);
 }
}

Inquilino_Stanza.prototype.conteggiSetNoInvoice = function(callback){
 try {
   var self = this;
   var success = false;

   if(!callback)
     throw new TypeError('Inquilino_Stanza - conteggiSetNoInvoice : callback undefined');

   var clone = encodeURIComponent(JSON.stringify(self));

   $.ajax({
       method: "POST",
       url: ACTIONS + 'inquilinoStanze.php?action=conteggiSetNoInvoice',
       data: { data : clone },
   }).done(function(res){

     if(res && res.success){
       success = true;
     }

     callback(success);
   }).fail(function(xhr, status, error) {
     DefaultErrorHandler(xhr, status, error);
   });

 } catch (e) {
   console.log(e.message);
 }
}

Inquilino_Stanza.prototype.getLastInsByInquilino = function(callback){
 try {
   var self = this;

   if(!callback)
     throw new TypeError('Inquilino_Stanza - getLastInsByInquilino : callback undefined');

   var clone = encodeURIComponent(JSON.stringify(self));

   $.ajax({
       method: "POST",
       url: ACTIONS + 'inquilinoStanze.php?action=getLastInsByInquilino',
       data: { data : clone },
   }).done(function(res){
     res = $.extend(self, res.Data);
     res.Linking();
     if(callback){
         callback();
     }
   }).fail(function(xhr, status, error) {
     DefaultErrorHandler(xhr, status, error);
   });
 } catch (e) {
   console.log(e.message);
 }
}

function Inquilino_Intestazione(Id, IdInquilinoStanza, Cognome, Nome, RagioneSociale, Telefono, CodiceFiscale, ForeignIdentificationNumber, PartitaIva, Indirizzo, Citta, Civico, CAP, Stato, Paese, Paese_Sigla_ISO3166_2, CodiceDestinatario, PecDestinatario){
 this.Id = Id;
 this.IdInquilinoStanza = IdInquilinoStanza;
 this.Cognome = Cognome;
 this.Nome = Nome;
 this.RagioneSociale = RagioneSociale;
 this.Telefono = Telefono;
 this.CodiceFiscale = CodiceFiscale;
 this.ForeignIdentificationNumber = ForeignIdentificationNumber;
 this.PartitaIva = PartitaIva;
 this.Indirizzo = Indirizzo;
 this.Citta = Citta;
 this.Civico = Civico;
 this.CAP = CAP;
 this.Stato = Stato;
 this.Paese = Paese;
 this.Paese_Sigla_ISO3166_2 = Paese_Sigla_ISO3166_2;
 this.CodiceDestinatario = CodiceDestinatario;
 this.PecDestinatario = PecDestinatario;
}

Inquilino_Intestazione.prototype.getNominativo = function(){
 var nominativo = "";

 if(this.RagioneSociale && this.RagioneSociale !== ""){
   nominativo += (nominativo === "" ? this.RagioneSociale : " " + this.RagioneSociale);
 }else{
   if(this.Nome && this.Nome !== ""){
     nominativo += (nominativo === "" ? this.Nome : " " + this.Nome);
   }

   if(this.Cognome && this.Cognome !== ""){
     nominativo += (nominativo === "" ? this.Cognome : " " + this.Cognome);
   }
 }

 return nominativo;
};

Inquilino_Intestazione.prototype.getPDFMatrix = function(callback){
 var self = this;

 var pdfMatrix = {
   fullName : null,
   street : null,
   city : null
 };

 try {
   pdfMatrix.fullName = this.getNominativo();

   if(this.Indirizzo && this.Indirizzo !== ""){
     pdfMatrix.street = this.Indirizzo;
   }

   if (pdfMatrix.street && this.Civico && this.Civico !== "") {
     pdfMatrix.street += " " + this.Civico;
   }

   pdfMatrix.city = "";
   if(this.CAP && this.CAP !== ""){
     pdfMatrix.city += (pdfMatrix.city === "" ? this.CAP : " " + this.CAP);
   }

   if(this.Citta && this.Citta !== ""){
     pdfMatrix.city += (pdfMatrix.city === "" ? this.Citta : " " + this.Citta);
   }

   if (callback) {
     callback(pdfMatrix);
   }
 } catch (e) {
   console.log(e.message);
 }

 return pdfMatrix;
}

function Inquilino_Disdetta (Id, IdInquilinoStanze, DataInvioPostale, DataFine, Stato, DataRegistrazione, DataAggiornamento){
   this.Id = parseInt(Id);
   this.IdInquilinoStanze = parseInt(IdInquilinoStanze);
   this.DataInvioPostale = DataInvioPostale;
   this.DataFine = DataFine;
   this.Stato = Stato;
   this.DataRegistrazione = DataRegistrazione;
   this.DataAggiornamento = DataAggiornamento;
}

function Inquilino_PostiAuto(Id, IdInquilino, IdPostoAuto, DataInizio, DataFine, Note){
   this.Id = Id;
   this.IdInquilino = IdInquilino;
   this.IdPostoAuto = IdPostoAuto;
   this.DataInizio = DataInizio;
   this.DataFine = DataFine;
   this.Note = Note;
}

function Appartamento(Id,Visibile,Indirizzo,Civico,CAP,Citta,Provincia,Nazione,Zona,Citofono,DataInizioLocazione,DataFineLocazione,Descrizione,Indicazioni,Mappale,Foglio,Subalterno,Particella,Classe,Categoria,Rendita,Piano,Scala,ClasseEnergetica,IPE,Stanze,Bagni,CucinaAbitabile,SalaPranzo,Balconi,Terrazzi,Mq,Tv,Wifi,Lavatrice,Lavastoviglie,BoilerAcqua,Riscaldamento,Portineria,Ascensore,Giardino,Parco,PostoAuto,PostoBici,Custode,CustodeTelefono,OrariPortineria,Amministratore,AmministratoreIndirizzo,AmministratoreTelefono,AmministratoreFax,AmministratoreEmail,Canone,Spese,Bollette,UrlMappa,UrlStreetView,Latitudine,Longitudine,TipoStabile,NumeroInquilini,Societa, CedolareSecca, TipologiaImmobile, UsoImmobile, StanzeMultiple, Stanze_Rel, Appartamento){
   this.Id = Id;
   this.Visibile = Visibile;
   this.Indirizzo = Indirizzo;
   this.Civico = Civico;
   this.CAP = CAP;
   this.Citta = Citta;
   this.Provincia = Provincia;
   this.Nazione = Nazione;
   this.Zona = Zona;
   this.Citofono = Citofono;
   this.DataInizioLocazione = DataInizioLocazione;
   this.DataFineLocazione = DataFineLocazione;
   this.Descrizione = Descrizione;
   this.Indicazioni = Indicazioni;
   this.Mappale = Mappale;
   this.Foglio = Foglio;
   this.Subalterno = Subalterno;
   this.Particella = Particella;
   this.Classe = Classe;
   this.Categoria = Categoria;
   this.Rendita = Rendita;
   this.Piano = Piano;
   this.Scala = Scala;
   this.ClasseEnergetica = ClasseEnergetica;
   this.IPE = IPE;
   this.Stanze = Stanze;
   this.Bagni = Bagni;
   this.CucinaAbitabile = CucinaAbitabile;
   this.SalaPranzo = SalaPranzo;
   this.Balconi = Balconi;
   this.Terrazzi = Terrazzi;
   this.Mq = Mq;
   this.Tv = Tv;
   this.Wifi = Wifi;
   this.Lavatrice = Lavatrice;
   this.Lavastoviglie = Lavastoviglie;
   this.BoilerAcqua = BoilerAcqua;
   this.Riscaldamento = Riscaldamento;
   this.Portineria = Portineria;
   this.Ascensore = Ascensore;
   this.Giardino = Giardino;
   this.Parco = Parco;
   this.PostoAuto = PostoAuto;
   this.PostoBici = PostoBici;
   this.Custode = Custode;
   this.CustodeTelefono = CustodeTelefono;
   this.OrariPortineria = OrariPortineria;
   this.Amministratore = Amministratore;
   this.AmministratoreIndirizzo = AmministratoreIndirizzo;
   this.AmministratoreTelefono = AmministratoreTelefono;
   this.AmministratoreFax = AmministratoreFax;
   this.AmministratoreEmail = AmministratoreEmail;
   this.Canone = Canone;
   this.Spese = Spese;
   this.Bollette = Bollette;
   this.UrlMappa = UrlMappa;
   this.UrlStreetView = UrlStreetView;
   this.Latitudine = Latitudine;
   this.Longitudine = Longitudine;
   this.TipoStabile = TipoStabile;
   this.NumeroInquilini = NumeroInquilini;
   this.Societa = Societa;
   this.CedolareSecca = CedolareSecca;
   this.TipologiaImmobile = TipologiaImmobile;
   this.UsoImmobile = UsoImmobile;
   this.StanzeMultiple = StanzeMultiple;
   this.Stanze_Rel = Stanze_Rel;
   this.Appartamento = Appartamento;//Array of Appartamento
}

Appartamento.prototype.getTitle = function(){
 try {
   var self = this;

   if(!this.Indirizzo)
     throw new TypeError('Appartamento - getTitle : this.Indirizzo undefined');

   if(!this.Civico)
     throw new TypeError('Appartamento - getTitle : this.Civico undefined');

   var title = this.Indirizzo + " " + this.Civico;

   return title;
 } catch (e) {
   console.log(e.message);
 }
}

Appartamento.prototype.Linking = function(){
 if(this.Appartamento && this.Appartamento.length > 0){
   var appartamenti = this.Appartamento;
   each(appartamenti, function (key, registro, index){
       appartamenti[key] = $.extend(new Appartamento(), appartamenti[key]);
   });
 }

 if(this.Stanze_Rel && this.Stanze_Rel.length > 0){
   var stanze = this.Stanze_Rel;
   each(stanze, function (key, registro, index){
       stanze[key] = $.extend(new Appartamenti_Stanze(), stanze[key]);
   });
 }
}

Appartamento.prototype.setStanze = function (callback){
   var self = this;
   if(parseInt(this.Id) > 0){
       $.getJSON( ACTIONS + 'appartamento.php?action=setStanze&data=' + this.Id, function( data ) {
           data = $.extend(new Appartamento(), data);
           if(data && data instanceof Appartamento){
               replaceObject(self, data);
           }
           if(callback){
               callback();
           }
       });
   }
};

Appartamento.prototype.setStanzeV2 = function (callback){
 try {
   var self = this;
   if(parseInt(this.Id) > 0){
       $.ajax({
           method: "POST",
           url: ACTIONS + 'appartamento.php?action=setStanze',
           data: { data : self.Id },
       }).done(function(res){
         if(res){
           res = $.extend(self, res);
           res.Linking();
         }

         if(callback){
             callback();
         }
       }).fail(function(xhr, status, error) {
         DefaultErrorHandler(xhr, status, error);
       });
   }
 } catch (e) {
   console.log(e.message);
 }
};

Appartamento.prototype.setStanzeMultiple = function (callback){
   var self = this;
   if(parseInt(this.Id) > 0){
       $.getJSON( ACTIONS + 'appartamento.php?action=setStanzeMultiple&data=' + this.Id, function( data ) {
           data = $.extend(new Appartamento(), data);
           if(data && data instanceof Appartamento){
               replaceObject(self, data);
           }

           if(callback){
               callback();
           }

       });
   }
};

Appartamento.prototype.LoadByIdStanza = function(IdStanza, callback){
 var self = this;
 if (IdStanza && parseInt(IdStanza) > 0) {
   var clone = encodeURIComponent(JSON.stringify(IdStanza));
   $.ajax({
       method: "POST",
       url: ACTIONS + 'appartamento.php?action=loadByIdStanza',
       data: { data : clone },
   }).done(function(data){
     if (data && data.data) {
       var res = data.data;
       res = $.extend(self, res);
       //res.Linking();
       if (callback) {
         callback();
       }
     }
   }).fail(function(xhr, status, error) {
     DefaultErrorHandler(xhr, status, error);
   });
 }
}

Appartamento.prototype.getPDFMatrix = function(callback){
 var self = this;

 var pdfMatrix = {
   top : null,
   bottom : null
 };

 try {

   if(this.Indirizzo && this.Indirizzo !== ""){
     pdfMatrix.top = this.Indirizzo;
   }

   if (pdfMatrix.top && this.Civico && this.Civico !== "") {
     pdfMatrix.top += " " + this.Civico;
   }

   pdfMatrix.bottom = "";
   if(this.CAP && this.CAP !== ""){
     pdfMatrix.bottom += (pdfMatrix.bottom === "" ? this.CAP : " " + this.CAP);
   }

   if(this.Citta && this.Citta !== ""){
     pdfMatrix.bottom += (pdfMatrix.bottom === "" ? this.Citta : " " + this.Citta);
   }

   if (callback) {
     callback(pdfMatrix);
   }
 } catch (e) {
   console.log(e.message);
 }

 return pdfMatrix;
}

Appartamento.prototype.row_matrix = function(){
 try {
   var self = this;
   var title = "Senza titolo";
   var bagni = "Non specificato";
   var postoAuto = "Non presente";
   var zona = "Non specificato";
   var mq = "Non specificato";
   var sala = "Non presente";
   var balconi = "Non presente";
   var terrazzi = "Non presente";
   var inizioContratto = "Non presente";
   var fineContratto = "Non presente";
   var numeroStanze = "Non presente";
   var gAptAtt = 0;
   var gAptDov = 0;
   var gRoomAtt = 0;
   var gRoomDov = 0;
   var diffGRoom = 0;

   if(this.getTitle()){
     title = this.getTitle();
   }

   if(this.Bagni && parseInt(this.Bagni) > 0){
     bagni = this.Bagni;
   }

   if(this.PostoAuto && parseInt(this.PostoAuto) > 0){
     postoAuto = this.PostoAuto ;
   }

   if(this.Zona && parseInt(this.Zona) > 0){
     zona = this.Zona ;
   }

   if(this.Mq && parseInt(this.Mq) > 0){
     mq = this.Mq + " Mq" ;
   }

   if(this.SalaPranzo && parseInt(this.SalaPranzo) > 0){
     sala = this.SalaPranzo ;
   }

   if(this.Balconi && parseInt(this.Balconi) > 0){
     balconi = this.Balconi ;
   }

   if(this.Terrazzi && parseInt(this.Terrazzi) > 0){
     terrazzi = this.Terrazzi ;
   }

   if(this.NumeroStanze && parseInt(this.NumeroStanze) > 0){
     numeroStanze = this.NumeroStanze;
   }

   if(this.InizioContratto){
     inizioContratto = (new Date(this.InizioContratto)).ddmmyyyy();
   }

   if(this.FineContratto){
     fineContratto = (new Date(this.FineContratto)).ddmmyyyy();
   }

   if(this.GAptEff && parseInt(this.GAptEff) >= 0){
     gAptEff = (new Number(this.GAptEff).formatMoney(2));
   }

   if(this.GAptDov  && parseInt(this.GAptDov ) > 0){
     gAptDov = (new Number(this.GAptDov).formatMoney(2));
   }

   if(this.GRoomEff && parseInt(this.GRoomEff) > 0){
     gRoomEff = (new Number(this.GRoomEff).formatMoney(2));
   }

   if(this.GRoomDov && parseInt(this.GRoomDov) > 0){
     gRoomDov = (new Number(this.GRoomDov).formatMoney(2));
   }

   if(this.DiffGRoom && parseInt(this.DiffGRoom) > 0){
     diffGRoom = (new Number(this.DiffGRoom).formatMoney(2));
   }

   var matrix = {
     title : title,
     numeroStanze : numeroStanze,
     bagni : bagni,
     postoAuto : postoAuto,
     zona : zona,
     mq : mq,
     sala : sala,
     balconi : balconi,
     terrazzi : terrazzi,
     inizioContratto : inizioContratto,
     fineContratto : fineContratto,
     gAptAtt : gAptAtt,
     gAptDov : gAptDov,
     gRoomAtt : gRoomAtt,
     gRoomDov : gRoomDov,
     diffGRoom : diffGRoom
   }

   return matrix;
 } catch (e) {
   console.log(e.message);
 }
}

function Appartamento_Contratto(Id, IdAppartamento, InizioTrattativa, FineTrattativa, InizioContratto, FineContratto, AlertContratto, Renovated) {
  this.Id = Id;
  this.IdAppartamento = IdAppartamento;
  this.InizioTrattativa = InizioTrattativa;
  this.FineTrattativa = FineTrattativa;
  this.InizioContratto = InizioContratto;
  this.FineContratto = FineContratto;
  this.AlertContratto = AlertContratto;
  this.Renovated = Renovated;
}

Appartamento_Contratto.prototype.Save = function (callback) {
  try {
    var self = this;

    if(!callback)
      throw new TypeError('Appartamento_Contratto - Save : callback undefined!');

    var clone = encodeURIComponent(JSON.stringify(self));

    $.ajax({
      method: "POST",
      url: ACTIONS + 'appartamento.php?action=save-apt_contratto',
      data: { data : clone },
    }).done(function(res){
      var success = false;
      if(res && res.success){
        success = true;
        $.extend(self, res.data);
      }

      callback(success);
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });

  } catch (e) {
    console.error(e.message);
  }
}

Appartamento_Contratto.prototype.Load = function (callback) {
  try {
    var self = this;
    var clone = encodeURIComponent(JSON.stringify(self));
    var contratti = new Array();

    if(!callback)
      throw new TypeError('Appartamento_Contratto - Load : callback undefined!');

      $.ajax({
        method: "POST",
        url: ACTIONS + 'appartamento.php?action=load-apt_contratto',
        data: { data : clone },
    }).done(function(res){
      if(res && res.data){
        contratti = res.data;
        each(contratti, function (key, registro, index) {
          contratti[key] = $.extend(new Appartamento_Contratto(), contratti[key]);
        });
      }

      callback(contratti);
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });
  } catch (e) {
    console.error(e.message);
    
  }
}

Appartamento_Contratto.prototype.getMatrix = function () {
  try {
    var self = this;

    var matrix = {
      InizioTrattativa : null,
      FineTrattativa : null,
      InizioContratto : null,
      FineContratto : null,
      AlertContratto : null,
      Renovated : null
    };

    if(this.InizioTrattativa)
      matrix.InizioTrattativa = (new Date(this.InizioTrattativa)).yyyymmdd();

    if(this.FineTrattativa)
      matrix.FineTrattativa = (new Date(this.FineTrattativa)).yyyymmdd();

    if(this.InizioContratto)
      matrix.InizioContratto = (new Date(this.InizioContratto)).yyyymmdd();

    if(this.FineContratto)
      matrix.FineContratto = (new Date(this.FineContratto)).yyyymmdd();

    if(this.AlertContratto)
      matrix.AlertContratto = (new Date(this.AlertContratto)).yyyymmdd();

    matrix.Renovated = this.Renovated;

    return matrix;
  } catch (e) {
    console.error(e.message);
    
  }
}

function Appartamenti_Stanze(Id, IdAppartamento, IdStanzaMultipla, IdAdmin, Numero, Tipo, Bagno, PrezzoDinamico, PrezzoSuggerito, PrezzoScontato, ScadenzaSconto, PrezzoAttuale, Codice, Mq, Balconi, Terrazzi, Pavimento, Tv, Antenna, Multiluce, Condizionatore, LettoMatrimoniale, Scrivania, Sedie, AnteArmadi, Cassetti, Specchi, Mensole, CabinaArmadio, TavoloPranzo, CucinaPrivata, TitoloAnnuncio, DescrizioneAnnuncio, DataAggiornamento, TitoloAnnuncio_en, DescrizioneAnnuncio_en, VirtualTour, Visibile, AffittoBreve, NumeroInquilini, Booked, Appartamento, Appartamento_Stanza){
   this.Id = Id;
   this.IdAppartamento = IdAppartamento;
   this.IdStanzaMultipla = IdStanzaMultipla;
   this.IdAdmin = IdAdmin;
   this.Numero = Numero;
   this.Tipo = Tipo;
   this.Bagno = Bagno;
   this.PrezzoDinamico = PrezzoDinamico;
   this.PrezzoSuggerito = PrezzoSuggerito;
   this.PrezzoScontato = PrezzoScontato;
   this.ScadenzaSconto = ScadenzaSconto;
   this.PrezzoAttuale = PrezzoAttuale;
   this.Codice = Codice;
   this.Mq = Mq;
   this.Balconi = Balconi;
   this.Terrazzi = Terrazzi;
   this.Pavimento = Pavimento;
   this.Tv = Tv;
   this.Antenna = Antenna;
   this.Multiluce = Multiluce;
   this.Condizionatore = Condizionatore;
   this.LettoMatrimoniale = LettoMatrimoniale;
   this.Scrivania = Scrivania;
   this.Sedie = Sedie;
   this.AnteArmadi = AnteArmadi;
   this.Cassetti = Cassetti;
   this.Specchi = Specchi;
   this.Mensole = Mensole;
   this.CabinaArmadio = CabinaArmadio;
   this.TavoloPranzo = TavoloPranzo;
   this.CucinaPrivata = CucinaPrivata;
   this.TitoloAnnuncio = TitoloAnnuncio;
   this.DescrizioneAnnuncio = DescrizioneAnnuncio;
   this.DataAggiornamento = DataAggiornamento;
   this.TitoloAnnuncio_en = TitoloAnnuncio_en;
   this.DescrizioneAnnuncio_en = DescrizioneAnnuncio_en;
   this.VirtualTour = VirtualTour;
   this.Visibile = Visibile;
   this.AffittoBreve = AffittoBreve;
   this.NumeroInquilini = NumeroInquilini;
   this.Booked = Booked;
   this.Appartamento = Appartamento;
   this.Appartamento_Stanza = Appartamento_Stanza;//Array of Appartamenti_Stanze
}

Appartamenti_Stanze.prototype.getTitle = function(){
 try {
   var self = this;

   if(!this.Appartamento || !(this.Appartamento instanceof Appartamento))
     throw new TypeError('Appartamenti_Stanze - getTitle : this.Appartamento undefined');

   if(!this.Numero)
     throw new TypeError('Appartamenti_Stanze - getTitle : this.Numero undefined');
   var title = this.Appartamento.getTitle() + " c." + this.Numero;

   return title;
 } catch (e) {
   console.log(e.message);
 }
}

Appartamenti_Stanze.prototype.Linking = function(){
 if(this.Appartamento_Stanza && this.Appartamento_Stanza.length > 0){
   var aptStanze = this.Appartamento_Stanza;
   each(aptStanze, function (key, registro, index){
       aptStanze[key] = $.extend(new Appartamenti_Stanze(), aptStanze[key]);
       aptStanze[key].Linking();
   });
 }

 if(this.Appartamento){
   this.Appartamento = $.extend(new Appartamento(), this.Appartamento);
 }
}

Appartamenti_Stanze.prototype.getStanzeDisponibili = function(term, callback){
 try {
   var self = this;

   if(!term)
     throw new TypeError('Appartamenti_Stanze - getStanzeDisponibili : term undefined!');

   var options = {
     term : term
   }

   var clone = encodeURIComponent(JSON.stringify(options));

   $.ajax({
       method: "POST",
       url: ACTIONS + 'stanza.php?action=getAvailableRooms',
       data: { data : clone },
   }).done(function(data){
     if (data && data.data) {
       var res = data.data;
       res = $.extend(self, res);
       res.Linking();
       if (callback) {
         callback();
       }
     }
   }).fail(function(xhr, status, error) {
     DefaultErrorHandler(xhr, status, error);
   });
 } catch (e) {
   console.log(e.message);
 }
}

Appartamenti_Stanze.prototype.getCopertinaUrl = function(callback){
 try {
   var self = this;
   var clone = encodeURIComponent(JSON.stringify(self));

   $.ajax({
       method: "POST",
       url: ACTIONS + 'stanza.php?action=getCopertinaUrl',
       data: { data : clone },
   }).done(function(data){
     if (data && data.data) {
       var res = data.data;
       if (callback) {
         callback(res);
       }
     }
   }).fail(function(xhr, status, error) {
     DefaultErrorHandler(xhr, status, error);
   });
 } catch (e) {
   console.log(e.message);
 }
}

Appartamenti_Stanze.prototype.getMarketPrice = function(){

 var price = parseFloat(this.PrezzoDinamico);
 var avail = (this.Availability ? new Date(this.Availability) : null);
 var now_date = new Date();
 var discountExpirationDate = new Date('2021-01-02');
 var discountPerc = 10;
 var monthlyDiscount = 0;

 if(!avail)
   return price;

 /*if(this.hasDiscountRent()){
   price -= this.getDiscountRent();
 }*/

 /*BEGIN : #brmhmg - Sconto del 10% di tutte le stanze fino al 31/12/2020 */
 
 /*if(avail && avail < discountExpirationDate){
  monthlyDiscount = (price/100)*discountPerc;
  monthlyDiscount = Math.ceil(monthlyDiscount/5)*5;
  price = price - monthlyDiscount;
 }*/

 /*END : #brmhmg - Sconto del 10% di tutte le stanze fino al 31/12/2020 */

  if(this.hasDiscount()){
    price = this.PrezzoScontato;
  }

 return price;
}

Appartamenti_Stanze.prototype.hasDiscountRent = function(){
 try {

   var avail = (this.Availability ? new Date(this.Availability) : null);
   var res = false;

   if(avail){
     var month = parseInt(avail.getMonth() + 1);
     var day = parseInt(avail.getDate());

     switch (month) {
       case 5:
         if(day >= 15){
           res = true;
         }
         break;
       /*case 8:
         if(day <= 15){
           res = true;
         }
         break;*/
       case 6:
       case 7:
       case 8:
       case 9:
       case 10:
       case 11:
       case 12:
         res = true;
         break;
     }
   }

   return res;
 } catch (e) {
   console.log(e.message);
 }
}

Appartamenti_Stanze.prototype.hasDiscount = function(){
 try {
   if(!this.Availability)
     return false;

   if(!this.PrezzoScontato || !(this.PrezzoScontato && parseFloat(this.PrezzoScontato) > 0))
     return false;

   if(!this.ScadenzaSconto)
     return false;

   var res = false;
   var avail = new Date(this.Availability);
   var prezzoScontato = parseFloat(this.PrezzoScontato);
   var price = parseFloat(this.PrezzoDinamico);
   var scadenza = new Date(this.ScadenzaSconto);

   if(prezzoScontato <= price && scadenza > avail){
     res = true;
   }

   

   return res;
 } catch (e) {
   console.log(e.message);
 }
}

Appartamenti_Stanze.prototype.hasRentIncrease = function(){
 try {
   if(!this.Availability)
     return false;

   var res = false;
   var avail = new Date(this.Availability);
   var month = parseInt(avail.getMonth() + 1);
   var day = parseInt(avail.getDate());

   switch (month) {
     case 9:
     case 10:
     case 11:
     case 12:
       res = true;
       break;
     case 8 :
       if(day >= 16){
        res = true;
       }
       break;
   }

   return res;
 } catch (e) {
   console.log(e.message);
 }
}

Appartamenti_Stanze.prototype.getDiscountRent = function(){
 try {
   if(!this.Appartamento)
     throw new TypeError('Appartamenti_Stanze - getDiscountRent : this.Appartamento');

   var apt = this.Appartamento;
   var usoImmobile = parseInt(apt.UsoImmobile);
   var roomType = parseInt(this.Tipo);
   var discount = 0;

   switch (usoImmobile) {
     case 2:
       discount = 100;
       break;
     case 1:
       if(roomType > 0){
         discount = 25;
       }else{
         discount = 50;
       }
       break;
   }

   return discount;
 } catch (e) {
   console.log(e.message);
 }
}

Appartamenti_Stanze.prototype.getRentIncrease = function(){
 try {
   var increase = 50;

   if(this.IdStanzaMultipla && parseInt(this.IdStanzaMultipla) > 0){
     increase = 25;
   }

   return increase;
 } catch (e) {
   console.log(e.message);
 }
}

Appartamenti_Stanze.prototype.setToggleBooking = function(callback){
 try {
   var self = this;

   if(!callback)
     throw new TypeError('Appartamenti_Stanze - setToggleBooking : callback undefined.');

   var clone = encodeURIComponent(JSON.stringify({ Id : this.Id, BookType : this.BookType }));

   $.ajax({
       method: "POST",
       url: ACTIONS + 'stanza.php?action=toogleBooking',
       data: { data : clone },
   }).done(function(data){
     if (data && data.success){
       callback(true);
     }else{
       callback(false);
     }
   }).fail(function(xhr, status, error) {
     DefaultErrorHandler(xhr, status, error);
   });

 } catch (e) {
   console.log(e.message);
 }
}

function Appartamenti_StanzeMultiple(Id, IdAppartamento, Stanze){
   this.Id = Id;
   this.IdAppartamento = IdAppartamento;
   this.Stanze = Stanze;
}

Appartamenti_StanzeMultiple.prototype.saveRelationship = function (callback){
   var self = this;
   var clone = JSON.stringify(this);
   $.getJSON( ACTIONS + 'appartamentoStanzaMultipla.php?action=saveRelationship&data=' + clone, function( data ) {
       if(callback){
           callback(data);
       }
   });
};
Appartamenti_StanzeMultiple.prototype.delete = function (callback){
   var self = this;
   var clone = JSON.stringify(this);
   $.getJSON( ACTIONS + 'appartamentoStanzaMultipla.php?action=delete&data=' + clone, function( data ) {
       if(callback){
           callback(data);
       }
   });
};

function Appartamenti_PostiAuto(Id, IdAppartamento, Numero, Mq, Prezzo, Posto,Descrizione, Foto, Tipo){
   this.Id = Id;
   this.IdAppartamento = IdAppartamento;
   this.Numero = Numero;
   this.Mq = Mq;
   this.Prezzo = Prezzo;
   this.Posto = Posto;
   this.Descrizione = Descrizione;
   this.Foto = Foto;
   this.Tipo = Tipo;
}

/*
Classe per la creazione automatica dei vari componenti di un tr presente su Edit Dialog di jqGrid.
*/
function tr_jqGrid_select (tr, td_caption, td_data, label, span, div, select){
   this.tr,
   this.td_caption,
   this.td_data,
   this.label,
   this.span,
   this.div,
   this.select,
   this.setELements = function(name, title){
       this.tr =  $('<tr class="select_'+ name +'" id="tr_'+ name +'"></tr>');
       this.td_caption = $('<td class="CaptionTD"></td>');
       this.td_data = $('<td class="DataTD"></td>');
       this.label = $('<label>'+ title +'</label>');
       this.span = $('<span class="FormElement"></span>');
       this.div = $('<div class="customelement" id="'+ name +'" name="'+ name +'"></div>');
       this.select = $('<select class="form-control"></select>');
   }
   this.appendElements = function(tab){
       tab.append(this.tr);
       this.tr.append(this.td_caption.append(this.label)).append(this.td_data);
       this.td_caption.append(this.label);
       this.td_data.append(this.span);
       this.span.append(this.div);
       this.div.append(this.select);
   }
}

function tr_jqGrid_input (tr, td_caption, td_data, label, span, div, input){
   this.tr,
   this.td_caption,
   this.td_data,
   this.label,
   this.span,
   this.div,
   this.input,
   this.setELements = function(name, title, type){
       this.tr =  $('<tr class="FormData input_'+ name +'" id="tr_'+ name +'"></tr>');
       this.td_caption = $('<td class="CaptionTD"></td>');
       this.td_data = $('<td class="DataTD"></td>');
       this.label = $('<label>'+ title +'</label>');
       this.span = $('<span class="FormElement"></span>');
       this.div = $('<div class="customelement"></div>');
       if(!type){
           this.input = $('<input type="text" id="'+ name +'" name="'+ name +'" rowid="_empty" role="textbox" class="FormElement form-control">');
       }else{
           this.input = $('<input type="'+ type +'" id="'+ name +'" name="'+ name +'" rowid="_empty" role="textbox" class="FormElement form-control">');
       }

   }
   this.appendElements = function(tab){
       tab.append(this.tr);
       this.tr.append(this.td_caption.append(this.label)).append(this.td_data);
       this.td_caption.append(this.label);
       this.td_data.append(this.span);
       this.span.append(this.div);
       this.div.append(this.input);
   }
}

function bootbox_Dialog(){
   this.row = $('<div class="row"><div>'),
   this.col_md = function (num){
       return $('<div>', { class: 'col-md-'+num } ,'</div>');
   },
   this.form_horizontal = $('<form>', { class:"form-horizontal" } ,'</form>'),
   this.form_group = function (){
       return $('<div>', { class:"form-group" } ,'</div>');
   },
   this.addClass = function (elem, custom){
       var classes = elem.attr('class');
       return elem.attr("class", classes + " " + custom);
   },
   this.addButton = function (elem, customClass, text, val){

       if(!val){
           val = 0;
       }

       var button = $('<button>', { type: "button", class: "btn " + customClass,  'data-id' : val, text: text} , '</button>');

       return elem.append(button);
   },
   this.createDialog = function(data){
       var colMd;

       for(var chiave in data){
           var section = data[chiave];
           var formGroup = this.form_group();

           if(section.rows && section.rows.length > 0){
               var rows = section.rows;

               for(var key in rows){
                   var elem = rows[key];

                   switch (elem.type){

                       case "line":
                           colMd = this.col_md(elem.width);
                           colMd.append(elem.titolo);
                           formGroup.append(colMd);
                           break;
                       case "button":
                           colMd = this.col_md(elem.width);
                           this.addButton(colMd, elem.class, elem.text, elem.value);
                           formGroup.append(colMd);
                           break;

                   }

               }
           }

           if(section.options && section.options.length > 0){
               var options = section.options;

               for(var llave in options){

                   var option = options[llave];

                   switch (option.type){

                       case "form_group":
                           if(option.customClass){
                               this.addClass(formGroup, option.customClass);
                           }
                           break;

                   }

               }

           }

           this.form_horizontal.append(formGroup);

       }

       var colMd12 = this.col_md(12);
       this.row.append(colMd12);
       colMd12.append(this.form_horizontal);

       return this.row;
   }
}

function CodiceFiscale(Cognome, Nome, Sesso, Data, Comune){
   this.Cognome = Cognome;
   this.Nome = Nome;
   this.Sesso = Sesso.toUpperCase();
   this.Data = new Date(Data);
   this.Comune = Comune;
}

CodiceFiscale.prototype.isEmpty = function (s){
   return s === null || s.length === 0;
};

CodiceFiscale.prototype.checkValues = function (){
   var args = this.toStringArray();
   for(var prop in args){
       if(this.isEmpty(args[prop].toString())){
           alert("Campo vuoto!");
       }
   }

   if(this.Data === null || this.Data  === "" || isNaN(this.Data)){
       alert("Data non valida!");
   }

   if(!(this.Sesso === "M" || this.Sesso === "F")){
       alert("Sesso non valido!");
   }

};

CodiceFiscale.prototype.toStringArray = function(){
   var args = [];
   args.push(this.Cognome, this.Nome, this.Sesso, this.Comune );
   return   args;
};

CodiceFiscale.prototype.calcolaCodCognome = function (){
   var codice;

};

CodiceFiscale.prototype.ottieniConsVoc = function (stringa, conson) {
       var testo;
       var i = 0;
       var valChar = stringa.split('');
       for (i = 0; i < valChar.length; i++) {
               if (valChar[i] ^ conson) {
                   testo.append(valChar[i]);
               }
       }
       return testo.toString();
};

function toDate(selector) {
   var from = $(selector).val().split("/");
   return new Date(from[2], from[1] - 1, from[0]);
}

function toDateValue(date){
 var from = date.split("/");
 return new Date(from[2], from[1] - 1, from[0]);
}

/*
* dateValidation : yyyy-mm-dd
*/
function dateValidation(value){
   var result = false;
   var date = new Date(value);
   if(date && !isNaN(date)){
       result = true;
   }

   return result;
}

function validateDDMMYYYY (input){
   var reg = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
   var result = false;
   if (input.match(reg)) {
       result = true;
   }

   return result;
}

function titoloTipologiaDestinatario(costante){
   var s = "Non assegnato";

   if(costante === DESTINATARI_INQUILINI){
       s = "Inquilino";
   }else if(costante === DESTINATARI_CLIENTI){
       s = "Altri clienti";
   }else if(costante === DESTINATARI_BENEFICIARI){
       s = "Beneficiari";
   }else if(costante === DESTINATARI_MANUTENZIONI){
       s = "Manutentori";
   }else if(costante === DESTINATARI_NONE){
       s = "NONE";
   }

   return s;
}

function printErrors(array, dialog){

   var s = "";
   if(dialog === true){
       for (var chiave in array) {
           s = s + "<p>" + array[chiave] + "</p>";
       }
   }else{
       for (var chiave in array) {
           console.log(array[chiave]);
       }
   }

   return s;

}

function titoloSocieta(costante){
   var s = "Non assegnato";

   if(parseInt(costante) === FINLIBERA){
       s = "Finlibera";
   }else if(parseInt(costante) === ECOLIBERA){
       s = "Ecolibera";
   }

   return s;
}

function titoloTipologia(costante){
   costante = parseInt(costante);
   var s = "Non assegnato";

   if(costante === FATTURA_PI){
       s = "Primo Ingresso";
   }else if(costante === FATTURA_LOCAZIONE){
       s = "Fattura di Locazione";
   }else if(costante === FATTURA_CHIUSURA){
       s = "Fattura di Chiusura";
   }else if(costante === FATTURA_STORNO){
       s = "Nota di credito";
   }else if(costante === FATTURA_NONE){
       s = "Altro";
   }

   return s;
}

function Privilege(access){
   this.access = access;
   this.checkPrivilege = function (){
       if(this.access){
           return true;
       }else{
           return false;
       }
   };
   this.set = function (val){
       this.access = val;
   };
}

var replaceObject = function(a, b) {
   var prop;

   for ( prop in a ) delete a[prop];
   for ( prop in b ) a[prop] = b[prop];
};

function Movimento(Id, DataOperazione, DataValuta, Importo, Causale, Descrizione, Societa, DataRegistrazione, DataAggiornamento, Giustificativi, MovimentoDettagli, MovimentoDettagli_TagMovimenti){
    this.Id = Id;
    this.DataOperazione = DataOperazione;
    this.DataValuta = DataValuta;
    this.Importo = Importo;
    this.Causale = Causale;
    this.Descrizione = Descrizione;
    this.Societa = Societa;
    this.DataRegistrazione = DataRegistrazione;
    this.DataAggiornamento = DataAggiornamento;
    this.Giustificativi = Giustificativi;/*Array di Movimento_Intestatario*/
    this.MovimentoDettagli = MovimentoDettagli;
    this.MovimentoDettagli_TagMovimenti = MovimentoDettagli_TagMovimenti;
}

Movimento.prototype.Linking = function (){
    if(this.Giustificativi && this.Giustificativi.length > 0){
        var giustificativi = this.Giustificativi;
        each(giustificativi, function (key, registro, index){
            giustificativi[key] = $.extend(new Movimento_Intestatario(), giustificativi[key]);
            giustificativi[key].Linking();
        });
    }

    if(this.MovimentoDettagli_TagMovimenti){
      this.MovimentoDettagli_TagMovimenti = $.extend(new MovimentoDettagli_TagMovimenti(), this.MovimentoDettagli_TagMovimenti);
      this.MovimentoDettagli_TagMovimenti.Linking();
    }

    if(this.MovimentoDettagli){
      this.MovimentoDettagli = $.extend(new MovimentoDettagli(), this.MovimentoDettagli);
      this.MovimentoDettagli.Linking();
    }

};
Movimento.prototype.Search = function (filtro, callback){
    var self = this;
    var data = { Movimento : self, FiltroMovimento : filtro };
    var clone = encodeURIComponent(JSON.stringify(data));

    $.ajax({
        method: "POST",
        url: ACTIONS + 'movimento.php?action=search',
        data: { data : clone },
    }).done(function(res){
      if(res && res.Data && res.Data.length > 0){
        var movimenti = res.Data;
        each(movimenti, function (key, registro, index){
            movimenti[key] = $.extend(new Movimento(), movimenti[key]);
            movimenti[key].Linking();
        });
      }

      if(callback){
          callback(res);
      }
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });
};

Movimento.prototype.Search_v2 = function(filtro, callback){
  var self = this;
  var data = { Movimento : self, FiltroMovimento : filtro };
  var clone = encodeURIComponent(JSON.stringify(data));

  $.ajax({
      method: "POST",
      url: ACTIONS + 'movimento.php?action=searchOnRecorded',
      data: { data : clone },
  }).done(function(res){
    if(res && res.Data && res.Data.length > 0){
      var movimenti = res.Data;
      each(movimenti, function (key, registro, index){
          movimenti[key] = $.extend(new Movimento(), movimenti[key]);
          movimenti[key].Linking();
      });
    }

    if(callback){
        callback(res);
    }
  }).fail(function(xhr, status, error) {
    DefaultErrorHandler(xhr, status, error);
  });
}

Movimento.prototype.SearchOnRecorded = function (filtro, callback){
    var self = this;
    var data = { Movimento : self, FiltroMovimento : filtro };
    var clone = encodeURIComponent(JSON.stringify(data));

    $.ajax({
        method: "POST",
        url: ACTIONS + 'movimento.php?action=searchOnRecorded',
        data: { data : clone },
    }).done(function(data){
      if(callback){
          callback(data);
      }
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });
};
Movimento.prototype.Load = function (callback){
    var self = this;
    var clone = encodeURIComponent(JSON.stringify(self));

    $.ajax({
        method: "POST",
        url: ACTIONS + 'movimento.php?action=load',
        data: { data : clone },
    }).done(function(res){
      if(res && res.Data){
          res = $.extend(self, res.Data);
          res.Linking();
      }

      if(callback){
          callback();
      }
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });
};
Movimento.prototype.LoadMovimenti = function (filtro, callback){
    var self = this;
    var data = { Movimento : self, FiltroMovimento : filtro };
    var clone = encodeURIComponent(JSON.stringify(data));

    $.ajax({
        method: "POST",
        url: ACTIONS + 'movimento.php?action=loadMovimenti',
        data: { data : clone },
    }).done(function(data){
      if(callback){
          callback(data);
      }
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });
};
Movimento.prototype.LoadMovimentiRegistrati = function (filtro, callback){
    var self = this;
    var data = { Movimento : self, FiltroMovimento : filtro };
    var clone = encodeURIComponent(JSON.stringify(data));

    $.ajax({
        method: "POST",
        url: ACTIONS + 'movimento.php?action=loadMovimentiRegistrati',
        data: { data : clone },
    }).done(function(data){
      if(callback){
          callback(data);
      }
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });
};
Movimento.prototype.reset = function (){
    var self = this;
    self = new Movimento();
};
Movimento.prototype.getTitle_Societa = function (){

    var string = "";

    switch (parseInt(this.Societa)) {
      case 0:
        string = "Finlibera SPA";
        break;
      case 1:
        string = "Ecolibera";
        break;
    }

    return string;
};
/*
 * canAddDocs : permette l'inserimento di giustificativi multipli oppure del primo giustificativo.
 * Esegue un controllo per determinare se c'è un solo ramo con un importo, in caso positivo allora si inseriscono più giustificativi.
 *
 * TODO : Fare il controllo per inquilino, perchè se non lo è allora non lo è bisogno di aggiungere un importo. Almeno per ora
 *
 */
Movimento.prototype.canAddDocs = function (){
  var bool = false;
  if(this.Giustificativi && this.Giustificativi.length === 1 && this.Giustificativi[0].canAddMoreDocs()){
    //console.log("canAddMoreDocs = true");
    bool = true;
  }else if (this.Giustificativi && this.Giustificativi.length === 0) {
    //console.log("first doc");
    bool = true;
  }
  return bool;
};
Movimento.prototype.AddM_I = function(Intestatario, callback){
  var self = this;
  var m_i = new Movimento_Intestatario();
  if (Intestatario && Intestatario.Id && Intestatario.Type) {
    m_i.IdIntestatario = Intestatario.Id;
    m_i.TipoIntestatario = Intestatario.Type;
    //m_i.Intestatario = Intestatario.Intestatario;
    m_i.Intestatario = Intestatario;
    m_i.IdMovimento = self.Id;

    if(!this.SearchM_I(Intestatario)){
      this.Giustificativi.push(m_i);
    }
  }

  if(callback){
    callback();
  }

};
Movimento.prototype.RemoveM_I = function(Intestatario, callback){
  var self = this;
  self.SearchM_I(Intestatario, function(m_i, index){
    if (m_i.countSavedDocumentiFiscali() <= 0) {
      self.Giustificativi.splice(index, 1);
      if(callback){
        callback();
      }
    }
  });
};
Movimento.prototype.DeleteM_I = function(Intestatario, callback){
  var self = this;
  self.SearchM_I(Intestatario, function(m_i, index){
    self.Giustificativi.splice(index, 1);
    if(callback){
      callback();
    }
  });
};
Movimento.prototype.AddDocumentoFiscale = function(Intestatario, DocumentoFiscale, callback){
  var self = this;
  var ramo = new RamoMovimento();
  ramo.RamoMovimento_DocumentoFiscale = new RamoMovimento_DocumentoFiscale();
  ramo.RamoMovimento_DocumentoFiscale.IdDocumentoFiscale = DocumentoFiscale.Id;
  ramo.RamoMovimento_DocumentoFiscale.TipoDocumentoFiscale = DocumentoFiscale.Type;
  ramo.RamoMovimento_DocumentoFiscale.DocumentoFiscale = DocumentoFiscale;

  this.AddM_I(Intestatario, function(){
    if(DocumentoFiscale && self.Giustificativi.length > 0){
      self.SearchM_I(Intestatario, function(m_i){
        if (!self.SearchDocumentoFiscale(m_i, DocumentoFiscale)) {
          m_i.RamoMovimento.push(ramo);

          if (callback) {
            callback();
          }

        }

      });
    }
  });
};
Movimento.prototype.RemoveDocumentoFiscale = function(Intestatario, DocumentoFiscale, callback){
  var self = this;
  this.SearchM_I(Intestatario, function(m_i, m_i_Index){
    self.SearchDocumentoFiscale(m_i, DocumentoFiscale, function(ramo, index){
      m_i.RamoMovimento.splice(index, 1);
      if(m_i.RamoMovimento.length <= 0){
        self.Giustificativi.splice(m_i_Index, 1);
      }
      if(callback){
        callback();
      }
    });
  });

};
Movimento.prototype.SearchM_I = function(Intestatario, callback){
  var bool = false;
  var m_i = new Movimento_Intestatario();
  m_i.IdMovimento = this.Id;
  if(Intestatario && parseInt(Intestatario.Id) > 0 && this.Giustificativi.length > 0){
    m_i.IdIntestatario = Intestatario.Id;
    m_i.TipoIntestatario = Intestatario.Type;
    for (var i = 0; i < this.Giustificativi.length; i++) {
      if(bool === true){
        break;
      }

      if (this.Giustificativi[i].compareWith(m_i)) {
        bool = true;
        if(callback){
          callback(this.Giustificativi[i], i);
        }
      }
    }
  }

  return bool;
};

//m_i : e' l'oggetto dove andrà a cercare il DocumentoFiscale
Movimento.prototype.SearchDocumentoFiscale = function(m_i, DocumentoFiscale, callback){
  var self = this;
  var bool = false;

  if(!m_i.RamoMovimento){
    m_i.RamoMovimento = new Array();
  }

  if (m_i && m_i.RamoMovimento && m_i.RamoMovimento.length > 0 && DocumentoFiscale) {
    for (var i = 0; i < m_i.RamoMovimento.length; i++) {
      if (bool === true) {
        break;
      }

      if (m_i.RamoMovimento[i].RamoMovimento_DocumentoFiscale && m_i.RamoMovimento[i].RamoMovimento_DocumentoFiscale.compareWith(DocumentoFiscale)) {
        bool = true;
        if (callback) {
          callback(m_i.RamoMovimento[i], i);
        }
      }
    }
  }

  return bool;
};
Movimento.prototype.countDocumentiFiscali = function(){
  var counter = 0;

  if (this.Giustificativi && this.Giustificativi.length > 0) {
    for (var i = 0; i < this.Giustificativi.length; i++) {
      counter += this.Giustificativi[i].countDocumentiFiscali();
    }
  }

  return counter;
};
Movimento.prototype.countSavedDocumentiFiscali = function(){
  var counter = 0;

  if (this.Giustificativi && this.Giustificativi.length > 0) {
    for (var i = 0; i < this.Giustificativi.length; i++) {
      counter += this.Giustificativi[i].countSavedDocumentiFiscali();
    }
  }

  return counter;
};
Movimento.prototype.countNewDocumentiFiscali = function(){
  var counter = 0;

  if (this.Giustificativi && this.Giustificativi.length > 0) {
    for (var i = 0; i < this.Giustificativi.length; i++) {
      counter += this.Giustificativi[i].countNewDocumentiFiscali();
    }
  }

  return counter;
};
Movimento.prototype.countNewM_I = function(){
  var counter = 0;

  if (this.Giustificativi && this.Giustificativi.length > 0) {
    for (var i = 0; i < this.Giustificativi.length; i++) {
      if (!this.Giustificativi[i].Id && parseInt(this.Giustificativi[i].Id) <= 0) {
        counter++;
      }
    }
  }

  return counter;
};
Movimento.prototype.countSavedM_I = function(){
  var counter = 0;

  if (this.Giustificativi && this.Giustificativi.length > 0) {
    for (var i = 0; i < this.Giustificativi.length; i++) {
      if (this.Giustificativi[i].Id && parseInt(this.Giustificativi[i].Id) > 0) {
        counter++;
      }
    }
  }

  return counter;
};
/**
 * [Movimento_Intestatari_ForEach description]
 * @param {Function} callback [description]
 * @return {[Movimento_Intestatario]}
 */
Movimento.prototype.Movimento_Intestatari_ForEach = function(callback){
  if (this.Giustificativi && this.Giustificativi.length > 0) {
    for (var i = 0; i < this.Giustificativi.length; i++) {
      if (callback) {
        callback(this.Giustificativi[i]);
      }
    }
  }
}
Movimento.prototype.getM_IByTipologiaIntestatario = function(type, subType){
  var arr = new Array();
  var self = this;

  if (type && self.Giustificativi && self.Giustificativi.length > 0) {
    switch (parseInt(type)) {
      //Cliente
      case 1:
        if (subType) {
          //Inquilino o AltriClienti
          self.Movimento_Intestatari_ForEach(function(m_i){
            if (parseInt(m_i.TipoIntestatario) === parseInt(type)) {
              if (m_i.Intestatario && m_i.Intestatario.Type && parseInt(m_i.Intestatario.Type) === parseInt(subType)) {
                arr.push(m_i);
              }
            }
          });
        } else {
          self.Movimento_Intestatari_ForEach(function(m_i){
            if (parseInt(m_i.TipoIntestatario) === parseInt(type)) {
              arr.push(m_i);
            }
          });
        }
        break;
      //Fornitore
      case 2:
        self.Movimento_Intestatari_ForEach(function(m_i){
          if (parseInt(m_i.TipoIntestatario) === parseInt(type)) {
            arr.push(m_i);
          }
        });
        break;
    }
  }

  return arr;
};
/**
 * [Save
 *
 * If success is true , then the transaction will be reloaded.
 *
 * ]
 * @param {Function} callback [description]
 */
Movimento.prototype.Save = function(callback){
  var self = this;
  var clone = encodeURIComponent(JSON.stringify(self));

  $.ajax({
      method: "POST",
      url: ACTIONS + 'movimento.php?action=save',
      data: { data : clone },
  }).done(function(res){
    if(res){
      self.Load(function(){
        if(callback){
            callback(res.Success);
        }
      });
    }else {
      self.Load(function(){
        if(callback){
            callback(false);
        }
      });
    }
  }).fail(function(xhr, status, error) {
    DefaultErrorHandler(xhr, status, error);
  });
};

function Intestatario(Id, Type, $Intestatario){
    this.Id = Id;
    this.Type = Type;
    this.Intestatario = $Intestatario;
}

Intestatario.prototype.Linking = function (){
    switch (parseInt(this.Type)){
        case 1:
            if(this.Intestatario){
                this.Intestatario = $.extend(new Cliente(), this.Intestatario);
                this.Intestatario.Linking();
            }
            break;
        case 2:
            if(this.Intestatario){
                this.Intestatario = $.extend(new Fornitore(), this.Intestatario);
                //this.Intestatario.Linking();
            }
            break;
    }
};

Intestatario.prototype.getLang = function(){
  var lang = null;
  switch (parseInt(this.Type)){
      case 1:
          if(this.Intestatario){
              lang = this.Intestatario.getLang();
          }
          break;
      case 2:
          if(this.Intestatario){
            lang = null;
          }
          break;
  }

  return lang;
}

Intestatario.prototype.getNominativo = function(){
  var nominativo = "";

  if(this.Intestatario){
    nominativo = this.Intestatario.getNominativo();
  }

  return nominativo;
}

Intestatario.prototype.getFormalNominativo = function(){
  var nominativo = "";

  if(this.Intestatario){
    nominativo = this.Intestatario.getFormalNominativo();
  }

  return nominativo;
}

Intestatario.prototype.LoadRelationship = function (callback){
    var self = this;
    var clone = encodeURIComponent(JSON.stringify(self));
    $.ajax({
        method: "POST",
        url: ACTIONS + 'intestatario.php?action=loadRelationship',
        data: { data : clone },
    }).done(function(res){
      if(res && res.Data){
          res = $.extend(self, res.Data);
          res.Linking();
          //replaceObject(self, res);
      }

      if(callback){
          callback();
      }
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });
};

Intestatario.prototype.Search = function (filtro, callback){
    var self = this;
    var data = { Intestatario : self, FiltroIntestatario : filtro };
    var clone = encodeURIComponent(JSON.stringify(data));

    $.ajax({
        method: "POST",
        url: ACTIONS + 'intestatario.php?action=search',
        data: { data : clone },
    }).done(function(res){
      var registro = res.Data;
      each(registro, function (key, r, index){
          registro[key] = $.extend(new Intestatario(), registro[key]);
          registro[key].Linking();
      });

      if(callback){
          callback(res);
      }
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });
};

Intestatario.prototype.SaveRelationship = function (callback){
    var self = this;
    var clone = encodeURIComponent(JSON.stringify(self));

    $.ajax({
        method: "POST",
        url: ACTIONS + 'intestatario.php?action=saveRelationship',
        data: { data : clone },
    }).done(function(res){
      var success = false;
      var intestatario = null;

      if(res && res.success && res.Intestatario){
          success = true;
          intestatario = $.extend(new Intestatario(), res.Intestatario);
          intestatario.Linking();
      }

      if(callback){
          callback(success, intestatario);
      }
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });
};

Intestatario.prototype.LoadGiustificativi = function(filtro, callback){
  var self = this;
  var data = { Intestatario : self, FiltroIntestatario : filtro };
  var clone = encodeURIComponent(JSON.stringify(data));

  $.ajax({
      method: "POST",
      url: ACTIONS + 'intestatario.php?action=loadGiustificativi',
      data: { data : clone },
  }).done(function(res){
    var registro = res.Data;
    each(registro, function (key, r, index){
        registro[key] = $.extend(new DocumentoFiscale(), registro[key]);
        registro[key].Linking();
    });

    if(callback){
        callback(res);
    }
  }).fail(function(xhr, status, error) {
    DefaultErrorHandler(xhr, status, error);
  });
};

Intestatario.prototype.getPrimaryEmail = function(){
  var self = this;
  var email = null;

  try {
    if (!this.Intestatario)
      throw new TypeError('Intestatario - getPrimaryEmail : this.Intestatario undefined');
    email = this.Intestatario.getPrimaryEmail();
  } catch (e) {
    console.log(e.message);
  }

  return email;
}

Intestatario.prototype.getSecondaryEmail = function(){
  var self = this;
  var email = null;

  try {
    if (!this.Intestatario)
      throw new TypeError('Intestatario - getSecondaryEmail : this.Intestatario undefined');
    email = this.Intestatario.getSecondaryEmail();
  } catch (e) {
    console.log(e.message);
  }

  return email;
}

Intestatario.prototype.getTextTipologia = function(){
  var self = this;
  var txt = "none";
  try {
    if(!this.Intestatario)
      throw new TypeError('Intestatario - getTextTipologia : this.Intestatario undefined');

      switch (parseInt(this.Type)){
          case 1:
            switch (parseInt(this.Intestatario.Type)) {
              case 1:
                txt = "Inquilino";
                break;
              case 2:
                txt = "Altro Cliente";
                break;
            }
            break;
          case 2:
            txt = "Fornitore";
            break;
      }
  } catch (e) {
    console.log(e.message);
  }

  return txt;
}

function Cliente(Id, Type, IdIntestatario, TipoIntestatario, Cliente){
    this.Id = Id;
    this.Type = Type;
    this.IdIntestatario = IdIntestatario;
    this.TipoIntestatario = TipoIntestatario;
    this.Cliente = Cliente;
};

Cliente.prototype.Linking = function (){
    switch (parseInt(this.Type)){
        case 1:
            if(this.Cliente){
                this.Cliente = $.extend(new Inquilino(), this.Cliente);
            }
            break;
        case 2:
            if(this.Cliente){
                this.Cliente = $.extend(new AltroCliente(), this.Cliente);
            }
            break;
    }
};

Cliente.prototype.getLang = function(){
  var lang = null;
  switch (parseInt(this.Type)){
      case 1:
          if(this.Cliente){
              lang = this.Cliente.getLang();
          }
          break;
      case 2:
          if(this.Cliente){
            lang = this.Cliente.getLang();
          }
          break;
  }

  return lang;
};

Cliente.prototype.getNominativo = function(){
  var nominativo = "";

  if(this.Cliente){
    nominativo = this.Cliente.getNominativo();
  }

  return nominativo;
};

Cliente.prototype.getFormalNominativo = function(){
  return this.Cliente.getFormalNominativo();
}

Cliente.prototype.getPrimaryEmail = function(){
  var self = this;
  var email = null;

  try {
    if (!this.Cliente)
      throw new TypeError('Cliente - getPrimaryEmail : this.Cliente undefined');
    email = this.Cliente.getPrimaryEmail();
  } catch (e) {
    console.log(e.message);
  }

  return email;
}

Cliente.prototype.getSecondaryEmail = function(){
  var self = this;
  var email = null;

  try {
    if (!this.Cliente)
      throw new TypeError('Cliente - getSecondaryEmail : this.Cliente undefined');
    email = this.Cliente.getSecondaryEmail();
  } catch (e) {
    console.log(e.message);
  }

  return email;
}

function Inquilino(Id, Type, IdAdmin, IdPersonalInfo, Cognome, Nome, Sesso, Lang, Fonte, Professione, Specializzazione, DataNascita, Ente, PrimaryEmail, SecondaryEmail, Telefono, Indirizzo, Civico, CAP, Citta, Stato, Paese, Paese_Sigla_ISO3166_2, LuogoNascita, CodiceFiscale, ForeignIdentificationNumber, PartitaIva, IntestatarioConto, IBAN, SWIFT, FidelityCard, Note, DataRegistrazione, DataAggiornamento){
    this.Id = Id;
    this.Type = Type;
    this.IdAdmin = IdAdmin;
    this.IdPersonalInfo = IdPersonalInfo;
    this.Cognome = Cognome;
    this.Nome = Nome;
    this.Sesso = Sesso;
    this.Lang = Lang;
    this.Fonte = Fonte;
    this.Professione = Professione;
    this.Specializzazione = Specializzazione;
    this.DataNascita = DataNascita;
    this.Ente = Ente;
    this.PrimaryEmail = PrimaryEmail;
    this.SecondaryEmail = SecondaryEmail;
    this.Telefono = Telefono;
    this.Indirizzo = Indirizzo;
    this.Civico = Civico;
    this.CAP = CAP;
    this.Citta = Citta;
    this.Stato = Stato;
    this.Paese = Paese;
    this.Paese_Sigla_ISO3166_2 = Paese_Sigla_ISO3166_2;
    this.LuogoNascita = LuogoNascita;
    this.CodiceFiscale = CodiceFiscale;
    this.ForeignIdentificationNumber = ForeignIdentificationNumber;
    this.PartitaIva = PartitaIva;
    this.IntestatarioConto = IntestatarioConto;
    this.IBAN = IBAN;
    this.SWIFT = SWIFT;
    this.FidelityCard = FidelityCard;
    this.Note = Note;
    this.DataRegistrazione = DataRegistrazione;
    this.DataAggiornamento = DataAggiornamento;
};

Inquilino.prototype.getNominativo = function(){
  var nominativo = "";

  if(this.Nome && this.Nome !== ""){
    nominativo += (nominativo === "" ? this.Nome : " " + this.Nome);
  }

  if(this.Cognome && this.Cognome !== ""){
    nominativo += (nominativo === "" ? this.Cognome : " " + this.Cognome);
  }

  return nominativo;
};

Inquilino.prototype.getFormalNominativo = function(){
  var nominativo = "";

  if(this.Cognome && this.Cognome !== ""){
    nominativo += (nominativo === "" ? this.Cognome : " " + this.Cognome);
  }

  if(this.Nome && this.Nome !== ""){
    nominativo += (nominativo === "" ? this.Nome : " " + this.Nome);
  }

  return nominativo;
}

Inquilino.prototype.getPrimaryEmail = function(){
  try {
    if (!this.PrimaryEmail || this.PrimaryEmail === "")
      throw new TypeError('Inquilino - getPrimaryEmail : this.PrimaryEmail undefined');

    return this.PrimaryEmail;
  } catch (e) {
    console.log(e.message);
  }
};

Inquilino.prototype.getSecondaryEmail = function(){
  if(this.SecondaryEmail && this.SecondaryEmail !== "")
    return this.SecondaryEmail;

  return null;
};

Inquilino.prototype.getLang = function(){
  var lang = null;
  if (this.Lang && this.Lang !== "") {
    lang = this.Lang;
  }
  return lang;
};

Inquilino.prototype.getPDFMatrix = function(callback){
  var self = this;

  var pdfMatrix = {
    fullName : null,
    street : null,
    city : null
  };

  try {
    pdfMatrix.fullName = this.getNominativo();

    if(this.Indirizzo && this.Indirizzo !== ""){
      pdfMatrix.street = this.Indirizzo;
    }

    if (pdfMatrix.street && this.Civico && this.Civico !== "") {
      pdfMatrix.street += " " + this.Civico;
    }

    pdfMatrix.city = "";
    if(this.CAP && this.CAP !== ""){
      pdfMatrix.city += (pdfMatrix.city === "" ? this.CAP : " " + this.CAP);
    }

    if(this.Citta && this.Citta !== ""){
      pdfMatrix.city += (pdfMatrix.city === "" ? this.Citta : " " + this.Citta);
    }

    if (callback) {
      callback(pdfMatrix);
    }
  } catch (e) {
    console.log(e.message);
  }

  return pdfMatrix;
}

Inquilino.prototype.checkCodiceFiscale = function(callback){
  try {
    var self = this;
    var data = { Inquilino : self };
    var clone = encodeURIComponent(JSON.stringify(data));
    var result = false;//doesn't exist

    $.ajax({
        method: "POST",
        url: ACTIONS + 'intestatario.php?action=checkCodiceFiscaleExists',
        data: { data : clone },
    }).done(function(res){
      if(res && res.Count && res.Count.length > 0){
        result = true;
      }

      if(callback){
          callback(result);
      }
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });

  } catch (e) {
    console.log(e.message);
  }
}

Inquilino.prototype.LoadIns = function(callback){
  try {
    var self = this;
    var data = { Inquilino : self };
    var clone = encodeURIComponent(JSON.stringify(data));

    $.ajax({
        method: "POST",
        url: ACTIONS + 'intestatario.php?action=LoadInsByInquilino',
        data: { data : clone },
    }).done(function(res){
      if(res && res.Data && res.Data.length > 0){
        var contracts = res.Data;
        each(contracts, function (key, registro, index){
            contracts[key] = $.extend(new Inquilino_Stanza(), contracts[key]);
            contracts[key].Linking();
        });
      }

      if(callback){
          callback(res);
      }
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });

  } catch (e) {
    console.log(e.message);
  }
}

Inquilino.prototype.generatePersonalInfo = function(PersonalInfo){
  try {
    var self = this;

    if(!PersonalInfo || !(PersonalInfo instanceof Booking_PersonalInfo))
      throw new TypeError('Inquilino - generatePersonalInfo : PersonalInfo undefined!');

    if(this.IdPersonalInfo && parseInt(this.IdPersonalInfo) > 0)
      PersonalInfo.Id = this.IdPersonalInfo;

    if(this.Cognome)
      PersonalInfo.Cognome = this.Cognome;

    if(this.Nome)
      PersonalInfo.Nome = this.Nome;

    if(this.Sesso)
      PersonalInfo.Sesso = this.Sesso;

    if(this.Lang)
      PersonalInfo.Lang = this.Lang;

    if(this.Professione)
      PersonalInfo.Professione = this.Professione;

    if(this.Specializzazione)
      PersonalInfo.Specializzazione = this.Specializzazione;

    if(this.DataNascita)
      PersonalInfo.DataNascita = this.DataNascita;

    if(this.Ente)
      PersonalInfo.Ente = this.Ente;

    if(this.PrimaryEmail)
      PersonalInfo.PrimaryEmail = this.PrimaryEmail;

    if(this.SecondaryEmail)
      PersonalInfo.SecondaryEmail = this.SecondaryEmail;

    if(this.Telefono)
      PersonalInfo.Telefono = this.Telefono;

    if(this.Indirizzo)
      PersonalInfo.Indirizzo = this.Indirizzo;

    if(this.Civico)
      PersonalInfo.Civico = this.Civico;

    if(this.CAP)
      PersonalInfo.CAP = this.CAP;

    if(this.Citta)
      PersonalInfo.Citta = this.Citta;

    if(this.Stato)
      PersonalInfo.Stato = this.Stato;

    if(this.Paese)
      PersonalInfo.Paese = this.Paese;

    if(this.LuogoNascita)
      PersonalInfo.LuogoNascita = this.LuogoNascita;

    if(this.LuogoNascitaText)
      PersonalInfo.LuogoNascitaText = this.LuogoNascitaText;

    if(this.CodiceFiscale)
      PersonalInfo.CodiceFiscale = this.CodiceFiscale;

    if(this.PartitaIva)
        PersonalInfo.PartitaIva = this.PartitaIva;

    if(this.IntestatarioConto)
      PersonalInfo.IntestatarioConto = this.IntestatarioConto;

    if(this.IBAN)
      PersonalInfo.IBAN = this.IBAN;

    if(this.SWIFT)
      PersonalInfo.SWIFT = this.SWIFT;

  } catch (e) {
    console.log(e.message);
  }
}

function AltroCliente(Id, Type, Cognome, Nome, Lang, RagioneSociale, Telefono, Email, CodiceFiscale, ForeignIdentificationNumber, PartitaIva, Indirizzo, Citta, Civico, CAP, Stato, Paese, Paese_Sigla_ISO3166_2, CodiceDestinatario, PecDestinatario, DataRegistrazione, DataAggiornamento){
    this.Id = Id;
    this.Type = Type;
    this.Cognome = Cognome;
    this.Nome = Nome;
    this.Lang = Lang;
    this.RagioneSociale = RagioneSociale;
    this.Telefono = Telefono;
    this.Email = Email;
    this.CodiceFiscale = CodiceFiscale;
    this.ForeignIdentificationNumber = ForeignIdentificationNumber;
    this.PartitaIva = PartitaIva;
    this.Indirizzo = Indirizzo;
    this.Citta = Citta;
    this.Civico = Civico;
    this.CAP = CAP;
    this.Stato = Stato;
    this.Paese = Paese;
    this.Paese_Sigla_ISO3166_2 = Paese_Sigla_ISO3166_2;
    this.CodiceDestinatario = CodiceDestinatario;
    this.PecDestinatario = PecDestinatario;
    this.DataRegistrazione = DataRegistrazione;
    this.DataAggiornamento = DataAggiornamento;
};

AltroCliente.prototype.getNominativo = function(){
  var nominativo = "";

  if(this.RagioneSociale && this.RagioneSociale !== ""){
    nominativo += (nominativo === "" ? this.RagioneSociale : " " + this.RagioneSociale);
  }else{
    if(this.Nome && this.Nome !== ""){
      nominativo += (nominativo === "" ? this.Nome : " " + this.Nome);
    }

    if(this.Cognome && this.Cognome !== ""){
      nominativo += (nominativo === "" ? this.Cognome : " " + this.Cognome);
    }
  }

  return nominativo;
};

AltroCliente.prototype.getFormalNominativo = function(){
  return this.getNominativo();
}

AltroCliente.prototype.getPrimaryEmail = function(){
  try {
    if (!this.Email || this.Email === "")
      throw new TypeError('AltroCliente - getPrimaryEmail : this.Email undefined');

    return this.Email;
  } catch (e) {
    console.log(e.message);
  }
};

AltroCliente.prototype.getSecondaryEmail = function(){
  return null;
};

AltroCliente.prototype.getLang = function(){
  var lang = null;
  if (this.Lang && this.Lang !== "") {
    lang = this.Lang;
  }
  return lang;
};


AltroCliente.prototype.getPDFMatrix = function(callback){
  var self = this;

  var pdfMatrix = {
    fullName : null,
    street : null,
    city : null
  };

  try {
    pdfMatrix.fullName = this.getNominativo();

    if(this.Indirizzo && this.Indirizzo !== ""){
      pdfMatrix.street = this.Indirizzo;
    }

    if (pdfMatrix.street && this.Civico && this.Civico !== "") {
      pdfMatrix.street += " " + this.Civico;
    }

    pdfMatrix.city = "";
    if(this.CAP && this.CAP !== ""){
      pdfMatrix.city += (pdfMatrix.city === "" ? this.CAP : " " + this.CAP);
    }

    if(this.Citta && this.Citta !== ""){
      pdfMatrix.city += (pdfMatrix.city === "" ? this.Citta : " " + this.Citta);
    }

    if (callback) {
      callback(pdfMatrix);
    }
  } catch (e) {
    console.log(e.message);
  }

  return pdfMatrix;
}

function Fornitore(Id, Type, IdAdminAccount, Cognome, Nome, RagioneSociale, CodiceFiscale, PartitaIva, Telefono, Email, Indirizzo, Citta, Civico, CAP, Stato, Paese, DataRegistrazione, DataAggiornamento){
    this.Id = Id;
    this.Type = Type;
    this.IdAdminAccount = IdAdminAccount;
    this.Cognome = Cognome;
    this.Nome = Nome;
    this.RagioneSociale = RagioneSociale;
    this.CodiceFiscale = CodiceFiscale;
    this.PartitaIva = PartitaIva;
    this.Telefono = Telefono;
    this.Email = Email;
    this.Indirizzo = Indirizzo;
    this.Citta = Citta;
    this.Civico = Civico;
    this.CAP = CAP;
    this.Stato = Stato;
    this.Paese = Paese;
    this.DataRegistrazione = DataRegistrazione;
    this.DataAggiornamento = DataAggiornamento;
};

Fornitore.prototype.getNominativo = function(){
  var nominativo = "";

  if(this.Nome && this.Nome !== ""){
    nominativo += (nominativo === "" ? this.Nome : " " + this.Nome);
  }

  if(this.Cognome && this.Cognome !== ""){
    nominativo += (nominativo === "" ? this.Cognome : " " + this.Cognome);
  }

  if(this.RagioneSociale && this.RagioneSociale !== ""){
    nominativo += (nominativo === "" ? this.RagioneSociale : " " + this.RagioneSociale);
  }

  return nominativo;
};

Fornitore.prototype.getFormalNominativo = function(){
  return this.getNominativo();
}

Fornitore.prototype.getPrimaryEmail = function(){
  try {
    if (!this.Email || this.Email === "")
      throw new TypeError('Fornitore - getPrimaryEmail : this.Email undefined');

    return this.Email;
  } catch (e) {
    console.log(e.message);
  }
};

Fornitore.prototype.getSecondaryEmail = function(){
  return null;
};

Fornitore.prototype.checkUniqueValues = function(callback){
  var self = this;
  var clone = encodeURIComponent(JSON.stringify(self));

  try {
    if(!callback)
      throw new TypeError('Fornitore - checkUniqueValues : this method needs a callback parameter');
    $.ajax({
        method: "POST",
        url: ACTIONS + 'fornitore.php?action=checkPartitaIva',
        data: { data : clone },
    }).done(function(res){
      if(res && res.success){
          callback(true);
      }else{
        callback(false);
      }
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });
  } catch (e) {
    console.log(e.message);
  }
}

function DocumentoFiscale(Id, Type, UUID_Acube, Documento, LastEmailLog, DocumentoFiscale_TagDocumentoFiscale){
    this.Id = Id;
    this.Type = Type;
    this.UUID_Acube;
    this.Documento = Documento;
    this.LastEmailLog = LastEmailLog;
    this.DocumentoFiscale_TagDocumentoFiscale = DocumentoFiscale_TagDocumentoFiscale;
}

DocumentoFiscale.prototype.Linking = function (){
    switch (parseInt(this.Type)){
        case 1:
            if(this.Documento){
                this.Documento = $.extend(new Fattura(), this.Documento);
                this.Documento.Linking();
            }
            break;
        case 2:
            if(this.Documento){
                this.Documento = $.extend(new DocumentoFornitore(), this.Documento);
                this.Documento.Linking();
            }
            break;
    }
    this.LastEmailLog = $.extend(new EmailLogs(), this.LastEmailLog);

    if(this.DocumentoFiscale_TagDocumentoFiscale){
      this.DocumentoFiscale_TagDocumentoFiscale = $.extend(new DocumentoFiscale_TagDocumentoFiscale(), this.DocumentoFiscale_TagDocumentoFiscale);
      this.DocumentoFiscale_TagDocumentoFiscale.Linking();
    }

};

DocumentoFiscale.prototype.setDocumentoFiscale = function (callback){
    var self = this;
    var clone = encodeURIComponent(JSON.stringify(self));

    $.ajax({
        method: "POST",
        url: ACTIONS + 'documentoFiscale.php?action=setDocumentoFiscale',
        data: { data : clone },
    }).done(function(res){
      if(res && res.Data){
          res = $.extend(self, res.Data);
          res.Linking();
      }

      if(callback){
          callback();
      }
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });
};

DocumentoFiscale.prototype.getNominativo = function(){
  var res = "";

  if(this.Documento){
    res = this.Documento.getNominativo();
  }

  return res;
};

DocumentoFiscale.prototype.getNumber = function(){
  try {
    var self = this;

    if(!this.Documento)
      throw new TypeError('DocumentoFiscale - getNumber : this.Documento undefined!');

    var number = this.Documento.getNumber() ? this.Documento.getNumber() : "Numero assente";

    return number;
  } catch (e) {
    console.log(e.message);
  }
}

DocumentoFiscale.prototype.getInvoice = function(){
  try {
    var self = this;
    var invoice = null;

    if(this.Documento){

      if(!this.Type){
        if(this.Documento instanceof DocumentoFornitore)
          this.Type = 2;

        if(this.Documento instanceof Fattura)
          this.Type = 1;
      }

      switch (parseInt(this.Type)) {
        case 1:
          invoice = this.Documento;
          break;
        case 2:
          invoice = this.Documento.getInvoice();
          break;
      }
    }

    return invoice;
  } catch (e) {
    console.log(e.message);
  }
}

DocumentoFiscale.prototype.getTotale = function(){
  var res = null;

  if(this.Documento){
    res = this.Documento.getTotale();
  }

  return res;
};

DocumentoFiscale.prototype.getTitle_Societa = function(){
  var res = null;

  if(this.Documento){
    res = this.Documento.getTitle_Societa();
  }

  return res;
}

function Intestatario_DocumentoFiscale(Intestatario, DocumentoFiscale){
  this.Intestatario = Intestatario;
  this.DocumentoFiscale = DocumentoFiscale;
}

Intestatario_DocumentoFiscale.prototype.LoadRelationship = function(IdDocFisc, TypeDocFisc, callback){
  try {
    var self = this;

    if(!callback)
      throw new TypeError('Intestatario_DocumentoFiscale - LoadRelationship : This method needs a callback argument!');

    if(!IdDocFisc || !(parseInt(IdDocFisc) > 0))
      throw new TypeError('Intestatario_DocumentoFiscale - LoadRelationship : IdDocFisc parameter undefined.');

    if(!TypeDocFisc || !(parseInt(TypeDocFisc) > 0))
      throw new TypeError('Intestatario_DocumentoFiscale - LoadRelationship : TypeDocFisc parameter undefined.');

    console.log("PROVAAA");

      $.ajax({
        method: "POST",
        url: ACTIONS + 'documentoFiscale.php?action=setIntestatario_DocumentoFiscale',
        data: { data : { Id : IdDocFisc, Type : TypeDocFisc } },
      }).done(function(res){
        if(res && res.data){
          res = $.extend(self, res.data);
          res.Linking();
          callback();
        }else{
          callback(false);
        }
      }).fail(function(xhr, status, error) {
        DefaultErrorHandler(xhr, status, error);
      });

  } catch (e) {
    console.log(e.message);
  }
}

Intestatario_DocumentoFiscale.prototype.Linking = function(){
  if(this.DocumentoFiscale){
    this.DocumentoFiscale = $.extend(new DocumentoFiscale(), this.DocumentoFiscale);
    this.DocumentoFiscale.Linking();
  }

  if(this.Intestatario){
    this.Intestatario = $.extend(new Intestatario(), this.Intestatario);
    this.Intestatario.Linking();
  }
}

function DocumentoFornitore(IdDocumentoFiscale, TipoDocumentoFiscale, IdFornitore, Descrizione, DataRegistrazione, DataAggiornamento, CountServizi, Fattura, Servizi){
    this.IdDocumentoFiscale = IdDocumentoFiscale;
    this.TipoDocumentoFiscale = TipoDocumentoFiscale;
    this.IdFornitore = IdFornitore;
    this.Descrizione = Descrizione;
    this.DataRegistrazione = DataRegistrazione;
    this.DataAggiornamento = DataAggiornamento;
    this.CountServizi = CountServizi;
    this.Fattura = Fattura;
    this.Servizi = Servizi;
}

DocumentoFornitore.prototype.DeleteRelationship = function(callback){
  try {
    var self = this;
    var success = false;
    var errorSms = null;

    if(!callback)
      throw new TypeError('DocumentoFornitore - DeleteRelationship : callback undefined');

    var clone = encodeURIComponent(JSON.stringify(this));

    $.ajax({
        method: "POST",
        url: ACTIONS + 'documentoFiscale.php?action=deleteDocumentoFornitore',
        data: { data : clone },
    }).done(function(res){

      if(res && res.success){
        success = true;
      }else if(res && res.data){
        errorSms = res.data;
      }

      callback(success, errorSms);

    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });

  } catch (e) {
    console.log(e.message);
  }
}

DocumentoFornitore.prototype.LoadRelationship = function(callback){
  try {
    var self = this;
    var success = false;
    var docFornitore = null;

    if(!callback)
      throw new TypeError('DocumentoFornitore - LoadServizi : callback undefined');

    var clone = encodeURIComponent(JSON.stringify(this));

    $.ajax({
        method: "POST",
        url: ACTIONS + 'documentoFiscale.php?action=loadDocumentoFornitore',
        data: { data : clone },
    }).done(function(res){

      if(res && res.success && res.data){
        success = true;
        docFornitore = $.extend(self, res.data);
        docFornitore.Linking();
      }

      callback(success);

    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });
  } catch (e) {
    console.log(e.message);
  }
}

DocumentoFornitore.prototype.Linking = function (){

    if(this.Fattura){
        this.Fattura = $.extend(new FatturaFornitore(), this.Fattura);
    }

    if(this.Servizi && parseInt(this.Servizi.Id) > 0){
        this.Servizi = $.extend(new Servizio(), this.Servizi);
        this.Servizi.Linking();
    }else if(this.Servizi && this.Servizi.length > 0){
      var servizi = this.Servizi;
      each(servizi, function(key, registro, index){
        servizi[key] = $.extend(new Servizio(), servizi[key]);
        servizi[key].Linking();
      });
    }

};

DocumentoFornitore.prototype.SaveRelationship = function(callback){
  try {
    if (!this.Fattura && !this.Servizi)
      throw new TypeError('DocumentoFornitore - SaveRelationship : Servizi or Fattura undefined');

    if(!callback)
      throw new TypeError('DocumentoFornitore - SaveRelationship : This method needs a callback argument');

      var self = this;
      var clone = encodeURIComponent(JSON.stringify(this));

      $.ajax({
        method: "POST",
        url: ACTIONS + 'documentoFiscale.php?action=saveDocumentoFornitore',
        data: { data : clone },
      }).done(function(res){
        if(res && res.success && res.data){
          var docFisc = new DocumentoFiscale();
          res.data = $.extend(docFisc, res.data);
          res.data.Linking();
          callback(docFisc);
        }else{
          callback(false);
        }
      }).fail(function(xhr, status, error) {
        DefaultErrorHandler(xhr, status, error);
      });

  } catch (e) {
    console.log(e.message);
    callback(false);
  }
}

DocumentoFornitore.prototype.getNominativo = function(){
  try {

    var res = "";

    if(this.Fattura){
      res = this.Fattura.getNominativo();
    }

    return res;
  } catch (e) {
    console.log(e.message);
  }
}

DocumentoFornitore.prototype.getNumber = function(){
  try {
    var self = this;

    if(!this.Fattura)
      throw new TypeError('DocumentoFornitore - getNumber : this.Fattura undefined!');

    var number = this.Fattura.getNumber() ? this.Fattura.getNumber() : "Numero assente";

    return number;
  } catch (e) {
    console.log(e.message);
  }
}

DocumentoFornitore.prototype.countServizi = function(callback){
  try {
    var self = this;

    if(!callback)
      throw new TypeError('DocumentoFornitore - countServizi : callback undefined!');

    var clone = encodeURIComponent(JSON.stringify(this));

    $.ajax({
        method: "POST",
        url: ACTIONS + 'documentoFiscale.php?action=countServizi',
        data: { data : clone },
    }).done(function(res){

      if(res && res.success && res.data){
        if(res && res.data){
          $.extend(self, res.data)
        }
      }

      callback();

    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });

  } catch (e) {
    console.log(e.message);
  }
}

DocumentoFornitore.prototype.getTotale = function(){
  try {
    if(!this.Fattura)
      throw new TypeError('DocumentoFornitore - getTotale : this.Fattura undefined');

    return this.Fattura.getTotale();
  } catch (e) {
    console.log(e.message);
  }
}

DocumentoFornitore.prototype.getInvoice = function(){
  try {
    var self = this;
    var invoice = null;

    if(this.Fattura){
      invoice = this.Fattura;
    }

    return invoice;
  } catch (e) {
    console.log(e.message);
  }
}

function FatturaFornitore(Id, Numero, Data, Societa, Totale, TipoDocumento, Allegati){
    this.Id = Id;
    this.Numero = Numero;
    this.Data = Data;
    this.Societa = Societa;
    this.Totale = Totale;
    this.TipoDocumento = TipoDocumento;
    this.Allegati = Allegati;
}

FatturaFornitore.prototype.getNominativo = function(){
  var nominativo = "";

  if(this.Numero && this.Numero !== ""){
    nominativo += (nominativo === "" ? "Ft. " + this.Numero : " Ft. " + this.Numero);
  }

  if(this.Data && this.Data !== ""){
    var dataFattura = new Date(this.Data);
    nominativo += (nominativo === "" ? dataFattura.ddmmyyyy() : " del " + dataFattura.ddmmyyyy() );
  }


  return nominativo;
};

FatturaFornitore.prototype.getTotale = function(){
  var tot = 0;

  if(this.Totale){
    tot = this.Totale;
  }

  return tot;
};

FatturaFornitore.prototype.getNumber = function(){
  try {
    var self = this;

    if(!this.Numero)
      throw new TypeError('FatturaFornitore - getNumber : this.Numero undefined!');

    var number = this.Numero ? this.Numero : "Numero assente";

    return number;
  } catch (e) {
    console.log(e.message);
  }
}

FatturaFornitore.prototype.getTitle_Societa = function (){

    var string = "";

    switch (parseInt(this.Societa)) {
      case 0:
        string = "Finlibera SPA";
        break;
      case 1:
        string = "Ecolibera";
        break;
    }

    return string;
};

FatturaFornitore.prototype.checkUniqueValues = function(params, callback){
  var self = this;
  var clone = encodeURIComponent(JSON.stringify(params));

  try {
    if(!callback)
      throw new TypeError('FatturaFornitore - checkUniqueValues : this method needs a callback parameter');
    $.ajax({
        method: "POST",
        url: ACTIONS + 'documentoFiscale.php?action=checkUniqueValuesFtFornitore',
        data: { data : clone },
    }).done(function(res){
      if(res && res.success){
          callback(true);
      }else{
        callback(false);
      }
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });
  } catch (e) {
    console.log(e.message);
  }
}

function RamoMovimento(Id, IdMovimentoIntestatario, Periodo, Descrizione, Importo, $RamoMovimento_DocumentoFiscale){
    this.Id = Id;
    this.IdMovimentoIntestatario = IdMovimentoIntestatario;
    this.Periodo = Periodo;
    this.Descrizione = Descrizione;
    this.Importo = Importo;
    this.RamoMovimento_DocumentoFiscale = $RamoMovimento_DocumentoFiscale;
}

RamoMovimento.prototype.Linking = function (){
    if(this.Periodo){
        this.Periodo = $.extend(new MovimentoPeriodo(), this.Periodo);
    }

    if(this.Descrizione){
        this.Descrizione = $.extend(new MovimentoDescrizione(), this.Descrizione);
    }

    if(this.Importo){
        this.Importo = $.extend(new MovimentoImporto(), this.Importo);
    }

    if(this.RamoMovimento_DocumentoFiscale){
        this.RamoMovimento_DocumentoFiscale = $.extend(new RamoMovimento_DocumentoFiscale(), this.RamoMovimento_DocumentoFiscale);
        this.RamoMovimento_DocumentoFiscale.Linking();
    }

    if(this.RamoMovimento_TagMovimenti){
      this.RamoMovimento_TagMovimenti = $.extend(new RamoMovimento_TagMovimenti(), this.RamoMovimento_TagMovimenti);
      this.RamoMovimento_TagMovimenti.Linking();
    }
};

RamoMovimento.prototype.ifHasImporto = function(){
  var bool = false;

  if(this.Importo && this.Importo.ifHasImporto()){
    bool = true;
  }

  return bool;
};

RamoMovimento.prototype.IsEmptyObject = function(){
  var bool = false;

  if((!this.Periodo || this.Periodo.IsEmptyObject()) && (!this.Descrizione || this.Descrizione.IsEmptyObject()) && (!this.Importo || !this.Importo.ifHasImporto()) && (!this.RamoMovimento_DocumentoFiscale || this.RamoMovimento_DocumentoFiscale.IsEmptyObject())){
    bool = true;
  }

  return bool;
};

RamoMovimento.prototype.getDocumentoFiscale = function(){
  var doc = null;

  if (this.RamoMovimento_DocumentoFiscale) {
    doc = this.RamoMovimento_DocumentoFiscale.getDocumentoFiscale();
  }

  return doc;
};

RamoMovimento.prototype.isNewDoc = function(){
  return this.RamoMovimento_DocumentoFiscale.isNewDoc();
};

RamoMovimento.prototype.Load = function(callback){
  var self = this;
  var clone = encodeURIComponent(JSON.stringify(self));

  $.ajax({
      method: "POST",
      url: ACTIONS + 'ramoMovimento.php?action=load',
      data: { data : clone },
  }).done(function(res){
    if(res && res.Data){
        res = $.extend(self, res.Data);
        res.Linking();
    }

    if(callback){
        callback();
    }
  }).fail(function(xhr, status, error) {
    DefaultErrorHandler(xhr, status, error);
  });
};

RamoMovimento.prototype.Save = function (callback){
    var self = this;
    if (parseInt(self.Id) > 0) {
      var clone = encodeURIComponent(JSON.stringify(self));

      $.ajax({
          method: "POST",
          url: ACTIONS + 'ramoMovimento.php?action=save',
          data: { data : clone },
      }).done(function(res){
        if(res){
          if(callback){
              callback(res.Success);
          }
        }else {
          if(callback){
              callback(false);
          }
        }
      }).fail(function(xhr, status, error) {
        DefaultErrorHandler(xhr, status, error);
      });
    }
};

RamoMovimento.prototype.Delete = function (callback){
    var self = this;
    if (parseInt(self.Id) > 0) {
      var clone = encodeURIComponent(JSON.stringify(self));

      $.ajax({
          method: "POST",
          url: ACTIONS + 'ramoMovimento.php?action=remove',
          data: { data : clone },
      }).done(function(res){
        if(res){
          if(callback){
              callback(res.Success);
          }
        }else {
          if(callback){
              callback(false);
          }
        }
      }).fail(function(xhr, status, error) {
        DefaultErrorHandler(xhr, status, error);
      });
    }
};

function MovimentoDettagli(IdMovimento, Descrizione, DataRegistrazione, DataAggiornamento, $Movimento){
    this.IdMovimento = IdMovimento;
    this.Descrizione = Descrizione;
    this.DataRegistrazione = DataRegistrazione;
    this.DataAggiornamento = DataAggiornamento;
    this.Movimento = $Movimento;
}

MovimentoDettagli.prototype.Linking = function (){
    if(this.Movimento){
        this.Movimento = $.extend(new Movimento(), this.Movimento);
    }
};

MovimentoDettagli.prototype.Save = function(callback){
  var self = this;
  var clone = encodeURIComponent(JSON.stringify(self));

  $.ajax({
      method: "POST",
      url: ACTIONS + 'movimento.php?action=saveMovimentoDettagli',
      data: { data : clone },
  }).done(function(res){
    var success = false;
    var movimento_dettagli = null;

    if(res && res.success && res.data){
        success = true;
        movimento_dettagli = $.extend(new MovimentoDettagli(), res.data);
        movimento_dettagli.Linking();
    }

    if(callback){
        callback(success, movimento_dettagli);
    }
  }).fail(function(xhr, status, error) {
    DefaultErrorHandler(xhr, status, error);
  });

}

function MovimentoPeriodo(Id, Inizio, Fine, IdRamoMovimento, IdMovimentoIntestatario){
    this.Id = Id;
    this.Inizio = Inizio;
    this.Fine = Fine;
    this.IdRamoMovimento = IdRamoMovimento;
    this.IdMovimentoIntestatario = IdMovimentoIntestatario;
}

MovimentoPeriodo.prototype.IsEmptyObject = function(){
  var bool = false;

  if((!this.Inizio || this.Inizio === "" ) && (!this.Fine || this.Fine === "")){
    bool = true;
  }

  return bool;
}

function MovimentoDescrizione(Id, Descrizione, IdRamoMovimento, IdMovimentoIntestatario){
    this.Id = Id;
    this.Descrizione = Descrizione;
    this.IdRamoMovimento = IdRamoMovimento;
    this.IdMovimentoIntestatario = IdMovimentoIntestatario;
}

MovimentoDescrizione.prototype.IsEmptyObject = function(){
  var bool = false;

  if(!this.Descrizione || this.Descrizione === ""){
    bool = true;
  }

  return bool;
}

function MovimentoImporto(Id, Importo, IdRamoMovimento, IdMovimentoIntestatario){
    this.Id = Id;
    this.Importo = Importo;
    this.IdRamoMovimento = IdRamoMovimento;
    this.IdMovimentoIntestatario = IdMovimentoIntestatario;
}

MovimentoImporto.prototype.ifHasImporto = function(){
  var bool = false;

  if(this.Importo && parseFloat(this.Importo) > 0){
    bool = true;
  }

  return bool;
};

MovimentoDescrizione.prototype.setImporto = function(importo){
  if (importo) {
    this.Importo = importo;
  }
}

function RamoMovimento_DocumentoFiscale(IdRamoMovimento, IdMovimentoIntestatario, IdDocumentoFiscale, TipoDocumentoFiscale, $DocumentoFiscale){
    this.IdRamoMovimento = IdRamoMovimento;
    this.IdMovimentoIntestatario = IdMovimentoIntestatario;
    this.IdDocumentoFiscale = IdDocumentoFiscale;
    this.TipoDocumentoFiscale = TipoDocumentoFiscale;
    this.DocumentoFiscale = $DocumentoFiscale;
}

RamoMovimento_DocumentoFiscale.prototype.Linking = function (){
    if(this.DocumentoFiscale){
        this.DocumentoFiscale = $.extend(new DocumentoFiscale(), this.DocumentoFiscale);
        this.DocumentoFiscale.Linking();
    }
};
RamoMovimento_DocumentoFiscale.prototype.IsEmptyObject = function(){
  var bool = false;

  if(!this.IdDocumentoFiscale || parseInt(this.IdDocumentoFiscale) <= 0 || !this.TipoDocumentoFiscale || parseInt(this.TipoDocumentoFiscale) <= 0){
    bool = true;
  }

  return bool;
}
/**
 * [compareWith description]
 * @param  {[DocumentoFiscale]} el [description]
 * @return {[Boolean]}    [description]
 */
RamoMovimento_DocumentoFiscale.prototype.compareWith = function(el){
  var bool = false;
  if(el && el.Id && el.Type){
    if(parseInt(this.IdDocumentoFiscale) === parseInt(el.Id) && parseInt(this.TipoDocumentoFiscale) === parseInt(el.Type)){
      bool = true;
    }
  }

  return bool;
};
RamoMovimento_DocumentoFiscale.prototype.getDocumentoFiscale = function(){
  var doc = null;

  if(this.DocumentoFiscale){
    doc = this.DocumentoFiscale;
  }

  return doc;
};
RamoMovimento_DocumentoFiscale.prototype.setIdDocumentoFiscale = function(val){
  this.IdDocumentoFiscale = val;
};
RamoMovimento_DocumentoFiscale.prototype.setTipoDocumentoFiscale = function(val){
  this.TipoDocumentoFiscale = val;
};
RamoMovimento_DocumentoFiscale.prototype.reset = function (){
    this.IdDocumentoFiscale = 0;
    this.TipoDocumentoFiscale = 0;
};
RamoMovimento_DocumentoFiscale.prototype.isNewDoc = function(){
  var bool = false;

  if(!this.IdRamoMovimento || (this.IdRamoMovimento && parseInt(this.IdRamoMovimento) <= 0)){
    bool = true;
  }

  return bool;
}

function Movimento_Intestatario(Id, IdMovimento, IdIntestatario, TipoIntestatario, $MovimentoDettagli, $Intestatario, $RamoMovimento){
    this.Id = Id;
    this.IdMovimento = IdMovimento;
    this.IdIntestatario = IdIntestatario;
    this.TipoIntestatario = TipoIntestatario;
    this.MovimentoDettagli = $MovimentoDettagli;// Object of MovimentoDettagli
    this.Intestatario = $Intestatario;// Object of Intestatario
    this.RamoMovimento = $RamoMovimento;// Array di RamoMovimento
}

Movimento_Intestatario.prototype.Linking = function (){
    if(this.Intestatario){
        this.Intestatario = $.extend(new Intestatario(), this.Intestatario);
        this.Intestatario.Linking();
    }

    if(this.MovimentoDettagli){
        this.MovimentoDettagli = $.extend(new MovimentoDettagli(), this.MovimentoDettagli);
        this.MovimentoDettagli.Linking();
    }

    if(this.RamoMovimento && this.RamoMovimento.length > 0){
        var ramo = this.RamoMovimento;
        each(ramo, function (key, value, index){
            ramo[key] = $.extend(new RamoMovimento(), ramo[key]);
            ramo[key].Linking();
        });
    }
};

Movimento_Intestatario.prototype.LoadRelationship = function (callback){
    var self = this;
    var clone = encodeURIComponent(JSON.stringify(self));

    $.ajax({
        method: "POST",
        url: ACTIONS + 'movimento.php?action=loadSpecs',
        data: { data : clone },
    }).done(function(res){
      if(res && res.Data){
          res = $.extend(self, res.Data);
          res.Linking();
      }

      if(callback){
          callback();
      }
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });
};

Movimento_Intestatario.prototype.canAddMoreDocs = function(){
  var bool = false;
  if(this.RamoMovimento && this.RamoMovimento.length === 1 && this.RamoMovimento[0].ifHasImporto()){
    bool = true;
  }else if (this.RamoMovimento.length > 1) {
    bool = true;
  }
  return bool;
};

Movimento_Intestatario.prototype.RemoveRamiVuoti = function(){
  var emptyObjs = new Array();
  if(this.RamoMovimento && this.RamoMovimento.length > 0){
    for (var i = 0; i < this.RamoMovimento.length; i++) {
      if(this.RamoMovimento[i].IsEmptyObject()){
        emptyObjs.push(i);
      }
    }
  }

  for (var x = 0; x < emptyObjs.length; x++) {
    this.RamoMovimento.splice(this.RamoMovimento[x], 1);
  }

};

Movimento_Intestatario.prototype.compareWith = function(el){
  var bool = false;
  if(el && el.IdIntestatario && el.TipoIntestatario){
    if(parseInt(this.IdIntestatario) === parseInt(el.IdIntestatario) && parseInt(this.TipoIntestatario) === parseInt(el.TipoIntestatario)){
      bool = true;
    }
  }

  return bool;
};

/* Funzione utilizzata per caricare i giustificativi selezionati nel 1 step */
Movimento_Intestatario.prototype.getDocumentiFiscali = function(){
  var docs = new Array();

  if(this.RamoMovimento && this.RamoMovimento.length > 0){
    for (var i = 0; i < this.RamoMovimento.length; i++) {
      var doc = this.RamoMovimento[i].getDocumentoFiscale();
      if (doc) {
        docs.push(doc);
      }
    }
  }

  return docs;
};

Movimento_Intestatario.prototype.countNewDocumentiFiscali = function(){
  var self = this;
  var counter = 0;
  var docs = self.RamoMovimento;

  if (docs) {
    for (var i = 0; i < docs.length; i++) {
      if (!docs[i].RamoMovimento_DocumentoFiscale.IdRamoMovimento || parseInt(docs[i].RamoMovimento_DocumentoFiscale.IdRamoMovimento) <= 0) {
        counter++;
      }
    }
  }

  return counter;
};

Movimento_Intestatario.prototype.countSavedDocumentiFiscali = function(){
  var self = this;
  var counter = 0;
  var docs = self.RamoMovimento;

  if (docs) {
    for (var i = 0; i < docs.length; i++) {
      if (docs[i].RamoMovimento_DocumentoFiscale.IdRamoMovimento && parseInt(docs[i].RamoMovimento_DocumentoFiscale.IdRamoMovimento) > 0){
        counter++;
      }
    }
  }

  return counter;
};

Movimento_Intestatario.prototype.countDocumentiFiscali = function(){
  var self = this;
  var docs = self.getDocumentiFiscali();
  var counter = docs.length;

  return counter;
};

Movimento_Intestatario.prototype.Delete = function(callback){
  var self = this;
  if (parseInt(self.Id) > 0) {
    var clone = encodeURIComponent(JSON.stringify(self));

    $.ajax({
        method: "POST",
        url: ACTIONS + 'movimento_intestatario.php?action=remove',
        data: { data : clone },
    }).done(function(res){
      if(res){
        if(callback){
            callback(res.Success);
        }
      }else {
        if(callback){
            callback(false);
        }
      }
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });
  }
};

function Admin(Id, Username, Amministratore, Email, Roles, Level){
    this.Id = Id;
    this.Username = Username;
    this.Amministratore = Amministratore;
    this.Email = Email;
    this.Roles = Roles;
    this.Level = Level;
}

Admin.prototype.Load = function (callback){
    var self = this;
    var clone = encodeURIComponent(JSON.stringify(self));

    $.ajax({
        method: "POST",
        url: ACTIONS + 'admin.php?action=load'
    }).done(function(res){
      if(res){
          res = $.extend(self, res);
      }

      if(callback){
          callback();
      }
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });
};
Admin.prototype.isAdministrator = function (){
    var bool = false;
    if(parseInt(this.Amministratore) > 0){
        bool = true;
    }

    return bool;
};

Admin.prototype.checkRole = function(IdRole){
    var bool = false;
    var roles = this.Roles;
    if(roles && roles.length > 0){
      for (var i = 0; i < roles.length; i++) {
        var role = roles[i];
        if(parseInt(role) === IdRole){
          bool = true;
        }
      }
    }

    return bool;
}

Admin.prototype.isDV = function (){
  var bool = this.checkRole(11);

  return bool;
};

Admin.prototype.isContabile = function (){
    var bool = this.checkRole(1);

    return bool;
};
Admin.prototype.isCommercialista = function (){
  var bool = this.checkRole(2);

  return bool;
};
Admin.prototype.isDataEntry = function (){
  var bool = this.checkRole(3);

  return bool;
};

Admin.prototype.canReadItt = function(){
  var bool = this.checkRole(4);

  return bool;
}

Admin.prototype.recuperoCrediti = function(){
  var bool = this.checkRole(5);

  return bool;
}

Admin.prototype.isAgente = function (){
  var bool = this.checkRole(6);

  return bool;
};

Admin.prototype.canReadInvoices = function(){
  var bool = this.checkRole(7);

  return bool;
}

Admin.prototype.isPropertiesAdministrator = function(){
  var bool = this.checkRole(8);

  return bool;
}

Admin.prototype.isFornitore = function () {
  var bool = this.checkRole(9);

  return bool;
}

Admin.prototype.canAccessTicket = function () {
  var bool = this.checkRole(10);

  return bool;
}

function Attachment(File, Title){
  this.File = File;
  this.Title = Title;
}

Attachment.prototype.getBtoa = function(){
  var file = null;
  if (this.File) {
    file = btoa(this.File);
  }
  return file;
}

/**
 * [Mail description]
 * @param {[type]} Subject    [description]
 * @param {[type]} Content    [description]
 * @param {[type]} To         [description]
 * @param {[Object]} From       [description]
 * @param {[Attachment]} Attachment [description]
 * @param {[Object]} ReplyTo    [description]
 */
function Mail(Subject, Content, To, From, CC, BCC, Attachment, ReplyTo){
  this.Subject = Subject;
  this.Content = Content;
  this.To = To;
  this.From = From;
  this.CC = CC;
  this.BCC = BCC;
  this.Attachment = Attachment;
  this.ReplyTo = ReplyTo;
}

Mail.prototype.init = function(){
  this.To = new Array();
  this.CC = new Array();
  this.BCC = new Array();
}

Mail.prototype.Send = function(callback){
  var self = this;
  var clone_attachment = null;
  if (self.Attachment) {
    attachment = { File : self.Attachment.getBtoa(), Title : self.Attachment.Title};
    clone_attachment = encodeURIComponent(JSON.stringify(attachment));
    self.Attachment = null;
  }
  var clone = encodeURIComponent(JSON.stringify(self));
  $.ajax({
      method: "POST",
      url: ACTIONS + 'mail.php?action=send',
      data: { data : clone, pdf : clone_attachment },
  }).done(function(data){
    if (data) {
      //console.log(data);
      if(callback){
        callback(data);
      }
    }else{
      if(callback){
        callback(false);
      }
    }
  }).fail(function(xhr, status, error) {
    DefaultErrorHandler(xhr, status, error);
  });
}

Mail.prototype.setReport = function(message, subject){
  if (!this.Subject) {
    if (subject) {
      this.Subject = subject;
    }else{
      this.Subject = "MS #report"
    }
  }
  if (!this.To || this.To.length === 0) {
    var mail = { Mail : "ricardo.chavez@milanostanze.it"};
    this.To = new Array();
    this.To.push(mail);
  }
  if(!this.Content && message){
    this.Content = message;
  }
  if(!this.From){
    var from = {
      Mail : "services@milanostanze.it",
      Name : "Admin Notifications"
    }
    this.From = from;
  }
}

Mail.prototype.setServices = function () {
  try {
    this.From = {
      Mail : "services@milanostanze.it",
      Name : "MilanoStanze.it"
    };
  } catch (e) {
    console.error(e.message);
  }
}

Mail.prototype.setNoReplyBookings = function () {
  try {
    this.From = {
      Mail : "noreply-bookings@milanostanze.it",
      Name : "MilanoStanze.it | Bookings"
    };
  } catch (e) {
    console.error(e.message);
  }
}

Mail.prototype.setNoReplyCustomers = function () {
  try {
    this.From = {
      Mail : "noreply-customers@milanostanze.it",
      Name : "MilanoStanze.it"
    };
  } catch (e) {
    console.error(e.message);
  }
}

Mail.prototype.setNoReplyNewsletter = function () {
  try {
    this.From = {
      Mail : "noreply-newsletter@milanostanze.it",
      Name : "MilanoStanze.it"
    };
  } catch (e) {
    console.error(e.message);
  }
}

function PDF(background, header, content, footer, styles, pageSize, pageMargins, info){
  this.background = background;
  this.header = header;
  this.content = content;
  this.footer = footer;
  this.styles = styles;
  this.pageSize = pageSize;
  this.pageMargins = pageMargins;
  this.info = info;
}
PDF.prototype.Download = function(title){
  if(pdfMake){
    pdfMake.createPdf(this).download(title);
  }else{
    console.log("pdfMake is undefined");
  }
};
PDF.prototype.Open = function(){
  if(pdfMake){
    pdfMake.createPdf(this).open();
  }else{
    console.log("pdfMake is undefined");
  }
};
PDF.prototype.Print = function(){
  if(pdfMake){
    pdfMake.createPdf(this).print();
  }else{
    console.log("pdfMake is undefined");
  }
};
PDF.prototype.getBase64 = function(callback){
  if(pdfMake){
    pdfMake.createPdf(this).getBase64(function(base64) {
      if (callback) {
        callback(base64);
      }
    });
  }else{
    console.log("pdfMake is undefined");
  }
};

function Periodo(Inizio, Fine){
  this.Inizio = Inizio;
  this.Fine = Fine;
}

Periodo.prototype.setInizio = function (val){
    this.Inizio = val;
};
Periodo.prototype.setFine = function (val){
    this.Fine = val;
};

function EmailLogs(Id , IdDocumentoFiscale , TipoDocumentoFiscale , IdIntestatario , TipoIntestatario , IdAdmin , DataRegistrazione){
 this.Id  =  Id;
 this.IdDocumentoFiscale  =  IdDocumentoFiscale;
 this.TipoDocumentoFiscale  =  TipoDocumentoFiscale;
 this.IdIntestatario  =  IdIntestatario;
 this.TipoIntestatario  =  TipoIntestatario;
 this.IdAdmin  =  IdAdmin;
 this.DataRegistrazione  =  DataRegistrazione;
}

EmailLogs.prototype.Load = function(callback){
  var self = this;

  try {
    if(!this.Id || parseInt(this.Id) === 0)
      throw new TypeError('EmailLogs - Load : Id undefined');
    var clone = encodeURIComponent(JSON.stringify(this));
    $.ajax({
        method: "POST",
        url: ACTIONS + 'emailLogs.php?action=load',
        data: { data : clone },
    }).done(function(data){
      if (data && data.data) {
        var res = data.data;
        res = $.extend(self, res);
        //res.Linking();
        if (callback) {
          callback();
        }
      }
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });
  } catch (e) {
    console.log(e.message);
    callback(e);
  }
}

EmailLogs.prototype.Search = function(Filters, callback){
  var self = this;

  try {
    if(!Filters)
      throw new TypeError('EmailLogs - Search : Filters undefined');
    var clone = encodeURIComponent(JSON.stringify(Filters));
    $.ajax({
        method: "POST",
        url: ACTIONS + 'emailLogs.php?action=search',
        data: { data : clone },
    }).done(function(data){
      if (data && data.data) {
        var res = data.data;
        if (callback) {
          callback(res);
        }
      }
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });
  } catch (e) {
    console.log(e.message);
    callback(e);
  }
}

function Servizio(Id, IdRegistroTicket, IdServizioImporto, IdServizioData, IdServizioNumero, IdServizioPeriodo, IdServizioDescrizione, IdAppartamento, IdAppartamentiStanze, IdInquilinoStanze, IdFornitore, DataRegistrazione, ServizioImporto, ServizioData, ServizioNumero, ServizioPeriodo, ServizioDescrizione, ServizioAppartamento, ServizioStanza, ServizioIns, ServizioFornitore, Servizio_TagServizio, Servizio){
  this.Id = Id;
  this.IdRegistroTicket = IdRegistroTicket;
  this.IdServizioImporto = IdServizioImporto;
  this.IdServizioData = IdServizioData;
  this.IdServizioNumero = IdServizioNumero;
  this.IdServizioPeriodo = IdServizioPeriodo;
  this.IdServizioDescrizione = IdServizioDescrizione;
  this.IdAppartamento = IdAppartamento;
  this.IdAppartamentiStanze = IdAppartamentiStanze;
  this.IdInquilinoStanze = IdInquilinoStanze;
  this.IdFornitore = IdFornitore;
  this.DataRegistrazione = DataRegistrazione;
  this.ServizioImporto = ServizioImporto;
  this.ServizioData = ServizioData;
  this.ServizioNumero = ServizioNumero;
  this.ServizioPeriodo = ServizioPeriodo;
  this.ServizioDescrizione = ServizioDescrizione;
  this.ServizioAppartamento = ServizioAppartamento;
  this.ServizioStanza = ServizioStanza;
  this.ServizioIns = ServizioIns;
  this.ServizioFornitore = ServizioFornitore;
  this.Servizio_TagServizio = Servizio_TagServizio;
  this.Servizio = Servizio;
}

Servizio.prototype.Linking = function(){
  if(this.ServizioImporto){
    this.ServizioImporto = $.extend(new ServizioImporto(), this.ServizioImporto);
  }

  if(this.ServizioData){
    this.ServizioData = $.extend(new ServizioData(), this.ServizioData);
  }

  if(this.ServizioNumero){
    this.ServizioNumero = $.extend(new ServizioNumero(), this.ServizioNumero);
  }

  if(this.ServizioPeriodo){
    this.ServizioPeriodo = $.extend(new ServizioPeriodo(), this.ServizioPeriodo);
  }

  if(this.ServizioDescrizione){
    this.ServizioDescrizione = $.extend(new ServizioDescrizione(), this.ServizioDescrizione);
  }

  if(this.ServizioAppartamento){
    this.ServizioAppartamento = $.extend(new Appartamento(), this.ServizioAppartamento);
    //Linking
  }

  if(this.ServizioStanza){
    this.ServizioStanza = $.extend(new Appartamenti_Stanze(), this.ServizioStanza);
    this.ServizioStanza.Linking();
  }

  if(this.ServizioIns){
    this.ServizioIns = $.extend(new Inquilino_Stanza(), this.ServizioIns);
    this.ServizioIns.Linking();
  }

  if(this.ServizioFornitore){
    this.ServizioFornitore = $.extend(new Fornitore(), this.ServizioFornitore);
  }

  if(this.Servizio_TagServizio){
    this.Servizio_TagServizio = $.extend(new Servizio_TagServizio(), this.Servizio_TagServizio);
    this.Servizio_TagServizio.Linking();
  }

  if(this.Servizio){
    var servizi = this.Servizio;
    each(servizi, function (key, registro, index){
        servizi[key] = $.extend(new Servizio(), servizi[key]);
        servizi[key].Linking();
    });
  }
}

Servizio.prototype.SearchAptStz = function(termine, callback){
  var self = this;

  if (!termine) {
    termine = "";
  }

  var data = { Termine : termine };
  var clone = encodeURIComponent(JSON.stringify(data));

  $.ajax({
      method: "POST",
      url: ACTIONS + 'servizio.php?action=searchAptStz',
      data: { data : clone },
  }).done(function(res){
    var searchResults = null;
    if(res){
        searchResults = res.Data;
        if(searchResults && searchResults.Appartamento && searchResults.AppartamentoStanza){
          var apt = new Appartamento();
          searchResults.Appartamento = $.extend(apt, searchResults.Appartamento);
          searchResults.Appartamento.Linking();

          var aptStz = new Appartamenti_Stanze();
          searchResults.AppartamentoStanza = $.extend(aptStz, searchResults.AppartamentoStanza);
          searchResults.AppartamentoStanza.Linking();
        }
    }

    if(callback){
        callback(searchResults);
    }
  }).fail(function(xhr, status, error) {
    DefaultErrorHandler(xhr, status, error);
  });
}

Servizio.prototype.MultiSave = function(callback){
  try {
    var self = this;

    var data = { Servizio : self };
    var clone = encodeURIComponent(JSON.stringify(data));

    $.ajax({
        method: "POST",
        url: ACTIONS + 'servizio.php?action=multiSave',
        data: { data : clone },
    }).done(function(res){
      res = $.extend(self, res.Data);
      res.Linking();
      if(callback){
          callback();
      }
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });
  } catch (e) {
    console.log(e.message);
  }
}

Servizio.prototype.setValuesFromQuickAdd = function(element){
  try {
    var self = this;

    if(!element)
      throw new TypeError("Servizio - setValuesFromQuickAdd : element undefined");

    if(element.Importo){
      this.ServizioImporto = new ServizioImporto();
      this.ServizioImporto.Importo = element.Importo;
    }

    if(element.Data && element.Data !== ""){
      this.ServizioData = new ServizioData();
      var value = toDateValue(element.Data);
      this.ServizioData.Data = value.yyyymmdd();
    }

    if(element.Numero){
      this.ServizioNumero = new ServizioNumero();
      this.servizioNumero.Numero = element.Numero;
    }

    if(element.Inizio || element.Fine){
      this.ServizioPeriodo = new ServizioPeriodo();
      if(element.Inizio && element.Inizio !== ""){
        var value = toDateValue(element.Inizio);
        this.ServizioPeriodo.Inizio = value.yyyymmdd();
      }
      if(element.Fine && element.Fine !== ""){
        var value = toDateValue(element.Fine);
        this.ServizioPeriodo.Fine = value.yyyymmdd();
      }
    }

    if(element.Descrizione){
      this.ServizioDescrizione = new ServizioDescrizione();
      this.ServizioDescrizione.Descrizione = element.Descrizione;
    }

  } catch (e) {
    console.log(e.message);
  }
}

function ServizioImporto(Id, Importo, DataRegistrazione, DataAggiornamento){
  this.Id = Id;
  this.Importo = Importo;
  this.DataRegistrazione = DataRegistrazione;
  this.DataAggiornamento = DataAggiornamento;
}

function ServizioData(Id, Data, DataRegistrazione, DataAggiornamento){
  this.Id = Id;
  this.Data = Data;
  this.DataRegistrazione = DataRegistrazione;
  this.DataAggiornamento = DataAggiornamento;
}

ServizioData.prototype.getMatrix = function(){
  var date = new Date(this.Data);

  return date.ddmmyyyy();
}

function ServizioNumero(Id, Numero, DataRegistrazione, DataAggiornamento){
  this.Id = Id;
  this.Numero = Numero;
  this.DataRegistrazione = DataRegistrazione;
  this.DataAggiornamento = DataAggiornamento;
}

function ServizioPeriodo(Id, Inizio, Fine, DataRegistrazione, DataAggiornamento){
  this.Id = Id;
  this.Inizio = Inizio;
  this.Fine = Fine;
  this.DataRegistrazione = DataRegistrazione;
  this.DataAggiornamento = DataAggiornamento;
}

ServizioPeriodo.prototype.getMatrix = function(){
  var period = {
    inizio : null,
    fine : null
  };

  if(this.Inizio){
    var inizio = new Date(this.Inizio);
    period.inizio = inizio.ddmmyyyy();
  }

  if(this.Fine){
    var fine = new Date(this.Fine);
    period.fine = fine.ddmmyyyy();
  }

  return period;
}

ServizioPeriodo.prototype.hasValue = function(){
  var bool = false;

  if(this.Inizio && this.Inizio !== ""){
    bool = true;
  }

  if(this.Fine && this.Fine !== ""){
    bool = true;
  }

  return bool;
}

function ServizioDescrizione(Id, Descrizione, DataRegistrazione, DataAggiornamento){
  this.Id = Id;
  this.Descrizione = Descrizione;
  this.DataRegistrazione = DataRegistrazione;
  this.DataAggiornamento = DataAggiornamento;
}

function Servizio_DocumentiFornitori(IdServizio, IdDocumentoFiscale, TipoDocumentoFiscale, Servizio, DocumentoFiscale){
  this.IdServizio = IdServizio;
  this.IdDocumentoFiscale = IdDocumentoFiscale;
  this.TipoDocumentoFiscale = TipoDocumentoFiscale;
  this.Servizio = Servizio;//Array
  this.DocumentoFiscale = DocumentoFiscale;
}

Servizio_DocumentiFornitori.prototype.MultiSave = function(servizio, docFornitore, callback){
  try {
    var self = this;

    if(!servizio)
      throw new TypeError('Servizio_DocumentiFornitori - MultiSave : servizio undefined');

    if(!docFornitore)
      throw new TypeError('Servizio_DocumentiFornitori - MultiSave : docFornitore undefined');

    var data = { Servizio : servizio, DocumentoFornitore : docFornitore };

    var clone = encodeURIComponent(JSON.stringify(data));

    $.ajax({
        method: "POST",
        url: ACTIONS + 'servizio.php?action=saveServizioDocumentoFornitore',
        data: { data : clone },
    }).done(function(res){

      if(callback){
          callback(res);
      }
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });
  } catch (e) {
    console.log(e.message);
  }
}

/*#### BOOKING LIB ####*/

function Booking_Details(Id, IdStanza, IdPersonalInfo, IdLease, IdAdmin, IdInquilinoStanza, Turistico, DataInizio, DataFine, Caparra, Canone, Spese, Cauzione, OneOffDiscountRent, ImportoNonContabilizzato, SpecificaImportoNonContabilizzato, MonthlyDiscountAmount, MonthlyDiscountExpiration, StatoBooking, Scadenza, Note, DataRegistrazione, DataAggiornamento, PersonalInfo, Intestazione, Booking_Details, Inquilino_Stanza){
  this.Id  = Id;
  this.IdStanza  = IdStanza;
  this.IdPersonalInfo  = IdPersonalInfo;
  this.IdLease = IdLease;
  this.IdAdmin = IdAdmin;
  this.IdInquilinoStanza = IdInquilinoStanza;
  this.Turistico  = Turistico;
  this.DataInizio  = DataInizio;
  this.DataFine  = DataFine;
  this.Caparra  = Caparra;
  this.Canone  = Canone;
  this.Spese  = Spese;
  this.Cauzione  = Cauzione;
  this.OneOffDiscountRent = OneOffDiscountRent;
  this.ImportoNonContabilizzato  = ImportoNonContabilizzato;
  this.SpecificaImportoNonContabilizzato  = SpecificaImportoNonContabilizzato;
  this.MonthlyDiscountAmount = MonthlyDiscountAmount;
  this.MonthlyDiscountExpiration = MonthlyDiscountExpiration;
  this.StatoBooking  = StatoBooking;
  this.Scadenza  = Scadenza;
  this.Note  = Note;
  this.DataRegistrazione = DataRegistrazione;
  this.DataAggiornamento = DataAggiornamento;
  this.PersonalInfo = PersonalInfo;
  this.Intestazione = Intestazione;
  this.Booking_Details = Booking_Details;
  this.Inquilino_Stanza = Inquilino_Stanza;
}

Booking_Details.prototype.SaveRelationship = function(callback){
  try {
    var self = this;
    var success = false;
    var booking = null;

    if(!callback)
      throw new TypeError('Booking_Details - SaveRelationship : callback undefined');

    var clone = encodeURIComponent(JSON.stringify(self));

    $.ajax({
        method: "POST",
        url: ACTIONS + 'bookingDetails.php?action=saveRelationship',
        data: { data : clone },
    }).done(function(res){
      if(res && res.success && res.Data){
          success = true;
          booking = $.extend(self, res.Data);
          booking.Linking();
      }

      callback(success);
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });

  } catch (e) {
    console.log(e.message);
  }
}

Booking_Details.prototype.SendContract = function(callback){
  try {
    var self = this;
    var success = false;

    if(!callback)
      throw new TypeError('Booking_Details - SendContract : callback undefined.');

    var clone = encodeURIComponent(JSON.stringify(self));

    $.ajax({
        method: "POST",
        url: ACTIONS + 'bookingDetails.php?action=sendContract',
        data: { data : clone },
    }).done(function(res){

      if(res && res.success){
        success = true;
      }

      callback(success);
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });

  } catch (e) {
    console.log(e.message);
  }
}

Booking_Details.prototype.ContractPreview = function(callback){
  try {
    var self = this;
    var pdfString = null;
    var success = false;

    if(!callback)
      throw new TypeError('Booking_Details - ContractPreview : callback undefined.');

    var clone = encodeURIComponent(JSON.stringify(self));

    $.ajax({
        method: "POST",
        url: ACTIONS + 'bookingDetails.php?action=contractPreview',
        data: { data : clone },
    }).done(function(res){

      if(res && res.pdf && res.pdf.length > 0 && res.email && res.success){
        success = true;
        pdfString = res.pdf;
        emailString = res.email;

        for (var i = 0; i < pdfString.length; i++) {
          var wnd = window.open();
          $(wnd.document.body).html(pdfString[i]);
        }

        var wndEmail = window.open();
        $(wndEmail.document.body).html(emailString);

      }

      callback(success);
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });

  } catch (e) {
    console.log(e.message);
  }
}

Booking_Details.prototype.doppioTuristico = function(){
  try {
    var self = this;
    var res = false;
    var dates = this.getDateMatrix();

    if(dates.moveOut){
      var plusMoveOut = dates.moveOut;
      plusMoveOut.setDate(plusMoveOut.getDate() + 1);
      var days = dateDiff_countDays(dates.moveIn, plusMoveOut);

      if(days && days > 30 && days <= 60 && (parseInt(this.IdLease) === 3 || parseInt(this.IdLease) === 22 || parseInt(this.IdLease) === 29)){
          res = true;
      }
    }

    return res;
  } catch (e) {
      console.log(e.message);
  }
}

Booking_Details.prototype.getContractType_txt = function(){
  try {
    var self = this;
    var contractType = "Errore.";

    switch (parseInt(this.IdLease)) {
      case 1:
      case 10:
      case 17:
      case 24:
      case 32:
        contractType = "Contratto di lungo periodo";
        break;
      case 2:
      case 20:
      case 27:
        contractType = "Contratto di breve periodo";
        break;
      case 3:
      case 22:
      case 29:
        if(this.doppioTuristico()){
          contractType = "2 Contratti Turistici";
        }else{
          contractType = "Contratto Turistico";
        }
        break;
      case 34:
        contractType = "Contratto 4+4 (variabile)";
        break;
    }

    return contractType;
  } catch (e) {
    console.log(e.message);
  }
}

Booking_Details.prototype.setDeclined = function(callback){
  try {
    var self = this;
    var success = false;

    if(!callback)
      throw new TypeError('Booking_Details - setDeclined : callback undefined');

    var clone = encodeURIComponent(JSON.stringify(self));

    $.ajax({
        method: "POST",
        url: ACTIONS + 'bookingDetails.php?action=setDeclined',
        data: { data : clone },
    }).done(function(res){

      if(res && res.success){
        success = true;
      }

      callback(success);
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });

  } catch (e) {
    console.log(e.message);
  }
}

Booking_Details.prototype.setCancelled = function(callback){
  try {
    var self = this;
    var success = false;

    if(!callback)
      throw new TypeError('Booking_Details - setCancelled : callback undefined');

    var clone = encodeURIComponent(JSON.stringify(self));

    $.ajax({
        method: "POST",
        url: ACTIONS + 'bookingDetails.php?action=setCancelled',
        data: { data : clone },
    }).done(function(res){

      if(res && res.success){
        success = true;
      }

      callback(success);
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });

  } catch (e) {
    console.log(e.message);
  }
}

Booking_Details.prototype.setConfirmed = function(callback){
  try {
    var self = this;
    var success = false;

    if(!callback)
      throw new TypeError('Booking_Details - setConfirmed : callback undefined');

    var clone = encodeURIComponent(JSON.stringify(self));

    $.ajax({
        method: "POST",
        url: ACTIONS + 'bookingDetails.php?action=setConfirmed',
        data: { data : clone },
    }).done(function(res){

      if(res && res.success){
        success = true;
      }

      callback(success);
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });

  } catch (e) {
    console.log(e.message);
  }
}

Booking_Details.prototype.getDefaultContract = function(callback){
  try {
    var self = this;
    var type = 0;

    if(!callback)
      throw new TypeError('Booking_Details - getDefaultContract : callback undefined');

    var clone = encodeURIComponent(JSON.stringify(self));

    $.ajax({
        method: "POST",
        url: ACTIONS + 'bookingDetails.php?action=getDefaultContract',
        data: { data : clone },
    }).done(function(res){

      if(res && res.IdLease){
        type = res.IdLease;
      }

      callback(type);
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });

  } catch (e) {
    console.log(e.message);
  }
}

Booking_Details.prototype.getDiscountRent = function(callback){
  try {
    var self = this;
    var booking = null;

    if(!callback)
      throw new TypeError('Booking_Details - getDiscountRent : callback undefined');

    var clone = encodeURIComponent(JSON.stringify(self));

    $.ajax({
        method: "POST",
        url: ACTIONS + 'bookingDetails.php?action=getDiscountRent',
        data: { data : clone },
    }).done(function(res){
      if(res && res.success && res.data){
        booking = $.extend(self, res.data);
        booking.Linking();
      }
      callback();
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });

  } catch (e) {
    console.log(e.message);
  }
}

Booking_Details.prototype.isConfirmed = function(){
  try {
    var self = this;
    var confirmed = false;

    if(this.StatoBooking && parseInt(this.StatoBooking) === 5){
      confirmed = true;
    }

    return confirmed;
  } catch (e) {
    console.log(e.message);
  }
}

Booking_Details.prototype.Linking = function(){
  if(this.PersonalInfo){
      this.PersonalInfo = $.extend(new Booking_PersonalInfo(), this.PersonalInfo);
  }

  if(this.Stanza){
    this.Stanza = $.extend(new Appartamenti_Stanze(), this.Stanza);
    this.Stanza.Linking();
  }

  if(this.Intestazione){
    this.Intestazione = $.extend(new BookingDetails_Intestazione(), this.Intestazione);
  }

  if(this.Booking_Details && this.Booking_Details.length > 0){
    var bookings = this.Booking_Details;
    each(bookings, function(key, registro, index){
      bookings[key] = $.extend(new Booking_Details(), bookings[key]);
      bookings[key].Linking();
    });
  }
}

Booking_Details.prototype.loadActives = function (filtro, callback){
    var self = this;
    var data = { Booking : self, Filtro : filtro };
    var clone = encodeURIComponent(JSON.stringify(data));

    $.ajax({
        method: "POST",
        url: ACTIONS + 'bookingDetails.php?action=loadActives',
        data: { data : clone },
    }).done(function(res){
      if(res && res.Data && res.Data.length > 0){
        var bookings = res.Data;
        each(bookings, function (key, registro, index){
            bookings[key] = $.extend(new Booking_Details(), bookings[key]);
            bookings[key].Linking();
        });

        console.log(bookings);
      }

      if(callback){
          callback(res);
      }
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });
};

Booking_Details.prototype.loadConfirmed = function (filtro, callback){
    var self = this;
    var data = { Booking : self, Filtro : filtro };
    var clone = encodeURIComponent(JSON.stringify(data));

    $.ajax({
        method: "POST",
        url: ACTIONS + 'bookingDetails.php?action=loadConfirmed',
        data: { data : clone },
    }).done(function(res){
      if(res && res.Data && res.Data.length > 0){
        var bookings = res.Data;
        each(bookings, function (key, registro, index){
            bookings[key] = $.extend(new Booking_Details(), bookings[key]);
            bookings[key].Linking();
        });

        console.log(bookings);
      }

      if(callback){
          callback(res);
      }
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });
};

Booking_Details.prototype.loadExpired = function (filtro, callback){
    var self = this;
    var data = { Booking : self, Filtro : filtro };
    var clone = encodeURIComponent(JSON.stringify(data));

    $.ajax({
        method: "POST",
        url: ACTIONS + 'bookingDetails.php?action=loadExpired',
        data: { data : clone },
    }).done(function(res){
      if(res && res.Data && res.Data.length > 0){
        var bookings = res.Data;
        each(bookings, function (key, registro, index){
            bookings[key] = $.extend(new Booking_Details(), bookings[key]);
            bookings[key].Linking();
        });

        console.log(bookings);
      }

      if(callback){
          callback(res);
      }
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });
};

Booking_Details.prototype.loadDeclined = function (filtro, callback){
    var self = this;
    var data = { Booking : self, Filtro : filtro };
    var clone = encodeURIComponent(JSON.stringify(data));

    $.ajax({
        method: "POST",
        url: ACTIONS + 'bookingDetails.php?action=loadDeclined',
        data: { data : clone },
    }).done(function(res){
      if(res && res.Data && res.Data.length > 0){
        var bookings = res.Data;
        each(bookings, function (key, registro, index){
            bookings[key] = $.extend(new Booking_Details(), bookings[key]);
            bookings[key].Linking();
        });

        console.log(bookings);
      }

      if(callback){
          callback(res);
      }
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });
};

Booking_Details.prototype.loadCancelled = function (filtro, callback){
    var self = this;
    var data = { Booking : self, Filtro : filtro };
    var clone = encodeURIComponent(JSON.stringify(data));

    $.ajax({
        method: "POST",
        url: ACTIONS + 'bookingDetails.php?action=loadCancelled',
        data: { data : clone },
    }).done(function(res){
      if(res && res.Data && res.Data.length > 0){
        var bookings = res.Data;
        each(bookings, function (key, registro, index){
            bookings[key] = $.extend(new Booking_Details(), bookings[key]);
            bookings[key].Linking();
        });

        console.log(bookings);
      }

      if(callback){
          callback(res);
      }
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });
};

Booking_Details.prototype.getDateMatrix = function(){
  try {
    var self = this;
    var matrix = {
      moveIn : null,
      moveOut : null
    }

    if(this.DataInizio){
      var dataInizio = new Date(this.DataInizio);
      matrix.moveIn = dataInizio;
    }

    if(this.DataFine && this.DataFine !== ""){
      var dataFine = new Date(this.DataFine);
      matrix.moveOut = dataFine;
    }

    return matrix;

  } catch (e) {
    console.log(e.message);
  }
}

Booking_Details.prototype.getContractDurationText = function(){
  var res = "";

  var dates = this.getDateMatrix();

  if(!dates.moveOut){
    res = "Lungo Periodo";
  }else{
    var plusMoveOut = dates.moveOut;
    plusMoveOut.setDate(plusMoveOut.getDate() + 1);
    var bookingDuration = dateDiff(dates.moveIn, plusMoveOut);

    if(bookingDuration.years && bookingDuration.years > 0){
      var yearTxt = "";
      if(bookingDuration.years === 1){
        yearTxt = " anno";
      }else{
        yearTxt = " anni";
      }
      res += res === "" ? (bookingDuration.years + " " + yearTxt) : (" e " + bookingDuration.years + " " + yearTxt);
    }

    if(bookingDuration.months && bookingDuration.months > 0){
      var monthTxt = "";
      if(bookingDuration.months === 1){
        monthTxt = " mese";
      }else{
        monthTxt = " mesi";
      }
      res += res === "" ? (bookingDuration.months + " " + monthTxt) : (" e " + bookingDuration.months + " " + monthTxt);
    }

    if(bookingDuration.days && bookingDuration.days > 0){

      var dayTxt = "";
      if(bookingDuration.days === 1){
        dayTxt = " giorno";
      }else{
        dayTxt = " giorni";
      }

      res += res === "" ? (bookingDuration.days + " " + dayTxt) : (" e " + bookingDuration.days + " " + dayTxt);
    }
  }

  return res;
}

Booking_Details.prototype.getDeadline = function(){

  var today = new Date();
  var deadline = new Date(this.Scadenza);

  var t1 = today.getTime();
  var t2 = deadline.getTime();

  var countdown = { days:0, months:0, years:0 };

  countdown['days'] = parseInt((t2-t1)/(24*3600*1000));

  var diff =(t2 - t1) / 1000;
  diff /= (60 * 60);
  var hours = Math.abs(Math.round(diff));
  countdown['hours'] = hours;

  return countdown;
}

Booking_Details.prototype.getDeadlineText = function(){
  var res = "";

  var today = new Date();
  var deadline = new Date(this.Scadenza);

  var t1 = today.getTime();
  var t2 = deadline.getTime();

  var countdown = this.getDeadline();

  if(countdown['days'] >= 0){
    if(countdown['days'] <= 2){

      var hours = countdown['hours'];
      var hourTxt = "";

      if(hours === 1){
        hourTxt = " ora";
      }else{
        hourTxt = " ore";
      }

      res = "Scade tra " + hours + hourTxt;

    }else{
      var diffScadenza = dateDiff(today, deadline);

      if(diffScadenza.months && diffScadenza.months > 0){
        var monthTxt = "";
        if(diffScadenza.months === 1){
          monthTxt = " mese";
        }else{
          monthTxt = " mesi";
        }
        res += res === "" ? ("Scade tra " + diffScadenza.months + " " + monthTxt) : (" e " + diffScadenza.months + " " + monthTxt);
      }

      if(diffScadenza.days && diffScadenza.days > 0){

        var dayTxt = "";
        if(diffScadenza.days === 1){
          dayTxt = " giorno";
        }else{
          dayTxt = " giorni";
        }

        res += res === "" ? ("Scade tra " + diffScadenza.days + " " + dayTxt) : (" e " + diffScadenza.days + " " + dayTxt);
      }

    }
  }else{
    res = "Scaduto";
  }

  return res;
}

function Booking_PersonalInfo(Id, Cognome, Nome, Sesso, Lang, Fonte, Professione, Specializzazione, DataNascita, Ente, PrimaryEmail, SecondaryEmail, Telefono, Indirizzo, Civico, CAP, Citta, Stato, Paese, Paese_Sigla_ISO3166_2, LuogoNascitaText, LuogoNascita, CodiceFiscale, PartitaIva, IntestatarioConto, IBAN, SWIFT, DataRegistrazione, DataAggiornamento){
  this.Id  =  Id;
  this.Cognome  =  Cognome;
  this.Nome  =  Nome;
  this.Sesso  =  Sesso;
  this.Lang  =  Lang;
  this.Fonte  =  Fonte;
  this.Professione  =  Professione;
  this.Specializzazione  =  Specializzazione;
  this.DataNascita  =  DataNascita;
  this.Ente  =  Ente;
  this.PrimaryEmail  =  PrimaryEmail;
  this.SecondaryEmail = SecondaryEmail;
  this.Telefono  =  Telefono;
  this.Indirizzo  =  Indirizzo;
  this.Civico  =  Civico;
  this.CAP  =  CAP;
  this.Citta  =  Citta;
  this.Stato = Stato;
  this.Paese = Paese;
  this.Paese_Sigla_ISO3166_2 = Paese_Sigla_ISO3166_2;
  this.LuogoNascita  =  LuogoNascita;
  this.LuogoNascitaText = LuogoNascitaText;
  this.CodiceFiscale  =  CodiceFiscale;
  this.PartitaIva  =  PartitaIva;
  this.IntestatarioConto = IntestatarioConto;
  this.IBAN = IBAN;
  this.SWIFT = SWIFT;
  this.DataRegistrazione  =  DataRegistrazione;
  this.DataAggiornamento  =  DataAggiornamento;
}

Booking_PersonalInfo.prototype.setLuogoNascita = function(value){
  try {
    if(!value)
      throw new TypeError('Booking_PersonalInfo - setLuogoNascita : value undefined!');

    this.LuogoNascita = value;
  } catch (e) {
    console.log(e.message);
  }
}

Booking_PersonalInfo.prototype.getNominativo = function(){
  var nominativo = "";

  if(this.Nome && this.Nome !== ""){
    nominativo += (nominativo === "" ? this.Nome : " " + this.Nome);
  }

  if(this.Cognome && this.Cognome !== ""){
    nominativo += (nominativo === "" ? this.Cognome : " " + this.Cognome);
  }

  return nominativo;
};

function BookingDetails_Intestazione(Id ,  IdBookingDetails ,  Nome ,  Cognome ,  RagioneSociale ,  Telefono ,  Indirizzo ,  Civico ,  CAP ,  Citta ,  Stato ,  Paese ,  CodiceFiscale , ForeignIdentificationNumber,  PartitaIva, Paese_Sigla_ISO3166_2, CodiceDestinatario, PecDestinatario){
  this.Id = Id;
  this.IdBookingDetails = IdBookingDetails;
  this.Nome = Nome;
  this.Cognome = Cognome;
  this.RagioneSociale = RagioneSociale;
  this.Telefono = Telefono;
  this.Indirizzo = Indirizzo;
  this.Civico = Civico;
  this.CAP = CAP;
  this.Citta = Citta;
  this.Stato = Stato;
  this.Paese = Paese;
  this.CodiceFiscale = CodiceFiscale;
  this.ForeignIdentificationNumber = ForeignIdentificationNumber;
  this.PartitaIva = PartitaIva;
  this.Paese_Sigla_ISO3166_2 = Paese_Sigla_ISO3166_2;
  this.CodiceDestinatario = CodiceDestinatario;
  this.PecDestinatario = PecDestinatario;
}

/*
 * #### BEGIN : Situazione Economica ####
*/

function accountBalance(row_ui, floatingPanel){
  this.row_ui = row_ui;
  this.floatingPanel = floatingPanel;
}

accountBalance.prototype.init = function(){
  try {

    var self = this;

    if(!this.row_ui)
      throw new TypeError('accountBalance - init : row_ui undefined');

    if(!this.floatingPanel)
      throw new TypeError('accountBalance - init : floatingPanel undefined');

    var row_ui = this.row_ui;
    if(!row_ui.item || !(row_ui.item instanceof Inquilino_Stanza))
      throw new TypeError('accountBalance - init :  undefined');

    var ins = row_ui.item;
    this.loadStructure();
    this.loadElements();

  } catch (e) {
    console.log(e.message);
  }
}

accountBalance.prototype.setHeader = function(){
  try {
    var self = this;

    if(!this.floatingPanel)
      throw new TypeError("accountBalance - this.floatingPanel undefined");

    var floatingPanel = this.floatingPanel;
    var header = floatingPanel.rootHeader;
    var row_ui = this.row_ui;
    var ins = row_ui.item;

    var ins_nominativo = ins.Inquilino.getFormalNominativo();
    header.find('.tm-transaction-properties-header__title .tm-editable-textarea .tm-editable-textarea__content').html(ins_nominativo);

    var stanza_nominativo = $('<div><strong>Stanza :</strong> <span></span></div>');
    var stanza_nominativo__clone = stanza_nominativo.clone();
    stanza_nominativo__clone.find('span').html(ins.getRoomTitle());

    header.find('.description .description-meta.description-meta__top').html(stanza_nominativo__clone.html());


    var periodo_nominativo = $('<div><strong>Periodo di locazione : </strong><span></span></div>');
    var periodo_nominativo__clone = periodo_nominativo.clone();
    var periodo_matrix = ins.getDateMatrix();
    var periodo_text = periodo_matrix.moveIn.ddmmyyyy();
    periodo_text = periodo_matrix.moveOut ? (periodo_text + ' - ' + periodo_matrix.moveOut.ddmmyyyy()) : (periodo_text + ' - senza disdetta');
    periodo_nominativo__clone.find('span').html(periodo_text);

    header.find('.description .description-meta.description-meta__bottom').html(periodo_nominativo__clone.html());

  } catch (e) {
    console.log(e.message);
  }
}

accountBalance.prototype.loadElements = function(){
  try {
    var self = this;
    var row_ui = this.row_ui;
    var ins = row_ui.item;

    if(!this.floatingPanel.root)
      throw new TypeError('accountBalance - loadStructure : this.floatingPanel.root undefined');

    var scrollbar = this.floatingPanel.root.find('.tm-property-tabs__content .tm-transaction-properties-pane.tm-hack-scrollbar');

    var row_struct = $('<div style="display: flex;flex-direction: row;flex-wrap: wrap;justify-content: center;align-items: stretch;align-content: center;background-color: #ffffff;padding: 10px;margin-bottom: 10px;"><div style=" display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-around; align-items: stretch; align-content: center; flex-grow: 0; flex-shrink: 0; flex-basis: 100%; "><div style=" display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-around; align-items: stretch; align-content: stretch; flex-grow: 0; flex-shrink: 0; flex-basis: 48%;"><div style="font-family: sans-serif;font-size: 15px;color: #8f939c;border-bottom: 2px solid #8f939c;margin-bottom: 10px;width: 100%;"><strong>Fattura</strong></div></div><div style=" display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-around; align-items: stretch; align-content: stretch; flex-grow: 0; flex-shrink: 0; flex-basis: 48%;"><div style="font-family: sans-serif;font-size: 15px;color: #8f939c;border-bottom: 2px solid #8f939c;margin-bottom: 10px;width: 100%;"><strong>Bonifici</strong></div></div></div><div style=" display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-around; align-items: stretch; align-content: center; flex-grow: 0; flex-shrink: 0; flex-basis: 100%; "><div class="invoice-section" style="display: flex;flex-direction: column;flex-wrap: wrap;align-items: flex-start;align-content: center;flex-grow: 0;flex-shrink: 0;flex-basis: 48%;"><div style=" display: flex; flex-direction: row; flex-wrap: wrap; justify-content: flex-start; align-items: center; align-content: center;"><div class="infoFattura" style="color: #8f939c !important; font-size: 13px !important;"><span></span></div><div class="infoTotFt" style=" color: #8f939c !important; font-size: 13px !important;"><span></span></div></div></div><div class="transactions-section" style=" display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-around; align-items: stretch; align-content: stretch; flex-grow: 0; flex-shrink: 0; flex-basis: 48%;"></div></div><div class="diff-section" style=" display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-around; align-items: stretch; align-content: stretch; flex-grow: 0; flex-shrink: 0; flex-basis: 48%;"><div style="font-family: sans-serif;font-size: 15px;color: #8f939c;border-bottom: 2px solid #8f939c;margin-bottom: 10px;width: 100%;"><strong>Differenza</strong></div><div class="amount__text"><span></span></div></div></div>');

    var ramo_struct = $('<div class="tm-simple row-double-line_font" style="color: #8f939c !important;font-size: 13px !important;height: auto;padding: 10px;"><div class="tm-simple__text info_importo" style=" margin-left: 10px; max-width : none;"><span></span></div><div class="tm-simple__text info_dataOperazione" style=" margin-left: 10px; max-width : none;"><span></span></div></div>');

    var riepilogo_ftVsVersato_struct = $('<div class="tm-input-row"><div class="tm-input-row__info row-double-line" style="background: inherit;border-radius: 0px !important;flex-grow: 1;flex-basis: 0;justify-content: center;padding: 10px;"><div class="tm-simple row-double-line_font" style="color: #05aefb !important;font-size: 13px !important;height: auto;"><div class="tm-simple__text" style="margin-left: 10px;max-width : none;"><span>Totale Fatturato :</span></div></div><div class="tm-simple row-double-line_font" style="color: #05aefb !important;font-size: 13px !important;height: auto;justify-content: center;"><div class="tm-simple__text infoTotFatturato" style=" margin-left: 10px; max-width : none;"><span></span></div></div></div><div class="tm-input-row__info row-double-line" style="background: inherit;border-radius: 0px !important;flex-grow: 1;flex-basis: 0;justify-content: center;padding: 10px;"><div class="tm-simple row-double-line_font" style="color: #05aefb !important;font-size: 13px !important;height: auto;"><div class="tm-simple__text" style="margin-left: 10px;max-width : none;"><span>Totale Versato :</span></div></div><div class="tm-simple row-double-line_font" style="color: #05aefb !important;font-size: 13px !important;height: auto;justify-content: center;"><div class="tm-simple__text infoTotVersato" style=" margin-left: 10px; max-width : none;"><span></span></div></div></div></div>');

    var riepilogo_row_struct = $('<div class="tm-input-row"><div class="tm-input-row__info row-double-line" style="background: inherit;border-radius: 0px !important;flex-grow: 1;flex-basis: 0;justify-content: center;padding: 10px;"><div class="tm-simple row-double-line_font" style="font-size: 13px !important;height: auto;"><div class="tm-simple__text text_top" style="margin-left: 10px;max-width : none;"><span></span></div></div><div class="tm-simple row-double-line_font" style="font-size: 13px !important;height: auto;justify-content: center;"><div class="tm-simple__text text_bottom" style=" margin-left: 10px; max-width : none;"><span></span></div></div></div></div>');

    var importoNonContabilizzato = $('<div class="tm-input-row"><div class="tm-input-row__info row-double-line" style="background: inherit;border-radius: 0px !important;flex-grow: 1;flex-basis: 0;justify-content: center;padding: 10px;"><div class="tm-simple row-double-line_font" style="font-size: 13px !important;height: auto;"><div class="tm-simple__text text_top" style="margin-left: 10px;max-width : none;"><span></span></div></div><div class="tm-simple row-double-line_font" style="font-size: 13px !important;height: auto;justify-content: center;"><div class="tm-simple__text text_bottom" style=" margin-left: 10px; max-width : none;"><span></span></div></div></div></div>');

    ins.loadAccountBalance(function(data){
      var bals = data.Balance;
      var totFatturato = new Number(data.TotFatturato);
      var totVersato = new Number(data.TotVersato);
      var totDiffFtVers = totFatturato - totVersato;
      var totNonContabilizzato = new Number(ins.ImportoNonContabilizzato);
      var totDovRealTime = new Number(data.TotDovInRealTime);

      if(totNonContabilizzato && totNonContabilizzato > 0){
        totDovRealTime += totNonContabilizzato;
      }

      bals.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.Fattura.Data) - new Date(b.Fattura.Data);
      });

      var fatturato_loop = 0;

      for (var i = 0; i < bals.length; i++) {
        var bal = bals[i];
        var ft_tmp = bal.Fattura;
        var ft = new Fattura();
        ft_tmp = $.extend(ft, ft_tmp);
        var tot_pagato_ft = 0;
        var diff_pagato_dov_ft = 0;

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

        var row_struct_clone = row_struct.clone();

        if(parseInt(ft.Tipologia) === 4){
          ft_totale_txt = 0 - ft_totale_txt;
        }

        if(parseInt(ft.Tipologia) !== 4){
          fatturato_loop += ft_totale;
        }

        row_struct_clone.find('.invoice-section .infoFattura span').append(ft_nominativo);
        row_struct_clone.find('.invoice-section .infoTotFt span').append('Totale Ft : ' + ft_totale_txt.formatMoney(2) + ' €');

        if(parseInt(ft.Tipologia) === 4){
          ft_totale = -ft_totale;
          fatturato_loop += ft_totale;
          tipoDoc = 'Nota di credito n. ';
        }

        //if(parseInt(ft.Tipologia) === 0 && ft.FatturaDettagli && ft.FatturaDettagli.FatturaDettagli && ft.FatturaDettagli.FatturaDettagli.length > 0){
          ft.Linking();
          var dataFattura = new Date(ft.Data);
          row_struct_clone.find('.invoice-section .infoFattura span').html(tipoDoc + ft.Numero + ' - ' + dataFattura.ddmmyyyy());
          var fdis = ft.FatturaDettagli.FatturaDettagli;
          var fdi_struct = $('<p class="ft-fdi" style="margin: 0;"><span></span></p>');

          for (var z = 0; z < fdis.length; z++) {
            var fdi_struct_clone = fdi_struct.clone();
            var fdi_matrix = fdis[z].getPDFMatrix();
            fdi_struct_clone.find('span').append('- ' + fdi_matrix.Title);
            row_struct_clone.find('.invoice-section .infoFattura').append(fdi_struct_clone);
          }
        //}

        for (var x = 0; x < rami.length; x++) {
          var ramo = rami[x];
          var ramo_struct_clone = ramo_struct.clone();

          var importo = new Number(ramo.Importo);

          if(i === 0 && x === 0 && totNonContabilizzato && totNonContabilizzato > 0){
            importo += totNonContabilizzato;
          }

          tot_pagato_ft += importo;
          var text_Importo = importo.formatMoney(2);

          var dataOperazione = new Date(ramo.DataOperazione);
          var text_DataOperazione = ' - ' + dataOperazione.ddmmyyyy();

          ramo_struct_clone.find('.info_importo span').append(text_Importo + ' €');
          ramo_struct_clone.find('.info_dataOperazione span').append(text_DataOperazione);

          row_struct_clone.find('.transactions-section').append(ramo_struct_clone);

        }

        if(fatturato_loop > totDovRealTime){
          var totDovutoFuturo = totFatturato - totDovRealTime;
          fatturato_loop = 0;
          ft_totale = ft_totale - totDovutoFuturo;
          diff_pagato_dov_ft = tot_pagato_ft - ft_totale;
          var curdate = new Date();
          row_struct_clone.find('.invoice-section .infoTotFt').append('<br><br><span><strong>Competenza al ' + curdate.ddmmyyyy() + ' : ' + ft_totale.formatMoney(2) + ' €</strong></span>');
        }else{
          diff_pagato_dov_ft = tot_pagato_ft - ft_totale;
        }

        diff_pagato_dov_ft = tot_pagato_ft - ft_totale;
        var diff_text = diff_pagato_dov_ft.formatMoney(2) + ' €';
        if(diff_pagato_dov_ft > 0){
          diff_text = '+' + diff_text;
          row_struct_clone.find('.diff-section .amount__text span').css('color', '#50cc41');
          row_struct_clone.find('.diff-section .amount__text span').css('font-weight', 'bold');
        }else if(diff_pagato_dov_ft < 0){
          row_struct_clone.find('.diff-section .amount__text span').css('color', '#ff0606');
          row_struct_clone.find('.diff-section .amount__text span').css('font-weight', 'bold');
        }
        row_struct_clone.find('.diff-section .amount__text span').append(diff_text);

        scrollbar.find('.kanban-item.ms-list-wide__kanban-item > div').append(row_struct_clone);
      }

      var riepilogo_ftVsVersato_struct_clone = riepilogo_ftVsVersato_struct.clone();
      riepilogo_ftVsVersato_struct_clone.find('.infoTotFatturato span').append(totFatturato.formatMoney(2) + ' €');
      riepilogo_ftVsVersato_struct_clone.find('.infoTotVersato span').append(totVersato.formatMoney(2) + ' €');

      scrollbar.find('.kanban-item.ms-list-wide__kanban-item > div').append(riepilogo_ftVsVersato_struct_clone);

      var curdate = new Date();
      var checkOut = new Date(ins.DataFine)
      var sms_totDaVersare = "Importo ancora da versare : ";
      if(curdate.getMonth() != checkOut.getMonth()){
        sms_totDaVersare = "Importo ancora da versare in questo mese : ";
      }

      var riepilogo_row_struct_clone = riepilogo_row_struct.clone();
      var totDaVersare = totDovRealTime - (totVersato + totNonContabilizzato);
      if(totDaVersare == 0 || !totDaVersare){
        riepilogo_row_struct_clone.find('.text_top').css('color', '#3be480');
        riepilogo_row_struct_clone.find('.text_top span').append("Inquilino solvente!");
      }else if(totDaVersare > 0){
        riepilogo_row_struct_clone.find('.text_top').css('color', '#eb6969');
        riepilogo_row_struct_clone.find('.text_top span').append(sms_totDaVersare);
        riepilogo_row_struct_clone.find('.text_bottom').css('color', '#eb6969');
        riepilogo_row_struct_clone.find('.text_bottom span').append(totDaVersare.formatMoney(2) + ' €');
      }else if(totDaVersare < 0){
        riepilogo_row_struct_clone.find('.text_top').css('color', '#02a8f3');
        riepilogo_row_struct_clone.find('.text_top span').append("Importo versato in più :");
        riepilogo_row_struct_clone.find('.text_bottom').css('color', '#02a8f3');
        riepilogo_row_struct_clone.find('.text_bottom span').append(totDaVersare.formatMoney(2) + ' €');
      }

      if(ins.ImportoNonContabilizzato && parseFloat(ins.ImportoNonContabilizzato) != 0){
        var totNonContabilizzato = new Number(ins.ImportoNonContabilizzato);
        var nonContabilizzato = importoNonContabilizzato.clone();
        nonContabilizzato.find('.text_top').css('color', '#ecda34');
        nonContabilizzato.find('.text_top span').append("Importo non contabilizzato : ");
        nonContabilizzato.find('.text_bottom').css('color', '#ecda34');
        nonContabilizzato.find('.text_bottom span').append(totNonContabilizzato.formatMoney(2) + ' €');
        scrollbar.find('.kanban-item.ms-list-wide__kanban-item > div').append(nonContabilizzato);
      }

      scrollbar.find('.kanban-item.ms-list-wide__kanban-item > div').append(riepilogo_row_struct_clone);

    });

  } catch (e) {
    console.log(e.message);
  }
}

accountBalance.prototype.loadStructure = function(){
  try {
    var self = this;

    if(!this.floatingPanel.root)
      throw new TypeError('accountBalance - loadStructure : this.floatingPanel.root undefined');

    var scrollbar = this.floatingPanel.root.find('.tm-property-tabs__content .tm-transaction-properties-pane.tm-hack-scrollbar');
    var structure = $('<div class="kanban-item ms-list-wide__kanban-item"><div class="tm-list-item"></div></div>');

    scrollbar.append(structure.clone());

    this.setHeader();

  } catch (e) {
      console.log(e.message);
  }
}

/*
 * #### END : Situazione Economica ####
*/

function FE_CustomerNotification(Id, Notification_UUID, Invoice_UUID, Created_At, Type, Message, DataRegistrazione){
  this.Id = Id;
  this.Notification_UUID = Notification_UUID;
  this.Invoice_UUID = Invoice_UUID;
  this.Created_At = Created_At;
  this.Type = Type;
  this.Message = Message;
  this.DataRegistrazione = DataRegistrazione;
}

FE_CustomerNotification.prototype.notif_row_matrix = function(){
  try {
    var self = this;

    if(!this.Id || !(parseInt(this.Id) > 0))
      throw new TypeError('FE_CustomerNotification - notif_row_matrix : this.Id undefined;');

    var dataRegistrazione = 'Non presente';
    var created_at = 'Non presente';
    var invoice_uuid = 'Non presente';
    var notification_uuid = 'Non presente';
    var message = 'Non presente';
    var type = 'Non presente';

    if(this.DataRegistrazione){
      dataRegistrazione = (new Date(this.DataRegistrazione)).itaFormat();
    }

    if(this.Created_At){
      created_at = (new Date(this.Created_At)).itaFormat();
    }

    if(this.Notification_UUID){
      notification_uuid = this.Notification_UUID;
    }

    if(this.Invoice_UUID){
      invoice_uuid = this.Invoice_UUID;
    }

    if(this.Type){
      type = this.Type;
    }

    if(this.Message){
      message = this.Message;
    }

    var matrix = {
      data_registrazione : dataRegistrazione,
      created_at : created_at,
      invoice_uuid : invoice_uuid,
      uuid : notification_uuid,
      sms : message,
      type : type
    }

    return matrix;
  } catch (e) {
    console.log(e.message);
  }
}

function Proprietario_Agenzia(Id, Type, Cognome, Nome, RagioneSociale, Telefono, PrimaryEmail, SecondaryEmail, Newsletter, CodiceFiscale, PartitaIva, Indirizzo, Citta, Civico, CAP, Stato, Paese, Paese_Sigla_ISO3166_2, CodiceDestinatario, PecDestinatario, DataRegistrazione, DataAggiornamento) {
  this.Id = Id;
  this.Type = Type;
  this.Cognome = Cognome;
  this.Nome = Nome;
  this.RagioneSociale = RagioneSociale;
  this.Telefono = Telefono;
  this.PrimaryEmail = PrimaryEmail;
  this.SecondaryEmail = SecondaryEmail;
  this.Newsletter = Newsletter;
  this.CodiceFiscale = CodiceFiscale;
  this.PartitaIva = PartitaIva;
  this.Indirizzo = Indirizzo;
  this.Citta = Citta;
  this.Civico = Civico;
  this.CAP = CAP;
  this.Stato = Stato;
  this.Paese = Paese;
  this.Paese_Sigla_ISO3166_2 = Paese_Sigla_ISO3166_2;
  this.CodiceDestinatario = CodiceDestinatario;
  this.PecDestinatario = PecDestinatario;
  this.DataRegistrazione = DataRegistrazione;
  this.DataAggiornamento = DataAggiornamento;
}

Proprietario_Agenzia.prototype.row_matrix = function () {
  try {
    var self = this;

    var nominativo = null;
    var primaryEmail, secondaryEmail, telefono = "Non specificato";

    if(this.Nome && this.Cognome && this.Nome !== "" && this.Cognome !== ""){
      nominativo = this.Cognome + " " + this.Nome;
    }

    if(this.RagioneSociale){
      nominativo = nominativo ? (nominativo + " - " + this.RagioneSociale) : this.RagioneSociale;
    }

    if (this.PrimaryEmail && this.PrimaryEmail !== "") {
      primaryEmail = this.PrimaryEmail;
    }

    if (this.SecondaryEmail && this.SecondaryEmail !== "") {
      secondaryEmail = this.SecondaryEmail; 
    }

    if (this.Telefono && this.Telefono !== "") {
      telefono = this.Telefono;
    }

    var matrix = {
      nominativo : nominativo,
      primaryEmail : primaryEmail,
      secondaryEmail : secondaryEmail,
      telefono : telefono,
    };

    return matrix;

  } catch (e) {
    console.log(e.message);
  }
}

Proprietario_Agenzia.prototype.Save = function (callback) {
  try {
    var self = this;
    var clone = encodeURIComponent(JSON.stringify(self));

    if(!callback)
      throw new TypeError('Proprietario_Agenzia - Save : callback undefined!');

    $.ajax({
        method: "POST",
        url: ACTIONS + 'appartamento.php?action=save-prop-ag',
        data: { data : clone },
    }).done(function(res){
      var success = false;
      var sms = res.sms;
      if(res && res.success && res.data){
        success = true;
        $.extend(self, res.data);
        //self.Linking();
      }

      callback(success, sms);
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });
  } catch (e) {
    console.log(e.message);
  }
}

function Appartamento_Proprietario_Agenzia(IdAppartamento, IdProprietarioAgenzia, Appartamento, Proprietario_Agenzia) {
  this.IdAppartamento = IdAppartamento;
  this.IdProprietarioAgenzia = IdProprietarioAgenzia;
  this.Appartamento = Appartamento;
  this.Proprietario_Agenzia = Proprietario_Agenzia;
}

Appartamento_Proprietario_Agenzia.prototype.Linking = function(){
  try {
    var self = this;

    if(this.Appartamento){
      this.Appartamento = $.extend(new Appartamento(), this.Appartamento);
    }

    if(this.Proprietario_Agenzia){
      this.Proprietario_Agenzia = $.extend(new Proprietario_Agenzia(), this.Proprietario_Agenzia);
    }
  } catch (e) {
    console.log(e.message);
    
  }
}

function Ticket(Id, IdAdminAccount, IdFornitore, TipoAddebito, TipoAssegnazione, DataRichiesta, Oggetto, Indicazioni, Stato, Priority, InvioNotifiche, DataRegistrazione, DataAggiornamento) {
  this.Id = Id;
  this.IdAdminAccount = IdAdminAccount;
  this.IdFornitore = IdFornitore;
  this.TipoAddebito = TipoAddebito;
  this.TipoAssegnazione = TipoAssegnazione;
  this.DataRichiesta = DataRichiesta;
  this.Oggetto = Oggetto;
  this.Indicazioni = Indicazioni;
  this.Stato = Stato;
  this.Priority = Priority;
  this.InvioNotifiche = InvioNotifiche;
  this.DataRegistrazione = DataRegistrazione;
  this.DataAggiornamento = DataAggiornamento;
}

Ticket.prototype.row_matrix = function () {
  try {
    var self = this;
    var subject = "(vuoto)";
    var dataRichiesta = "(vuoto)";
    var stato = "(vuoto)";
    var lastUpdate = "";

    if(this.Oggetto){
      subject = this.Oggetto;
    }

    if(this.DataRichiesta){
      dataRichiesta = (new Date(this.DataRichiesta)).ddmmyyyy();
    }

    if(this.Stato){
      stato = this.getStatoMatrix().title;
    }

    if(this.DataAggiornamento){
      lastUpdate = (new Date(this.DataAggiornamento)).friendlyFormat();
    }

    var matrix = {
      id : '#' + self.Id,
      subject : subject,
      dataRichiesta : dataRichiesta,
      stato : stato,
      statoClass : self.getStatoMatrix().class,
      lastUpdate : lastUpdate
    }

    return matrix;
  } catch (e) {
    console.log(e.message);
  }
}

Ticket.prototype.getStatoMatrix = function () {
  var matrix = { 
    class : null,
    title : '(vuoto)'
  }

  switch (parseInt(this.Stato)) {
    case 0:
      matrix.class = "";
      matrix.title = "";
      break;
    case 1:
      matrix.class = "tk__open";
      matrix.title = "Aperto";
      break;
    case 2:
      matrix.class = "";
      matrix.title = "Archiviato";
      break;
    case 3:
      matrix.class = "tk__blocked";
      matrix.title = "In attesa di approvazione";
      break;
    case 4:
      matrix.class = "tk__pending";
      matrix.title = "In sospeso";
      break;
    case 5:
      matrix.class = "";
      matrix.title = "Chiuso";
      break;
    case 6:
      matrix.class = "tk__pending";
      matrix.title = "In attesa di sopralluogo";
      break;
    case 7:
      matrix.class = "tk__pending";
      matrix.title = "In attesa di preventivo";
      break;
    case 8:
      matrix.class = "tk__pending";
      matrix.title = "In attesa di relazione";
      break;
    case 9:
      matrix.class = "";
      matrix.title = "";
      break;
    case 10:
      matrix.class = "";
      matrix.title = "";
      break;
  }

  return matrix;

}

Ticket.prototype.Load = function (callback) {
  try {
    var self = this;
    var clone = encodeURIComponent(JSON.stringify(self));

    if(!callback)
      throw new TypeError('Ticket - Load : callback undefined!');

    $.ajax({
        method: "POST",
        url: '?action=load-ticket',
        data: { data : clone },
    }).done(function(res){
      if(res && res.data){
          res = $.extend(self, res.data);
          //res.Linking();
      }

      callback();
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });

  } catch (e) {
    console.error(e.message);
  }
}

Ticket.prototype.Save = function (callback) {
  try {
    var self = this;

    if(!callback)
      throw new TypeError('Ticket - Save : callback undefined!');

    var clone = encodeURIComponent(JSON.stringify(self));
    
    $.ajax({
      method: "POST",
      url: '?action=save-ticket',
      data: { data : clone },
    }).done(function(res){
      var success = false;
      var sms = res.sms;
      if(res && res.success && res.data){
        success = true;
        $.extend(self, res.data);
      }

      callback(success, sms);
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });

  } catch (e) {
    console.error(e.message);
  }
}

Ticket.prototype.getPropertyName = function (callback) {
  try {

    if(!callback)
      throw new TypeError('Ticket - getPropertyName : callback undefined!');

    var self = this;
    var clone = encodeURIComponent(JSON.stringify(self));
    var title = null;

    $.ajax({
        method: "POST",
        url: '?action=getPropertyName',
        data: { data : clone },
    }).done(function(res){
      if(res && res.data){
        title = res.data;
      }

      callback(title);
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });
    
  } catch (e) {
    console.error(e.message);
  }
}

function TicketAssegnazione(Id, IdTicket, IdAppartamento, IdInquilinoStanze, IdAppartamentoStanze) {
  this.Id  = Id;
  this.IdTicket  = IdTicket;
  this.IdAppartamento  = IdAppartamento;
  this.IdInquilinoStanze  = IdInquilinoStanze;
  this.IdAppartamentoStanze  = IdAppartamentoStanze;
}

TicketAssegnazione.prototype.Save = function (callback) {
  try {
    var self = this;

    if(!callback)
      throw new TypeError('TicketAssegnazione - Save : callback undefined!');

    var clone = encodeURIComponent(JSON.stringify(self));
    
    $.ajax({
      method: "POST",
      url: '?action=toggle-assegnazione',
      data: { data : clone },
    }).done(function(res){
      var success = false;
      var sms = res.sms;
      if(res && res.success){
        success = true;
        $.extend(self, res.data);
      }

      callback(success, sms);
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });

  } catch (e) {
    console.error(e.message);
  }
}

function RegistroTicket(Id, IdTicket, DataIntervento, Uscita, DescrizioneLavoro, Numero, Cadauno, Iva, Rimborso, Totale, TotaleFornitore, DataRegistrazione, DataAggiornamento) {
  this.Id = Id;
  this.IdTicket = IdTicket;
  this.DataIntervento = DataIntervento;
  this.Uscita = Uscita;
  this.DescrizioneLavoro = DescrizioneLavoro;
  this.Numero = Numero;
  this.Cadauno = Cadauno;
  this.Iva = Iva;
  this.Rimborso = Rimborso;
  this.Totale = Totale;
  this.TotaleFornitore = TotaleFornitore;
  this.DataRegistrazione = DataRegistrazione;
  this.DataAggiornamento = DataAggiornamento;
}

RegistroTicket.prototype.Save = function (callback) {
  try {
    var self = this;

    if(!callback)
      throw new TypeError('Save - Error : callback undefined!');

      var clone = encodeURIComponent(JSON.stringify(self));
    
    $.ajax({
      method: "POST",
      url: '?action=save-registro',
      data: { data : clone },
    }).done(function(res){
      var success = false;
      var sms = res.sms;
      if(res && res.success){
        success = true;
        $.extend(self, res.data);
      }

      callback(success, sms);
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });
    
  } catch (e) {
    console.error(e.message);
  }
}

RegistroTicket.prototype.Delete = function (callback) {
  try {
    var self = this;

    if(!callback)
      throw new TypeError('Delete - Error : callback undefined!');

      var clone = encodeURIComponent(JSON.stringify(self));
    
    $.ajax({
      method: "POST",
      url: '?action=delete-registro',
      data: { data : clone },
    }).done(function(res){
      var success = false;
      if(res && res.success){
        success = true;
      }

      callback(success);
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });
    
  } catch (e) {
    console.error(e.message);
  }
}

RegistroTicket.prototype.getIva = function () {
  try {
    var self = this;
    var amount = 0;

    switch (parseInt(this.Iva)) {
      case 1:
        amount = 22;
        break;
      case 2:
        amount = 10;
        break;
    }

    return amount;
  } catch (e) {
    console.error(e.message);
  }
}

RegistroTicket.prototype.getTotaleFattura = function (totRegistri) {
  try {
    var self = this;
    var totale = 0;

    if(!totRegistri || !(totRegistri > 0))
      throw new TypeError('totRegistri undefined!');

    var cad = this.Cadauno ? parseFloat(this.Cadauno) : 0;
    var numero = this.Numero ? parseInt(this.Numero) : 0;
    var uscita = this.Uscita ? parseFloat(this.Uscita) : 0;
    var rimborso = this.Rimborso ? parseFloat(this.Rimborso) : 0;
    var iva = 22;
    var fee = MANUTENZIONE_FEE/totRegistri;
    var imponibile = fee + (numero * cad) + rimborso;

    totale = parseFloat(((imponibile/100)*iva)+imponibile);

    return totale;
  } catch (e) {
    console.error(e.message);
  }
}

RegistroTicket.prototype.getTotaleFatturaFornitore = function () {
  try {
    var self = this;
    var totale = 0;
    var cad = this.Cadauno ? parseFloat(this.Cadauno) : 0;
    var numero = this.Numero ? parseInt(this.Numero) : 0;
    var uscita = this.Uscita ? parseFloat(this.Uscita) : 0;
    var iva = this.getIva();
    var imponibile = ((cad*numero)+uscita);

    totale = parseFloat(((imponibile/100)*iva)+imponibile);

    return totale;
  } catch (e) {
    console.error(e.message);
  }
}
