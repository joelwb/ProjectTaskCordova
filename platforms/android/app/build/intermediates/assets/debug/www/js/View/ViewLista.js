function ViewLista() {
    layout = 
    '<nav class="navbar sticky-top navbar-dark bg-dark">' +
        '<a class="navbar-brand mr-auto" href="#">ProjectTask</a>' +
        '<button type="button" id="buttonAdd" class="btn btn-outline-light">Add</button>' +
    '</nav>' +
    '<div data-type="lista" class="container my-3">' +
    '<p class="lead text-center mb-3">Listas de Tarefas</p>'+
    '<ul id="listaItem" class="list-group mb-3"></ul>' +
    '<div class="row" style="padding-bottom:50px;">'+
        '<input type="text" class="form-control d-none" id="inputNovaLista" aria-describedby="inputNovaListaHelp" placeholder="Informe o nome da Lista">' +
    '</div>'+    
    '<div class="m-3 row fixed-bottom">' +
        '<div id="optNovoItem" class="d-none ml-auto">' +
            '<button id="btnCancelar" type="button" class="btn btn-danger">Cancelar</button>' +
            '<button id="btnSalvar" type="button" class="ml-2 btn btn-primary">Salvar</button>' +
        '</div>' +
    '</div>';

    $("body").html(layout);

    listaItem = $("#listaItem");
    buttonAdd = $("#buttonAdd");
    optNovoItem = $("#optNovoItem");
    inputNovoItem = $("#inputNovaLista");
    btnCancelar = $("#btnCancelar");
    btnSalvar = $("#btnSalvar");

    buttonAdd.click(this.onAddButtonClick);
    btnCancelar.click(this.closeInput);
    btnSalvar.click(this.salvarItem);

    new ListaDAO().loadAll(ViewLista.prototype.addOnScreen);
}

ViewLista.prototype.onAddButtonClick = function() {
    if (optNovoItem.hasClass("d-none")) {
        optNovoItem.toggleClass("d-none");
        inputNovoItem.toggleClass("d-none");
        inputNovoItem.focus();
        window.scrollTo(0,document.body.scrollHeight);
    }
}

ViewLista.prototype.closeInput = function() {
    inputNovoItem.val("");
    inputNovoItem.addClass("d-none");
    optNovoItem.addClass("d-none");
}


ViewLista.prototype.salvarItem = function() {
    var nome = inputNovoItem.val();
    if (nome === "") return;

    var listaModel = new Lista(null,nome);
    new ListaDAO().add(listaModel,ViewLista.prototype.addOnScreen);
}

ViewLista.prototype.renderItem = function (ListaModel) {
    novoItem = Mustache.render(
        '<li name="lista" data-id="{{id}}" class="list-group-item">' +
            '<p class="d-inline">{{nome}}</p>' +
            '<button type="button" class="close" aria-label="Close">'+
                '<span aria-hidden="true">&times;</span>'+
            '</button>'+
        '</li>',
        ListaModel);

    listaItem.append(novoItem);
    
    return listaItem.children().last()
}

ViewLista.prototype.addItemClick = function(item) {
    item.click(function () {
        var id = item.data("id");
        var nome = item.children().first().text();

        $("body").empty();
        var viewTarefa = new ViewTarefa(new Lista(id,nome));
    })
}

ViewLista.prototype.addOnScreen = function(listaModel){
    var novoItem = ViewLista.prototype.renderItem(listaModel); 

    ViewLista.prototype.addItemClick(novoItem);
    ViewLista.prototype.closeInput();
}