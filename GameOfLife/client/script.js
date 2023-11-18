let socket = io()
let side = 30


function setup() {
        createCanvas(30 * side, 30 * side)
        background("#acacac");
}


function nkarel(matrix) {
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        let obj = matrix[y][x]
                        if (obj == 1) {
                                fill("green")
                        } else if(obj == 2){
                                fill ("yellow") 
                        }else if(obj == 3){
                                fill ("red")
                        }else if(obj == 4){
                                fill("white")
                        }else if(obj == 5){
                                fill ("cyan")
                        }else if(obj == 6){
                                fill ("navy")
                        }else if(obj == 7){
                                fill("black")
                        }else {
                                fill("gray")
                        }
                        rect(x * side, y * side, side, side)
                }
        }
}


setInterval(
        function () {
        socket.on('send matrix', nkarel)
        },400
    )
