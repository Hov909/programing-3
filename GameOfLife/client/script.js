let socket = io()
let side = 30
let grasscolor = "green"
let predcolor = "red"
let fullcolor = "white"

let thunder = new Audio("./thunder.mp3");
let bird = new Audio("./bird.mp3");
let leaves = new Audio("./leaves.mp3");
let wind = new Audio("./wind.mp3")


let light = document.getElementById("Light");
let spring = document.getElementById("spring");
let summer = document.getElementById("summer");
let autumn = document.getElementById("autumn");
let winter = document.getElementById("winter");

light.addEventListener("click", lighting);
spring.addEventListener("click", SpringGen);
summer.addEventListener("click", SummerGen);
autumn.addEventListener("click", AutumnGen);
winter.addEventListener("click", WinterGen);

function lighting(){
        thunder.play();
        bird.pause();
        leaves.pause();
        wind.pause();
        grasscolor = "brown"
        predcolor = "golden"
        socket.emit("Thunder")
}
function SpringGen(){
        thunder.pause();
        bird.play();
        leaves.pause();
        wind.pause();
        grasscolor = "pink"
        fill(predcolor) 
        socket.emit("Spring")
}
function SummerGen(){
        thunder.pause();
        bird.pause();
        leaves.pause();
        wind.pause();
        grasscolor = "lime"
        predcolor = "chocolate"
        socket.emit("Summer")
}
function AutumnGen(){
        thunder.pause();
        bird.pause();
        leaves.play();
        wind.pause();
        leaves.play();
        grasscolor = "orange"
        predcolor = "maroon"
        socket.emit("Autumn")
}
function WinterGen(){
        thunder.pause();
        bird.pause();
        leaves.pause();
        wind.play();
        grasscolor = "black"
        predcolor = "silver"
        socket.emit("WinterGen")
}


function setup() {
        createCanvas(30 * side, 30 * side)
        background("#acacac");
}


function changeColor(matrix) {
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        let obj = matrix[y][x]
                        let toBot = side - side * 0.3
                        if (obj == 1){
                                fill(grasscolor)
                                rect(x * side, y * side, side, side)
                                text('🍀', x * side, y * side + toBot)
                        }else if(obj == 2){
                                fill ("purple") 
                                rect(x * side, y * side, side, side)
                                text('🐮', x * side, y * side + toBot)
                        }else if(obj == 3){
                                fill (predcolor)
                                rect(x * side, y * side, side, side)
                                text('🐻', x * 2 * side, y * 2 * side + toBot)
                        }else if(obj == 4){
                                fill(fullcolor)
                                rect(x * side, y * side, side, side)
                                text('🐼', x * 2 * side, y * 2 * side + toBot)
                        }else if(obj == 5){
                                fill ("cyan")
                                rect(x * side, y * side, side, side)
                                text('👨🏼‍⚕️', x * side, y * side + toBot)
                        }else if(obj == 6){
                                fill ("navy")
                                rect(x * side, y * side, side, side)
                                text('💧', x * side, y * side + toBot)
                        }else if(obj == 7){
                                fill("black")
                                rect(x * side, y * side, side, side)
                                text('🦜', x * side, y * side + toBot)
                        }else {
                                fill("gray")
                                rect(x * side, y * side, side, side)
                        }
                }
        }
}


setInterval(
        function () {
        socket.on('send matrix', changeColor)
        },400
    )


