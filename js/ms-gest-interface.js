(function(){

  var tooltip = $('.ms-tooltip__layer .ms-tooltip');
  var leftNav = $('.main-layout__left-nav section');
  var leftMenu_struct = $('<div class="ms-left-nav-popup-panel"><div class="ms-left-nav-popup-panel__chest"><div class="ms-left-nav-popup-panel__paint"><div class="ms-project-quick-switch-pane"><div class="ms-left-nav-popup-panel__header"><div class="ms-left-nav-popup-panel__header-title">Pagine Statiche</div></div><div class="ms-hack-scrollbar ms-left-nav-popup-panel__body"></div></div></div><div class="ms-left-nav-popup-panel__arrow"></div></div></div>');
  var submenu_row_struct = $('<a><div class="ms-sub-menu"></div></a>');
  var mobile_menu_struct = $('<div> <div class="ms-floating-panel-mobile mobile_menu"> <div class="ms-floating-panel-mobile__container"> <div class="ms-floating-panel-mobile__close"><i class="fas fa-times"></i></div> <div class="ms-floating-panel-body"><div class="tm-transaction-properties-pane tm-hack-scrollbar"></div></div> </div> </div> </div>');
  var mobile_menu_item_struct = $('<div class="menu_item"><div class="menu_item__main"><a><span></span></a></div><div class="menu_item__sub-items"></div></div>');
  var mobile_submenu_struct = $('<div class="menu_item__sub-items__item"><a><span></span></a></div>');

  function mobile_menu(root){
    this.root = root;
  }

  $('.ms-nav-item__parent').hover(function(){
    var elIndex = $(this).index() + 1;
    setHoverAction(elIndex, $(this));
  },  function(){
    var self = $(this);
    tooltip.removeClass('ms-tooltip-visible');
    setTimeout(function(){
      if(!self.find('.ms-left-nav-popup-panel__chest').hasClass("hover")){
        self.find('.ms-left-nav-popup-panel').remove();
      }
    }, 100);
  });

  $(document).on( 'mouseenter mouseleave', '.ms-left-nav-popup-panel__chest', function() {
        $(this).toggleClass('hover');
     }
  );

  $(document).on( 'mouseleave', '.ms-left-nav-popup-panel__chest', function() {
        $('.ms-left-nav-popup-panel').remove();
     }
  );

  $('.ms-menu__mobile').click(function(){
      var mo_menu = new mobile_menu();
      mo_menu.init();
  });

  function setTooltip(item, title){
    try {
      if(!item)
        throw new TypeError('setTooltip - item undefined!');

      if(!tooltip)
        throw new TypeError('setTooltip - tooltip undefined!');

      if(!title)
        throw new TypeError('setTooltip - title undefined!');

      tooltip.toggleClass('ms-tooltip-visible');
      tooltip.css({ left : 46, top : (item.position().top + 70) });
      tooltip.find('.ms-tooltip__content').html(title);

    } catch (e) {
      console.log(e.message);
    }
  }

  function setMenu(index, item, title, submenus){
    try {
      if(!item)
        throw new TypeError('setMenu - item undefined!');

      if(!title)
        throw new TypeError('setMenu - title undefined!');

      if(!submenus || !(submenus && submenus.length > 0))
        throw new TypeError('setMenu - submenus undefined!');



    } catch (e) {
      console.log(e.message);
    }
  }

  function getMenuElement(item_value){
    try {
      if(!item_value)
        throw new TypeError('getMenuElement - item_value undefined');

      var element = {
        type : 0, // 1 single item, 2 hasSubItems
        mainTitle : null,
        link : null,
        submenus : []
      };

      switch (item_value) {
        case "admin":
          element.type = 1;
          element.mainTitle = "Administrator";
          element.link = "/_gestione/adminaccount.php";
          element.openExternally = true;
          break;
        case "pagine-stat":
          element.type = 2;
          element.mainTitle = "Pagine Statiche";
          element.submenus = [{
            title : 'Chi siamo',
            link : URL_GEST + 'pagina.php?pagina=chisiamo',
            openExternally : true
          },{
            title : 'Cosa facciamo',
            link : URL_GEST + 'pagina.php?pagina=cosafacciamo',
            openExternally : true
          },{
            title : 'Offerte speciali',
            link : URL_GEST + 'pagina.php?pagina=offertespeciali',
            openExternally : true
          },{
            title : 'Sei un proprietario?',
            link : URL_GEST + 'pagina.php?pagina=landlordAd',
            openExternally : true
          },{
            title : 'Privacy',
            link : URL_GEST + 'pagina.php?pagina=privacy',
            openExternally : true
          },{
            title : 'Sitemap',
            link : URL_GEST + 'pagina.php?pagina=sitemap',
            openExternally : true
          },{
            title : 'Contatti',
            link : URL_GEST + 'pagina.php?pagina=contatti',
            openExternally : true
          },{
            title : 'Convenzioni',
            link : URL_GEST + 'pagina.php?pagina=convenzioni',
            openExternally : true
          },{
            title : 'Vuoi investire?',
            link : URL_GEST + 'pagina.php?pagina=investitori',
            openExternally : true
          },{
            title : 'Sei un&#8216;agenzia?',
            link : URL_GEST + 'pagina.php?pagina=agenzie',
            openExternally : true
          },{
            title : 'Politecnico',
            link : URL_GEST + 'pagina.php?pagina=polimi',
            openExternally : true
          },{
            title : 'Università Cattolica',
            link : URL_GEST + 'pagina.php?pagina=unicatt',
            openExternally : true
          },{
            title : '24 ore business school',
            link : URL_GEST + 'pagina.php?pagina=24orebs',
            openExternally : true
          },{
            title : 'Bocconi',
            link : URL_GEST + 'pagina.php?pagina=bocconi',
            openExternally : true
          },{
            title : 'IULM',
            link : URL_GEST + 'pagina.php?pagina=iulm',
            openExternally : true
          },{
            title : 'Cookies Policy',
            link : URL_GEST + 'pagina.php?pagina=cookies-policy',
            openExternally : true
          },{
            title : 'Informativa Sito',
            link : URL_GEST + 'pagina.php?pagina=informativasito',
            openExternally : true
          },{
            title : 'Terms of use',
            link : URL_GEST + 'pagina.php?pagina=termsofuse',
            openExternally : true
          },{
            title : 'Informativa Cookies',
            link : URL_GEST + 'pagina.php?pagina=informativacookies',
            openExternally : true
          }];
          break;
        case "properties":
          element.type = 2;
          element.mainTitle = "Proprietà";
          element.submenus = [{
            title : 'Dashboard',
            link : URL_GEST + 'properties/#/dashboard/',
            openExternally : false
          },{
            title : 'Proprietà',
            link : URL_GEST + 'properties/#/main/',
            openExternally : false
          },{
            title : 'Proprietari e Agenzie',
            link : URL_GEST + 'properties/#/owners-agencies/',
            openExternally : false
          }];
          break;
        case "clients":
          element.type = 1;
          element.mainTitle = "Clienti";
          element.link = "/_gestione/clientsManager.php";
          element.openExternally = false;
          break;
        case "invoices":
          element.type = 2;
          element.mainTitle = "Fatturazione";
          element.submenus = [{
            title : 'Dashboard',
            link : URL_GEST + 'invoices/#/dashboard/',
            openExternally : false
          },{
            title : 'Fatturazione attiva',
            link : URL_GEST + 'invoices/#/fatture-attive/',
            openExternally : false
          },{
            title : 'Fatturazione passiva',
            link : URL_GEST + 'invoices/#/fatture-passive/',
            openExternally : false
          },{
            title : 'Bozze',
            link : URL_GEST + 'invoices/#/bozze/',
            openExternally : false
          },{
            title : 'Notifiche',
            link : URL_GEST + 'invoices/#/notifiche/',
            openExternally : false
          },{
            title : 'Conteggi di chiusura',
            link : URL_GEST + 'conteggi_chiusura.php',
            openExternally : false
          }];
          break;
        case "transactions":
          element.type = 2;
          element.mainTitle = "Transazioni";
          element.submenus = [{
            title : 'Transazioni',
            link : URL_GEST + 'transactions.php',
            openExternally : false
          },{
            title : 'Controllo pagamenti',
            link : URL_GEST + 'gestione_pagamenti.php',
            openExternally : false
          }];
          break;
        case "tickets":
          element.type = 1;
          element.mainTitle = "Tickets";
          element.link = "/_gestione/tickets";
          element.openExternally = false;
          break;
        case "booking":
          element.type = 1;
          element.mainTitle = "Booking";
          element.link = "/_gestione/booking.php";
          element.openExternally = false;
          break;
        case "notif-center":
          element.type = 1;
          element.mainTitle = "Centro Notifiche";
          element.link = "/_gestione/notificationsCenter.php";
          element.openExternally = false;
          break;
        case "more":
          element.type = 2;
          element.mainTitle = "Altro";
          element.submenus = [{
            title : 'Posti auto',
            link : URL_GEST + 'postiauto_sommario.php',
            openExternally : true
          },{
            title : 'Zone',
            link : URL_GEST + 'zone.php',
            openExternally : true
          },{
            title : 'Richiedenti',
            link : URL_GEST + 'richiedenti.php',
            openExternally : true
          },{
            title : 'Anteprima sito con tutte le stanze',
            link : URL_HOST + '?invisible=1',
            openExternally : true
          }];
          break;
        case "logout":
          element.type = 1;
          element.mainTitle = "Logout";
          element.link = "/_gestione/login/?action=logout";
          element.openExternally = false;
          break;
      }

      return element;
    } catch (e) {
      console.log(e.message);
    }
  }

  function setLeftMenu(index, item, title, submenus){
    try {
      if(!item)
        throw new TypeError('setLeftMenu - item undefined!');

      if(!title)
        throw new TypeError('setLeftMenu - title undefined!');

      if(!submenus || !(submenus && submenus.length > 0))
        throw new TypeError('setLeftMenu - submenus undefined!');

      var clone_leftMenu = leftMenu_struct.clone();
      var leftMenu_item = leftNav.find('> div:nth-child(' + index + ')');
      clone_leftMenu.find('.ms-left-nav-popup-panel__header-title').html(title);

      for (var i = 0; i < submenus.length; i++) {
        var submenu = submenus[i];
        var submenu_row = submenu_row_struct.clone();
        submenu_row.attr('href', submenu.link);
        submenu_row.find('.ms-sub-menu').html(submenu.title);
        if(submenu.openExternally){
          submenu_row.attr('target', '_blank');
        }
        clone_leftMenu.find('.ms-left-nav-popup-panel__body').append(submenu_row);
      }

      leftMenu_item.append(clone_leftMenu);
      leftMenu_item.find('.ms-left-nav-popup-panel__arrow').css({ top : (item.position().top + 15) });

    } catch (e) {
      console.log(e.message);
    }
  }

  function setHoverAction(index, item){
    try {
      if(!index)
        throw new TypeError('setHoverAction - index undefined!');

      if(!item)
        throw new TypeError('setHoverAction - item undefined!');

      var item_value = item.attr('data-item');

      switch (item_value) {
        case "admin":
        case "clients":
        case "tickets":
        case "booking":
        case "notif-center":
        case "logout":
          var menuEl = getMenuElement(item_value);
          setTooltip(item, menuEl.mainTitle);
          break;
        case "properties":
        case "pagine-stat":
        case "invoices":
        case "transactions":
        case "more":
          var menuEl = getMenuElement(item_value);
          var submenus = menuEl.submenus;
          setLeftMenu(index, item, menuEl.mainTitle, submenus);
          break;
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  mobile_menu.prototype.init = function(){
    try {
      var self = this;

      this.root = $('.ms-popup-layer .ms-popup-layer__portal');

      if(!this.root.is(":visible")){
        this.root.css("display", "unset");
      }

      var clone_struct = mobile_menu_struct.clone();
      clone_struct.addClass('animated fadeInDownBig');

      this.root.html(clone_struct);
      this.setMenuItems(function(){
        self.setListeners();
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  mobile_menu.prototype.setMenuItems = function(callback){
    try {

      var self = this;

      if(!this.root)
        throw new TypeError('mobile_menu - setMenuItems : this.root undefined!');

      if(!callback)
        throw new TypeError('mobile_menu - setMenuItems : callback undefined!');

      var admin = new Admin();
      admin.Load(function(){

        if(admin.isAdministrator()){
          self.loadItem(getMenuElement("admin"));
          self.loadItem(getMenuElement("pagine-stat"));
        }

        if(admin.isAdministrator() || admin.isContabile() || admin.isAgente() || admin.canReadInvoices() || admin.isDataEntry() || admin.recuperoCrediti()){
          self.loadItem(getMenuElement("properties"));
        }

        if(admin.canReadItt() || admin.isAdministrator() || admin.isContabile() || admin.isDataEntry() || admin.isCommercialista() || admin.recuperoCrediti() || admin.isAgente()){
          self.loadItem(getMenuElement("clients"));
        }

        if(admin.isAdministrator() || admin.isContabile() || admin.isCommercialista() || admin.canReadInvoices()){
          self.loadItem(getMenuElement("invoices"));
        }

        if(admin.canReadItt() || admin.isAdministrator() || admin.isContabile() || admin.isDataEntry() || admin.isCommercialista()){
          self.loadItem(getMenuElement("transactions"));
        }

        if(admin.isAdministrator() || admin.isContabile() || admin.canAccessTicket()){
          self.loadItem(getMenuElement("tickets"));
        }

        if(admin.isAdministrator() || admin.isContabile() || admin.isAgente()){
          self.loadItem(getMenuElement("booking"));
        }

        if(admin.isAdministrator() || admin.isContabile()){
          self.loadItem(getMenuElement("notif-center"));
        }

        if(admin.canReadItt() || admin.isAdministrator() || admin.isContabile() || admin.isDataEntry() || admin.recuperoCrediti() || admin.isAgente()){
          self.loadItem(getMenuElement("more"));
        }

        self.loadItem(getMenuElement("logout"));

        callback();
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  mobile_menu.prototype.setListeners = function(){
    try {
      var self = this;

      $('.hasSubItems').click(function(){
        var toggleIcon = $(this).find('.menu_item__main i');
        var isClosed = toggleIcon.hasClass('fa-chevron-down');
        if(isClosed){
          toggleIcon.removeClass('fa-chevron-down').addClass('fa-chevron-up');
        }else{
          toggleIcon.removeClass('fa-chevron-up').addClass('fa-chevron-down');
        }
        $(this).find('.menu_item__sub-items').toggleClass('sub-items__show');
      });

      $('.mobile_menu .ms-floating-panel-mobile__close').click(function(){
        //$('.mobile_menu').parent().remove();
        $('.mobile_menu').parent().addClass('animated fadeOutUpBig');
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  mobile_menu.prototype.loadItem = function(el){
    try {

      if(!this.root)
        throw new TypeError('mobile_menu - loadItem : this.root undefined!');

      if(!el)
        throw new TypeError('mobile_menu - loadItem : el undefined!');

      var root = this.root;
      var struct = mobile_menu_item_struct.clone();

      switch (el.type) {
        case 1:
          struct.find('.menu_item__main a').attr('href', el.link);
          struct.find('.menu_item__main span').html(el.mainTitle);
          if(el.openExternally){
            struct.find('.menu_item__main a').attr('target', '_blank');
          }
          break;
        case 2:
          struct.addClass('hasSubItems');
          struct.find('.menu_item__main a').append('<i class="fas fa-chevron-down toggle_icon"></i>');
          struct.find('.menu_item__main span').html(el.mainTitle);
          var submenus = el.submenus;
          for (var i = 0; i < submenus.length; i++) {
            var submenu = submenus[i];
            var submenu_struct = mobile_submenu_struct.clone();
            submenu_struct.find('a').attr('href', submenu.link);
            submenu_struct.find('span').html(submenu.title);
            if(submenu.openExternally){
              submenu_struct.find('a').attr('target', '_blank');
            }
            struct.find('.menu_item__sub-items').append(submenu_struct);
          }
          break;
      }

      root.find('.tm-transaction-properties-pane').append(struct);

    } catch (e) {
      console.log(e.message);
    }
  }

})();
