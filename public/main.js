const socket = io();

let messages = []

function sendNewMessage(){
    const message = document.querySelector('#message').value;
    const username = document.querySelector('#username').value;
    if(!message || !username){
        alert('Flaco te faltan datos');
        return
    }
    const messageObject = {
        username,
        message
    }
    socket.emit('NEW_MESSAGE_TO_SERVER', messageObject);
    document.querySelector('#message').value = '';
}

function updateMessages(data){
    let messagesToHtml = ''
    data.forEach(i => {
        messagesToHtml = messagesToHtml + `<li>User: ${i.username} - ${i.message}</li>`
    })
    document.querySelector('#messagesList').innerHTML = messagesToHtml;
}

socket.on('UPDATE_DATA', (data) => {
    messages = data
    updateMessages(data)
});

socket.on('NEW_MESSAGE_FROM_SERVER', (data) => {
    messages.push(data)
    updateMessages(messages)
});