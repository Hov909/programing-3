class Water{
    constructor(x, y) {
        this.x = x
        this.y = y
        this.mult = 0
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x,     this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x,     this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }

    chooseCell(char) {
        let found = []


        for (let i in this.directions) {
                    let x = this.directions[i][0]
                    let y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }
        }


        return found

    }

    mul(){
        this.mult++
        let emptyCell = this.chooseCell(0)
        let newCell = random (emptyCell)
     
        if(newCell && this.mult >= 5){
                    let newX  = newCell[0]
                    let newY  = newCell[1]

                    matrix[newY][newX] = 6

                    let wat = new Water(newX,newY)
                    waterArr.push(wat)


                    this.mult = 0


         }
         
   }

    find(){
        let emptyCell = this.chooseCell(1)
        let newCell = random (emptyCell)

        if(newCell){
            
            this.die()
        
        }
    }

    

    die(){
        matrix[this.y][this.x] = 0

          for(let i in waterArr){
                   if(this.x == waterArr[i].x && this.y == waterArr[i].y) {
                            waterArr.splice(i,1)
                   }
          }
    }

}