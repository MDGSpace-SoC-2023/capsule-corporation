const ws = new WebSocket('ws://localhost:3000');


ws.addEventListener('message', message => {
    console.log('Received: ', message.data);
    // if (message.data === 'serving') {
    //     window.location.href = '/upcomings_client';
    // }
});


ws.addEventListener('open', () => {
    console.log('WebSocket connection opened');
});

ws.addEventListener('error', (error) => {
    console.log('WebSocket error:', error);
});
