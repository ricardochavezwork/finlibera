function clients_ui(rootKanbanLists){
  this.rootKanbanLists = rootKanbanLists;
}

(function(){
  var cl_ui = new clients_ui();

  clients_ui.prototype.init = function(){

    var self = this;
    this.rootKanbanLists = $("section.main-layout_content > section > div > div.sub-layout__content > section > section > div > div.fixed-header-layout__contents > div > section > div");
    this.listeners();

    var admin = new Admin();
    admin.Load(function (){
        if(admin.canReadItt() || admin.isAdministrator() || admin.isContabile() || admin.isDataEntry() || admin.isCommercialista() || admin.recuperoCrediti() || admin.isAgente()){
          var secClts = new sec_clients();
          secClts.admin = admin;
          secClts.clients_ui = cl_ui;
          secClts.init();
        }
    });
  }

  clients_ui.prototype.listeners = function(){
    var secClienti = this.getSectionSelector(1);

    var admin = new Admin();

    secClienti.click(function(event){
      admin.Load(function (){
        var secClts = new sec_clients();
        secClts.admin = admin;
        secClts.clients_ui = cl_ui;
        secClts.init();
      });
    });

  }

  clients_ui.prototype.setSection = function(sectionNumber){
    try {
      var self = this;
      if(!sectionNumber)
        throw new TypeError("sectionNumber");

      var className = "section_selected";
      var sel = this.getSectionSelector(sectionNumber);
      this.emptySectionSelected();

      switch (sectionNumber) {
        case 1:
          sel.find('span').addClass(className);
          break;
        case 2:
          sel.find('span').addClass(className);
          break;
        case 3:
          sel.find('span').addClass(className);
          break;
        case 4:
          sel.find('span').addClass(className);
          break;
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  clients_ui.prototype.getSectionSelector = function(sectionNumber){
    try {

      if(!sectionNumber)
        throw new TypeError("sectionNumber");

      var selector = null;

      switch (sectionNumber) {
        case 1:
          selector = $('section.main-layout_content > section > div > div.sub-layout__header > div > div.project-header__center > a:nth-child(1)');
          break;
      }

      return selector;

    } catch (e) {
      console.log(e.message);
    }
  }

  clients_ui.prototype.emptySectionSelected = function(){
    var secClienti = this.getSectionSelector(1);

    var className = "section_selected";
    secClienti.find('span').removeClass(className);

  }

  $(document).ready( function() {
    cl_ui.init();
  });
})();
