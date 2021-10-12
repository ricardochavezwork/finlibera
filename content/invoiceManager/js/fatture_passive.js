function sec_fatturePassive(invoiceApp_ui, sectionNumber){
  this.invoiceApp_ui = invoiceApp_ui;
  this.sectionNumber = sectionNumber;
}

function docServizio(floatingPanel, row, doc){
  this.floatingPanel = floatingPanel;
  this.row = row;
  this.doc;
}

(function(){

  function all_fatturePassive(rootKanbanList, invoiceApp_ui){
    this.rootKanbanList = rootKanbanList;
    this.invoiceApp_ui = invoiceApp_ui;
  }

  function ftPassiveFilter(Supplier, IdFiscaleIva, DataInizio, DataFine, Societa, UUID, Pagination){
    this.Supplier = Supplier;
    this.IdFiscaleIva = IdFiscaleIva;
    this.DataInizio = DataInizio;
    this.DataFine = DataFine;
    this.Societa = Societa;
    this.UUID = UUID;
    this.Pagination = Pagination;
  }

  function ftPassRow_ui(item, index, root, structure){
    this.item = item;
    this.index = index;
    this.root = root;
    this.structure = structure;
  }

  var clone = null;
  var items = new Array();
  var filter = new ftPassiveFilter();
  var allFtPassive_manager = new all_fatturePassive();
  var allFtPassive_kanban = new kanban_list();

  var ftPassRow_struct = $('<div class="kb-row-v2"><div class="kb-row-v2_top"><div class="kb-row-v2_top__sub-left"><div class="kb-row-v2_btn_select" style=" display: none;"><i class="material-icons">radio_button_unchecked</i></div><div class="kb-row-v2_left"><div class="kb-row-v2_col"><div class="kb-row-v2_info doc_numero" title="Scarica versione PDF"><i class="material-icons">receipt</i><span></span></div><div class="kb-row-v2_info cursor_default supplier_denominazione"><i class="material-icons">domain</i><span></span></div><div class="kb-row-v2_info cursor_default doc_societa"><i class="material-icons">business</i><span></span></div></div><div class="kb-row-v2_col"><div class="kb-row-v2_info cursor_default doc_data"><i class="material-icons">calendar_today</i><span></span></div><div class="kb-row-v2_info cursor_default supplier_idFiscaleIva"><i class="material-icons">list_alt</i><span></span></div><div class="kb-row-v2_info doc_allegati" title="Scarica Allegati"><i class="material-icons">cloud_download</i><span></span></div></div><div class="kb-row-v2_col"><div class="kb-row-v2_info cursor_default doc_total"><i class="material-icons">euro_symbol</i><span></span></div><div class="kb-row-v2_info cursor_default doc_type"><i class="material-icons">title</i><span></span></div><div class="kb-row-v2_info cursor_default doc_uuid"><strong>UUID : </strong><span class="consolas-format"></span></div></div></div><div class="kb-row-v2_right" ><div class="kb-row-v2_col btnActions-toggle" style=" cursor: pointer;"><i class="material-icons" style="font-size: 35px;text-align: center;">expand_more</i></div><div class="kb-row-v2_col" style=" cursor: pointer; display : none;"><i class="material-icons" style="font-size: 35px;text-align: center;">offline_bolt</i></div></div></div><div class="kb-row-v2_top__sub-right"><div class="kb-row-v2_info i_newContract" style=" padding: 0px 20px; color: #00a9fa;"><i class="material-icons">note_add</i><span>Nuovo Contratto</span></div></div></div><div class="kb-row-v2_bottom bottom-panel__btn-actions bottom-panel__toggle"></div></div>');

  var sv_struct = $('<div class="services_item"><div class="services_item-row"><div class="services_item-row_column sv_amount"><div class="services_item-row_column-content"></div><div class="services_item-row_column-title">Importo</div></div><div class="services_item-row_column sv_date"><div class="services_item-row_column-content"></div><div class="services_item-row_column-title">Data</div></div></div><div class="services_item-row"><div class="services_item-row_column sv_descr"><div class="services_item-row_column-content"></div><div class="services_item-row_column-title">Descrizione</div></div></div><div class="services_item-row"><div class="services_item-row_column period_from"><div class="services_item-row_column-content"></div><div class="services_item-row_column-title">Inizio</div></div><div class="services_item-row_column period_to"><div class="services_item-row_column-content"></div><div class="services_item-row_column-title">Fine</div></div></div><div class="services_item-row"><div class="services_item-row_column sv_number"><div class="services_item-row_column-content"></div><div class="services_item-row_column-title">Numero</div></div></div><div class="services_item-row"><div class="services_item-row_column sv_tags"><div class="services_item-row_column-content"></div><div class="services_item-row_column-title">Tags</div></div></div><div class="services_item-row"><div class="services_item-row_column sv_apts"><div class="services_item-row_column-content"></div><div class="services_item-row_column-title">Appartamento</div></div></div><div class="services_item-row"><div class="services_item-row_column sv_rooms"><div class="services_item-row_column-content"></div><div class="services_item-row_column-title">Stanza</div></div></div><div class="services_item-row"><div class="services_item-row_column sv_ins"><div class="services_item-row_column-content"></div><div class="services_item-row_column-title">Inquilino</div></div></div></div>');

  var btm_panel_btns_struct = $('<div class="btn-actions__btn"><div class="btn-actions__btn-body"><i class="material-icons"></i><span class="btn_title"></span><span class="btn_counter"></span></div></div>');

  sec_fatturePassive.prototype.init = function(){
    try {
      var self = this;

      if(!this.invoiceApp_ui)
        throw new TypeError('sec_fatturePassive - init : this.invoiceApp_ui undefined!');

      this.invoiceApp_ui.setActiveStatusSectionByNumber(this.sectionNumber);

      clone = self;

      var rootKanbanLists = this.invoiceApp_ui.rootKanbanLists;
      rootKanbanLists.empty();

      var filter_struct = $('<div class="cl_filter"><div class="cl_filter_left-panel"><div class="cl_filter_left-row" style=" justify-content: space-between;"><div class="cl_filter_left-row_input-text"><span class="material-icons">search</span><input class="filter_supplier" placeholder="Ricerca per fornitore..."></div><div class="cl_filter_left-row_input-text"><span class="material-icons">search</span><input class="filter_uuid" placeholder="Ricerca per UUID..."></div><div class="cl_filter_left-row_input-text"><span class="material-icons">search</span><input class="filter_idFiscaleIva" placeholder="Ricerca per P.IVA o CF..."></div></div><div class="cl_filter_left-row"><span class="cl_filter_toggle-btn"><i class="material-icons">add_circle</i><div> Espandi </div></span></div><div class="cl_filter_left-row toggleFields toggleFields_hide" style=" justify-content: space-around;"><div class="cl_filter_left-row_period"><div class="cl_filter_left-row_period-top"><span>Data Fattura</span></div><div class="cl_filter_left-row_period-bottom"><input class="filter_date_from" type="date"><input class="filter_date_to" type="date"></div></div><div class="cl_filter_left-row_select"><span>Societa</span><select class="filter_societa"> <option value="0" selected="selected">Finlibera</option> <option value="1">Ecolibera</option> </select></div></div></div><div class="cl_filter_right-panel"><div class="cl_filter-btn"><i></i><span>Ricerca</span></div></div></div>');

      $('.ms-scrollable-layout').css('background-color', '#F2F6FA');
      rootKanbanLists.append(filter_struct);

      filter.root = rootKanbanLists.find('.cl_filter');
      filter.parentRoot = rootKanbanLists;
      filter.init();

      allFtPassive_manager.invoiceApp_ui = this.invoiceApp_ui;

      allFtPassive_kanban.parentRoot = rootKanbanLists;
      allFtPassive_kanban.secTitle = "Fatture";
      allFtPassive_kanban.itemsManager = allFtPassive_manager;
      allFtPassive_kanban.init(function(){
        filter.setListeners();
        allFtPassive_manager.setBtmPanelUnder();
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  all_fatturePassive.prototype.loadElements = function(filtro, callback){
    try {
      var self = this;

      if(!clone)
        throw new TypeError("all_fatturePassive - loadElements : clone undefined!");

      if(!callback)
        throw new TypeError("all_fatturePassive - loadElements : callback undefined!");

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
          self.rootKanbanList.find('.secTitle').html("Fatture (" + filter.Pagination.TotalRows + ")");

          var pager_title = filter.Pagination.CurrentPage + " - " + filter.Pagination.TotalPages;
          self.rootKanbanList.find('.paginationTitle').html(pager_title);
          for (var i = 0; i < data.length; i++) {
            row = new ftPassRow_ui();
            row.item = data[i];
            row.setStructure();
            elements.push(row);
          }

        }else{
          self.rootKanbanList.find('.secTitle').html("Fatture (0)");
        }

        callback(elements);
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  all_fatturePassive.prototype.Search = function(filtro, callback){
    try {
      var self = this;
      var data = { Filtro : filtro };
      var clone = encodeURIComponent(JSON.stringify(data));
      var invoices = new Array();

      $.ajax({
          method: "POST",
          url: '?action=fatturePassive',
          data: { data : clone },
      }).done(function(res){

        var pagination = {
          TotalPages : res.TotalPages,
          TotalRows : res.TotalRows
        }

        if(res && res.Data && res.Data.length > 0){
          var ftPassive = res.Data;
          each(ftPassive, function (key, registro, index){
              ftPassive[key] = $.extend(new fatture_passive(), ftPassive[key]);
              ftPassive[key].Linking();
              invoices.push(ftPassive[key]);
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

  all_fatturePassive.prototype.setBtmPanelUnder = function(){
    try {
      var self = this;

      if(!allFtPassive_kanban && !allFtPassive_kanban.root)
        throw new TypeError('all_fatturePassive - setBtmPanelUnder : allFtPassive_kanban.root undefined');

      var els = allFtPassive_kanban.root.find('div.kanban-items.ms-hack-scrollbar div.kb-row-v2 .btnActions-toggle i').click();

    } catch (e) {
      console.log(e.message);
    }
  }

  ftPassiveFilter.prototype.init = function(){
    try {
      var self = this;

      this.Supplier = null;
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

  ftPassiveFilter.prototype.setListeners = function(){
    try {
      var self = this;
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
        allFtPassive_kanban.reload(function(){
          allFtPassive_manager.setBtmPanelUnder();
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
         allFtPassive_kanban.reload(function(){
           allFtPassive_manager.setBtmPanelUnder();
         });
       }
     });

     this.parentRoot.find('.ms-list-header__right .right').click(function(event){
       event.stopImmediatePropagation();
       if(self.Pagination.CurrentPage && self.Pagination.CurrentPage > 0 && self.Pagination.CurrentPage < self.Pagination.TotalPages){
         self.Pagination.CurrentPage++;
         self.setFilters();
         allFtPassive_kanban.reload(function(){
           allFtPassive_manager.setBtmPanelUnder();
         });
       }
     });

     toggleBtn.click(function(event){
       if(form_selector.find('.toggleFields').hasClass('toggleFields_hide')){
         toggleBtn.find('i').html('remove_circle');
         toggleBtn.find('div').html(' Riduci ');
       }else{
         toggleBtn.find('i').html('add_circle');
         toggleBtn.find('div').html(' Espandi ');
       }
       form_selector.find('.toggleFields').toggleClass('toggleFields_hide');
     });

     this.root.find('.filter_supplier').keyup(function(event){
       showEnterIcon(form_selector.find('.filter_supplier'));
     });

     this.root.find('.filter_uuid').keyup(function(event){
       showEnterIcon(form_selector.find('.filter_uuid'));
     });

     this.root.find('.filter_idFiscaleIva').keyup(function(event){
       showEnterIcon(form_selector.find('.filter_idFiscaleIva'));
     });

     this.root.find('.filter_supplier').keyup(debounce(function(e) {
       e.preventDefault();
       if (e.keyCode === 13) {
         $('.kanban-items').empty();
         self.root.find('.cl_filter-btn').click();
       }
     },300));

     this.root.find('.filter_uuid').keyup(debounce(function(e) {
       e.preventDefault();
       if (e.keyCode === 13) {
         $('.kanban-items').empty();
         self.root.find('.cl_filter-btn').click();
       }
     },300));

     this.root.find('.filter_idFiscaleIva').keyup(debounce(function(e) {
       e.preventDefault();
       if (e.keyCode === 13) {
         $('.kanban-items').empty();
         self.root.find('.cl_filter-btn').click();
       }
     },300));

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

  ftPassiveFilter.prototype.setFilters = function(){
    try {
      var self = this;

      this.Supplier = this.root.find('input.filter_supplier').val();
      this.IdFiscaleIva = this.root.find('input.filter_idFiscaleIva').val();
      this.UUID = this.root.find('input.filter_uuid').val();
      this.DataInizio = this.root.find('input.filter_date_from').val();
      this.DataFine = this.root.find('input.filter_date_to').val();
      this.Societa = this.root.find('select.filter_societa').val();

    } catch (e) {
      console.log(e.message);
    }
  }

  ftPassRow_ui.prototype.init = function(){
    try {
      var self = this;

      this.listeners();
    } catch (e) {
      console.log(e.message);
    }
  }

  ftPassRow_ui.prototype.setStructure = function(){
    try {
      var self = this;

      if(!this.item || !(this.item instanceof fatture_passive))
        throw new TypeError('fatture_passive.js - ftPassRow_ui - setStructure : this.item undefined');

      var item = this.item;
      var matrix = item.row_matrix();

      var str = ftPassRow_struct.clone();
      str.find('.doc_numero span').html(matrix.numero);
      str.find('.doc_data span').html(matrix.data);
      str.find('.doc_total span').html(matrix.importo);
      str.find('.supplier_denominazione span').html(matrix.denominazione);
      str.find('.supplier_idFiscaleIva span').html(matrix.idFiscaleIva);
      str.find('.doc_type span').html(matrix.type);
      str.find('.doc_societa span').html(matrix.test);
      str.find('.doc_allegati span').html(matrix.allegati);
      str.find('.doc_uuid span').html(matrix.uuid);
      str.find('.doc_societa span').html(matrix.societa);

      if(item.invoice.Allegati && parseInt(item.invoice.Allegati) > 0){
        str.find('.doc_allegati').css("color", "#ff0000");
      }

      this.structure = str;

    } catch (e) {
      console.log(e.message);
    }
  }

  ftPassRow_ui.prototype.listeners = function(){
    try {
      var self = this;

      if(!this.root)
        throw new TypeError('ftPassRow_ui - listeners : this.root undefined!');

      if(!this.item || !(this.item instanceof fatture_passive))
        throw new TypeError('ftPassRow_ui - listeners : this.item undefined!');

      var root = this.root;
      var item = this.item;
      var supplier = item.supplier;
      var invoice = item.invoice;
      var uuid = item.uuid_invoice;

      root.find('.doc_allegati').click(function(event){
        if(uuid && invoice.Allegati && parseInt(invoice.Allegati) > 0){
          var acube = new invoice_acube();
          acube.getJWToken(function(token){
            if(token){
              acube.RetrievesASpecificInvoice(uuid, token, function(fe){

                if(fe){
                  var payload = JSON.parse(fe.payload);
                  if(payload.fattura_elettronica_body && payload.fattura_elettronica_body[0] && payload.fattura_elettronica_body[0].allegati && payload.fattura_elettronica_body[0].allegati.length > 0){
                    var attachments = payload.fattura_elettronica_body[0].allegati;
                    acube.DownloadAttachments(attachments, function(){
                    });
                  }else{
                    bootbox.alert('Attenzione, non sono stati rilevati allegati a questa fattura. In alternativa, è sempre disponibile la versione PDF della fattura elettronica.');
                  }
                }else{
                  bootbox.alert('Riprovare, errore durante il caricamento.');
                }
              });
            }
          });
        }else if(!uuid){
          bootbox.alert('Attenzione, funzione disponibile solo per fatture elettroniche.');
        }else if(uuid && !(parseInt(invoice.Allegati) > 0)){
          bootbox.alert('Attenzione, non sono presenti allegati per questa fattura. In alternativa, è sempre disponibile la versione PDF della fattura elettronica.');
        }
      });

      root.find('.doc_numero').click(function(event){
        if(uuid){
          var acube = new invoice_acube();
          acube.getJWToken(function(token){
            if(token){
              acube.DownloadPDF(item, uuid, token);
            }
          });
        }else{
          bootbox.alert('Attenzione, funzione disponibile solo per fatture elettroniche.');
        }
      });

      root.find('.kb-row-v2_right .kb-row-v2_col.btnActions-toggle i').click(function(){
        var bottom_panel = root.find('.kb-row-v2_bottom');

        if(!bottom_panel.hasClass('bottom-panel__toggle')){
          bottom_panel.toggleClass('bottom-panel__toggle');
          root.find('.kb-row-v2_right .kb-row-v2_col.btnActions-toggle .material-icons').html('expand_more');
        }else{
          bottom_panel.toggleClass('bottom-panel__toggle');
          bottom_panel.empty();
          root.find('.kb-row-v2_right .kb-row-v2_col.btnActions-toggle .material-icons').html('expand_less');

          //CARICAMENTO DI BTNS SU DOM E LISTENERS
          self.loadBtnPanelOnDOM();

        }

      });

    } catch (e) {
      console.log(e.message);
    }
  }

  ftPassRow_ui.prototype.loadBtnPanelOnDOM = function(){
    try {
      var self = this;

      if(!this.root)
        throw new TypeError('ftPassRow_ui - loadBtnPanelOnDOM : this.root undefined!');

      if(!this.item || !(this.item instanceof fatture_passive))
        throw new TypeError('ftPassRow_ui - loadBtnPanelOnDOM : this.item undefined!');

      var root = this.root;
      var item = this.item;
      var supplier = item.supplier;
      var invoice = item.invoice;

      var uuid = item.uuid_invoice;
      var bottom_panel = root.find('.kb-row-v2_bottom');
      var docFisc = new DocumentoFiscale();
      var docFornitore = new DocumentoFornitore();
      docFornitore.IdDocumentoFiscale = invoice.Id;
      docFisc.Id = docFornitore.IdDocumentoFiscale;
      docFisc.Type = docFornitore.TipoDocumentoFiscale;
      docFisc.Documento = docFornitore;

      //btn servizi
      var btn_servizi = btm_panel_btns_struct.clone();
      btn_servizi.addClass('doc_servizi');
      btn_servizi.find('.material-icons').append('assignment');
      btn_servizi.find('.btn_title').html('Caricamento in corso...');

      bottom_panel.append(btn_servizi);

      docFornitore.countServizi(function(){
        var count = docFornitore.CountServizi;
        btn_servizi.find('.btn_title').html('Servizi');
        btn_servizi.find('.btn_counter').html('(' + count + ')');
        if(count && parseInt(count) > 0){
          btn_servizi.find('.btn-actions__btn-body').addClass('btn-actions__color-blue');
        }
      });

      bottom_panel.find('.doc_servizi').click(function(){
        docFornitore.countServizi(function(){
          var count = docFornitore.CountServizi;
          btn_servizi.find('.btn_counter').html('(' + count + ')');

          if(count && parseInt(count) > 0){
            docFornitore.LoadRelationship(function(){
              var floatingPanel = new floatingPanelV2();
              floatingPanel.root = $('section.main-layout_content .tm-floating-panel-desktop-v2');
              floatingPanel.init();
              floatingPanel.addNewSection('Servizi (' + count + ')')

              var dServizio = new docServizio();
              dServizio.floatingPanel = floatingPanel;
              dServizio.row = self;
              dServizio.doc = docFisc;
              dServizio.init();

            });
          }else{
            bootbox.alert("Non sono presenti servizi associati a questo documento.");
          }
        });
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  docServizio.prototype.init = function(){
    try {
      var self = this;

      if(!this.row)
        throw new TypeError('docServizio - init : this.row undefined!');

      if(!this.floatingPanel)
        throw new TypeError('docServizio - init : this.floatingPanel undefined!');

      if(!this.doc)
        throw new TypeError('docServizio - init : this.doc undefined!');

      var row = this.row;
      var item = row.item;

      this.setHeader();
      this.setBody();

    } catch (e) {
      console.log(e.message);
    }
  }

  docServizio.prototype.setHeader = function(){
    try {
      var self = this;
      var floatingPanel = this.floatingPanel;
      var header = floatingPanel.rootHeader;
      var row = this.row;
      var item = row.item;
      var docFisc = this.doc;

      var totale = new Number(docFisc.getTotale());
      var number = docFisc.getNumber();
      var invoice = docFisc.getInvoice();
      var intt = null;

      if(item.supplier){
        intt = item.supplier;
      }else if(item.customer){
        intt = item.customer;
      }

      header.find('.tm-editable-textarea__content').html(number);
      header.find('.tm-editable-textarea__importo').html(totale.formatMoney(2) + ' €');
      header.find('.description-meta.description-meta__top').html(intt.getNominativo());

    } catch (e) {
      console.log(e.message);
    }
  }

  docServizio.prototype.setBody = function(){
    try {
      var self = this;
      var floatingPanel = this.floatingPanel;
      var body = floatingPanel.root.find('.tm-property-tabs__content .tm-transaction-properties-pane.tm-hack-scrollbar');
      var row = this.row;
      var item = row.item;
      var docFisc = this.doc;
      var servizi = docFisc.Documento.Servizi;
      var intt = null;

      console.log(this);

      if(item.supplier){
        intt = item.supplier;
      }else if(item.customer){
        intt = item.customer;
      }

      body.append($('<div class="kanban-items ms-hack-scrollbar"></div>'));

      //FOREACH QUI. CREARE UNA FUNZIONE CHE RESTITUISCE LA STRUCT DI OGNI ROW.

      for (var i = 0; i < servizi.length; i++) {
        var servizio = servizi[i];
        var row = new docServizio_row();
        row.item = servizio;
        row.init();
        body.append(row.structure);
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  function docServizio_row(structure, item, index, root){
    this.structure = structure;
    this.item = item;
    this.index = index;
    this.root = root;
  }

  docServizio_row.prototype.init = function(){
    try {
      var self = this;

      if(!this.item)
        throw new TypeError('docServizio_row - init : this.item undefined!');

      this.setStructure();

    } catch (e) {
      console.log(e.message);
    }
  }

  docServizio_row.prototype.setStructure = function(){
    try {

      var struct = sv_struct.clone();
      var item = this.item;

      console.log(item);

      if(item.ServizioDescrizione){
        var descr = item.ServizioDescrizione.Descrizione;

        struct.find('.sv_descr .services_item-row_column-content').html(descr);
      }else{
        struct.find('.sv_descr').css('display', 'none');
      }

      if(item.ServizioImporto){
        var amount = new Number(item.ServizioImporto.Importo);
        struct.find('.sv_amount .services_item-row_column-content').html(amount.formatMoney(2) + ' €');
      }else{
        struct.find('.sv_amount').css('display', 'none');
      }

      if(item.ServizioNumero){
        var number = item.ServizioNumero.Numero;
        struct.find('.sv_number .services_item-row_column-content').html(number);
      }else{
        struct.find('.sv_number').css('display', 'none');
      }

      if(item.ServizioAppartamento){
        var apt = item.ServizioAppartamento;
        var icon = $('<i class="material-icons">home</i>');
        struct.find('.sv_apts .services_item-row_column-content').html(icon.clone());
        struct.find('.sv_apts .services_item-row_column-content').append(apt.getTitle());
      }else{
        struct.find('.sv_apts').css('display', 'none');
      }

      if(item.ServizioStanza){
        var room = item.ServizioStanza;
        var icon = $('<i class="material-icons">local_hotel</i>');
        struct.find('.sv_rooms .services_item-row_column-content').html(icon.clone());
        struct.find('.sv_rooms .services_item-row_column-content').append(room.getTitle());
      }else{
        struct.find('.sv_rooms').css('display', 'none');
      }

      if(item.ServizioData){
        struct.find('.sv_date .services_item-row_column-content').html(item.ServizioData.getMatrix());
      }else{
        struct.find('.sv_date').css('display', 'none');
      }

      if(item.ServizioPeriodo && item.ServizioPeriodo.hasValue()){
        var period = item.ServizioPeriodo.getMatrix();

        period.inizio ? struct.find('.period_from .services_item-row_column-content').html(period.inizio) : struct.find('.period_from').css('display', 'none') ;
        period.fine ? struct.find('.period_to .services_item-row_column-content').html(period.fine) : struct.find('.period_to').css('display', 'none') ;
      }else{
        struct.find('.period_from').css('display', 'none');
        struct.find('.period_to').css('display', 'none');
      }

      if(item.ServizioIns){
        var ins = item.ServizioIns;
        var icon = $('<i class="material-icons">person</i>');
        struct.find('.sv_ins .services_item-row_column-content').html(icon.clone());
        struct.find('.sv_ins .services_item-row_column-content').append(ins.getTitle());
      }else{
        struct.find('.sv_ins').css('display', 'none');
      }

      if(item.Servizio_TagServizio && item.Servizio_TagServizio.Tags && item.Servizio_TagServizio.Tags.length > 0){
        var tags = item.Servizio_TagServizio.Tags;
        var tag_struct = $('<div class="tag-item"><div class="tm-simple__text tag-item_struct"><span></span></div></div>');
        struct.find('.sv_tags').empty();

        for (var x = 0; x < tags.length; x++) {
          tag = tags[x];
          var tagStruct = tag_struct.clone();
          tagStruct.find('span').html(tag.getTitolo());
          struct.find('.sv_tags').append(tagStruct);
        }

        struct.find('.sv_tags').append($('<div class="services_item-row_column-title">Tags</div>'));
      }

      this.structure = struct;

    } catch (e) {
      console.log(e.message);
    }
  }

})();
