function ListaDAO() {}

ListaDAO.prototype = new Connection();
ListaDAO.prototype.constructor = ListaDAO;

ListaDAO.prototype.add = function (lista, onsuccess) {
    this.getConnection(function (db) {
        var objectStore = db.transaction(["Lista"], "readwrite").objectStore("Lista");
        var request = objectStore.add(lista);
        request.onsuccess = function (event) {
            lista.id = event.target.result;
            onsuccess(lista);
        };
    });
}

ListaDAO.prototype.delete = function (lista, onsuccess) {
    var tarefaDAO = new TarefaDAO();

    tarefaDAO.loadAllOfLista(lista.id, (function (tarefas) {
        tarefas.forEach(tarefa => {
            tarefaDAO.delete(tarefa,function(){});
        });
        this.getConnection(function (db) {
            var objectStore = db.transaction(["Lista"], "readwrite").objectStore("Lista");

            var request = objectStore.delete(lista.id);
            request.onsuccess = function (event) {
                onsuccess(lista);
            };
        });
    }).bind(this));
}

ListaDAO.prototype.loadAll = function (onsuccess) {
    this.getConnection(function (db) {
        var objectStore = db.transaction(["Lista"], "readwrite").objectStore("Lista");
        var listas = [];

        objectStore.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                listas.push(new Lista(cursor.key, cursor.value.nome));
                cursor.continue();
            } else {
                onsuccess(listas);
            }
        }
    });
}