let socket = io()
let side = 30
let grasscolor = "green"
let predcolor = "red"


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
        new Audio("./thunder.mp3").play();
        grasscolor = "brown"
        predcolor = "golden"
}
function SpringGen(){
        new Audio("./bird.mp3").play();  
        grasscolor = "pink"
        fill(predcolor) 
}
function SummerGen(){
        grasscolor = "lime"
        predcolor = "chocolate"
}
function AutumnGen(){
        grasscolor = "orange"
        predcolor = "maroon"
}
function WinterGen(){
        grasscolor = "black"
        predcolor = "silver"
}


function setup() {
        createCanvas(30 * side, 30 * side)
        background("#acacac");
         
}


function changeColor(matrix) {
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        let obj = matrix[y][x]
                        let toBot = side - side * 0.5
                        if (obj == 1){
                                fill(grasscolor)
                                rect(x * side, y * side, side, side)
                                text('🍀', x * side, y * side + toBot)
                        }else if(obj == 2){
                                fill ("purple") 
                                rect(x * side, y * side, side, side)
                        }else if(obj == 3){
                                fill (predcolor)
                                rect(x * side, y * side, side, side)
                                text('🐻', x * side, y * side + toBot)
                        }else if(obj == 4){
                                fill("white")
                                rect(x * side, y * side, side, side)
                        }else if(obj == 5){
                                fill ("cyan")
                                rect(x * side, y * side, side, side)
                        }else if(obj == 6){
                                fill ("navy")
                                rect(x * side, y * side, side, side)
                        }else if(obj == 7){
                                fill("black")
                                rect(x * side, y * side, side, side)
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


