function sec_history(admin, bookingApp_ui){
  this.admin = admin;
  this.bookingApp_ui = bookingApp_ui;
  this.sectionNumber = 3;
}

/*
 * sec_expiredBookings : Elenco dei Booking scaduti ed ancora attivi. Quindi che non sono andati via.
 */
function sec_expiredBookings(admin, rootKanbanList, bookingApp_ui, sectionNumber){
  this.admin = admin;
  this.rootKanbanList = rootKanbanList;
  this.bookingApp_ui = bookingApp_ui;
  this.sectionNumber = sectionNumber;
}

function sec_declinedBookings(admin, rootKanbanList, bookingApp_ui, sectionNumber){
  this.admin = admin;
  this.rootKanbanList = rootKanbanList;
  this.bookingApp_ui = bookingApp_ui;
  this.sectionNumber = sectionNumber;
}

function sec_cancelledBookings(admin, rootKanbanList, bookingApp_ui, sectionNumber){
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

  var rowStruct = $('<div class="kanban-item ms-list-wide__kanban-item" style=""><div class="tm-list-item"><div class="tm-input-row"><div class="tm-input-row__info row-double-line" style="background: inherit;border-radius: 0px !important;flex-grow: 1;flex-basis: 0;"><div class="tm-simple row-double-line_font infoTenant-action" style="color: #8f939c !important;font-size: 13px !important;height: auto;cursor: default;justify-content: baseline;"><div class="row-icon"><i class="material-icons">person</i></div><div class="tm-simple__text title_text" style=" margin-left: 10px; max-width : none;white-space: normal;"><span></span></div></div><div class="tm-simple row-double-line_font infoRoom-action" title="Apri scheda stanza" style="margin-top: 10px;color: #02a8f3 !important;font-size: 13px !important;height: auto; justify-content: baseline;"><div class="row-icon"><i class="material-icons">hotel</i></div><div class="tm-simple__text title_text" style=" margin-left: 10px;"><span></span></div></div></div><div class="tm-input-row__info row-double-line" style="background: inherit;border-radius: 0px !important;flex-grow: 1;flex-basis: 0;"><div class="tm-simple row-double-line_font booking_dates" style="color: #8f939c !important;font-size: 13px !important;height: auto;cursor: default;justify-content: baseline;"><div class="row-icon"><i class="material-icons">flight_land</i></div><div class="tm-simple__text title_text date_in" style=" margin-left: 10px; max-width : none;white-space: normal;"><span></span></div><div class="row-icon" style=" margin-left: 30px;"><i class="material-icons">flight_takeoff</i></div><div class="tm-simple__text title_text date_out" style=" margin-left: 10px; max-width : none;white-space: normal;"><span></span></div></div></div><div class="tm-input-row__info row-double-line" style="background: inherit;border-radius: 0px !important;flex-grow: 1;flex-basis: 0;"><div class="tm-simple row-double-line_font booking_duration" style="color: #8f939c !important;font-size: 13px !important;height: auto;cursor: default;justify-content: baseline;"><div class="row-icon"><i class="material-icons">event</i></div><div class="tm-simple__text title_text" style=" margin-left: 10px; max-width : none;white-space: normal;"><span></span></div></div></div><div class="tm-input-row__info row-double-line" style="background: inherit;border-radius: 0px !important;flex-grow: 1;flex-basis: 0;display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: space-around;align-items: stretch;align-content: stretch;"><div class="booking-action__details" style=" padding: 20px; font-weight: bold; color: #05a8f3;">Dettagli</div></div></div></div></div>');

  var clone = null;
  var items = new Array();
  var secExpired = new sec_expiredBookings();
  var secExpired_kanban = new kanban_list();
  var secDeclined = new sec_declinedBookings();
  var secDeclined_kanban = new kanban_list();
  var secCancelled = new sec_cancelledBookings();
  var secCancelled_kanban = new kanban_list();
  var filter = new Filtro();
  var declinedFilter = new Filtro();
  var cancelledFilter = new Filtro();

  sec_history.prototype.init = function(){
    try {
      var self = this;

      if(!this.admin)
        throw new TypeError("sec_history - init : this.admin undefined");

      if(!this.bookingApp_ui)
        throw new TypeError("sec_history - init : this.bookingApp_ui undefined");

      if(this.admin.isAdministrator() || this.admin.isContabile() || this.admin.isAgente()){

        this.bookingApp_ui.setSection(this.sectionNumber);
        this.bookingApp_ui.rootKanbanLists.empty();

        clone = this;

        //Floating Action Btn
        $('section.main-layout_content > section > div > div.sub-layout__content > section > section > div > div.fixed-header-layout__contents').append('<div class="fixed-action-btn materializecss addNewSingleBooking"> <a class="btn-floating"> <i class="material-icons">add</i> </a> </div>');

        this.listeners();

        secExpired.admin = this.admin;
        secExpired.bookingApp_ui = this.bookingApp_ui;
        secExpired.sectionNumber = this.sectionNumber;

        secDeclined.admin = this.admin;
        secDeclined.bookingApp_ui = this.bookingApp_ui;
        secDeclined.sectionNumber = this.sectionNumber;

        secCancelled.admin = this.admin;
        secCancelled.bookingApp_ui = this.bookingApp_ui;
        secCancelled.sectionNumber = this.sectionNumber;

        secExpired_kanban.parentRoot = this.bookingApp_ui.rootKanbanLists;
        secExpired_kanban.secTitle = "Booking scaduti";
        secExpired_kanban.itemsManager = secExpired;
        secExpired_kanban.init(function(){
          secDeclined_kanban.parentRoot = self.bookingApp_ui.rootKanbanLists;
          secDeclined_kanban.secTitle = "Booking rifiutati";
          secDeclined_kanban.itemsManager = secDeclined;
          secDeclined_kanban.init(function(){
            secCancelled_kanban.parentRoot = self.bookingApp_ui.rootKanbanLists;
            secCancelled_kanban.secTitle = "Booking eliminati";
            secCancelled_kanban.itemsManager = secCancelled;
            secCancelled_kanban.init();
          });
        });

        //filter.root = this.bookingApp_ui.rootKanbanLists.find('.filter-panel');
        filter.parentRoot = this.bookingApp_ui.rootKanbanLists;
        filter.init();

        //declinedFilter.root = this.bookingApp_ui.rootKanbanLists.find('.declinedFilter-panel');
        declinedFilter.parentRoot = this.bookingApp_ui.rootKanbanLists;
        declinedFilter.init();

        //cancelledFilter.root = this.bookingApp_ui.rootKanbanLists.find('.cancelledFilter-panel');
        cancelledFilter.parentRoot = this.bookingApp_ui.rootKanbanLists;
        cancelledFilter.init();

        console.log(this.bookingApp_ui.rootKanbanLists);

      }else{
        alert("Non hai i permessi per accedere a questa sezione!");
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  sec_history.prototype.listeners = function(){
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

  sec_expiredBookings.prototype.loadElements = function(filtro, callback){
    try {

      var self = this;

      if(!clone)
        throw new TypeError("sec_expiredBookings - loadElements : clone undefined!");

      if(!callback)
        throw new TypeError("sec_expiredBookings - loadElements : callback undefined!");

      var bookings = new Booking_Details();
      items = [];

      if(self.rootKanbanList.find('.ms-list-header__right').is(':empty')){
        self.rootKanbanList.find('.ms-list-header__right').html('<div class="tm-pagination"><span class="paginationTitle" style=" margin-right: 20px;"></span><i class="fas fa-arrow-left left"></i><i class="fas fa-arrow-right right"></i></div>');
      }

      bookings.loadExpired(filter, function(res){
        var data = res.Data;
        if(filter.Pagination){
            filter.Pagination.TotalPages = res.TotalPages;
        }

        if(filter.Pagination){
            filter.Pagination.TotalRows = res.TotalRows;
        }

        if(data && data.length > 0){
          self.rootKanbanList.find('.secTitle').html("Booking scaduti (" + filter.Pagination.TotalRows + ")");

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

  sec_declinedBookings.prototype.loadElements = function(filtro, callback){
    try {

      var self = this;

      if(!clone)
        throw new TypeError("sec_declinedBookings - loadElements : clone undefined!");

      if(!callback)
        throw new TypeError("sec_declinedBookings - loadElements : callback undefined!");

      var bookings = new Booking_Details();
      items = [];

      if(self.rootKanbanList.find('.ms-list-header__right').is(':empty')){
        self.rootKanbanList.find('.ms-list-header__right').html('<div class="tm-pagination"><span class="paginationTitle" style=" margin-right: 20px;"></span><i class="fas fa-arrow-left left"></i><i class="fas fa-arrow-right right"></i></div>');
      }

      bookings.loadDeclined(declinedFilter, function(res){
        var data = res.Data;
        if(declinedFilter.Pagination){
            declinedFilter.Pagination.TotalPages = res.TotalPages;
        }

        if(declinedFilter.Pagination){
            declinedFilter.Pagination.TotalRows = res.TotalRows;
        }

        if(data && data.length > 0){
          self.rootKanbanList.find('.secTitle').html("Booking rifiutati (" + declinedFilter.Pagination.TotalRows + ")");

          var pager_title = declinedFilter.Pagination.CurrentPage + " - " + declinedFilter.Pagination.TotalPages;
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

  sec_cancelledBookings.prototype.loadElements = function(filtro, callback){
    try {

      var self = this;

      if(!clone)
        throw new TypeError("sec_cancelledBookings - loadElements : clone undefined!");

      if(!callback)
        throw new TypeError("sec_cancelledBookings - loadElements : callback undefined!");

      var bookings = new Booking_Details();
      items = [];

      if(self.rootKanbanList.find('.ms-list-header__right').is(':empty')){
        self.rootKanbanList.find('.ms-list-header__right').html('<div class="tm-pagination"><span class="paginationTitle" style=" margin-right: 20px;"></span><i class="fas fa-arrow-left left"></i><i class="fas fa-arrow-right right"></i></div>');
      }

      bookings.loadCancelled(cancelledFilter, function(res){
        var data = res.Data;
        if(cancelledFilter.Pagination){
            cancelledFilter.Pagination.TotalPages = res.TotalPages;
        }

        if(cancelledFilter.Pagination){
            cancelledFilter.Pagination.TotalRows = res.TotalRows;
        }

        if(data && data.length > 0){
          self.rootKanbanList.find('.secTitle').html("Booking eliminati (" + cancelledFilter.Pagination.TotalRows + ")");

          var pager_title = cancelledFilter.Pagination.CurrentPage + " - " + cancelledFilter.Pagination.TotalPages;
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
          secExpired_kanban.reload();
        }
      });

      this.parentRoot.find('.ms-list-header__right .right').click(function(event){
        event.stopImmediatePropagation();
        if(self.Pagination.CurrentPage && self.Pagination.CurrentPage > 0 && self.Pagination.CurrentPage < self.Pagination.TotalPages){
          self.Pagination.CurrentPage++;
          //self.setFilters();
          secExpired_kanban.reload();
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
      var contractDurationText = item.getContractDurationText();

      var str = rowStruct.clone();
      str.find(nominativoIns).append(personalInfo.getNominativo());
      str.find(nominativoRoom).append(room.getTitle());
      str.find(moveIn_sel).append(moveIn);
      str.find(moveOut_sel).append(moveOut);
      str.find(contractDuration_sel).append(contractDurationText);

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

      /*root.find('.booking-action__toggleActions').click(function(event){
        //CARICAMENTO DI BOOKING DETAILS
        root.find('> div:nth-child(2)').toggle();
      });*/

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
