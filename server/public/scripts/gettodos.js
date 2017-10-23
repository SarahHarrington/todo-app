//CLIENT SIDE CODDE FOR GETTING AND APPENDING TO DOS TO THE DOM

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
        //console.log('new date', new Date(toDo.date).toLocaleDateString());
        var date = new Date(toDo.date).toLocaleDateString();
        var time = new Date(toDo.date).toLocaleTimeString();
        var isoTime = new Date(toDo.date).toLocalISOString();
        var toDoId = toDo.id; 
        var $tr = $('<tr></tr>');
        $tr.data('toDo', toDo);
        $tr.append('<td><input type="checkbox" class="emptyCheckBox" data-id="' + toDoId + '"></td>');
        $tr.append('<td class="hideItem newBox">' + toDo.todo + '</td><td class="showItem"><input class="toDoText" type="text"></td>');
        $tr.append('<td class="hideItem newDate">' + date + '<br>' + time +'</td><td class="showItem"><input class="toDoDate"  id="dueDate" type="datetime-local" value="' + isoTime + '"></td>');
        $tr.append('<td><button class="edit btn btn-default" data-id="' + toDoId + '">Edit</button><button class="btn btn-default save" data-id="' + toDoId +'">Save</button></td>');
        $tr.append('<td><button class="delete btn btn-default" data-id="' + toDoId + '">Delete</button></td>');
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
        var date = new Date(toDo.date).toLocaleDateString(); //sets date to more readable format
        var time = new Date(toDo.date).toLocaleTimeString(); //sets time to more readable format
        var isoTime = new Date(toDo.date).toLocalISOString();
        var $tr = $('<tr></tr>');
        var toDoId = toDo.id; 
        var checkBox = $('<td><input type="checkbox" checked class="completeCheckBox" data-id="' 
            + toDoId + '"></td>')
        
        $tr.data('toDo', toDo);
        $tr.append(checkBox);
        $tr.append('<td class="hideItem newBox">' + toDo.todo + '</td><td class="showItem"><input class="toDoText" type="text"></td>');
        $tr.append('<td class="hideItem newDate">' + date + '<br>' + time + '</td><td class="showItem"><input class="toDoDate" id="dueDate" type="datetime-local" value="' + isoTime + '"></td>');
        $tr.append('<td><button class="edit btn btn-default" data-id="' + toDoId + '">Edit</button><button class="save btn btn-default data-id="' + toDo.id + '">Save</button></td>');
        $tr.append('<td><button class="delete btn btn-default" data-id="' + toDoId + '">Delete</button></td>');
        $('.completeToDos').append($tr);
    }
}