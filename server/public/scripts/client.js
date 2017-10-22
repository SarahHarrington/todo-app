console.log('js loaded');

var newToDo = [];
var editingId;

$(document).ready(readyNow);

function readyNow() {
    //event handlers
    $('.addTask').on('click', addToList);
    $('.newToDos').on('click', '.emptyCheckBox', markComplete);
    $('.completeToDos').on('click', '.completeCheckBox', markNew);
    $('.toDoItems').on('click', '.edit', editToDo);
    $('.toDoItems').on('click', '.save', saveEdit);
    
    //functions for displaying items on page load
    getToDos();
    getCompleteToDos();
}

//posts new to do 
function addToList(e) {
    e.preventDefault();
    var task = $('.task').val();
    var dateDue = $('.dateDue').val();
    
    var toDo = {
        task: task,
        dateDue: dateDue,
    }

    $.ajax({
        type: 'POST',
        url: '/todos',
        data: toDo
    })
    .done(function(response){
        console.log('response', response);
        //will need to add a refresh
        getToDos();
    })
    .fail(function(error){
        console.log('error', error);
    })
}

//retrieves to dos from the server that are not complete
function getToDos() {
    $.ajax({
        type: 'GET',
        url: '/todos'
    }).done(function(response){
        console.log('response', response);
        var toDos = response;
        console.log('toDos response', toDos);
        appendNewToDos(toDos);
    }).fail(function(error){
        console.log('error', error);
        
    })
}

//appends incomplete to dos
function appendNewToDos(array) {
    $('.newToDos').empty();
    for(var i = 0; i < array.length; i++) {
        toDo = array[i];
        var $tr = $('<tr></tr>');
        $tr.data('toDo', toDo);
        $tr.append('<td><input type="checkbox" class="emptyCheckBox" data-id="' + toDo.id + '"></td>');
        $tr.append('<td class="hideItem newBox">' + toDo.todo + '</td><td class="showItem"><input class="toDoText" type="text"></td>');
        $tr.append('<td class="hideItem newDate">' + toDo.date + '</td><td class="showItem"><input class="toDoDate" type="datetime-local"</td>');
        $tr.append('<td><button class="edit" data-id="' + toDo.id + '">Edit</button><button class="save">Save</button></td>');
        $tr.append('<td><button class="delete" data-id="' + toDo.id + '">Delete</button></td>');
        $('.newToDos').append($tr);
    }
}

//marks items as complete and sends to server with now stamp
function markComplete() {
    editingId = $(this).data('id');
    $.ajax({
        type: 'PUT',
        url: 'todos/completetodo/' + editingId,
        //data: dateComplete //UPDATE THIS
    })
    .done(function(response){
        console.log('response', response);
        getToDos();
        getCompleteToDos();
    })
    .fail(function(error){
        console.log('error', error);  
    })
}

function getCompleteToDos() {
    $.ajax({
        type: 'GET',
        url: '/complete'
    }).done(function (response) {
        console.log('response', response);
        var completeToDos = response;
        console.log('complete to dos response', completeToDos);
        appendCompleteToDos(completeToDos);
    }).fail(function (error) {
        console.log('error', error);

    })
}

function appendCompleteToDos(array) {
    $('.completeToDos').empty();
    for (var i = 0; i < array.length; i++) {
        toDo = array[i];
        var $tr = $('<tr></tr>');
        $tr.data('toDo', toDo);
        $tr.append('<td><input type="checkbox" checked class="completeCheckBox" data-id="' + toDo.id + '"></td>');
        $tr.append('<td class="hideItem">' + toDo.todo + '<input class="showItem toDoText" type="text"></td>');
        $tr.append('<td class="hideItem newDate">' + toDo.date + '<input class="showItem toDoDate" type="datetime-local"</td>');
        $tr.append('<td><button class="edit" data-id="' + toDo.id + '">Edit</button><button class="save">Save</button></td>');
        $tr.append('<td><button class="delete" data-id="' + toDo.id + '">Delete</button></td>');
        $('.completeToDos').append($tr);
    }
}

function markNew() {
    console.log('uncheck clicked');
    editingId = $(this).data('id');
    $.ajax({
        type: 'PUT',
        url: 'complete/completetodo/' + editingId,
    })
        .done(function (response) {
            console.log('response', response);
            getToDos();
            getCompleteToDos();
        })
        .fail(function (error) {
            console.log('error', error);
        })
}

function editToDo() {
    console.log('edit clicked');
    $(this).hide();
    $(this).siblings('.save').show();
    $(this).parent().siblings('.hideItem').hide();
    $(this).parent().siblings('.showItem').show();
    var existingData = $(this).closest('tr').data('toDo');
    console.log('existing Data', existingData);
    
    $(this).parent().siblings('.toDoText').val(existingData.todo);
    $(this).parent().siblings('.toDoDate').val(existingData.date);
}

function saveEdit() {
    console.log('save edit clicked');
    $(this).hide();
    $(this).siblings('.edit').show();
    $(this).parent().siblings('.hideItem').show();
    $(this).parent().siblings('.showItem').hide();
}
