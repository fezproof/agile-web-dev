//Adopted from code from Resource : https://www.youtube.com/watch?v=QISU14OrRbI

function updateActiveChat(newId){
  var activeChat = document.getElementById('active-chat');
  activeChat.innerHTML = newId;
  if(socket !== undefined){
    socket.emit('update', { id : newId });
  }
}

function chat(){
  var inputArea = document.getElementById('new-message');
  var outputArea = document.getElementById('chat-messages');
  var emailAddr = document.getElementById('email-display').innerHTML;
  var activeChat = document.getElementById('active-chat').innerHTML;

  socket.emit('update', { id : activeChat });

  console.log('Connection established to server');

  //Listen for Output
  socket.on('update', function(data){

    var message = document.createElement('div');
    message.setAttribute('class','chat-message');
    message.innerHTML = data.name + ": " + data.message;

    // Append
    outputArea.appendChild(message);
  });

  socket.on('output', function(data){
    outputArea.innerHTML = "";
    if(data.length){
      //Loop through the results

      for(var x =0; x < data.length; x++){
        var message = document.createElement('div');
        message.setAttribute('class','chat-message');
        message.innerHTML = data[x].name + ": " + data[x].message;

        // Append
        outputArea.appendChild(message);
      }
    }
  });

  //Listen for keydown
  inputArea.addEventListener('keydown', function(event){
    var self = this;
      if(event.which === 13 && event.shiftKey === false){
        socket.emit('input', {
          id: activeChat,
          email: emailAddr,
          message:self.value
        });
        self.value = '';
        event.preventDefault();
      }
  });
}

var socket = io();

if(socket !== undefined){
  window.onload = chat;
}
