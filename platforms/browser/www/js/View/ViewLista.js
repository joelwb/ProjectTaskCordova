function ViewLista() {
    this.layout = 
    '<nav class="navbar sticky-top shadow navbar-dark bg-dark">' +
        '<span class="glyphicons glyphicons-arrow-left"></span>'+
        '<a class="navbar-brand mr-auto" href="#">ProjectTask</a>' +
        '<button type="button" id="buttonAdd" class="btn btn-outline-light">Add</button>' +
    '</nav>' +
    '<div class="container my-3">' +
    '<p class="lead text-center mb-3">Listas de Tarefas</p>'+
    
    '<ul id="listaItem" class="list-group mb-3"></ul>' +
    '<div class="row m-1" style="padding-bottom:50px;">'+
        '<input type="text" class="form-control d-none" id="inputNovaLista" aria-describedby="inputNovaListaHelp" placeholder="Informe o nome da Lista">' +
    '</div>'+    
    '<div class="m-3 row fixed-bottom">' +
        '<div id="optNovoItem" class="d-none ml-auto">' +
            '<button id="btnCancelar" type="button" class="btn btn-danger">Cancelar</button>' +
            '<button id="btnSalvar" type="button" class="ml-2 btn btn-primary">Salvar</button>' +
        '</div>' +
    '</div>';

    this.buildScreen();

    this.listaItem = $("#listaItem");
    this.buttonAdd = $("#buttonAdd");
    this.optNovoItem = $("#optNovoItem");
    this.inputNovoItem = $("#inputNovaLista");
    this.btnCancelar = $("#btnCancelar");
    this.btnSalvar = $("#btnSalvar");

    this.addListeners();
    new ListaDAO().loadAll(this.onLoadAll.bind(this));
}

ViewLista.prototype.buildScreen = function(){
    $("body").html(this.layout);
}

ViewLista.prototype.addListeners = function(){
    this.buttonAdd.click(this.onAddButtonClick.bind(this));
    this.btnCancelar.click(this.closeInput.bind(this));
    this.btnSalvar.click(this.salvarItem.bind(this));
}

ViewLista.prototype.onAddButtonClick = function() {
    if (this.optNovoItem.hasClass("d-none")) {
        this.optNovoItem.toggleClass("d-none");
        this.inputNovoItem.toggleClass("d-none");
        this.inputNovoItem.focus();
        window.scrollTo(0,document.body.scrollHeight);
    }
}

ViewLista.prototype.closeInput = function() {
    this.inputNovoItem.val("");
    this.inputNovoItem.addClass("d-none");
    this.optNovoItem.addClass("d-none");
}

ViewLista.prototype.salvarItem = function() {
    var nome = this.inputNovoItem.val();
    if (nome === "") return;

    var listaModel = new Lista(null,nome);
    new ListaDAO().add(listaModel,this.renderItem.bind(this));
    this.closeInput();
}

ViewLista.prototype.renderItem = function (ListaModel) {
    var novoItem = Mustache.render(
        '<li name="lista" data-id="{{id}}" class="list-group-item clicavel">' +
            '<label class="m-0">{{nome}}</label>' +
            '<button type="button" class="close" aria-label="Close">'+
                '<span aria-hidden="true">&times;</span>'+
            '</button>'+
        '</li>',
        ListaModel);

    this.listaItem.append(novoItem);
    this.addItemClick(this.listaItem.children().last());
}

ViewLista.prototype.addItemClick = function(item) {
    item.click(function () {
        var id = item.data("id");
        var nome = item.children().first().text();

        $("body").empty();
        var viewTarefa = new ViewTarefa(new Lista(id,nome));
    });

    item.children("button").click((function(event){
        var id = item.data("id");
        var nome = item.children().first().text();

        new ListaDAO().delete(new Lista(id,nome), this.onDelete);
        event.stopPropagation();
    }).bind(this));
}

ViewLista.prototype.onLoadAll = function(listas){
    listas.forEach(lista => {
        var novoItem = this.renderItem(lista); 
    });
}

ViewLista.prototype.onDelete = function(lista){
    $("[name='lista'][data-id='"+lista.id+"']").remove();
}