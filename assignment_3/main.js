
//EVERYONE
const our_name = Math.random().toString();
const our_game = 'skyler_assignment_3';
const game_events = {};

//CANVAS
const game = document.querySelector('canvas').getContext('2d');
    const resize_canvas =  () => {
        game.canvas.width = game.canvas.clientWidth;
        game.canvas.height = game.canvas.clientHeight;
    };
    resize_canvas();
    window.addEventListener('resize', resize_canvas);

const ws =  new WebSocket('wss://southwestern.media/game_dev');
ws.addEventListener('open', open => {
    console.log('WEBSOCKET CONNECTION OPEN');
});

game.canvas.addEventListener('mousemove', mousemove => {
    console.log('MOUSEMOVE: X: ', mousemove.clientX, ', ', mousemove.clientY);
    const data = {};
    data.Game = our_game;
    data.Name = our_name;
    const our_message = {};
    our_message.x = mousemove.clientX;
    our_message.y = mousemove.clientY;
    data.Message = JSON.stringify(our_message);
    ws.send(JSON.stringify(data));
});
ws.addEventListener('close', close => {
    console.log('WEBSOCKET CONNECTION CLOSED');
});
ws.addEventListener('error', ws_error => {
    console.log('WEBSOCKET ERROR');
});
ws.addEventListener('message', message => {
    const message_data = JSON.parse(message.data);
    if(message_data.Game !== our_game){
        return
    }
    message_data.Message = JSON.parse(message_data.Message);
    console.log('PARSED WEBSOCKET MESSAGE: ', message_data);
    game_events[message_data.Name] = {x: message_data.Message.x, y: message_data.Message.y}
});

    Object.keys(game_events).forEach(key => {
        const player = game_event[key];
        game.fillStyle = '#F00';
        game.fillRect(player.x,player.y, 15, 15);
    });

    window.requestAnimationFrame(render);
    


