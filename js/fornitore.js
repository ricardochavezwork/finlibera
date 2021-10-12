function fornitore_ui(rootPanel, term, nextAction, prevAction){
    this.rootPanel = rootPanel;
    this.term = term;
    this.nextAction = nextAction;
    this.prevAction = prevAction;
}

(function(){

  var structure  = '<div class="ms-row-list" style=" background: transparent; "><h2 style="color: #696f7a;font-size: 18px;font-weight: 600;">Compilazione Anagrafe Nuovo Fornitore</h2></div><div class="divider"></div><div class="ms-row-list" style=" background: transparent; "><div class="ms-row-struct ragioneSociale" style=" width: 45%; "><div class="ms-row-content_row-color"></div><div class="ms-row-content_row-content"><div class="ms-row-content_row-content_top-row"><div class="ms-row-content_row-content_top-row-left">Ragione Sociale</div><div class="ms-row-content_row-content_top-row-right"></div></div><div class="ms-row-content_row-content_bottom-row"><div class="ms-row-content_row-content_bottom-row_left"><input type="text" class="tm-search-box__input ax-add-tag-textfield" placeholder="..." value=""></div><div class="ms-row-content_row-content_bottom-row_right"></div></div></div></div></div><div class="ms-row-list" style=" background: transparent; "><div class="ms-row-struct partitaIva" style=" width: 45%; "><div class="ms-row-content_row-color" style="/* background: rgb(139, 195, 74); */"></div><div class="ms-row-content_row-content"><div class="ms-row-content_row-content_top-row"><div class="ms-row-content_row-content_top-row-left">Partita Iva</div><div class="ms-row-content_row-content_top-row-right"></div></div><div class="ms-row-content_row-content_bottom-row"><div class="ms-row-content_row-content_bottom-row_left"><input type="text" class="tm-search-box__input ax-add-tag-textfield" placeholder="..." value=""></div><div class="ms-row-content_row-content_bottom-row_right"></div></div></div></div><div class="ms-row-struct codiceFiscale" style=" width: 45%; "><div class="ms-row-content_row-color" style="/* background: rgb(139, 195, 74); */"></div><div class="ms-row-content_row-content"><div class="ms-row-content_row-content_top-row"><div class="ms-row-content_row-content_top-row-left">Codice Fiscale</div><div class="ms-row-content_row-content_top-row-right"></div></div><div class="ms-row-content_row-content_bottom-row"><div class="ms-row-content_row-content_bottom-row_left"><input type="text" class="tm-search-box__input ax-add-tag-textfield" placeholder="..." value=""></div><div class="ms-row-content_row-content_bottom-row_right"></div></div></div></div></div><div class="ms-row-list" style=" background: transparent; "><div class="ms-row-struct ricercaIndirizzo" style=" width: 100%; "><div class="ms-row-content_row-color" style="/* background: rgb(139, 195, 74); */"></div><div class="ms-row-content_row-content"><div class="ms-row-content_row-content_top-row"><div class="ms-row-content_row-content_top-row-left">Ricerca Indirizzo</div><div class="ms-row-content_row-content_top-row-right"></div></div><div class="ms-row-content_row-content_bottom-row"><div class="ms-row-content_row-content_bottom-row_left"><input id="autocomplete" type="text" class="tm-search-box__input ax-add-tag-textfield" placeholder="..." value=""></div><div class="ms-row-content_row-content_bottom-row_right"></div></div></div></div></div><div class="ms-row-list" style=" background: transparent; "><div class="ms-row-struct indirizzo" style=" width: 45%; "><div class="ms-row-content_row-color" style="/* background: rgb(139, 195, 74); */"></div><div class="ms-row-content_row-content"><div class="ms-row-content_row-content_top-row"><div class="ms-row-content_row-content_top-row-left">Indirizzo</div><div class="ms-row-content_row-content_top-row-right"></div></div><div class="ms-row-content_row-content_bottom-row"><div class="ms-row-content_row-content_bottom-row_left"><input id="route" type="text" class="tm-search-box__input ax-add-tag-textfield" placeholder="..." value=""></div><div class="ms-row-content_row-content_bottom-row_right"></div></div></div></div><div class="ms-row-struct civico" style=" width: 20%; "><div class="ms-row-content_row-color" style="/* background: rgb(139, 195, 74); */"></div><div class="ms-row-content_row-content"><div class="ms-row-content_row-content_top-row"><div class="ms-row-content_row-content_top-row-left">Civico</div><div class="ms-row-content_row-content_top-row-right"></div></div><div class="ms-row-content_row-content_bottom-row"><div class="ms-row-content_row-content_bottom-row_left"><input id="street_number" type="text" class="tm-search-box__input ax-add-tag-textfield" placeholder="..." value=""></div><div class="ms-row-content_row-content_bottom-row_right"></div></div></div></div><div class="ms-row-struct citta" style=" width: 32%; "><div class="ms-row-content_row-color" style="/* background: rgb(139, 195, 74); */"></div><div class="ms-row-content_row-content"><div class="ms-row-content_row-content_top-row"><div class="ms-row-content_row-content_top-row-left">Città</div><div class="ms-row-content_row-content_top-row-right"></div></div><div class="ms-row-content_row-content_bottom-row"><div class="ms-row-content_row-content_bottom-row_left"><input id="locality" type="text" class="tm-search-box__input ax-add-tag-textfield" placeholder="..." value=""></div><div class="ms-row-content_row-content_bottom-row_right"></div></div></div></div></div><div class="ms-row-list" style=" background: transparent; "><div class="ms-row-struct stato" style=" width: 45%; "><div class="ms-row-content_row-color" style="/* background: rgb(139, 195, 74); */"></div><div class="ms-row-content_row-content"><div class="ms-row-content_row-content_top-row"><div class="ms-row-content_row-content_top-row-left">Stato</div><div class="ms-row-content_row-content_top-row-right"></div></div><div class="ms-row-content_row-content_bottom-row"><div class="ms-row-content_row-content_bottom-row_left"><input id="administrative_area_level_1" type="text" class="tm-search-box__input ax-add-tag-textfield" placeholder="..." value=""></div><div class="ms-row-content_row-content_bottom-row_right"></div></div></div></div><div class="ms-row-struct cap" style=" width: 20%; "><div class="ms-row-content_row-color" style="/* background: rgb(139, 195, 74); */"></div><div class="ms-row-content_row-content"><div class="ms-row-content_row-content_top-row"><div class="ms-row-content_row-content_top-row-left">CAP</div><div class="ms-row-content_row-content_top-row-right"></div></div><div class="ms-row-content_row-content_bottom-row"><div class="ms-row-content_row-content_bottom-row_left"><input id="postal_code" type="text" class="tm-search-box__input ax-add-tag-textfield" placeholder="..." value=""></div><div class="ms-row-content_row-content_bottom-row_right"></div></div></div></div><div class="ms-row-struct paese" style=" width: 32%; "><div class="ms-row-content_row-color" style="/* background: rgb(139, 195, 74); */"></div><div class="ms-row-content_row-content"><div class="ms-row-content_row-content_top-row"><div class="ms-row-content_row-content_top-row-left">Paese</div><div class="ms-row-content_row-content_top-row-right"></div></div><div class="ms-row-content_row-content_bottom-row"><div class="ms-row-content_row-content_bottom-row_left"><input id="country" type="text" class="tm-search-box__input ax-add-tag-textfield" placeholder="..." value=""></div><div class="ms-row-content_row-content_bottom-row_right"></div></div></div></div></div><div class="ms-row-list" style=" background: transparent; "><div class="ms-row-struct email" style=" width: 45%; "><div class="ms-row-content_row-color" style="/* background: rgb(139, 195, 74); */"></div><div class="ms-row-content_row-content"><div class="ms-row-content_row-content_top-row"><div class="ms-row-content_row-content_top-row-left">Email</div><div class="ms-row-content_row-content_top-row-right"></div></div><div class="ms-row-content_row-content_bottom-row"><div class="ms-row-content_row-content_bottom-row_left"><input type="text" class="tm-search-box__input ax-add-tag-textfield" placeholder="..." value=""></div><div class="ms-row-content_row-content_bottom-row_right"></div></div></div></div><div class="ms-row-struct telefono" style=" width: 45%; "><div class="ms-row-content_row-color" style="/* background: rgb(139, 195, 74); */"></div><div class="ms-row-content_row-content"><div class="ms-row-content_row-content_top-row"><div class="ms-row-content_row-content_top-row-left">Telefono</div><div class="ms-row-content_row-content_top-row-right"></div></div><div class="ms-row-content_row-content_bottom-row"><div class="ms-row-content_row-content_bottom-row_left"><input type="text" class="tm-search-box__input ax-add-tag-textfield" placeholder="..." value=""></div><div class="ms-row-content_row-content_bottom-row_right"></div></div></div></div></div>';

  var clone = null;

  var colorSelector = '.ms-row-content_row-color';
  var requiredColor = '#ff5d5d';
  var greenLight = '#60c85e';

  function setFlag(sl, color){
    try {
      if(!sl)
        throw new TypeError('fornitore.js -setFlag : selector undefined');
      if(!color)
        throw new TypeError('fornitore.js - setFlag : color undefined');

      sl.find(colorSelector).css('background', color);
    } catch (e) {
      console.log();
    }
  }

  var fornitore = new Fornitore();
  var intestatario = new Intestatario();
  intestatario.Id = 0;
  intestatario.Type = 2;
  intestatario.Intestatario = fornitore;

  function InputField(sl, field){
    this.sl = sl;
    this.field = field;
  }

  InputField.prototype.input = function(){ return this.sl.find('input'); };
  InputField.prototype.setAlert = function(){
    setFlag(this.sl, requiredColor);
  };
  InputField.prototype.setOkay = function(){
    setFlag(this.sl, greenLight);
  };
  InputField.prototype.setValue = function(){
    fornitore[this.field] = this.input().val();
  };
  InputField.prototype.getValue = function(){ return this.input().val(); };

  InputField.prototype.realTimeMonitoring = function(limit){
    var self = this;
    self.sl.keyup(function(event) {
      try {
        self.checkValues(function(res){
          if(res){
            self.setOkay();
            self.setValue();
          }else{
            errorFunc();
          }
        }, limit);
      } catch (e) {
        console.log(e.message);
        errorFunc();
      }
    });

    function errorFunc(){
      self.setAlert();
    }
  }

  InputField.prototype.checkValues = function(callback, limit){
    var self = this;

    try {
      var val = self.getValue();

      if(!callback)
        throw new TypeError('InputField - checkValues : this method needs a callback parameter');

      if(isEmptyField(val, limit))
        throw new TypeError('Required');

      if(self.moreChecksFuncs){
        self.moreChecksFuncs(function(res){
            if(res){
              callback(true);
            }else{
              callback(false);
            }
        });
      }else{
        callback(true);
      }
    } catch (e) {
      console.log(e.message);
      callback(false);
    }
  }

  var ragioneSociale = new InputField();
  ragioneSociale.field = 'RagioneSociale';

  var codiceFiscale = new InputField();
  codiceFiscale.field = 'CodiceFiscale';

  var partitaIva = new InputField();
  partitaIva.field = 'PartitaIva';

  partitaIva.moreChecksFuncs = function(callback){
    var self = this;

    try {
      var val = this.getValue();
      if (val && val !== "" && val.length > 3) {
        var tmp = new Fornitore();
        tmp.PartitaIva = val;
        tmp.checkUniqueValues(function(res){
          if(res){
            callback(true);
          }else{
            callback(false);
          }
        });
      }
    } catch (e) {
      console.log(e.message);
      callback(false);
    }

  }

  var indirizzo = new InputField();
  indirizzo.field = 'Indirizzo';

  var civico = new InputField();
  civico.field = 'Civico';

  var citta = new InputField();
  citta.field = 'Citta';

  var stato = new InputField();
  stato.field = 'Stato';

  var cap = new InputField();
  cap.field = 'CAP';

  var paese = new InputField();
  paese.field = 'Paese';

  var telefono = new InputField();
  telefono.field = 'Telefono';

  var email = new InputField();
  email.field = 'Email';

  var fields = [ragioneSociale, codiceFiscale, telefono, email, partitaIva, indirizzo, civico, citta, stato, cap, paese];
  var requiredFields = [ragioneSociale, indirizzo, civico, citta, stato, cap, paese];

  function setAlert_Array(fields){
    if (fields && fields.length > 0) {
      for (var i = 0; i < fields.length; i++) {
        fields[i].setAlert();
      }
    }
  }

  function isEmptyField(term, limit){
    var result = false;
    var limitLength = (limit >= 0) ? limit : 2;

    if(!term || term === "" || !(term.length > limitLength))
      result = true;

    return result;
  }

  function checkRequiredFields(callback){
    var stop = false;
    for (var i = 0; i < requiredFields.length && !stop; i++) {
      var el = requiredFields[i];
      if (i == 2 || i == 5) {
        el.checkValues(function(res){
          if(!res){
            stop = true;
            console.log(el);
            console.log(el.getValue());
            callback(false);
          }else if(res && requiredFields.length === (i + 1)){
            callback(true);
          }
        }, 0);
      }else{
        el.checkValues(function(res){
          if(!res){
            stop = true;
            console.log(el);
            console.log(el.getValue());
            callback(false);
          }else if(res && requiredFields.length === (i + 1)){
            callback(true);
          }
        });
      }
    }
  }

  function setFornitoreFields(){
    for (var i = 0; i < fields.length; i++) {
      fields[i].setValue();
    }
  }

  var placeSearch, autocomplete;
  var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
  };

  function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
        {types: ['geocode']});

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
  }

  function fillInAddress() {

    try {
      if(!clone)
        throw new TypeError('fornitore.js - fillInAddress : clone undefined');
      if(!clone.rootPanel)
        throw new TypeError('fornitore.js - fillInAddress : rootPanel undefined');

      // Get the place details from the autocomplete object.
      var place = autocomplete.getPlace();
      var root = clone.rootPanel;

      for (var component in componentForm) {
        root.find('input#' + component).val('');
        //root.find(component).disabled = false;
      }

      // Get each component of the address from the place details
      // and fill the corresponding field on the form.
      for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
          var value = place.address_components[i][componentForm[addressType]];
          root.find('input#' + addressType).val(value);
        }
      }

      for (var component in componentForm) {
        root.find('input#' + component).keyup();
        //root.find(component).disabled = false;
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  fornitore_ui.prototype.init = function(callback){
    try {
      var self = this;
      /*if(!callback)
        throw new TypeError('fornitore_ui - init : this method needs a callback argument!');*/
      if(!this.rootPanel)
        throw new TypeError('fornitore_ui - init : rootPanel undefined');

      clone = self;
      var backBtn = new back_btn();
      backBtn.init();

      self.loadStruct();

      if(clone.term && clone.term !== ""){
        ragioneSociale.input().val(capitalizeFirstLetter(clone.term));
        ragioneSociale.sl.keyup();
      }

      var saveBtn = new save_btn();
      saveBtn.init();

      if(callback){
        callback();
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  fornitore_ui.prototype.loadStruct = function(){
    try {
      var self = this;
      if(!this.rootPanel)
        throw new TypeError('fornitore_ui - loadStruct : rootPanel undefined');

      if(!structure)
        throw new TypeError('fornitore_ui - loadStruct : structure global variable error');

      this.rootPanel.append(structure);

      ragioneSociale.sl = this.rootPanel.find('.ragioneSociale');
      ragioneSociale.input().focus();
      codiceFiscale.sl = this.rootPanel.find('.codiceFiscale');
      partitaIva.sl = this.rootPanel.find('.partitaIva');
      partitaIva.sl.keyup(function(event) {
        console.log(partitaIva.getValue());
        var term = partitaIva.getValue();
        partitaIva.input().val(term.toUpperCase())
      });

      indirizzo.sl = this.rootPanel.find('.indirizzo');
      civico.sl = this.rootPanel.find('.civico');
      citta.sl = this.rootPanel.find('.citta');
      stato.sl = this.rootPanel.find('.stato');
      cap.sl = this.rootPanel.find('.cap');
      paese.sl = this.rootPanel.find('.paese');
      telefono.sl = this.rootPanel.find('.telefono');
      email.sl = this.rootPanel.find('.email');

      partitaIva.sl.keyup(function(event) {
        try {
          partitaIva.checkValues(function(res){
            if(res){
              partitaIva.setOkay();
              partitaIva.setValue();
            }else if(!partitaIva.getValue() && codiceFiscale.getValue() && codiceFiscale.getValue() !== ""){
              partitaIva.setOkay();
            }else{
              partitaIva.setAlert();
            }
          }, 0);
        } catch (e) {
          console.log(e.message);
          partitaIva.setAlert();
        }
      });

      codiceFiscale.sl.keyup(function(event) {
          if(!partitaIva.getValue() && codiceFiscale.getValue() && codiceFiscale.getValue() !== ""){
            partitaIva.setOkay();
          }else{
            partitaIva.checkValues(function(res){
              if(res){
                partitaIva.setOkay();
              }else{
                partitaIva.setAlert();
              }
            }, 0);
          }
      });

      partitaIva.sl.keyup();

      initAutocomplete();
      this.inputFormEvent();
    } catch (e) {
      console.log(e.message);
    }
  }

  fornitore_ui.prototype.inputFormEvent = function(){
    try {
      var self = this;
      if(!this.rootPanel)
        throw new TypeError('fornitore_ui - inputFormEvent : rootPanel undefined');
      /*Listeners*/
      setAlert_Array(requiredFields);

      for (var i = 0; i < requiredFields.length; i++) {
        if (i == 2 || i == 5) {
          requiredFields[i].realTimeMonitoring(0);
        }else{
          requiredFields[i].realTimeMonitoring();
        }
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  function back_btn(){
    this.struct = '<div class="tm-properties-row uk-form-horizontal rowPanelActions"><div class="tm-properties-row__content"><section class="tm-add-button-box"><div class="tm-add-button-box__left"><div class="tm-add-button-panel__input"><div class="add-button ax-add-tag-button btn-back" style="width : 90px"><i class="tm-icon tm-icon-add glyphicon glyphicon-arrow-left"></i></div></div></div><div class="tm-add-button-box__right"></div></section></div></div>';
  }

  // Methods
  back_btn.prototype.clickEvent = function(){
    try {

      if(!clone)
        throw new TypeError('back_btn - clickEvent : this method needs clone argument!');

      if(!clone.prevAction)
        throw new TypeError('back_btn - clickEvent : prevAction undefined');

      clone.prevAction();
    } catch (e) {
      console.log(e.message);
    }
  };

  back_btn.prototype.init = function(){
    try {
      if(!clone)
        throw new TypeError('back_btn - init : this method needs clone argument!');

      if(!clone.rootPanel)
        throw new TypeError('back_btn - init : rootPanel undefined');

      var self = this;
      var rootPanel = clone.rootPanel;
      rootPanel.append(this.struct);

      rootPanel.find('.btn-back').click(function() {
        self.clickEvent();
      });
    } catch (e) {
      console.log(e.message);
    }
  }

  function save_btn(){
    this.struct = '<div class="tm-add-button-panel__input save-btn" style="background: #e6e8ec;margin-top: 10px; cursor : pointer;"><div class="add-button ax-add-tag-button" style="width: auto;text-align: center;"><strong>Salva e continua</strong></div></div>';
  }

  // Methods
  save_btn.prototype.clickEvent = function(){
    try {

      if(!clone)
        throw new TypeError('save_btn - clickEvent : this method needs clone argument!');

      if(!clone.nextAction)
        throw new TypeError('save_btn - clickEvent : nextAction undefined');

      setFornitoreFields();
      intestatario.SaveRelationship(function(success, el) {
        if(success && el){
          var array = [el];
          console.log(array);
          bootbox.alert('Salvataggio avvenuto con successo!');
          clone.nextAction(array);
        }else{
          bootbox.alert('Errore durante il salvataggio del fornitore!');
        }
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  save_btn.prototype.init = function(){
    try {
      if(!clone)
        throw new TypeError('save_btn - init : this method needs clone argument!');

      if(!clone.rootPanel)
        throw new TypeError('save_btn - init : rootPanel undefined');

      var self = this;
      var rootPanel = clone.rootPanel;
      rootPanel.append(this.struct);

      rootPanel.find('.save-btn').click(function() {
        self.clickEvent();
      });
    } catch (e) {
      console.log(e.message);
    }
  }

})();
