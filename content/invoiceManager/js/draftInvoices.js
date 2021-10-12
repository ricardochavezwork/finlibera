function sec_draftInvoices(invoiceApp_ui, sectionNumber){
  this.invoiceApp_ui = invoiceApp_ui;
  this.sectionNumber = sectionNumber;
}

(function(){

  function all_draftInvoices(rootKanbanList, invoiceApp_ui){
    this.rootKanbanList = rootKanbanList;
    this.invoiceApp_ui = invoiceApp_ui;
  }

  function all_pendingInvoice(rootKanbanList, invoiceApp_ui){
    this.rootKanbanList = rootKanbanList;
    this.invoiceApp_ui = invoiceApp_ui;
  }

  function DraftFilter(Customer, Tipologia, Societa, Pagination){
    this.Customer = Customer;
    this.Tipologia = Tipologia;
    this.Societa = Societa;
    this.Pagination = Pagination;
  }

  function pendingInvoicesFilter(Pagination){
    this.Pagination = Pagination;
  }

  function draftRow_ui(item, index, root, structure){
    this.item = item;
    this.index = index;
    this.root = root;
    this.structure = structure;
  }

  function AcubePanel(root, parentRoot){
    this.root = root;
    this.parentRoot = parentRoot;
  }

  var clone = null;
  var items = new Array();
  var filter = new DraftFilter();
  var pInv_filter = new pendingInvoicesFilter();
  var acubePanel = new AcubePanel();
  var allDrafts_manager = new all_draftInvoices();
  var allDrafts_kanban = new kanban_list();
  var allPendingInvoices_manager = new all_pendingInvoice();
  var allPendingInvoices_kanban = new kanban_list();

  var draftRow_struct = $('<div class="kb-row-v2"><div class="kb-row-v2_top"><div class="kb-row-v2_top__sub-left"><div class="kb-row-v2_btn_select"><i class="material-icons">radio_button_unchecked</i></div><div class="kb-row-v2_left"><div class="kb-row-v2_col"><div class="kb-row-v2_info cl_nominativo" title="Apri cliente"><i class="material-icons">person</i><span></span></div></div><div class="kb-row-v2_col"><div class="kb-row-v2_info doc_type" title="Apri fattura"><i class="material-icons">receipt</i><span></span></div><div class="kb-row-v2_info cursor_default doc_supplier"><i class="material-icons">domain</i><span></span></div></div><div class="kb-row-v2_col"><div class="kb-row-v2_info cursor_default doc_total"><i class="material-icons">euro_symbol</i><span></span></div><div class="kb-row-v2_info cursor_default doc_data_registrazione"><i class="material-icons">calendar_today</i><span></span></div></div></div><div class="kb-row-v2_right" style=" display: none;"><div class="kb-row-v2_col" style=" cursor: pointer;"><i class="material-icons" style="font-size: 35px;text-align: center;">expand_more</i></div><div class="kb-row-v2_col" style=" cursor: pointer;"><i class="material-icons" style="font-size: 35px;text-align: center;">offline_bolt</i></div></div></div><div class="kb-row-v2_top__sub-right"><div class="kb-row-v2_info i_newContract" style=" padding: 0px 20px; color: #00a9fa;"><i class="material-icons">note_add</i><span>Nuovo Contratto</span></div></div></div><div class="kb-row-v2_bottom"></div></div>');

  sec_draftInvoices.prototype.init = function(){
    try {
      var self = this;

      if(!this.invoiceApp_ui)
        throw new TypeError('sec_draftInvoices - init : this.invoiceApp_ui undefined!');

      this.invoiceApp_ui.setActiveStatusSectionByNumber(this.sectionNumber);

      clone = self;

      var rootKanbanLists = this.invoiceApp_ui.rootKanbanLists;
      rootKanbanLists.empty();

      var filter_struct = $('<div class="cl_filter"><div class="cl_filter_left-panel"><div class="cl_filter_left-row" style=" justify-content: space-between;"><div class="cl_filter_left-row_input-text"><span class="material-icons">search</span><input class="filter_term" placeholder="Ricerca per cliente..."></div><div class="cl_filter_left-row_select"><span>Societa</span><select class="filter_societa"> <option value="0" selected="selected">Finlibera</option> <option value="1">Ecolibera</option> </select></div><div class="cl_filter_left-row_select"><span>Tipo Documento</span><select class="filter_tipoDoc"> <option value="0">Seleziona</option><option value="1">Fattura</option> <option value="2">Nota di Credito</option> </select></div></div><div class="cl_filter_left-row"><span class="cl_filter_toggle-btn"><i class="material-icons">add_circle</i><div> Espandi </div></span></div><div class="cl_filter_left-row justify-content_flex-start toggleFields_hide"><div class="cl_filter_left-row_period"><div class="cl_filter_left-row_period-top"><span>Creazione Fattura</span></div><div class="cl_filter_left-row_period-bottom"><input class="filter_creazione_from" type="date"><input class="filter_creazione_to" type="date"></div></div></div></div><div class="cl_filter_right-panel"><div class="cl_filter-btn"><i></i><span>Ricerca</span></div></div></div>');

      var acube_panel = $('<div class="acube-panel"><div class="acube-panel_left-panel"><div class="acube-panel_left-row"><span class="acube-panel_toggle-btn"><i class="material-icons">toggle_off</i><div style=" font-weight: bold;">Seleziona tutti</div></span></div></div><div class="acube-panel_right-panel"><div btnStatus="active" class="cl_acube-panel_send-invoices"><i class="material-icons" style=" margin-right: 10px;">send</i><span>Trasmetti</span></div></div></div>');

      $('.ms-scrollable-layout').css('background-color', '#F2F6FA');
      rootKanbanLists.append(filter_struct);
      rootKanbanLists.append(acube_panel);

      filter.root = rootKanbanLists.find('.cl_filter');
      filter.init();

      pInv_filter.init();

      acubePanel.root = rootKanbanLists.find('.acube-panel');
      acubePanel.parentRoot = rootKanbanLists;
      acubePanel.init();

      allDrafts_manager.invoiceApp_ui = this.invoiceApp_ui;
      allPendingInvoices_manager.invoiceApp_ui = this.invoiceApp_ui;

      allPendingInvoices_kanban.parentRoot = rootKanbanLists;
      allPendingInvoices_kanban.secTitle = "In attesa di notifica";
      allPendingInvoices_kanban.itemsManager = allPendingInvoices_manager;

      allDrafts_kanban.parentRoot = rootKanbanLists;
      allDrafts_kanban.secTitle = "Bozze";
      allDrafts_kanban.itemsManager = allDrafts_manager;
      allDrafts_kanban.init(function(){
        filter.parentRoot = allDrafts_kanban.root;
        filter.setListeners();
        allPendingInvoices_kanban.init(function(){
          pInv_filter.parentRoot = allPendingInvoices_kanban.root;
          pInv_filter.setListeners();
        });
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  all_draftInvoices.prototype.loadElements = function(filtro, callback){
    try {
      var self = this;

      if(!clone)
        throw new TypeError("all_draftInvoices - loadElements : clone undefined!");

      if(!callback)
        throw new TypeError("all_draftInvoices - loadElements : callback undefined!");

      var elements = new Array();

      if(self.rootKanbanList.find('.ms-list-header__right').is(':empty')){
        self.rootKanbanList.find('.ms-list-header__right').html('<div class="tm-pagination"><span class="paginationTitle" style=" margin-right: 20px;"></span><i class="fas fa-arrow-left left"></i><i class="fas fa-arrow-right right"></i></div>');
      }

      this.Search(filter, function(invoices, pagination){
        var data = invoices;

        if(filter.Pagination){
            filter.Pagination.TotalPages = pagination.TotalPages;
        }

        if(filter.Pagination){
            filter.Pagination.TotalRows = pagination.TotalRows;
        }

        if(data && data.length > 0){
          self.rootKanbanList.find('.secTitle').html("Bozze (" + filter.Pagination.TotalRows + ")");

          var pager_title = filter.Pagination.CurrentPage + " - " + filter.Pagination.TotalPages;
          self.rootKanbanList.find('.paginationTitle').html(pager_title);
          for (var i = 0; i < data.length; i++) {
            row = new draftRow_ui();
            row.item = data[i];
            row.setStructure();
            elements.push(row);
          }

        }else{
          self.rootKanbanList.find('.secTitle').html("Bozze (0)");
        }

        callback(elements);
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  all_draftInvoices.prototype.Search = function(filtro, callback){
    try {
      var self = this;
      var data = { Filtro : filtro };
      var clone = encodeURIComponent(JSON.stringify(data));
      var invoices = new Array();

      $.ajax({
          method: "POST",
          url: '?action=search',
          data: { data : clone },
      }).done(function(res){

        var pagination = {
          TotalPages : res.TotalPages,
          TotalRows : res.TotalRows
        }

        if(res && res.Data && res.Data.length > 0){
          var invoice = res.Data;
          each(invoice, function (key, registro, index){
            var acube = new invoice_acube();
            var item = invoice[key];
            acube.convertToACUBEFormat(item.supplier, item.customer, item.invoice_rows, item.dati_generali, item.dati_fatture_collegate, item.riepilogo, item.altri_dati);
            invoices.push(acube);
          });

        }

        if(callback){
            callback(invoices, pagination);
        }
      }).fail(function(xhr, status, error) {
        DefaultErrorHandler(xhr, status, error);
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  all_pendingInvoice.prototype.loadElements = function(filtro, callback){
    try {
      var self = this;

      if(!clone)
        throw new TypeError("all_fattureAttive - loadElements : clone undefined!");

      if(!callback)
        throw new TypeError("all_fattureAttive - loadElements : callback undefined!");

      var elements = new Array();

      if(self.rootKanbanList.find('.ms-list-header__right').is(':empty')){
        self.rootKanbanList.find('.ms-list-header__right').html('<div class="tm-pagination"><span class="paginationTitle" style=" margin-right: 20px;"></span><i class="fas fa-arrow-left left"></i><i class="fas fa-arrow-right right"></i></div>');
      }

      this.Search(pInv_filter, function(invoices, pagination){
        var data = invoices;

        if(pInv_filter.Pagination){
            pInv_filter.Pagination.TotalPages = pagination.TotalPages;
        }

        if(pInv_filter.Pagination){
            pInv_filter.Pagination.TotalRows = pagination.TotalRows;
        }

        if(data && data.length > 0){
          self.rootKanbanList.find('.secTitle').html("In attesa di notifica (" + pInv_filter.Pagination.TotalRows + ")");

          var pager_title = pInv_filter.Pagination.CurrentPage + " - " + pInv_filter.Pagination.TotalPages;
          self.rootKanbanList.find('.paginationTitle').html(pager_title);
          for (var i = 0; i < data.length; i++) {
            row = new ftAttRow_ui();
            row.item = data[i];
            row.setStructure();
            elements.push(row);
          }

        }else{
          self.rootKanbanList.find('.secTitle').html("In attesa di notifica (0)");
        }

        callback(elements);
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  all_pendingInvoice.prototype.Search = function(filtro, callback){
    try {
      var self = this;
      var data = { Filtro : filtro };
      var clone = encodeURIComponent(JSON.stringify(data));
      var invoices = new Array();

      $.ajax({
          method: "POST",
          url: '?action=pendingInvoices',
          data: { data : clone },
      }).done(function(res){

        var pagination = {
          TotalPages : res.TotalPages,
          TotalRows : res.TotalRows
        }

        if(res && res.Data && res.Data.length > 0){
          var ftAttive = res.Data;
          each(ftAttive, function (key, registro, index){
              ftAttive[key] = $.extend(new fatture_attive(), ftAttive[key]);
              ftAttive[key].Linking();
              invoices.push(ftAttive[key]);
          });

        }

        if(callback){
            callback(invoices, pagination);
        }
      }).fail(function(xhr, status, error) {
        DefaultErrorHandler(xhr, status, error);
      });
    } catch (e) {
      console.log(e.message);
    }
  }

  DraftFilter.prototype.init = function(){
    try {
      var self = this;

      this.Customer = null;
      this.Societa = 0;
      this.TipoDoc = 0;
      this.Registrazione_From = null;
      this.Registrazione_To = null;
      this.Pagination = {
        TotalRows : 0,
        TotalPages : 0,
        CurrentPage : 1,
        LimitRows : 100
      };

    } catch (e) {
      console.log(e.message);
    }
  }

  DraftFilter.prototype.setListeners = function(){
    try {
      var self = this;
      var checked_icon = "radio_button_checked";
      var unchecked_icon = "radio_button_unchecked";
      var form_selector = this.root;
      var toggleBtn = this.root.find('.cl_filter_toggle-btn');
      var showEnterIcon = function(divEl){
        divEl.addClass('show-icon_enter-text');
        setTimeout(function(){
          divEl.removeClass('show-icon_enter-text');
        }, 300); // 5 seconds
      };

      this.root.find('.cl_filter-btn').click(function(){
        self.Pagination.CurrentPage = 1;
        self.setFilters();
        allDrafts_kanban.reload(function(){
          //allDrafts_manager.setInsUnder50();
        });
      });

      /**
       * PAGER
       */
      this.parentRoot.find('.ms-list-header__right .left').click(function(event){
        event.stopImmediatePropagation();
        if(self.Pagination.CurrentPage && self.Pagination.CurrentPage > 1 && self.Pagination.CurrentPage <= self.Pagination.TotalPages){
          self.Pagination.CurrentPage--;
          self.setFilters();
          allDrafts_kanban.reload(function(){
            //allDrafts_manager.setInsUnder50();
          });
        }
      });

      this.parentRoot.find('.ms-list-header__right .right').click(function(event){
        event.stopImmediatePropagation();
        if(self.Pagination.CurrentPage && self.Pagination.CurrentPage > 0 && self.Pagination.CurrentPage < self.Pagination.TotalPages){
          self.Pagination.CurrentPage++;
          self.setFilters();
          allDrafts_kanban.reload(function(){
            //allDrafts_manager.setInsUnder50();
          });
        }
      });

      toggleBtn.click(function(event){
        if(form_selector.find('.justify-content_flex-start').hasClass('toggleFields_hide')){
          toggleBtn.find('i').html('remove_circle');
          toggleBtn.find('div').html(' Riduci ');
        }else{
          toggleBtn.find('i').html('add_circle');
          toggleBtn.find('div').html(' Espandi ');
        }
        form_selector.find('.justify-content_flex-start').toggleClass('toggleFields_hide');
      });

      this.root.find('.filter_term').keyup(function(event){
        showEnterIcon(form_selector.find('.filter_term'));
      });

      this.root.find('.filter_term').keyup(
        debounce(function(e){
          e.preventDefault();
          if (e.keyCode === 13) {
            self.parentRoot.find('.kanban-items').empty();
            self.root.find('.cl_filter-btn').click();
          }
        },300)
      );

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

  DraftFilter.prototype.setFilters = function(){
    try {
      var self = this;

      this.Customer = this.root.find('input.filter_term').val();
      this.Societa = this.root.find('select.filter_societa').val();
      this.TipoDoc = this.root.find('select.filter_tipoDoc').val();
      this.Registrazione_From = this.root.find('input.filter_creazione_from').val();
      this.Registrazione_To = this.root.find('input.filter_creazione_to').val();

    } catch (e) {
      console.log(e.message);
    }
  }

  pendingInvoicesFilter.prototype.init = function(){
    try {
      var self = this;

      this.Customer = null;
      this.Keywords = null;
      this.Tipologia = -1;
      this.IdFiscaleIva = null;
      this.DataInizio = null;
      this.DataFine = null;
      this.Societa = 0;
      this.UUID = null;
      this.Pagination = {
        TotalRows : 0,
        TotalPages : 0,
        CurrentPage : 1,
        LimitRows : 100
      };
    } catch (e) {
      console.log(e.message);
    }
  }

  pendingInvoicesFilter.prototype.setListeners = function(){
    try {

      var self = this;

      /**
       * PAGER
       */
     this.parentRoot.find('.ms-list-header__right .left').click(function(event){
       event.stopImmediatePropagation();
       console.log("Cliccato!");
       if(self.Pagination.CurrentPage && self.Pagination.CurrentPage > 1 && self.Pagination.CurrentPage <= self.Pagination.TotalPages){
         self.Pagination.CurrentPage--;
         allPendingInvoices_kanban.reload(function(){
           //allFtAttive_manager.setInsUnder50();
         });
       }
     });

     this.parentRoot.find('.ms-list-header__right .right').click(function(event){
       event.stopImmediatePropagation();
       console.log("Cliccato!");
       if(self.Pagination.CurrentPage && self.Pagination.CurrentPage > 0 && self.Pagination.CurrentPage < self.Pagination.TotalPages){
         self.Pagination.CurrentPage++;
         allPendingInvoices_kanban.reload(function(){
           //allFtAttive_manager.setInsUnder50();
         });
       }
     });

    } catch (e) {
      console.log(e.message);
    }
  }

  draftRow_ui.prototype.init = function(){
    try {
      var self = this;

      this.listeners();
    } catch (e) {
      console.log(e.message);
    }
  }

  draftRow_ui.prototype.setStructure = function(){
    try {
      var self = this;

      if(!this.item || !(this.item instanceof invoice_acube))
        throw new TypeError('sec_clients.js - draftRow_ui - setStructure : this.item undefined');

      var item = this.item;
      var matrix = item.draftInvoices_row_matrix();

      var str = draftRow_struct.clone();
      str.find('.cl_nominativo span').html(matrix.customer_denominazione);
      str.find('.doc_supplier span').html(matrix.supplier_denominazione);
      str.find('.doc_total span').html(matrix.total);
      str.find('.doc_type span').html(matrix.tipo_documento);
      str.find('.doc_data_registrazione span').html(matrix.data_registrazione);

      this.structure = str;

    } catch (e) {
      console.log(e.message);
    }
  }

  draftRow_ui.prototype.listeners = function(){
    try {
      var self = this;

      if(!this.root)
        throw new TypeError('draftRow_ui - listeners : this.root undefined!');

      if(!this.item || !(this.item instanceof invoice_acube))
        throw new TypeError('draftRow_ui - listeners : this.item undefined!');

      var root = this.root;
      var item = this.item;
      var altri_dati = item.altri_dati;


      root.find('.kb-row-v2_btn_select').click(function(event){
        var toggleVal = root.find('.kb-row-v2_btn_select i').html();
        switch (toggleVal) {
          case 'radio_button_unchecked':
            self.addDraft();
            break;
          case 'radio_button_checked':
            self.removeDraft();
            break;
        }
      });

      root.find('.cl_nominativo').click(function(event){
        var win = window.open(URL_HOST + '_gestione/tenants.php?Id=' + altri_dati.id_customer, "_blank");
      });

      root.find('.doc_type').click(function(event){
        var win = window.open(URL_HOST + '_gestione/invoicing.php?action=load&idFattura=' + altri_dati.id_invoice, "_blank");
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  draftRow_ui.prototype.addDraft = function(){
    try {
      var self = this;

      if(!items)
        throw new TypeError('draftRow_ui - addDraft : items undefined');

      if(!this.item)
        throw new TypeError('draftRow_ui - addDraft : this.item undefined');

      if(!acubePanel)
        throw new TypeError('draftRow_ui - addDraft : acubePanel undefined.');

      var item = this.item;
      var root = this.root;
      var toggleVal = root.find('.kb-row-v2_btn_select i').html('radio_button_checked');

      items.push(this);

      acubePanel.root.find('div.cl_acube-panel_send-invoices span').html('Trasmetti (' + items.length + ')');

    } catch (e) {
      console.log(e.message);
    }
  }

  draftRow_ui.prototype.removeDraft = function(){
    try {
      var self = this;

      if(!items)
        throw new TypeError('draftRow_ui - removeDraft : items undefined');

      if(!this.item)
        throw new TypeError('draftRow_ui - removeDraft : this.item undefined');

      if(!acubePanel)
        throw new TypeError('draftRow_ui - removeDraft : acubePanel undefined.');

      var item = this.item;
      var root = this.root;
      var toggleVal = root.find('.kb-row-v2_btn_select i').html('radio_button_unchecked');

      for (var i = 0; i < items.length; i++) {
        if(items[i].index === this.index){
          items.splice(i, 1);
        }
      }

      acubePanel.root.find('div.cl_acube-panel_send-invoices span').html('Trasmetti (' + items.length + ')');

    } catch (e) {
      console.log(e.message);
    }
  }

  draftRow_ui.prototype.removeFromDOM = function(){
    try {
      var self = this;

      if(!this.root)
        throw new TypeError('draftRow_ui - removeFromDOM : this.root undefined!');

      this.root.remove();
    } catch (e) {
      console.log(e.message);
    }
  }

  draftRow_ui.prototype.showErrors = function(errors){
    try {
      var self = this;

      if(!errors || !(errors.length > 0))
        throw new TypeError('draftRow_ui - showErrors : errors undefined');

      var row_root = this.root;
      var btm_sec = row_root.find('.kb-row-v2_bottom');
      btm_sec.empty();
      btm_sec.addClass('draft_btm_sec');
      var error_row_struct = $('<div class="draft_btm_sec_row"><div class="kb-row-v2_info error_flag"><i class="material-icons">error</i><span></span></div></div>');

      for (var i = 0; i < errors.length; i++) {
        var error = errors[i];
        var error_row_struct_clone = error_row_struct.clone();
        error_row_struct_clone.find('span').append(error);
        btm_sec.append(error_row_struct_clone);
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  AcubePanel.prototype.init = function(){
    try {
      var self = this;

      this.setListeners();
    } catch (e) {
      console.log();
    }
  }

  AcubePanel.prototype.setListeners = function(){
    try {

      if(!this.root)
        throw new TypeError('AcubePanel - setListeners : this.root undefined');

      var self = this;
      var toggleOff = "toggle_off";
      var toggleOn = "toggle_on";
      var panel = this.root;

      panel.find('.cl_acube-panel_send-invoices').click(function(){
        var sendBtn = $(this);
        var btnStatus = sendBtn.attr('btnStatus');

        if(btnStatus === 'active'){
          if(items.length > 0){
            sendBtn.attr('btnStatus', 'disabled');
            bootbox.confirm("Siete sicuri di voler trasmettere " + items.length + " documenti?", function(choice){
              if(choice){
                sendBtn.find('span').html('Invio in corso...');
                self.sendDrafts(function(){
                  console.log("finished");
                  sendBtn.attr('btnStatus', 'active');
                });
              }
            });
          }else{
            bootbox.alert('Nessuna bozza presente. Selezionare e riprovare.');
          }
        }


      });

      panel.find('.acube-panel_toggle-btn').click(function(){
        var toggleVal = $(this).find('i').html();
        switch (toggleVal) {
          case 'toggle_off':
            self.selectAll();
            break;
          case 'toggle_on':
            self.removeAll();
            break;
        }
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  AcubePanel.prototype.selectAll = function(){
    try {

      if(!allDrafts_manager)
        throw new TypeError('AcubePanel - selectAll : allDrafts_manager undefined.');

      var panel = this.root;
      var toggle = panel.find('.acube-panel_toggle-btn i');
      var text = panel.find('.acube-panel_toggle-btn div');

      toggle.html('toggle_on').css('color', '#1e5c86');
      text.html('Deseleziona tutti');

      var draftRootList = allDrafts_manager.rootKanbanList.find('div.kanban-items div.kb-row-v2');

      draftRootList.each(function(index){
        var toggleVal = $(this).find('.kb-row-v2_btn_select i').html();
        if(toggleVal === "radio_button_unchecked"){
          $(this).find('.kb-row-v2_btn_select').click();
        }
      });

      console.log(items);

    } catch (e) {
      console.log(e.message);
    }
  }

  AcubePanel.prototype.removeAll = function(){
    try {
      if(!allDrafts_manager)
        throw new TypeError('AcubePanel - selectAll : allDrafts_manager undefined.');

      var panel = this.root;
      var toggle = panel.find('.acube-panel_toggle-btn i');
      var text = panel.find('.acube-panel_toggle-btn div');

      toggle.html('toggle_off').css('color', '#ff5600');
      text.html('Seleziona tutti');

      var draftRootList = allDrafts_manager.rootKanbanList.find('div.kanban-items div.kb-row-v2');

      draftRootList.each(function(index){
        var toggleVal = $(this).find('.kb-row-v2_btn_select i').html();
        if(toggleVal === "radio_button_checked"){
          $(this).find('.kb-row-v2_btn_select').click();
        }
      });

      console.log(items);

    } catch (e) {
      console.log(e.message);
    }
  }

  AcubePanel.prototype.sendDrafts = function(callback){
    try {
      var self = this;

      if(!items || !(items.length > 0))
        throw new TypeError('AcubePanel - sendDrafts : items error.');

      if(!callback)
        throw new TypeError('AcubePanel - sendDrafts : callback undefined.');

      var correctlySent = 0;
      var sent = 0;
      var totDrafts = items.length;

      function missingErrors(){
        var totErrors = totDrafts - correctlySent;

        if(sent === totDrafts){

          if(correctlySent === totDrafts){
            bootbox.alert("Tutti i documenti sono stati trasmessi con successo all'intermediario.");
          }else{
            bootbox.alert("Trasmissione completata. Si prega di correggere gli errori riportati.");
          }

          callback();

        }
      }

      var acube = new invoice_acube();
      acube.getJWToken(function(token){
        if(token){
          items.forEach(function(el){
            console.log(el);
            var send = new Promise(function(resolve, reject){
              if(!el.item)
                reject("Errore durante la trasmissione : Bozza non presente.", el);

              var invoice = el.item;

              invoice.sendInvoiceToACUBE(token, function(result, smsError){
                if(result){
                  resolve(el);
                }else{
                  var draft_params = {
                    smsError : smsError,
                    el : el
                  };
                  reject(draft_params);
                }
              });

            });

            send.then(function(draft){
              sent++;
              correctlySent++;
              draft.removeDraft();
              draft.removeFromDOM();
              missingErrors();
            }, function(params){
              sent++;
              var errors = params.smsError;
              var draft = params.el;
              if(errors && errors.length > 0 && draft){
                draft.showErrors(errors);
              }
              missingErrors();
            })
          });
        }else{
          bootbox.alert('Attenzione: Problema di autenticazione con Acube. Richiedere assistenza tecnica!');
        }
      });

    } catch (e) {
      console.log(e.message);
    }
  }

})();
