function sec_dashboard(propertyApp_ui, sectionNumber){
  this.propertyApp_ui = propertyApp_ui;
  this.sectionNumber = sectionNumber;
}

(function(){

  var clone = null;
  var items = new Array();

  sec_dashboard.prototype.init = function(){
    try {
      var self = this;

      if(!this.propertyApp_ui)
        throw new TypeError('sec_dashboard - init : this.propertyApp_ui undefined!');

      this.propertyApp_ui.setActiveStatusSectionByNumber(this.sectionNumber);

      clone = self;

      var rootKanbanLists = this.propertyApp_ui.rootKanbanLists;
      rootKanbanLists.empty();

      var comingSoon = $('<div style=" display: flex; flex-wrap: wrap; justify-content: space-between; margin: 15px; padding: 15px; flex-direction: column; "><h1 style=" color: #1e5c86; font-weight: bold;">In arrivo... </h1><h3 style=" color: #1e5c86;">Questa sezione verrà dedicata a statistiche</h3><img src="https://vulcanovillage.com/wp-content/uploads/2018/06/Coming-Soon.png" style=" width: 40%;"></div>');

      $('.ms-scrollable-layout').css('background-color', '#F2F6FA');

      rootKanbanLists.append('<div id="chart_div_one" style=" position: relative; height: 500px; width: 100%;"></div><div id="chart_div_two" style=" position: relative; height: 500px; width: 100%;"></div>');

      var admin = new Admin();
      admin.Load(function(){
        self.loadStoricoAcquisizioniByYear(function(items){

          google.charts.load('current', {packages: ['corechart', 'line']});
          google.charts.setOnLoadCallback(drawBasic);

          function drawBasic() {

            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Anno');
            data.addColumn('number', 'Proprietà acquisite');

            data.addRows(items);

            var options = {
              title:'Storico acquisizioni per anno',
              hAxis: {
                title: 'Anno'
              },
              vAxis: {
                title: 'Acquisizioni'
              },
              legend: { position: 'bottom', alignment: 'start' },
              crosshair: {
                color: '#000',
                trigger: 'selection'
              },
              backgroundColor: '#f2f6fa',
            };

            var chart = new google.visualization.LineChart(document.getElementById('chart_div_one'));

            chart.draw(data, options);
          }

        });

        self.loadStoricoAcquisizioniByMonth(function(items){

          google.charts.load('current', {packages: ['corechart', 'line']});
          google.charts.setOnLoadCallback(drawBasic);

          function drawBasic() {

            var data = new google.visualization.DataTable();
            data.addColumn('number', 'Mese');
            for (var i = 2017; i <= ((new Date()).getFullYear()); i++) {
              data.addColumn('number', i);
            }

            data.addRows(items);

            var options = {
              title:'Storico acquisizioni per mese - Ultimi 3 anni',
              hAxis: {
                title: 'Mese'
              },
              vAxis: {
                title: 'Acquisizioni'
              },
              legend: { position: 'bottom', alignment: 'start' },
              crosshair: {
                color: '#000',
                trigger: 'selection'
              },
              backgroundColor: '#f2f6fa',
            };

            var chart = new google.visualization.LineChart(document.getElementById('chart_div_two'));

            chart.draw(data, options);
          }

        });
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  sec_dashboard.prototype.loadStoricoAcquisizioniByYear = function(callback){
    try {
      var self = this;

      if(!callback)
        throw new TypeError('sec_dashboard - loadStoricoAcquisizioniByYear : callback undefined.');

        $.ajax({
            method: "POST",
            url: '?action=loadStoricoAcquisizioniByYear'
        }).done(function(res){

          if(res && res.Data){
            callback(res.Data);
          }else{
            bootbox.alert('Errore durante il caricamento dello Storico Acquisizioni Per Anno.');
          }

        }).fail(function(xhr, status, error) {
          DefaultErrorHandler(xhr, status, error);
        });

    } catch (e) {
      console.log(e.message);
    }
  }

  sec_dashboard.prototype.loadStoricoAcquisizioniByMonth = function(callback){
    try {
      var self = this;

      if(!callback)
        throw new TypeError('sec_dashboard - loadStoricoAcquisizioniByMonth : callback undefined.');

        $.ajax({
            method: "POST",
            url: '?action=loadStoricoAcquisizioniByMonth'
        }).done(function(res){

          if(res && res.Data){
            callback(res.Data);
          }else{
            bootbox.alert('Errore durante il caricamento dello Storico Acquisizioni Per Mese.');
          }

        }).fail(function(xhr, status, error) {
          DefaultErrorHandler(xhr, status, error);
        });

    } catch (e) {
      console.log(e.message);
    }
  }

})();
