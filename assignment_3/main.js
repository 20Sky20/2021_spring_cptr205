
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
game.fillStyle = 'darkgrey';
game.fillRect(0, 0, 1500, 1500);
game.fillStyle = 'brown';
game.fillRect(0, 275, 1500, 200);
game.fillStyle = 'blue';
game.fillRect(50, 25, 200, 200);
game.fillStyle = 'red';
game.fillRect(125, 100, 50, 50);
game.fillStyle = 'blue';
game.fillRect(300, 25, 200, 200);
game.fillStyle = 'yellow';
game.fillRect(375, 100, 50, 50);
game.fillStyle = 'blue';
game.fillRect(550, 25, 200, 200);
game.fillStyle = 'green';
game.fillRect(625, 100, 50, 50);
game.fillStyle = 'blue';
game.fillRect(800, 25, 200, 200);
game.fillStyle = 'purple';
game.fillRect(875, 100, 50, 50);
game.fillStyle = 'blue';
game.fillRect(1050, 25, 200, 200);
game.fillStyle = 'orange';
game.fillRect(1125, 100, 50, 50);

game.fillStyle = 'blue';
game.fillRect(50, 525, 200, 200);
game.fillStyle = 'pink';
game.fillRect(125, 600, 50, 50);
game.fillStyle = 'blue';
game.fillRect(300, 525, 200, 200);
game.fillStyle = 'lightgreen';
game.fillRect(375, 600, 50, 50);
game.fillStyle = 'blue';
game.fillRect(550, 525, 200, 200);
game.fillStyle = 'cyan';
game.fillRect(625, 600, 50, 50);
game.fillStyle = 'blue';
game.fillRect(800, 525, 200, 200);
game.fillStyle = 'grey';
game.fillRect(875, 600, 50, 50);
game.fillStyle = 'blue';
game.fillRect(1050, 525, 200, 200);
game.fillStyle = 'black';
game.fillRect(1125, 600, 50, 50);


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

game.canvas.addEventListener('click', click => {
    game.fillStyle = 'green';
    game.fillRect(click.clientX, click.clientY, 15, 15);
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
    


