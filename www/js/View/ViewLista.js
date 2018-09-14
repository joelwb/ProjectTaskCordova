function ViewLista() {
    layout = 
    '<nav class="navbar navbar-dark bg-dark">' +
        '<a class="navbar-brand mr-auto" href="#">ProjectTask</a>' +
        '<button type="button" id="buttonAdd" class="btn btn-outline-light">Add</button>' +
    '</nav>' +
    '<div data-type="lista" class="container">' +
    '<ul id="listaItem" class="list-group my-3"></ul>' +
    '<input type="text" class="form-control d-none" id="inputNovaLista" aria-describedby="inputNovaListaHelp" placeholder="Informe o nome da Lista">' +
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
}

ViewLista.prototype.onAddButtonClick = function() {
    if (optNovoItem.hasClass("d-none")) {
        optNovoItem.toggleClass("d-none");
        inputNovoItem.toggleClass("d-none");
    }
}

ViewLista.prototype.closeInput = function() {
    inputNovoItem.val("");
    inputNovoItem.toggleClass("d-none");
    optNovoItem.toggleClass("d-none");
}


ViewLista.prototype.salvarItem = function() {
    var valor = inputNovoItem.val();
    if (valor === "") return;

    var listaModel = new Lista(valor);
    var novoItem = ViewLista.prototype.addItem(listaModel); 

    ViewLista.prototype.addItemClick(novoItem);
    ViewLista.prototype.closeInput();
}

ViewLista.prototype.addItem = function (ListaModel) {
    novoItem = Mustache.render(
        '<li name="lista" data-id="{{id}}" class="list-group-item">' +
            '{{nome}}' +
        '</li>',
        ListaModel);

    listaItem.append(novoItem);
    
    return listaItem.last();
}

ViewLista.prototype.addItemClick = function(item) {
    item.click(function () {
        $("body").empty();

        var id = item.data("id");
        var viewTarefa = new ViewTarefa();
    })
}