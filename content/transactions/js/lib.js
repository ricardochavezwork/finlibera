/*
 * Header - Floating Panel
 */
function TransactionPropertiesHeader(Root, $Movimento){
  this.Root = Root;
  this.Movimento = $Movimento;
}

function TransactionPropertiesBody($Tab, $Content, Root, $Movimento){
    this.Tab = $Tab;
    this.Content = $Content;
    this.Root = Root;
    this.Movimento = $Movimento;
}

function Tab($TransactionPropertiesBody){
  this.TransactionPropertiesBody = $TransactionPropertiesBody;
}

/*
 * POPUP : Deve essere all'interno di Content. Perchè appartiene a content; Senza non può essere visualizzato.
 */
function Content($TransactionPropertiesBody, Popup){
  this.TransactionPropertiesBody = $TransactionPropertiesBody;
  this.Popup = Popup;
}

function Resources_Content($Content){
  this.Content = $Content;
}

function Comments_Content($Content){
  this.Content = $Content;
}

function DefaultContent($Content){
  this.Content = $Content;
}

/*
 * Non c'è bisogno di aggiungere un parametro per il controllo di Movimento.canAddDocs ; Verrà fatto durante il caricamento della seconda fase dell'inquilino.
 */
function Content_SelectIntestatario($Content, $Movimento){
  this.Content = $Content;
  this.Movimento = $Movimento;
}
/**
 * [CardsGiustificativo : Gestisce la creazione degli elementi base per il contenuto di Floating Panel.]
 * @param {[type]} Root      [description]
 * @param {[type]} Content   [description]
 * @param {[type]} Movimento [description]
 * @param RowTopPanel [Panello per gestire alcune azioni come "Torna indietro"]
 * @param Body [Elenco dei giustificativi all'interno del Movimento.]
 *
 * Viene inizializzato Body e RowTopPanel. Attenzione, non significa che verranno creati i Root all'interno di questa classe. Verrà passato a queste 2 classi il
 * nome del loro Root. All'interno di CardsGiustificativo_RowTopPanel e CardsGiustificativo_Body verranno creati i Root , utilizzando Content.
 *
 */
function CardsGiustificativo(Content, RootPane, Movimento){
  this.Content = Content;
  this.RootPane = RootPane;
  this.Movimento = Movimento;
}
/**
 * [CardsGiustificativo_RowTopPanel : Contiente il tasto back ]
 * @param {[type]} Root                [description]
 * @param {[type]} Content             [description]
 * @param {[type]} CardsGiustificativo [description]
 */
function CardsGiustificativo_RowTopPanel (ParentRoot, RootElement, Content, CardsGiustificativo){
  this.ParentRoot = ParentRoot;
  this.RootElement = RootElement;
  this.CardsGiustificativo = CardsGiustificativo;
  this.Content = Content;
}

/**
 * [CardsGiustificativo_FooterBtn description]
 * @param {[type]} ParentRoot          [description]
 * @param {[type]} Root                [description]
 * @param {[type]} Content             [description]
 * @param {[type]} CardsGiustificativo [description]
 */
function CardsGiustificativo_FooterBtn (ParentRoot, RootElement, Content, CardsGiustificativo){
  this.ParentRoot = ParentRoot;
  this.RootElement = RootElement;
  this.CardsGiustificativo = CardsGiustificativo;
  this.Content = Content;
}

/**
 * [CardsGiustificativo_Body : In base alle Tipologie esistenti di Intestatario, per ogni Tipologia verrà creata una SottoTabella con le Cards degli Intestatari
 * di quella Tipologia e successivamente la generazione del suo contenuto]
 * @param {[type]} Root                [description]
 * @param {[type]} Content             [description]
 * @param {[type]} Movimento           [description]
 * @param {[type]} CardsGiustificativo [description]
 */
function CardsGiustificativo_Body(ParentRoot, Root, Content, Movimento, CardsGiustificativo){
  this.ParentRoot = ParentRoot;
  this.RootClass = Root;
  this.CardsGiustificativo = CardsGiustificativo;
  this.Content = Content;
  this.Movimento = Movimento;
}

/**
* [Routing_CardsGiustificativo : Genera e Restituisce il Contenuto di una determinata Tipologia di Intestatario. questo permette alla Classe genitore di inizializzare qualsiasi Card con una sola
* classe. Il Contenuto restituito verrà utilizzato per salvarlo su CardsGiustificativo_Body.M_i .]
* @param {[string]} Root [Viene passato il Root di Body di modo che su CardsGiustificativo_Body viene solo inizializzata la Classe come avviene su CardsGiustificativo]
* @param {[Movimento_Intestatario]} $Movimento_Intestatario []
* @param {[CardsGiustificativo_Body]} CardsGiustificativo_Body []
*/
function Routing_CardsGiustificativo(Root, $Movimento_Intestatario, CardsGiustificativo_Body){
  this.Root = Root;
  this.Movimento_Intestatario = $Movimento_Intestatario;
  this.CardsGiustificativo_Body = CardsGiustificativo_Body;
  this.Movimento = this.CardsGiustificativo_Body.Movimento;
}
//Root di Card
//Content HTML di CARD, precedentemente deve essere stato inizializzato il suo Root (Body)
/**
 * [CG_Inquilino : Questo oggetto verrà inserito all'interno della sua sub tabella categorica, mediante il Root di tale tabella. Il meccanismo non e' piu quello di
 *  restituire il contenuto HTML a Routing_CardsGiustificativo, perchè potrebbe dare molti problemi di gestione. ]
 * @param {[Movimento_Intestatario]} $m_i       [description]
 * @param {[type]} ParentRoot [description]
 */
function CG_Inquilino($m_i, ParentRoot, Movimento){
  this.m_i = $m_i;
  this.ParentRoot = ParentRoot;//function
  this.Movimento = Movimento;
}

//Row all'interno di CG_Intestatario, precedentemente deve essere stato inizializzato il suo Root (CARD)
function List_Giustificativi_Inquilino(ParentRoot, RamoMovimento, CG_Inquilino){
  this.ParentRoot = ParentRoot;
  this.RamoMovimento = RamoMovimento;
  this.CG_Inquilino = CG_Inquilino;
}

/**
 * [CG_AltriClienti description]
 * @param {[Movimento_Intestatario]} $m_i       [description]
 * @param {[type]} ParentRoot [description]
 */
function CG_AltriClienti($m_i, ParentRoot){
  this.M_i = $m_i;
  this.ParentRoot = ParentRoot;//function
}

/**
 * [CG_Fornitore description]
 * @param {[Movimento_Intestatario]} $m_i       [description]
 * @param {[type]} ParentRoot [description]
 */
function CG_Fornitore($m_i, ParentRoot, Movimento){
  this.m_i = $m_i;
  this.ParentRoot = ParentRoot;//function
  this.Movimento = Movimento;
}

//Row all'interno di CG_Intestatario, precedentemente deve essere stato inizializzato il suo Root (CARD)
function List_Giustificativi_Fornitore(ParentRoot, RamoMovimento, CG_Fornitore){
  this.ParentRoot = ParentRoot;
  this.RamoMovimento = RamoMovimento;
  this.CG_Fornitore = CG_Fornitore;
}

function IntestatariResults(Content, Movimento, Section_RowPanelActions){
    this.Content = Content;
    this.Movimento = Movimento;
    this.Section_RowPanelActions = Section_RowPanelActions;
}

//Crea il Root, con ini crea invece l'oggetto... ogni riga è un oggetto.
function Cards_SelectGiustificativo(Intestatario, IntestatariResults){
  this.Intestatario = Intestatario;
  this.IntestatariResults = IntestatariResults;
  this.Movimento = IntestatariResults.Movimento;
}

//Card
//Creazione dell'elemento in base al root creato in Cards_SelectGiustificativo
function CSG_Inquilino(Intestatario, Movimento, IntestatariResults){
  this.Intestatario = Intestatario;
  this.Movimento = Movimento;
  this.IntestatariResults = IntestatariResults;
}

/**
 * [List_DocumentiFiscali_Inquilino   Rappresenta i rows di ogni Giustificativo allinterno di Card]
 * @param {[type]} Giustificativo        [description]
 * @param {[type]} Movimento             [description]
 * @param {[type]} CSG_Inquilino         [description]
 */
function List_DocumentiFiscali_Inquilino(Giustificativo, Movimento, CSG_Inquilino){
  this.Giustificativo = Giustificativo;
  this.Movimento = Movimento;
  this.CSG_Inquilino = CSG_Inquilino;
  this.RootTextLeft = '.tm-input-row .tm-input-row__left .tm-input-row__info .tm-simple .tm-simple__text';
  this.RootTextRight = '.tm-input-row .tm-input-row__right';
}

function CSG_AltroCliente(Intestatario, Movimento, IntestatariResults){
  this.Intestatario = Intestatario;
  this.Movimento = Movimento;
  this.IntestatariResults = IntestatariResults;
  this.ini = function(){
    console.log("AltroCliente");
  }
}

function SearchIntestatario(Content, Movimento, IntestatariResults){
  this.Content = Content;
  this.Movimento = Movimento;
  this.IntestatariResults = IntestatariResults;
  this.btn_Search = new Button_SearchIntestatario(this);
  this.Input = new Input_SearchIntestatario(this);
}

function Button_SearchIntestatario(SearchIntestatario){
  this.SearchIntestatario = SearchIntestatario;
}

function Input_SearchIntestatario(SearchIntestatario){
  this.SearchIntestatario = SearchIntestatario;
}

function Section_RowPanelActions(Content, Movimento, IntestatariResults){
  this.Content = Content;
  this.Movimento = Movimento;
  this.IntestatariResults = IntestatariResults;
}

function Button_AddGiustificativo(Content, Movimento){
  this.Content = Content;
  this.Movimento = Movimento;
}

function Section_QuickAdd(Content, Movimento){
  this.Content = Content;
  this.Movimento = Movimento;
}

function Section_Tag(Content, Movimento){
  this.Content = Content;
  this.Movimento = Movimento;
  this.rootTagPanel = ".tagMovimenti_searchPanel";
}

function Section_Note(Content, Movimento){
  this.Content = Content;
  this.Movimento = Movimento;
  this.rootTagPanel = ".tm-floating-panel-desktop .secNote";
}

function Section_Giustificativi(Content, RootPane, Movimento){
  this.Content = Content;
  this.RootPane = RootPane;
  this.Movimento = Movimento;
}

function UI_FloatingPanel(Root, TransactionPropertiesHeader, $TransactionPropertiesBody, $Movimento){
  this.Root = Root;
  this.TransactionPropertiesHeader = TransactionPropertiesHeader;
  this.TransactionPropertiesBody = $TransactionPropertiesBody;
  this.Movimento = $Movimento;
  this.RootPanel = $(".tm-floating-panel-desktop");
}

(function(){

  UI_FloatingPanel.prototype.reset = function (){
    this.Movimento.reset();
    this.TransactionPropertiesBody.reset();
  };
  UI_FloatingPanel.prototype.isVisible = function (){
    var bool = false;

    if(this.RootPanel.hasClass("-show")){
        bool = true;
    }

    return bool;
  };
  UI_FloatingPanel.prototype.switchPanel = function (){
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
  UI_FloatingPanel.prototype.loadContent = function (){
    if(this.TransactionPropertiesHeader){
        this.TransactionPropertiesHeader.Load();
    }

    //Load di Body
    if(this.TransactionPropertiesBody){
        this.TransactionPropertiesBody.ini();
        //TransactionPropertiesBody.setDefault
        this.TransactionPropertiesBody.setDefault();
    }

  };
  UI_FloatingPanel.prototype.ini = function (){
    var self = this;
    if(this.Root){
        /*
         * TODO: Questo Load è da sistemare, perchè può darsi che sia un movimento già associato. Forse è il load di movimentoDettagli o di alcuna associazione.
         */
        this.Root.on("click",".tm-result-movimento", function(){
            var id = parseInt($(this).attr('data-id'));
            if(parseInt(id) > 0){
                self.switchPanel();
                self.Movimento.Id = id;
                self.Movimento.Load(function (){

                  var body = new TransactionPropertiesBody();
                  body.Root = $("#maincont");
                  body.Movimento = self.Movimento;
                  self.TransactionPropertiesBody = body;
                  //Meccanismo di Show - non definitivo
                  self.loadContent();



                });
            }else{
                console.log("Error : Load movimento");
            }
        });

        $("#maincont").on("click", ".tm-floating-panel-desktop .tm-floating-panel-desktop__close i", function (){
            self.closePanel();
            setTimeout(function(){ self.TransactionPropertiesHeader.reset(); }, 250);
            self.reset();
        });

    }
  };

  UI_FloatingPanel.prototype.closePanel = function (){
    this.RootPanel.removeClass("-show").addClass("-hidden");
  };

  UI_FloatingPanel.prototype.openPanel = function (){
    this.RootPanel.removeClass("-hidden").addClass("-show");
  };

  Section_Giustificativi.prototype.Root = function (){ return this.RootPane.find('.list_giustificativi');};
  Section_Giustificativi.prototype.createElement = function(){
    var res = $('<div class="tm-properties-row uk-form-horizontal secGiustificativi"><div class="tm-properties-row__icon"><i class="tm-icon glyphicon glyphicon-list"></i></div><div class="tm-properties-row__label">Lista Giustificativi</div></div>');

    return res;
  };
  Section_Giustificativi.prototype.Cards = new CardsGiustificativo(this.Content, this.RootPane, this.Movimento);
  Section_Giustificativi.prototype.Body;
  Section_Giustificativi.prototype.ini = function(){
    var self = this;
    this.Root().append(this.createElement());
    self.Body = new CardsGiustificativo_Body(this.RootPane, "resultsGiustificativi", this.Content, this.Movimento, this.Cards)
    self.Body.ini();
  };

  Section_Note.prototype.Root = function (){ return this.Content.RootPane().find('.secNote');};
  Section_Note.prototype.init = function(){
    try {
      var self = this;

      if(!this.Movimento || !(this.Movimento instanceof Movimento))
        throw new TypeError("this.Movimento undefined");

      if(!this.Movimento.MovimentoDettagli || !(this.Movimento.MovimentoDettagli instanceof MovimentoDettagli)){
        this.Movimento.MovimentoDettagli = new MovimentoDettagli();
        this.Movimento.MovimentoDettagli.IdMovimento = this.Movimento;
      }

      var movimento_dettagli = this.Movimento.MovimentoDettagli;
      var textarea = this.Root().find('textarea');

      textarea.keydown(function(event){
        var key = event.which;
        var isShift = !!event.shiftKey;
        var keyCode = event.keyCode;

        if ( isShift ) {
          switch (key) {
            case 16: // ignore shift key
              break;
            default:
              // do stuff here?
              var txt = textarea.text();
              txt = txt.replace(/\r?\n/g, '<br />');
              textarea.text(txt);
              break;
          }
        }else if (keyCode === 13) {
          textarea.blur();
        }

      });

      textarea.blur(function(){
        movimento_dettagli.Descrizione = textarea.val();
        movimento_dettagli.Save(function(success){
          if (!success) {
            bootbox.alert("Errore : Non è possibile eseguire la richiesta.");
          }
        });
      });
    } catch (e) {
      console.log(e.message);
    }

  }

  Section_Tag.prototype.Root = function (){ return this.Content.RootPane().find('.secTag');};
  Section_Tag.prototype.RootPane = function(){ return this.Content.RootPane() };
  Section_Tag.prototype.getButton = function (){ return this.Root().find('.add-button'); };
  Section_Tag.prototype.createElement = function(){
    var res = $('<div class="tm-properties-row uk-form-horizontal"><div class="tm-properties-row__icon"><i class="tm-icon glyphicon glyphicon-tags"></i></div><div class="tm-properties-row__label">Tags</div></div>');
    var button = $('<div class="tm-properties-row__content"><section class="tm-add-button-box"><div class="tm-add-button-box__left"><div class="tm-add-button-panel__input"><div class="add-button ax-add-tag-button"><i class="tm-icon tm-icon-add glyphicon glyphicon-plus"></i></div></div></div><div class="tm-add-button-box__right"></div></section></div>');
    res.first().append(button);

    return res;
  };
  /*
   * Click Event : Viene creato l'oggetto di selezionamentoIntestatario, inizializzato, passandogli il RootPanel di Content
   */
  Section_Tag.prototype.clickEvent = function (){
    var self = this;

    $(this.rootTagPanel).toggle();
    var tag_manager = new tagMovimenti_Manager();
    tag_manager.movimento = self.Movimento;
    tag_manager.rootFloatingPanel = self.RootPane();
    tag_manager.init();
  };
  Section_Tag.prototype.ini = function(){
    var self = this;

    this.Root().append(this.createElement().html());
    if(this.Movimento.MovimentoDettagli_TagMovimenti && this.Movimento.MovimentoDettagli_TagMovimenti.Tags && this.Movimento.MovimentoDettagli_TagMovimenti.Tags.length > 0){
      var tags = this.Movimento.MovimentoDettagli_TagMovimenti.Tags;
      for (var i = 0; i < tags.length; i++) {
        var tagItem = new TagItem();
        tagItem.movimento = this.Movimento;
        tagItem.rootFloatingPanel = self.RootPane();
        tagItem.tag = tags[i];//TagMovimento
        console.log(tagItem);
        tagItem.init();
      }
    }

    this.getButton().off().click(function() {
      self.clickEvent();
    });

  };

  /**
   *#############################################
   *############# TagMovimenti_Manager
   *#############################################
   */

   function tagMovimenti_Manager(movimento, ramoMovimento, rootFloatingPanel, root, rows, togglePanel){
     this.movimento = movimento;
     this.ramoMovimento = ramoMovimento;
     this.rootFloatingPanel = rootFloatingPanel;
     this.root = root;
     this.rows = rows;//Array di oggetti con i seguenti att o func : TagMovimento, struttura, init(), nextAction()
     this.togglePanel = togglePanel;
   }

   tagMovimenti_Manager.prototype.init = function(){
     var self = this;
     var toggle = new togglePanel();
     this.togglePanel = toggle;

     if(this.movimento){
       toggle.root = this.rootFloatingPanel.find(' .tagMovimenti_searchPanel');
     }else if(this.ramoMovimento){
       toggle.root = this.rootFloatingPanel.find(' .tagMovimenti_ramo_searchPanel');
     }

     toggle.elementsManager = this;
     toggle.init();

     this.rows = new Array();

     this.setRows();

   }

   //1.Caricamento iniziale di tutti i tagServizi
   //2.Preparazione struttura
   //3.Creazione di togglePanel
   //4. toggle.loadElements
   tagMovimenti_Manager.prototype.setRows = function(termine, callback){
     try {
       var self = this;

       if(!this.togglePanel)
         throw new TypeError('tagMovimenti_Manager - setRows : this.togglePanel  undefined');

       /*if(!callback)
         throw new TypeError('tagMovimenti_Manager - setRows : callback undefined');*/

       //1.Search
       //2.Creazione di tag_rows e setStructure

       this.rows  =new Array();

       if(termine && termine !== ""){
         this.Search(termine, function(tags){
           if(!tags)
             console.log("tagMovimenti_Manager - setRows : this.Search tags undefined");

           if(tags && tags.TagMovimento && tags.TagMovimento.length > 0){
             for (var i = 0; i < tags.TagMovimento.length; i++) {
               var row = new tagMovimento_row();
               row.tag = tags.TagMovimento[i];
               row.rootTogglePanel = self.rootFloatingPanel;//TODO:Verifica funzionalità della variabile
               row.tagMovimenti_Manager = self;//TODO:Verifica funzionalità della variabile

               if(self.movimento){
                 row.movimento = self.movimento;//TODO:Verifica funzionalità della variabile
               }else if (self.ramoMovimento) {
                 row.ramoMovimento = self.ramoMovimento;
               }

               row.setStructure();
               self.rows.push(row);
             }

             if(self.togglePanel){
               self.togglePanel.loadElements();
             }

           }else{
             //Creazione di un nuovo tag
             var admin = new Admin();
             admin.Load(function (){
                 if(admin.isAdministrator()){
                   var row = new newTagMovimento();
                   row.rootTogglePanel = self.rootFloatingPanel;//TODO:Verifica funzionalità della variabile

                   if(self.movimento){
                     row.movimento = self.movimento;//TODO:Verifica funzionalità della variabile
                   }else if (self.ramoMovimento) {
                     row.ramoMovimento = self.ramoMovimento;
                   }

                   row.setStructure(termine, function(){
                     self.rows.push(row);

                     if(self.togglePanel){
                       self.togglePanel.loadElements();
                     }

                     if(callback){
                       callback();
                     }
                   });

                 }else {
                   console.log("Solo Admin può creare un tag");
                 }
             });

           }

           if(callback){
             callback();
           }

         });
       }else{
         this.LoadTags(function(tags){
           if(!tags)
             console.log("tagMovimenti_Manager - setRows : this.Search tags undefined");

           if(tags && tags.TagMovimento && tags.TagMovimento.length > 0){
             for (var i = 0; i < tags.TagMovimento.length; i++) {
               var row = new tagMovimento_row();
               row.tag = tags.TagMovimento[i];
               row.rootTogglePanel = self.rootFloatingPanel;//TODO:Verifica funzionalità della variabile
               row.tagMovimenti_Manager = self;//TODO:Verifica funzionalità della variabile

               if(self.movimento){
                 row.movimento = self.movimento;//TODO:Verifica funzionalità della variabile
               }else if (self.ramoMovimento) {
                 row.ramoMovimento = self.ramoMovimento;
               }

               row.setStructure();
               self.rows.push(row);
             }

             if(self.togglePanel){
               self.togglePanel.loadElements();
             }

           }

           if(callback){
             callback();
           }

         });
       }

     } catch (e) {
       console.log(e.message);
     }
   }

   /**
    * Verrà utilizzata da :
    * - init()
    * - togglePanel
    *
    * return array of TagMovimenti
    */
   tagMovimenti_Manager.prototype.Search = function(termine, callback){
     try {

       var self = this;

       if(!termine)
         throw new TypeError('tagMovimenti_Manager - Search : termine undefined');

       if(!callback)
         throw new TypeError('tagMovimenti_Manager - Search : this method needs a callback!');

       var ts = new TagMovimento();
       ts.Search(termine, function(){
         callback(ts);
       });


     } catch (e) {
       console.log(e.message);
     }
   }

   tagMovimenti_Manager.prototype.LoadTags = function(callback){
     try {

       var self = this;

       if(!callback)
         throw new TypeError('tagMovimenti_Manager - Search : this method needs a callback!');

       var ts = new TagMovimento();
       ts.LoadTags(function(){
         callback(ts);
       });


     } catch (e) {
       console.log(e.message);
     }
   }

 /*######################################################
                     tagMovimento_row
   ######################################################*/

   var tag_text_struct = {
   contenuto : $('<div class="tag-item"><div class="tm-simple__text tag-item_struct"><span></span><div class="remove-tag"><i class="material-icons">close</i><div></div></div></div></div>'),
   roots : {
     element : ' .tag-item'
   }
 }

 /**
  * @index list position
  * @tag TagMovimento
  */
 function tagMovimento_row(rootTogglePanel, movimento, ramoMovimento, index, root, tag, structure, tagMovimenti_Manager){
   this.rootTogglePanel = rootTogglePanel;
   this.movimento = movimento;
   this.ramoMovimento = ramoMovimento;
   this.index = index;//variabile assegnata da togglePanel
   this.root = root;//variabile assegnata da togglePanel
   this.tag = tag;
   this.structure = structure;
   this.tagMovimenti_Manager = tagMovimenti_Manager;
 }

 /**
  * 1. listeners
  * 2. newAction
  */
 tagMovimento_row.prototype.init = function(){
   try {
     var self = this;

     if(!this.index)
       throw new TypeError('tagMovimento_row - init : index undefined');

     if(!this.rootTogglePanel)
       throw new TypeError('tagMovimento_row - init : rootTogglePanel undefined');

     if(!(this.movimento || this.ramoMovimento))
       throw new TypeError('tagMovimento_row - init : this.movimento OR this.ramoMovimento undefined');

     if(this.movimento && (!this.movimento.MovimentoDettagli_TagMovimenti || !this.movimento.MovimentoDettagli_TagMovimenti.Tags)){
       this.movimento.MovimentoDettagli_TagMovimenti = new MovimentoDettagli_TagMovimenti();
       this.movimento.MovimentoDettagli_TagMovimenti.IdMovimento = self.movimento.Id;
       this.movimento.MovimentoDettagli_TagMovimenti.Tags = new Array();
       /*this.movimento.MovimentoDettagli_TagMovimenti.Movimento = new Movimento();// this.movimento;
       this.movimento.MovimentoDettagli_TagMovimenti.Movimento.Id = self.movimento.Id;*/
     }

     if(this.ramoMovimento && (!this.ramoMovimento.RamoMovimento_TagMovimenti || !this.ramoMovimento.RamoMovimento_TagMovimenti.Tags)){
       this.ramoMovimento.RamoMovimento_TagMovimenti = new RamoMovimento_TagMovimenti();
       this.ramoMovimento.RamoMovimento_TagMovimenti.IdRamoMovimento = self.ramoMovimento.Id;
       this.ramoMovimento.RamoMovimento_TagMovimenti.IdMovimentoIntestatario = self.ramoMovimento.IdMovimentoIntestatario;
       this.ramoMovimento.RamoMovimento_TagMovimenti.Tags = new Array();
     }

     this.listeners();

   } catch (e) {
     console.log(e.message);
   }
 }

 tagMovimento_row.prototype.setStructure = function(){
   try {
     var self = this;

     if(!this.tag)
       throw new TypeError('tagMovimento_row - setStructure : this.tag undefined');

     this.structure = this.tag.getTagStructure();

   } catch (e) {
     console.log(e.message);
   }
 }

 //Teoricamente nextAction dovrebbe comunicare con TogglePanel per chiudere il pannello. Non bisogna fare troppo pasticcio, basta trovare il selettore del bottone chiudi e fare $(sel).click();
 tagMovimento_row.prototype.nextAction = function(callback){
   try {
     //TODO: Controllare se quel tag è già stato aggiunto. Anzi meglio eliminare l'elemento così non c'è bisogno di fare il controllo.

     var self = this;

     if(!(this.movimento || this.ramoMovimento))
       throw new TypeError('tagMovimento_row - nextAction : movimento OR ramoMovimento undefined');

     //NB: Qui potresti fare una condizione e dire che se il movimento.Id > 0 allora salvi automaticamente quel tag con il movimento. Da studiare bene.

    if (this.movimento && this.movimento.MovimentoDettagli_TagMovimenti && this.movimento.MovimentoDettagli_TagMovimenti.Tags) {
      this.movimento.MovimentoDettagli_TagMovimenti.Tags.push(this.tag);
      this.root.remove();

      this.movimento.MovimentoDettagli_TagMovimenti.SaveRelationship(function(){
        var tagItem = new TagItem();
        tagItem.movimento = self.movimento;
        tagItem.rootFloatingPanel = self.tagMovimenti_Manager.rootFloatingPanel;
        tagItem.tag = self.tag;//TagMovimento
        tagItem.init();

        if(callback){
          callback();
        }
      });
    }

    if(this.ramoMovimento && this.ramoMovimento.RamoMovimento_TagMovimenti && this.ramoMovimento.RamoMovimento_TagMovimenti.Tags){
      this.ramoMovimento.RamoMovimento_TagMovimenti.Tags.push(this.tag);
      this.root.remove();

      if(this.ramoMovimento.Id && parseInt(this.ramoMovimento.Id) > 0){
        this.ramoMovimento.RamoMovimento_TagMovimenti.SaveRelationship(function(){
          var tagItem = new TagItem();
          tagItem.ramoMovimento = self.ramoMovimento;
          tagItem.rootFloatingPanel = self.tagMovimenti_Manager.rootFloatingPanel;
          tagItem.tag = self.tag;//TagMovimento
          tagItem.init();

          if(callback){
            callback();
          }
        });
      }else{
        var tagItem = new TagItem();
        tagItem.ramoMovimento = self.ramoMovimento;
        tagItem.rootFloatingPanel = self.tagMovimenti_Manager.rootFloatingPanel;
        tagItem.tag = self.tag;//TagMovimento
        tagItem.init();
      }

    }

     //NB: Non bisogna chiudere il TogglePanel, sarà frequente l'inserimento di più tag
     //this.rootTogglePanel.find(' .togglePanel_closePanel').click();

     if(callback){
       callback();
     }

   } catch (e) {
     console.log(e.message);
   }
 }

 tagMovimento_row.prototype.listeners = function(){
   try {
     var self = this;

     if(!this.index)
       throw new TypeError('tagMovimento_row - listeners : index undefined');

     if(!this.rootTogglePanel)
       throw new TypeError('tagMovimento_row - listeners : rootTogglePanel undefined');

     if(!this.root)
       throw new TypeError('tagMovimento_row - listeners : root undefined');

     var root = this.root;

     root.click(function(event){
       self.nextAction();
     });

   } catch (e) {
     console.log(e.message);
   }
 }

 /*######################################################
                     newTagMovimento
   ######################################################*/

 var addNewTag = {
   structure : $('<div class="tm-list-item"><div class="tm-input-row"><input type="text" class="tm-search-box__input ax-add-tag-textfield tag-title" placeholder="Titolo del tag" value=""></div><div class="tm-input-row"><input type="text" class="tm-search-box__input ax-add-tag-textfield categoria-title" placeholder="Titolo categoria" value=""></div><div class="or-text"><span>Oppure</span></div><div class="categoria-rows"></div><div class="footer-btn"><div class="tm-add-button-panel__input add-new-tag-btn"><div class="add-button ax-add-tag-button" style="width: auto;text-align: center;"><strong>Crea</strong></div></div></div></div>'),
 }

 var categoria_row = {
   structure : $('<div class="tm-list-item" data-item-index=""><div class="tm-input-row"><div class="tm-input-row__left"><div class="tm-input-row__checkbox"><i class="tm-icon tm-icon-check-mark-bold -name_check-mark-bold"></i></div><div class="tm-input-row__info"><div class="tm-simple"><div class="tm-simple__text tagStyle"><span></span></div></div></div></div><div class="tm-input-row__right"></div></div></div>'),
   roots : {
     title : " .tm-input-row .tm-simple .tm-simple__text span",
     check_box : " .tm-input-row .tm-input-row__checkbox"
   }
 };

 function newTagMovimento(rootTogglePanel, movimento, ramoMovimento, index, root, structure, TagMovimento){
   this.rootTogglePanel = rootTogglePanel;
   this.movimento = movimento;
   this.ramoMovimento = ramoMovimento;
   this.index = index;//variabile assegnata da togglePanel
   this.root = root;//variabile assegnata da togglePanel
   this.structure = structure;
   this.TagMovimento = TagMovimento;
 }

 newTagMovimento.prototype.setStructure = function(termine, callback){
   var self = this;
   this.structure = null;
   var str = addNewTag.structure.clone();
   str.find(' .tag-title').val(termine);

   //Inserimento categorie
   var categorie = new TagCategories();
   categorie.LoadTags(function(){
     if(categorie.TagCategories && categorie.TagCategories.length > 0){
       for (var i = 0; i < categorie.TagCategories.length; i++) {
         var categoria = categorie.TagCategories[i];
         var row_struct = self.getRowCategoria_struct(categoria);
         str.find(' .categoria-rows').append(row_struct);
       }

       self.structure = str;
       callback();
     }
   });
 }

 newTagMovimento.prototype.getRowCategoria_struct = function(TagCategories){
   try {
     if(!TagCategories)
       throw new TypeError('newTagMovimento - getRowCategoria_struct : TagCategories undefined');

     var struct = categoria_row.structure.clone();
     struct.find(categoria_row.roots.title).html(TagCategories.getTitolo());
     struct.attr('data-item-index', TagCategories.Id);

     return struct;
   } catch (e) {
     console.log(e.message);
   }
 }

 newTagMovimento.prototype.clearAllCheckboxs = function(){
   this.root.find(' .categoria-rows').each(function( index ) {
     $( this ).find(' .tm-input-row .tm-input-row__checkbox').css('background-color', '#fff');
   });
 }

 newTagMovimento.prototype.init = function(){
   try {
     var self = this;

     if(!this.index)
       throw new TypeError('newTagMovimento - init : index undefined');

     if(!this.rootTogglePanel)
       throw new TypeError('newTagMovimento - init : rootTogglePanel undefined');

     if(!(this.movimento || this.ramoMovimento))
       throw new TypeError('newTagMovimento - init : this.movimento undefined');

     if(this.movimento && this.movimento.MovimentoDettagli_TagMovimenti){
       this.movimento.MovimentoDettagli_TagMovimenti = new MovimentoDettagli_TagMovimenti();
       this.movimento.MovimentoDettagli_TagMovimenti.Tags = new Array();
       this.movimento.MovimentoDettagli_TagMovimenti.IdMovimento = this.movimento.Id;
       /*this.movimento.MovimentoDettagli_TagMovimenti.Movimento = this.movimento;*/
     }

     if(this.ramoMovimento && this.ramoMovimento.RamoMovimento_TagMovimenti){
       this.ramoMovimento.RamoMovimento_TagMovimenti = new RamoMovimento_TagMovimenti();
       this.ramoMovimento.RamoMovimento_TagMovimenti.Tags = new Array();
       this.ramoMovimento.RamoMovimento_TagMovimenti.IdRamoMovimento = this.ramoMovimento.Id;
       this.ramoMovimento.RamoMovimento_TagMovimenti.IdMovimentoIntestatario = this.ramoMovimento.IdMovimentoIntestatario;
       /*this.ramoMovimento.RamoMovimento_TagMovimenti.RamoMovimento = this.ramoMovimento;*/
     }

     this.TagMovimento = new TagMovimento();

     this.listeners();
   } catch (e) {
     console.log(e.message);
   }
 }

 newTagMovimento.prototype.listeners = function(){
   try {
     var self = this;

     if(!this.index)
       throw new TypeError('newTagMovimento - listeners : index undefined');

     if(!this.rootTogglePanel)
       throw new TypeError('newTagMovimento - listeners : rootTogglePanel undefined');

     if(!this.root)
       throw new TypeError('newTagMovimento - listeners : root undefined');

     var root = this.root;

     root.find(' .add-new-tag-btn').click(function(event){
       self.nextAction();
     });

     root.find(' .categoria-title').keyup(function(event){
       self.TagMovimento.TagCategories = null;
       self.clearAllCheckboxs();
     });

     root.find(' .categoria-rows .tm-list-item').click(function(event){
       var idTagCategories = $(this).attr('data-item-index');
       self.clearAllCheckboxs();
       $(this).find(' .tm-input-row .tm-input-row__checkbox').css('background-color', '#d4d6db');
       self.TagMovimento.TagCategories = new TagCategories();
       self.TagMovimento.TagCategories.Id = idTagCategories;
     });

   } catch (e) {
     console.log(e.message);
   }
 }

 newTagMovimento.prototype.nextAction = function(callback){
   var self = this;
   var titolo = this.root.find('.tag-title').val();
   var titoloCategoria = this.root.find(' .categoria-title').val();

   console.log("Prova new tag");

   if(titoloCategoria && titoloCategoria !== "" && !this.TagMovimento.TagCategories){
     this.TagMovimento.TagCategories = new TagCategories();
     this.TagMovimento.TagCategories.Titolo = titoloCategoria;
   }

   if(titolo && titolo !== ""){
     this.TagMovimento.Titolo = titolo;
     this.TagMovimento.Save(function(){
       self.rootTogglePanel.find(' .togglePanel_content .togglePanel_inputSearch .togglePanel_inputSearch-input').keyup();

       if(callback){
         callback();
       }
     });
   }

 }

 /*######################################################
                     TagItem
   ######################################################*/

 function TagItem(movimento, ramoMovimento, rootFloatingPanel, index, root, tag){
   this.movimento = movimento;
   this.ramoMovimento = ramoMovimento;
   this.rootFloatingPanel = rootFloatingPanel;
   this.index = index;
   this.root = root;
   this.tag = tag;//TagMovimento
 }

 TagItem.prototype.getTagStructure = function(){
   try {
     var self = this;

     if(!this.tag || !(this.tag instanceof TagMovimento))
       throw new TypeError('tag_text_struct - getTagStructure : this.tag undefined');

     var str = tag_text_struct.contenuto.clone();
     var titolo = this.tag.getTitolo();

     str.find(' .tag-item_struct span').html(titolo);

     return str;
   } catch (e) {
     console.log(e.message);
   }
 }

 TagItem.prototype.setStructure = function(callback){
   try {
     var self = this;

     if(!this.rootFloatingPanel)
       throw new TypeError('TagItem - setStructure : this.rootFloatingPanel undefined');

     if(!this.tag)
       throw new TypeError('TagItem - setStructure : this.tag undefined');

     if(!callback)
       throw new TypeError('TagItem - setStructure : this method needs a callback');

     var rootContainer;

     if(this.movimento){
       rootContainer = this.rootFloatingPanel.find(".secTag .tm-properties-row__content .tm-add-button-box__right");
     }else if(this.ramoMovimento){
       rootContainer = this.rootFloatingPanel.find(".row-doc_tag .tm-properties-row__content .tm-add-button-box__right");
     }

     var index = rootContainer.find(' > div').length + 1;
     var str = this.getTagStructure();

     rootContainer.append(str);
     var root = rootContainer.find(' > div:nth-child(' + index + ')');
     this.root = root;
     this.index = index;

     callback();

   } catch (e) {
     console.log(e.message);
   }
 }

 TagItem.prototype.listeners = function(){
   try {
     var self = this;

     if(!this.index)
       throw new TypeError('TagItem - listeners : this.index undefined');

     if(!this.root)
       throw new TypeError('TagItem - listeners : this.root undefined');

     if(!(this.movimento || this.ramoMovimento))
       throw new TypeError('TagItem - listeners : this.movimento undefined');

     this.root.find(' .tag-item_struct .remove-tag').click(function(event){

       if(self.movimento && self.movimento.MovimentoDettagli_TagMovimenti){
         self.movimento.MovimentoDettagli_TagMovimenti.removeTag(self.tag, function(){
           console.log(self.movimento);
           self.root.remove();
         });
       }

       if(self.ramoMovimento && self.ramoMovimento.RamoMovimento_TagMovimenti){
         self.ramoMovimento.RamoMovimento_TagMovimenti.removeTag(self.tag, function(){
           console.log(self.ramoMovimento);
           self.root.remove();
         });
       }

     });

   } catch (e) {
     console.log(e.message);
   }
 }

 TagItem.prototype.init = function(){
   var self = this;

   this.setStructure(function(){
     self.listeners();
   });
 }

  Section_QuickAdd.prototype.Root = function (){ return this.Content.RootPane().find('.quickAdd');};
  Section_QuickAdd.prototype.createElement = function(){
    var res = $('<div class="tm-properties-row uk-form-horizontal"><div class="tm-properties-row__icon"><i class="tm-icon glyphicon glyphicon-time"></i></div><div class="tm-properties-row__label">Aggiunta Rapida</div></div>');

    return res;
  };
  Section_QuickAdd.prototype.ini = function(){
    var self = this;

    this.Root().append(this.createElement().html());

  };

  Button_AddGiustificativo.prototype.Root = function (){ return this.Content.RootPane().find('.addGiustificativo');};
  Button_AddGiustificativo.prototype.getButton = function (){ return this.Root().find('.add-button'); };
  Button_AddGiustificativo.prototype.createElement = function(){
    var res = $('<div class="tm-properties-row uk-form-horizontal"><div class="tm-properties-row__icon"><i class="tm-icon glyphicon glyphicon-folder-open"></i></div><div class="tm-properties-row__label">Aggiungi Giustificativo</div></div>');
    var button = $('<div class="tm-properties-row__content"><section class="tm-add-button-box"><div class="tm-add-button-box__left"><div class="tm-add-button-panel__input"><div id="addG" class="add-button ax-add-tag-button"><i class="tm-icon tm-icon-add glyphicon glyphicon-plus"></i></div></div></div><div class="tm-add-button-box__right"></div></section></div>');
    res.first().append(button);

    return res;
  };
  /*
   * Click Event : Viene creato l'oggetto di selezionamentoIntestatario, inizializzato, passandogli il RootPanel di Content
   * CONTROLLO : Se l'importo scoperto esiste , quindi > 0;
   */
  Button_AddGiustificativo.prototype.clickEvent = function (){
    var res = null;
    /*if(this.Content && this.Content.TransactionPropertiesBody){
      res = this.Content.TransactionPropertiesBody.;
    }*/
    /* La schermata dopo è dedicata al selezionamente dell'intestatario. Nel caso sia un Inquilino allora verrà mostrato il layout inDesign.
        Qui non esiste un controllo in base all'intestatario, perchè non lo si conosce ancora.*/

    if(this.Movimento){
      var $selectIntestatario = new Content_SelectIntestatario(this.Content, this.Movimento);
      $selectIntestatario.ini();
    }


    /* if(this.Movimento && this.Movimento.canAddDocs()){
      this.Content.setContent('<h5>Inserimento di giustificativi multipli o primo giustificativo</h5>');
    }else{
      //Inquilino : In quel caso allora verrà mostrata la prima fase. Ma nella seconda fase si inserirà il movimento che ha bisogno dell'importo oltre che a quelli precedentemente selezionato.
      this.Content.setContent('<h5>Inserimento importo di giustificativo precedente</h5>');
    }*/

    return res;
  };
  Button_AddGiustificativo.prototype.ini = function (){
    var self = this;

    this.Root().append(this.createElement().html());

    this.getButton().off().click(function() {
      self.clickEvent();
    });

  };

  Section_RowPanelActions.prototype.Root = function (){ return this.Content.RootPane().find('.rowPanelActions');};
  Section_RowPanelActions.prototype.btn_back = function (){ return this.Root().find('.btn-back'); };
  Section_RowPanelActions.prototype.btn_viewAll = function (){ return this.Root().find('.tm-view-all_intestatari'); };
  Section_RowPanelActions.prototype.setActive_btn_viewAll = function(){
    this.btn_viewAll().css('visibility', 'visible');
  };
  Section_RowPanelActions.prototype.setDisable_btn_viewAll = function(){
    this.btn_viewAll().css('visibility', 'hidden');
  };
  Section_RowPanelActions.prototype.SwitchStatus_btn_viewAll = function(){
    if (this.Movimento.countDocumentiFiscali() > 0 || this.Movimento.Giustificativi.length > 0){
      this.setActive_btn_viewAll();
    } else {
      this.setDisable_btn_viewAll();
    }
  };
  Section_RowPanelActions.prototype.createElement = function(){
    var res = $('<div class="tm-properties-row uk-form-horizontal"></div>');
    var button = $('<div class="tm-properties-row__content"><section class="tm-add-button-box"><div class="tm-add-button-box__left"><div class="tm-add-button-panel__input"><div class="add-button ax-add-tag-button btn-back" style="width : 90px"><i class="tm-icon tm-icon-add glyphicon glyphicon-arrow-left"></i></div></div></div><div class="tm-add-button-box__right"></div></section><div class="tm-view-all_intestatari" style="visibility: hidden;"><i class="glyphicon glyphicon-menu-hamburger"></i><div class="tm-view-all_intestatari__text">Selezionati (0)</div></div></div>');
    res.first().append(button);

    return res;
  };
  /*
   * Click Event : Viene creato l'oggetto di selezionamentoIntestatario, inizializzato, passandogli il RootPanel di Content
   */
  Section_RowPanelActions.prototype.back_event = function (){

      try {
        if(this.Content){
          this.Content.setDefaultContent();
        }else {
          throw "Content not defined.";
        }

      } catch (e) {
        console.log("Section_RowPanelActions - clickEvent : Impossibile caricare il contenuto");
      }

  };
  Section_RowPanelActions.prototype.viewAll_event = function(){
    //console.log(this.Movimento);
    var self = this;
    var giustificativi = new Array();
    var intestatari = new Array();

    if(self.Movimento.Giustificativi && self.Movimento.Giustificativi.length > 0){
      giustificativi = self.Movimento.Giustificativi;
      console.log("giustificativi");
      console.log(giustificativi);
      for (var i = 0; i < giustificativi.length; i++) {
        var intestatario = new Intestatario();
        intestatario.Id = giustificativi[i].IdIntestatario;
        intestatario.Type = giustificativi[i].TipoIntestatario;
        intestatario.Intestatario = giustificativi[i].Intestatario;
        intestatari.push(intestatario);
      }

      if(intestatari.length > 0){
        self.IntestatariResults.LoadOnlySelected(intestatari);
      }
      //self.IntestatariResults.Load();

    }

  }
  Section_RowPanelActions.prototype.ini = function(){
    var self = this;

    this.Root().append(this.createElement().html());

    this.SwitchStatus_btn_viewAll();

    this.btn_back().off().click(function() {
      self.back_event();
    });

    this.btn_viewAll().off().click(function() {
      self.viewAll_event();
    });;

  };

  Input_SearchIntestatario.prototype.Root = function(){ return this.SearchIntestatario.Root(); };
  Input_SearchIntestatario.prototype.getElement = function(){ return this.Root().find('input'); };
  Input_SearchIntestatario.prototype.getValue = function(){
    return this.getElement().val();
  };
  Input_SearchIntestatario.prototype.ini = function(){
    var self = this;

    self.getElement().focus();

    self.getElement().keyup(function(event) {
      var contenitoreAutocomplete = self.SearchIntestatario.Content.RootPane().find('.ms-row-list.autocomplete_results .ms-vert-list');
      var contenitoreRisultati = self.SearchIntestatario.Content.RootPane().find('.resultsIntestatario');
      //contenitoreAutocomplete.empty();

      /*

      if(event.keyCode == 13 && clone.resultsContainer.find('> div').length == 0){
        console.log("Niente data");
        var newFornitore = new fornitore_ui();
        newFornitore.term = clone.searchIntestatario.Input.getValue();
        clone.searchIntestatario.Content.empty();

        newFornitore.rootPanel = clone.searchIntestatario.Content.RootPane();
        newFornitore.prevAction = function(){
          clone.searchIntestatario.Content.setDefaultContent();
        };
        newFornitore.nextAction = function(array){
          clone.searchIntestatario.Content.TransactionPropertiesBody.Root = $("#maincont");
          var selectIntestatario = new Content_SelectIntestatario(clone.searchIntestatario.Content, clone.searchIntestatario.Movimento);
          selectIntestatario.ini(function(){
            clone.searchIntestatario.IntestatariResults.Load(array);
          });
        }
        newFornitore.init();
      }

      */

      if(event.keyCode == 13){

        /*console.log(contenitoreAutocomplete);
        console.log(contenitoreAutocomplete.find('> div').length);
        console.log(contenitoreAutocomplete.first());
        console.log(contenitoreAutocomplete.find('.ms-row-struct').hasClass('newFornitore'));*/

        if(contenitoreAutocomplete.find('> div').length === 1 && contenitoreAutocomplete.find('.ms-row-struct').hasClass('newFornitore')){
          console.log("Nuovo fornitore");
          var newFornitore = new fornitore_ui();
          newFornitore.term = self.SearchIntestatario.Input.getValue();
          self.SearchIntestatario.Content.empty();

          newFornitore.rootPanel = self.SearchIntestatario.Content.RootPane();
          newFornitore.prevAction = function(){
            self.SearchIntestatario.Content.setDefaultContent();
          };
          newFornitore.nextAction = function(array){
            self.SearchIntestatario.Content.TransactionPropertiesBody.Root = $("body");
            var selectIntestatario = new Content_SelectIntestatario(self.SearchIntestatario.Content, self.SearchIntestatario.Movimento);
            selectIntestatario.ini(function(){
              self.SearchIntestatario.IntestatariResults.Load(array);
            });
          }
          newFornitore.init();

        }else{
          contenitoreAutocomplete.empty();
          self.SearchIntestatario.btn_Search.getButton().click();
        }
      }else{
        contenitoreAutocomplete.empty();
        contenitoreRisultati.empty();

        var term =  self.getValue() !== "" ? self.getValue() : "";
        if (term.length > 2) {
          var autocomplete = new autocomplete_Intestatario();
          var filtro = {
            Pagination : {
              CurrentPage : 1,
              LimitRows : 6
            },
            Termine : term
          };

          autocomplete.filtro = filtro;
          autocomplete.resultsContainer = contenitoreAutocomplete;
          autocomplete.searchIntestatario = self.SearchIntestatario;
          autocomplete.init(function(){
            console.log("YES!");
          });

        }else{
          contenitoreAutocomplete.empty();
        }
      }

    });

  };

  Button_SearchIntestatario.prototype.Root = function(){ return this.SearchIntestatario.Root(); };
  Button_SearchIntestatario.prototype.getButton = function(){ return this.Root().find('.btn-searchIntestatario'); };
  Button_SearchIntestatario.prototype.clickEvent = function (){
    var self = this;
    var res = null;
    var termine = this.SearchIntestatario.Input.getValue();
    if(termine && termine != ""){
      /*console.log(termine);
      console.log("1.Richiesta server... 2.Creazione elemento in base alla tipologia dell'instestatario... 3.Caricamento Risultati nella tabella.");*/
      var intestatari = new Intestatario();
      var pagination = { CurrentPage : 1, LimitRows : 10 };
      var filtro = { Termine : termine, Pagination : pagination };
      intestatari.Search(filtro, function (res){
        console.log("Before load intestatari");
        console.log(res);
        self.SearchIntestatario.IntestatariResults.Load(res.Data);
        //var data = res.Data;
        //console.log(data);

      });
    }

    return res;
  };
  Button_SearchIntestatario.prototype.ini = function(){
    var self = this;
    this.getButton().off().click(function() {
      self.clickEvent();
    });

  };

  SearchIntestatario.prototype.createElement = function(){
    var res = $('<div class="tm-properties-row uk-form-horizontal"><div class="tm-search-box" style="width : 350px"><i class="tm-icon tm-icon-search -name_search"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></i><input type="text" class="tm-search-box__input ax-add-tag-textfield" placeholder="Ricerca intestatario" value=""></div></div>');
    var button = $('<div class="tm-properties-row__content"><section class="tm-add-button-box"><div class="tm-add-button-box__left"><div class="tm-add-button-panel__input"><div class="add-button ax-add-tag-button btn-searchIntestatario" style="width: 75px">Cerca</div></div></div><div class="tm-add-button-box__right"></div></section></div>');
    res.first().append(button);

    return res;
  };
  SearchIntestatario.prototype.ini = function(){
    //Non c'è bisogno di Root
    var self = this;

    self.Root().append(self.createElement().html());
    self.Input.ini();
    self.btn_Search.ini();

  };
  SearchIntestatario.prototype.Root = function(){
    return this.Content.RootPane().find('.searchIntestatario');
  };

  List_DocumentiFiscali_Inquilino.prototype.Root = function(){ return this.CSG_Inquilino.Root().find('div[data-item-index=' + this.Giustificativo.Id +']'); };
  List_DocumentiFiscali_Inquilino.prototype.btn_Select = function(){ return this.Root().find('.tm-input-row'); };
  List_DocumentiFiscali_Inquilino.prototype.Checkbox = function(){ return this.btn_Select().find('.tm-input-row__left .tm-input-row__checkbox'); };
  /*  */
  List_DocumentiFiscali_Inquilino.prototype.AddDoc= function(callback){
    var self = this;
    self.Movimento.AddDocumentoFiscale(self.CSG_Inquilino.Intestatario, self.Giustificativo, function(){
      self.CSG_Inquilino.setActive();
      if (callback) {
        callback();
      }
      //self.CSG_Inquilino.IntestatariResults.Section_RowPanelActions.SwitchStatus_btn_viewAll();
      //self.CSG_Inquilino.IntestatariResults.SwitchNexBtn();
    });




  };
  /*  */
  List_DocumentiFiscali_Inquilino.prototype.RemoveDoc = function(callback){
    var self = this;
    self.Movimento.RemoveDocumentoFiscale(self.CSG_Inquilino.Intestatario, self.Giustificativo, function(){
      if (!self.Movimento.SearchM_I(self.CSG_Inquilino.Intestatario)) {
        //Card disable
        self.CSG_Inquilino.setDisable();
      }

      if (callback) {
        callback();
      }

      //self.CSG_Inquilino.IntestatariResults.Section_RowPanelActions.SwitchStatus_btn_viewAll();
      //self.CSG_Inquilino.IntestatariResults.SwitchNexBtn();

    });
  };
  List_DocumentiFiscali_Inquilino.prototype.SwitchFunction = function(callback){
    var self = this;
    if (self.getStatus()) {
      self.RemoveDoc(function(){
        if (callback) {
          callback();
        }
      });
    } else {
      self.AddDoc(function(){
        if (callback) {
          callback();
        }
      });
    }
  };
  List_DocumentiFiscali_Inquilino.prototype.SwitchColor = function(){
    if (this.getStatus()) {
      this.setBlank();
    } else {
      this.setActive();
    }
  };
  List_DocumentiFiscali_Inquilino.prototype.setStatus = function(){
    var self = this;
    self.CSG_Inquilino.M_I(function(m_i, index){
      if(self.Movimento.SearchDocumentoFiscale(m_i, self.Giustificativo)){
        self.Movimento.SearchDocumentoFiscale(m_i, self.Giustificativo, function(ramo, index){
          if (ramo.isNewDoc()) {
            self.setActive();
          }else {
            self.setDisable();
          }
        });
      }else {
        self.setBlank();
      }

    });
  };
  List_DocumentiFiscali_Inquilino.prototype.setActive = function (){
    var self = this;
    this.Checkbox().css('background-color', 'rgb(105, 111, 122)');
  };
  List_DocumentiFiscali_Inquilino.prototype.setDisable = function(){
    this.Checkbox().css('background-color', 'rgb(227, 228, 231)');
  };
  List_DocumentiFiscali_Inquilino.prototype.setBlank = function(){
    this.Checkbox().css('background-color', 'rgb(255, 255, 255)');
  }
  List_DocumentiFiscali_Inquilino.prototype.getStatus = function(){
    var bool = false;
    var val = this.Checkbox().css('background-color');
    if(val === 'rgb(105, 111, 122)'){
      bool = true;
    }

    return bool;
  };

  List_DocumentiFiscali_Inquilino.prototype.TextLeft = function(){ return this.Root().find(this.RootTextLeft); };
  List_DocumentiFiscali_Inquilino.prototype.TextRight = function(){ return this.Root().find(this.RootTextRight); };
  List_DocumentiFiscali_Inquilino.prototype.createElement = function(){
    var res = $('<div class="tm-list-item" data-item-index="' + this.Giustificativo.Id + '"><div class="tm-input-row"><div class="tm-input-row__left"><div class="tm-input-row__checkbox"><i class="tm-icon tm-icon-check-mark-bold -name_check-mark-bold"></i></div><div class="tm-input-row__info"><div class="tm-simple"><div class="tm-simple__text"></div></div></div></div><div class="tm-input-row__right"><i class="tm-icon tm-icon-pen ax-edit-button"></i></div></div></div>');
      var span_left = $('<span></span>').append(this.Giustificativo.getNominativo());
    var importo = this.Giustificativo.getTotale();
    res.find(this.RootTextLeft).append(span_left);
    res.find(this.RootTextRight).append(importo);
    return res;
  }
  List_DocumentiFiscali_Inquilino.prototype.setTextLeft = function(val){
    if(val){
      this.TextLeft().append(val);
    }
  };
  List_DocumentiFiscali_Inquilino.prototype.clickEvent = function(callback){
    var self = this;
    self.SwitchFunction(function(){
      self.SwitchColor();
      if (callback) {
        callback();
      }
    });

  }
  List_DocumentiFiscali_Inquilino.prototype.setTextRight = function(val){
    if(val){
      this.TextRight().append(val);
    }
  }
  List_DocumentiFiscali_Inquilino.prototype.ini = function(){
    var self = this;

    self.btn_Select().off().click(function() {
      self.clickEvent(function(){
        self.CSG_Inquilino.IntestatariResults.Section_RowPanelActions.SwitchStatus_btn_viewAll();
        self.CSG_Inquilino.IntestatariResults.SwitchNexBtn();
      });

    }).parent().click(function(e) {
      return false;
    });

  };

  CSG_Inquilino.prototype.Root = function(){
    return this.IntestatariResults.Root().find('div[data-id=' + this.Intestatario.Id +']');
  };
  CSG_Inquilino.prototype.setContent = function (contenuto){
      if(contenuto){
        this.Root().html(contenuto);
      }
  };
  CSG_Inquilino.prototype.RootTable = function(){
    return this.Root().find('div.tm-list.tm-hack-scrollbar');
  };
  CSG_Inquilino.prototype.M_I = function(callback){
    var self = this;
    var bool = false;
    self.Movimento.SearchM_I(self.Intestatario, function(m_i, index){
      bool = true;
      if (callback) {
        callback(m_i, index);
      }
    });

    return bool;
  };
  CSG_Inquilino.prototype.Prepare = function(intestatario, giustificativi){
    var self = this;
    var contenuto = $('<div>', { } , '</div>');
    var title = $('<div class="tm-intestatari-results__row-header__title"><div class="tm-editable-textarea" style="font-size: 14px; padding: 0px;"><div class="tm-intestatari-results__row-textarea__content">' + intestatario.getNominativo() + '</div><div class="tm-intestatari-results__row-textarea__left"><div class="tm-intestatari-results__row-textarea__left-text">Inquilino/a</div></div></div></div>');
    contenuto.append(title);

    if(giustificativi.length > 0){
      var table = $('<div class="tm-list tm-hack-scrollbar"></div>');
      contenuto.append(table);
    }else{
      //Messaggio di Intestatario senza giustificativi.
    }

    return contenuto.html();
  };
  CSG_Inquilino.prototype.Load = function(callback){
    var self = this;
    var giustificativi = new Array();
    var filtro = null;
    var contenuto = $('<div>', { } , '</div>');
    if (self.Intestatario) {
      self.Intestatario.LoadGiustificativi(filtro, function(res){
        giustificativi = res.Data;
        contenuto.append(self.Prepare(self.Intestatario, giustificativi));
        self.setContent(contenuto);
        each(giustificativi, function(index, el) {
          var row = new List_DocumentiFiscali_Inquilino(giustificativi[index], self.Movimento, self);
          self.AddRow(row.createElement());
          row.ini();
          row.setStatus();
        });

        if(callback){
            callback();
        }

      });
    }

  };
  /*
   * Vengono caricati tutti i docs di this.Intestatario
   */
  CSG_Inquilino.prototype.LoadOnlySelected = function(callback){
    var self = this;
    var giustificativi = new Array();
    var filtro = null;
    var contenuto = $('<div>', { } , '</div>');
    if (self.Intestatario) {
      if (self.Movimento.SearchM_I(self.Intestatario)){
        self.Movimento.SearchM_I(self.Intestatario, function(m_i, index){
          var giustificativi = m_i.getDocumentiFiscali();
          contenuto.append(self.Prepare(self.Intestatario, giustificativi));
          self.setContent(contenuto);
          each(giustificativi, function(index, el) {
            var row = new List_DocumentiFiscali_Inquilino(giustificativi[index], self.Movimento, self);
            self.AddRow(row.createElement());
            row.ini();

            row.setStatus();

          });

          if(callback){
              callback();
          }

        });
      }
    }
  };
  CSG_Inquilino.prototype.AddRow = function(row){
    if(row){
      this.RootTable().append(row);
    }
  };
  CSG_Inquilino.prototype.AddIntestatario = function(callback){
    var self = this;
    self.Movimento.AddM_I(self.Intestatario, function(){
      self.IntestatariResults.Section_RowPanelActions.SwitchStatus_btn_viewAll();
      self.IntestatariResults.SwitchNexBtn();
      if (callback) {
        callback();
      }

    });
  };
  CSG_Inquilino.prototype.RemoveIntestatario = function(callback){
    var self = this;
    self.Movimento.RemoveM_I(self.Intestatario, function(){
      self.setRowsDisable();
      self.IntestatariResults.Section_RowPanelActions.SwitchStatus_btn_viewAll();
      self.IntestatariResults.SwitchNexBtn();
      if (callback) {
        callback();
      }
    });
  };
  CSG_Inquilino.prototype.clickEvent = function(callback){
    var self = this;
    this.SwitchFunction(function(){
      self.SwitchColor();

      if (callback) {
        callback();
      }
    });

  };
  CSG_Inquilino.prototype.getStatus = function(){
    var bool = false;
    var val = this.Root().css('border-color');
    if(val === 'rgb(212, 214, 219)'){
      bool = true;
    }

    return bool;
  };
  CSG_Inquilino.prototype.setDisable = function(){
    this.Root().css('border', 'none');
  };
  CSG_Inquilino.prototype.setActive = function(){
    this.Root().css('border', '2px solid #d4d6db');
  };
  CSG_Inquilino.prototype.setRowsDisable = function(){
    var self = this;
    self.RootTable().find('.tm-input-row .tm-input-row__left .tm-input-row__checkbox').css('background-color', 'rgb(255, 255, 255)');
  };
  CSG_Inquilino.prototype.setRowsActive = function(){
    var self = this;
    self.RootTable().find('.tm-input-row .tm-input-row__left .tm-input-row__checkbox').css('background-color', 'rgb(105, 111, 122)');
  };
  CSG_Inquilino.prototype.SwitchColor = function(){
    if (this.getStatus()) {
      this.setDisable();
    } else {
      this.setActive();
    }
  };
  CSG_Inquilino.prototype.SwitchFunction = function(callback){
    if (this.getStatus()) {
      this.RemoveIntestatario(function(){
        if (callback) {
          callback();
        }
      });
    } else {
      this.AddIntestatario(function(){
        if (callback) {
          callback();
        }
      });
    }
  };
  CSG_Inquilino.prototype.ini_OnlySelected = function(){
    var self = this;
    this.LoadOnlySelected(function(){
      self.Root().off().click(function() {
        self.clickEvent(function(){
        });
      });
    });
  };
  CSG_Inquilino.prototype.ini = function(){
    var self = this;
    this.Load(function(){
      self.Root().off().click(function() {
        self.clickEvent(function(){
        });
      });
    });
  };

  Cards_SelectGiustificativo.prototype.LoadCards = function(callback){
    var self = this;
    var contenuto = $('<div>', { } , '</div>');
    var card = null;
    var intestatario = null;
    if(self.Intestatario){
      switch (parseInt(self.Intestatario.Type)) {
        case 1:
          console.log("Cliente");
          if(self.Intestatario.Intestatario){
            var cliente = self.Intestatario.Intestatario;
            switch (parseInt(cliente.Type)) {
              case 1:
                card = $('<div>', { class : 'intestatari-results__row csg-inquilino', 'data-id' : self.Intestatario.Id },'</div>');
                contenuto.append(card);
                intestatario = new CSG_Inquilino(self.Intestatario, self.Movimento, self.IntestatariResults);
                if(callback){
                  callback(contenuto.html(), intestatario);
                }
                break;
              case 2:
                card = $('<div>', { class : 'intestatari-results__row csg-altro-cliente', 'data-id' : self.Intestatario.Id },'</div>');
                contenuto.append(card);
                intestatario = new CSG_AltroCliente(self.Intestatario, self.Movimento, self.IntestatariResults);
                if(callback){
                  callback(contenuto.html(), intestatario);
                }
                break;
            }
          }
          break;
        case 2:
          console.log("Fornitore");
          card = $('<div>', { class : 'intestatari-results__row csg-fornitore', 'data-id' : self.Intestatario.Id },'</div>');
          contenuto.append(card);
          intestatario = new CSG_Fornitore(self.Intestatario, self.Movimento, self.IntestatariResults);
          if(callback){
            callback(contenuto.html(), intestatario);
          }
          break;
      }
    }
  };
  Cards_SelectGiustificativo.prototype.ini_OnlySelected = function(){
    var self = this;
    if(self.Intestatario && self.IntestatariResults){
      self.LoadCards(function(res, intestatario){
        if(res && intestatario){
          self.IntestatariResults.AddCard(res);
          intestatario.ini_OnlySelected();
          if (self.Movimento.SearchM_I(intestatario.Intestatario)) {
            intestatario.setActive();
          }
        }
      });
    }
  };
  Cards_SelectGiustificativo.prototype.ini = function(){
    var self = this;
    if(self.Intestatario && self.IntestatariResults){
      self.LoadCards(function(res, intestatario){
        if(res && intestatario){
          self.IntestatariResults.AddCard(res);
          intestatario.ini();
          if (self.Movimento.SearchM_I(intestatario.Intestatario)) {
            intestatario.setActive();
          }
        }
      });
    }
  };

  IntestatariResults.prototype.Root = function (){ return  this.Content.RootPane().find('.resultsIntestatario'); };
  IntestatariResults.prototype.getNextBtn = function() {
    return this.Root().parent().find('.nextBtn');
  };
  IntestatariResults.prototype.setText_NextBtn = function(){
    var count = this.Movimento.countDocumentiFiscali();
    if (count && count === 1) {
      this.getNextBtn().find('.tm-btn__text').html('Salva');
    }else{
      this.getNextBtn().find('.tm-btn__text').html('Ultimo step');
    }
  }
  IntestatariResults.prototype.SwitchNexBtn = function(){
    this.setText_NextBtn();
    if (this.Movimento.countNewDocumentiFiscali() > 0 || this.Movimento.countNewM_I() > 0) {
      this.getNextBtn().css('visibility', 'visible');
    }else{
      this.getNextBtn().css('visibility', 'hidden');
    }
  };
  IntestatariResults.prototype.getVisibilityNextBtn = function(){
    var val;

    val = this.getNextBtn().css('visibility');

    return val;
  };
  IntestatariResults.prototype.AddCard = function(Card){
    if(Card){
      //console.log(this.Root());
      this.Root().append(Card);
    }
  };
  IntestatariResults.prototype.Clear = function(){
    this.Root().empty();
  };
  IntestatariResults.prototype.Load = function(intestatari){
    var self = this;
    self.Clear();
    console.log("Inizio Load IntestatariResults");
    if(intestatari && intestatari.length > 0){
        intestatari.forEach(function(arrayElement) {

            var intestatario = new Cards_SelectGiustificativo(arrayElement, self);
            intestatario.ini();

        });
    }
  };
  IntestatariResults.prototype.LoadOnlySelected = function(intestatari){
    var self = this;
    self.Clear();
    if(intestatari && intestatari.length > 0){
        intestatari.forEach(function(arrayElement) {

            var intestatario = new Cards_SelectGiustificativo(arrayElement, self);
            intestatario.ini_OnlySelected();

        });
    }
  }
  IntestatariResults.prototype.ini = function(){
    var self = this;

    this.SwitchNexBtn();

    self.getNextBtn().click(function() {
      /*console.log("Next!!!");
      console.log(self.Movimento);*/
      if (self.Movimento.countDocumentiFiscali() === 1) {
        self.Movimento.Save(function(success){
          self.Content.setDefaultContent();
          if (success) {
            console.log("Salvataggio avvenuto con successo");
          }else{
            bootbox.alert("Errore durante il salvataggio");
            console.log("Errore durante il salvataggio");
          }
        });
      }else {
        self.Content.empty();
        var RootPane = self.Content.RootPane();
        var step2 = new CardsGiustificativo(self.Content, RootPane, self.Movimento);
        step2.ini();
      }

    });
  };

  CG_AltriClienti.prototype.Load = function(){

  };
  CG_AltriClienti.prototype.ini = function(callback){

    if(callback){
      callback();
    }
  };

  List_Giustificativi_Inquilino.prototype.Root = function(){ return this.ParentRoot.find('.row-doc[data-id="'+ this.RamoMovimento.RamoMovimento_DocumentoFiscale.DocumentoFiscale.Id +'"]'); };
  List_Giustificativi_Inquilino.prototype.RootHeader = function(){ return this.Root().find('.row-doc_header'); };
  List_Giustificativi_Inquilino.prototype.RootDescription = function(){ return this.Root().find('.row-doc_description'); };
  List_Giustificativi_Inquilino.prototype.RootTag = function(){ return this.Root().find('.row-doc_tag'); };
  List_Giustificativi_Inquilino.prototype.Clear = function(){
    this.Root().empty();
  };
  List_Giustificativi_Inquilino.prototype.getStatus = function(){
    var bool = false;
    var val = this.Root().css('border-color');
    if(val === 'rgb(20, 105, 155)'){
      bool = true;//Edit
    }

    return bool;
  };
  List_Giustificativi_Inquilino.prototype.ini_Edit = function(callback){
    var self = this;

    //Non inserire off() perchè non chiuderebbe gli altri che sono aperti (Edit).
    $(window).off().click(function() {
      if(self.getStatus()){
        self.clickEvent(function(){
          if (callback) {
            callback();
          }
        });
      }
    });

    self.Root().find('.tm-result-movimento__movimento-content__movimento-top-row .removeRamo').click(function(event) {
      event.stopPropagation();
      console.log("remove");
      var ramo = self.RamoMovimento;
      self.Root().remove();
      self.CG_Inquilino.Movimento.RemoveDocumentoFiscale(self.CG_Inquilino.m_i.Intestatario, self.RamoMovimento.getDocumentoFiscale(), function(){
        console.log(self.CG_Inquilino.Movimento);
        if (parseInt(ramo.Id) > 0) {
          ramo.Delete();
        }
      });
    });

    self.RootHeader().find('.tm-editable-textarea__importo input').keyup(function(event) {
      if(event.keyCode == 13){
        if(self.getStatus()){
          self.clickEvent(function(){
            if (callback) {
              callback();
            }
          });
        }
      }
    });

    self.RootDescription().find('input').keyup(function(event) {
      if(event.keyCode == 13){
        if(self.getStatus()){
          self.clickEvent(function(){
            if (callback) {
              callback();
            }
          });
        }
      }
    });

    //Off?
    self.RootHeader().find('.tm-editable-textarea__importo').click(function(event) {
      event.stopPropagation();
      return false;
    });
    //Off?
    self.RootDescription().click(function(event) {
      event.stopPropagation();
      return false;
    });

  };
  List_Giustificativi_Inquilino.prototype.ini_Base = function(callback){
    var self = this;

    if(this.RamoMovimento.RamoMovimento_TagMovimenti && this.RamoMovimento.RamoMovimento_TagMovimenti.Tags && this.RamoMovimento.RamoMovimento_TagMovimenti.Tags.length > 0){
      var tags = this.RamoMovimento.RamoMovimento_TagMovimenti.Tags;
      for (var i = 0; i < tags.length; i++) {
        var tagItem = new TagItem();
        tagItem.ramoMovimento = this.RamoMovimento;
        tagItem.rootFloatingPanel = self.Root();
        tagItem.tag = tags[i];//TagMovimento
        console.log(tagItem);
        tagItem.init();
      }
    }

    self.RootHeader().off().click(function(event) {
      //event.stopPropagation();
      self.clickEvent(function(){
        if (callback) {
          callback();
        }
      });
    });

    self.RootDescription().off().click(function(event) {
      //event.stopPropagation();
      self.clickEvent(function(){
        if (callback) {
          callback();
        }
      });
    });

    self.RootTag().find(' .tm-properties-row__content .ax-add-tag-button').off().click(function(event){
      self.Root().find(" .tagMovimenti_ramo_searchPanel").toggle();

      var tag_manager = new tagMovimenti_Manager();
      tag_manager.ramoMovimento = self.RamoMovimento;
      tag_manager.rootFloatingPanel = self.Root();
      tag_manager.init();
    });

  }
  /**
   * [SwitchFunction Prima di richiamare questa funzione bisognera cambiare lo stato (Edit o Base). Non deve avvenire dopo.]
   * @param {Function} callback [description]
   */
  List_Giustificativi_Inquilino.prototype.SwitchFunction = function(callback){
    var self = this;
    if (self.getStatus()) {
      console.log("edit");
      //Edit
      self.setEdit_ui(function(content){
        self.setContent(content);
        self.ini_Edit();
        if (callback) {
          callback();
        }
      });
    }else{
      console.log("read");
      /**
       * Prima di fare il cambiamento del contenuto avverrà il salvataggio.
       */
       //Base
      self.Save(function(){
        self.RamoMovimento.Load(function(){
          self.setBase_ui(function(content){
            self.setContent(content);
            self.ini_Base();
            if (callback) {
              callback();
            }
          });
        });
      });

    }
  };
  List_Giustificativi_Inquilino.prototype.SwitchColor = function(){
    if (this.getStatus()) {
      this.setBase_color();
    } else {
      this.setEdit_color();
    }
  };
  List_Giustificativi_Inquilino.prototype.setEdit_color = function(){
    this.Root().css('border-color', 'rgb(20, 105, 155)');
  };
  List_Giustificativi_Inquilino.prototype.setBase_color = function(){
    this.Root().css('border-color', 'rgb(212, 214, 219)');
  }
  List_Giustificativi_Inquilino.prototype.setContent = function(content){
    var self = this;

    if (content) {
      this.Clear();
      this.Root().append(content);
    }
  };
  List_Giustificativi_Inquilino.prototype.setBase_ui = function(callback){
    var self = this;
    var content = $('<div></div>');
    //Divider
    var divider = $('<div class="divider"></div>');

    var header = $('<div class="tm-editable-textarea row-doc_header" style="cursor: pointer;"><div class="tm-properties-row__icon"><i class="tm-icon glyphicon glyphicon-file"></i></div><div class="tm-intestatari-results__row-textarea__content" style="width: auto; text-align: left;">' + self.RamoMovimento.RamoMovimento_DocumentoFiscale.DocumentoFiscale.getNominativo() + '</div></div>');

    if (self.RamoMovimento.Importo && parseFloat(self.RamoMovimento.Importo.Importo) > 0) {
      var importo = self.RamoMovimento.Importo;
      var importo_ui = $('<div class="tm-editable-textarea__importo" style="color: #ff941d !important; font-size: 16px !important /* add PX (or original value) as backup */;"><i class="tm-icon tm-icon-importo"><span class="glyphicon glyphicon-euro" aria-hidden="true"></span></i><div class="tm-editable-textarea__importo-text">' + importo.Importo + '</div></div>');
      header.append(importo_ui);
    }

    content.append(header);

    //Aggiunta descrizione
    var descrizione_section = $('<div class="tm-editable-textarea row-doc_description" style="cursor: pointer;"></div>');
    var descrizione_ui = null;
    if (self.RamoMovimento.Descrizione && self.RamoMovimento.Descrizione.Descrizione) {
      descrizione_ui = $('<div class="tm-editable-textarea__content" style="text-align: left; color: #14699b;"><article class="tm-markdown-content"><p>' + self.RamoMovimento.Descrizione.Descrizione + '</p></article></div>');
    }else {
      descrizione_ui = $('<div class="tm-editable-textarea__content" style="text-align: left; color: #14699b;"><article class="tm-markdown-content"><p>Aggiungi descrizione</p></article></div>');
    }

    if (descrizione_ui) {
      descrizione_section.append(descrizione_ui);
      content.append(descrizione_section);
      content.append(divider);
    }

    //Aggiunta dei tag
    var tag_section = $('<div class="tm-editable-textarea row-doc_tag"></div><div class="tagMovimenti_ramo_searchPanel" style="display:none"><div class="togglePanel"><div class="togglePanel_lef-space"></div><div class="togglePanel_content" style="background-color: #fff;"><div class="togglePanel_content-actionsPanel"><div class="togglePanel_inputSearch"><i class="material-icons">search</i><input type="text" class="togglePanel_inputSearch-input" placeholder="Ricerca" value=""></div><div class="togglePanel_closePanel" title="Chiudi"><i class="material-icons">close</i></div></div><div class="togglePanel_content-elementList tm-list tm-hack-scrollbar"></div></div></div></div>');
    var tag_ui = $('<div class="tm-properties-row__icon"><i class="tm-icon glyphicon glyphicon-tags"></i></div><div class="tm-properties-row__label">Tags</div><div class="tm-properties-row__content"><section class="tm-add-button-box"><div class="tm-add-button-box__left"><div class="tm-add-button-panel__input"><div class="add-button ax-add-tag-button"><i class="tm-icon tm-icon-add glyphicon glyphicon-plus"></i></div></div></div><div class="tm-add-button-box__right"></div></section></div>');
    tag_section.first().append(tag_ui);

    content.append(tag_section);

    if (callback) {
      callback(content.html());
    }

  };
  List_Giustificativi_Inquilino.prototype.setEdit_ui = function(callback){
    var self = this;
    var content = $('<div></div>');
    //Divider
    var divider = $('<div class="divider"></div>');
    var header = $('<div class="tm-editable-textarea row-doc_header" style="cursor: pointer;"><div class="tm-properties-row__icon"><i class="tm-icon glyphicon glyphicon-file"></i></div><div class="tm-intestatari-results__row-textarea__content" style="width: auto; text-align: left;">' + self.RamoMovimento.RamoMovimento_DocumentoFiscale.DocumentoFiscale.getNominativo() + '</div></div>');


    var importo = self.RamoMovimento.Importo;
    var importo_val = (self.RamoMovimento.Importo && self.RamoMovimento.Importo.Importo && (parseFloat(self.RamoMovimento.Importo.Importo) > 0) ? self.RamoMovimento.Importo.Importo : "");

    var importo_ui = $('<div class="tm-editable-textarea__importo tm-search-box" style="color: #8BC34A;font-size: 15px /* add PX (or original value) as backup */;font-weight: normal;margin: 0px;"><i class="tm-icon tm-icon-search -name_search" style="padding: 2px 6px;"><span class="glyphicon glyphicon-eur" aria-hidden="true"></span></i><input type="text" class="tm-search-box__input ax-add-tag-textfield" placeholder="Importo" value="' + importo_val + '" style="height: 24px;"></div>');
    header.append(importo_ui);


    content.append(header);

    //Aggiunta descrizione
    var descrizione = {
      section : $('<div class="tm-editable-textarea row-doc_description" style="cursor: pointer;"></div>'),
      val : (self.RamoMovimento.Descrizione && self.RamoMovimento.Descrizione.Descrizione && (self.RamoMovimento.Descrizione.Descrizione.length > 0) ? self.RamoMovimento.Descrizione.Descrizione : ""),
      ui : function(){ return $('<div class="tm-editable-textarea__importo tm-search-box" style="color: #8BC34A;font-size: 15px /* add PX (or original value) as backup */;font-weight: normal;margin: 0px; flex : 1;"><i class="tm-icon tm-icon-search -name_search" style="padding: 10px 6px;"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></i><input type="text" class="tm-search-box__input ax-add-tag-textfield" placeholder="Descrizione..." value="' + this.val + '" style="height: 40px;"></div>'); },
      push_ui : function(container){
        if (this.ui()) {
          this.section.append(this.ui());
          container.append(this.section);
        }
      }
    };

    descrizione.push_ui(content);
    content.append(divider);

    //Aggiunta dei tag
    var tag_section = $('<div class="tm-editable-textarea row-doc_tag"></div>');
    var tag_ui = $('<div class="tm-properties-row__icon"><i class="tm-icon glyphicon glyphicon-tags"></i></div><div class="tm-properties-row__label">Tags</div><div class="tm-properties-row__content"><section class="tm-add-button-box"><div class="tm-add-button-box__left"><div class="tm-add-button-panel__input"><div class="add-button ax-add-tag-button"><i class="tm-icon tm-icon-add glyphicon glyphicon-plus"></i></div></div></div><div class="tm-add-button-box__right"></div></section></div>');
    tag_section.append(tag_ui);

    content.append(tag_section);

    //Elimina ramo
    var footer = {
      section : $('<div><div class="tm-result-movimento__movimento-content__movimento-top-row"><div class="tm-result-movimento__movimento-content__movimento-top-row__movimento-details-left"></div><div class="tm-result-movimento__movimento-content__movimento-top-row__movimento-details-right"><div class="tm-properties-row__content"><section class="tm-add-button-box removeRamo"><div class="tm-add-button-box__left"><div class="tm-add-button-panel__input"><div class="add-button ax-add-tag-button" style="background-color: #14699b;color: #ffffff;"><i class="tm-icon tm-icon-add glyphicon glyphicon-trash"></i></div></div></div><div class="tm-add-button-box__right"></div></section></div></div></div></div>')
    };

    content.append(footer.section.html());

    if (callback) {
      callback(content.html());
    }
  };
  List_Giustificativi_Inquilino.prototype.clickEvent = function(callback){
    var self = this;
    var admin = new Admin();
    admin.Load(function (){

        if(admin.isAdministrator() || admin.isContabile() || admin.isDataEntry()){
          self.SwitchColor();
          self.SwitchFunction(function(){
            if (callback) {
              callback();
            }
          });
        }else {
          console.log("Commercialista");
        }

    });
  };
  /**
   * [setImporto description]
   * @param {[MovimentoImporto]} importo [description]
   */
  List_Giustificativi_Inquilino.prototype.setImporto = function(importo){
    var self = this;
    if (importo.Importo) {
      if (self.RamoMovimento.Importo) {
        self.RamoMovimento.Importo.Importo = importo.Importo;
      }else {
        importo.Id = 0;
        importo.IdRamoMovimento = self.RamoMovimento.Id;
        importo.IdMovimentoIntestatario = self.RamoMovimento.IdMovimentoIntestatario;
        self.RamoMovimento.Importo = importo;
      }
    }else if(self.RamoMovimento.Importo){
        importo.Importo = 0;
        self.RamoMovimento.Importo.Importo = importo.Importo;
    }
  };
  /**
   * [setDescription description]
   * @param {[MovimentoDescrizione]} description [description]
   */
  List_Giustificativi_Inquilino.prototype.setDescription = function(description){
    var self = this;
    if (description.Descrizione || description.Descrizione === "") {
      if (self.RamoMovimento.Descrizione) {
        self.RamoMovimento.Descrizione.Descrizione = description.Descrizione;
      }else {
        description.Id = 0;
        description.IdRamoMovimento = self.RamoMovimento.Id;
        description.IdMovimentoIntestatario = self.RamoMovimento.IdMovimentoIntestatario;
        self.RamoMovimento.Descrizione = description;
      }
    }
  };
  /**
   * [getValues Prende i valori html del ramo]
   * @return {[type]} [description]
   */
  List_Giustificativi_Inquilino.prototype.getValues = function(){
    var self = this;

    var importo = new MovimentoImporto();
    importo.Importo = self.RootHeader().find('.tm-editable-textarea__importo input').val();
    var descrizione = new MovimentoDescrizione();
    descrizione.Descrizione = self.RootDescription().find('input').val();

    self.setImporto(importo);
    self.setDescription(descrizione);
  };
  /**
   * [Save Salvataggio in locale se IdRamo <= 0 altrimenti salvataggio diretto con chiamata al server. Importante : Non significa salvataggio dell'intero movimento ma del singolo ramo.]
   * @param {Function} callback [description]
   * @TODO Mancano dei controlli .
   */
  List_Giustificativi_Inquilino.prototype.Save = function(callback){
    var self = this;

    self.getValues();

    if (parseInt(self.RamoMovimento.Id) > 0) {
      self.RamoMovimento.Save(function(success){
        if (!success) {
          console.log("Errore durante il salvataggio");
          bootbox.alert("Errore durante il salvataggio");
        }
        if (callback) {
          callback();
        }
      });
    }else{
      console.log("Modifiche mantenute in locale");
      if (callback) {
        callback();
      }
    }


  };
  List_Giustificativi_Inquilino.prototype.Load = function(callback){
    var self = this;
    /**
     * [1] Root del ramo con id di quel determinato giustificativo.
     * [2] Caricamento oggetti del ramo
     */

    //Divider
    var divider = $('<div class="divider"></div>');

    if (self.RamoMovimento.RamoMovimento_DocumentoFiscale && self.RamoMovimento.RamoMovimento_DocumentoFiscale.IdDocumentoFiscale) {
      var root = $('<div class="intestatari-results__row row-doc" data-id="' + self.RamoMovimento.RamoMovimento_DocumentoFiscale.DocumentoFiscale.Id + '" style="border: 2px solid #d4d6db;margin-bottom: 10px;"></div>');
      self.ParentRoot.append(root);

      self.setBase_ui(function(content){
        self.setContent(content);
        self.ini_Base();
        if(callback){
          callback();
        }

      });

    }

  };
  List_Giustificativi_Inquilino.prototype.ini = function(callback){
    var self = this;

    if(self.RamoMovimento){
      self.Load(function(){

        /*self.RootHeader().off().click(function() {
          console.log("click header");
          self.clickEvent(function(){
            if (callback) {
              callback();
            }
          });
        });*/

        /*self.Root().off().on('click', '.row-doc_header, .row-doc_description', function() {
          self.clickEvent(function(){
            if (callback) {
              callback();
            }
          });
        });*/

      });
    }
  };

  CG_Inquilino.prototype.getRootCard = function(){
    return $(this.ParentRoot).find('.intestatari-results__row.cg-inquilino[data-id=' + this.m_i.IdIntestatario + ']');
  };
  CG_Inquilino.prototype.RootTitleBtn = function(){
    return this.getRootCard().find('.removeM_I');
  }
  CG_Inquilino.prototype.Load = function(callback){
    var self = this;
    var busContainer = $('<div>', { class : "intestatari-results__row cg-inquilino", 'data-id' : self.m_i.IdIntestatario } ,'</div>');
    var title = $('<div class="tm-intestatari-results__row-header__title" style="margin-bottom: 10px;"><div class="tm-editable-textarea" style="font-size: 14px; padding: 0px;"><div class="tm-intestatari-results__row-textarea__content">' + self.m_i.Intestatario.getNominativo() + '</div><div class="tm-intestatari-results__row-textarea__left"><div class="tm-intestatari-results__row-textarea__left-text"></div></div></div></div>');
    var left_btn = $('<div class="tm-properties-row__content"><section class="tm-add-button-box removeM_I"><div class="tm-add-button-box__left"><div class="tm-add-button-panel__input"><div class="add-button ax-add-tag-button" style="background-color: #e6e8ec;color: #696f7a;"><i class="tm-icon tm-icon-add glyphicon glyphicon-trash"></i></div></div></div><div class="tm-add-button-box__right"></div></section></div>');
    title.find('.tm-intestatari-results__row-textarea__left-text').append(left_btn);
    busContainer.append(title);
    self.ParentRoot.append(busContainer);
    //Ogni ramo rappresenta un giustificativo di quel M_I.
    if (self.m_i.RamoMovimento && self.m_i.RamoMovimento.length > 0) {
      var rami = self.m_i.RamoMovimento;

      for (var i = 0; i < rami.length; i++) {
        var ramo = new List_Giustificativi_Inquilino(self.getRootCard(), rami[i], self);
        ramo.ini();
      }
    }

    if (callback) {
      callback();
    }

  };
  CG_Inquilino.prototype.btn_ClickEvent = function(){
    var self = this;
    self.RootTitleBtn().off().click(function() {
      var admin = new Admin();
      admin.Load(function (){
        if(admin.isAdministrator() || admin.isContabile() || admin.isDataEntry()){
          var movimento_intestatario = self.m_i;
          self.getRootCard().remove();
          self.Movimento.DeleteM_I(self.m_i.Intestatario, function(){
            if (parseInt(movimento_intestatario.Id) > 0) {
              movimento_intestatario.Delete();
            }
          });
        }else {
          console.log("Commercialista");
        }
      });
    });
  }
  CG_Inquilino.prototype.ini = function(callback){
    var self = this;
    if (self.m_i) {
      self.Load(function(){

        self.btn_ClickEvent();

        if(callback){
          callback();
        }
      });
    }
  };

  /**
   *##################################################
   *########## BEGIN : CG_Fornitore  #################
   *##################################################
   */

   CG_Fornitore.prototype.getRootCard = function(){
     return $(this.ParentRoot).find('.intestatari-results__row.cg-provider[data-id=' + this.m_i.IdIntestatario + ']');
   };
   CG_Fornitore.prototype.RootTitleBtn = function(){
     return this.getRootCard().find('.removeM_I');
   }
   CG_Fornitore.prototype.Load = function(callback){
     var self = this;
     var busContainer = $('<div>', { class : "intestatari-results__row cg-provider", 'data-id' : self.m_i.IdIntestatario } ,'</div>');
     var title = $('<div class="tm-intestatari-results__row-header__title" style="margin-bottom: 10px;"><div class="tm-editable-textarea" style="font-size: 14px; padding: 0px;"><div class="tm-intestatari-results__row-textarea__content">' + self.m_i.Intestatario.getNominativo() + '</div><div class="tm-intestatari-results__row-textarea__left"><div class="tm-intestatari-results__row-textarea__left-text"></div></div></div></div>');
     var left_btn = $('<div class="tm-properties-row__content"><section class="tm-add-button-box removeM_I"><div class="tm-add-button-box__left"><div class="tm-add-button-panel__input"><div class="add-button ax-add-tag-button" style="background-color: #e6e8ec;color: #696f7a;"><i class="tm-icon tm-icon-add glyphicon glyphicon-trash"></i></div></div></div><div class="tm-add-button-box__right"></div></section></div>');
     title.find('.tm-intestatari-results__row-textarea__left-text').append(left_btn);
     busContainer.append(title);
     self.ParentRoot.append(busContainer);
     //Ogni ramo rappresenta un giustificativo di quel M_I.
     if (self.m_i.RamoMovimento && self.m_i.RamoMovimento.length > 0) {
       var rami = self.m_i.RamoMovimento;
       for (var i = 0; i < rami.length; i++) {
         var ramo = new List_Giustificativi_Inquilino(self.getRootCard(), rami[i], self);
         ramo.ini();
       }
     }

     if (callback) {
       callback();
     }

   };
   CG_Fornitore.prototype.btn_ClickEvent = function(){
     var self = this;
     self.RootTitleBtn().off().click(function() {
       var admin = new Admin();
       admin.Load(function (){
         if(admin.isAdministrator() || admin.isContabile() || admin.isDataEntry()){
           var movimento_intestatario = self.m_i;
           self.getRootCard().remove();
           self.Movimento.DeleteM_I(self.m_i.Intestatario, function(){
             if (parseInt(movimento_intestatario.Id) > 0) {
               movimento_intestatario.Delete();
             }
           });
         }else {
           console.log("Commercialista");
         }
       });
     });
   }

   CG_Fornitore.prototype.ini = function(callback){
     var self = this;
     if (self.m_i) {
       self.Load(function(){

         self.btn_ClickEvent();

         if(callback){
           callback();
         }
       });
     }
   };

   /**
    *##################################################
    *########## END : CG_Fornitore  #################
    *##################################################
    */

  //Utilizza CardsGiustificativo_Body.AddCardM_I
  /**
   * [Load description]
   * @param {[Movimento_Intestatario]}   m_i      [description]
   * @param {Function} callback [description]
   */
  Routing_CardsGiustificativo.prototype.Load = function(m_i, callback){
    var self = this;
    if (m_i.TipoIntestatario) {
      switch (parseInt(m_i.TipoIntestatario)) {
        case 1:
        //Clienti
          if (m_i.Intestatario && m_i.Intestatario.Type) {
            switch (parseInt(m_i.Intestatario.Type)) {
              case 1:
                //Inquilino
                var card_inquilino = new CG_Inquilino(m_i, self.Root, self.Movimento);
                card_inquilino.ini(function(){
                  if (callback) {
                    callback(m_i, card_inquilino);
                  }
                });
                break;
              case 2:
                //AltroCliente
                var card_altroCliente = new CG_AltriClienti();
                card_altroCliente.ini(function(){
                  if (callback) {
                    callback(m_i, card_altroCliente);
                  }
                });
                break;
            }
          }
          break;
        case 2:
          //Fornitore
          var card_fornitore = new CG_Fornitore(m_i, self.Root, self.Movimento);
          card_fornitore.ini(function(){
            if (callback) {
              callback(m_i, card_fornitore);
            }
          });
          break;
      }
    }
  };
  Routing_CardsGiustificativo.prototype.ini = function(){
    var self = this;

    if (self.Movimento_Intestatario) {
      self.Load(self.Movimento_Intestatario, function(m_i, content){
        //AddCardM_I
      });
    }
  };

  //NOTE : Forse è return this.ParentRoot().find(Root)
  CardsGiustificativo_Body.prototype.Root = function(){ return this.ParentRoot.find('.' + this.RootClass)};
  CardsGiustificativo_Body.prototype.getRootCard = function(m_i){
    var selector = " nome della classe div[data-id=" + m_i.IdIntestatario + "]";

    return this.Root().find(selector);
  };
  /**
   * [Load : Deve essere un caricamento per Tipologia di Intestatario, quindi per ogni Tipologia si creerà prima il root della sua categoria
   * e successivamente verranno inseriti i suoi rows]
   * @param {Function} callback              [description]
   */
  CardsGiustificativo_Body.prototype.Load = function(callback){
    var self = this;

    var inquilini = self.Movimento.getM_IByTipologiaIntestatario(1, 1);
    var altriClienti = self.Movimento.getM_IByTipologiaIntestatario(1, 2);
    var fornitori = self.Movimento.getM_IByTipologiaIntestatario(2);

    if (inquilini.length > 0) {
      //1. Creazione root tabella, 2. Inserimento rows [ 1.Generazione Root utilizzando this.AddCardM_I, 2.ini di CG_Intestatario ]
      var rootTab_Inquilini_text = "tab-tentants";
      var tabInquilini = $('<div>', { class: rootTab_Inquilini_text, style : "background-color: #e6e8ec; padding: 10px; margin-bottom: 10px;" },'</div>');
      tabInquilini.append("<div class='tm-intestatari-results__row-header__title' style='margin-bottom: 10px;'><div class='tm-editable-textarea' style='font-size: 14px; padding: 0px;'><div class='tm-intestatari-results__row-textarea__content'></div><div class='tm-intestatari-results__row-textarea__left'><div class='tm-intestatari-results__row-textarea__left-text'>Inquilini</div></div></div></div>");
      self.Root().append(tabInquilini);
      var rootTab_Inquilini = self.Root().find('.' + rootTab_Inquilini_text);
      for (var i = 0; i < inquilini.length; i++) {
        var intestatario = new Routing_CardsGiustificativo(rootTab_Inquilini, inquilini[i], self);
        intestatario.ini();
      }

    }

    if (altriClienti.length > 0) {
      var rootTab_AltriClienti_text = "tab-otherClients";
      var tabAltriClienti = $('<div>', { class: rootTab_AltriClienti_text },'</div>');
      self.Root().append(tabAltriClienti);
      var rootTab_AltriClienti = self.Root().find('.' + rootTab_AltriClienti_text);
      for (var i = 0; i < altriClienti.length; i++) {
        var intestatario = new Routing_CardsGiustificativo(rootTab_AltriClienti, altriClienti[i], self);
        intestatario.ini();
      }
    }

    if (fornitori.length > 0) {
      var rootTab_Fornitori_text = "tab-providers";
      var tabFornitori = $('<div>', { class: rootTab_Fornitori_text, style : "background-color: #e6e8ec; padding: 10px; margin-bottom: 10px;" },'</div>');
      tabFornitori.append("<div class='tm-intestatari-results__row-header__title' style='margin-bottom: 10px;'><div class='tm-editable-textarea' style='font-size: 14px; padding: 0px;'><div class='tm-intestatari-results__row-textarea__content'></div><div class='tm-intestatari-results__row-textarea__left'><div class='tm-intestatari-results__row-textarea__left-text'>Fornitori</div></div></div></div>");
      self.Root().append(tabFornitori);
      var rootTab_Fornitori = self.Root().find('.' + rootTab_Fornitori_text);
      for (var i = 0; i < fornitori.length; i++) {
        var intestatario = new Routing_CardsGiustificativo(rootTab_Fornitori, fornitori[i], self);
        intestatario.ini();
      }
    }

    if (callback) {
      callback();
    }

  };
  /**
   * [ini : ]
   * @return {[type]} [description]
   */
  CardsGiustificativo_Body.prototype.ini = function(){
    var self = this;
    if (self.Movimento && self.Movimento.Giustificativi && self.Movimento.Giustificativi.length > 0) {
      console.log("ini di CardsGiustificativo_Body");
      var bodyRoot = $('<div>', { class : self.RootClass }, '</div>');
      self.Content.appendContent(bodyRoot);
      self.Load(function(){
        //Fine caricamento rows
      });
    }else {
      console.log("Nessun giustificativo caricato.");
    }

  };

  CardsGiustificativo_FooterBtn.prototype.createElement = function(){
    var content = $('<div></div>');
    content.append('<div class="divider"></div>')
    var res = $('<div class="tm-properties-row__content ' + this.RootElement + '"><section class="tm-add-button-box"></section><div class="tm-btn btn-back" style="visibility: visible;"><div class="tm-btn__text">Salva</div><i class="glyphicon glyphicon-triangle-right"></i></div></div>');
    /*var button = $('<div class="tm-properties-row__content ' + Root + '" style="margin-bottom : 20px"><section class="tm-add-button-box"><div class="tm-add-button-box__left"><div class="tm-add-button-panel__input"><div class="add-button ax-add-tag-button btn-back" style="width : 90px;"><i class="tm-icon tm-icon-add glyphicon glyphicon-arrow-left"></i></div></div></div><div class="tm-add-button-box__right"></div></section><div class="tm-view-all_intestatari" style="visibility: hidden;"><i class="glyphicon glyphicon-menu-hamburger"></i><div class="tm-view-all_intestatari__text">Selezionati (0)</div></div></div>');
    res.first().append(button);*/
    content.append(res);
    return content.html();
  };
  CardsGiustificativo_FooterBtn.prototype.Root = function(){ return  this.ParentRoot.find('.' + this.RootElement)};
  CardsGiustificativo_FooterBtn.prototype.btn = function (){ return this.Root().find('.btn-back'); };
  CardsGiustificativo_FooterBtn.prototype.clickEvent = function (){
    var self = this;
    //Salvataggio
    this.CardsGiustificativo.Movimento.Save(function(success){
      self.Content.setDefaultContent();
      if (success) {
        console.log("Salvataggio avvenuto con successo");
      }else{
        bootbox.alert("Errore durante il salvataggio");
        console.log("Errore durante il salvataggio");
      }
    });

  };
  CardsGiustificativo_FooterBtn.prototype.ini = function(){
    var self = this;
    this.Content.appendContent(this.createElement());

    this.btn().off().click(function() {
      self.clickEvent();
    });

  };

  CardsGiustificativo_RowTopPanel.prototype.createElement = function(){
    var root = this.RootElement;
    var res = $('<div class="tm-properties-row uk-form-horizontal "></div>');
    var button = $('<div class="tm-properties-row__content ' + root + '" style="margin-bottom : 20px"><section class="tm-add-button-box"><div class="tm-add-button-box__left"><div class="tm-add-button-panel__input"><div class="add-button ax-add-tag-button btn-back" style="width : 90px;"><i class="tm-icon tm-icon-add glyphicon glyphicon-arrow-left"></i></div></div></div><div class="tm-add-button-box__right"></div></section><div class="tm-view-all_intestatari" style="visibility: hidden;"><i class="glyphicon glyphicon-menu-hamburger"></i><div class="tm-view-all_intestatari__text">Selezionati (0)</div></div></div>');
    res.first().append(button);

    return res;
  };
  CardsGiustificativo_RowTopPanel.prototype.Root = function(){
    var root = this.RootElement;

    return  this.ParentRoot.find('.' + root);
   };
  CardsGiustificativo_RowTopPanel.prototype.btn_back = function (){ return this.Root().find('.btn-back'); };
  CardsGiustificativo_RowTopPanel.prototype.back_event = function (){

      try {
        if(this.CardsGiustificativo.Movimento){
          var $selectIntestatario = new Content_SelectIntestatario(this.Content, this.CardsGiustificativo.Movimento);
          $selectIntestatario.ini();
        }else {
          throw "Content not defined.";
        }

      } catch (e) {
        console.log("Section_RowPanelActions - clickEvent : Impossibile caricare il contenuto");
      }

  };
  CardsGiustificativo_RowTopPanel.prototype.ini = function(){
    var self = this;
    this.Content.appendContent(this.createElement().html());

    this.btn_back().off().click(function() {
      self.back_event();
    });

  };

  CardsGiustificativo.prototype.Root = function(){ return this.Content.Root() };//function
  CardsGiustificativo.prototype.RowTopPanel = function(){ return new CardsGiustificativo_RowTopPanel(this.Root(), "rowPanelActions", this.Content, this) };
  CardsGiustificativo.prototype.Body = function(){ return new CardsGiustificativo_Body(this.RootPane, "resultsGiustificativi", this.Content, this.Movimento, this)};
  CardsGiustificativo.prototype.RowFooter = function(){ return new CardsGiustificativo_FooterBtn(this.Root(), "footerBtn", this.Content, this)};
  CardsGiustificativo.prototype.ini = function(){
    //popup_container.html - @TODO - Qui verrebbe aggiunto il popup dei Tag. Popup_container deve essere una Classe come CardsGiustificativo e non dovrà più essere inserito come fatto su transactionManager.tpl
    var self = this;
    self.RowTopPanel().ini();
    self.Body().ini();
    self.RowFooter().ini();
  };

  /* Prepare : @Movimento è stato precedentemente caricato */
  Content_SelectIntestatario.prototype.Prepare = function(Movimento, callback){
    var self = this;
    var contenuto = $('<div>', { } , '</div>');
    if(self.Content && Movimento){
      var admin = new Admin();
      admin.Load(function(){
        var array = new Array();

        /*
         * List - btn - Row Panel Actions
         */
        var rowPanelActions = $('<div class="tm-properties-row uk-form-horizontal rowPanelActions"></div>');
        array.push(rowPanelActions);
        /*array.push(self.AddDivider());*/

        var searchIntestatario = $('<div class="tm-properties-row uk-form-horizontal searchIntestatario"></div><div class="ms-row-list autocomplete_results" style="background: transparent;"><div class="ms-vert-list"></div></div>');
        array.push(searchIntestatario);

        var resultsIntestatario = $('<div class="resultsIntestatario"></div>');
        array.push(resultsIntestatario);

        var btn = $('<div class="divider"></div><div class="tm-properties-row__content"><section class="tm-add-button-box"></section><div class="tm-btn nextBtn" style="visibility: hidden;"><div class="tm-btn__text">Ultimo step</div><i class="glyphicon glyphicon-triangle-right"></i></div></div>');
        array.push(btn);

        if(array.length > 0){
          array.forEach(function(el, index) {
            contenuto.append(el);
          });

          if(callback){
              callback(contenuto.html());
          }
        }

      });
    }

  };
  Content_SelectIntestatario.prototype.Load = function(callback){
    var self = this;
    var contenuto = $('<div>', { } , '</div>');
    if(self.Movimento){
      var IdMovimento = self.Movimento.Id;
      var movimento = new Movimento();
      movimento.Id = IdMovimento;
      movimento.Load(function(){
        self.Prepare(movimento, function(res){
          contenuto.append(res);

          if(callback){
              callback(contenuto.html());
          }
        });


      });

    }
  };
  Content_SelectIntestatario.prototype.ini = function(callback){
    var self = this;
    self.Load(function(res){
      self.Content.setContent(res);

      var resultsIntestatario = new IntestatariResults(self.Content, self.Movimento);
      resultsIntestatario.ini();

      var rowPanelActions = new Section_RowPanelActions(self.Content, self.Movimento, resultsIntestatario);
      rowPanelActions.ini();
      resultsIntestatario.Section_RowPanelActions = rowPanelActions;

      var searchIntestatario = new SearchIntestatario(self.Content, self.Movimento, resultsIntestatario);
      searchIntestatario.ini();

      if(callback){
        callback();
      }

    });
  };
  Content_SelectIntestatario.prototype.AddDivider = function (){
    return $('<div class="divider"></div>');
  };

  DefaultContent.prototype.Prepare = function (Movimento, callback){
    var self = this;
    console.log("Test");
    console.log(Movimento);
    var contenuto = $('<div>', { } , '</div>');
    if(this.Content && Movimento){

      var admin = new Admin();
      admin.Load(function(){
        var array = new Array();

        /*var rowDescription = $('<div class="tm-properties-description-row"><div class="tm-properties-description-row__content"><div class="tm-editable-textarea"><div class="tm-editable-textarea__content"><article class="tm-markdown-content"><p></p></article></div></div></div></div>');
        rowDescription.find('p').text(Movimento.Descrizione);
        array.push(rowDescription);
        array.push(self.AddDivider());*/

        var rowNote = $('<div class="tm-list-item secNote"><div class="tm-input-row no-selection" style=" border: 1px solid #e6e8ec; background-color : #fff;"><div class="tm-input-row__left" style=" border-right: 1px solid #f8bcb6;"><div class="tm-input-row__info row-double-line no-selection" style="background: inherit;width: 20px;height: 80px;"></div></div><div class="tm-input-row__righ intestatari-results__row" style=" width: 100%; margin-bottom: 0px; padding: 0px;"><div class="ms-row-list" style=""><textarea type="text" spellcheck="false" cols="40" rows="3" placeholder="Aggiungi una nota" value="" style="flex-grow: 1; border: none; transition: none; color: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; -webkit-appearance: textfield; background-color: white; -webkit-rtl-ordering: logical; user-select: text; cursor: auto; letter-spacing: normal; word-spacing: normal; text-transform: none; text-indent: 0px; text-shadow: none; display: inline-block; text-align: start; outline: none; word-break: break-word !important; margin: 0px; height: 53px; width: 100%;"></textarea></div><div class="ms-row-list" style=" font-size: 10px;"><span>Invio per salvare - Shift + Invio per aggiungere riga </span></div></div></div></div>');

        var descrizioneNotEmpty = false;

        if(Movimento && Movimento.MovimentoDettagli instanceof MovimentoDettagli && Movimento.MovimentoDettagli.Descrizione){
          descrizioneNotEmpty = true;
        }

        if(admin.isCommercialista() && descrizioneNotEmpty){
          rowNote.find('textarea').text(Movimento.MovimentoDettagli.Descrizione);
          array.push(rowNote);
        }else if(admin.isAdministrator() || admin.isDataEntry() || admin.isContabile()){
          if(descrizioneNotEmpty){
            rowNote.find('textarea').text(Movimento.MovimentoDettagli.Descrizione);
          }
          array.push(rowNote);
        }

        /*
         * List - btn - Select Tag
         */
        var secTag = $('<div class="tm-properties-row uk-form-horizontal secTag"></div><div class="tagMovimenti_searchPanel" style="display:none"><div class="togglePanel"><div class="togglePanel_lef-space"></div><div class="togglePanel_content" style="background-color: #fff;"><div class="togglePanel_content-actionsPanel"><div class="togglePanel_inputSearch"><i class="material-icons">search</i><input type="text" class="togglePanel_inputSearch-input" placeholder="Ricerca" value=""></div><div class="togglePanel_closePanel" title="Chiudi"><i class="material-icons">close</i></div></div><div class="togglePanel_content-elementList tm-list tm-hack-scrollbar"></div></div></div></div>');
        array.push(secTag);
        array.push(self.AddDivider());

        if(admin.isAdministrator() || admin.isContabile() || admin.isDataEntry()){
          /*
           * btn - Add Giustificativo
           */
          var addValues = $('<div class="tm-properties-row uk-form-horizontal addGiustificativo"></div>');
          array.push(addValues);
          array.push(self.AddDivider());
          /*
           * List - Quick Add
           */
          var quickAdd = $('<div class="tm-properties-row uk-form-horizontal quickAdd"></div>');
          array.push(quickAdd);
          array.push(self.AddDivider());
        }

        /*
         * List - Giustificativi
         */
        var secGiustificativi = $('<div class="list_giustificativi"></div>');
        array.push(secGiustificativi);

        array.forEach(function(el, index) {
          contenuto.append(el);
        });


        if(callback){
            callback(contenuto.html());
        }

      });

    }



  };
  DefaultContent.prototype.AddDivider = function (){
    return $('<div class="divider"></div>');
  }
  /* Description : Questa funzione si occupa di caricare i giustificativi e la descrizione del movimento.
   * E' importante che Load ad ogni chiamata faccia la richiesta al server.
   */
  DefaultContent.prototype.Load = function (callback){
    var self = this;
    var contenuto = $('<div>', { } , '</div>');
    if(self.Content){
      var IdMovimento = self.Content.TransactionPropertiesBody.Movimento.Id;
      var movimento = new Movimento();
      movimento.Id = IdMovimento;
      movimento.Load(function(){
        self.Prepare(movimento, function(res){
          contenuto.append(res);

          if(callback){
              callback(contenuto.html());
          }
        });


      });

    }

  };
  DefaultContent.prototype.ini = function(){
    var self = this;
    self.Load(function(res){
      self.Content.setContent(res);
      var admin = new Admin();
      admin.Load(function(){
        if(admin.isAdministrator() || admin.isContabile() || admin.isDataEntry()){
          var btnAddGiustificativo = new Button_AddGiustificativo(self.Content, self.Content.TransactionPropertiesBody.Movimento);
          btnAddGiustificativo.ini();

          var secQuickAdd = new Section_QuickAdd(self.Content, self.Content.TransactionPropertiesBody.Movimento);
          secQuickAdd.ini();
        }

        var secTag = new Section_Tag(self.Content, self.Content.TransactionPropertiesBody.Movimento);
        secTag.ini();
        /*if(!self.Content.TransactionPropertiesBody.Movimento.MovimentoDettagli_TagMovimenti || !self.Content.TransactionPropertiesBody.Movimento.MovimentoDettagli_TagMovimenti.Tags || !(self.Content.TransactionPropertiesBody.Movimento.MovimentoDettagli_TagMovimenti.Tags > 0)){
          $('#maincont .tm-floating-panel-desktop .tagMovimenti_searchPanel').toggle();
        }*/

        /*var secNote */
        if(admin.isAdministrator() || admin.isDataEntry() || admin.isContabile()){
          var secNote = new Section_Note(self.Content, self.Content.TransactionPropertiesBody.Movimento);
          secNote.init();
        }

        var RootPane = self.Content.RootPane();
        var secGiustificativi = new Section_Giustificativi(self.Content, RootPane, self.Content.TransactionPropertiesBody.Movimento);
        secGiustificativi.ini();

      });

    });

  };

  Comments_Content.prototype.Prepare = function(contenuto){
    var container = $('<div>', { } , '</div>');

    if(this.Content && contenuto){
      var row1 = $('<div class="tm-properties-row uk-form-horizontal"><h5></h5></div>');
      row1.find('h5').append(contenuto);

      container.append(row1, this.AddDivider());
    }

    return container.html();
  };
  Comments_Content.prototype.Load = function(){
    var contenuto = $('<div>', { } , '</div>');

    if(this.Content){
      contenuto.append(this.Prepare("In sviluppo..."));
    }

    return contenuto.html();
  };
  Comments_Content.prototype.AddDivider = function (){
    return $('<div class="divider"></div>');
  };

  Resources_Content.prototype.Prepare = function(contenuto){
    var container = $('<div>', { } , '</div>');

    if(this.Content && contenuto){
      var row1 = $('<div class="tm-properties-row uk-form-horizontal"><h5></h5></div>');
      row1.find('h5').append(contenuto);

      container.append(row1, this.AddDivider());
    }

    return container.html();
  };
  Resources_Content.prototype.Load = function(){
    var contenuto = $('<div>', { } , '</div>');

    if(this.Content){
      contenuto.append(this.Prepare("In fase di sviluppo..."));
    }

    return contenuto.html();
  };
  Resources_Content.prototype.AddDivider = function (){
    return $('<div class="divider"></div>');
  };

  Content.prototype.Root = function (){ return this.TransactionPropertiesBody.RootTransactionPropertiesBody().find(".tm-property-tabs__content"); };
  Content.prototype.RootPane = function (){ return this.Root().find(".tm-transaction-properties-pane"); };
  Content.prototype.ini = function (){
      //ini del popup
  };
  Content.prototype.setContent = function (contenuto){
      if(contenuto){
        this.RootPane().html(contenuto);
      }
  };
  Content.prototype.appendContent = function(contenuto){
    if(contenuto){
      this.RootPane().append(contenuto);
    }
  }
  Content.prototype.setDefaultContent = function (){
    var content = new DefaultContent(this);
    content.ini();
  };
  Content.prototype.empty = function (){
      this.RootPane().empty();
  };
  Content.prototype.resetEventHandlers = function(){

  };

  Tab.prototype.Root = function (){ return this.TransactionPropertiesBody.RootTransactionPropertiesBody().find(".tm-property-tabs__tabs"); };
  Tab.prototype.Properties = function (){ return this.Root().find("div[data-tab-name='properties']"); };
  Tab.prototype.Comments = function (){ return this.Root().find("div[data-tab-name='comments']"); };
  Tab.prototype.Resources = function (){ return this.Root().find("div[data-tab-name='resources']"); };
  Tab.prototype.ini = function (){
      //Click Events
          //Load body content
      //No inserimento funzione setContentDefault
      var self = this;
      var admin = new Admin();
      admin.Load();

      if(this.Properties()){
        this.Properties().click(function(){

          if ((admin.isContabile() || admin.isAdministrator() || admin.isCommercialista() || admin.isDataEntry()) && !self.Properties().hasClass('active')) {

            self.SwitchColor(self.Properties(), self.Comments(), self.Resources());

            if(self.TransactionPropertiesBody && self.TransactionPropertiesBody.Content){
              self.TransactionPropertiesBody.Content.setDefaultContent();
            }
          }
        });
      }
      if (this.Comments()) {
        this.Comments().click(function(){

          if (admin.isAdministrator() && !self.Comments().hasClass('active')) {

            self.SwitchColor(self.Comments(), self.Properties(), self.Resources());

            if(self.TransactionPropertiesBody){
              var commentContent = new Comments_Content();
              commentContent.Content = self.TransactionPropertiesBody.Content;

              self.TransactionPropertiesBody.Content.setContent(commentContent.Load());

            }
          }
        });
      }
      if(this.Resources()){
        this.Resources().click(function() {

          if (admin.isAdministrator() && !self.Resources().hasClass('active')) {

            self.SwitchColor(self.Resources(), self.Comments(), self.Properties());

            if(self.TransactionPropertiesBody){
              var resourcesContent = new Resources_Content();
              resourcesContent.Content = self.TransactionPropertiesBody.Content;

              self.TransactionPropertiesBody.Content.setContent(resourcesContent.Load());
            }
          }
        });
      }
  };
  Tab.prototype.setActive = function (el){
      if (!el.hasClass('active')) {
        el.addClass('active');
      }
  };
  Tab.prototype.setDisable = function(el){
    if(el.hasClass('active')){
      el.removeClass('active');
    }
  };
  Tab.prototype.SwitchColor = function (selA, selB, selC){
    this.setActive(selA);
    this.setDisable(selB);
    this.setDisable(selC);
  };
  Tab.prototype.getActive = function (){
      var el = null;

      if(this.Properties().hasClass('active')){
        el = this.Properties();
      }else if (this.Comments().hasClass('active')) {
        el = this.Comments();
      }else if (this.Resources().hasClass('active')) {
        el = this.Resources();
      }

      return el;
  };
  Tab.prototype.setDefaultTab = function (){
    //this.Properties().css("border-bottom", "2px solid #14699b !important");
    this.SwitchColor(this.Properties(), this.Comments(), this.Resources());
  };
  Tab.prototype.resetEventHandlers  = function(){
    this.Properties().off();
    this.Comments().off();
    this.Resources().off();
  };

  TransactionPropertiesBody.prototype.RootTransactionPropertiesBody = function (){ return this.Root.find(".tm-transaction-properties-body .tm-property-tabs"); };
  TransactionPropertiesBody.prototype.ini = function (){

    this.Tab = new Tab();
    this.Content = new Content();

      if(this.Tab){
        this.Tab.TransactionPropertiesBody = this;
        this.Tab.ini();
      }

      if(this.Content){
        this.Content.TransactionPropertiesBody = this;
        this.Content.ini();
      }
  };
  TransactionPropertiesBody.prototype.setDefault = function (){
      //Tab.setDefaultTab()
      //Creazione del contenuto di default, il risultato richiama Content().setContent(NuovoContenuto);
      this.Tab.setDefaultTab();
      this.Content.setDefaultContent();
  };
  TransactionPropertiesBody.prototype.reset = function(){
    this.Tab.resetEventHandlers();
    this.Content.resetEventHandlers();
  };

  TransactionPropertiesHeader.prototype.RootHeader = function (){ return this.Root.find(".tm-transaction-properties-header"); };
  TransactionPropertiesHeader.prototype.Header_Title = function (){ return this.RootHeader().find(".tm-transaction-properties-header__title .tm-editable-textarea__content"); };
  TransactionPropertiesHeader.prototype.Header_Importo = function (){ return this.RootHeader().find(".tm-editable-textarea__importo-text"); };
  TransactionPropertiesHeader.prototype.DescriptionMeta = function (){ return this.RootHeader().find(".description-meta"); };
  TransactionPropertiesHeader.prototype.Prepare = function (){
      var self = this;
      self.getHeaderTitle(function (res){
          self.setHeader_Title(res);
      });

      self.setHeader_Importo(self.Movimento.Importo);
      self.setDescriptionMeta(self.getDescriptionMeta());
  };
  TransactionPropertiesHeader.prototype.Load = function (){
      /*
       * NOTE : Load temporaneo, svilupparlo come il load di MovimentiResults. Il motivo è quello di svuotare prima di caricare il nuovo contenuto. Tuttavia, molto importante, è che non sarà un emty uguale (totale) ma per ogni attributo di questa classe.
       */
      this.Prepare();
  };
  TransactionPropertiesHeader.prototype.getHeaderTitle = function (callback){
      var string = "";

      if(this.Movimento && this.Movimento.Giustificativi && this.Movimento.Giustificativi.length > 0){
          string = "Giustificativi del movimento";

          if(callback){
              callback(string);
          }

      }else{
          var admin = new Admin();
          admin.Load(function (){

              if(admin.isCommercialista()){
                  string = "Movimento attualmente senza giustificativo";
              }else{
                  string = "Inserire i giustificativi del movimento";
              }

              if(callback){
                  callback(string);
              }

          });

      }
  };
  TransactionPropertiesHeader.prototype.getDescriptionMeta = function (){

      var meta = $('<div>', { }, '</div>');

      var $dataOperazione = new Date(this.Movimento.DataOperazione);
      var $dataValuta = new Date(this.Movimento.DataValuta);

      var dataOperazione = $('<span>', { class: "highlight"} , '</span>').html("Data Operazione : ");
      var dataValuta = $('<span>', { class: "highlight"} , '</span>').html(" > Data Valuta : ");
      var causale = $('<span>', { class: "highlight"} , '</span>').html(" > Causale : ");
      var societa = $('<span>', { class: "highlight"} , '</span>').html(" > " + this.Movimento.getTitle_Societa());

      meta.append(dataOperazione, $dataOperazione.ddmmyyyy(), dataValuta, $dataValuta.ddmmyyyy(), causale, this.Movimento.Causale, societa);

      return meta.html();
  };
  TransactionPropertiesHeader.prototype.setHeader_Title = function (string){
      this.Header_Title().html(string);
  };
  TransactionPropertiesHeader.prototype.setHeader_Importo = function (string){
      this.Header_Importo().html(string);
  };
  TransactionPropertiesHeader.prototype.setDescriptionMeta = function (string){
      this.DescriptionMeta().html(string);
  };
  TransactionPropertiesHeader.prototype.reset = function (){
      this.setHeader_Title("");
      this.setHeader_Importo("");
  };

})();
