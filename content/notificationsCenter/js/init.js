(function(){

  function ActionPanel(root){
    this.root = root;
    this.SendEmailsBtn;
    this.ini = function(){
      this.SendEmailsBtn = new SendEmailsBtn(".actions-panel__send-email-button", this.root, "Invia (0)");
      this.SendEmailsBtn.ini();
    }
  }

  function SendEmailsBtn(root, parentRoot, title){
    this.root = root;
    this.parentRoot = parentRoot;
    this.title = title;
    this.getParentRoot = $(parentRoot);
  }

  SendEmailsBtn.prototype.getRoot = function(){ return this.getParentRoot.find(this.root); };

  SendEmailsBtn.prototype.getContent = function(callback){
    var content = $('<div class="actions-panel__send-email-button"><button type="button" tabindex="-1" class="tm-button sizeLarge fill"><div><span class="tm-button__text">' + this.title + '</span></div></button></div><div class="tm-panel__spacer"></div>');

    if (callback) {
      callback(content);
    }
  };

  SendEmailsBtn.prototype.setTitle = function(newTitle){
    if (newTitle) {
      this.getRoot().find('.tm-button__text').html(newTitle);
    }
  };

  SendEmailsBtn.prototype.setContent = function(content){
    if (content) {
      this.getParentRoot.html(content);
    }
  };

  SendEmailsBtn.prototype.textUpdate = function(){
    try {
      if(!tableResult)
        throw new TypeError('SendEmailsBtn - textUpdate : tableResult undefined');
      var text = 'Invia (' + tableResult.Emails.length + ')';
      console.log(text);
      this.setTitle(text);
    } catch (e) {
      console.log(e.message);
    }
  };

  SendEmailsBtn.prototype.textSendingEmails = function(inviate){
    try {
      if(!tableResult)
        throw new TypeError('SendEmailsBtn - textSendingEmails : tableResult undefined');
      var totMails = tableResult.Emails.length;
      var percentuale = Math.floor((inviate / totMails) * 100);
      var text = 'Completamento al ' + percentuale + '%';
      console.log(text);
      this.setTitle(text);
    } catch (e) {
      console.log(e.message);
    }
  };

  SendEmailsBtn.prototype.ini = function(){
    var self = this;

    this.getContent(function(content){
      self.setContent(content);

      self.getParentRoot.click(function(){
        try {
          if (!tableResult || !tableResult.Emails)
            throw new TypeError('SendEmailsBtn - ini : Error evaluating function parameter data');
          if (tableResult.Emails.length > 0) {
            bootbox.confirm("Inviare " + tableResult.Emails.length + " emails? ", function(result) {
              if (result) {
                var sendingError = new Array();
                var correctlySent = new Array();
                var tot = tableResult.Emails.length - 1;
                var mails = tableResult.Emails;

                var missingErrors = function(){
                  if((sendingError.length + correctlySent.length) === mails.length){
                    console.log(sendingError);
                    console.log(correctlySent);
                    Emails = sendingError;

                    if(correctlySent.length > 0){
                      var sent = "Sono state inviate " + correctlySent.length + " emails";
                    }

                    if(sendingError.length > 0){
                      var errors = "Errore : " + sendingError.length + " emails non inviate";
                    }

                    var textAlert = "";
                    textAlert = sent ? sent : "";
                    textAlert += (errors && sent) ? "<br>" : "";
                    textAlert += errors ? errors : "";

                    bootbox.alert(textAlert);

                    var report = new Mail();
                    report.setReport(textAlert, "#report - Sono state inviate nuove emails");
                    report.Send(function(){

                    });

                    tableResult.Emails = Emails;
                    pagination.setTotalRows(tableResult.Emails.length);
                    pagination.setTotalPages();
                    self.textUpdate();
                    tableResult.update(function(){

                    });
                  }
                }

                each(mails, function(key, row, index){

                  try {
                    if(!row || !row.HTMLContent)
                      throw new TypeError('SendEmailsBtn - ini : row inside loop is undefined');

                    row.HTMLContent.setDefaultUi();
                    // 1st Promise : BEGIN
                    var getInvoiceHTMLContent = new Promise(function(resolve, reject){
                      if (row.HTMLContent.ts_docF.Intestatario && !row.HTMLContent.ts_docF.Intestatario.Intestatario){
                        row.HTMLContent.ts_docF.Intestatario.LoadRelationship(function(){
                          row.HTMLContent.getInvoiceHTMLContent(function(html){
                            if (html && html instanceof TypeError) {
                              reject(row);
                            }else{
                              resolve(html);
                            }
                          });
                        });
                      }else{
                        row.HTMLContent.getInvoiceHTMLContent(function(html){
                          /*var win = window.open("", "Title", "");
                          win.document.body.innerHTML = html;*/
                          if (html && html instanceof TypeError) {
                            reject(row);
                          }else{
                            resolve(html);
                          }
                        });
                      }

                    });

                    getInvoiceHTMLContent.then(function(html) {
                      var mail = new Mail();
                      mail.init();
                      mail.setNoReplyCustomers();
                      mail.Content = html;
                      //2nd Promise : BEGIN
                      var setMailDefaultValues = new Promise(function(resolve, reject){
                        row.HTMLContent.setMailDefaultValues(mail, function(err){
                          if (err && err instanceof TypeError) {
                            reject(row);
                          }else{
                            resolve();
                          }
                        });
                      });

                      setMailDefaultValues.then(function() {
                        if (row.HTMLContent.ts_docF.DocumentoFiscale) {
                          var invoicePdf = new PDF();
                          var tsDoc_Pdf = new TSDOC_PDF(row.HTMLContent.ts_docF, invoicePdf);

                          var setPdf = new Promise(function(resolve, reject){
                            tsDoc_Pdf.setPDF(function(err){
                              if(err && err instanceof TypeError){
                                reject(row);
                                console.log(index);
                              }else{
                                tsDoc_Pdf.pdf.getBase64(function(base64){
                                  if (base64) {
                                    var att = new Attachment();
                                    att.File = base64;
                                    tsDoc_Pdf.getFileTitle(function(title){
                                      try {
                                        if (title && title instanceof TypeError)
                                          throw title;
                                        att.Title = title;
                                      } catch (e) {
                                        reject(row);
                                      }
                                    });
                                    mail.Attachment = att;
                                    mail.Send(function(suc){
                                      if (suc && suc.Success){
                                        resolve(row);
                                        console.log(index);
                                      }else{
                                        reject(row);
                                        console.log(index);
                                      }
                                    });
                                  }else {
                                    console.log("Errore : base64");
                                  }
                                });
                              }

                            });

                          });

                          setPdf.then(function(el) {
                            correctlySent.push(el);
                            self.textSendingEmails(correctlySent.length);
                            missingErrors();
                          }, function(el) {
                            sendingError.push(el);
                            missingErrors();
                          });

                        }else{
                          var send = new Promise(function(resolve, reject){
                            mail.Send(function(suc){
                              if (suc && suc.Success){
                                resolve(row);
                              }else{
                                reject(row);
                              }
                            });
                          });

                          send.then(function(el) {
                            correctlySent.push(el);
                            self.textSendingEmails(correctlySent.length);
                            missingErrors();
                          }, function(el) {
                            sendingError.push(el);
                            missingErrors();
                          });

                        }
                      }, function(el) {
                        sendingError.push(el);
                        missingErrors();
                      });
                      //2nd Promise : END

                    }, function(el) {
                      sendingError.push(el);
                      missingErrors();
                    });
                    // 1st Promise : END
                  } catch (e) {
                    console.log(e.message);
                  }
                });

              }
            });
          }else {
            bootbox.alert("Nessuna mail presente!");
          }
        } catch (e) {
          console.log(e.message);
        }
      });

    });
  };

  function BoxFilter(root){
    this.root = root;
    this.DropDownSelection;/*Persone, Fatture*/
    /*Fatture: Tipologia, Inquilini: Anagrafica/Appartamento*/
    /*Fatture: DataFattura, Inquilini: DataLocazione*/
    this.PeopleFilter;
    this.InvoiceFilter;
    this.RequestBtn;
    this.getRoot = $(this.root);
    this.getFilters = function(){ return this.getRoot.find('.box-filter__header-filters'); };
    this.getContent = function(callback){
      var content = $('<div class="box-filter__header"><span class="tm-dropdown-selection"></span><div class="box-filter__header-filters"></div><div class="tm-panel__spacer"></div><div class="actions-panel__request-button"></div></div><div class="box-filter__footer"></div>');

      if (callback) {
        callback(content);
      }
    };
    this.clearContent = function(){
      this.getFilters().empty();
    };
    this.setFilter = function(){
      if (this.DropDownSelection.getInputValue() === "people") {
        this.clearContent();
        //this.PeopleFilter.setFilter();
        console.log("PEOPLE : In progress...");
      } else if (this.DropDownSelection.getInputValue() === "invoices") {
        this.clearContent();
        this.InvoiceFilter = new InvoiceFilter(this.getFilters());
        this.InvoiceFilter.ini();
      }
    };
    this.sendRequest = function(){
      var self = this;
      if (this.DropDownSelection.getInputValue() === "people") {

      } else if (this.DropDownSelection.getInputValue() === "invoices") {
        if (!this.InvoiceFilter.noValues()) {
          var fatture = new Fattura();
          fatture.SearchPreview(this.InvoiceFilter.getObjectRequest(), function(data){
            //Creazione UI risultati della ricerca. Saranno oggetti di tipo Filter_InvoiceRows
            var res = new Filter_InvoiceRows('.box-filter__footer', self.root, data, self.InvoiceFilter);
            res.ini();
          });

        } else {
          bootbox.alert("Non è stato rilevato alcun filtro! Per favore, riprovare di nuovo.");
        }
      }
    };
    this.setContent = function(content, callback){
      if (content) {
        this.getRoot.html(content);
        if (callback) {
          callback();
        }
      }
    };
    this.setDefaultFilter = function(){
      this.DropDownSelection.setInputValue("invoices");
      this.setFilter();
    }
    this.ini = function(callback){
      var self = this;
      this.getContent(function(content){
        if(content){
          self.setContent(content, function(){
            //initialization obj
            self.DropDownSelection = new DropDownSelection(".tm-dropdown-selection", self.root);
            self.DropDownSelection.ini();
            self.DropDownSelection.getInput().change(function() {
              self.setFilter();
            });
            self.RequestBtn = new RequestBtn(".actions-panel__request-button", self.root);
            self.RequestBtn.ini(function(){
              self.RequestBtn.getRoot().click(function() {
                self.sendRequest();
              });
            });

            if (callback) {
              callback();
            }
          });
        }
      });
    }
  }

  function Filter_InvoiceRows(root, parentRoot, Results, InvoiceFilter){
    this.root = root;
    this.parentRoot = parentRoot;
    this.Results = Results;
    this.InvoiceFilter = InvoiceFilter;
    this.getParentRoot = $(parentRoot);
    this.getRoot = function(){ return this.getParentRoot.find(this.root); };
    this.getContent = function(callback){
      var self = this;
      var content = $('<div></div>');

      //body
      var body = {
        c : $('<div class="tm-result-movimento"><div class="tm-result-movimento__movimento-color"></div><div class="tm-result-movimento__movimento-content"></div></div>'),
        getRootContent : function(){
          return this.c.find('.tm-result-movimento__movimento-content');
        },
        setContent : function(content){
          if(content){
            this.getRootContent().html(content);
          }
        },
        appendContent : function(content){
          if(content){
            this.getRootContent().append(content);
          }
        },
        getContent : function(){
          return this.c;
        }
      }
      //header
      var header = {
        title : self.Results.riepilogo,
        getContent : function(){
          var c = $('<div class="tm-result-movimento__movimento-content__movimento-top-row"><div class="tm-result-movimento__movimento-content__movimento-top-row__movimento-details-left">' + this.title + '</div><div class="tm-result-movimento__movimento-content__movimento-top-row__movimento-details-right"></div></div>');

          return c;
        }
      };
      body.appendContent(header.getContent());

      //footer
      if (this.Results.count > 0) {
        var footer = {
          getContent : function(){
            var c = $('<div class="tm-result-movimento__movimento-content__movimento-bottom-row"></div>');
            this.getRowsResults(c);
            return c;
          },
          getRowsResults : function(el){

            if (self.Results.tipologie.length > 0 && el) {
              var tipologie = self.Results.tipologie;
              for (var key in tipologie) {
                var title = tipologie[key].Titolo;
                var count = tipologie[key].Totale;
                var r = $('<div class="tm-result-movimento__movimento-content__movimento-bottom-row__title" style="flex: none;width: auto;">' + title + '</div><div class="tm-result-movimento__movimento-content__movimento-bottom-row__importo" style="margin-right : 10px"><i class="tm-icon tm-icon-importo"></i><div class="tm-result-movimento__importo-text">' + count + '</div></div>');
                el.append(r);
              }
            }
          }
        }
        body.appendContent(footer.getContent());

      }

      if (callback) {
        callback(body.getContent());
      }
    };
    this.setContent = function(content){
      if (content) {
        this.getRoot().html(content);
      }
    }
    this.ini = function(){
      var self = this;

      this.getContent(function(content){
        self.setContent(content);

        self.getRoot().off().click(function(event) {
          event.stopPropagation();
          var fatture = new Fattura();
          fatture.Search(self.InvoiceFilter.getObjectRequest(), function(data){
            //Creazione UI risultati della ricerca. Saranno oggetti di tipo DraftEmail_Table
            if (data && data.length > 0) {
              for (var index in data) {
                var ts = $.extend(new Intestatario(), data[index].Intestatario);
                ts.Linking();
                var docF = $.extend(new DocumentoFiscale(), data[index].DocumentoFiscale);
                docF.Linking();

                var ts_docF = new Intestatario_DocumentoFiscale(ts, docF);
                var mailContent = new HTMLContent("", "", ts_docF);
                var htmlContentUi = new HTMLContentUi(mailContent);
                Emails.push(htmlContentUi);
              }
              actionsPanel.SendEmailsBtn.textUpdate();
              console.log(Emails);
              tableResult.Load(function(){
                console.log("Ok");
              });
            }
          });
        });
      });
    }
  }

  function DropDownSelection(root, parentRoot){
    this.root = root;
    this.parentRoot = parentRoot;
    this.getParentRoot = $(parentRoot);
    this.getRoot = function(){ return this.getParentRoot.find(this.root); };
    this.getInput = function(){ return this.getRoot().find('select'); };
    this.getInputValue = function(){
      return this.getInput().val();
    };
    this.setInputValue = function(value){
      if (value) {
        this.getInput().val(value);
      }
    }
    this.getContent = function(callback){
      var content = $('<select class="tm-dropdown-selection__select"><option value="invoices">Fatture</option><option value="people">Persone</option></select>');

      if (callback) {
        callback(content);
      }
    };
    this.setContent = function(content){
      if (content) {
        this.getRoot().html(content);
      }
    };
    this.ini = function(){
      var self = this;
      this.getContent(function(content){
        self.setContent(content);
        /*self.getInput().change(function(event) {
        });*/
      });
    }
  }

  function RequestBtn(root, parentRoot){
    this.root = root;
    this.parentRoot = parentRoot;
    this.getParentRoot = $(parentRoot);
    this.getRoot = function(){ return this.getParentRoot.find(this.root); };
    this.getContent = function(callback){
      var content = $('<button type="button" tabindex="-1" class="tm-button sizeLarge fill" style="background-color: #5cb85c;border-color: #4cae4c;"><div><span class="tm-button__text">Cerca</span></div></button>');

      if (callback) {
        callback(content);
      }
    };
    this.setContent = function(content, callback){
      if (content) {
        this.getRoot().html(content);
        if (callback) {
          callback();
        }
      }
    };
    this.ini = function(callback){
      var self = this;
      this.getContent(function(content){
        self.setContent(content, function(){
          if (callback) {
            callback();
          }
        });
      });
    };
  }

  function PeopleFilter(Termine, Periodo, CheckBox, Pagination){
    this.Termine = Termine;
    this.Periodo = Periodo;
    this.CheckBox = CheckBox;
    this.Pagination = Pagination;
    /**
     * [setFilter Inserimento contenuto HTML sul DOM]
     */
    this.setFilter = function(){

    };
    this.Request = function(){

    };
    this.ini = function(){

    }
  }

  function InvoiceFilter(parentRoot, Termine, Periodo, SendOrNot, Pagination){
    this.parentRoot = parentRoot;
    this.Termine = Termine;
    this.Periodo = Periodo;
    this.SendOrNot = SendOrNot;
    this.Pagination = Pagination;
    this.getParentRoot = $(this.parentRoot);
    this.getObjectRequest = function(){
      var fatture = new Fattura();
      var tipologie = fatture.getTipologieFromText(this.Termine.getInputValue());
      var filter = { Tipologie : tipologie, Termine : this.Termine.getInputValue(), Periodo : this.Periodo.getObjectRequest(), SendOrNot : this.SendOrNot.getValue() };

      return filter;
    }
    this.getChildrenRoutes = function(callback){
      var content = $('<div></div>');
      var termine = $('<div class="global-search box-filter_panel first" style="margin-top: 0px;margin-left: 18px;background-color: #ffffff;border-left: 1px solid #2798d0;"><i class="search-icon"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></i><input name="globalSearch" type="text" class="form-control" aria-label="..." placeholder=""><i class="counter"></i></div>');
      var period = $('<div class="tm-period-filter" style="margin-left: 18px;"><div class="advanced-search-filters-header">Filtro per data fatturazione</div><div class="tm-period-filter__from" style="margin-bottom: 10px;"><input name="data-inizio" type="text" class="flatpickr form-control data-inizio flatpickr-input" aria-describedby="sizing-addon1" data-allow-input="true"></div><div class="tm-period-filter__to"><input type="text" class="flatpickr form-control data-fine flatpickr-input" aria-describedby="sizing-addon1" data-allow-input="true"></div></div>');
      var sendOrNot = $('<div class="advanced-search-filters box-filter_panel" style=" margin-left: 45px; "> <div class="advanced-search-filters-header no-header"></div> <div class="advanced-search-filters_filter checkbox-top"> <label class="tm-radio-button"> <div class="tm-radio-button__radio"> <div class="tm-radio-button__radio-inside"></div> </div> <div class="tm-radio-button__label">Inviate</div> </label> </div> <div class="advanced-search-filters_filter checkbox-bottom"> <label class="tm-radio-button"> <div class="tm-radio-button__radio"> <div class="tm-radio-button__radio-inside"></div> </div> <div class="tm-radio-button__label">Non inviate</div> </label> </div> </div>');
      content.append(termine);
      content.append(period);
      content.append(sendOrNot);
      if (callback) {
        callback(content.html());
      }
    };
    this.noValues = function(){
      var bool = false;

      if (this.Termine.noValues() && this.Periodo.noValues()) {
        bool = true;
      }else{
        /*var fatture = new Fattura();
        var tipologie = fatture.getTipologieFromText(this.Termine.getInputValue());
        if (!tipologie || tipologie.length <= 0) {
          bool = true;
        }*/
      }

      return bool;
    }
    /**
     * [setFilter Inserimento contenuto HTML sul DOM]
     */
    this.setFilter = function(callback){
      var self = this;
      this.getChildrenRoutes(function(content){
        self.getParentRoot.html(content);
        if (callback) {
          callback();
        }
      });
    };
    this.Request = function(){

    };
    this.ini = function(){
      var self = this;
      this.setFilter(function(){
        self.Termine = new Filter_Termine(".global-search", self.parentRoot);
        self.Termine.ini(function(){
          self.Termine.setPlaceHolder("Locazione, Chiusura ecc...");
        });
        self.Periodo = new Filter_Periodo(".tm-period-filter", self.parentRoot);
        self.Periodo.ini();

        self.SendOrNot = new Filter_SendOrNOt(self.parentRoot);
        self.SendOrNot.ini();

      });
    }
  }

  function Filter_Termine(root, parentRoot){
    this.root = root;
    this.parentRoot = parentRoot;
    this.getParentRoot = $(this.parentRoot);
    this.getRoot = function(){ return this.getParentRoot.find(this.root); };
    this.getInput = function(){ return this.getRoot().find('input'); };
    this.getInputValue = function(){ return this.getInput().val(); }
    this.noValues = function(){
      var bool = false;

      if (!this.getInputValue() || this.getInputValue() === "") {
        bool = true;
      }

      return bool;
    };
    this.setPlaceHolder = function(text){
      if (text) {
        this.getInput().attr("placeholder", text);
      }
    }
    this.ini = function(callback){
      if (callback) {
        callback();
      }
    };
  }

  function Filter_SendOrNOt(parentRoot){
    this.parentRoot = parentRoot;
    this.getParentRoot = $(this.parentRoot);
  }

  (function(){

    var self = null;
    var checkboxTop, checkboxBottom;

    Filter_SendOrNOt.prototype.ini = function(){
      self = this;

      checkboxTop = {
        root : self.getParentRoot.find(".checkbox-top"),
        boxRoot : self.getParentRoot.find('.checkbox-top .tm-radio-button__radio')
      }

      checkboxBottom = {
        root : self.getParentRoot.find(".checkbox-bottom"),
        boxRoot : self.getParentRoot.find('.checkbox-bottom .tm-radio-button__radio')
      }

      checkboxTop.root.click(function(){
        console.log(self.getValue());
        switch (parseInt(self.getValue())) {
          case 0:
            self.fillCheckbox(checkboxTop.boxRoot);
            break;
          case 1:
           self.EmptyColor();
           break;
          case 2:
          self.SwitchColor();
           break;
        }
      });

      checkboxBottom.root.click(function(){
        console.log(self.getValue());
        switch (parseInt(self.getValue())) {
          case 0:
            self.fillCheckbox(checkboxBottom.boxRoot);
            break;
          case 1:
           self.SwitchColor();
           break;
          case 2:
          self.EmptyColor();
           break;
        }
      });

    };

    Filter_SendOrNOt.prototype.fillCheckbox = function(selector){
      try {
        if(!selector)
          throw new TypeError('Filter_SendOrNOt - fillCheckbox : selector undefined!');

        selector.css("background-color", "#464c59");
      } catch (e) {
        console.log(e.message);
      }
    };

    Filter_SendOrNOt.prototype.getValue = function(){
      var colorA = checkboxTop.boxRoot.css("background-color");
      var colorB = checkboxBottom.boxRoot.css("background-color");
      var val = 0;

      if(colorA === "rgb(70, 76, 89)"){
        val = 1;
      }else if(colorB === "rgb(70, 76, 89)"){
        val = 2;
      }else{
        val = 0;
      }

      return val;
    }

    Filter_SendOrNOt.prototype.SwitchColor = function (){

      var colorA = checkboxTop.boxRoot.css("background-color");
      var colorB = checkboxBottom.boxRoot.css("background-color");

      if(colorA === "rgba(0, 0, 0, 0)"){
        checkboxTop.boxRoot.css("background-color", "#464c59");
        checkboxBottom.boxRoot.css("background-color", "rgba(0, 0, 0, 0)");
      }else{
        checkboxBottom.boxRoot.css("background-color", "#464c59");
        checkboxTop.boxRoot.css("background-color", "rgba(0, 0, 0, 0)");
      }
    };

    Filter_SendOrNOt.prototype.EmptyColor =function (){
      checkboxTop.boxRoot.css("background-color", "rgba(0, 0, 0, 0)");
      checkboxBottom.boxRoot.css("background-color", "rgba(0, 0, 0, 0)");
    };

  })();

  function Filter_Periodo(root, parentRoot){
    this.root = root;
    this.parentRoot = parentRoot;
    this.getParentRoot = $(this.parentRoot);
    this.getRoot = function(){ return this.getParentRoot.find(this.root); };
    this.getInizio = function(){ return this.getRoot().find('.data-inizio'); };
    this.getFine = function(){ return this.getRoot().find('.data-fine'); };
    this.getObjectRequest = function(){
      var inizio = toDate(this.getInizio().selector);
      var fine = toDate(this.getFine().selector);
      var filter = { Inizio : this.getInizioValue() !== "" ? inizio.yyyymmdd() : null, Fine : this.getFineValue() !== "" ? fine.yyyymmdd() : null };

      return filter;
    }
    this.setInizioPlaceHolder = function(text){
      if (text) {
        this.getInizio().attr("placeholder", text);
      }
    };
    this.getInizioValue = function(){ return this.getInizio().val(); };
    this.getFineValue = function(){ return this.getFine().val(); };
    this.setInizioValue = function(value){
      if (value && value !== "") {
        this.getInizio().val(value);
      }
    };
    this.setFineValue = function(value){
      if (value && value !== "") {
        this.getFine().val(value);
      }
    };
    this.setEmptyInizioValue = function(){
      this.getInizio().val("");
    };
    this.setEmptyFineValue = function(){
      this.getFine().val("");
    };
    this.noValues = function(){
      var bool = false;

      if ((!this.getInizioValue() || this.getInizioValue() === "") && (!this.getFineValue() || this.getFineValue() === "")) {
        bool = true;
      }

      return bool;
    }
    this.ini = function(){
      var self = this;
      this.getInizio().flatpickr({
          dateFormat: 'd/m/Y',
          onChange: function(dateObj, dateStr, instance) {
              //self.Periodo.setInizio(dateObj.yyyymmdd());
          }
      });
      this.getFine().flatpickr({
          dateFormat: 'd/m/Y',
          onChange: function(dateObj, dateStr, instance) {
              //self.Periodo.setFine(dateObj.yyyymmdd());
          }
      });

      this.getInizio().change(function (){
          if(self.getInizio() && validateDDMMYYYY(self.getInizio().val())){
              var date  = toDate(self.getInizio().selector);
              //self.Periodo.setInizio(date.yyyymmdd());
          }else{
              //self.Periodo.setInizio(null);
              self.setEmptyInizioValue();
          }
      });

      this.getFine().change(function (){
          if(self.getFine() && validateDDMMYYYY(self.getFine().val())){
              var date  = toDate(self.getFine().selector);
              //self.Periodo.setFine(date.yyyymmdd());
          }else{
              //self.Periodo.setFine(null);
              self.setEmptyFineValue();
          }
      });
    };
  }

  function Pagination(TotalRows, TotalPages, CurrentPage, LimitRows){
      this.TotalRows = TotalRows;
      this.TotalPages = TotalPages;
      this.CurrentPage = CurrentPage;
      this.LimitRows = LimitRows;
  }

  Pagination.prototype.GetPagesCount = function(totalRows, limit){
    return Math.ceil(totalRows/limit);
  }
  Pagination.prototype.GetPageOffset = function(){
    var val = 0;

    if (parseInt(this.CurrentPage) > 1) {
      val = this.LimitRows * (this.CurrentPage - 1);
    }

    return val;
  }
  Pagination.prototype.setTotalRows = function (val){
      if(val){
          this.TotalRows = val;
      }else{
          this.TotalRows = 0;
      }
  };
  Pagination.prototype.setTotalPages = function (){
      this.TotalPages = this.GetPagesCount(this.TotalRows, this.LimitRows);
  };
  Pagination.prototype.setCurrentPage = function (val){
      if(val){
          this.CurrentPage = val;
      }
  };
  Pagination.prototype.setLimitRows = function (val){
      if(val){
          this.LimitRows = val;
      }
  };

  Pagination.prototype.getTextMatrix = function(){
    var tot = ((this.TotalRows - this.GetPageOffset()) > this.LimitRows) ? this.LimitRows : (this.TotalRows - this.GetPageOffset());

    return tot + " - " + this.CurrentPage + " di " + this.TotalPages;
  }

  Pagination.prototype.init = function(callback){
    var self = this;

    try {
      if (!callback)
        throw new TypeError('Pagination - init : this method needs a callback argument');
      if (!tableResult)
        throw new TypeError('Pagination - init : tableResult undefined');

      var container = $('.box-container');

      container.on("click","section button.tm-button.left", function(){
        console.log("left");

        if (self.CurrentPage > 1) {
          self.setCurrentPage(self.CurrentPage - 1);
          tableResult.update(function(){
            container.off("click","section button.tm-button.left");
          });
        }
      });

      container.on("click","section button.tm-button.right", function(){
        console.log("right");

        if(self.CurrentPage < self.TotalPages){
          self.setCurrentPage(self.CurrentPage + 1);
          tableResult.update(function(){
            container.off("click","section button.tm-button.right");
          });
        }
      });

      /*var left = $('.box-container.table-results section button.tm-button.left');
      var right = $('.box-container.table-results section button.tm-button.right');


      left.click(function(){
        console.log("left");
        if (self.CurrentPage > 1) {
          self.setCurrentPage(self.CurrentPage - 1);
          tableResult.Load(function(){

          });
        }
      });

      right.click(function(){
        console.log("right");
        if(self.CurrentPage < self.TotalPages){
          self.setCurrentPage(self.CurrentPage + 1);
          tableResult.Load(function(){

          });
        }
      });*/

      callback();
    } catch (e) {
      console.log(e.message);
    }
  }

  Pagination.prototype.Load = function(callback){
    var text = this.getTextMatrix();
    var header = $('<div class="movimento-result-panel__header"><div class="tm-pagination"><span class="tm-pagination__text">' + text + '</span>   <i class="fas fa-arrow-left left"></i><i class="fas fa-arrow-right right"></i></div></div>');

    try {
      tableResult.Selector.append(header);
      this.init(function(){
        if(callback){
          callback();
        }
      });
    } catch (e) {
      console.log(e.message);
    }
  }

  Pagination.prototype.update = function(){
    try {
      var text = this.getTextMatrix();
      var header = $('<div class="tm-pagination">' + text + '   <i class="fas fa-arrow-left left"></i><i class="fas fa-arrow-right right"></i></div>');

      //$('.box-container').find('.box-container.table-results section .movimento-result-panel__header').html(header);
      tableResult.Selector.find('.movimento-result-panel__header .tm-pagination__text').html(text);
    } catch (e) {
      console.log(e.message);
    }
  }

  function HTMLContentUi(HTMLContent, RowUi){
    this.HTMLContent = HTMLContent;
    this.RowUi = RowUi
  }

  function TableResUi(Emails, Selector){
    this.Emails = Emails;
    this.Selector = Selector;
  }

  TableResUi.prototype.remove = function(index, callback){
    var self = this;

    this.Emails.splice(index, 1);
    pagination.setTotalRows(this.Emails.length);
    pagination.setTotalPages();
    if(callback){
      callback();
    }
  }

  TableResUi.prototype.setHeader = function(callback){
    var self = this;

    try {
      if (!callback)
        throw new TypeError('TableResUi - setHeader : This method needs a callback argument');
      if (!this.Emails)
        throw new TypeError('TableResUi - setHeader : this.Emails undefined');

      var text = "Bozze presenti (" + this.Emails.length + ")";
      var headerContent = $('<div class="movimento-result-panel__body"><div class="tm-result__group"><section class="tm-result__group-header">' + text + '</section></div></div>');
      this.Selector.append(headerContent);
      callback();
    } catch (e) {
      console.log(e.message);
    }

  }

  TableResUi.prototype.updateHeader = function(){
    var self = this;
    try {
      if (!this.Emails)
        throw new TypeError('TableResUi - setHeader : this.Emails undefined');

      var text = "Bozze presenti (" + this.Emails.length + ")";
      this.Selector.find('section.tm-result__group-header').html(text);
    } catch (e) {
      console.log(e.message);
    }

  }

  TableResUi.prototype.setBody = function(callback){
    var self = this;
    var rowsContainer = this.Selector.find('.movimento-result-panel__body .tm-result__group');
    try {
      if (!callback)
        throw new TypeError('TableResUi - setBody : This method needs a callback argument');
      if (!this.Emails)
        throw new TypeError('TableResUi - setBody : this.Emails undefined');

      if (this.Emails.length > 0) {
        var emails = this.Emails;
        for (var index in emails) {
          if (index >= pagination.GetPageOffset() && index < (pagination.GetPageOffset() + pagination.LimitRows)) {
            console.log("email");
            var row = new RowUi(emails[index].HTMLContent, rowsContainer, index);
            emails[index].RowUi = row;
            row.createRow(function(){
              if (index === emails.length) {
                console.log(emails);
                callback();
              }
            });
          }
        }
      }else {
        callback();
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  TableResUi.prototype.Load = function(callback){
    var self = this;

    try {
      if (!this.Emails || !(this.Emails.length > 0))
        throw new TypeError('TableResUi - Load : Emails empty');
      if(!callback)
        throw new TypeError('TableResUi - Load : This method needs a callback argument');

      pagination.setTotalRows(this.Emails.length);
      pagination.setTotalPages();
      this.emptyTable(function(){
        pagination.Load(function(){
          self.setHeader(function(){
            self.setBody(function(){
              callback();
            });
          });
        });
      });

    } catch (e) {
      console.log(e.message);
    }

  }

  TableResUi.prototype.update = function(callback){
    var self = this;

    try {
      if (!this.Emails)
        throw new TypeError('TableResUi - Load : Emails empty');
      if(!callback)
        throw new TypeError('TableResUi - Load : This method needs a callback argument');
      this.Selector.find('.tm-result__group').remove();
      pagination.update();
      self.setHeader(function(){
        self.setBody(function(){
          callback();
        });
      });

    } catch (e) {
      console.log(e.message);
    }

  }

  TableResUi.prototype.emptyTable = function(callback){
    var self = this;
    try {
      if (!callback)
        throw new TypeError('TableResUi - emptyTable : This method needs a callback argument');
      if (!this.Selector)
        throw new TypeError('TableResUi - emptyTable : Selector undefined');

      this.Selector.empty();
      callback();
    } catch (e) {
      console.log(e.message);
    }
  }

  function RowUi(Email, Container, Ind){
    this.Email = Email;
    this.Container = Container;
    this.Index = Ind;
  }

  RowUi.prototype.getTextSelector = function(){
    return "email_" + this.Index;
  }

  RowUi.prototype.getSelector = function(){
    var slt = this.getTextSelector();
    return this.Container.find(".tm-result-movimento[data-id=" + slt + "]");
  }

  RowUi.prototype.createRow = function(callback){
    var self = this;

    try {
      if (!callback)
        throw new TypeError('RowUi - createRow : This method needs a callback argument');
      if (!this.Email)
        throw new TypeError('RowUi - createRow : this.Email undefined');

      this.pushRow(function(){
        self.init(function(){
          callback();
        });
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  RowUi.prototype.pushRow = function(callback){
    var self = this;
    //console.log(this);
    try {
      if (!callback)
        throw new TypeError('RowUi - pushRow : This method needs a callback argument');
      if (!this.Email || !(this.Email instanceof HTMLContent))
        throw new TypeError('RowUi - pushRow : this.Email undefined');
      if(!this.Email.ts_docF || !(this.Email.ts_docF instanceof Intestatario_DocumentoFiscale))
        throw new TypeError('RowUi - pushRow : Intestatario_DocumentoFiscale undefined');
      if (!this.Email.ts_docF.Intestatario || !(this.Email.ts_docF.Intestatario instanceof Intestatario))
        throw new TypeError('RowUi - pushRow : Intestatario undefined');

      var email = this.Email;
      var intestatario = email.ts_docF.Intestatario;

      intestatario.LoadRelationship(function(){
        if (!intestatario.Intestatario)
          throw new TypeError('RowUi - pushRow : Recipient undefined');

        var recipient = intestatario.Intestatario;

        var ui = $('<div class="tm-result-movimento" data-id="' + self.getTextSelector() + '"><div class="tm-result-movimento__movimento-color"></div><div class="tm-result-movimento__movimento-content"><div class="tm-result-movimento__movimento-content__movimento-top-row top-row"><div class="tm-result-movimento__movimento-content__movimento-top-row__movimento-details-left"></div><div class="tm-result-movimento__movimento-content__movimento-top-row__movimento-details-right"></div></div><div class="tm-result-movimento__movimento-content__movimento-bottom-row mid-row" style="height: auto; padding-bottom: 5px;"><div class="tm-result-movimento__movimento-content__movimento-bottom-row__title"></div><div class="tm-result-movimento__movimento-content__movimento-bottom-row__red btn-trash" title="Rimuovi bozza"><i class="tm-icon tm-icon-importo"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></i></div></div><div class="tm-result-movimento__movimento-content__movimento-top-row bottom-row"><div class="tm-result-movimento__movimento-content__movimento-top-row__movimento-details-left"></div><div class="tm-result-movimento__movimento-content__movimento-top-row__movimento-details-right"></div></div></div></div>');

        ui.find('.top-row .tm-result-movimento__movimento-content__movimento-top-row__movimento-details-left').append(recipient.getNominativo());
        ui.find('.top-row .tm-result-movimento__movimento-content__movimento-top-row__movimento-details-right').append(recipient.getPrimaryEmail());

        if(email.ts_docF.DocumentoFiscale && email.ts_docF.DocumentoFiscale instanceof DocumentoFiscale && email.ts_docF.DocumentoFiscale.Documento && email.ts_docF.DocumentoFiscale.Documento instanceof Fattura){
          var docF = email.ts_docF.DocumentoFiscale;
          var invoice = docF.Documento;
          var emailLog_text = '';

          if(docF.LastEmailLog && docF.LastEmailLog instanceof EmailLogs && docF.LastEmailLog.DataRegistrazione){
            var lastEmailLog = docF.LastEmailLog;
            var dataRegistrazione = new Date(lastEmailLog.DataRegistrazione);

            emailLog_text = '<br><div class="emailLog" style="color : #ffa61d">Ultimo invio il : <strong>' + dataRegistrazione.itaFormat() + '</strong><div>';
          }

          invoice.LoadFD(function(){
            invoice.LoadComponenti(function(){
              var bottomLeftRow = ui.find('.bottom-row .tm-result-movimento__movimento-content__movimento-top-row__movimento-details-left');
              var bottomRightRow = ui.find('.bottom-row .tm-result-movimento__movimento-content__movimento-top-row__movimento-details-right');
              var textType = "";

              var dataFattura = new Date(invoice.Data);
              var body = $('<div class="tm-result-movimento__movimento-content__movimento-top-row"><div class="tm-result-movimento__movimento-content__movimento-top-row__movimento-details-left"></div><div class="tm-result-movimento__movimento-content__movimento-top-row__movimento-details-right"></div></div><div class="scrollbar-list"><div class="tm-list tm-hack-scrollbar" style="min-height: 50px;max-height: 126px;width: 100% !important;height: auto !important;"></div></div>');
              body.find('.tm-result-movimento__movimento-content__movimento-top-row__movimento-details-left').html('<div>Fattura n.<strong>' + invoice.Numero + ' del ' + dataFattura.ddmmyyyy() + '</strong>' + emailLog_text + '</div>');
              body.find('.tm-result-movimento__movimento-content__movimento-top-row__movimento-details-right').html('<div>' + invoice.getTitle_Societa() + '<br>Totale Fatturato : ' + invoice.getTotaleMatrix() + '</div>');

              var scrollbar = body.find('div.tm-hack-scrollbar');
              var fds = invoice.FatturaDettagli.FatturaDettagli;

              for (var fd in fds) {
                var matrix = fds[fd].getPDFMatrix();
                var row = $('<div class="tm-list-item" data-item-index=""><div class="tm-input-row"><div class="tm-input-row__left"><div class="tm-input-row__info"><div class="tm-simple"><div class="tm-simple__text"></div></div></div></div><div class="tm-input-row__right"><i class="tm-icon tm-icon-pen ax-edit-button"></i></div></div></div>');

                row.find('.tm-simple').html(matrix.Title);
                row.find('.tm-input-row__right').append(matrix.Amount);

                scrollbar.append(row);
              }

              var fcs = invoice.Fattura_Componenti.Fattura_Componenti;

              for (var fc in fcs) {
                var matrix = fcs[fc].getPDFMatrix();
                var row = $('<div class="tm-list-item" data-item-index=""><div class="tm-input-row"><div class="tm-input-row__left"><div class="tm-input-row__info"><div class="tm-simple"><div class="tm-simple__text"></div></div></div></div><div class="tm-input-row__right"><i class="tm-icon tm-icon-pen ax-edit-button"></i></div></div></div>');

                row.find('.tm-simple').html(matrix.Title);
                row.find('.tm-input-row__right').append(matrix.Amount);

                scrollbar.append(row);
              }

              ui.find('.mid-row .tm-result-movimento__movimento-content__movimento-bottom-row__title').append(body);
              textType = invoice.titoloTipologia();

              if (textType !== "") {
                var docType = $('<div style="border-radius: 60px 60px 60px 60px;-moz-border-radius: 60px 60px 60px 60px;-webkit-border-radius: 60px 60px 60px 60px !important;border: 4px solid #00BCD4;color: #ffffff;background-color: #00BCD4;margin-right: 10px;">' + textType + '</div>');
                bottomLeftRow.append(docType);
              }

              var invoice_btn = $('<div class="tm-result-movimento__movimento-content__movimento-bottom-row__importo btn-invoice" style="color: #7c7a7a !important; font-size: 20px !important;"><i class="tm-icon tm-icon-importo" title="Modifica fattura"><span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span></i></div>');
              var download = $('<div class="tm-result-movimento__movimento-content__movimento-bottom-row__importo btn-download" style="color: #7c7a7a !important; font-size: 20px !important;"><i class="tm-icon tm-icon-importo" title="Scarica"><span class="glyphicon glyphicon-cloud-download" aria-hidden="true"></span></i></div>');
              var open = $('<div class="tm-result-movimento__movimento-content__movimento-bottom-row__importo btn-open" style="color: #7c7a7a !important; font-size: 20px !important;"><i class="tm-icon tm-icon-importo" title="Apri PDF"><span class="glyphicon glyphicon-file" aria-hidden="true"></span></i></div>');
              var print = $('<div class="tm-result-movimento__movimento-content__movimento-bottom-row__importo btn-print" style="color: #7c7a7a !important; font-size: 20px !important;"><i class="tm-icon tm-icon-importo" title="Stampa"><span class="glyphicon glyphicon-print" aria-hidden="true"></span></i></div>');

              bottomRightRow.append(invoice_btn);
              bottomRightRow.append(download);
              bottomRightRow.append(open);
              bottomRightRow.append(print);
              self.Container.append(ui);
              callback();
            });
          });
        }
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  RowUi.prototype.removeRow = function(callback){
    var self = this;

    try {
      if (!callback)
        throw new TypeError('RowUi - removeRow : This method needs a callback argument');
      if (!this.Email)
        throw new TypeError('RowUi - removeRow : this.Email undefined');

      this.getSelector().hide('slow', function(){
        self.getSelector().remove();
        callback();
      });

    } catch (e) {
      console.log(e.message);
    }
  }

  RowUi.prototype.init = function(callback){
    var self = this;

    try {
      if (!callback)
        throw new TypeError('RowUi - init : This method needs a callback argument');
      if (!this.Email)
        throw new TypeError('RowUi - init : this.Email undefined');
      if (!actionsPanel)
        throw new TypeError('RowUi - init : actionsPanel undefined');
      if (!tableResult)
        throw new TypeError('RowUi - init : tableResult undefined');
      if (!pagination)
        throw new TypeError('RowUi - init : pagination undefined');

      self.getSelector().off().click(function(event){
        event.stopPropagation();

      });
      self.getSelector().find('.btn-trash').off().click(function(event){
        event.stopPropagation();
        self.removeRow(function(){
          tableResult.remove(self.Index);
          pagination.update();
          tableResult.updateHeader();
          actionsPanel.SendEmailsBtn.textUpdate();
        });
      });

      self.getSelector().find('.btn-open').off().click(function(event){
        event.stopPropagation();
        var invoicePdf = new PDF();
        var tsDoc_Pdf = new TSDOC_PDF(self.Email.ts_docF, invoicePdf);
        tsDoc_Pdf.setPDF(function(err){
          if(err && err instanceof TypeError){
            bootbox.alert("Attenzione! Errore durante l'elaborazione del PDF. Eliminare questa bozza oppure richiedere indicazioni.");
          }else{
            tsDoc_Pdf.getFileTitle(function(title){
              try {

                if(title && title instanceof TypeError)
                  throw title;

                //tsDoc_Pdf.pdf.Open(title);
                tsDoc_Pdf.pdf.Open();

              } catch (e) {
                console.log(e.message);
              }
            });
          }
        });
      });

      self.getSelector().find('.btn-invoice').off().click(function(event){
        event.stopPropagation();
        var email = self.Email;
        var invoice = email.ts_docF.DocumentoFiscale.Documento;
        var win = window.open("../_gestione/invoicing.php?action=load&idFattura=" + invoice.Id, "_blank");
      });

      self.getSelector().find('.btn-download').off().click(function(event){
        event.stopPropagation();
        var invoicePdf = new PDF();
        var tsDoc_Pdf = new TSDOC_PDF(self.Email.ts_docF, invoicePdf);
        tsDoc_Pdf.setPDF(function(err){
          if(err && err instanceof TypeError){
            bootbox.alert("Attenzione! Errore durante l'elaborazione del PDF. Eliminare questa bozza oppure richiedere indicazioni.");
          }else{
            tsDoc_Pdf.getFileTitle(function(title){
              try {

                if(title && title instanceof TypeError)
                  throw title;

                tsDoc_Pdf.pdf.Download(title);
              } catch (e) {
                console.log(e.message);
              }
            });
          }
        });
      });

      self.getSelector().find('.btn-print').off().click(function(event){
        event.stopPropagation();
        var invoicePdf = new PDF();
        var tsDoc_Pdf = new TSDOC_PDF(self.Email.ts_docF, invoicePdf);
        tsDoc_Pdf.setPDF(function(err){

          if(err && err instanceof TypeError){
            bootbox.alert("Attenzione! Errore durante l'elaborazione del PDF. Eliminare questa bozza oppure richiedere indicazioni.");
          }else{
            tsDoc_Pdf.getFileTitle(function(title){
              try {

                if(title && title instanceof TypeError)
                  throw title;

                //tsDoc_Pdf.pdf.Print(title);
                tsDoc_Pdf.pdf.Print();

              } catch (e) {
                console.log(e.message);
              }
            });
          }
        });
      });

      callback();
    } catch (e) {
      console.log(e.message);
    }
  }

  $('.kanban-board-render .kanban-lists').append('<div class="layout__content"><div class="actions-panel box-container"></div> <div class="box-container box-filter"></div> <div class="box-container table-results"><section class="box-container_result hack-scrollbar"></section></div></div>');

  var actionsPanel = new ActionPanel(".layout__content .actions-panel");
  actionsPanel.ini();

  var boxFilter = new BoxFilter(".layout__content .box-filter");
  boxFilter.ini(function(){
    boxFilter.setDefaultFilter();
  });

  var Emails = new Array();
  var tableRoot = $('.box-container.table-results section');
  var pagination = new Pagination();
  pagination.CurrentPage = 1;
  pagination.LimitRows = 100;
  var tableResult = new TableResUi(Emails, tableRoot);

})();
