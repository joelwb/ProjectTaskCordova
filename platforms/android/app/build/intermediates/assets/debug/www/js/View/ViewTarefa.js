function ViewTarefa(lista) {
    layout = 
    '<nav class="navbar sticky-top navbar-dark bg-dark">' +
        '<a class="navbar-brand mr-auto" href="#">ProjectTask</a>' +
        '<button type="button" id="buttonAdd" class="btn btn-outline-light">Add</button>' +
    '</nav>' +
    '<div data-type="lista" class="container my-3">' +
    '<p class="lead text-center mb-3">Tarefas da lista "' + lista.nome+'"</p>'+
    '<ul id="listaItem" class="list-group mb-3"></ul>' +
    '<input type="text" class="form-control d-none" id="inputNovaLista" aria-describedby="inputNovaListaHelp" placeholder="Informe o nome da Tarefa">' +
    '<div class="m-3 row fixed-bottom">' +
        '<button id="btnVoltar" type="button" class="mr-auto btn btn-info">Voltar</button>' +
        '<div id="optNovoItem" class="d-none ml-auto">' +
            '<button id="btnCancelar" type="button" class="btn btn-danger">Cancelar</button>' +
            '<button id="btnSalvar" type="button" class="ml-2 btn btn-primary">Salvar</button>' +
        '</div>' +
    '</div>';

    $("body").html(layout);

    listaId = lista.id;

    listaItem = $("#listaItem");
    buttonAdd = $("#buttonAdd");
    optNovoItem = $("#optNovoItem");
    inputNovoItem = $("#inputNovaLista");
    btnVoltar = $("#btnVoltar");
    btnCancelar = $("#btnCancelar");
    btnSalvar = $("#btnSalvar");

    buttonAdd.click(this.onAddButtonClick);
    btnCancelar.click(this.closeInput);
    btnSalvar.click(this.salvarItem);
    btnVoltar.click(this.voltarToLista);

    new TarefaDAO().loadAll(listaId, ViewTarefa.prototype.addOnScreen)
}

ViewTarefa.prototype.onAddButtonClick = function() {
    if (optNovoItem.hasClass("d-none")) {
        optNovoItem.toggleClass("d-none");
        inputNovoItem.toggleClass("d-none");
        inputNovoItem.toggleClass("d-none");
        inputNovoItem.focus();
        window.scrollTo(0,document.body.scrollHeight);
    }
}

ViewTarefa.prototype.closeInput = function() {
    inputNovoItem.val("");
    inputNovoItem.addClass("d-none");
    optNovoItem.addClass("d-none");
}


ViewTarefa.prototype.salvarItem = function() {
    var nome = inputNovoItem.val();
    if (nome === "") return;

    var tarefaModel = new Tarefa(null,listaId,nome);
    new TarefaDAO().add(tarefaModel,ViewTarefa.prototype.addOnScreen);
}

ViewTarefa.prototype.renderItem = function (ListaModel) {
    novoItem = Mustache.render(
        '<li name="tarefa" data-id="{{id}}" class="list-group-item">' +
            '<p class="d-inline">{{nome}}</p>' +
            '<button type="button" class="close" aria-label="Close">'+
                '<span aria-hidden="true">&times;</span>'+
            '</button>'+
        '</li>',
        ListaModel);

    listaItem.append(novoItem);
    
    return listaItem.children().last()
}

ViewTarefa.prototype.addOnScreen = function(tarefaModel){
    var novoItem = ViewTarefa.prototype.renderItem(tarefaModel); 

    ViewTarefa.prototype.addItemClick(novoItem);
    ViewTarefa.prototype.closeInput();
}

ViewTarefa.prototype.addItemClick = function(item) {
    item.click(function () {
        var id = item.data("id");
    })
}

ViewTarefa.prototype.voltarToLista = function(){
    $("body").empty();
    new ViewLista();
}