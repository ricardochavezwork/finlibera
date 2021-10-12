function kanban_list(parentRoot, secTitle, itemsManager, index, root){
  this.parentRoot = parentRoot;
  this.secTitle = secTitle;
  this.itemsManager = itemsManager;
  this.index = index;
  this.root = root;
  this.rootList = "div.kanban-items.ms-hack-scrollbar";
}

(function(){
  var clone = null;
  var structure = {
    content : $('<div class="kanban-list kanban-items-container"> <section class="ms-list-wide"> <div class="kanban-items ms-hack-scrollbar"> <!-- Elementi della lista --> </div> <div class="ms-list-wide__frame-top"> <!-- divisore/header di lista --> <div> <div class="ms-list-header"> <div class="ms-list-header__left"> <div class="ms-text-container"> <span class="ms-textfield__text secTitle"><!-- Titolo --></span> </div> </div> <div class="ms-list-header__right"></div> </div> </div> </div> </section> </div>'),
    roots : {
      root : ""
    }
  }

  kanban_list.prototype.init = function(callback){
    try {
      var self = this;

      if(!this.parentRoot)
        throw new TypeError('kanban_list - init : this.parentRoot undefined');

      clone = this;
      this.setStructure();
      this.listeners();

      if(callback){
        this.loadElements(null, function(){
          callback();
        });
      }else{
        this.loadElements(null);
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  kanban_list.prototype.reload = function(callback) {
    try {
      var self = this;

      if(!this.root)
        throw new TypeError('kanban_list - reload : this.root undefined');

      this.root.find(self.rootList).empty();

      if(callback){
        this.loadElements(null, function(){
          callback();
        });
      }else{
        this.loadElements(null);
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  kanban_list.prototype.listeners = function(){
    try {
      var self = this;

      if(!this.root)
        throw new TypeError('kanban_list - listeners : this.root undefined');

      var root = this.root;

      root.find('.ms-list-wide__frame-top').click(function(){
        root.find('.kanban-items.ms-hack-scrollbar').toggle();
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  kanban_list.prototype.setStructure = function(){
    try {
      var self = this;

      if(!this.parentRoot)
        throw new TypeError('kanban_list - setStructure : this.parentRoot undefined');

      var str = structure.content.clone();
      var title = this.secTitle ? this.secTitle : "Senza titolo";
      str.find('.secTitle').append(title);
      this.index = this.parentRoot.find(' > div').length + 1;
      this.parentRoot.append(str);
      this.root = this.parentRoot.find(' > div:nth-child(' + this.index + ')');
      this.itemsManager.rootKanbanList = this.root;

    } catch (e) {
      console.log(e.message);
    }
  }

  kanban_list.prototype.loadElements = function(filtro, callback){
    try {
      var self = this;

      if(!this.itemsManager)
        throw new TypeError('kanban_list - loadElements : this.itemsManager undefined');

      //LOAD FROM ITEMS MANAGER
      this.itemsManager.loadElements(filtro, function(items){
        if(items && items.length > 0){
          var elements = items;
          for (var i = 0; i < elements.length; i++) {
            var row = elements[i];
            var index = self.root.find(self.rootList + ' > div').length + 1;
            row.index = index;

            if(row.structure){
              self.root.find(self.rootList).append(row.structure);
              var root = self.root.find(self.rootList + ' > div:nth-child(' + index + ')');
              row.root = root;
              row.init();
            }

          }

          if(callback){
            callback();
          }

        }else{
          if(callback){
            callback();
          }
        }
      });

    } catch (e) {
      console.log(e.message);
    }
  }

})();
