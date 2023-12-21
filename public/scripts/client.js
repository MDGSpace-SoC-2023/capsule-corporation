const ws = new WebSocket('ws://localhost:3000');


ws.addEventListener('message', (event) => {
    console.log('Received: ', event.data);
    let message = event.data;
    message = JSON.parse(message);
    console.log(message[0]);

    if (message[0] === 'startedAdminPages'){
        console.log('admin pages started');
        if(message[1] === myHuntname){
            console.log('admin pages started for this hunt');
            show();
        }
    }

    if (message === 'stoppedAdminPages'){
        console.log('admin pages stopped');
        dontshow();
    }
});


function show(){
    let center = document.getElementById("center");
    center.style.display = "block";

    let center2 =  document.getElementById("center2");
    center2.style.display = "none";
}

function dontshow(){
    let center = document.getElementById("center");
    center.style.display = "none";

    let center2 =  document.getElementById("center2");
    center2.style.display = "block";
}
