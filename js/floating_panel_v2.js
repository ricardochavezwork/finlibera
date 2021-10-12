function floatingPanelV2(root, rootContent, rootHeader, rootMetaData, structure){
  this.root = root;
  this.rootContent = rootContent;
  this.rootHeader = rootHeader;
  this.rootMetaData = rootMetaData;
  this.structure = structure;
}

(function(){

  var structure = $('<div class="tm-floating-panel-desktop__container"> <div class="tm-floating-panel-desktop__close ax-floating-panel-close"> <i class="tm-icon tm-icon-close name_close"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></i> </div> <div class="tm-floating-panel-body ax-floating-panel-body"> <div class="tm-transaction-properties"> <header class="tm-transaction-properties-header"> <div class="description"> <div class="tm-transaction-properties-header__title"> <div class="tm-editable-textarea" style="font-size: 18px; font-weight: 600; padding: 0px;"> <div class="tm-editable-textarea__content" style="max-height: 100px; overflow-y: hidden; word-wrap: break-word;"></div><div class="tm-editable-textarea__importo"></div> </div> <span class="tm-tooltip__dummy-element"></span> </div> <div class="description-meta description-meta__top"></div> <div class="description-meta description-meta__bottom"></div> <div class="description-seenby"></div> </div> </header> <div class="tm-transaction-properties-body ax-transaction-properties-drop-zone"> <div class="tm-property-tabs"> <div class="tm-property-tabs__tabs-v2"> </div> <div class="tm-property-tabs__content"> <div class="tm-transaction-properties-pane tm-hack-scrollbar"></div> </div> </div> </div> </div> </div> </div>');

  var mobile_struct = $('<div class="ms-floating-panel-mobile"> <div class="ms-floating-panel-mobile__container"> <div class="ms-floating-panel-mobile__close"><i class="fas fa-times"></i></div> <div class="ms-floating-panel-body"><div class="tm-floating-panel-desktop__container"><div class="tm-floating-panel-body ax-floating-panel-body"> <div class="tm-transaction-properties"> <header class="tm-transaction-properties-header"> <div class="description"> <div class="tm-transaction-properties-header__title"> <div class="tm-editable-textarea" style="font-size: 18px; font-weight: 600; padding: 0px;"> <div class="tm-editable-textarea__content" style="max-height: 100px; overflow-y: hidden; word-wrap: break-word;"></div><div class="tm-editable-textarea__importo"></div> </div> <span class="tm-tooltip__dummy-element"></span> </div> <div class="description-meta description-meta__top"></div> <div class="description-meta description-meta__bottom"></div> <div class="description-seenby"></div> </div> </header> <div class="tm-transaction-properties-body ax-transaction-properties-drop-zone"> <div class="tm-property-tabs"> <div class="tm-property-tabs__tabs-v2"> </div> <div class="tm-property-tabs__content"> <div class="tm-transaction-properties-pane tm-hack-scrollbar"></div> </div> </div> </div> </div> </div> </div></div> </div> </div>');

  floatingPanelV2.prototype.init = function(){
    try {

      var isDesktop = $('.main-layout__left-nav').is(":visible");

      if(!this.structure){
        this.structure = isDesktop ? structure : mobile_struct;
      }

      this.root = isDesktop ? $('section.main-layout_content .tm-floating-panel-desktop-v2') : $('.ms-popup-layer__portal');

      this.setStructure();
      this.listeners();

    } catch (e) {
      console.log(e.message);
    }
  }

  floatingPanelV2.prototype.setStructure = function(){
    try {

      var self = this;
      if(!this.root)
        throw new TypeError("floatingPanelV2 - setStructure : this.root undefined");

      if(!this.structure)
        throw new TypeError("floatingPanelV2 - setStructure : this.structure undefined");

      var str = this.structure.clone();
      this.root.empty();
      this.root.append(str);
      this.root.css("display","");

      this.rootContent = this.root.find('.tm-property-tabs__content .tm-transaction-properties-pane.tm-hack-scrollbar');
      this.rootHeader = this.root.find('header.tm-transaction-properties-header');

      if(this.setHeader){
        this.setHeader();
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  /**
   * - Apertura/Chiusura del  pannello.
   */
  floatingPanelV2.prototype.listeners = function(){
    try {
      var self = this;

      if(!this.root)
        throw new TypeError("floatingPanelV2 - listeners : this.root undefined");

      this.root.find('.ax-floating-panel-close, .ms-floating-panel-mobile__close').click(function(event){
        var isFloatingPanel = $('.tm-floating-panel-desktop__container').is(":visible");

        if($('.tm-floating-panel-desktop__container').length){
          self.root.empty();
          self.root.css("display", "none");
        }

      });

    } catch (e) {
      console.log(e.message);
    }
  }

  /**
   * Questa funzione verrà utilizzata esternamente.
   */
  floatingPanelV2.prototype.setTextHeader = function(){

  }

  /**
   * Questa funzione verrà utilizzata esternamente.
   */
  floatingPanelV2.prototype.setTextMetaData = function(){

  }

  /**
   * Questa funzione verrà utilizzata esternamente. Servirà per cambiare il contenuto del pannello, ma senza chiuderlo.
   */
  floatingPanelV2.prototype.emptyContent = function(){

  }

  /**
   * Chiusura del Floating Panel
   */
  floatingPanelV2.prototype.closePanel = function(){
    try {
      var self = this;

      if(!this.root)
        throw new TypeError('floatingPanelV2 - closePanel : this.root undefined!');

      var isFloatingPanel = $('.tm-floating-panel-desktop__container').is(":visible");

      if($('.tm-floating-panel-desktop__container').length){
        this.root.find('.ax-floating-panel-close, .ms-floating-panel-mobile__close').click();
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  /**
   * Ritorna un root della sezione creata. Questa funzione verrà utilizzata esternamente.
   */
  floatingPanelV2.prototype.addNewSection = function(title){
    try {
      var self = this;

      if(!this.root)
        throw new TypeError('floatingPanelV2 - addNewSection : this.root undefined');

      if(!title)
        throw new TypeError('floatingPanelV2 - addNewSection : title undefined');

      var str_section = $('<div class="tm-property-tabs__tab-v2 ax-transaction-properties-tab active" data-tab-name="properties"><div></div></div>');
      var rootList = this.root.find('.tm-property-tabs__tabs-v2');
      var index = rootList.find(' > div').length + 1;
      var root = null;

      var str = str_section.clone();
      str.find('div').html(title);

      rootList.append(str);
      root = rootList.find(' > div:nth-child(' + index + ')');

      return root;
    } catch (e) {
      console.log(e.message);
    }
  }

})();
