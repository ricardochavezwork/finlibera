function sec_notification(invoiceApp_ui, sectionNumber){
  this.invoiceApp_ui = invoiceApp_ui;
  this.sectionNumber = sectionNumber;
}

(function(){

  function all_notifs(rootKanbanList, invoiceApp_ui){
    this.rootKanbanList = rootKanbanList;
    this.invoiceApp_ui = invoiceApp_ui;
  }

  function notifFilter(Pagination){
    this.Pagination = Pagination;
  }

  function notifRow_ui(item, index, root, structure){
    this.item = item;
    this.index = index;
    this.root = root;
    this.structure = structure;
  }

  var notifRow_struct = $('<div class="kb-row-v2"><div class="kb-row-v2_top"><div class="kb-row-v2_top__sub-left"><div class="kb-row-v2_left"><div class="kb-row-v2_col"><div class="kb-row-v2_info notif_type"><strong>Tipo Notifica : </strong><span></span></div><div class="kb-row-v2_info notif_uuid"><strong>UUID - Notifica : </strong><span class="consolas-format"></span></div><div class="kb-row-v2_info notif_invoice_uuid"><strong>UUID - Fattura : </strong><span class="consolas-format"></span></div></div><div class="kb-row-v2_col"><div class="kb-row-v2_info notif_created_at"><strong>Data di creazione : </strong><span></span></div><div class="kb-row-v2_info notif_data_registrazione"><strong>Data di registrazione : </strong><span></span></div></div></div><div class="kb-row-v2_right"><div class="kb-row-v2_col notif_toggle" style=" cursor: pointer;"><i class="material-icons" style="font-size: 35px;text-align: center;">expand_more</i></div></div></div><div class="kb-row-v2_top__sub-right"></div></div><div class="kb-row-v2_bottom"></div></div>');

  var ftAttRow_struct = $('<div class="kb-row-v2 notif_invoice" style="width: 95%;margin-bottom: 7px;"><div class="kb-row-v2_top"><div class="kb-row-v2_top__sub-left"><div class="kb-row-v2_btn_select" style=" display: none;"><i class="material-icons">radio_button_unchecked</i></div><div class="kb-row-v2_left"><div class="kb-row-v2_col"><div class="kb-row-v2_info doc_numero" title="Apri fattura"><i class="material-icons">receipt</i><span></span></div><div class="kb-row-v2_info customer_denominazione" title="Apri cliente"><i class="material-icons">person</i><span></span></div><div class="kb-row-v2_info cursor_default doc_societa"><i class="material-icons">business</i><span></span></div></div><div class="kb-row-v2_col"><div class="kb-row-v2_info cursor_default doc_data"><i class="material-icons">calendar_today</i><span></span></div><div class="kb-row-v2_info cursor_default customer_idFiscaleIva"><i class="material-icons">list_alt</i><span></span></div><div class="kb-row-v2_info doc_allegati" style=" color: #d4d4d4;"><i class="material-icons">cloud_download</i><span>Non disponibile</span></div></div><div class="kb-row-v2_col"><div class="kb-row-v2_info cursor_default doc_total"><i class="material-icons">euro_symbol</i><span></span></div><div class="kb-row-v2_info cursor_default doc_type"><i class="material-icons">title</i><span></span></div><div class="kb-row-v2_info cursor_default doc_uuid"><strong>UUID : </strong><span class="consolas-format"></span></div></div></div><div class="kb-row-v2_right" style="display: none;"><div class="kb-row-v2_col" style=" cursor: pointer;"><i class="material-icons" style="font-size: 35px;text-align: center;">expand_more</i></div><div class="kb-row-v2_col" style=" cursor: pointer;"><i class="material-icons" style="font-size: 35px;text-align: center;">offline_bolt</i></div></div></div><div class="kb-row-v2_top__sub-right"><div class="kb-row-v2_info i_newContract" style=" padding: 0px 20px; color: #00a9fa;"><i class="material-icons">note_add</i><span>Nuovo Contratto</span></div></div></div><div class="kb-row-v2_bottom"></div></div>');

  var clone = null;
  var items = new Array();
  var filter = new notifFilter();
  var allNotifs_manager = new all_notifs();
  var allNotifs_kanban = new kanban_list();

  sec_notification.prototype.init = function(){
    try {
      var self = this;

      if(!this.invoiceApp_ui)
        throw new TypeError('sec_notification - init : this.invoiceApp_ui undefined!');

      this.invoiceApp_ui.setActiveStatusSectionByNumber(this.sectionNumber);

      clone = self;

      var rootKanbanLists = this.invoiceApp_ui.rootKanbanLists;
      rootKanbanLists.empty();

      $('.ms-scrollable-layout').css('background-color', '#F2F6FA');

      filter.init();

      allNotifs_manager.invoiceApp_ui = this.invoiceApp_ui;

      allNotifs_kanban.parentRoot = rootKanbanLists;
      allNotifs_kanban.secTitle = "Notifiche";
      allNotifs_kanban.itemsManager = allNotifs_manager;
      allNotifs_kanban.init(function(){
        filter.parentRoot = allNotifs_kanban.root;
        filter.setListeners();
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  all_notifs.prototype.loadElements = function(filtro, callback){
    try {
      var self = this;

      if(!clone)
        throw new TypeError('all_notifs - loadElements : clone undefined!');

      if(!callback)
        throw new TypeError('all_notifs - loadElements : callback undefined!');

      var elements = new Array();

      if(self.rootKanbanList.find('.ms-list-header__right').is(':empty')){
        self.rootKanbanList.find('.ms-list-header__right').html('<div class="tm-pagination"><span class="paginationTitle" style=" margin-right: 20px;"></span><i class="fas fa-arrow-left left"></i><i class="fas fa-arrow-right right"></i></div>');
      }

      this.Search(filter, function(notifs, pagination){
        var data = notifs;

        if(filter.Pagination){
            filter.Pagination.TotalPages = pagination.TotalPages;
        }

        if(filter.Pagination){
            filter.Pagination.TotalRows = pagination.TotalRows;
        }

        if(data && data.length > 0){
          self.rootKanbanList.find('.secTitle').html("Notifiche (" + filter.Pagination.TotalRows + ")");

          var pager_title = filter.Pagination.CurrentPage + " - " + filter.Pagination.TotalPages;
          self.rootKanbanList.find('.paginationTitle').html(pager_title);
          for (var i = 0; i < data.length; i++) {
            row = new notifRow_ui();
            row.item = data[i];
            row.setStructure();
            elements.push(row);
          }

        }else{
          self.rootKanbanList.find('.secTitle').html("Notifiche (0)");
        }

        callback(elements);
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  all_notifs.prototype.Search = function(filtro, callback){
    try {
      var self = this;
      var data = { filtro : filtro };
      var clone = encodeURIComponent(JSON.stringify(data));

      $.ajax({
          method: "POST",
          url: '?action=notifications',
          data: { data : clone },
      }).done(function(res){

        var pagination = {
          TotalPages : res.TotalPages,
          TotalRows : res.TotalRows
        }

        if(res && res.Data && res.Data.length > 0){
          var notif_data = res.Data;
          each(notif_data, function (key, registro, index){
            notif_data[key] = $.extend(new FE_CustomerNotification(), notif_data[key]);
          });

        }

        if(callback){
            callback(notif_data, pagination);
        }
      }).fail(function(xhr, status, error) {
        DefaultErrorHandler(xhr, status, error);
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  notifFilter.prototype.init = function(){
    try {
      var self = this;

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

  notifFilter.prototype.setListeners = function(){
    try {
      var self = this;

      /**
       * PAGER
       */
      this.parentRoot.find('.ms-list-header__right .left').click(function(event){
        event.stopImmediatePropagation();
        if(self.Pagination.CurrentPage && self.Pagination.CurrentPage > 1 && self.Pagination.CurrentPage <= self.Pagination.TotalPages){
          self.Pagination.CurrentPage--;
          self.setFilters();
          allNotifs_kanban.reload(function(){
            //allNotifs_manager.setInsUnder50();
          });
        }
      });

      this.parentRoot.find('.ms-list-header__right .right').click(function(event){
        event.stopImmediatePropagation();
        if(self.Pagination.CurrentPage && self.Pagination.CurrentPage > 0 && self.Pagination.CurrentPage < self.Pagination.TotalPages){
          self.Pagination.CurrentPage++;
          self.setFilters();
          allNotifs_kanban.reload(function(){
            //allNotifs_manager.setInsUnder50();
          });
        }
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  notifFilter.prototype.setFilters = function(){
    try {
      var self = this;

      //Work in progress
    } catch (e) {
      console.log(e.message);
    }
  }

  notifRow_ui.prototype.init = function(){
    try {
      var self = this;

      this.listeners();
    } catch (e) {
      console.log(e.message);
    }
  }

  notifRow_ui.prototype.setStructure = function(){
    try {
      var self = this;

      if(!this.item || !(this.item instanceof FE_CustomerNotification))
        throw new TypeError('notifications.js - notifRow_ui - setStructure : this.item undefined');

      var item = this.item;
      var matrix = item.notif_row_matrix();

      var str = notifRow_struct.clone();
      str.find('.notif_type span').html(matrix.type);
      str.find('.notif_sms span').html(matrix.sms);
      str.find('.notif_uuid span').html(matrix.uuid);
      str.find('.notif_invoice_uuid span').html(matrix.invoice_uuid);
      str.find('.notif_created_at span').html(matrix.created_at);
      str.find('.notif_data_registrazione span').html(matrix.data_registrazione);

      this.structure = str;

    } catch (e) {
      console.log(e.message);
    }
  }

  notifRow_ui.prototype.listeners = function(){
    try {
      var self = this;

      if(!this.root)
        throw new TypeError('notifRow_ui - listeners : this.root undefined!');

      if(!this.item || !(this.item instanceof FE_CustomerNotification))
        throw new TypeError('notifRow_ui - listeners : this.item undefined!');

      var root = this.root;
      var item = this.item;

      root.find(".kb-row-v2_right .kb-row-v2_col.notif_toggle i").click(function(event){
        if(!root.find('.kb-row-v2_bottom').hasClass('toggleNotifs')){
          root.find('.kb-row-v2_bottom').toggleClass('toggleNotifs');
          root.find('.kb-row-v2_bottom').empty();
          root.find('div.kb-row-v2_col.notif_toggle .material-icons').html('expand_less');
          var acube = new invoice_acube();
          acube.getNotification(item.Notification_UUID, function(notification){
            if(notification){
              var uuid_invoice = notification.invoice_uuid;
              acube.getInvoice(uuid_invoice, function(res_invoice){
                if(res_invoice){
                  var uuid = res_invoice.uuid;
                  var invoice = $.extend(new invoice_acube(), JSON.parse(res_invoice.payload));
                  self.LoadInvoiceOnDOM(invoice, uuid);
                  self.LoadNotifOnDOM(notification);
                }else{
                  bootbox.alert("Errore durante il caricamento della fattura. Richiedere supporto!");
                }
              });
            }else {
              bootbox.alert("Errore durante il caricamento della notifica. Richiedere supporto!");
            }
          });
        }else{
          root.find('.kb-row-v2_bottom').toggleClass('toggleNotifs');
          root.find('div.kb-row-v2_col.notif_toggle .material-icons').html('expand_more');
        }
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  notifRow_ui.prototype.LoadInvoiceOnDOM = function(invoice, uuid){
    try {
      var self = this;

      if(!this.root)
        throw new TypeError('notifRow_ui - LoadInvoiceOnDOM : this.root undefined!');

      if(!invoice)
        throw new TypeError('notifRow_ui - LoadInvoiceOnDOM : invoice undefined.');

      var root = this.root;
      var item = this.item;
      var btm_sec = root.find('.kb-row-v2_bottom');
      var altri_dati = invoice.altri_dati;

      var matrix = invoice.draftInvoices_row_matrix();
      var str = ftAttRow_struct.clone();
      str.find('.doc_numero span').html(matrix.numero);
      str.find('.doc_data span').html(matrix.data);
      str.find('.doc_total span').html(matrix.total);
      str.find('.customer_denominazione span').html(matrix.customer_denominazione);
      str.find('.customer_idFiscaleIva span').html(matrix.cf);
      str.find('.doc_type span').html(matrix.tipoDoc);
      str.find('.doc_uuid span').html(uuid);
      str.find('.doc_societa span').html("FINLIBERA SPA");

      btm_sec.append(str);

      var root_invoice = btm_sec.find('.kb-row-v2.notif_invoice');

      root_invoice.find('.doc_numero').click(function(event){
        var win = window.open(URL_HOST + '_gestione/invoicing.php?action=load&idFattura=' + altri_dati.id_invoice, "_blank");
      });

      root_invoice.find('.customer_denominazione').click(function(event){
        var win = window.open(URL_HOST + '_gestione/tenants.php?Id=' + altri_dati.id_customer, "_blank");
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  notifRow_ui.prototype.LoadNotifOnDOM = function(notif){
    try {
      var self = this;

      if(!notif)
        throw new TypeError('notifRow_ui - LoadNotifOnDOM : notif undefined');

      if(!notif.message)
        throw new TypeError('notifRow_ui - LoadNotifOnDOM : notif.message undefined!');

      if(!this.root)
        throw new TypeError('notifRow_ui - LoadNotifOnDOM : this.root undefined!');

      var error_row_struct = $('<div class="notif_btm_sec_row"><div class="kb-row-v2_col"><div class="kb-row-v2_info notif_error-type"><strong>Codice di errore : </strong><span></span></div><div class="kb-row-v2_info notif_descr"><strong>Descrizione : </strong><span></span></div></div><div class="kb-row-v2_col"><div class="kb-row-v2_info notif_sugg"><strong>Suggerimento : </strong><span></span></div></div></div>');
      var succ_row_struct = $('<div class="notif_btm_sec_row"><div class="kb-row-v2_info succ_flag"><i class="material-icons">check_box</i><span></span></div></div>');

      var root = this.root;
      var item = this.item;
      var message = notif.message;
      var btm_sec = root.find('.kb-row-v2_bottom');
      var rows = new Array();

      if(message.descrizione){
        var row_desc = succ_row_struct.clone()
        row_desc.find('.kb-row-v2_info span').append(message.descrizione);
        rows.push(row_desc);
      }

      if(message.lista_errori && message.lista_errori.Errore && !Array.isArray(message.lista_errori.Errore)){
        var errore = message.lista_errori.Errore;
        var error_row = error_row_struct.clone();
        error_row.find('.kb-row-v2_info.notif_descr span').append(errore.Descrizione);
        error_row.find('.kb-row-v2_info.notif_error-type span').append(errore.Codice);
        error_row.find('.kb-row-v2_info.notif_sugg span').append(errore.Suggerimento);
        rows.push(error_row);
      }

      if(message.lista_errori && message.lista_errori.Errore && message.lista_errori.Errore.length > 0){
        var errori = message.lista_errori.Errore;
        for (var i = 0; i < errori.length; i++) {
          var errore = errori[i];
          var error_row = error_row_struct.clone();
          error_row.find('.kb-row-v2_info.notif_descr span').append(errore.Descrizione);
          error_row.find('.kb-row-v2_info.notif_error-type span').append(errore.Codice);
          error_row.find('.kb-row-v2_info.notif_sugg span').append(errore.Suggerimento);
          rows.push(error_row);
        }
      }

      console.log(notif);
      console.log(rows);

      if(rows.length > 0){
        for (var x = 0; x < rows.length; x++) {
          var row = rows[x];
          btm_sec.append(row);
        }
      }

    } catch (e) {
      console.log(e.message);
    }
  }

})();
