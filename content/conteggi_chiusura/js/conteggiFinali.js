function secIntt_conteggi(admin, intestatari_ui){
  this.admin = admin;
  this.intestatari_ui = intestatari_ui;
  this.sectionNumber = 1;
}

function secIntt_conteggiDaEffettuare(admin, rootKanbanList, intestatari_ui){
  this.admin = admin;
  this.intestatari_ui = intestatari_ui;
  this.rootKanbanList = rootKanbanList;
  this.sectionNumber = 1;
}

function secIntt_conteggiEffettuati(admin, rootKanbanList, intestatari_ui){
  this.admin = admin;
  this.intestatari_ui = intestatari_ui;
  this.rootKanbanList = rootKanbanList;
  this.sectionNumber = 2;
}

function secIntt_conteggiUScenti(admin, rootKanbanList, intestatari_ui){
  this.admin = admin;
  this.intestatari_ui = intestatari_ui;
  this.rootKanbanList = rootKanbanList;
  this.sectionNumber = 2;
}

function secIntt_conteggiInviati(admin, rootKanbanList, intestatari_ui){
  this.admin = admin;
  this.intestatari_ui = intestatari_ui;
  this.rootKanbanList = rootKanbanList;
  this.sectionNumber = 2;
}

function invoiceElements_creator(fdis, cds, fdi_counter, cd_counter){
  this.fdis = fdis;
  this.cds = cds;
  this.fdi_counter = fdi_counter;
  this.cd_counter = cd_counter;
}

function fdi_creator(parentRoot, root, index, structure, item){
  this.parentRoot = parentRoot;
  this.root = root;
  this.index = index;
  this.structure = structure;
  this.item = item;
}

function cd_creator(parentRoot, root, index, structure, item){
  this.parentRoot = parentRoot;
  this.root = root;
  this.index = index;
  this.structure = structure;
  this.item = item;
}

function riepilogo_conteggi(prevAction, nextAction, rootPanel){
  this.prevAction = prevAction;
  this.nextAction = nextAction;
  this.rootPanel = rootPanel;
}

function riepilogo_conteggiNoInvoice(prevAction, nextAction, rootPanel, ins){
  this.prevAction = prevAction;
  this.nextAction = nextAction;
  this.rootPanel = rootPanel;
  this.ins = ins;
}


(function(){

  var items = new Array();
  var rowStr = $('<div class="kanban-item ms-list-wide__kanban-item"><div class="tm-list-item"><div class="recap-kb-row"><div class="tm-input-row__info recap-kb-row__double-line" ><div class="recap-kb-row__item row-double-line_font infoTenant-action" title="Apri scheda inquilino" style="color: #8f939c !important;font-size: 13px !important;height: auto;"><div class="row-icon"><i class="material-icons">person</i></div><div class="tm-simple__text infoIntestatario" style=" margin-left: 10px; max-width: 170px; white-space: normal; overflow: hidden; text-overflow: ellipsis;"><span></span></div></div><div class="recap-kb-row__item row-double-line_font infoRoom-action" title="Apri scheda stanza" style="margin-top: 10px;color: #02a8f3 !important;font-size: 13px !important;height: auto; justify-content: baseline;"><div class="row-icon"><i class="material-icons">hotel</i></div><div class="tm-simple__text infoIns" style=" margin-left: 10px; max-width: 170px; white-space: normal; overflow: hidden; text-overflow: ellipsis;"><span></span></div></div></div><div class="tm-input-row__info recap-kb-row__double-line" style="background: inherit;border-radius: 0px !important;;"><div class="recap-kb-row__item row-double-line_font accountBalance-action" style="color: #8f939c !important;font-size: 13px !important;height: auto;"><div class="row-icon"><i class="material-icons">account_balance</i></div><div class="tm-simple__text" style=" margin-left: 10px; max-width : none;"><span>Situazione Economica</span></div></div></div><div class="tm-input-row__info recap-kb-row__double-line" style="background: inherit;border-radius: 0px !important;;"><div class="recap-kb-row__item row-double-line_font conteggioExcel-action" style="color: #397049 !important;font-size: 13px !important;height: auto;"><div class="row-icon"><i class="material-icons">insert_chart</i></div><div class="tm-simple__text" style=" margin-left: 10px; max-width : none;"><span>Scarica conteggio</span></div></div></div><div class="tm-input-row__info recap-kb-row__double-line row__third-column" ><div class="recap-kb-row__item row-double-line_font conteggiFinali-action" style="color: #8f939c !important;font-size: 13px !important;height: auto;"><div class="row-icon"><i class="material-icons">show_chart</i></div><div class="tm-simple__text" style=" margin-left: 10px; "><span>Conteggi di chiusura</span></div></div></div><div class="tm-input-row__info recap-kb-row__double-line totToPay-column" style="background: inherit;border-radius: 0px !important;display: none; cursor: default;"></div><div class="tm-input-row__info recap-kb-row__double-line sendConteggi-column" style="background: inherit;border-radius: 0px !important;display: none;"></div></div></div></div>');

  var conteggiDaEffettuare_manager = new secIntt_conteggiDaEffettuare();
  var conteggiEffettuati_manager = new secIntt_conteggiEffettuati();
  var conteggiUscenti_manager = new secIntt_conteggiUScenti();
  var conteggiInviati_manager = new secIntt_conteggiInviati();

  secIntt_conteggi.prototype.init = function(){
    try {
      var self = this;

      if(!this.admin)
        throw new TypeError("secIntt_conteggi - init : this.admin undefined");

      if(!this.intestatari_ui)
        throw new TypeError("secIntt_conteggi - init : this.intestatari_ui undefined");

      if(this.admin.isAdministrator() || this.admin.isContabile() || this.admin.isDataEntry()){
        this.intestatari_ui.setSection(this.sectionNumber);
        this.intestatari_ui.rootKanbanLists.empty();

        conteggiDaEffettuare_manager.admin = self.admin;
        conteggiDaEffettuare_manager.intestatari_ui = self.intestatari_ui;
        conteggiDaEffettuare_manager.sectionNumber = self.sectionNumber;

        conteggiEffettuati_manager.admin = self.admin;
        conteggiEffettuati_manager.intestatari_ui = self.intestatari_ui;
        conteggiEffettuati_manager.sectionNumber = self.sectionNumber;

        conteggiUscenti_manager.admin = self.admin;
        conteggiUscenti_manager.intestatari_ui = self.intestatari_ui;
        conteggiUscenti_manager.sectionNumber = self.sectionNumber;

        conteggiInviati_manager.admin = self.admin;
        conteggiInviati_manager.intestatari_ui = self.intestatari_ui;
        conteggiInviati_manager.sectionNumber = self.sectionNumber;

        var conteggiEffettuati_kanban = new kanban_list();
        conteggiEffettuati_kanban.parentRoot = self.intestatari_ui.rootKanbanLists;
        conteggiEffettuati_kanban.secTitle = "Conteggi da verificare ";
        conteggiEffettuati_kanban.itemsManager = conteggiEffettuati_manager;
        conteggiEffettuati_kanban.init(function(){
          var conteggiDaEffettuare_kanban = new kanban_list();
          conteggiDaEffettuare_kanban.parentRoot = self.intestatari_ui.rootKanbanLists;
          conteggiDaEffettuare_kanban.secTitle = "Elenco conteggi da effettuare";
          conteggiDaEffettuare_kanban.itemsManager = conteggiDaEffettuare_manager;
          conteggiDaEffettuare_kanban.init(function(){
            var conteggiUscenti_kanban = new kanban_list();
            conteggiUscenti_kanban.parentRoot = self.intestatari_ui.rootKanbanLists;
            conteggiUscenti_kanban.secTitle = "Elenco prossimi conteggi ";
            conteggiUscenti_kanban.itemsManager = conteggiUscenti_manager;
            conteggiUscenti_kanban.init(function(){
              var conteggiInviati_kanban = new kanban_list();
              conteggiInviati_kanban.parentRoot = self.intestatari_ui.rootKanbanLists;
              conteggiInviati_kanban.secTitle = "Ultimi conteggi inviati ";
              conteggiInviati_kanban.itemsManager = conteggiInviati_manager;
              conteggiInviati_kanban.init();
            });
          });
        });

      }else{
        alert("Non hai i permessi per accedere a questa sezione!");
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  secIntt_conteggi.prototype.setTmpContent = function(){
    try {
      var self = this;

      if(!this.intestatari_ui)
        throw new TypeError("secIntt_conteggi - setTmpContent : this.intestatari_ui undefined");

      if(!this.intestatari_ui.rootKanbanLists)
        throw new TypeError("secIntt_conteggi - setTmpContent : this.intestatari_ui.rootKanbanLists undefined");

      var content = $('<div class="tm-add-button-panel__input toggle-btn" style="background: #c6c8cc;margin-top: 10px;cursor : pointer;"><div class="add-button ax-add-tag-button" style="width: auto;text-align: center;"><strong>Sezione in fase di sviluppo</strong></div></div>');
      var rootKanbanLists = this.intestatari_ui.rootKanbanLists;
      rootKanbanLists.empty();
      rootKanbanLists.append(content);

    } catch (e) {
      console.log(e.message);
    }
  }

  /*
   * Verrà restituito un array che conterrà i risultati della query dato un filtro.
   *
  */
  secIntt_conteggiDaEffettuare.prototype.loadElements = function(filtro, callback){
    try {
      var self = this;

      if(!callback)
        throw new TypeError("secIntt_conteggiDaEffettuare - loadElements : this method needs a callback parameter!");

      var curdate = new Date();
      var order = "DataFine ASC";
      var page = 1;
      var limit = "100";

      order = (filtro && filtro.order) ? filtro.order : order;
      page = (filtro && filtro.page) ? filtro.page : page;
      limit = (filtro && filtro.limit) ? filtro.limit : limit;
      var ins = new Inquilino_Stanza();
      items = [];
      ins.loadConteggi(order, page, limit, function(){
        if(ins.Inquilino_Stanza && ins.Inquilino_Stanza.length > 0){
          var res = ins.Inquilino_Stanza;
          self.rootKanbanList.find('.secTitle').html("Elenco conteggi da effettuare (" + res.length + ")");
          for (var i = 0; i < res.length; i++) {
            var row = new row_ui();
            row.item = res[i];
            row.setStructure();

            //  Inserimento struttura personalizzata
            var row_struct = row.structure;
            var newInquilino_days_struct = $('<div class="recap-kb-row__item row-double-line_font newTenant_days" style="color: #44c13f !important;font-size: 13px !important;height: auto; cursor:default;"><div class="row-icon"><i class="material-icons">perm_identity</i></div><div class="tm-simple__text" style=" margin-left: 10px; "><span></span></div></div>');
            row_struct.find('.row__third-column').append(newInquilino_days_struct);
            var newInquilino_days_text = getStruct_NewTenant_days(row.item.newTenant_days);
            row_struct.find('.newTenant_days .tm-simple__text span').append(newInquilino_days_text);
            row.structure = row_struct;

            items.push(row);
          }
        }

        callback(items);
      }, self.intestatari_ui);

    } catch (e) {
      console.log(e.message);
    }
  }

  secIntt_conteggiEffettuati.prototype.loadElements = function(filtro, callback){
    try {
      var self = this;

      if(!callback)
        throw new TypeError("secIntt_conteggiEffettuati - loadElements : this method needs a callback parameter!");

      var curdate = new Date();
      var order = "ft.Data ASC";
      var page = 1;
      var limit = "";

      order = (filtro && filtro.order) ? filtro.order : order;
      page = (filtro && filtro.page) ? filtro.page : page;
      limit = (filtro && filtro.limit) ? filtro.limit : limit;

      var ins = new Inquilino_Stanza();
      items = [];
      ins.loadConteggiEffettuati(order, page, limit, function(){
        if(ins.Inquilino_Stanza && ins.Inquilino_Stanza.length > 0){
          var res = ins.Inquilino_Stanza;
          self.rootKanbanList.find('.secTitle').html("Conteggi da verificare (" + res.length + ")");
          for (var i = 0; i < res.length; i++) {
            var row = new row_ui();
            row.item = res[i];
            row.setStructure();
            var totToPay = new Number(row.item.TotToPay);

            //  Inserimento struttura personalizzata
            var row_struct = row.structure;

            var newInquilino_days_struct = $('<div class="recap-kb-row__item row-double-line_font newTenant_days" style="color: #44c13f !important;font-size: 13px !important;height: auto; cursor:default;"><div class="row-icon"><i class="material-icons">perm_identity</i></div><div class="tm-simple__text" style=" margin-left: 10px; "><span></span></div></div>');
            row_struct.find('.row__third-column').append(newInquilino_days_struct);
            var newInquilino_days_text = getStruct_NewTenant_days(row.item.newTenant_days);
            row_struct.find('.newTenant_days .tm-simple__text span').append(newInquilino_days_text);

            var totToPayColumn = $('<div class="recap-kb-row__item row-double-line_font" style="color: #8f939c !important;font-size: 13px !important;height: auto; cursor: default;"><div class="tm-simple__text" style=" margin-left: 10px; max-width : none;"><div>Totale a nostro credito : <span></span></div></div></div>');
            row_struct.find('.totToPay-column').append(totToPayColumn);

            var sendConteggiColumn = $('<div class="recap-kb-row__item row-double-line_font sendConteggi-column__btn" btnStatus="active" title="Invio diretto" style="color: #14699b !important;font-size: 13px !important;height: auto;"><div class="row-icon"><i class="material-icons">send</i></div><div class="tm-simple__text" style=" margin-left: 10px; max-width : none;"><span>Invio diretto</span></div></div>');
            row_struct.find('.sendConteggi-column').append(sendConteggiColumn);

            row_struct.find('.totToPay-column').css('display', 'flex');
            row_struct.find('.sendConteggi-column').css('display', 'flex');

            if(parseInt(row.item.FlagConteggi) === 1){
              row_struct.find('.conteggioExcel-action .row-icon i.material-icons').html('remove_circle');
              row_struct.find('.conteggioExcel-action .tm-simple__text span').html('Turistico senza fattura');
              row_struct.find('.conteggioExcel-action').attr('style', 'color: #f1b90e !important;font-size: 13px !important;height: auto;cursor: default;');
              row_struct.find('.conteggioExcel-action').removeClass('conteggioExcel-action');
            }

            row_struct.find('.tm-input-row > div:nth-child(1)').attr('style', 'background: inherit;border-radius: 0px !important;flex-grow: 2;flex-basis: 0;');

            row_struct.find('.totToPay-column .tm-simple__text span').append(totToPay.formatMoney(2) + ' €');

            row.structure = row_struct;

            items.push(row);
          }
        }

        callback(items);
      }, self.intestatari_ui);

    } catch (e) {
      console.log(e.message);
    }
  }

  secIntt_conteggiInviati.prototype.loadElements = function(filtro, callback){
    try {
      var self = this;

      if(!callback)
        throw new TypeError("secIntt_conteggiInviati - loadElements : this method needs a callback parameter!");

      var curdate = new Date();
      var order = " log.DataRegistrazione DESC  ";
      var page = 1;
      var limit = "60";

      order = (filtro && filtro.order) ? filtro.order : order;
      page = (filtro && filtro.page) ? filtro.page : page;
      limit = (filtro && filtro.limit) ? filtro.limit : limit;

      var ins = new Inquilino_Stanza();
      items = [];
      ins.loadConteggiInviati(order, page, limit, function(){
        if(ins.Inquilino_Stanza && ins.Inquilino_Stanza.length > 0){
          var res = ins.Inquilino_Stanza;
          self.rootKanbanList.find('.secTitle').html("Ultimi conteggi inviati (" + res.length + ")");
          for (var i = 0; i < res.length; i++) {
            var row = new row_ui();
            row.item = res[i];
            row.setStructure();

            //  Inserimento struttura personalizzata
            var row_struct = row.structure;

            if(parseInt(row.item.FlagConteggi) === 1){
              row_struct.find('.conteggioExcel-action .row-icon i.material-icons').html('remove_circle');
              row_struct.find('.conteggioExcel-action .tm-simple__text span').html('Turistico senza fattura');
              row_struct.find('.conteggioExcel-action').attr('style', 'color: #f1b90e !important;font-size: 13px !important;height: auto;cursor: default;');
              row_struct.find('.conteggioExcel-action').removeClass('conteggioExcel-action');
            }

            row.structure = row_struct;

            items.push(row);
          }
        }

        callback(items);
      }, self.intestatari_ui);

    } catch (e) {
      console.log(e.message);
    }
  }

  /*
   * Verrà restituito un array che conterrà i risultati della query dato un filtro.
   *
  */
  secIntt_conteggiUScenti.prototype.loadElements = function(filtro, callback){
    try {
      var self = this;

      if(!callback)
        throw new TypeError("secIntt_conteggiUScenti - loadElements : this method needs a callback parameter!");

      var curdate = new Date();
      var order = "DataFine ASC";
      var page = 1;
      var limit = "20";

      order = (filtro && filtro.order) ? filtro.order : order;
      page = (filtro && filtro.page) ? filtro.page : page;
      limit = (filtro && filtro.limit) ? filtro.limit : limit;

      var ins = new Inquilino_Stanza();
      items = [];
      ins.loadConteggiUscenti(order, page, limit, function(){
        if(ins.Inquilino_Stanza && ins.Inquilino_Stanza.length > 0){
          var res = ins.Inquilino_Stanza;
          self.rootKanbanList.find('.secTitle').html("Elenco prossimi conteggi (" + res.length + ")");
          for (var i = 0; i < res.length; i++) {
            var row = new row_ui();
            row.item = res[i];
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
      var self = this;

      if(!this.item || !(this.item instanceof Inquilino_Stanza))
        throw new TypeError('conteggiFinali.js - row_ui - setStructure : this.item undefined');

      var ins = this.item;
      if(!ins.Inquilino)
        throw new TypeError('conteggiFinali.js - row_ui - setStructure : ins.Inquilino undefined');

      var inquilino = ins.Inquilino;
      var str = rowStr.clone();
      str.find(infoInquilino + ' span').append(ins.getTitle());
      str.find(infoIns + ' span').append(ins.getRoomTitle());

      this.structure = str;

    } catch (e) {
      console.log(e.message);
    }
  }

  row_ui.prototype.init = function(){
    try {
      this.listeners();
    } catch (e) {
      console.log(e.message);
    }
  }

  row_ui.prototype.listeners = function(){
    try {
      var self = this;
      if(!this.root)
        throw new TypeError("conteggiFinali.js - row_ui - listeners : this.root undefined");

      var root = this.root;

      root.find('.accountBalance-action').click(function(event){
        var floatingPanel = new floatingPanelV2();
         floatingPanel.root = $('section.main-layout_content .tm-floating-panel-desktop-v2');
         floatingPanel.init();

         var rootSec_checkOut = floatingPanel.addNewSection('Generali');
         var accBalance = new accountBalance();
         accBalance.row_ui = self;
         accBalance.floatingPanel = floatingPanel;
         accBalance.init();

      });

      root.find('.conteggiFinali-action').click(function(event){
        var floatingPanel = new floatingPanelV2();
         floatingPanel.root = $('section.main-layout_content .tm-floating-panel-desktop-v2');
         floatingPanel.init();

         var rootSec_checkOut = floatingPanel.addNewSection('Conteggi');
         var conteggi = new conteggiFinali();
         conteggi.row_ui = self;
         conteggi.floatingPanel = floatingPanel;
         conteggi.init();

      });

      if(root.find('.sendConteggi-column').is(":visible")){
        root.find('.sendConteggi-column__btn').click(function(event){
          var button = $(this);
          var ins = self.item;

          var btnStatus = button.attr('btnStatus');

          if(btnStatus === 'active'){
            button.attr('btnStatus', 'disabled');

            if(ins.FlagConteggi && parseInt(ins.FlagConteggi) === 1){
              sendMailConteggi_noInvoice(button, ins, function(){
                var root_kanban_items = self.root.parent();
                self.root.remove();
                var counter = root_kanban_items.find(' > .kanban-item.ms-list-wide__kanban-item').length;
                conteggiEffettuati_manager.rootKanbanList.find('.secTitle').html("Conteggi da verificare (" + counter + ")");
              });
            }else{
              ins.loadConteggiFinali(function(invoice, accountBalance, ts_docF){
                sendMailConteggi(button, ts_docF, function(){
                  var root_kanban_items = self.root.parent();
                  self.root.remove();
                  var counter = root_kanban_items.find(' > .kanban-item.ms-list-wide__kanban-item').length;
                  conteggiEffettuati_manager.rootKanbanList.find('.secTitle').html("Conteggi da verificare (" + counter + ")");
                });
              });
            }
          }
        });
      }

      root.find('.infoTenant-action').click(function(event){
        var id = self.item.IdInquilino;
        window.open(URL_GEST + 'tenants.php?Id=' + id,'_blank');
      });

      root.find('.infoRoom-action').click(function(event){
        var id = self.item.IdStanza;
        window.open(URL_GEST + 'stanze.php?Id=' + id,'_blank');
      });

      root.find('.conteggioExcel-action').click(function(event){
        downloadConteggioExcel(self.item, function(){
          console.log("Excel - Download avvenuto");
        });
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  function sendMailConteggi(button, ts_docF, nextAction){
    try {

      if(!button)
        throw new TypeError('conteggiFinali.js - sendMailConteggi : button undefined');

      if(!ts_docF)
        throw new TypeError('conteggiFinali.js - sendMailConteggi : ts_docF undefined');

      if(!nextAction)
        throw new TypeError('conteggiFinali.js - sendMailConteggi : nextAction undefined');

      var htmlContent = new HTMLContent("", "", ts_docF);
      htmlContent.setDefaultUi();
      button.find('span').html('Invio in corso...');
      htmlContent.getInvoiceHTMLContent(function(html){
        var mail = new Mail();
        mail.init();
        mail.setNoReplyCustomers();
        mail.Content = html;
        mail.CC.push({ Mail : "segreteria@finlibera.it" });
        mail.ReplyTo = { Mail : "segreteria@finlibera.it" };
        htmlContent.setMailDefaultValues(mail, function(err){

          if(err && err instanceof TypeError){
            bootbox.alert("Errore durante l'elaborazione della email.");
          }else{
            var invoicePdf = new PDF();
            var tsDoc_Pdf = new TSDOC_PDF(ts_docF, invoicePdf);
            tsDoc_Pdf.setPDF(function(err){
              if(err && err instanceof TypeError){
                button.find('span').html('Inviare email');
                button.attr('btnStatus', 'active');
                bootbox.alert("Attenzione! Errore durante l'elaborazione del PDF. Richiedere indicazioni.");
              }else{
                tsDoc_Pdf.pdf.getBase64(function(base64){
                  if (base64) {
                    var att = new Attachment();
                    att.File = base64;
                    tsDoc_Pdf.getFileTitle(function(title){
                      if (title && title instanceof TypeError)
                        throw title;
                      att.Title = title;
                    });
                    mail.Attachment = att;
                    mail.Send(function(suc){
                      if (suc && suc.Success){
                        button.find('span').html('Inviare email');
                        button.attr('btnStatus', 'active');
                        nextAction();
                        bootbox.alert("Email inviata con successo!");
                      }else{
                        button.attr('btnStatus', 'active');
                        button.find('span').html('Inviare email');
                        bootbox.alert("Invio email fallito.");
                      }
                    });
                  }else {
                    console.log("Errore : base64");
                  }
                });
              }
            });
          }
        });
      });
    } catch (e) {
      console.log(e.message);
    }
  }

  function sendMailConteggi_noInvoice(button, ins, nextAction){
    try {

      if(!button)
        throw new TypeError('sendMailConteggi_noInvoice : button undefined.');

      if(!ins)
        throw new TypeError('sendMailConteggi_noInvoice : ins undefined.');

      if(!nextAction)
        throw new TypeError('sendMailConteggi_noInvoice : nextAction undefined');

      button.find('span').html('Invio in corso...');
      var template = new HTMLContent();
      var mail = new Mail();
      mail.init();

      var subject = "Conteggi di fine locazione";
      var inquilino = ins.Inquilino;
      var lang = inquilino.Lang;

      if(lang === "en"){
        subject = "Final report and payment history";
      }

      template.getNoInvoiceStructure(ins, function(html){
        mail.Content = html;
        mail.Subject = subject;
        mail.CC.push({ Mail : "segreteria@finlibera.it" });
        mail.ReplyTo = { Mail : "segreteria@finlibera.it" };
        mail.To.push({ Mail : inquilino.PrimaryEmail });

        if(inquilino.SecondaryEmail && inquilino.SecondaryEmail !== ""){
          mail.To.push({ Mail : inquilino.SecondaryEmail });
        }

        mail.setNoReplyCustomers();

        mail.Send(function(suc){
          if (suc && suc.Success){
            button.find('span').html('Inviare email');
            ins.conteggiSetIgnore(function(success){
              if(success){
                nextAction();
                bootbox.alert("Email inviata con successo!");
              }else{
                bootbox.alert('Errore imprevisto durante il salvataggio delle modifiche. Richiedere supporto!');
              }
            });

          }else{
            button.find('span').html('Inviare email');
            bootbox.alert("Invio email fallito.");
          }
        });
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  function downloadConteggioExcel(ins, callback){
    try {
      if(!ins)
        throw new TypeError("conteggiFinali.js - downloadConteggioExcel : ins undefined");

      if(!callback)
        throw new TypeError("conteggiFinali.js - downloadConteggioExcel : callback");

      window.open(URL_GEST + 'conteggiFileExcelGenerator.php?idIns=' + ins.Id);
    } catch (e) {
      console.log(e.message);
    }
  }

  function conteggiFinali(row_ui, floatingPanel){
    this.row_ui = row_ui;
    this.floatingPanel = floatingPanel;
  }

  conteggiFinali.prototype.init = function(){
    try {

      var self = this;

      if(!this.row_ui)
        throw new TypeError('conteggiFinali - init : row_ui undefined');

      if(!this.floatingPanel)
        throw new TypeError('conteggiFinali - init : floatingPanel undefined');

      var row_ui = this.row_ui;
      if(!row_ui.item || !(row_ui.item instanceof Inquilino_Stanza))
        throw new TypeError('conteggiFinali - init :  undefined');

      var ins = row_ui.item;
      this.loadStructure();
      this.loadElements();

    } catch (e) {
      console.log(e.message);
    }
  }

  conteggiFinali.prototype.setHeader = function(){
    try {
      var self = this;

      if(!this.floatingPanel)
        throw new TypeError("accountBalance - this.floatingPanel undefined");

      var floatingPanel = this.floatingPanel;
      var header = floatingPanel.rootHeader;
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

  conteggiFinali.prototype.loadElements = function(){
    try {
      var self = this;
      var row_ui = this.row_ui;
      var ins = row_ui.item;

      if(!this.floatingPanel.root)
        throw new TypeError('conteggiFinali - loadStructure : this.floatingPanel.root undefined');

      var scrollbar = this.floatingPanel.root.find('.tm-property-tabs__content .tm-transaction-properties-pane.tm-hack-scrollbar');

      ins.loadConteggiFinali(function(invoice, accountBalance, ts_docF, blockingTickets, missingTickets){
        var divider = $('<div class="divider"></div>');
        var noInvoice = false;

        if(ins.FlagConteggi && parseInt(ins.FlagConteggi) === 1){
          noInvoice = true;
        }

        if(invoice){

          if(!noInvoice){
            var ft_header_txt = "Conteggi di chiusura - preview";

            if(invoice.Numero && invoice.Data){
              ft_header_txt = invoice.getNominativo();
            }

            scrollbar.find('.kanban-item .tm-list-item .info_ft_header span').append(ft_header_txt);

            scrollbar.find('.kanban-item.ft-variables .ft-variables_list').append($('<div class="fc_ftItems"></div>'));
            scrollbar.find('.kanban-item.ft-variables .ft-variables_list').append($('<div class="fdi_ftItems"></div>'));

            var fds = invoice.FatturaDettagli.FatturaDettagli;
            var invoiceEl = new invoiceElements_creator();
            invoiceEl.fdis = new Array();
            invoiceEl.cds = new Array();
            invoiceEl.fdi_counter = 0;
            invoiceEl.cd_counter = 0;

            var fdi_root = scrollbar.find('.fdi_ftItems');
            var fc_root = scrollbar.find('.fc_ftItems');

            for (var fd in fds) {
              var fdi_item = new fdi_creator();
              fdi_item.parentRoot = fdi_root;
              fdi_item.item = fds[fd];
              fdi_item.init(invoiceEl);

              invoiceEl.addFDI(fdi_item);
            }

            var fcs = invoice.Fattura_Componenti.Fattura_Componenti;

            for (var fc in fcs){
              var cd_item = new cd_creator();
              cd_item.parentRoot = fc_root;
              cd_item.item = fcs[fc];
              cd_item.init(invoiceEl);

              invoiceEl.addCD(cd_item);
            }

            var fdi = new FatturaDettagliInquilino();
            fdi.Id = -1;
            fdi.IdFattura = invoice.Id;
            fdi.IdInquilinoStanze = ins.Id;
            fdi.Inizio = "";
            fdi.Fine = "";
            fdi.Totale = 0;
            fdi.Descrizione = "";

            var fdi_empty = new fdi_creator();
            fdi_empty.parentRoot = fdi_root;
            fdi_empty.item = fdi;
            fdi_empty.init(invoiceEl);

            fdi_empty.root.find('.ft-variables_title .ft-variables_title__text').click();

            invoiceEl.addFDI(fdi_empty);

            //scrollbar.append(divider.clone());

            var actionBtns = $('<div class="action-btns" style=" margin : 10px 0px; display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: stretch; align-content: stretch; "><div class="action-btns__save" style=" cursor : pointer; flex-grow: 1; flex-basis: 0; display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: center; align-items: stretch; align-content: stretch; padding: 10px; background-color: #cccccc; color: #fff; font-weight: bold; border-radius: 100px !important; margin: 2px;"><span>Salva</span></div></div>');

            if(parseInt(invoice.Id) > 0){
              actionBtns.append($('<div class="action-btns__pdf" style="cursor : pointer; flex-grow: 1; flex-basis: 0; display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: center; align-items: stretch; align-content: stretch; padding: 10px; background-color: #ff7166; color: #fff; font-weight: bold; border-radius: 100px !important; margin: 2px;"><i class="material-icons">file_download</i><span>PDF</span></div>'));
            }

            if(parseInt(ins.Turistico) === 1 && parseInt(invoice.Id) === 0){
              actionBtns.append('<div class="action-btns__noInvoice" style="cursor : pointer;flex-grow: 1;flex-basis: 0;display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: center;align-items: stretch;align-content: stretch;padding: 10px;background-color: #01c334;color: #fff;font-weight: bold;border-radius: 100px !important;margin: 2px;"><span>Senza Chiusura</span></div>');
            }

            scrollbar.append(actionBtns);

            scrollbar.find('.action-btns .action-btns__save').click(function(event){
              invoiceEl.setInvoiceElements(invoice);
              invoice.SaveRelationship(ins, function(res){
                if(res){
                  scrollbar.empty();
                  self.init();
                }else{
                  bootbox.alert("E' stato riscontrato un errore.");
                }
              });
            });

            if(parseInt(ins.Turistico) === 1){
              scrollbar.find('.action-btns .action-btns__noInvoice').click(function(event){
                ins.conteggiSetNoInvoice(function(success){
                  if(success){
                    var root_kanban_items = self.row_ui.root.parent();
                    self.row_ui.root.remove();
                    var counter = root_kanban_items.find(' > .kanban-item.ms-list-wide__kanban-item').length;
                    conteggiDaEffettuare_manager.rootKanbanList.find('.secTitle').html("Elenco conteggi da effettuare (" + counter + ")");
                    self.floatingPanel.closePanel();
                  }else{
                    bootbox.alert('Errore imprevisto durante il salvataggio delle modifiche. Richiedere supporto!');
                  }
                });
              });
            }

            if(parseInt(invoice.Id) > 0 && ts_docF){
              scrollbar.find('.action-btns .action-btns__pdf').click(function(event){
                var invoicePdf = new PDF();
                var tsDoc_Pdf = new TSDOC_PDF(ts_docF, invoicePdf);
                console.log(tsDoc_Pdf);
                tsDoc_Pdf.setPDF(function(err){
                  if(err && err instanceof TypeError){
                    bootbox.alert("Attenzione! Errore durante l'elaborazione del PDF. Richiedere indicazioni.");
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
            }

            //scrollbar.append(divider.clone());

          }

          if(noInvoice){
            scrollbar.find('.kanban-item .tm-list-item .info_ft_header span').append('Inquilino turistico senza chiusura');
          }

          var totFt_struct = $('<div class="kanban-item ms-list-wide__kanban-item"><div class="tm-list-item"><div class="tm-input-row"><div class="tm-input-row__info row-double-line" style="background: inherit;border-radius: 0px !important;flex-grow: 1;flex-basis: 0;justify-content: center;padding: 10px;"><div class="tm-simple row-double-line_font" style="color: #8f939c !important;font-size: 13px !important;height: auto;"><div class="info_text" style=" margin-left: 10px; max-width : none;"><span></span></div></div></div></div></div></div>');
          var ticket_list_struct = $('<div class="kanban-item ms-list-wide__kanban-item"><div class="tm-list-item"><div class="tickets-summary-list"><div class="tickets-summary-list__header"><span></span></div><div class="tickets-summary-list__body"></div></div></div></div>');
          var ticket_list_row_struct = $('<a target="_blank" class="tickets_list-row"><div class="tickets_list-row__container"><span></span><span></span><span></span></div></a>');
          var totNonContabilizzato_struct = $('<div class="kanban-item ms-list-wide__kanban-item"><div class="tm-list-item"><div class="tm-input-row"><div class="tm-input-row__info row-double-line" style="background: inherit;border-radius: 0px !important;flex-grow: 1;flex-basis: 0;justify-content: center;padding: 10px;"><div class="tm-simple row-double-line_font" style="color: #ecda34 !important;font-size: 13px !important;height: auto;"><div class="info_text" style=" margin-left: 10px; max-width : none;"><span></span></div></div></div></div></div></div>');
          var situazioneBollette_origin = $('<div class="kanban-item ms-list-wide__kanban-item"><div class="tm-list-item"><div class="tm-input-row" style="border: 2px solid #7fd0ff;"><div class="tm-input-row__info" style="background: inherit;border-radius: 0px !important;flex-grow: 1;flex-basis: 0;justify-content: center;padding: 10px;"><div class="tm-simple row-double-line_font" style="color: #8f939c !important;font-size: 13px !important;height: auto;justify-content: center;font-weight: bold!important;margin-bottom: 5px;"><div class="info_text" style="margin-left: 10px;max-width : none;color: #7fd0ff;border-bottom: 3px solid #7fd0ff;"><span>Riepilogo Situazione Bollette</span></div></div><div class="tm-simple row-double-line_font totBollette" style="color: #8f939c !important;font-size: 13px !important;height: auto;"><div class="info_text" style="margin-left: 10px;max-width : none;color: #7fd0ff;">Spese di bollette durante l&#8217;intera permanenza : <span></span></div></div><div class="tm-simple row-double-line_font totSpese" style="color: #8f939c !important;font-size: 13px !important;height: auto;border-bottom: 2px solid #7fd0ff;"><div class="info_text" style="margin-left: 10px;max-width : none;color: #7fd0ff;">Spese versate durante l&#8217;intera permanenza : <span></span></div></div><div class="tm-simple row-double-line_font totConguaglio" style="color: #8f939c !important;font-size: 13px !important;height: auto;"><div class="info_text" style="margin-left: 10px;max-width : none;color: #7fd0ff;">Totale Conguaglio : <span></span></div></div></div></div></div></div>');

          var totFt = new Number(0);

          if(!noInvoice){
            totFt = new Number(invoice.Totale);
          }

          var totFatturato = new Number(accountBalance.TotFatturato);
          var totVersato = new Number(accountBalance.TotVersato);
          var totDovControllo = new Number(accountBalance.TotDovControllo);
          var totDiffFtVers = totFatturato - totVersato;
          var totDaVersare = totFt + totDiffFtVers;
          var totErroreDifferenza = totFatturato - totDovControllo;
          var totBollette = new Number(accountBalance.TotBollette);
          var totSpese = new Number(accountBalance.TotSpese);
          var totConguaglio = new Number(accountBalance.TotConguaglio);
          var totDiscount = new Number(accountBalance.TotDiscounts);

          if((blockingTickets && blockingTickets.length > 0) || (missingTickets && missingTickets.length > 0))
            scrollbar.find('div.action-btns').hide();
            

          if(blockingTickets && blockingTickets.length > 0){
            var blockingTickets_struct = ticket_list_struct.clone();
            blockingTickets_struct.find('div.tickets-summary-list__header span').html('Elenco ticket non risolti');
            for (let index = 0; index < blockingTickets.length; index++) {
              const ticket = blockingTickets[index];
              var matrix = ticket.row_matrix();
              var blockingTickets_row_struct = ticket_list_row_struct.clone();
              blockingTickets_row_struct.attr('href', URL_GEST + 'tickets/#/main/ticket:' + ticket.Id + '/open');
              blockingTickets_row_struct.find('div.tickets_list-row__container > span:nth-child(1)').html(matrix.id);
              blockingTickets_row_struct.find('div.tickets_list-row__container > span:nth-child(2)').html(matrix.dataRichiesta);
              blockingTickets_row_struct.find('div.tickets_list-row__container > span:nth-child(3)').html(matrix.subject);
              blockingTickets_struct.find('div.tickets-summary-list__body').append(blockingTickets_row_struct);
            }

            scrollbar.append(blockingTickets_struct);

          }

          if(missingTickets && missingTickets.length > 0){
            var missingTickets_struct = ticket_list_struct.clone();
            missingTickets_struct.find('div.tickets-summary-list__header span').html('Elenco ticket da contabilizzare');
            for (let index = 0; index < missingTickets.length; index++) {
              const ticket = missingTickets[index];
              var matrix = ticket.row_matrix();
              var missingTickets_row_struct = ticket_list_row_struct.clone();
              missingTickets_row_struct.attr('href', URL_GEST + 'tickets/#/main/ticket:' + ticket.Id + '/registro');
              missingTickets_row_struct.find('div.tickets_list-row__container > span:nth-child(1)').html(matrix.id);
              missingTickets_row_struct.find('div.tickets_list-row__container > span:nth-child(2)').html(matrix.dataRichiesta);
              missingTickets_row_struct.find('div.tickets_list-row__container > span:nth-child(3)').html(matrix.subject);
              missingTickets_struct.find('div.tickets-summary-list__body').append(missingTickets_row_struct);
            }

            scrollbar.append(missingTickets_struct);

          }

          var totDovControllo_struct = totFt_struct.clone();
          totDovControllo_struct.find('.info_text span').append('Totale Dovuto - Formula : ' + totDovControllo.formatMoney(2));

          var totFatturato_struct = totFt_struct.clone();
          totFatturato_struct.find('.info_text span').append('Totale Fatturato  : ' + totFatturato.formatMoney(2));

          var totVersato_struct = totFt_struct.clone();
          totVersato_struct.find('.info_text span').append('Totale Versato  : ' + totVersato.formatMoney(2));

          var totDiscount_struct = totFt_struct.clone();
          totDiscount_struct.find('.info_text span').append('Totale Sconti : ' + totDiscount.formatMoney(2));

          var totFt_struct_clone_A = totFt_struct.clone();
          totFt_struct_clone_A.find('.info_text span').append('Totale fattura di chiusura contratto : ' + totFt.formatMoney(2));

          var totFt_struct_clone_B = totFt_struct.clone();
          totFt_struct_clone_B.find('.info_text span').append('Differenza tra fatturato e versato : ' + totDiffFtVers.formatMoney(2));
          var nonContabilizzato_exists = false;
          if(ins.ImportoNonContabilizzato && parseFloat(ins.ImportoNonContabilizzato) != 0){
            nonContabilizzato_exists = true;
            var totNonContabilizzato = new Number(ins.ImportoNonContabilizzato);
            var totNonContabilizzato_struct_clone = totNonContabilizzato_struct.clone();
            totNonContabilizzato_struct_clone.find('.info_text span').append('Importo non contabilizzato : ' + totNonContabilizzato.formatMoney(2));
            totDaVersare = totDaVersare /*- totNonContabilizzato*/;
          }

          var totFt_struct_clone_C = totFt_struct.clone();
          totFt_struct_clone_C.find('.info_text span').append('Totale a nostro credito : ' + totDaVersare.formatMoney(2));

          scrollbar.append(totDovControllo_struct);
          scrollbar.append(totFatturato_struct);

          if(totErroreDifferenza != 0){
            var totErroreDifferenza_struct = $('<div class="kanban-item ms-list-wide__kanban-item"><div class="tm-list-item"><div class="tm-input-row" style=" border: 2px solid #ff887f;"><div class="tm-input-row__info row-double-line" style="background: inherit;border-radius: 0px !important;flex-grow: 1;flex-basis: 0;justify-content: center;padding: 10px;"><div class="tm-simple row-double-line_font" style="color: #8f939c !important;font-size: 13px !important;height: auto;"><div class="info_text" style="margin-left: 10px;max-width : none;color: #ff887f;"><span>Attenzione! Il totale fatturato non coincide con il totale dovuto.</span></div></div><div class="tm-simple row-double-line_font" style="color: #8f939c !important;font-size: 13px !important;height: auto;"><div class="info_text erroreDiff" style="margin-left: 10px;max-width : none;color: #ff887f;"><span></span></div></div></div></div></div></div>');
            var totErroreDifferenza_struct_clone = totErroreDifferenza_struct.clone();
            var totErrore_text = 'Importo fatturato in più : ';
            if(totErroreDifferenza < 0){
              totErrore_text = 'Importo fatturato in meno : ';
            }
            totErroreDifferenza_struct_clone.find('.erroreDiff span').append(totErrore_text + totErroreDifferenza.formatMoney(2));
            scrollbar.append(totErroreDifferenza_struct_clone);
          }else{
            var totOkayDiff_struct = $('<div class="kanban-item ms-list-wide__kanban-item"><div class="tm-list-item"><div class="tm-input-row" style="border: 2px solid #62c66a;"><div class="tm-input-row__info row-double-line" style="background: inherit;border-radius: 0px !important;flex-grow: 1;flex-basis: 0;justify-content: center;padding: 10px;"><div class="tm-simple row-double-line_font" style="color: #8f939c !important;font-size: 13px !important;height: auto;"><div class="info_text" style="margin-left: 10px;max-width : none;color: #62c66a;"><span>Ottimo! Il fatturato coincide esattamente con il totale dovuto</span></div></div></div></div></div></div>');

            scrollbar.append(totOkayDiff_struct.clone());
          }

          scrollbar.append(totVersato_struct);

          if(totDiscount > 0){
            scrollbar.append(totDiscount_struct);
          }

          scrollbar.append(totFt_struct_clone_A);
          scrollbar.append(totFt_struct_clone_B);

          if(nonContabilizzato_exists){
            scrollbar.append(totNonContabilizzato_struct_clone);
          }

          scrollbar.append(totFt_struct_clone_C);

          var situazioneBollette = situazioneBollette_origin.clone();
          situazioneBollette.find('.totBollette span').append(totBollette.formatMoney(2));
          situazioneBollette.find('.totSpese span').append(totSpese.formatMoney(2));
          situazioneBollette.find('.totConguaglio span').append(totConguaglio.formatMoney(2));

          scrollbar.append(situazioneBollette);

          //scrollbar.append(divider.clone());

          var riepilogoBtn = $('<div class="action-btns" style=" display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: stretch; align-content: stretch; "><div class="action-btns__riepilogoEmail" style="cursor : pointer;flex-grow: 1;flex-basis: 0;display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: center;align-items: stretch;align-content: stretch;padding: 10px;background-color: #14699b;color: #fff;font-weight: bold;border-radius: 100px !important;margin: 2px;"><span>Proseguire con il riepilogo...</span></div></div>');

          var riepilogoBtn_NoInvoice = $('<div class="action-btns" style=" display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: stretch; align-content: stretch; "><div class="action-btns__riepilogoEmail_NoInvoice" style="cursor : pointer;flex-grow: 1;flex-basis: 0;display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: center;align-items: stretch;align-content: stretch;padding: 10px;background-color: #14699b;color: #fff;font-weight: bold;border-radius: 100px !important;margin: 2px;"><span>Proseguire con il riepilogo...</span></div></div>');

          if(parseInt(invoice.Id) > 0 && ts_docF){
            scrollbar.append(riepilogoBtn.clone());
            scrollbar.find('.action-btns .action-btns__riepilogoEmail').click(function(){
              scrollbar.empty();
              var riepilogo = new riepilogo_conteggi();
              riepilogo.prevAction = function(){
                console.log("PROVA PREVACTION");
                scrollbar.empty();
                self.init();
              }

              riepilogo.nextAction = function(){
                var root_kanban_items = self.row_ui.root.parent();
                self.row_ui.root.remove();
                var counter = root_kanban_items.find(' > .kanban-item.ms-list-wide__kanban-item').length;
                conteggiEffettuati_manager.rootKanbanList.find('.secTitle').html("Conteggi da verificare (" + counter + ")");
                self.floatingPanel.closePanel();
              }
              riepilogo.rootPanel = scrollbar;
              riepilogo.ts_docF = ts_docF;
              riepilogo.init(self.row_ui.item);
            });
          }

          if(ins.FlagConteggi && parseInt(ins.FlagConteggi) === 1){
            scrollbar.append(riepilogoBtn_NoInvoice.clone());
            scrollbar.find('.action-btns .action-btns__riepilogoEmail_NoInvoice').click(function(){
              scrollbar.empty();
              var riepilogo = new riepilogo_conteggiNoInvoice();
              riepilogo.ins = ins;
              riepilogo.prevAction = function(){
                scrollbar.empty();
                self.init();
              }

              riepilogo.nextAction = function(){
                var root_kanban_items = self.row_ui.root.parent();
                self.row_ui.root.remove();
                var counter = root_kanban_items.find(' > .kanban-item.ms-list-wide__kanban-item').length;
                conteggiEffettuati_manager.rootKanbanList.find('.secTitle').html("Conteggi da verificare (" + counter + ")");
                self.floatingPanel.closePanel();
              }
              riepilogo.rootPanel = scrollbar;
              riepilogo.init();
            });
          }

        }

      });

    } catch (e) {
      console.log(e.message);
    }
  }

  conteggiFinali.prototype.loadStructure = function(){
    try {
      var self = this;

      if(!this.floatingPanel.root)
        throw new TypeError('conteggiFinali - loadStructure : this.floatingPanel.root undefined');

      var scrollbar = this.floatingPanel.root.find('.tm-property-tabs__content .tm-transaction-properties-pane.tm-hack-scrollbar');
      var structure = $('<div class="kanban-item ms-list-wide__kanban-item"><div class="tm-list-item"><div class="tm-input-row" style="background: #215b86;"><div class="tm-input-row__info row-double-line" style="background: #215b86;border-radius: 0px !important;flex-grow: 1;flex-basis: 0;justify-content: center;padding: 10px;"><div class="tm-simple row-double-line_font" style="color: #ffffff !important;font-size: 13px !important;height: auto;"><div class="tm-simple__text info_ft_header" style=" margin-left: 10px; max-width : none;"><span></span></div></div></div></div></div></div><div class="kanban-item ms-list-wide__kanban-item ft-variables"><div class="tm-list-item"><div class="tm-input-row"><div class="tm-input-row__info row-double-line ft-variables_list" style=" background: inherit; border-radius: 0px !important; flex-grow: 1; flex-basis: 0;"></div></div></div></div>');

      scrollbar.append(structure.clone());
      this.setHeader();

    } catch (e) {
        console.log(e.message);
    }
  }

  fdi_creator.prototype.init = function(invoiceElements){
    try {

      var self = this;

      if(!this.parentRoot)
        throw new TypeError("fdi_creator - init : this.parentRoot undefined");

      if(!this.item)
        throw new TypeError("fdi_creator - init : this.item undefined");

      if(!invoiceElements)
        throw new TypeError("fdi_creator - init : invoiceElements undefined");

      this.setStructure();
      this.loadElement();
      this.setListeners(invoiceElements);
    } catch (e) {
      console.log(e.message);
    }
  }

  fdi_creator.prototype.setStructure = function(){
    try {
      var self = this;
      var item = this.item;

      var str = $('<div style="font-family: consolas;display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: space-between;align-items: stretch;align-content: stretch;padding: 7px;"><div class="fdi_ftItems_btns"><i class="material-icons deleteBtn" style=" color: #F44336;">remove_circle</i><i class="material-icons radioBtn">radio_button_unchecked</i></div><div class="ft-variables_title" style=" flex-grow: 1; flex-basis: 0; margin-left: 10px;"><div class="ft-variables_title__text"></div><input type="text" placeholder="Titolo" value="" style=" position: relative; width: 100%; display: none;"></div><div class="ft-variables_price" style="margin-left: 30px;white-space: nowrap;"><div class="ft-variables_price__text" style="display: block;"></div><input type="number" placeholder="Importo" value="" style="position: relative;width: 100%;display: none;"></div></div>');

      if(item.Iva && parseInt(item.Iva) > 0){
        str.find('.radioBtn').html('radio_button_checked');
      }

      var matrix = item.getPDFMatrix();
      var row = str.clone();
      row.find('.ft-variables_title .ft-variables_title__text').html(matrix.Title);
      row.find('.ft-variables_price .ft-variables_price__text').append(matrix.Amount);

      this.structure = row;

    } catch (e) {
      console.log(e.message);
    }
  }

  fdi_creator.prototype.loadElement = function(){
    try {
      var self = this;

      if(!this.structure)
        throw new TypeError('fdi_creator - loadElement : this.structure undefined');

      this.parentRoot.append(this.structure);
      this.index = this.parentRoot.find(' > div').length;
      this.root = this.parentRoot.find(' > div:nth-child(' + this.index + ')');

    } catch (e) {
      console.log(e.message);
    }
  }

  fdi_creator.prototype.setListeners = function(invoiceElements){
    try {
      var self = this;
      var root = this.root;

      root.find('.deleteBtn').click(function(){
        invoiceElements.removeFDI(self);
      });

      root.find('.radioBtn').click(function(){
        self.item.switchIva();

        if(parseInt(self.item.Iva) > 0){
          root.find('.radioBtn').html('radio_button_checked');
        }else{
          root.find('.radioBtn').html('radio_button_unchecked');
        }
      });

      root.find('.ft-variables_title .ft-variables_title__text').click(function(){
        var title = $(this).html();
        $(this).toggle();
        root.find('.ft-variables_title input').toggle().focus().val(title);

      });

      root.find('.ft-variables_title input').keydown(function(event){
        var keyCode = event.keyCode;

        if (keyCode === 13 && $(this).val() !== "") {
          var title = $(this).val();

          if(self.item.Id === -1){
            self.item.Id = 0;
            var fdi = new FatturaDettagliInquilino();
            fdi.Id = -1;
            fdi.IdFattura = self.IdFattura;
            fdi.IdInquilinoStanze = self.IdInquilinoStanze;
            fdi.Inizio = "";
            fdi.Fine = "";
            fdi.Totale = 0;
            fdi.Descrizione = "";

            var fdi_empty = new fdi_creator();
            fdi_empty.parentRoot = self.parentRoot;
            fdi_empty.item = fdi;
            fdi_empty.init(invoiceElements);

            fdi_empty.root.find('.ft-variables_title .ft-variables_title__text').click();
            invoiceElements.addFDI(fdi_empty);
          }

          self.item.setDescrizione(title);

          var matrix = self.item.getPDFMatrix();
          $(this).toggle();
          root.find('.ft-variables_title .ft-variables_title__text').html('').toggle().html(matrix.Title);
        }
      });

      root.find('.ft-variables_price .ft-variables_price__text').click(function(){
        var price = self.item.Totale ? self.item.Totale : 0;
        $(this).toggle();
        root.find('.ft-variables_price input').toggle().focus().val(price);

      });

      root.find('.ft-variables_price input').keydown(function(event){
        var keyCode = event.keyCode;

        if (keyCode === 13) {
          var price = $(this).val();
          self.item.setTotale(price);

          var matrix = self.item.getPDFMatrix();
          $(this).toggle();
          root.find('.ft-variables_price .ft-variables_price__text').html('').toggle().html(matrix.Amount);
        }
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  cd_creator.prototype.init = function(invoiceElements){
    try {

      var self = this;

      if(!this.parentRoot)
        throw new TypeError("cd_creator - init : this.parentRoot undefined");

      if(!this.item)
        throw new TypeError("cd_creator - init : this.item undefined");

      if(!invoiceElements)
        throw new TypeError("cd_creator - init : invoiceElements undefined");

      this.setStructure();
      this.loadElement();
      this.setListeners(invoiceElements);
    } catch (e) {
      console.log(e.message);
    }
  }

  cd_creator.prototype.setStructure = function(){
    try {
      var self = this;
      var item = this.item;

      var str = $('<div style="font-family: consolas;display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: space-between;align-items: stretch;align-content: stretch;padding: 7px;"><div class="cd_ftItems_btns"><i class="material-icons deleteBtn" style=" color: #F44336;">remove_circle</i></div><div class="ft-variables_title" style=" flex-grow: 1; flex-basis: 0; margin-left: 10px;"></div><div class="ft-variables_price" style="margin-left: 30px;white-space: nowrap;"></div></div>');

      var matrix = item.getPDFMatrix();
      var row = str.clone();
      row.find('.ft-variables_title').html(matrix.Title);
      row.find('.ft-variables_price').append(matrix.Amount);

      this.structure = row;

    } catch (e) {
      console.log(e.message);
    }
  }

  cd_creator.prototype.loadElement = function(){
    try {
      var self = this;

      if(!this.structure)
        throw new TypeError('cd_creator - loadElement : this.structure undefined');

        this.parentRoot.append(this.structure);
        this.index = this.parentRoot.find(' > div').length;
        this.root = this.parentRoot.find(' > div:nth-child(' + this.index + ')');

    } catch (e) {
      console.log(e.message);
    }
  }

  cd_creator.prototype.setListeners = function(invoiceElements){
    try {

      var self = this;
      var root = this.root;

      root.find('.deleteBtn').click(function(){
        invoiceElements.removeCD(self);
      });
    } catch (e) {
      console.log(e.message);
    }
  }

  invoiceElements_creator.prototype.removeFDI = function(fdi){
    try {
      var self = this;

      if(!fdi)
        throw new TypeError("invoiceElements_creator - removeFDI : fdi undefined");

      if(!fdi.key)
        throw new TypeError("invoiceElements_creator - removeFDI : fdi.key undefined");

      if(this.fdis && this.fdis.length > 0 && fdi.Id !== -1){
        for (var i = 0; i < this.fdis.length; i++) {
          var item = this.fdis[i];
          if(fdi.key && item.key && fdi.key === item.key){
            this.fdis[i].root.remove();
            this.fdis.splice(i, 1);
            console.log(this);
          }
        }
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  invoiceElements_creator.prototype.removeCD = function(cd){
    try {
      var self = this;

      if(!cd)
        throw new TypeError("invoiceElements_creator - removeCD : cd undefined");

      if(!cd.key)
        throw new TypeError("invoiceElements_creator - removeCD : cd.key undefined");

      if(this.cds && this.cds.length > 0){
        for (var i = 0; i < this.cds.length; i++) {
          var item = this.cds[i];
          if(cd.key && item.key && cd.key === item.key){
            this.cds[i].root.remove();
            this.cds.splice(i, 1);
            console.log(this);
          }
        }
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  invoiceElements_creator.prototype.addFDI = function(fdi){
    try {
      var self = this;

      if(!fdi)
        throw new TypeError('invoiceElements_creator - addFDI : fdi undefined');

      if(!this.fdis)
        throw new TypeError('invoiceElements_creator - addFDI : fdis undefined');

      this.fdi_counter++;
      fdi.key = this.fdi_counter;
      this.fdis.push(fdi);

    } catch (e) {
      console.log(e.message);
    }
  }

  invoiceElements_creator.prototype.addCD = function(cd){
    try {
      var self = this;

      if(!cd)
        throw new TypeError('invoiceElements_creator - addCD : cd undefined');

      if(!this.cds)
        throw new TypeError('invoiceElements_creator - addCD : cds undefined');

      this.cd_counter++;
      cd.key = this.cd_counter;
      this.cds.push(cd);

    } catch (e) {
      console.log(e.message);
    }
  }

  invoiceElements_creator.prototype.setInvoiceElements = function(invoice){
    try {
      var self = this;

      if(!invoice)
        throw new TypeError('invoiceElements_creator - setFDI_toInvoice : invoice undefined');

      var fd = new FatturaDettagli();
      fd.FatturaDettagli = new Array();
      var fc = new Fattura_Componenti();
      fc.Fattura_Componenti = new Array();

      if(this.fdis && this.fdis.length > 0){
        for (var i = 0; i < this.fdis.length; i++) {
          if(this.fdis[i].item && this.fdis[i].item.Id !== -1){
            fd.FatturaDettagli.push(this.fdis[i].item);
          }
        }
      }

      if(this.cds && this.cds.length > 0){
        for (var i = 0; i < this.cds.length; i++) {
          if(this.cds[i].item){
            fc.Fattura_Componenti.push(this.cds[i].item);
          }
        }
      }

      invoice.FatturaDettagli = fd;
      invoice.Fattura_Componenti = fc;

    } catch (e) {
      console.log(e.message);
    }
  }

  riepilogo_conteggi.prototype.init = function(){
    var self = this;
    try {
      if(!this.rootPanel)
        throw new TypeError('riepilogo_conteggi - init : this.rootPanel undefined');

      if(!this.ts_docF)
        throw new TypeError('riepilogo_conteggi - init : this.ts_docF undefined');

      if(!this.prevAction)
        throw new TypeError('riepilogo_conteggi - init : this.prevAction undefined');

      if(!this.nextAction)
        throw new TypeError('riepilogo_conteggi - init : this.nextAction undefined');

      this.loadStructure(function(){
        self.listeners();
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  riepilogo_conteggi.prototype.loadStructure = function(callback){
    var self = this;
    try {

      if(!callback)
        throw new TypeError('riepilogo_conteggi - loadStructure : callback undefined');

      var back_btn = $('<div class="action-btns" style=" display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: flex-start; align-items: stretch; align-content: stretch; margin-bottom: 15px;"><div class="action-btns__back" style="flex-grow: 0;flex-shrink: 0;flex-basis: 25%;display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: center;align-items: center;align-content: center;padding: 4px;font-weight: bold;border-radius: 100px !important;background-color: #e6e8ec;color: #696f7a;cursor: pointer;"><i class="material-icons">arrow_back</i> Torna indietro</div></div>');

      var send_btn = $('<div class="divider"></div><div class="action-btns" style=" display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: stretch; align-content: stretch; "><div class="action-btns__sendRiepilogo" btnStatus="active" style="cursor : pointer;flex-grow: 1;flex-basis: 0;display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: center;align-items: stretch;align-content: stretch;padding: 10px;background-color: #14699b;color: #fff;font-weight: bold;border-radius: 100px !important;margin: 2px;"><i class="material-icons">send</i><span style=" margin-left: 10px;">Inviare email</span></div></div>');

      var emailContainer = $('<div class="email-container"></div>');

      this.rootPanel.append(back_btn.clone());
      this.rootPanel.append(emailContainer.clone());

      var ts_docF = this.ts_docF;
      var htmlContent = new HTMLContent("", "", ts_docF);
      htmlContent.setDefaultUi();
      htmlContent.getInvoiceHTMLContent(function(content){
        var riepilogo_htmlContent = content;
        self.rootPanel.find(".email-container").append(riepilogo_htmlContent);
        self.rootPanel.append(send_btn.clone());
        callback();
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  riepilogo_conteggi.prototype.listeners = function(){
    var self = this;
    try {

      this.rootPanel.find('.action-btns .action-btns__back').click(function(){
        self.prevAction();
      });

      this.rootPanel.find('.action-btns .action-btns__sendRiepilogo').click(function(){
        var button = $(this);
        var ts_docF = self.ts_docF;
        var btnStatus = button.attr('btnStatus');

        if(btnStatus === 'active'){
          button.attr('btnStatus', 'disabled');
          sendMailConteggi(button, ts_docF, self.nextAction);
        }

      });

    } catch (e) {
      console.log(e.message);
    }
  }

  riepilogo_conteggiNoInvoice.prototype.init = function(){
    var self = this;
    console.log(this.ins.Inquilino);
    //this.ins.Inquilino = null;

    try {

      if(!this.rootPanel)
        throw new TypeError('riepilogo_conteggiNoInvoice - init : this.rootPanel undefined');

      if(!this.ins)
        throw new TypeError('riepilogo_conteggiNoInvoice - init : ins undefined');

      if(!this.ins.Inquilino)
        throw new TypeError('riepilogo_conteggiNoInvoice - init : this.ins.Inquilino');

      if(!this.ins.Stanza)
        throw new TypeError('riepilogo_conteggiNoInvoice - init : this.ins.Stanza');

      if(!this.ins.Stanza.Appartamento)
        throw new TypeError('riepilogo_conteggiNoInvoice - init : this.ins.Stanza.Appartamento');

      if(!this.ins.FlagConteggi || parseInt(this.ins.FlagConteggi) <= 0)
        throw new TypeError('riepilogo_conteggiNoInvoice - init : this.ins.FlagConteggi undefined');

      if(!this.prevAction)
        throw new TypeError('riepilogo_conteggiNoInvoice - init : this.prevAction undefined');

      if(!this.nextAction)
        throw new TypeError('riepilogo_conteggiNoInvoice - init : this.nextAction undefined');

      this.loadStructure(function(){
        self.listeners();
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  riepilogo_conteggiNoInvoice.prototype.loadStructure = function(callback){
    try {
      var self = this;

      if(!callback)
        throw new TypeError('riepilogo_conteggiNoInvoice - loadStructure : this method needs a callback parameter!');

      var back_btn = $('<div class="action-btns" style=" display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: flex-start; align-items: stretch; align-content: stretch; margin-bottom: 15px;"><div class="action-btns__back" style="flex-grow: 0;flex-shrink: 0;flex-basis: 25%;display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: center;align-items: center;align-content: center;padding: 4px;font-weight: bold;border-radius: 100px !important;background-color: #e6e8ec;color: #696f7a;cursor: pointer;"><i class="material-icons">arrow_back</i> Torna indietro</div></div>');

      var send_btn = $('<div class="divider"></div><div class="action-btns" style=" display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: stretch; align-content: stretch; "><div class="action-btns__sendRiepilogo" style="cursor : pointer;flex-grow: 1;flex-basis: 0;display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: center;align-items: stretch;align-content: stretch;padding: 10px;background-color: #14699b;color: #fff;font-weight: bold;border-radius: 100px !important;margin: 2px;"><i class="material-icons">send</i><span style=" margin-left: 10px;">Inviare email</span></div></div>');

      var emailContainer = $('<div class="email-container"></div>');

      this.getEmailContent(function(content){

        if(content){

          self.rootPanel.append(back_btn.clone());
          self.rootPanel.append(emailContainer.clone());
          var riepilogo_htmlContent = content;
          self.rootPanel.find(".email-container").append(riepilogo_htmlContent);
          self.rootPanel.append(send_btn.clone());

          callback();
        }else{
          bootbox.alert("Errore imprevisto durante la preparazione dell'anteprima. Richiedere supporto.");
        }

      });

    } catch (e) {
      console.log(e.message);
    }
  }

  riepilogo_conteggiNoInvoice.prototype.getEmailContent = function(callback){
    try {
      var self = this;

      if(!callback)
        throw new TypeError('riepilogo_conteggiNoInvoice - getEmailContent : this method needs a callback parameter!');

      var template = new HTMLContent();
      var ins = this.ins;
      template.getNoInvoiceStructure(ins, function(html){
        callback(html);
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  riepilogo_conteggiNoInvoice.prototype.listeners = function(){
    try {
      var self = this;

      var template = new HTMLContent();
      var mail = new Mail();
      mail.init();
      var subject = "Conteggi di fine locazione";
      var inquilino = this.ins.Inquilino;
      var lang = inquilino.Lang;

      if(lang === "en"){
        subject = "Final report and payment history";
      }

      this.rootPanel.find('.action-btns .action-btns__back').click(function(){
        self.prevAction();
      });

      this.rootPanel.find('.action-btns .action-btns__sendRiepilogo').click(function(){
        var button = $(this);
        button.find('span').html('Invio in corso...');
        template.getNoInvoiceStructure(self.ins, function(html){
          mail.Content = html;
          mail.Subject = subject;
          mail.CC.push({ Mail : "segreteria@finlibera.it" });
          mail.ReplyTo = { Mail : "segreteria@finlibera.it" };
          mail.To.push({ Mail : inquilino.PrimaryEmail });

          if(inquilino.SecondaryEmail && inquilino.SecondaryEmail !== ""){
            mail.To.push({ Mail : inquilino.SecondaryEmail });
          }

          mail.setNoReplyCustomers();

          mail.Send(function(suc){
            if (suc && suc.Success){
              button.find('span').html('Inviare email');
              self.ins.conteggiSetIgnore(function(success){
                if(success){
                  self.nextAction();
                  bootbox.alert("Email inviata con successo!");
                }else{
                  bootbox.alert('Errore imprevisto durante il salvataggio delle modifiche. Richiedere supporto!');
                }
              });

            }else{
              button.find('span').html('Inviare email');
              bootbox.alert("Invio email fallito.");
            }
          });
        });
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  function getStruct_NewTenant_days(totDays){
    var newInquilino_days_text = "";
    var txt_giorni = " giorni";

    if(totDays && parseInt(totDays) > 0){
      if(parseInt(totDays) === 1){
        txt_giorni = " giorno";
      }
      newInquilino_days_text = "Entrato da " + totDays + txt_giorni;
    }else if(totDays && parseInt(totDays) < 0){
      var days = parseInt(totDays);
      days = -days;

      if(days === 1){
        txt_giorni = " giorno";
      }

      newInquilino_days_text = "Entrerà tra " + days + txt_giorni;
    }else if(parseInt(totDays) === 0){
      newInquilino_days_text = "Entrato oggi";
    }else{
      newInquilino_days_text = "Nessun inquilino";
    }

    return newInquilino_days_text;
  }

})();
