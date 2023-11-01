class Bird{
    constructor(x,y){
        this.x = x
        this.y = y
        this.food = 30
        this.directions = [ ];
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
        let found = []


        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char1) {
                    found.push(this.directions[i])
                }
            }

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char2) {
                    found.push(this.directions[i])
                }
            }
        }


        return found

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