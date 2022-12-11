    //   var socket = io();

    // in WEB run as 192.168.3.110:5050 (ip : port)
    const socket = io("192.168.3.110:5050")
//     const socket = io(("192.168.3.110:5050"), {
//   transports: ["websocket", "polling"] // use WebSocket first, if available
// });


// you already have declared uuid, uuidSocket and have connected to the socket previously so you define what to do on register:
socket.on("register", function(data){
    if (uuid == undefined || uuidSocket == undefined) // first time we get id from server
      //save id to a variable
      uuid = data.uuid;

      // save to localstorage for further usage (optional - only if you want one client per browser e.g.)
      localStorage.setItem('socketUUID', uuid);

      uuidSocket = io(serverHost + "/" + uuid); // set up the room --> will trigger nsp.on('connect',... ) on the server
    
    //   uuidSocket.on("Info", function(data){
    //     //handle on Info
    //   });
    })
// initiate the register from the client
socket.emit("register", uuid);
    
    
      var messages = document.getElementById('messages');
      var form = document.getElementById('form');
      var input = document.getElementById('input');
    
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (input.value) {
          socket.emit('chat message', input.value);
          input.value = '';
        }
      });
    
      socket.on('chat message', function(msg) {
        var item = document.createElement('li');
        item.textContent = msg;
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
      });