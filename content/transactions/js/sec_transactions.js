/*
  - sec_transactions.prototype.init
*/
function sec_transactions(admin, transactions_ui){
  this.admin = admin;
  this.transactions_ui = transactions_ui;
  this.sectionNumber = 1;
}

/**
 * - sec_allTransactions.prototype.loadElements
 */
function sec_allTransactions(admin, rootKanbanList, transactions_ui){
  this.admin = admin;
  this.transactions_ui = transactions_ui;
  this.rootKanbanList = rootKanbanList;
  this.sectionNumber = 1;
}

/**
 * - FiltroMovimento.prototype.init
 * - FiltroMovimento.prototype.setListeners
 * - FiltroMovimento.prototype.setFilters
 */
function FiltroMovimento(Termine, Societa, Partita, Periodo, Pagination, TransazioniGiustificativo, root, parentRoot){
   this.Termine = Termine;
   this.Societa = Societa;
   this.Partita = Partita;
   this.Periodo = Periodo;
   this.Pagination = Pagination;
   this.TransazioniGiustificativo = TransazioniGiustificativo;
   this.root = root;
   this.parentRoot = parentRoot;
}

/**
 * UploadTransactions.prototype.init
 */
function UploadTransactions(root){
  this.root = root;
}

(function(){

  var clone = null;
  var items = new Array();
  var allTransactions_manager = new sec_allTransactions();
  var allTransactions_kanban = new kanban_list();
  var filter = new FiltroMovimento();

  var movRowStruct = $('<div class="tm-result-movimento"><div class="tm-result-movimento__movimento-color"></div><div class="giustificativi_preview tm-hack-scrollbar" style=" display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: flex-start; align-items: stretch; align-content: stretch; /*flex-grow: 1; flex-basis: 0;*/overflow:auto;"></div><div class="tm-result-movimento__movimento-content" style=" flex-grow: 2; flex-basis: 0;"><div class="tm-result-movimento__movimento-content__movimento-top-row"><div class="tm-result-movimento__movimento-content__movimento-top-row__movimento-details-left"></div><div class="tm-result-movimento__movimento-content__movimento-top-row__movimento-details-right"></div></div><div class="tm-result-movimento__movimento-content__movimento-bottom-row"><div class="tm-result-movimento__movimento-content__movimento-bottom-row__title"></div><div class="tm-result-movimento__movimento-content__movimento-bottom-row__importo"><i class="tm-icon tm-icon-importo"><span class="glyphicon glyphicon-euro" aria-hidden="true"></span></i><div class="tm-result-movimento__importo-text"></div></div></div></div></div>');

  sec_transactions.prototype.init = function(){
    try {
      var self = this;

      if(!this.admin)
        throw new TypeError("sec_transactions - init : this.admin undefined");

      if(!this.transactions_ui)
        throw new TypeError("sec_transactions - init : this.transactions_ui undefined");

      if(this.admin.isAdministrator() || this.admin.isContabile() || this.admin.isDataEntry() || this.admin.isCommercialista()){

        this.transactions_ui.setSection(this.sectionNumber);
        this.transactions_ui.rootKanbanLists.empty();

        clone = self;

        var uploader_struct = $('<div class="transaction-uploader mobile-flex-direction" style=" display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: stretch; align-content: center;background-color: #FCFCFC; border: 1px solid #e6e8ec; margin: 15px; padding: 15px; "><div  style=" display: flex; flex-direction: column; flex-wrap: nowrap; justify-content: space-between; align-items: stretch; align-content: center; "><div style="color: #696f7a;font-weight: 700;font-family: proxima-nova-regular,Proxima Nova,Avenir Next,Segoe UI,Helvetica,Arial,sans-serif;margin-bottom: 7px;"><span>Step 1.Selezionare il file</span></div><div style=" display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-between; align-items: stretch; align-content: center;"><span class="btn btn-default" style="margin-right: 10px;"><form id="file-form" action="" method="POST"><input type="file" accept="application/vnd.ms-excel" id="file-select" ></form></span></div><div><span class="help-block"> Selezionare l&#8217;estratto conto con il formato .xls della banca. </span></div></div><div  style=" display: flex; flex-direction: column; flex-wrap: nowrap; justify-content: space-between; align-items: stretch; align-content: center;"><div style="color: #696f7a;font-weight: 700;font-family: proxima-nova-regular,Proxima Nova,Avenir Next,Segoe UI,Helvetica,Arial,sans-serif;margin-bottom: 7px;"><span>Step 2.Caricamento dei movimenti</span></div><div><div id="upload-button" style="display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: space-around;align-items: center;align-content: center;font-family: proxima-nova-regular,Proxima Nova,Avenir Next,Segoe UI,Helvetica,Arial,sans-serif;font-size: 14px;color: #fff;padding: 5px 20px;cursor: pointer;background-color: #6b717c;font-weight : bold;"><span>Carica</span></div></div><div><span class="help-block"> I movimenti verranno caricati e salvati sul gestionale. </span></div></div></div>');

        var filter_struct = $('<div class="filter-panel mobile-flex-direction" style=" display: flex; flex-direction: row; flex-wrap: wrap; justify-content: flex-start; margin: 15px; padding: 15px; background-color: #FCFCFC; border: 1px solid #e6e8ec;"><div style=" flex-grow: 0; flex-shrink: 0; flex-basis: 35%; display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center; align-content: center; padding: 10px; margin-right: 10px;color: #555555;"> <i class="material-icons">search</i> <input name="globalSearch" type="text" class="form-control filter-panel__term" aria-label="..." placeholder="Ricerca movimento"> <i class="counter"></i></div><div class="filter_societa" style=" display: flex; flex-direction: column; flex-wrap: nowrap; justify-content: space-around; align-items: stretch; align-content: center; padding: 5px;"><div class="advanced-search-filters-header" style=""><span>Società</span></div><div class="filter-panel__finlibera" style=" display: flex; cursor: pointer; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center; align-content: center; font-family: proxima-nova-regular,Proxima Nova,Avenir Next,Segoe UI,Helvetica,Arial,sans-serif; font-size: 14px; color: #737373; padding: 5px;"><i class="material-icons" style=" font-size: 15px; font-weight: bold; margin-right: 15px;">radio_button_unchecked</i><span>Finlibera</span></div><div class="filter-panel__ecolibera" style=" display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center; align-content: center; font-family: proxima-nova-regular,Proxima Nova,Avenir Next,Segoe UI,Helvetica,Arial,sans-serif; font-size: 14px; color: #737373; padding: 5px; cursor: pointer;"><i class="material-icons" style=" font-size: 15px; font-weight: bold; margin-right: 15px;">radio_button_unchecked</i><span>Ecolibera</span></div></div><div class="filter_partita" style=" display: flex; flex-direction: column; flex-wrap: nowrap; justify-content: space-around; align-items: stretch; align-content: center; padding: 5px; margin-left: 10px; "><div class="advanced-search-filters-header" style=""><span>Partita</span></div><div class="filter-panel__entrate" style=" display: flex; cursor: pointer; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center; align-content: center; font-family: proxima-nova-regular,Proxima Nova,Avenir Next,Segoe UI,Helvetica,Arial,sans-serif; font-size: 14px; color: #737373; padding: 5px;"><i class="material-icons" style=" font-size: 15px; font-weight: bold; margin-right: 15px;">radio_button_unchecked</i><span>Entrate</span></div><div class="filter-panel__uscite" style=" display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center; align-content: center; font-family: proxima-nova-regular,Proxima Nova,Avenir Next,Segoe UI,Helvetica,Arial,sans-serif; font-size: 14px; color: #737373; padding: 5px; cursor: pointer;"><i class="material-icons" style=" font-size: 15px; font-weight: bold; margin-right: 15px;">radio_button_unchecked</i><span>Uscite</span></div></div><div class="filter_giustificativo" style=" display: flex; flex-direction: column; flex-wrap: nowrap; justify-content: space-around; align-items: stretch; align-content: center; padding: 5px; margin-left: 10px; "><div class="advanced-search-filters-header" style=""><span>Transazioni</span></div><div class="filter-panel__giustificati" style=" display: flex; cursor: pointer; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center; align-content: center; font-family: proxima-nova-regular,Proxima Nova,Avenir Next,Segoe UI,Helvetica,Arial,sans-serif; font-size: 14px; color: #737373; padding: 5px;"><i class="material-icons" style=" font-size: 15px; font-weight: bold; margin-right: 15px;">radio_button_unchecked</i><span>con giustificativo</span></div><div class="filter-panel__no-giustificati" style=" display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center; align-content: center; font-family: proxima-nova-regular,Proxima Nova,Avenir Next,Segoe UI,Helvetica,Arial,sans-serif; font-size: 14px; color: #737373; padding: 5px; cursor: pointer;"><i class="material-icons" style=" font-size: 15px; font-weight: bold; margin-right: 15px;">radio_button_unchecked</i><span>senza giustificativo</span></div></div><div class="filter_periodo" style=" display: flex; flex-direction: column; flex-wrap: nowrap; justify-content: space-around; align-items: stretch; align-content: center; padding: 5px; margin-left: 10px; "><div class="advanced-search-filters-header" style=""><span>Periodo</span></div><div style=" display: flex; cursor: pointer; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center; align-content: center; font-family: proxima-nova-regular,Proxima Nova,Avenir Next,Segoe UI,Helvetica,Arial,sans-serif; font-size: 14px; color: #737373; padding: 5px;"><input type="date" class="form-control filter-panel__from" aria-label="..." placeholder="Dal giorno"></div><div style=" display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center; align-content: center; font-family: proxima-nova-regular,Proxima Nova,Avenir Next,Segoe UI,Helvetica,Arial,sans-serif; font-size: 14px; color: #737373; padding: 5px; cursor: pointer;"><input type="date" class="form-control filter-panel__to" aria-label="..." placeholder="Dal giorno"></div></div><div style=" display: flex; flex-grow: 0; flex-shrink: 0; flex-basis: 10%; flex-direction: column; flex-wrap: nowrap; justify-content: space-around; align-items: stretch; align-content: center; padding: 5px; margin-left: 10px;"><div class="filter-panel__searchPanel" style=" display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center; align-content: center; font-family: proxima-nova-regular,Proxima Nova,Avenir Next,Segoe UI,Helvetica,Arial,sans-serif; font-size: 14px; color: #fff; padding: 5px 20px; cursor: pointer;background-color: #5cb85c; font-weight : bold; "><span>Ricerca</span></div></div></div>');

        if(this.admin.isAdministrator() || this.admin.isContabile()){
          this.transactions_ui.rootKanbanLists.append(uploader_struct);
          var uploader = new UploadTransactions();
          uploader.root = this.transactions_ui.rootKanbanLists.find('.transaction-uploader');
          uploader.init();
        }


        this.transactions_ui.rootKanbanLists.append(filter_struct);

        allTransactions_manager.admin = self.admin;
        allTransactions_manager.transactions_ui = self.transactions_ui;
        allTransactions_manager.sectionNumber = self.sectionNumber;

        allTransactions_kanban.parentRoot = this.transactions_ui.rootKanbanLists;
        allTransactions_kanban.secTitle = "Transazioni";
        allTransactions_kanban.itemsManager = allTransactions_manager;
        allTransactions_kanban.init();

        filter.root = this.transactions_ui.rootKanbanLists.find('.filter-panel');
        filter.parentRoot = this.transactions_ui.rootKanbanLists;
        filter.init();

      }else{
        alert("Non hai i permessi per accedere a questa sezione!");
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  sec_allTransactions.prototype.loadElements = function(tmp, callback){
    try {
      var self = this;
      if(!callback)
        throw new TypeError('sec_allTransactions - loadElements : callback undefined');

      if(!filter)
        throw new TypeError('sec_allTransactions - loadElements : FiltroMovimento undefined');

        var movimenti = new Movimento();
        items = [];

        if(self.rootKanbanList.find('.ms-list-header__right').is(':empty')){
          self.rootKanbanList.find('.ms-list-header__right').html('<div class="tm-pagination"><span class="paginationTitle" style=" margin-right: 20px;"></span><i class="fas fa-arrow-left left"></i><i class="fas fa-arrow-right right"></i></div>');
        }

        movimenti.Search(filter, function (res){
           var data = res.Data;
           if(filter.Pagination){
               filter.Pagination.TotalPages = res.TotalPages;
           }

           if(filter.Pagination){
               filter.Pagination.TotalRows = res.TotalRows;
           }

           if(data && data.length > 0){
             self.rootKanbanList.find('.secTitle').html("Transazioni (" + filter.Pagination.TotalRows + ")");

             var pager_title = filter.Pagination.CurrentPage + " - " + filter.Pagination.TotalPages;
             self.rootKanbanList.find('.paginationTitle').html(pager_title);
             for (var i = 0; i < data.length; i++) {
               var row = new row_ui();
               row.item = data[i];
               row.setStructure();
               items.push(row);
             }
           }

           callback(items);
        });

    } catch (e) {
      console.log(e.message);
    }
  }

  FiltroMovimento.prototype.init = function(){
    try {
      var self = this;

      this.Termine = null;
      this.Societa = 0;
      this.Periodo = {
        Inizio : null,
        Fine : null
      };
      this.Partita = 0;
      this.TransazioniGiustificativo = 0;
      this.Pagination = {
        TotalRows : 0,
        TotalPages : 0,
        CurrentPage : 1,
        LimitRows : 100
      };

      this.setListeners();
      //this.setFilters();

    } catch (e) {
      console.log(e.message);
    }
  }

  FiltroMovimento.prototype.setListeners = function(){
    try {
      var self = this;
      var checked_icon = "radio_button_checked";
      var unchecked_icon = "radio_button_unchecked";
      var showEnterIcon = function(divEl){
        divEl.addClass('show-icon_enter-text');
        setTimeout(function(){
          divEl.removeClass('show-icon_enter-text');
        }, 300); // 5 seconds
      };

      this.root.find('.filter-panel__searchPanel').click(function(){
        self.Pagination.CurrentPage = 1;
        self.setFilters();
        allTransactions_kanban.reload();
        /*allTransactions_manager.rootKanbanList.empty();
        allTransactions_kanban.init();*/
      });

      this.root.find('.filter-panel__term').keyup(function(){
        showEnterIcon(self.root.find('.filter-panel__term'));
      });

      this.root.find('.filter-panel__term').keyup(
        debounce(function(e){
          e.preventDefault();
          if (e.keyCode === 13) {
            self.Pagination.CurrentPage = 1;
            self.setFilters();
            allTransactions_kanban.reload();
          }
        },300)
      );

      /**
       * PAGER
       */
      this.parentRoot.find('.ms-list-header__right .left').click(function(event){
        event.stopImmediatePropagation();
        if(self.Pagination.CurrentPage && self.Pagination.CurrentPage > 1 && self.Pagination.CurrentPage <= self.Pagination.TotalPages){
          self.Pagination.CurrentPage--;
          self.setFilters();
          allTransactions_kanban.reload();
          /*allTransactions_manager.rootKanbanList.empty();
          allTransactions_kanban.init(function(){
            self.root = allTransactions_kanban.transactions_ui.rootKanbanLists.find('.filter-panel');
            self.parentRoot = this.transactions_ui.rootKanbanLists;
          });*/
        }
      });

      this.parentRoot.find('.ms-list-header__right .right').click(function(event){
        event.stopImmediatePropagation();
        if(self.Pagination.CurrentPage && self.Pagination.CurrentPage > 0 && self.Pagination.CurrentPage < self.Pagination.TotalPages){
          self.Pagination.CurrentPage++;
          self.setFilters();
          allTransactions_kanban.reload();
          /*allTransactions_manager.rootKanbanList.empty();
          allTransactions_kanban.init(function(){

          });*/
        }
      });

      /**
       * CHECKBOX : SOCIETA
       */
      this.root.find('.filter-panel__finlibera').click(function(){
        var checkbox = $(this);
        var value = checkbox.find('i.material-icons').html();
        emptyCheckboxByRoot(self.root.find('.filter_societa'));

        if(value !== checked_icon){
          checkbox.find('i.material-icons').html(checked_icon);
        }

      });

      this.root.find('.filter-panel__ecolibera').click(function(){
        var checkbox = $(this);
        var value = checkbox.find('i.material-icons').html();
        emptyCheckboxByRoot(self.root.find('.filter_societa'));

        if(value !== checked_icon){
          checkbox.find('i.material-icons').html(checked_icon);
        }

      });

      /**
       * CHECKBOX : PARTITA
       */
      this.root.find('.filter-panel__entrate').click(function(){
        var checkbox = $(this);
        var value = checkbox.find('i.material-icons').html();
        emptyCheckboxByRoot(self.root.find('.filter_partita'));

        if(value !== checked_icon){
          checkbox.find('i.material-icons').html(checked_icon);
        }

      });

      this.root.find('.filter-panel__uscite').click(function(){
        var checkbox = $(this);
        var value = checkbox.find('i.material-icons').html();
        emptyCheckboxByRoot(self.root.find('.filter_partita'));

        if(value !== checked_icon){
          checkbox.find('i.material-icons').html(checked_icon);
        }

      });

      /**
       * CHECKBOX : GIUSTIFICATIVO
       */
      this.root.find('.filter-panel__giustificati').click(function(){
        var checkbox = $(this);
        var value = checkbox.find('i.material-icons').html();
        emptyCheckboxByRoot(self.root.find('.filter_giustificativo'));

        if(value !== checked_icon){
          checkbox.find('i.material-icons').html(checked_icon);
        }

      });

      this.root.find('.filter-panel__no-giustificati').click(function(){
        var checkbox = $(this);
        var value = checkbox.find('i.material-icons').html();
        emptyCheckboxByRoot(self.root.find('.filter_giustificativo'));

        if(value !== checked_icon){
          checkbox.find('i.material-icons').html(checked_icon);
        }

      });

      function emptyCheckboxByRoot(rootCheckbox){
        if(rootCheckbox){
          rootCheckbox.find('i.material-icons').html(unchecked_icon);
        }
      }

      function debounce(fn,time){
          var timerId = null;
          return function(e){
              if(timerId)
                  return;

              timerId = setTimeout(function(){
                  fn(e);
                  timerId = null;
              },time);
          }
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  /**
   * Assegna a FiltroMovimento tutti i valori inseriti.
   */
  FiltroMovimento.prototype.setFilters = function(){
    try {
      var self = this;
      var checked_icon = "radio_button_checked";
      var unchecked_icon = "radio_button_unchecked";

      var checkbox_finlibera = this.root.find('.filter-panel__finlibera i.material-icons').html();
      var checkbox_ecolibera = this.root.find('.filter-panel__ecolibera i.material-icons').html();
      var checkbox_entrate = this.root.find('.filter-panel__entrate i.material-icons').html();
      var checkbox_uscite = this.root.find('.filter-panel__uscite i.material-icons').html();
      var checkbox_giustificativo = this.root.find('.filter-panel__giustificati i.material-icons').html();
      var checkbox_nonGiustificativo = this.root.find('.filter-panel__no-giustificati i.material-icons').html();

      /**
       * CHECKBOX : SOCIETA
       */
      this.Societa = 0;
      if(checkbox_finlibera === checked_icon){
        this.Societa = 1;
      }else if(checkbox_ecolibera === checked_icon){
        this.Societa = 2;
      }

      /**
       * CHECKBOX : PARTITA
       */
      this.Partita = 0;
      if(checkbox_entrate === checked_icon){
        this.Partita = 1;
      }else if(checkbox_uscite === checked_icon){
        this.Partita = 2;
      }

      /**
       * CHECKBOX : GIUSTIFICATIVO
       */
      this.TransazioniGiustificativo = 0;
      if(checkbox_giustificativo === checked_icon){
        this.TransazioniGiustificativo = 1;
      }else if(checkbox_nonGiustificativo === checked_icon){
        this.TransazioniGiustificativo = 2;
      }

      /**
       * PERIODO
       */
      this.Periodo = {
        Inizio : this.root.find('input.filter-panel__from').val(),
        Fine : this.root.find('input.filter-panel__to').val()
      };

      this.Termine = this.root.find('input.filter-panel__term').val();

    } catch (e) {
      console.log(e.message);
    }
  }

  /**
   * - row_ui.prototype.setStructure
   * - row_ui.prototype.init
   * - row_ui.prototype.listeners
   * - row_ui.prototype.setGiustificativoPreview
   */
  function row_ui(item, index, root, structure){
    this.item = item;
    this.index = index;
    this.root = root;
    this.structure = structure;
  }

  row_ui.prototype.setStructure = function(){
    try {
      var self = this;
      var societa = ".tm-result-movimento__movimento-content__movimento-top-row__movimento-details-left";
      var dataValuta = ".tm-result-movimento__movimento-content__movimento-top-row__movimento-details-right";
      var title = ".tm-result-movimento__movimento-content__movimento-bottom-row__title";
      var amount = ".tm-result-movimento__importo-text";

      if(!this.item || !(this.item instanceof Movimento))
        throw new TypeError('sec_transactions.js - row_ui - setStructure : this.item undefined');

      var item = this.item;
      var str = movRowStruct.clone();
      var date = new Date(item.DataOperazione);
      var totale = new Number(item.Importo);

      /*var preview = this.getGiustificativoPreview();
      str.find('.giustificativi_preview').append(preview);*/

      str.find(societa).append(titoloSocieta(item.Societa));
      str.find(dataValuta).append("Data valuta : " + date.ddmmyyyy());
      str.find(title).append(item.Descrizione);
      str.find(amount).append(totale.formatMoney(2));

      this.structure = str;

    } catch (e) {
      console.log(e.message);
    }
  }

  row_ui.prototype.init = function(){
    try {
      this.listeners();
      this.setGiustificativoPreview();

    } catch (e) {
      console.log(e.message);
    }
  }

  row_ui.prototype.listeners = function(){
    try {
      var self = this;
      if(!this.root)
        throw new TypeError("sec_transactions.js - row_ui - listeners : this.root undefined");

      var root = this.root;
      var sec_generali = null;

      root.click(function(event){
        var floatingPanel = new floatingPanelV2();
        var transaction = new TransactionPropertiesBody();
        transaction.Root = $('body');
        transaction.Movimento = self.item;
        transaction.Movimento.Load(function(){
          floatingPanel.root = $('section.main-layout_content .tm-floating-panel-desktop-v2');
          floatingPanel.setHeader = function(){
            var mov = transaction.Movimento;
            var header = floatingPanel.rootHeader;

            var meta__top = $('<div><span class="highlight">Data Operazione : </span><span class="trs_data-operazione"></span><span class="highlight"> &gt; Data Valuta : </span><span class="trs_data-valuta"></span><span class="highlight"> &gt; Causale : </span><span class="trs_causale"></span><span class="highlight trs_societa"></span></div>');
            var meta__top_clone = meta__top.clone();
            var data_operazione = new Date(mov.DataOperazione);
            var data_valuta = new Date(mov.DataValuta);
            var causale = mov.Causale;
            var societa = " > " + mov.getTitle_Societa();
            var importo = new Number(mov.Importo);

            meta__top_clone.find('.trs_data-operazione').append(data_operazione.ddmmyyyy());
            meta__top_clone.find('.trs_data-valuta').append(data_valuta.ddmmyyyy());
            meta__top_clone.find('.trs_causale').append(causale);
            meta__top_clone.find('.trs_societa').append(societa);

            var importo__text = $('<div><i class="tm-icon tm-icon-importo"><span class="glyphicon glyphicon-euro" aria-hidden="true"></span></i><div class="tm-editable-textarea__importo-text"></div></div>');
            var importo__text__clone = importo__text.clone();
            importo__text__clone.find('.tm-editable-textarea__importo-text').html(importo.formatMoney(2));
            header.find('.tm-editable-textarea__importo').html(importo__text__clone.html());

            header.find('.tm-transaction-properties-header__title .tm-editable-textarea .tm-editable-textarea__content').html("Giustificativi del movimento");
            header.find('.description .description-meta.description-meta__top').html(meta__top_clone.html());
            header.find('.description .description-meta.description-meta__bottom').html('<br><p>' + mov.Descrizione + '</p>');

          }
          floatingPanel.init();
          sec_generali = floatingPanel.addNewSection('Proprietà');

          transaction.ini();
          transaction.setDefault();
        });

      });

      /*root.find('.sec_transactions-action').click(function(event){
      });

      root.find('.infoTenant-action').click(function(event){
      });

      root.find('.infoRoom-action').click(function(event){
      });*/

    } catch (e) {
      console.log(e.message);
    }
  }

  row_ui.prototype.setGiustificativoPreview = function(){
    try {
      var self = this;
      var root = this.root;

      var container = $('<div style=" display: flex; flex-direction: row;"></div>');
      var singlePreview = $('<div class="single_preview" style=" min-width: 60%;"><div class="singleIntestatario" style=" display: flex; flex-direction: column; flex-wrap: nowrap; justify-content: space-around; align-items: flex-start; align-content: stretch; color: #b0b4bb; font-size: 1.3rem; font-weight: 400; line-height: 1; margin-top: 10px; margin-left: 10px; "><span class="singleIntestatario__text"></span></div><div class="gst_list" style=" display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: flex-start; align-items: stretch; align-content: stretch;"></div></div>');
      var gtv_struct = $('<div class="tm-editable-textarea row-doc_header" style="cursor: pointer;min-width: 55%;"><div class="tm-properties-row__icon"><i class="tm-icon glyphicon glyphicon-file"></i></div><div class="tm-intestatari-results__row-textarea__content" style="width: auto; text-align: left;"></div></div>');

      var container_clone = container.clone();

      var movimento = this.item;
      movimento.Load(function(){
        if(movimento.Giustificativi && movimento.Giustificativi.length > 0){
          root.find('.giustificativi_preview').css('flex-grow', '1');
          root.find('.giustificativi_preview').css('flex-basis', '0');
          root.find('.giustificativi_preview').css('border-right', '5px solid rgba(23, 104, 155, 0.43)');
          var itt_gtvs = movimento.Giustificativi;
          for (var i = 0; i < itt_gtvs.length; i++) {
            var singleStruct = singlePreview.clone();
            var itt_gtv = itt_gtvs[i];

            var itt = itt_gtv.Intestatario;
            var GTVs = itt_gtv.RamoMovimento;

            if(itt){
              var itt_nominativo = itt.getNominativo();
              if(itt_nominativo){
                singleStruct.find('.singleIntestatario span.singleIntestatario__text').append(itt_nominativo);
              }
            }

            if(GTVs && GTVs.length > 0){
              for (var x = 0; x < GTVs.length; x++) {
                var gtv_struct_clone = gtv_struct.clone();
                var gtv = GTVs[x];
                var doc = gtv.getDocumentoFiscale();

                if(doc){
                  var doc_title = doc.getNominativo();

                  if(doc_title){
                    gtv_struct_clone.find('.tm-intestatari-results__row-textarea__content').append(doc_title);
                    singleStruct.find('.gst_list').append(gtv_struct_clone);
                  }
                }
              }
            }

            container_clone.append(singleStruct);

          }
        }
      });

      root.find('.giustificativi_preview').append(container_clone);
      //return container_clone;
    } catch (e) {
      console.log(e.message);
    }
  }

  UploadTransactions.prototype.init = function(){
    try {
      var self = this;

      if(!this.root)
        throw new TypeError('UploadTransactions - init : this.root');

      var form = document.getElementById('file-form');
      var fileSelect = document.getElementById('file-select');
      var uploadButton = $('#upload-button');
      var importToDB = $('.importToDB');

      uploadButton.click(function(event){
        event.preventDefault();
        // Get the selected files from the input.
        var files = fileSelect.files;

        // Create a new FormData object.
        var formData = new FormData();

        // Loop through each of the selected files.
        for (var i = 0; i < files.length; i++) {
          var file = files[i];

          // Check the file type.
          /*if (!file.type.match('image.*')) {
            continue;
          }*/

          // Add the file to the request.
          formData.append('files[]', file, file.name);
        }

        // Set up the request.
        var xhr = new XMLHttpRequest();

        // Open the connection.
        xhr.open('POST', '?action=upload', true);

        // Set up a handler for when the request finishes.
        xhr.onload = function () {
          if (xhr.status === 200) {
            // File(s) uploaded.
            var response = JSON.parse(xhr.response);

            if(response.success){
                uploadButton.text('50% - File Caricati');
                $.getJSON('?action=importToDB', function (data){
                    if(data.success){
                      uploadButton.text('Carica');
                      txn_dialog(data);
                    }else{
                        if(data.error){
                            bootbox.alert({
                                title : "Errore imprevisto!",
                                message: data.error
                            });
                        }else{
                            bootbox.alert("Fatal error encountered during data process!");
                        }

                    }
                });
            }else{
                uploadButton.text('Errore');
            }

          } else {
            uploadButton.text('Errore');
          }
        };

        // Send the Data.
        xhr.send(formData);
      });

      // Add events
      $('input[type=file]').on('change', prepareUpload);

      // Grab the files and set them to our variable
      function prepareUpload(){
        var input = $(this),
              numFiles = input.get(0).files ? input.get(0).files.length : 1,
              label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
          input.trigger('fileselect', [numFiles, label]);

      }

      // We can watch for our custom `fileselect` event like this
      $(document).ready( function() {
        $(':file').on('fileselect', function(event, numFiles, label) {

            var input = $(this).parents('.input-group').find(':text'),
                log = numFiles > 1 ? numFiles + ' files selected' : label;

            if( input.length ) {
                input.val(log);
            } else {
                if( log ) console.log(log);
            }

        });
      });

      function txn_dialog(data){

          var sms = new Array();
          var dialog = new bootbox_Dialog();
          var sms_1 = {
              rows : [ ],
              options : [ ]
          };

          if(data.conflict && data.conflict.length){
              sms_1.rows.push({ type: "line", titolo : "Non e' stato possibile salvare '" + data.conflict.length + "' movimenti", width : 12 });
          }

          if(data.count){
              sms_1.rows.push({ type: "line", titolo : "Numero di movimenti trovati : " + data.count, width : 12 });
          }

          if(data.saved && data.saved.length){
              sms_1.rows.push({ type: "line", titolo : "Numero di movimenti salvati : " + data.saved.length, width : 12 });
          }

          if(data.exists && data.exists.length){
              sms_1.rows.push({ type: "line", titolo : "Numero di movimenti gia' presenti : " + data.exists.length, width : 12 });
          }

          sms.push(sms_1);

          bootbox.dialog({
              title: "Dettagli del caricamento",
              message: dialog.createDialog(sms),
              buttons: {
                  back: {
                      label: "Indietro",
                      className: "btn-danger",
                      callback: function () {
                      }
                  }
              }
          });

      }

    } catch (e) {
        console.log(e.message);
    }
  }

})();
