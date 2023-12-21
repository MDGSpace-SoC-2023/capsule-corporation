const ws = new WebSocket('ws://localhost:3000');

let hunt_to_start = hunt_to_strt;
// dont consider this error the line will work because i have defined this varibale in hun2.ejs script tag

console.log(hunt_to_start);

//send a message to server
ws.addEventListener('open', () => {
    let data = ['Serve', hunt_to_start];
    ws.send(JSON.stringify(data));
});

ws.addEventListener('message', (message) => {
    console.log('Received: ', message.data);
});
