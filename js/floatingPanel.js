function FloatingPanel(Root){
    this.Root = Root;
    this.RootPanel = $("#maincont .tm-floating-panel-desktop");
    this.getRoot = $(this.Root);
    this.closeBtn = function(){ return this.getRoot.find('.tm-floating-panel-desktop .tm-floating-panel-desktop__close i'); };
    this.reset = function (){
      console.log("reset");
    };
    this.isVisible = function (){
        var bool = false;

        if(this.RootPanel.hasClass("-show")){
            bool = true;
        }

        return bool;
    };
    this.switchPanel = function (){
        var self = this;
        if(self.isVisible()){
            //NOTE: Forse aggiungere reset, caso in cui il load di un movimento non sia andato con successo.
            self.closePanel();
            self.reset();
            setTimeout(function(){ self.openPanel(); }, 250);
        }else{
            self.openPanel();
        }
    };
    this.ini = function (callback){
        var self = this;
        if(this.Root){
          this.switchPanel();

          this.closeBtn().off().click(function(event) {
            event.stopPropagation();
            self.closePanel();
          });

          if (callback) {
            callback();
          }

        }
    };
    this.closePanel = function (){
        this.RootPanel.removeClass("-show").addClass("-hidden");
    };
    this.openPanel = function (){
        this.RootPanel.removeClass("-hidden").addClass("-show");
    };
}
