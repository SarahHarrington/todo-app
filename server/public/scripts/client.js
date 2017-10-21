console.log('js loaded');



$(document).ready(readyNow);

function readyNow() {
    console.log('jquery loaded');
    $('.addTask').on('click', addToList)
}

function addToList(e) {
    e.preventDefault();
    var task = $('.task').val();
    var dateDue = $('.dateDue').val();
    var complete = false;
    
    var toDo = {
        task: task,
        dateDue: dateDue,
        complete: complete
    }

    $.ajax({
        type: 'POST',
        url: '/todo',
        data: toDo
    })
    .done(function(response){
        console.log('response', response);
        //will need to add a refresh
    })
    .fail(function(error){
        console.log('error', error);
    })
}