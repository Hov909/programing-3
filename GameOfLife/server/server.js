let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
let fs = require("fs");

app.use(express.static("../client"));

app.get('/', function (req, res) {
        res.redirect('index.html');
});
server.listen(3000, () => {
        console.log('connected');
});

function matrixGenerator(matrixSize, grass, grassEater, predator, fullEater, doctor, water, bird) {
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

matrix = matrixGenerator(30, 9, 17, 20, 4, 5, 5, 14)

io.sockets.emit('send matrix', matrix)

grassArr = []
grassEaterArr = []
predatorArr = []
doctorArr = []
waterArr = []
fullEaterArr = []
birdArr = []

Grass = require("./grass")
GrassEater = require("./grassEater")
Predator = require("./predator")
Doctor = require("./doctor")
Bird = require("./bird")
FullEater = require("./full")
Water = require("./water")

function createObject() {
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {

                        if (matrix[y][x] == 1) {
                                let grass = new Grass(x, y)
                                grassArr.push(grass)
                        } else if (matrix[y][x] == 2) {
                                let grEat = new GrassEater(x, y)
                                grassEaterArr.push(grEat)
                        } else if (matrix[y][x] == 3) {
                                let pre = new Predator(x, y)
                                predatorArr.push(pre)
                        } else if (matrix[y][x] == 4) {
                                let ful = new FullEater(x, y)
                                fullEaterArr.push(ful)
                        } else if (matrix[y][x] == 5) {
                                let doc = new Doctor(x, y)
                                doctorArr.push(doc)
                        } else if (matrix[y][x] == 6) {
                                let wat = new Water(x, y)
                                waterArr.push(wat)
                        } else if (matrix[y][x] == 7) {
                                let bir = new Bird(x, y)
                                birdArr.push(bir)
                        }

                }
        }
        io.sockets.emit('send matrix', matrix)
}

function game() {
        for (let i in grassArr) {
                grassArr[i].mul()
        }
        for (let i in grassEaterArr) {
                grassEaterArr[i].eat()
        }
        for (let i in predatorArr) {
                predatorArr[i].eat()
        }
        for (let i in doctorArr) {
                doctorArr[i].heal()
        }
        for (let i in waterArr) {
                waterArr[i].mul()
                waterArr[i].find()
        }
        for (let i in fullEaterArr) {
                fullEaterArr[i].eat()
        }
        for (let i in birdArr) {
                birdArr[i].eat()
        }

        io.sockets.emit("send matrix", matrix);
}

setInterval(game,1000)

io.on('connection',function(socket){
        createObject();
        socket.on("WinterGen",GrassMul)
        socket.on("WinterGen", GrassEaterEnergy)
        socket.on("WinterGen", PredatorEnergy)
        socket.on("WinterGen", DoctorEnergy)
        socket.on("WinterGen", WaterMul)
        socket.on("WinterGen", FullEnergy)
        socket.on("Summer", GrassSum)
        socket.on("Summer", GrassEaterSum)
        socket.on("Summer", PredatorSum)
        socket.on("Spring", BirdSp)
        socket.on("Spring", FullSp)
        socket.on("Autumn", BirdAut)
        socket.on("Autumn", FullAut)
        socket.on("Thunder", GrassTh)
        socket.on("Thunder", PredatorTh)
        socket.on("Thunder", DoctorTh)
    });

let statistics = {};

function GrassMul(){
        for (let i in grassArr) {
            grassArr[i].multiply = -5;
        }
}
function GrassSum(){
        for (let i in grassArr) {
            grassArr[i].multiply = 10;
        }
}
function GrassTh(){
        for (let i in grassArr) {
            grassArr[i].multiply = -8;
        }
}
function BirdSp(){
        for (let i in birdArr) {
            birdArr[i].food = 18;
        }
}
function BirdAut(){
        for (let i in birdArr) {
            birdArr[i].food = 5;
        }
}
function GrassEaterSum(){
        for (let i in grassEaterArr) {
            grassEaterArr[i].energy = 50;
        }
}
function GrassEaterEnergy(){
        for (let i in grassEaterArr) {
            grassEaterArr[i].energy = 57;
        }
}
function PredatorEnergy(){
        for (let i in predatorArr) {
            predatorArr[i].energy = 23;
        }
}
function PredatorSum(){
        for (let i in predatorArr) {
            predatorArr[i].energy = 60;
        }
}
function PredatorTh(){
        for (let i in predatorArr) {
            predatorArr[i].energy = 17;
        }
}
function DoctorEnergy(){
        for (let i in doctorArr) {
            doctorArr[i].hp = 24;
        }
}
function DoctorTh(){
        for (let i in doctorArr) {
            doctorArr[i].hp = 5;
        }
}
function WaterMul(){
        for (let i in waterArr) {
            waterArr[i].mult = 8;
        }
}
function FullEnergy(){
        for (let i in fullEaterArr) {
                fullEaterArr[i].life = 30;
        }
}
function FullSp(){
        for (let i in fullEaterArr) {
                fullEaterArr[i].life = 10;
        }
}
function FullAut(){
        for (let i in fullEaterArr) {
                fullEaterArr[i].life = 11;
        }
}


setInterval(function () {
        statistics.grass = grassArr.length;
        statistics.grassEater = grassEaterArr.length;
        statistics.predator = predatorArr.length;
        statistics.doctor = doctorArr.length;
        statistics.bird = birdArr.length;
        statistics.full = fullEaterArr.length;
        statistics.water = waterArr.length;
        fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
            console.log("send")
        })
    }, 1000)








