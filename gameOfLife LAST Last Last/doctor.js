class Doctor{
    constructor(x,y){
        this.x = x
        this.y = y
        this.hp = 10
        this.directions = [ ];
    }

    getNewCoordinates(){
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(char,char1){
        this.getNewCoordinates()
        let found = []


        for(let i in this.directions){
                         let x =   this.directions[i][0]
                         let y =   this.directions[i][1]
                if(x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                            if(matrix[y][x] == char ){
                                   found.push(this.directions[i])
                            }
                }
                if(x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                            if(matrix[y][x] == char1 ){
                                    found.push(this.directions[i])
                            }
                }
                

        }


        return found

   }

    mul(){
    let emptyCell = this.chooseCell(0)
    let newCell = random(emptyCell)

        if(newCell){
            let newX = newCell[0]
            let newY = newCell[1]

            matrix[newY][newX]  = 5

            let doc = new Doctor(newX,newY)

            doctorArr.push(doc)

        }
    }

    move(){
        let emptyCell = this.chooseCell(0)
        let newCell = random(emptyCell)

            if(newCell){
                
                let newX = newCell[0]
                let newY = newCell[1]

                matrix[newY][newX] = 5
                matrix[this.y][this.x] = 0
                
                this.x = newX
                this.y = newY

                this.hp += 5

                if(this.hp > 12){
                    this.mul()
                }
                else if(this.hp < 0){
                    this.die ()
                }

            }else{
                this.move()
            }
     }

     heal(){
        let emptyCell = this.chooseCell(2,3)
        let newCell = random(emptyCell)

        if(newCell){
            let newX = newCell[0]
            let newY = newCell[1]

            matrix[newY][newX] = 5
            matrix[this.y][this.x] = 0
                
            this.x = newX
            this.y = newY

            
                this.hp -= 3
        }
     }

     die(){
        matrix[this.y][this.x] = 0

        for(let i in doctorArr){
            if(this.x == doctorArr[i].x && this.y == doctorArr[i].y) {
                    doctorArr.splice(i,1)
            }
        }
    
    }
}