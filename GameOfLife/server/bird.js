let LivingCreature = require('./LivingCreature')
module.exports = class Bird extends LivingCreature{
    constructor(x,y){
        super(x,y)
        this.food = 10
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x,     this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x,     this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(char, char1, char2) {
        this.getNewCoordinates()
        return super.chooseCell(char,char1,char2)
    }

    mul() {
        let emptyCell = this.chooseCell(0)
        let newCell = random(emptyCell)

        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]

            matrix[newY][newX] = 7

            let bir = new Bird(newX, newY)

            birdArr.push(bir)


        }
    }

    eat() {
        let emptyCell = this.chooseCell(3,5)
        let newCell = random(emptyCell)

        if (newCell) {
            this.food += 7
            let newX = newCell[0]
            let newY = newCell[1]

            for (let i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1)
                }
            }

            for (let i in fullEaterArr) {
                if (newX == fullEaterArr[i].x && newY == fullEaterArr[i].y) {
                    fullEaterArr.splice(i, 1)
                }
            }


            matrix[newY][newX] = 7
            matrix[this.y][this.x] = 0


            this.x = newX
            this.y = newY

            if (this.food > 24) {
                this.mul()
            }

        } else {
            this.move()
        }
    }

    move(){
        let emptyCell = this.chooseCell(0,6,1)
        let newCell = random(emptyCell)

            if(newCell){
                this.food -= 2
                let newX = newCell[0]
                let newY = newCell[1]

                matrix[newY][newX] = 7
                matrix[this.y][this.x] = 0
                
                this.x = newX
                this.y = newY

                if(this.food < -3){
                    this.die ()
                }
            }
     }

     die(){
        matrix[this.y][this.x] = 0

        for(let i in birdArr){
                    if(this.x == birdArr[i].x && this.y == birdArr[i].y) {
                            birdArr.splice(i,1)
                    }
        }
        
    }

    heal(){
        let emptyCell = this.chooseCell(5)
        let newCell = random(emptyCell)

        if(newCell){
            this.food += 7
        }
    }

}