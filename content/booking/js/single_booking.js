function sec_singleBooking(admin, bookingApp_ui, item){
  this.admin = admin;
  this.bookingApp_ui = bookingApp_ui;
  this.sectionNumber = 1;
  this.item = item;
}

(function(){

  var clone = null;
  var uiBookingDetails = null;
  var uiBookingDetailsPersonalInfo = null;
  var uiBookingDetails_Intestazione = null;
  /** COVID DISCOUNT PARAMS */
  var covid_discount_perc = 10;
  var covid_discount_expiration = new Date('2021-08-31');

  function ui_BookingDetails(canone, spese, dataInizio, dataFine, caparra, cauzione, scadenza, monthlyDiscountAmount, monthlyDiscountExpiration, importoNonContabilizzato){
    this.canone = canone;
    this.spese = spese;
    this.dataInizio = dataInizio;
    this.dataFine = dataFine;
    this.caparra = caparra;
    this.cauzione = cauzione;
    this.scadenza = scadenza;
    this.monthlyDiscountAmount = monthlyDiscountAmount;
    this.monthlyDiscountExpiration = monthlyDiscountExpiration;
    this.importoNonContabilizzato = importoNonContabilizzato;
  }

  ui_BookingDetails.prototype.init = function(root){
    try {
      var self = this;

      if(!root)
        throw new TypeError("ui_BookingDetails - init : root undefined!");

      this.setSelectors(root);
      this.setListeners(root);

    } catch (e) {
      console.log(e.message);
    }
  }

  ui_BookingDetails.prototype.setSelectors = function(root){
    try {
      var self = this;

      if(!root)
        throw new TypeError("ui_BookingDetails - setSelectors : root undefined!");

      var bookingSection = root.find('.booking-section');
      var bookingDetailsForm = root.find('.booking-section .booking-details-form');

      this.canone = bookingDetailsForm.find('.canone_field');
      this.spese = bookingDetailsForm.find('.spese_field');
      this.dataInizio = bookingDetailsForm.find('.inizio_field');
      this.dataFine = bookingDetailsForm.find('.fine_field');
      this.caparra = bookingDetailsForm.find('.caparra_field');
      this.cauzione = bookingDetailsForm.find('.cauzione_field');
      this.scadenza = bookingDetailsForm.find('.deadline_field');
      this.monthlyDiscountAmount = bookingDetailsForm.find('.mthDisc_amount_field');
      this.monthlyDiscountExpiration = bookingDetailsForm.find('.mthDisc_expiration_field');
      this.importoNonContabilizzato = bookingDetailsForm.find('.nonContabilizzato_field');
      this.contractType = bookingDetailsForm.find('.booking-details-form__contractType');
      this.fonte = bookingDetailsForm.find('.partner_field');

    } catch (e) {
      console.log(e.message);
    }
  }

  ui_BookingDetails.prototype.setListeners = function(root){
    try {
      var self = this;

      if(!root)
        throw new TypeError("ui_BookingDetails - setListeners : root undefined!");

      if(!clone)
        throw new TypeError("ui_BookingDetails - setListeners : clone undefined!");

      if(!clone.item)
        throw new TypeError("ui_BookingDetails - setListeners : clone.item undefined!");

      var bookingSection = root.find('.booking-section');
      var bookingDetailsForm = root.find('.booking-section .booking-details-form');
      var bookingDetails = clone.item;
      var room = bookingDetails.Stanza;
      var marketPrice = parseFloat(room.getMarketPrice());
      var prezzoDinamico = parseFloat(room.PrezzoDinamico);
      var mthDisc_Amount = getMthDiscountAmount(prezzoDinamico, marketPrice);
      var bookingConfirmed = bookingDetails.isConfirmed();

      var toggleBtn = bookingDetailsForm.find('div.booking-details-form__column div.booking-details-form_row-btn.toggle-btn');

      toggleBtn.click(function(event){
        if(bookingDetailsForm.find('.toggleFields').hasClass('toggleFields_hide')){
          bookingDetailsForm.find('.toggle-btn span i').html('remove_circle');
          bookingDetailsForm.find('.toggle-btn span .toggle-btn__text').html(' Riduci ');
        }else{
          bookingDetailsForm.find('.toggle-btn span i').html('add_circle');
          bookingDetailsForm.find('.toggle-btn span .toggle-btn__text').html(' Espandi ');
        }
        bookingDetailsForm.find('.toggleFields').toggleClass('toggleFields_hide');
      });

      this.dataFine.find('input').change(function(){
        //DO NOTHING
      });

      this.fonte.find('select').change(function(){
        var fonte = parseInt($(this).val());

        if(!bookingConfirmed){
          var tmp = new Booking_Details();
          tmp.DataInizio = self.dataInizio.find('input').val();
          tmp.DataFine = self.dataFine.find('input').val();
          tmp.IdStanza = bookingDetails.IdStanza;
        }

      });

      if(!bookingConfirmed){
        this.dataInizio.find('input').change(function(){
          var date = $(this).val();
          var dataFine = self.dataFine.find('input').val();
          var tmp = new Booking_Details();

          if(date){
            tmp.DataInizio = date;
            tmp.DataFine = dataFine;
            tmp.IdStanza = bookingDetails.IdStanza;
          }

        });
      }

      this.canone.find('input').change(function () {
        var canone = $(this).val();
        if(uiBookingDetails.contractType.html().includes('lungo')){
          var mthDisc_Amount = getMthDiscountAmount(canone, marketPrice);
          self.monthlyDiscountAmount.find('input').val(mthDisc_Amount);
        }
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  ui_BookingDetails.prototype.toggleOneOffDiscountRent = function(root){
    try {
      var self = this;

      if(!root)
        throw new TypeError("ui_BookingDetails - toggleOneOffDiscountRent : root undefined!");

      if(!clone)
        throw new TypeError("ui_BookingDetails - toggleOneOffDiscountRent : clone undefined!");

      if(!clone.item)
        throw new TypeError("ui_BookingDetails - toggleOneOffDiscountRent : clone.item undefined!");

      var bookingSection = root.find('.booking-section');
      var bookingDetailsForm = root.find('.booking-section .booking-details-form');
      var rentDiscountSection = root.find('.booking-details-form__row.oneOffDiscountRent');
      var bookingDetails = clone.item;

      if(bookingDetails.OneOffDiscountRent && parseFloat(bookingDetails.OneOffDiscountRent) > 0){
        var discount = new Number(bookingDetails.OneOffDiscountRent);
        rentDiscountSection.css('display', 'flex');
        rentDiscountSection.find('span.oneOffDiscountRent_amount').html(discount.formatMoney(2) + '€');
      }else{
        rentDiscountSection.css('display', 'none');
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  ui_BookingDetails.prototype.checkFields = function(callback){
    try {
      var res = true;
      var alert = true;
      var smsError = "";
      var smsAlert = "";
      var self = this;

      if(!callback)
        throw new TypeError('ui_BookingDetails - checkFields : callback undefined');

      if(!clone)
        throw new TypeError('ui_BookingDetails - checkFields : clone undefined');

      if(!clone.item)
        throw new TypeError('ui_BookingDetails - checkFields : clone.item undefined');

      if(!clone.item.Stanza)
        throw new TypeError('ui_BookingDetails - checkFields : clone.item.Stanza undefined');

      var canone = parseFloat(this.canone.find('input').val());
      var dataInizio = this.dataInizio.find('input').val();
      var dataFine = this.dataFine.find('input').val();
      var cauzione = this.cauzione.find('input').val() ? parseFloat(this.cauzione.find('input').val()) : 0;
      var fonte = uiBookingDetailsPersonalInfo.Fonte.find('select').val();
      var caparra = parseFloat(this.caparra.find('input').val());
      var pInfo = clone.item.PersonalInfo;
      var idPersonalInfo = parseInt(pInfo.Id);
      var idBookingDetails = parseInt(clone.item.Id);
      var contractDuration = null;
      var room = clone.item.Stanza;
      var marketPrice = parseFloat(room.getMarketPrice());
      var room_dataInizio = new Date(room.Availability);
      var contractType_text = this.contractType.html();
      var prezzoDinamico = parseFloat(room.PrezzoDinamico);
      var mthDisc_Amount = this.monthlyDiscountAmount.find('input').val();
      var mthDisc_Expiration = this.monthlyDiscountExpiration.find('input').val();
      var mthDisc_Amount_Dovuto = getMthDiscountAmount(prezzoDinamico, marketPrice);

      /*
      ### BEGIN : Tipologia del contratto ###
      ###    1 = Lungo Periodo            ###
      ###    2 = Breve Periodo            ###
      #######################################
       */
      var contractType = 1; //Default
      /*
      ### END : Tipologia del contratto ###
      #####################################
       */

      //BEGIN : Cauzione precedente
      var prevIns = clone.item.Inquilino_Stanza ? clone.item.Inquilino_Stanza : null;
      var prevCauzione = (prevIns && prevIns.Cauzione && parseFloat(prevIns.Cauzione) > 0) ? parseFloat(prevIns.Cauzione) : 0;
      var cauzioneDovuta = 0;
      //END : Cauzione precedente

      if(dataFine && dataFine !== "" && dateValidation(dataFine) && dataInizio && dateValidation(dataInizio)){
        var dataInizio_date = new Date(dataInizio);
        var dataFine_date = new Date(dataFine);
        contractDuration = dateDiff(dataInizio_date, dataFine_date);
      }

      if(contractDuration && contractDuration.months < 6){
        contractType = 2;
      }
      /**
       * BEGIN : CONTROLLI
       */

       if(!canone || !(canone > 0)){
         res = false;
         smsError += '<span>- Canone mancante.</span>';
       }

       if(!dataInizio || !dateValidation(dataInizio)){
         res = false;
         smsError += '<span>- Inizio contratto mancante.</span>';
       }

       if(dataFine && dataFine !== "" && dateValidation(dataFine) && !checkStay(dataInizio, dataFine)){
         res = false;
         smsError += '<span>- Fine contratto non valido.</span>';
       }

       if(fonte && parseInt(fonte) > 0 && caparra === 0 && idPersonalInfo === 0){
         alert = false;
         smsAlert += '<span>- E&#8217; corretto caparra zero?.</span>';
       }

       if(canone !== prezzoDinamico){
        alert = false;
        smsAlert += '<span>- Il canone non coincide con il prezzo di listino.</span>';
       }

       if(mthDisc_Amount && mthDisc_Amount > 0 && !(mthDisc_Expiration || dateValidation(mthDisc_Expiration))){
        res = false;
        smsError += '<span>- È richiesto specificare la data di scadenza dello sconto mensile.</span>';
       }

       switch (contractType) {
         case 1:
           // BEGIN : Controllo Cauzione
           cauzioneDovuta = marketPrice*2;
           // END : Controllo Cauzione
           break;
         case 2:
           // BEGIN : Controllo Cauzione
           cauzioneDovuta = marketPrice;
           // END : Controllo Cauzione
           break;
       }

       if(cauzioneDovuta > prevCauzione){
         cauzioneDovuta -= prevCauzione;
       }else{
         cauzioneDovuta = 0;
       }

       if(cauzioneDovuta !== cauzione){
         alert = false;
         smsAlert += '<span>- E&#8217; corretto la cauzione ' + cauzione + '? </span>';
       }

      /**
       * END : CONTROLLI
       */

      callback(res, smsError, alert, smsAlert);
    } catch (e) {
      console.log(e.message);
    }
  }

  ui_BookingDetails.prototype.setValuesToItem = function(item) {
    try {
      var self = this;

      if(!item)
        throw new TypeError('ui_BookingDetails - setValuesToItem : item undefined!');

      var canone = this.canone.find('input').val();
      var spese = this.spese.find('input').val();
      var dataInizio = this.dataInizio.find('input').val();
      var dataFine = this.dataFine.find('input').val();
      var caparra = this.caparra.find('input').val();
      var cauzione = this.cauzione.find('input').val();
      var scadenza = this.scadenza.find('input').val();
      var importoNonContabilizzato = this.importoNonContabilizzato.find('input').val();
      var mthDisc_Amount = this.monthlyDiscountAmount.find('input').val();
      var mthDisc_Expiration = this.monthlyDiscountExpiration.find('input').val();
      var scandenza_format = scadenza ? (new Date(scadenza)).getDateTimeFormat() : null;

      item.Canone = canone ? canone : 0;
      item.Spese = spese ? spese : 0;
      item.DataInizio = (dataInizio && dataInizio !== "") ? dataInizio : null;
      item.DataFine = (dataFine && dataFine !== "") ? dataFine : null;
      item.Caparra = caparra ? caparra : 0;
      item.Cauzione = cauzione ? cauzione : 0;
      item.ImportoNonContabilizzato = importoNonContabilizzato ? importoNonContabilizzato : 0;
      item.MonthlyDiscountAmount = mthDisc_Amount;
      item.MonthlyDiscountExpiration = mthDisc_Expiration;
      item.Scadenza = scandenza_format ? scandenza_format : null;

    } catch (e) {
      console.log(e.message);
    }
  }

  function ui_BookingDetailsPersonalInfo(Id, Cognome, Nome, Sesso, Lang, Fonte, Professione, Specializzazione, DataNascita, Ente, PrimaryEmail, SecondaryEmail, Telefono, Indirizzo, Civico, CAP, Citta, Stato, Paese, Paese_Sigla_ISO3166_2, LuogoNascita, CodiceFiscale, ForeignIdentificationNumber, PartitaIva, IntestatarioConto, IBAN, SWIFT, DataRegistrazione, DataAggiornamento){
    this.Id =  Id;
    this.Cognome =  Cognome;
    this.Nome =  Nome;
    this.Sesso =  Sesso;
    this.Lang =  Lang;
    this.Fonte =  Fonte;
    this.Professione =  Professione;
    this.Specializzazione =  Specializzazione;
    this.DataNascita =  DataNascita;
    this.Ente =  Ente;
    this.PrimaryEmail  =  PrimaryEmail;
    this.SecondaryEmail = SecondaryEmail;
    this.Telefono =  Telefono;
    this.Indirizzo =  Indirizzo;
    this.Civico =  Civico;
    this.CAP =  CAP;
    this.Citta =  Citta;
    this.Stato = Stato;
    this.Paese = Paese;
    this.Paese_Sigla_ISO3166_2 = Paese_Sigla_ISO3166_2;
    this.LuogoNascita =  LuogoNascita;
    this.CodiceFiscale =  CodiceFiscale;
    this.ForeignIdentificationNumber = ForeignIdentificationNumber;
    this.PartitaIva =  PartitaIva;
    this.IntestatarioConto = IntestatarioConto;
    this.IBAN = IBAN;
    this.SWIFT = SWIFT;
    this.DataRegistrazione =  DataRegistrazione;
    this.DataAggiornamento =  DataAggiornamento;
  }

  ui_BookingDetailsPersonalInfo.prototype.init = function(root){
    try {
      var self = this;

      if(!root)
        throw new TypeError("ui_BookingDetails - init : root undefined!");

      this.setSelectors(root);
      this.setListeners(root);

    } catch (e) {
      console.log(e.message);
    }
  }

  ui_BookingDetailsPersonalInfo.prototype.setSelectors = function(root){
    try {
      var self = this;

      if(!root)
        throw new TypeError("ui_BookingDetailsPersonalInfo - setSelectors : root undefined!");

      var bookingSection = root.find('.booking-section');
      var bookingPersonalInfo = root.find('.booking-section .booking-personal-info');

      this.Cognome =  bookingPersonalInfo.find('.cognome_field');
      this.Nome =  bookingPersonalInfo.find('.nome_field');
      this.Sesso =  bookingPersonalInfo.find('.sesso_field');
      this.Lang =  bookingPersonalInfo.find('.lingua_field');
      this.Fonte =  bookingSection.find('.partner_field');
      this.Professione =  bookingPersonalInfo.find('.professione_field');
      this.Specializzazione =  bookingPersonalInfo.find('.specializzazione_field');
      this.DataNascita =  bookingPersonalInfo.find('.nascita_field');
      this.Ente =  bookingPersonalInfo.find('.ente_field');
      this.PrimaryEmail  =  bookingPersonalInfo.find('.primary_email_field');
      this.SecondaryEmail = bookingPersonalInfo.find('.secondary_email_field');
      this.Telefono =  bookingPersonalInfo.find('.telefono_field');
      this.Indirizzo =  bookingPersonalInfo.find('.indirizzo_field');
      this.Civico =  bookingPersonalInfo.find('.civico_field');
      this.CAP =  bookingPersonalInfo.find('.cap_field');
      this.Citta = bookingPersonalInfo.find('.citta_field');
      this.Stato = bookingPersonalInfo.find('.stato_field');
      this.Paese = bookingPersonalInfo.find('.paese_field');
      this.Paese_Sigla_ISO3166_2 = bookingPersonalInfo.find('.paese_sigla_field');
      this.LuogoNascita =  bookingPersonalInfo.find('.luogoNascita_field');
      this.CodiceFiscale =  bookingPersonalInfo.find('.codiceFiscale_field');
      this.ForeignIdentificationNumber = bookingPersonalInfo.find('.foreign_id_field');
      this.IntestatarioConto = bookingPersonalInfo.find('.intestatarioConto_field');
      this.IBAN = bookingPersonalInfo.find('.iban_field');
      this.SWIFT = bookingPersonalInfo.find('.swift_field');
      //this.PartitaIva =  null;

    } catch (e) {
      console.log(e.message);
    }
  }

  ui_BookingDetailsPersonalInfo.prototype.setListeners = function(root){
    try {
      var self = this;

      if(!root)
        throw new TypeError("ui_BookingDetailsPersonalInfo - setListeners : root undefined!");

      var bookingSection = root.find('.booking-section');
      var bookingPersonalInfo = root.find('.booking-section .booking-personal-info');

      var autoAddress = bookingPersonalInfo.find('.autoAddress_field');

      // Create the autocomplete object, restricting the search to geographical
      // location types.
      var autocomplete = new google.maps.places.Autocomplete(
          /** @type {!HTMLInputElement} *//*autoAddress.find('input')*/(document.getElementById('autoAddress_field')),
          {types: ['geocode']});

      var componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
      };

      var country_short = {
        country: 'short_name'
      }

      autocomplete.addListener('place_changed', function(){
        // Get the place details from the autocomplete object.
        var place = autocomplete.getPlace();

        for (var component in componentForm) {
          root.find('input#' + component).val('');
          //root.find(component).disabled = false;
        }

        root.find('input#country_iso').val('');

        // Get each component of the address from the place details
        // and fill the corresponding field on the form.
        for (var i = 0; i < place.address_components.length; i++) {
          var addressType = place.address_components[i].types[0];
          if (componentForm[addressType]) {
            var value = place.address_components[i][componentForm[addressType]];
            root.find('input#' + addressType).val(value);
          }

          if (country_short[addressType]) {
            var value = place.address_components[i][country_short[addressType]];
            root.find('input#country_iso').val(value);
          }
        }
      });

      this.LuogoNascita.find('input').autocomplete({
        source: '?action=autocompleteCity',
        minChars: 2,
        autoFill: true,
        mustMatch:true,
        delay: 0,//0
        cacheLength: 1,
        max:30,
        formatItem: function (row) {
        return row[0] + " (" + row[2] + ", " + row[1] + ")"+" "+row[5];
        },
        formatMatch: function (row) {
        return row[0];
        },
        formatResult: function (row) {
        return row[0];
        },
        select: function(e, ui){
          clone.item.PersonalInfo.setLuogoNascita(parseInt(ui.item.city_code_istat));
          self.setCodiceFiscale();
        }
      });

      this.PrimaryEmail.find('input').keyup(function(){
        var res = validateEmail($(this).val());
        if(!res){
          $(this).css('border-color', '#bf0b07');
        }else{
          $(this).css('border-color', '#cbcbcb');
        }
      });

      this.SecondaryEmail.find('input').keyup(function(){
        var res = validateEmail($(this).val());
        if(!res && $(this).val() !== ""){
          $(this).css('border-color', '#bf0b07');
        }else{
          $(this).css('border-color', '#cbcbcb');
        }
      });

      var toggleBtn = bookingPersonalInfo.find('div.booking-personal-info_btn.toggle-btn');

      toggleBtn.click(function(event){
        if(bookingPersonalInfo.find('.toggleFields').hasClass('toggleFields_hide')){
          bookingPersonalInfo.find('.toggle-btn span i').html('remove_circle');
          bookingPersonalInfo.find('.toggle-btn span .toggle-btn__text').html(' Riduci ');
        }else{
          bookingPersonalInfo.find('.toggle-btn span i').html('add_circle');
          bookingPersonalInfo.find('.toggle-btn span .toggle-btn__text').html(' Espandi ');
        }
        bookingPersonalInfo.find('.toggleFields').toggleClass('toggleFields_hide');
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  ui_BookingDetailsPersonalInfo.prototype.checkFields = function(callback){
    try {
      var self = this;
      var smsError = "";
      var res = true;

      if(!callback)
        throw new TypeError('ui_BookingDetailsPersonalInfo - checkFields : callback undefined');

      var cognome = this.Cognome.find('input').val();
      var nome = this.Nome.find('input').val();
      var sesso = this.Sesso.find('select').val();
      var dataNascita = this.DataNascita.find('input').val();
      var professione = this.Professione.find('select').val();
      var specializzazione = this.Specializzazione.find('input').val();
      var ente = this.Ente.find('input').val();
      var primaryEmail = this.PrimaryEmail.find('input').val();
      var secondaryEmail = this.SecondaryEmail.find('input').val();
      var telefono = this.Telefono.find('input').val();
      var indirizzo = this.Indirizzo.find('input').val();
      var civico = this.Civico.find('input').val();
      var cap = this.CAP.find('input').val();
      var citta = this.Citta.find('input').val();
      var stato = this.Stato.find('input').val();
      var paese = this.Paese.find('input').val();
      var paese_sigla = this.Paese_Sigla_ISO3166_2.find('input').val();
      var luogoNascita = clone.item.PersonalInfo.LuogoNascita;
      var fonte = this.Fonte.find('select').val();
      var lang = this.Lang.find('select').val();
      var intestatarioConto = this.IntestatarioConto.find('input').val();
      var iban = this.IBAN.find('input').val();
      var swift = this.SWIFT.find('input').val();
      var codiceFiscale = this.CodiceFiscale.find('input').val();
      var foreignID = this.ForeignIdentificationNumber.find('input').val();
      var idPersonalInfo = clone.item.PersonalInfo.Id;
      var idIns = clone.item.IdInquilinoStanza;

      if(!cognome || cognome === ""){
        res = false;
        smsError += '<span>- Cognome mancante.</span>';
      }

      if(!nome || nome === ""){
        res = false;
        smsError += '<span>- Nome mancante.</span>';
      }

      if(!sesso || sesso === "none"){
        res = false;
        smsError += '<span>- Sesso mancante.</span>';
      }

      if(!dataNascita || !dateValidation(dataNascita)){
        res = false;
        smsError += '<span>- Data di nascita mancante.</span>';
      }

      if(!professione || professione === "0"){
        res = false;
        smsError += '<span>- Professione mancante.</span>';
      }

      if((!specializzazione || specializzazione === "") && professione === "2"){
        res = false;
        smsError += '<span>- Specializzazione mancante.</span>';
      }

      if(specializzazione && specializzazione.length > 12){
        res = false;
        smsError += '<span>- La specializzazione non può superare 12 caratteri.</span>';
      }

      if(!ente || ente === ""){
        res = false;
        smsError += '<span>- Ente mancante.</span>';
      }

      if(!primaryEmail || primaryEmail === "" || !validateEmail(primaryEmail)){
        res = false;
        smsError += '<span>- Email non valida.</span>';
      }

      if(secondaryEmail && secondaryEmail !== "" && !validateEmail(secondaryEmail)){
        res = false;
        smsError += '<span>- Email Secondaria non valida.</span>';
      }

      if(!telefono || telefono === ""){
        res = false;
        smsError += '<span>- Telefono mancante.</span>';
      }

      if(!indirizzo || indirizzo === ""){
        res = false;
        smsError += '<span>- Indirizzo mancante.</span>';
      }

      if(!civico || civico  === ""){
        res = false;
        smsError += '<span>- Civico mancante.</span>';
      }

      /*if(!cap || cap === ""){
        res = false;
        smsError += '<span>- CAP mancante.</span>';
      }*/

      if(!citta || citta === ""){
        res = false;
        smsError += '<span>- Città mancante.</span>';
      }

      if(!paese || paese === ""){
        res = false;
        smsError += '<span>- Paese mancante.</span>';
      }

      if(!paese_sigla || paese_sigla === "" || !(paese_sigla.length === 2)){
        res = false;
        smsError += '<span>- Paese Sigla mancante o erronea. Solo 2 caratteri.</span>';
      }

      if(!luogoNascita || !(parseInt(luogoNascita) > 0)){
        res = false;
        smsError += '<span>- Luogo di nascita mancante.</span>';
      }

      if(!codiceFiscale && !foreignID){
        res = false;
        smsError += '<span>- CodiceFiscale e N° ID Estero vuoti. Almeno uno dei due deve essere valorizzato!</span>';
      }

      if(codiceFiscale && !(codiceFiscale.length >= 11 && codiceFiscale.length <= 16)){
        res = false;
        smsError += '<span>- Attenzione, il Cod. Fiscale deve essere lungo tra 11 e 16 caratteri</span>';
      }

      if(foreignID && !(foreignID.length > 0 && foreignID.length <= 28)){
        res = false;
        smsError += '<span>- Attenzione, il N° ID Estero deve essere lungo tra 1 e 28 caratteri</span>';
      }

      /*if(!swift || swift === ""){
        res = false;
        smsError += '<span>- SWIFT mancante.</span>';
      }*/

      /*if(!iban || iban === ""){
        res = false;
        smsError += '<span>- IBAN mancante.</span>';
      }*/

      if((!(parseInt(idPersonalInfo) > 0 || parseInt(idPersonalInfo) < 0)) && codiceFiscale !== ""){
        var tenant_tmp = new Inquilino();
        tenant_tmp.CodiceFiscale = codiceFiscale;
        tenant_tmp.checkCodiceFiscale(function(checkVal){

          if(checkVal){
            res = false;
            smsError += '<span>- Codice Fiscale esistente.</span>';
          }

          callback(res, smsError);
        });
      }else{
        callback(res, smsError);
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  ui_BookingDetailsPersonalInfo.prototype.setValuesToItem = function(item){
    try {
      var self = this;

      if(!item)
        throw new TypeError('ui_BookingDetailsPersonalInfo - setValuesToItem : item undefined');

      var cognome = this.Cognome.find('input').val();
      var nome = this.Nome.find('input').val();
      var sesso = this.Sesso.find('select').val();
      var dataNascita = this.DataNascita.find('input').val();
      var professione = this.Professione.find('select').val();
      var specializzazione = this.Specializzazione.find('input').val();
      var ente = this.Ente.find('input').val();
      var primaryEmail = this.PrimaryEmail.find('input').val();
      var secondaryEmail = this.SecondaryEmail.find('input').val();
      var telefono = this.Telefono.find('input').val();
      var indirizzo = this.Indirizzo.find('input').val();
      var civico = this.Civico.find('input').val();
      var cap = this.CAP.find('input').val();
      var citta = this.Citta.find('input').val();
      var stato = this.Stato.find('input').val();
      var paese = this.Paese.find('input').val();
      var paese_sigla = this.Paese_Sigla_ISO3166_2.find('input').val();
      var codiceFiscale = this.CodiceFiscale.find('input').val();
      var foreignID = this.ForeignIdentificationNumber.find('input').val();
      var fonte = this.Fonte.find('select').val();
      var lang = this.Lang.find('select').val();
      var intestatarioConto = this.IntestatarioConto.find('input').val();
      var iban = this.IBAN.find('input').val();
      var swift = this.SWIFT.find('input').val();

      item.PersonalInfo.Cognome = (cognome && cognome !== "") ? cognome : null;
      item.PersonalInfo.Nome = (nome && nome !== "") ? nome : null;
      item.PersonalInfo.Sesso = sesso ? sesso : null;
      item.PersonalInfo.DataNascita = (dataNascita && dataNascita !== "") ? dataNascita : null;
      item.PersonalInfo.Professione = professione ? professione : null;
      item.PersonalInfo.Specializzazione = specializzazione ? specializzazione : null;
      item.PersonalInfo.Ente = ente ? ente : null;
      item.PersonalInfo.PrimaryEmail = primaryEmail ? primaryEmail : null;
      item.PersonalInfo.SecondaryEmail = secondaryEmail ? secondaryEmail : null;
      item.PersonalInfo.Telefono = telefono ? telefono : null;
      item.PersonalInfo.Indirizzo = indirizzo ? indirizzo : null;
      item.PersonalInfo.Civico = civico ? civico : null;
      item.PersonalInfo.CAP = cap ? cap : null;
      item.PersonalInfo.Citta = citta ? citta : null;
      item.PersonalInfo.CodiceFiscale = codiceFiscale ? codiceFiscale : null;
      item.PersonalInfo.ForeignIdentificationNumber = foreignID ? foreignID : null;
      item.PersonalInfo.Fonte = fonte ? fonte : 0;
      item.PersonalInfo.Lang = lang ? lang : null;
      item.PersonalInfo.Stato = stato ? stato : null;
      item.PersonalInfo.Paese = paese ? paese : null;
      item.PersonalInfo.Paese_Sigla_ISO3166_2 = paese_sigla ? paese_sigla : null;
      item.PersonalInfo.IBAN = iban ? iban : null;
      item.PersonalInfo.SWIFT = swift ? swift : null;
      item.PersonalInfo.IntestatarioConto = intestatarioConto ? intestatarioConto : null;

    } catch (e) {
      console.log(e.message);
    }
  }

  ui_BookingDetailsPersonalInfo.prototype.setCodiceFiscale = function(){
    try {
      var self = this;

      var cognome = this.Cognome.find('input').val();
      var nome = this.Nome.find('input').val();
      var sesso = this.Sesso.find('select').val();
      var dataNascita = this.DataNascita.find('input').val();
      var luogoNascita = clone.item.PersonalInfo.LuogoNascita;

      var params = {
        Cognome : cognome,
        Nome : nome,
        Sesso : sesso,
        DataNascita : dataNascita,
        LuogoNascita : luogoNascita
      }

      var encd = encodeURIComponent(JSON.stringify(params));

      if(cognome && cognome !== "" && nome && nome !== "" && sesso && sesso !== "none" && dataNascita && dateValidation(dataNascita) && luogoNascita && parseInt(luogoNascita) > 0){
        $.ajax({
            method: "POST",
            url: '?action=getCodiceFiscale',
            data: { data : encd },
        }).done(function(res){
          if(res && res.code){
            self.CodiceFiscale.find('input').val(res.code);
          }else{
            self.CodiceFiscale.find('input').val("");
          }
        }).fail(function(xhr, status, error) {
          DefaultErrorHandler(xhr, status, error);
        });
      }else{
        self.CodiceFiscale.find('input').val("");
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  function ui_BookingDetails_Intestazione(Id ,  IdBookingDetails ,  Nome ,  Cognome ,  RagioneSociale ,  Telefono ,  Indirizzo ,  Civico ,  CAP ,  Citta ,  Stato ,  Paese , Paese_Sigla_ISO3166_2,  CodiceFiscale , ForeignIdentificationNumber,  PartitaIva, CodiceDestinatario, PecDestinatario){
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
    this.Paese_Sigla_ISO3166_2 = Paese_Sigla_ISO3166_2;
    this.CodiceFiscale = CodiceFiscale;
    this.ForeignIdentificationNumber = ForeignIdentificationNumber;
    this.PartitaIva = PartitaIva;
    this.CodiceDestinatario = CodiceDestinatario;
    this.PecDestinatario = PecDestinatario;
  }

  ui_BookingDetails_Intestazione.prototype.init = function(root){
    try {
      var self = this;

      if(!root)
        throw new TypeError("ui_BookingDetails_Intestazione - init : root undefined!");

      this.setSelectors(root);
      this.setListeners(root);

    } catch (e) {
      console.log(e.message);
    }
  }

  ui_BookingDetails_Intestazione.prototype.setSelectors = function(root){
    try {
      var self = this;

      if(!root)
        throw new TypeError("ui_BookingDetails_Intestazione - setSelectors : root undefined!");

      var bookingSection = root.find('.booking-section');
      var bookingAdvanceOptions = root.find('.booking-section .booking-personal-info');

      /*this.Nome = bookingAdvanceOptions.find('.itt_nome_field');
      this.Cognome = bookingAdvanceOptions.find('.itt_cognome_field');*/
      this.RagioneSociale = bookingAdvanceOptions.find('.itt_ragioneSociale_field');
      this.Telefono = bookingAdvanceOptions.find('.itt_telefono_field');
      this.Indirizzo = bookingAdvanceOptions.find('.itt_indirizzo_field');
      this.Civico = bookingAdvanceOptions.find('.itt_civico_field');
      this.CAP = bookingAdvanceOptions.find('.itt_cap_field');
      this.Citta = bookingAdvanceOptions.find('.itt_citta_field');
      this.Stato = bookingAdvanceOptions.find('.itt_stato_field');
      this.Paese = bookingAdvanceOptions.find('.itt_paese_field');
      this.Paese_Sigla_ISO3166_2 = bookingAdvanceOptions.find('.itt_paese_iso_field');
      this.CodiceFiscale = bookingAdvanceOptions.find('.itt_codiceFiscale_field');
      this.ForeignIdentificationNumber = bookingAdvanceOptions.find('.itt_foreign_id_field');
      this.PartitaIva = bookingAdvanceOptions.find('.itt_pIva_field');
      this.CodiceDestinatario = bookingAdvanceOptions.find('.itt_codice_destinatario_field');
      this.PecDestinatario = bookingAdvanceOptions.find('.itt_pec_field');

    } catch (e) {
      console.log(e.message);
    }
  }

  ui_BookingDetails_Intestazione.prototype.setListeners = function(root){
    try {
      var self = this;

      if(!root)
        throw new TypeError("ui_BookingDetails_Intestazione - setListeners : root undefined!");

      var bookingSection = root.find('.booking-section');
      var bookingAdvanceOptions = root.find('.booking-section .booking-personal-info');

      var autoAddress = bookingAdvanceOptions.find('.itt_autoAddress_field');

      // Create the autocomplete object, restricting the search to geographical
      // location types.
      var autocomplete = new google.maps.places.Autocomplete(
          /** @type {!HTMLInputElement} *//*autoAddress.find('input')*/(document.getElementById('itt_autoAddress_field')),
          {types: ['geocode']});

      var componentForm = {
        itt_street_number: 'short_name',
        itt_route: 'long_name',
        itt_locality: 'long_name',
        itt_administrative_area_level_1: 'short_name',
        itt_country: 'long_name',
        itt_postal_code: 'short_name'
      };

      var country_short = {
        itt_country: 'short_name'
      }

      autocomplete.addListener('place_changed', function(){
        // Get the place details from the autocomplete object.
        var place = autocomplete.getPlace();

        for (var component in componentForm) {
          root.find('input#' + component).val('');
          //root.find(component).disabled = false;
        }

        root.find('input#itt_country_iso').val('');

        // Get each component of the address from the place details
        // and fill the corresponding field on the form.
        for (var i = 0; i < place.address_components.length; i++) {
          var addressType = place.address_components[i].types[0];
          if (componentForm['itt_' + addressType]) {
            var value = place.address_components[i][componentForm['itt_' + addressType]];
            root.find('input#itt_' + addressType).val(value);
          }

          if (country_short['itt_' + addressType]) {
            var value = place.address_components[i][country_short['itt_' + addressType]];
            root.find('input#itt_country_iso').val(value);
          }
        }
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  ui_BookingDetails_Intestazione.prototype.checkFields = function(callback){
    try {
      var self = this;
      var smsError = "";
      var res = true;

      if(!callback)
        throw new TypeError('ui_BookingDetails_Intestazione - checkFields : callback undefined');

      if(!clone)
        throw new TypeError('ui_BookingDetails_Intestazione - checkFields : clone undefined');

      if(!clone.item)
        throw new TypeError('ui_BookingDetails_Intestazione - checkFields : clone.item undefined');

      if(!clone.item.Intestazione)
        throw new TypeError('ui_BookingDetails_Intestazione - checkFields : clone.item.Intestazione undefined');

      var intestazione = clone.item.Intestazione;

      var ragioneSociale = this.RagioneSociale.find('input').val();
      var telefono = this.Telefono.find('input').val();
      var indirizzo = this.Indirizzo.find('input').val();
      var civico = this.Civico.find('input').val();
      var cap = this.CAP.find('input').val();
      var citta = this.Citta.find('input').val();
      var stato = this.Stato.find('input').val();
      var paese = this.Paese.find('input').val();
      var paese_sigla = this.Paese_Sigla_ISO3166_2.find('input').val();
      var codiceFiscale = this.CodiceFiscale.find('input').val();
      var foreignID = this.ForeignIdentificationNumber.find('input').val();
      var partitaIva = this.PartitaIva.find('input').val();
      var codice_destinatario = this.CodiceDestinatario.find('input').val();
      var pec_destinatario = this.PecDestinatario.find('input').val();

      if(!intestazione.Id || parseInt(intestazione.Id) === 0){
        var anyFilled = false;

        if(!indirizzo || indirizzo === ""){
          res = false;
          smsError += '<span>- Indirizzo società mancante.</span>';
        }else{
          anyFilled = true;
        }

        if(!civico || civico  === ""){
          res = false;
          smsError += '<span>- Civico società mancante.</span>';
        }else{
          anyFilled = true;
        }

        if(!citta || citta === ""){
          res = false;
          smsError += '<span>- Città società mancante.</span>';
        }else{
          anyFilled = true;
        }

        if(!paese || paese === ""){
          res = false;
          smsError += '<span>- Paese società mancante.</span>';
        }else{
          anyFilled = true;
        }

        if(!paese_sigla || paese_sigla === "" || !(paese_sigla.length === 2)){
          res = false;
          smsError += '<span>- Paese Sigla di Società mancante o erronea. Solo 2 caratteri.</span>';
        }else{
          anyFilled = true;
        }

        if((!codiceFiscale || codiceFiscale === "") && (!partitaIva || partitaIva === "")){
          res = false;
          smsError += '<span>- P.IVA o Cod. Fiscale società mancante.</span>';
        }else{
          anyFilled = true;
        }

        if(codiceFiscale && !(codiceFiscale.length >= 11 && codiceFiscale.length <= 16)){
          res = false;
          smsError += '<span>- Attenzione, il Cod. Fiscale della società deve essere lungo tra 11 e 16 caratteri</span>';
        }

        if(foreignID && !(foreignID.length > 0 && foreignID.length <= 28)){
          res = false;
          smsError += '<span>- Attenzione, il N° ID Estero della società deve essere lungo tra 1 e 28 caratteri</span>';
        }

        if((!codice_destinatario || codice_destinatario === "") && (!pec_destinatario || pec_destinatario === "")){
          res = false;
          smsError += '<span>- Codice o Pec Destinatario mancante.</span>';
        }else{
          anyFilled = true;
        }

        if((!ragioneSociale || ragioneSociale === "") && anyFilled){
          res = false;
          smsError += '<span>- Ragione Sociale mancante.</span>';
        }else if(!anyFilled && (!ragioneSociale || ragioneSociale === "")){
          res = true;
          smsError = "";
        }

      }else if(intestazione.Id && parseInt(intestazione.Id) > 0){

        if(!ragioneSociale || ragioneSociale === ""){
          res = false;
          smsError += '<span>- Ragione Sociale mancante.</span>';
        }

        if(!indirizzo || indirizzo === ""){
          res = false;
          smsError += '<span>- Indirizzo società mancante.</span>';
        }

        if(!civico || civico  === ""){
          res = false;
          smsError += '<span>- Civico società mancante.</span>';
        }

        if(!citta || citta === ""){
          res = false;
          smsError += '<span>- Città società mancante.</span>';
        }

        if(!paese || paese === ""){
          res = false;
          smsError += '<span>- Paese società mancante.</span>';
        }

        if((!codiceFiscale || codiceFiscale === "") && (!partitaIva || partitaIva === "")){
          res = false;
          smsError += '<span>- P.IVA o Cod. Fiscale società mancante.</span>';
        }

        if(codiceFiscale && !(codiceFiscale.length >= 11 && codiceFiscale.length <= 16)){
          res = false;
          smsError += '<span>- Attenzione, il Cod. Fiscale della società deve essere lungo tra 11 e 16 caratteri</span>';
        }

        if(foreignID && !(foreignID.length > 0 && foreignID.length <= 28)){
          res = false;
          smsError += '<span>- Attenzione, il N° ID Estero della società deve essere lungo tra 1 e 28 caratteri</span>';
        }

      }

      callback(res, smsError);

    } catch (e) {
      console.log(e.message);
    }
  }

  ui_BookingDetails_Intestazione.prototype.setValuesToItem = function(item){
    try {
      var self = this;

      if(!item)
        throw new TypeError('ui_BookingDetails_Intestazione - setValuesToItem : item undefined');

      var ragioneSociale = this.RagioneSociale.find('input').val();
      var telefono = this.Telefono.find('input').val();
      var indirizzo = this.Indirizzo.find('input').val();
      var civico = this.Civico.find('input').val();
      var cap = this.CAP.find('input').val();
      var citta = this.Citta.find('input').val();
      var stato = this.Stato.find('input').val();
      var paese = this.Paese.find('input').val();
      var paese_sigla = this.Paese_Sigla_ISO3166_2.find('input').val();
      var codiceFiscale = this.CodiceFiscale.find('input').val();
      var foreignID = this.ForeignIdentificationNumber.find('input').val();
      var partitaIva = this.PartitaIva.find('input').val();
      var codice_destinatario = this.CodiceDestinatario.find('input').val();
      var pec_destinatario = this.PecDestinatario.find('input').val();

      item.Intestazione.RagioneSociale = (ragioneSociale && ragioneSociale !== "") ? ragioneSociale : null;
      item.Intestazione.Telefono = telefono ? telefono : null;
      item.Intestazione.Indirizzo = indirizzo ? indirizzo : null;
      item.Intestazione.Civico = civico ? civico : null;
      item.Intestazione.CAP = cap ? cap : null;
      item.Intestazione.Citta = citta ? citta : null;
      item.Intestazione.Stato = stato ? stato : null;
      item.Intestazione.Paese = paese ? paese : null;
      item.Intestazione.Paese_Sigla_ISO3166_2 = paese_sigla ? paese_sigla : null;
      item.Intestazione.CodiceFiscale = codiceFiscale ? codiceFiscale : null;
      item.Intestazione.ForeignIdentificationNumber = foreignID ? foreignID : null;
      item.Intestazione.PartitaIva = partitaIva ? partitaIva : null;
      item.Intestazione.CodiceDestinatario = codice_destinatario ? codice_destinatario : null;
      item.Intestazione.PecDestinatario = pec_destinatario ? pec_destinatario : null;

    } catch (e) {
      console.log(e.message);
    }
  }

  sec_singleBooking.prototype.init = function(){
    try {
      var self = this;

      if(!this.admin)
        throw new TypeError("sec_singleBooking - init : this.admin undefined");

      if(!this.bookingApp_ui)
        throw new TypeError("sec_singleBooking - init : this.bookingApp_ui undefined");

      var root = this.bookingApp_ui.rootKanbanLists;

      if(this.admin.isAdministrator() || this.admin.isContabile() || this.admin.isAgente()){

        if(this.bookingApp_ui.setSection)
          this.bookingApp_ui.setSection(this.sectionNumber);

        root.empty();

        $('.ms-scrollable-layout').css('background-color', '#F2F6FA');

        clone = this;
        uiBookingDetails = new ui_BookingDetails();
        uiBookingDetailsPersonalInfo = new ui_BookingDetailsPersonalInfo();
        uiBookingDetails_Intestazione = new ui_BookingDetails_Intestazione();

        $('div.ms-scrollable-layout section.kanban-board-render div.kanban-lists').css('margin-top', '50px');

        if(this.item && this.item instanceof Booking_Details && this.item.Id && parseInt(this.item.Id) > 0){
          self.setBookingDetails(root, function(){
            self.setTabs(root);
          });
        }else{
          var personalInfo = this.item.PersonalInfo ? this.item.PersonalInfo : new Booking_PersonalInfo();

          if(!this.item || (this.item && !this.item.Inquilino_Stanza)){
            this.item = new Booking_Details();
          }

          this.item.Intestazione = new BookingDetails_Intestazione();
          this.item.PersonalInfo = personalInfo;
          self.setNewBookingDetails(root, function(){
            self.setTabs(root);
          });
        }
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  sec_singleBooking.prototype.setNewBookingDetails = function(root, callback){
    try {

      if(!root)
        throw new TypeError("single_booking.js - setNewBookingDetails : root undefined");

      if(!callback)
        throw new TypeError("single_booking.js - setNewBookingDetails : callback undefined");

      var self = this;

      root.append('<div class="form-fields field_stanza__autocomplete"><div class="form-fields__title"><span>Scegliere la stanza...</span></div><input class="form-control field_stanza"></div><div class="booking-section"><div class="b-sidebar-layout"></div><div class="b-container-layout"></div></div>');
      var field_stanza = root.find('div.form-fields.field_stanza__autocomplete input');

      root.find('div.form-fields.field_stanza__autocomplete input').focus();

      field_stanza.autocomplete({
        source : function(request, response){
          var getStanze = new Appartamenti_Stanze();
          getStanze.getStanzeDisponibili(request.term, function(data){

            if(getStanze.Appartamento_Stanza && getStanze.Appartamento_Stanza.length > 0){
              var rooms_res = getStanze.Appartamento_Stanza;
              var autocomplete_fields = new Array();
              for (var i = 0; i < rooms_res.length; i++) {
                var room = rooms_res[i];
                var availability = new Date(room.Availability);
                var field = {
                  label : room.getTitle() + ' - ' + availability.ddmmyyyy(),
                  value : room.getTitle(),
                  room : room
                };

                autocomplete_fields.push(field);

              }
              response(autocomplete_fields);
            }


          });

        },
        select : function(e, ui){
          var room = ui.item.room;
          self.item.Stanza = room;
          self.item.IdStanza = room.Id;

          if(self.item.IdInquilinoStanza && parseInt(self.item.IdInquilinoStanza) > 0 && self.item.Inquilino_Stanza && self.item.Inquilino_Stanza instanceof Inquilino_Stanza){
            var block = false;
            var ins = self.item.Inquilino_Stanza;
            var ins_canone = ins.Canone;
            var ins_dataFine = new Date(ins.DataFine);
            var marketPrice = room.getMarketPrice();
            var curdate = new Date();
            var dataInizio = new Date(room.Availability);
            var canoneCheckDisabled = false;
            var isPrevInsTuristico = false;

            if(ins.IdContractDocs && parseInt(ins.IdContractDocs) > 0 && (parseInt(ins.IdContractDocs) === 2 || parseInt(ins.IdContractDocs) === 3)){
              isPrevInsTuristico = true;
            }

            if(isPrevInsTuristico){
              ins_canone -= 100;
            }

            if((ins_dataFine < curdate) || isPrevInsTuristico){
              canoneCheckDisabled = true;
            }

            /*if(ins_canone > marketPrice && !canoneCheckDisabled){
              block = true;
            }*/

            if(!block){
              var instr = $('<div class="booking-instructions" style=" flex-direction: column; flex-wrap: nowrap; justify-content: center; align-items: stretch; align-content: stretch; padding: 30px; background-color: #ffffff; border: 1px solid #cbcbcb; display: flex; "><div style=" display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: flex-start; align-items: center; align-content: center;"><i class="material-icons" style=" color: #ffb500; margin-right: 10px;">warning</i><span style=" font-weight: bold; ">Attenzione :</span></div><div style=" display: flex; flex-direction: column;"><span style=" margin-top: 15px;">- Il canone proposto per questa stanza è quello del prezzo di mercato, ovvero quello presente sul nostro sito. Controllare se il canone coincide con quanto dovuto.</span><span style=" margin-top: 15px;">- La cauzione presente è calcolata in base al canone proposto, ed è la differenza tra la cauzione del contratto precedente e la cauzione dovuta per questo nuovo contratto.</span><span style=" margin-top: 15px;">- <strong>Se il contratto è turistico </strong>, devono essere modificati alcuni importi come il canone e la cauzione. </span></div></div>');

              root.find('.b-container-layout').append(instr.clone());
              self.setStruct_BookingDetails(ui.item.room, root, function(){
                self.setStruct_BookingPersonalInfo(root);
                self.setStruct_SendContract(root);
                callback();
              });
            }else{
              bootbox.alert("Attenzione, non è consentito cambiare una stanza con un prezzo inferiore a quello pagato per la stanza precedente.");
            }

          }else{
            self.setStruct_BookingDetails(ui.item.room, root, function(){
              self.setStruct_BookingPersonalInfo(root);
              self.setStruct_SendContract(root);
              callback();
            });
          }

        }
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  sec_singleBooking.prototype.setBookingDetails = function(root, callback){
    if(!root)
      throw new TypeError("single_booking.js - setBookingDetails : root undefined");

    if(!callback)
      throw new TypeError("single_booking.js - setBookingDetails : callback undefined");

    var self = this;

    root.append('<div class="booking-section"><div class="b-sidebar-layout"></div><div class="b-container-layout"></div></div>');

    var item = this.item;
    var room = item.Stanza;
    this.setStruct_BookingDetails(room, root, function(){
      self.setStruct_BookingPersonalInfo(root);
      self.setStruct_SendContract(root);
      callback();
    });
  }

  sec_singleBooking.prototype.setStruct_BookingDetails = function(room, root, callback){
    try {

      var self = this;

      if(!room)
        throw new TypeError('single_booking.js - setStruct_BookingDetails : room undefined');

      if(!root)
        throw new TypeError('single_booking.js - setStruct_BookingDetails : root undefined');

      var autocomplete_room = root.find('.form-fields.field_stanza__autocomplete');

      var cover_struct_origin = $('<div class="img-container"><picture><img srcset=""></picture><div class="booking-article"><span class="booking-room__price"></span><span class="booking-room__title"></span></div></div>');
      var cover_struct = cover_struct_origin.clone();

      var form_struct = $('<div class="booking-details"><div class="booking-details-form"><div class="booking-details-form__contractType"></div><div class="booking-details-form__row"><div class="booking-details-form__column"><div class="booking-details-form_row-field inizio_field"><span>Inizio Contratto *</span><input type="date"></div><div class="booking-details-form_row-field canone_field"><span>Canone *</span><input type="number"></div><div class="booking-details-form_row-field cauzione_field"><span>Cauzione</span><input type="number"></div><div class="booking-details-form_row-field mthDisc_amount_field" style=" border-top: #15699b 1px solid; margin-top: 15px; padding-top: 10px;"><span>Sconto Mensile</span><input type="number"></div><div class="booking-details-form_row-field partner_field"><span>Origine Contatto</span><select> <option value="0">Seleziona</option><option value="6">MilanoStanze</option> <option value="7">Immobiliare</option> <option value="8">Bakeca</option> <option value="9">Idealista</option> <option value="10">Facebook</option> <option value="1">Uniplaces</option>  <option value="2">Spotahome</option>  <option value="4">HousingAnywhere</option> <option value="5">ZappyRent</option> <option value="11">Kijiji</option> <option value="12">Subito</option> <option value="13">Trovit</option></select></div><div class="booking-details-form_row-btn toggle-btn"><span><i class="material-icons">add_circle</i><div class="toggle-btn__text"> Espandi </div></span></div><div class="booking-details-form_row-field nonContabilizzato_field toggleFields toggleFields_hide"><span>Pagamento Esterno</span><input type="number"></div><div class="booking-details-form_row-field deadline_field toggleFields toggleFields_hide"><span>Scadenza offerta</span><input type="datetime-local"></div></div><div class="booking-details-form__column"><div class="booking-details-form_row-field fine_field"><span>Fine Contratto</span><input type="date"></div><div class="booking-details-form_row-field spese_field"><span>Spese</span><input type="number"></div><div class="booking-details-form_row-field caparra_field"><span>Caparra</span><input type="number"></div><div class="booking-details-form_row-field mthDisc_expiration_field" style=" border-top: #15699b 1px solid; margin-top: 15px; padding-top: 10px;"><span>Scadenza Sconto</span><input type="date"></div></div></div><div class="booking-details-form__row oneOffDiscountRent" style=" background-color: #fff668; color: #13699b; font-weight: bold; display: none;"><span>Sconto estivo di locazione :</span><span class="oneOffDiscountRent_amount"></span></div></div></div>');

      var room_title = room.getTitle();
      var marketPrice = room.getMarketPrice();
      var dataInizio = new Date(room.Availability);

      var room_montlyPrice = new Number(marketPrice);

      room.getCopertinaUrl(function(res){
        if(res){
          var url = '../' + res.Url;
          var coloreBordo = res.ColoreBordo;

          autocomplete_room.toggle();
          cover_struct.find('img').attr('src', url);
          cover_struct.find('span.booking-room__price').append(room_montlyPrice.formatMoney(2) + '€ al mese');
          cover_struct.find('span.booking-room__title').append(room_title);

          root.find('.b-sidebar-layout').append(cover_struct);
          root.find('.b-container-layout').append(form_struct);

          uiBookingDetails.init(root);
          self.setFormVals_BookingDetails(room, root);
          if(callback){
            callback();
          }
        }
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  sec_singleBooking.prototype.setFormVals_BookingDetails = function(room, root){
    try {
      var self = this;

      if(!room)
        throw new TypeError('single_booking.js - setFormVals_BookingDetails : room undefined');

      if(!root)
        throw new TypeError('single_booking.js - setFormVals_BookingDetails : root undefined');

      var item = this.item;//Booking_Details
      var dataInizio = null;
      var dataFine = null;
      var caparra = null;
      var canone = null;
      var spese = null;
      var cauzione = null;
      var importoNonContabilizzato = null;
      var specificaImportoNonContabilizzato = null;
      var statoBooking = null;
      var scadenza = null;
      var note = null;
      var contractType = null;
      var prevIns = (this.item && this.item.Inquilino_Stanza) ? this.item.Inquilino_Stanza : null;
      var curdate = new Date();
      var mthDisc_Amount = null;
      var mthDisc_Expiration = null;

      if(item.Id && parseInt(item.Id) > 0){
        dataInizio = new Date(item.DataInizio);
        caparra = item.Caparra ? new Number(item.Caparra) : 0;
        canone = item.Canone ? new Number(item.Canone) : 0;
        spese = item.Spese ? new Number(item.Spese) : 0;
        cauzione = item.Cauzione ? new Number(item.Cauzione) : 0;
        importoNonContabilizzato = item.ImportoNonContabilizzato ? new Number(item.ImportoNonContabilizzato) : 0;
        mthDisc_Amount = item.MonthlyDiscountAmount ? new Number(item.MonthlyDiscountAmount) : 0;
        mthDisc_Expiration = item.MonthlyDiscountExpiration ? new Date(item.MonthlyDiscountExpiration) : null;
        scadenza = item.Scadenza ? (new Date(item.Scadenza)).getDatetimeLocalFormat() : (new Date()).addHours(48).getDatetimeLocalFormat();
        dataFine = item.DataFine ? new Date(item.DataFine) : null;

        contractType = item.getContractType_txt();

        if(item.OneOffDiscountRent && parseInt(item.OneOffDiscountRent) > 0){
          uiBookingDetails.toggleOneOffDiscountRent(root);
        }

      }else{

        var tmp_bd = new Booking_Details();
        tmp_bd.DataInizio = room.Availability;
        tmp_bd.IdStanza = room.Id;
        dataInizio = new Date(room.Availability);

        var marketPrice = room.getMarketPrice();
        var prezzoDinamico = parseFloat(room.PrezzoDinamico);

        var idPersonalInfo = item.PersonalInfo.Id;

        //Suggest Vals From Room
        caparra = 0;
        canone = new Number(prezzoDinamico);
        spese = new Number(50);
        cauzione = marketPrice*2;
        importoNonContabilizzato = 0;
        scadenza = (new Date()).addHours(48).getDatetimeLocalFormat();
        contractType = "Contratto 4+4 (variabile)";
        mthDisc_Amount = getMthDiscountAmount(canone, marketPrice);

        if(mthDisc_Amount > 0)
          mthDisc_Expiration = covid_discount_expiration;

        if(prevIns && prevIns.Id && parseInt(prevIns.Id) > 0){

          var prevIns_DataFine = new Date(prevIns.DataFine);

          if(prevIns_DataFine > curdate){
            if(cauzione > parseFloat(prevIns.Cauzione)){
              cauzione -= parseFloat(prevIns.Cauzione);
            }else{
              //Ritorno inquilino già uscito.
              //La cauzione rimane canone*3 e IdInquilinoStanza è 0.
              self.item.IdInquilinoStanza = 0;
            }
          }
        }
      }

      uiBookingDetails.canone.find('input').val(canone);
      uiBookingDetails.spese.find('input').val(spese);
      uiBookingDetails.cauzione.find('input').val(cauzione);
      uiBookingDetails.dataInizio.find('input').val(dataInizio.yyyymmdd());
      uiBookingDetails.caparra.find('input').val(caparra);
      uiBookingDetails.monthlyDiscountAmount.find('input').val(mthDisc_Amount);

      if(mthDisc_Expiration)
        uiBookingDetails.monthlyDiscountExpiration.find('input').val(mthDisc_Expiration.yyyymmdd());
      
      uiBookingDetails.importoNonContabilizzato.find('input').val(importoNonContabilizzato);
      uiBookingDetails.scadenza.find('input').val(scadenza);
      uiBookingDetails.contractType.html(contractType);


      if(dataFine)
        uiBookingDetails.dataFine.find('input').val(dataFine.yyyymmdd());

    } catch (e) {
      console.log(e.message);
    }
  }

  sec_singleBooking.prototype.setFormVals_PersonalInfo = function(){
    try {

      var item = this.item;
      var info = item.PersonalInfo;

      var cognome = info.Cognome ? info.Cognome : null;
      var nome = info.Nome ? info.Nome : null;
      var sesso = info.Sesso ? info.Sesso : null;
      var dataNascita = info.DataNascita ? new Date(info.DataNascita) : null ;
      var professione = info.Professione ? info.Professione : null ;
      var specializzazione = info.Specializzazione ? info.Specializzazione : null ;
      var ente = info.Ente ? info.Ente : null ;
      var primaryEmail = info.PrimaryEmail ? info.PrimaryEmail : null;
      var secondaryEmail = info.SecondaryEmail ? info.SecondaryEmail : null;
      var telefono = info.Telefono ? info.Telefono : null ;
      var indirizzo = info.Indirizzo ? info.Indirizzo : null ;
      var civico = info.Civico ? info.Civico : null ;
      var cap = info.CAP ? info.CAP : null;
      var citta = info.Citta ? info.Citta : null;
      var stato = info.Stato ? info.Stato : null;
      var paese = info.Paese ? info.Paese : null;
      var paese_sigla = info.Paese_Sigla_ISO3166_2 ? info.Paese_Sigla_ISO3166_2 : null;
      var luogoNascita = info.LuogoNascitaText ? info.LuogoNascitaText : null;
      var fonte = info.Fonte ? info.Fonte : null;
      var lang = info.Lang ? info.Lang : null;
      var codiceFiscale = info.CodiceFiscale ? info.CodiceFiscale : null;
      var foreignID = info.ForeignIdentificationNumber ? info.ForeignIdentificationNumber : null;
      var intestatarioConto = info.IntestatarioConto ? info.IntestatarioConto : null;
      var iban = info.IBAN ? info.IBAN : null;
      var swift = info.SWIFT ? info.SWIFT : null;

      if(cognome)
        uiBookingDetailsPersonalInfo.Cognome.find('input').val(cognome);

      if(nome)
        uiBookingDetailsPersonalInfo.Nome.find('input').val(nome);

      if(sesso)
        uiBookingDetailsPersonalInfo.Sesso.find('select').val(sesso);

      if(lang)
        uiBookingDetailsPersonalInfo.Lang.find('select').val(lang);

      if(fonte)
        uiBookingDetailsPersonalInfo.Fonte.find('select').val(fonte);

      if(professione)
        uiBookingDetailsPersonalInfo.Professione.find('select').val(professione);

      if(specializzazione)
        uiBookingDetailsPersonalInfo.Specializzazione.find('input').val(specializzazione);

      if(dataNascita)
        uiBookingDetailsPersonalInfo.DataNascita.find('input').val(dataNascita.yyyymmdd());

      if(ente)
        uiBookingDetailsPersonalInfo.Ente.find('input').val(ente);

      if(primaryEmail)
        uiBookingDetailsPersonalInfo.PrimaryEmail.find('input').val(primaryEmail);

      if(secondaryEmail)
        uiBookingDetailsPersonalInfo.SecondaryEmail.find('input').val(secondaryEmail);

      if(telefono)
        uiBookingDetailsPersonalInfo.Telefono.find('input').val(telefono);

      if(indirizzo)
        uiBookingDetailsPersonalInfo.Indirizzo.find('input').val(indirizzo);

      if(civico)
      uiBookingDetailsPersonalInfo.Civico.find('input').val(civico);

      if(cap)
      uiBookingDetailsPersonalInfo.CAP.find('input').val(cap);

      if(citta)
      uiBookingDetailsPersonalInfo.Citta.find('input').val(citta);

      if(stato)
      uiBookingDetailsPersonalInfo.Stato.find('input').val(stato);

      if(paese)
      uiBookingDetailsPersonalInfo.Paese.find('input').val(paese);

      if(paese_sigla)
      uiBookingDetailsPersonalInfo.Paese_Sigla_ISO3166_2.find('input').val(paese_sigla);

      if(luogoNascita)
      uiBookingDetailsPersonalInfo.LuogoNascita.find('input').val(luogoNascita);

      if(codiceFiscale)
      uiBookingDetailsPersonalInfo.CodiceFiscale.find('input').val(codiceFiscale);

      if(foreignID)
      uiBookingDetailsPersonalInfo.ForeignIdentificationNumber.find('input').val(foreignID);

      if(intestatarioConto)
      uiBookingDetailsPersonalInfo.IntestatarioConto.find('input').val(intestatarioConto);

      if(iban)
      uiBookingDetailsPersonalInfo.IBAN.find('input').val(iban);

      if(swift)
      uiBookingDetailsPersonalInfo.SWIFT.find('input').val(swift);


    } catch (e) {
      console.log(e.message);
    }
  }

  sec_singleBooking.prototype.setFormVals_Intestazione = function(){
    try {
      var item = this.item;
      var intestazione = item.Intestazione;

      var ragioneSociale = intestazione.RagioneSociale ? intestazione.RagioneSociale : null;
      var telefono = intestazione.Telefono ? intestazione.Telefono : null;
      var indirizzo = intestazione.Indirizzo ? intestazione.Indirizzo : null;
      var civico = intestazione.Civico ? intestazione.Civico : null;
      var cap = intestazione.CAP ? intestazione.CAP : null;
      var citta = intestazione.Citta ? intestazione.Citta : null;
      var stato = intestazione.Stato ? intestazione.Stato : null;
      var paese = intestazione.Paese ? intestazione.Paese : null;
      var codiceFiscale = intestazione.CodiceFiscale ? intestazione.CodiceFiscale : null;
      var foreignID = intestazione.ForeignIdentificationNumber ? intestazione.ForeignIdentificationNumber : null;
      var partitaIva = intestazione.PartitaIva ? intestazione.PartitaIva : null;
      var codice_destinatario = intestazione.CodiceDestinatario ? intestazione.CodiceDestinatario : null;
      var pec_destinatario = intestazione.PecDestinatario ? intestazione.PecDestinatario : null;

      if(ragioneSociale)
        uiBookingDetails_Intestazione.RagioneSociale.find('input').val(ragioneSociale);

      if(telefono)
        uiBookingDetails_Intestazione.Telefono.find('input').val(telefono);

      if(indirizzo)
        uiBookingDetails_Intestazione.Indirizzo.find('input').val(indirizzo);

      if(civico)
        uiBookingDetails_Intestazione.Civico.find('input').val(civico);

      if(cap)
        uiBookingDetails_Intestazione.CAP.find('input').val(cap);

      if(citta)
        uiBookingDetails_Intestazione.Citta.find('input').val(citta);

      if(stato)
        uiBookingDetails_Intestazione.Stato.find('input').val(stato);

      if(paese)
        uiBookingDetails_Intestazione.Paese.find('input').val(paese);

      if(codiceFiscale)
        uiBookingDetails_Intestazione.CodiceFiscale.find('input').val(codiceFiscale);

      if(foreignID)
        uiBookingDetails_Intestazione.ForeignIdentificationNumber.find('input').val(foreignID);

      if(partitaIva)
        uiBookingDetails_Intestazione.PartitaIva.find('input').val(partitaIva);

      if(codice_destinatario)
        uiBookingDetails_Intestazione.CodiceDestinatario.find('input').val(codice_destinatario);

      if(pec_destinatario)
        uiBookingDetails_Intestazione.PecDestinatario.find('input').val(pec_destinatario);

    } catch (e) {
      console.log(e.message);
    }
  }

  sec_singleBooking.prototype.setStruct_BookingPersonalInfo = function(root){
    try {
      var self = this;

      if(!root)
        throw new TypeError('sec_singleBooking - setStruct_BookingPersonalInfo : root undefined');

      var form_struct = $('<div class="booking-personal-info"><div class="booking-personal-info_tab-row"><div class="booking-personal-info_tab-row__btn">Dettagli personali</div><div class="booking-personal-info_tab-row__btn">Avanzate</div></div><div class="booking-personal-info__body"><div class="booking-personal-info__row double-direction"><div class="booking-personal-info__column"><div class="booking-personal-info_row-field nome_field"><span>Nome *</span><input></div></div><div class="booking-personal-info__column"><div class="booking-personal-info_row-field cognome_field"><span>Cognome *</span><input type="text"></div></div></div><div class="booking-personal-info__row"><div class="booking-personal-info__column"><div class="booking-personal-info_row-field sesso_field"><span>Sesso *</span><select> <option value="none">Seleziona</option><option value="M">Maschio</option> <option value="F">Femmina</option> </select></div><div class="booking-personal-info_row-field professione_field"><span>Professione *</span><select> <option value="0">Seleziona</option><option value="1">Studente</option> <option value="2">Lavoratore</option> </select></div><div class="booking-personal-info_row-field specializzazione_field"><span>Specializzazione</span><input type="text"></div></div><div class="booking-personal-info__column"><div class="booking-personal-info_row-field nascita_field"><span>Data di Nascita *</span><input type="date"></div><div class="booking-personal-info_row-field lingua_field"><span>Lingua *</span><select> <option value="it">Italiano</option> <option value="en">Inglese</option> </select></div><div class="booking-personal-info_row-field ente_field"><span>Ente *</span><input type="text"></div></div></div><div class="booking-personal-info__column"><div class="booking-personal-info_row-field primary_email_field"><span>Email *</span><input type="text"></div></div><div class="booking-personal-info__column"><div class="booking-personal-info_row-field secondary_email_field"><span>Email Secondaria</span><input type="text"></div></div><div class="booking-personal-info__row"><div class="booking-details-form__column"><div class="booking-personal-info_row-field telefono_field"><span>Telefono *</span><input type="text"></div></div></div><div class="booking-personal-info__column"><div class="booking-personal-info_row-field autoAddress_field"><span style=" font-weight: bold;">Ricerca Indirizzo</span><input id="autoAddress_field" type="text" style=" border: 1px solid #226b9e;"></div></div><div class="booking-personal-info__row"><div class="booking-personal-info__column"><div class="booking-personal-info_row-field indirizzo_field"><span>Indirizzo *</span><input id="route" type="text"></div><div class="booking-personal-info_row-field citta_field"><span>Città *</span><input id="locality" type="text"></div><div class="booking-personal-info_row-field stato_field"><span>Regione/Stato *</span><input id="administrative_area_level_1" type="text"></div><div class="booking-personal-info_row-field paese_sigla_field"><span>Paese Sigla *</span><input id="country_iso" type="text"></div><div class="booking-personal-info_row-field codiceFiscale_field"><span>Codice Fiscale</span><input type="text"></div></div><div class="booking-personal-info__column"><div class="booking-personal-info_row-field civico_field"><span>Civico *</span><input id="street_number" type="text"></div><div class="booking-personal-info_row-field cap_field"><span>CAP</span><input id="postal_code" type="text"></div><div class="booking-personal-info_row-field paese_field"><span>Paese *</span><input id="country" type="text"></div><div class="booking-personal-info_row-field luogoNascita_field"><span>Luogo di nascita *</span><input type="text" class="ui-autocomplete-input" autocomplete="off"></div></div></div><div class="booking-personal-info__row double-direction"><div class="booking-personal-info__column"><div class="booking-personal-info_row-field iban_field"><span>IBAN</span><input></div></div><div class="booking-personal-info__column"><div class="booking-personal-info_row-field swift_field"><span>SWIFT</span><input type="text"></div></div></div><div class="booking-personal-info__column"><div class="booking-personal-info_btn toggle-btn"><span><i class="material-icons">add_circle</i><div class="toggle-btn__text"> Espandi </div></span></div></div><div class="booking-personal-info__column toggleFields toggleFields_hide"><div class="booking-personal-info_row-field intestatarioConto_field"><span>Intestatario Conto (solo s&#8217;è diverso dal conduttore)</span><input type="text"></div><div class="booking-personal-info__row double-direction"><div class="booking-personal-info__column"><div class="booking-personal-info_row-field foreign_id_field"><span>N° ID Estero</span><input type="text"></div></div><div class="booking-personal-info__column" style=" display: none;"><div class="booking-personal-info_row-field"><span></span><input type="text"></div></div></div></div></div><div class="booking-intestazione-info__body"><span style="font-weight: bold;border-bottom: solid 1px;margin-bottom: 15px;">Il contratto è intestato a società?</span><div class="booking-personal-info__row double-direction"><div class="booking-personal-info__column"><div class="booking-personal-info_row-field itt_nome_field" style=" display: none;"><span>Nome</span><input></div></div><div class="booking-personal-info__column"><div class="booking-personal-info_row-field itt_cognome_field" style=" display: none;"><span>Cognome</span><input type="text"></div></div></div><div class="booking-personal-info__row double-direction"><div class="booking-personal-info__column"><div class="booking-personal-info_row-field itt_ragioneSociale_field"><span>Ragione Sociale *</span><input></div><div class="booking-personal-info_row-field itt_codice_destinatario_field"><span>Codice Destinatario</span><input></div></div><div class="booking-details-form__column"><div class="booking-personal-info_row-field itt_pIva_field"><span>P. IVA</span><input type="text"></div><div class="booking-personal-info_row-field itt_pec_field"><span>PEC Destinatario</span><input></div></div></div><div class="booking-personal-info__row double-direction"><div class="booking-personal-info__column"><div class="booking-personal-info_row-field itt_codiceFiscale_field"><span>Codice Fiscale</span><input type="text"></div><div class="booking-personal-info_row-field itt_foreign_id_field"><span>N° ID Estero</span><input type="text"></div></div><div class="booking-personal-info__column"><div class="booking-personal-info_row-field itt_telefono_field"><span>Telefono</span><input type="text"></div></div></div><div class="booking-personal-info__column"><div class="booking-personal-info_row-field itt_autoAddress_field"><span style=" font-weight: bold;">Ricerca Indirizzo</span><input id="itt_autoAddress_field" type="text" style=" border: 1px solid #226b9e;" placeholder="Inserisci una posizione" autocomplete="off"></div></div><div class="booking-personal-info__row"><div class="booking-personal-info__column"><div class="booking-personal-info_row-field itt_indirizzo_field"><span>Indirizzo *</span><input id="itt_route" type="text"></div><div class="booking-personal-info_row-field itt_citta_field"><span>Città *</span><input id="itt_locality" type="text"></div><div class="booking-personal-info_row-field itt_stato_field"><span>Regione/Stato *</span><input id="itt_administrative_area_level_1" type="text"></div><div class="booking-personal-info_row-field itt_paese_iso_field"><span>Paese Sigla *</span><input id="itt_country_iso" type="text"></div><div class="booking-personal-info_row-field itt_luogoNascita_field" style=" display: none;"><span>Luogo di nascita</span><input type="text"></div></div><div class="booking-personal-info__column"><div class="booking-personal-info_row-field itt_civico_field"><span>Civico *</span><input id="itt_street_number" type="text"></div><div class="booking-personal-info_row-field itt_cap_field"><span>CAP</span><input id="itt_postal_code" type="text"></div><div class="booking-personal-info_row-field itt_paese_field"><span>Paese *</span><input id="itt_country" type="text"></div></div></div></div></div>');



      var container = root.find('.b-container-layout');
      container.append(form_struct);

      uiBookingDetailsPersonalInfo.init(root);
      uiBookingDetails_Intestazione.init(root);
      if(this.item && (parseInt(this.item.Id) > 0 || (this.item.PersonalInfo && (parseInt(this.item.PersonalInfo.Id) > 0 || parseInt(this.item.PersonalInfo.Id) === -1)))){
        this.setFormVals_PersonalInfo();
      }

      if(this.item && (parseInt(this.item.Id) > 0 || (this.item.Intestazione && parseInt(this.item.Intestazione.Id) > 0))){
        this.setFormVals_Intestazione();
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  sec_singleBooking.prototype.setStruct_SendContract = function(root){
    try {
      var self = this;

      if(!root)
        throw new TypeError('sec_singleBooking - setStruct_SendContract : root undefined!');

      if(!this.item || !(this.item instanceof Booking_Details))
        throw new TypeError('sec_singleBooking - setStruct_SendContract : this.item undefined!');

      var container = root.find('.b-container-layout');
      var item = this.item;
      var admin = this.admin;

      var struct = $('<div class="send-section"><div class="btn-actions preview-section_btn"><i class="material-icons">find_in_page</i><p style=" margin-bottom: 0px; margin-left: 10px;">Anteprima</p></div><div class="btn-actions save-section_btn">Salva per dopo</div><div class="btn-actions send-section_btn">Inviare il contratto</div></div><div class="alert-actions-section"><div class="btn-actions alert-actions_confirm"><i class="material-icons">done</i><p style=" margin-bottom: 0px; margin-left: 10px;">Confermo</p></div><div class="btn-actions alert-actions_back"><i class="material-icons">keyboard_backspace</i><p style=" margin-bottom: 0px; margin-left: 10px;">Indietro</p></div></div>');

      if(item.Id && parseInt(item.Id) > 0){
        struct = $('<div class="send-section"><div class="btn-actions preview-section_btn"><i class="material-icons">find_in_page</i><p style=" margin-bottom: 0px; margin-left: 10px;">Anteprima</p></div><div class="btn-actions save-section_btn">Salva</div><div class="btn-actions send-section_btn">Salva e invia</div></div><div class="alert-actions-section"><div class="btn-actions alert-actions_confirm"><i class="material-icons">done</i><p style=" margin-bottom: 0px; margin-left: 10px;">Confermo</p></div><div class="btn-actions alert-actions_back"><i class="material-icons">keyboard_backspace</i><p style=" margin-bottom: 0px; margin-left: 10px;">Indietro</p></div></div>');
      }

      var error_struct = $('<div class="error-message"><div class="error-message_title"><i class="material-icons">error</i>Errori riscontrati :</div><div class="error-message_errors"></div></div>');

      var alert_struct = $('<div class="alert-message"><div class="alert-message_title"><i class="material-icons">warning</i>Attenzione, si prega di controllare e confermare :</div><div class="alert-message_errors"></div></div>');

      container.append(error_struct);
      container.append(alert_struct);
      container.append(struct);

      var btn = container.find('.send-section .send-section_btn');
      var btn_saveOnly = container.find('.send-section .save-section_btn');
      var btn_openPdf = container.find('.send-section .preview-section_btn');
      var btn_alertConfirm = container.find('.alert-actions-section .alert-actions_confirm');
      var btn_alertBack = container.find('.alert-actions-section .alert-actions_back');

      btn.click(function(event){
        sendContract(false, function(){
          btn_alertConfirm.click(function(e){
            sendAlertReport(admin, container.find('.alert-message').html(), item.Id);
            sendContract(true);
          });

          btn_alertBack.click(function(e){
            resetDefaultView();
          });
        });
      });

      btn_saveOnly.click(function(event){
        saveContract(false, function(){
          btn_alertConfirm.click(function(e){
            sendAlertReport(admin, container.find('.alert-message').html(), item.Id);
            saveContract(true);
          });

          btn_alertBack.click(function(e){
            resetDefaultView();
          });
        });
      });

      btn_openPdf.click(function(event){
        contractPreview(false, function(){
          btn_alertConfirm.click(function(e){
            sendAlertReport(admin, container.find('.alert-message').html(), item.Id);
            contractPreview(true);
          });

          btn_alertBack.click(function(e){
            resetDefaultView();
          });
        });
      });

      function sendContract(checkStatus, callback){
        btn.html('Controllo campi in corso...');
        resetDefaultView();
        uiBookingDetails.checkFields(function(res1, smsError1, alert1, smsAlert1){
          uiBookingDetailsPersonalInfo.checkFields(function(res2, smsError2){
            uiBookingDetails_Intestazione.checkFields(function(res3, smsError3){

              var anyError = (!res1 || !res2 || !res3 || (!alert1 && !checkStatus)) ? false : true;

              if(anyError){

                //Assegnazione valori a item.
                uiBookingDetails.setValuesToItem(self.item);
                uiBookingDetailsPersonalInfo.setValuesToItem(self.item);
                uiBookingDetails_Intestazione.setValuesToItem(self.item);

                //Salvataggio del booking.
                btn.html('Salvataggio del booking...');
                item.SaveRelationship(function(success){
                  if(!success){
                    btn.html('Inviare il contratto');
                    bootbox.alert("Errore durante il salvataggio dei dati. Richiedere supporto tecnico.");
                    sendBugReport(admin, "single_booking.js : Errore durante il salvataggio dei dati</br> ");
                  }else{
                    //Invio del contratto.
                    btn.html('Invio del contratto in corso...');
                    item.SendContract(function(res){
                      if(!res){
                        bootbox.alert("Errore durante l'invio del contratto. Richiedere supporto tecnico.");
                        sendBugReport(admin, "single_booking.js : Errore durante il salvataggio dei dati</br> ");
                        btn.html('Inviare il contratto');
                      }else if(typeof bookingApp_ui === 'function'){
                        //nextAction
                        btn.html('Okay. Inviato!');
                        var secREQs = new sec_requests();
                        secREQs.admin = admin;
                        secREQs.bookingApp_ui = self.bookingApp_ui;
                        secREQs.init();
                      }else{
                        window.location.href = "./booking.php";
                      }
                    });
                  }
                });

              }else{

                if(smsError1 || smsError2 || smsError3){
                  root.find('.error-message').css('display', 'flex');
                }

                if(smsError1){
                  root.find('.error-message .error-message_errors').append(smsError1);
                }

                if(smsError2){
                  root.find('.error-message .error-message_errors').append(smsError2);
                }

                if(smsError3){
                  root.find('.error-message .error-message_errors').append(smsError3);
                }

                if(smsAlert1 && res1 && res2 && res3){
                  root.find('.alert-message').css('display', 'flex');
                  root.find('.send-section').css('display', 'none');
                  root.find('.booking-details').css('display', 'none');
                  root.find('.booking-personal-info').css('display', 'none');
                  root.find('.alert-message .alert-message_errors').append(smsAlert1);
                  root.find('.alert-actions-section').css('display', 'flex');
                }

                btn.html('Inviare il contratto');

                if(callback){
                  callback();
                }

              }
            });
          });
        });
      }

      function saveContract(checkStatus, callback){
        btn_saveOnly.html('Controllo campi in corso...');
        resetDefaultView();
        uiBookingDetails.checkFields(function(res1, smsError1, alert1, smsAlert1){
          uiBookingDetailsPersonalInfo.checkFields(function(res2, smsError2){
            uiBookingDetails_Intestazione.checkFields(function(res3, smsError3){
              var anyError = (!res1 || !res2 || !res3 || (!alert1 && !checkStatus)) ? false : true;

              if(anyError){

                //Assegnazione valori a item.
                uiBookingDetails.setValuesToItem(self.item);
                uiBookingDetailsPersonalInfo.setValuesToItem(self.item);
                uiBookingDetails_Intestazione.setValuesToItem(self.item);

                //Salvataggio del booking.
                btn_saveOnly.html('Salvataggio del booking...');
                item.SaveRelationship(function(success){
                  if(!success){
                    btn_saveOnly.html('Salva');
                    bootbox.alert("Errore durante il salvataggio dei dati. Richiedere supporto tecnico.");
                    sendBugReport(admin, "single_booking.js : Errore durante il salvataggio dei dati</br> ");
                  }else if(typeof bookingApp_ui === 'function'){
                    //nextAction
                    btn_saveOnly.html('Okay. Salvato!');
                    var secREQs = new sec_requests();
                    secREQs.admin = admin;
                    secREQs.bookingApp_ui = self.bookingApp_ui;
                    secREQs.init();
                  }else{
                    window.location.href = "./booking.php";
                  }
                });

              }else{

                if(smsError1 || smsError2 || smsError3){
                  root.find('.error-message').css('display', 'flex');
                }

                if(smsError1){
                  root.find('.error-message .error-message_errors').append(smsError1);
                }

                if(smsError2){
                  root.find('.error-message .error-message_errors').append(smsError2);
                }

                if(smsError3){
                  root.find('.error-message .error-message_errors').append(smsError3);
                }

                if(smsAlert1 && res1 && res2 && res3){
                  root.find('.alert-message').css('display', 'flex');
                  root.find('.send-section').css('display', 'none');
                  root.find('.booking-details').css('display', 'none');
                  root.find('.booking-personal-info').css('display', 'none');
                  root.find('.alert-message .alert-message_errors').append(smsAlert1);
                  root.find('.alert-actions-section').css('display', 'flex');
                }

                btn_saveOnly.html('Salva');

                if(callback){
                  callback();
                }

              }
            });
          });
        });
      }

      function contractPreview(checkStatus, callback){
        btn_openPdf.html('Controllo campi in corso...');
        resetDefaultView();
        uiBookingDetails.checkFields(function(res1, smsError1, alert1, smsAlert1){
          uiBookingDetailsPersonalInfo.checkFields(function(res2, smsError2){
            uiBookingDetails_Intestazione.checkFields(function(res3, smsError3){

              var anyError =(!res1 || !res2 || !res3 || (!alert1 && !checkStatus)) ? false : true;

              if(anyError){

                //Assegnazione valori a item.
                uiBookingDetails.setValuesToItem(self.item);
                uiBookingDetailsPersonalInfo.setValuesToItem(self.item);
                uiBookingDetails_Intestazione.setValuesToItem(self.item);

                //Salvataggio del booking.
                btn_openPdf.html('Salvataggio del booking...');
                item.SaveRelationship(function(success){
                  if(!success){
                    btn_openPdf.html('Anteprima');
                    bootbox.alert("Errore durante il salvataggio dei dati. Richiedere supporto tecnico.");
                    sendBugReport(admin, "single_booking.js : Errore durante il salvataggio dei dati</br> ");
                  }else{
                    btn_openPdf.html('Apertura in corso...');
                    item.ContractPreview(function(isOpen){
                      if(isOpen){
                        btn_openPdf.html('Anteprima');
                      }else{
                        btn_openPdf.html('Anteprima');
                        bootbox.alert("Errore durante l'apertura del contratto. Richiedere supporto tecnico.");
                        sendBugReport(admin, "single_booking.js : Errore durante l'apertura del contratto.</br> ");
                      }
                    });
                  }
                });

              }else{

                if(smsError1 || smsError2 || smsError3){
                  root.find('.error-message').css('display', 'flex');
                }

                if(smsError1){
                  root.find('.error-message .error-message_errors').append(smsError1);
                }

                if(smsError2){
                  root.find('.error-message .error-message_errors').append(smsError2);
                }

                if(smsError3){
                  root.find('.error-message .error-message_errors').append(smsError3);
                }

                if(smsAlert1 && res1 && res2 && res3){
                  root.find('.alert-message').css('display', 'flex');
                  root.find('.send-section').css('display', 'none');
                  root.find('.booking-details').css('display', 'none');
                  root.find('.booking-personal-info').css('display', 'none');
                  root.find('.alert-message .alert-message_errors').append(smsAlert1);
                  root.find('.alert-actions-section').css('display', 'flex');
                }

                btn_openPdf.html('Anteprima');

                if(callback){
                  callback();
                }

              }
            });
          });
        });
      }

      function resetDefaultView(){
        root.find('.booking-details').css('display', 'flex');
        root.find('.booking-personal-info').css('display', 'flex');
        root.find('.alert-message').css('display', 'none');
        root.find('.alert-actions-section').css('display', 'none');
        root.find('.send-section').css('display', 'flex');
        root.find('.error-message .error-message_errors').html("");
        root.find('.alert-message .alert-message_errors').html("");
        root.find('.error-message').css('display', 'none');
        root.find('.alert-actions-section .alert-actions_confirm').off();
        root.find('.alert-actions-section .alert-actions_back').off();
      }

      function sendBugReport(admin, txt){
        var test = false;

        if(txt && admin && !test){
          var username = (admin && admin.Username) ? admin.Username : "";
          var report = new Mail();
          report.setReport(txt + username, "#report : Errore riscontrato su Booking Application");
          report.Send();
        }
      }

      function sendAlertReport(admin, txt, id){
        var test = false;

        if(txt && admin && !test && id){
          var username = (admin && admin.Username) ? admin.Username : "";
          username += '<span><br/>Booking ID #' + id + '</span>'
          var report = new Mail();
          report.setReport(txt + username, "#alertBooking : some exceptions have been applied.");
          report.Send();
        }
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  sec_singleBooking.prototype.setTabs = function(root){
    try {
      var self = this;

      if(!root)
        throw new TypeError('sec_singleBooking - setTabs : root undefined!');

      var rootTab = root.find('.booking-section .b-container-layout .booking-personal-info');
      var active_color = "#14699b";
      var inactive_color = "#6998bb";

      var tabs = new Array();

      var tab1 = {
        id : 1,
        btn_source : ".booking-personal-info_tab-row > div:nth-child(1)",
        body_source : ".booking-personal-info__body"
      }

      var tab2 = {
        id : 2,
        btn_source : ".booking-personal-info_tab-row > div:nth-child(2)",
        body_source : ".booking-intestazione-info__body"
      }

      tabs.push(tab1, tab2);

      //SET DEFAULT TAB
      setTabActiveStatus(tab1);

      //LISTENERS
      each(tabs, function(key, tab, index){
        root.find(tab.btn_source).click(function(){
          setTabActiveStatus(tab);
        });
      });

      function setTabActiveStatus(tab){

        try {
          if(!tab)
            throw new TypeError('sec_singleBooking - setTabs - setTabColorStatus : tab undefined');

          each(tabs, function(key, loopTab, index){
            if(loopTab.id !== tab.id){
              root.find(loopTab.btn_source).css('background-color', inactive_color);
              root.find(loopTab.body_source).css('display', 'none');
            }

            if(loopTab.id === tab.id){
              root.find(loopTab.btn_source).css('background-color', active_color);
              root.find(loopTab.body_source).css('display', 'unset');
            }

          });

        } catch (e2) {
          console.log(e2.message);
        }

      }


    } catch (e) {
      console.log(e.message);
    }
  }

  function validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }

  function checkStay(dataInizio, dataFine){
    var res = false;

    var checkIn = new Date(dataInizio);
    var checkOut = new Date(dataFine);

    if(checkIn < checkOut){
      res = true;
    }

    return res;
  }

  function getMthDiscountAmount(PrezzoDinamico, marketPrice) {
    /** Task ID : #ce9n19 **/

    var mthDiscount = 0;

    if(PrezzoDinamico && marketPrice && PrezzoDinamico > marketPrice){
      mthDiscount = PrezzoDinamico - marketPrice;
    }

    return mthDiscount;
  }

})();
