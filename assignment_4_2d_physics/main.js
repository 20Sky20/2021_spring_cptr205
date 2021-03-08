window.addEventListener('DOMContentLoaded', DOMContentLoaded => {
    
    // CANVAS INIT
    const render = document.querySelector('canvas').getContext('2d');
    const resize = () => {
        render.canvas.width = render.canvas.clientWidth * window.devicePixelRatio;
        render.canvas.height = render.canvas.clientHeight * window.devicePixelRatio;
    };
    resize();
    window.addEventListener('resize', resize);

    // APPLY PHYSICS
    let player_x = -1, player_y = 0;
    let player_r = 0.2;
    let player_vx = 0, player_vy = 0;
    let player_ax = 0, player_ay = 0;
    document.addEventListener('keydown', keydown =>{
        if(keydown.key === 'ArrowRight'){
            player_ax += 0.01;
        }
        if(keydown.key === 'ArrowLeft'){
            player_ax -= 0.01;
        }
        if(keydown.key === 'ArrowUp'){
            player_ay += 0.01;
        }
    });

    // ANIMATION LOOP
    const animation = timestamp => {
        render.clearRect(0, 0, render.canvas.width, render.canvas.height);

        render.fillStyle = '#0f0';
        render.fillRect(0, render.canvas.height / 2, render.canvas.width, render.canvas.height / 2);

        render.fillStyle = '#0ff';
        render.fillRect(0, 0, render.canvas.width, render.canvas.height / 2);

        render.fillStyle = '#f00';
        render.beginPath();
        const w = render.canvas.width, h = render.canvas.height;

        player_vx += player_ax;
        player_x += player_vx;
        player_ax = 0;
        player_vx *= 0.98;
        player_vy += player_ay;
        player_y += player_vy;
        if(0 < player_y){
        player_ay -= 0.00098;
        }   else{
            player_ay = 0;
            player_vy = 0;
            player_y = 0;
        }
        render.arc(player_x * w/2 + w/2, -player_y * h/2 + h/2, player_r * w/2, 0, 2 * Math.PI);
        render.fill();

        window.requestAnimationFrame(animation);
    }
    window.requestAnimationFrame(animation);
})