function propertyApp_ui(rootKanbanLists, sections){
  this.rootKanbanLists = rootKanbanLists;
  this.sections = sections;
  this.defaultSection = 2;
}

(function(){

  function appSection(selector, number, linkName){
    this.selector = selector;
    this.number = number;
    this.linkName = linkName;
  }

  var prop_ui = new propertyApp_ui();

  propertyApp_ui.prototype.init = function(){
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

  propertyApp_ui.prototype.setDefaultSection = function(){
    try {
      var self = this;

      if(!this.defaultSection)
        throw new TypeError('propertyApp_ui - setDefaultSection : this.defaultSection undefined!');

      var section = this.getSectionByNumber(this.defaultSection);
      var prevLink = window.location.href;

      if(prevLink.endsWith('/')){
        window.location.href = URL_HOST + '_gestione/properties/#/' + section.linkName;
        section.selector.click();
      }else{
        window.location.href = URL_HOST + '_gestione/properties/#/' + section.linkName;
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

  propertyApp_ui.prototype.getSectionByNumber = function(sectionNumber){
    try {
      var self = this;

      if(!sectionNumber)
        throw new TypeError('propertyApp_ui - getSectionByNumber : sectionNumber undefined!');

      if(!this.sections || !(this.sections.length > 0))
        throw new TypeError('propertyApp_ui - getSectionByNumber : sections undefined!');

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

  propertyApp_ui.prototype.getSectionByLinkName = function(linkName){
    try {
      var self = this;

      if(!linkName)
        throw new TypeError('propertyApp_ui - getSectionByLinkName : linkName undefined!');

      if(!this.sections || !(this.sections.length > 0))
        throw new TypeError('propertyApp_ui - getSectionByLinkName : sections undefined!');

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

  propertyApp_ui.prototype.listeners = function(){

    var self = this;

  }

  propertyApp_ui.prototype.getPrivileges = function(accessToken){
    try {
      var self = this;

      if(!accessToken)
        throw new TypeError('propertyApp_ui - getPrivileges : accessToken undefined');

      switch (parseInt(accessToken)) {
        case 1:
          return function(callback){

            if(!callback)
              throw new TypeError('propertyApp_ui - getPrivileges : callback undefined');

            var admin = new Admin();
            admin.Load(function (){
                if(admin.isAdministrator() || admin.isContabile() || admin.isAgente() || admin.canReadInvoices() || admin.isDataEntry() || admin.recuperoCrediti()){
                  callback(true);
                }else{
                  callback(false);
                }
            });
          };
          break;
        case 2 :
          return function(callback){

            if(!callback)
              throw new TypeError('propertyApp_ui - getPrivileges : callback undefined');

            var admin = new Admin();
            admin.Load(function (){
                if(admin.isAdministrator() || admin.isPropertiesAdministrator()){
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

  propertyApp_ui.prototype.addSection = function(section){
    try {
      var self = this;

      if(!section || !(section instanceof appSection))
        throw new TypeError('propertyApp_ui - addSection : section undefined!');

      section.number = this.sections.length + 1;
      this.sections.push(section);

    } catch (e) {
      console.log(e.message);
    }
  }

  propertyApp_ui.prototype.createSections = function(){
    try {
      var self = this;
      var root_section = 'section.main-layout_content > section > div > div.sub-layout__header > div > div.project-header__center >';
      this.sections = new Array();

      var dashboard = new appSection();
      dashboard.selector = $(root_section + 'a:nth-child(1)');
      dashboard.linkName = 'dashboard/';
      dashboard.canAccess = this.getPrivileges(1);
      dashboard.openSection = function(){
        var secDashboard = new sec_dashboard();
        secDashboard.sectionNumber = dashboard.number;
        secDashboard.propertyApp_ui = prop_ui;
        secDashboard.init();
      }
      dashboard.init();

      var props = new appSection();
      props.selector = $(root_section + 'a:nth-child(2)');
      props.linkName = 'main/';
      props.canAccess = this.getPrivileges(1);
      props.openSection = function(){

        var admin = new Admin();
        admin.Load(function (){
          var secProps = new sec_properties();
          secProps.admin = admin;
          secProps.sectionNumber = props.number;
          secProps.propertyApp_ui = prop_ui;
          secProps.init();
        });
      }
      props.init();

      var owner_agency = new appSection();
      owner_agency.selector = $(root_section + 'a:nth-child(3)');
      owner_agency.linkName = 'owners-agencies/';
      owner_agency.canAccess = this.getPrivileges(1);
      owner_agency.openSection = function () {
        var admin = new Admin();
        admin.Load(function () {
          var secOwnerAgency = new sec_owner_agency();
          secOwnerAgency.admin = admin;
          secOwnerAgency.sectionNumber = owner_agency.number;
          secOwnerAgency.propertyApp_ui = prop_ui;
          secOwnerAgency.init();
        });
      }
      owner_agency.init();

      this.addSection(dashboard);
      this.addSection(props);
      this.addSection(owner_agency);

    } catch (e) {
      console.log(e.message);
    }
  }

  propertyApp_ui.prototype.setActiveStatusSectionByNumber = function(sectionNumber){
    try {
      var self = this;

      if(!sectionNumber)
        throw new TypeError('propertyApp_ui - setActiveStatusSectionByNumber : sectionNumber undefined!');

      var section = this.getSectionByNumber(sectionNumber);

      if(!section)
        throw new TypeError('propertyApp_ui - setActiveStatusSectionByNumber : section undefined!');

      this.clearSelectedSection();
      section.setSectionStatus(1);

    } catch (e) {
      console.log(e.message);
    }
  }

  propertyApp_ui.prototype.clearSelectedSection = function(){
    try {
      var self = this;

      if(!this.sections || !(this.sections.length > 0))
        throw new TypeError('propertyApp_ui - getSectionByNumber : sections undefined!');

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
    prop_ui.init();
  });

})();
