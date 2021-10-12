/**
 * - sec_clients.prototype.init
 */
function sec_clients(admin, clients_ui){
  this.admin = admin;
  this.clients_ui = clients_ui;
  this.sectionNumber = 1;
}

function sec_allClients(admin, rootKanbanList, clients_ui){
  this.admin = admin;
  this.clients_ui = clients_ui;
  this.rootKanbanList = rootKanbanList;
  this.sectionNumber = 1;
}

(function(){

  function tenantRow_ui(item, index, root, structure){
    this.item = item;
    this.index = index;
    this.root = root;
    this.structure = structure;
  }

  function otherClientRow_ui(item, index, root, structure){
    this.item = item;
    this.index = index;
    this.root = root;
    this.structure = structure;
  }

  function insRow_ui(item, index, root, structure){
    this.item = item;
    this.index = index;
    this.root = root;
    this.structure = structure;
  }

  /**
   * - FiltroClienti.prototype.init
   * - FiltroClienti.prototype.setListeners
   * - FiltroClienti.prototype.setFilters
   */
  function FiltroClienti(Termine, DataInizio, DataFine, CfOrPiva, Agente, Stato, Apt, Partner, Pagination){
    this.Termine = Termine;
    this.DataInizio = DataInizio;
    this.DataFine = DataFine;
    this.CfOrPiva = CfOrPiva;
    this.Agente = Agente;
    this.Stato = Stato;//Attivo, Non Attivo
    this.Apt = Apt;
    this.Partner = Partner;
    this.Pagination = Pagination;
  }

  var clone = null;
  var items = new Array();
  var filter = new FiltroClienti();
  var allClients_manager = new sec_allClients();
  var allClients_kanban = new kanban_list();

  var tenantRow_struct = $('<div class="kb-row-v2"><div class="kb-row-v2_top"><div class="kb-row-v2_top__sub-left"><div class="kb-row-v2_left"><div class="kb-row-v2_col"><div class="kb-row-v2_info cl_nominativo"><i class="material-icons">person</i><span></span></div></div><div class="kb-row-v2_col"><div class="kb-row-v2_info cl_email"><i class="material-icons">email</i><span></span></div><div class="kb-row-v2_info cl_phone"><i class="material-icons">phone</i><span></span></div></div></div><div class="kb-row-v2_right"><div class="kb-row-v2_col toggle_ins" style=" cursor: pointer;"><i class="material-icons" style="font-size: 35px;text-align: center;">expand_more</i></div><div class="kb-row-v2_col i_actions" style=" cursor: pointer;"><i class="material-icons" style="font-size: 35px;text-align: center;">offline_bolt</i></div></div></div><div class="kb-row-v2_top__sub-right"><div class="kb-row-v2_info i_newContract" style=" padding: 0px 20px; color: #00a9fa;"><i class="material-icons">note_add</i><span>Nuovo Contratto</span></div></div></div><div class="kb-row-v2_bottom"></div></div>');
  var otherClient_struct = $('<div class="kb-row-v2"><div class="kb-row-v2_top"><div class="kb-row-v2_top__sub-left"><div class="kb-row-v2_left"><div class="kb-row-v2_col"><div class="kb-row-v2_info cl_nominativo"><i class="material-icons">person</i><span></span></div></div><div class="kb-row-v2_col"><div class="kb-row-v2_info cl_email"><i class="material-icons">email</i><span></span></div><div class="kb-row-v2_info cl_phone"><i class="material-icons">phone</i><span></span></div></div></div><div class="kb-row-v2_right"><div class="kb-row-v2_col" style=" cursor: pointer;"><i class="material-icons" style="font-size: 35px;text-align: center;">expand_more</i></div><div class="kb-row-v2_col i_actions" style=" cursor: pointer;"><i class="material-icons" style="font-size: 35px;text-align: center;">offline_bolt</i></div></div></div><div class="kb-row-v2_top__sub-right"><div class="kb-row-v2_info i_newContract" style=" padding: 0px 20px; color: #00a9fa;"><i class="material-icons">note_add</i><span>Nuovo Contratto</span></div></div></div><div class="kb-row-v2_bottom"></div></div>');
  var insRow_struct = $('<div class="ins_row"><div class="kb-row-v2_col"><div class="kb-row-v2_info ins_stanza" style=" color: #02a8f3;"><i class="material-icons">hotel</i><span></span></div></div><div class="kb-row-v2_col"><div class="kb-row-v2_info"><i class="material-icons">flight_land</i><span class="ins_moveIn" style=" margin-right: 20px;"></span><i class="material-icons">flight_takeoff</i><span class="ins_moveOut"></span></div></div><div class="kb-row-v2_col"><div class="kb-row-v2_info"><i class="material-icons">euro_symbol</i><span class="ins_rent" style=" margin-right: 20px;"></span></div></div><div class="kb-row-v2_col"><div class="kb-row-v2_info ins_accountBalance"><i class="material-icons">account_balance</i><span>Situazione Economica</span></div></div></div>');

  sec_clients.prototype.init = function(){
    try {
      var self = this;

      if(!this.admin)
        throw new TypeError("sec_clients - init : this.admin undefined");

      if(!this.clients_ui)
        throw new TypeError("sec_clients - init : this.clients_ui undefined");

      if(this.admin.isAdministrator() || this.admin.isContabile() || this.admin.isDataEntry() || this.admin.isCommercialista() || this.admin.recuperoCrediti() || this.admin.isAgente()){
        this.clients_ui.setSection(this.sectionNumber);
        this.clients_ui.rootKanbanLists.empty();

        clone = self;

        var filter_struct = $('<div class="cl_filter"><div class="cl_filter_left-panel"><div class="cl_filter_left-row" style=" justify-content: space-between;"><div class="cl_filter_left-row_input-text"><span class="material-icons">search</span><input class="filter_term"  placeholder="Ricerca cliente..."></div><div class="cl_filter_left-row_select"><span >Stato</span><select class="filter_stato"> <option value="0">Seleziona</option><option value="1">Attivo</option> <option value="2">In Archivio</option> </select></div><div class="cl_filter_left-row_select"><span >Agente</span><select class="filter_agente"> <option value="0">Seleziona</option><option value="5">Barbara</option> <option value="12">Cristina</option><option value="13">Fede</option><option value="4">Andrea</option> </select></div><div class="cl_filter_left-row_select"><span >Partner</span><select class="filter_partner"> <option value="0">Seleziona</option><option value="1">Uniplaces</option> <option value="2">Spotahome</option><option value="4">H&amp;A</option><option value="5">ZappyRent</option></select></div></div><div class="cl_filter_left-row"><span class="cl_filter_toggle-btn"><i class="material-icons">add_circle</i><div> Espandi </div></span></div><div class="cl_filter_left-row justify-content_flex-start toggleFields_hide"><div class="cl_filter_left-row_input-text"><span class="material-icons">search</span><input class="filter_apt" placeholder="Ricerca per appartamento..."></div><div class="cl_filter_left-row_period"><div class="cl_filter_left-row_period-top"><span >Apertura del contratto</span></div><div class="cl_filter_left-row_period-bottom"><input class="filter_startDate_from" type="date" ><input class="filter_startDate_to" type="date" ></div></div></div><div class="cl_filter_left-row justify-content_flex-start toggleFields_hide"><div class="cl_filter_left-row_input-text"><span class="material-icons">search</span><input class="filter_cf_piva" placeholder="Ricerca per c.f o p.iva..."></div><div class="cl_filter_left-row_period"><div class="cl_filter_left-row_period-top"><span >Chiusura del contratto</span></div><div class="cl_filter_left-row_period-bottom"><input class="filter_endDate_from" type="date" ><input class="filter_endDate_to" type="date" ></div></div></div></div><div class="cl_filter_right-panel"><div class="cl_filter-btn"><i></i><span>Ricerca</span></div></div></div>');

        $('.ms-scrollable-layout').css('background-color', '#F2F6FA');
        this.clients_ui.rootKanbanLists.append(filter_struct);

        filter.root = this.clients_ui.rootKanbanLists.find('.cl_filter');
        filter.parentRoot = this.clients_ui.rootKanbanLists;
        filter.init();

        allClients_manager.admin = self.admin;
        allClients_manager.clients_ui = self.clients_ui;
        allClients_manager.sectionNumber = self.sectionNumber;

        allClients_kanban.parentRoot = this.clients_ui.rootKanbanLists;
        allClients_kanban.secTitle = "Clienti";
        allClients_kanban.itemsManager = allClients_manager;
        allClients_kanban.init(function(){
          filter.setListeners();
        });

      }else{
        alert("Non hai i permessi per accedere a questa sezione!");
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  sec_allClients.prototype.loadElements = function(filtro, callback){
    try {
      var self = this;

      if(!clone)
        throw new TypeError("sec_allClients - loadElements : clone undefined!");

      if(!callback)
        throw new TypeError("sec_allClients - loadElements : callback undefined!");

      items = [];

      if(self.rootKanbanList.find('.ms-list-header__right').is(':empty')){
        self.rootKanbanList.find('.ms-list-header__right').html('<div class="tm-pagination"><span class="paginationTitle" style=" margin-right: 20px;"></span><i class="fas fa-arrow-left left"></i><i class="fas fa-arrow-right right"></i></div>');
      }

      this.Search(filter, function(res){
        var data = res.Data;
        if(filter.Pagination){
            filter.Pagination.TotalPages = res.TotalPages;
        }

        if(filter.Pagination){
            filter.Pagination.TotalRows = res.TotalRows;
        }

        if(data && data.length > 0){
          self.rootKanbanList.find('.secTitle').html("Clienti (" + filter.Pagination.TotalRows + ")");

          var pager_title = filter.Pagination.CurrentPage + " - " + filter.Pagination.TotalPages;
          self.rootKanbanList.find('.paginationTitle').html(pager_title);
          for (var i = 0; i < data.length; i++) {
            self.rowSorter(data[i], function(row){
              items.push(row);
            });
            /*var row = new row_ui();
            row.item = data[i];
            row.setStructure();
            items.push(row);*/
          }
        }

        callback(items);
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  /**
   * [Si occupa di creare la classe specifica di row_ui dato che ci sono più tipologie di row]
   * @return {[type]} [description]
   */
  sec_allClients.prototype.rowSorter = function(data, callback){
    try {

      if(!callback)
        throw new TypeError("sec_allClients - rowSorter : callback undefined!");

      if(!data)
        throw new TypeError("sec_allClients - rowSorter : data undefined");

      var row = null;
      var type = parseInt(data.Type);

      switch (type) {
        case 1:
          row = new tenantRow_ui();
          row.item = data;
          row.setStructure();
          break;
        case 2:
          row = new otherClientRow_ui();
          row.item = data;
          row.setStructure();
          break;
      }

      callback(row);
    } catch (e) {
      console.log(e.message);
    }
  }

  sec_allClients.prototype.Search = function(filtro, callback){
    try {

      var self = this;
      var data = { Filtro : filtro };
      var clone = encodeURIComponent(JSON.stringify(data));

      $.ajax({
          method: "POST",
          url: '?action=search',
          data: { data : clone },
      }).done(function(res){
        if(res && res.Data && res.Data.length > 0){
          var clienti = res.Data;
          each(clienti, function (key, registro, index){
              clienti[key] = $.extend(new Cliente(), clienti[key]);
              clienti[key].Linking();
          });

        }

        if(callback){
            callback(res);
        }
      }).fail(function(xhr, status, error) {
        DefaultErrorHandler(xhr, status, error);
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  sec_allClients.prototype.setInsUnder50 = function(){
    try {
      var self = this;

      if(items.length < 50){
        for (var i = 0; i < items.length; i++) {
          items[i].root.find('.kb-row-v2_top__sub-left .kb-row-v2_right .kb-row-v2_col.toggle_ins i').click();
        }
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  FiltroClienti.prototype.init = function(){
    try {
      var self = this;

      this.Termine = null;

      this.Stato = 0;//Solo attivi
      //this.root.find('select.filter_stato').val(this.Stato);

      this.Agente = 0;//Nessuno
      this.Partner = 0;//Nessuno
      this.CfOrPiva = null;
      this.Apt = null;
      this.DataInizio = {
        Inizio : null,
        Fine : null
      };
      this.DataFine = {
        Inizio : null,
        Fine : null
      };
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

  FiltroClienti.prototype.setListeners = function(){
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
        allClients_kanban.reload(function(){
          allClients_manager.setInsUnder50();
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
          allClients_kanban.reload(function(){
            allClients_manager.setInsUnder50();
          });
        }
      });

      this.parentRoot.find('.ms-list-header__right .right').click(function(event){
        event.stopImmediatePropagation();
        if(self.Pagination.CurrentPage && self.Pagination.CurrentPage > 0 && self.Pagination.CurrentPage < self.Pagination.TotalPages){
          self.Pagination.CurrentPage++;
          self.setFilters();
          allClients_kanban.reload(function(){
            allClients_manager.setInsUnder50();
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

      this.root.find('.filter_apt').keyup(function(event){
        showEnterIcon(form_selector.find('.filter_apt'));
      });

      this.root.find('.filter_cf_piva').keyup(function(event){
        showEnterIcon(form_selector.find('.filter_cf_piva'));
      });

      this.root.find('.filter_term').keyup(
        debounce(function(e) {
          e.preventDefault();
          if (e.keyCode === 13) {
            $('.kanban-items').empty();
            self.root.find('.cl_filter-btn').click();
          }
        },300)
      );

      this.root.find('.filter_apt').keyup(
        debounce(function(e) {
          e.preventDefault();
          if (e.keyCode === 13) {
            $('.kanban-items').empty();
            self.root.find('.cl_filter-btn').click();
          }
        },300)
      );

      this.root.find('.filter_cf_piva').keyup(
        debounce(function(e) {
          e.preventDefault();
          if (e.keyCode === 13) {
            $('.kanban-items').empty();
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

  FiltroClienti.prototype.setFilters = function(){
    try {
      var self = this;

      this.CfOrPiva = this.root.find('input.filter_cf_piva').val();

      this.Stato = this.root.find('select.filter_stato').val();
      this.Agente = this.root.find('select.filter_agente').val();
      this.Partner = this.root.find('select.filter_partner').val();

      this.DataInizio = {
        Inizio : this.root.find('input.filter_startDate_from').val(),
        Fine : this.root.find('input.filter_startDate_to').val()
      };

      this.DataFine = {
        Inizio : this.root.find('input.filter_endDate_from').val(),
        Fine : this.root.find('input.filter_endDate_to').val()
      };

      this.Termine = this.root.find('input.filter_term').val();
      this.Apt = this.root.find('input.filter_apt').val();

    } catch (e) {
      console.log(e.message);
    }
  }

  tenantRow_ui.prototype.init = function(){
    try {
      var self = this;

      this.listeners();
    } catch (e) {
      console.log(e.message);
    }
  }

  tenantRow_ui.prototype.setStructure = function(){
    try {
      var self = this;

      if(!this.item || !(this.item instanceof Cliente))
        throw new TypeError('sec_clients.js - tenantRow_ui - setStructure : this.item undefined');

      if(!this.item.Cliente)
        throw new TypeError('sec_clients.js - tenantRow_ui - setStructure : item.Cliente undefined');

      var item = this.item;
      var cliente = item.Cliente;

      var str = tenantRow_struct.clone();
      str.find('.cl_nominativo span').html(cliente.getNominativo());
      str.find('.cl_email span').html(cliente.getPrimaryEmail());
      str.find('.cl_phone span').html(cliente.Telefono);

      this.structure = str;

    } catch (e) {
      console.log(e.message);
    }
  }

  tenantRow_ui.prototype.listeners = function(){
    try {
      var self = this;

      if(!this.root)
        throw new TypeError('tenantRow_ui - listeners : this.root undefined!');

      if(!this.item || !(this.item instanceof Cliente))
        throw new TypeError('tenantRow_ui - listeners : this.item undefined!');

      var root = this.root;
      var item = this.item;
      var admin = this.admin;
      var inquilino = item.Cliente;

      root.find(".kb-row-v2_right .kb-row-v2_col.toggle_ins i").click(function(event){
        if(!root.find('.kb-row-v2_bottom').hasClass('toggleIns')){
          root.find('div.kb-row-v2_col.toggle_ins .material-icons').html('expand_less');
          inquilino.LoadIns(function(res){
            if(res && res.Data && res.Data.length > 0){
              var contracts = res.Data;
              self.LoadInsOnDOM(contracts, function(){
              });
            }else{
              //Schermata senza risultati
            }
          });
        }else{
          root.find('.kb-row-v2_bottom').toggleClass('toggleIns');
          root.find('div.kb-row-v2_col.toggle_ins .material-icons').html('expand_more');
        }
      });

      root.find(".kb-row-v2_right .kb-row-v2_col.i_actions i").click(function(event){
        if(!root.find('.kb-row-v2_top .kb-row-v2_top__sub-right').hasClass('toggleIActions')){
          root.find('.kb-row-v2_top .kb-row-v2_top__sub-right').toggleClass('toggleIActions');
          root.find('.kb-row-v2_right .kb-row-v2_col.i_actions .material-icons').css('color', '#ffd909');
        }else{
          root.find('.kb-row-v2_top .kb-row-v2_top__sub-right').toggleClass('toggleIActions');
          root.find('.kb-row-v2_right .kb-row-v2_col.i_actions .material-icons').css('color', '#8f939c');
        }
      });

      root.find('.kb-row-v2_top .kb-row-v2_top__sub-right .i_newContract').click(function(event){
        //GENERARE PERSONAL INFO
        if(!admin)
          admin = new Admin();

        var test = false;

        admin.Load(function (){
            if(admin.isAdministrator() || admin.isAgente()){
              var prevIns = new Inquilino_Stanza();
              prevIns.IdInquilino = inquilino.Id;
              prevIns.getLastInsByInquilino(function(){
                if(prevIns.DataFine || test){
                  if((prevIns.Cauzione && parseFloat(prevIns.Cauzione) > 0) || test){
                    $('.project-page .sub-layout .sub-layout__header').toggle();
                    $('div.fixed-action-btn.addNewSingleBooking').remove();
                    var el = new Booking_Details();
                    el.IdInquilinoStanza = prevIns.Id;
                    el.Inquilino_Stanza = prevIns;
                    el.PersonalInfo = new Booking_PersonalInfo();
                    el.PersonalInfo.Id = -1;
                    inquilino.generatePersonalInfo(el.PersonalInfo);
                    var sBooking = new sec_singleBooking();
                    var bk_ui = { rootKanbanLists : $("section.main-layout_content > section > div > div.sub-layout__content > section > section > div > div.fixed-header-layout__contents > div > section > div") };
                    sBooking.admin = admin;
                    sBooking.bookingApp_ui = bk_ui;
                    sBooking.item = el;
                    sBooking.init();
                  }else{
                    bootbox.alert("Attenzione, la cauzione dell'ultimo contratto non è valida.");
                  }
                }else{
                  bootbox.alert("Attenzione, per inserire un nuovo contratto deve essere presente una disdetta.");
                }
              });
            }
        });
      });

      root.find('.cl_nominativo').click(function(event){
        var id = item.Id;
        window.open('../_gestione/tenants.php?Id=' + id,'_blank');
      });

      root.find('.cl_email').click(function(event){
        var i_primaryEmail = inquilino.PrimaryEmail;
        var i_secondaryEmail = inquilino.SecondaryEmail;
        var mailto = 'mailto:';

        if(i_primaryEmail){
          mailto += i_primaryEmail;
        }

        if(i_primaryEmail && i_secondaryEmail){
          mailto += '?cc=' + i_secondaryEmail;
        }

        //window.open(mailto);
        /* Get the text field */
        var copyText = $("#clipboard");
        copyText.toggle();
        copyText.val(i_primaryEmail);

        /* Select the text field */
        copyText.select();

        /* Copy the text inside the text field */
        document.execCommand("copy");
        copyText.toggle();

      });

      root.find('.cl_phone').click(function(event){
        var i_tel = inquilino.Telefono;
        var telto = 'tel:';

        if(i_tel){
          telto += i_tel;
          window.open(telto);
        }

      });
    } catch (e) {
      console.log(e.message);
    }
  }

  tenantRow_ui.prototype.LoadInsOnDOM = function(contracts, callback){
    try {
      var self = this;

      if(!callback)
        throw new TypeError("tenantRow_ui - LoadInsOnDOM : callback undefined");

      if(!this.root)
        throw new TypeError('tenantRow_ui - LoadInsOnDOM : this.root undefined!');

      if(!contracts || !(contracts.length > 0))
        throw new TypeError("tenantRow_ui - LoadInsOnDOM : contracts undefined or not > 0");

      var root = this.root;

      //1.Svuotare html content
      root.find('.kb-row-v2_bottom').empty();

      //2. Toggle di toggleIns
      root.find('.kb-row-v2_bottom').toggleClass('toggleIns');

      //3. Caricamento Rows sul DOM
      for (var i = 0; i < contracts.length; i++) {
        var ins = contracts[i];
        ins.Inquilino = self.item;
        var row = new insRow_ui();
        row.root = null;
        row.item = ins;
        row.setStructure(root, function(){
          row.init();
        });

      }

      //4.callback
      callback();

    } catch (e) {
      console.log(e.message);
    }
  }

  otherClientRow_ui.prototype.init = function(){
    try {
      var self = this;

      this.listeners();
    } catch (e) {
      console.log(e.message);
    }
  }

  otherClientRow_ui.prototype.setStructure = function(){
    try {
      var self = this;

      if(!this.item || !(this.item instanceof Cliente))
        throw new TypeError('sec_clients.js - tenantRow_ui - setStructure : this.item undefined');

      if(!this.item.Cliente)
        throw new TypeError('sec_clients.js - tenantRow_ui - setStructure : item.Cliente undefined');

      var item = this.item;
      var cliente = item.Cliente;

      var str = otherClient_struct.clone();
      var email = cliente.getPrimaryEmail() ? cliente.getPrimaryEmail() : "(Non presente)";
      var telefono = cliente.Telefono ? cliente.Telefono : "(Non presente)";
      str.find('.cl_nominativo span').html(cliente.getNominativo());
      str.find('.cl_email span').html(email);
      str.find('.cl_phone span').html(telefono);

      this.structure = str;

    } catch (e) {
      console.log(e.message);
    }
  }

  otherClientRow_ui.prototype.listeners = function(){
    try {
      var self = this;

    } catch (e) {
      console.log(e.message);
    }
  }

  insRow_ui.prototype.init = function(){
    try {
      var self = this;

      this.listeners();

    } catch (e) {
      console.log(e.message);
    }
  }

  insRow_ui.prototype.setStructure = function(parentRoot, callback){
    try {

      var self = this;

      if(!callback)
        throw new TypeError("insRow_ui - setStructure : callback undefined");

      if(!parentRoot)
        throw new TypeError("insRow_ui - setStructure : parentRoot undefined");

      if(!this.item || !(this.item instanceof Inquilino_Stanza))
        throw new TypeError('sec_clients.js - insRow_ui - setStructure : this.item undefined');

      if(!this.item.Stanza)
        throw new TypeError('sec_clients.js - insRow_ui - setStructure : item.Stanza undefined');

      var item = this.item;
      var stanza = item.Stanza;
      var str = insRow_struct.clone();

      //1. Set Index
      var index = parentRoot.find('.kb-row-v2_bottom > div').length + 1;
      this.index = index;

      //2. Set structure
      var dates = item.getDateMatrix();
      var moveIn = dates.moveIn.ddmmyyyy();
      var moveOut = dates.moveOut ? dates.moveOut.ddmmyyyy() : "indefinito";
      var rent = parseFloat(item.Canone);
      var bills = item.Spese ? parseFloat(item.Spese) : 0;
      rent = new Number(rent).formatMoney(2);
      bills = new Number(bills).formatMoney(2);
      var rent_txt = rent + ' + ' + bills;

      str.find('.ins_stanza span').html(stanza.getTitle());
      str.find('.ins_moveIn').append(moveIn);
      str.find('.ins_moveOut').append(moveOut);
      str.find('.ins_rent').append(rent_txt);

      this.structure = str;

      //3. Insert str on DOM
      parentRoot.find('.kb-row-v2_bottom').append(this.structure);

      //4. Set Root
      var root = parentRoot.find('.kb-row-v2_bottom > div:nth-child(' + index + ')');
      this.root = root;

      callback();

    } catch (e) {
      console.log(e.message);
    }
  }

  insRow_ui.prototype.listeners = function(){
    try {
      var self = this;

      if(!this.root)
        throw new TypeError("sec_clients.js - insRow_ui - listeners : this.root undefined");

      if(!this.item || !(this.item instanceof Inquilino_Stanza))
        throw new TypeError('sec_clients.js - insRow_ui - listeners : this.item undefined');

      if(!this.item.Stanza)
        throw new TypeError('sec_clients.js - insRow_ui - listeners : item.Stanza undefined');

      var root = this.root;
      var item = this.item;
      var admin = this.admin;

      root.find('.ins_stanza').click(function(event){
        var id = item.IdStanza;
        window.open('../_gestione/stanze.php?Id=' + id,'_blank');
      });

      root.find('.ins_accountBalance').click(function(event){
        var floatingPanel = new floatingPanelV2();
         floatingPanel.root = $('section.main-layout_content .tm-floating-panel-desktop-v2');
         floatingPanel.init();

         var rootSec_checkOut = floatingPanel.addNewSection('Generali');
         var accBalance = new accountBalance();
         accBalance.row_ui = self;
         accBalance.floatingPanel = floatingPanel;
         accBalance.init();
      });

    } catch (e) {
      console.log(e.message);
    }
  }

})();
