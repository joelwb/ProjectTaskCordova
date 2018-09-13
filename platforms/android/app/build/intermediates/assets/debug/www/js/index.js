/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var lista;
var buttonAdd;
var optNovoItem;
var inputNovoItem;
var btnCancelar;
var btnSalvar;

var idLista = 0;
var idTarefa = 0;

var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        lista = $("#lista");
        buttonAdd = $("#buttonAdd");
        optNovoItem = $("#optNovoItem");
        inputNovoItem = $("#inputNovoItem");
        btnCancelar = $("#btnCancelar");
        btnSalvar = $("#btnSalvar");

        buttonAdd.click(addLista);
        btnCancelar.click(closeInput);
        btnSalvar.click(salvarItem);
        setInputToLista();
    },
};

app.initialize();

function addLista() {
    if (optNovoItem.hasClass("d-none")) {
        optNovoItem.toggleClass("d-none");
        inputNovoItem.toggleClass("d-none");
    }
}

function setInputToLista() {
    inputNovoItem.attr("placeholder", "Informe o nome da Lista");
}

function setInputToTarefa() {
    inputNovoItem.attr("placeholder", "Informe o nome da Tarefa");
}

function closeInput() {
    inputNovoItem.val("");
    inputNovoItem.toggleClass("d-none");
    optNovoItem.toggleClass("d-none");
}

function salvarItem() {
    var valor = inputNovoItem.val();
    if(valor === "") return;

    var type = lista.data("type");

    var item = {
        id: function () {
            if (type === "lista") return ++idLista;
            else if (type === "tarefa") return ++idTarefa;
        },
        nome: valor,
        tipo: type
    };

    novoItem = Mustache.render(
        '<li name="{{tipo}}" data-id="{{id}}" class="list-group-item">' +
            '{{nome}}' +
        '</li>',
        item);

    console.log(novoItem);

    lista.append(novoItem)

    closeInput();
}