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
    $('.toDoItems').on('click', '.delete', deleteToDo);
    
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
    $(this).parent().siblings().children('.toDoText').val(existingData.todo);
    $(this).parent().siblings().children('.toDoDate').val(existingData.date);
    
}

function saveEdit() {
    console.log('save edit clicked');
    $(this).hide();
    $(this).siblings('.edit').show();
    $(this).parent().siblings('.hideItem').show();
    $(this).parent().siblings('.showItem').hide();

    var updatedToDo = $(this).parent().siblings().children('.toDoText').val();
    var updatedDueDate = $(this).parent().siblings().children('.toDoDate').val();

    var updatedObject = {
        todo: updatedToDo,
        date: updatedDueDate
    }

    $.ajax({
        type: 'PUT',
        url: 'edit/' + editingId,
        data: updatedObject
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

//deletes indvidual to dos
function deleteToDo() {
    console.log('delete clicked');
    var deleteId = $(this).data('id');

    $.ajax({
        method: 'DELETE',
        url: '/delete/' + deleteId
    })
        .done(function (response) {
            console.log('response', response);
            getToDos();
            getCompleteToDos();
        })
        .fail(function (error) {
            alert('Something went wrong.');
        })
    
}

