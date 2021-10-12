function sec_allTickets(tickets_ui, sectionNumber, sectionName, admin) {
  this.tickets_ui = tickets_ui;
  this.sectionNumber = sectionNumber;
  this.sectionName = sectionName;
  this.admin = admin;
}

(function () {
  
  function tickets_list(rootKanbanList, tickets_ui, sectionName) {
    this.rootKanbanList = rootKanbanList;
    this.tickets_ui = tickets_ui;
    this.sectionName = sectionName;
  }

  function tickets_filter(Keywords, OrderBy, OrderMode, Pagination, agente, stato, richiesta_inizio, richiesta_fine) {
    this.Keywords = Keywords;
    this.OrderBy = OrderBy;
    this.OrderMode = OrderMode;
    this.Pagination = Pagination;
    this.agente = agente;
    this.stato = stato;
    this.richiesta_inizio = richiesta_inizio;
    this.richiesta_fine = richiesta_fine;
  }

  function single_filter(property) {
    this.property = property;
  }

  function tickets_row(item, index, root, structure){
    this.item = item;
    this.index = index;
    this.root = root;
    this.structure = structure;
  }

  function getTicketIdFromUrl() {
    var id = 0;

    var linkString = window.location.href;
    var parts = linkString.split('/');

    for (let index = 0; index < parts.length; index++) {
      const part = parts[index];
      if(part.includes('ticket:')){
        var string_parts = part.split(':');
        id = (string_parts[1] && parseInt(string_parts[1]) > 0) ? parseInt(string_parts[1]) : 0;
      }
    }

    return id;
  }

  var clone = null;
  var items = new Array();
  var filter = new tickets_filter();
  var tickets_rows = new tickets_list();
  var tickets_kanban = new kanban_list();

  var tk_row_struct = $('<div class="kb-row-v2 tk-row"><div class="kb-row-v2_top"><div class="kb-row-v2_top__sub-left"><div class="kb-row-v2_btn_select" style="display: none;"><i class="material-icons">radio_button_unchecked</i></div><div class="tk-col__flag" data-field="Stato"><span></span></div><div class="kb-row-v2_left"><div class="kb-row-v2_col"><div class="kb-row-v2_info tk__header"><div data-field="Id"><span></span></div><div class="tk__separator"><i class="fas fa-circle"></i></div><div data-field="DataRichiesta"><span></span></div><div class="tk__separator"><i class="fas fa-circle"></i></div><div class="tk__assignTo" data-field="TipoAssegnazione"><i></i><span></span></div></div><div class="kb-row-v2_info tk__body" data-field="Oggetto"></div><div class="kb-row-v2_info tk__bottom"><div data-field="DataAggiornamento"><span></span></div></div></div></div><div class="kb-row-v2_right" style=" display: none;"><div class="kb-row-v2_col btnActions-toggle" style=" cursor: pointer;"><i class="material-icons" style="font-size: 35px;text-align: center;">expand_more</i></div></div></div><div class="kb-row-v2_top__sub-right"></div></div><div class="kb-row-v2_bottom bottom-panel__btn-actions"></div></div>');

  sec_allTickets.prototype.init = function () {
    try {
      var self = this;

      if(!this.tickets_ui)
        throw new TypeError('sec_allTickets - init : this.tickets_ui undefined!');

      this.tickets_ui.setActiveStatusSectionByNumber(this.sectionNumber);

      clone = self;

      var rootKanbanLists = this.tickets_ui.rootKanbanLists;
      rootKanbanLists.empty();
      var admin = this.admin;

      var filter_struct = $('<div class="tk_filter"><div class="tk_filter_left-panel"><div class="tk_filter_left-row"><div class="tk_filter_left-row_select"><span>Stato Ticket</span><select data-field="stato"><option value="0" selected="selected">Selezionare</option><option value="1">Aperto</option><option value="2">Archiviato</option><option value="4">In sospeso</option><option value="6">In attesa di sopralluogo</option><option value="7">In attesa di preventivo</option><option value="8">In attesa di relazione</option><option value="3">In attesa di approvazione</option><option value="5">Chiuso</option></select></div><div class="tk_filter_left-row_select" ><span>Agente</span><select data-field="agente"><option value="0" selected="selected">Selezionare</option><option value="12">Cristina</option><option value="5">Barbara</option><option value="13">Fede</option><option value="4">Andrea</option></select></div><div class="tk_filter_left-row_period"><div class="tk_filter_left-row_period-top"><span>Data Richiesta</span></div><div class="tk_filter_left-row_period-bottom"><input data-field="richiesta_inizio" type="date"><input data-field="richiesta_fine" type="date"></div></div></div></div><div class="tk_filter_right-panel" style="display : none;"><div class="tk_filter-btn"><i></i><span>Ricerca</span></div></div></div>');
      rootKanbanLists.append(filter_struct);

      //Floating Action Btn
      $('section.main-layout_content > section > div > div.sub-layout__content > section > section > div > div.fixed-header-layout__contents').append('<div class="fixed-action-btn materializecss addNewItem"> <a class="btn-floating"> <i class="material-icons">add</i> </a> </div>');
      var floatingActionBtn = $('section.main-layout_content > section > div > div.sub-layout__content > section > section > div > div.fixed-header-layout__contents > div.fixed-action-btn.materializecss.addNewItem');
      self.listeners();

      filter.root = rootKanbanLists.find('.tk_filter');
      filter.parentRoot = rootKanbanLists;

      var linkString = window.location.href;
      var hasAgente = linkString.includes('agente');
      var hasFastLink = linkString.includes('new-ticket');
      var hasTicket = linkString.includes('ticket:');

      if(admin.isAgente() && !hasAgente){
        filter.agente = admin.Id;
      }

      if(hasFastLink){
        floatingActionBtn.click();
      }

      if (hasTicket && getTicketIdFromUrl() > 0) {
        var idTicket = getTicketIdFromUrl();
        var ticket = new Ticket(idTicket);
        var modal = new ms_modal();
        modal.init(function () {
          //When exit, retore filter link
          var linkString2 = window.location.href;
          var mainLink2 = linkString2.split('#/')[0];
          window.location.href = mainLink2 + '#/' + self.sectionName;
          filter.setSingleFilters();
          tickets_kanban.reload(function(){
          });
        });

        var ui_ticket = new ms_ticket();
        ui_ticket.modal = modal;
        ui_ticket.ticket = ticket;
        ui_ticket.init();
      }

      filter.init();

      tickets_rows.tickets_ui = this.tickets_ui;
      tickets_rows.sectionName = this.sectionName;
      tickets_kanban.parentRoot = rootKanbanLists;
      tickets_kanban.secTitle = "Elenco";
      tickets_kanban.itemsManager = tickets_rows;
      tickets_kanban.init(function(){
        filter.parentRoot = tickets_kanban.parentRoot;
        filter.setListeners();
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  sec_allTickets.prototype.listeners = function(){
    try {
      var self = this;

      if(!this.tickets_ui)
        throw new TypeError('sec_allTickets - listeners : this.tickets_ui undefined');

      if(!this.tickets_ui.rootKanbanLists)
        throw new TypeError('sec_allTickets - listeners : this.tickets_ui.rootKanbanLists undefined');

      var rootKanbanLists = this.tickets_ui.rootKanbanLists;
      var floatingActionBtn = $('section.main-layout_content > section > div > div.sub-layout__content > section > section > div > div.fixed-header-layout__contents > div.fixed-action-btn.materializecss.addNewItem');

      floatingActionBtn.click(function(event){
        event.stopImmediatePropagation();
        $('div.fixed-action-btn.addNewItem').toggle();

        var linkString = window.location.href;
        var mainLink = linkString.split('#/')[0];
        var hasNewTicketLink = linkString.includes('new-ticket');

        if(!hasNewTicketLink && mainLink){
          window.location.href = mainLink + '#/' + self.sectionName + '/new-ticket';
        }

        var modal = new ms_modal();
        modal.init(function () {
          $('div.fixed-action-btn.addNewItem').toggle();
          //When exit, retore filter link
          var linkString2 = window.location.href;
          var mainLink2 = linkString2.split('#/')[0];
          window.location.href = mainLink2 + '#/' + self.sectionName;
          filter.setSingleFilters();
          tickets_kanban.reload(function(){
          });
        });

        var ui_ticket = new ms_ticket();
        ui_ticket.modal = modal;
        ui_ticket.ticket = new Ticket();
        ui_ticket.init();

      });

    } catch (e) {
      console.log(e.message);
    }
  }

  tickets_list.prototype.loadElements = function(filtro, callback){
    try {
      var self = this;

      if(!clone)
        throw new TypeError("tickets_list - loadElements : clone undefined!");

      if(!callback)
        throw new TypeError("tickets_list - loadElements : callback undefined!");

      var elements = new Array();
      var tickets_ui = this.tickets_ui;

      if(self.rootKanbanList.find('.ms-list-header__right').is(':empty')){
        self.rootKanbanList.find('.ms-list-header__right').html('<div class="tm-pagination"><span class="paginationTitle" style=" margin-right: 20px;"></span><i class="fas fa-arrow-left left"></i><i class="fas fa-arrow-right right"></i></div>');
      }

      var admin = new Admin();
      admin.Load(function(){
        self.Search(filter, function(tks, pagination){
          var data = tks;

          if(filter.Pagination){
              filter.Pagination.TotalPages = pagination.TotalPages;
          }

          if(filter.Pagination){
              filter.Pagination.TotalRows = pagination.TotalRows;
          }

          if(data && data.length > 0){
            self.rootKanbanList.find('.secTitle').html("Risultati (" + filter.Pagination.TotalRows + ")");

            var pager_title = filter.Pagination.CurrentPage + " - " + filter.Pagination.TotalPages;
            self.rootKanbanList.find('.paginationTitle').html(pager_title);
            for (var i = 0; i < data.length; i++) {
              row = new tickets_row();
              row.sectionName = self.sectionName;
              row.item = data[i];
              row.setStructure();
              elements.push(row);
            }

          }else{
            self.rootKanbanList.find('.secTitle').html("Risultati (0)");
          }

          callback(elements);
        });
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  tickets_list.prototype.Search = function(filtro, callback){
    try {
      var self = this;
      var data = { Filtro : filtro };
      var clone = encodeURIComponent(CircularJSON.stringify(data));
      var tks = new Array();

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
          var data_tks = res.Data;
          each(data_tks, function (key, registro, index){
              data_tks[key] = $.extend(new Ticket(), data_tks[key]);
              //data_tks[key].Linking();
              tks.push(data_tks[key]);
          });
        }

        if(callback){
            callback(tks, pagination);
        }
      }).fail(function(xhr, status, error) {
        DefaultErrorHandler(xhr, status, error);
      });
    } catch (e) {
      console.log(e.message);
    }
  }

  tickets_filter.prototype.init = function(){
    try {
      var self = this;

      var linkString = window.location.href;
      var splittedLink = linkString.split('/filter?')[1];
      var filters = splittedLink ? splittedLink.split('&') : null;

      this.Keywords = null;
      this.OrderBy = "DataRegistrazione DESC";
      this.richiesta_inizio = null;
      this.richiesta_fine = null;
      this.agente = (parseInt(this.agente) > 0) ? this.agente : 0;
      this.stato = 0;
      this.OrderMode = "ASC";
      this.Pagination = {
        TotalRows : 0,
        TotalPages : 0,
        CurrentPage : 1,
        LimitRows : 100
      };

      if(filters){
        filters.forEach(filter => {
          var splittedFilter = filter.split('=');
          var filterName = splittedFilter[0];
          var filterVal = splittedFilter[1];

          this[filterName] = filterVal ? filterVal : this[filterName];
        });
      }

      this.setSingleFilters();

    } catch (e) {
      console.log(e.message);
    }
  }

  tickets_filter.prototype.setSingleFilters = function () {
    try {
      var self = this;

      for (var property in self) {
        var item = new single_filter();
        item.property = property;
        item.init();
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  tickets_filter.prototype.setListeners = function(){
    try {
      var self = this;
      var form_selector = this.root;
      var rootKanbanLists = this.parentRoot;
      var root = this.root;
      var parentRoot = this.parentRoot;

      root.find('select, input').change(function () {
        tickets_kanban.reload(function(){
        });
      });

      root.find('.tk_filter-btn').click(function(){
        self.Pagination.CurrentPage = 1;
        self.setFilters();
        tickets_kanban.reload(function(){
        });
      });

      /**
       * PAGER
       */
     parentRoot.find('.ms-list-header__right .left').click(function(event){
       event.stopImmediatePropagation();
       if(self.Pagination.CurrentPage && self.Pagination.CurrentPage > 1 && self.Pagination.CurrentPage <= self.Pagination.TotalPages){
         self.Pagination.CurrentPage--;
         self.setFilters();
         tickets_kanban.reload(function(){
         });
       }
     });

     parentRoot.find('.ms-list-header__right .right').click(function(event){
       event.stopImmediatePropagation();
       if(self.Pagination.CurrentPage && self.Pagination.CurrentPage > 0 && self.Pagination.CurrentPage < self.Pagination.TotalPages){
         self.Pagination.CurrentPage++;
         self.setFilters();
         tickets_kanban.reload(function(){
         });
       }
     });    

    } catch (e) {
      console.log(e.message);
    }
  }

  tickets_filter.prototype.setFilters = function(){
    try {
      var self = this;

      this.Keywords = this.root.find('input.filter_keywords').val();
      this.OrderBy = this.root.find('select.filter_orderBy').val();
      this.OrderMode = this.root.find('select.filter_orderMode').val();

    } catch (e) {
      console.log(e.message);
    }
  }

  single_filter.prototype.init = function () {
    try {
      var self = this;

      var root = filter.root;
      var property = this.property;
      
      this.setListeners();
      root.find('[data-field="' + property + '"]').val(filter[property]);

      if(root.find('[data-field="' + property + '"]').length > 0){
        this.setLink();
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  single_filter.prototype.setListeners = function () {
    try {
      var self = this;

      if(!filter || (filter && !filter.root))
        throw new TypeError('single_filter - setListeners : filter undefined!');

      var root = filter.root;
      var property = this.property;
      root.find('[data-field="' + property + '"]').change(function () {
        filter[property] = $(this).val();
        self.setLink();
      });      

    } catch (e) {
      console.log(e.message);
    }
  }

  single_filter.prototype.setLink = function () {
    try {
      var self = this;

      var linkString = window.location.href;
      var splittedLink = linkString.split('/filter?')[1];
      var filters = splittedLink ? splittedLink.split('&') : null;
      var property = this.property;
      var hasFastLink = linkString.includes('new-ticket');
      var hasTicket = linkString.includes('ticket:');

      if(!filters && !hasFastLink && !hasTicket)
        window.location.href = window.location.href.endsWith("/") ? window.location.href + 'filter?' : window.location.href + '/filter?';

      if(!hasFastLink && !hasTicket){
        if(filter[property] !== null && filter[property] !== ''){

          if(linkString.includes(property)){
            self.popLink(true);
          }else{
            self.pushLink();
          }
        }else{
          self.popLink(false);
        }
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  single_filter.prototype.pushLink = function () {
    try {
      var self = this;
      var property = this.property;

      var ends = window.location.href.endsWith("?");
      var url = window.location.href;
      window.location.href = ends ? (url + property + '=' + filter[property]) : (url + '&' + property + '=' + filter[property]);

    } catch (e) {
      console.log(e.message);
    }
  }

  single_filter.prototype.popLink = function (mode) {
    try {
      var self = this;
      var linkString = window.location.href;
      var splittedLink = linkString.split('/filter?')[1];
      var filters = splittedLink ? splittedLink.split('&') : null;
      var property = this.property;

      filters.forEach(function (item, index, object) {
        if(item.includes(property)){
          object.splice(index, 1);
        }
      });

      if(mode){
        var semiLink = property + '=' + filter[property];
        filters.push(semiLink);
      }

      self.restoreLink(filters);

    } catch (e) {
      console.log(e.message);
    }
  }

  single_filter.prototype.restoreLink = function (filters) {
    try {
      if(!filters)
        throw new TypeError('single_filter - restoreLink : filters undefined!');

      var self = this;
      var linkString = window.location.href;
      var rootLink = linkString.split('/filter?')[0] + '/filter?';

      for (let index = 0; index < filters.length; index++) {
        const el = filters[index];
        switch (index) {
          case 0:
            rootLink += el;
            break;
          default:
            rootLink += '&' + el;
            break;
        }
      }

      window.location.href = rootLink;

    } catch (e) {
      console.log(e.message);
    }
  }

  tickets_row.prototype.init = function(){
    try {
      var self = this;

      this.listeners();
      this.loadExtraContent();
    } catch (e) {
      console.log(e.message);
    }
  }

  tickets_row.prototype.setStructure = function () {
    try {
      var self = this;

      if(!this.item || !(this.item instanceof Ticket))
        throw new TypeError('tickets_row - setStructure : this.item undefined');

      var item = this.item;
      var matrix = item.row_matrix();

      var str = tk_row_struct.clone();
      str.find('[data-field="Id"] span').html(matrix.id);
      str.find('[data-field="DataRichiesta"] span').html(matrix.dataRichiesta);
      str.find('[data-field="Oggetto"]').html(matrix.subject);
      str.find('[data-field="DataAggiornamento"] span').html(matrix.lastUpdate);
      str.find('[data-field="Stato"] span').html(matrix.stato);
      str.find('[data-field="Stato"]').addClass(matrix.statoClass);


      this.structure = str;
    } catch (e) {
      console.log(e.message);
    }
  }

  tickets_row.prototype.listeners = function () {
    try {
      var self = this;

      if(!this.structure)
        throw new TypeError('tickets_row - listeners : this.structure undefined!');

      var root = this.structure;
      var ticket = this.item;

      root.click(function () {

        var linkString = window.location.href;
        var mainLink = linkString.split('#/')[0];
        var hasTicket = linkString.includes('ticket:');

        if(!hasTicket && mainLink){
          window.location.href = mainLink + '#/' + self.sectionName + '/ticket:' + ticket.Id;
        }

        var modal = new ms_modal();
        modal.init(function () {
          //When exit, retore filter link
          var linkString2 = window.location.href;
          var mainLink2 = linkString2.split('#/')[0];
          window.location.href = mainLink2 + '#/' + self.sectionName;
          filter.setSingleFilters();
          tickets_kanban.reload(function(){
          });
        });

        var ui_ticket = new ms_ticket();
        ui_ticket.modal = modal;
        ui_ticket.ticket = ticket;
        ui_ticket.init();
                
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  tickets_row.prototype.loadExtraContent = function () {
    try {
      var self = this;

      if(!this.item)
        throw new TypeError('tickets_row - loadExtraContent : this.item undefined!');

      var ticket = this.item;
      var root = this.structure;
      ticket.getPropertyName(function (txt) {
        if(txt){
          root.find('div.tk__assignTo span').append(txt);
        }
      });
      
    } catch (e) {
      console.error(e.message);
    }
  }

})();