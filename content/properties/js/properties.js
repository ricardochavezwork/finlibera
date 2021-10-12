function sec_properties(propertyApp_ui, sectionNumber, admin){
  this.propertyApp_ui = propertyApp_ui;
  this.sectionNumber = sectionNumber;
  this.admin = admin;
}

(function(){

  function properties_list(rootKanbanList, propertyApp_ui){
    this.rootKanbanList = rootKanbanList;
    this.propertyApp_ui = propertyApp_ui;
  }

  function properties_filter(Keywords, Archive, OrderBy, OrderMode, Pagination){
    this.Keywords = Keywords;
    this.Archive = Archive;
    this.OrderBy = OrderBy;
    this.OrderMode = OrderMode;
    this.Pagination = Pagination;
  }

  function properties_row(item, index, root, structure){
    this.item = item;
    this.index = index;
    this.root = root;
    this.structure = structure;
  }

  function rooms_row(item, index, root, parentRoot, structure){
    this.item = item;
    this.index = index;
    this.root = root;
    this.parentRoot = parentRoot;
    this.structure = structure;
  }

  var clone = null;
  var items = new Array();
  var filter = new properties_filter();
  var properties_manager = new properties_list();
  var properties_kanban = new kanban_list();

  var prop_row_struct = $('<div class="kb-row-v2"><div class="kb-row-v2_top"><div class="kb-row-v2_top__sub-left"><div class="kb-row-v2_btn_select" style="display: none;"><i class="material-icons">radio_button_unchecked</i></div><div class="kb-row-v2_left"><div class="kb-row-v2_col"><div class="kb-row-v2_info apt_title" title="Apri appartamento" style=" color: #00a9fa;"><i class="fas fa-home icons-ms"></i><span></span></div><div class="kb-row-v2_info cursor_default apt_zone compactItem" title="Zona"><i class="fas fa-map-marked-alt icons-ms"></i><span></span></div><div class="kb-row-v2_info cursor_default apt_mq compactItem" title="Mq Apt"><i class="fas fa-ruler icons-ms"></i><span></span></div></div><div class="kb-row-v2_col compactItem"><div class="kb-row-v2_info cursor_default apt_tot_rooms" title="Numero stanze"><i class="fas fa-bed icons-ms"></i><span></span></div><div class="kb-row-v2_info cursor_default apt_bagni" title="Numero Bagni"><i class="fas fa-bath icons-ms "></i><span></span></div><div class="kb-row-v2_info cursor_default apt_sala" title="Numero Sale"><i class="fas fa-couch icons-ms"></i><span></span></div></div><div class="kb-row-v2_col compactItem"><div class="kb-row-v2_info cursor_default apt_auto" title="Posto Auto"><i class="fas fa-car icons-ms"></i><span></span></div><div class="kb-row-v2_info cursor_default apt_balconi" title="Balconi"><strong>Balconi</strong><span></span></div><div class="kb-row-v2_info cursor_default apt_terrazzi" title="Terrazzi"><strong>Terrazzi</strong><span></span></div></div><div class="kb-row-v2_col compactItem"><div class="kb-row-v2_info cursor_default apt_inizio" title="Inizio contratto"><i class="fas fa-calendar-plus icons-ms"></i><span></span></div><div class="kb-row-v2_info cursor_default apt_fine" title="Fine contratto"><i class="fas fa-calendar-minus icons-ms"></i><span></span></div></div></div><div class="kb-row-v2_right"><div class="kb-row-v2_col btnActions-toggle" style=" cursor: pointer;"><i class="material-icons" style="font-size: 35px;text-align: center;">expand_more</i></div><div class="kb-row-v2_col apt_actions" title="Azioni" style="cursor: pointer;"><i class="material-icons" style="font-size: 35px;text-align: center;">offline_bolt</i></div></div></div><div class="kb-row-v2_top__sub-right"><div class="kb-row-v2_info apt_profit" ><i class="fas fa-chart-line icons-ms"></i><span>Profitti</span></div><div class="kb-row-v2_info apt_rooms" ><i class="fas fa-bed icons-ms"></i><span>Stanze</span></div></div></div><div class="kb-row-v2_bottom bottom-panel__btn-actions"></div></div>');

  var room_row_struct = $('<div class="kb-sub-rows_row"><div class="kb-sub-rows_row-top"><div class="kb-row-v2_col"><div class="kb-row-v2_info room_title" title="Apri stanza" style=" color: #02a8f3;"><i class="fas fa-bed icons-ms"></i><span></span></div></div><div class="kb-row-v2_col"><div class="kb-row-v2_info cursor_default room_mq" title="Mq stanza"><i class="fas fa-ruler icons-ms"></i><span></span></div><div class="kb-row-v2_info cursor_default room_balcone" title="Balcone stanza"><strong>Balcone</strong><span></span></div></div><div class="kb-row-v2_col"><div class="kb-row-v2_info cursor_default room_rent" title="Canone"><i class="material-icons">euro_symbol</i><span></span></div><div class="kb-row-v2_info cursor_default room_discount" title="Sconto"><i class="fas fa-tags icons-ms"></i><span></span></div></div><div class="kb-row-v2_col"><div class="kb-row-v2_info cursor_default room_bagno" title="Bagno stanza"><i class="fas fa-bath icons-ms "></i><span></span></div><div class="kb-row-v2_info cursor_default room_tv" title="Tv stanza"><i class="fas fa-tv icons-ms"></i><span></span></div></div><div class="kb-row-v2_col"><div class="kb-row-v2_info cursor_default room_avail" title="Disponibilita"><i class="far fa-calendar-minus icons-ms"></i><span>Non disponibile</span></div></div><div class="kb-row-v2_col"><div class="kb-row-v2_info cursor_default room_bookStatus" title="Stato prenotazione"><i class="far fa-calendar-minus icons-ms"></i><span>Non prenotata</span></div></div></div><div class="kb-sub-rows_row-bottom"><div class="kb-sub-rows_row-bottom__row"><div class="kb-sub-rows-btn sub-rows-btn__red booking_remove"><i class="fas fa-calendar-times icons-ms" style=" margin-right: 10px; "></i><span>Rimuovi prenotazione</span></div><div class="kb-sub-rows-btn booking_addOne"><i style=" margin-right: 10px; " class="far fa-calendar-check icons-ms"></i><span>Prenota - Modalità normale</span></div><div class="kb-sub-rows-btn booking_addTwo"><i style=" margin-right: 10px; " class="far fa-calendar-check icons-ms"></i><span>Prenota - Modalità estesa</span></div></div></div></div>');

  var apt_g_row_struct = $('<div class="kb-sub-rows_row"><div class="kb-sub-rows_row-top"><div class="kb-row-v2_col"><div class="kb-row-v2_info cursor_default apt_gAptEff"><strong>G APT - effettivo</strong><i class="material-icons">euro_symbol</i><span></span></div></div><div class="kb-row-v2_col"><div class="kb-row-v2_info cursor_default apt_gAptDov"><strong>G APT - dovuto</strong><i class="material-icons">euro_symbol</i><span></span></div></div><div class="kb-row-v2_col"><div class="kb-row-v2_info cursor_default apt_gRoomEff"><strong>G ROOM - effettivo</strong><i class="material-icons">euro_symbol</i><span></span></div></div><div class="kb-row-v2_col"><div class="kb-row-v2_info cursor_default apt_gRoomDov"><strong>G ROOM - dovuto</strong><i class="material-icons">euro_symbol</i><span></span></div></div><div class="kb-row-v2_col"><div class="kb-row-v2_info cursor_default apt_diffGRoom"><strong>DIFF G ROOM</strong><i class="material-icons">euro_symbol</i><span></span></div></div></div></div>');

  sec_properties.prototype.init = function(){
    try {
      var self = this;

      if(!this.propertyApp_ui)
        throw new TypeError('sec_properties - init : this.propertyApp_ui undefined!');

      this.propertyApp_ui.setActiveStatusSectionByNumber(this.sectionNumber);

      clone = self;

      var rootKanbanLists = this.propertyApp_ui.rootKanbanLists;
      rootKanbanLists.empty();
      var admin = this.admin;

      var btnSection = $('<div class="prop-btn-section"><a href="../appartamenti.php?Id=0" target="_blank"><div class="prop-btn__btn"><i class="fas fa-plus"></i><span>Crea appartamento</span></div></a></div>');
      var compactSection = $('<div class="prop-btn-section"><div class="prop-btn__btn compactView"><i class="fas fa-toggle-off"></i><span style="">Visualizzazione compatta</span></div></div>');

      var filter_struct = $('<div class="prop_filter"><div class="prop_filter_left-panel"><div class="prop_filter_left-row"><div class="prop_filter_left-row_input-text"><span class="material-icons">search</span><input class="filter_keywords" placeholder="Ricerca..."></div><div class="prop_filter_left-row_select"><span>Ordina per</span><select class="filter_orderBy"><option value="0">Selezionare</option><option value="16" selected="selected">Nome appartamento</option><option value="1">Stanze</option> <option value="2">Inizio</option><option value="3">Fine</option><option value="4">Bagni</option><option value="5">Mq</option><option value="6">Balconi</option><option value="7">Terrazzi</option><option value="8">Posti Auto</option><option value="9">Sale</option><option value="10">Zone</option><option value="11">G Apt Att</option><option value="12">G Apt Pro</option><option value="13">G Room Att</option><option value="14">G Room Pro</option><option value="15">Diff G Room</option> </select></div><div class="prop_filter_left-row_select"><span></span><select class="filter_orderMode"> <option value="ASC" selected="selected">Crescente</option> <option value="DESC">Decrescente</option> </select></div><div class="prop_filter_left-row_select"><span>Stato</span><select class="filter_stato"><option value="0">Selezionare</option> <option value="1" selected="selected">Attivo</option> <option value="2">In archivio</option> </select></div></div></div><div class="prop_filter_right-panel"><div class="prop_filter-btn"><i></i><span>Ricerca</span></div></div></div>');

      $('.ms-scrollable-layout').css('background-color', '#F2F6FA');

      if(admin.isAdministrator() || admin.isPropertiesAdministrator()){
        rootKanbanLists.append(btnSection);
      }

      rootKanbanLists.append(filter_struct);
      rootKanbanLists.append(compactSection);

      if(admin.isAgente()){
        compactSection.find('i').removeClass('fa-toggle-off').addClass('fa-toggle-on');
      }

      self.listeners();

      filter.root = rootKanbanLists.find('.prop_filter');
      filter.parentRoot = rootKanbanLists;
      filter.init();

      properties_manager.propertyApp_ui = this.propertyApp_ui;
      properties_kanban.parentRoot = rootKanbanLists;
      properties_kanban.secTitle = "Elenco";
      properties_kanban.itemsManager = properties_manager;
      properties_kanban.init(function(){
        filter.parentRoot = properties_kanban.parentRoot;
        filter.setListeners();
        if(compactSection.find('i').hasClass('fa-toggle-on')){
          $('.compactItem').css('display', 'none');
        }
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  sec_properties.prototype.listeners = function(){
    try {
      var self = this;

      if(!this.propertyApp_ui)
        throw new TypeError('sec_properties - listeners : this.propertyApp_ui undefined');

      if(!this.propertyApp_ui.rootKanbanLists)
        throw new TypeError('sec_properties - listeners : this.propertyApp_ui.rootKanbanLists undefined');

      var rootKanbanLists = this.propertyApp_ui.rootKanbanLists;

      rootKanbanLists.find('.compactView').click(function(){

        if($(this).find('i').hasClass('fa-toggle-off')){
          $(this).find('i').removeClass('fa-toggle-off').addClass('fa-toggle-on');
          $('.compactItem').css('display', 'none');
        }else{
          $(this).find('i').removeClass('fa-toggle-on').addClass('fa-toggle-off');
          $('.compactItem').css('display', 'flex');
        }

      });

    } catch (e) {
      console.log(e.message);
    }
  }

  properties_list.prototype.loadElements = function(filtro, callback){
    try {
      var self = this;

      if(!clone)
        throw new TypeError("properties_list - loadElements : clone undefined!");

      if(!callback)
        throw new TypeError("properties_list - loadElements : callback undefined!");

      var elements = new Array();
      var propertyApp_ui = this.propertyApp_ui;

      if(self.rootKanbanList.find('.ms-list-header__right').is(':empty')){
        self.rootKanbanList.find('.ms-list-header__right').html('<div class="tm-pagination"><span class="paginationTitle" style=" margin-right: 20px;"></span><i class="fas fa-arrow-left left"></i><i class="fas fa-arrow-right right"></i></div>');
      }

      var admin = new Admin();
      admin.Load(function(){
        self.Search(filter, function(apts, pagination){
          var data = apts;

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
              row = new properties_row();
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

  properties_list.prototype.Search = function(filtro, callback){
    try {
      var self = this;
      var data = { Filtro : filtro };
      var clone = encodeURIComponent(CircularJSON.stringify(data));
      var apts = new Array();

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
          var data_apts = res.Data;
          each(data_apts, function (key, registro, index){
              data_apts[key] = $.extend(new Appartamento(), data_apts[key]);
              data_apts[key].Linking();
              apts.push(data_apts[key]);
          });

        }

        if(callback){
            callback(apts, pagination);
        }
      }).fail(function(xhr, status, error) {
        DefaultErrorHandler(xhr, status, error);
      });
    } catch (e) {
      console.log(e.message);
    }
  }

  properties_list.prototype.setBtmPanelUnder = function(){
    try {
      var self = this;

      if(!properties_kanban || (properties_kanban && !properties_kanban.root))
        throw new TypeError('properties_list - setBtmPanelUnder : properties_kanban.root undefined');

      if(!filter || (filter && !filter.root))
        throw new TypeError('properties_list - setBtmPanelUnder : filter undefined');

      var filterRoot = filter.root;
      var keywords = filterRoot.find('.filter_keywords').val();
      var orderBy = filterRoot.find('.filter_orderBy').val();
      var rootKanbanList = this.rootKanbanList;
      var countResults = rootKanbanList.find('.kanban-items.ms-hack-scrollbar > div').length;

      if(keywords && keywords.length > 0 && countResults && countResults === 1){
        properties_kanban.root.find('div.kanban-items.ms-hack-scrollbar div.kb-row-v2 .btnActions-toggle i').click();
      }else if(orderBy && parseInt(orderBy) > 10 && parseInt(orderBy) < 16){
        properties_kanban.root.find('div.kanban-items.ms-hack-scrollbar div.kb-row-v2 div.apt_profit').click();
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  properties_filter.prototype.init = function(){
    try {
      var self = this;

      this.Keywords = null;
      this.Archive = 1;
      this.OrderBy = 16;
      this.OrderMode = "ASC";
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

  properties_filter.prototype.setListeners = function(){
    try {
      var self = this;
      var form_selector = this.root;
      var rootKanbanLists = this.parentRoot;
      var compactView = rootKanbanLists.find('.compactView');

      var showEnterIcon = function(divEl){
        divEl.addClass('show-icon_enter-text');
        setTimeout(function(){
          divEl.removeClass('show-icon_enter-text');
        }, 300); // 5 seconds
      };

      this.root.find('.prop_filter-btn').click(function(){
        self.Pagination.CurrentPage = 1;
        self.setFilters();
        properties_kanban.reload(function(){
          properties_manager.setBtmPanelUnder();
          toggleCompactItems();
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
         properties_kanban.reload(function(){
           toggleCompactItems();
         });
       }
     });

     this.parentRoot.find('.ms-list-header__right .right').click(function(event){
       event.stopImmediatePropagation();
       if(self.Pagination.CurrentPage && self.Pagination.CurrentPage > 0 && self.Pagination.CurrentPage < self.Pagination.TotalPages){
         self.Pagination.CurrentPage++;
         self.setFilters();
         properties_kanban.reload(function(){
           toggleCompactItems();
         });
       }
     });

     this.root.find('.filter_keywords').keyup(function(event){
       showEnterIcon(form_selector.find('.filter_keywords'));
     });

     this.root.find('.filter_keywords').keyup(
       debounce(function(e) {
         e.preventDefault();
         if (e.keyCode === 13) {
           $('.kanban-items').empty();
           self.root.find('.prop_filter-btn').click();
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

     function toggleCompactItems(){
       if(compactView.find('i').hasClass('fa-toggle-off')){
         $('.compactItem').css('display', 'flex');
       }else{
         $('.compactItem').css('display', 'none');
       }
     }

    } catch (e) {
      console.log(e.message);
    }
  }

  properties_filter.prototype.setFilters = function(){
    try {
      var self = this;

      this.Keywords = this.root.find('input.filter_keywords').val();
      this.Archive = this.root.find('select.filter_stato').val();
      this.OrderBy = this.root.find('select.filter_orderBy').val();
      this.OrderMode = this.root.find('select.filter_orderMode').val();

    } catch (e) {
      console.log(e.message);
    }
  }

  properties_row.prototype.init = function(){
    try {
      var self = this;

      this.listeners();
    } catch (e) {
      console.log(e.message);
    }
  }

  properties_row.prototype.setStructure = function(){
    try {
      var self = this;

      if(!this.item || !(this.item instanceof Appartamento))
        throw new TypeError('properties.js - properties_rows - setStructure : this.item undefined');

      var item = this.item;
      var matrix = item.row_matrix();

      var str = prop_row_struct.clone();
      str.find('.apt_title span').html(matrix.title);
      str.find('.apt_tot_rooms span').html(matrix.numeroStanze);
      str.find('.apt_auto span').html(matrix.postoAuto);
      str.find('.apt_zone span').html(matrix.zona);
      str.find('.apt_bagni span').html(matrix.bagni);
      str.find('.apt_balconi span').html(matrix.balconi);
      str.find('.apt_mq span').html(matrix.mq);
      str.find('.apt_sala span').html(matrix.sala);
      str.find('.apt_terrazzi span').html(matrix.terrazzi);
      str.find('.apt_inizio span').html(matrix.inizioContratto);
      str.find('.apt_fine span').html(matrix.fineContratto);
      /*str.find('.').html(matrix.);
      str.find('.').html(matrix.);
      str.find('.').html(matrix.);
      str.find('.').html(matrix.);*/

      if(item.PostoAuto && parseInt(item.PostoAuto) > 0){
        str.find('.apt_auto').css('color', '#03a9fa');
        str.find('.apt_auto').removeClass('cursor_default');
      }

      this.structure = str;

    } catch (e) {
      console.log(e.message);
    }
  }

  properties_row.prototype.listeners = function(){
    try {
      var self = this;

      if(!this.root)
        throw new TypeError('properties_row - listeners : this.root undefined');

      if(!this.item || !(this.item instanceof Appartamento))
        throw new TypeError('properties_row - listeners : this.item undefined');

      var root = this.root;
      var item = this.item;

      root.find(".kb-row-v2_right .kb-row-v2_col.apt_actions i").click(function(event){
        if(!root.find('.kb-row-v2_top .kb-row-v2_top__sub-right').hasClass('toggleIActions')){
          root.find('.kb-row-v2_top .kb-row-v2_top__sub-right').toggleClass('toggleIActions');
          root.find('.kb-row-v2_right .kb-row-v2_col.apt_actions .material-icons').css('color', '#ffd909');
        }else{
          root.find('.kb-row-v2_top .kb-row-v2_top__sub-right').toggleClass('toggleIActions');
          root.find('.kb-row-v2_right .kb-row-v2_col.apt_actions .material-icons').css('color', '#8f939c');
        }
      });

      root.find('.apt_rooms').click(function(){
        var apt = new Appartamento();
        apt.Id = item.Id;

        if(toggleBtnPanel('apt_rooms')){
          apt.setStanzeV2(function(){
            if(apt.Stanze_Rel && apt.Stanze_Rel.length > 0){
              var rooms = apt.Stanze_Rel;

              for (var i = 0; i < rooms.length; i++) {
                var room = rooms[i];
                var roomRow = new rooms_row();
                roomRow.item = room;
                roomRow.parentRoot = root;
                roomRow.init();
              }

            }else {
              bootbox.alert("Stanze non presenti.");
            }
          });
        }

      });

      root.find('.btnActions-toggle').click(function(){
        root.find('.apt_rooms').click();
      });

      root.find('.apt_profit').click(function(){
        var apt = item;

        if(toggleBtnPanel('apt_profit')){
          self.loadGuadagni();
        }

      });

      root.find('.apt_title').click(function(){
        var id = item.Id;
        window.open('../appartamenti.php?Id=' + id,'_blank');
      });

      root.find('.apt_auto').click(function(){
        var id = item.Id;
        window.open('../postiauto.php?IdAppartamento=' + id,'_blank');
      });

      function toggleBtnPanel(dataMode){
        var open = false;
        var btmPanel = root.find('.kb-row-v2_bottom.bottom-panel__btn-actions');
        var currentDataMode = btmPanel.attr('data-mode');
        var holdOpen = false;

        btmPanel.attr('data-mode', dataMode);

        if(!currentDataMode || currentDataMode == ''){
          open = true;
        }

        if(currentDataMode && currentDataMode.length > 0 && dataMode && dataMode.length > 0 && (currentDataMode !== dataMode)){
          btmPanel.empty();
          holdOpen = true;
          open = true;
        }

        if(!holdOpen){
          if(open){
            btmPanel.toggleClass('kb-sub-rows_toggle');
            root.find('.kb-row-v2_top .kb-row-v2_top__sub-left .kb-row-v2_right .btnActions-toggle .material-icons').html('expand_less');
          }else{
            btmPanel.toggleClass('kb-sub-rows_toggle');
            btmPanel.empty();
            btmPanel.attr('data-mode', '');
            root.find('.kb-row-v2_top .kb-row-v2_top__sub-left .kb-row-v2_right .btnActions-toggle .material-icons').html('expand_more');
          }
        }

        return open;
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  properties_row.prototype.loadBtnPanelOnDOM = function(){
    try {
      var self = this;


    } catch (e) {
      console.log(e.message);
    }
  }

  properties_row.prototype.loadGuadagni = function(){
    try {
      var self = this;

      if(!this.root)
        throw new TypeError('properties_row - loadGuadagno : this.root undefined');

      if(!this.item)
        throw new TypeError('properties_row - loadGuadagno : this.item undefined');

      var root = this.root;
      var item = this.item;

      var gAptEff = (new Number(item.GAptEff).formatMoney(2));
      var gAptDov = (new Number(item.GAptDov).formatMoney(2));
      var gRoomEff = (new Number(item.GRoomEff).formatMoney(2));
      var gRoomDov = (new Number(item.GRoomDov).formatMoney(2));
      var diffGRoom = (new Number(item.DiffGRoom).formatMoney(2));

      var str = apt_g_row_struct.clone();
      str.find('.apt_gAptEff span').html(gAptEff);
      str.find('.apt_gAptDov span').html(gAptDov);
      str.find('.apt_gRoomEff span').html(gRoomEff);
      str.find('.apt_gRoomDov span').html(gRoomDov);
      str.find('.apt_diffGRoom span').html(diffGRoom);

      root.find('.kb-sub-rows_toggle').html(str);

    } catch (e) {
      console.log(e.message);
    }
  }

  rooms_row.prototype.init = function(){
    try {
      var self = this;

      if(!this.item || !(this.item instanceof Appartamenti_Stanze))
        throw new TypeError('rooms_row - init : this.item undefined.');

      if(!this.parentRoot)
        throw new TypeError('rooms_row - init : this.parentRoot undefined.');

      var parentRoot = this.parentRoot;
      var btmPanel = parentRoot.find('.kb-row-v2_bottom');
      var item = this.item;

      this.setStructure();
      btmPanel.append(this.structure);
      this.index = btmPanel.find(' > div').length;
      this.root = btmPanel.find(' > div:nth-child(' + this.index + ')');
      this.listeners();

    } catch (e) {
      console.log(e.message);
    }
  }

  rooms_row.prototype.setStructure = function(){
    try {
      var self = this;

      if(!this.item || !(this.item instanceof Appartamenti_Stanze))
        throw new TypeError('rooms_row - setStructure : this.item undefined.');

      var item = this.item;

      var canone = (new Number(item.PrezzoDinamico).formatMoney(2));
      var sconto = (new Number(item.PrezzoScontato).formatMoney(2)) + ' + <i class="fas fa-fire-alt"></i>';
      var bagno = (item.Bagno && parseInt(item.Bagno) > 0) ? 'Privato' : 'In comune';
      var tv = (item.Tv && parseInt(item.Tv) > 0) ? 'Sì' : 'No';
      var balcone = (item.Balconi && parseInt(item.Balconi) > 0) ? 'Privato' : 'No';
      var avail = item.Availability ? ('<i class="far fa-calendar-alt icons-ms"></i>' + new Date(item.Availability).ddmmyyyy()) : null;
      var isBooked = item.isBooked;

      if(item.PrezzoScontato && !(parseFloat(item.PrezzoScontato) > 0))
        sconto = "0,00";

      var str = room_row_struct.clone();
      str.find('.room_title span').html('STANZA #' + item.Numero);
      str.find('.room_mq span').html(item.Mq + ' Mq');
      str.find('.room_rent span').html(canone + ' + <i class="fas fa-fire-alt"></i>');
      str.find('.room_discount span').html(sconto);
      str.find('.room_bagno span').html(bagno);
      str.find('.room_tv span').html(tv);
      str.find('.room_balcone span').html(balcone);
      if(avail){
        str.find('.room_bookStatus').css('color', '#02a8f3');
        str.find('.room_avail').html(avail);
        str.find('.room_bookStatus').removeClass('cursor_default');
      }

      if(isBooked && item.BookType){
        switch (parseInt(item.BookType)) {
          case 1:
            str.find('.room_bookStatus').html('<i class="far fa-calendar-check icons-ms"></i><span>Prenotata - Modalità normale</span>');
            break;
          case 2:
            str.find('.room_bookStatus').html('<i class="far fa-calendar-check icons-ms"></i><span>Prenotata - Modalità estesa</span>');
            break;
        }
      }

      this.structure = str;
    } catch (e) {
      console.log(e.message);
    }
  }

  rooms_row.prototype.listeners = function(){
    try {
      var self = this;

      if(!this.root)
        throw new TypeError('rooms_row - listeners : this.root undefined.');

      if(!this.item)
        throw new TypeError('rooms_row - listeners : this.item undefined.');

      var root = this.root;
      var parentRoot = this.parentRoot;
      var item = this.item;

      root.find('.room_title').click(function(){
        var id = item.Id;
        window.open('../stanze.php?Id=' + id,'_blank');
      });

      if(item.Availability){
        root.find('.room_bookStatus').click(function(){
          var admin = new Admin();
          admin.Load(function (){
              if(admin.isAdministrator() || admin.isAgente()){
                root.find('.kb-sub-rows_row-bottom').toggleClass('sub-rows__toggle');
                var isBooked = item.isBooked;
                if(isBooked){
                  root.find('.booking_remove').addClass('sub-rows__toggle');
                  root.find('.booking_addOne').removeClass('sub-rows__toggle');
                  root.find('.booking_addTwo').removeClass('sub-rows__toggle');
                }else{
                  root.find('.booking_remove').removeClass('sub-rows__toggle');
                  root.find('.booking_addOne').addClass('sub-rows__toggle');
                  root.find('.booking_addTwo').addClass('sub-rows__toggle');
                }
              }else{
                bootbox.alert("Non hai i permessi necessari per eseguire quest'azione.");
              }
          });

        });
      }

      root.find('.booking_remove').click(function(){
        item.isBooked = false;
        item.BookType = 0;
        item.setToggleBooking(function(result){
          if(result){
            root.find('.room_bookStatus').html('<i class="far fa-calendar-minus icons-ms"></i><span>Non prenotata</span>');
            root.find('.kb-sub-rows_row-bottom').toggleClass('sub-rows__toggle');
          }else{
            bootbox.alert('Attenzione, errore riscontrato. Richiedere supporto.');
          }
        });
      });

      root.find('.booking_addOne').click(function(){
        item.isBooked = true;
        item.BookType = 1;
        item.setToggleBooking(function(result){
          if(result){
            root.find('.room_bookStatus').html('<i class="far fa-calendar-check icons-ms"></i><span>Prenotata - Modalità normale</span>');
            root.find('.kb-sub-rows_row-bottom').toggleClass('sub-rows__toggle');
          }else{
            bootbox.alert('Attenzione, errore riscontrato. Richiedere supporto.');
          }
        });
      });

      root.find('.booking_addTwo').click(function(){
        item.isBooked = true;
        item.BookType = 2;
        item.setToggleBooking(function(result){
          if(result){
            root.find('.room_bookStatus').html('<i class="far fa-calendar-check icons-ms"></i><span>Prenotata - Modalità estesa</span>');
            root.find('.kb-sub-rows_row-bottom').toggleClass('sub-rows__toggle');
          }else{
            bootbox.alert('Attenzione, errore riscontrato. Richiedere supporto.');
          }
        });
      });

    } catch (e) {
      console.log(e.message);
    }
  }

})();
