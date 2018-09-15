function Tarefa(id, listaId, nome, isFeito) {
    if (id) {
        this.id = id;
    }
    this.listaId = listaId;
    this.nome = nome;
    this.isFeito = isFeito;
}