function invoiceApp_ui(rootKanbanLists, sections){
  this.rootKanbanLists = rootKanbanLists;
  this.sections = sections;
  this.defaultSection = 3;
}

(function(){

  function appSection(selector, number, linkName){
    this.selector = selector;
    this.number = number;
    this.linkName = linkName;
  }

  var invn_ui = new invoiceApp_ui();

  invoiceApp_ui.prototype.init = function(){
    var self = this;
    var linkString = window.location.href;
    var splittedLink = linkString.split('#/')[1];
    this.rootKanbanLists = $("section.main-layout_content > section > div > div.sub-layout__content > section > section > div > div.fixed-header-layout__contents > div > section > div");

    this.listeners();
    this.createSections();

    if(splittedLink){
      var section = this.getSectionByLinkName(splittedLink);
      section.selector.click();
    }else{
      this.setDefaultSection();
    }

  }

  invoiceApp_ui.prototype.setDefaultSection = function(){
    try {
      var self = this;

      if(!this.defaultSection)
        throw new TypeError('invoiceApp_ui - setDefaultSection : this.defaultSection undefined!');

      var section = this.getSectionByNumber(this.defaultSection);
      var prevLink = window.location.href;

      console.log(prevLink);

      if(prevLink.endsWith('/')){
        window.location.href = URL_HOST + '_gestione/invoices/#/' + section.linkName;
        section.selector.click();
      }else{
        window.location.href = URL_HOST + '_gestione/invoices/#/' + section.linkName;
      }

      /*window.location.href = URL_HOST + '_gestione/invoices/#/' + section.linkName;*/
      /*section.selector.click();*/
      /*
       NB : Se viene commentato sopra e il link è http://milanostanze.local/_gestione/invoices non viene caricato due volte.
            Questo mi fa pensare che probabilmente c'è ancora un problema con htaccess oppure con lo splittedLink
       */

    } catch (e) {
      console.log(e.message);
    }
  }

  invoiceApp_ui.prototype.getSectionByNumber = function(sectionNumber){
    try {
      var self = this;

      if(!sectionNumber)
        throw new TypeError('invoiceApp_ui - getSectionByNumber : sectionNumber undefined!');

      if(!this.sections || !(this.sections.length > 0))
        throw new TypeError('invoiceApp_ui - getSectionByNumber : sections undefined!');

      var res = null;

      for (var i = 0; i < this.sections.length; i++) {
        var section = this.sections[i];
        if(sectionNumber === section.number){
          res = section;
        }
      }

      return res;
    } catch (e) {
      console.log(e.message);
    }
  }

  invoiceApp_ui.prototype.getSectionByLinkName = function(linkName){
    try {
      var self = this;

      if(!linkName)
        throw new TypeError('invoiceApp_ui - getSectionByLinkName : linkName undefined!');

      if(!this.sections || !(this.sections.length > 0))
        throw new TypeError('invoiceApp_ui - getSectionByLinkName : sections undefined!');

      var res = null;

      for (var i = 0; i < this.sections.length; i++) {
        var section = this.sections[i];
        if(linkName === section.linkName){
          res = section;
        }
      }

      return res;
    } catch (e) {
      console.log(e.message);
    }
  }

  invoiceApp_ui.prototype.listeners = function(){

    var self = this;

  }

  invoiceApp_ui.prototype.getPrivileges = function(accessToken){
    try {
      var self = this;

      if(!accessToken)
        throw new TypeError('invoiceApp_ui - getPrivileges : accessToken undefined');

      switch (parseInt(accessToken)) {
        case 1:
          return function(callback){

            if(!callback)
              throw new TypeError('invoiceApp_ui - getPrivileges : callback undefined');

            var admin = new Admin();
            admin.Load(function (){
                if(admin.isAdministrator() || admin.isContabile()){
                  callback(true);
                }else{
                  callback(false);
                }
            });
          };
          break;
        case 2:
          return function(callback){

            if(!callback)
              throw new TypeError('invoiceApp_ui - getPrivileges : callback undefined');

            var admin = new Admin();
            admin.Load(function (){
                if(admin.isAdministrator() || admin.isContabile() || admin.isCommercialista() || admin.canReadInvoices()){
                  callback(true);
                }else{
                  callback(false);
                }
            });
          };
          break;
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  invoiceApp_ui.prototype.addSection = function(section){
    try {
      var self = this;

      if(!section || !(section instanceof appSection))
        throw new TypeError('invoiceApp_ui - addSection : section undefined!');

      section.number = this.sections.length + 1;
      this.sections.push(section);

    } catch (e) {
      console.log(e.message);
    }
  }

  invoiceApp_ui.prototype.createSections = function(){
    try {
      var self = this;
      var root_section = 'section.main-layout_content > section > div > div.sub-layout__header > div > div.project-header__center >';
      this.sections = new Array();

      var dashboard = new appSection();
      dashboard.selector = $(root_section + 'a:nth-child(1)');
      dashboard.linkName = 'dashboard/';
      dashboard.canAccess = this.getPrivileges(2);
      dashboard.openSection = function(){
        var secDashboard = new sec_dashboard();
        secDashboard.sectionNumber = dashboard.number;
        secDashboard.invoiceApp_ui = invn_ui;
        secDashboard.init();
      }
      dashboard.init();

      var ftAttive = new appSection();
      ftAttive.selector = $(root_section + 'a:nth-child(2)');
      ftAttive.linkName = 'fatture-attive/';
      ftAttive.canAccess = this.getPrivileges(2);
      ftAttive.openSection = function(){
        var secFtAtt = new sec_fattureAttive();
        secFtAtt.sectionNumber = ftAttive.number;
        secFtAtt.invoiceApp_ui = invn_ui;
        secFtAtt.init();
      }
      ftAttive.init();

      var drafts = new appSection();
      drafts.selector = $(root_section + 'a:nth-child(4)');
      drafts.linkName = 'bozze/';
      drafts.canAccess = this.getPrivileges(1);
      drafts.openSection = function(){
        var secDrafts = new sec_draftInvoices();
        secDrafts.sectionNumber = drafts.number;
        secDrafts.invoiceApp_ui = invn_ui;
        secDrafts.init();
      }
      drafts.init();

      var ftPassive = new appSection();
      ftPassive.selector = $(root_section + 'a:nth-child(3)');
      ftPassive.linkName = 'fatture-passive/';
      ftPassive.canAccess = this.getPrivileges(2);
      ftPassive.openSection = function(){
        var secFtPass = new sec_fatturePassive();
        secFtPass.sectionNumber = ftPassive.number;
        secFtPass.invoiceApp_ui = invn_ui;
        secFtPass.init();
      }
      ftPassive.init();

      var notif = new appSection();
      notif.selector = $(root_section + 'a:nth-child(5)');
      notif.linkName = 'notifiche/';
      notif.canAccess = this.getPrivileges(1);
      notif.openSection = function(){
        var secNotif = new sec_notification();
        secNotif.sectionNumber = notif.number;
        secNotif.invoiceApp_ui = invn_ui;
        secNotif.init();
      }
      notif.init();

      this.addSection(dashboard);
      this.addSection(ftAttive);
      this.addSection(drafts);
      this.addSection(ftPassive);
      this.addSection(notif);

      console.log(this.sections);

    } catch (e) {
      console.log(e.message);
    }
  }

  invoiceApp_ui.prototype.setActiveStatusSectionByNumber = function(sectionNumber){
    try {
      var self = this;

      if(!sectionNumber)
        throw new TypeError('invoiceApp_ui - setActiveStatusSectionByNumber : sectionNumber undefined!');

      var section = this.getSectionByNumber(sectionNumber);

      if(!section)
        throw new TypeError('invoiceApp_ui - setActiveStatusSectionByNumber : section undefined!');

      this.clearSelectedSection();
      section.setSectionStatus(1);

    } catch (e) {
      console.log(e.message);
    }
  }

  invoiceApp_ui.prototype.clearSelectedSection = function(){
    try {
      var self = this;

      if(!this.sections || !(this.sections.length > 0))
        throw new TypeError('invoiceApp_ui - getSectionByNumber : sections undefined!');

      for (var i = 0; i < this.sections.length; i++) {
        var section = this.sections[i];
        section.setSectionStatus(2);
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  appSection.prototype.init = function(){
    try {
      var self = this;

      if(!this.selector)
        throw new TypeError('appSection - init : selector undefined');

      if(!this.canAccess)
        throw new TypeError('appSection - init : canAccess undefined');

      this.listener();
    } catch (e) {
      console.log(e.message);
    }
  }

  appSection.prototype.listener = function(){
    try {
      var self = this;

      if(!this.selector)
        throw new TypeError('appSection - listener : selector undefined');

      if(!this.canAccess)
        throw new TypeError('appSection - listener : canAccess undefined');

      if(!this.openSection)
        throw new TypeError('appSection - listener : openSection undefined');

      var selector = this.selector;

      selector.click(function(event){
        self.canAccess(function(canAccess){
          if(canAccess){
            self.openSection();
          }else{
            self.accessDenied();
          }
        });
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  appSection.prototype.accessDenied = function(){
    alert("Non hai i permessi per accedere a questa sezione!");
  }

  appSection.prototype.setSectionStatus = function(status){
    try {
      var self = this;

      if(!status)
        throw new TypeError('appSection - setSectionStatus : status undefined!');

      var className = "section_selected";
      var selector = this.selector;

      switch (parseInt(status)) {
        case 1:
          selector.find('span').addClass(className);
          break;
        case 2:
          selector.find('span').removeClass(className);
          break;
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  $(document).ready( function() {
    invn_ui.init();
  });
})();
