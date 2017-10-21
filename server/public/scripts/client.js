console.log('js loaded');

$(document).ready(readyNow);

function readyNow() {
    console.log('jquery loaded');
    $('.addTask').on('click', addToList);
    getToDos();
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
        
    }).fail(function(error){
        console.log('error', error);
        
    })
}