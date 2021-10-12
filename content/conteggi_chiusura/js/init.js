function intestatari_ui(rootKanbanLists){
  this.rootKanbanLists = rootKanbanLists;
}

(function(){
  var intt_ui = new intestatari_ui();

  intestatari_ui.prototype.init = function(){
    var self = this;
    this.rootKanbanLists = $("section.main-layout_content > section > div > div.sub-layout__content > section > section > div > div.fixed-header-layout__contents > div > section > div");
    this.listeners();

    var admin = new Admin();
    admin.Load(function (){
        if(admin.canReadItt() || admin.isAdministrator() || admin.isContabile() || admin.isDataEntry()){
          var secConteggi = new secIntt_conteggi();
          secConteggi.admin = admin;
          secConteggi.intestatari_ui = intt_ui;
          secConteggi.init();
        }
    });
  }

  intestatari_ui.prototype.listeners = function(){
    var secConteggi = this.getSectionSelector(1);

    var admin = new Admin();

    var conteggi = new secIntt_conteggi();
    conteggi.intestatari_ui = intt_ui;

    secConteggi.click(function(event){
      intt_ui.rootKanbanLists.empty();
      admin.Load(function (){
        conteggi.admin = admin;
        conteggi.init();
      });
    });

  }

  intestatari_ui.prototype.setSection = function(sectionNumber){
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

  intestatari_ui.prototype.getSectionSelector = function(sectionNumber){
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

  intestatari_ui.prototype.emptySectionSelected = function(){
    var secConteggi = this.getSectionSelector(1);

    var className = "section_selected";
    secConteggi.find('span').removeClass(className);

  }

  $(document).ready( function() {
    intt_ui.init();
  });


})();
