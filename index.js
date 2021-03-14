const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 5000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

let user = 0;

/*const idComponents = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',1,2,3,4,5,6,7,8,9,0];

const idGenerator = (lenght = 6) => {
  let userId = "";

  while (userId.lenght < lenght) {
    userId = idComponents[Math.floor(Math.random() * idComponents.length)];
  }

  return userId;
}*/

io.on('connection', (socket) => {
  let newUser = new User(socket, idGenerator());

  socket.on('register', (username) => {
    newUser.setUsername(username);

    user++;

    console.log(`${username} has joined`);
    io.emit('chat message', `${username} has joined`);

    if (user > 1) {
      console.log(`There is ${user} in the chat room`);
      io.emit('chat message', `There is ${user} in the chat room`);
    } else {
      console.log(`There are ${user} in the chat room`);
      io.emit('chat message', `There are ${user} in the chat room`);
    }
  })

  socket.on('chat message', (message) => {
    console.log(`User: ${message}`);
  });

  socket.on('chat message', (message) => {
    io.emit('chat message', `${message}`);
  });

  socket.on('disconnect', () => {
      user--;

    console.log(`${username} has disconnected`);
    io.emit('chat message', `${username} has disconnected`);
  });
});

http.listen(port, () => {
  console.log(`Listening on port ${port}`);
});