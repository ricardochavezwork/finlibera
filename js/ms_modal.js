function ms_modal(parentRoot, root, content, header, body, exitBtn, outside_layer) {
  this.parentRoot = parentRoot;
  this.root = root;
  this.content = content;
  this.header = header;
  this.body = body;
  this.exitBtn = exitBtn;
  this.outside_layer = outside_layer;
}

(function () {

  var str = $('<section class="ms_modal"><div class="ms-click-outside-layer"></div><div class="ms_modal__content"><div class="ms_modal__exitBtn"><i class="fas fa-times"></i></div><div class="ms_modal-content"><header><span></span></header><div class="ms_modal-content__body"></div></div></div></section>');
  
  ms_modal.prototype.init = function (customActionOnExit) {
    try {

      if(!this.parentRoot)
        this.parentRoot = $('.ms-popup-layer__portal');
      
      if(!this.root)
        this.root = str;

      this.content = this.root.find('div.ms_modal__content');
      this.header = this.root.find('header');
      this.body = this.root.find('div.ms_modal-content__body');
      this.outside_layer = this.root.find('div.ms-click-outside-layer');
      this.exitBtn = this.root.find('div.ms_modal__exitBtn');

      this.setStructure();
      this.listeners(customActionOnExit);
      
    } catch (e) {
      console.log(e.message);
    }
  }

  ms_modal.prototype.setStructure = function () {
    try {
      var self = this;

      if(!this.root)
        throw new TypeError('ms_modal - setStructure : this.root');

      if(!this.parentRoot)
      throw new TypeError('ms_modal - setStructure : this.parentRoot');

      this.parentRoot.empty();
      this.parentRoot.append(this.root);
      

    } catch (e) {
      console.log(e.message);
    }
  }

  ms_modal.prototype.listeners = function (customActionOnExit) {
    try {
      var self = this;

      if(!this.root)
        throw new TypeError('ms_modal - listeners : this.root');

      var root = this.root;
      var parentRoot = this.parentRoot;
      var content = this.content;
      var outside_layer = this.outside_layer;
      var exitBtn = this.exitBtn;

      outside_layer.click(function () {
        exitBtn.click();
      });

      exitBtn.click(function () {
        parentRoot.empty();
        if(customActionOnExit){
          customActionOnExit();
        }
      });

    } catch (e) {
      console.log(e.message);
    }
  }

})();