function secIntt_statistiche(admin, intestatari_ui){
  this.admin = admin;
  this.intestatari_ui = intestatari_ui;
  //this.sectionNumber = 2;
  this.sectionNumber = 1;
}

function secIntt_morosi(admin, intestatari_ui){
  this.admin = admin;
  this.intestatari_ui = intestatari_ui;
  this.sectionNumber = 1;
}

function archived_tenants(admin, intestatari_ui){
  this.admin = admin;
  this.intestatari_ui = intestatari_ui;
  this.sectionNumber = 1;
}

function defaulter_noActive(admin, intestatari_ui){
  this.admin = admin;
  this.intestatari_ui = intestatari_ui;
  this.sectionNumber = 1;
}

function paymentReminderHistory(row_ui, floatingPanel){
  this.row_ui = row_ui;
  this.floatingPanel = floatingPanel;
}

(function(){

  function items_container(items, counter){
    this.items = items;
    this.counter = counter;
  }

  function emails_solleciti(drafts, tipoSollecito, rootOptionsPanel){
    this.drafts = drafts;
    this.tipoSollecito = tipoSollecito;// 1. soft 2.hard
    this.rootOptionsPanel = rootOptionsPanel;
  }

  function morosi_archive(pool, counter, rootKanbanList, rootArchiveBtn){
    this.pool = pool;
    this.counter = counter;
    this.rootKanbanList = rootKanbanList;
    this.rootArchiveBtn = rootArchiveBtn;
  }

  var itemsManager = new items_container();
  var emails = new emails_solleciti();
  var morosi_attivi = new secIntt_morosi();
  var morosi_usciti = new defaulter_noActive();
  var morosiArchive = new morosi_archive();
  var inquiliniArchiviati = new archived_tenants();
  var fileJSON_lastupdate = null;

  var clone = null;
  var rowStr = $('<div class="kanban-item ms-list-wide__kanban-item"><div class="tm-list-item"><div class="tm-input-row" style=" /*justify-content: flex-start;*/"><div class="tm-input-row__info row-double-line archive-checkbox" style="background: inherit; justify-content: center; border-radius: 0px !important; display: none;"><div class="tm-simple row-double-line_font" style="color: #8f939c !important;font-size: 13px !important;height: auto;"><div class="row-icon archive-checkbox__checkbox"><i class="material-icons">radio_button_unchecked</i></div></div></div><div class="tm-input-row__info row-double-line draft-checkbox" style="background: inherit;border-radius: 0px !important;justify-content: center; display : none;"><div class="tm-simple row-double-line_font" style="color: #8f939c !important;font-size: 13px !important;height: auto;"><div class="row-icon draft-checkbox__checkbox"><i class="material-icons">radio_button_unchecked</i></div></div></div><div class="tm-input-row__info row-double-line" style=" background: inherit; border-radius: 0px !important; flex-grow: 1; flex-basis: 0;"><div class="tm-simple row-double-line_font infoTenant-action" title="Apri scheda inquilino" style="color: #8f939c !important;font-size: 13px !important;height: auto;"><div class="row-icon"><i class="material-icons">person</i></div><div class="tm-simple__text infoIntestatario" style=" margin-left: 10px; max-width : none;white-space: normal;"><span></span></div></div><div class="tm-simple row-double-line_font infoRoom-action" title="Apri scheda stanza" style="margin-top: 10px;color: #02a8f3 !important;font-size: 13px !important;height: auto; justify-content: baseline;"><div class="row-icon"><i class="material-icons">hotel</i></div><div class="tm-simple__text infoIns" style=" margin-left: 10px;"><span></span></div></div></div><div class="tm-input-row__info row-double-line stats_actions" style="background: inherit;border-radius: 0px !important;flex-grow: 1;flex-basis: 0;cursor:default;"><div class="tm-simple row-double-line_font" style="color: #fff!important;font-size: 13px !important;height: auto;background-color: #69eb9e; border-radius:0px !important;"><div class="row-icon"><i class="material-icons">mood</i></div><div class="tm-simple__text totVersato" style=" margin-left: 10px; max-width : none;"><span></span></div></div><div class="tm-simple row-double-line_font" style="color: #fff !important;font-size: 13px !important;height: auto;background-color: #eb6969; border-radius: 0px!important;"><div class="row-icon"><i class="material-icons">mood_bad</i></div><div class="tm-simple__text totInRitardo" style=" margin-left: 10px; max-width : none;"><span></span></div></div><div class="tm-simple row-double-line_font" style="margin-top: 10px;color: #009688 !important;font-size: 13px !important;height: auto;justify-content: baseline;"><div class="row-icon"><i class="material-icons">insert_chart</i></div><div class="tm-simple__text totFatturato" style=" margin-left: 10px;"><span></span></div></div></div><div class="tm-input-row__info row-double-line" style="background: inherit;border-radius: 0px !important;flex-grow: 1;flex-basis: 0;"><div class="tm-simple row-double-line_font accountBalance-action" style="color: #8f939c !important;font-size: 13px !important;height: auto;"><div class="row-icon"><i class="material-icons">account_balance</i></div><div class="tm-simple__text" style=" margin-left: 10px; max-width : none;"><span>Situazione Economica</span></div></div><div class="tm-simple row-double-line_font storico-solleciti-action" style="color: #8f939c !important;font-size: 13px !important;height: auto;"><div class="row-icon"><i class="material-icons">gavel</i></div><div class="tm-simple__text" style=" margin-left: 10px; max-width : none;"><span></span></div></div></div><div class="tm-input-row__info row-double-line stats_actions" style=" background: inherit; border-radius: 0px !important; justify-content: flex-start; flex-grow: 1; flex-basis: 0;"><div class="tm-simple row-double-line_font sendEmail-action" title="Creare email" style="color: #8f939c !important;font-size: 13px !important;height: auto;"><div class="row-icon"><i class="material-icons">email</i></div><div class="tm-simple__text email_text" style=" margin-left: 10px; "><span></span></div></div><div class="tm-simple row-double-line_font phoneCall-action" style="color: #8f939c !important;font-size: 13px !important;height: auto;"><div class="row-icon"><i class="material-icons">phone</i></div><div class="tm-simple__text phone_text" style=" margin-left: 10px; "><span></span></div></div></div></div></div></div>');

  secIntt_statistiche.prototype.init = function(){
    try {
      var self = this;

      if(!this.admin)
        throw new TypeError("secIntt_morosi - init : this.admin undefined");

      if(!this.intestatari_ui)
        throw new TypeError("secIntt_morosi - init : this.intestatari_ui undefined");

      if(this.admin.canReadItt() || this.admin.isAdministrator() || this.admin.isContabile() || this.admin.isDataEntry() || this.admin.isDV()){

      this.intestatari_ui.setSection(this.sectionNumber);
      var rootKanbanLists = this.intestatari_ui.rootKanbanLists;
      rootKanbanLists.empty();
      clone = self;

      morosi_attivi.admin = this.admin;
      morosi_attivi.intestatari_ui = this.intestatari_ui;
      morosi_attivi.sectionNumber = this.sectionNumber;

      morosi_usciti.admin = this.admin;
      morosi_usciti.intestatari_ui = this.intestatari_ui;
      morosi_usciti.sectionNumber = this.sectionNumber;

      inquiliniArchiviati.admin = this.admin;
      inquiliniArchiviati.intestatari_ui = this.intestatari_ui;
      inquiliniArchiviati.sectionNumber = this.sectionNumber;

      var stats_chart = $('<div class="tm-input-row chartist-stats"><div class="tm-input-row__info row-double-line stats-morosi-vs-attivi" style="justify-content: center;background: inherit;border-radius: 0px !important;flex-grow: 1;flex-basis: 0;"><div class="ct-chart ct-perfect-fourth" style=""></div><div class="tm-simple text__solventi row-double-line_font" style="color: #52bb7d !important;font-size: 13px !important;height: auto;justify-content: center;"><div class="row-icon"><i class="material-icons">mood</i></div><div class="tm-simple__text" style=" margin-left: 10px; max-width : none;"><span></span></div></div><div class="tm-simple text__insolventi row-double-line_font" style="color: #eb6969 !important;font-size: 13px !important;height: auto;justify-content: center;"><div class="row-icon"><i class="material-icons">mood_bad</i></div><div class="tm-simple__text" style=" margin-left: 10px; max-width : none;"><span></span></div></div></div><div class="tm-input-row__info row-double-line stats-totFt-vs-totInRitardo" style="justify-content: center;background: inherit;border-radius: 0px !important;flex-grow: 1;flex-basis: 0;"><div class="ct-chart ct-perfect-fourth" style=""></div><div class="tm-simple text__inRitardo_low row-double-line_font" style="color: #31b8f5 !important;font-size: 13px !important;height: auto;justify-content: center;"><div class="tm-simple__text" style=" margin-left: 10px; max-width : none;"><span>Importi minori di 100€</span></div></div><div class="tm-simple text__inRitardo_medium row-double-line_font" style="color: #f5eb31 !important;font-size: 13px !important;height: auto;justify-content: center;"><div class="tm-simple__text" style=" margin-left: 10px; max-width : none;"><span>Importi che superano 100€ e minori di 1000€</span></div></div><div class="tm-simple text__inRitardo_high row-double-line_font" style="color: #f54831 !important;font-size: 13px !important;height: auto;justify-content: center;"><div class="tm-simple__text" style=" margin-left: 10px; max-width : none;"><span>Importi che superano 1000€</span></div></div><div class="tm-simple text__inRitardo row-double-line_font" style="border-top: 1px #7298b3 solid;color: #1f5c87 !important;font-size: 13px !important;height: auto;justify-content: center;"><div class="tm-simple__text" style=" margin-left: 10px; max-width : none;"><span></span></div></div><div class="tm-simple text__inRitardo_up100 row-double-line_font" style="color: #1f5c87 !important;font-size: 13px !important;height: auto;justify-content: center;"><div class="tm-simple__text" style=" margin-left: 10px; max-width : none;"></div></div></div></div>');
      rootKanbanLists.append(stats_chart);

      var send_options = $('<div class="send-options" style="display: flex;flex-direction: column;flex-wrap: wrap;justify-content: flex-start;margin: 15px;padding: 15px;background-color: #FCFCFC;border: 1px solid #e6e8ec;"><div style="display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: center;align-items: stretch;align-content: center;padding: 5px;"><div class="options-panel__counter" style=" display: flex; cursor: pointer; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center; align-content: center; font-family: proxima-nova-regular,Proxima Nova,Avenir Next,Segoe UI,Helvetica,Arial,sans-serif; font-size: 14px; color: #737373; padding: 5px;"><span>Inquilini selezionati (0)</span></div></div><div style="display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: center;align-items: stretch;align-content: center;padding: 5px;"><div class="options-panel__soft" style=" display: flex; cursor: pointer; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center; align-content: center; font-family: proxima-nova-regular,Proxima Nova,Avenir Next,Segoe UI,Helvetica,Arial,sans-serif; font-size: 14px; color: #737373; padding: 5px;"><i class="material-icons" style=" font-size: 15px; font-weight: bold; margin-right: 15px;">radio_button_unchecked</i><span>Email di 1° sollecito</span></div><div class="options-panel__hard" style=" display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center; align-content: center; font-family: proxima-nova-regular,Proxima Nova,Avenir Next,Segoe UI,Helvetica,Arial,sans-serif; font-size: 14px; color: #737373; padding: 5px; cursor: pointer;"><i class="material-icons" style=" font-size: 15px; font-weight: bold; margin-right: 15px;">radio_button_unchecked</i><span>Email di 2° sollecito</span></div></div><div style="display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: center;align-items: stretch;align-content: center;padding: 5px;margin-left: 10px;"><div class="options-panel__send" style=" display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center; align-content: center; font-family: proxima-nova-regular,Proxima Nova,Avenir Next,Segoe UI,Helvetica,Arial,sans-serif; font-size: 14px; color: #fff; padding: 5px 20px; cursor: pointer;background-color: #5cb85c; font-weight : bold; "><span>Invia</span></div></div><div style="display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: flex-start;align-items: stretch;align-content: center;padding: 5px;margin-left: 10px;"><div class="options-panel__deselect" style="display: none;flex-direction: row;flex-wrap: nowrap;justify-content: space-around;align-items: center;align-content: center;font-family: proxima-nova-regular,Proxima Nova,Avenir Next,Segoe UI,Helvetica,Arial,sans-serif;font-size: 14px;color: #fff;padding: 5px 20px;cursor: pointer;background-color: #FF9800;font-weight : bold;"><span>Deselezionare tutti</span></div></div></div>');

      rootKanbanLists.append(send_options);

      var aggiornamentoFileJSON = $('<div class="tm-simple fileJSONUpdate row-double-line_font" style="cursor: pointer;color: #fff!important;font-size: 16px !important;display: flex;justify-content: flex-start;height: auto;background-color:#1f5c87a1;margin-right: 0px; border-radius: 0px!important;"><div class="row-icon"><i class="material-icons">cached</i></div><div class="tm-simple__text infoIns" style=" margin-left: 10px; max-width : 100%; white-space: normal;"><span></span></div></div>');
      rootKanbanLists.append(aggiornamentoFileJSON);

      var jsonUpdate = new fileJOSN_update();
      jsonUpdate.root = rootKanbanLists.find('.fileJSONUpdate');
      jsonUpdate.intestatari_ui = this.intestatari_ui;
      jsonUpdate.init();

      var morosi_attivi_kanban = new kanban_list();
      morosi_attivi_kanban.parentRoot = rootKanbanLists;
      morosi_attivi_kanban.secTitle = "Ritardatari";
      morosi_attivi_kanban.itemsManager = morosi_attivi;
      morosi_attivi_kanban.init(function(){

        emails.rootOptionsPanel = rootKanbanLists.find('.send-options');
        emails.init();

        morosiArchive.rootKanbanList = morosi_attivi_kanban.root;
        morosiArchive.rootArchiveBtn = morosi_attivi_kanban.root.find('.tm-archive');
        morosiArchive.init();

        morosi_usciti_kanban = new kanban_list();
        morosi_usciti_kanban.parentRoot = rootKanbanLists;
        morosi_usciti_kanban.secTitle = "Finita Locazione ";
        morosi_usciti_kanban.itemsManager = morosi_usciti;
        morosi_usciti_kanban.init(function(){
          var inquiliniArchiviati_kanban = new kanban_list();
          inquiliniArchiviati_kanban.parentRoot = rootKanbanLists;
          inquiliniArchiviati_kanban.secTitle = "Inquilini archiviati";
          inquiliniArchiviati_kanban.itemsManager = inquiliniArchiviati;
          inquiliniArchiviati_kanban.init();
        });

      });
      }else{
        alert("Non hai i permessi per accedere a questa sezione!");
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  secIntt_morosi.prototype.loadElements = function(filtro, callback){
    try {
      var self = this;

      if(!clone)
        throw new TypeError('statistiche.js - secIntt_morosi - loadElements : clone undefined');

      if(!callback)
        throw new TypeError("secIntt_morosi - loadElements : this method needs a callback parameter!");

      var ins = new Inquilino_Stanza();

      var items = new Array();
      itemsManager.items = new Array();
      itemsManager.counter = 0;

      if(self.rootKanbanList.find('.ms-list-header__right').is(':empty')){
        self.rootKanbanList.find('.ms-list-header__right').html('<div class="tm-archive" style=" display: flex; align-items: center;"><span class="paginationTitle" style=" margin-right: 20px;"></span><button type="button" tabindex="-1" class="tm-button white archive-btn" style=" display: flex; align-items: center;"><i class="material-icons">archive</i></button></div>');
      }

      ins.loadDelayedFromJson(function(data){
        if(data && clone){
          fileJSON_lastupdate = new Date(data.lastUpdated.date);
          clone.intestatari_ui.rootKanbanLists.find('.fileJSONUpdate .infoIns span').html(fileJSON_lastupdate.friendlyFormat());
        }

        if(ins.Inquilino_Stanza && ins.Inquilino_Stanza.length > 0){
          var res = ins.Inquilino_Stanza;
          var totInRitardo__header = 0;
          var totInRitardo = (res.length && res) ? res.length : 0;
          var totInquiliniSolventi = (data && data.totIns) ? (parseInt(data.totIns) - totInRitardo) : 0;

          clone.intestatari_ui.rootKanbanLists.find('.tm-input-row .stats-morosi-vs-attivi .text__solventi .tm-simple__text').html(totInquiliniSolventi + ' inquilini solventi');
          clone.intestatari_ui.rootKanbanLists.find('.tm-input-row .stats-morosi-vs-attivi .text__insolventi .tm-simple__text').html(totInRitardo + ' inquilini insolventi');

          var data = {
            series: [totInquiliniSolventi, totInRitardo]
          };

          var sum = function(a, b) { return a + b };

          var chart1 = new Chartist.Pie('section.main-layout_content > section > div.sub-layout > div.sub-layout__content > section > section > div > div.fixed-header-layout__contents > div > section > div > div.tm-input-row > div.tm-input-row__info.row-double-line.stats-morosi-vs-attivi > div', data, {
            labelInterpolationFnc: function(value) {
              return Math.round(value / data.series.reduce(sum) * 100) + '%';
            }
          });

          var tot_inRitardo = 0;
          var tot_inRitardo_up100 = 0;
          var tot_inRitardo_low = 0;
          var tot_inRitardo_medium = 0;
          var tot_inRitardo_high = 0;

          for (var x = 0; x < res.length; x++) {
            var item = res[x];
            item.TotInRitardo = new Number(item.TotDovRealTime - item.TotVersato);
            item.TotVersato = new Number(item.TotVersato);
            item.TotFatturato = new Number(item.TotFatturato);

            if(item.TotInRitardo >= 100){
              tot_inRitardo_up100 += item.TotInRitardo;
            }

            tot_inRitardo += item.TotInRitardo;

            if(item.TotInRitardo >= 1000){
              tot_inRitardo_high++;
            }else if(item.TotInRitardo < 1000 && item.TotInRitardo > 100){
              tot_inRitardo_medium++;
            }else if(item.TotInRitardo < 100){
              tot_inRitardo_low++;
            }

          }

          tot_inRitardo = new Number(tot_inRitardo);
          clone.intestatari_ui.rootKanbanLists.find('.tm-input-row .stats-totFt-vs-totInRitardo .text__inRitardo .tm-simple__text').html('Importo totale di pagamenti in ritardo : ' + tot_inRitardo.formatMoney(2));

          tot_inRitardo_up100 = new Number(tot_inRitardo_up100);
          clone.intestatari_ui.rootKanbanLists.find('.tm-input-row .stats-totFt-vs-totInRitardo .text__inRitardo_up100 .tm-simple__text').html('Importo totale sopra i 100€ : ' + tot_inRitardo_up100.formatMoney(2));

          var data_chart2 = {
            series: [tot_inRitardo_low, tot_inRitardo_medium, tot_inRitardo_high]
          };

          var chart2 = new Chartist.Pie('section.main-layout_content > section > div.sub-layout > div.sub-layout__content > section > section > div > div.fixed-header-layout__contents > div > section > div > div.tm-input-row > div.tm-input-row__info.row-double-line.stats-totFt-vs-totInRitardo > div', data_chart2, {
            labelInterpolationFnc: function(value) {
              return Math.round(value / data_chart2.series.reduce(sum) * 100) + '%';
            }
          });

          res.sort(function(a, b){return b.TotInRitardo-a.TotInRitardo;});

          for (var i = 0; i < res.length; i++) {
            var row = new row_ui();
            row.item = res[i];

            var totInRitardo = (row.item.TotInRitardo instanceof Number) ? row.item.TotInRitardo : new Number(row.item.TotInRitardo);

            if(totInRitardo >= 100){
              totInRitardo__header++;
              row.setStructure();
              itemsManager.addItem(row);
              items.push(row);
            }

          }

          self.intestatari_ui.rootKanbanLists.find('.secTitle').html("Ritardatari (" + totInRitardo__header + ")");

          console.log(itemsManager);

        }

        callback(items);
      }, self.intestatari_ui);

    } catch (e) {
      console.log(e.message);
    }
  }

  archived_tenants.prototype.loadElements = function(filtro, callback){
    try {
      var self = this;

      if(!callback)
        throw new TypeError("archived_tenants - loadElements : this method needs a callback parameter!");

      var order = null;
      var page = 1;
      var limit = "100";

      order = (filtro && filtro.order) ? filtro.order : order;
      page = (filtro && filtro.page) ? filtro.page : page;
      limit = (filtro && filtro.limit) ? filtro.limit : limit;

      var ins = new Inquilino_Stanza();
      items = [];
      ins.loadControlloPagamenti_archived(order, page, limit, function(){
        if(ins.Inquilino_Stanza && ins.Inquilino_Stanza.length > 0){
          var res = ins.Inquilino_Stanza;
          self.rootKanbanList.find('.secTitle').html("Inquilini archiviati (" + res.length + ")");
          for (var i = 0; i < res.length; i++) {
            var row = new row_ui();
            row.item = res[i];
            row.item.TotInRitardo = new Number(row.item.TotDovRealTime - row.item.TotVersato);
            row.setStructure();

            items.push(row);
          }
        }

        callback(items);
      }, self.intestatari_ui);

    } catch (e) {
      console.log(e.message);
    }
  }

  secIntt_morosi.prototype.setTmpContent = function(){
    try {
      var self = this;

      if(!this.intestatari_ui)
        throw new TypeError("secIntt_morosi - setTmpContent : this.intestatari_ui undefined");

      if(!this.intestatari_ui.rootKanbanLists)
        throw new TypeError("secIntt_morosi - setTmpContent : this.intestatari_ui.rootKanbanLists undefined");

      var content = $('<div class="tm-add-button-panel__input toggle-btn" style="background: #c6c8cc;margin-top: 10px;cursor : pointer;"><div class="add-button ax-add-tag-button" style="width: auto;text-align: center;"><strong>Sezione in fase di sviluppo</strong></div></div>');
      var rootKanbanLists = this.intestatari_ui.rootKanbanLists;
      rootKanbanLists.empty();
      rootKanbanLists.append(content);

    } catch (e) {
      console.log(e.message);
    }
  }

  function row_ui(item, index, root, structure){
    this.item = item;
    this.index = index;
    this.root = root;
    this.structure = structure;
  }

  row_ui.prototype.setStructure = function(){
    try {
      var infoInquilino = ".infoIntestatario";
      var infoIns = ".infoIns";
      var infoTotVersato = ".totVersato";
      var infoTotDovRealTime = ".totInRitardo";
      var infoEmail_text = ".email_text";
      var infoPhone_text = ".phone_text";
      var stats_actions = ".stats_actions";

      var self = this;

      if(!this.item || !(this.item instanceof Inquilino_Stanza))
        throw new TypeError('statistiche.js - row_ui - setStructure : this.item undefined');

      var ins = this.item;
      if(!ins.Inquilino)
        throw new TypeError('statistiche.js - row_ui - setStructure : ins.Inquilino undefined');

      var inquilino = ins.Inquilino;
      var str = rowStr.clone();
      var totInRitardo = (ins.TotInRitardo instanceof Number) ? ins.TotInRitardo : new Number(ins.TotInRitardo);
      var totVersato = (ins.TotVersato instanceof Number) ? ins.TotVersato : new Number(ins.TotVersato);
      var totFatturato = (ins.TotFatturato instanceof Number) ? ins.TotFatturato : new Number(ins.TotFatturato);
      str.find(infoInquilino + ' span').append(ins.getTitle());
      str.find(infoIns + ' span').append(ins.getRoomTitle());
      str.find(infoEmail_text + ' span').append(inquilino.PrimaryEmail);
      str.find(infoPhone_text + ' span').append(inquilino.Telefono);
      str.find(stats_actions + ' .totVersato span').append(totVersato.formatMoney(2) + '€ versato');
      str.find(stats_actions + ' .totInRitardo span').append(totInRitardo.formatMoney(2) + '€ da versare');
      str.find(stats_actions + ' .totFatturato span').append(totFatturato.formatMoney(2) + '€ fatturato');

      if(this.item && this.item.ControlloPagamenti && parseInt(this.item.ControlloPagamenti) > 0){
        str.find('div.tm-input-row > div:nth-child(2)').after('<div class="tm-input-row__info row-double-line unarchive-row" style="background: inherit;border-radius: 0px !important;justify-content: center;display: grid;"><div class="tm-simple row-double-line_font" style="color: #8f939c !important;font-size: 13px !important;height: auto;"><div class="row-icon"><i class="material-icons">unarchive</i></div></div></div>');
      }

      this.structure = str;

    } catch (e) {
      console.log(e.message);
    }
  }

  row_ui.prototype.init = function(){
    try {
      var self = this;

      this.listeners();
      this.loadSollecitoStructure();
    } catch (e) {
      console.log(e.message);
    }
  }

  row_ui.prototype.loadSollecitoStructure = function(){
    try {
      var self = this;
      var text_sollecito = this.root.find('.storico-solleciti-action .tm-simple__text span');
      var root_sollecito = this.root.find('.storico-solleciti-action');

      var ins = this.item;

      /*ins.loadStoricoSolleciti(function(data){

        var storicoSolleciti = data.storicoSolleciti;

        if(storicoSolleciti && storicoSolleciti.length > 0){
          var lastSollecito = storicoSolleciti[0];
          var data_lastSollecito = new Date(lastSollecito.DataRegistrazione);
          text_sollecito.html('(' + storicoSolleciti.length + ') ' + 'Ultimo sollecito : ' + data_lastSollecito.ddmmyyyy());

        }else{
          text_sollecito.html('Nessun sollecito');
        }

      });*/

    } catch (e) {
      console.log(e.message);
    }
  }

  row_ui.prototype.listeners = function(){
    try {
      var self = this;
      if(!this.root)
        throw new TypeError("statistiche.js - row_ui - listeners : this.root undefined");

      var root = this.root;

      /*root.find('.check-out-action').click(function(event){
        console.log(self.item);
        var floatingPanel = new floatingPanelV2();
         floatingPanel.root = $('section.main-layout_content .tm-floating-panel-desktop-v2');
         floatingPanel.init();

         var rootSec_checkOut = floatingPanel.addNewSection('Generali');

      });*/

      root.find('.accountBalance-action').click(function(event){
        console.log(self.item);
        var floatingPanel = new floatingPanelV2();
         floatingPanel.root = $('section.main-layout_content .tm-floating-panel-desktop-v2');
         floatingPanel.init();

         var rootSec_checkOut = floatingPanel.addNewSection('Generali');
         var accBalance = new accountBalance();
         accBalance.row_ui = self;
         accBalance.floatingPanel = floatingPanel;
         accBalance.init();

      });

      root.find('.storico-solleciti-action').click(function(event){

        var ins = self.item;

        ins.loadStoricoSolleciti(function(data){
          var storicoSolleciti = data.storicoSolleciti;

          if(storicoSolleciti && storicoSolleciti.length > 0){
            var floatingPanel = new floatingPanelV2();
             floatingPanel.root = $('section.main-layout_content .tm-floating-panel-desktop-v2');
             floatingPanel.init();

             var rootSec_checkOut = floatingPanel.addNewSection('Storico');
             var reminderHistory = new paymentReminderHistory();
             reminderHistory.row_ui = self;
             reminderHistory.floatingPanel = floatingPanel;
             reminderHistory.init(storicoSolleciti);
          }

        });

      });

      root.find('.infoTenant-action').click(function(event){
        var id = self.item.IdInquilino;
        window.open('../_gestione/tenants.php?Id=' + id,'_blank');
      });

      root.find('.infoRoom-action').click(function(event){
        var id = self.item.IdStanza;
        window.open('../_gestione/stanze.php?Id=' + id,'_blank');
      });

      if(self.item.Inquilino && self.item.Inquilino.PrimaryEmail){
        root.find('.sendEmail-action').click(function(event){
          var email = self.item.Inquilino.PrimaryEmail;
          document.location.href = 'mailto:' + email;
        });
      }

      if(self.item.Inquilino && self.item.Inquilino.Telefono){
        root.find('.phoneCall-action').click(function(event){
          var phoneNumber = self.item.Inquilino.Telefono;
          document.location.href = 'tel:' + phoneNumber;
        });
      }

      //if(emails && emails.drafts){
        root.find('.draft-checkbox').click(function(event){
          if (!self.isChecked('.draft-checkbox .draft-checkbox__checkbox')) {
            emails.addDraft(self, function(){
              self.toggleCheckboxStatus('.draft-checkbox .draft-checkbox__checkbox');
              emails.updateCounter();
              console.log(emails);
            });
          }else{
            emails.removeDraft(self, function(){
              self.toggleCheckboxStatus('.draft-checkbox .draft-checkbox__checkbox');
              emails.updateCounter();
              console.log(emails);
            });
          }
        });
      /*}else{
        bootbox.alert("Errore durante la selezione. Richiedere supporto!");
      }*/

      root.find('.archive-checkbox').click(function(event){
        if (!self.isChecked('.archive-checkbox .archive-checkbox__checkbox')) {
          morosiArchive.addItem(self, function(){
            self.toggleCheckboxStatus('.archive-checkbox .archive-checkbox__checkbox');
            morosiArchive.updateCounterTxt();
            console.log(morosiArchive);
          });
        }else{
          morosiArchive.removeItem(self, function(){
            self.toggleCheckboxStatus('.archive-checkbox .archive-checkbox__checkbox');
            morosiArchive.updateCounterTxt();
            console.log(morosiArchive);
          });
        }
      });

      if(self.item.ControlloPagamenti && parseInt(self.item.ControlloPagamenti) > 0){
        root.find('.unarchive-row').click(function(){
          self.item.toggleControlloPagamenti(function(){
            self.root.remove();
            clone.intestatari_ui.rootKanbanLists.find('.fileJSONUpdate').click();
          });
        });
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  row_ui.prototype.toggleCheckbox = function(){
    try {
      var self = this;

      if(!this.root)
        throw new TypeError('row_ui - toggleCheckbox : this.root undefined');

      var root = this.root;

      root.find('.draft-checkbox').toggle();

    } catch (e) {
      console.log(e.message);
    }
  }

  row_ui.prototype.toggleCheckboxStatus = function(rootClass){
    try {
      var self = this;
      var root = this.root;
      var checkbox = root.find( rootClass + ' i');
      var stato = checkbox.html();

      if(stato === 'radio_button_checked'){
        checkbox.html('radio_button_unchecked');
      }else if(stato === 'radio_button_unchecked'){
        checkbox.html('radio_button_checked');
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  row_ui.prototype.setUnchecked = function(){
    try {
      var self = this;
      var root = this.root;
      var checkbox = root.find('.draft-checkbox .draft-checkbox__checkbox i');
      var stato = checkbox.html();

      if(stato === 'radio_button_checked'){
        checkbox.html('radio_button_unchecked');
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  row_ui.prototype.setChecked = function(){
    try {
      var self = this;
      var root = this.root;
      var checkbox = root.find('.draft-checkbox .draft-checkbox__checkbox i');
      var stato = checkbox.html();

      if(stato === 'radio_button_unchecked'){
        checkbox.html('radio_button_checked');
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  row_ui.prototype.isChecked = function(rootClass){
    try {
      var self = this;
      var root = this.root;
      var checkbox = root.find(rootClass + ' i');
      var stato = checkbox.html();
      var res = false;

      if(stato === 'radio_button_checked'){
        res = true;
      }

      return res;

    } catch (e) {
      console.log(e.message);
    }
  }

  function fileJOSN_update(root, intestatari_ui){
    this.root = root;
    this.intestatari_ui = intestatari_ui;
  }

  fileJOSN_update.prototype.init = function(){
    try {
      var self = this;

      if(!this.root)
        throw new TypeError('statistiche.js - fileJOSN_update - init : this.root undefined');

      this.listeners();

    } catch (e) {
      console.log(e.message);
    }
  }

  fileJOSN_update.prototype.listeners = function(){
    var self = this;

    this.root.click(function(event){
      var plus = 0;
      self.root.find('.infoIns span').html('Caricamento in corso');
      var refreshIntervalId = setInterval(function(){
        if(plus == 360)
          plus = 0;

        plus += 30;
        self.root.find('.row-icon').css('transform', 'rotate(' + plus + 'deg)');
      }, 1000);

      var ins = new Inquilino_Stanza();
      ins.updateJSON(function(res){
        if(!res){
          alert("Error");
        }
        var admin = new Admin();
        admin.Load(function (){
          clearInterval(refreshIntervalId);
          var secStats = new secIntt_statistiche();
          secStats.admin = admin;
          secStats.intestatari_ui = self.intestatari_ui;
          secStats.init();
        });
      });
    });
  }

  items_container.prototype.addItem = function(item){
    try {

      var self = this;

      if(!item)
        throw new TypeError('items_container - addItem : item undefined');

      if(!this.items)
        throw new TypeError('items_container - addItem : items undefined');

      this.counter++;
      item.key = this.counter;
      this.items.push(item);

    } catch (e) {
      console.log(e.message);
    }
  }

  items_container.prototype.removeItem = function(item){
    try {
      var self = this;

      if(!item)
        throw new TypeError("items_container - removeItem : item undefined");

      if(!item.key)
        throw new TypeError("items_container - removeItem : item.key undefined");

      if(this.items && this.items.length > 0 && item.Id !== -1){
        for (var i = 0; i < this.items.length; i++) {
          var element = this.items[i];
          if(item.key && element.key && item.key === element.key){
            //this.items[i].root.remove();
            //funzioni di row ui per mettere unchecked
            this.items.splice(i, 1);
            console.log(this);
          }
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  emails_solleciti.prototype.init = function(){
    try {
      var self = this;

      if(!fileJSON_lastupdate)
        throw new TypeError('fileJSON_lastupdate global parameter undefined');

      this.drafts = new Array();
      this.tipoSollecito = 0;

      this.listeners();
      //this.setRowsListeners();

    } catch (e) {
      console.log(e.message);
    }
  }

  emails_solleciti.prototype.listeners = function(){
    try {
      var self = this;

      if(!this.rootOptionsPanel)
        throw new TypeError('emails_solleciti - listeners : this.rootOptionsPanel undefined');

      var root = this.rootOptionsPanel;
      var checkbox_soft = root.find('.options-panel__soft');
      var checkbox_hard = root.find('.options-panel__hard');
      var send_btn = root.find('.options-panel__send');

      var minute = 60,
          hour = minute * 60,
          day = hour * 24,
          week = day * 7;

      send_btn.click(function(event){
        var admin = new Admin();
        admin.Load(function(){
          if(admin.isAdministrator() || admin.recuperoCrediti()){
            var errors = false;

            if(!fileJSON_lastupdate){
              errors = true;
              bootbox.alert("Errore : non è stato possibile rilevare l'ultimo aggiornamento dei ritardatari. Chiedere supporto.");
            }

            if(!self.drafts.length > 0){
              errors = true;
              bootbox.alert("Nessun inquilino selezionato!");
            }

            var delta = Math.round((+new Date - fileJSON_lastupdate) / 1000);
            if(Math.floor(delta / hour) < 4 && !errors){
              bootbox.confirm("Sollecitare via email a " + self.drafts.length + " inquilini?" , function(result){
                if(result){
                  console.log("Invio in corso...");
                  self.sendEmails();
                }
              });
            }else if(Math.floor(delta / hour) >= 4){
              bootbox.alert("L'ultimo aggiornamento dei solleciti supera le 4 ore come limite massimo. Si prega di aggiornarlo e riprovare.");
            }

          }else{
            bootbox.alert("Non hai i permessi necessari all'invio dei solleciti!");
          }
        });

      });

      checkbox_soft.click(function(event){
        var checkbox = $(this).find('i');
        var stato = checkbox.html();
        var items = null;
        if(itemsManager && itemsManager.items && itemsManager.items.length > 0){
          items = itemsManager.items;
        }

        self.drafts = [];

        if(checkbox_hard.find('i').html() === 'radio_button_checked'){
          self.resetItems(checkbox_hard.find('i'));
        }

        if(stato === 'radio_button_unchecked' && items){
          checkbox.html('radio_button_checked');
          self.tipoSollecito = 1;
          for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var ins = item.item;
            item.toggleCheckbox();
            /*if(ins.TotInRitardo >= 100){
              self.addDraft(item, function(){
                item.toggleCheckboxStatus('.draft-checkbox .draft-checkbox__checkbox');
              });
            }*/
          }
        }else if(stato === 'radio_button_checked' && items){
          self.resetItems(checkbox);
        }

        self.updateCounter();

      });

      checkbox_hard.click(function(event){
        var checkbox = $(this).find('i');
        var stato = checkbox.html();
        var items = null;
        if(itemsManager && itemsManager.items && itemsManager.items.length > 0){
          items = itemsManager.items;
        }

        self.drafts = [];

        if(checkbox_soft.find('i').html() === 'radio_button_checked'){
          self.resetItems(checkbox_soft.find('i'));
        }

        if(stato === 'radio_button_unchecked' && items){
          checkbox.html('radio_button_checked');
          self.tipoSollecito = 2;
          for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var ins = item.item;
            item.toggleCheckbox();
            /*if(ins.TotInRitardo >= 350){
              self.addDraft(item, function(){
                item.toggleCheckboxStatus('.draft-checkbox .draft-checkbox__checkbox');
              });
            }*/
          }
        }else if(stato === 'radio_button_checked' && items){
          self.resetItems(checkbox);
        }

        self.updateCounter();

      });

    } catch (e) {
      console.log(e.message);
    }
  }

  emails_solleciti.prototype.sendEmails = function(){
    try {
      var self = this;

      if(!this.drafts || !this.drafts.length > 0)
        throw new TypeError('emails_solleciti - sendEmails : nessuna email da inviare!');

      if(!this.rootOptionsPanel)
        throw new TypeError('emails_solleciti - sendEmails : this.rootOptionsPanel undefined');

      var root = this.rootOptionsPanel;
      var send_btn_text = root.find('.options-panel__send span');
      var checkbox_soft = root.find('.options-panel__soft');
      var checkbox_hard = root.find('.options-panel__hard');
      var sendingError = new Array();
      var correctlySent = new Array();
      var tot = this.drafts.length - 1;
      var drafts = this.drafts;
      var report = new Mail();

      var missingErrors = function(){
        if ((sendingError.length + correctlySent.length) === drafts.length) {
          console.log(sendingError);
          console.log(correctlySent);

          if(sendingError.length === 0){
            var items = itemsManager.items;
            for (var i = 0; i < items.length; i++) {
              var item = items[i];
              item.toggleCheckbox();
            }

            self.drafts = [];
            self.updateCounter();
            checkbox_soft.find('i').html('radio_button_unchecked');
            checkbox_hard.find('i').html('radio_button_unchecked');
          }else{
            self.drafts = [];
            for (var i = 0; i < sendingError.length; i++) {
              var errorItem = sendingError[i];
              self.addDraft(errorItem);
            }
            self.updateCounter();
          }

          send_btn_text.html("Invio");

          if(correctlySent.length > 0){
            var sent = "Sono state inviate " + correctlySent.length + " emails";
          }

          if(sendingError.length > 0){
            var errors = "Errore : " + sendingError.length + " emails non inviate";
          }

          var textAlert = "";
          textAlert = sent ? sent : "";
          textAlert += (errors && sent) ? "<br>" : "";
          textAlert += errors ? errors : "";

          bootbox.alert(textAlert);
          report.setReport(textAlert, "#report - Sono stati inviati nuovi solleciti");
          report.Send(function(){

          });

        }/*else{
          bootbox.alert("Attenzione : Errore durante l'invio dei solleciti. Richiedere supporto!");
          report.setReport("Si è verificato un errore durante l'invio dei solleciti. Effettuare verifiche su statistiche.js", "#report - Errore invio dei solleciti");
          report.Send(function(){

          });
        }*/
      }

      each(drafts, function(key, row, index){
        var setDraftHTMLContent = new Promise(function(resolve, reject){
          var html_content = new HTMLContent();

          if(!row.item || !row.item.Inquilino)
            reject(row);

          html_content.getSollecitoHTMLContent(row.item, self, function(html, subject, balance){

            if(!html || html instanceof TypeError)
              reject(row);

            if(!subject)
              reject(row);

            /*var win = window.open("", row.key, "");
            win.document.body.innerHTML = html;*/
            var parameters = {
              first : html_content,
              second : html,
              third : subject,
              fourth : balance
            };
            resolve(parameters);

          });

        });

        setDraftHTMLContent.then(function(parameters){
          var html_content = parameters.first;
          var html = parameters.second;
          var subject = parameters.third;
          var balance = parameters.fourth;

          var mail = new Mail();
          mail.init();
          mail.setNoReplyCustomers();

          mail.Content = html;
          html_content.setSollecito_EmailDefaultValues(row.item, mail, subject, function(){
            var send = new Promise(function(resolve, reject){
              mail.Send(function(suc){
                if (suc && suc.Success){
                  resolve(row);
                }else{
                  reject(row);
                }
              });
            });

            send.then(function(el) {
              correctlySent.push(el);
              var counter = correctlySent.length + sendingError.length;
              self.loader(counter);
              el.toggleCheckboxStatus('.draft-checkbox .draft-checkbox__checkbox');
              missingErrors();

              self.SaveSollecitiPagamenti(el, self.tipoSollecito, balance, function(){
                console.log("sollecito registrato");
              });

            }, function(el) {
              sendingError.push(el);
              var counter = correctlySent.length + sendingError.length;
              self.loader(counter);
              missingErrors();
            });

          });

        }, function(el) {
          sendingError.push(el);
          //missingErrors();
        }).catch(function(reason) {
            console.log('Handle rejected promise ('+reason+') here.');
        });

      });


    } catch (e) {
      console.log(e.message);
    }
  }

  emails_solleciti.prototype.updateCounter = function(){
    try {
      var self = this;

      var root = this.rootOptionsPanel;
      var counter_text = root.find('.options-panel__counter span');
      counter_text.html('Inquilini selezionati (' + this.drafts.length + ')');

    } catch (e) {
      console.log(e.message);
    }
  }

  emails_solleciti.prototype.loader = function(processedCounter){
    try {
      var self = this;
      var percent = 0;
      var totalEmails = this.drafts.length;

      if(!this.rootOptionsPanel)
        throw new TypeError('emails_solleciti - loader : this.rootOptionsPanel undefined');

      var root = this.rootOptionsPanel;
      var send_btn_text = root.find('.options-panel__send span');

      percent = processedCounter * 100 / totalEmails;

      send_btn_text.html("Invio al " + percent + "%");

    } catch (e) {
      console.log(e.message);
    }
  }

  /*Se inserivo i listeners all'interno di row_ui.listeners mi da errore. emails [emails_solleciti] e' una variabile globale che viene creata solo dopo il caricamento di ogni row. */
  emails_solleciti.prototype.setRowsListeners = function(){
    try {

      var self  = this;
      var items = null;
      if(itemsManager && itemsManager.items && itemsManager.items.length > 0){
        items = itemsManager.items;
      }

      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var ins = item.item;
        var root = item.root;

        root.find('.draft-checkbox').click(function(event){
          if (!item.isChecked('.draft-checkbox .draft-checkbox__checkbox')) {
            self.addDraft(item, function(){
              item.toggleCheckboxStatus('.draft-checkbox .draft-checkbox__checkbox');
              console.log(self);
            });
          }else{
            self.removeDraft(item, function(){
              item.toggleCheckboxStatus('.draft-checkbox .draft-checkbox__checkbox');
              console.log(self);
            });
          }
        });
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  emails_solleciti.prototype.resetItems = function(checkbox){
    try {
      var self = this;

      if(!checkbox)
        throw new TypeError('emails_solleciti - resetItems : checkbox parameter undefined');

      var stato = checkbox.html();
      var items = null;

      if(itemsManager && itemsManager.items && itemsManager.items.length > 0){
        items = itemsManager.items;
      }

      if(stato === 'radio_button_checked'){
        checkbox.html('radio_button_unchecked');
        this.tipoSollecito = 0;
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          if(item.isChecked('.draft-checkbox .draft-checkbox__checkbox')){
            item.toggleCheckboxStatus('.draft-checkbox .draft-checkbox__checkbox');
          }
          item.toggleCheckbox();
        }
      }


    } catch (e) {
      console.log(e.message);
    }
  }

  emails_solleciti.prototype.addDraft = function(draft, callback){
    try {

      var self = this;

      if(!draft)
        throw new TypeError('emails_solleciti - addDraft : draft undefined');

      if(!this.drafts)
        throw new TypeError('emails_solleciti - addDraft : items undefined');

      this.drafts.push(draft);

      if(callback){
        callback();
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  emails_solleciti.prototype.removeDraft = function(draft, callback){
    try {
      var self = this;

      if(!draft)
        throw new TypeError("emails_solleciti - removeDraft : draft undefined");

      if(!draft.key)
        throw new TypeError("emails_solleciti - removeDraft : draft.key undefined");

      if(this.drafts && this.drafts.length > 0){
        for (var i = 0; i < this.drafts.length; i++) {
          var element = this.drafts[i];
          if(draft.key && element.key && draft.key === element.key){
            //this.drafts[i].root.remove();
            //funzioni di row ui per mettere unchecked
            this.drafts.splice(i, 1);
            console.log(this);
          }
        }
      }

      if(callback){
        callback();
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  emails_solleciti.prototype.SaveSollecitiPagamenti = function(draft, tipoSollecito, balance, callback){
    try {
      var self = this;

      if(!draft)
        throw new TypeError('emails_solleciti - SaveSollecitiPagamenti : draft undefined');

      if(!callback)
        throw new TypeError('emails_solleciti - SaveSollecitiPagamenti : callback undefined');

      if(!draft.item)
        throw new TypeError('emails_solleciti - SaveSollecitiPagamenti : ins undefined');

      if(!tipoSollecito)
        throw new TypeError('emails_solleciti - SaveSollecitiPagamenti : tipoSollecito undefined');

      if(!balance)
        throw new TypeError('emails_solleciti - SaveSollecitiPagamenti : balance undefined');

      if(!balance.TotDovInRealTime)
        throw new TypeError('emails_solleciti - SaveSollecitiPagamenti : TotDovInRealTime undefined');

      if(!balance.TotVersato)
        throw new TypeError('emails_solleciti - SaveSollecitiPagamenti : TotVersato undefined');

      if(!balance.TotSollecitato){
        balance.TotSollecitato = parseFloat(balance.TotDovInRealTime) - parseFloat(balance.TotVersato);
      }

      var ins = draft.item;
      var sollecito = {
        IdInquilinoStanze : ins.Id,
        TipoSollecito : tipoSollecito,
        TotDovInRealTime : balance.TotDovInRealTime,
        TotVersato : balance.TotVersato,
        TotSollecitato : balance.TotSollecitato
      }

      var clone_sollecito = encodeURIComponent(JSON.stringify(sollecito));
      var actions_root = "./actions/";

      $.ajax({
          method: "POST",
          url: actions_root + 'inquilinoStanze.php?action=saveSollecitoPagamento',
          data: { data : clone_sollecito },
      }).done(function(res){
        if(res && res.success){
          callback(true);
        }else{
          callback(false);
        }
      }).fail(function(xhr, status, error) {
        DefaultErrorHandler(xhr, status, error);
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  defaulter_noActive.prototype.loadElements = function(filtro, callback){
    try {
      var self = this;

      if(!callback)
        throw new TypeError('defaulter_noActive - loadElements : this method needs a callback parameter!');

      var order = "";
      var page = 1;
      var limit = "100";
      var items = new Array();

      order = (filtro && filtro.order) ? filtro.order : order;
      page = (filtro && filtro.page) ? filtro.page : page;
      limit = (filtro && filtro.limit) ? filtro.limit : limit;

      var ins = new Inquilino_Stanza();
      /*ins.loadMorosiUsciti(order, page, limit, function(){
        if(ins.Inquilino_Stanza && ins.Inquilino_Stanza.length > 0){
          var res = ins.Inquilino_Stanza;
          res.sort(function(a, b){return b.TotInRitardo-a.TotInRitardo;});
          self.rootKanbanList.find('.secTitle').html("Finita Locazione (" + res.length + ")");
          for (var i = 0; i < res.length; i++) {
            var row = new row_ui();
            row.item = res[i];
            row.setStructure();
            items.push(row);
          }
        }

        callback(items);
      }, self.intestatari_ui);*/

      callback(items);

    } catch (e) {
      console.log(e.message);
    }
  }

  morosi_archive.prototype.init = function(){
    try {
      var self = this;

      this.pool = new Array();// array of row_ui
      this.counter = 0;
      this.listeners();

    } catch (e) {
      console.log(e.message);
    }
  }

  morosi_archive.prototype.listeners = function(){
    try {
      var self = this;

      if(!this.rootArchiveBtn)
        throw new TypeError('morosi_archive - listeners : this.rootArchiveBtn undefined');

      if(!this.rootKanbanList)
        throw new TypeError('morosiArchive - listeners : this.rootKanbanList undefined');

      var root = this.rootArchiveBtn;
      var title = root.find('.paginationTitle');
      var btn = root.find('.archive-btn');

      btn.click(function(event){
        event.stopImmediatePropagation();
        var admin = new Admin();
        admin.Load(function(){
          if(admin.isAdministrator() || admin.recuperoCrediti()){

            if(self.pool.length > 0){
              var toArchive = self.pool;//row ui
              console.log(self.pool);
              console.log("Archive process");
              self.archiveItems(function(){
                title.html('');
                self.pool = [];
                self.counter = 0;
                resetItems();
                toggleCheckbox();
                clone.intestatari_ui.rootKanbanLists.find('.fileJSONUpdate').click();
              });
            }else{
              title.html('');
              self.pool = [];
              self.counter = 0;
              resetItems();
              toggleCheckbox();
            }

          }
        });
      });

      function toggleCheckbox(){
        var items = self.rootKanbanList.find('.archive-checkbox');
        items.each(function( index ) {
          var value = $(this).css('display');
          if(value === 'none'){
            $( this ).css('display', 'grid');
          }else{
            $( this ).css('display', 'none');
          }
        });
      }

      function resetItems(){
        var items = self.rootKanbanList.find('.archive-checkbox .archive-checkbox__checkbox i');
        items.each(function( index ) {
          var value = $(this).html('radio_button_unchecked');
        });
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  morosi_archive.prototype.archiveItems = function(callback){
    try {
      var self = this;

      if(!this.pool)
        throw new TypeError('morosi_archive - archiveItems : this.pool undefined');

      if(!this.rootArchiveBtn)
        throw new TypeError('morosi_archive - archiveItems : this.rootArchiveBtn undefined');

      if(!this.rootKanbanList)
        throw new TypeError('morosiArchive - archiveItems : this.rootKanbanList undefined');

      if(!callback)
        throw new TypeError('morosiArchive - archiveItems : callback undefined!');

      var root = this.rootArchiveBtn;
      var title = root.find('.paginationTitle');
      var btn = root.find('.archive-btn');
      var sent = new Array();

      var els = this.pool;
      var el_text = els.length === 1 ? "elemento" : "elementi";

      if(els.length > 0){
        bootbox.confirm("Siete sicuri di voler archiviare " + els.length + " " + el_text + " ? Gli elementi in archivio vengono esclusi dal controllo pagamento e dal report.", function(result){
          if(result){
            console.log("Archiviazione in corso...");
            each(els, function(key, row, index){
              row.item.toggleControlloPagamenti(function(){
                sent.push(row);
                row.root.remove();
                whenEnd();
              });
            });
          }
        });
      }

      function whenEnd(){
        if(sent.length === els.length){
          if(callback){
            callback();
          }
        }
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  morosi_archive.prototype.addItem = function(item, callback){
    try {

      var self = this;

      if(!item)
        throw new TypeError('morosiArchive - addItem : item undefined');

      if(!this.pool)
        throw new TypeError('morosiArchive - addItem : pool undefined');

      this.counter++;
      item.key = this.counter;
      this.pool.push(item);

      if(callback){
        callback();
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  morosi_archive.prototype.removeItem = function(item, callback){
    try {
      var self = this;

      if(!item)
        throw new TypeError("morosiArchive - removeItem : item undefined!");

      if(!item.key)
        throw new TypeError("morosiArchive - removeItem : item.key");

      if(this.pool && this.pool.length > 0 && item.Id !== -1){
        for (var i = 0; i < this.pool.length; i++) {
          var element = this.pool[i];
          if(item.key && element.key && item.key === element.key){
            //funzioni di row ui per mettere unchecked
            this.pool.splice(i, 1);
          }
        }
      }

      if(callback){
        callback();
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  morosi_archive.prototype.updateCounterTxt = function(){
    try {
      var self = this;

      if(!this.rootArchiveBtn)
        throw new TypeError('morosi_archive - updateCounterTxt : this.rootArchiveBtn undefined');

      if(!this.rootKanbanList)
        throw new TypeError('morosiArchive - updateCounterTxt : this.rootKanbanList undefined');

      var root = this.rootArchiveBtn;
      var title = root.find('.paginationTitle');

      var tot = this.pool.length;

      title.html('Selezionati (' + tot + ')');

    } catch (e) {
      console.log(e.message);
    }
  }

  /*
   * #### BEGIN : Payment Reminder History ####
  */

  paymentReminderHistory.prototype.init = function(history){
    try {

      var self = this;

      if(!this.row_ui)
        throw new TypeError('paymentReminderHistory - init : row_ui undefined');

      if(!history || !(history.length > 0))
        throw new TypeError('paymentReminderHistory - init : history undefined');

      if(!this.floatingPanel)
        throw new TypeError('paymentReminderHistory - init : floatingPanel undefined');

      var row_ui = this.row_ui;
      if(!row_ui.item || !(row_ui.item instanceof Inquilino_Stanza))
        throw new TypeError('paymentReminderHistory - init :  undefined');

      var ins = row_ui.item;
      this.loadStructure(history);

    } catch (e) {
      console.log(e.message);
    }
  }

  paymentReminderHistory.prototype.setHeader = function(){
    try {
      var self = this;

      if(!this.floatingPanel)
        throw new TypeError("accountBalance - this.floatingPanel undefined");

      var floatingPanel = this.floatingPanel;
      var header = floatingPanel.rootHeader;
      console.log(header);
      var row_ui = this.row_ui;
      var ins = row_ui.item;

      var ins_nominativo = ins.Inquilino.getFormalNominativo();
      header.find('.tm-transaction-properties-header__title .tm-editable-textarea .tm-editable-textarea__content').html(ins_nominativo);

      var stanza_nominativo = $('<div><strong>Stanza :</strong> <span></span></div>');
      var stanza_nominativo__clone = stanza_nominativo.clone();
      stanza_nominativo__clone.find('span').html(ins.getRoomTitle());

      header.find('.description .description-meta.description-meta__top').html(stanza_nominativo__clone.html());


      var periodo_nominativo = $('<div><strong>Periodo di locazione : </strong><span></span></div>');
      var periodo_nominativo__clone = periodo_nominativo.clone();
      var periodo_matrix = ins.getDateMatrix();
      var periodo_text = periodo_matrix.moveIn.ddmmyyyy();
      periodo_text = periodo_matrix.moveOut ? (periodo_text + ' - ' + periodo_matrix.moveOut.ddmmyyyy()) : (periodo_text + ' - senza disdetta');
      periodo_nominativo__clone.find('span').html(periodo_text);

      header.find('.description .description-meta.description-meta__bottom').html(periodo_nominativo__clone.html());

    } catch (e) {
      console.log(e.message);
    }
  }

  paymentReminderHistory.prototype.loadStructure = function(history){
    try {

      var self = this;

      if(!history || !(history.length > 0))
        throw new TypeError('paymentReminderHistory - loadStructure : history undefined');

      if(!this.floatingPanel.root)
          throw new TypeError('accountBalance - loadStructure : this.floatingPanel.root undefined');

      var row_ui = this.row_ui;
      var ins = row_ui.item;

      var row_struct = $('<div style=" display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: stretch; align-content: center; background-color: #fff; margin-top: 10px; padding: 10px; color: #8f939c; "><div style=" display: flex; flex-direction: column; flex-wrap: nowrap; justify-content: space-around; align-items: stretch; align-content: center; flex-grow: 1; flex-basis: 0; "><div class="dataInvio" style=""></div><div style=" margin-top: 15px; font-weight: bold;">Tipo di sollecito :</div><div class="tipoSollecito"></div><div style=" margin-top: 15px; font-weight: bold;">Totale dovuto nella data indicata :</div><div class="totDovRealTime"></div></div><div style=" display: flex; flex-direction: column; flex-wrap: nowrap; justify-content: space-around; align-items: stretch; align-content: center; flex-grow: 1; flex-basis: 0; "><div style=" margin-top: 20px;"></div><div style=" margin-top: 15px; font-weight: bold; ">Totale importo sollecitato</div><div class="totSollecito" style="color: #eb6969;"></div><div style=" margin-top: 15px; font-weight: bold; ">Totale importo versato</div><div class="totVersato"></div></div><div></div></div>');

      var scrollbar = this.floatingPanel.root.find('.tm-property-tabs__content .tm-transaction-properties-pane.tm-hack-scrollbar');

      scrollbar.append($('<div class="kanban-item ms-list-wide__kanban-item"><div class="tm-list-item"><div class="tm-input-row"><div class="tm-input-row__info row-double-line" style="background: inherit;border-radius: 0px !important;flex-grow: 1;flex-basis: 0;justify-content: center;padding: 10px;"><div class="tm-simple row-double-line_font" style="color: #8f939c !important;font-size: 13px !important;height: auto;"><div class="tm-simple__text info_ft_header" style=" margin-left: 10px; max-width : none;"><span>Elenco Solleciti Effettuati</span></div></div></div></div></div></div>'));

      this.setHeader();

      for (var i = 0; i < history.length; i++) {
        var el = history[i];
        var row_struct_clone = row_struct.clone();

        var tipoSollecito = history[i].TipoSollecito;
        var dataInvio = new Date(history[i].DataRegistrazione);
        var totDovRealTime = new Number(history[i].TotDovInRealTime);
        var totVersato = new Number(history[i].TotVersato);
        var totSollecito = new Number(history[i].TotSollecitato);

        var text_tipo = "Primo";

        if(parseInt(tipoSollecito) === 2){
          text_tipo = "Secondo";
          row_struct_clone.find('.tipoSollecito').css('color', '#eb6969');
          row_struct_clone.find('.tipoSollecito').css('font-weight', 'bold');
        }

        var dataInvio_text = 'Inviato il ' + dataInvio.itaFormat();

        row_struct_clone.find('.tipoSollecito').html(text_tipo);
        row_struct_clone.find('.dataInvio').html(dataInvio_text);
        row_struct_clone.find('.totDovRealTime').html(totDovRealTime.formatMoney(2));
        row_struct_clone.find('.totSollecito').html(totSollecito.formatMoney(2));
        row_struct_clone.find('.totVersato').html(totVersato.formatMoney(2));

        scrollbar.append(row_struct_clone);

      }

    } catch (e) {
      console.log(e.message);
    }
  }

})();
