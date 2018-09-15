function Connection() {
    this.db = undefined;
}

Connection.prototype.getConnection = function (sucessCallback, errorCallback) {
    //Recebe qualquer objeto de indexedDB que o navegador implemente
    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    if (!indexedDB) {   //Se não achar nenhuma implementação chama o callback de erro
        errorCallback("Seu navegador não suporta uma versão estável do IndexedDB. Alguns recursos não estarão disponíveis.");
    }

    //Faz o requeste (Async) para abrir o BD;
    //2º parametro é a versão do banco
    var request = indexedDB.open("ProjectTask", 1);

    //Caso algum erro ocorra
    request.onerror = function (event) {
        errorCallback("Você não habilitou minha web app para usar IndexedDB?!");
    };

    //Caso tudo ocorra bem
    request.onsuccess = function (event) {
        sucessCallback(event.target.result);
    };

    //Caso o banco tenha mudado de versão
    request.onupgradeneeded = function(event) {
        db = event.target.result;
        db.createObjectStore("Lista", {keyPath:"id",autoIncrement: true});
        db.createObjectStore("Tarefa",{keyPath:"id",autoIncrement: true});
    }
}