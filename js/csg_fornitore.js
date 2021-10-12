function CSG_Fornitore(Intestatario, Movimento, IntestatariResults){
  this.Intestatario = Intestatario;
  this.Movimento = Movimento;
  this.IntestatariResults = IntestatariResults;
}

(function(){

  var clone = null;
  var root = null;
  var movimento = null;
  var m_i = null;
  var giustificativi = new Array();

  //HTML structure templates

  var contenutoNominativo = {
    contenuto :  $('<div class="tm-intestatari-results__row-header__title"><div class="tm-editable-textarea" style="font-size: 14px; padding: 0px;"><div class="tm-intestatari-results__row-textarea__content"></div><div class="tm-intestatari-results__row-textarea__left"><div class="tm-intestatari-results__row-textarea__left-text"></div></div></div></div>'),
    buttons : $('<div class="csg-fornitore_panel ms-row-list" style="background: transparent;margin-top: 10px;margin-bottom: 10px;"><div class="ms-row-struct newInvoice" style="width: 45%;border: none;"><div class="ms-row-content_row-color"></div><div class="ms-row-content_row-content" style="background: rgb(230, 232, 236);"><div class="ms-row-content_row-content_bottom-row" style=" padding-bottom: 0px; "><div class="ms-row-content_row-content_bottom-row_left"><i class="tm-icon" style="color: #696f7a;"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></i></div><div class="ms-row-content_row-content_bottom-row_right"><strong style="color: #696f7a;font-size: 17px;">Nuova fattura</strong></div></div></div></div><div class="ms-row-struct newService" style="width: 45%;border: none;"><div class="ms-row-content_row-color"></div><div class="ms-row-content_row-content" style="background: rgb(230, 232, 236);"><div class="ms-row-content_row-content_bottom-row" style=" padding-bottom: 0px; "><div class="ms-row-content_row-content_bottom-row_left"><i class="tm-icon" style="color: #696f7a;"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></i></div><div class="ms-row-content_row-content_bottom-row_right"><strong style="color: #696f7a;font-size: 17px;">Nuovo servizio</strong></div></div></div></div></div>'),
    left : '.tm-intestatari-results__row-textarea__content',
    right : '.tm-intestatari-results__row-textarea__left-text',
    panel : '.csg-fornitore_panel',
    leftBtn : '.newInvoice',
    rightBtn : '.newService'
  }

  var HTMLcontent = {
    structure : $('<div class="tm-list-item"><div class="tm-input-row"><div class="tm-input-row__left"><div class="tm-checkbox" title="Seleziona giustificativo"><i class="material-icons">check_box_outline_blank</i></div><div class="tm-input-row__info row-double-line" style=" background: inherit;"><div class="tm-simple row-double-line_font invoice_row" style="color: #8f939c !important;font-size: 13px !important;"></div><div class="tm-simple row-double-line_font servizio_row" style=" margin-top: 10px; color: #02a8f3 !important; font-size: 13px !important;"></div></div></div><div class="tm-input-row__right"><div class="tm-input-row__info row-double-line" style=" background: inherit;"></div></div></div></div>'),
    unchecked : $('<i class="material-icons">check_box_outline_blank</i>'),
    checked : $('<i class="material-icons">check_box</i>'),
    invoice : $('<div class="tm-simple row-double-line_font invoice_row" style="color: #8f939c !important;font-size: 13px !important;"><div class="row-icon"><i class="material-icons">receipt</i></div><div class="tm-simple__text" style=" margin-left: 10px; "><span></span></div></div>'),
    servizi : $('<div class="tm-simple row-double-line_font servizio_row" style=" margin-top: 10px; color: #02a8f3 !important; font-size: 13px !important;"><div class="row-icon" title="Apri"><i class="material-icons">view_day</i></div><div class="tm-simple__text" style=" margin-left: 10px;"><span>Visualizza i servizi inseriti</span></div></div>'),
    addInvoice : $('<div class="tm-simple row-double-line_font invoice_row" style="color: #8f939c !important;font-size: 13px !important;"><div class="row-icon" title="Aggiungi fattura"><i class="material-icons">add_circle_outline</i></div><div class="tm-simple__text" style=" margin-left: 10px; "><span>Inserisci una fattura associata ai servizi</span></div></div>'),
    editInvoice : $('<div class="tm-simple row-double-line_font delete_all" style="color: #da3838 !important;font-size: 13px !important;"><div class="row-icon" title="Elimina"><i class="material-icons">delete_forever</i></div></div>'),
    addServizi : $('<div class="tm-simple row-double-line_font servizio_row" style=" margin-top: 10px; color: #02a8f3 !important; font-size: 13px !important;"><div class="row-icon" title="Aggiungi"><i class="material-icons">add_circle_outline</i></div><div class="tm-simple__text" style=" margin-left: 10px;"><span>Inserisci servizi alla fattura</span></div></div>')
  }

  var roots = {
    scrollbar : ' .tm-list.tm-hack-scrollbar',
    row : {
      left : ' .tm-input-row .tm-input-row__left',
      right : ' .tm-input-row .tm-input-row__right'
    }
  }

  roots.row.left_top_row = roots.row.left + ' .tm-input-row__info .invoice_row';
  roots.row.left_bottom_row = roots.row.left + ' .tm-input-row__info .servizio_row';
  roots.row.checkbox = roots.row.left + ' .tm-checkbox';
  roots.row.right_top_row = roots.row.right + ' .tm-input-row__info';
  roots.row.right_bottom_row = roots.row.right + ' .tm-input-row__info .servizio_action';

  var quickRoots = {
    invoice : {
      title : roots.row.left_top_row + ' .tm-simple__text span',
      editBtn : roots.row.left_top_row + ' .row-icon',
      addBtn : roots.row.left_top_row + ' .row-icon',
    },
    //Servizi non ha title quickRoots perchè tutto il suo contenuto è preimpostato
    servizi : {
      editBtn : roots.row.left_bottom_row + ' .row-icon',
      addBtn : roots.row.left_bottom_row + ' .row-icon',
    }
  }

  var contenutoRowsGiustificativi = {
    root : '.tm-list.tm-hack-scrollbar',
    contenuto : $('<div class="cg-fornitore-row ms-row-list"><div class="cg-fornitore-row-left tm-input-row__left" style=" padding: 10px; "><div class="cg-checkbox"></div></div><div class="cg-fornitore-row-right tm-list-item" style=" width: 100%; height: auto; "><div class="cg-fornitore-row-right_top tm-input-row"><div class="docFisc-icon"></div><div class="nominativo tm-input-row__info"></div><div class="docFisc-total tm-input-row__info" style="color: #455A64;font-weight: bold;"></div><div class="cg-fornitore-docFisc_btn tm-input-row__info"><i class="material-icons">create</i></div></div><div class="cg-fornitore-row-right_bottom tm-input-row"><div class="docFisc-icon"></div><div class="nominativo tm-input-row__info"></div><div class="docFisc-total tm-input-row__info" style="color: #455A64;font-weight: bold;"></div><div class="cg-fornitore-docFisc_btn tm-input-row__info"><i class="material-icons">create</i></div></div></div></div>'),
    checkbox : {
      root : '.cg-checkbox',
      unchecked : $('<i class="material-icons">check_box_outline_blank</i>'),
      checked : $('<i class="material-icons">check_box</i>')
    },
    icons : {
      root : '.docFisc-icon',
      invoice : $('<i class="material-icons">receipt</i>'),
      servizio : $('<i class="material-icons">assignment</i>')
    },
    nominativo : {
      root : '.nominativo',
    },
    roots : {
      invoice : '.cg-fornitore-row-right_top',
      servizio : '.cg-fornitore-row-right_bottom'
    },
    add_btn : {
      invoice_content : $('<div class="add-docFisc_icon" style="color: #02A8F3;"><i class="material-icons">add_circle_outline</i></div><div class="add-docFisc_title" style="margin-left: 15px;color: #02A8F3;"></div>'),
      servizio_content : $('<div class="add-proforma tm-input-row"><div class="add-docFisc_icon" style="color: #02A8F3;"><i class="material-icons">add_circle_outline</i></div><div class="add-docFisc_title" style="margin-left: 15px;color: #02A8F3;"></div></div><div class="add-bolletta tm-input-row"><div class="add-docFisc_icon" style="color: #f3a002;"><i class="material-icons">add_circle_outline</i></div><div class="add-docFisc_title" style="margin-left: 15px;color: #f3a002;"></div></div>'),
      add_btn_hover_in : $('<i class="material-icons">add_circle</i>'),
      add_btn_hover_out : $('<i class="material-icons">add_circle_outline</i>'),
      root_proforma : '.add-proforma',
      root_bolletta : '.add-bolletta',
      root_icon : '.add-docFisc_icon',
      root_title : '.add-docFisc_title',
      txt_invoice : 'Inserisci fattura',
      txt_proforma : 'Inserisci proforma',
      txt_bolletta : 'Inserisci bolletta'
    }
  }

  var actionsPanel = {
    setStructure : function(){
      var content = $('<div class="ms-row-struct newInvoice" style="width: 45%;border: none;"><div class="ms-row-content_row-color"></div><div class="ms-row-content_row-content" style="background: rgb(230, 232, 236);"><div class="ms-row-content_row-content_bottom-row" style=" padding-bottom: 0px; "><div class="ms-row-content_row-content_bottom-row_left"><i class="tm-icon" style="color: #696f7a;"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></i></div><div class="ms-row-content_row-content_bottom-row_right"><strong style="color: #696f7a;font-size: 17px;">Nuova fattura</strong></div></div></div></div><div class="ms-row-struct newService" style="width: 45%;border: none;"><div class="ms-row-content_row-color"></div><div class="ms-row-content_row-content" style="background: rgb(230, 232, 236);"><div class="ms-row-content_row-content_bottom-row" style=" padding-bottom: 0px; "><div class="ms-row-content_row-content_bottom-row_left"><i class="tm-icon" style="color: #696f7a;"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></i></div><div class="ms-row-content_row-content_bottom-row_right"><strong style="color: #696f7a;font-size: 17px;">Nuovo servizio</strong></div></div></div></div>');
      root.find(contenutoNominativo.panel).html(content);
    },
    setListeners : function(){
      root.find(contenutoNominativo.leftBtn).click(function(event){
        console.log('left');
        clone.IntestatariResults.Content.empty();

        var newFtFornitore = new fatturaFornitore_ui();
        newFtFornitore.root = clone.IntestatariResults.Content.RootPane();
        newFtFornitore.intestatario = clone.Intestatario;
        newFtFornitore.movimento = clone.Movimento;
        newFtFornitore.prevAction = function(){
          var searchIntestatario = new Content_SelectIntestatario(clone.IntestatariResults.Content, clone.Movimento);
          searchIntestatario.ini();
          console.log("prevAction");
        }

        newFtFornitore.nextAction = function(){

          //TODO: Probabilmente bisognerà ricaricare il movimento per avere tutti i giustificativi in tempo reale
          var searchIntestatario = new Content_SelectIntestatario(clone.IntestatariResults.Content, clone.Movimento);
          searchIntestatario.ini();
          console.log('nextAction');
        }

        newFtFornitore.init();
      });

      root.find(contenutoNominativo.rightBtn).click(function(event){
        console.log('right');
        clone.IntestatariResults.Content.empty();

        var sv_ui = new servizio_ui();
        sv_ui.root = clone.IntestatariResults.Content.RootPane();
        sv_ui.intestatario = clone.Intestatario;
        sv_ui.servizi = new Array();
        sv_ui.movimento = clone.Movimento;

        sv_ui.prevAction = function(){
          var searchIntestatario = new Content_SelectIntestatario(clone.IntestatariResults.Content, clone.Movimento);
          searchIntestatario.ini();
          console.log("prevAction");
        }

        sv_ui.nextAction = function(){
          var searchIntestatario = new Content_SelectIntestatario(clone.IntestatariResults.Content, clone.Movimento);
          searchIntestatario.ini();
          console.log('nextAction');
        }

        sv_ui.init();

      });

    }
  }

  var save_btn = {
    contenuto : $('<div class="tm-add-button-panel__input save-btn" style="background: #e6e8ec;margin-top: 40px;cursor : pointer;"><div class="add-button ax-add-tag-button" style="width: auto;text-align: center;"><strong>Salva</strong></div></div>'),
    show : false,
    root : ' .save-btn',
    init : function(){
      try {

        if(!clone.IntestatariResults)
          throw new TypeError('save_btn - init : clone.IntestatariResults undefined');

        var root = clone.IntestatariResults.Root();
        root.find('.save-btn').click(function() {
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
        if(!movimento)
          throw new TypeError('save_btn - clickEvent : movimento undefined');

        console.log("Test save btn");
        console.log(clone);
        if (movimento.countDocumentiFiscali() === 1) {
          movimento.Save(function(success){
            clone.IntestatariResults.Content.setDefaultContent();
            if (success) {
              console.log("Salvataggio avvenuto con successo");
            }else{
              bootbox.alert("Errore durante il salvataggio");
              console.log("Errore durante il salvataggio");
            }
          });
        }else {
          clone.IntestatariResults.Content.empty();
          var RootPane = clone.IntestatariResults.Content.RootPane();
          var step2 = new CardsGiustificativo(clone.IntestatariResults.Content, RootPane, movimento);
          step2.ini();
        }
      } catch (e) {
        console.log(e.message);
      }
    }
  }

  CSG_Fornitore.prototype.ini = function(){
    console.log("ini di Fornitore");
    try {
      var self = this;

      if(!this.Intestatario)
        throw new TypeError('CSG_Fornitore - init : this.Intestatario undefined');

      if(!this.Movimento)
        throw new TypeError('CSG_Fornitore - init : this.Movimento undefined');

      if(!this.IntestatariResults)
        throw new TypeError('CSG_Fornitore - init : this.IntestatariResults undefined');

      clone = this;
      root = this.IntestatariResults.Root().find('div[data-id=' + this.Intestatario.Id +']');
      movimento = this.Movimento;

      clone.Intestatario.LoadGiustificativi(null, function(res){
        //Creazione struttura lista
        giustificativi = res.Data;
        var contornoStruc = new contorno();
        contornoStruc.init();

        if (res && res.Data && res.Data.length > 0) {
          //Inserimento righe giustificativi
          self.LoadGiustificativi();
        }


        self.IntestatariResults.Root().append(save_btn.contenuto.clone());
        save_btn.init();
        self.SwitchNexBtn();

      });

    } catch (e) {
      console.log(e.message);
    }
  }

  CSG_Fornitore.prototype.SwitchNexBtn = function(){

    var self = this;

    //this.setText_NextBtn();
    if (this.Movimento.countNewDocumentiFiscali() > 0 || this.Movimento.countNewM_I() > 0) {
      self.IntestatariResults.Root().find(save_btn.root).css('visibility', 'visible');
    }else{
      self.IntestatariResults.Root().find(save_btn.root).css('visibility', 'hidden');
    }
  }

  CSG_Fornitore.prototype.LoadGiustificativi = function(){
    try {
      var self = this;

      if(!this.Movimento)
        throw new TypeError('CSG_Fornitore - LoadGiustificativi : this.Movimento undefined');

      if(!this.Intestatario)
        throw new TypeError('CSG_Fornitore - LoadGiustificativi : this.Intestatario undefined');

      if(!giustificativi)
        throw new TypeError('CSG_Fornitore - giustificativi (global variable) undefined');

      for (var i = 0; i < giustificativi.length; i++) {
        var giustificativo = giustificativi[i];

        var row = new row_giustificativo(giustificativo);
        row.init();

      }

    } catch (e) {
      console.log(e.message);
    }
  }

  function contorno(){
  }

  contorno.prototype.setStructure = function(){
    try {
      if(!clone.Intestatario)
        throw new TypeError('contorno - setStructure : Intestatario undefined');

      if(!giustificativi)
        throw new TypeError('contorno - setStructure : giustificativi undefined');

      var nominativo = clone.Intestatario.getNominativo();
      var tipologia = clone.Intestatario.getTextTipologia();
      var contenuto = contenutoNominativo.contenuto.clone();

      contenuto.find(contenutoNominativo.left).append(nominativo);
      contenuto.find(contenutoNominativo.right).append(tipologia);

      //console.log(root);
      root.html(contenuto);
      root.append(contenutoNominativo.buttons.clone());

      var table = (giustificativi && giustificativi.length > 0) ? '<div class="tm-list tm-hack-scrollbar"></div>' : '<div class="tm-list tm-hack-scrollbar" style="height: 30px;">Nessun giustificativo</div>';
      root.append(table);

    } catch (e) {
      console.log(e.message);
    }
  }

  contorno.prototype.listeners = function(){
    try {
      if(!root)
        throw new TypeError('contorno - listeners : root undefined');

      if(!contenutoNominativo)
        throw new TypeError('contorno - listeners : contenutoNominativo undefined');

      actionsPanel.setListeners();

    } catch (e) {
      console.log(e.message);
    }
  }

  contorno.prototype.init = function(){
    try {
      var self = this;
      console.log("Ok init");
      if(!clone.Intestatario)
        throw new TypeError('contorno - setStructure : Intestatario undefined');

      if(!giustificativi)
        throw new TypeError('contorno - setStructure : giustificativi undefined');

      this.setStructure();
      this.listeners();

    } catch (e) {
      console.log(e.message);
    }
  }

  function row_giustificativo(docFiscale){
    this.docFiscale = docFiscale;
  }

  row_giustificativo.prototype.init = function(){
    try {
      var self = this;

      if(!clone.Intestatario)
        throw new TypeError('row_giustificativo - init : Intestatario undefined');

      if(!this.docFiscale)
        throw new TypeError('row_giustificativo - init : this.docFiscale undefined');

      var id = root.find(roots.scrollbar).find(' > div').length + 1;

      this.setStructure();
      this.listeners(id);

    } catch (e) {
      console.log(e.message);
    }
  }

  row_giustificativo.prototype.setStructure = function(){
    try {
      var self = this;

      if(!clone.Intestatario)
        throw new TypeError('row_giustificativo - setStructure : Intestatario undefined');

      if(!this.docFiscale)
        throw new TypeError('row_giustificativo - setStructure : this.docFiscale undefined');

      if(!movimento)
        throw new TypeError('row_giustificativo - setStructure : movimento (global variable) undefined');

      if(!HTMLcontent)
        throw new TypeError('row_giustificativo - setStructure : HTMLcontent undefined');

      var template = HTMLcontent.structure.clone();

      //1 step. Determinare se il doc fa parte dei giustificativi del movimento.
      var isGiustificativo = self.withinTransaction();

      if(isGiustificativo){
        //Cambiare icona checkbox
        console.log("Okokok");
        template.find(roots.row.checkbox).html(HTMLcontent.checked.clone());
      }

      //2 step. Determinare se la fattura esiste oppure no, se la servizio esiste oppure no. Non creare una funzione dedicata.
      if(!self.invoiceExist()){
        template.find(roots.row.left_top_row).replaceWith(HTMLcontent.addInvoice.clone());
        template.find(roots.row.right_top_row).replaceWith(HTMLcontent.editInvoice.clone());
      }else{
        //Inserimento nominativo ft
        var nominativo = self.docFiscale.getNominativo();
        template.find(roots.row.left_top_row).replaceWith(HTMLcontent.invoice.clone());
        template.find(quickRoots.invoice.title).html(nominativo);
        template.find(roots.row.right_top_row).replaceWith(HTMLcontent.editInvoice.clone());
      }

      if(!self.servizioExist()){
        template.find(roots.row.left_bottom_row).replaceWith(HTMLcontent.addServizi.clone());
      }else{
        template.find(roots.row.left_bottom_row).replaceWith(HTMLcontent.servizi.clone());
      }

      root.find(roots.scrollbar).append(template);

    } catch (e) {
      console.log(e.message);
    }
  }

  /**
    * utilizzato per determinare se DocumentoFornitore contiene oppure no Fattura
    */
  row_giustificativo.prototype.invoiceExist = function(){
    try {
      var self = this;
      var bool = false;

      if(!this.docFiscale)
        throw new TypeError('row_giustificativo - invoiceExist : docFiscale undefined');

      if(this.docFiscale && this.docFiscale.Documento && this.docFiscale.Documento.Fattura && parseInt(this.docFiscale.Documento.Fattura.Id) > 0){
        bool = true;
      }

      return bool;
    } catch (e) {
      console.log(e.message);
    }
  }

  /**
    * utilizzato per determinare se DocumentoFornitore contiene oppure no Servizi
    */
  row_giustificativo.prototype.servizioExist = function(){
    try {
      var self = this;
      var bool = false;

      if(!this.docFiscale)
        throw new TypeError('row_giustificativo - servizioExist : docFiscale undefined');

      /*if(this.docFiscale && this.docFiscale.Documento && this.docFiscale.Documento.Servizi && this.docFiscale.Documento.Servizi.length > 0){
        bool = true;
      }*/

      if(this.docFiscale && this.docFiscale.Documento && this.docFiscale.Documento.CountServizi && parseInt(this.docFiscale.Documento.CountServizi) > 0){
        bool = true;
      }

      return bool;
    } catch (e) {
      console.log(e.message);
    }
  }

  /**
   * Determina se un docFiscale (giustificativo) fa parte dei giustificativi del movimento.
   * Restituisce un boolean : True = Fa parte; False = NO
   */
  row_giustificativo.prototype.withinTransaction = function(){
    try {
      var self = this;
      var bool = false;

      if(!clone.Intestatario)
        throw new TypeError('row_giustificativo - setStructure : Intestatario undefined');

      if(!this.docFiscale)
        throw new TypeError('row_giustificativo - setStructure : this.docFiscale undefined');

      if(!movimento)
        throw new TypeError('row_giustificativo - setStructure : movimento (global variable) undefined');


      //1 step. Determinare se il doc fa parte dei giustificativi del movimento.

      if(movimento.SearchM_I(clone.Intestatario)){
        movimento.SearchM_I(clone.Intestatario, function(m_i, index){
          if(movimento.SearchDocumentoFiscale(m_i, self.docFiscale)){
            bool = true;
          }
        });
      }

      return bool;

    } catch (e) {
      console.log(e.message);
    }
  }

  row_giustificativo.prototype.listeners = function(id){
    try {

      var self = this;

      if(!clone.Intestatario)
        throw new TypeError('row_giustificativo - listeners : Intestatario undefined');

      if(!this.docFiscale)
        throw new TypeError('row_giustificativo - listeners : this.docFiscale undefined');

      if(!movimento)
        throw new TypeError('row_giustificativo - listeners : movimento (global variable) undefined');

      if(!contenutoRowsGiustificativi)
        throw new TypeError('row_giustificativo - listeners : contenutoRowsGiustificativi undefined');

      if(!id)
        throw new TypeError('row_giustificativo - listeners : id undefined');

      if(parseInt(id) >= 0){
        var element = root.find(roots.scrollbar).find('> div:nth-child(' + id + ')');
        //Evento per la selezione o rimozione di un giustificativo
        element.find(roots.row.checkbox).click(function(event){
          //Verificare se tale documento fornitore fa parte dei giustificativi già presenti sul movimento.
          if(!self.withinTransaction()){
            //Aggiungere giustificativo
            console.log("Aggiungere");
            console.log(self.docFiscale);
            element.find(roots.row.checkbox).html(HTMLcontent.checked.clone());
            movimento.AddDocumentoFiscale(clone.Intestatario, self.docFiscale, function(){
              console.log("Aggiunto");
              clone.SwitchNexBtn();
            });
          }else{
            //Verificare se il giustificativo è presente nella lista di quel M_I
            console.log("Rimuovere");
            console.log(self.docFiscale);
            element.find(roots.row.checkbox).html(HTMLcontent.unchecked.clone());
            movimento.RemoveDocumentoFiscale(clone.Intestatario, self.docFiscale, function(){
              console.log("Rimosso");
              clone.SwitchNexBtn();
            });
          }
        });

        //2 step. Determinare se la fattura esiste oppure no, se la servizio esiste oppure no. Non creare una funzione dedicata.
        if(!self.invoiceExist()){
          element.find(quickRoots.invoice.addBtn).click(function(event){
            console.log("Aggiungi fattura al documento");
            clone.IntestatariResults.Content.empty();

            var newFtFornitore = new fatturaFornitore_ui();
            newFtFornitore.root = clone.IntestatariResults.Content.RootPane();
            newFtFornitore.intestatario = clone.Intestatario;
            newFtFornitore.movimento = clone.Movimento;
            newFtFornitore.docFisc = self.docFiscale;
            newFtFornitore.prevAction = function(){
              var searchIntestatario = new Content_SelectIntestatario(clone.IntestatariResults.Content, clone.Movimento);
              searchIntestatario.ini();
              console.log("prevAction");
            }

            newFtFornitore.nextAction = function(){

              //TODO: Probabilmente bisognerà ricaricare il movimento per avere tutti i giustificativi in tempo reale
              var searchIntestatario = new Content_SelectIntestatario(clone.IntestatariResults.Content, clone.Movimento);
              searchIntestatario.ini();
              console.log('nextAction');
            }

            newFtFornitore.init();
          });
        }else{
          element.find(quickRoots.invoice.editBtn).click(function(event){
            console.log("Modifica la fattura presente sul documento");
            clone.IntestatariResults.Content.empty();

            var newFtFornitore = new fatturaFornitore_ui();
            newFtFornitore.root = clone.IntestatariResults.Content.RootPane();
            newFtFornitore.intestatario = clone.Intestatario;
            newFtFornitore.movimento = clone.Movimento;
            newFtFornitore.docFisc = self.docFiscale;
            newFtFornitore.prevAction = function(){
              var searchIntestatario = new Content_SelectIntestatario(clone.IntestatariResults.Content, clone.Movimento);
              searchIntestatario.ini();
              console.log("prevAction");
            }

            newFtFornitore.nextAction = function(){

              //TODO: Probabilmente bisognerà ricaricare il movimento per avere tutti i giustificativi in tempo reale
              var searchIntestatario = new Content_SelectIntestatario(clone.IntestatariResults.Content, clone.Movimento);
              searchIntestatario.ini();
              console.log('nextAction');
            }

            newFtFornitore.init();
          });
        }

        if(!self.servizioExist()){
          element.find(quickRoots.servizi.addBtn).click(function(event){
            console.log("Inserisci servizi al documento");
            clone.IntestatariResults.Content.empty();

            var sv_ui = new servizio_ui();
            sv_ui.root = clone.IntestatariResults.Content.RootPane();
            sv_ui.intestatario = clone.Intestatario;
            sv_ui.docFisc = self.docFiscale;
            sv_ui.servizi = new Array();
            sv_ui.movimento = clone.Movimento;

            sv_ui.prevAction = function(){
              var searchIntestatario = new Content_SelectIntestatario(clone.IntestatariResults.Content, clone.Movimento);
              searchIntestatario.ini();
              console.log("prevAction");
            }

            sv_ui.nextAction = function(){
              var searchIntestatario = new Content_SelectIntestatario(clone.IntestatariResults.Content, clone.Movimento);
              searchIntestatario.ini();
              console.log('nextAction');
            }

            sv_ui.init();

          });
        }else{
          element.find(quickRoots.servizi.editBtn).click(function(event){
            console.log("Modifica i servizi presenti documento");
              clone.IntestatariResults.Content.empty();

              self.docFiscale.Documento.LoadRelationship(function(success){
                if(self.docFiscale.Documento && self.docFiscale.Documento.Servizi.length > 0){
                  var sv_ui = new servizio_ui();
                  sv_ui.root = clone.IntestatariResults.Content.RootPane();
                  sv_ui.intestatario = clone.Intestatario;
                  sv_ui.docFisc = self.docFiscale;
                  sv_ui.servizi = self.docFiscale.Documento.Servizi;
                  sv_ui.movimento = clone.Movimento;

                  sv_ui.prevAction = function(){
                    var searchIntestatario = new Content_SelectIntestatario(clone.IntestatariResults.Content, clone.Movimento);
                    searchIntestatario.ini();
                    console.log("prevAction");
                  }

                  sv_ui.nextAction = function(){
                    var searchIntestatario = new Content_SelectIntestatario(clone.IntestatariResults.Content, clone.Movimento);
                    searchIntestatario.ini();
                    console.log('nextAction');
                  }

                  sv_ui.init();
                }else{
                  bootbox.alert('Non ci sono servizi, provare a ricaricare la pagina o richiedere assistenza.');
                }
              });
          });
        }

        //Delete DocFornitore
        element.find('.tm-input-row__right .delete_all').click(function(){
          self.docFiscale.Documento.DeleteRelationship(function(success, errorSms){
            if(success){
              bootbox.alert("Okay, eliminato!");
              element.remove();
            }else if(!success && errorSms){
              bootbox.alert(errorSms);
            }else{
              bootbox.alert("Errore imprevisto! Richiedere supporto.");
            }
          });
        });

      }

    } catch (e) {
      console.log(e.message);
    }
  }

  /*row_giustificativo.prototype.getM_I = function(){
    var self = this;
    var bool = false;
    movimento.SearchM_I(clone.Intestatario, function(m_i, index){
      bool = true;
      if (callback) {
        callback(m_i, index);
      }
    });

    return bool;
  }*/

})();
