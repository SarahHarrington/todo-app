$(document).ready(readyNow);

function readyNow() {
    //event handlers
    $('.addTask').on('click', addToList);
    $('.newToDos').on('click', '.emptyCheckBox', markComplete);
    $('.completeToDos').on('click', '.completeCheckBox', markNew);
    $('.toDoItems').on('click', '.edit', editToDo);
    $('.toDoItems').on('click', '.save', saveEdit);
    $('.toDoItems').on('click', '.delete', deleteToDo);
    $('.deleteAll').on('click', deleteAll);
    
    //functions for displaying items on page load
    getToDos();
    getCompleteToDos();
}//end ready now

//posts new to do 
function addToList(e) {
    e.preventDefault(); //prevents page reload on click of add task
    var task = $('.task').val();
    var dateDue = $('.dateDue').val();

    console.log('dateDue', dateDue);
    
    //object to send the server and database
    var toDo = { 
        task: task,
        dateDue: dateDue,
    }
    $('.taskInput').val('');
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
}//end addToList

//marks items as complete and sends to server/database
function markComplete() {
    editingId = $(this).data('id');
    $.ajax({
        type: 'PUT',
        url: 'todos/completetodo/' + editingId,
    })
    .done(function(response){
        console.log('response', response);
        getToDos();
        getCompleteToDos();
    })
    .fail(function(error){
        console.log('error', error);  
    })
}//end markComplete

//marks the items as not complete and sends to server/database
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
}//end markNew

//starts inline editing for to do
function editToDo() {
    console.log('edit clicked');
    $(this).hide();
    $(this).siblings('.save').show();
    $(this).parent().siblings('.hideItem').hide();
    $(this).parent().siblings('.showItem').show();
    var existingData = $(this).closest('tr').data('toDo');
    var existingDate = existingData.date;
    $(this).parent().siblings().children('.toDoText').val(existingData.todo);
}//end editToDo

//collects updated to do and sends to server
function saveEdit() {
    console.log('save edit clicked');
    $(this).hide();
    $(this).siblings('.edit').show();
    $(this).parent().siblings('.hideItem').show();
    $(this).parent().siblings('.showItem').hide();
    var editingId = $(this).data('id');
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

//deletes all to dos
function deleteAll() {
    var deleteAll = confirm('Are you sure you want to delete all completed tasks?');
    console.log('deleteAll', deleteAll);
    
    if (deleteAll === true) {
        $.ajax({
            method: 'DELETE',
            url: '/deleteall'
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
}    