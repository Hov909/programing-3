function matrixGenerator(matrixSize, grass,grassEater,predator,doctor,water,fullEater,bird) {
        var matrix = []
        ////  matrix սարքելու հատված
        for (let i = 0; i < matrixSize; i++) {
                matrix.push([])
                for (let j = 0; j < matrixSize; j++) {
                        matrix[i].push(0)
                }
        }

        // 1 -եր այսինքն խոտեր քցելու հատված մատռիքսում
        for (let i = 0; i < grass; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 1
        }
         //GrassEater 2

         for (let i = 0; i < grassEater; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 2
        }
        //3 predator

        for (let i = 0; i < predator; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 3
        }


        for (let i = 0; i < fullEater; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 4
        }
        for (let i = 0; i < doctor; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 5
        }

        for (let i = 0; i < water; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 6
        }

        for (let i = 0; i < bird; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 7
        }
        
        
        return matrix
}

let matrix = matrixGenerator(30,9,17,20,4,5,5,14)
let side = 40
///օբյեկտներ պահելու զանգվածներ
var grassArr = []
var grassEaterArr = []
var predatorArr = []
var doctorArr = []
var waterArr = []
var fullEaterArr = []
var birdArr = []


function setup() {
        frameRate(10)
        createCanvas(matrix[0].length * side, matrix.length * side)
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        
                        
                        if (matrix[y][x] == 1) {
                                let grass = new Grass(x,y)
                                grassArr.push(grass)
                        }else if(matrix[y][x] == 2){
                             let grEat = new GrassEater(x,y)
                             grassEaterArr.push(grEat)
                        }else if(matrix[y][x] ==  3){
                             let pre = new Predator(x,y)
                             predatorArr.push(pre)
                        }else if(matrix[y][x] == 4){
                                let ful = new Full(x,y)
                                fullEaterArr.push(ful)
                        }else if(matrix[y][x] == 5){
                                let doc = new Doctor(x,y)
                                doctorArr.push(doc)
                        }else if(matrix[y][x] == 6){
                                let wat = new Water(x,y)
                                waterArr.push(wat)
                        }else if(matrix[y][x] == 7){
                                let bir = new Bird(x,y)
                                birdArr.push(bir)
                        }

        }
    }
}


function draw() {
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        if (matrix[y][x] == 1) {
                                fill("green")
                        } else if(matrix[y][x] == 2){
                                fill ("yellow") 
                        }else if(matrix[y][x] == 3){
                                fill ("red")
                        }else if(matrix[y][x] == 4){
                                fill("white")
                        }else if(matrix[y][x] == 5){
                                fill ("cyan")
                        }else if(matrix[y][x] == 6){
                                fill ("navy")
                        }else if(matrix[y][x] == 7){
                                fill("black")
                        }else {
                                fill("gray")
                        }
                        rect(x * side, y * side, side, side)
                }
        }



                for (let i in grassArr) {
                        grassArr[i].mul()
                }
                for(let i in grassEaterArr){
                        grassEaterArr[i].eat()
                }
                for(let i in predatorArr){
                        predatorArr[i].eat()
                }
                for(let i in predatorArr){
                       if(doctorArr.length > 0 ){
                        predatorArr[i].heal()
                       }
                       
                }
                for(let i in doctorArr){
                        doctorArr[i].heal()
                }

                for(let i in waterArr){
                        waterArr[i].mul()
                        waterArr[i].find()
                }

                       
                

                for(let i in fullEaterArr){
                        fullEaterArr[i].eat()
                }

                for(let i in birdArr){
                        birdArr[i].eat()
                }


 
}
