function TarefaDAO() {
    transaction = db.transaction(["Tarefa"], "readwrite");
    objectStore = transaction.objectStore("Tarefa");
}

TarefaDAO.prototype.add = function (tarefa, onsuccess) {
    var request = objectStore.add(tarefa);
    request.onsuccess = function (event) {
        tarefa.id = event.target.result;
        onsuccess(tarefa);
    };
}

TarefaDAO.prototype.loadAll = function (listId,onsuccess) {
    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor && cursor.value.listaId === listId) {
            onsuccess(new Tarefa(cursor.key, cursor.value.listaId, cursor.value.nome));
            cursor.continue();
        }
    }
}