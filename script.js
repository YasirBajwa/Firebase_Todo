

var list = document.getElementById('list');

firebase.database().ref('todos').on('child_added',function(data){
    
    // create li element
    var li = document.createElement('li');
    var liText = document.createTextNode(data.val().value);
    

    // create Edit button
    var button__eb = document.createElement('button');
    var button__text = document.createTextNode('EDIT');
    button__eb.setAttribute('id',data.val().key);
    button__eb.setAttribute('onclick','editText(this)');
    button__eb.appendChild(button__text);

   
    // create delete button
    var button__db = document.createElement('button');
    var button__text = document.createTextNode('DELETE');
    button__db.setAttribute('id',data.val().key);
    button__db.setAttribute('onclick','deleteText(this)');
    button__db.appendChild(button__text);

    // append child
    li.appendChild(liText);
    li.appendChild(button__eb);
    li.appendChild(button__db);


    list.appendChild(li);
})

function addTodo(){

    var todo_item = document.getElementById('input');
    var database = firebase.database().ref('todos')
    var key = database.push().key;
    
    var todo ={
            value: todo_item.value,
            key : key 
    }

    database.child(key).set(todo)
    todo_item.value = '';
    
}

function deleteText(e){
   firebase.database().ref('todos').child(e.id).remove();
    e.parentNode.remove();
}

function deleteAll(){
    firebase.database().ref('todos').remove();
    list.innerHTML = ''
}

function editText(e){

    var val = e.parentNode.firstChild.nodeValue;
    var update_val = prompt('Enter the update value',val);
    
    var editTodo={
        value:update_val,
        key: e.id
    }

    firebase.database().ref('todos').child(e.id).set(editTodo)
    
    e.parentNode.firstChild.nodeValue = update_val;

}
