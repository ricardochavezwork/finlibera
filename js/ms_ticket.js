function ms_ticket(modal, ticket, root, tabs) {
  this.modal = modal;
  this.ticket = ticket;
  this.root = root;
  this.tabs = tabs;
}

(function () {

  function tk_ui(ticket, parentRoot, admin) {
    this.ticket = ticket;
    this.parentRoot = parentRoot;
    this.admin = admin;
  }

  function tk_ui_field(ticket, root, parentRoot, propertyName) {
    this.ticket = ticket;
    this.root = root;
    this.parentRoot = parentRoot;
    this.propertyName = propertyName;
  }

  function tk_ui_tipo_assegnazione(ticket, root, parentRoot) {
    this.ticket = ticket;
    this.root = root;
    this.parentRoot = parentRoot;
  }

  function tk_ui_fornitore(ticket, root, parentRoot) {
    this.ticket = ticket;
    this.root = root;
    this.parentRoot = parentRoot;
  }

  function ticketAssegnazione_row(ticket, tipoAssegnazione, item, parentRoot, ticketAssegnazione) {
    this.ticket = ticket;
    this.tipoAssegnazione = tipoAssegnazione;
    this.item = item;
    this.parentRoot = parentRoot;
    this.ticketAssegnazione = ticketAssegnazione;
  }

  function ticketFornitore_row(ticket, item, parentRoot, mode) {
    this.ticket = ticket;
    this.item = item;
    this.parentRoot = parentRoot;
    this.mode = mode;// 1. Selected. 2. Search result. 
  }

  function acct_ui(ticket, parentRoot, admin) {
    this.ticket = ticket;
    this.parentRoot = parentRoot;
    this.admin = admin;
  }

  /**
   * 
   * @param {Ticket} ticket 
   * @param {RegistroTicket} item 
   * @param {*} root 
   * @param {*} parentRoot 
   */
  function acct_ui_row(acct_ui, ticket, item, root, parentRoot) {
    this.acct_ui = acct_ui;
    this.ticket = ticket;
    this.item = item;
    this.root = root;
    this.parentRoot = parentRoot;
  }

  const vars_ticket = {
    DataRichiesta : {
      required : true,
      inputType : 'input',
      defaulValue : new Date()
    },
    Oggetto : {
      required : true,
      inputType : 'textarea'
    },
    Indicazioni : {
      required : false,
      inputType : 'textarea'
    },
    Stato : {
      required : false,
      inputType : 'select'
    },
    InvioNotifiche : {
      required : false,
      inputType : 'select'
    },
    Priority : {
      required : false,
      inputType : 'select'
    },
    TipoAddebito : {
      required : false,
      inputType : 'select'
    }
  };

  const vars_acct = {
    DataIntervento : {
      required : true,
      inputType : 'input',
      defaulValue : new Date(),
      checkVal : function (val) {
        var check = false;

        if(val && val !== "")
          check = true;

        return check;
      }
    },
    Uscita : {
      required : false,
      inputType : 'input',
      defaulValue : 0,
      checkVal : function (val) {
        var check = false;

        if(parseInt(val) >= 0)
          check = true;

        return check;
      }
    },
    DescrizioneLavoro : {
      required : true,
      inputType : 'textarea',
      defaulValue : null,
      checkVal : function (val) {
        var check = false;

        if(val && val !== "")
          check = true;

        return check;
      }
    },
    Numero : {
      required : true,
      inputType : 'input',
      defaulValue : 1,
      checkVal : function (val) {
        var check = false;

        if(val && parseInt(val) > 0)
          check = true;

        return check;
      }
    },
    Cadauno : {
      required : true,
      inputType : 'input',
      defaulValue : 0,
      checkVal : function (val) {
        var check = false;

        if(val && parseInt(val) > 0)
          check = true;

        return check;
      }
    },
    Iva : {
      required : true,
      inputType : 'select',
      defaulValue : 1,
      checkVal : function (val) {
        var check = false;

        if(parseInt(val) >= 0)
          check = true;

        return check;
      }
    },
    Rimborso : {
      required : false,
      inputType : 'input',
      defaulValue : 0,
      checkVal : function (val) {
        var check = false;

        if(parseInt(val) >= 0)
          check = true;

        return check;
      }
    },
    Totale : {
      required : true,
      inputType : 'input',
      defaulValue : 0
    },
    TotaleFornitore : {
      required : true,
      inputType : 'input',
      defaulValue : 0
    }
  }

  var init_struct = $('<div class="ms_ticket"><div class="ms_ticket__tabs-header tm-hack-scrollbar"> <a  class="ms-link"><span class="ms_ticket__tabs-item">Ticket</span></a><a  class="ms-link"><span class="ms_ticket__tabs-item">Commenti</span></a> <a  class="ms-link"><span class="ms_ticket__tabs-item">Contabilizzazione</span></a></div><div class="ms_ticket__body tm-hack-scrollbar"></div></div>');
  var tk_ui_struct = $('<div class="data-card-rows"><div class="data_card-sections"><div class="data_card-sections__section"><div class="data_card-row"><div class="data_card-row__multi-cols"><div class="data_card-row__field" data-card-field="Stato"><div class="card_field__header">Stato</div><div class="card_field__body"><span></span><select><option value="1" selected="selected">Aperto</option><option value="2">Archiviato</option><option value="4">In sospeso</option><option value="6">In attesa di sopralluogo</option><option value="7">In attesa di preventivo</option><option value="8">In attesa di relazione</option><option value="3">In attesa di approvazione</option><option value="5">Chiuso</option></select></div></div><div class="data_card-row__field" data-card-field="DataRichiesta"><div class="card_field__header">Data Richiesta</div><div class="card_field__body"><span></span><input type="date"></div></div></div><div class="data_card-row__multi-cols"></div></div><div class="data_card-row"><div class="data_card-row__multi-cols"><div class="data_card-row__field" data-card-field="TipoAddebito"><div class="card_field__header">Da addebitare a</div><div class="card_field__body"><span></span><select><option value="0">Non assegnato</option><option value="1" selected="selected">Inquilini</option><option value="2">Gestore</option><option value="3">Proprietario</option></select></div></div></div><div class="data_card-row__multi-cols"><div class="data_card-row__field" data-card-field="Priority"><div class="card_field__header">Priorità</div><div class="card_field__body"><span></span><select><option value="1" selected="selected">Bassa</option><option value="2">Media</option><option value="3">Alta</option></select></div></div><div class="data_card-row__field" data-card-field="InvioNotifiche"><div class="card_field__header">Notifiche</div><div class="card_field__body"><span></span><select><option value="1" selected="selected">Attivo</option><option value="2">Disattivato</option></select></div></div></div></div></div><div class="data_card-sections__section"><div class="data_card-row"><div class="data_card-row__col"><div class="data_card-row__field textarea_field-center" data-card-field="Oggetto"><div class="card_field__header">Descrizione</div><div class="card_field__body"><span></span><textarea placeholder="Inserisci qui il messaggio del ticket..."></textarea></div></div></div></div><div class="data_card-row"><div class="data_card-row__col"><div class="data_card-row__field textarea_field-center" data-card-field="Indicazioni"><div class="card_field__header">Indicazioni</div><div class="card_field__body"><span></span><textarea class="textare__small" placeholder="Vuoi dare qualche indicazione al fornitore?"></textarea></div></div></div></div></div></div><div class="data_card-sections"><div class="data_card-sections__section"><div class="data_card-row"><div class="data_card-row__col"><div class="data_card-row__field textarea_field-center" data-card-field="IdFornitore"><div class="card_field__header">Impresa</div><div class="field_ticket-fornitore__container ticketFornitore_selected"></div><div class="card_field__body"><input spellcheck="false" placeholder="Ricerca impresa..."></div><div class="field_ticket-fornitore__container ticketFornitore_search_results"></div></div></div></div></div><div class="data_card-sections__section"><div class="data_card-row"><div class="data_card-row__col"><div class="data_card-row__field textarea_field-center" data-card-field="TipoAssegnazione"><div class="card_field__header"><div class="card_field__header-item">Inquilini</div><div class="card_field__header-item">Appartamenti</div><div class="card_field__header-item">Stanze</div></div><div class="field_ticket-assegnazione__container ticketAssegnazione_selected"></div><div class="card_field__body"><input spellcheck="false" placeholder="Ricerca..."></div><div class="field_ticket-assegnazione__container ticketAssegnazione_search_results"></div></div></div></div></div></div></div>');
  var ticketAssegnazione_row_struct = $('<div class="field_ticket-assegnazione__container-row"><div class="field_ticket-assegnazione__container-row_col ta__remove"><i class="fas fa-trash-alt"></i></div><div class="field_ticket-assegnazione__container-row_col inq_nominativo"></div><div class="field_ticket-assegnazione__container-row_col ins_inizio"></div><div class="field_ticket-assegnazione__container-row_col ins_fine"></div><div class="field_ticket-assegnazione__container-row_col apt_address"></div><div class="field_ticket-assegnazione__container-row_col room_number"></div></div>');
  var ticketFornitore_row_struct = $('<div class="field_ticket-fornitore__container-row"><div class="field_ticket-fornitore__container-row_col tf__remove"><i class="fas fa-trash-alt"></i></div><div class="field_ticket-fornitore__container-row_col fornitore_nominativo"></div></div>');
  var acct_ui_struct = $('<div><div class="acct_summary"><div class="acct_summary__item serviziBtn" style=" display: none;"><span>Genera servizi</span></div><div class="acct_summary__item"><span>Totale Ticket</span><span>0€</span></div><div class="acct_summary__item"><span>Totale Rimborsi</span><span>0€</span></div><div class="acct_summary__item"><span>Totale Fattura</span><span>0€</span></div></div><div class="data-card-rows acct_rows"></div></div>');
  var acct_row_struct = $('<div class="data_card-sections"><div class="data_card-sections__section"><i class="fas fa-trash-alt"></i></div><div class="data_card-sections__section"><div class="data_card-row"><div class="data_card-row__multi-cols"><div class="data_card-row__field" data-card-field="DataIntervento"><div class="card_field__header">Data Intervento</div><div class="card_field__body"><span></span><input type="date"></div></div><div class="data_card-row__field" data-card-field="Uscita"><div class="card_field__header">Uscita</div><div class="card_field__body"><span></span><input isEuro="true" min="0" type="number"></div></div></div></div><div class="data_card-row"><div class="data_card-row__col"><div class="data_card-row__field textarea_field-center" data-card-field="DescrizioneLavoro"><div class="card_field__header">Descrizione</div><div class="card_field__body"><span></span><textarea class="textare__small" placeholder="Inserisci descrizione..."></textarea></div></div></div></div></div><div class="data_card-sections__section"><div class="data_card-row"><div class="data_card-row__multi-cols"><div class="data_card-row__field" data-card-field="Numero"><div class="card_field__header">N°</div><div class="card_field__body"><span></span><input isEuro="false" min="0" type="number"></div></div><div class="data_card-row__field" data-card-field="Cadauno"><div class="card_field__header">CAD</div><div class="card_field__body"><span></span><input min="0" isEuro="true" type="number"></div></div></div></div><div class="data_card-row"><div class="data_card-row__multi-cols"><div class="data_card-row__field" data-card-field="Iva"><div class="card_field__header">IVA</div><div class="card_field__body"><span></span><select><option value="0">Assente</option><option value="1">22%</option><option value="2">10%</option></select></div></div><div class="data_card-row__field" data-card-field="Rimborso"><div class="card_field__header">Rimborso</div><div class="card_field__body"><span></span><input min="0" isEuro="true" type="number"></div></div></div></div><div class="data_card-row"><div class="data_card-row__multi-cols"><div class="data_card-row__field" data-card-field="TotaleFornitore"><div class="card_field__header">Totale</div><div class="card_field__body"><span></span><input min="0" isEuro="true" type="number"></div></div></div></div></div></div>');

  const hint_fornitore = [{
    item : {
      Id : "4965",
      nominativo: "SEMENTILLI ANDREA"
    },
    mode : 2
  },
  {
    item : {
      Id : "6010",
      nominativo: "ISOLA SERVIZI SRLS"
    },
    mode : 2
  }];

  const error_sms = {
    ticket_save_error : "Errore durante il salvataggio del Ticket. Richiedere supporto...",
    tk_assign_save_error: "Errore durante il salvataggio. Richiedere supporto... ERROR CODE : TicketAssegnazione .",
  }

  ms_ticket.prototype.init = function () {
    try {
      var self = this;

      if(!this.modal)
        throw new TypeError('ms_ticket - init : this.modal undefined!');

      if(!this.ticket)
        throw new TypeError('ms_ticket - init : this.ticket uundefined!');

      if(!this.root)
        this.root = init_struct.clone();

      this.tabs = { 
        open : this.root.find('div.ms_ticket__tabs-header > a:nth-child(1)'),
        comments : this.root.find('div.ms_ticket__tabs-header > a:nth-child(2)'),
        registro : this.root.find('div.ms_ticket__tabs-header > a:nth-child(3)'),
        all : this.root.find('div.ms_ticket__tabs-header span')
      }

      this.setStructure();

    } catch (e) {
      console.log(e.message);
    }
  }

  ms_ticket.prototype.setStructure = function () {
    try {
      var self = this;

      this.setInitStr();
      this.listeners();
      this.loadTab();

    } catch (e) {
      console.log(e.message);
    }
  }

  ms_ticket.prototype.setHeader = function () {
    try {
      var self = this;
      var modal = this.modal;
      var ticket = this.ticket;
      var header = modal.header;
      var title = "Nuovo Ticket";

      if(parseInt(ticket.Id) > 0){
        ticket.getPropertyName(function (txt) {
          title = 'Ticket #' + ticket.Id + ' | ' + txt;
          header.find('span').html(title);
        });
      }else{
        header.find('span').html(title);
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  ms_ticket.prototype.setBody = function () {
    try {
      var self = this;
      var modal = this.modal;
      var ticket = this.ticket;
      var body = modal.body;

      body.html(this.root);

    } catch (e) {
      console.log(e.message);
    }
  }

  ms_ticket.prototype.setInitStr = function () {
    try {
      var self = this;

      this.setHeader();
      this.setBody();

    } catch (e) {
      console.log(e.message);
    }
  }
  
  ms_ticket.prototype.listeners = function () {
    try {
      var self = this;

      if(!this.root)
        throw new TypeError('ms_ticket - listeners : this.root');

      var root = this.root;
      
      var body = this.root.find('.ms_ticket__body');
      var ticket = this.ticket; 
      var tabs = this.tabs;
      var openTab = tabs.open;
      var commentsTab = tabs.comments;
      var registroTab = tabs.registro;

      openTab.click(function () {
        self.setTabLink('open');
        setSelected($(this), tabs.all);
        var item = new tk_ui();
        item.ticket = ticket;
        item.parentRoot = body;
        item.init();
      });

      commentsTab.click(function () {
        //self.setTabLink('comments');
        //setSelected($(this), tabs.all);
        console.log("commenti");
      });

      registroTab.click(function () {
        self.setTabLink('registro');
        setSelected($(this), tabs.all);
        var item = new acct_ui();
        item.ticket = ticket;
        item.parentRoot = body;
        item.init();
      });

      function setSelected(tab, all) {
        all.removeClass('section_selected');
        tab.find('span').addClass('section_selected');
      }
      
    } catch (e) {
      console.log(e.message);
    }
  }

  ms_ticket.prototype.setTabLink = function (tabTitle) {
    try {
      var self = this;

      if(!tabTitle)
        throw new TypeError('setTabLink - tabTitle undefined!');

      var linkString = window.location.href;
      var splitedLink = linkString.split('/');
      var totParts = splitedLink.length;
      var lastPart = splitedLink[totParts - 1];
      var newLink = splitedLink.join('/');


      if(!lastPart.includes('ticket:')){
        splitedLink.splice((totParts - 1), 1);
        newLink = splitedLink.join('/');
      }

      var hasTabTitle = newLink.includes(tabTitle);

      if(!hasTabTitle)
        window.location.href = newLink.endsWith('/') ? (newLink + tabTitle) : (newLink + '/' + tabTitle);

    } catch (e) {
      console.error(e.message);
    }
  }

  ms_ticket.prototype.loadTab = function () {
    try {

      var self = this;
      var linkString = window.location.href;
      
      var tabs = this.tabs;
      var openTab = tabs.open;
      var commentsTab = tabs.comments;
      var registroTab = tabs.registro;

      if (linkString.includes('open')) {
        openTab.click();
      }else if(linkString.includes('comments')){
        commentsTab.click();
      }else if (linkString.includes('registro')) {
        registroTab.click();
      }else{
        openTab.click();
      }
      
    } catch (e) {
      console.log(e.message);
    }
  }

  tk_ui.prototype.init = function () {
    try {
      var self = this;

      if(!this.ticket || !(this.ticket instanceof Ticket))
        throw new TypeError('this.ticket undefined!');

      if(!this.root)
        this.root = tk_ui_struct.clone();

      var admin = new Admin();
      admin.Load(function () {
        self.admin = admin;
        if(self.ticket.Id && parseInt(self.ticket.Id) > 0){
          self.ticket.Load(function () {
            self.setStructure();
          });
        }else{
          //Set DataRichiesta Default Value
          var today = new Date();
          self.root.find('[data-card-field="DataRichiesta"] input').val(today.yyyymmdd());
  
          self.setStructure();
        }
      });

      

    } catch (e) {
      console.error(e.message);
    }
  }

  tk_ui.prototype.setStructure = function () {
    try {
      var self = this;

      if(!this.ticket)
        throw new TypeError('setStructure - this.ticket undefined!');

      if(!this.parentRoot)
        throw new TypeError('setStructure - this.parentRoot undefined!');
      
      this.parentRoot.html(this.root);

      var root = this.root;
      var ticket = this.ticket;

      self.setAuthoFields();

      for (var property in ticket) {
        if(vars_ticket.hasOwnProperty(property)){
          var field = new tk_ui_field();
          field.ticket = ticket;
          field.propertyName = property;
          field.parentRoot = root;
          field.root = root.find('[data-card-field="' + property + '"]');
          field.vars = vars_ticket[property];
          field.init();
        }
      }

      //TipoAssegnazione
      if(!ticket.Id || parseInt(ticket.Id) === 0)
        ticket.TipoAssegnazione = 1;

      var tipo_assegnazione = new tk_ui_tipo_assegnazione();
      tipo_assegnazione.ticket = ticket;
      tipo_assegnazione.parentRoot = root;
      tipo_assegnazione.root = root.find('[data-card-field="TipoAssegnazione"]');  
      tipo_assegnazione.init();

      //Fornitore
      if(!ticket.Id || parseInt(ticket.Id) === 0)
        ticket.IdFornitore = null;// null or 0?
      
      var ui_fornitore = new tk_ui_fornitore();
      ui_fornitore.ticket = ticket;
      ui_fornitore.parentRoot = root;
      ui_fornitore.root = root.find('[data-card-field="IdFornitore"]');
      ui_fornitore.init();

      //NOTE: Non mettere qua il load di TicketAssegnazione o Fornitore. Da fare nelle classi ui (tk_ui_tipo_assegnazione oppure tk_ui_fornitore).
      

    } catch (e) {
      console.error(e.message);
    }
  }

  tk_ui.prototype.setAuthoFields = function () {
    try {
      var self = this;

      if(!this.root)
        throw new TypeError('tk_ui - setAuthoFields : this.root undefined!');

      if(!this.admin)
        throw new TypeError('tk_ui - setAuthoFields : this.admin undefined!');

      var ticket = this.ticket;
      var idTicket = parseInt(ticket.Id);
      var root = this.root;
      var admin = this.admin;
      var stato_select = root.find('div.data_card-row__field[data-card-field="Stato"] select');
      var options = stato_select.find(' option');

      if(!admin.isAdministrator() && !admin.isFornitore()){
        options.each(function () {
          var option = $(this);
          var value = parseInt(option.val());
          if(idTicket > 0 && (value === 1 || value === 5)){
            option.attr("disabled", "disabled");
          }else if(value === 5){
            option.attr("disabled", "disabled");
          }
        });
      }else if(admin.isFornitore()){
        root.find('input, select, textarea').attr("disabled", "disabled");
        stato_select.attr("disabled", false);
      }
      
    } catch (e) {
      console.error(e.message);
    }
  }

  tk_ui_field.prototype.init = function () {
    try {
      var self = this;

      if(!this.ticket)
        throw new TypeError('init - this.ticket undefined!');

      if(!this.root)
      throw new TypeError('init - this.root undefined!');

      var ticket = this.ticket;
      var vars = this.vars;
      var required = vars.required;
      var propertyName = this.propertyName;

      if((ticket.Id && parseInt(ticket.Id) > 0) || !required){
        this.setOutputView();
      }else{
        this.setInputView();
      }

      if(!ticket.Id && propertyName === "Indicazioni"){
        this.setInputView();
      }

      if(!ticket.Id && propertyName === "DataRichiesta"){
        this.setOutputView();
      }

      this.listeners();

    } catch (e) {
      console.error(e.message);
    }
  }

  tk_ui_field.prototype.setOutputView = function () {
    try {
      var self = this;

      var root = this.root;
      var ticket = this.ticket;
      var vars = this.vars;
      var propertyName = this.propertyName;
      var inputType = vars.inputType;
      var field = root.find(inputType);
      var span = root.find('span');
      var val = field.val();
      var isNew = (ticket.Id && parseInt(ticket.Id) > 0) ? false : true;

      if(!isNew){
        val = ticket[propertyName];
        field.val(val);
      }else{
        ticket[propertyName] = val;
      }

      if(val === "" || !val)
        val = "-";

      if(propertyName === "DataRichiesta"){
        val = (new Date(val)).ddmmyyyy();
      }

      if(inputType === 'select'){
        val = field.find('option:selected').text();
      }

      span.html(val);
      span.toggle();
      field.toggle();

      if(span.is(":hidden"))
        span.toggle();

      if(field.is(":visible"))
        field.toggle();

    } catch (e) {
      console.error(e.message);
    }
  }

  tk_ui_field.prototype.setInputView = function () {
    try {
      var self = this;
      var root = this.root;
      var vars = this.vars;
      var inputType = vars.inputType;
      var field = root.find(inputType);
      var span = root.find('span');
      var val = field.val();

      if(span.is(":visible"))
        span.toggle();

      if(field.is(":hidden"))
        field.toggle();

      
    } catch (e) {
      console.error(e.message);
    }
  }

  tk_ui_field.prototype.listeners = function () {
    try {
      var self = this;

      //Fare un salvataggio simile al panel delle transazione. Quando aggiungi una nota, automaticamente salva il testo.
      var root = this.root;
      var vars = this.vars;
      var inputType = vars.inputType;
      var field = root.find(inputType);
      var span = root.find('span');
      var propertyName = this.propertyName;

      span.click(function (event) {
        if($(this).is(":visible")){
          self.setInputView();
        }
      });

      field.change(function () {
        var val = $(this).val();
        var ticket = self.ticket;
        ticket[propertyName] = val;

        if(ticket.Id && parseInt(ticket.Id) > 0){//Deve essere già stato salvato in precedenza per poter salvare da questa funzione.
          ticket.Save(function (s1) {
            if(s1){
              self.setOutputView();
            }else{
              alert(error_sms.ticket_save_error);
            }
          });
        }else{
          self.setOutputView();
        }
      });

    } catch (e) {
      console.error(e.message);
    }
  }

  tk_ui_tipo_assegnazione.prototype.init = function () {
    try {
      var self = this;

      if(!this.ticket)
        throw new TypeError('tk_ui_tipo_assegnazione - init : this.ticket');

      var ticket = this.ticket;

      if(!ticket.TipoAddebito || !(parseInt(ticket.TipoAddebito) >= 0))
        throw new TypeError('tk_ui_tipo_assegnazione - init : ticket.TipoAddebito undefined');

      if(!ticket.TipoAssegnazione || !(parseInt(ticket.TipoAssegnazione) > 0))
        throw new TypeError('tk_ui_tipo_assegnazione - init : this.TipoAssegnazione undefined');

      if(!this.root)
        throw new TypeError('tk_ui_tipo_assegnazione - init : this.root');

      if(!this.parentRoot)
        throw new TypeError('tk_ui_tipo_assegnazione - init : this.parentRoot');

      var root = this.root;
      var ticket = this.ticket;
      var parentRoot = this.parentRoot;

      this.setOptionsStatus();//Imposta lo stato delle 3 tipologie di assegnazioni in base a TipoAddebito.
      this.listeners();

      if(ticket.Id && parseInt(ticket.Id) > 0){
        this.loadAssigns(function (assigns) {
          for (let index = 0; index < assigns.length; index++) {
            const assign = assigns[index];
            var row = new ticketAssegnazione_row();
            row.ticket = ticket;
            row.parentRoot = parentRoot;
            row.tipoAssegnazione = assign.tipoAssegnazione;
            row.item = assign.item;
            row.ticketAssegnazione = assign.ticketAssegnazione;
            row.init();
          }
        });
      }

      root.find('div.card_field__header > div:nth-child(' + ticket.TipoAssegnazione + ')').addClass('tipoAssegnazione-selected');

    } catch (e) {
      console.error(e.message);
      
    }
  }

  tk_ui_tipo_assegnazione.prototype.listeners = function () {
    try {
      var self = this;
      var ticket = this.ticket;
      var root = this.root;
      var parentRoot = this.parentRoot;
      var rootAssegnazioni = root.find('div.card_field__header');
      var fieldTipoAddebito = parentRoot.find('div.data_card-row__field[data-card-field="TipoAddebito"]');
      var fieldStato = parentRoot.find('div.data_card-row__field[data-card-field="Stato"]');
      var stato_nonAssegnato = 3;

      //Listener aggiunto a TipoAddebito
      fieldTipoAddebito.find('select').change(function () {
        var val = $(this).val();
        self.setOptionsStatus();
        self.clickDefaultAssegnazione();
        if(parseInt(val) !== 1){
          fieldStato.find('span').html('In attesa di approvazione');
          fieldStato.find('select').val(stato_nonAssegnato);
          ticket.Stato = stato_nonAssegnato;
        }
      });      

      rootAssegnazioni.find('div.card_field__header-item').click(function () {
        if(!$(this).hasClass('tipoAssegnazione-disabled') && !$(this).hasClass('tipoAssegnazione-selected')){
          var index = $(this).index() + 1;
          ticket.TipoAssegnazione = index;
          rootAssegnazioni.find('> div').removeClass('tipoAssegnazione-selected');
          $(this).addClass('tipoAssegnazione-selected');

          if(ticket.Id && parseInt(ticket.Id) > 0){
            root.find('input').focus();
          }

          if(ticket.Id && parseInt(ticket.Id) > 0){
            ticket.Save(function (s1) {
              if(s1){
                self.removeAllAssigns();
              }else{
                alert(error_sms.ticket_save_error);
              }
            });
          }

        }
      });

      root.find('input').keyup(debounce(function(){
        var keywords = $(this).val();
        root.find('div.ticketAssegnazione_search_results').empty();
        self.search(keywords, function () {
          
        });        
      },500));
      

    } catch (e) {
      console.error(e.message);
    }
  }

  tk_ui_tipo_assegnazione.prototype.setOptionsStatus = function () {
    try {
      var self = this;

      var ticket = this.ticket;
      var root = this.root;
      var tipoAddebito = parseInt(ticket.TipoAddebito);
      var rootAssegnazioni = root.find('div.card_field__header');
      rootAssegnazioni.find('> div').removeClass('tipoAssegnazione-selected');

      switch (tipoAddebito) {
        case 0:
        case 2:
        case 3:
          rootAssegnazioni.find('> div:nth-child(1)').addClass('tipoAssegnazione-disabled');
          rootAssegnazioni.find('> div:nth-child(2)').removeClass('tipoAssegnazione-disabled');
          rootAssegnazioni.find('> div:nth-child(3)').removeClass('tipoAssegnazione-disabled');
          break;
        case 1:
          rootAssegnazioni.find('> div:nth-child(1)').removeClass('tipoAssegnazione-disabled');
          rootAssegnazioni.find('> div:nth-child(2)').addClass('tipoAssegnazione-disabled');
          rootAssegnazioni.find('> div:nth-child(3)').addClass('tipoAssegnazione-disabled');
          break;
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  tk_ui_tipo_assegnazione.prototype.search = function (keywords, callback) {
    try {
      var self = this;

      if(!keywords)
        throw new TypeError('tk_ui_tipo_assegnazione - search : keywords undefined!');

      if(!callback)
        throw new TypeError('tk_ui_tipo_assegnazione - search : callback undefined!');

      var ticket = this.ticket;
      var root = this.root;
      var rootAssegnazioni = root.find('div.card_field__header');
      var rootTipoAssegnazioneSelected = rootAssegnazioni.find('div.card_field__header-item.tipoAssegnazione-selected');
      var tipoAssegnazioneSelected = rootTipoAssegnazioneSelected.index() + 1;

      if(tipoAssegnazioneSelected > 0){
        self.searchByTipoAssegnazione(tipoAssegnazioneSelected, keywords);
      }else{
        alert('Selezionare tipologia di ricerca...');
      }

    } catch (e) {
      console.error(e.message);
    }
  }

  tk_ui_tipo_assegnazione.prototype.searchByTipoAssegnazione = function (tipoAssegnazione, keywords, callback) {
    try {
      var self = this;

      if(!tipoAssegnazione || !(parseInt(tipoAssegnazione) > 0))
        throw new TypeError('tk_ui_tipo_assegnazione - searchByTipoAssegnazione : tipoAssegnazione undefined!');

      if(!keywords)
        throw new TypeError('tk_ui_tipo_assegnazione - searchByTipoAssegnazione : keywords undefined!');

      var items = new Array();
      var ticket = this.ticket;
      var parentRoot = this.parentRoot;
      var dataRichiesta = parentRoot.find('div.data_card-row__field[data-card-field="DataRichiesta"] input').val();
      var data = { 
        keywords : keywords, 
        dataRichiesta : dataRichiesta
      };

      var url_search = [
        "?action=search-inquilini",// 1 = Inquilino
        "?action=search-apt",// 2 = Apt
        "?action=search-room"// 3 = Room
      ]; 

      var clone = encodeURIComponent(CircularJSON.stringify(data));

      $.ajax({
        method: "POST",
        url: url_search[(tipoAssegnazione-1)],
        data: { data : clone },
    }).done(function(res){

      if (res && res.Data && res.Data.length > 0) {
        var data_items = res.Data;
        each(data_items, function (key, registro, index) {
          var row = new ticketAssegnazione_row();
          row.ticket = ticket;
          row.parentRoot = parentRoot;
          row.tipoAssegnazione = tipoAssegnazione;
          row.item = data_items[key];
          row.init();
        });
      }
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });

    } catch (e) {
      console.error(e.message);
    }
  }

  tk_ui_tipo_assegnazione.prototype.loadAssigns = function (callback) {
    try {
      var self = this;

      if(!callback)
        throw new TypeError('tk_ui_tipo_assegnazione - loadAssigns : callback undefined!');

      var ticket = this.ticket;
      var assigns = null;

      var clone = encodeURIComponent(CircularJSON.stringify(ticket));

      $.ajax({
          method: "POST",
          url: '?action=load-assigns',
          data: { data : clone },
      }).done(function(res){

        if (res && res.data && res.data.length > 0) {
          var rows = res.data;
          each(rows, function (key, registro, index) {
            rows[key].ticketAssegnazione =  $.extend(new TicketAssegnazione(), rows[key].ticketAssegnazione);
          });
          assigns = rows;
        }

        callback(assigns);
      }).fail(function(xhr, status, error) {
        DefaultErrorHandler(xhr, status, error);
      });
    } catch (e) {
      console.error(e.message);
      
    }
  }

  tk_ui_tipo_assegnazione.prototype.removeAllAssigns = function () {
    try {
      var self = this;

      var root = this.root;
      var assigns = root.find('div.ticketAssegnazione_selected div.field_ticket-assegnazione__container-row');

      assigns.each(function( index ) {
        var assign = $(this);
        assign.find('div.ta__remove').click();
      });
      
    } catch (e) {
      console.error(e.message);
    }
  }

  tk_ui_tipo_assegnazione.prototype.clickDefaultAssegnazione = function () {
    try {
      var self = this;
      var ticket = this.ticket;
      var root = this.root;
      var rootAssegnazioni = root.find('div.card_field__header');

      if(ticket.TipoAddebito && parseInt(ticket.TipoAddebito) === 1){
        rootAssegnazioni.find('> div:nth-child(1)').click();
      }else{
        rootAssegnazioni.find('> div:nth-child(3)').click();
      }

    } catch (e) {
      console.error(e.message);
    }
  }

  ticketAssegnazione_row.prototype.init = function () {
    try {
      var self = this;

      if(!this.ticket)
        throw new TypeError('ticketAssegnazione_row - init : this.ticket undefined!');

      if(!this.tipoAssegnazione)
        throw new TypeError('ticketAssegnazione_row - init : this.tipoAssegnazione undefined!');

      if(!this.item)
        throw new TypeError('ticketAssegnazione_row - init : this.item undefined!');

      if(!this.parentRoot)
        throw new TypeError('ticketAssegnazione_row - init : this.parentRoot undefined!');

      this.setStructure();
      this.listeners();
      
    } catch (e) {
      console.log(e.message);
    }
  }

  ticketAssegnazione_row.prototype.setStructure = function () {
    try {
      var self = this;
      var rootTipoAssegnazione = this.parentRoot.find('div.data_card-row__field[data-card-field="TipoAssegnazione"]');
      var rootContainer = rootTipoAssegnazione.find('div.ticketAssegnazione_selected');

      if(!this.ticketAssegnazione)
        rootContainer = rootTipoAssegnazione.find('div.ticketAssegnazione_search_results');

      var item = this.item;

      this.root = ticketAssegnazione_row_struct.clone();
      this.root.addClass('assegnazione-type-' + this.tipoAssegnazione);

      var ins_inizio = (new Date(item.ins_inizio)).ddmmyyyy();
      var ins_fine = item.ins_fine ? (new Date(item.ins_fine)).ddmmyyyy() : '-';

      this.root.find('div.inq_nominativo').append(item.inq_nominativo);
      this.root.find('div.ins_inizio').append(ins_inizio);
      this.root.find('div.ins_fine').append(ins_fine);
      this.root.find('div.apt_address').append(item.apt_address);
      this.root.find('div.room_number').append('c. ' + item.room_number);

      rootContainer.append(this.root);

    } catch (e) {
      console.error(e.message);
    }
  }

  ticketAssegnazione_row.prototype.listeners = function () {
    try {
      var self = this;
      var item = this.item;
      var root = this.root;

      root.click(function () {
        if(!self.ticketAssegnazione){
          var ticket = self.ticket;
          if(!ticket.Id || parseInt(ticket.Id) === 0){
            //Save Ticket
            ticket.Save(function (s1) {
              if(s1){
                var assign = self.createAssegnazione();
                assign.Save(function (s2) {
                  if(s2){
                    self.root.remove();
                    self.ticketAssegnazione = assign;
                    self.setStructure();
                    self.listeners();
                  }else{
                    alert(error_sms.tk_assign_save_error);
                  }
                });
              }else{
                alert(error_sms.ticket_save_error);
              }
            });
          }else{
            //Save TicketAssegnazione
            var assign = self.createAssegnazione();
            assign.Save(function (s2) {
              if(s2){
                self.root.remove();
                self.ticketAssegnazione = assign;
                self.setStructure();
                self.listeners();
              }else{
                alert(error_sms.tk_assign_save_error);
              }
            });
          }
        }
      });

      root.find('.ta__remove').click(function (event) {
        console.log("clicked!");
        
        event.preventDefault();
        self.ticketAssegnazione.Save(function (s3) {
          if(s3){
            self.ticketAssegnazione = null;
            self.root.remove();
          }else{
            alert(error_sms.tk_assign_save_error);
          }
        });
      });

    } catch (e) {
      console.error(e.message);
    }
  }

  ticketAssegnazione_row.prototype.createAssegnazione = function () {
    try {
      var self = this;

      if(!this.ticket || !this.ticket.Id || !(parseInt(this.ticket.Id) > 0))
        throw new TypeError('ticketAssegnazione_row - createAssegnazione : this.ticket undefined!');

      var ticket = this.ticket;
      var item = this.item;
      var tipoAssegnazione = parseInt(this.tipoAssegnazione);
      var assign = new TicketAssegnazione();
      assign.Id = 0;
      assign.IdTicket = ticket.Id;

      switch (tipoAssegnazione) {
        case 1:
          assign.IdInquilinoStanze = item.IdIns;
          break;
        case 2:
          assign.IdAppartamento = item.IdApt;
          break;
        case 3:
          assign.IdAppartamentoStanze = item.IdRoom;
          break;
      }

      return assign;

    } catch (e) {
      console.error(e.message);
    }
  }

  tk_ui_fornitore.prototype.init = function () {
    try {
      var self = this;

      if(!this.ticket)
        throw new TypeError('tk_ui_fornitore - init : this.ticket');

      if(!this.root)
        throw new TypeError('tk_ui_fornitore - init : this.root');

      if(!this.parentRoot)
        throw new TypeError('tk_ui_fornitore - init : this.parentRoot');

      var root = this.root;
      var ticket = this.ticket;
      var parentRoot = this.parentRoot;

      this.listeners();

      if(ticket.IdFornitore && parseInt(ticket.IdFornitore) > 0){
        self.loadFornitore(ticket.Id, function (fornitore) {
          var row = new ticketFornitore_row();
          row.ticket = ticket;
          row.parentRoot = parentRoot;
          row.item = fornitore;
          row.mode = 1;//selected
          row.init();
        });
      }else{
        for (let index = 0; index < hint_fornitore.length; index++) {
          const element = hint_fornitore[index];
          var row = new ticketFornitore_row();
          row.ticket = ticket;
          row.parentRoot = parentRoot;
          row.item = element.item;
          row.mode = element.mode;
          row.init();
        }
      }

      

    } catch (e) {
      console.error(e.message);
    }
  }

  tk_ui_fornitore.prototype.listeners = function () {
    try {
      var self = this;
      var ticket = this.ticket;
      var root = this.root;
      var parentRoot = this.parentRoot;

      root.find('input').keyup(debounce(function(){
        var keywords = $(this).val();
        root.find('div.ticketFornitore_search_results').empty();
        self.search(keywords, function () {
          
        });
      }, 500));

    } catch (e) {
      console.error(e.message);
    }
  }

  tk_ui_fornitore.prototype.search = function (keywords, callback) {
    try {
      var self = this;

      if(!keywords)
        throw new TypeError('tk_ui_fornitore - search : keywords undefined!');

      if(!callback)
        throw new TypeError('tk_ui_fornitore - search : callback undefined!');

      var ticket = this.ticket;
      var root = this.root;
      var items = new Array();
      var parentRoot = this.parentRoot;
      var data = {
        keywords : keywords
      };

      var clone = encodeURIComponent(CircularJSON.stringify(data));

      $.ajax({
          method: "POST",
          url: '?action=search-fornitori',
          data: { data : clone },
      }).done(function(res){

        if (res && res.Data && res.Data.length > 0) {
          var data_items = res.Data;
          each(data_items, function (key, registro, index) {
            var row = new ticketFornitore_row();
            row.ticket = ticket;
            row.parentRoot = parentRoot;
            row.item = data_items[key];
            row.mode = 2;
            row.init();
          });
        }
      }).fail(function(xhr, status, error) {
        DefaultErrorHandler(xhr, status, error);
      });

    } catch (e) {
      console.error(e.message);
    }
  }

  tk_ui_fornitore.prototype.loadFornitore = function (idFornitore, callback) {
    try {
      var self = this;

      if(!idFornitore)
        throw new TypeError('tk_ui_fornitore - loadFornitore : idFornitore undefined!');

      if(!callback)
        throw new TypeError('tk_ui_fornitore - loadFornitore : callback undefined!');

      var ticket = this.ticket;
      var fornitore = null;

      var clone = encodeURIComponent(CircularJSON.stringify(ticket));

      $.ajax({
          method: "POST",
          url: '?action=load-fornitore',
          data: { data : clone },
      }).done(function(res){

        if (res && res.data) {
          fornitore = res.data;
        }

        callback(fornitore);
      }).fail(function(xhr, status, error) {
        DefaultErrorHandler(xhr, status, error);
      });

    } catch (e) {
      console.error(e.message);
    }
  }

  ticketFornitore_row.prototype.init = function () {
    try {
      var self = this;

      if(!this.ticket)
        throw new TypeError('ticketFornitore_row - init : this.ticket undefined!');

      if(!this.item)
        throw new TypeError('ticketFornitore_row - init : this.item undefined!');

      if(!this.parentRoot)
        throw new TypeError('ticketFornitore_row - init : this.parentRoot undefined!');

      this.setStructure();
      this.listeners();

    } catch (e) {
      console.error(e.message);
    }
  }

  ticketFornitore_row.prototype.setStructure = function () {
    try {
      var self = this;
      var rootTipoAssegnazione = this.parentRoot.find('div.data_card-row__field[data-card-field="IdFornitore"]');
      var rootContainer = rootTipoAssegnazione.find('div.ticketFornitore_selected');

      if(this.mode === 2)
        rootContainer = rootTipoAssegnazione.find('div.ticketFornitore_search_results');

      var item = this.item;

      this.root = ticketFornitore_row_struct.clone();

      this.root.find('div.fornitore_nominativo').append(item.nominativo);

      rootContainer.append(this.root);

    } catch (e) {
      console.error(e.message);
    }
  }

  ticketFornitore_row.prototype.listeners = function () {
    try {
      var self = this;
      var item = this.item;
      var idFornitore = parseInt(item.Id);
      var parentRoot = this.parentRoot;
      var root = this.root;

      root.click(function () {
        if(self.mode === 2){
          var ticket = self.ticket;
          if(idFornitore === 6010){//Ticket Pulizie assegnate a Isola Servizi
            parentRoot.find('div.data_card-row__field[data-card-field="Stato"] select').val(1).change();//Stato ticket aperto
          }
          ticket.IdFornitore = idFornitore;
          if(ticket.Id && parseInt(ticket.Id) > 0){
            ticket.Save(function (s1) {
              if(s1){
                self.mode = 1;
                parentRoot.find('div.data_card-row__field[data-card-field="IdFornitore"] div.ticketFornitore_search_results').empty();
                self.setStructure();
              }else{
                alert(error_sms.ticket_save_error);
              }
            });
          }else{
            self.mode = 1;
            parentRoot.find('div.data_card-row__field[data-card-field="IdFornitore"] div.ticketFornitore_search_results').empty();
            self.setStructure();
          }
        }
      });

      root.find('.tf__remove').click(function (event) {
        event.preventDefault();

        var ticket = self.ticket;
        ticket.IdFornitore = 0;
        if(ticket.Id && parseInt(ticket.Id) > 0){
          ticket.Save(function (s1) {
            if(s1){
              root.remove();
            }else{
              alert(error_sms.ticket_save_error);
            }
          });
        }else{
          root.remove();
        }
      });

    } catch (e) {
      console.error(e.message);
    }
  }

  acct_ui.prototype.init = function () {
    try {
      var self = this;

      if(!this.ticket || !(this.ticket instanceof Ticket))
        throw new TypeError('this.ticket undefined!');

      if(!this.root)
        this.root = acct_ui_struct.clone();

      var root = this.root;

      var admin = new Admin();
      admin.Load(function () {
        self.admin = admin;
        if(self.ticket.Id && parseInt(self.ticket.Id) > 0){
          self.ticket.Load(function () {
            //Caricamento Iniziale
            self.setStructure();
            var tot_tickets = 0;
            var tot_rimborsi = 0;
            var tot_ft = 0;

            self.Load(function (registri, hasServizi) {
              //Caricamento eventuali acct_rows
              if(registri && registri.length > 0){
                //Inserimento rows
                for (let i = 0; i < registri.length; i++) {
                  var registro = registri[i];
                  var row = new acct_ui_row();
                  row.acct_ui = self;
                  row.parentRoot = root.find('div.acct_rows');
                  row.item = registro;
                  row.item.IdTicket = self.ticket.Id;
                  tot_ft += registro.getTotaleFatturaFornitore();
                  tot_tickets += registro.getTotaleFattura();
                  tot_rimborsi += registro.Rimborso ? parseFloat(registro.Rimborso) : 0;
                  row.ticket = self.ticket;
                  row.init();
                }

                //update header
                self.updateHeader(tot_tickets, tot_rimborsi, tot_ft, hasServizi);
              }

              //Inserimento empty row
              self.addEmptyRow();
              
            });

            
            
          });
          
        }
      });
      
    } catch (e) {
      console.error(e.message);
    }
  }

  acct_ui.prototype.setStructure = function () {
    try {
      var self = this;

      if(!this.ticket)
        throw new TypeError('setStructure - this.ticket undefined!');

      if(!this.parentRoot)
        throw new TypeError('setStructure - this.parentRoot undefined!');

      this.parentRoot.html(this.root);

      var root = this.root;
      var ticket = this.ticket;

      this.listeners();

    } catch (e) {
      console.error(e.message);
    }
  }

  acct_ui.prototype.listeners = function () {
    try {
      var self = this;

      if(!this.parentRoot)
        throw new TypeError('setStructure - this.parentRoot undefined!');

      if(!this.root)
        throw new TypeError('setStructure - this.root undefined!');

      var parentRoot = this.parentRoot;
      var root = this.root;

      root.find('div.acct_summary > div:nth-child(1)').click(function () {
        var btn = $(this);

        if(btn.hasClass('serviziBtn')){
          console.log("Generazione servizi in corso...");
          self.GeneraServizi(function (success) {
            if(success){
              btn.toggleClass('serviziBtn');
              btn.find('span').html('Servizi già presenti');
            }else{
              alert("Errore durante la generazione dei servizi. Richiedere supporto...");
            }
          });
        }

      });
      

    } catch (e) {
      console.error(e.message);
    }
  }

  acct_ui.prototype.GeneraServizi = function ( callback ) {
    try {
      var self = this;

      if(!callback)
        throw new TypeError('acct_ui - callback undefined!');

      var success = false;
      var ticket = this.ticket;

      var filtro = {
        Id : ticket.Id
      };

      var clone = encodeURIComponent(CircularJSON.stringify(filtro));

      $.ajax({
        method: "POST",
        url: '?action=genera-servizi',
        data: { data : clone },
      }).done(function(res){

        if (res && res.success)
          success = true;

        callback(success);
      }).fail(function(xhr, status, error) {
        DefaultErrorHandler(xhr, status, error);
      });

    } catch (e) {
      console.error(e.message);
    }
  }

  acct_ui.prototype.Load = function ( callback ) {
    try {
      var self = this;

      if(!callback)
        throw new TypeError('acct_ui - callback undefined!');

      var registro = null;
      var ticket = this.ticket;

      var filtro = {
        Id : ticket.Id
      };

      var clone = encodeURIComponent(CircularJSON.stringify(filtro));

      $.ajax({
        method: "POST",
        url: '?action=load-registro-rows',
        data: { data : clone },
      }).done(function(res){

        if (res && res.data && res.data.length > 0) {
          var hasServizi = res.hasServizi;
          var rows = res.data;
          each(rows, function (key, r, i) {
            rows[key] =  $.extend(new RegistroTicket(), rows[key]);
          });
          registro = rows;
        }

        callback(registro, hasServizi);
      }).fail(function(xhr, status, error) {
        DefaultErrorHandler(xhr, status, error);
      });

    } catch (e) {
      console.error(e.message);
    }
  }

  acct_ui.prototype.updateHeader = function (tot_tickets, tot_rimborsi, tot_ft, hasServizi) {
    try {
      var self = this;

      var root = this.root;
      var rootHeader = root.find('div.acct_summary');
      var serviziBtn = rootHeader.find('> div:nth-child(1)');
      var totTickets = rootHeader.find('> div:nth-child(2) > span:nth-child(2)');
      var totRimborsi = rootHeader.find('> div:nth-child(3) > span:nth-child(2)');
      var totFattura = rootHeader.find('> div:nth-child(4) > span:nth-child(2)'); 
      var admin = this.admin;

      if(admin.isAdministrator() || admin.isContabile())
        serviziBtn.show();

      if(!(tot_tickets > 0) || !(tot_ft > 0)){
        tot_tickets = 0;
        tot_rimborsi = 0;
        tot_ft = 0;
        self.Load(function (registri, hasServizi) {

          if(hasServizi)
            serviziBtn.toggleClass('serviziBtn').find('span').html('Servizi già presenti');

          for (const key in registri) {
            if (registri.hasOwnProperty(key)) {
              const registro = registri[key];
              tot_ft += registro.getTotaleFatturaFornitore();
              tot_tickets += registro.getTotaleFattura(registri.length);
              tot_rimborsi += registro.Rimborso ? parseFloat(registro.Rimborso) : 0;
            }
          }

          if(tot_tickets >= 0){
            tot_tickets = new Number(tot_tickets);
            totTickets.html(tot_tickets.formatMoney() + ' €');
          }
    
          if(tot_rimborsi >= 0){
            tot_rimborsi = new Number(tot_rimborsi);
            totRimborsi.html(tot_rimborsi.formatMoney() + ' €');
          }
    
          if(tot_ft >= 0){
            tot_ft = new Number(tot_ft);
            totFattura.html(tot_ft.formatMoney() + ' €');
          }
        });
      }else{

        if(hasServizi)
          serviziBtn.toggleClass('serviziBtn').find('span').html('Servizi già presenti');

        if(tot_tickets && tot_tickets > 0){
          tot_tickets = new Number(tot_tickets);
          totTickets.html(tot_tickets.formatMoney() + ' €');
        }
  
        if(tot_rimborsi && tot_rimborsi > 0){
          tot_rimborsi = new Number(tot_rimborsi);
          totRimborsi.html(tot_rimborsi.formatMoney() + ' €');
        }
  
        if(tot_ft && tot_ft > 0){
          tot_ft = new Number(tot_ft);
          totFattura.html(tot_ft.formatMoney() + ' €');
        }
      }
    
    } catch (e) {
      console.error(e.message);
    }
  }

  acct_ui.prototype.addEmptyRow = function () {
    try {
      var self = this;
      var root = this.root;

      var row = new acct_ui_row();
      row.acct_ui = self;
      row.parentRoot = root.find('div.acct_rows');
      row.item = new RegistroTicket();
      row.item.IdTicket = self.ticket.Id;
      row.ticket = self.ticket;
      row.init();

    } catch (e) {
      console.error(e.message);
    }
  }

  acct_ui_row.prototype.init = function () {
    try {
      var self = this;

      if(!this.parentRoot)
        throw new TypeError('acct_ui_row - init : this.parentRoot undefined!');

      if(!this.ticket)
      throw new TypeError('acct_ui_row - init : this.ticket undefined!');

      if(!this.item)
        throw new TypeError('acct_ui_row - init : this.item undefined!');

      if(!this.root)
        this.root = acct_row_struct.clone();

      this.parentRoot.append(this.root);

      if(!this.item.Id || !(parseInt(this.item.Id) > 0)){
        this.setDefaultVals();
      }

      this.updateTotal();
      this.setOutputView();
      this.listeners();

    } catch (e) {
      console.error(e.message);
    }
  }

  acct_ui_row.prototype.setDefaultVals = function () {
    try {
      var self = this;
      var item = this.item;
      var root = this.root;

      for (const property in item) {
        if (item.hasOwnProperty(property)) {
          if(vars_acct.hasOwnProperty(property)){
            var vars = vars_acct[property];
            item[property] = vars.defaulValue;
          }
        }
      }
      
    } catch (e) {
      console.error(e.message);
      
    }
  }

  acct_ui_row.prototype.setOutputView = function () {
    try {
      var self = this;

      if(!this.parentRoot)
        throw new TypeError('acct_ui_row - setOutputView : this.parentRoot undefined!');

      if(!this.ticket)
      throw new TypeError('acct_ui_row - setOutputView : this.ticket undefined!');

      if(!this.item)
        throw new TypeError('acct_ui_row - setOutputView : this.item undefined!');

      if(!this.root)
        throw new TypeError('acct_ui_row - setOutputView : this.root undefined!');

      var parentRoot = this.parentRoot;
      var root = this.root;
      var item = this.item;

      for (const property in item) {
        if (item.hasOwnProperty(property)) {
          if(vars_acct.hasOwnProperty(property)){
            var vars = vars_acct[property];
            var field = root.find('div.data_card-row__field[data-card-field="' + property +  '"]');
            var inputType = vars.inputType;
            var input = field.find(inputType);
            var span = field.find('span');

            var val = item[property];

            if(inputType === 'select'){
              val = input.find("[value='" + item[property] + "']").text();
            }

            if(property === "DataIntervento"){
              val = (new Date(val)).ddmmyyyy();
            }

            if(input.attr('isEuro') === "true"){
              var amount = new Number(val);
              val = amount.formatMoney() + ' €';
            }

            span.html(val);

            if(input.is(":visible"))
            input.toggle();
    
            if(span.is(":hidden"))
              span.toggle();

          }
        }
      }

    } catch (e) {
      console.error(e.message);
    }
  }

  acct_ui_row.prototype.setInputView = function (property) {
    try {
      var self = this;

      if(!this.parentRoot)
        throw new TypeError('acct_ui_row - setInputView : this.parentRoot undefined!');

      if(!this.ticket)
      throw new TypeError('acct_ui_row - setInputView : this.ticket undefined!');

      if(!this.item)
        throw new TypeError('acct_ui_row - setInputView : this.item undefined!');

      if(!this.root)
        throw new TypeError('acct_ui_row - setInputView : this.root undefined!');
      
      if(!property)
        throw new TypeError('acct_ui_row - setInputView : property undefined!');

      var parentRoot = this.parentRoot;
      var root = this.root;
      var item = this.item;
      var vars = vars_acct[property];
      var field = root.find('div.data_card-row__field[data-card-field="'+ property +'"]');
      var span = field.find('span');
      var input = field.find(vars.inputType);
      var val = item[property];
      
      if(span.is(":visible"))
        span.toggle();

      if(property === "DataIntervento"){
        val = new Date(val).yyyymmdd();
      }

      input.val(val);

      if(input.is(":hidden"))
        input.toggle();

      input.focus();

    } catch (e) {
      console.error(e.message);
    }
  }
  
  acct_ui_row.prototype.listeners = function () {
    try {
      var self = this;

      var root = this.root;
      var parentRoot = this.parentRoot;
      var acct_ui = this.acct_ui;

      var field = root.find('div.data_card-row__field div.card_field__body');
      var span = field.find('span');
      var input = field.find('input, select, textarea');

      root.find('i.fa-trash-alt').click(function () {
        var item = self.item;
        if(item.Id && parseInt(item.Id) > 0){
          item.Delete(function(success) {
            if(success){
              root.remove();
              acct_ui.updateHeader();
            }else{
              errorBorder(root);
            }
            
          });
        }
      });
      
      span.click(function () {
        if($(this).is(":visible")){
          var property = $(this).parent().parent().attr('data-card-field');
          self.setInputView(property);
        }
      });

      input.change(function () {
        var val = $(this).val();
        var item = self.item;
        var property = $(this).parent().parent().attr('data-card-field');
        item[property] = val;

        self.updateTotal();

        //1. Controllare se tutti i campi obbligatori sono soddisfati.
        //2. Se "true" allora salva e aggiunge una nuova riga. Altrimenti niente, forse bordo rosso.
        //3. Se viene salvato, allora aggiornare i campi "Totali" del header.
        if(self.checkValues()){
          const idItem = item.Id;
          item.Save(function (success) {
            if(success){
              acct_ui.updateHeader();
              if(!idItem)
                acct_ui.addEmptyRow();

            }else{
              errorBorder(root);
            }
          });
        }else{
          errorBorder(root);
        }
        self.setOutputView();

      });

      function errorBorder(root) {
        root.toggleClass("error_border");
        setTimeout(function () {
          root.toggleClass("error_border");
        }, 500);
      }
      

    } catch (e) {
      console.error(e.message);
    }
  }

  acct_ui_row.prototype.checkValues = function () {
    try {
      var self = this;
      var item = this.item;
      var check = true;

      for (const property in item) {
        if (item.hasOwnProperty(property) && vars_acct.hasOwnProperty(property) && check) {
          const val = item[property];
          var vars = vars_acct[property];
          if(vars.checkVal)
            check = vars.checkVal(val);
        }
      }

      return check;
    } catch (e) {
      console.error(e.message);
    }
  }

  acct_ui_row.prototype.updateTotal = function () {
    try {
      var self = this;
      var item = this.item;
      var total = 0;
      var cad = parseFloat(item.Cadauno);
      var numero = parseFloat(item.Numero);
      var uscita = parseFloat(item.Uscita);
      var iva = 0;

      var root = this.root;

      switch (parseInt(item.Iva)) {
        case 1:
          iva = 22;
          break;
        case 2:
          iva = 10;
          break;
      }

      if(self.checkValues()){
        var imponibile = ((cad*numero)+uscita);
        total = parseFloat(((imponibile/100)*iva)+imponibile);
        item.TotaleFornitore = total;
      }

    } catch (e) {
      console.error(e.message);
    }
  }



})();