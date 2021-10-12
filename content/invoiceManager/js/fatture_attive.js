function sec_fattureAttive(invoiceApp_ui, sectionNumber){
  this.invoiceApp_ui = invoiceApp_ui;
  this.sectionNumber = sectionNumber;
}

function ftAttRow_ui(item, index, root, structure){
  this.item = item;
  this.index = index;
  this.root = root;
  this.structure = structure;
}

(function(){

  function all_fattureAttive(rootKanbanList, invoiceApp_ui){
    this.rootKanbanList = rootKanbanList;
    this.invoiceApp_ui = invoiceApp_ui;
  }

  function ftAttiveFilter(Customer, Keywords, Tipologia, IdFiscaleIva, DataInizio, DataFine, Societa, UUID, Pagination){
    this.Customer = Customer;
    this.Keywords = Keywords;
    this.Tipologia = Tipologia;
    this.IdFiscaleIva = IdFiscaleIva;
    this.DataInizio = DataInizio;
    this.DataFine = DataFine;
    this.Societa = Societa;
    this.UUID = UUID;
    this.Pagination = Pagination;
  }

  var clone = null;
  var items = new Array();
  var filter = new ftAttiveFilter();
  var allFtAttive_manager = new all_fattureAttive();
  var allFtAttive_kanban = new kanban_list();

  var ftAttRow_struct = $('<div class="kb-row-v2"><div class="kb-row-v2_top"><div class="kb-row-v2_top__sub-left"><div class="kb-row-v2_btn_select" style=" display: none;"><i class="material-icons">radio_button_unchecked</i></div><div class="kb-row-v2_left"><div class="kb-row-v2_col"><div class="kb-row-v2_info doc_numero" title="Apri fattura"><i class="material-icons">receipt</i><span></span></div><div class="kb-row-v2_info customer_denominazione" title="Apri cliente"><i class="material-icons">person</i><span></span></div><div class="kb-row-v2_info cursor_default doc_societa"><i class="material-icons">business</i><span></span></div></div><div class="kb-row-v2_col"><div class="kb-row-v2_info cursor_default doc_data"><i class="material-icons">calendar_today</i><span></span></div><div class="kb-row-v2_info cursor_default customer_idFiscaleIva"><i class="material-icons">list_alt</i><span></span></div><div class="kb-row-v2_info doc_allegati" style=" color: #ff0000;"><i class="material-icons">cloud_download</i><span>Scarica PDF</span></div></div><div class="kb-row-v2_col"><div class="kb-row-v2_info cursor_default doc_total"><i class="material-icons">euro_symbol</i><span></span></div><div class="kb-row-v2_info cursor_default doc_type"><i class="material-icons">title</i><span></span></div><div class="kb-row-v2_info cursor_default doc_uuid"><strong>UUID : </strong><span class="consolas-format"></span></div></div></div><div class="kb-row-v2_right"><div class="kb-row-v2_col ft_actions" title="Azioni" style=" cursor: pointer;"><i class="material-icons" style="font-size: 35px;text-align: center;">offline_bolt</i></div></div></div><div class="kb-row-v2_top__sub-right"><div class="kb-row-v2_info ft_stornoActions"><i class="fas fa-cut"></i><span>Stornare Fattura</span></div></div></div><div class="kb-row-v2_bottom"><div class="kb-row-v2_bottom__btn-actions"><div class="kb-row-v2_bottom__btn ft-storno__parziale"><i class="fas fa-th-large icons-ms"></i><span>Storno Parziale</span></div><div class="kb-row-v2_bottom__btn ft-storno__totale"><i class="fas fa-square icons-ms"></i><span>Storno Totale</span></div></div></div></div>');

  sec_fattureAttive.prototype.init = function(){
    try {
      var self = this;

      if(!this.invoiceApp_ui)
        throw new TypeError('sec_fattureAttive - init : this.invoiceApp_ui undefined!');

      this.invoiceApp_ui.setActiveStatusSectionByNumber(this.sectionNumber);

      clone = self;

      var rootKanbanLists = this.invoiceApp_ui.rootKanbanLists;
      rootKanbanLists.empty();

      var btnSec_struct = $('<div class="ft-btn-section"><a href="" target="_blank"><div class="ft-btn__btn"><i class="fas fa-plus"></i><span>Crea fattura</span></div></a></div>');
      var filter_struct = $('<div class="cl_filter"><div class="cl_filter_left-panel"><div class="cl_filter_left-row" style=" justify-content: space-between;"><div class="cl_filter_left-row_input-text"><span class="material-icons">search</span><input class="filter_customer" placeholder="Ricerca per cliente..."></div><div class="cl_filter_left-row_input-text"><span class="material-icons">search</span><input class="filter_uuid" placeholder="Ricerca per UUID..."></div><div class="cl_filter_left-row_input-text"><span class="material-icons">search</span><input class="filter_idFiscaleIva" placeholder="Ricerca per CF o P.IVA..."></div></div><div class="cl_filter_left-row"><span class="cl_filter_toggle-btn"><i class="material-icons">add_circle</i><div> Espandi </div></span></div><div class="cl_filter_left-row toggleFields toggleFields_hide"><div class="cl_filter_left-row_input-text"><span class="material-icons">search</span><input class="filter_keywords" placeholder="Ricerca per parola chiave..."></div><div class="cl_filter_left-row_period"><div class="cl_filter_left-row_period-top"><span>Data Fattura</span></div><div class="cl_filter_left-row_period-bottom"><input class="filter_date_from" type="date"><input class="filter_date_to" type="date"></div></div><div class="cl_filter_left-row_select"><span>Tipologia</span><select class="filter_tipologia"><option value="-1" selected="selected">Selezionare</option> <option value="0">Altro</option> <option value="1">Primo Ingresso</option><option value="2">Locazione</option><option value="3">Chiusura</option><option value="1">Primo Ingresso</option> </select></div><div class="cl_filter_left-row_select"><span>Societa</span><select class="filter_societa"> <option value="0" selected="selected">Finlibera</option> <option value="1">Ecolibera</option> </select></div></div></div><div class="cl_filter_right-panel"><div class="cl_filter-btn"><i></i><span>Ricerca</span></div></div></div>');

      $('.ms-scrollable-layout').css('background-color', '#F2F6FA');
      btnSec_struct.find('a').attr('href', URL_GEST + 'invoicing.php');
      rootKanbanLists.append(btnSec_struct);
      rootKanbanLists.append(filter_struct);

      filter.root = rootKanbanLists.find('.cl_filter');
      filter.parentRoot = rootKanbanLists;
      filter.init();

      allFtAttive_manager.invoiceApp_ui = this.invoiceApp_ui;

      allFtAttive_kanban.parentRoot = rootKanbanLists;
      allFtAttive_kanban.secTitle = "Fatture";
      allFtAttive_kanban.itemsManager = allFtAttive_manager;
      allFtAttive_kanban.init(function(){
        filter.setListeners();
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  all_fattureAttive.prototype.loadElements = function(filtro, callback){
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
            row = new ftAttRow_ui();
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

  all_fattureAttive.prototype.Search = function(filtro, callback){
    try {
      var self = this;
      var data = { Filtro : filtro };
      var clone = encodeURIComponent(JSON.stringify(data));
      var invoices = new Array();

      $.ajax({
          method: "POST",
          url: '?action=fattureAttive',
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

  ftAttiveFilter.prototype.init = function(){
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

  ftAttiveFilter.prototype.setListeners = function(){
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
        allFtAttive_kanban.reload(function(){
          //allFtAttive_manager.setInsUnder50();
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
         allFtAttive_kanban.reload(function(){
           //allFtAttive_manager.setInsUnder50();
         });
       }
     });

     this.parentRoot.find('.ms-list-header__right .right').click(function(event){
       event.stopImmediatePropagation();
       if(self.Pagination.CurrentPage && self.Pagination.CurrentPage > 0 && self.Pagination.CurrentPage < self.Pagination.TotalPages){
         self.Pagination.CurrentPage++;
         self.setFilters();
         allFtAttive_kanban.reload(function(){
           //allFtAttive_manager.setInsUnder50();
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

     this.root.find('.filter_customer').keyup(function(event){
       showEnterIcon(form_selector.find('.filter_customer'));
     });

     this.root.find('.filter_keywords').keyup(function(event){
       showEnterIcon(form_selector.find('.filter_keywords'));
     });

     this.root.find('.filter_uuid').keyup(function(event){
       showEnterIcon(form_selector.find('.filter_uuid'));
     });

     this.root.find('.filter_idFiscaleIva').keyup(function(event){
       showEnterIcon(form_selector.find('.filter_idFiscaleIva'));
     });

     this.root.find('.filter_customer').keyup(debounce(function(e) {
       e.preventDefault();
       if (e.keyCode === 13) {
         $('.kanban-items').empty();
         self.root.find('.cl_filter-btn').click();
       }

     },300));

     this.root.find('.filter_keywords').keyup(debounce(function(e) {
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

  ftAttiveFilter.prototype.setFilters = function(){
    try {
      var self = this;

      this.Customer = this.root.find('input.filter_customer').val();
      this.Keywords = this.root.find('input.filter_keywords').val();
      this.Tipologia = this.root.find('select.filter_tipologia').val();
      this.IdFiscaleIva = this.root.find('input.filter_idFiscaleIva').val();
      this.UUID = this.root.find('input.filter_uuid').val();
      this.DataInizio = this.root.find('input.filter_date_from').val();
      this.DataFine = this.root.find('input.filter_date_to').val();
      this.Societa = this.root.find('select.filter_societa').val();

    } catch (e) {
      console.log(e.message);
    }
  }

  ftAttRow_ui.prototype.init = function(){
    try {
      var self = this;

      this.listeners();
    } catch (e) {
      console.log(e.message);
    }
  }

  ftAttRow_ui.prototype.setStructure = function(){
    try {
      var self = this;

      if(!this.item || !(this.item instanceof fatture_attive))
        throw new TypeError('fatture_attive.js - ftAttRow_ui - setStructure : this.item undefined');

      var item = this.item;
      var matrix = item.row_matrix();

      var str = ftAttRow_struct.clone();
      str.find('.doc_numero span').html(matrix.numero);
      str.find('.doc_data span').html(matrix.data);
      str.find('.doc_total span').html(matrix.importo);
      str.find('.customer_denominazione span').html(matrix.denominazione);
      str.find('.customer_idFiscaleIva span').html(matrix.idFiscaleIva);
      str.find('.doc_type span').html(matrix.type);
      str.find('.doc_societa span').html(matrix.test);
      str.find('.doc_allegati span').html(matrix.allegati);
      str.find('.doc_uuid span').html(matrix.uuid);
      str.find('.doc_societa span').html(matrix.societa);

      this.structure = str;

    } catch (e) {
      console.log(e.message);
    }
  }

  ftAttRow_ui.prototype.listeners = function(){
    try {
      var self = this;

      if(!this.root)
        throw new TypeError('ftAttRow_ui - listeners : this.root undefined!');

      if(!this.item || !(this.item instanceof fatture_attive))
        throw new TypeError('ftAttRow_ui - listeners : this.item undefined!');

      var root = this.root;
      var item = this.item;
      var customer = item.customer;
      var invoice = item.invoice;
      var altri_dati = item.altri_dati;

      root.find('.doc_numero').click(function(event){
        var win = window.open(URL_HOST + '_gestione/invoicing.php?action=load&idFattura=' + invoice.Id, "_blank");
      });

      root.find('.customer_denominazione').click(function(event){
        var win = window.open(URL_HOST + '_gestione/tenants.php?Id=' + customer.Id, "_blank");
      });

      root.find('.doc_allegati').click(function(event){
        var intestatario = new Intestatario();
        var cliente = new Cliente();
        var documentoFiscale = new DocumentoFiscale();
        var itt_doc = new Intestatario_DocumentoFiscale();
        var pdf = new PDF();

        cliente.Id = customer.Id;
        cliente.Type = customer.Type;
        cliente.IdIntestatario = altri_dati.IdIntestatario;
        cliente.TipoIntestatario = 1;
        cliente.Cliente = customer;

        intestatario.Id = altri_dati.IdIntestatario;
        intestatario.Type = 1;
        intestatario.Intestatario = cliente;

        documentoFiscale.Id = invoice.Id;
        documentoFiscale.Type = invoice.Type;
        documentoFiscale.Documento = invoice;

        itt_doc.DocumentoFiscale = documentoFiscale;
        itt_doc.Intestatario = intestatario;

        var tsDoc_Pdf = new TSDOC_PDF(itt_doc, pdf);
        tsDoc_Pdf.setPDF(function(err){
          if(err && err instanceof TypeError){
            bootbox.alert("Attenzione! Errore durante l'elaborazione del PDF. Eliminare questa bozza oppure richiedere indicazioni.");
          }else{
            tsDoc_Pdf.getFileTitle(function(title){
              try {

                if(title && title instanceof TypeError)
                  throw title;

                tsDoc_Pdf.pdf.Download(title);
              } catch (e) {
                console.log(e.message);
              }
            });
          }
        });

      });
      
      root.find('.kb-row-v2_right .kb-row-v2_col.ft_actions').click(function (event) {
        if(!root.find('.kb-row-v2_top .kb-row-v2_top__sub-right').hasClass('toggleIActions')){
          root.find('.kb-row-v2_top .kb-row-v2_top__sub-right').toggleClass('toggleIActions');
          root.find('.kb-row-v2_right .kb-row-v2_col.ft_actions .material-icons').css('color', '#ffd909');
        }else{
          root.find('.kb-row-v2_top .kb-row-v2_top__sub-right').toggleClass('toggleIActions');
          root.find('.kb-row-v2_right .kb-row-v2_col.ft_actions .material-icons').css('color', '#8f939c');
        }
      });

      root.find('.ft_stornoActions').click(function () {
        root.find('.kb-row-v2_bottom').toggleClass('bottom-panel__btn-actions'); 
      });

      root.find('.ft-storno__parziale').click(function () {
        var admin = new Admin();
        admin.Load(function () {
          if(admin.isContabile() || admin.isAdministrator()){
            window.open(URL_GEST + 'invoicing.php?action=load&idFattura=' + invoice.Id + '&actionStorno=1', '_blank');
          }else{
            alert("Non hai i permessi per effettuare questa richiesta.");
          }
        });
      });

      root.find('.ft-storno__totale').click(function () {
        var admin = new Admin();
        admin.Load(function () {
          if(admin.isContabile() || admin.isAdministrator()){
            invoice.setStornoTotale(function (data) {
              if(data && data.success){
                alert("Storno avvenuto con successo");
              }else{
                alert("Errore avvenuto durante l'esecuzione della richiesta. Si prega di richiedere assistenza.");
              }
            });
          }else{
            alert("Non hai i permessi per effettuare questa richiesta.");
          }
        });
      });

    } catch (e) {
      console.log(e.message);
    }
  }

})();
