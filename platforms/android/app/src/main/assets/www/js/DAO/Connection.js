function Connection() {
    this.getConnection = function (sucessCallback, errorCallback) {
        var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        if (!indexedDB) {
            errorCallback("Seu navegador não suporta uma versão estável do IndexedDB. Alguns recursos não estarão disponíveis.");
        }

        var request = indexedDB.open("ProjectTask", 1);
        request.onerror = function (event) {
            errorCallback("Você não habilitou minha web app para usar IndexedDB?!");
        };
        request.onsuccess = function (event) {
            sucessCallback(event.target.result);
        };

        request.onupgradeneeded = function(event) {
            db = event.target.result;
            db.createObjectStore("Lista", {autoIncrement: true});
            db.createObjectStore("Tarefa",{autoIncrement: true});
        }
    }
}