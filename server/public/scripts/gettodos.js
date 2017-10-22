//retrieves to dos from the server that are not complete
function getToDos() {
    $.ajax({
        type: 'GET',
        url: '/todos'
    }).done(function (response) {
        console.log('response', response);
        var toDos = response;
        console.log('toDos response', toDos);
        appendNewToDos(toDos);
    }).fail(function (error) {
        console.log('error', error);

    })
}

//appends incomplete to dos
function appendNewToDos(array) {
    $('.newToDos').empty();
    for (var i = 0; i < array.length; i++) {
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

//gets completed to dos from the database
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

//appends completed to dos to the DOM
function appendCompleteToDos(array) {
    $('.completeToDos').empty();
    for (var i = 0; i < array.length; i++) {
        toDo = array[i];
        var $tr = $('<tr></tr>');
        $tr.data('toDo', toDo);
        $tr.append('<td><input type="checkbox" checked class="completeCheckBox" data-id="' + toDo.id + '"></td>');
        $tr.append('<td class="hideItem newBox">' + toDo.todo + '</td><td class="showItem"><input class="toDoText" type="text"></td>');
        $tr.append('<td class="hideItem newDate">' + toDo.date + '</td><td class="showItem"><input class="toDoDate" type="datetime-local"</td>');
        $tr.append('<td><button class="edit" data-id="' + toDo.id + '">Edit</button><button class="save">Save</button></td>');
        $tr.append('<td><button class="delete" data-id="' + toDo.id + '">Delete</button></td>');
        $('.completeToDos').append($tr);
    }
}