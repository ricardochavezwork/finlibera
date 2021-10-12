function fatturaFornitore_ui(root, movimento, docFisc, intestatario, prevAction, nextAction){
  this.root = root;
  this.movimento = movimento;
  this.docFisc = docFisc;
  this.intestatario = intestatario;
  this.prevAction = prevAction;
  this.nextAction = nextAction;
}

(function(){

  var structure = '<div class="ms-row-list row-title" style=" background: transparent; "><h2 style="color: #696f7a;font-size: 18px;font-weight: 600;">Creazione Fattura</h2></div><div class="divider"></div><div class="ms-row-list" style=" background: transparent; "><div class="ms-row-struct invoiceNumber" style="width: 45%;"><div class="ms-row-content_row-color" style=""></div><div class="ms-row-content_row-content"><div class="ms-row-content_row-content_top-row"><div class="ms-row-content_row-content_top-row-left">Numero</div><div class="ms-row-content_row-content_top-row-right"></div></div><div class="ms-row-content_row-content_bottom-row"><div class="ms-row-content_row-content_bottom-row_left"><input type="text" class="tm-search-box__input ax-add-tag-textfield" placeholder="..." value=""></div><div class="ms-row-content_row-content_bottom-row_right"></div></div></div></div><div class="ms-row-struct invoiceDate" style="width: 45%;"><div class="ms-row-content_row-color" style=""></div><div class="ms-row-content_row-content"><div class="ms-row-content_row-content_top-row"><div class="ms-row-content_row-content_top-row-left">Data</div><div class="ms-row-content_row-content_top-row-right"></div></div><div class="ms-row-content_row-content_bottom-row"><div class="ms-row-content_row-content_bottom-row_left"><input type="text" class="tm-search-box__input ax-add-tag-textfield" placeholder="..." value=""></div><div class="ms-row-content_row-content_bottom-row_right"></div></div></div></div></div><div class="ms-row-list" style="background: transparent;margin-top: 10px;"><div class="ms-row-struct societa" style="width: 45%;background: #e6e8ec;"><div class="ms-row-content_row-color" style=""></div><div class="ms-row-content_row-content"><div class="ms-row-content_row-content_top-row"><div class="ms-row-content_row-content_top-row-left">Societa</div><div class="ms-row-content_row-content_top-row-right"></div></div><div class="ms-row-content_row-content_bottom-row"><div class="ms-row-content_row-content_bottom-row_left" style=" "><div style=" text-align: center; "><strong>Finlibera</strong></div></div><div class="ms-row-content_row-content_bottom-row_right"></div></div></div></div><div class="ms-row-struct total" style="width: 45%;"><div class="ms-row-content_row-color" style=""></div><div class="ms-row-content_row-content"><div class="ms-row-content_row-content_top-row"><div class="ms-row-content_row-content_top-row-left">Totale</div><div class="ms-row-content_row-content_top-row-right"></div></div><div class="ms-row-content_row-content_bottom-row"><div class="ms-row-content_row-content_bottom-row_left"><input id="locality" type="text" class="tm-search-box__input ax-add-tag-textfield" placeholder="..." value=""></div><div class="ms-row-content_row-content_bottom-row_right"></div></div></div></div></div><div class="ms-row-list" style="background: transparent;margin-top: 10px;"><div class="ms-row-struct description" style="width: 100%;padding-bottom: 10px;"><div class="ms-row-content_row-color" style=""></div><div class="ms-row-content_row-content"><div class="ms-row-content_row-content_top-row"><div class="ms-row-content_row-content_top-row-left" style=" ">Descrizione</div><div class="ms-row-content_row-content_top-row-right"></div></div><div class="ms-row-content_row-content_bottom-row"><div class="ms-row-content_row-content_bottom-row_left"><input type="text" class="tm-search-box__input ax-add-tag-textfield" placeholder="..." value="" style=" height: 40px; "></div><div class="ms-row-content_row-content_bottom-row_right"></div></div></div></div></div><div class="divider"></div><div class="tm-properties-row uk-form-horizontal secTag"><div class="tm-properties-row__icon"><i class="tm-icon glyphicon glyphicon-tags"></i></div><div class="tm-properties-row__label">Tags</div><div class="tm-properties-row__content"><section class="tm-add-button-box"><div class="tm-add-button-box__left"><div class="tm-add-button-panel__input"><div class="add-button ax-add-tag-button"><i class="tm-icon tm-icon-add glyphicon glyphicon-plus"></i></div></div></div><div class="tm-add-button-box__right"></div></section></div></div><div class="tag_searchPanel" style="display: none;"><div class="togglePanel"><div class="togglePanel_lef-space"></div><div class="togglePanel_content" style=" background-color: #fff;"><div class="togglePanel_content-actionsPanel"><div class="togglePanel_inputSearch"><i class="material-icons">search</i><input type="text" class="togglePanel_inputSearch-input" placeholder="Ricerca" value=""></div><div class="togglePanel_closePanel" title="Chiudi"><i class="material-icons">close</i></div></div><div class="togglePanel_content-elementList tm-list tm-hack-scrollbar"></div></div></div></div>';

  var clone = null;

  var colorSelector = '.ms-row-content_row-color';
  var requiredColor = '#ff5d5d';
  var greenLight = '#60c85e';

  var docFisc = null;
  var docFornitori = null;
  var ftFornitore = null;

  /*var docFisc = new DocumentoFiscale();
  var docFornitori = new DocumentoFornitore();
  var ftFornitore = new FatturaFornitore();
  docFisc.Documento = docFornitori;
  docFornitori.Fattura = ftFornitore;*/

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
  InputField.prototype.setValuesToDocFisc = function(){
    ftFornitore[this.field] = this.input().val();
  };
  InputField.prototype.setValuesFromDocFisc = function(){
    if(ftFornitore[this.field] && ftFornitore[this.field] !== 0 && ftFornitore[this.field] !== ""){
      this.input().val(ftFornitore[this.field]);
    }
  }

  InputField.prototype.getValue = function(){ return this.input().val(); };

  InputField.prototype.realTimeMonitoring = function(limit){
    var self = this;
    self.sl.keyup(function(event) {
      try {
        self.checkValues(function(res){
          if(res){
            self.setOkay();
            if(self.setValueFromSpecialFunc){
              self.setValueFromSpecialFunc();
            }else{
              self.setValuesToDocFisc();
            }
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

  var ftDate = new InputField();
  ftDate.field = 'Data';

  ftDate.moreChecksFuncs = function(callback){
    var self = this;

    try {
      var val = this.getValue();

      if(val && validateDDMMYYYY(val)){
        callback(true);
      }else{
        callback(false);
      }
    } catch (e) {
      console.log(e.message);
      callback(false);
    }
  }

  ftDate.setValueFromSpecialFunc = function(){
    var dt = toDateValue(ftDate.getValue());
    ftFornitore[this.field] = dt.yyyymmdd();
  }

  ftDate.setValuesFromDocFisc = function(){
    if(ftFornitore[this.field] && ftFornitore[this.field] !== 0 && ftFornitore[this.field] !== ""){
      var data = new Date(ftFornitore[this.field]);
      this.input().val(data.ddmmyyyy());
    }
  }

  var ftNumber = new InputField();
  ftNumber.field = 'Numero';

  ftNumber.moreChecksFuncs = function(callback){
    var self = this;

    try {
      var val = this.getValue();

      ftDate.checkValues(function(res){
        if(res){
          if (val && val.length > 0) {
            var tmp = new FatturaFornitore();
            tmp.Id = ftFornitore.Id;
            tmp.Numero = val;
            var dt = toDateValue(ftDate.getValue());
            tmp.Data = dt.yyyymmdd();
            var df = new DocumentoFiscale();
            df.Documento = tmp;
            var params = {
              DocumentoFiscale : df,
              Intestatario : clone.intestatario
            }

            tmp.checkUniqueValues(params, function(res){
              if(res){
                callback(true);
              }else{
                callback(false);
              }
            });
          }else{
            callback(false);
          }
        }else{
          callback(false);
        }
      }, 0);
    } catch (e) {
      console.log(e.message);
      callback(false);
    }
  }

  var ftTotal = new InputField();
  ftTotal.field = 'Totale';

  ftTotal.moreChecksFuncs = function(callback){
    var self = this;

    try {
      var val = this.getValue();

      if (val && val !== "" && parseFloat(val) > 0) {
        callback(true);
      }else{
        callback(false);
      }
    } catch (e) {
      console.log(e.message);
      callback(false);
    }
  }

  ftTotal.setValuesFromDocFisc = function(){
    if(ftFornitore[this.field] && ftFornitore[this.field] !== 0 && ftFornitore[this.field] !== ""){
      var total = new Number(ftFornitore[this.field]);
      //this.input().val(total.formatMoney());
      this.input().val(ftFornitore[this.field]);
    }
  }

  var ftDescription = new InputField();
  ftDescription.field = 'Descrizione';

  ftDescription.setValueFromSpecialFunc = function(){
    docFornitori[this.field] = this.input().val();
  }

  var fields = [ftNumber, ftDate, ftTotal, ftDescription];
  var requiredFields = [ftNumber, ftDate, ftTotal];

  function setFlag(sl, color){
    try {
      if(!sl)
        throw new TypeError('fatturaFornitore.js -setFlag : selector undefined');
      if(!color)
        throw new TypeError('fatturaFornitore.js - setFlag : color undefined');

      sl.find(colorSelector).css('background', color);
    } catch (e) {
      console.log();
    }
  }

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
      console.log(el);
      el.checkValues(function(res){
        if(!res){
          stop = true;
          callback(false);
        }else if(res && requiredFields.length === (i + 1)){
          callback(true);
        }
      }, 0);
    }
    //callback(true);
  }

  function setAllFields(){
    for (var i = 0; i < fields.length; i++) {
      if(fields[i].setValueFromSpecialFunc){
        fields[i].setValueFromSpecialFunc();
      }else{
        fields[i].setValuesToDocFisc();
      }
    }
  }

  function setAllFromDocFisc(){
    for (var i = 0; i < fields.length; i++) {
      fields[i].setValuesFromDocFisc();
    }
  }

  fatturaFornitore_ui.prototype.init = function(callback){
    try {
      var self = this;

      if(!this.root)
        throw new TypeError('fatturaFornitore_ui - init : root undefined');

      if(!this.movimento)
        throw new TypeError('fatturaFornitore_ui - init : movimento undefined');

      clone = self;

      console.log(self);
      //Svuotamento
      docFisc = new DocumentoFiscale();
      docFornitori = new DocumentoFornitore();
      ftFornitore = new FatturaFornitore();
      docFisc.Documento = docFornitori;
      docFornitori.Fattura = ftFornitore;

      if(!self.docFisc){
        ftFornitore.Societa = clone.movimento.Societa;
        docFornitori.IdFornitore = clone.intestatario.Id;
      }else {
        docFisc = $.extend(new DocumentoFiscale(), self.docFisc);
        if(self.docFisc.Documento){
          docFornitori = self.docFisc.Documento;
        }

        if(self.docFisc.Documento && self.docFisc.Documento.Fattura){
          ftFornitore = self.docFisc.Documento.Fattura;
        }

        docFisc.Documento = docFornitori;
        docFornitori.Fattura = ftFornitore;

      }

      var backBtn = new back_btn();
      backBtn.init();

      self.loadStruct();

      if(ftFornitore.Id && parseInt(ftFornitore.Id) > 0){
        self.root.find('.row-title h2').html("Modifica Fattura");
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

  fatturaFornitore_ui.prototype.loadStruct = function(){
    try {
      var self = this;
      if(!this.root)
        throw new TypeError('fatturaFornitore_ui - loadStruct : root undefined');

      if(!structure)
        throw new TypeError('fatturaFornitore_ui - loadStruct : structure global variable error');

      this.root.append(structure);

      ftNumber.sl = this.root.find('.invoiceNumber');
      ftNumber.input().focus();

      ftDate.sl = this.root.find('.invoiceDate');
      ftDate.sl.keyup(function(event){
        ftNumber.sl.keyup();
      });

      ftTotal.sl = this.root.find('.total');

      ftDescription.sl = this.root.find('.description');

      if(!this.docFisc){
        this.docFisc = new DocumentoFiscale();
        docFisc = this.docFisc;
      }

      var secTag = this.root.find('.secTag .tm-add-button-panel__input');
      secTag.click(function(event){
        self.root.find('.tag_searchPanel').toggle();
        var tag_manager = new tagDocFisc_manager();
        tag_manager.docFisc = self.docFisc;
        tag_manager.root = self.root;
        tag_manager.init();
      });

      if(self.docFisc && self.docFisc instanceof DocumentoFiscale && self.docFisc.Documento){
        self.setValuesFromDocFisc();
      }

      this.inputFormEvent();
      if(this.docFisc.DocumentoFiscale_TagDocumentoFiscale && this.docFisc.DocumentoFiscale_TagDocumentoFiscale.Tags && this.docFisc.DocumentoFiscale_TagDocumentoFiscale.Tags.length > 0){
        var tags = this.docFisc.DocumentoFiscale_TagDocumentoFiscale.Tags;
        for (var i = 0; i < tags.length; i++) {
          var tagItem = new TagItem();
          tagItem.docFisc = self.docFisc;
          tagItem.rootDocFisc = self.root;
          tagItem.tag = tags[i];//TagDocumentoFiscale
          tagItem.init();
        }
      }

      if(self.docFisc && self.docFisc instanceof DocumentoFiscale && self.docFisc.Documento){
        ftDate.sl.keyup();
        ftNumber.sl.keyup();
        ftTotal.sl.keyup();
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  fatturaFornitore_ui.prototype.setValuesFromDocFisc = function(){
    try {
      var self = this;

      if(!this.docFisc || !(this.docFisc instanceof DocumentoFiscale))
        throw new TypeError('fatturaFornitore_ui - setValuesFromDocFisc : this.docFisc undefined');

      setAllFromDocFisc();

    } catch (e) {
      console.log(e.message);
    }
  }

  fatturaFornitore_ui.prototype.inputFormEvent = function(){
    try {
      var self = this;
      if(!this.root)
        throw new TypeError('fatturaFornitore_ui - inputFormEvent : root undefined');
      /*Listeners*/
      setAlert_Array(requiredFields);

      if(requiredFields && requiredFields.length > 0){
        for (var i = 0; i < requiredFields.length; i++) {
          requiredFields[i].realTimeMonitoring(0);
        }
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  function tagDocFisc_manager(docFisc, root, rows, togglePanel){
    this.docFisc = docFisc;
    this.root = root;
    this.rows = rows;
    this.togglePanel = togglePanel;
  }

  tagDocFisc_manager.prototype.init = function(){
    var self = this;
    var toggle = new togglePanel();
    this.togglePanel = toggle;
    toggle.root = this.root.find('.tag_searchPanel');
    toggle.elementsManager = this;
    toggle.init();

    this.rows = new Array();

    this.setRows();

  }

  tagDocFisc_manager.prototype.setRows = function(termine, callback){
    try {
      var self = this;

      if(!this.togglePanel)
        throw new TypeError('tagDocFisc_manager - setRows : this.togglePanel  undefined');

      /*if(!callback)
        throw new TypeError('tagDocFisc_manager - setRows : callback undefined');*/

      //1.Search
      //2.Creazione di tag_rows e setStructure

      this.rows  =new Array();

      if(termine && termine !== ""){
        this.Search(termine, function(tags){
          if(!tags)
            console.log("tagDocFisc_manager - setRows : this.Search tags undefined");

          if(tags && tags.TagDocumentoFiscale && tags.TagDocumentoFiscale.length > 0){
            for (var i = 0; i < tags.TagDocumentoFiscale.length; i++) {
              var row = new tagDocFisc_row();
              row.tag = tags.TagDocumentoFiscale[i];
              //row.rootTogglePanel = self.root.find(servizio_struct.roots.tag_searchPanel);//TODO:Verifica funzionalità della variabile
              row.tagDocFisc_manager = self;//TODO:Verifica funzionalità della variabile
              row.docFisc = self.docFisc;//TODO:Verifica funzionalità della variabile
              row.setStructure();
              self.rows.push(row);
            }

            if(self.togglePanel){
              self.togglePanel.loadElements();
            }

          }else{
            //Creazione di un nuovo tag
            var admin = new Admin();
            admin.Load(function (){
                if(admin.isAdministrator()){
                  var row = new newTagDocumentoFiscale();
                  row.rootTogglePanel = self.root;
                  row.docFisc = self.docFisc;
                  row.setStructure(termine, function(){
                    self.rows.push(row);

                    if(self.togglePanel){
                      self.togglePanel.loadElements();
                    }

                    if(callback){
                      callback();
                    }
                  });

                }else {
                  console.log("Solo Admin può creare un tag");
                }
            });

          }

          if(callback){
            callback();
          }

        });
      }else{
        console.log("Load di tutti i tag");

        this.LoadTags(function(tags){
          if(!tags)
            console.log("tagDocFisc_manager - setRows : this.Search tags undefined");

          if(tags && tags.TagDocumentoFiscale && tags.TagDocumentoFiscale.length > 0){
            for (var i = 0; i < tags.TagDocumentoFiscale.length; i++) {
              var row = new tagDocFisc_row();
              row.tag = tags.TagDocumentoFiscale[i];
              //row.rootTogglePanel = self.root.find(servizio_struct.roots.tag_searchPanel);//TODO:Verifica funzionalità della variabile
              row.tagDocFisc_manager = self;//TODO:Verifica funzionalità della variabile
              row.docFisc = self.docFisc;//TODO:Verifica funzionalità della variabile
              row.setStructure();
              console.log(row);
              self.rows.push(row);
            }

            if(self.togglePanel){
              self.togglePanel.loadElements();
            }

          }

          if(callback){
            callback();
          }

        });
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  tagDocFisc_manager.prototype.Search = function(termine, callback){
    try {

      var self = this;

      if(!termine)
        throw new TypeError('tagDocFisc_manager - Search : termine undefined');

      if(!callback)
        throw new TypeError('tagDocFisc_manager - Search : this method needs a callback!');

      var ts = new TagDocumentoFiscale();
      ts.Search(termine, function(){
        callback(ts);
      });


    } catch (e) {
      console.log(e.message);
    }
  }

  tagDocFisc_manager.prototype.LoadTags = function(callback){
    try {

      var self = this;

      if(!callback)
        throw new TypeError('tagDocFisc_manager - Search : this method needs a callback!');

      var ts = new TagDocumentoFiscale();
      ts.LoadTags(function(){
        callback(ts);
      });


    } catch (e) {
      console.log(e.message);
    }
  }

  /*######################################################
                      tagDocFisc_row
    ######################################################*/

  var tag_text_struct = {
    contenuto : $('<div class="tag-item"><div class="tm-simple__text tag-item_struct"><span></span><div class="remove-tag"><i class="material-icons">close</i><div></div></div></div></div>'),
    roots : {
      element : ' .tag-item'
    }
  }

  function tagDocFisc_row(rootTogglePanel, docFisc, index, root, tag, structure, tagDocFisc_manager){
    this.rootTogglePanel = rootTogglePanel;
    this.docFisc = docFisc;
    this.index = index;//variabile assegnata da togglePanel
    this.root = root;//variabile assegnata da togglePanel
    this.tag = tag;
    this.structure = structure;
    this.tagDocFisc_manager = tagDocFisc_manager;
  }

  tagDocFisc_row.prototype.init = function(){
    try {
      var self = this;

      if(!this.index)
        throw new TypeError('tagDocFisc_row - init : index undefined');

      if(!this.docFisc)
        throw new TypeError('tagDocFisc_row - init : this.docFisc undefined');

      if(!this.docFisc.DocumentoFiscale_TagDocumentoFiscale){
        this.docFisc.DocumentoFiscale_TagDocumentoFiscale = new DocumentoFiscale_TagDocumentoFiscale();
        this.docFisc.DocumentoFiscale_TagDocumentoFiscale.Tags = new Array();
        this.docFisc.DocumentoFiscale_TagDocumentoFiscale.DocumentoFiscale = new DocumentoFiscale();
        this.docFisc.DocumentoFiscale_TagDocumentoFiscale.DocumentoFiscale.Id = this.docFisc.Id;
        this.docFisc.DocumentoFiscale_TagDocumentoFiscale.DocumentoFiscale.Type = this.docFisc.Type;
      }

      this.listeners();

    } catch (e) {
      console.log(e.message);
    }
  }

  tagDocFisc_row.prototype.setStructure = function(){
    try {
      var self = this;

      if(!this.tag)
        throw new TypeError('tagDocFisc_row - setStructure : this.tag undefined');

      this.structure = this.tag.getTagStructure();

    } catch (e) {
      console.log(e.message);
    }
  }

  tagDocFisc_row.prototype.nextAction = function(callback){
    try {
      //TODO: Controllare se quel tag è già stato aggiunto. Anzi meglio eliminare l'elemento così non c'è bisogno di fare il controllo.

      var self = this;

      if(!this.docFisc)
        throw new TypeError('tagDocFisc_row - nextAction : docFisc undefined');

      if(!this.docFisc.DocumentoFiscale_TagDocumentoFiscale || !this.docFisc.DocumentoFiscale_TagDocumentoFiscale.Tags)
        throw new TypeError('tagDocFisc_row - nextAction : this.docFisc.DocumentoFiscale_TagDocumentoFiscale undefined');

      //NB: Qui potresti fare una condizione e dire che se il docFisc.Id > 0 allora salvi automaticamente quel tag con il servizio. Da studiare bene.

      this.docFisc.DocumentoFiscale_TagDocumentoFiscale.Tags.push(this.tag);
      console.log(this.docFisc);
      this.root.remove();

      if(this.docFisc.Id && parseInt(this.docFisc.Id) > 0){
        this.docFisc.DocumentoFiscale_TagDocumentoFiscale.SaveRelationship(function(){
          var tagItem = new TagItem();
          tagItem.docFisc = self.docFisc;
          tagItem.rootDocFisc = self.tagDocFisc_manager.root;
          tagItem.tag = self.tag;//TagServizio
          tagItem.init();

          if(callback){
            callback();
          }
        });
      }else{
        var tagItem = new TagItem();
        tagItem.docFisc = this.docFisc;
        tagItem.rootDocFisc = this.tagDocFisc_manager.root;
        tagItem.tag = this.tag;//TagServizio
        tagItem.init();
      }

      //NB: Non bisogna chiudere il TogglePanel, sarà frequente l'inserimento di più tag
      //this.rootTogglePanel.find(' .togglePanel_closePanel').click();

      if(callback){
        callback();
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  tagDocFisc_row.prototype.listeners = function(){
    try {
      var self = this;

      if(!this.index)
        throw new TypeError('tagDocFisc_row - listeners : index undefined');

      if(!this.root)
        throw new TypeError('tagDocFisc_row - listeners : root undefined');

      var root = this.root;

      root.click(function(event){
        self.nextAction();
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  /*######################################################
                      newTagDocumentoFiscale
    ######################################################*/

  var addNewTag = {
    structure : $('<div class="tm-list-item"><div class="tm-input-row"><input type="text" class="tm-search-box__input ax-add-tag-textfield tag-title" placeholder="Titolo del tag" value=""></div><div class="tm-input-row"><input type="text" class="tm-search-box__input ax-add-tag-textfield categoria-title" placeholder="Titolo categoria" value=""></div><div class="or-text"><span>Oppure</span></div><div class="categoria-rows"></div><div class="footer-btn"><div class="tm-add-button-panel__input add-new-tag-btn"><div class="add-button ax-add-tag-button" style="width: auto;text-align: center;"><strong>Crea</strong></div></div></div></div>'),
  }

  var categoria_row = {
    structure : $('<div class="tm-list-item" data-item-index=""><div class="tm-input-row"><div class="tm-input-row__left"><div class="tm-input-row__checkbox"><i class="tm-icon tm-icon-check-mark-bold -name_check-mark-bold"></i></div><div class="tm-input-row__info"><div class="tm-simple"><div class="tm-simple__text tagStyle"><span></span></div></div></div></div><div class="tm-input-row__right"></div></div></div>'),
    roots : {
      title : " .tm-input-row .tm-simple .tm-simple__text span",
      check_box : " .tm-input-row .tm-input-row__checkbox"
    }
  };

  function newTagDocumentoFiscale(rootTogglePanel, docFisc, index, root, structure, TagDocumentoFiscale){
    this.rootTogglePanel = rootTogglePanel;
    this.docFisc = docFisc;
    this.index = index;//variabile assegnata da togglePanel
    this.root = root;//variabile assegnata da togglePanel
    this.structure = structure;
    this.TagDocumentoFiscale = TagDocumentoFiscale;
  }

  newTagDocumentoFiscale.prototype.setStructure = function(termine, callback){
    var self = this;
    this.structure = null;
    var str = addNewTag.structure.clone();
    str.find(' .tag-title').val(termine);

    //Inserimento categorie
    var categorie = new TagCategories();
    categorie.LoadTags(function(){
      if(categorie.TagCategories && categorie.TagCategories.length > 0){
        for (var i = 0; i < categorie.TagCategories.length; i++) {
          var categoria = categorie.TagCategories[i];
          var row_struct = self.getRowCategoria_struct(categoria);
          str.find(' .categoria-rows').append(row_struct);
        }

        self.structure = str;
        callback();
      }
    });
  }

  newTagDocumentoFiscale.prototype.getRowCategoria_struct = function(TagCategories){
    try {
      if(!TagCategories)
        throw new TypeError('newTagDocumentoFiscale - getRowCategoria_struct : TagCategories undefined');

      var struct = categoria_row.structure.clone();
      struct.find(categoria_row.roots.title).html(TagCategories.getTitolo());
      struct.attr('data-item-index', TagCategories.Id);

      return struct;
    } catch (e) {
      console.log(e.message);
    }
  }

  newTagDocumentoFiscale.prototype.clearAllCheckboxs = function(){
    this.root.find(' .categoria-rows').each(function( index ) {
      $( this ).find(' .tm-input-row .tm-input-row__checkbox').css('background-color', '#fff');
    });
  }

  newTagDocumentoFiscale.prototype.init = function(){
    try {
      var self = this;

      if(!this.index)
        throw new TypeError('newTagDocumentoFiscale - init : index undefined');

      if(!this.docFisc)
        throw new TypeError('newTagDocumentoFiscale - init : this.docFisc undefined');

      if(!this.docFisc.DocumentoFiscale_TagDocumentoFiscale){
        this.docFisc.DocumentoFiscale_TagDocumentoFiscale = new DocumentoFiscale_TagDocumentoFiscale();
        this.docFisc.DocumentoFiscale_TagDocumentoFiscale.Tags = new Array();
        this.docFisc.DocumentoFiscale_TagDocumentoFiscale.DocumentoFiscale = this.docFisc;
      }

      this.TagDocumentoFiscale = new TagDocumentoFiscale();

      this.listeners();
    } catch (e) {
      console.log(e.message);
    }
  }

  newTagDocumentoFiscale.prototype.listeners = function(){
    try {
      var self = this;

      if(!this.index)
        throw new TypeError('newTagDocumentoFiscale - listeners : index undefined');

      /*if(!this.rootTogglePanel)
        throw new TypeError('newTagDocumentoFiscale - listeners : rootTogglePanel undefined');*/

      if(!this.root)
        throw new TypeError('newTagDocumentoFiscale - listeners : root undefined');

      var root = this.root;

      root.find(' .add-new-tag-btn').click(function(event){
        self.nextAction();
      });

      root.find(' .categoria-title').keyup(function(event){
        self.TagDocumentoFiscale.TagCategories = null;
        self.clearAllCheckboxs();
      });

      root.find(' .categoria-rows .tm-list-item').click(function(event){
        var idTagCategories = $(this).attr('data-item-index');
        self.clearAllCheckboxs();
        $(this).find(' .tm-input-row .tm-input-row__checkbox').css('background-color', '#d4d6db');
        self.TagDocumentoFiscale.TagCategories = new TagCategories();
        self.TagDocumentoFiscale.TagCategories.Id = idTagCategories;
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  newTagDocumentoFiscale.prototype.nextAction = function(callback){
    var self = this;
    var titolo = this.root.find('.tag-title').val();
    var titoloCategoria = this.root.find(' .categoria-title').val();

    if(titoloCategoria && titoloCategoria !== "" && !this.TagDocumentoFiscale.TagCategories){
      this.TagDocumentoFiscale.TagCategories = new TagCategories();
      this.TagDocumentoFiscale.TagCategories.Titolo = titoloCategoria;
    }

    if(titolo && titolo !== ""){
      this.TagDocumentoFiscale.Titolo = titolo;
      this.TagDocumentoFiscale.Save(function(){
        self.rootTogglePanel.find(' .togglePanel_content .togglePanel_inputSearch .togglePanel_inputSearch-input').keyup();

        if(callback){
          callback();
        }
      });
    }

  }

  /*######################################################
                      TagItem
    ######################################################*/

  var tag_text_struct = {
    contenuto : $('<div class="tag-item"><div class="tm-simple__text tag-item_struct"><span></span><div class="remove-tag"><i class="material-icons">close</i><div></div></div></div></div>'),
    roots : {
      element : ' .tag-item'
    }
  }

  tag_text_struct.roots.text = tag_text_struct.roots.element + ' .tagStyle span';
  tag_text_struct.roots.remove = tag_text_struct.roots.element + ' .remove-tag';

  function TagItem(docFisc, rootDocFisc, index, root, tag){
    this.docFisc = docFisc;
    this.rootDocFisc = rootDocFisc;
    this.index = index;
    this.root = root;
    this.tag = tag;//TagDocumentoFiscale
  }

  TagItem.prototype.getTagStructure = function(){
    try {
      var self = this;

      if(!this.tag || !(this.tag instanceof TagDocumentoFiscale))
        throw new TypeError('tag_text_struct - getTagStructure : this.tag undefined');

      var str = tag_text_struct.contenuto.clone();
      var titolo = this.tag.getTitolo();
      console.log(titolo);

      str.find(' .tag-item_struct span').html(titolo);

      return str;
    } catch (e) {
      console.log(e.message);
    }
  }

  TagItem.prototype.setStructure = function(callback){
    try {
      var self = this;

      if(!this.rootDocFisc)
        throw new TypeError('TagItem - setStructure : this.rootDocFisc undefined');

      if(!this.tag)
        throw new TypeError('TagItem - setStructure : this.tag undefined');

      if(!callback)
        throw new TypeError('TagItem - setStructure : this method needs a callback');

      var rootContainer = this.rootDocFisc.find('.secTag .tm-properties-row__content .tm-add-button-box__right');
      var index = rootContainer.find(' > div').length + 1;
      var str = this.getTagStructure();

      console.log(str);

      rootContainer.append(str);
      var root = rootContainer.find(' > div:nth-child(' + index + ')');
      console.log(root);

      this.root = root;
      this.index = index;

      callback();

    } catch (e) {
      console.log(e.message);
    }
  }

  TagItem.prototype.listeners = function(){
    try {
      var self = this;

      if(!this.index)
        throw new TypeError('TagItem - listeners : this.index undefined');

      if(!this.root)
        throw new TypeError('TagItem - listeners : this.root undefined');

      if(!this.docFisc)
        throw new TypeError('TagItem - listeners : this.docFisc undefined');

      this.root.find(' .tag-item_struct .remove-tag').click(function(event){
        self.docFisc.DocumentoFiscale_TagDocumentoFiscale.removeTag(self.tag, function(){
          self.root.remove();
        });
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  TagItem.prototype.init = function(){
    var self = this;

    this.setStructure(function(){
      self.listeners();
    });
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

      if(!clone.root)
        throw new TypeError('back_btn - init : root undefined');

      var self = this;
      var root = clone.root;
      root.append(this.struct);

      root.find('.btn-back').click(function() {
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
      var self = this;
      if(!clone)
        throw new TypeError('save_btn - clickEvent : this method needs clone argument!');

      if(!clone.nextAction)
        throw new TypeError('save_btn - clickEvent : nextAction undefined');

      //TODO: setFtFields
      setAllFields();
      if(parseInt(docFisc.Id) > 0){
        docFornitori.SaveRelationship(function(res){
          if (res) {
            bootbox.alert("Salvataggio con successo.");
            clone.nextAction();
          }else{
            bootbox.alert("Errore durante il salvataggio del documento.");
          }
        });
      }else{
        docFornitori.SaveRelationship(function(doc){
          if (doc) {
            if(doc.Id && parseInt(doc.Id) > 0){
              if(docFisc.DocumentoFiscale_TagDocumentoFiscale && docFisc.DocumentoFiscale_TagDocumentoFiscale.Tags && docFisc.DocumentoFiscale_TagDocumentoFiscale.Tags.length > 0){
                docFisc.Id = doc.Id;
                docFisc.Type = doc.Type;
                docFisc.DocumentoFiscale_TagDocumentoFiscale.DocumentoFiscale = new DocumentoFiscale();
                docFisc.DocumentoFiscale_TagDocumentoFiscale.DocumentoFiscale.Id = doc.Id;
                docFisc.DocumentoFiscale_TagDocumentoFiscale.DocumentoFiscale.Type = doc.Type;
                docFisc.DocumentoFiscale_TagDocumentoFiscale.SaveRelationship(function(){
                  clone.movimento.AddM_I(clone.intestatario, function(){
                    clone.movimento.AddDocumentoFiscale(clone.intestatario, doc, function(){
                      clone.movimento.Save(function(success){
                        if(success){
                          bootbox.alert("Salvataggio con successo.");
                          clone.nextAction();
                        }else{
                          bootbox.alert("Errore durante il salvataggio del movimento.");
                        }
                      });
                    });
                  });
                });
              }else{
                clone.movimento.AddM_I(clone.intestatario, function(){
                  clone.movimento.AddDocumentoFiscale(clone.intestatario, doc, function(){
                    clone.movimento.Save(function(success){
                      if(success){
                        bootbox.alert("Salvataggio con successo.");
                        clone.nextAction();
                      }else{
                        bootbox.alert("Errore durante il salvataggio del movimento.");
                      }
                    });
                  });
                });
              }
            }else{
              alert("Qualcosa è andato storto! Richiedere assistenza.");
            }
          }else{
            console.log(doc);
            bootbox.alert("Errore durante il salvataggio del documento.");
          }
        });
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  save_btn.prototype.init = function(){
    try {
      if(!clone)
        throw new TypeError('save_btn - init : this method needs clone argument!');

      if(!clone.root)
        throw new TypeError('save_btn - init : root undefined');

      var self = this;
      var root = clone.root;
      root.append(this.struct);

      root.find('.save-btn').click(function() {
        self.clickEvent();
      });
    } catch (e) {
      console.log(e.message);
    }
  }

})();
