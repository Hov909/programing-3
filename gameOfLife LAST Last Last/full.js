class Full{
    constructor(x,y){
        this.x = x
        this.y = y
        this.life = 23
        this.directions = []
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

    chooseCell(char,char1,char2,char3) {
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
            this.life++
            let newX = newCell[0]
            let newY = newCell[1]

            matrix[newY][newX] = 4

            let ful = new Full(newX, newY)

            fullEaterArr.push(ful)


        }
    }

    eat() {
        let emptyCell = this.chooseCell(2,3,5)
        let newCell = random(emptyCell)

        if (newCell) {
            this.life += 4
            let newX = newCell[0]
            let newY = newCell[1]

            
            for (let i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)
                }
            }

            for (let i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1)
                }
            }

            for (let i in doctorArr) {
                if (newX == doctorArr[i].x && newY == doctorArr[i].y) {
                    doctorArr.splice(i, 1)
                }
            }


            matrix[newY][newX] = 4
            matrix[this.y][this.x] = 0


            this.x = newX
            this.y = newY

            if (this.life > 20) {
                this.mul()
            }

        } else {
            this.move()
        }
    }

    move(){
        let emptyCell = this.chooseCell(0,1,6)
        let newCell = random(emptyCell)

            if(newCell){
                this.life -= 2
                let newX = newCell[0]
                let newY = newCell[1]

                matrix[newY][newX] = 4
                matrix[this.y][this.x] = 0
                
                this.x = newX
                this.y = newY

                if(this.life < 0){
                    this.die ()
                }
            }
    }

    die(){
        matrix[this.y][this.x] = 0

          for(let i in fullEaterArr){
                   if(this.x == fulleaterArr[i].x && this.y == fullEaterArr[i].y) {
                            fullEaterArr.splice(i,1)
                   }
          }
    }

    heal(){
        let emptyCell = this.chooseCell(5)
        let newCell = random(emptyCell)

        if(newCell){
            this.life += 8
        }else{
            this.move()
        }


    }

    find(){
        let emptyCell = this.chooseCell(6)
        let newCell = random (emptyCell)

        if(newCell){
            
            let newX  = newCell[0]
            let newY  = newCell[1]


            this.die()
        
        }
    }

    die(){
        matrix[this.y][this.x] = 0

          for(let i in fullEaterArr){
                   if(this.x == fullEaterArr[i].x && this.y == fullEaterArr[i].y) {
                            fullEaterArr.splice(i,1)
                   }
          }
    }
}