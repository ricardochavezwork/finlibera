
function TagCategories(Id, Titolo, TagCategories){
  this.Id = Id;
  this.Titolo = Titolo;
  this.TagCategories = TagCategories; //Array of TagCategories
}

TagCategories.prototype.getTitolo = function(){
  try {
    var self = this;

    if(!this.Titolo)
      throw new TypeError("TagCategories - getTitolo : this.Titolo undefined");

    var titolo = this.Titolo;

    return titolo;
  } catch (e) {
    console.log(e.message);
  }
}

TagCategories.prototype.LoadTags = function(callback){
  var self = this;

  $.ajax({
      method: "POST",
      url: ACTIONS + 'tags.php?action=loadTagCategories'
  }).done(function(res){
    console.log(res);
    if(res){
        res = $.extend(self, res.Data);
        res.Linking();
    }

    if(callback){
        callback();
    }
  }).fail(function(xhr, status, error) {
    DefaultErrorHandler(xhr, status, error);
  });
}

TagCategories.prototype.Linking = function(){
  if(this.TagCategories && this.TagCategories.length > 0){
    var tags = this.TagCategories;
    each(tags, function (key, registro, index){
        tags[key] = $.extend(new TagCategories(), tags[key]);
        //tags[key].Linking();
    });
  }
}

function TagMovimento(Id, Titolo, TagCategories, TagMovimento){
  this.Id = Id;
  this.Titolo = Titolo;
  this.TagCategories = TagCategories;
  this.TagMovimento = TagMovimento;//Array
}

TagMovimento.prototype.getTitolo = function(){
  try {
    var self = this;

    if(!this.Titolo)
      throw new TypeError("TagMovimento - getTitolo : this.Titolo undefined");

    var titolo = this.Titolo;

    if(this.TagCategories){
      titolo += " - " + this.TagCategories.getTitolo();
    }

    return titolo;
  } catch (e) {
    console.log(e.message);
  }
}

TagMovimento.prototype.getTagStructure = function(){
  try {
    var self = this;

    if(!this.Titolo)
      throw new TypeError("TagMovimento - getTagStructure : this.Titolo undefined");

    var struct = $('<div class="tm-list-item"><div class="tm-input-row"><div class="tm-input-row__left"><div class="tm-input-row__checkbox"><i class="tm-icon tm-icon-check-mark-bold -name_check-mark-bold"></i></div><div class="tm-input-row__info"><div class="tm-simple"><div class="tm-simple__text tagStyle"><span></span></div></div></div></div><div class="tm-input-row__right"></div></div></div>');
    var titolo = this.getTitolo();

    struct.find('.tm-simple__text span').html(titolo);

    return struct;
  } catch (e) {
    console.log(e.message);
  }
}

TagMovimento.prototype.Save = function(callback){
  var self = this;

  var data = { TagMovimento : self };
  var clone = encodeURIComponent(JSON.stringify(data));
  console.log(self);
  $.ajax({
      method: "POST",
      url: ACTIONS + 'tags.php?action=saveTagMovimento',
      data: { data : clone },
  }).done(function(res){
    console.log(res);
    if(res){
        res = $.extend(self, res.Data);
        res.Linking();
    }

    if(callback){
        callback();
    }
  }).fail(function(xhr, status, error) {
    DefaultErrorHandler(xhr, status, error);
  });
}

TagMovimento.prototype.Search = function(termine, callback){
  var self = this;

  if (!termine) {
    termine = "";
  }

  var data = { Termine : termine };
  var clone = encodeURIComponent(JSON.stringify(data));

  $.ajax({
      method: "POST",
      url: ACTIONS + 'tags.php?action=searchTagMovimento',
      data: { data : clone },
  }).done(function(res){
    console.log(res);
    if(res){
        res = $.extend(self, res.Data);
        res.Linking();

    }

    if(callback){
        callback();
    }
  }).fail(function(xhr, status, error) {
    DefaultErrorHandler(xhr, status, error);
  });
}

TagMovimento.prototype.LoadTags = function(callback){
  var self = this;

  $.ajax({
      method: "POST",
      url: ACTIONS + 'tags.php?action=loadTagMovimento'
  }).done(function(res){
    console.log(res);
    if(res){
        res = $.extend(self, res.Data);
        res.Linking();
    }

    if(callback){
        callback();
    }
  }).fail(function(xhr, status, error) {
    DefaultErrorHandler(xhr, status, error);
  });
}

TagMovimento.prototype.Linking = function(){
  if(this.TagMovimento && this.TagMovimento.length > 0){
    var tags = this.TagMovimento;
    each(tags, function (key, registro, index){
        tags[key] = $.extend(new TagMovimento(), tags[key]);
        tags[key].Linking();
    });
  }else if(this.TagCategories){
    this.TagCategories = $.extend(new TagCategories(), this.TagCategories);
  }
}

function TagFornitore(Id, Titolo){
  this.Id = Id;
  this.Titolo = Titolo;
}

function TagDocumentoFiscale(Id, Titolo, TagCategories, TagDocumentoFiscale){
  this.Id = Id;
  this.Titolo = Titolo;
  this.TagCategories = TagCategories;
  this.TagDocumentoFiscale = TagDocumentoFiscale;//Array
}

TagDocumentoFiscale.prototype.getTitolo = function(){
  try {
    var self = this;

    if(!this.Titolo)
      throw new TypeError("TagDocumentoFiscale - getTitolo : this.Titolo undefined");

    var titolo = this.Titolo;

    if(this.TagCategories){
      titolo += " - " + this.TagCategories.getTitolo();
    }

    return titolo;
  } catch (e) {
    console.log(e.message);
  }
}

TagDocumentoFiscale.prototype.getTagStructure = function(){
  try {
    var self = this;

    if(!this.Titolo)
      throw new TypeError("TagDocumentoFiscale - getTagStructure : this.Titolo undefined");

    var struct = $('<div class="tm-list-item"><div class="tm-input-row"><div class="tm-input-row__left"><div class="tm-input-row__checkbox"><i class="tm-icon tm-icon-check-mark-bold -name_check-mark-bold"></i></div><div class="tm-input-row__info"><div class="tm-simple"><div class="tm-simple__text tagStyle"><span></span></div></div></div></div><div class="tm-input-row__right"></div></div></div>');
    var titolo = this.getTitolo();

    struct.find('.tm-simple__text span').html(titolo);

    return struct;
  } catch (e) {
    console.log(e.message);
  }
}

TagDocumentoFiscale.prototype.Save = function(callback) {
  var self = this;
  console.log(this);
  var data = { TagDocumentoFiscale : self };
  var clone = encodeURIComponent(JSON.stringify(data));
  console.log(self);
  $.ajax({
      method: "POST",
      url: ACTIONS + 'tags.php?action=saveTagDocumentoFiscale',
      data: { data : clone },
  }).done(function(res){
    console.log(res);
    if(res){
        res = $.extend(self, res.Data);
        res.Linking();
    }

    if(callback){
        callback();
    }
  }).fail(function(xhr, status, error) {
    DefaultErrorHandler(xhr, status, error);
  });
}

TagDocumentoFiscale.prototype.Search = function(termine, callback){
  var self = this;

  if (!termine) {
    termine = "";
  }

  var data = { Termine : termine };
  var clone = encodeURIComponent(JSON.stringify(data));

  $.ajax({
      method: "POST",
      url: ACTIONS + 'tags.php?action=searchTagDocumentoFiscale',
      data: { data : clone },
  }).done(function(res){
    console.log(res);
    if(res){
        res = $.extend(self, res.Data);
        res.Linking();

    }

    if(callback){
        callback();
    }
  }).fail(function(xhr, status, error) {
    DefaultErrorHandler(xhr, status, error);
  });
}

TagDocumentoFiscale.prototype.LoadTags = function(callback){
  var self = this;

  $.ajax({
      method: "POST",
      url: ACTIONS + 'tags.php?action=loadTagDocumentoFiscale'
  }).done(function(res){
    console.log(res);
    if(res){
        res = $.extend(self, res.Data);
        res.Linking();
    }

    if(callback){
        callback();
    }
  }).fail(function(xhr, status, error) {
    DefaultErrorHandler(xhr, status, error);
  });
}

TagDocumentoFiscale.prototype.Linking = function(){
  if(this.TagDocumentoFiscale && this.TagDocumentoFiscale.length > 0){
    var tags = this.TagDocumentoFiscale;
    each(tags, function (key, registro, index){
        tags[key] = $.extend(new TagDocumentoFiscale(), tags[key]);
        tags[key].Linking();
    });
  }else if(this.TagCategories){
    this.TagCategories = $.extend(new TagCategories(), this.TagCategories);
  }
}

function TagServizio(Id, Titolo, TagCategories, TagServizio){
  this.Id = Id;
  this.Titolo = Titolo;
  this.TagCategories = TagCategories;
  this.TagServizio = TagServizio;//Array
}

TagServizio.prototype.getTitolo = function(){
  try {
    var self = this;

    if(!this.Titolo)
      throw new TypeError("TagServizio - getTitolo : this.Titolo undefined");

    var titolo = this.Titolo;

    if(this.TagCategories){
      titolo += " - " + this.TagCategories.getTitolo();
    }

    return titolo;
  } catch (e) {
    console.log(e.message);
  }
}

TagServizio.prototype.getTagStructure = function(){
  try {
    var self = this;

    if(!this.Titolo)
      throw new TypeError("TagServizio - getTagStructure : this.Titolo undefined");

    var struct = $('<div class="tm-list-item"><div class="tm-input-row"><div class="tm-input-row__left"><div class="tm-input-row__checkbox"><i class="tm-icon tm-icon-check-mark-bold -name_check-mark-bold"></i></div><div class="tm-input-row__info"><div class="tm-simple"><div class="tm-simple__text tagStyle"><span></span></div></div></div></div><div class="tm-input-row__right"></div></div></div>');
    var titolo = this.getTitolo();

    struct.find('.tm-simple__text span').html(titolo);

    return struct;
  } catch (e) {
    console.log(e.message);
  }
}

TagServizio.prototype.Save = function(callback){
  var self = this;

  var data = { TagServizio : self };
  var clone = encodeURIComponent(JSON.stringify(data));

  $.ajax({
      method: "POST",
      url: ACTIONS + 'tags.php?action=saveTagServizio',
      data: { data : clone },
  }).done(function(res){
    console.log(res);
    if(res){
        res = $.extend(self, res.Data);
        res.Linking();
    }

    if(callback){
        callback();
    }
  }).fail(function(xhr, status, error) {
    DefaultErrorHandler(xhr, status, error);
  });
}

TagServizio.prototype.Search = function(termine, callback){
  var self = this;

  if (!termine) {
    termine = "";
  }

  var data = { Termine : termine };
  var clone = encodeURIComponent(JSON.stringify(data));

  $.ajax({
      method: "POST",
      url: ACTIONS + 'tags.php?action=searchTagServizio',
      data: { data : clone },
  }).done(function(res){
    console.log(res);
    if(res){
        res = $.extend(self, res.Data);
        res.Linking();

    }

    if(callback){
        callback();
    }
  }).fail(function(xhr, status, error) {
    DefaultErrorHandler(xhr, status, error);
  });
}

TagServizio.prototype.LoadTags = function(callback){
  var self = this;

  $.ajax({
      method: "POST",
      url: ACTIONS + 'tags.php?action=loadTagServizio'
  }).done(function(res){
    console.log(res);
    if(res){
        res = $.extend(self, res.Data);
        res.Linking();
    }

    if(callback){
        callback();
    }
  }).fail(function(xhr, status, error) {
    DefaultErrorHandler(xhr, status, error);
  });
}

TagServizio.prototype.Linking = function(){
  if(this.TagServizio && this.TagServizio.length > 0){
    var tags = this.TagServizio;
    each(tags, function (key, registro, index){
        tags[key] = $.extend(new TagServizio(), tags[key]);
        tags[key].Linking();
    });
  }else if(this.TagCategories){
    this.TagCategories = $.extend(new TagCategories(), this.TagCategories);
  }
}

function TagMovimenti_TagCategories(IdTagMovimento, IdTagCategories, TagMovimento, TagCategories){
  this.IdTagMovimento = IdTagMovimento;
  this.IdTagCategories = IdTagCategories;
  this.TagMovimento = TagMovimento;
  this.TagCategories = TagCategories;
}

function RamoMovimento_TagMovimenti(IdRamoMovimento, IdMovimentoIntestatario, IdTagMovimento, Tags, RamoMovimento){
  this.IdRamoMovimento = IdRamoMovimento;
  this.IdMovimentoIntestatario = IdMovimentoIntestatario;
  this.IdTagMovimento = IdTagMovimento;
  this.Tags = Tags;
  this.RamoMovimento = RamoMovimento;
}

RamoMovimento_TagMovimenti.prototype.Linking = function(){
  if(this.RamoMovimento){
    this.RamoMovimento = $.extend(new RamoMovimento(), this.RamoMovimento);
  }

  if(this.Tags && this.Tags.length > 0){
    var tags = this.Tags;
    each(tags, function (key, registro, index){
        tags[key] = $.extend(new TagMovimento(), tags[key]);
        tags[key].Linking();
    });
  }
}

RamoMovimento_TagMovimenti.prototype.removeTag = function(tag, callback){
  try {
    var self = this;

    if(!this.Tags)
      throw new TypeError('RamoMovimento_TagMovimenti - removeTag : this.Tags');

    if(!tag)
      throw new TypeError('RamoMovimento_TagMovimenti - removeTag : tag undefined');

    console.log(tag);

    var rel = new RamoMovimento_TagMovimenti();
    rel.IdRamoMovimento = this.IdRamoMovimento;
    rel.IdMovimentoIntestatario = this.IdMovimentoIntestatario;
    rel.IdTagMovimento = tag.Id;
    var data = { RamoMovimento_TagMovimenti : rel };
    var clone = encodeURIComponent(JSON.stringify(data));

    $.ajax({
        method: "POST",
        url: ACTIONS + 'tags.php?action=deleteRamoMovimento_TagMovimenti',
        data: { data : clone },
    }).done(function(res){
      console.log(res);
      /*if(res){
          res = $.extend(self, res.data);
          res.Linking();
      }*/

      if(self.Tags.length > 0){
        for (var i = 0; i < self.Tags.length; i++) {
          var t = self.Tags[i];
          if(tag.Id && t.Id && tag.Id === t.Id){
            self.Tags.splice(i, 1);
          }
        }
      }

      if(callback){
          callback();
      }
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });

  } catch (e) {
    console.log(e.message);
  }
}

RamoMovimento_TagMovimenti.prototype.SaveRelationship = function(callback){
  try {
    var self = this;
    var data = { RamoMovimento_TagMovimenti : self };
    var clone = encodeURIComponent(JSON.stringify(data));

    $.ajax({
        method: "POST",
        url: ACTIONS + 'tags.php?action=saveRamoMovimento_TagMovimenti',
        data: { data : clone },
    }).done(function(res){
      console.log(res);
      /*if(res){
          res = $.extend(self, res.data);
          res.Linking();
      }*/

      if(callback){
          callback();
      }
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });
  } catch (e) {
    console.log(e.message);
  }
}

function MovimentoDettagli_TagMovimenti(IdMovimento, IdTagMovimento, Tags, Movimento){
  this.IdMovimento = IdMovimento;
  this.IdTagMovimento = IdTagMovimento;
  this.Tags = Tags;//TagMovimento
  this.Movimento = Movimento;
}

MovimentoDettagli_TagMovimenti.prototype.Linking = function(){
  if(this.Movimento){
    this.Movimento = $.extend(new Movimento(), this.Movimento);
  }

  if(this.Tags && this.Tags.length > 0){
    var tags = this.Tags;
    each(tags, function (key, registro, index){
        tags[key] = $.extend(new TagMovimento(), tags[key]);
        tags[key].Linking();
    });
  }
}

MovimentoDettagli_TagMovimenti.prototype.removeTag = function(tag, callback){
  try {
    var self = this;

    if(!this.Tags)
      throw new TypeError('MovimentoDettagli_TagMovimenti - removeTag : this.Tags');

    if(!tag)
      throw new TypeError('MovimentoDettagli_TagMovimenti - removeTag : tag undefined');

    console.log(tag);

    var rel = new MovimentoDettagli_TagMovimenti();
    rel.IdMovimento = this.IdMovimento;
    rel.IdTagMovimento = tag.Id;
    var data = { MovimentoDettagli_TagMovimenti : rel };
    var clone = encodeURIComponent(JSON.stringify(data));

    $.ajax({
        method: "POST",
        url: ACTIONS + 'tags.php?action=deleteMovimentiDettagli_TagMovimenti',
        data: { data : clone },
    }).done(function(res){
      console.log(res);
      /*if(res){
          res = $.extend(self, res.data);
          res.Linking();
      }*/

      if(self.Tags.length > 0){
        for (var i = 0; i < self.Tags.length; i++) {
          var t = self.Tags[i];
          if(tag.Id && t.Id && tag.Id === t.Id){
            self.Tags.splice(i, 1);
          }
        }
      }

      if(callback){
          callback();
      }
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });

  } catch (e) {
    console.log(e.message);
  }
}

MovimentoDettagli_TagMovimenti.prototype.SaveRelationship = function(callback){
  try {
    var self = this;
    var data = { MovimentoDettagli_TagMovimenti : self };
    var clone = encodeURIComponent(JSON.stringify(data));

    $.ajax({
        method: "POST",
        url: ACTIONS + 'tags.php?action=saveMovimentiDettagli_TagMovimenti',
        data: { data : clone },
    }).done(function(res){
      console.log(res);
      /*if(res){
          res = $.extend(self, res.data);
          res.Linking();
      }*/

      if(callback){
          callback();
      }
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });
  } catch (e) {
    console.log(e.message);
  }
}

function TagFornitori_TagCategories(IdTagFornitore, IdTagCategories, TagFornitore){
  this.IdTagFornitore = IdTagFornitore;
  this.IdTagCategories = IdTagCategories;
  this.TagFornitore = TagFornitore;
}

function Fornitore_TagFornitore(IdFornitore, IdTagFornitore, Tags, Fornitore){
  this.IdFornitore = IdFornitore;
  this.IdTagFornitore = IdTagFornitore;
  this.Tags = Tags;
  this.Fornitore = Fornitore;
}

function TagDocumentiFiscali_TagCategories(IdTagDocumentoFiscale, IdTagCategories, TagDocumentoFiscale){
  this.IdTagDocumentoFiscale = IdTagDocumentoFiscale;
  this.IdTagCategories = IdTagCategories;
  this.TagDocumentoFiscale = TagDocumentoFiscale;
}

function DocumentoFiscale_TagDocumentoFiscale(IdDocumentoFiscale, TipoDocumentoFiscale, IdTagDocumentoFiscale, Tags, DocumentoFiscale){
  this.IdDocumentoFiscale = IdDocumentoFiscale;
  this.TipoDocumentoFiscale = TipoDocumentoFiscale;
  this.IdTagDocumentoFiscale = IdTagDocumentoFiscale;
  this.Tags = Tags;
  this.DocumentoFiscale = DocumentoFiscale;
}

DocumentoFiscale_TagDocumentoFiscale.prototype.Linking = function(){
  if(this.DocumentoFiscale){
    this.DocumentoFiscale = $.extend(new DocumentoFiscale(), this.DocumentoFiscale);
  }

  if(this.Tags && this.Tags.length > 0){
    var tags = this.Tags;
    each(tags, function (key, registro, index){
        tags[key] = $.extend(new TagDocumentoFiscale(), tags[key]);
        tags[key].Linking();
    });
  }
}

DocumentoFiscale_TagDocumentoFiscale.prototype.removeTag = function(tag, callback){
  try {
    var self = this;

    if(!this.Tags)
      throw new TypeError('DocumentoFiscale_TagDocumentoFiscale - removeTag : this.Tags');

    if(!tag)
      throw new TypeError('DocumentoFiscale_TagDocumentoFiscale - removeTag : tag undefined');


    if(this.IdDocumentoFiscale && parseInt(this.IdDocumentoFiscale) > 0){
      var rel = new DocumentoFiscale_TagDocumentoFiscale();
      rel.IdDocumentoFiscale = this.IdDocumentoFiscale;
      rel.TipoDocumentoFiscale = this.TipoDocumentoFiscale;
      rel.IdTagDocumentoFiscale = tag.Id;
      var data = { DocumentoFiscale_TagDocumentoFiscale : rel };
      var clone = encodeURIComponent(JSON.stringify(data));

      $.ajax({
          method: "POST",
          url: ACTIONS + 'tags.php?action=deleteDocumentoFiscale_TagDocumentoFiscale',
          data: { data : clone },
      }).done(function(res){
        if(self.Tags.length > 0){
          for (var i = 0; i < self.Tags.length; i++) {
            var t = self.Tags[i];
            if(tag.Id && t.Id && tag.Id === t.Id){
              self.Tags.splice(i, 1);
            }
          }
        }

        if(callback){
            callback();
        }
      }).fail(function(xhr, status, error) {
        DefaultErrorHandler(xhr, status, error);
      });
    }else{
      if(this.Tags.length > 0){
        for (var i = 0; i < this.Tags.length; i++) {
          var t = this.Tags[i];
          if(tag.Id && t.Id && tag.Id === t.Id){
            this.Tags.splice(i, 1);
          }
        }
      }
    }
  } catch (e) {
    console.log(e.message);
  }
}

DocumentoFiscale_TagDocumentoFiscale.prototype.SaveRelationship = function(callback){
  try {
    var self = this;
    var data = { DocumentoFiscale_TagDocumentoFiscale : self };
    var clone = encodeURIComponent(JSON.stringify(data));

    $.ajax({
        method: "POST",
        url: ACTIONS + 'tags.php?action=saveDocumentoFiscale_TagDocumentoFiscale',
        data: { data : clone },
    }).done(function(res){
      console.log(res);
      /*if(res){
          res = $.extend(self, res.data);
          res.Linking();
      }*/

      if(callback){
          callback();
      }
    }).fail(function(xhr, status, error) {
      DefaultErrorHandler(xhr, status, error);
    });
  } catch (e) {
    console.log(e.message);
  }
}

function TagServizio_TagCategories(IdTagServizio, IdTagCategories, TagServizio, TagCategories){
  this.IdTagServizio = IdTagServizio;
  this.IdTagCategories = IdTagCategories;
  this.TagServizio = TagServizio;
  this.TagCategories = TagCategories
}

function Servizio_TagServizio(IdTagServizio, IdServizio, Tags, Servizio){
  this.IdTagServizio = IdTagServizio;
  this.IdServizio = IdServizio;
  this.Tags = Tags;//TagServizio
  this.Servizio = Servizio;
}

Servizio_TagServizio.prototype.Linking = function(){
  if(this.Servizio){
    this.Servizio = $.extend(new Servizio(), this.Servizio);
  }

  if(this.Tags && this.Tags.length > 0){
    var tags = this.Tags;
    each(tags, function (key, registro, index){
        tags[key] = $.extend(new TagServizio(), tags[key]);
        tags[key].Linking();
    });
  }
}

Servizio_TagServizio.prototype.removeTag = function(tag){
  try {
    var self = this;

    if(!this.Tags)
      throw new TypeError('Servizio_TagServizio - removeTag : this.Tags');

    if(!tag)
      throw new TypeError('Servizio_TagServizio - removeTag : tag undefined');


    if(this.Tags.length > 0){
      for (var i = 0; i < this.Tags.length; i++) {
        var t = this.Tags[i];
        if(tag.Id && t.Id && tag.Id === t.Id){
          this.Tags.splice(i, 1);
        }
      }
    }

  } catch (e) {
    console.log(e.message);
  }
}

function TagTicket(Id, Titolo) {
  this.Id = Id;
  this.Titolo = Titolo;
}

function TagTicket_TagCategories(IdTagCategories, IdTagServizio) {
  this.IdTagCategories = IdTagCategories;
  this.IdTagServizio = IdTagServizio;
}

function Ticket_TagTicket(IdTicket, IdTagTicket) {
  this.IdTicket = IdTicket;
  this.IdTagTicket = IdTagTicket;
}

