function ViewTarefa(lista) {
    this.layout = 
    '<nav class="navbar sticky-top shadow navbar-dark bg-dark">' +
        '<a class="navbar-brand mr-auto" href="#">ProjectTask</a>' +
        '<button type="button" id="buttonAdd" class="btn btn-outline-light">Add</button>' +
    '</nav>' +
    '<div class="container my-3">' +
    '<p class="lead text-center mb-3">Tarefas da lista "'+lista.nome+'"</p>'+
    '<ul id="tarefas" class="list-group mb-3"></ul>' +
    '<div class="row m-1" style="padding-bottom:50px;">'+
        '<input type="text" class="form-control d-none" id="inputNovaTarefa" aria-describedby="inputNovaTarefaHelp" placeholder="Informe o nome da Tarefa">' +
    '</div>'+  
    '<div class="m-3 row fixed-bottom">' +
        '<button id="btnVoltar" type="button" class="mr-auto btn btn-info">Voltar</button>' +
        '<div id="optNovoItem" class="d-none ml-auto">' +
            '<button id="btnCancelar" type="button" class="btn btn-danger">Cancelar</button>' +
            '<button id="btnSalvar" type="button" class="ml-2 btn btn-primary">Salvar</button>' +
        '</div>' +
    '</div>';

    this.buildScreen();

    this.listaId = lista.id;

    this.listaItem = $("#tarefas");
    this.buttonAdd = $("#buttonAdd");
    this.optNovoItem = $("#optNovoItem");
    this.inputNovoItem = $("#inputNovaTarefa");
    this.btnCancelar = $("#btnCancelar");
    this.btnSalvar = $("#btnSalvar");
    this.btnVoltar = $("#btnVoltar");

    this.addListeners();
    new TarefaDAO().loadAllOfLista(this.listaId, this.onLoadAll.bind(this));
}

ViewTarefa.prototype.buildScreen = function(){
    $("body").html(this.layout);
}

ViewTarefa.prototype.addListeners = function(){
    this.buttonAdd.click(this.onAddButtonClick.bind(this));
    this.btnCancelar.click(this.closeInput.bind(this));
    this.btnSalvar.click(this.salvarItem.bind(this));
    this.btnVoltar.click(this.voltarToLista.bind(this));
}

ViewTarefa.prototype.onAddButtonClick = function() {
    if (this.optNovoItem.hasClass("d-none")) {
        this.optNovoItem.toggleClass("d-none");
        this.inputNovoItem.toggleClass("d-none");
        this.inputNovoItem.focus();
        window.scrollTo(0,document.body.scrollHeight);
    }
}

ViewTarefa.prototype.closeInput = function() {
    this.inputNovoItem.val("");
    this.inputNovoItem.addClass("d-none");
    this.optNovoItem.addClass("d-none");
}

ViewTarefa.prototype.salvarItem = function() {
    var nome = this.inputNovoItem.val();
    if (nome === "") return;

    var tarefaModel = new Tarefa(null,this.listaId,nome,false);
    new TarefaDAO().add(tarefaModel,this.renderItem.bind(this));
    this.closeInput();
}

ViewTarefa.prototype.renderItem = function (TarefaModel) {
    var novoItem = Mustache.render(
        '<li name="tarefa" data-id="{{id}}" class="list-group-item">' +
            '<div class="custom-control d-inline custom-checkbox">'+
                '<input type="checkbox" class="custom-control-input" id=isFeito{{id}} {{#isFeito}}checked{{/isFeito}}>'+
                '<label class="custom-control-label {{#isFeito}}tachado{{/isFeito}}" for="isFeito{{id}}">{{nome}}</label>'+
            '</div>'+
            '<button type="button" class="close" aria-label="Close">'+
                '<span aria-hidden="true">&times;</span>'+
            '</button>'+
        '</li>',
        TarefaModel);

    this.listaItem.append(novoItem);
    this.addItemClick(this.listaItem.children().last());
}

ViewTarefa.prototype.addItemClick = function(item) {
    item.click(function () {
        var id = item.data("id");
    });

    item.find("input").click((function(){
        var nome = item.find("label").text();
        var id = item.data("id");
        var isFeito = item.find("input").prop("checked");

        new TarefaDAO().update(new Tarefa(id, this.listaId, nome, isFeito), this.onUpdate);
    }).bind(this));

    item.children("button").click((function(){
        var nome = item.find("label").text();
        var id = item.data("id");
        var isFeito = item.find("input").prop("checked");

        new TarefaDAO().delete(new Tarefa(id, this.listaId, nome, isFeito), this.onDelete);
    }).bind(this));
}

ViewTarefa.prototype.onLoadAll = function(tarefas){
    tarefas.forEach(tarefa => {
        this.renderItem(tarefa); 
    });
}

ViewTarefa.prototype.onUpdate = function(tarefa){
    $("[name='tarefa'][data-id='"+tarefa.id+"']").find("label").toggleClass("tachado");
};

ViewTarefa.prototype.onDelete = function(tarefa){
    $("[name='tarefa'][data-id='"+tarefa.id+"']").remove();
};

ViewTarefa.prototype.voltarToLista = function(){
    $("body").empty();
    new ViewLista();
}