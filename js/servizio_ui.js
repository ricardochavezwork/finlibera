function servizio_ui(root, movimento, servizi, docFisc, intestatario, prevAction, nextAction){
  this.root = root;
  this.movimento = movimento;
  this.servizi = servizi;
  this.docFisc = docFisc;
  this.intestatario = intestatario;
  this.prevAction = prevAction;
  this.nextAction = nextAction;
}

(function(){

  var clone = null;
  var docFisc = new DocumentoFiscale();
  var docFornitori = new DocumentoFornitore();
  var quickAddServizio = new quickAdd_servizio_ui();

  var servizi = new Array();//Sarà un array di servizio_single.Durante il save bisognerà utilizzare una funzione che strappa tutti i servizi dentro servizio_single.
  var servizioID = 0;

  function getServizi(){
    var sv = new Array();

    for (var i = 0; i < servizi.length; i++) {
      if(servizi[i].servizio){
        sv.push(servizi[i].servizio);
      }
    }

    return sv;
  }

  var addQuickServizi = {
    contenuto : $('<div class="tm-properties-row uk-form-horizontal addQuickServizi"><div class="tm-properties-row__content"><input type="number" class="tm-search-box__input ax-add-tag-textfield" placeholder="..." value="" style="width: 11%;"><section class="tm-add-button-box"><div class="tm-add-button-box__left"><div class="tm-add-button-panel__input"><div class="add-button ax-add-tag-button btn-addQuickServizi" style="width: 145px;margin-left: 5px;">Inserisci servizi</div></div></div><div class="tm-add-button-box__right"></div></section></div></div>'),
    roots : {
      root_addQuickServizi : function(){
        if(!clone)
          throw new TypeError('clone undefined');

        return clone.root.find('.addQuickServizi input');
      },
      root_addQuickServizi_btn : function(){
        if(!clone)
          throw new TypeError('clone undefined');

        return clone.root.find('.addQuickServizi .btn-addQuickServizi');
      }
   },
   init : function(){
      //Inserimento del valore di default : 1
      addQuickServizi.roots.root_addQuickServizi().val(1);
    },
    setListeners : function(){
      if(!clone)
        throw new TypeError('clone undefined');

      addQuickServizi.roots.root_addQuickServizi_btn().click(function(event){
        var tot = addQuickServizi.getValue();
        for (var i = 0; i < tot; i++) {
          clone.pushServizio();
        }

        addQuickServizi.roots.root_addQuickServizi().val(1);

      });
    },
    getValue : function(){
      return addQuickServizi.roots.root_addQuickServizi().val();
    }
  }

  var save_btn = {
    contenuto : $('<div class="tm-add-button-panel__input save-btn" style="background: #e6e8ec;margin-top: 40px;cursor : pointer;"><div class="add-button ax-add-tag-button" style="width: auto;text-align: center;"><strong>Salva</strong></div></div>'),
    root : ' .save-btn',
    init : function(){
      try {

        if(!clone)
          throw new TypeError('save_btn - init : clone undefined');

        var root = clone.root;
        console.log("init di save_btn");
        console.log(root);
        root.find('.save-btn').click(function() {
          console.log("Salvataggio dei servizi in corso...");
          save_btn.clickEvent();
        });
      } catch (e) {
        console.log(e.message);
      }
    },
    clickEvent : function(){
      try {

        if(!clone)
          throw new TypeError('save_btn - clickEvent : this method needs clone argument!');

        if(!clone.nextAction)
          throw new TypeError('save_btn - clickEvent : nextAction undefined');

        /**
         *  1. Controllo servizi
         *  2. Salvataggio dei servizi
         *  3. nextAction
         **/

         clone.setValuesToServizio();
         var servizio = new Servizio();
         servizio.Servizio = getServizi();
         if(!clone.docFisc){
           clone.docFisc = new DocumentoFiscale();
           clone.docFisc.Documento = new DocumentoFornitore();
           clone.docFisc.Documento.IdFornitore = clone.intestatario.Id;
         }

         console.log(servizio);

         var sv_doc = new Servizio_DocumentiFornitori();
         sv_doc.MultiSave(servizio, clone.docFisc.Documento, function(res){
           if(!res || !res.success){
             console.log(res);
             bootbox.alert('Salvataggio non avvenuto. Riprovare nuovamente!');
             servizi = [];
           }else{
             servizi = [];
             clone.nextAction();
           }
         });

      } catch (e) {
        console.log(e.message);
      }
    }
  }

  var servizi_list = {
    contenuto : $('<div class="servizi-list"></div>'),
    root : '.servizi-list'
  }

  var tag_text_struct = {
    contenuto : $('<div class="tag-item"><div class="tm-simple__text tag-item_struct"><span></span><div class="remove-tag"><i class="material-icons">close</i><div></div></div></div></div>'),
    roots : {
      element : ' .tag-item'
    }
  }

  tag_text_struct.roots.text = tag_text_struct.roots.element + ' .tagStyle span';
  tag_text_struct.roots.remove = tag_text_struct.roots.element + ' .remove-tag';

  var servizio_struct = {
    contenuto : $('<div class="intestatari-results__row cg-inquilino servizio_single"><div class="tm-intestatari-results__row-header__title" style="margin-bottom: 10px;"><div class="tm-editable-textarea" style="font-size: 14px; padding: 0px;"><div class="tm-intestatari-results__row-textarea__content"></div><div class="tm-intestatari-results__row-textarea__left"><div class="tm-intestatari-results__row-textarea__left-text"><div class="tm-properties-row__content"><section class="tm-add-button-box removeElem"><div class="tm-add-button-box__left"><div class="tm-add-button-panel__input"><div class="add-button ax-add-tag-button" style="background-color: #e6e8ec;color: #696f7a;"><i class="tm-icon tm-icon-add glyphicon glyphicon-trash"></i></div></div></div><div class="tm-add-button-box__right"></div></section></div></div></div></div></div><div class="intestatari-results__row row-doc" style="border: 2px solid #d4d6db;margin-bottom: 10px;"><div class="ms-row-list"><div class="ms-row-struct servizioImporto" style="width: 45%;border-bottom: none;border-right: none;"><div class="ms-row-content_row-color" style="background: none;"></div><div class="ms-row-content_row-content"><div class="ms-row-content_row-content_top-row" style=" height: 25px;"><div class="ms-row-content_row-content_top-row-left">Importo</div><div class="ms-row-content_row-content_top-row-right"></div></div><div class="ms-row-content_row-content_bottom-row" style=" height: 30px; padding-bottom: 13px;"><div class="ms-row-content_row-content_bottom-row_left"><input type="text" class="tm-search-box__input ax-add-tag-textfield" placeholder="..." value=""></div><div class="ms-row-content_row-content_bottom-row_right"></div></div></div></div><div class="ms-row-struct servizioData" style="width: 45%;border-bottom: none;border-right: none;"><div class="ms-row-content_row-color" style="background: none;"></div><div class="ms-row-content_row-content"><div class="ms-row-content_row-content_top-row" style=" height: 25px;"><div class="ms-row-content_row-content_top-row-left">Data</div><div class="ms-row-content_row-content_top-row-right"></div></div><div class="ms-row-content_row-content_bottom-row" style=" height: 30px; padding-bottom: 13px;"><div class="ms-row-content_row-content_bottom-row_left"><input type="text" class="tm-search-box__input ax-add-tag-textfield" placeholder="..." value=""></div><div class="ms-row-content_row-content_bottom-row_right"></div></div></div></div></div><div class="ms-row-list"><div class="ms-row-struct description" style="width: 100%;border-bottom: none;border-right: none;"><div class="ms-row-content_row-color" style=""></div><div class="ms-row-content_row-content"><div class="ms-row-content_row-content_top-row" style=" padding-bottom: 10px;"><div class="ms-row-content_row-content_top-row-left" style=" ">Descrizione</div><div class="ms-row-content_row-content_top-row-right"></div></div><div class="ms-row-content_row-content_bottom-row"><div class="ms-row-content_row-content_bottom-row_left"><input type="text" class="tm-search-box__input ax-add-tag-textfield" placeholder="..." value="" style=" height: 40px; "></div><div class="ms-row-content_row-content_bottom-row_right"></div></div></div></div></div><div class="ms-row-list toggle-fields"><div class="ms-row-struct servizioInizio" style="width: 45%;border-bottom: none;border-right: none;"><div class="ms-row-content_row-color" style="background: none;"></div><div class="ms-row-content_row-content"><div class="ms-row-content_row-content_top-row" style=" height: 25px;"><div class="ms-row-content_row-content_top-row-left">Inizio</div><div class="ms-row-content_row-content_top-row-right"></div></div><div class="ms-row-content_row-content_bottom-row" style=" height: 30px; padding-bottom: 13px;"><div class="ms-row-content_row-content_bottom-row_left"><input type="text" class="tm-search-box__input ax-add-tag-textfield" placeholder="..." value=""></div><div class="ms-row-content_row-content_bottom-row_right"></div></div></div></div><div class="ms-row-struct servizioFine" style="width: 45%;border-bottom: none;border-right: none;"><div class="ms-row-content_row-color" style="background: none;"></div><div class="ms-row-content_row-content"><div class="ms-row-content_row-content_top-row" style=" height: 25px;"><div class="ms-row-content_row-content_top-row-left">Fine</div><div class="ms-row-content_row-content_top-row-right"></div></div><div class="ms-row-content_row-content_bottom-row" style=" height: 30px; padding-bottom: 13px;"><div class="ms-row-content_row-content_bottom-row_left"><input type="text" class="tm-search-box__input ax-add-tag-textfield" placeholder="..." value=""></div><div class="ms-row-content_row-content_bottom-row_right"></div></div></div></div></div><div class="ms-row-list toggle-fields"><div class="ms-row-struct servizioNumero" style="width: 45%;border-bottom: none;border-right: none;"><div class="ms-row-content_row-color" style="background: none;"></div><div class="ms-row-content_row-content"><div class="ms-row-content_row-content_top-row" style=" height: 25px;"><div class="ms-row-content_row-content_top-row-left">Numero</div><div class="ms-row-content_row-content_top-row-right"></div></div><div class="ms-row-content_row-content_bottom-row" style=" height: 30px; padding-bottom: 13px;"><div class="ms-row-content_row-content_bottom-row_left"><input type="text" class="tm-search-box__input ax-add-tag-textfield" placeholder="..." value=""></div><div class="ms-row-content_row-content_bottom-row_right"></div></div></div></div></div><div class="tm-add-button-panel__input toggle-btn" style="background: #e6e8ec;margin-top: 10px; cursor : pointer;"><div class="add-button ax-add-tag-button" style="width: auto;text-align: center;"><strong>Mostra altri campi</strong></div></div><div class="tm-editable-textarea servizioTag" style=" padding: 3px;"><div class="tm-properties-row__icon"><i class="tm-icon glyphicon glyphicon-tags"></i></div><div class="tm-properties-row__label" style=" width: 150px;">Tags</div><div class="tm-properties-row__content"><section class="tm-add-button-box"><div class="tm-add-button-box__left"><div class="tm-add-button-panel__input"><div class="add-button ax-add-tag-button"><i class="tm-icon tm-icon-add glyphicon glyphicon-plus"></i></div></div></div><div class="tm-add-button-box__right"></div></section></div></div><div class="tag_searchPanel"><div class="togglePanel"><div class="togglePanel_lef-space"></div><div class="togglePanel_content"><div class="togglePanel_content-actionsPanel"><div class="togglePanel_inputSearch"><i class="material-icons">search</i><input type="text" class="togglePanel_inputSearch-input" placeholder="Ricerca" value=""></div><div class="togglePanel_closePanel" title="Chiudi"><i class="material-icons">close</i></div></div><div class="togglePanel_content-elementList tm-list tm-hack-scrollbar"></div></div></div></div><div class="tm-editable-textarea servizioAptStz" style=" padding: 3px;"><div class="tm-properties-row__icon"><i class="material-icons" style=" font-size: 24px;">room</i></div><div class="tm-properties-row__label" style=" width: 150px;">Appartamento/Stanza</div><div class="tm-properties-row__content"><section class="tm-add-button-box"><div class="tm-add-button-box__left"><div class="tm-add-button-panel__input"><div class="add-button ax-add-tag-button"><i class="tm-icon tm-icon-add glyphicon glyphicon-plus"></i></div></div></div><div class="tm-add-button-box__right"></div></section></div></div><div class="aptOrStanze_searchPanel"><div class="togglePanel"><div class="togglePanel_lef-space"></div><div class="togglePanel_content"><div class="togglePanel_content-actionsPanel"><div class="togglePanel_inputSearch"><i class="material-icons">search</i><input type="text" class="togglePanel_inputSearch-input" placeholder="Ricerca" value=""></div><div class="togglePanel_closePanel" title="Chiudi"><i class="material-icons">close</i></div></div><div class="togglePanel_content-elementList tm-list tm-hack-scrollbar"></div></div></div></div><div class="tm-editable-textarea servizioIns" style=" padding: 3px;"><div class="tm-properties-row__icon"><i class="material-icons" style=" font-size: 24px;">people</i></div><div class="tm-properties-row__label" style=" width: 150px;">Inquilino</div><div class="tm-properties-row__content"><section class="tm-add-button-box"><div class="tm-add-button-box__left"><div class="tm-add-button-panel__input"><div class="add-button ax-add-tag-button"><i class="tm-icon tm-icon-add glyphicon glyphicon-plus"></i></div></div></div><div class="tm-add-button-box__right"></div></section></div></div><div class="ins_searchPanel"><div class="togglePanel"><div class="togglePanel_lef-space"></div><div class="togglePanel_content"><div class="togglePanel_content-actionsPanel"><div class="togglePanel_inputSearch"><i class="material-icons">search</i><input type="text" class="togglePanel_inputSearch-input" placeholder="Ricerca" value=""></div><div class="togglePanel_closePanel" title="Chiudi"><i class="material-icons">close</i></div></div><div class="togglePanel_content-elementList tm-list tm-hack-scrollbar"></div></div></div></div></div></div>'),
    roots : {
      elRoot : '.servizio_single',
      elRoot_Top : '.tm-intestatari-results__row-header__title',
      elRoot_Bottom : '.intestatari-results__row',
      removeElem : '.removeElem',
      toggle : '.toggle-fields',
      field_background : '.ms-row-content_row-color',
      importo : {
      },
      data : {
      },
      description : {
      },
      inizio : {
      },
      fine : {
      },
      numero : {
      },
      tag : {
      },
      aptStz : {
      },
      ins : {
      }
    }
  }

  var servizio_struct_root_bottom = servizio_struct.roots.elRoot_Bottom;
  var root_input = ' .ms-row-content_row-content input';
  var root_field_color = ' .ms-row-content_row-color';
  var requiredColor = '#ff5d5d';
  var okayColor = 'none';

  servizio_struct.roots.toogle = servizio_struct_root_bottom + ' .toggle-btn';
  servizio_struct.roots.importo.root = servizio_struct_root_bottom + ' .servizioImporto';
  servizio_struct.roots.importo.input = servizio_struct.roots.importo.root + root_input;
  servizio_struct.roots.data.root = servizio_struct_root_bottom + ' .servizioData';
  servizio_struct.roots.data.input = servizio_struct.roots.data.root + root_input;
  servizio_struct.roots.description.root = servizio_struct_root_bottom + ' .description';
  servizio_struct.roots.description.input = servizio_struct.roots.description.root + root_input;
  servizio_struct.roots.inizio.root = servizio_struct_root_bottom + ' .servizioInizio';
  servizio_struct.roots.inizio.input = servizio_struct.roots.inizio.root + root_input;
  servizio_struct.roots.fine.root = servizio_struct_root_bottom + ' .servizioFine';
  servizio_struct.roots.fine.input = servizio_struct.roots.fine.root + root_input;
  servizio_struct.roots.numero.root = servizio_struct_root_bottom + ' .servizioNumero';
  servizio_struct.roots.numero.input = servizio_struct.roots.numero.root + root_input;
  servizio_struct.roots.tag.root = servizio_struct_root_bottom + ' .servizioTag';
  servizio_struct.roots.tag.container = servizio_struct.roots.tag.root + ' .tm-properties-row__content .tm-add-button-box__right';
  servizio_struct.roots.aptStz.root = servizio_struct_root_bottom + ' .servizioAptStz';
  servizio_struct.roots.aptStz.container = servizio_struct.roots.aptStz.root + ' .tm-properties-row__content .tm-add-button-box__right';
  servizio_struct.roots.ins.root = servizio_struct_root_bottom + ' .servizioIns';
  servizio_struct.roots.ins.container = servizio_struct.roots.ins.root + ' .tm-properties-row__content .tm-add-button-box__right';

  //TogglePanel roots

  servizio_struct.roots.tag_searchPanel = servizio_struct_root_bottom + " .tag_searchPanel";
  servizio_struct.roots.aptOrStanze_searchPanel = servizio_struct_root_bottom + " .aptOrStanze_searchPanel";
  servizio_struct.roots.ins_searchPanel = servizio_struct_root_bottom + " .ins_searchPanel";

  function header_panelActions(){
    /*this.struct = '<div class="tm-properties-row uk-form-horizontal rowPanelActions"><div class="tm-properties-row__content"><section class="tm-add-button-box"><div class="tm-add-button-box__left"><div class="tm-add-button-panel__input"><div class="add-button ax-add-tag-button btn-back" style="width : 90px"><i class="tm-icon tm-icon-add glyphicon glyphicon-arrow-left"></i></div></div></div><div class="tm-add-button-box__right"></div></section></div></div>';*/
    this.struct = '<div class="ms-header-panel__right-align-items rowPanelActions"><div class="ms-btn-container ms-btn-default btn-back"><div class="ms-btn-container__icon"><i class="material-icons">arrow_back</i></div><div class="ms-btn-container__text ">Indietro</div></div><div class="ms-btn-container ms-btn-default toggle-quickAdd-servizi"><div class="ms-btn-container__icon"><i class="material-icons">flash_on</i></div><div class="ms-btn-container__text ">Aggiunta rapida</div></div></div>';
  }

  // Methods
  header_panelActions.prototype.clickEvent = function(){
    try {

      if(!clone)
        throw new TypeError('header_panelActions - clickEvent : this method needs clone argument!');

      if(!clone.prevAction)
        throw new TypeError('header_panelActions - clickEvent : prevAction undefined');

      clone.prevAction();
    } catch (e) {
      console.log(e.message);
    }
  };

  header_panelActions.prototype.init = function(){
    try {
      if(!clone)
        throw new TypeError('header_panelActions - init : this method needs clone argument!');

      if(!clone.root)
        throw new TypeError('header_panelActions - init : root undefined');

      var self = this;
      var root = clone.root;
      root.append(this.struct);

      root.find('.btn-back').click(function() {
        self.clickEvent();
      });

      root.find('.toggle-quickAdd-servizi').click(function(){
        root.find('.quickAdd-servizi').toggle();
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  servizio_ui.prototype.init = function(callback){
    try {
      var self = this;

      if(!this.root)
        throw new TypeError('servizio_ui - init : root undefined');

      if(!this.movimento)
        throw new TypeError('servizio_ui - init : movimento undefined');

      clone = self;

      var backBtn = new header_panelActions();
      backBtn.init();

      servizi = [];

      self.loadStruct();
      /*var saveBtn = new save_btn();
      saveBtn.init();*/

      if(callback){
        callback();
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  servizio_ui.prototype.pushServizio = function(sv, quickAdd){
    try {
      var self = this;

      if(!this.root)
        throw new TypeError('servizio_ui - pushServizio : root undefined');

      if(!sv || !(sv instanceof Servizio)){
        sv = new Servizio();
      }

      //this.root.append(servizio_struct.contenuto);
      var index = this.root.find(servizi_list.root + ' > div').length + 1;
      self.root.find(servizi_list.root).append(servizio_struct.contenuto.clone());
      servizioID++;
      var root = self.root.find(servizi_list.root + ' > div:nth-child(' + index + ')');

      var sv_single = new servizio_single();
      sv_single.index = index;
      sv_single.id = servizioID;
      sv_single.root = root;
      sv_single.servizio = sv;
      sv_single.init();
      servizi.push(sv_single);
      if((sv.Id && parseInt(sv.Id) > 0) || quickAdd){
        sv_single.setValuesFromServizio();
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  servizio_ui.prototype.hasServizi = function(){
    try {
      var self = this;
      var bool = false;//It's empty

      if(self.servizi && self.servizi.length > 0){
        bool = true;//It has servizi
      }

      return bool;

    } catch (e) {
      console.log(e.message);
    }
  }

  servizio_ui.prototype.loadStruct = function(){
    try {
      var self = this;
      if(!this.root)
        throw new TypeError('servizio_ui - loadStruct : root undefined');

      if(!addQuickServizi || !addQuickServizi.contenuto )
        throw new TypeError('servizio_ui - loadStruct : addQuickServizi &&  global variable error');

      this.root.append(addQuickServizi.contenuto);
      addQuickServizi.init();
      addQuickServizi.setListeners();

      this.root.append('<div class="quickAdd-servizi" style="display: none;"></div>');
      quickAddServizio.root = this.root.find(' .quickAdd-servizi');
      quickAddServizio.setContent();
      quickAddServizio.init();

      this.root.append(servizi_list.contenuto.clone());

      if(self.hasServizi()){
        self.loadServizi();
      }else{
        var sv = new Servizio();
        self.pushServizio();
      }

      this.root.append($('<div class="tm-properties-row uk-form-horizontal totImportoServizi" style=" padding: 5px; justify-content: center; align-items: center; align-content: center; "><div>Totale Importo Servizi :</div><div class="totImportoServizi__Importo" style=" margin-left: 30px; font-weight: bold;">0</div></div>'));
      refresh_TotImportoServizi();

      this.root.append(save_btn.contenuto);
      save_btn.init();

    } catch (e) {
      console.log(e.message);
    }
  }

  servizio_ui.prototype.setValuesToServizio = function(){
    try {
      if(!servizi)
        throw new TypeError('servizio_ui - setValues : servizi undefined');

      for (var i = 0; i < servizi.length; i++) {
        servizi[i].setValuesToServizio();
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  servizio_ui.prototype.loadServizi = function(){
    try {
      var self = this;

      if(!this.servizi)
        throw new TypeError('servizio_ui - loadServizi : this.servizi undefined');

      if(this.servizi && this.servizi.length > 0){
        for (var i = 0; i < this.servizi.length; i++) {
          var sv_clone = $.extend(new Servizio(), this.servizi[i]);
          sv_clone.Linking();
          this.pushServizio(sv_clone);
        }
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  servizio_ui.prototype.setValuesFromServizio = function(){
    try {
      if(!servizi)
        throw new TypeError('servizio_ui - setValues : servizi undefined');

      for (var i = 0; i < servizi.length; i++) {
        servizi[i].setValuesFromServizio();
      }
    } catch (e) {
      console.log(e.message);
    }

  }

  function quickAdd_servizio(Importo, Data, Descrizione, Inizio, Fine, Numero, Tags, Appartamenti, Stanze, Inquilini){
    this.Importo = Importo;
    this.Data = Data;
    this.Descrizione = Descrizione;
    this.Inizio = Inizio;
    this.Fine = Fine;
    this.Numero = Numero;
    this.Tags = Tags;
    this.Appartamenti = Appartamenti;
    this.Stanze = Stanze;
    this.Inquilini = Inquilini;
  }

  quickAdd_servizio.prototype.init = function(){
    this.Tags = new Array();
    this.Appartamenti = new Array();
    this.Stanze = new Array();
    this.Inquilini = new Array();
  }

  quickAdd_servizio.prototype.clearFields = function(){
    this.Importo = null;
    this.Data = null;
    this.Descrizione = null;
    this.Inizio = null;
    this.Fine = null;
    this.Numero = null;
    this.Tags = [];
    this.Appartamenti = [];
    this.Stanze = [];
    this.Inquilini = [];
  }

  function quickAdd_servizio_ui(root, servizio, roots){
    this.root = root;
    this.servizio = servizio;
    this.roots = roots;
  }

  quickAdd_servizio_ui.prototype.setContent = function(){
    try {
      if(!this.root)
        throw new TypeError('quickAdd_servizio_ui - setContent : this.root undefined');

      var str = $('<div class="intestatari-results__row"><div class="ms-header-panel__left-align-items"><div class="ms-btn-container ms-btn-simple btn-clear-fields" style=" background-color: #14699b;"><div class="ms-btn-container__text ">Svuota</div><div class="ms-btn-container__icon" style=" color: #e6e8ec;"><i class="material-icons">delete_sweep</i></div></div></div><div class="intestatari-results__row row-doc" style="border: 2px solid #14699b;margin-bottom: 10px;"><div class="ms-row-list"><div class="ms-row-struct servizioImporto" style="width: 45%;border-bottom: none;border-right: none;"><div class="ms-row-content_row-color" style="background: none;"></div><div class="ms-row-content_row-content"><div class="ms-row-content_row-content_top-row" style=" height: 25px;"><div class="ms-row-content_row-content_top-row-left">Importo</div><div class="ms-row-content_row-content_top-row-right"></div></div><div class="ms-row-content_row-content_bottom-row" style=" height: 30px; padding-bottom: 13px;"><div class="ms-row-content_row-content_bottom-row_left"><input type="text" class="tm-search-box__input ax-add-tag-textfield" placeholder="..." value=""></div><div class="ms-row-content_row-content_bottom-row_right"></div></div></div></div><div class="ms-row-struct servizioData" style="width: 45%;border-bottom: none;border-right: none;"><div class="ms-row-content_row-color" style="background: none;"></div><div class="ms-row-content_row-content"><div class="ms-row-content_row-content_top-row" style=" height: 25px;"><div class="ms-row-content_row-content_top-row-left">Data</div><div class="ms-row-content_row-content_top-row-right"></div></div><div class="ms-row-content_row-content_bottom-row" style=" height: 30px; padding-bottom: 13px;"><div class="ms-row-content_row-content_bottom-row_left"><input type="text" class="tm-search-box__input ax-add-tag-textfield" placeholder="..." value=""></div><div class="ms-row-content_row-content_bottom-row_right"></div></div></div></div></div><div class="ms-row-list"><div class="ms-row-struct description" style="width: 100%;border-bottom: none;border-right: none;"><div class="ms-row-content_row-color" style=""></div><div class="ms-row-content_row-content"><div class="ms-row-content_row-content_top-row" style=" padding-bottom: 10px;"><div class="ms-row-content_row-content_top-row-left" style=" ">Descrizione</div><div class="ms-row-content_row-content_top-row-right"></div></div><div class="ms-row-content_row-content_bottom-row"><div class="ms-row-content_row-content_bottom-row_left"><input type="text" class="tm-search-box__input ax-add-tag-textfield" placeholder="..." value="" style=" height: 40px; "></div><div class="ms-row-content_row-content_bottom-row_right"></div></div></div></div></div><div class="ms-row-list toggle-fields" style="display: none;"><div class="ms-row-struct servizioInizio" style="width: 45%;border-bottom: none;border-right: none;"><div class="ms-row-content_row-color" style="background: none;"></div><div class="ms-row-content_row-content"><div class="ms-row-content_row-content_top-row" style=" height: 25px;"><div class="ms-row-content_row-content_top-row-left">Inizio</div><div class="ms-row-content_row-content_top-row-right"></div></div><div class="ms-row-content_row-content_bottom-row" style=" height: 30px; padding-bottom: 13px;"><div class="ms-row-content_row-content_bottom-row_left"><input type="text" class="tm-search-box__input ax-add-tag-textfield" placeholder="..." value=""></div><div class="ms-row-content_row-content_bottom-row_right"></div></div></div></div><div class="ms-row-struct servizioFine" style="width: 45%;border-bottom: none;border-right: none;"><div class="ms-row-content_row-color" style="background: none;"></div><div class="ms-row-content_row-content"><div class="ms-row-content_row-content_top-row" style=" height: 25px;"><div class="ms-row-content_row-content_top-row-left">Fine</div><div class="ms-row-content_row-content_top-row-right"></div></div><div class="ms-row-content_row-content_bottom-row" style=" height: 30px; padding-bottom: 13px;"><div class="ms-row-content_row-content_bottom-row_left"><input type="text" class="tm-search-box__input ax-add-tag-textfield" placeholder="..." value=""></div><div class="ms-row-content_row-content_bottom-row_right"></div></div></div></div></div><div class="ms-row-list toggle-fields" style="display: none;"><div class="ms-row-struct servizioNumero" style="width: 45%;border-bottom: none;border-right: none;"><div class="ms-row-content_row-color" style="background: none;"></div><div class="ms-row-content_row-content"><div class="ms-row-content_row-content_top-row" style=" height: 25px;"><div class="ms-row-content_row-content_top-row-left">Numero</div><div class="ms-row-content_row-content_top-row-right"></div></div><div class="ms-row-content_row-content_bottom-row" style=" height: 30px; padding-bottom: 13px;"><div class="ms-row-content_row-content_bottom-row_left"><input type="text" class="tm-search-box__input ax-add-tag-textfield" placeholder="..." value=""></div><div class="ms-row-content_row-content_bottom-row_right"></div></div></div></div></div><div class="tm-add-button-panel__input toggle-btn" style="background: #e6e8ec;margin-top: 10px; cursor : pointer;"><div class="add-button ax-add-tag-button" style="width: auto;text-align: center;"><strong>Mostra altri campi</strong></div></div><div class="tm-editable-textarea servizioTag" style=" padding: 3px;"><div class="tm-properties-row__icon"><i class="tm-icon glyphicon glyphicon-tags"></i></div><div class="tm-properties-row__label" style=" width: 150px;">Tags</div><div class="tm-properties-row__content"><section class="tm-add-button-box"><div class="tm-add-button-box__left"><div class="tm-add-button-panel__input"><div class="add-button ax-add-tag-button"><i class="tm-icon tm-icon-add glyphicon glyphicon-plus"></i></div></div></div><div class="tm-add-button-box__right"></div></section></div></div><div class="tag_searchPanel" style="display: none;"><div class="togglePanel"><div class="togglePanel_lef-space"></div><div class="togglePanel_content"><div class="togglePanel_content-actionsPanel"><div class="togglePanel_inputSearch"><i class="material-icons">search</i><input type="text" class="togglePanel_inputSearch-input" placeholder="Ricerca" value=""></div><div class="togglePanel_closePanel" title="Chiudi"><i class="material-icons">close</i></div></div><div class="togglePanel_content-elementList tm-list tm-hack-scrollbar"></div></div></div></div><div class="tm-editable-textarea servizioAptStz" style=" padding: 3px;"><div class="tm-properties-row__icon"><i class="material-icons" style=" font-size: 24px;">room</i></div><div class="tm-properties-row__label" style=" width: 150px;">Appartamento/Stanza</div><div class="tm-properties-row__content"><section class="tm-add-button-box"><div class="tm-add-button-box__left"><div class="tm-add-button-panel__input"><div class="add-button ax-add-tag-button"><i class="tm-icon tm-icon-add glyphicon glyphicon-plus"></i></div></div></div><div class="tm-add-button-box__right"></div></section></div></div><div class="aptOrStanze_searchPanel" style="display: none;"><div class="togglePanel"><div class="togglePanel_lef-space"></div><div class="togglePanel_content"><div class="togglePanel_content-actionsPanel"><div class="togglePanel_inputSearch"><i class="material-icons">search</i><input type="text" class="togglePanel_inputSearch-input" placeholder="Ricerca" value=""></div><div class="togglePanel_closePanel" title="Chiudi"><i class="material-icons">close</i></div></div><div class="togglePanel_content-elementList tm-list tm-hack-scrollbar"></div></div></div></div><div class="tm-editable-textarea servizioIns" style=" padding: 3px;"><div class="tm-properties-row__icon"><i class="material-icons" style=" font-size: 24px;">people</i></div><div class="tm-properties-row__label" style=" width: 150px;">Inquilino</div><div class="tm-properties-row__content"><section class="tm-add-button-box"><div class="tm-add-button-box__left"><div class="tm-add-button-panel__input"><div class="add-button ax-add-tag-button"><i class="tm-icon tm-icon-add glyphicon glyphicon-plus"></i></div></div></div><div class="tm-add-button-box__right"></div></section></div></div><div class="ins_searchPanel" style="display: none;"><div class="togglePanel"><div class="togglePanel_lef-space"></div><div class="togglePanel_content"><div class="togglePanel_content-actionsPanel"><div class="togglePanel_inputSearch"><i class="material-icons">search</i><input type="text" class="togglePanel_inputSearch-input" placeholder="Ricerca" value=""></div><div class="togglePanel_closePanel" title="Chiudi"><i class="material-icons">close</i></div></div><div class="togglePanel_content-elementList tm-list tm-hack-scrollbar"></div></div></div></div></div><div class="ms-header-panel__left-align-items"><div class="ms-btn-container ms-btn-simple btn-genera-servizi" style=" background-color: #14699b;"><div class="ms-btn-container__text ">Genera servizi</div><div class="ms-btn-container__icon" style=" color: #FFEB3B;"><i class="material-icons">flash_on</i></div></div></div></div>');

      this.root.append(str.clone());

    } catch (e) {
      console.log(e.message);
    }
  }

  quickAdd_servizio_ui.prototype.init = function(){
    try {
      var self = this;

      if(!this.root)
        throw new TypeError('quickAdd_servizio_ui - init : this.root');

      //self.setContent();
      this.setRoots();
      this.setDefaultValues();
      this.servizio = new quickAdd_servizio();
      this.servizio.init();
      this.setListeners();



    } catch (e) {
      console.log(e.message);
    }
  }

  /**
   * str - className element
   */
  quickAdd_servizio_ui.prototype.getRoot = function(str){
    try {
      var self = this;

      if(!str)
        throw new TypeError('quickAdd_servizio_ui - getRoot : str undefined');

      if(!this.root)
        throw new TypeError('quickAdd_servizio_ui - getRoot : this.root undefined');

      var root = this.root.find(' ' + str);

      return root;
    } catch (e) {
      console.log(e.message);
    }
  }

  quickAdd_servizio_ui.prototype.getValue = function(fieldRoot){
    try {
      var self = this;

      if(!fieldRoot)
        throw new TypeError('quickAdd_servizio_ui - getValue : fieldRoot undefined');

      var val = fieldRoot.val();

      return val;
    } catch (e) {
      console.log(e.message);
    }
  }

  quickAdd_servizio_ui.prototype.setDefaultValue = function(fieldRoot){
    try {
      var self = this;

      if(!fieldRoot)
        throw new TypeError('quickAdd_servizio_ui - getValue : fieldRoot undefined');

      fieldRoot.val('');

    } catch (e) {
      console.log(e.message);
    }
  }

  /**
   * @TODO : Manca svuotare gli elementi dei vari Dividers
   */
  quickAdd_servizio_ui.prototype.setDefaultValues = function(){
    try {
      var self = this;

      if(!this.roots)
        throw new TypeError('quickAdd_servizio_ui - setDefaultValues : this.roots undefined');

        this.setDefaultValue(this.roots.importo);
        this.setDefaultValue(this.roots.data);
        this.setDefaultValue(this.roots.descrizione);
        this.setDefaultValue(this.roots.inizio);
        this.setDefaultValue(this.roots.fine);
        this.setDefaultValue(this.roots.numero);

        this.root.find(" .servizioTag .tm-properties-row__content .tm-add-button-box__right").empty();
        this.root.find(" .servizioAptStz .tm-properties-row__content .tm-add-button-box__right").empty();
        this.root.find(" .servizioIns .tm-properties-row__content .tm-add-button-box__right").empty();

    } catch (e) {
      console.log(e.message);
    }
  }

  quickAdd_servizio_ui.prototype.setRoots = function(){
    try {
      var self = this;
      this.roots = {
        importo : self.getRoot('.servizioImporto .ms-row-content_row-content input'),
        data : self.getRoot('.servizioData .ms-row-content_row-content input'),
        descrizione : self.getRoot('.description .ms-row-content_row-content input'),
        inizio : self.getRoot('.servizioInizio .ms-row-content_row-content input'),
        fine : self.getRoot('.servizioFine .ms-row-content_row-content input'),
        numero : self.getRoot('.servizioNumero .ms-row-content_row-content input'),
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  quickAdd_servizio_ui.prototype.setValuesToServizio = function(){
    try {
      var self= this;

      if(!this.roots)
        throw new TypeError('quickAdd_servizio_ui - setValuesToServizio : this.roots undefined');

      var roots = this.roots;
      this.servizio.Importo = this.getValue(roots.importo);
      this.servizio.Data = this.getValue(roots.data);
      this.servizio.Descrizione = this.getValue(roots.descrizione);
      this.servizio.Inizio = this.getValue(roots.inizio);
      this.servizio.Fine = this.getValue(roots.fine);
      this.servizio.Numero = this.getValue(roots.numero);

    } catch (e) {
      console.log(e.message);
    }
  }

  quickAdd_servizio_ui.prototype.setBtnListeners = function(){
    var self = this;

    if(!this.root)
      throw new TypeError('quickAdd_servizio_ui - setListeners : this.root undefined');

    if(!this.roots)
      throw new TypeError("quickAdd_servizio_ui - setListeners : this.roots undefined");

    /*AptStz*/

    var aptStz_root = this.root.find(" .servizioAptStz");
    var ins_root = this.root.find(" .servizioIns");
    var tag_root = this.root.find(" .servizioTag");

    aptStz_root.find(" .ax-add-tag-button").click(function(event){
      self.root.find(" .aptOrStanze_searchPanel").toggle();
      var aptStanze_manager = new aptStz_manager();
      aptStanze_manager.quickAdd = 1;
      aptStanze_manager.servizio = self.servizio;
      aptStanze_manager.rootServizio = self.root;
      aptStanze_manager.init();
    });

    ins_root.find(" .ax-add-tag-button").click(function(event){
      self.root.find(" .ins_searchPanel").toggle();
      var inquilinoStanze_manager = new ins_manager();
      inquilinoStanze_manager.quickAdd = 1;
      inquilinoStanze_manager.servizio = self.servizio;
      inquilinoStanze_manager.rootServizio = self.root;
      inquilinoStanze_manager.init();
    });

    tag_root.find(" .ax-add-tag-button").click(function(event){
      self.root.find(" .tag_searchPanel").toggle();
      var tag_manager = new tagServizi_manager();
      tag_manager.quickAdd = 1;
      tag_manager.servizio = self.servizio;
      tag_manager.rootServizio = self.root;
      tag_manager.init();
    });

  }

  quickAdd_servizio_ui.prototype.setListeners = function(){
    try {
      var self = this;

      if(!this.root)
        throw new TypeError('quickAdd_servizio_ui - setListeners : this.root undefined');

      if(!this.roots)
        throw new TypeError("quickAdd_servizio_ui - setListeners : this.roots undefined");

      var toggleBtn_root = this.root.find(' .toggle-btn');
      var clearFields = this.root.find('.ms-header-panel__left-align-items .btn-clear-fields');
      var quickAddBtn = this.root.find('.ms-header-panel__left-align-items .btn-genera-servizi');

      toggleBtn_root.click(function(event){
        self.root.find('.toggle-fields').toggle();
        if(self.root.find('.toggle-fields').css('display') === "none"){
          toggleBtn_root.find(' .add-button strong').html("Mostra altri campi");
        }else{
          toggleBtn_root.find(' .add-button strong').html("Nascondi altri campi");
        }
      });

      clearFields.click(function(event){
        self.setDefaultValues();
        self.servizio.clearFields();
      });

      quickAddBtn.click(function(event){
        self.setValuesToServizio();
        self.generateServizi();
      });

      this.setBtnListeners();

    } catch (e) {
      console.log(e.message);
    }
  }

  quickAdd_servizio_ui.prototype.generateServizi = function(){
    try {
      var self = this;
      var divider = null;
      var tipologia = 0;

      if(!this.servizio)
        throw new TypeError("quickAdd_servizio_ui - generateServizi : this.servizio undefined");

      if(!clone)
        throw new TypeError('clone undefined');

      if(this.servizio.Inquilini && this.servizio.Inquilini.length > 0){
        divider = this.servizio.Inquilini;
        tipologia = 1;
      }

      if(this.servizio.Appartamenti && this.servizio.Appartamenti.length > 0){
        divider = this.servizio.Appartamenti;
        tipologia = 2;
      }

      if(this.servizio.Stanze && this.servizio.Stanze.length > 0){
        divider = this.servizio.Stanze;
        tipologia = 3;
      }

      if(divider && divider.length === 1 && this.servizio.Tags && this.servizio.Tags.length > 1){
        var tags = this.servizio.Tags;
        for (var i = 0; i < tags.length; i++) {
          var sv = new Servizio();
          sv.Servizio_TagServizio = new Servizio_TagServizio();
          sv.Servizio_TagServizio.Tags = new Array();
          sv.Servizio_TagServizio.Tags.push(tags[i]);
          sv.setValuesFromQuickAdd(self.servizio);
          this.setValuesFromDivider(divider[0], tipologia, sv);
          clone.pushServizio(sv, true);
        }
      }else if(divider && divider.length > 0){

        /*Divisione dell'importo in base al numero dei Dividers*/
        if(self.servizio.Importo && parseFloat(self.servizio.Importo) !== 0){
          self.servizio.Importo = parseFloat(self.servizio.Importo)/divider.length;
        }

        for (var i = 0; i < divider.length; i++) {
          var sv = new Servizio();
          sv.setValuesFromQuickAdd(self.servizio);
          this.setValuesFromDivider(divider[i], tipologia, sv);
          if(this.servizio.Tags && this.servizio.Tags.length > 0){
            sv.Servizio_TagServizio = new Servizio_TagServizio();
            sv.Servizio_TagServizio.Tags = this.servizio.Tags;
            clone.pushServizio(sv, true);
          }
        }
      }else{
        alert("Nessuna generazione rilevata!");
      }

      this.setDefaultValues();
      this.servizio.clearFields();

    } catch (e) {
      console.log(e.message);
    }
  }

  quickAdd_servizio_ui.prototype.setValuesFromDivider = function(divider, tipologia, servizio){
    try {
      if(!divider)
        throw new TypeError("quickAdd_servizio_ui - setValuesFromDivider : divider undefined");

      if(!tipologia)
        throw new TypeError("quickAdd_servizio_ui - setValuesFromDivider : tipologia undefined");

      if(!servizio)
        throw new TypeError("quickAdd_servizio_ui - setValuesFromDivider : servizio undefined");

      switch (parseInt(tipologia)) {
        case 1:
          servizio.IdInquilinoStanze = divider.Id;
          servizio.ServizioIns = divider;
          break;
        case 2:
          servizio.IdAppartamento = divider.Id;
          servizio.ServizioAppartamento = divider;
          break;
        case 3:
          servizio.IdAppartamentiStanze = divider.Id;
          servizio.ServizioStanza = divider;
          break;
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  function servizio_single(index, id, root, servizio){
    this.index = index;
    this.id = id;
    this.root = root;
    this.servizio = servizio;
    this.fields = null;
  }

  servizio_single.prototype.init = function(){
    try {

      var self = this;
      if(!this.index || !(parseInt(this.index) > 0))
        throw new TypeError('servizio_single - init : index undefined');

      if(!this.root)
        throw new TypeError('servizio_single - init : root undefined');

      if(!this.servizio)
        throw new TypeError('servizio_single - init : this.servizio undefined');

      if(this.index === 1){
        this.root.find(servizio_struct.roots.description.input).focus();
      }

      if(!this.servizio.ServizioPeriodo || !(this.servizio.ServizioPeriodo instanceof ServizioPeriodo) && !this.servizio.ServizioPeriodo.hasValue()){
        this.setToggle();
      }

      this.root.find(servizio_struct.roots.tag_searchPanel).toggle();
      this.root.find(servizio_struct.roots.aptOrStanze_searchPanel).toggle();
      this.root.find(servizio_struct.roots.ins_searchPanel).toggle();

      this.root.find(servizio_struct.roots.removeElem).click(function(){
        for (var i = 0; i < servizi.length; i++) {
          if(servizi[i].id && servizi[i].id === self.id){
            servizi.splice(i, 1);
            self.root.remove();
          }
        }
      });

      //Toggle panel
      this.root.find(servizio_struct.roots.tag.root + " .ax-add-tag-button").click(function(event){
        self.root.find(servizio_struct.roots.tag_searchPanel).toggle();
        //TODO: Inserire controlli per vedere se l'azione è un show o un hidden
        var tag_manager = new tagServizi_manager();
        tag_manager.servizio = self.servizio;
        tag_manager.rootServizio = self.root;
        tag_manager.init();
        //TODO: Controllare di quale root c'è bisogno per tag_manager.root
        //tag_manager.root = servizio_struct.roots.tag.root;
        //tag_manager.rootServizio = self.root.find(servizio_struct.roots.tag.root);
      });

      this.root.find(servizio_struct.roots.aptStz.root + " .ax-add-tag-button").click(function(event){
        self.root.find(servizio_struct.roots.aptOrStanze_searchPanel).toggle();
        var aptStanze_manager = new aptStz_manager();
        aptStanze_manager.servizio = self.servizio;
        aptStanze_manager.rootServizio = self.root;
        aptStanze_manager.init();
      });

      this.root.find(servizio_struct.roots.ins.root + " .ax-add-tag-button").click(function(event){
        self.root.find(servizio_struct.roots.ins_searchPanel).toggle();
        var inquilinoStanze_manager = new ins_manager();
        inquilinoStanze_manager.servizio = self.servizio;
        inquilinoStanze_manager.rootServizio = self.root;
        inquilinoStanze_manager.init();
      });

      //toggle
      this.root.find(servizio_struct.roots.toogle).click(function(event){
        self.root.find('.toggle-fields').toggle();
        if(self.root.find('.toggle-fields').css('display') === "none"){
          self.root.find(servizio_struct.roots.toogle + ' .add-button strong').html("Mostra altri campi");
        }else{
          self.root.find(servizio_struct.roots.toogle + ' .add-button strong').html("Nascondi altri campi");
        }
      });

      this.fields = {
        importo_field : new importo_ui(),
        data_field : new data_ui(),
        num_field : new numero_ui(),
        periodo_field : new periodo_ui(),
        descrizione_field : new descrizione_ui()
      };

      this.fields.importo_field.servizio = this.servizio;
      this.fields.importo_field.rootServizio = this.root;
      this.fields.importo_field.root = servizio_struct.roots.importo.root;
      this.fields.importo_field.input = servizio_struct.roots.importo.input;
      this.fields.importo_field.init();

      this.fields.data_field.servizio = this.servizio;
      this.fields.data_field.rootServizio = this.root;
      this.fields.data_field.root = servizio_struct.roots.data.root;
      this.fields.data_field.input = servizio_struct.roots.data.input;
      this.fields.data_field.init();

      this.fields.num_field.servizio = this.servizio;
      this.fields.num_field.rootServizio = this.root;
      this.fields.num_field.root = servizio_struct.roots.numero.root;
      this.fields.num_field.input = servizio_struct.roots.numero.input;
      this.fields.num_field.init();

      this.fields.periodo_field.servizio = this.servizio;
      this.fields.periodo_field.rootServizio = this.root;
      this.fields.periodo_field.rootInizio = servizio_struct.roots.inizio.root;
      this.fields.periodo_field.inizio_input = servizio_struct.roots.inizio.input;
      this.fields.periodo_field.rootFine = servizio_struct.roots.fine.root;
      this.fields.periodo_field.fine_input = servizio_struct.roots.fine.input;
      this.fields.periodo_field.init();

      this.fields.descrizione_field.servizio = this.servizio;
      this.fields.descrizione_field.rootServizio = this.root;
      this.fields.descrizione_field.root = servizio_struct.roots.description.root;
      this.fields.descrizione_field.input = servizio_struct.roots.description.input;
      this.fields.descrizione_field.init();

    } catch (e) {
      console.log(e.message);
    }
  }

  servizio_single.prototype.setToggle = function(){
    try {
      if(!clone)
        throw new TypeError('servizio_single - setToggle : clone undefined');

      this.root.find('.toggle-fields').toggle();
    } catch (e) {
      console.log(e.message);
    }
  }

  servizio_single.prototype.setValuesToServizio = function(){
    try {
      if(!this.servizio)
        throw new TypeError('servizio_single - setValuesToServizio : this.servizio undefined');

      var sv = this.servizio;

      if(!this.fields.importo_field)
        throw new TypeError('servizio_single - setValuesToServizio : this.fields.importo_ui undefined');

      if(!this.fields.data_field)
        throw new TypeError('servizio_single - setValuesToServizio : this.fields.data_field undefined');

      if(!this.fields.num_field)
        throw new TypeError('servizio_single - setValuesToServizio : this.fields.num_field undefined');

      if(!this.fields.periodo_field)
        throw new TypeError('servizio_single - setValuesToServizio : this.fields.periodo_field undefined');

      if(!this.fields.descrizione_field)
        throw new TypeError('servizio_single - setValuesToServizio : this.fields.descrizione_field undefined');

      this.fields.importo_field.setValuesToServizio();
      this.fields.data_field.setValuesToServizio();
      this.fields.num_field.setValuesToServizio();
      this.fields.periodo_field.setValuesToServizio();
      this.fields.descrizione_field.setValuesToServizio();

    } catch (e) {
      console.log(e.message);
    }
  }

  servizio_single.prototype.setValuesFromServizio = function(){
    try {
      if(!this.servizio)
        throw new TypeError('servizio_single - setValuesFromServizio : this.servizio undefined');

      var sv = this.servizio;

      if(!this.fields.importo_field)
        throw new TypeError('servizio_single - setValuesFromServizio : this.fields.importo_ui undefined');

      if(!this.fields.data_field)
        throw new TypeError('servizio_single - setValuesFromServizio : this.fields.data_field undefined');

      if(!this.fields.num_field)
        throw new TypeError('servizio_single - setValuesFromServizio : this.fields.num_field undefined');

      if(!this.fields.periodo_field)
        throw new TypeError('servizio_single - setValuesFromServizio : this.fields.periodo_field undefined');

      if(!this.fields.descrizione_field)
        throw new TypeError('servizio_single - setValuesFromServizio : this.fields.descrizione_field undefined');

      this.fields.importo_field.setValuesFromServizio();
      this.fields.data_field.setValuesFromServizio();
      this.fields.num_field.setValuesFromServizio();
      this.fields.periodo_field.setValuesFromServizio();
      this.fields.descrizione_field.setValuesFromServizio();

      if(this.servizio.ServizioAppartamento && this.servizio.ServizioAppartamento instanceof Appartamento){
        var aptStz_element = new aptStzItem();
        aptStz_element.servizio = this.servizio;
        aptStz_element.rootServizio = this.root;
        aptStz_element.item = this.servizio.ServizioAppartamento;
        aptStz_element.tipologia = 1;
        aptStz_element.init();
      }

      if(this.servizio.ServizioStanza && this.servizio.ServizioStanza instanceof Appartamenti_Stanze){
        var aptStz_element = new aptStzItem();
        aptStz_element.servizio = this.servizio;
        aptStz_element.rootServizio = this.root;
        aptStz_element.item = this.servizio.ServizioStanza;
        aptStz_element.tipologia = 2;
        aptStz_element.init();
      }

      if(this.servizio.ServizioIns && this.servizio.ServizioIns instanceof Inquilino_Stanza){
        var ins_element = new insItem();
        ins_element.servizio = this.servizio;
        ins_element.rootServizio = this.root;
        ins_element.item = this.servizio.ServizioIns;//Inquilino_Stanza
        ins_element.init();
      }

      if (this.servizio.Servizio_TagServizio && this.servizio.Servizio_TagServizio instanceof Servizio_TagServizio && this.servizio.Servizio_TagServizio.Tags && this.servizio.Servizio_TagServizio.Tags.length > 0) {
        var tags = this.servizio.Servizio_TagServizio.Tags;
        for (var i = 0; i < tags.length; i++) {
          var tagItem = new TagItem();
          tagItem.servizio = this.servizio;
          tagItem.rootServizio = this.root;
          tagItem.tag = tags[i];//TagServizio
          tagItem.init();
        }
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  /*######################################################
    Importo
    ######################################################*/

  function importo_ui(servizio, rootServizio, root, input){
    this.servizio = servizio;
    this.rootServizio = rootServizio;
    this.root = root;
    this.input = input;
  }

  importo_ui.prototype.setValuesToServizio = function(){
    try {
      var self = this;

      if(!this.servizio)
        throw new TypeError('importo_ui - setValuesToServizio : this.servizio undefined');

      if(!this.servizio || !(this.servizio.ServizioImporto instanceof ServizioImporto))
        throw new TypeError('importo_ui - setValuesToServizio : this.servizio.ServizioImporto undefined');

      var importo = this.servizio.ServizioImporto;
      var value = self.rootServizio.find(self.input).val();
      if(value === ""){
        value = 0;
      }
      importo.Importo = value;

    } catch (e) {
      console.log(e.message);
    }
  }

  importo_ui.prototype.setValuesFromServizio = function(){
    try {
      var self = this;

      if(!this.servizio)
        throw new TypeError('importo_ui - setValuesFromServizio : this.servizio undefined');

      if(!this.servizio || !(this.servizio.ServizioImporto instanceof ServizioImporto))
        throw new TypeError('importo_ui - setValuesFromServizio : this.servizio.ServizioImporto undefined');

      /*if(parseInt(this.servizio.Id) > 0 && parseInt(this.servizio.ServizioImporto.Id) > 0 && this.servizio.ServizioImporto.Importo){
        this.rootServizio.find(this.input).val(this.servizio.ServizioImporto.Importo);
      }*/

      if(this.servizio.ServizioImporto.Importo){
        this.rootServizio.find(this.input).val(this.servizio.ServizioImporto.Importo);
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  importo_ui.prototype.checkValues = function(value){
    var bool = true;
    /*if(value && (parseFloat(value) <= 0 || parseFloat(value) >= 0)){
      bool = false;
    }*/

    return bool;
  }

  importo_ui.prototype.listeners = function(){
    try {
      var self = this;
      if(!this.rootServizio)
        throw new TypeError('importo_ui - listeners : rootServizio undefined');

      if(!this.root)
        throw new TypeError('importo_ui - listeners : root undefined');

      this.rootServizio.find(this.input).keyup(function(event){
        var value = self.rootServizio.find(self.input).val();

        if (!self.checkValues(value)) {
          self.rootServizio.find(self.root + root_field_color).css('background', requiredColor);
        }else{
          self.rootServizio.find(self.root + root_field_color).css('background', okayColor);
        }

        refresh_TotImportoServizi();

      });



    } catch (e) {
      console.log(e.message);
    }
  }

  importo_ui.prototype.init = function(){
    try {

      var self = this;

      if(!this.servizio)
        throw new TypeError('importo_ui - init : this.servizio undefined');

      if(!this.servizio.ServizioImporto || !(this.servizio.ServizioImporto instanceof ServizioImporto)){
        this.servizio.ServizioImporto = new ServizioImporto();
      }

      this.listeners();

    } catch (e) {
      console.log(e.message);
    }
  }

  /*######################################################
    Data
    ######################################################*/

  function data_ui(servizio, rootServizio, root, input){
    this.servizio = servizio;
    this.rootServizio = rootServizio;
    this.root = root;
    this.input = input;
  }

  data_ui.prototype.setValuesToServizio = function(){
    try {
      var self = this;

      if(!this.servizio)
        throw new TypeError('data_ui - setValuesToServizio : this.servizio undefined');

      if(!this.servizio || !(this.servizio.ServizioData instanceof ServizioData))
        throw new TypeError('data_ui - setValuesToServizio : this.servizio.ServizioData undefined');

      var data = this.servizio.ServizioData;
      var inputVal = self.rootServizio.find(self.input).val();

      if(inputVal !== ""){
        var value = toDateValue(inputVal);
        data.Data = value.yyyymmdd();
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  data_ui.prototype.setValuesFromServizio = function(){
    try {
      var self = this;

      if(!this.servizio)
        throw new TypeError('data_ui - setValuesFromServizio : this.servizio undefined');

      if(!this.servizio || !(this.servizio.ServizioData instanceof ServizioData))
        throw new TypeError('data_ui - setValuesFromServizio : this.servizio.ServizioData undefined');

      /*if(parseInt(this.servizio.Id) > 0 && parseInt(this.servizio.ServizioData.Id) > 0 && this.servizio.ServizioData.Data){
        var value = new Date(this.servizio.ServizioData.Data);
        this.rootServizio.find(this.input).val(value.ddmmyyyy());
      }*/

      if(this.servizio.ServizioData.Data){
        var value = new Date(this.servizio.ServizioData.Data);
        this.rootServizio.find(this.input).val(value.ddmmyyyy());
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  data_ui.prototype.checkValues = function(value){
    var bool = false;
    if((value && validateDDMMYYYY(value)) || !value || value === ""){
      bool = true;
    }

    return bool;
  }

  data_ui.prototype.listeners = function(){
    try {
      var self = this;
      if(!this.rootServizio)
        throw new TypeError('data_ui - listeners : rootServizio undefined');

      if(!this.root)
        throw new TypeError('data_ui - listeners : root undefined');

      this.rootServizio.find(this.input).keyup(function(event){
        var value = self.rootServizio.find(self.input).val();

        if (!self.checkValues(value)) {
          self.rootServizio.find(self.root + root_field_color).css('background', requiredColor);
        }else{
          self.rootServizio.find(self.root + root_field_color).css('background', okayColor);
        }

      });

    } catch (e) {
      console.log(e.message);
    }
  }

  data_ui.prototype.init = function(){
    try {

      var self = this;

      if(!this.servizio)
        throw new TypeError('data_ui - init : this.servizio undefined');

      if(!this.servizio.ServizioData || !(this.servizio.ServizioData instanceof ServizioData)){
        this.servizio.ServizioData = new ServizioData();
      }

      this.listeners();

    } catch (e) {
      console.log(e.message);
    }
  }

  /*######################################################
    Numero
    ######################################################*/

  function numero_ui(servizio, rootServizio, root, input){
    this.servizio = servizio;
    this.rootServizio = rootServizio;
    this.root = root;
    this.input = input;
  }

  numero_ui.prototype.setValuesToServizio = function(){
    try {
      var self = this;

      if(!this.servizio)
        throw new TypeError('numero_ui - setValuesToServizio : this.servizio undefined');

      if(!this.servizio || !(this.servizio.ServizioNumero instanceof ServizioNumero))
        throw new TypeError('numero_ui - setValuesToServizio : this.servizio.ServizioNumero undefined');

      var num = this.servizio.ServizioNumero;
      var value = self.rootServizio.find(self.input).val();

      if(value === ""){
        value = null;
      }

      num.Numero = value;

    } catch (e) {
      console.log(e.message);
    }
  }

  numero_ui.prototype.setValuesFromServizio = function(){
    try {
      var self = this;

      if(!this.servizio)
        throw new TypeError('numero_ui - setValuesFromServizio : this.servizio undefined');

      if(!this.servizio || !(this.servizio.ServizioNumero instanceof ServizioNumero))
        throw new TypeError('numero_ui - setValuesFromServizio : this.servizio.ServizioNumero undefined');

      /*if(parseInt(this.servizio.Id) > 0 && parseInt(this.servizio.ServizioNumero.Id) > 0 && this.servizio.ServizioNumero.Numero){
        this.rootServizio.find(this.input).val(this.servizio.ServizioNumero.Numero);
      }*/

      if(this.servizio.ServizioNumero.Numero){
        this.rootServizio.find(this.input).val(this.servizio.ServizioNumero.Numero);
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  numero_ui.prototype.listeners = function(){
    try {
      var self = this;
      if(!this.rootServizio)
        throw new TypeError('numero_ui - listeners : rootServizio undefined');

      if(!this.root)
        throw new TypeError('numero_ui - listeners : root undefined');

      /*this.rootServizio.find(this.input).keyup(function(event){
        var value = self.rootServizio.find(self.input).val();
        console.log(value);

        if (!self.checkValues(value)) {
          self.rootServizio.find(self.root + root_field_color).css('background', requiredColor);
        }else{
          self.rootServizio.find(self.root + root_field_color).css('background', okayColor);
        }

      });*/

    } catch (e) {
      console.log(e.message);
    }
  }

  numero_ui.prototype.init = function(){
    try {

      var self = this;

      if(!this.servizio)
        throw new TypeError('numero_ui - init : this.servizio undefined');

      if(!this.servizio.ServizioNumero || !(this.servizio.ServizioNumero instanceof ServizioNumero)){
        this.servizio.ServizioNumero = new ServizioNumero();
      }

      this.listeners();

    } catch (e) {
      console.log(e.message);
    }
  }

  /*######################################################
    Periodo
    ######################################################*/

  function periodo_ui(servizio, rootServizio, rootInizio, rootFine, inizio_input, fine_input){
    this.servizio = servizio;
    this.rootServizio = rootServizio;
    this.rootInizio = rootInizio;
    this.rootFine = rootFine;
    this.inizio_input = inizio_input;
    this.fine_input = fine_input;
  }

  periodo_ui.prototype.setValuesToServizio = function(){
    try {
      var self = this;

      if(!this.servizio)
        throw new TypeError('periodo_ui - setValuesToServizio : this.servizio undefined');

      if(!this.servizio || !(this.servizio.ServizioPeriodo instanceof ServizioPeriodo))
        throw new TypeError('periodo_ui - setValuesToServizio : this.servizio.ServizioPeriodo undefined');

      var periodo = this.servizio.ServizioPeriodo;
      var inputVal1 = self.rootServizio.find(self.inizio_input).val();
      var inputVal2 = self.rootServizio.find(self.fine_input).val();

      if(inputVal1 !== ""){
        var inizio = toDateValue(inputVal1);
        periodo.Inizio = inizio.yyyymmdd();
      }

      if(inputVal2 !== ""){
        var fine = toDateValue(inputVal2);
        periodo.Fine = fine.yyyymmdd();
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  periodo_ui.prototype.setValuesFromServizio = function(){
    try {
      var self = this;

      if(!this.servizio)
        throw new TypeError('periodo_ui - setValuesFromServizio : this.servizio undefined');

      if(!this.servizio || !(this.servizio.ServizioPeriodo instanceof ServizioPeriodo))
        throw new TypeError('periodo_ui - setValuesFromServizio : this.servizio.ServizioPeriodo undefined');

      /*if(parseInt(this.servizio.Id) > 0 && parseInt(this.servizio.ServizioPeriodo.Id) > 0 && this.servizio.ServizioPeriodo.Inizio){
        var inizio = new Date(this.servizio.ServizioPeriodo.Inizio);
        this.rootServizio.find(this.inizio_input).val(inizio.ddmmyyyy());
      }

      if(parseInt(this.servizio.Id) > 0 && parseInt(this.servizio.ServizioPeriodo.Id) > 0 && this.servizio.ServizioPeriodo.Fine){
        var fine = new Date(this.servizio.ServizioPeriodo.Fine);
        this.rootServizio.find(this.fine_input).val(fine.ddmmyyyy());
      }*/

      if(this.servizio.ServizioPeriodo.Inizio){
        var inizio = new Date(this.servizio.ServizioPeriodo.Inizio);
        this.rootServizio.find(this.inizio_input).val(inizio.ddmmyyyy());
      }

      if(this.servizio.ServizioPeriodo.Fine){
        var fine = new Date(this.servizio.ServizioPeriodo.Fine);
        this.rootServizio.find(this.fine_input).val(fine.ddmmyyyy());
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  periodo_ui.prototype.checkValues = function(value){
    var bool = false;

    if((value && validateDDMMYYYY(value)) || !value || value === ""){
      bool = true;
    }

    return bool;
  }

  periodo_ui.prototype.listeners = function(){
    try {
      var self = this;
      if(!this.rootServizio)
        throw new TypeError('periodo_ui - listeners : rootServizio undefined');

      if(!this.rootInizio)
        throw new TypeError('periodo_ui - listeners : rootInizio undefined');

      if(!this.rootFine)
        throw new TypeError('periodo_ui - listeners : rootFine undefined');

      this.rootServizio.find(this.inizio_input).keyup(function(event){
        var value = self.rootServizio.find(self.inizio_input).val();
        if (!self.checkValues(value)) {
          self.rootServizio.find(self.rootInizio + root_field_color).css('background', requiredColor);
        }else{
          self.rootServizio.find(self.rootInizio + root_field_color).css('background', okayColor);
        }

      });

      this.rootServizio.find(this.fine_input).keyup(function(event){
        var value = self.rootServizio.find(self.fine_input).val();
        if (!self.checkValues(value)) {
          self.rootServizio.find(self.rootFine + root_field_color).css('background', requiredColor);
        }else{
          self.rootServizio.find(self.rootFine + root_field_color).css('background', okayColor);
        }

      });

    } catch (e) {
      console.log(e.message);
    }
  }

  periodo_ui.prototype.init = function(){
    try {

      var self = this;

      if(!this.servizio)
        throw new TypeError('periodo_ui - init : this.servizio undefined');

      if(!this.servizio.ServizioPeriodo || !(this.servizio.ServizioPeriodo instanceof ServizioPeriodo)){
        this.servizio.ServizioPeriodo = new ServizioPeriodo();
      }

      this.listeners();

    } catch (e) {
      console.log(e.message);
    }
  }

  /*######################################################
    Descrizione
    ######################################################*/

  function descrizione_ui(servizio, rootServizio, root, input){
    this.servizio = servizio;
    this.rootServizio = rootServizio;
    this.root = root;
    this.input = input;
  }

  descrizione_ui.prototype.setValuesToServizio = function(){
    try {
      var self = this;

      if(!this.servizio)
        throw new TypeError('descrizione_ui - setValuesToServizio : this.servizio undefined');

      if(!this.servizio || !(this.servizio.ServizioDescrizione instanceof ServizioDescrizione))
        throw new TypeError('descrizione_ui - setValuesToServizio : this.servizio.ServizioDescrizione undefined');

      var descrizione = this.servizio.ServizioDescrizione;
      var value = self.rootServizio.find(self.input).val();

      if(value === ""){
        value = null;
      }

      descrizione.Descrizione = value;

    } catch (e) {
      console.log(e.message);
    }
  }

  descrizione_ui.prototype.setValuesFromServizio = function(){
    try {
      var self = this;

      if(!this.servizio)
        throw new TypeError('descrizione_ui - setValuesFromServizio : this.servizio undefined');

      if(!this.servizio || !(this.servizio.ServizioDescrizione instanceof ServizioDescrizione))
        throw new TypeError('descrizione_ui - setValuesFromServizio : this.servizio.ServizioDescrizione undefined');

      /*if(parseInt(this.servizio.Id) > 0 && parseInt(this.servizio.ServizioDescrizione.Id) > 0 && this.servizio.ServizioDescrizione.Descrizione){
        this.rootServizio.find(this.input).val(this.servizio.ServizioDescrizione.Descrizione);
      }*/

      if(this.servizio.ServizioDescrizione.Descrizione){
        this.rootServizio.find(this.input).val(this.servizio.ServizioDescrizione.Descrizione);
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  descrizione_ui.prototype.listeners = function(){
    try {
      var self = this;
      if(!this.rootServizio)
        throw new TypeError('descrizione_ui - listeners : rootServizio undefined');

      if(!this.root)
        throw new TypeError('descrizione_ui - listeners : root undefined');

      /*this.rootServizio.find(this.input).keyup(function(event){
        var value = self.rootServizio.find(self.input).val();
        console.log(value);

        if (!self.checkValues(value)) {
          self.rootServizio.find(self.root + root_field_color).css('background', requiredColor);
        }else{
          self.rootServizio.find(self.root + root_field_color).css('background', okayColor);
        }

      });*/

    } catch (e) {
      console.log(e.message);
    }
  }

  descrizione_ui.prototype.init = function(){
    try {

      var self = this;

      if(!this.servizio)
        throw new TypeError('descrizione_ui - init : this.servizio undefined');

      if(!this.servizio.ServizioDescrizione || !(this.servizio.ServizioDescrizione instanceof ServizioDescrizione)){
        this.servizio.ServizioDescrizione = new ServizioDescrizione();
      }

      this.listeners();

    } catch (e) {
      console.log(e.message);
    }
  }

  /*######################################################
                      TagServizi_Manager
    ######################################################*/

  function tagServizi_manager(servizio, rootServizio, quickAdd, root, rows, togglePanel){
    this.servizio = servizio;
    this.rootServizio = rootServizio;
    this.quickAdd = quickAdd;
    this.root = root;
    this.rows = rows;//Array di oggetti con i seguenti att o func : TagServizio, struttura, init(), nextAction()
    this.togglePanel = togglePanel;
  }

  tagServizi_manager.prototype.init = function(){
    var self = this;

    var toggle = new togglePanel();
    this.togglePanel = toggle;
    toggle.root = this.rootServizio.find(servizio_struct.roots.tag_searchPanel);
    toggle.elementsManager = this;
    toggle.init();

    this.rows = new Array();

    this.setRows();

  }

  //1.Caricamento iniziale di tutti i tagServizi
  //2.Preparazione struttura
  //3.Creazione di togglePanel
  //4. toggle.loadElements
  tagServizi_manager.prototype.setRows = function(termine, callback){
    try {
      var self = this;

      if(!this.togglePanel)
        throw new TypeError('tagServizi_manager - setRows : this.togglePanel  undefined');

      /*if(!callback)
        throw new TypeError('tagServizi_manager - setRows : callback undefined');*/

      //1.Search
      //2.Creazione di tag_rows e setStructure

      this.rows  =new Array();

      if(termine && termine !== ""){
        this.Search(termine, function(tags){
          if(!tags)
            console.log("tagServizi_manager - setRows : this.Search tags undefined");

          if(tags && tags.TagServizio && tags.TagServizio.length > 0){
            for (var i = 0; i < tags.TagServizio.length; i++) {
              var row = new tagServizio_row();
              row.tag = tags.TagServizio[i];
              row.rootTogglePanel = self.rootServizio.find(servizio_struct.roots.tag_searchPanel);//TODO:Verifica funzionalità della variabile
              row.tagServizi_manager = self;//TODO:Verifica funzionalità della variabile
              row.servizio = self.servizio;//TODO:Verifica funzionalità della variabile
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
                  var row = new newTagServizio();
                  row.rootTogglePanel = self.rootServizio.find(servizio_struct.roots.tag_searchPanel);//TODO:Verifica funzionalità della variabile
                  row.servizio = self.servizio;
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

        this.LoadTags(function(tags){
          if(!tags)
            console.log("tagServizi_manager - setRows : this.Search tags undefined");

          if(tags && tags.TagServizio && tags.TagServizio.length > 0){
            for (var i = 0; i < tags.TagServizio.length; i++) {
              var row = new tagServizio_row();
              row.tag = tags.TagServizio[i];
              row.rootTogglePanel = self.rootServizio.find(servizio_struct.roots.tag_searchPanel);//TODO:Verifica funzionalità della variabile
              row.tagServizi_manager = self;//TODO:Verifica funzionalità della variabile
              row.servizio = self.servizio;//TODO:Verifica funzionalità della variabile
              row.setStructure();
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

  /**
   * Verrà utilizzata da :
   * - init()
   * - togglePanel
   *
   * return array of TagServizio
   */
  tagServizi_manager.prototype.Search = function(termine, callback){
    try {

      var self = this;

      if(!termine)
        throw new TypeError('tagServizi_manager - Search : termine undefined');

      if(!callback)
        throw new TypeError('tagServizi_manager - Search : this method needs a callback!');

      var ts = new TagServizio();
      ts.Search(termine, function(){
        callback(ts);
      });


    } catch (e) {
      console.log(e.message);
    }
  }

  tagServizi_manager.prototype.LoadTags = function(callback){
    try {

      var self = this;

      if(!callback)
        throw new TypeError('tagServizi_manager - Search : this method needs a callback!');

      var ts = new TagServizio();
      ts.LoadTags(function(){
        callback(ts);
      });


    } catch (e) {
      console.log(e.message);
    }
  }

  /*######################################################
                      tagServizio_row
    ######################################################*/

  /**
   * @index list position
   * @tag TagServizio
   */
  function tagServizio_row(rootTogglePanel, servizio, index, root, tag, structure, tagServizi_manager){
    this.rootTogglePanel = rootTogglePanel;
    this.servizio = servizio;
    this.index = index;//variabile assegnata da togglePanel
    this.root = root;//variabile assegnata da togglePanel
    this.tag = tag;
    this.structure = structure;
    this.tagServizi_manager = tagServizi_manager;
  }

  /**
   * 1. listeners
   * 2. newAction
   */
  tagServizio_row.prototype.init = function(){
    try {
      var self = this;

      if(!this.index)
        throw new TypeError('tagServizio_row - init : index undefined');

      if(!this.rootTogglePanel)
        throw new TypeError('tagServizio_row - init : rootTogglePanel undefined');

      if(!this.servizio)
        throw new TypeError('tagServizio_row - init : this.servizio undefined');

      if(!this.servizio.Servizio_TagServizio){
        this.servizio.Servizio_TagServizio = new Servizio_TagServizio();
        this.servizio.Servizio_TagServizio.Tags = new Array();
        this.servizio.Servizio_TagServizio.Servizio = new Servizio();
        this.servizio.Servizio_TagServizio.Servizio.Id = this.servizio.Id;
      }

      this.listeners();

    } catch (e) {
      console.log(e.message);
    }
  }

  tagServizio_row.prototype.setStructure = function(){
    try {
      var self = this;

      if(!this.tag)
        throw new TypeError('tagServizio_row - setStructure : this.tag undefined');

      this.structure = this.tag.getTagStructure();

    } catch (e) {
      console.log(e.message);
    }
  }

  //Teoricamente nextAction dovrebbe comunicare con TogglePanel per chiudere il pannello. Non bisogna fare troppo pasticcio, basta trovare il selettore del bottone chiudi e fare $(sel).click();
  tagServizio_row.prototype.nextAction = function(callback){
    try {
      //TODO: Controllare se quel tag è già stato aggiunto. Anzi meglio eliminare l'elemento così non c'è bisogno di fare il controllo.

      var self = this;
      var isQuickAdd = false;

      if(!this.servizio)
        throw new TypeError('tagServizio_row - nextAction : servizio undefined');

      if(!this.servizio.Servizio_TagServizio || !this.servizio.Servizio_TagServizio.Tags)
        throw new TypeError('tagServizio_row - nextAction : this.servizio.Servizio_TagServizio undefined');

      if(this.tagServizi_manager.quickAdd && parseInt(this.tagServizi_manager.quickAdd) > 0){
        isQuickAdd = true;
      }

      if(!isQuickAdd){
        //NB: Qui potresti fare una condizione e dire che se il servizio.Id > 0 allora salvi automaticamente quel tag con il servizio. Da studiare bene.

        //Inserimento elemento selezionato a Servizio
        this.servizio.Servizio_TagServizio.Tags.push(this.tag);
        //Rimozione elemento selezionato dal Search Panel
        this.root.remove();

        var tagItem = new TagItem();
        tagItem.servizio = this.servizio;
        tagItem.rootServizio = this.tagServizi_manager.rootServizio;
        tagItem.tag = this.tag;//TagServizio
        tagItem.init();
      }else{
        //Rimozione elemento selezionato dal Search Panel
        this.root.remove();

        this.servizio.Tags.push(this.tag);

        var tagItem = new TagItem();
        tagItem.servizio = this.servizio;
        tagItem.rootServizio = this.tagServizi_manager.rootServizio;
        tagItem.quickAdd = 1;
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

  tagServizio_row.prototype.listeners = function(){
    try {
      var self = this;

      if(!this.index)
        throw new TypeError('tagServizio_row - listeners : index undefined');

      if(!this.rootTogglePanel)
        throw new TypeError('tagServizio_row - listeners : rootTogglePanel undefined');

      if(!this.root)
        throw new TypeError('tagServizio_row - listeners : root undefined');

      var root = this.root;

      root.click(function(event){
        self.nextAction();
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  /*######################################################
                      NewTagServizio
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

  function newTagServizio(rootTogglePanel, servizio, index, root, structure, TagServizio){
    this.rootTogglePanel = rootTogglePanel;
    this.servizio = servizio;
    this.index = index;//variabile assegnata da togglePanel
    this.root = root;//variabile assegnata da togglePanel
    this.structure = structure;
    this.TagServizio = TagServizio;
  }

  newTagServizio.prototype.setStructure = function(termine, callback){
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

  newTagServizio.prototype.getRowCategoria_struct = function(TagCategories){
    try {
      if(!TagCategories)
        throw new TypeError('newTagServizio - getRowCategoria_struct : TagCategories undefined');

      var struct = categoria_row.structure.clone();
      struct.find(categoria_row.roots.title).html(TagCategories.getTitolo());
      struct.attr('data-item-index', TagCategories.Id);

      return struct;
    } catch (e) {
      console.log(e.message);
    }
  }

  newTagServizio.prototype.clearAllCheckboxs = function(){
    this.root.find(' .categoria-rows').each(function( index ) {
      $( this ).find(' .tm-input-row .tm-input-row__checkbox').css('background-color', '#fff');
    });
  }

  newTagServizio.prototype.init = function(){
    try {
      var self = this;

      if(!this.index)
        throw new TypeError('newTagServizio - init : index undefined');

      if(!this.rootTogglePanel)
        throw new TypeError('newTagServizio - init : rootTogglePanel undefined');

      if(!this.servizio)
        throw new TypeError('newTagServizio - init : this.servizio undefined');

      if(!this.servizio.Servizio_TagServizio){
        this.servizio.Servizio_TagServizio = new Servizio_TagServizio();
        this.servizio.Servizio_TagServizio.Tags = new Array();
        this.servizio.Servizio_TagServizio.Servizio = this.servizio;
      }

      this.TagServizio = new TagServizio();

      this.listeners();
    } catch (e) {
      console.log(e.message);
    }
  }

  newTagServizio.prototype.listeners = function(){
    try {
      var self = this;

      if(!this.index)
        throw new TypeError('newTagServizio - listeners : index undefined');

      if(!this.rootTogglePanel)
        throw new TypeError('newTagServizio - listeners : rootTogglePanel undefined');

      if(!this.root)
        throw new TypeError('newTagServizio - listeners : root undefined');

      var root = this.root;

      root.find(' .add-new-tag-btn').click(function(event){
        self.nextAction();
      });

      root.find(' .categoria-title').keyup(function(event){
        self.TagServizio.TagCategories = null;
        self.clearAllCheckboxs();
      });

      root.find(' .categoria-rows .tm-list-item').click(function(event){
        var idTagCategories = $(this).attr('data-item-index');
        self.clearAllCheckboxs();
        $(this).find(' .tm-input-row .tm-input-row__checkbox').css('background-color', '#d4d6db');
        self.TagServizio.TagCategories = new TagCategories();
        self.TagServizio.TagCategories.Id = idTagCategories;
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  newTagServizio.prototype.nextAction = function(callback){
    var self = this;
    var titolo = this.root.find('.tag-title').val();
    var titoloCategoria = this.root.find(' .categoria-title').val();

    if(titoloCategoria && titoloCategoria !== "" && !this.TagServizio.TagCategories){
      this.TagServizio.TagCategories = new TagCategories();
      this.TagServizio.TagCategories.Titolo = titoloCategoria;
    }

    if(titolo && titolo !== ""){
      this.TagServizio.Titolo = titolo;
      this.TagServizio.Save(function(){
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

  function TagItem(servizio, rootServizio, quickAdd, index, root, tag){
    this.servizio = servizio;
    this.rootServizio = rootServizio;
    this.quickAdd = quickAdd;
    this.index = index;
    this.root = root;
    this.tag = tag;//TagServizio
  }

  TagItem.prototype.getTagStructure = function(){
    try {
      var self = this;

      if(!this.tag || !(this.tag instanceof TagServizio))
        throw new TypeError('tag_text_struct - getTagStructure : this.tag undefined');

      var str = tag_text_struct.contenuto.clone();
      var titolo = this.tag.getTitolo();

      str.find(' .tag-item_struct span').html(titolo);

      return str;
    } catch (e) {
      console.log(e.message);
    }
  }

  TagItem.prototype.setStructure = function(callback){
    try {
      var self = this;

      if(!this.rootServizio)
        throw new TypeError('TagItem - setStructure : this.rootServizio undefined');

      if(!this.tag)
        throw new TypeError('TagItem - setStructure : this.tag undefined');

      if(!callback)
        throw new TypeError('TagItem - setStructure : this method needs a callback');

      var rootContainer = this.rootServizio.find(servizio_struct.roots.tag.container);
      var index = rootContainer.find(' > div').length + 1;
      var str = this.getTagStructure();

      rootContainer.append(str);
      var root = rootContainer.find(' > div:nth-child(' + index + ')');

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

      if(!this.servizio)
        throw new TypeError('TagItem - listeners : this.servizio undefined');

      this.root.find(' .tag-item_struct .remove-tag').click(function(event){

        if(!self.quickAdd){
          self.servizio.Servizio_TagServizio.removeTag(self.tag);
          self.root.remove();
        }else if(self.quickAdd && self.servizio.Tags.length > 0){
          var tagItems = self.servizio.Tags;
          for (var i = 0; i < tagItems.length; i++) {
            var t = tagItems[i];
            if(self.tag.Id && t.Id && self.tag.Id === t.Id){
              tagItems.splice(i, 1);
              self.root.remove();
            }
          }
        }

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

  /*######################################################
                      aptStz_manager
    ######################################################*/

  aptStz = {
    structure : {
      apt : $('<div class="tm-list-item"><div class="tm-input-row"><div class="tm-input-row__left"><div><i class="material-icons">home</i></div><div class="tm-input-row__info"><div class="tm-simple"><div class="tm-simple__text tagStyle" style=" background: #2bbd7e;"><span></span></div></div></div></div><div class="tm-input-row__right"></div></div></div>'),
      aptItem : $('<div class="tag-item aptItem"><div class="tm-simple__text tag-item_struct" style=" background: #2bbd7e;"><div style=" margin-right: 7px;"><i class="material-icons" style=" font-size: 15px;">home</i></div><span></span><div class="remove-tag"><i class="material-icons">close</i><div></div></div></div></div>'),
      stz : $('<div class="tm-list-item"><div class="tm-input-row"><div class="tm-input-row__left"><div><i class="material-icons">hotel</i></div><div class="tm-input-row__info"><div class="tm-simple"><div class="tm-simple__text tagStyle" style=" background: #69f0ae;"><span></span></div></div></div></div><div class="tm-input-row__right"></div></div></div>'),
      stzItem : $('<div class="tag-item stzItem"><div class="tm-simple__text tag-item_struct" style=" background: #69f0ae;"><div style=" margin-right: 7px;"><i class="material-icons" style=" font-size: 15px;">hotel</i></div><span></span><div class="remove-tag"><i class="material-icons">close</i><div></div></div></div></div>')
    }
  }

  function aptStz_manager(servizio, rootServizio, quickAdd, root, rows, togglePanel){
    this.servizio = servizio;
    this.rootServizio = rootServizio;
    this.quickAdd = quickAdd;
    this.root = root;
    this.rows = rows;//Array of apt_Row or stz_Row
    this.togglePanel = togglePanel;
  }

  aptStz_manager.prototype.init = function(){
    var self = this;
    var toggle = new togglePanel();
    this.togglePanel = toggle;
    toggle.root = this.rootServizio.find(servizio_struct.roots.aptOrStanze_searchPanel);
    toggle.elementsManager = this;
    toggle.init();

    this.rows = new Array();

    //this.setRows();

  }

  aptStz_manager.prototype.setRows = function(termine, callback){
    try {
      var self = this;

      if(!this.togglePanel)
        throw new TypeError('aptStz_manager - setRows : this.togglePanel  undefined');

      this.rows  =new Array();

      if(termine && termine !== ""){
        this.Search(termine, function(results){
          if(!results)
            console.log("aptStz_manager - setRows : this.Search results undefined");

          if(results && results.Appartamento && results.Appartamento.Appartamento && results.Appartamento.Appartamento.length > 0){
            var appartamenti = results.Appartamento.Appartamento;

            for (var i = 0; i < appartamenti.length; i++) {
              var row = new apt_row();
              row.item = appartamenti[i];
              row.rootTogglePanel = self.togglePanel.root;
              row.aptStz_manager = self;//TODO:Verifica funzionalità della variabile
              row.servizio = self.servizio;//TODO:Verifica funzionalità della variabile
              row.tipologiaRow = 1;
              row.setStructure();
              self.rows.push(row);
            }
          }

          if(results && results.AppartamentoStanza && results.AppartamentoStanza.Appartamento_Stanza && results.AppartamentoStanza.Appartamento_Stanza.length > 0){
            var appartamentoStanze = results.AppartamentoStanza.Appartamento_Stanza;
            for (var i = 0; i < appartamentoStanze.length; i++) {
              var row = new stz_row();
              row.item = appartamentoStanze[i];
              row.rootTogglePanel = self.togglePanel.root;
              row.aptStz_manager = self;//TODO:Verifica funzionalità della variabile
              row.servizio = self.servizio;//TODO:Verifica funzionalità della variabile
              row.tipologiaRow = 2;
              row.setStructure();
              self.rows.push(row);
            }
          }

          if(self.togglePanel){
            self.togglePanel.loadElements();
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

  aptStz_manager.prototype.Search = function(termine, callback){
    try {

      var self = this;

      if(!termine)
        throw new TypeError('aptStz_manager - Search : termine undefined');

      if(!callback)
        throw new TypeError('aptStz_manager - Search : this method needs a callback!');

      if(termine.length > 4){
        var sv = new Servizio();
        sv.SearchAptStz(termine, function(res){
          callback(res);
        });
      }


    } catch (e) {
      console.log(e.message);
    }
  }

  /*######################################################
                      apt_row
    ######################################################*/

  function apt_row(rootTogglePanel, servizio, index, root, tipologiaRow, item, structure, aptStz_manager){
    this.rootTogglePanel = rootTogglePanel;
    this.servizio = servizio;
    this.index = index;//variabile assegnata da togglePanel
    this.root = root;//variabile assegnata da togglePanel
    this.tipologiaRow = tipologiaRow;
    this.item = item;
    this.structure = structure;
    this.aptStz_manager = aptStz_manager;
  }

  apt_row.prototype.init = function(){
    try {
      var self = this;

      if(!this.index)
        throw new TypeError('apt_row - init : index undefined');

      if(!this.rootTogglePanel)
        throw new TypeError('apt_row - init : rootTogglePanel undefined');

      if(!this.servizio)
        throw new TypeError('apt_row - init : this.servizio undefined');

      this.listeners();

    } catch (e) {
      console.log(e.message);
    }
  }

  apt_row.prototype.setStructure = function(){
    try {
      var self = this;

      if(!this.item)
        throw new TypeError('apt_row - setStructure : this.item undefined');

      this.structure = aptStz.structure.apt.clone();
      this.structure.find('.tm-simple__text span').html(this.item.getTitle());

    } catch (e) {
      console.log(e.message);
    }
  }

  apt_row.prototype.nextAction = function(callback){
    try {

      var self = this;
      var isQuickAdd = false;

      if(!this.servizio)
        throw new TypeError('apt_row - nextAction : servizio undefined');

      if(this.aptStz_manager.quickAdd && parseInt(this.aptStz_manager.quickAdd) > 0){
        isQuickAdd = true;
      }

      if(!isQuickAdd){
        //Assegnazione Id elemento selezionato a Servizio
        this.servizio.IdAppartamento = this.item.Id;
        //Rimozione elemento selezionato dal Search Panel
        this.root.remove();
        //Rimozione elemento selezionato dalla lista sopra il Search Panel
        this.aptStz_manager.rootServizio.find(servizio_struct.roots.aptStz.container + ' .aptItem').remove();

        var aptStz_element = new aptStzItem();
        aptStz_element.servizio = this.servizio;
        aptStz_element.rootServizio = this.aptStz_manager.rootServizio;
        aptStz_element.item = this.item;//Appartamento
        aptStz_element.tipologia = 1;
        aptStz_element.init();

      }else{
        //Rimozione elemento selezionato dal Search Panel
        this.root.remove();

        if(this.servizio.Inquilini && this.servizio.Inquilini.length > 0){
          this.servizio.Inquilini = [];
          this.aptStz_manager.rootServizio.find(servizio_struct.roots.ins.container + ' .insItem').remove();
        }

        if(this.servizio && this.servizio.Stanze.length > 0){
          this.servizio.Stanze = [];
          this.aptStz_manager.rootServizio.find(servizio_struct.roots.aptStz.container + ' .stzItem').remove();
        }

        this.servizio.Appartamenti.push(this.item);

        var aptStz_element = new aptStzItem();
        aptStz_element.servizio = this.servizio;
        aptStz_element.rootServizio = this.aptStz_manager.rootServizio;
        aptStz_element.quickAdd = 1;
        aptStz_element.item = this.item;//Appartamento
        aptStz_element.tipologia = 1;
        aptStz_element.init();
      }

      if(callback){
        callback();
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  apt_row.prototype.listeners = function(){
    try {
      var self = this;

      if(!this.index)
        throw new TypeError('apt_row - listeners : index undefined');

      if(!this.rootTogglePanel)
        throw new TypeError('apt_row - listeners : rootTogglePanel undefined');

      if(!this.root)
        throw new TypeError('apt_row - listeners : root undefined');

      var root = this.root;

      root.click(function(event){
        self.nextAction();
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  /*######################################################
                      stz_row
    ######################################################*/

  function stz_row(rootTogglePanel, servizio, index, root, tipologiaRow, item, structure, aptStz_manager){
    this.rootTogglePanel = rootTogglePanel;
    this.servizio = servizio;
    this.index = index;//variabile assegnata da togglePanel
    this.root = root;//variabile assegnata da togglePanel
    this.tipologiaRow = tipologiaRow;
    this.item = item;
    this.structure = structure;
    this.aptStz_manager = aptStz_manager;
  }

  stz_row.prototype.init = function(){
    try {
      var self = this;

      if(!this.index)
        throw new TypeError('stz_row - init : index undefined');

      if(!this.rootTogglePanel)
        throw new TypeError('stz_row - init : rootTogglePanel undefined');

      if(!this.servizio)
        throw new TypeError('stz_row - init : this.servizio undefined');

      this.listeners();

    } catch (e) {
      console.log(e.message);
    }
  }

  stz_row.prototype.setStructure = function(){
    try {
      var self = this;

      if(!this.item)
        throw new TypeError('stz_row - setStructure : this.item undefined');

      this.structure = aptStz.structure.stz.clone();
      this.structure.find('.tm-simple__text span').html(this.item.getTitle());

    } catch (e) {
      console.log(e.message);
    }
  }

  stz_row.prototype.nextAction = function(callback){
    try {

      var self = this;
      var isQuickAdd = false;

      if(!this.servizio)
        throw new TypeError('stz_row - nextAction : servizio undefined');

      if(this.aptStz_manager.quickAdd && parseInt(this.aptStz_manager.quickAdd) > 0){
        isQuickAdd = true;
      }

      if(!isQuickAdd){
        //Assegnazione Id elemento selezionato a Servizio
        this.servizio.IdAppartamentiStanze = this.item.Id;
        //Rimozione elemento selezionato dal Search Panel
        this.root.remove();
        //Rimozione elemento selezionato dalla lista sopra il Search Panel
        this.aptStz_manager.rootServizio.find(servizio_struct.roots.aptStz.container + ' .stzItem').remove();

        var aptStz_element = new aptStzItem();
        aptStz_element.servizio = this.servizio;
        aptStz_element.rootServizio = this.aptStz_manager.rootServizio;
        aptStz_element.item = this.item;//Appartamenti_Stanze
        aptStz_element.tipologia = 2;
        aptStz_element.init();

      }else{
        //Rimozione elemento selezionato dal Search Panel
        this.root.remove();

        if(this.servizio.Inquilini && this.servizio.Inquilini.length > 0){
          this.servizio.Inquilini = [];
          this.aptStz_manager.rootServizio.find(servizio_struct.roots.ins.container + ' .insItem').remove();
        }

        if(this.servizio && this.servizio.Appartamenti.length > 0){
          this.servizio.Appartamenti = [];
          this.aptStz_manager.rootServizio.find(servizio_struct.roots.aptStz.container + ' .aptItem').remove();
        }

        this.servizio.Stanze.push(this.item);

        var aptStz_element = new aptStzItem();
        aptStz_element.servizio = this.servizio;
        aptStz_element.rootServizio = this.aptStz_manager.rootServizio;
        aptStz_element.quickAdd = 1;
        aptStz_element.item = this.item;//Appartamenti_Stanze
        aptStz_element.tipologia = 2;
        aptStz_element.init();

      }

      if(callback){
        callback();
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  stz_row.prototype.listeners = function(){
    try {
      var self = this;

      if(!this.index)
        throw new TypeError('stz_row - listeners : index undefined');

      if(!this.rootTogglePanel)
        throw new TypeError('stz_row - listeners : rootTogglePanel undefined');

      if(!this.root)
        throw new TypeError('stz_row - listeners : root undefined');

      var root = this.root;

      root.click(function(event){
        self.nextAction();
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  /*######################################################
                      aptStzItem
    ######################################################*/

 function aptStzItem(servizio, rootServizio, quickAdd, index, root, item, tipologia){
   this.servizio = servizio;
   this.rootServizio = rootServizio;
   this.quickAdd = quickAdd;
   this.index = index;
   this.root = root;
   this.item = item;
   this.tipologia = tipologia;
 }

 aptStzItem.prototype.getTagStructure = function(){
   try {
     var self = this;

     if(!this.item)
       throw new TypeError('tag_text_struct - getTagStructure : this.item undefined');

      var str = null;
      var titolo = "";

     if(this.tipologia === 1){
       str = aptStz.structure.aptItem.clone();
       titolo = this.item.getTitle();
       str.find(' .tag-item_struct span').html(titolo);
     }else{
       str = aptStz.structure.stzItem.clone();
       titolo = this.item.getTitle();
       str.find(' .tag-item_struct span').html(titolo);
     }

     return str;
   } catch (e) {
     console.log(e.message);
   }
 }

 aptStzItem.prototype.setStructure = function(callback){
   try {
     var self = this;

     if(!this.rootServizio)
       throw new TypeError('aptStzItem - setStructure : this.rootServizio undefined');

     if(!this.item)
       throw new TypeError('aptStzItem - setStructure : this.item undefined');

     if(!callback)
       throw new TypeError('aptStzItem - setStructure : this method needs a callback');

     var rootContainer = this.rootServizio.find(servizio_struct.roots.aptStz.container);
     var index = rootContainer.find(' > div').length + 1;
     var str = this.getTagStructure();

     rootContainer.append(str);
     var root = rootContainer.find(' > div:nth-child(' + index + ')');

     this.root = root;
     this.index = index;

     callback();

   } catch (e) {
     console.log(e.message);
   }
 }

 aptStzItem.prototype.listeners = function(){
   try {
     var self = this;

     if(!this.index)
       throw new TypeError('aptStzItem - listeners : this.index undefined');

     if(!this.root)
       throw new TypeError('aptStzItem - listeners : this.root undefined');

     if(!this.servizio)
       throw new TypeError('aptStzItem - listeners : this.servizio undefined');

     this.root.find(' .tag-item_struct .remove-tag').click(function(event){

       if(!self.quickAdd){
         if(self.tipologia === 1){
           self.servizio.IdAppartamento = 0;
         }else if(self.tipologia === 2){
           self.servizio.IdAppartamentiStanze = 0;
         }
         self.root.remove();
       }else{
         if(self.tipologia === 1 && self.servizio.Appartamenti.length > 0){
           var aptItems = self.servizio.Appartamenti;
           for (var i = 0; i < aptItems.length; i++) {
             var t = aptItems[i];
             if(self.item.Id && t.Id && self.item.Id === t.Id){
               aptItems.splice(i, 1);
             }
           }
         }else if(self.tipologia === 2 && self.servizio.Stanze.length > 0){
           var stzItem = self.servizio.Stanze;
           for (var i = 0; i < stzItem.length; i++) {
             var t = stzItem[i];
             if(self.item.Id && t.Id && self.item.Id === t.Id){
               stzItem.splice(i, 1);
             }
           }
         }
         self.root.remove();
       }

     });

   } catch (e) {
     console.log(e.message);
   }
 }

 aptStzItem.prototype.init = function(){
   var self = this;
   this.setStructure(function(){
     self.listeners();
   });
 }

 /*######################################################
                     ins_manager
   ######################################################*/

   insManager = {
     structure : {
       ins_row : $('<div class="tm-list-item"><div class="tm-input-row"><div class="tm-input-row__left"><div><i class="material-icons">person</i></div><div class="tm-input-row__info row-double-line"><div class="tm-simple sv_inq row-double-line_font"><div class="tm-simple__text"><span></span></div></div><div class="tm-simple sv_stz row-double-line_font"><div class="tm-simple__text"><span></span></div></div></div></div><div class="tm-input-row__right"></div></div></div>'),
       insItem : $('<div class="tag-item insItem"><div class="tm-simple__text tag-item_struct" style="background: #00BCD4;"><div style=" margin-right: 7px;"><i class="material-icons" style=" font-size: 15px;">person</i></div><span></span><div class="remove-tag"><i class="material-icons">close</i><div></div></div></div></div>'),
     }
   }

   function ins_manager(servizio, rootServizio, quickAdd, root, rows, togglePanel){
     this.servizio = servizio;
     this.rootServizio = rootServizio;
     this.quickAdd = quickAdd;
     this.root = root;
     this.rows = rows;//Array of ins_row
     this.togglePanel = togglePanel;
   }

   ins_manager.prototype.init = function(){
     var self = this;
     var toggle = new togglePanel();
     this.togglePanel = toggle;
     toggle.root = this.rootServizio.find(servizio_struct.roots.ins_searchPanel);
     toggle.elementsManager = this;
     toggle.init();

     this.rows = new Array();
     //this.setRows();

   }

   ins_manager.prototype.setRows = function(termine, callback){
     try {
       var self = this;

       if(!this.togglePanel)
         throw new TypeError('ins_manager - setRows : this.togglePanel  undefined');

       this.rows  =new Array();

       if(termine && termine !== ""){
         this.Search(termine, function(results){
           if(!results)
             console.log("ins_manager - setRows : this.Search results undefined");

           if(results && results.Inquilino_Stanza && results.Inquilino_Stanza.length > 0){
             var inquilini = results.Inquilino_Stanza;

             for (var i = 0; i < inquilini.length; i++) {
               var row = new ins_row();
               row.ins = inquilini[i];
               row.rootTogglePanel = self.togglePanel.root;
               row.ins_manager = self;//TODO:Verifica funzionalità della variabile
               row.servizio = self.servizio;//TODO:Verifica funzionalità della variabile
               row.setStructure();
               self.rows.push(row);
             }
           }

           if(self.togglePanel){
             self.togglePanel.loadElements();
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

   ins_manager.prototype.Search = function(termine, callback){
     try {

       var self = this;

       if(!termine)
         throw new TypeError('ins_manager - Search : termine undefined');

       if(!callback)
         throw new TypeError('ins_manager - Search : this method needs a callback!');

       if(termine && termine.length > 2){
         var ins = new Inquilino_Stanza();
         ins.Search(termine, function(){
           callback(ins);
         });
       }


     } catch (e) {
       console.log(e.message);
     }
   }

   /*######################################################
                       ins_row
     ######################################################*/

   function ins_row(rootTogglePanel, servizio, index, root, ins, structure, ins_manager){
     this.rootTogglePanel = rootTogglePanel;
     this.servizio = servizio;
     this.index = index;//variabile assegnata da togglePanel
     this.root = root;//variabile assegnata da togglePanel
     this.ins = ins;
     this.structure = structure;
     this.ins_manager = ins_manager;
   }

   ins_row.prototype.init = function(){
     try {
       var self = this;

       if(!this.index)
         throw new TypeError('ins_row - init : index undefined');

       if(!this.rootTogglePanel)
         throw new TypeError('ins_row - init : rootTogglePanel undefined');

       if(!this.servizio)
         throw new TypeError('ins_row - init : this.servizio undefined');

       this.listeners();

     } catch (e) {
       console.log(e.message);
     }
   }

   ins_row.prototype.setStructure = function(){
     try {
       var self = this;

       if(!this.ins)
         throw new TypeError('ins_row - setStructure : this.ins undefined');

       this.structure = insManager.structure.ins_row.clone();
       this.structure.find('.sv_inq .tm-simple__text span').html(this.ins.getTitle());
       this.structure.find('.sv_stz .tm-simple__text span').html(this.ins.getRoomTitle());

     } catch (e) {
       console.log(e.message);
     }
   }

   ins_row.prototype.nextAction = function(callback){
     try {

       var self = this;
       var isQuickAdd = false;

       if(!this.servizio)
         throw new TypeError('ins_row - nextAction : servizio undefined');

       if(this.ins_manager.quickAdd && parseInt(this.ins_manager.quickAdd) > 0){
         isQuickAdd = true;
       }

       if(!isQuickAdd){
         //Assegnazione Id elemento selezionato a Servizio
         this.servizio.IdInquilinoStanze = this.ins.Id;
         //Rimozione elemento selezionato dal Search Panel
         this.root.remove();
         //Rimozione elemento selezionato dalla lista sopra il Search Panel
         this.ins_manager.rootServizio.find(servizio_struct.roots.ins.container).empty();

         var ins_element = new insItem();
         ins_element.servizio = this.servizio;
         ins_element.rootServizio = this.ins_manager.rootServizio;
         ins_element.item = this.ins;//Inquilino_Stanza
         ins_element.init();
       }else{
         //Rimozione elemento selezionato dal Search Panel
         this.root.remove();

         if(this.servizio && this.servizio.Stanze.length > 0){
           this.servizio.Stanze = [];
           this.ins_manager.rootServizio.find(servizio_struct.roots.aptStz.container + ' .stzItem').remove();
         }

         if(this.servizio && this.servizio.Appartamenti.length > 0){
           this.servizio.Appartamenti = [];
           this.ins_manager.rootServizio.find(servizio_struct.roots.aptStz.container + ' .aptItem').remove();
         }

         this.servizio.Inquilini.push(this.ins);

         var ins_element = new insItem();
         ins_element.servizio = this.servizio;
         ins_element.rootServizio = this.ins_manager.rootServizio;
         ins_element.quickAdd = 1;
         ins_element.item = this.ins;//Inquilino_Stanza
         ins_element.init();

       }

       if(callback){
         callback();
       }

     } catch (e) {
       console.log(e.message);
     }
   }

   ins_row.prototype.listeners = function(){
     try {
       var self = this;

       if(!this.index)
         throw new TypeError('ins_row - listeners : index undefined');

       if(!this.rootTogglePanel)
         throw new TypeError('ins_row - listeners : rootTogglePanel undefined');

       if(!this.root)
         throw new TypeError('ins_row - listeners : root undefined');

       var root = this.root;

       root.click(function(event){
         self.nextAction();
       });

     } catch (e) {
       console.log(e.message);
     }
   }

   /*######################################################
                       insItem
     ######################################################*/

  function insItem(servizio, rootServizio, quickAdd, index, root, item, tipologia){
    this.servizio = servizio;
    this.rootServizio = rootServizio;
    this.quickAdd = quickAdd;
    this.index = index;
    this.root = root;
    this.item = item;
    this.tipologia = tipologia;
  }

  insItem.prototype.getTagStructure = function(){
    try {
      var self = this;

      if(!this.item)
        throw new TypeError('tag_text_struct - getTagStructure : this.item undefined');

       var str = null;
       var titolo = "";

      str = insManager.structure.insItem.clone();
      titolo = this.item.getTitle();
      str.find(' .tag-item_struct span').html(titolo);


      return str;
    } catch (e) {
      console.log(e.message);
    }
  }

  insItem.prototype.setStructure = function(callback){
    try {
      var self = this;

      if(!this.rootServizio)
        throw new TypeError('insItem - setStructure : this.rootServizio undefined');

      if(!this.item)
        throw new TypeError('insItem - setStructure : this.item undefined');

      if(!callback)
        throw new TypeError('insItem - setStructure : this method needs a callback');

      var rootContainer = this.rootServizio.find(servizio_struct.roots.ins.container);
      var index = rootContainer.find(' > div').length + 1;
      var str = this.getTagStructure();

      rootContainer.append(str);
      var root = rootContainer.find(' > div:nth-child(' + index + ')');

      this.root = root;
      this.index = index;

      callback();

    } catch (e) {
      console.log(e.message);
    }
  }

  insItem.prototype.listeners = function(){
    try {
      var self = this;

      if(!this.index)
        throw new TypeError('insItem - listeners : this.index undefined');

      if(!this.root)
        throw new TypeError('insItem - listeners : this.root undefined');

      if(!this.servizio)
        throw new TypeError('insItem - listeners : this.servizio undefined');

      this.root.find(' .tag-item_struct .remove-tag').click(function(event){
        if(!self.quickAdd){
          self.servizio.IdInquilinoStanze = 0;
          self.root.remove();
        }else if(self.quickAdd && self.servizio.Inquilini.length > 0){
          var insItems = self.servizio.Inquilini;
          for (var i = 0; i < insItems.length; i++) {
            var t = insItems[i];
            if(self.item.Id && t.Id && self.item.Id === t.Id){
              insItems.splice(i, 1);
              self.root.remove();
            }
          }
        }

      });

    } catch (e) {
      console.log(e.message);
    }
  }

  insItem.prototype.init = function(){
    var self = this;

    this.setStructure(function(){
      self.listeners();
    });
  }

  function refresh_TotImportoServizi(){
    var item = $(".intestatari-results__row .servizioImporto .ms-row-content_row-content input");
    var container = $('.tm-properties-row.uk-form-horizontal.totImportoServizi');
    var totaleServizi = 0;
    item.each(function (index, value) {
      var selfItem = $(this);
      totaleServizi += new Number(selfItem.val());
    });

    container.find('.totImportoServizi__Importo').html(totaleServizi.formatMoney(2));

  }

})();
