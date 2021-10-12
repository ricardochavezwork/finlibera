
function autocomplete_Intestatario(filtro, resultsContainer, searchIntestatario){
  this.filtro = filtro;
  this.resultsContainer = resultsContainer;
  this.searchIntestatario = searchIntestatario;
}

(function(){

  var row_ui = $('<div class="ms-row-struct"><div class="ms-row-content_row-color"></div><div class="ms-row-content_row-content"><div class="ms-row-content_row-content_top-row"><div class="ms-row-content_row-content_top-row-left"></div><div class="ms-row-content_row-content_top-row-right"></div></div><div class="ms-row-content_row-content_bottom-row"><div class="ms-row-content_row-content_bottom-row_left"></div><div class="ms-row-content_row-content_bottom-row_right"></div></div></div></div>');
  var clone = null;

  autocomplete_Intestatario.prototype.init = function(callback){
    var self = this;
    var intestatario = new Intestatario();
    if (self.filtro && self.resultsContainer) {
      clone = self;
      intestatario.Search(self.filtro, function(res){
        if (res.Data && res.Data.length > 0) {
          var array = res.Data;
          self.LoadResults(array);
        } else {
          var newFornitoreBtn = new addFornitore();
          newFornitoreBtn.init(function(id){
            if (id && id >= 0) {
              newFornitoreBtn.startEvent(id);
            }
          });
        }
      });
    }

  }

  /**
   * 1. Caricamento HTML dei Risultati
   * 2. I risultati saranno oggetti JS di modo che evitiamo di aggiungere data-id
   */
  autocomplete_Intestatario.prototype.LoadResults = function(array){
    if (array && array.length > 0) {
      clone.resultsContainer.empty();
      //console.log("Svuota");
      /*for (var i = 0; i < array.length; i++) {
        var row = array[i];
        var ui = new row_result(row);
        ui.init(function(id){
          if (id >= 0) {
            ui.startEvent(id);
          }
        });
      }*/

      each(array, function (key, registro, index){
        var row = array[key];
        var ui = new row_result(row);
        ui.init(function(id){
          if (id >= 0) {
            ui.startEvent(id);
          }
          if (key === (array.length - 1) && array.length < 6) {
            var idBtn = id + 1;
            var newFornitoreBtn = new addFornitore();
            newFornitoreBtn.init(function(idBtn){
              if (idBtn && idBtn >= 0) {
                newFornitoreBtn.startEvent(idBtn);
              }
            });
          }
        });
      });
    }
  }

  /**
   * Nel Caso di un Inquilino : Verranno caricati i giustificativi di tale Intestatario.
   * Nel caso di un AltroCliente : -
   * Nel caso di un Fornitore : Al Click - Automaticamente ci sarà la schermata per l'inserimento di un servizio/fattura. La tipologia di servizio potrà anche esso essere stabilito in base al fornitore.
   */
  function row_result(Intestatario){
    this.Intestatario = Intestatario;
  }

  row_result.prototype.init = function(callback){
    try {
      if(!clone)
        throw new TypeError('row_result - init : clone undefined');
      if(!this.Intestatario || !(this.Intestatario instanceof Intestatario))
        throw new TypeError('row_result - init : this.Intestatario undefined');
      if(!callback)
        throw new TypeError('row_result - init : this method needs a callback function!');

      var struct = row_ui.clone();
      var background = struct.find('.ms-row-content_row-color');
      var tipoIntestatario = struct.find('.ms-row-content_row-content .ms-row-content_row-content_top-row-left');
      var nome = struct.find('.ms-row-content_row-content .ms-row-content_row-content_bottom-row_left');
      var id = clone.resultsContainer.find(' > div').length + 1;

      if (parseInt(this.Intestatario.Type) === 1) {
        background.css('background', '#8bc34a');
      } else {
        background.css('background', '#00bcd4');
      }

      tipoIntestatario.append(this.Intestatario.getTextTipologia());
      nome.append(this.Intestatario.getNominativo());
      var containerParent = clone.resultsContainer.parent();
      var defaultWidth = (containerParent.width() / 3) - 5;
      struct.css('width', defaultWidth + 'px');
      clone.resultsContainer.append(struct);

      callback(id);
    } catch (e) {
      console.log(e.message);
    }
  };

  row_result.prototype.startEvent = function(id){
    var self = this;
    var el = [self.Intestatario];
    //console.log(el);
    if (id >= 0) {
      //console.log("Id : " + id);

      clone.resultsContainer.find('> div:nth-child(' + id + ')').click(function() {
        //console.log("Id : " + id);
        //console.log(self.Intestatario);
        clone.resultsContainer.empty();
        clone.searchIntestatario.Input.getElement().val("").focus();
        clone.searchIntestatario.IntestatariResults.Load(el);
      });



    }
  }

  function addFornitore(){
  };

  addFornitore.prototype.init = function(callback){

    try {

      if(!callback)
        throw new TypeError('addFornitore - init : this method needs a callback!');

      var struct = row_ui.clone();
      struct.addClass('newFornitore');
      var background_left = struct.find('.ms-row-content_row-color');
      var background_right = struct.find('.ms-row-content_row-content');
      var tipoIntestatario = struct.find('.ms-row-content_row-content .ms-row-content_row-content_top-row-left');
      var icon = struct.find('.ms-row-content_row-content .ms-row-content_row-content_bottom-row_left');
      var text = struct.find('.ms-row-content_row-content .ms-row-content_row-content_bottom-row_right');
      var id = clone.resultsContainer.find(' > div').length + 1;

      background_left.css('background', '#00bcd4');
      background_right.css('background', '#00bcd4');
      icon.css('#ffffff');
      icon.append('<i class="tm-icon" style="color: #ffffff;"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></i>');

      text.css('text-align', 'center !important');
      text.append('<strong style="color: #ffffff;font-size: 17px;">Nuovo Fornitore</strong>');
      var containerParent = clone.resultsContainer.parent();
      var defaultWidth = (containerParent.width() / 3) - 5;
      struct.css('width', defaultWidth + 'px');
      clone.resultsContainer.append(struct);

      callback(id);
    } catch (e) {
      console.log(e.message);
    }
  };

  addFornitore.prototype.startEvent = function(id){
    var self = this;

    if (id >= 0) {
      clone.resultsContainer.find('> div:nth-child(' + id + ')').click(function() {

        var newFornitore = new fornitore_ui();
        newFornitore.term = clone.searchIntestatario.Input.getValue();
        clone.searchIntestatario.Content.empty();

        newFornitore.rootPanel = clone.searchIntestatario.Content.RootPane();
        newFornitore.prevAction = function(){
          clone.searchIntestatario.Content.setDefaultContent();
        };
        newFornitore.nextAction = function(array){
          clone.searchIntestatario.Content.TransactionPropertiesBody.Root = $("section.main-layout_content");
          var selectIntestatario = new Content_SelectIntestatario(clone.searchIntestatario.Content, clone.searchIntestatario.Movimento);
          selectIntestatario.ini(function(){
            clone.searchIntestatario.IntestatariResults.Load(array);
          });
        }
        newFornitore.init();
      });
    }
  }

})();
