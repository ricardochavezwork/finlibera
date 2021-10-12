function sec_owner_agency(propertyApp_ui, sectionNumber, admin) {
    this.propertyApp_ui = propertyApp_ui;
    this.sectionNumber = sectionNumber;
    this.admin = admin;
}

function owner_agency_data(row_ui, floatingPanel) {
    this.row_ui = row_ui;
    this.floatingPanel = floatingPanel;
}

function owner_agency_anagrafica(item, root) {
    this.item = item;
    this.root = root;
}

function prop_owAg(root, owner_agency) {
    this.root = root;
    this.owner_agency = owner_agency;
}

(function () {

    function owner_agency_list(rootKanbanList, propertyApp_ui) {
        this.rootKanbanList = rootKanbanList;
        this.propertyApp_ui = propertyApp_ui;
    }

    function owner_agency_row(item, index, root, structure){
        this.item = item;
        this.index = index;
        this.root = root;
        this.structure = structure;
    }

    function owner_agency_filter(Keywords, OrderMode, OrderBy, SearchMode, Pagination) {
        this.Keywords = Keywords;
        this.OrderMode = OrderMode;
        this.OrderBy = OrderBy;
        this.SearchMode = SearchMode;
        this.Pagination = Pagination;
    }

    function owner_agency_anagrafica_field(item, property, root) {
        this.item = item;
        this.property = property;
        this.root = root;
    }

    function prop_owAg_row(root, parentRoot, item, isActive, structure, owner_agency) {
        this.root = root;
        this.parentRoot = parentRoot;
        this.item = item;
        this.isActive = isActive;
        this.structure = structure;
        this.owner_agency = owner_agency;
    }

    var owAg_manager = new owner_agency_list();
    var owAg_kanban = new kanban_list();
    var filter = new owner_agency_filter();

    var propAg_row_struct = $('<div class="kb-row-v2"><div class="kb-row-v2_top"><div class="kb-row-v2_top__sub-left"><div class="kb-row-v2_btn_select" style="display: none;"><i class="material-icons">radio_button_unchecked</i></div><div class="kb-row-v2_left"><div class="kb-row-v2_col"><div class="kb-row-v2_info propAg_title" title="Apri scheda" style=" color: #00a9fa;"><i class="fas fa-user icons-ms"></i><span></span></div></div><div class="kb-row-v2_col"><div class="kb-row-v2_info cursor_default propAg_primaryEmail" title="Email"><i class="fas fa-envelope icons-ms"></i><span></span></div></div><div class="kb-row-v2_col"><div class="kb-row-v2_info cursor_default propAg_tel" title="Telefono"><i class="fas fa-phone icons-ms"></i><span></span></div></div></div><div class="kb-row-v2_right" style=" display: none;"><div class="kb-row-v2_col btnActions-toggle" style=" cursor: pointer;"><i class="material-icons" style="font-size: 35px;text-align: center;">expand_more</i></div><div class="kb-row-v2_col apt_actions" title="Azioni" style="cursor: pointer;"><i class="material-icons" style="font-size: 35px;text-align: center;">offline_bolt</i></div></div></div><div class="kb-row-v2_top__sub-right"><div class="kb-row-v2_info apt_profit"><i class="fas fa-chart-line icons-ms"></i><span>Profitti</span></div><div class="kb-row-v2_info apt_rooms"><i class="fas fa-bed icons-ms"></i><span>Stanze</span></div></div></div><div class="kb-row-v2_bottom bottom-panel__btn-actions" data-mode=""></div></div>');

    function hasPrivileges(callback, showSms) {
        var admin = new Admin();
        admin.Load(function () {
            if(admin.isAdministrator() || admin.isPropertiesAdministrator()){
                callback();
            }else if(showSms){
                alert("Non hai i privilegi per eseguire quest'azione.");
            }
        });
    }

    sec_owner_agency.prototype.init = function () {
        try {
            var self = this;

            if(!this.propertyApp_ui)
                throw new TypeError('sec_owner_agency - init : this.propertyApp_ui undefined!');

            this.propertyApp_ui.setActiveStatusSectionByNumber(this.sectionNumber);

            clone = self;

            var rootKanbanLists = this.propertyApp_ui.rootKanbanLists;
            rootKanbanLists.empty();
            var admin = this.admin;

            if(admin.isAdministrator() || admin.isPropertiesAdministrator()){
                var btn_section_struct = $('<div class="prop-btn-section"><div class="prop-btn__btn"><i class="fas fa-plus"></i><span>Aggiungi nuovo</span></div></div>');
                rootKanbanLists.append(btn_section_struct);
            }

            var filter_struct = $('<div class="prop_filter"><div class="prop_filter_left-panel"><div class="prop_filter_left-row"><div class="prop_filter_left-row_input-text"><span class="material-icons">search</span><input class="filter_keywords" placeholder="Ricerca..."></div><div class="prop_filter_left-row_select"><span>Proprietario, Agenzia o Broker?</span><select class="filter_tipologia"><option value="0" selected="selected">Selezionare</option><option value="1">Proprietario</option><option value="2">Agenzia</option><option value="3">Broker</option></select></div></div></div><div class="prop_filter_right-panel"><div class="prop_filter-btn"><i></i><span>Ricerca</span></div></div></div>');
            rootKanbanLists.append(filter_struct);

            self.setListeners();

            filter.root = rootKanbanLists.find('.prop_filter');
            filter.parentRoot = rootKanbanLists;
            filter.init();

            owAg_manager.propertyApp_ui = this.propertyApp_ui;
            owAg_kanban.parentRoot = rootKanbanLists;
            owAg_kanban.secTitle = "Elenco";
            owAg_kanban.itemsManager = owAg_manager;
            owAg_kanban.init(function () {
                filter.parentRoot = owAg_kanban.parentRoot;
                filter.setListeners();

            });

        } catch (e) {
            console.log(e.message);
            
        }
    }

    sec_owner_agency.prototype.setListeners = function () {
        try {
            var self = this;

            if(!this.propertyApp_ui)
                throw new TypeError("sec_owner_agency - setListeners : this.propertyApp_ui undefined!");

            var rootKanbanLists = this.propertyApp_ui.rootKanbanLists;
            var btnActions = rootKanbanLists.find('.prop-btn-section .prop-btn__btn');
            
            btnActions.click(function () {
                var floatingPanel = new floatingPanelV2();
                floatingPanel.root = $('section.main-layout_content .tm-floating-panel-desktop-v2');
                floatingPanel.init();
                floatingPanel.addNewSection("Generali");

                var item = new Appartamento_Proprietario_Agenzia();
                item.Proprietario_Agenzia = new Proprietario_Agenzia();
                item.Proprietario_Agenzia.Id = 0;
                item.Proprietario_Agenzia.Newsletter = 1;//Default : Attivo
                item.Proprietario_Agenzia.Type = 1;//Default : Proprietario
                var row = new owner_agency_row();
                row.item = item;

                var owAg_data = new owner_agency_data();
                owAg_data.row_ui = row;
                owAg_data.floatingPanel = floatingPanel;
                owAg_data.init();

                floatingPanel.root.find("div.data_card.data_card-anagrafica > div:nth-child(8)").css("flex-direction", "column");
                floatingPanel.root.find('[data-card-field="PrimaryEmail"]').click();
                floatingPanel.root.find('[data-card-field="Indirizzo"]').click();
                floatingPanel.root.find('[data-card-field="Civico"]').click();
                floatingPanel.root.find('[data-card-field="Citta"]').click();
                floatingPanel.root.find('[data-card-field="CAP"]').click();
                floatingPanel.root.find('[data-card-field="Stato"]').click();
                floatingPanel.root.find('[data-card-field="Paese"]').click();
                floatingPanel.root.find('[data-card-field="Paese_Sigla_ISO3166_2"]').click();
                floatingPanel.root.find('[data-card-field="Cognome"]').click();
                floatingPanel.root.find('[data-card-field="Nome"]').click();
            });

        } catch (e) {
            console.log(e.message);
            
        }
    }

    owner_agency_list.prototype.loadElements = function (filtro, callback) {
        try {
            var self = this;

            if(!clone)
                throw new TypeError("owner_agency_list - loadElements : clone undefined!");

            if(!callback)
                throw new TypeError("owner_agency_list - loadElements : callback undefined!");

            var elements = new Array();
            var propertyApp_ui = this.propertyApp_ui;

            if(self.rootKanbanList.find('.ms-list-header__right').is(':empty')){
                self.rootKanbanList.find('.ms-list-header__right').html('<div class="tm-pagination"><span class="paginationTitle" style=" margin-right: 20px;"></span><i class="fas fa-arrow-left left"></i><i class="fas fa-arrow-right right"></i></div>');
            }

            var admin = new Admin();
            admin.Load(function(){
                self.Search(filter, function(apts, pagination){
                var data = apts;

                if(filter.Pagination){
                    filter.Pagination.TotalPages = pagination.TotalPages;
                }

                if(filter.Pagination){
                    filter.Pagination.TotalRows = pagination.TotalRows;
                }

                if(data && data.length > 0){
                    self.rootKanbanList.find('.secTitle').html("Risultati (" + filter.Pagination.TotalRows + ")");

                    var pager_title = filter.Pagination.CurrentPage + " - " + filter.Pagination.TotalPages;
                    self.rootKanbanList.find('.paginationTitle').html(pager_title);
                    for (var i = 0; i < data.length; i++) {
                    row = new owner_agency_row();
                    row.item = data[i];
                    row.setStructure();
                    elements.push(row);
                    }

                }else{
                    self.rootKanbanList.find('.secTitle').html("Risultati (0)");
                }

                callback(elements);
                });
            });
        } catch (e) {
            console.log(e.message);
            
        }
    }

    owner_agency_list.prototype.Search = function(filtro, callback){
        try {
          var self = this;
          var data = { Filtro : filtro };
          var clone = encodeURIComponent(CircularJSON.stringify(data));
          var apts = new Array();
    
          $.ajax({
              method: "POST",
              url: '?action=search-owner-agency',
              data: { data : clone },
          }).done(function(res){
    
            var pagination = {
              TotalPages : res.TotalPages,
              TotalRows : res.TotalRows
            }
    
            if(res && res.Data && res.Data.length > 0){
              var data_apts = res.Data;
              each(data_apts, function (key, registro, index){
                  data_apts[key] = $.extend(new Appartamento_Proprietario_Agenzia(), data_apts[key]);
                  data_apts[key].Linking();
                  apts.push(data_apts[key]);
              });
    
            }
    
            if(callback){
                callback(apts, pagination);
            }
          }).fail(function(xhr, status, error) {
            DefaultErrorHandler(xhr, status, error);
          });
        } catch (e) {
          console.log(e.message);
        }
    }

    owner_agency_filter.prototype.init = function () {
        try {
            var self = this;

            this.Keywords = null;
            this.SearchMode = 0;
            this.OrderMode = "DESC";
            this.OrderBy = "apt.Id";
            this.Pagination = {
                TotalRows : 0,
                TotalPages : 0,
                CurrentPage : 1,
                LimitRows : 100
            };

        } catch (e) {
            console.log(e.message);
            
        }
    }

    owner_agency_filter.prototype.setListeners = function () {
        try {
            var self = this;
            var form_selector = this.root;
            var rootKanbanLists = this.parentRoot;

            var showEnterIcon = function(divEl){
                divEl.addClass('show-icon_enter-text');
                setTimeout(function(){
                    divEl.removeClass('show-icon_enter-text');
                }, 300); // 5 seconds
            };

            form_selector.find('.prop_filter-btn').click(function(){
                self.Pagination.CurrentPage = 1;
                self.setFilters();
                owAg_kanban.reload(function(){
                    //owAg_manager.setBtmPanelUnder();
                    //toggleCompactItems();
                });
            });

            /**
             * PAGER
             */
            rootKanbanLists.find('.ms-list-header__right .left').click(function(event){
                event.stopImmediatePropagation();
                if(self.Pagination.CurrentPage && self.Pagination.CurrentPage > 1 && self.Pagination.CurrentPage <= self.Pagination.TotalPages){
                self.Pagination.CurrentPage--;
                self.setFilters();
                owAg_kanban.reload(function(){
                    //toggleCompactItems();
                });
                }
            });
        
            rootKanbanLists.find('.ms-list-header__right .right').click(function(event){
                event.stopImmediatePropagation();
                if(self.Pagination.CurrentPage && self.Pagination.CurrentPage > 0 && self.Pagination.CurrentPage < self.Pagination.TotalPages){
                self.Pagination.CurrentPage++;
                self.setFilters();
                owAg_kanban.reload(function(){
                    //toggleCompactItems();
                });
                }
            });

            form_selector.find('.filter_keywords').keyup(function(event){
                showEnterIcon(form_selector.find('.filter_keywords'));
            });

            form_selector.find('.filter_keywords').keyup(
                debounce(function(e) {
                    e.preventDefault();
                    if (e.keyCode === 13) {
                        $('.kanban-items').empty();
                        self.root.find('.prop_filter-btn').click();
                    }
                },300)
            );

            function debounce(fn,time){
                var timerId = null;
                return function(e){
                    if(timerId)
                        return;
       
                    timerId = setTimeout(function(){
                        fn(e);
                        timerId = null;
                    },time);
                }
            }

        } catch (e) {
            console.log(e.message);
            
        }
    }

    owner_agency_filter.prototype.setFilters = function(){
        try {
            var self = this;

            this.Keywords = this.root.find('input.filter_keywords').val();
            this.SearchMode = this.root.find('select.filter_tipologia').val();

        } catch (e) {
            console.log(e.message);
        }
    }

    owner_agency_row.prototype.init = function () {
        try {
            var self = this;
            this.listerners();
        } catch (e) {
            console.log(e.message);
            
        }
    }

    owner_agency_row.prototype.listerners = function () {
        try {
            var self = this;
            
            if(!this.root)
                throw new TypeError('owner_agency_row - listeners : this.root undefined');
            
            if(!this.item || !(this.item instanceof Appartamento_Proprietario_Agenzia))
                throw new TypeError('owner_agency_row - listeners : this.item undefined');

            var root = this.root;
            var item = this.item;

            root.find('.propAg_title').click(function () {
                console.log(self);
                
                var floatingPanel = new floatingPanelV2();
                floatingPanel.root = $('section.main-layout_content .tm-floating-panel-desktop-v2');
                floatingPanel.init();
                floatingPanel.addNewSection("Generali");

                var owAg_data = new owner_agency_data();
                owAg_data.row_ui = self;
                owAg_data.floatingPanel = floatingPanel;
                owAg_data.init();

            });

        } catch (e) {
            console.log(e.message);
        }
    }

    owner_agency_row.prototype.setStructure = function () {
        try {
            var self = this;

            if(!this.item || !(this.item instanceof Appartamento_Proprietario_Agenzia))
                throw new TypeError('owner_agency.js - owner_agency_row - setStructure : this.item undefined');

            var item = this.item;
            var propAg = item.Proprietario_Agenzia;
            
            var matrix = propAg.row_matrix();

            var str = propAg_row_struct.clone();
            str.find('.propAg_title span').html(matrix.nominativo);
            str.find('.propAg_primaryEmail span').html(matrix.primaryEmail);
            str.find('.propAg_tel span').html(matrix.telefono);

            this.structure = str;
            
        } catch (e) {
            console.log(e.message);
        }
    }

    owner_agency_data.prototype.init = function () {
        try {
            var self = this;

            if(!this.row_ui)
                throw new TypeError("owner_agency_data - init : this.row_ui undefined!");

            if(!this.floatingPanel)
            throw new TypeError("owner_agency_data - init : this.floatingPanel undefined!");

            this.loadStructure();
            this.loadElements();

        } catch (e) {
            console.log(e.message);
        }
    }

    owner_agency_data.prototype.setHeader = function () {
        try {
            var self = this;

            if(!this.floatingPanel)
                throw new TypeError("owner_agency_data - setHeader - this.floatingPanel undefined");

            var floatingPanel = this.floatingPanel;
            var header = floatingPanel.rootHeader;
            var row_ui = this.row_ui;
            var apt_owAg = row_ui.item;
            var owAg = apt_owAg.Proprietario_Agenzia;

            console.log(owAg);

            if(owAg && parseInt(owAg.Id) === 0){
                header.find('.tm-transaction-properties-header__title .tm-editable-textarea .tm-editable-textarea__content').html("Aggiungi nuovo");
            }else{
                var owAg_nominativo = owAg.row_matrix().nominativo;
                header.find('.tm-transaction-properties-header__title .tm-editable-textarea .tm-editable-textarea__content').html(owAg_nominativo);
            }

        } catch (e) {
            console.log(e.message);
        }
    }

    owner_agency_data.prototype.loadStructure = function () {
        try {
            var self = this;

            var scrollbar = this.floatingPanel.root.find('.tm-property-tabs__content .tm-transaction-properties-pane.tm-hack-scrollbar');
            var structure = $('<div class="kanban-item ms-list-wide__kanban-item"><div class="tm-list-item"></div></div>');

            scrollbar.append(structure.clone());

            this.setHeader();

        } catch (e) {
            console.log(e.message);
            
        }
    }

    owner_agency_data.prototype.loadElements = function () {
        try {
            var self = this;

            var row_ui = this.row_ui;
            var apt_owAg = row_ui.item;
            var owAg = apt_owAg.Proprietario_Agenzia;
            var scrollbar = this.floatingPanel.root.find('.tm-property-tabs__content .tm-transaction-properties-pane.tm-hack-scrollbar .kanban-item.ms-list-wide__kanban-item .tm-list-item');

            //Caricamento Anagrafica completa di OwAg
            var anagrafica = new owner_agency_anagrafica();
            anagrafica.item = owAg;
            anagrafica.root = scrollbar;
            anagrafica.init();

            //Caricamento Appartamento_OwAg
            var appartamenti = new prop_owAg();
            appartamenti.root = scrollbar;
            appartamenti.owner_agency = owAg;
            appartamenti.init();

        } catch (e) {
            console.log(e.message);
            
        }
    }

    owner_agency_anagrafica.prototype.init = function () {
        try {
            var self = this;

            if(!this.item)
                throw new TypeError('owner_agency_anagrafica - init : this.item undefined!');

            if(!this.root)
                throw new TypeError('owner_agency_anagrafica - init : this.root undefined!');

            var root = this.root;
            var item = this.item;        
            this.setData();
            this.setListeners();

        } catch (e) {
            console.log(e.message);
        }
    }

    owner_agency_anagrafica.prototype.setData = function() {
        try {
            var self = this;

            if(!this.item)
                throw new TypeError('owner_agency_anagrafica - setData : this.item undefined!');

            if(!this.root)
                throw new TypeError('owner_agency_anagrafica - setData : this.root undefined!');

            var root = this.root;
            var item = this.item;        
            var data_card_struct = $('<div class="data_card_title">Anagrafica</div><div class="data_card data_card-anagrafica"><div class="data_card-row"><div class="data_card-row__field" data-card-field="Nome"><div class="card_field__header">Nome</div><div class="card_field__body"><span></span><input></div></div><div class="data_card-row__field" data-card-field="Cognome"><div class="card_field__header">Cognome</div><div class="card_field__body"><span></span><input></div></div></div><div class="data_card-row"><div class="data_card-row__field" data-card-field="RagioneSociale"><div class="card_field__header">Ragione Sociale</div><div class="card_field__body"><span></span><input></div></div></div><div class="data_card-row"><div class="data_card-row__field" data-card-field="Telefono"><div class="card_field__header">Telefono</div><div class="card_field__body"><span></span><input></div></div></div><div class="data_card-row"><div class="data_card-row__field" data-card-field="PrimaryEmail"><div class="card_field__header">Email Primaria</div><div class="card_field__body"><span></span><input></div></div><div class="data_card-row__field" data-card-field="SecondaryEmail"><div class="card_field__header">Email Secondaria</div><div class="card_field__body"><span></span><input></div></div></div><div class="data_card-row"><div class="data_card-row__field" data-card-field="Newsletter"><div class="card_field__header">Newsletter</div><div class="card_field__body"><span></span><select><option value="1" selected="selected">Attivo</option><option value="0">Non attivo</option></select></div></div><div class="data_card-row__field" data-card-field="Type"><div class="card_field__header">Tipologia</div><div class="card_field__body"><span></span><select><option value="1" selected="selected">Proprietario</option><option value="2">Agenzia</option><option value="3">Broker</option></select></div></div></div><div class="data_card-row"><div class="data_card-row__field" data-card-field="CodiceFiscale"><div class="card_field__header">Codice Fiscale</div><div class="card_field__body"><span></span><input></div></div><div class="data_card-row__field" data-card-field="PartitaIva"><div class="card_field__header">Partita Iva</div><div class="card_field__body"><span></span><input></div></div></div><div class="data_card-row"><div class="data_card-row__field" data-card-field="Indirizzo"><div class="card_field__header">Indirizzo</div><div class="card_field__body"><span></span><input></div></div></div><div class="data_card-row"><div class="data_card-row__field" data-card-field="Civico"><div class="card_field__header">Civico</div><div class="card_field__body"><span></span><input></div></div><div class="data_card-row__field" data-card-field="Citta"><div class="card_field__header">Città</div><div class="card_field__body"><span></span><input></div></div><div class="data_card-row__field" data-card-field="CAP"><div class="card_field__header">CAP</div><div class="card_field__body"><span></span><input></div></div><div class="data_card-row__field" data-card-field="Stato"><div class="card_field__header">Regione</div><div class="card_field__body"><span></span><input></div></div></div><div class="data_card-row"><div class="data_card-row__field" data-card-field="Paese"><div class="card_field__header">Paese</div><div class="card_field__body"><span></span><input></div></div><div class="data_card-row__field" data-card-field="Paese_Sigla_ISO3166_2"><div class="card_field__header">Paese Sigla</div><div class="card_field__body"><span></span><input></div></div></div><div class="data_card-row"><div class="data_card-row__field" data-card-field="CodiceDestinatario"><div class="card_field__header">Codice Destinatario</div><div class="card_field__body"><span></span><input></div></div><div class="data_card-row__field" data-card-field="PecDestinatario"><div class="card_field__header">PEC</div><div class="card_field__body"><span></span><input></div></div></div></div>');
            root.append(data_card_struct.clone());
            var card = root.find('.data_card.data_card-anagrafica');

            for (var property in item) {
                switch (property) {
                    case "Newsletter":
                        var text = "Attivo";

                        if(parseInt(item[property]) === 0)
                            text = "Non attivo";

                            card.find('[data-card-field="' + property + '"] .card_field__body select').val(item[property]);
                        card.find('[data-card-field="' + property + '"] .card_field__body span').append(text);
                        break;
                    case "Type":
                        var text = "Proprietario";

                        if(parseInt(item[property]) === 2){
                            text = "Agenzia";
                        }else if (parseInt(item[property]) === 3) {
                            text = "Broker";
                        }

                        card.find('[data-card-field="' + property + '"] .card_field__body select').val(item[property]);
                        card.find('[data-card-field="' + property + '"] .card_field__body span').append(text);
                        break;
                    default:
                        card.find('[data-card-field="' + property + '"] .card_field__body span').append(ifNull(item[property]));
                        break;
                }
            }

            function ifNull(val) {
                if (val) {
                    return val;
                } else {
                    return "-";
                }
            }

        } catch (e) {
            console.log(e.message);
        }
    }

    owner_agency_anagrafica.prototype.setListeners = function() {
        try {
            var self = this;

            if(!this.item)
                throw new TypeError('owner_agency_anagrafica - setListeners : this.item undefined!');

            if(!this.root)
                throw new TypeError('owner_agency_anagrafica - setListeners : this.root undefined!');

            var root = this.root;
            var item = this.item;   

            for (var property in item) {
                var field = new owner_agency_anagrafica_field();
                field.item = item;
                field.property = property;
                field.root = root;
                field.init();
            } 

        } catch (e) {
            console.log(e.message);
        }
    }

    owner_agency_anagrafica_field.prototype.init = function () {
        try {
            var self = this;
            
            this.setListeners();
        } catch (e) {
            console.log(e.message);
        }
    }

    owner_agency_anagrafica_field.prototype.setListeners = function () {
        try {
            var self = this;

            if(!this.item)
                throw new TypeError('owner_agency_anagrafica_field - setListeners : this.item undefined!');

            if(!this.property)
                throw new TypeError('owner_agency_anagrafica_field - setListeners : this.property undefined!');
            
            var root = this.root;
            var card = root.find('.data_card.data_card-anagrafica');
            var item = this.item;
            var property = this.property;

            card.find('[data-card-field="' + property + '"]').click(function () {
                var selector = $(this);
                hasPrivileges(function () {
                    var span = selector.find('span');
                    var input = selector.find('input');
                    var span_val = span.html();

                    if(span_val === "-")
                        span_val = "";

                    switch (property) {
                        case "Newsletter":
                        case "Type":
                            var select = selector.find("select");
                            
                            if(!select.is(':visible')){
                                select.toggleClass('active-field');
                                span.toggle();
                                select.toggle();
                            }
                            break;
                        default:
                            if(!input.is(':visible')){
                                input.toggleClass('active-field');
                                span.toggle();
                                input.toggle().focus().val(span_val);
                            }else{
                                input.focus();
                            }
                            break;
                    }
                }, true);
            });

            switch (property) {
                case "Newsletter":
                    card.find('[data-card-field="' + property + '"] select').change(function () {
                        var select_val = $(this).val();
                        var text = "Attivo";
                        item[property] = select_val;
                        

                        if(parseInt(item[property]) === 0)
                            text = "Non attivo";

                        $(this).parent().find('span').html(text).toggle();
                        $(this).toggle().toggleClass('active-field');

                        self.save(function(success, sms) {
                            if(success){
                                //Ombra temporanea in verde. Molto veloce.
                                card.css("box-shadow", "rgba(110, 255, 0, 0.15) 0px 7px 17px 10px");
                                owAg_kanban.reload(function(){
                                    //owAg_manager.setBtmPanelUnder();
                                    //toggleCompactItems();
                                });
                                setTimeout(function(){ 
                                    card.css("box-shadow", "rgba(0, 0, 0, 0.15) 0px 2px 10px");
                                }, 1000);
                            }else{
                                //Ombra temporanea in rosso. Mostre un messaggio.
                                if(sms && parseInt(item.Id) > 0)
                                    alert(sms);
                                card.css("box-shadow", "rgba(236, 0, 0, 0.15) 0px 2px 17px 10px");
                                setTimeout(function(){ 
                                    card.css("box-shadow", "rgba(0, 0, 0, 0.15) 0px 2px 10px");
                                }, 1000);
                            }
                        });

                    });
                    break;
                case "Type":
                        card.find('[data-card-field="' + property + '"] select').change(function () {
                            var select_val = $(this).val();
                            var text = "Proprietario";
                            item[property] = select_val;
                            
    
                            if(parseInt(item[property]) === 2){
                                text = "Agenzia";
                            }else if (parseInt(item[property]) === 3) {
                                text = "Broker";
                            }
                                
                            $(this).parent().find('span').html(text).toggle();
                            $(this).toggle().toggleClass('active-field');
    
                            self.save(function(success, sms) {
                                if(success){
                                    //Ombra temporanea in verde. Molto veloce.
                                    card.css("box-shadow", "rgba(110, 255, 0, 0.15) 0px 7px 17px 10px");
                                    owAg_kanban.reload(function(){
                                        //owAg_manager.setBtmPanelUnder();
                                        //toggleCompactItems();
                                    });
                                    setTimeout(function(){ 
                                        card.css("box-shadow", "rgba(0, 0, 0, 0.15) 0px 2px 10px");
                                    }, 1000);
                                }else{
                                    //Ombra temporanea in rosso. Mostre un messaggio.
                                    if(sms && parseInt(item.Id) > 0)
                                        alert(sms);
                                    card.css("box-shadow", "rgba(236, 0, 0, 0.15) 0px 2px 17px 10px");
                                    setTimeout(function(){ 
                                        card.css("box-shadow", "rgba(0, 0, 0, 0.15) 0px 2px 10px");
                                    }, 1000);
                                }
                            });
    
                        });
                        break;
            }

            card.find('[data-card-field="' + property + '"] input').keydown(function () {
                var keyCode = event.keyCode;
                var input = $(this);

                if (keyCode === 13) {

                    if(parseInt(item.Id) > 0){
                        var span = input.parent().find('span');
                        var input_val = input.val();

                        if(!input_val || input_val === "")
                            input_val = "-";

                        input.focusout();
                        span.html(input_val).toggle();

                        if(input_val === "-")
                            input_val = null;

                        input.toggle();
                        input.toggleClass('active-field');
                        item[property] = input_val;

                        self.save(function(success, sms) {
                            if(success){
                                //Ombra temporanea in verde. Molto veloce.
                                card.css("box-shadow", "rgba(110, 255, 0, 0.15) 0px 7px 17px 10px");
                                owAg_kanban.reload(function(){
                                    //owAg_manager.setBtmPanelUnder();
                                    //toggleCompactItems();
                                });
                                setTimeout(function(){ 
                                    card.css("box-shadow", "rgba(0, 0, 0, 0.15) 0px 2px 10px");
                                }, 1000);
                            }else{
                                //Ombra temporanea in rosso. Mostre un messaggio.
                                if(sms && parseInt(item.Id) > 0)
                                    alert(sms);
                                card.css("box-shadow", "rgba(236, 0, 0, 0.15) 0px 2px 17px 10px");
                                setTimeout(function(){ 
                                    card.css("box-shadow", "rgba(0, 0, 0, 0.15) 0px 2px 10px");
                                }, 1000);
                            }
                        });
                    }else{
                        card.find(" input.active-field").each(function (index) {
                            input = $(this);
                            property = input.parent().parent().attr("data-card-field");
                            
                            var span = input.parent().find('span');
                            var input_val = input.val();

                            if(!input_val || input_val === "")
                                input_val = "-";

                            input.focusout();
                            span.html(input_val).toggle();

                            if(input_val === "-")
                                input_val = null;

                            input.toggle();
                            input.toggleClass('active-field');
                            item[property] = input_val;

                            self.save(function(success, sms) {
                                if(success){
                                    //Ombra temporanea in verde. Molto veloce.
                                    card.css("box-shadow", "rgba(110, 255, 0, 0.15) 0px 7px 17px 10px");
                                    owAg_kanban.reload(function(){
                                        //owAg_manager.setBtmPanelUnder();
                                        //toggleCompactItems();
                                    });
                                    setTimeout(function(){ 
                                        card.css("box-shadow", "rgba(0, 0, 0, 0.15) 0px 2px 10px");
                                    }, 1000);
                                }else{
                                    //Ombra temporanea in rosso. Mostre un messaggio.
                                    if(sms && parseInt(item.Id) > 0)
                                        alert(sms);
                                    card.css("box-shadow", "rgba(236, 0, 0, 0.15) 0px 2px 17px 10px");
                                    setTimeout(function(){ 
                                        card.css("box-shadow", "rgba(0, 0, 0, 0.15) 0px 2px 10px");
                                    }, 1000);
                                }
                            });


                        });
                    }
                }
            
            });

        } catch (e) {
            console.log(e.message);
        }
    }

    owner_agency_anagrafica_field.prototype.save = function (callback) {
        try {
            var self = this;

            if(!this.item)
                throw new TypeError("owner_agency_anagrafica_field - save : this.item undefined");

            if(!callback)
            throw new TypeError("owner_agency_anagrafica_field - save : callback undefined");
            
            var item = this.item;
            var errors = 0;

            if(!ifNull(item.PrimaryEmail))
                errors++;

            if(!ifNull(item.RagioneSociale) && (!ifNull(item.Cognome) || !ifNull(item.Nome)))
                errors++;

            if(!ifNull(item.Indirizzo) || !ifNull(item.Civico) || !ifNull(item.Citta) || !ifNull(item.CAP) || !ifNull(item.Stato) || !ifNull(item.Paese) || !ifNull(item.Paese_Sigla_ISO3166_2))
                errors++;

            if(errors === 0){
                item.Save(function(success, message) {
                    callback(success, message);
                });
            }else{
                callback(false, "Nessun salvataggio. I campi come Email, Nominativo e Indirizzo sono obbligatori.");
            }
            

            function ifNull(val) {
                var success = false;

                if(val && val !== "")
                    success = true;

                return success;
            }

        } catch (e) {
            console.log(e.message);
        }
    }

    prop_owAg.prototype.init = function () {
        try {
            var self = this;
            var root = this.root;

            this.loadStructure();
            this.loadElements(null, function () {
                root.find('[data-card-field="Search"] input').attr("data-status", "unblocked");
                self.onlyActive();
            });

            hasPrivileges(function () {
                self.setListeners();
            }, false);

        } catch (e) {
            console.log(e.message);
        }
    }

    prop_owAg.prototype.loadStructure = function () {
        try {
            var self = this;

            var root = this.root;
            var card_struct = $('<div class="data_card_title">Appartamenti</div><div class="data_card data_card-apt"><div class="data_card-row"><div class="data_card-row__field" data-status="bho" data-card-field="Search"><div class="card_field__body"><input placeholder="Cerca appartamento..."></div></div></div><div class="data_card-row__aptContainer"></div></div>');
            root.append(card_struct.clone());

        } catch (e) {
            console.log(e.message);
        }
    }

    prop_owAg.prototype.loadElements = function (keyword, callback) {
        try {
            var self = this;

            if(!callback)
                throw new TypeError("prop_owAg - loadElements : callback undefined!");

            var root = this.root;
            var aptRoot = root.find('.data_card-apt .data_card-row__aptContainer');
            aptRoot.empty();

            if(root.find('[data-card-field="Search"] input').attr("data-status") !== "blocked"){
                root.find('[data-card-field="Search"] input').attr("data-status", "blocked");
                this.Search(function (apts, rel) {
                    for (let i = 0; i < apts.length; i++) {
                        const apt = apts[i];
                        var row = new prop_owAg_row();
                        row.parentRoot = aptRoot;
                        row.item = apt;
                        row.isActive = isActive(apt, rel);
                        row.owner_agency = self.owner_agency;
                        row.init();
                    }
                    callback();
                });
            }

            function isActive(apt, rel) {
                var active = false;
                
                if(rel && rel.length > 0 && apt){
                    for (index = 0; index < rel.length; index++) {
                        var el = rel[index];
                        if(parseInt(apt.Id) === parseInt(el.IdAppartamento)){
                            active = true;
                        }
                    }
                }

                return active;
            }

        } catch (e) {
            console.log(e.message);
        }
    }

    prop_owAg.prototype.Search = function (callback) {
        try {
            var self = this;

            var owner_agency = this.owner_agency;
            var clone = encodeURIComponent(CircularJSON.stringify(owner_agency));
            var data_apts = new Array();
            var data_rels = new Array();

            $.ajax({
                method: "POST",
                url: '?action=load-prop-owner-agency',
                data: { data : clone },
            }).done(function(res){
      
              if(res && res.apts && res.apts.length > 0){
                data_apts = res.apts;
              }

              if(res && res.rel && res.rel.length > 0){
                data_rels = res.rel;
              }
      
              if(callback){
                  callback(data_apts, data_rels);
              }
            }).fail(function(xhr, status, error) {
              DefaultErrorHandler(xhr, status, error);
            });

        } catch (e) {
            console.log(e.message);
        }
    }

    prop_owAg.prototype.setListeners = function () {
        try {
            var self = this;

            var root = this.root;

            root.find('[data-card-field="Search"] input').keyup(function () {
                var input = $(this);
                var keyword = input.val();
                
                self.loadElements(keyword, function () {
                    root.find('[data-card-field="Search"] input').attr("data-status", "unblocked");
                    self.onlyByKeyword(keyword);
                });
            });

        } catch (e) {
            console.log(e.message);
        }
    }

    prop_owAg.prototype.onlyByKeyword = function (keyword) {
        try {
            var self = this;

            var root = this.root;
            var text = keyword.toLowerCase();

            root.find( "div.data_card-row__aptContainer div.data_card-row__aptContainer-row" ).each(function( index ) {
                $(this).hide();
            });
            
            root.find('div.data_card-row__aptContainer div.data_card-row__aptContainer-row').each(function(){
                if($(this).find('span').text().toLowerCase().indexOf(""+ text +"") != -1 ){
                    $(this).show();
                }
            });
            
        } catch (e) {
            console.log(e.message);
        }
    }

    prop_owAg.prototype.onlyActive = function () {
        try {
            var self = this;

            var root = this.root;

            root.find( "div.data_card-row__aptContainer div.data_card-row__aptContainer-row" ).each(function( index ) {
                $(this).hide();
            });
            
            root.find('div.data_card-row__aptContainer div.data_card-row__aptContainer-row').each(function(){
                if($(this).hasClass("active_row")){
                    $(this).show();
                }
            });
            
        } catch (e) {
            console.log(e.message);
        }
    }

    prop_owAg_row.prototype.init = function () {
        try {
            var self = this;

            this.setStructure();
            this.setListeners();

        } catch (e) {
            console.log(e.message);
        }
    }

    prop_owAg_row.prototype.setStructure = function () {
        try {
            var self = this;
            
            var str = $('<div class="data_card-row__aptContainer-row"><i class="far fa-circle" ></i><span></span></div>');
            this.structure = str.clone();
            var item = this.item;

            this.structure.attr("data-rowId", item.Id);
            this.structure.find('span').html(item.Nominativo);
            this.parentRoot.append(this.structure);

            if (this.isActive) {
                this.structure.find("i").removeClass("far").addClass("fas");
                this.structure.addClass("active_row");
            }

        } catch (e) {
            console.log(e.message);
        }
    }

    prop_owAg_row.prototype.setListeners = function () {
        try {
            var self = this;
            var parentRoot = this.parentRoot.parent();

            self.structure.click(function () {
                hasPrivileges(function () {
                    self.save(function (success) {
                        if(success){
                            parentRoot.css("box-shadow", "rgba(110, 255, 0, 0.15) 0px 7px 17px 10px");
                            setTimeout(function(){ 
                                parentRoot.css("box-shadow", "rgba(0, 0, 0, 0.15) 0px 2px 10px");
                            }, 1000);
                        }else{
                            parentRoot.css("box-shadow", "rgba(236, 0, 0, 0.15) 0px 2px 17px 10px");
                            setTimeout(function(){ 
                                parentRoot.css("box-shadow", "rgba(0, 0, 0, 0.15) 0px 2px 10px");
                            }, 1000);
                        }
    
                        if(self.isActive){
                            self.structure.find("i").removeClass("far").addClass("fas");
                        }else{
                            self.structure.find("i").removeClass("fas").addClass("far");
                        }
                    });
                }, true);
            });

        } catch (e) {
            console.log(e.message);
        }
    }

    prop_owAg_row.prototype.save = function (callback) {
        try {
            var self = this;
            var success = false;

            var data = {
                owAg : self.owner_agency,
                item : self.item,
                isActive : self.isActive
            }

            var clone = encodeURIComponent(CircularJSON.stringify(data));

            $.ajax({
                method: "POST",
                url: '?action=save',
                data: { data : clone },
            }).done(function(res){
      
              if(res && res.success){
                  success = true;
                  if(self.isActive){
                    self.isActive = false;
                  }else{
                    self.isActive = true;
                  }
              }
      
              if(callback){
                  callback(success);
              }
            }).fail(function(xhr, status, error) {
              DefaultErrorHandler(xhr, status, error);
            });

        } catch (e) {
            console.log(e.message);
            
        }
    }

})();