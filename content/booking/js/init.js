function bookingApp_ui(rootKanbanLists){
  this.rootKanbanLists = rootKanbanLists;
}

(function(){
  var bk_ui = new bookingApp_ui();

  bookingApp_ui.prototype.init = function(){
    var self = this;
    this.rootKanbanLists = $("section.main-layout_content > section > div > div.sub-layout__content > section > section > div > div.fixed-header-layout__contents > div > section > div");

    this.listeners();

    var admin = new Admin();
    admin.Load(function (){
        if(admin.isAdministrator() || admin.isContabile() || admin.isAgente()){
          var secREQs = new sec_requests();
          secREQs.admin = admin;
          secREQs.bookingApp_ui = bk_ui;
          secREQs.init();
        }
    });
  }

  bookingApp_ui.prototype.listeners = function(){

    var self = this;

    var secRequests = this.getSectionSelector(1);
    var secConfirmed = this.getSectionSelector(2);
    var secHistory = this.getSectionSelector(3);

    var admin = new Admin();

    secRequests.click(function(event){
      admin.Load(function (){
        var secREQs = new sec_requests();
        secREQs.admin = admin;
        secREQs.bookingApp_ui = bk_ui;
        secREQs.init();
      });
    });

    secConfirmed.click(function(){
      admin.Load(function(){
        var sec = new sec_confirmedReqs();
        sec.admin = admin;
        sec.bookingApp_ui = bk_ui;
        sec.init();
      });
    });

    secHistory.click(function(){
      admin.Load(function(){
        var sec = new sec_history();
        sec.admin = admin;
        sec.bookingApp_ui = bk_ui;
        sec.init();
      });
    });

  }

  bookingApp_ui.prototype.setSection = function(sectionNumber){
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

  bookingApp_ui.prototype.getSectionSelector = function(sectionNumber){
    try {

      if(!sectionNumber)
        throw new TypeError("sectionNumber");

      var selector = null;

      switch (sectionNumber) {
        case 1:
          selector = $('section.main-layout_content > section > div > div.sub-layout__header > div > div.project-header__center > a:nth-child(1)');
          break;
        case 2:
          selector = $('section.main-layout_content > section > div > div.sub-layout__header > div > div.project-header__center > a:nth-child(2)');
          break;
        case 3:
          selector = $('section.main-layout_content > section > div > div.sub-layout__header > div > div.project-header__center > a:nth-child(3)');
          break;
        case 4:
          selector = $('section.main-layout_content > section > div > div.sub-layout__header > div > div.project-header__center > a:nth-child(4)');
          break;
      }

      return selector;

    } catch (e) {
      console.log(e.message);
    }
  }

  bookingApp_ui.prototype.emptySectionSelected = function(){
    var secRequests = this.getSectionSelector(1);
    var secConfirmed = this.getSectionSelector(2);
    var secHistory = this.getSectionSelector(3);

    var className = "section_selected";
    secRequests.find('span').removeClass(className);
    secConfirmed.find('span').removeClass(className);
    secHistory.find('span').removeClass(className);
  }

  $(document).ready( function() {
    bk_ui.init();
  });
})();
