function sec_requests(admin, bookingApp_ui){
  this.admin = admin;
  this.bookingApp_ui = bookingApp_ui;
  this.sectionNumber = 1;
}

function sec_allActiveRequests(admin, rootKanbanList, bookingApp_ui, sectionNumber){
  this.admin = admin;
  this.rootKanbanList = rootKanbanList;
  this.bookingApp_ui = bookingApp_ui;
  this.sectionNumber = sectionNumber;
}

(function(){

  function Filtro(Pagination, root, parentRoot){
    this.Pagination = Pagination;
    this.root = root;
    this.parentRoot = parentRoot;
  }

  var rowStruct = $('<div class="kanban-item ms-list-wide__kanban-item" style=""><div class="tm-list-item"><div class="tm-input-row"><div class="tm-input-row__info row-double-line" style="background: inherit;border-radius: 0px !important;flex-grow: 1;flex-basis: 0;"><div class="tm-simple row-double-line_font infoTenant-action" style="color: #8f939c !important;font-size: 13px !important;height: auto;cursor: default;justify-content: baseline;"><div class="row-icon"><i class="material-icons">person</i></div><div class="tm-simple__text title_text" style=" margin-left: 10px; max-width : none;white-space: normal;"><span></span></div></div><div class="tm-simple row-double-line_font infoRoom-action" title="Apri scheda stanza" style="margin-top: 10px;color: #02a8f3 !important;font-size: 13px !important;height: auto; justify-content: baseline;"><div class="row-icon"><i class="material-icons">hotel</i></div><div class="tm-simple__text title_text" style=" margin-left: 10px;"><span></span></div></div></div><div class="tm-input-row__info row-double-line" style="background: inherit;border-radius: 0px !important;flex-grow: 1;flex-basis: 0;"><div class="tm-simple row-double-line_font booking_dates" style="color: #8f939c !important;font-size: 13px !important;height: auto;cursor: default;justify-content: baseline;"><div class="row-icon"><i class="material-icons">flight_land</i></div><div class="tm-simple__text title_text date_in" style=" margin-left: 10px; max-width : none;white-space: normal;"><span></span></div><div class="row-icon" style=" margin-left: 30px;"><i class="material-icons">flight_takeoff</i></div><div class="tm-simple__text title_text date_out" style=" margin-left: 10px; max-width : none;white-space: normal;"><span></span></div></div></div><div class="tm-input-row__info row-double-line" style="background: inherit;border-radius: 0px !important;flex-grow: 1;flex-basis: 0;"><div class="tm-simple row-double-line_font booking_duration" style="color: #8f939c !important;font-size: 13px !important;height: auto;cursor: default;justify-content: baseline;"><div class="row-icon"><i class="material-icons">event</i></div><div class="tm-simple__text title_text" style=" margin-left: 10px; max-width : none;white-space: normal;"><span></span></div></div></div><div class="tm-input-row__info row-double-line" style="background: inherit;border-radius: 0px !important;flex-grow: 1;flex-basis: 0;"><div class="tm-simple row-double-line_font booking_deadline" style="color: #8f939c !important;font-size: 13px !important;height: auto;cursor: default;justify-content: baseline;"><div class="row-icon"><i class="material-icons">timer</i></div><div class="tm-simple__text title_text" style=" margin-left: 10px; max-width : none;white-space: normal;"><span></span></div></div></div><div class="tm-input-row__info row-double-line" style="background: inherit;border-radius: 0px !important;flex-grow: 1;flex-basis: 0;display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: space-around;align-items: stretch;align-content: stretch;"><div class="booking-action__details" style=" padding: 20px; font-weight: bold; color: #05a8f3;">Dettagli</div><div class="booking-action__toggleActions" style=" padding: 10px; border-radius: 100px !important; background-color: #05a8f3; color: #fff; font-weight: bold; display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center; align-content: center; margin: 10px; ">Rispondi</div></div></div></div><div class="tm-list-item" style="display : none"><div class="tm-input-row"><div class="tm-input-row__info row-double-line" style="background: inherit;border-radius: 0px !important;flex-grow: 1;flex-basis: 0;display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: space-around;align-items: stretch;align-content: stretch;"><div class="declined_action" style=" padding: 20px; font-weight: bold; color: #f3ce05;">Rifiutato</div><div class="cancel_action" style="padding: 20px;font-weight: bold;color: #f34705;">Elimina</div><!--div class="addNew_action" style="padding: 20px;font-weight: bold;color: #05a8f3;">Nuovo contratto</div--></div><div class="tm-input-row__info row-double-line" style="background: inherit;border-radius: 0px !important;flex-grow: 1;flex-basis: 0;display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: space-around;align-items: stretch;align-content: stretch;"><div class="booking-action__confirm confirm_action" style=" padding: 10px; border-radius: 100px !important; background-color: #05a8f3; color: #fff; font-weight: bold; display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: center; align-content: center; margin: 10px; ">Conferma</div></div></div></div></div>');

  var clone = null;
  var items = new Array();
  var allActives = new sec_allActiveRequests();
  var allActives_kanban = new kanban_list();
  var filter = new Filtro();

  sec_requests.prototype.init = function(){
    try {
      var self = this;

      if(!this.admin)
        throw new TypeError("sec_requests - init : this.admin undefined");

      if(!this.bookingApp_ui)
        throw new TypeError("sec_requests - init : this.bookingApp_ui undefined");

      if(this.admin.isAdministrator() || this.admin.isContabile() || this.admin.isAgente()){

        if(this.bookingApp_ui.setSection)
          this.bookingApp_ui.setSection(this.sectionNumber);

        this.bookingApp_ui.rootKanbanLists.empty();

        clone = this;

        //Reset di header section
        if($('.project-page .sub-layout .sub-layout__header').css('display') == 'none'){
          $('.project-page .sub-layout .sub-layout__header').toggle();
        }

        //Floating Action Btn
        $('section.main-layout_content > section > div > div.sub-layout__content > section > section > div > div.fixed-header-layout__contents').append('<div class="fixed-action-btn materializecss addNewSingleBooking"> <a class="btn-floating"> <i class="material-icons">add</i> </a> </div>');

        this.listeners();

        allActives.admin = this.admin;
        allActives.bookingApp_ui = this.bookingApp_ui;
        allActives.sectionNumber = this.sectionNumber;

        allActives_kanban.parentRoot = this.bookingApp_ui.rootKanbanLists;
        allActives_kanban.secTitle = "Booking da confermare";
        allActives_kanban.itemsManager = allActives;
        allActives_kanban.init();

        //filter.root = this.bookingApp_ui.rootKanbanLists.find('.filter-panel');
        filter.parentRoot = this.bookingApp_ui.rootKanbanLists;
        filter.init();

      }else{
        alert("Non hai i permessi per accedere a questa sezione!");
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  sec_requests.prototype.listeners = function(){
    try {
      var self = this;

      var floatingActionBtn = $('section.main-layout_content > section > div > div.sub-layout__content > section > section > div > div.fixed-header-layout__contents > div.fixed-action-btn.materializecss.addNewSingleBooking');

      floatingActionBtn.click(function(event){
        event.stopImmediatePropagation();
        $('div.fixed-action-btn.addNewSingleBooking').remove();
        $('.project-page .sub-layout .sub-layout__header').toggle();
        var sBooking = new sec_singleBooking();
        sBooking.admin = self.admin;
        sBooking.bookingApp_ui = self.bookingApp_ui;
        sBooking.item = new Booking_Details();
        sBooking.init();
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  sec_allActiveRequests.prototype.loadElements = function(filtro, callback){
    try {

      var self = this;

      if(!clone)
        throw new TypeError("sec_allActiveRequests - loadElements : clone undefined!");

      if(!callback)
        throw new TypeError("sec_allActiveRequests - loadElements : callback undefined!");

      var bookings = new Booking_Details();
      items = [];

      if(self.rootKanbanList.find('.ms-list-header__right').is(':empty')){
        self.rootKanbanList.find('.ms-list-header__right').html('<div class="tm-pagination"><span class="paginationTitle" style=" margin-right: 20px;"></span><i class="fas fa-arrow-left left"></i><i class="fas fa-arrow-right right"></i></div>');
      }

      bookings.loadActives(filter, function(res){
        var data = res.Data;
        if(filter.Pagination){
            filter.Pagination.TotalPages = res.TotalPages;
        }

        if(filter.Pagination){
            filter.Pagination.TotalRows = res.TotalRows;
        }

        if(data && data.length > 0){
          self.rootKanbanList.find('.secTitle').html("Da confermare (" + filter.Pagination.TotalRows + ")");

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

  Filtro.prototype.init = function(){
    try {
      var self = this;

      this.Pagination = {
        TotalRows : 0,
        TotalPages : 0,
        CurrentPage : 1,
        LimitRows : 100
      };

      this.setListeners();

    } catch (e) {
      console.log(e.message);
    }
  }

  Filtro.prototype.setListeners = function(){
    try {
      var self = this;

      /**
       * PAGER
       */
      this.parentRoot.find('.ms-list-header__right .left').click(function(event){
        event.stopImmediatePropagation();
        if(self.Pagination.CurrentPage && self.Pagination.CurrentPage > 1 && self.Pagination.CurrentPage <= self.Pagination.TotalPages){
          self.Pagination.CurrentPage--;
          //self.setFilters();
          allActives_kanban.reload();
        }
      });

      this.parentRoot.find('.ms-list-header__right .right').click(function(event){
        event.stopImmediatePropagation();
        if(self.Pagination.CurrentPage && self.Pagination.CurrentPage > 0 && self.Pagination.CurrentPage < self.Pagination.TotalPages){
          self.Pagination.CurrentPage++;
          //self.setFilters();
          allActives_kanban.reload();
        }
      });
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
      var self = this;
      var nominativoIns = "div.tm-simple.row-double-line_font.infoTenant-action > div.tm-simple__text.title_text > span";
      var nominativoRoom = 'div.tm-simple.row-double-line_font.infoRoom-action > div.tm-simple__text.title_text > span';
      var moveIn_sel = 'div.tm-simple__text.title_text.date_in > span';
      var moveOut_sel = 'div.tm-simple__text.title_text.date_out > span';
      var contractDuration_sel = "div.booking_duration div.tm-simple__text.title_text > span";
      var deadline_sel = "div.booking_deadline div.tm-simple__text.title_text > span";

      if(!this.item || !(this.item instanceof Booking_Details))
        throw new TypeError('booking_request.js - row_ui - setStructure : this.item undefined');

      if(!this.item.PersonalInfo)
        throw new TypeError('booking_request.js - row_ui - setStructure : item.PersonalInfo undefined');

      if(!this.item.Stanza)
        throw new TypeError('booking_request.js - row_ui - setStructure : item.Stanza undefined');

      var item = this.item;
      var personalInfo = item.PersonalInfo;
      var room = item.Stanza;
      var dates = item.getDateMatrix();
      var moveIn = dates.moveIn.ddmmyyyy();
      var moveOut = dates.moveOut ? dates.moveOut.ddmmyyyy() : "indefinito";
      var deadlineText = item.getDeadlineText();
      var contractDurationText = item.getContractDurationText();
      var countdown = item.getDeadline();

      var str = rowStruct.clone();
      str.find(nominativoIns).append(personalInfo.getNominativo());
      str.find(nominativoRoom).append(room.getTitle());
      str.find(moveIn_sel).append(moveIn);
      str.find(moveOut_sel).append(moveOut);
      str.find(contractDuration_sel).append(contractDurationText);
      str.find(deadline_sel).append(deadlineText);

      if(countdown['hours'] <= 20 && countdown['hours'] > 10){
        str.find('div.booking_deadline').attr('style', 'height: auto;cursor: default;justify-content: baseline;color: #f38905 !important;font-size: 13px !important;');
      }else if(countdown['hours'] <= 10){
        str.find('div.booking_deadline').attr('style', 'height: auto;cursor: default;justify-content: baseline;color: #f34705 !important;font-size: 13px !important;');
      }



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
        throw new TypeError("booking_request.js - row_ui - listeners : this.root undefined");

      if(!this.item || !(this.item instanceof Booking_Details))
        throw new TypeError('booking_request.js - row_ui - setStructure : this.item undefined');

      var root = this.root;
      var item = this.item;
      var admin = this.admin;

      root.find('.booking-action__toggleActions').click(function(event){
        //CARICAMENTO DI BOOKING DETAILS
        console.log("click avvenuto!");
        root.find('> div:nth-child(2)').toggle();
      });

      root.find('.declined_action').click(function(event){
        bootbox.confirm("Il booking e' stato rifiutato?" , function(result){
          if(result){
            item.setDeclined(function(success){
              if(!success){
                bootbox.alert('Attenzione! Errore durante il salvataggio delle modifiche; Richiedere supporto.');
                sendBugReport(admin, "booking_request.js : Errore durante il salvataggio del flag : Rifiutato.</br> ");
              }else{
                root.remove();
                bootbox.alert('Perfetto. Salvato con successo!');
              }
            });
          }
        });
      });

      /*root.find('.addNew_action').click(function(event){
        console.log(self.item);
        $('.project-page .sub-layout .sub-layout__header').toggle();
        $('div.fixed-action-btn.addNewSingleBooking').remove();
        var el = new Booking_Details();
        el.PersonalInfo = self.item.PersonalInfo;
        var sBooking = new sec_singleBooking();
        sBooking.admin = clone.admin;
        sBooking.bookingApp_ui = clone.bookingApp_ui;
        sBooking.item = el;
        sBooking.init();
      });*/

      root.find('.cancel_action').click(function(event){
        bootbox.confirm("Eliminare il booking?" , function(result){
          if(result){
            item.setCancelled(function(success){
              if(!success){
                bootbox.alert('Attenzione! Errore durante il salvataggio delle modifiche; Richiedere supporto.');
                sendBugReport(admin, "booking_request.js : Errore durante il salvataggio del flag : Eliminato.</br> ");
              }else{
                root.remove();
                bootbox.alert('Perfetto. Salvato con successo!');
              }
            });
          }
        });
      });

      root.find('.confirm_action').click(function(event){
        bootbox.confirm("Confermare il booking?" , function(result){
          if(result){
            item.setConfirmed(function(success){
              if(!success){
                bootbox.alert('Attenzione! Errore durante il salvataggio delle modifiche; Richiedere supporto.');
                sendBugReport(admin, "booking_request.js : Errore durante il salvataggio del flag : Confermato.</br> ");
              }else{
                root.remove();
                bootbox.alert('Perfetto. Salvato con successo!');
              }
            });
          }
        });
      });

      root.find('.booking-action__details').click(function(){
        $('.project-page .sub-layout .sub-layout__header').toggle();
        $('div.fixed-action-btn.addNewSingleBooking').remove();
        var sBooking = new sec_singleBooking();
        sBooking.admin = clone.admin;
        sBooking.bookingApp_ui = clone.bookingApp_ui;
        sBooking.item = self.item;
        sBooking.init();
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  function sendBugReport(admin, txt){
    var test = false;

    if(txt && admin && !test){
      var username = (admin && admin.Username) ? admin.Username : "";
      var report = new Mail();
      report.setReport(txt + username, "#report : Errore riscontrato su Booking Application");
      report.Send();
    }
  }

})();
