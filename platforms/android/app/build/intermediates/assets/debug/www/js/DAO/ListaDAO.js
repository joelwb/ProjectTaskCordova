function ListaDAO() {
    transaction = db.transaction(["Lista"], "readwrite");
    objectStore = transaction.objectStore("Lista");
}

ListaDAO.prototype.add = function (lista, onsuccess) {
    var request = objectStore.add(lista);
    request.onsuccess = function (event) {
        lista.id = event.target.result;
        onsuccess(lista);
    };
}

ListaDAO.prototype.loadAll = function (onsuccess) {
    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            onsuccess(new Lista(cursor.key, cursor.value.nome));
            cursor.continue();
        }
    }
}