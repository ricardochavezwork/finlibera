function togglePanel(root, elementsManager){
  this.root = root;
  this.elementsManager = elementsManager;
}

(function(){

  var clone = null;
  var structure = {
    content : $('<div class="togglePanel"><div class="togglePanel_lef-space"></div><div class="togglePanel_content"><div class="togglePanel_content-actionsPanel"><div class="togglePanel_inputSearch"><i class="material-icons">search</i><input type="text" class="togglePanel_inputSearch-input" placeholder="Ricerca" value=""></div><div class="togglePanel_closePanel" title="Chiudi"><i class="material-icons">close</i></div></div><div class="togglePanel_content-elementList tm-list tm-hack-scrollbar"></div></div></div>'),
    roots : {
      root : " .togglePanel"
    }
  }

  structure.roots.searchInput = structure.roots.root + " .togglePanel_content .togglePanel_inputSearch .togglePanel_inputSearch-input";
  structure.roots.closePanel = structure.roots.root + " .togglePanel_content .togglePanel_closePanel";
  structure.roots.elementList = structure.roots.root + " .togglePanel_content .togglePanel_content-elementList";

  var searchInput = {
    getTerm : function(){
      try {
        if(!clone)
          throw new TypeError('searchInput - getTerm : clone undefined');
        var val = clone.root.find(structure.roots.searchInput).val();

        return val;
      } catch (e) {
        console.log(e.message);
      }
    }
  }

  togglePanel.prototype.init = function(){
    try {
      var self = this;

      if(!this.root)
        throw new TypeError('togglePanel - init : this.root undefined');

      clone = this;
      this.loadStruct();
      this.listeners();

      this.root.find(structure.roots.searchInput).focus();

    } catch (e) {
      console.log(e.message);
    }
  }

  togglePanel.prototype.loadStruct = function(){
    try {
      if(!this.root)
        throw new TypeError('togglePanel - loadStruct : this.root undefined');

      if(!this.root.has('div')){
        this.root.append(structure.content);
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  togglePanel.prototype.listeners = function(){
    var self = this;
    this.root.find(structure.roots.closePanel).click(function(){
      self.closePanel();
    });

    this.root.find(structure.roots.searchInput).keyup(function(event){
      var termine = searchInput.getTerm();
      self.elementsManager.setRows(termine);
    });

  }

  togglePanel.prototype.loadElements = function(){
    try {
      var self = this;

      if(!this.root)
        throw new TypeError('togglePanel - loadElements : this.root undefined');

      if(!this.elementsManager)
        throw new TypeError('togglePanel - loadElements : this.elementsManager undefined');

      this.emptyList();
      if(this.elementsManager.rows && this.elementsManager.rows.length > 0){
        var elements = this.elementsManager.rows;
        for (var i = 0; i < elements.length; i++) {
          var row = elements[i];
          var index = this.root.find(structure.roots.elementList + ' > div').length + 1;
          row.index = index;

          if(row.structure){
            this.root.find(structure.roots.elementList).append(row.structure);
            var root = this.root.find(structure.roots.elementList + ' > div:nth-child(' + index + ')');
            row.root = root;
            row.init();
          }

        }
      }else{
        //Messaggio "Nessun risultato"
      }

    } catch (e) {
      console.log(e.message);
    }

  }

  togglePanel.prototype.emptyList = function(){
    this.root.find(structure.roots.elementList).empty();
  }

  togglePanel.prototype.closePanel = function(){
    this.root.toggle();
  }

})();
