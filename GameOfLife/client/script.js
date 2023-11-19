let socket = io()
let side = 30
let grasscolor = "green"


let light = document.getElementById("Light");
light.addEventListener("click", lighting);

function lighting(){
        grasscolor = "orange"
        new Audio("./natural-thunder-113219.mp3").play();

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
                                fill ("yellow") 
                                rect(x * side, y * side, side, side)
                        }else if(obj == 3){
                                fill ("red")
                                rect(x * side, y * side, side, side)
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
        socket.on('send matrix', nkarel)
        },400
    )


