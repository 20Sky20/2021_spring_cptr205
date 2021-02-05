console.log('Hello, world!'); 

let canvas = document.querySelector('canvas'); 

let context = canvas.getContext('2d'); 

context.fillRect(25, 100, 20, 10); 

context.fillStyle = 'green'; 
context.fillRect(125, 55, 10, 30); 

document.addEventListener('click', click => {
    context.fillRect(50, 25, 30, 30); 
}); 



// 