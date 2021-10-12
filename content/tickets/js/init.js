function tickets_ui(rootKanbanLists, section, admin) {
    this.rootKanbanLists = rootKanbanLists;
    this.section = section;
    this.admin = admin;
    this.defaultSection = 1;
}

(function () {
    
    function appSection(selector, number, linkName) {
        this.selector = selector;
        this.number = number;
        this.linkName = linkName;
    }

    var tk_ui = new tickets_ui();

    tickets_ui.prototype.init = function () {
        var self = this;
        var linkString = window.location.href;
        var splittedLink = linkString.split('#/')[1];
        this.rootKanbanLists = $("section.main-layout_content > section > div > div.sub-layout__content > section > section > div > div.fixed-header-layout__contents > div > section > div");

        this.createSections();

        if(splittedLink){
            var section = this.getSectionByLinkName(splittedLink);
            if(section && section.selector)
                section.selector.click();
        }else{
            this.setDefaultSection();
        }

    }

    tickets_ui.prototype.setDefaultSection = function(){
        try {
            var self = this;

            if(!this.defaultSection)
            throw new TypeError('tickets_ui - setDefaultSection : this.defaultSection undefined!');

            var section = this.getSectionByNumber(this.defaultSection);
            var prevLink = window.location.href;

            if(prevLink.endsWith('/')){
                window.location.href = URL_HOST + '_gestione/tickets/#/' + section.linkName;
                section.selector.click();
            }else{
                window.location.href = URL_HOST + '_gestione/tickets/#/' + section.linkName;
            }

        } catch (e) {
            console.log(e.message);
        }
    }

    tickets_ui.prototype.getSectionByNumber = function(sectionNumber){
        try {
            var self = this;

            if(!sectionNumber)
            throw new TypeError('tickets_ui - getSectionByNumber : sectionNumber undefined!');

            if(!this.sections || !(this.sections.length > 0))
            throw new TypeError('tickets_ui - getSectionByNumber : sections undefined!');

            var res = null;

            for (var i = 0; i < this.sections.length; i++) {
            var section = this.sections[i];
            if(sectionNumber === section.number){
                res = section;
            }
            }

            return res;
        } catch (e) {
            console.log(e.message);
        }
    }

    tickets_ui.prototype.getSectionByLinkName = function(linkName){
        try {
            var self = this;

            if(!linkName)
            throw new TypeError('tickets_ui - getSectionByLinkName : linkName undefined!');

            if(!this.sections || !(this.sections.length > 0))
            throw new TypeError('tickets_ui - getSectionByLinkName : sections undefined!');

            var res = null;
            var splittedLink = linkName.split('/')[0];

            for (var i = 0; i < this.sections.length; i++) {
                var section = this.sections[i];
                if(splittedLink === section.linkName){
                    res = section;
                }
            }

            return res;
        } catch (e) {
            console.log(e.message);
        }
    }

    tickets_ui.prototype.getPrivileges = function(accessToken){
        try {
            var self = this;

            if(!accessToken)
            throw new TypeError('tickets_ui - getPrivileges : accessToken undefined');

            switch (parseInt(accessToken)) {
            case 1:
                return function(callback){

                if(!callback)
                    throw new TypeError('tickets_ui - getPrivileges : callback undefined');

                var admin = new Admin();
                admin.Load(function (){
                    self.admin = admin;
                    if(admin.isAdministrator() || admin.isContabile() || admin.isAgente() || admin.canReadInvoices() || admin.isDataEntry() || admin.recuperoCrediti() || admin.isFornitore()){
                        callback(true);
                    }else{
                        callback(false);
                    }
                });
                };
                break;
            }

        } catch (e) {
            console.log(e.message);
        }
    }

    tickets_ui.prototype.addSection = function(section){
        try {
            var self = this;

            if(!section || !(section instanceof appSection))
            throw new TypeError('tickets_ui - addSection : section undefined!');

            section.number = this.sections.length + 1;
            this.sections.push(section);

        } catch (e) {
            console.log(e.message);
        }
    }

    tickets_ui.prototype.createSections = function(){
        try {
            var self = this;
            var root_section = 'section.main-layout_content > section > div > div.sub-layout__header > div > div.project-header__center >';
            this.sections = new Array();

            var allTickets = new appSection();
            allTickets.selector = $(root_section + 'a:nth-child(1)');
            allTickets.linkName = 'main';
            allTickets.canAccess = this.getPrivileges(1);
            allTickets.openSection = function(){
                var tabAllTickets = new sec_allTickets();
                tabAllTickets.sectionNumber = allTickets.number;
                tabAllTickets.sectionName = allTickets.linkName;
                tabAllTickets.tickets_ui = tk_ui;
                tabAllTickets.admin = tk_ui.admin;
                tabAllTickets.init();
            }
            allTickets.init();

            this.addSection(allTickets);

        } catch (e) {
            console.log(e.message);
        }
    }

    tickets_ui.prototype.setActiveStatusSectionByNumber = function(sectionNumber){
        try {
            var self = this;

            if(!sectionNumber)
            throw new TypeError('tickets_ui - setActiveStatusSectionByNumber : sectionNumber undefined!');

            var section = this.getSectionByNumber(sectionNumber);

            if(!section)
            throw new TypeError('tickets_ui - setActiveStatusSectionByNumber : section undefined!');

            this.clearSelectedSection();
            section.setSectionStatus(1);

        } catch (e) {
            console.log(e.message);
        }
    }
    
    tickets_ui.prototype.clearSelectedSection = function(){
        try {
            var self = this;

            if(!this.sections || !(this.sections.length > 0))
            throw new TypeError('tickets_ui - getSectionByNumber : sections undefined!');

            for (var i = 0; i < this.sections.length; i++) {
            var section = this.sections[i];
            section.setSectionStatus(2);
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    appSection.prototype.init = function(){
        try {
            var self = this;

            if(!this.selector)
            throw new TypeError('appSection - init : selector undefined');

            if(!this.canAccess)
            throw new TypeError('appSection - init : canAccess undefined');

            this.listener();
        } catch (e) {
            console.log(e.message);
        }
    }

    appSection.prototype.listener = function(){
        try {
            var self = this;

            if(!this.selector)
            throw new TypeError('appSection - listener : selector undefined');

            if(!this.canAccess)
            throw new TypeError('appSection - listener : canAccess undefined');

            if(!this.openSection)
            throw new TypeError('appSection - listener : openSection undefined');

            var selector = this.selector;

            selector.click(function(event){
                self.canAccess(function(canAccess){
                    if(canAccess){
                    self.openSection();
                    }else{
                    self.accessDenied();
                    }
                });
            });

        } catch (e) {
            console.log(e.message);
        }
    }

    appSection.prototype.accessDenied = function(){
        alert("Non hai i permessi per accedere a questa sezione!");
    }

    appSection.prototype.setSectionStatus = function(status){
        try {
            var self = this;

            if(!status)
            throw new TypeError('appSection - setSectionStatus : status undefined!');

            var className = "section_selected";
            var selector = this.selector;

            switch (parseInt(status)) {
            case 1:
                selector.find('span').addClass(className);
                break;
            case 2:
                selector.find('span').removeClass(className);
                break;
            }

        } catch (e) {
            console.log(e.message);
        }
    }

    $(document).ready( function() {
        tk_ui.init();
    });

})();