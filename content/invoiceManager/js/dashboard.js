function sec_dashboard(invoiceApp_ui, sectionNumber){
  this.invoiceApp_ui = invoiceApp_ui;
  this.sectionNumber = sectionNumber;
}

(function(){

  /**
   * #NB - [Non c'è bisogno di una lista come le altre su questa sezione. Al massimo devono essere molto corte e molto specifiche.]
   */

  var clone = null;
  var items = new Array();

  sec_dashboard.prototype.init = function(){
    try {
      var self = this;

      if(!this.invoiceApp_ui)
        throw new TypeError('sec_dashboard - init : this.invoiceApp_ui undefined!');

      this.invoiceApp_ui.setActiveStatusSectionByNumber(this.sectionNumber);

      clone = self;

      var rootKanbanLists = this.invoiceApp_ui.rootKanbanLists;
      rootKanbanLists.empty();

      var comingSoon = $('<div style=" display: flex; flex-wrap: wrap; justify-content: space-between; margin: 15px; padding: 15px; flex-direction: column; "><h1 style=" color: #1e5c86; font-weight: bold;">In arrivo... </h1><h3 style=" color: #1e5c86;">Questa sezione verrà dedicata a statistiche</h3><img src="https://vulcanovillage.com/wp-content/uploads/2018/06/Coming-Soon.png" style=" width: 40%;"></div>');

      $('.ms-scrollable-layout').css('background-color', '#F2F6FA');
      rootKanbanLists.append(comingSoon);

    } catch (e) {
      console.log(e.message);
    }
  }

})();
