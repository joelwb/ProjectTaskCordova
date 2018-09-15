function TarefaDAO() {}

TarefaDAO.prototype = new Connection();
TarefaDAO.prototype.constructor = TarefaDAO;

TarefaDAO.prototype.add = function (tarefa, onsuccess) {
    this.getConnection(function (db) {
        var objectStore = db.transaction(["Tarefa"], "readwrite").objectStore("Tarefa");
        var request = objectStore.add(tarefa);
        request.onsuccess = function (event) {
            tarefa.id = event.target.result;
            onsuccess(tarefa);
        };
    });
}

TarefaDAO.prototype.update = function (tarefa, onsuccess) {
    this.getConnection(function (db) {
        var objectStore = db.transaction(["Tarefa"], "readwrite").objectStore("Tarefa");
        var request = objectStore.put(tarefa);
        request.onsuccess = function () {
            onsuccess(tarefa);
        };
    });
}

TarefaDAO.prototype.delete = function (tarefa, onsuccess) {
    this.getConnection(function (db) {
        var objectStore = db.transaction(["Tarefa"], "readwrite").objectStore("Tarefa");
        var request = objectStore.delete(tarefa.id);
        request.onsuccess = function () {
            onsuccess(tarefa);
        };
    });
}

TarefaDAO.prototype.loadAllOfLista = function (listId, onsuccess) {
    this.getConnection(function (db) {
        var objectStore = db.transaction(["Tarefa"], "readwrite").objectStore("Tarefa");
        var tarefas = [];
        
        objectStore.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                if (cursor.value.listaId === listId) {
                    tarefas.push(new Tarefa(cursor.key, cursor.value.listaId, cursor.value.nome, cursor.value.isFeito));
                }

                cursor.continue();
            } else {
                onsuccess(tarefas);
            }
        }
    });
}