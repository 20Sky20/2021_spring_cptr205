window.addEventListener('DOMContentLoaded', DOMContentLoaded => {
    
    // CANVAS INIT, we have to resize the window to fit the screen based on the different screen sizes.
    const render = document.querySelector('canvas').getContext('2d');
    const resize = () => {
        render.canvas.width = render.canvas.clientWidth * window.devicePixelRatio;
        render.canvas.height = render.canvas.clientHeight * window.devicePixelRatio;
    };
    resize();
    window.addEventListener('resize', resize);

    // APPLY PHYSICS shows how the x and y directions are being used with motion like acceleration and velocity
    // all being a the main reason for how the ball moves
    let player_x = -1, player_y = 0;
    let player_r = 0.2;
    let player_vx = 0, player_vy = 0;
    let player_ax = 0, player_ay = 0;
    // shows the key press and what direction the ball should move in since its either an increase in acceleration
    // or a decrease in some direction.
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

    // ANIMATION LOOP, most of this top stuff is background
    const animation = timestamp => {
        render.clearRect(0, 0, render.canvas.width, render.canvas.height);

        render.fillStyle = '#0f0';
        render.fillRect(0, render.canvas.height / 2, render.canvas.width, render.canvas.height / 2);

        render.fillStyle = '#0ff';
        render.fillRect(0, 0, render.canvas.width, render.canvas.height / 2);

        render.fillStyle = '#f00';
        render.beginPath();
        const w = render.canvas.width, h = render.canvas.height;
        //we see the increase in certain variables as others decrease which gives us our view that the ball
        //has a sort of friction beneath it. With the velocity being higher than the acceleration this helps
        //to allow the ball to not continue to accelerate like it did before as well as us setting it to 0.
        player_vx += player_ax;
        player_x += player_vx;
        player_ax = 0;
        player_vx *= 0.98;
        player_vy += player_ay;
        player_y += player_vy;
        //Similar to moving left and right the up key would have the ball rise forever while this adds a force
        // of gravity which pulls it back down. Without the else part the ball would continue to fall since it
        //has no base or stopping point. This is where the else comes in as the ball hits 0 in all these points
        // at the base which stops the ball from continuing further down.
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