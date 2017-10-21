console.log('js loaded');

var newToDo = [];
var editingId;

$(document).ready(readyNow);

function readyNow() {
    console.log('jquery loaded');
    $('.addTask').on('click', addToList);
    getToDos();
    $('.newToDos').on('click', '.completeCheckBox', markComplete)
}

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

function appendNewToDos(array) {
    $('.newToDos').empty();
    for(var i = 0; i < array.length; i++) {
        newToDo = array[i];
        var $tr = $('<tr></tr>');
        $tr.data('newToDo', newToDo);
        $tr.append('<td><input type="checkbox" class="completeCheckBox"></td>');
        $tr.append('<td>' + newToDo.todo + '</td>');
        $tr.append('<td>' + newToDo.date + '</td>');
        $tr.append('<td><button class="edit" data-id="' + newToDo.id + '">Edit</button></td>');
        $tr.append('<td><button class="delete" data-id="' + newToDo.id + '">Delete</button></td>');
        $('.newToDos').append($tr);
    }
}

function markComplete() {
    console.log('checkbox checked');
    dateComplete = Date.now();
    console.log('datecomplete', dateComplete);

    $.ajax({
        type: 'PUT',
        url: '/completetodo',
        data: dateComplete //UPDATE THIS
    })
    .done(function(response){
        console.log('response', response);
        getToDos();
    })
    .fail(function(error){
        console.log('error', error);
        
    })

}