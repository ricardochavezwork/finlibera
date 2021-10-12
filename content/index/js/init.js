function indexApp_ui(rootKanbanLists, sections){
  this.rootKanbanLists = rootKanbanLists;
  this.sections = sections;
  this.defaultSection = 1;
}

(function(){

  function sec_index(indexApp_ui, sectionNumber){
    this.indexApp_ui = indexApp_ui;
    this.sectionNumber = sectionNumber;
  }

  function appSection(selector, number, linkName){
    this.selector = selector;
    this.number = number;
    this.linkName = linkName;
  }

  var ix_ui = new indexApp_ui();

  indexApp_ui.prototype.init = function(){
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

  indexApp_ui.prototype.setDefaultSection = function(){
    try {
      var self = this;

      if(!this.defaultSection)
        throw new TypeError('indexApp_ui - setDefaultSection : this.defaultSection undefined!');

      var section = this.getSectionByNumber(this.defaultSection);
      var prevLink = window.location.href;

      if(prevLink.endsWith('/')){
        window.location.href = URL_HOST + '_gestione/#/' + section.linkName;
        section.selector.click();
      }else{
        window.location.href = URL_HOST + '_gestione/#/' + section.linkName;
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

  indexApp_ui.prototype.getSectionByNumber = function(sectionNumber){
    try {
      var self = this;

      if(!sectionNumber)
        throw new TypeError('indexApp_ui - getSectionByNumber : sectionNumber undefined!');

      if(!this.sections || !(this.sections.length > 0))
        throw new TypeError('indexApp_ui - getSectionByNumber : sections undefined!');

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

  indexApp_ui.prototype.getSectionByLinkName = function(linkName){
    try {
      var self = this;

      if(!linkName)
        throw new TypeError('indexApp_ui - getSectionByLinkName : linkName undefined!');

      if(!this.sections || !(this.sections.length > 0))
        throw new TypeError('indexApp_ui - getSectionByLinkName : sections undefined!');

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

  indexApp_ui.prototype.listeners = function(){

    var self = this;

  }

  indexApp_ui.prototype.getPrivileges = function(accessToken){
    try {
      var self = this;

      if(!accessToken)
        throw new TypeError('indexApp_ui - getPrivileges : accessToken undefined');

      switch (parseInt(accessToken)) {
        case 1:
        return function(callback){

          if(!callback)
            throw new TypeError('indexApp_ui - getPrivileges : callback undefined');

          var admin = new Admin();
          admin.Load(function (){
              if(admin){
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

  indexApp_ui.prototype.addSection = function(section){
    try {
      var self = this;

      if(!section || !(section instanceof appSection))
        throw new TypeError('indexApp_ui - addSection : section undefined!');

      section.number = this.sections.length + 1;
      this.sections.push(section);

    } catch (e) {
      console.log(e.message);
    }
  }

  indexApp_ui.prototype.createSections = function(){
    try {
      var self = this;
      var root_section = 'section.main-layout_content > section > div > div.sub-layout__header > div > div.project-header__center >';
      this.sections = new Array();

      var dashboard = new appSection();
      dashboard.selector = $(root_section + 'a:nth-child(1)');
      dashboard.linkName = 'pagina-iniziale/';
      dashboard.canAccess = self.getPrivileges(1);
      dashboard.openSection = function(){
        var secDashboard = new sec_index();
        secDashboard.sectionNumber = dashboard.number;
        secDashboard.indexApp_ui = ix_ui;
        secDashboard.init();
      }
      dashboard.init();

      self.addSection(dashboard);

    } catch (e) {
      console.log(e.message);
    }
  }

  indexApp_ui.prototype.setActiveStatusSectionByNumber = function(sectionNumber){
    try {
      var self = this;

      if(!sectionNumber)
        throw new TypeError('indexApp_ui - setActiveStatusSectionByNumber : sectionNumber undefined!');

      var section = this.getSectionByNumber(sectionNumber);

      if(!section)
        throw new TypeError('indexApp_ui - setActiveStatusSectionByNumber : section undefined!');

      this.clearSelectedSection();
      section.setSectionStatus(1);

    } catch (e) {
      console.log(e.message);
    }
  }

  indexApp_ui.prototype.clearSelectedSection = function(){
    try {
      var self = this;

      if(!this.sections || !(this.sections.length > 0))
        throw new TypeError('indexApp_ui - getSectionByNumber : sections undefined!');

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

  sec_index.prototype.init = function(){
    try {
      var self = this;

      if(!this.indexApp_ui)
        throw new TypeError('sec_index - init : this.indexApp_ui undefined!');

      this.indexApp_ui.setActiveStatusSectionByNumber(this.sectionNumber);

      var rootKanbanLists = this.indexApp_ui.rootKanbanLists;
      rootKanbanLists.empty();

      var cover_img = $('<div class="ix_cover"><div class="ix_title_container"><h1 class="ml3 ix_title_items">Benvenuto</h1><h1 class="ml3 ix_title_items">nell‘area</h1><h1 class="ml3 ix_title_items">amministrativa</h1><h1 class="ml3 ix_title_items">di</h1><h1 class="ml3 ix_title_items">MilanoStanze</h1></div><div class="static_page_tool"><div class="sp-tool__btn"><i class="fas fa-sync"></i><span>Genera</span></div><div class="sp-tool__txt"></div></div></div>');
      rootKanbanLists.append(cover_img);

      var btn = $('.static_page_tool .sp-tool__btn');
      var sp_lastUpdate_txt = $('.static_page_tool .sp-tool__txt');

      var calendar_struct = $('<div class="ix_body"><div class="ix_body__item"><a href="https://docs.google.com/spreadsheets/d/1V7Lmdk-f5qaQyAzYdSsMxhKCYHoWlXwRVBm8IOzNHag/edit?usp=sharing" target="_blank"><i class="fas fa-file-excel"></i><div class="ix_body__item-title">Calendario Aziendale</div></a></div></div>');

      /*var day = new Date().getDay();
      week = new Array('Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato');
      calendar_struct.find('header').append(week[day]);
      calendar_struct.find('section').append(new Date().getDate());*/

      if(sp_lastUpdate){
        sp_lastUpdate_txt.html(sp_lastUpdate.friendlyFormat());
      }else{
        alert("Errore riscontrato durante la ricerca dell&#8217;ultimo aggiornamento della pagina homepage. Richiedere assistenza.");
      }

      var admin = new Admin();
      admin.Load(function () {
        var isAdmin = admin.isAdministrator();
        
        if(isAdmin)
          rootKanbanLists.append(calendar_struct);

      });

      // Wrap every letter in a span
      $('.ml3').each(function(){
        $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
      });

      anime.timeline({loop: true})
        .add({
          targets: '.ml3 .letter',
          opacity: [0,1],
          easing: "easeInOutQuad",
          duration: 2250,
          delay: function(el, i) {
            return 150 * (i+1)
          }
        }).add({
          targets: '.ml3',
          opacity: 0,
          duration: 1000,
          easing: "easeOutExpo",
          delay: 1000
        });

      btn.click(function(){
        btn.find('span').html('Attendere, può richiedere vari secondi...');
        generateStaticPages(btn, function(){
          btn.find('span').html('Genera');
          sp_lastUpdate_txt.html('Aggiornato in questo momento.');
        });
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  function generateStaticPages(btn, callback){
    try {
      var self = this;

      if(!callback)
        throw new TypeError('generateStaticPages - callback undefined!');

      if(!btn)
        throw new TypeError('generateStaticPages - btn undefined!');

      var plus = 0;
      var refreshIntervalId = setInterval(function(){
        if(plus == 360)
          plus = 0;

        plus += 30;
        btn.find('i').css('transform', 'rotate(' + plus + 'deg)');
      }, 1000);

      $.ajax({
          method: "POST",
          url: '?action=static_page',
      }).done(function(res){
        if(res){
          clearInterval(refreshIntervalId);
          callback();
        }
      }).fail(function(xhr, status, error) {
        DefaultErrorHandler(xhr, status, error);
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  $(document).ready( function() {
    ix_ui.init();
  });

})();
